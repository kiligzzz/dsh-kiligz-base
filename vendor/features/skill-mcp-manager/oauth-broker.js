import { createHash, randomBytes } from 'node:crypto'
import {
  discoverOAuthServerInfo,
  exchangeAuthorization,
  extractWWWAuthenticateParams,
  refreshAuthorization,
  registerClient,
  startAuthorization,
} from '@modelcontextprotocol/sdk/client/auth.js'
import { checkResourceAllowed, resourceUrlFromServerUrl } from '@modelcontextprotocol/sdk/shared/auth-utils.js'

const RECORD_SCOPE = 'skill-mcp-manager'
const CALLBACK_PATH = '/capabilities-api/mcp/oauth/callback'
const RECORD_VERSION = 1
const REFRESH_SKEW_MS = 5 * 60 * 1000
const HARD_REAUTH_MS = 365 * 24 * 60 * 60 * 1000
const DISCOVERY_TTL_MS = 5 * 60 * 1000

function randomToken(bytes = 32) {
  return randomBytes(bytes).toString('base64url')
}

function safeUrl(value, label) {
  let parsed
  try { parsed = new URL(String(value)) } catch { throw new Error(label + ' 不是合法 URL') }
  const loopback = parsed.hostname === '127.0.0.1' || parsed.hostname === 'localhost'
  if (parsed.protocol !== 'https:' && !(parsed.protocol === 'http:' && loopback)) {
    throw new Error(label + ' 必须使用 HTTPS（localhost 除外）')
  }
  if (parsed.username || parsed.password || parsed.hash) throw new Error(label + ' 包含不允许的 URL 成分')
  return parsed
}

async function timedFetch(input, init = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)
  const sourceSignal = init.signal
  const abort = () => controller.abort()
  if (sourceSignal) sourceSignal.addEventListener('abort', abort, { once: true })
  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeout)
    if (sourceSignal) sourceSignal.removeEventListener('abort', abort)
  }
}

function recordKey(issuer, resource) {
  const id = createHash('sha256').update(issuer + '\n' + resource).digest('hex').slice(0, 32)
  return RECORD_SCOPE + '/oauth-' + id
}

function grantPayload(record) {
  if (!record || record.kind !== 'grant') return null
  const value = record.payload
  if (!value || value.owner !== RECORD_SCOPE || value.version !== RECORD_VERSION) return null
  if (typeof value.accessToken !== 'string' || typeof value.clientId !== 'string') return null
  return value
}

function publicGrant(value) {
  if (!value) return { state: 'unauthenticated' }
  const now = Date.now()
  const expired = Boolean(
    value.invalidAt ||
    (value.reauthAt && value.reauthAt <= now) ||
    (value.refreshExpiresAt && value.refreshExpiresAt <= now) ||
    (!value.refreshToken && value.expiresAt && value.expiresAt <= now)
  )
  return {
    state: expired ? 'expired' : 'authorized',
    issuer: value.issuer,
    resource: value.resource,
    expiresAt: value.expiresAt || null,
    reauthAt: value.reauthAt || null,
  }
}

function jwtExpiry(token) {
  try {
    const parts = String(token || '').split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'))
    return Number.isFinite(payload.exp) && payload.exp > 0 ? payload.exp * 1000 : null
  } catch { return null }
}

function clientInformation(value) {
  return {
    client_id: value.clientId,
    ...(value.clientSecret ? { client_secret: value.clientSecret } : {}),
    ...(value.tokenEndpointAuthMethod ? { token_endpoint_auth_method: value.tokenEndpointAuthMethod } : {}),
  }
}

export function createOAuthBroker(ctx, hooks = {}) {
  const credentials = ctx.get('credentials')
  if (!credentials) throw new Error('skill-mcp-manager OAuth 需要 credentials 服务')
  const pending = new Map()
  const discoveryCache = new Map()

  async function discover(server) {
    const cached = discoveryCache.get(server.url)
    if (cached && cached.expiresAt > Date.now()) return cached.value
    const serverUrl = safeUrl(server.url, 'MCP URL')
    let resourceMetadataUrl
    try {
      const challenge = await timedFetch(serverUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/event-stream',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jsonrpc: '2.0', id: 'oauth-discovery', method: 'tools/list' }),
      })
      resourceMetadataUrl = extractWWWAuthenticateParams(challenge).resourceMetadataUrl
      await challenge.body?.cancel()
    } catch {}
    const info = await discoverOAuthServerInfo(serverUrl, {
      fetchFn: timedFetch,
      ...(resourceMetadataUrl ? { resourceMetadataUrl } : {}),
    })
    const authorizationServerUrl = safeUrl(info.authorizationServerUrl, 'OAuth issuer')
    const authMetadata = info.authorizationServerMetadata
    if (!authMetadata) throw new Error('OAuth authorization-server metadata 不存在')
    for (const field of ['authorization_endpoint', 'token_endpoint', 'registration_endpoint']) {
      if (!authMetadata[field]) throw new Error('OAuth metadata 缺少 ' + field)
      safeUrl(authMetadata[field], field)
    }
    const resourceUrl = info.resourceMetadata?.resource
      ? safeUrl(info.resourceMetadata.resource, 'OAuth resource')
      : resourceUrlFromServerUrl(serverUrl)
    if (!checkResourceAllowed({ requestedResource: resourceUrlFromServerUrl(serverUrl), configuredResource: resourceUrl })) {
      throw new Error('MCP URL 不属于 OAuth protected resource')
    }
    const issuer = String(authMetadata.issuer || authorizationServerUrl)
    const resource = String(resourceUrl)
    const scopes = Array.isArray(info.resourceMetadata?.scopes_supported) && info.resourceMetadata.scopes_supported.length
      ? info.resourceMetadata.scopes_supported
      : (Array.isArray(authMetadata.scopes_supported) ? authMetadata.scopes_supported : [])
    const value = {
      issuer,
      resource,
      scopes,
      authorizationServerUrl: String(authorizationServerUrl),
      authorizationServerMetadata: authMetadata,
      key: recordKey(issuer, resource),
    }
    discoveryCache.set(server.url, { value, expiresAt: Date.now() + DISCOVERY_TTL_MS })
    return value
  }

  async function read(server) {
    const metadata = await discover(server)
    return { metadata, value: grantPayload(await credentials.readRecord(metadata.key)) }
  }

  function nextGrant(metadata, client, tokens, previous) {
    if (typeof tokens.access_token !== 'string' || !tokens.access_token.trim()) {
      throw new Error('OAuth token 响应缺少有效 access_token')
    }
    if (tokens.refresh_token !== undefined && (typeof tokens.refresh_token !== 'string' || !tokens.refresh_token.trim())) {
      throw new Error('OAuth token 响应包含无效 refresh_token')
    }
    const now = Date.now()
    const expiresIn = Math.max(1, Number(tokens.expires_in || 3600))
    const nextRefreshToken = String(tokens.refresh_token || previous?.refreshToken || '')
    const refreshExpiresIn = Number(tokens.refresh_token_expires_in || tokens.refresh_expires_in || 0)
    return {
      owner: RECORD_SCOPE,
      version: RECORD_VERSION,
      issuer: metadata.issuer,
      resource: metadata.resource,
      clientId: client.client_id,
      clientSecret: String(client.client_secret || ''),
      tokenEndpointAuthMethod: String(client.token_endpoint_auth_method || 'none'),
      accessToken: tokens.access_token,
      refreshToken: nextRefreshToken,
      tokenType: String(tokens.token_type || 'Bearer'),
      scope: String(tokens.scope || previous?.scope || ''),
      expiresAt: now + expiresIn * 1000,
      refreshExpiresAt: refreshExpiresIn > 0
        ? now + refreshExpiresIn * 1000
        : (jwtExpiry(nextRefreshToken) || previous?.refreshExpiresAt || null),
      invalidAt: null,
      authorizedAt: previous?.authorizedAt || now,
      reauthAt: previous?.reauthAt || now + HARD_REAUTH_MS,
    }
  }

  async function register(metadata, callbackUrl) {
    return registerClient(new URL(metadata.authorizationServerUrl), {
      metadata: metadata.authorizationServerMetadata,
      scope: metadata.scopes.join(' ') || undefined,
      fetchFn: timedFetch,
      clientMetadata: {
        client_name: 'DeepSeek Harness',
        redirect_uris: [callbackUrl],
        grant_types: ['authorization_code', 'refresh_token'],
        response_types: ['code'],
        token_endpoint_auth_method: 'none',
      },
    })
  }

  async function begin(server, callbackOrigin) {
    if (!server || server.transport !== 'streamable-http' || server.auth?.type !== 'oauth') {
      throw new Error('该 MCP 未配置 OAuth')
    }
    const metadata = await discover(server)
    const existing = grantPayload(await credentials.readRecord(metadata.key))
    if (existing && publicGrant(existing).state === 'authorized') {
      await hooks.onMetadata?.(server.name, metadata)
      return { authorized: true, status: publicGrant(existing) }
    }
    const origin = safeUrl(callbackOrigin, 'DSH callback origin')
    if (origin.protocol !== 'http:' || !['127.0.0.1', 'localhost'].includes(origin.hostname) || origin.pathname !== '/') {
      throw new Error('OAuth callback origin 必须是 DSH loopback 根地址')
    }
    const callbackUrl = new URL(CALLBACK_PATH, origin)
    const client = await register(metadata, callbackUrl)
    const state = randomToken(32)
    const started = await startAuthorization(new URL(metadata.authorizationServerUrl), {
      metadata: metadata.authorizationServerMetadata,
      clientInformation: client,
      redirectUrl: callbackUrl,
      scope: metadata.scopes.join(' ') || undefined,
      state,
      resource: new URL(metadata.resource),
    })
    pending.set(state, {
      state,
      serverName: server.name,
      metadata,
      client,
      verifier: started.codeVerifier,
      callbackUrl: String(callbackUrl),
      expiresAt: Date.now() + 10 * 60 * 1000,
    })
    return { authorized: false, url: String(started.authorizationUrl), expiresAt: Date.now() + 10 * 60 * 1000 }
  }

  async function callback(requestUrl) {
    const state = requestUrl.searchParams.get('state') || ''
    const transaction = pending.get(state)
    pending.delete(state)
    if (!transaction || transaction.expiresAt <= Date.now()) throw new Error('OAuth 登录请求已失效，请重新发起')
    if (requestUrl.searchParams.get('error')) throw new Error('OAuth 授权被拒绝')
    const code = requestUrl.searchParams.get('code')
    if (!code) throw new Error('OAuth callback 缺少 code')
    const tokens = await exchangeAuthorization(new URL(transaction.metadata.authorizationServerUrl), {
      metadata: transaction.metadata.authorizationServerMetadata,
      clientInformation: transaction.client,
      authorizationCode: code,
      codeVerifier: transaction.verifier,
      redirectUri: transaction.callbackUrl,
      resource: new URL(transaction.metadata.resource),
      fetchFn: timedFetch,
    })
    const value = nextGrant(transaction.metadata, transaction.client, tokens)
    await credentials.modifyRecord(transaction.metadata.key, async () => ({ kind: 'grant', payload: value }))
    await hooks.onMetadata?.(transaction.serverName, transaction.metadata)
    await hooks.onCredentialChanged?.(transaction.metadata.key)
    return { ok: true }
  }

  async function ensure(server) {
    const metadata = await discover(server)
    let refreshed = false
    let record
    try {
      record = await credentials.modifyRecord(metadata.key, async (current) => {
        const value = grantPayload(current)
        if (!value) return undefined
        const now = Date.now()
        if (value.reauthAt && value.reauthAt <= now) throw new Error('OAuth 授权已满 365 天，请重新认证')
        if (value.expiresAt && value.expiresAt > now + REFRESH_SKEW_MS) return undefined
        if (!value.refreshToken) throw new Error('OAuth refresh token 不存在，请重新认证')
        if (value.refreshExpiresAt && value.refreshExpiresAt <= now) throw new Error('OAuth refresh token 已过期，请重新认证')
        const tokens = await refreshAuthorization(new URL(metadata.authorizationServerUrl), {
          metadata: metadata.authorizationServerMetadata,
          clientInformation: clientInformation(value),
          refreshToken: value.refreshToken,
          resource: new URL(metadata.resource),
          fetchFn: timedFetch,
        })
        refreshed = true
        return { kind: 'grant', payload: nextGrant(metadata, clientInformation(value), tokens, value) }
      })
    } catch (error) {
      if (error?.errorCode === 'invalid_grant') {
        await credentials.modifyRecord(metadata.key, async (current) => {
          const value = grantPayload(current)
          return value ? { kind: 'grant', payload: { ...value, invalidAt: Date.now() } } : undefined
        })
      }
      throw error
    }
    const value = grantPayload(record)
    if (!value) throw new Error('OAuth authentication required，请在 MCP 管理中登录')
    return {
      key: metadata.key,
      accessToken: value.accessToken,
      fingerprint: createHash('sha256').update(value.accessToken).digest('hex').slice(0, 16),
      refreshed,
      status: publicGrant(value),
    }
  }

  async function status(server) {
    if (server.transport !== 'streamable-http' || server.auth?.type !== 'oauth') return { state: 'none' }
    try {
      const { metadata, value } = await read(server)
      return { ...publicGrant(value), issuer: metadata.issuer, resource: metadata.resource }
    } catch (error) {
      return { state: 'error', error: String(error?.message || error) }
    }
  }

  async function logout(server) {
    const metadata = await discover(server)
    await credentials.deleteRecord(metadata.key)
    await hooks.onCredentialChanged?.(metadata.key)
    return { ok: true }
  }

  function invalidate(serverUrl) {
    discoveryCache.delete(serverUrl)
  }

  function cleanup() {
    pending.clear()
    discoveryCache.clear()
  }

  return { begin, callback, ensure, status, logout, discover, invalidate, cleanup, callbackPath: CALLBACK_PATH }
}
