// src/index.ts
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
function apply(ctx) {
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
export {
  ROUTE,
  WorkspaceArchive,
  apply,
  inject,
  name
};
//# sourceMappingURL=index.js.map
