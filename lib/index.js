var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name4 in all)
    __defProp(target, name4, { get: all[name4], enumerable: true });
};

// src/index.js
import * as automation from "@michengai/dsh-automation";
import * as visionBridge from "@goodandready/dsh-vision-bridge";

// vendor/features/ui-appearance/lib/index.js
var lib_exports = {};
__export(lib_exports, {
  APPEARANCE_ROLES: () => APPEARANCE_ROLES,
  APPEARANCE_SETTINGS_NAMESPACE: () => APPEARANCE_SETTINGS_NAMESPACE,
  COMPOSER_ATTRS: () => COMPOSER_ATTRS,
  COMPOSER_DEFAULTS: () => COMPOSER_DEFAULTS,
  COMPOSER_KEYS: () => COMPOSER_KEYS,
  DEFAULT_SETTINGS: () => DEFAULT_SETTINGS,
  apply: () => apply
});
var APPEARANCE_SETTINGS_NAMESPACE = "ui-appearance";
var APPEARANCE_ROLES = [
  "accent",
  "background",
  "panel",
  "input",
  "text",
  "border"
];
var DEFAULT_SETTINGS = {
  accent: "#4176e6",
  background: "",
  panel: "",
  input: "",
  text: "",
  border: "",
  backgroundImage: "",
  backgroundVideo: "",
  imageDark: false,
  backgroundOpacity: 1,
  backgroundBlur: 0,
  scrim: 0,
  surfaceAlpha: 1,
  inputAlpha: 1,
  codeAlpha: 1,
  sidebarOpaque: false,
  conversationGlass: false,
  conversationGlassBlur: 8,
  glassBlur: 0,
  aistudioComposer: true,
  glassComposer: false,
  glowComposer: true,
  emphasisAlpha: 0.22,
  preset: ""
};
var COMPOSER_KEYS = {
  aistudio: "dsh.aistudioComposer",
  glass: "dsh.glassComposer",
  glow: "dsh.glowComposer"
};
var COMPOSER_ATTRS = {
  aistudio: "data-dsh-aistudio-composer",
  glass: "data-dsh-glass-composer",
  glow: "data-dsh-glow-composer"
};
var COMPOSER_DEFAULTS = {
  aistudio: "1",
  glass: "0",
  glow: "1"
};
var STORAGE_KEY = "dsh-ui-appearance.settings";
function bootstrapScript() {
  return `<script>${[
    "aistudio",
    "glass",
    "glow"
  ].map((fx) => {
    const key = COMPOSER_KEYS[fx];
    const attr = COMPOSER_ATTRS[fx];
    const field = `${fx}Composer`;
    const fallback = COMPOSER_DEFAULTS[fx];
    const expr = `(()=>{try{const s=JSON.parse(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})||"null");if(s&&typeof s[${JSON.stringify(field)}]==="boolean")return s[${JSON.stringify(field)}]}catch(e){}const v=localStorage.getItem(${JSON.stringify(key)});return v===null?${fallback}:v==="1"})()`;
    return `document.body.toggleAttribute(${JSON.stringify(attr)},${expr})`;
  }).join(";")}</script>`;
}
function tapIndex(html) {
  const body = /<body(?:\s[^>]*)?>/i.exec(html);
  const script = bootstrapScript();
  if (body === null) return `${html}${script}`;
  const at = body.index + body[0].length;
  return `${html.slice(0, at)}${script}${html.slice(at)}`;
}
function apply(ctx) {
  ctx.inject(["webServer"], (httpCtx) => {
    httpCtx.effect(() => httpCtx.webServer.tapIndex(tapIndex), "ui-appearance: composer-fx bootstrap");
  });
}

// vendor/features/session-archive/lib/index.js
var lib_exports2 = {};
__export(lib_exports2, {
  ROUTE: () => ROUTE,
  WorkspaceArchive: () => WorkspaceArchive,
  apply: () => apply2,
  inject: () => inject,
  name: () => name
});
var ROUTE = "/_dsh/session-archive";
var name = "@kiligzzz/dsh-session-archive";
var inject = ["workspaceRegistry", "sessionPersistence"];
var MAX_BODY = 64 * 1024;
var QUESTION_LIMIT = 100;
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function responseJson(res, status, body) {
  const bytes = Buffer.from(JSON.stringify(body));
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Content-Length", String(bytes.length));
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'");
  res.writeHead(status);
  res.end(bytes);
}
function sameOriginPost(req) {
  const fetchSite = req.headers["sec-fetch-site"];
  if (fetchSite === "cross-site") return false;
  const origin = req.headers.origin;
  if (origin === void 0) return fetchSite === "same-origin" || fetchSite === "same-site" || fetchSite === "none";
  const host = req.headers.host;
  if (host === void 0) return false;
  try {
    const parsed = new URL(origin);
    return (parsed.protocol === "http:" || parsed.protocol === "https:") && parsed.host === host;
  } catch {
    return false;
  }
}
async function readJson(req) {
  const contentType = req.headers["content-type"]?.split(";")[0]?.trim().toLowerCase();
  if (contentType !== "application/json") throw new TypeError("Content-Type must be application/json");
  const chunks = [];
  let bytes = 0;
  for await (const chunk of req) {
    const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    bytes += part.length;
    if (bytes > MAX_BODY) throw new RangeError(`request body exceeds ${MAX_BODY} bytes`);
    chunks.push(part);
  }
  if (chunks.length === 0) throw new TypeError("request body is empty");
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}
function publicMessage(error) {
  return error instanceof Error ? error.message : String(error);
}
function blockText(block) {
  if (typeof block !== "object" || block === null) return void 0;
  const record = block;
  if (typeof record.text === "string" && record.text.length > 0) return record.text;
  if (typeof record.content === "string" && record.content.length > 0) return record.content;
  return void 0;
}
function contentLines(value, limit = 8) {
  const lines = [];
  const push = (text, cap = 300) => {
    if (typeof text !== "string") return;
    const normalized = text.trim();
    if (normalized.length === 0) return;
    lines.push(normalized.length > cap ? `${normalized.slice(0, cap)}\u2026` : normalized);
  };
  if (Array.isArray(value)) {
    for (const block of value) push(blockText(block));
  } else {
    push(value);
  }
  return lines.slice(0, limit);
}
var WorkspaceArchive = class {
  constructor(registry, persistence) {
    this.registry = registry;
    this.persistence = persistence;
  }
  /** Archived ids in host order. The clone prevents callers mutating registry state. */
  list() {
    return [...this.registry.archivedSessionIds];
  }
  /** Read one archived Session preview through the public persistence handle. */
  async preview(sessionId) {
    if (typeof sessionId !== "string" || sessionId.length === 0) throw new TypeError("sessionId must be a non-empty string");
    if (!this.registry.archivedSessionIds.includes(sessionId)) {
      const error = new Error("session is not archived");
      error.code = "not-archived";
      throw error;
    }
    const handle2 = await this.persistence.open(sessionId, "read");
    let events;
    try {
      ;
      ({ events } = await handle2.read());
    } finally {
      await handle2.close();
    }
    let title;
    for (let i = events.length - 1; i >= 0; i--) {
      const event = events[i];
      if (event.type !== "session/title") continue;
      const data = event.data ?? {};
      if (typeof data.title === "string" && data.title.length > 0) {
        title = data.title;
        break;
      }
    }
    const questions = [];
    for (let i = events.length - 1; i >= 0 && questions.length < QUESTION_LIMIT; i--) {
      const event = events[i];
      if (event.type !== "user/message") continue;
      const data = event.data ?? {};
      const source = isRecord(data.source) ? data.source : void 0;
      const sourceKind = typeof source?.kind === "string" ? source.kind : "user";
      if (sourceKind !== "user") continue;
      const text = contentLines(data.content);
      if (text.length > 0) questions.push({ seq: event.seq, text });
    }
    return {
      title,
      cwd: typeof handle2.header.cwd === "string" ? handle2.header.cwd : void 0,
      questions
    };
  }
};
async function handle(archive, req, res) {
  if (req.method === "GET") {
    responseJson(res, 200, { ok: true, value: { archivedSessionIds: archive.list(), capabilities: { preview: true, restore: false, delete: false } } });
    return;
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    responseJson(res, 405, { ok: false, error: { code: "method-not-allowed", message: "Use GET or POST" } });
    return;
  }
  if (!sameOriginPost(req)) {
    responseJson(res, 403, { ok: false, error: { code: "origin-rejected", message: "The request must originate from this DSH Web application" } });
    return;
  }
  try {
    const body = await readJson(req);
    if (!isRecord(body) || body.action !== "preview") {
      responseJson(res, 409, { ok: false, error: { code: "unsupported-action", message: "Current DSH does not expose a safe restore or permanent-delete API" } });
      return;
    }
    if (typeof body.sessionId !== "string" || body.sessionId.length === 0) throw new TypeError("sessionId is required");
    const preview = await archive.preview(body.sessionId);
    responseJson(res, 200, { ok: true, value: { preview } });
  } catch (error) {
    const code = typeof error === "object" && error !== null && typeof error.code === "string" ? String(error.code) : "preview-failed";
    responseJson(res, error instanceof RangeError ? 413 : 400, { ok: false, error: { code, message: publicMessage(error) } });
  }
}
function apply2(ctx) {
  const archive = new WorkspaceArchive(ctx.workspaceRegistry, ctx.sessionPersistence);
  ctx.provide("workspaceArchive", archive);
  ctx.inject(["webServer"], (webCtx) => {
    const detach = webCtx.webServer.register({
      kind: "exact",
      path: ROUTE,
      handler: (req, res) => {
        void handle(archive, req, res);
      }
    });
    webCtx.effect(() => detach, "dsh-session-archive: route");
  });
}

// vendor/features/skill-mcp-manager/index.js
var skill_mcp_manager_exports = {};
__export(skill_mcp_manager_exports, {
  apply: () => apply3,
  inject: () => inject2,
  name: () => name2
});
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import { spawn } from "node:child_process";

// vendor/features/skill-mcp-manager/oauth-broker.js
import { createHash, randomBytes } from "node:crypto";
import {
  discoverOAuthServerInfo,
  exchangeAuthorization,
  extractWWWAuthenticateParams,
  refreshAuthorization,
  registerClient,
  startAuthorization
} from "@modelcontextprotocol/sdk/client/auth.js";
import { checkResourceAllowed, resourceUrlFromServerUrl } from "@modelcontextprotocol/sdk/shared/auth-utils.js";
var RECORD_SCOPE = "skill-mcp-manager";
var CALLBACK_PATH = "/capabilities-api/mcp/oauth/callback";
var RECORD_VERSION = 1;
var REFRESH_SKEW_MS = 5 * 60 * 1e3;
var HARD_REAUTH_MS = 365 * 24 * 60 * 60 * 1e3;
var DISCOVERY_TTL_MS = 5 * 60 * 1e3;
function randomToken(bytes = 32) {
  return randomBytes(bytes).toString("base64url");
}
function safeUrl(value, label) {
  let parsed;
  try {
    parsed = new URL(String(value));
  } catch {
    throw new Error(label + " \u4E0D\u662F\u5408\u6CD5 URL");
  }
  const loopback = parsed.hostname === "127.0.0.1" || parsed.hostname === "localhost";
  if (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && loopback)) {
    throw new Error(label + " \u5FC5\u987B\u4F7F\u7528 HTTPS\uFF08localhost \u9664\u5916\uFF09");
  }
  if (parsed.username || parsed.password || parsed.hash) throw new Error(label + " \u5305\u542B\u4E0D\u5141\u8BB8\u7684 URL \u6210\u5206");
  return parsed;
}
async function timedFetch(input, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1e4);
  const sourceSignal = init.signal;
  const abort = () => controller.abort();
  if (sourceSignal) sourceSignal.addEventListener("abort", abort, { once: true });
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
    if (sourceSignal) sourceSignal.removeEventListener("abort", abort);
  }
}
function recordKey(issuer, resource) {
  const id = createHash("sha256").update(issuer + "\n" + resource).digest("hex").slice(0, 32);
  return RECORD_SCOPE + "/oauth-" + id;
}
function grantPayload(record) {
  if (!record || record.kind !== "grant") return null;
  const value = record.payload;
  if (!value || value.owner !== RECORD_SCOPE || value.version !== RECORD_VERSION) return null;
  if (typeof value.accessToken !== "string" || typeof value.clientId !== "string") return null;
  return value;
}
function publicGrant(value) {
  if (!value) return { state: "unauthenticated" };
  const now = Date.now();
  const expired = Boolean(
    value.invalidAt || value.reauthAt && value.reauthAt <= now || value.refreshExpiresAt && value.refreshExpiresAt <= now || !value.refreshToken && value.expiresAt && value.expiresAt <= now
  );
  return {
    state: expired ? "expired" : "authorized",
    issuer: value.issuer,
    resource: value.resource,
    expiresAt: value.expiresAt || null,
    reauthAt: value.reauthAt || null
  };
}
function jwtExpiry(token) {
  try {
    const parts = String(token || "").split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    return Number.isFinite(payload.exp) && payload.exp > 0 ? payload.exp * 1e3 : null;
  } catch {
    return null;
  }
}
function clientInformation(value) {
  return {
    client_id: value.clientId,
    ...value.clientSecret ? { client_secret: value.clientSecret } : {},
    ...value.tokenEndpointAuthMethod ? { token_endpoint_auth_method: value.tokenEndpointAuthMethod } : {}
  };
}
function createOAuthBroker(ctx, hooks = {}) {
  const credentials = ctx.get("credentials");
  if (!credentials) throw new Error("skill-mcp-manager OAuth \u9700\u8981 credentials \u670D\u52A1");
  const pending = /* @__PURE__ */ new Map();
  const discoveryCache = /* @__PURE__ */ new Map();
  async function discover(server) {
    const cached = discoveryCache.get(server.url);
    if (cached && cached.expiresAt > Date.now()) return cached.value;
    const serverUrl = safeUrl(server.url, "MCP URL");
    let resourceMetadataUrl;
    try {
      const challenge = await timedFetch(serverUrl, {
        method: "POST",
        headers: {
          Accept: "application/json, text/event-stream",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ jsonrpc: "2.0", id: "oauth-discovery", method: "tools/list" })
      });
      resourceMetadataUrl = extractWWWAuthenticateParams(challenge).resourceMetadataUrl;
      await challenge.body?.cancel();
    } catch {
    }
    const info = await discoverOAuthServerInfo(serverUrl, {
      fetchFn: timedFetch,
      ...resourceMetadataUrl ? { resourceMetadataUrl } : {}
    });
    const authorizationServerUrl = safeUrl(info.authorizationServerUrl, "OAuth issuer");
    const authMetadata = info.authorizationServerMetadata;
    if (!authMetadata) throw new Error("OAuth authorization-server metadata \u4E0D\u5B58\u5728");
    for (const field of ["authorization_endpoint", "token_endpoint", "registration_endpoint"]) {
      if (!authMetadata[field]) throw new Error("OAuth metadata \u7F3A\u5C11 " + field);
      safeUrl(authMetadata[field], field);
    }
    const resourceUrl = info.resourceMetadata?.resource ? safeUrl(info.resourceMetadata.resource, "OAuth resource") : resourceUrlFromServerUrl(serverUrl);
    if (!checkResourceAllowed({ requestedResource: resourceUrlFromServerUrl(serverUrl), configuredResource: resourceUrl })) {
      throw new Error("MCP URL \u4E0D\u5C5E\u4E8E OAuth protected resource");
    }
    const issuer = String(authMetadata.issuer || authorizationServerUrl);
    const resource = String(resourceUrl);
    const scopes = Array.isArray(info.resourceMetadata?.scopes_supported) && info.resourceMetadata.scopes_supported.length ? info.resourceMetadata.scopes_supported : Array.isArray(authMetadata.scopes_supported) ? authMetadata.scopes_supported : [];
    const value = {
      issuer,
      resource,
      scopes,
      authorizationServerUrl: String(authorizationServerUrl),
      authorizationServerMetadata: authMetadata,
      key: recordKey(issuer, resource)
    };
    discoveryCache.set(server.url, { value, expiresAt: Date.now() + DISCOVERY_TTL_MS });
    return value;
  }
  async function read(server) {
    const metadata = await discover(server);
    return { metadata, value: grantPayload(await credentials.readRecord(metadata.key)) };
  }
  function nextGrant(metadata, client, tokens, previous) {
    if (typeof tokens.access_token !== "string" || !tokens.access_token.trim()) {
      throw new Error("OAuth token \u54CD\u5E94\u7F3A\u5C11\u6709\u6548 access_token");
    }
    if (tokens.refresh_token !== void 0 && (typeof tokens.refresh_token !== "string" || !tokens.refresh_token.trim())) {
      throw new Error("OAuth token \u54CD\u5E94\u5305\u542B\u65E0\u6548 refresh_token");
    }
    const now = Date.now();
    const expiresIn = Math.max(1, Number(tokens.expires_in || 3600));
    const nextRefreshToken = String(tokens.refresh_token || previous?.refreshToken || "");
    const refreshExpiresIn = Number(tokens.refresh_token_expires_in || tokens.refresh_expires_in || 0);
    return {
      owner: RECORD_SCOPE,
      version: RECORD_VERSION,
      issuer: metadata.issuer,
      resource: metadata.resource,
      clientId: client.client_id,
      clientSecret: String(client.client_secret || ""),
      tokenEndpointAuthMethod: String(client.token_endpoint_auth_method || "none"),
      accessToken: tokens.access_token,
      refreshToken: nextRefreshToken,
      tokenType: String(tokens.token_type || "Bearer"),
      scope: String(tokens.scope || previous?.scope || ""),
      expiresAt: now + expiresIn * 1e3,
      refreshExpiresAt: refreshExpiresIn > 0 ? now + refreshExpiresIn * 1e3 : jwtExpiry(nextRefreshToken) || previous?.refreshExpiresAt || null,
      invalidAt: null,
      authorizedAt: previous?.authorizedAt || now,
      reauthAt: previous?.reauthAt || now + HARD_REAUTH_MS
    };
  }
  async function register(metadata, callbackUrl) {
    return registerClient(new URL(metadata.authorizationServerUrl), {
      metadata: metadata.authorizationServerMetadata,
      scope: metadata.scopes.join(" ") || void 0,
      fetchFn: timedFetch,
      clientMetadata: {
        client_name: "DeepSeek Harness",
        redirect_uris: [callbackUrl],
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
        token_endpoint_auth_method: "none"
      }
    });
  }
  async function begin(server, callbackOrigin) {
    if (!server || server.transport !== "streamable-http" || server.auth?.type !== "oauth") {
      throw new Error("\u8BE5 MCP \u672A\u914D\u7F6E OAuth");
    }
    const metadata = await discover(server);
    const existing = grantPayload(await credentials.readRecord(metadata.key));
    if (existing && publicGrant(existing).state === "authorized") {
      await hooks.onMetadata?.(server.name, metadata);
      return { authorized: true, status: publicGrant(existing) };
    }
    const origin = safeUrl(callbackOrigin, "DSH callback origin");
    if (origin.protocol !== "http:" || !["127.0.0.1", "localhost"].includes(origin.hostname) || origin.pathname !== "/") {
      throw new Error("OAuth callback origin \u5FC5\u987B\u662F DSH loopback \u6839\u5730\u5740");
    }
    const callbackUrl = new URL(CALLBACK_PATH, origin);
    const client = await register(metadata, callbackUrl);
    const state = randomToken(32);
    const started = await startAuthorization(new URL(metadata.authorizationServerUrl), {
      metadata: metadata.authorizationServerMetadata,
      clientInformation: client,
      redirectUrl: callbackUrl,
      scope: metadata.scopes.join(" ") || void 0,
      state,
      resource: new URL(metadata.resource)
    });
    pending.set(state, {
      state,
      serverName: server.name,
      metadata,
      client,
      verifier: started.codeVerifier,
      callbackUrl: String(callbackUrl),
      expiresAt: Date.now() + 10 * 60 * 1e3
    });
    return { authorized: false, url: String(started.authorizationUrl), expiresAt: Date.now() + 10 * 60 * 1e3 };
  }
  async function callback(requestUrl) {
    const state = requestUrl.searchParams.get("state") || "";
    const transaction = pending.get(state);
    pending.delete(state);
    if (!transaction || transaction.expiresAt <= Date.now()) throw new Error("OAuth \u767B\u5F55\u8BF7\u6C42\u5DF2\u5931\u6548\uFF0C\u8BF7\u91CD\u65B0\u53D1\u8D77");
    if (requestUrl.searchParams.get("error")) throw new Error("OAuth \u6388\u6743\u88AB\u62D2\u7EDD");
    const code = requestUrl.searchParams.get("code");
    if (!code) throw new Error("OAuth callback \u7F3A\u5C11 code");
    const tokens = await exchangeAuthorization(new URL(transaction.metadata.authorizationServerUrl), {
      metadata: transaction.metadata.authorizationServerMetadata,
      clientInformation: transaction.client,
      authorizationCode: code,
      codeVerifier: transaction.verifier,
      redirectUri: transaction.callbackUrl,
      resource: new URL(transaction.metadata.resource),
      fetchFn: timedFetch
    });
    const value = nextGrant(transaction.metadata, transaction.client, tokens);
    await credentials.modifyRecord(transaction.metadata.key, async () => ({ kind: "grant", payload: value }));
    await hooks.onMetadata?.(transaction.serverName, transaction.metadata);
    await hooks.onCredentialChanged?.(transaction.metadata.key);
    return { ok: true };
  }
  async function ensure(server) {
    const metadata = await discover(server);
    let refreshed = false;
    let record;
    try {
      record = await credentials.modifyRecord(metadata.key, async (current) => {
        const value2 = grantPayload(current);
        if (!value2) return void 0;
        const now = Date.now();
        if (value2.reauthAt && value2.reauthAt <= now) throw new Error("OAuth \u6388\u6743\u5DF2\u6EE1 365 \u5929\uFF0C\u8BF7\u91CD\u65B0\u8BA4\u8BC1");
        if (value2.expiresAt && value2.expiresAt > now + REFRESH_SKEW_MS) return void 0;
        if (!value2.refreshToken) throw new Error("OAuth refresh token \u4E0D\u5B58\u5728\uFF0C\u8BF7\u91CD\u65B0\u8BA4\u8BC1");
        if (value2.refreshExpiresAt && value2.refreshExpiresAt <= now) throw new Error("OAuth refresh token \u5DF2\u8FC7\u671F\uFF0C\u8BF7\u91CD\u65B0\u8BA4\u8BC1");
        const tokens = await refreshAuthorization(new URL(metadata.authorizationServerUrl), {
          metadata: metadata.authorizationServerMetadata,
          clientInformation: clientInformation(value2),
          refreshToken: value2.refreshToken,
          resource: new URL(metadata.resource),
          fetchFn: timedFetch
        });
        refreshed = true;
        return { kind: "grant", payload: nextGrant(metadata, clientInformation(value2), tokens, value2) };
      });
    } catch (error) {
      if (error?.errorCode === "invalid_grant") {
        await credentials.modifyRecord(metadata.key, async (current) => {
          const value2 = grantPayload(current);
          return value2 ? { kind: "grant", payload: { ...value2, invalidAt: Date.now() } } : void 0;
        });
      }
      throw error;
    }
    const value = grantPayload(record);
    if (!value) throw new Error("OAuth authentication required\uFF0C\u8BF7\u5728 MCP \u7BA1\u7406\u4E2D\u767B\u5F55");
    return {
      key: metadata.key,
      accessToken: value.accessToken,
      fingerprint: createHash("sha256").update(value.accessToken).digest("hex").slice(0, 16),
      refreshed,
      status: publicGrant(value)
    };
  }
  async function status(server) {
    if (server.transport !== "streamable-http" || server.auth?.type !== "oauth") return { state: "none" };
    try {
      const { metadata, value } = await read(server);
      return { ...publicGrant(value), issuer: metadata.issuer, resource: metadata.resource };
    } catch (error) {
      return { state: "error", error: String(error?.message || error) };
    }
  }
  async function logout(server) {
    const metadata = await discover(server);
    await credentials.deleteRecord(metadata.key);
    await hooks.onCredentialChanged?.(metadata.key);
    return { ok: true };
  }
  function invalidate(serverUrl) {
    discoveryCache.delete(serverUrl);
  }
  function cleanup() {
    pending.clear();
    discoveryCache.clear();
  }
  return { begin, callback, ensure, status, logout, discover, invalidate, cleanup, callbackPath: CALLBACK_PATH };
}

// vendor/features/skill-mcp-manager/index.js
var name2 = "@kiligzzz/dsh-skill-mcp-manager";
var inject2 = ["tools", "skills", "agents", "credentials"];
function apply3(ctx) {
  const dshHome = process.env.DSH_HOME || path.join(os.homedir(), ".dsh");
  const mcpConfigPath = path.join(dshHome, "mcp.json");
  const skillsRoot = path.join(dshHome, "skills");
  const NAME_RE = /^[a-z0-9][a-z0-9-]{0,63}$/;
  function run(argv) {
    return new Promise((resolve, reject) => {
      const child = spawn(argv[0], argv.slice(1), { stdio: "ignore" });
      child.on("error", reject);
      child.on("close", (code) => code === 0 ? resolve() : reject(new Error(argv[0] + " exit " + code)));
    });
  }
  function parseFrontmatter(text) {
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const fm = m ? m[1] : "";
    const body = m ? text.slice(m[0].length) : text;
    const get = (k) => {
      const re = new RegExp("^" + k + "\\s*:\\s*(.+?)\\s*$", "m");
      const r = fm.match(re);
      return r ? r[1].trim() : void 0;
    };
    const raw = get("disable-model-invocation");
    const disabled = raw === "true" || raw === "yes" || raw === "on" || raw === "1";
    return { name: get("name"), description: get("description") || "", whenToUse: get("whenToUse") || "", disabled, fm, body };
  }
  function listSkills() {
    if (!fs.existsSync(skillsRoot)) return [];
    const out = [];
    for (const entry of fs.readdirSync(skillsRoot, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      try {
        const abs = path.join(skillsRoot, entry.name);
        let isDir = entry.isDirectory();
        let isFile = entry.isFile();
        const isLink = entry.isSymbolicLink();
        if (isLink) {
          const st = fs.statSync(abs);
          isDir = st.isDirectory();
          isFile = st.isFile();
        }
        let content = null;
        let kind = null;
        if (isDir) {
          const p = path.join(abs, "SKILL.md");
          if (fs.existsSync(p)) {
            content = fs.readFileSync(p, "utf8");
            kind = "dir";
          }
        } else if (isFile && entry.name.endsWith(".md")) {
          content = fs.readFileSync(abs, "utf8");
          kind = "flat";
        }
        if (content === null) continue;
        const parsed = parseFrontmatter(content);
        let syncedSource;
        if (isLink) {
          try {
            syncedSource = path.dirname(fs.readlinkSync(abs));
          } catch (e) {
            syncedSource = void 0;
          }
        }
        out.push({
          name: parsed.name || entry.name.replace(/\.md$/, ""),
          description: parsed.description || "",
          whenToUse: parsed.whenToUse || "",
          enabled: !parsed.disabled,
          kind,
          synced: isLink,
          syncedSource,
          path: entry.name
        });
      } catch (e) {
      }
    }
    return out;
  }
  function findSkill(name4) {
    return listSkills().find((s) => s.name === name4) || null;
  }
  function isInsideSkillsRoot(candidate) {
    if (typeof candidate !== "string" || candidate.length === 0) return false;
    const root = path.resolve(skillsRoot);
    const target = path.resolve(candidate);
    return target === root || target.startsWith(root + path.sep);
  }
  const sourceLabels = {
    "project-dsh": "\u9879\u76EE .dsh",
    "project-agents": "\u9879\u76EE .agents",
    "user-dsh": "\u7528\u6237 .dsh",
    "user-agents": "\u7528\u6237 .agents",
    custom: "\u81EA\u5B9A\u4E49\u76EE\u5F55",
    bundled: "\u9884\u7F6E",
    runtime: "\u8FD0\u884C\u65F6"
  };
  async function skillCatalog(sessionId) {
    const agent = typeof sessionId === "string" && sessionId.length > 0 ? ctx.agents.get(sessionId) : void 0;
    const signal = AbortSignal.timeout(1e4);
    const snapshot = await ctx.skills.snapshot(agent ? { scope: agent, cwd: agent.session.header.cwd, signal } : { signal });
    const localByName = new Map(listSkills().map((item) => [item.name, item]));
    return {
      complete: snapshot.complete,
      entries: snapshot.skills.map((skill) => {
        const resourcePath = skill.resourceBase && skill.resourceBase.kind === "directory" ? skill.resourceBase.path : "";
        const editable = skill.source === "user-dsh" && isInsideSkillsRoot(resourcePath);
        const local = editable ? localByName.get(skill.name) : void 0;
        return {
          name: skill.name,
          description: skill.description || "",
          whenToUse: skill.whenToUse || "",
          enabled: skill.invocation ? skill.invocation.modelInvocable !== false : true,
          source: skill.source || skill.provider || "runtime",
          sourceLabel: sourceLabels[skill.source] || skill.source || skill.provider || "\u8FD0\u884C\u65F6",
          provider: skill.provider || "",
          resourceBase: resourcePath,
          editable,
          synced: !!local?.synced,
          syncedSource: local?.syncedSource,
          kind: local?.kind || "readonly",
          path: local?.path || ""
        };
      })
    };
  }
  async function requireEditableSkill(name4, sessionId) {
    const catalog2 = await skillCatalog(sessionId);
    const entry = catalog2.entries.find((skill) => skill.name === name4);
    if (!entry) throw new Error("skill \u4E0D\u5B58\u5728: " + name4);
    if (!entry.editable) throw new Error("\u8BE5 Skill \u6765\u81EA\u53EA\u8BFB\u6765\u6E90\uFF0C\u4E0D\u80FD\u4FEE\u6539: " + entry.sourceLabel);
    const local = findSkill(name4);
    if (!local || !isInsideSkillsRoot(path.join(skillsRoot, local.path))) throw new Error("\u7528\u6237 Skill \u8DEF\u5F84\u65E0\u6548");
    return local;
  }
  function setDisabled(text, name4, disabled) {
    const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const body = m ? text.slice(m[0].length) : text;
    let fm = m ? m[1] : "";
    fm = fm.split("\n").filter((l) => !/^[ \t]*disable-model-invocation\s*:/.test(l)).join("\n");
    if (disabled) {
      fm = fm.replace(/\s+$/, "");
      fm = fm + (fm.length ? "\n" : "") + "disable-model-invocation: true";
    }
    if (!/^name\s*:/m.test(fm)) {
      fm = fm.replace(/\s+$/, "");
      fm = "name: " + name4 + "\n" + (fm.length ? fm + "\n" : "");
    }
    return "---\n" + fm.replace(/\s+$/, "") + "\n---\n" + body;
  }
  async function toggleSkill(name4, enabled, sessionId) {
    const f = await requireEditableSkill(name4, sessionId);
    const entryPath = path.join(skillsRoot, f.path);
    const p = f.kind === "dir" ? path.join(entryPath, "SKILL.md") : entryPath;
    fs.writeFileSync(p, setDisabled(fs.readFileSync(p, "utf8"), name4, !enabled));
  }
  async function deleteSkill(name4, sessionId) {
    const f = await requireEditableSkill(name4, sessionId);
    fs.rmSync(path.join(skillsRoot, f.path), { recursive: true, force: true });
  }
  async function importSkill(source) {
    if (typeof source !== "string" || !path.isAbsolute(source)) throw new Error("\u8BF7\u9009\u62E9 Skill \u76EE\u5F55");
    const sourcePath = path.resolve(source);
    const directoryName = path.basename(sourcePath);
    if (directoryName.startsWith(".") || !fs.statSync(sourcePath).isDirectory()) throw new Error("\u8BF7\u9009\u62E9\u6709\u6548\u7684 Skill \u76EE\u5F55");
    const skillFile = path.join(sourcePath, "SKILL.md");
    if (!fs.existsSync(skillFile) || !fs.statSync(skillFile).isFile()) throw new Error("\u6240\u9009\u76EE\u5F55\u6839\u76EE\u5F55\u7F3A\u5C11 SKILL.md");
    const skillName = parseFrontmatter(fs.readFileSync(skillFile, "utf8")).name || directoryName;
    if (findSkill(skillName)) throw new Error("\u5DF2\u5B58\u5728\u540C\u540D Skill: " + skillName);
    fs.mkdirSync(skillsRoot, { recursive: true });
    const destination = path.join(skillsRoot, directoryName);
    const realSource = fs.realpathSync(sourcePath);
    const realDestination = path.join(fs.realpathSync(skillsRoot), directoryName);
    const relative = path.relative(realSource, realDestination);
    if (relative === "" || !relative.startsWith(".." + path.sep) && relative !== ".." && !path.isAbsolute(relative)) {
      throw new Error("\u4E0D\u80FD\u5C06 Skill \u76EE\u5F55\u590D\u5236\u5230\u81EA\u8EAB\u6216\u5176\u5B50\u76EE\u5F55");
    }
    try {
      await fs.promises.mkdir(destination);
    } catch (error) {
      if (error.code === "EEXIST") throw new Error("\u76EE\u6807\u76EE\u5F55\u5DF2\u5B58\u5728: " + destination);
      throw error;
    }
    try {
      for (const entry of await fs.promises.readdir(realSource)) {
        await fs.promises.cp(path.join(realSource, entry), path.join(destination, entry), {
          recursive: true,
          force: false,
          errorOnExist: true,
          verbatimSymlinks: true
        });
      }
      await fs.promises.chmod(destination, (await fs.promises.stat(realSource)).mode & 511);
    } catch (error) {
      await fs.promises.rm(destination, { recursive: true, force: true });
      throw error;
    }
    return { ok: true, name: skillName, path: destination };
  }
  async function syncSkills(source) {
    if (!source) throw new Error("\u8BF7\u586B\u5199\u6E90\u6587\u4EF6\u5939\u8DEF\u5F84");
    if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) throw new Error("\u6E90\u6587\u4EF6\u5939\u4E0D\u5B58\u5728: " + source);
    fs.mkdirSync(skillsRoot, { recursive: true });
    const synced = [];
    const skipped = [];
    for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
      if (entry.name.startsWith(".")) continue;
      let srcAbs = null;
      let dstName = null;
      if (entry.isDirectory()) {
        if (fs.existsSync(path.join(source, entry.name, "SKILL.md"))) {
          srcAbs = path.join(source, entry.name);
          dstName = entry.name;
        } else continue;
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        srcAbs = path.join(source, entry.name);
        dstName = entry.name;
      } else continue;
      const dstAbs = path.join(skillsRoot, dstName);
      if (fs.existsSync(dstAbs)) {
        skipped.push(dstName + "\uFF08\u5DF2\u5B58\u5728\uFF09");
        continue;
      }
      try {
        await run(["ln", "-s", srcAbs, dstAbs]);
        synced.push(dstName);
      } catch (e) {
        skipped.push(dstName);
      }
    }
    return { synced, skipped };
  }
  function openWithSystem(abs) {
    return new Promise((resolve) => {
      const platform = process.platform;
      let cmd = null;
      if (platform === "darwin") cmd = "open";
      else if (platform === "linux") cmd = "xdg-open";
      if (!cmd) {
        resolve(false);
        return;
      }
      const child = spawn(cmd, [abs], { stdio: "ignore", detached: true });
      child.on("error", () => resolve(false));
      child.unref();
      resolve(true);
    });
  }
  function toMapEntry(s) {
    const e = {};
    if (s.transport === "stdio") {
      e.command = s.command || "npx";
      if (s.args && s.args.length) e.args = s.args;
      if (s.env && Object.keys(s.env).length) e.env = s.env;
      if (s.cwd) e.cwd = s.cwd;
    }
    if (s.url) e.url = s.url;
    if (s.headers && Object.keys(s.headers).length) e.headers = s.headers;
    if (s.auth && s.auth.type === "oauth") e.auth = { type: "oauth" };
    const desc = s.description || s.purpose;
    if (desc) e.description = desc;
    if (s.enabled === false) e.enabled = false;
    return e;
  }
  function fromMapEntry(name4, e) {
    return {
      name: name4,
      transport: e.command ? "stdio" : "streamable-http",
      command: e.command || "npx",
      args: e.args || [],
      env: e.env || {},
      cwd: e.cwd || "",
      url: e.url || "",
      headers: e.headers || {},
      auth: e.auth && e.auth.type === "oauth" ? { type: "oauth" } : null,
      enabled: e.enabled !== false,
      description: e.description || ""
    };
  }
  function readServers() {
    try {
      const raw = JSON.parse(fs.readFileSync(mcpConfigPath, "utf8"));
      if (Array.isArray(raw.servers)) {
        const list = raw.servers.map((s) => Object.assign({}, s, { description: s.description || s.purpose || "" }));
        writeServers(list);
        return list;
      }
      if (raw && typeof raw === "object") {
        return Object.keys(raw).map((n) => fromMapEntry(n, raw[n])).filter((s) => s.name);
      }
    } catch (e) {
    }
    return [];
  }
  function writeServers(list) {
    const map = {};
    for (const s of list) map[s.name] = toMapEntry(s);
    fs.mkdirSync(dshHome, { recursive: true });
    fs.writeFileSync(mcpConfigPath, JSON.stringify(map, null, 2));
  }
  const agentStates = /* @__PURE__ */ new WeakMap();
  const activeAgents = /* @__PURE__ */ new Set();
  const pendingOAuthReloads = /* @__PURE__ */ new Set();
  let mcpPlugin = null;
  const oauthBroker = createOAuthBroker(ctx, {
    onCredentialChanged(key) {
      scheduleOAuthReload(key);
    }
  });
  const catalogPath = path.join(dshHome, "mcp-tools-cache.json");
  let catalog = {};
  try {
    const saved = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
    if (saved && typeof saved === "object" && !Array.isArray(saved)) catalog = saved;
  } catch {
  }
  async function refreshCatalog(server) {
    const plugin = await getMcpPlugin();
    const tools = /* @__PURE__ */ new Map();
    let probe;
    try {
      probe = ctx.isolate("tools").plugin({
        name: "mcp-catalog-probe",
        apply(probeCtx) {
          probeCtx.provide("tools", {
            register(definition) {
              const prefix = "mcp__" + server.name + "__";
              tools.set(definition.name, {
                name: definition.name.slice(prefix.length),
                description: definition.description || ""
              });
              return () => tools.delete(definition.name);
            }
          });
        }
      });
      await probe;
      const config = await clientConfig(server);
      const client = probe.ctx.plugin(plugin, {
        ...config,
        reconnect: { enabled: false }
      });
      await client;
      if (client.state !== 2) throw new Error("MCP catalog client did not activate");
      catalog[server.name] = {
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        tools: [...tools.values()].sort((a, b) => a.name.localeCompare(b.name)),
        error: null
      };
    } catch {
      catalog[server.name] = { ...catalog[server.name], error: "\u5DE5\u5177\u6E05\u5355\u5237\u65B0\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u8FDE\u63A5\u914D\u7F6E\u540E\u91CD\u8BD5\u3002" };
    } finally {
      if (probe) await probe.dispose();
    }
    fs.mkdirSync(dshHome, { recursive: true });
    fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), { mode: 384 });
    return { ok: true };
  }
  function stateFor(agent) {
    if (!agent || !agent.ctx || typeof agent.ctx.plugin !== "function") {
      throw new Error("MCP \u4F1A\u8BDD\u5DE5\u5177\u9700\u8981 Agent-backed session");
    }
    let state = agentStates.get(agent);
    if (!state) {
      state = { records: /* @__PURE__ */ new Map(), operations: /* @__PURE__ */ new Set(), status: /* @__PURE__ */ new Map(), disposed: false, disposePromise: null };
      agentStates.set(agent, state);
      activeAgents.add(agent);
    }
    if (state.disposed) throw new Error("Agent \u5DF2\u7ED3\u675F\uFF0C\u4E0D\u80FD\u52A0\u8F7D MCP");
    return state;
  }
  async function getMcpPlugin() {
    if (mcpPlugin) return mcpPlugin;
    const loader = ctx.get("loader");
    if (loader && typeof loader.import === "function") {
      const mod = await loader.import("@deepseek-ai/dsh-mcp-client");
      mcpPlugin = mod && mod.default || mod;
    } else {
      const mod = await import("@deepseek-ai/dsh-mcp-client");
      mcpPlugin = mod && mod.default || mod;
    }
    return mcpPlugin;
  }
  async function clientConfig(s) {
    const base = {
      serverName: s.name,
      toolCallTimeoutMs: 6e4,
      failOnStartupError: true,
      reconnect: { enabled: true, initialDelayMs: 500, maxDelayMs: 3e4, maxAttempts: 10 }
    };
    if (s.transport === "stdio") {
      return Object.assign({}, base, {
        transport: "stdio",
        command: s.command || "npx",
        args: Array.isArray(s.args) ? s.args : [],
        env: s.env || {},
        cwd: s.cwd || ""
      });
    }
    const headers = Object.assign({}, s.headers || {});
    if (s.auth && s.auth.type === "oauth") {
      for (const key of Object.keys(headers)) {
        if (key.toLowerCase() === "authorization") delete headers[key];
      }
      const grant = await oauthBroker.ensure(s);
      if (grant.refreshed) scheduleOAuthReload(grant.key);
      headers.Authorization = "Bearer " + grant.accessToken;
    }
    return Object.assign({}, base, { transport: "streamable-http", url: s.url || "", headers });
  }
  function listMcpTools(name4, agent) {
    try {
      const prefix = "mcp__" + name4 + "__";
      return ctx.tools.schemas(agent).filter((t) => typeof t.name === "string" && t.name.startsWith(prefix)).map((t) => ({ name: t.name.slice(prefix.length), description: t.description || "" })).sort((a, b) => a.name.localeCompare(b.name));
    } catch (e) {
      return [];
    }
  }
  function recordFor(state, name4) {
    let record = state.records.get(name4);
    if (!record) {
      record = { generation: 0, fiber: null, operation: Promise.resolve(), loadPromise: null, queued: 0, wanted: false };
      state.records.set(name4, record);
    }
    return record;
  }
  function queueServer(agent, name4, operation) {
    const state = agentStates.get(agent);
    if (!state) return Promise.resolve({ name: name4, state: "unloaded", tools: [] });
    const record = recordFor(state, name4);
    record.queued += 1;
    const task = record.operation.catch(() => {
    }).then(async () => {
      try {
        return await operation(record);
      } finally {
        record.queued -= 1;
      }
    });
    record.operation = task;
    state.operations.add(task);
    task.then(
      () => state.operations.delete(task),
      () => state.operations.delete(task)
    );
    return task;
  }
  async function disposeFiber(fiber) {
    if (!fiber || typeof fiber.dispose !== "function") return;
    try {
      await fiber.dispose();
    } catch (e) {
    }
  }
  function unmountServer(agent, name4, keepWanted = false) {
    const state = agentStates.get(agent);
    if (!state) return Promise.resolve({ name: name4, state: "unloaded", tools: [] });
    const record = recordFor(state, name4);
    record.generation += 1;
    record.loadPromise = null;
    if (!keepWanted) record.wanted = false;
    return queueServer(agent, name4, async (current) => {
      const fiber = current.fiber;
      current.fiber = null;
      await disposeFiber(fiber);
      state.status.delete(name4);
      return { name: name4, state: "unloaded", tools: [] };
    });
  }
  async function mountServer(agent, server, mode = "load") {
    const state = stateFor(agent);
    const s = server;
    if (!s || !s.name) throw new Error("MCP server \u4E0D\u5B58\u5728");
    const record = recordFor(state, s.name);
    if (mode === "load") record.wanted = true;
    else if (!record.wanted) return { name: s.name, state: "unloaded", tools: [] };
    if (!s.enabled) {
      await unmountServer(agent, s.name, true);
      if (!state.disposed) state.status.set(s.name, { state: "disabled", error: null });
      return { name: s.name, state: "disabled", tools: [] };
    }
    if (record.loadPromise) return record.loadPromise;
    if (record.fiber || record.queued > 0) {
      if (record.queued > 0) {
        return record.operation.then(() => mountServer(agent, s, mode));
      }
      return { name: s.name, state: state.status.get(s.name)?.state || "mounted", tools: listMcpTools(s.name, agent) };
    }
    const generation = ++record.generation;
    const task = queueServer(agent, s.name, async (current) => {
      let fiber = null;
      state.status.set(s.name, { state: "mounting", error: null, generation });
      try {
        const plugin = await getMcpPlugin();
        if (!plugin) throw new Error("\u65E0\u6CD5\u52A0\u8F7D @deepseek-ai/dsh-mcp-client");
        if (state.disposed || current.generation !== generation) return { name: s.name, state: "disposed", tools: [] };
        fiber = agent.ctx.plugin(plugin, await clientConfig(s));
        current.fiber = fiber;
        await fiber;
        if (state.disposed || current.generation !== generation) {
          if (current.fiber === fiber) current.fiber = null;
          await disposeFiber(fiber);
          return { name: s.name, state: "disposed", tools: [] };
        }
        state.status.set(s.name, { state: "mounted", error: null });
        return { name: s.name, state: "mounted", tools: listMcpTools(s.name, agent) };
      } catch (err) {
        if (fiber) {
          if (current.fiber === fiber) current.fiber = null;
          await disposeFiber(fiber);
        }
        if (state.disposed || current.generation !== generation) return { name: s.name, state: "disposed", tools: [] };
        const error = String(err && err.message || err);
        state.status.set(s.name, { state: "error", error });
        return { name: s.name, state: "error", error, tools: [] };
      }
    });
    record.loadPromise = task;
    task.then(
      () => {
        if (record.loadPromise === task) record.loadPromise = null;
      },
      () => {
        if (record.loadPromise === task) record.loadPromise = null;
      }
    );
    return task;
  }
  function clearAgent(agent) {
    const state = agentStates.get(agent);
    if (!state) return Promise.resolve();
    if (state.disposePromise) return state.disposePromise;
    if (state.disposed) return Promise.resolve();
    state.disposed = true;
    state.disposePromise = (async () => {
      for (const record of state.records.values()) {
        record.generation += 1;
        record.loadPromise = null;
      }
      const disposals = [...state.records.values()].map(async (record) => {
        const fiber = record.fiber;
        record.fiber = null;
        await disposeFiber(fiber);
      });
      await Promise.allSettled([...state.operations, ...disposals]);
      state.status.clear();
      activeAgents.delete(agent);
    })();
    return state.disposePromise;
  }
  async function reloadActiveServer(server) {
    for (const agent of [...activeAgents]) {
      const state = agentStates.get(agent);
      const record = state?.records.get(server.name);
      if (!record?.wanted || state.disposed) continue;
      await unmountServer(agent, server.name, true);
      if (!state.disposed) await mountServer(agent, server, "reload");
    }
  }
  async function reloadOAuthKey(key) {
    for (const server of readServers()) {
      if (!server.auth || server.auth.type !== "oauth") continue;
      try {
        const metadata = await oauthBroker.discover(server);
        if (metadata.key === key) await reloadActiveServer(server);
      } catch {
      }
    }
  }
  function scheduleOAuthReload(key) {
    if (pendingOAuthReloads.has(key)) return;
    pendingOAuthReloads.add(key);
    queueMicrotask(() => {
      runConfigSync(() => reloadOAuthKey(key)).catch(() => {
      }).finally(() => pendingOAuthReloads.delete(key));
    });
  }
  async function refreshOAuthCredentials() {
    for (const server of readServers()) {
      if (!server.enabled || !server.auth || server.auth.type !== "oauth") continue;
      try {
        const grant = await oauthBroker.ensure(server);
        if (grant.refreshed) scheduleOAuthReload(grant.key);
      } catch {
      }
    }
  }
  async function sessionMcp(args, exec) {
    const agent = exec.agent;
    const state = stateFor(agent);
    const names = Array.isArray(args.servers) ? [...new Set(args.servers.map(String))] : [];
    const configured = new Map(readServers().map((s) => [s.name, s]));
    if (args.action === "status") {
      const results2 = [...state.status.entries()].map(([name4, item]) => ({
        name: name4,
        state: item.state,
        error: item.error || null,
        tools: listMcpTools(name4, agent).length
      }));
      return {
        action: "status",
        results: results2,
        loaded: results2.filter((item) => item.state === "mounted").map((item) => item.name)
      };
    }
    if (names.length === 0) throw new Error("servers \u4E0D\u80FD\u4E3A\u7A7A\uFF1B\u53EF\u5148\u8C03\u7528 status \u67E5\u770B\u5DF2\u52A0\u8F7D MCP");
    if (args.action === "load") {
      const missing = names.filter((name4) => !configured.has(name4));
      if (missing.length) throw new Error("MCP server \u4E0D\u5B58\u5728: " + missing.join(", "));
    }
    const results = [];
    for (const name4 of names) {
      if (args.action === "load") {
        results.push(await mountServer(agent, configured.get(name4)));
      } else if (args.action === "unload") {
        await unmountServer(agent, name4);
        results.push({ name: name4, state: "unloaded", tools: [] });
      }
    }
    return {
      action: args.action,
      results,
      loaded: [...state.status.entries()].filter(([, item]) => item.state === "mounted").map(([name4]) => name4)
    };
  }
  const mcpSessionTool = {
    name: "mcp_session",
    description: "Manage MCP servers for the current session. The initial prompt exposes only each configured server name and description. When a task needs database, logs, Nacos, Redis, repositories, Wiki, Feishu, CI/CD, or PopFlow capabilities and the corresponding native tools are not visible, you MUST load the matching MCP server first. Use action=load, unload, or status; loading exposes all tools from that server in the next model step. This never changes the global ~/.dsh/mcp.json configuration.",
    parameters: {
      type: "object",
      properties: {
        action: { type: "string", enum: ["load", "unload", "status"] },
        servers: {
          type: "array",
          description: "MCP server names from the capability directory. Omit for status.",
          items: { type: "string" }
        }
      },
      required: ["action"],
      additionalProperties: false
    },
    output: {
      schema: {
        type: "object",
        properties: {
          action: { type: "string" },
          results: { type: "array", items: { type: "object", additionalProperties: true } },
          loaded: { type: "array", items: { type: "string" } }
        },
        additionalProperties: false
      },
      render: (_args, value) => [{ type: "text", text: JSON.stringify(value, null, 2) }]
    },
    async execute(args, exec) {
      if (!args || !["load", "unload", "status"].includes(args.action)) throw new Error("action \u5FC5\u987B\u662F load\u3001unload \u6216 status");
      if (args.servers !== void 0 && (!Array.isArray(args.servers) || args.servers.some((item) => typeof item !== "string"))) {
        throw new Error("servers \u5FC5\u987B\u662F MCP server \u540D\u79F0\u6570\u7EC4");
      }
      return sessionMcp(args, exec);
    },
    presentCall(args) {
      return { card: "generic", title: "Manage session MCP", kind: "read", rawInput: JSON.stringify(args) };
    }
  };
  ctx.tools.register(mcpSessionTool);
  ctx.on("agent/disposed", ({ agent }) => clearAgent(agent));
  ctx.on("session/disposed", (session) => Promise.allSettled(
    [...activeAgents].filter((agent) => agent.session === session).map((agent) => clearAgent(agent))
  ));
  let lastVersion = null;
  let configSync = Promise.resolve();
  let nextOAuthRefreshAt = Date.now() + 6e4;
  let shuttingDown = false;
  function runConfigSync(operation) {
    const task = configSync.catch(() => {
    }).then(operation);
    configSync = task.then(() => {
    }, () => {
    });
    return task;
  }
  function configVersion() {
    try {
      return fs.statSync(mcpConfigPath).mtimeMs + ":" + fs.statSync(mcpConfigPath).size;
    } catch (e) {
      return "absent";
    }
  }
  async function reconcileActiveServers() {
    const configured = new Map(readServers().map((server) => [server.name, server]));
    for (const agent of [...activeAgents]) {
      const state = agentStates.get(agent);
      if (!state || state.disposed) continue;
      for (const [name4, record] of [...state.records]) {
        if (!record.wanted) continue;
        const server = configured.get(name4);
        if (!server) {
          await unmountServer(agent, name4);
          continue;
        }
        await unmountServer(agent, name4, true);
        if (!state.disposed) await mountServer(agent, server, "reload");
      }
    }
  }
  function pollConfig() {
    if (shuttingDown) return;
    const now = Date.now();
    if (now >= nextOAuthRefreshAt) {
      nextOAuthRefreshAt = now + 6e4;
      runConfigSync(() => refreshOAuthCredentials());
    }
    const version = configVersion();
    if (lastVersion === null) {
      lastVersion = version;
      return;
    }
    if (version === lastVersion) return;
    lastVersion = version;
    refreshSection();
    runConfigSync(() => reconcileActiveServers());
  }
  const pollTimer = setInterval(pollConfig, 3e3);
  ctx.effect(() => () => clearInterval(pollTimer));
  let sectionDispose = null;
  function refreshSection() {
    try {
      if (sectionDispose) {
        sectionDispose();
        sectionDispose = null;
      }
      const sys = ctx.get("systemPrompt");
      if (!sys) return;
      const servers = readServers();
      const lines = [];
      lines.push("Lazy MCP directory \u2014 server descriptions are always available; native MCP tools are loaded only for the current session when needed.");
      if (!servers.length) {
        lines.push("- none configured. Configure them in Settings \u2192 MCP.");
      } else {
        for (const s of servers) {
          lines.push("- MCP " + s.name + ": " + (s.description || s.transport) + " (" + (s.enabled ? "available for session load" : "disabled") + ")");
        }
        lines.push("If a task needs one of these capabilities and its native tools are not visible, call mcp_session with action=load and the exact server name.");
      }
      sectionDispose = sys.section({ name: "capability:mcp", order: 15, text: lines.join("\n") });
    } catch (e) {
    }
  }
  const service = {
    configPath: mcpConfigPath,
    skillsRoot,
    async listSkills(sessionId) {
      return skillCatalog(sessionId);
    },
    async toggleSkill(name4, enabled, sessionId) {
      await toggleSkill(String(name4), !!enabled, sessionId);
      return { ok: true };
    },
    async deleteSkill(name4, sessionId) {
      await deleteSkill(String(name4), sessionId);
      return { ok: true };
    },
    async importSkill(source) {
      return importSkill(source);
    },
    async syncSkills(source) {
      return syncSkills(String(source || "").trim());
    },
    async openSkill(name4, sessionId) {
      const f = await requireEditableSkill(String(name4), sessionId);
      const entryPath = path.join(skillsRoot, f.path);
      const ok = await openWithSystem(f.kind === "dir" ? path.join(entryPath, "SKILL.md") : entryPath);
      if (!ok) throw new Error("\u5F53\u524D\u5E73\u53F0\u4E0D\u652F\u6301\u6253\u5F00\u6587\u4EF6\uFF08\u4EC5 macOS / Linux\uFF09");
      return { ok: true };
    },
    async openSkillsDirectory() {
      fs.mkdirSync(skillsRoot, { recursive: true });
      const ok = await openWithSystem(skillsRoot);
      if (!ok) throw new Error("\u5F53\u524D\u5E73\u53F0\u4E0D\u652F\u6301\u6253\u5F00\u76EE\u5F55\uFF08\u4EC5 macOS / Linux\uFF09");
      return { ok: true };
    },
    async listServers() {
      const servers = await Promise.all(readServers().map(async (s) => Object.assign({}, s, {
        tools: catalog[s.name]?.tools || [],
        catalog: { updatedAt: catalog[s.name]?.updatedAt || null, error: catalog[s.name]?.error || null },
        status: { state: s.enabled ? "available" : "disabled", error: null, tools: 0, scope: "session" },
        oauth: await oauthBroker.status(s)
      })));
      return { servers };
    },
    async saveServer(server) {
      return runConfigSync(async () => {
        const s = server || {};
        if (!s.name || !NAME_RE.test(String(s.name))) throw new Error("server \u540D\u79F0\u9700\u4E3A kebab-case");
        const name4 = String(s.name);
        if (s.auth && s.auth.type === "oauth" && s.transport !== "streamable-http") {
          throw new Error("OAuth \u4EC5\u652F\u6301 streamable-http MCP");
        }
        const clean = {
          name: name4,
          transport: s.transport === "stdio" ? "stdio" : "streamable-http",
          command: s.command || "npx",
          args: Array.isArray(s.args) ? s.args : [],
          env: s.env || {},
          cwd: s.cwd || "",
          url: s.url || "",
          headers: s.headers || {},
          auth: s.auth && s.auth.type === "oauth" ? { type: "oauth" } : null,
          enabled: !!s.enabled,
          description: s.description || s.purpose || ""
        };
        const list = readServers();
        const i = list.findIndex((x) => x.name === name4);
        if (i >= 0) {
          if (list[i].url && list[i].url !== clean.url) oauthBroker.invalidate(list[i].url);
          list[i] = clean;
        } else list.push(clean);
        writeServers(list);
        lastVersion = configVersion();
        for (const agent of activeAgents) {
          const state = agentStates.get(agent);
          const record = state?.records.get(name4);
          if (!record?.wanted) continue;
          await unmountServer(agent, name4, true);
          if (!state.disposed) await mountServer(agent, clean, "reload");
        }
        if (clean.enabled) await refreshCatalog(clean);
        refreshSection();
        return { ok: true };
      });
    },
    async removeServer(name4) {
      return runConfigSync(async () => {
        const serverName = String(name4);
        const existing = readServers().find((s) => s.name === serverName);
        if (existing?.url) oauthBroker.invalidate(existing.url);
        const list = readServers().filter((s) => s.name !== serverName);
        writeServers(list);
        delete catalog[serverName];
        fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), { mode: 384 });
        lastVersion = configVersion();
        for (const agent of activeAgents) {
          const state = agentStates.get(agent);
          if (state?.records.has(serverName)) await unmountServer(agent, serverName);
        }
        refreshSection();
        return { ok: true };
      });
    },
    async oauthLogin(name4, callbackOrigin) {
      const server = readServers().find((item) => item.name === String(name4));
      if (!server) throw new Error("MCP server \u4E0D\u5B58\u5728");
      return oauthBroker.begin(server, callbackOrigin);
    },
    async oauthLogout(name4) {
      const server = readServers().find((item) => item.name === String(name4));
      if (!server) throw new Error("MCP server \u4E0D\u5B58\u5728");
      await oauthBroker.logout(server);
      return { ok: true };
    },
    async refreshServer(name4) {
      return runConfigSync(async () => {
        const serverName = String(name4);
        const server = readServers().find((item) => item.name === serverName);
        for (const agent of activeAgents) {
          const state = agentStates.get(agent);
          const record = state?.records.get(serverName);
          if (record?.wanted) {
            await unmountServer(agent, serverName, true);
            if (server && !state.disposed) await mountServer(agent, server, "reload");
          }
        }
        refreshSection();
        return { ok: true };
      });
    },
    async openConfig() {
      writeServers(readServers());
      const ok = await openWithSystem(mcpConfigPath);
      if (!ok) throw new Error("\u5F53\u524D\u5E73\u53F0\u4E0D\u652F\u6301\u6253\u5F00\u6587\u4EF6\uFF08\u4EC5 macOS / Linux\uFF09");
      return { ok: true };
    }
  };
  ctx.provide("capabilityManager", service);
  const send = (res, code, data) => {
    try {
      res.writeHead(code, { "Content-Type": "application/json" });
      res.end(JSON.stringify(data));
    } catch (e) {
    }
  };
  const sendOAuthPage = (res, code, title, message) => {
    const escape = (value) => String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
    const html = '<!doctype html><meta charset="utf-8"><title>' + escape(title) + '</title><main style="font-family:system-ui;padding:32px;max-width:560px;margin:auto"><h1>' + escape(title) + "</h1><p>" + escape(message) + "</p><p>\u53EF\u4EE5\u5173\u95ED\u6B64\u7A97\u53E3\u5E76\u8FD4\u56DE DSH\u3002</p></main>";
    res.writeHead(code, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
      "Cache-Control": "no-store"
    });
    res.end(html);
  };
  const readBody = (req) => new Promise((resolve, reject) => {
    let buf = "";
    req.on("data", (c) => {
      buf += c;
      if (buf.length > 2e6) {
        req.destroy();
        reject(new Error("body too large"));
      }
    });
    req.on("end", () => {
      try {
        resolve(buf ? JSON.parse(buf) : {});
      } catch (e) {
        reject(new Error("\u8BF7\u6C42\u4F53\u4E0D\u662F\u5408\u6CD5 JSON"));
      }
    });
    req.on("error", reject);
  });
  const requestLoopbackOrigin = (req) => {
    const address = String(req.socket?.localAddress || "");
    const loopback = address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
    const port = Number(req.socket?.localPort);
    if (!loopback || !Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error("OAuth \u767B\u5F55\u53EA\u5141\u8BB8\u901A\u8FC7 DSH \u672C\u673A Web \u754C\u9762\u53D1\u8D77");
    }
    return "http://127.0.0.1:" + port;
  };
  const restHandler = async (req, res) => {
    try {
      const requestUrl = new URL(req.url || "/", "http://localhost");
      const pathname = decodeURIComponent(requestUrl.pathname);
      const sessionId = requestUrl.searchParams.get("sessionId") || void 0;
      if (req.method === "GET" && pathname === oauthBroker.callbackPath) {
        try {
          await oauthBroker.callback(requestUrl);
          return sendOAuthPage(res, 200, "MCP \u8BA4\u8BC1\u5B8C\u6210", "OAuth \u51ED\u636E\u5DF2\u5B89\u5168\u4FDD\u5B58\u3002");
        } catch (error) {
          return sendOAuthPage(res, 400, "MCP \u8BA4\u8BC1\u5931\u8D25", String(error?.message || error));
        }
      }
      if (req.method === "GET" && pathname === "/capabilities-api/skills") {
        const skills = await service.listSkills(sessionId);
        return send(res, 200, { ok: true, skills: { catalog: skills.entries, complete: skills.complete } });
      }
      if (req.method === "GET" && pathname === "/capabilities-api") {
        const skills = await service.listSkills(sessionId);
        const servers = await service.listServers();
        return send(res, 200, { ok: true, dshHome, mcpConfigPath, skills: { catalog: skills.entries, complete: skills.complete }, mcp: servers });
      }
      if (req.method === "POST") {
        const body = await readBody(req);
        let out;
        switch (pathname) {
          case "/capabilities-api/skill/toggle":
            out = await service.toggleSkill(body.name, body.enabled, body.sessionId);
            break;
          case "/capabilities-api/skill/open":
            out = await service.openSkill(body.name, body.sessionId);
            break;
          case "/capabilities-api/skill/open-directory":
            out = await service.openSkillsDirectory();
            break;
          case "/capabilities-api/skill/delete":
            out = await service.deleteSkill(body.name, body.sessionId);
            break;
          case "/capabilities-api/skill/import":
            out = await service.importSkill(body.source);
            break;
          case "/capabilities-api/skill/sync":
            out = await service.syncSkills(body.source);
            break;
          case "/capabilities-api/mcp/save":
            out = await service.saveServer(body.server);
            break;
          case "/capabilities-api/mcp/remove":
            out = await service.removeServer(body.name);
            break;
          case "/capabilities-api/mcp/refresh":
            out = await service.refreshServer(body.name);
            break;
          case "/capabilities-api/mcp/oauth/login":
            out = await service.oauthLogin(body.name, requestLoopbackOrigin(req));
            break;
          case "/capabilities-api/mcp/oauth/logout":
            out = await service.oauthLogout(body.name);
            break;
          case "/capabilities-api/mcp/catalog": {
            out = await runConfigSync(async () => {
              const server = readServers().find((item) => item.name === body.name);
              if (!server) throw new Error("MCP server \u4E0D\u5B58\u5728");
              return refreshCatalog(server);
            });
            break;
          }
          case "/capabilities-api/mcp/open-config":
            out = await service.openConfig();
            break;
          default:
            return send(res, 404, { ok: false, error: "not found: " + pathname });
        }
        return send(res, 200, Object.assign({ ok: true }, out));
      }
      send(res, 405, { ok: false, error: "method not allowed" });
    } catch (e) {
      send(res, 400, { ok: false, error: String(e && e.message || e) });
    }
  };
  let restStopped = false;
  const tryRegisterRest = () => {
    if (restStopped) return;
    const ws = ctx.get("webServer");
    if (!ws || typeof ws.register !== "function") return;
    try {
      const routeDispose = ws.register({ kind: "prefix", path: "/capabilities-api", handler: restHandler });
      restStopped = true;
      ctx.effect(() => () => {
        try {
          routeDispose();
        } catch (e) {
        }
      });
    } catch (e) {
    }
  };
  const restTimer = setInterval(tryRegisterRest, 500);
  ctx.effect(() => () => {
    restStopped = true;
    clearInterval(restTimer);
  });
  tryRegisterRest();
  refreshSection();
  ctx.effect(() => async () => {
    shuttingDown = true;
    await configSync.catch(() => {
    });
    await Promise.allSettled([...activeAgents].map((agent) => clearAgent(agent)));
    oauthBroker.cleanup();
    if (sectionDispose) {
      try {
        sectionDispose();
      } catch (e) {
      }
    }
  });
}

// src/vision-tools.js
var VISION_TOOL_NAMES = Object.freeze([
  "describe_image",
  "vision_ground",
  "vision_compare",
  "vision_ocr"
]);
var allowedVisionTools = new Set(VISION_TOOL_NAMES);
function hardenedDefinition(definition) {
  if (definition.name !== "describe_image") return definition;
  const properties = { ...definition.parameters?.properties ?? {} };
  delete properties.urls;
  const parameters = {
    ...definition.parameters,
    properties,
    ...Array.isArray(definition.parameters?.required) ? { required: definition.parameters.required.filter((name4) => name4 !== "urls") } : {}
  };
  return {
    ...definition,
    description: "Describe conversation attachments or workspace image paths with the configured vision model.",
    parameters,
    async execute(args, exec) {
      if (Array.isArray(args?.urls) && args.urls.length > 0) {
        throw new Error("describe_image URL input is disabled; use an attachment id or workspace path");
      }
      const { urls: _urls, ...safeArgs } = args ?? {};
      return definition.execute(safeArgs, exec);
    }
  };
}
function createVisionToolFacade(innerCtx, upstreamTools) {
  return {
    register(definition) {
      if (!allowedVisionTools.has(definition.name)) return () => {
      };
      const forwarded = hardenedDefinition(definition);
      return innerCtx.effect(
        () => upstreamTools.register(forwarded),
        `dsh-kiligz-base: vision tool ${definition.name}`
      );
    }
  };
}
function mountVisionBridge(ctx, visionBridge2, config = {}) {
  const upstreamTools = ctx.tools;
  const visionCtx = ctx.isolate("tools");
  visionCtx.plugin({
    name: "@kiligzzz/dsh-kiligz-base/vision-tools",
    apply(innerCtx) {
      innerCtx.provide("tools", createVisionToolFacade(innerCtx, upstreamTools));
    }
  });
  return visionCtx.plugin(visionBridge2, { mode: "hybrid", ...config });
}

// src/index.js
var name3 = "@kiligzzz/dsh-kiligz-base";
var inject3 = ["tools"];
var AUTOMATION_DEFAULTS = {
  runTimeoutMinutes: 60,
  misfireGraceMinutes: 15,
  historyLimit: 200
};
function apply4(ctx, config = {}) {
  ctx.plugin(automation, { ...AUTOMATION_DEFAULTS, ...config.automation });
  ctx.plugin(lib_exports);
  ctx.plugin(lib_exports2);
  ctx.plugin(skill_mcp_manager_exports);
  mountVisionBridge(ctx, visionBridge, config.visionBridge);
}
export {
  apply4 as apply,
  inject3 as inject,
  name3 as name
};
