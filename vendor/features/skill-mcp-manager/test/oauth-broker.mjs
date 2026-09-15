import assert from 'node:assert/strict'
import { createOAuthBroker } from '../oauth-broker.js'

const originalFetch = globalThis.fetch

const records = new Map()
const changed = []
const requests = []
let refreshCount = 0

const credentials = {
  async readRecord(key) { return records.get(key) },
  async modifyRecord(key, mutate) {
    const current = records.get(key)
    const next = await mutate(current)
    if (next !== undefined) records.set(key, next)
    return next === undefined ? current : next
  },
  async deleteRecord(key) { records.delete(key) },
}

function response(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

globalThis.fetch = async (url, options = {}) => {
  const value = String(url)
  requests.push({ url: value, method: options.method || 'GET', body: String(options.body || '') })
  if (/\/mcp\/css\/(db|sls)$/.test(value)) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { 'WWW-Authenticate': 'Bearer resource_metadata="https://popaidock.example.com/.well-known/oauth-protected-resource/mcp"' },
    })
  }
  if (value.endsWith('/.well-known/oauth-protected-resource/mcp')) {
    return response({
      resource: 'https://popaidock.example.com/mcp',
      authorization_servers: ['https://popaidock.example.com/'],
      scopes_supported: ['mcp:access'],
    })
  }
  if (value.includes('/.well-known/oauth-protected-resource/')) return response({ error: 'not found' }, 404)
  if (value.endsWith('/.well-known/oauth-authorization-server')) {
    return response({
      issuer: 'https://popaidock.example.com/',
      authorization_endpoint: 'https://popaidock.example.com/authorize',
      token_endpoint: 'https://popaidock.example.com/token',
      registration_endpoint: 'https://popaidock.example.com/register',
      scopes_supported: ['mcp:access'],
      response_types_supported: ['code'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
      token_endpoint_auth_methods_supported: ['none'],
      code_challenge_methods_supported: ['S256'],
    })
  }
  if (value.endsWith('/register')) return response({ ...JSON.parse(options.body), client_id: 'dcr-client', token_endpoint_auth_method: 'none' }, 201)
  if (value.endsWith('/token')) {
    const params = new URLSearchParams(options.body)
    const localRefresh = ['header', Buffer.from(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + 604800 })).toString('base64url'), 'signature'].join('.')
    if (params.get('grant_type') === 'authorization_code') {
      assert.equal(params.get('code_verifier')?.length >= 43, true)
      return response({
        access_token: 'access-1', refresh_token: 'refresh-1', token_type: 'Bearer',
        expires_in: 1, refresh_token_expires_in: 604800, scope: 'mcp:access',
      })
    }
    assert.equal(params.get('refresh_token'), 'refresh-1')
    refreshCount += 1
    return response({
      access_token: 'access-2', refresh_token: localRefresh, token_type: 'Bearer',
      expires_in: 7200, refresh_token_expires_in: 604800, scope: 'mcp:access',
    })
  }
  throw new Error('unexpected URL ' + value)
}

const ctx = { get(name) { return name === 'credentials' ? credentials : undefined } }
const broker = createOAuthBroker(ctx, {
  onCredentialChanged(key) { changed.push(key) },
})
const db = {
  name: 'popaidock-db', transport: 'streamable-http',
  url: 'https://popaidock.example.com/mcp/css/db', auth: { type: 'oauth' },
}
const sls = { ...db, name: 'popaidock-sls', url: 'https://popaidock.example.com/mcp/css/sls' }

try {
  const started = await broker.begin(db, 'http://127.0.0.1:43120')
  assert.equal(started.authorized, false)
  const authorize = new URL(started.url)
  assert.equal(authorize.origin + authorize.pathname, 'https://popaidock.example.com/authorize')
  assert.equal(authorize.searchParams.get('resource'), 'https://popaidock.example.com/mcp')
  assert.equal(authorize.searchParams.get('code_challenge_method'), 'S256')
  await broker.callback(new URL('http://127.0.0.1:43120/capabilities-api/mcp/oauth/callback?state=' + encodeURIComponent(authorize.searchParams.get('state')) + '&code=ok'))

  assert.equal((await broker.status(db)).state, 'authorized')
  assert.equal((await broker.status(sls)).state, 'authorized', 'same issuer/resource shares one grant')
  const ensured = await broker.ensure(db)
  assert.equal(ensured.accessToken, 'access-2')
  assert.equal(ensured.refreshed, true)
  assert.equal(refreshCount, 1)
  const payload = [...records.values()][0].payload
  assert.match(payload.refreshToken, /^header\./, 'rotated refresh token is persisted')
  assert.ok(payload.refreshExpiresAt > Date.now() + 6 * 86400000, 'JWT refresh expiry is tracked')
  assert.ok(payload.reauthAt > Date.now() + 364 * 86400000)
  assert.equal([...records].length, 1, 'multiple MCP URLs share one credential record')
  assert.equal(requests.some((item) => item.body.includes('access-1')), false)

  await broker.logout(sls)
  assert.equal((await broker.status(db)).state, 'unauthenticated')
  assert.equal(changed.length >= 2, true)
  console.log('MCP OAuth broker discovery, PKCE, sharing, refresh and logout: PASS')
} finally {
  broker.cleanup()
  globalThis.fetch = originalFetch
}
