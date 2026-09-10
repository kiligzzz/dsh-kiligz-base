var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name4 in all)
    __defProp(target, name4, { get: all[name4], enumerable: true });
};

// src/index.js
import * as automation from "@michengai/dsh-automation";
import * as autoContinue from "dsh-client-auto-continue";
import * as visionBridge from "@goodandready/dsh-vision-bridge";
import * as betterSidebar from "dsh-better-sidebar";

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
import { rm } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";
var ROUTE = "/_dsh/session-archive";
var name = "@kiligzzz/dsh-session-archive";
var inject = ["workspaceRegistry", "sessions", "sessionPersistence"];
var MAX_BODY = 64 * 1024;
function sessionRoot() {
  const home = process.env.DSH_HOME?.length > 0 ? process.env.DSH_HOME : join(homedir(), ".dsh");
  return join(home, "sessions");
}
function projectKey(cwd) {
  if (cwd.length === 0) throw new Error("cannot encode an empty project path");
  let readable = "";
  let separatorRun = false;
  for (let i = 0; i < cwd.length; i++) {
    const code = cwd.charCodeAt(i);
    const ch = String.fromCharCode(code);
    if (ch === "/" || ch === "\\" || ch === ":") {
      if (!separatorRun) readable += "-";
      separatorRun = true;
    } else if (ch !== "~" && /^[A-Za-z0-9._-]$/.test(ch)) {
      readable += ch;
      separatorRun = false;
    } else {
      readable += `~${code.toString(16).toUpperCase().padStart(4, "0")}`;
      separatorRun = false;
    }
  }
  return `--${(readable.replace(/^-+/, "") || "root").slice(0, 251)}--`;
}
function encodeSegment(raw) {
  if (raw.length === 0) throw new Error("cannot encode an empty path segment");
  if (raw === ".") return "~002E";
  if (raw === "..") return "~002E~002E";
  let out = "";
  for (let i = 0; i < raw.length; i++) {
    const code = raw.charCodeAt(i);
    const ch = String.fromCharCode(code);
    if (ch !== "~" && /^[A-Za-z0-9._-]$/.test(ch)) out += ch;
    else out += `~${code.toString(16).toUpperCase().padStart(4, "0")}`;
  }
  return out;
}
function sessionDirectory(cwd, sessionId) {
  return join(sessionRoot(), projectKey(cwd), encodeSegment(sessionId));
}
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
    const t = text.trim();
    if (t.length === 0) return;
    lines.push(t.length > cap ? `${t.slice(0, cap)}\u2026` : t);
  };
  if (Array.isArray(value)) {
    for (const block of value) push(blockText(block));
  } else {
    push(value);
  }
  return lines.slice(0, limit);
}
var WorkspaceArchive = class {
  constructor(registry, sessions, persistence) {
    this.registry = registry;
    this.sessions = sessions;
    this.persistence = persistence;
  }
  /** Archived ids in host order. */
  list() {
    return this.registry.requireState().archivedSessionIds;
  }
  /**
   * Read a read-only preview of a session's log: metadata plus every user
   * question rendered as plain text (newest first). Purely observational —
   * never mutates the archived set or workspace accounting, so the user can
   * inspect the questions before deciding to restore or delete.
   * @param sessionId - session to preview.
   * @returns metadata and the user-question list.
   */
  async preview(sessionId) {
    if (typeof sessionId !== "string" || sessionId.length === 0) throw new TypeError("sessionId must be a non-empty string");
    const { meta, events } = await this.persistence.readFrom(sessionId, 0);
    let title = typeof meta.title === "string" && meta.title.length > 0 ? meta.title : void 0;
    for (let i = events.length - 1; i >= 0; i--) {
      if (events[i].type === "session/title") {
        const data = events[i].data ?? {};
        if (typeof data.title === "string" && data.title.length > 0) {
          title = data.title;
          break;
        }
      }
    }
    const questions = [];
    const QUESTION_LIMIT = 100;
    for (let i = events.length - 1; i >= 0 && questions.length < QUESTION_LIMIT; i--) {
      const event = events[i];
      if (event.type !== "user/message") continue;
      const data = event.data ?? {};
      const source = isRecord(data.source) ? data.source : void 0;
      const sourceKind = typeof source?.kind === "string" ? source.kind : "user";
      if (sourceKind !== "user") continue;
      questions.unshift({ seq: event.seq, text: contentLines(data.content) });
    }
    return {
      title,
      cwd: typeof meta.cwd === "string" ? meta.cwd : void 0,
      questions
    };
  }
  /**
   * Remove one session from the durable archived set. Idempotent: an id that
   * is not archived resolves without writing. Serialized through the registry
   * write chain so it cannot interleave with an in-flight archive.
   * @param sessionId - session to restore.
   */
  async restore(sessionId) {
    if (typeof sessionId !== "string" || sessionId.length === 0) throw new TypeError("sessionId must be a non-empty string");
    return this.registry.enqueueOperation(async () => {
      const state = this.registry.requireState();
      const archived = state.archivedSessionIds;
      if (!archived.includes(sessionId)) return false;
      await this.registry.setState({
        ...state,
        archivedSessionIds: archived.filter((id) => id !== sessionId)
      });
      return true;
    });
  }
  /**
   * Permanently delete an archived session: unarchive it, detach its workspace
   * accounting, and remove its on-disk log directory. Refuses live sessions.
   * @param sessionId - session to delete.
   * @returns a summary of what was removed.
   */
  async deleteSession(sessionId) {
    if (typeof sessionId !== "string" || sessionId.length === 0) throw new TypeError("sessionId must be a non-empty string");
    if (this.sessions.get(sessionId) !== void 0) {
      const error = new Error(`cannot delete live session '${sessionId}'`);
      error.code = "delete-live";
      throw error;
    }
    let workspace;
    for (const candidate of this.registry.list()) {
      if (candidate.sessionIds.includes(sessionId)) {
        workspace = candidate;
        break;
      }
    }
    let cwd;
    if (workspace !== void 0) cwd = workspace.path;
    else {
      try {
        const inspection = await this.persistence.inspect(sessionId);
        cwd = inspection.meta?.cwd;
      } catch {
        cwd = void 0;
      }
    }
    const outcome = await this.registry.enqueueOperation(async () => {
      const state = this.registry.requireState();
      const archived = state.archivedSessionIds;
      const archivedNow = archived.includes(sessionId);
      if (archivedNow) {
        await this.registry.setState({
          ...state,
          archivedSessionIds: archived.filter((id) => id !== sessionId)
        });
      }
      if (workspace !== void 0) {
        await workspace.detachSession(sessionId);
      }
      return { archived: archivedNow, detached: workspace !== void 0 };
    });
    let removed = false;
    let path2;
    if (cwd !== void 0) {
      path2 = sessionDirectory(cwd, sessionId);
      try {
        await rm(path2, { recursive: true, force: true });
        removed = true;
      } catch {
        removed = false;
      }
    }
    return { ...outcome, removed, path: path2 };
  }
};
async function handle(archive, req, res) {
  if (req.method === "GET") {
    responseJson(res, 200, { ok: true, value: { archivedSessionIds: archive.list() } });
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
  let parsed;
  try {
    const body = await readJson(req);
    if (!isRecord(body) || body.action !== "restore" && body.action !== "delete" && body.action !== "preview") {
      throw new TypeError('action must be "restore", "delete", or "preview"');
    }
    if (typeof body.sessionId !== "string" || body.sessionId.length === 0) throw new TypeError("sessionId is required");
    parsed = { action: body.action, sessionId: body.sessionId };
  } catch (error) {
    responseJson(res, error instanceof RangeError ? 413 : 400, { ok: false, error: { code: "invalid-request", message: publicMessage(error) } });
    return;
  }
  try {
    if (parsed.action === "restore") {
      const restored = await archive.restore(parsed.sessionId);
      responseJson(res, 200, { ok: true, value: { restored, archivedSessionIds: archive.list() } });
    } else if (parsed.action === "preview") {
      const preview = await archive.preview(parsed.sessionId);
      responseJson(res, 200, { ok: true, value: { preview } });
    } else {
      const deleted = await archive.deleteSession(parsed.sessionId);
      responseJson(res, 200, { ok: true, value: { deleted, archivedSessionIds: archive.list() } });
    }
  } catch (error) {
    const errorCode = typeof error === "object" && error !== null ? error.code : void 0;
    const code = typeof errorCode === "string" && errorCode.length > 0 ? errorCode : parsed.action === "restore" ? "restore-failed" : parsed.action === "preview" ? "preview-failed" : "delete-failed";
    responseJson(res, 400, { ok: false, error: { code, message: publicMessage(error) } });
  }
}
async function apply2(ctx) {
  const archive = new WorkspaceArchive(ctx.workspaceRegistry, ctx.sessions, ctx.sessionPersistence);
  ctx.provide("workspaceArchive", archive);
  let disposeRoutes = () => {
  };
  ctx.inject(["webServer"], (webCtx) => {
    const server = webCtx.webServer;
    const detach = server.register({
      kind: "exact",
      path: ROUTE,
      handler: (req, res) => {
        void handle(archive, req, res);
      }
    });
    disposeRoutes = detach;
    webCtx.effect(() => detach, "dsh-session-archive: route");
  });
  return () => {
    disposeRoutes();
  };
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
var name2 = "@kiligzzz/dsh-skill-mcp-manager";
var inject2 = ["tools"];
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
  async function toggleSkill(name4, enabled) {
    const f = findSkill(name4);
    if (!f) throw new Error("skill \u4E0D\u5B58\u5728: " + name4);
    const p = path.join(skillsRoot, f.kind === "dir" ? name4 + "/SKILL.md" : name4 + ".md");
    fs.writeFileSync(p, setDisabled(fs.readFileSync(p, "utf8"), name4, !enabled));
  }
  async function deleteSkill(name4) {
    const f = findSkill(name4);
    if (!f) throw new Error("skill \u4E0D\u5B58\u5728: " + name4);
    const target = f.synced ? path.join(skillsRoot, f.path) : f.kind === "dir" ? path.join(skillsRoot, f.name) : path.join(skillsRoot, f.name + ".md");
    await run(["rm", "-rf", "--", target]);
  }
  async function importSkill(name4, content) {
    if (!NAME_RE.test(name4)) throw new Error("skill \u540D\u79F0\u9700\u4E3A kebab-case\uFF08\u5C0F\u5199\u5B57\u6BCD/\u6570\u5B57/-\uFF09");
    fs.mkdirSync(skillsRoot, { recursive: true });
    fs.writeFileSync(path.join(skillsRoot, name4 + ".md"), content);
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
  let mcpPlugin = null;
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
      const client = probe.ctx.plugin(plugin, {
        ...clientConfig(server),
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
  function clientConfig(s) {
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
    return Object.assign({}, base, { transport: "streamable-http", url: s.url || "", headers: s.headers || {} });
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
        fiber = agent.ctx.plugin(plugin, clientConfig(s));
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
    async listSkills() {
      return listSkills();
    },
    async toggleSkill(name4, enabled) {
      await toggleSkill(String(name4), !!enabled);
      return { ok: true };
    },
    async deleteSkill(name4) {
      await deleteSkill(String(name4));
      return { ok: true };
    },
    async importSkill(name4, content) {
      await importSkill(String(name4), String(content));
      return { ok: true };
    },
    async syncSkills(source) {
      return syncSkills(String(source || "").trim());
    },
    async openSkill(name4) {
      const f = findSkill(String(name4));
      if (!f) throw new Error("skill \u4E0D\u5B58\u5728");
      const ok = await openWithSystem(path.join(skillsRoot, f.kind === "dir" ? f.name + "/SKILL.md" : f.name + ".md"));
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
      const servers = readServers().map((s) => Object.assign({}, s, {
        tools: catalog[s.name]?.tools || [],
        catalog: { updatedAt: catalog[s.name]?.updatedAt || null, error: catalog[s.name]?.error || null },
        status: { state: s.enabled ? "available" : "disabled", error: null, tools: 0, scope: "session" }
      }));
      return { servers };
    },
    async saveServer(server) {
      return runConfigSync(async () => {
        const s = server || {};
        if (!s.name || !NAME_RE.test(String(s.name))) throw new Error("server \u540D\u79F0\u9700\u4E3A kebab-case");
        const name4 = String(s.name);
        const clean = {
          name: name4,
          transport: s.transport === "stdio" ? "stdio" : "streamable-http",
          command: s.command || "npx",
          args: Array.isArray(s.args) ? s.args : [],
          env: s.env || {},
          cwd: s.cwd || "",
          url: s.url || "",
          headers: s.headers || {},
          enabled: !!s.enabled,
          description: s.description || s.purpose || ""
        };
        const list = readServers();
        const i = list.findIndex((x) => x.name === name4);
        if (i >= 0) list[i] = clean;
        else list.push(clean);
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
  const restHandler = async (req, res) => {
    try {
      const pathname = decodeURIComponent((req.url || "/").split("?")[0]);
      if (req.method === "GET" && pathname === "/capabilities-api") {
        const skills = await service.listSkills();
        const servers = await service.listServers();
        return send(res, 200, { ok: true, dshHome, mcpConfigPath, skills: { user: skills }, mcp: servers });
      }
      if (req.method === "POST") {
        const body = await readBody(req);
        let out;
        switch (pathname) {
          case "/capabilities-api/skill/toggle":
            out = await service.toggleSkill(body.name, body.enabled);
            break;
          case "/capabilities-api/skill/open":
            out = await service.openSkill(body.name);
            break;
          case "/capabilities-api/skill/open-directory":
            out = await service.openSkillsDirectory();
            break;
          case "/capabilities-api/skill/delete":
            out = await service.deleteSkill(body.name);
            break;
          case "/capabilities-api/skill/import":
            out = await service.importSkill(body.name, body.content);
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
    if (sectionDispose) {
      try {
        sectionDispose();
      } catch (e) {
      }
    }
  });
}

// src/index.js
var name3 = "@kiligzzz/dsh-kiligz-base";
var AUTOMATION_DEFAULTS = {
  maxConcurrentRuns: 2,
  runTimeoutMinutes: 60,
  misfireGraceMinutes: 15,
  historyLimit: 200
};
function apply4(ctx, config = {}) {
  ctx.plugin(automation, { ...AUTOMATION_DEFAULTS, ...config.automation });
  ctx.plugin(lib_exports);
  ctx.plugin(lib_exports2);
  ctx.plugin(skill_mcp_manager_exports);
  ctx.plugin(autoContinue);
  ctx.plugin(visionBridge, { mode: "hybrid", ...config.visionBridge });
  ctx.plugin(betterSidebar, config.betterSidebar);
}
export {
  apply4 as apply,
  name3 as name
};
