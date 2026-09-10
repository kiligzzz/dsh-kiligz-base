var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name4 in all)
    __defProp(target, name4, { get: all[name4], enumerable: true });
};

// src/index.js
import * as automation from "@michengai/dsh-automation";
import * as autoContinue from "dsh-client-auto-continue";
import * as visionRouter from "dsh-vision-router";
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

// src/vision-client-boundary.generated.js
var PRELUDE = "(function(){\n  'use strict';\n  var TARGET = \"@kiligzzz/dsh-kiligz-base\";\n  var LEGACY_ATTACHMENT_VALUE = '@deepseek-ai/dsh-client-ui-attachment';\n  var VISION_MODE_NS = 'vision-router-mode';\n  var VISION_MODE_WRAPPER_SOURCE = 'deepseek-official';\n\n  function visionModeGroup(groups, id) {\n  if (!Array.isArray(groups) || typeof id !== 'string' || id === '') return undefined\n  return groups.find((group) => group && group.id === id)\n}\nfunction visionModeHasModel(group, modelId) {\n  return !!group && Array.isArray(group.models) && group.models.some(\n    (model) => model && model.id === modelId,\n  )\n}\nfunction visionModePairMatches(groups, sourceProvider, targetProvider, modelId, targetName) {\n  const source = visionModeGroup(groups, sourceProvider)\n  const target = visionModeGroup(groups, targetProvider)\n  if (!source || !target) return false\n  if (!visionModeHasModel(source, modelId) || !visionModeHasModel(target, modelId)) return false\n  return target.name === targetName\n}\nfunction visionModeHasOwn(config, key) {\n  return !!config && typeof config === 'object' && Object.prototype.hasOwnProperty.call(config, key)\n}\nfunction visionModeTwinIntended(config, sourceProvider, modelId) {\n  if (!config || typeof config !== 'object') return true\n  const entries = Array.isArray(config.wrappedProviders) ? config.wrappedProviders : []\n  const explicit = entries.find((entry) => entry && entry.provider === sourceProvider)\n  if (explicit) {\n    const models = Array.isArray(explicit.models) ? explicit.models : []\n    return models.length === 0 || models.includes(modelId)\n  }\n  return config.autoWrapProviders !== false\n}\nfunction visionModeOwnedTwin(groups, sourceProvider, twinProvider, modelId, config) {\n  if (twinProvider !== `${sourceProvider}-vision`) return false\n  // Keep client ownership identical to the core adapter registry: Vision Router\n  // never generates a twin from a source route that already ends in \"-vision\".\n  if (sourceProvider.endsWith('-vision')) return false\n  if (!visionModeTwinIntended(config, sourceProvider, modelId)) return false\n  const source = visionModeGroup(groups, sourceProvider)\n  if (!source) return false\n  const sourceName = typeof source.name === 'string' && source.name !== '' ? source.name : sourceProvider\n  return visionModePairMatches(\n    groups,\n    sourceProvider,\n    twinProvider,\n    modelId,\n    `${sourceName} + \u81EA\u52A8\u8BC6\u56FE`,\n  )\n}\nfunction visionModeConfiguredWrapperRoute(config) {\n  const route = config && typeof config.wrapperRoute === 'string' ? config.wrapperRoute.trim() : ''\n  return route || undefined\n}\nfunction visionModeWrapperRoute(groups, config, modelId) {\n  const configured = visionModeConfiguredWrapperRoute(config)\n  if (visionModeHasOwn(config, 'wrapperRoute')) return configured\n  const source = visionModeGroup(groups, VISION_MODE_WRAPPER_SOURCE)\n  if (!source) return undefined\n  const sourceName = typeof source.name === 'string' && source.name !== ''\n    ? source.name\n    : VISION_MODE_WRAPPER_SOURCE\n  const expectedName = `${sourceName} + \u81EA\u52A8\u8BC6\u56FE`\n  const candidates = Array.isArray(groups)\n    ? groups.filter((group) =>\n        group &&\n        group.id !== VISION_MODE_WRAPPER_SOURCE &&\n        group.name === expectedName &&\n        visionModeHasModel(group, modelId),\n      )\n    : []\n  return candidates.length === 1 ? candidates[0].id : undefined\n}\nfunction visionModeOwnedWrapper(groups, wrapperRoute, modelId) {\n  if (typeof wrapperRoute !== 'string' || wrapperRoute === '') return false\n  const source = visionModeGroup(groups, VISION_MODE_WRAPPER_SOURCE)\n  if (!source) return false\n  const sourceName = typeof source.name === 'string' && source.name !== ''\n    ? source.name\n    : VISION_MODE_WRAPPER_SOURCE\n  return visionModePairMatches(\n    groups,\n    VISION_MODE_WRAPPER_SOURCE,\n    wrapperRoute,\n    modelId,\n    `${sourceName} + \u81EA\u52A8\u8BC6\u56FE`,\n  )\n}\nfunction visionModeTarget(current, provider) {\n  return {\n    provider,\n    model: current.model,\n    ...(current.reasoningEffort === undefined ? {} : { reasoningEffort: current.reasoningEffort }),\n  }\n}\nfunction resolveVisionModePair(groups, current, config = {}) {\n  if (\n    !current || typeof current !== 'object' ||\n    typeof current.provider !== 'string' || current.provider === '' ||\n    typeof current.model !== 'string' || current.model === ''\n  ) {\n    return { mode: 'unavailable' }\n  }\n\n  const wrapperRoute = visionModeWrapperRoute(groups, config, current.model)\n  if (current.provider === VISION_MODE_WRAPPER_SOURCE) {\n    if (!visionModeOwnedWrapper(groups, wrapperRoute, current.model)) {\n      return { mode: 'unavailable' }\n    }\n    return { mode: 'off', target: visionModeTarget(current, wrapperRoute) }\n  }\n\n  if (wrapperRoute && current.provider === wrapperRoute) {\n    if (!visionModeOwnedWrapper(groups, wrapperRoute, current.model)) {\n      return { mode: 'unavailable' }\n    }\n    return { mode: 'on', target: visionModeTarget(current, VISION_MODE_WRAPPER_SOURCE) }\n  }\n\n  if (current.provider.endsWith('-vision')) {\n    const sourceProvider = current.provider.slice(0, -'-vision'.length)\n    if (\n      sourceProvider &&\n      visionModeOwnedTwin(groups, sourceProvider, current.provider, current.model, config)\n    ) {\n      return { mode: 'on', target: visionModeTarget(current, sourceProvider) }\n    }\n    // Core excludes source routes ending in \"-vision\" from both auto and\n    // explicit twin registration. If this route is not a verified wrapper of\n    // another source, do not manufacture a nested \"-vision-vision\" pair.\n    return { mode: 'unavailable' }\n  }\n\n  const twinProvider = `${current.provider}-vision`\n  if (!visionModeOwnedTwin(groups, current.provider, twinProvider, current.model, config)) {\n    return { mode: 'unavailable' }\n  }\n  return { mode: 'off', target: visionModeTarget(current, twinProvider) }\n}\n\n  // #271 pre-release regression fence: #210 made the walkthrough runtime lazy,\n  // but its document.body MutationObserver still invalidates the 250ms target\n  // cache for every class mutation. DSH toggles transient scroll/shadow classes\n  // while the settings modal moves, turning an otherwise cheap rAF scroll frame\n  // back into several querySelectorAll passes + forced layout. Keep the observer\n  // fully authoritative for child-list and aria mutations, but suppress class-\n  // only batches for the one exact Vision Router guide observer. Normal scroll\n  // frames will still refresh the cached geometry at the existing 250ms bound.\n  function installGuideMutationFence() {\n    var NativeObserver = window.MutationObserver;\n    var doc = window.document;\n    if (\n      typeof NativeObserver !== 'function' ||\n      NativeObserver.__visionRouterGuideMutationFence ||\n      !doc || !doc.body ||\n      typeof Proxy !== 'function'\n    ) return;\n\n    function isGuideObservation(callback, target, options) {\n      if (!callback || callback.name !== 'resolveSync') return false;\n      if (\n        target !== doc.body || !options ||\n        options.childList !== true || options.subtree !== true || options.attributes !== true\n      ) return false;\n      var filter = Array.isArray(options.attributeFilter) ? options.attributeFilter.slice().sort() : [];\n      return filter.length === 3 &&\n        filter[0] === 'aria-expanded' && filter[1] === 'aria-hidden' && filter[2] === 'class';\n    }\n\n    function withoutTransientClassMutations(records) {\n      if (!records || typeof records.filter !== 'function') return records;\n      return records.filter(function(record){\n        return !(record && record.type === 'attributes' && record.attributeName === 'class');\n      });\n    }\n\n    var WrappedObserver = new Proxy(NativeObserver, {\n      construct: function(Target, args) {\n        var callback = args && args[0];\n        var guideObservation = false;\n        var wrappedObserver;\n        var nativeObserver = new Target(function(records) {\n          var next = guideObservation ? withoutTransientClassMutations(records) : records;\n          if (!next || next.length === 0) return;\n          return callback(next, wrappedObserver || nativeObserver);\n        });\n        wrappedObserver = new Proxy(nativeObserver, {\n          get: function(target, property) {\n            if (property === 'observe') {\n              return function(node, options) {\n                guideObservation = isGuideObservation(callback, node, options);\n                return target.observe(node, options);\n              };\n            }\n            if (property === 'takeRecords') {\n              return function() {\n                var records = target.takeRecords();\n                return guideObservation ? withoutTransientClassMutations(records) : records;\n              };\n            }\n            var value = Reflect.get(target, property, target);\n            return typeof value === 'function' ? value.bind(target) : value;\n          }\n        });\n        return wrappedObserver;\n      }\n    });\n    Object.defineProperty(WrappedObserver, '__visionRouterGuideMutationFence', { value: true });\n    window.MutationObserver = WrappedObserver;\n  }\n\n  function createPresentation(React) {\n    function PresentedImage(props) {\n      var attachment = props.attachment;\n      var load = props.load;\n      var labels = props.labels;\n      var tile = props.tile === true;\n      var state = React.useState(null);\n      var src = state[0];\n      var setSrc = state[1];\n      var failedState = React.useState(false);\n      var failed = failedState[0];\n      var setFailed = failedState[1];\n      var attemptState = React.useState(0);\n      var attempt = attemptState[0];\n      var setAttempt = attemptState[1];\n      var openState = React.useState(false);\n      var open = openState[0];\n      var setOpen = openState[1];\n\n      React.useEffect(function(){\n        var live = true;\n        setSrc(null);\n        setFailed(false);\n        Promise.resolve().then(function(){ return load(attachment); }).then(\n          function(url){ if (live) setSrc(url); },\n          function(){ if (live) setFailed(true); }\n        );\n        return function(){ live = false; };\n      }, [attachment, load, attempt]);\n\n      React.useEffect(function(){\n        if (!open || typeof document === 'undefined') return undefined;\n        var onKeyDown = function(event){ if (event && event.key === 'Escape') setOpen(false); };\n        document.addEventListener('keydown', onKeyDown);\n        return function(){ document.removeEventListener('keydown', onKeyDown); };\n      }, [open]);\n\n      var label = attachment && attachment.name ? attachment.name : labels.image;\n      var box = tile\n        ? { width: 64, height: 64 }\n        : { maxWidth: 240, maxHeight: 240 };\n      var frameStyle = Object.assign({\n        appearance: 'none',\n        border: '1px solid var(--dsw-alias-border-l2)',\n        borderRadius: 8,\n        background: 'var(--dsw-alias-bg-layer-3)',\n        padding: 0,\n        overflow: 'hidden',\n        display: 'flex',\n        alignItems: 'center',\n        justifyContent: 'center',\n        cursor: src ? 'zoom-in' : failed ? 'pointer' : 'default'\n      }, box);\n\n      if (failed) {\n        return React.createElement('button', {\n          type: 'button',\n          title: labels.loadFailed,\n          onClick: function(){ setAttempt(function(value){ return value + 1; }); },\n          style: Object.assign({}, frameStyle, {\n            minWidth: tile ? 64 : 120,\n            minHeight: tile ? 64 : 72,\n            color: 'var(--dsw-alias-label-tertiary)',\n            font: 'inherit',\n            fontSize: 12,\n            padding: 8\n          })\n        }, labels.loadFailed);\n      }\n\n      var thumb = React.createElement('button', {\n        type: 'button',\n        title: labels.open,\n        'aria-label': labels.openNamed(label),\n        disabled: !src,\n        onClick: function(){ if (src) setOpen(true); },\n        style: frameStyle\n      }, src\n        ? React.createElement('img', {\n            src: src,\n            alt: label,\n            style: tile\n              ? { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }\n              : { maxWidth: 240, maxHeight: 240, width: 'auto', height: 'auto', display: 'block' }\n          })\n        : React.createElement('span', {\n            style: { color: 'var(--dsw-alias-label-tertiary)', fontSize: 12, padding: 10 }\n          }, labels.loading)\n      );\n\n      if (!open || !src) return thumb;\n      var overlay = React.createElement('div', {\n        role: 'dialog',\n        'aria-modal': 'true',\n        'aria-label': labels.lightbox.dialog,\n        onClick: function(event){ if (event.target === event.currentTarget) setOpen(false); },\n        style: {\n          position: 'fixed', inset: 0, zIndex: 11000, background: '#000b',\n          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,\n          boxSizing: 'border-box'\n        }\n      },\n        React.createElement('img', {\n          src: src,\n          alt: label,\n          style: { maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: 8 }\n        }),\n        React.createElement('button', {\n          type: 'button',\n          'aria-label': labels.lightbox.close,\n          title: labels.lightbox.close,\n          onClick: function(){ setOpen(false); },\n          style: {\n            position: 'fixed', top: 16, right: 18, width: 36, height: 36,\n            borderRadius: 18, border: '1px solid #ffffff55', background: '#111c',\n            color: '#fff', font: 'inherit', fontSize: 22, cursor: 'pointer'\n          }\n        }, '\xD7')\n      );\n      return React.createElement(React.Fragment, null, thumb, overlay);\n    }\n\n    function ImageGallery(props) {\n      var images = Array.isArray(props.images) ? props.images : [];\n      if (images.length === 0) return null;\n      var tile = images.length > 1;\n      return React.createElement('div', {\n        style: {\n          display: 'flex', flexWrap: 'wrap', gap: 6,\n          justifyContent: props.align === 'end' ? 'flex-end' : 'flex-start',\n          alignItems: 'flex-start', maxWidth: '100%'\n        }\n      }, images.map(function(image, index){\n        var attachment = image && image.attachment;\n        var key = attachment && attachment.attachmentId\n          ? String(attachment.attachmentId) + ':' + index\n          : String(index);\n        return React.createElement(PresentedImage, {\n          key: key,\n          attachment: attachment,\n          load: props.load,\n          labels: props.labels,\n          tile: tile\n        });\n      }));\n    }\n\n    return { ImageGallery: ImageGallery };\n  }\n\n  function patchVisionModeCopy(namespace, dictionaries) {\n    if (namespace !== 'vision-router' || !dictionaries || typeof dictionaries !== 'object') return dictionaries;\n    var next = Object.assign({}, dictionaries);\n    if (next.zh && typeof next.zh === 'object') {\n      next.zh = Object.assign({}, next.zh, {\n        quickStartTitle: '\u804A\u5929\u6A21\u578B + \u8BC6\u56FE\u6A21\u5F0F',\n        quickStartBody: '\u5148\u9009\u62E9\u4F60\u5E73\u65F6\u4F7F\u7528\u7684\u804A\u5929\u6A21\u578B\u3002\u9700\u8981\u770B\u56FE\u65F6\uFF0C\u70B9\u51FB\u8F93\u5165\u6846\u65C1\u7684\u300C\u8BC6\u56FE\u300D\uFF1B\u51FA\u73B0 \u2713 \u8868\u793A\u5DF2\u5F00\u542F\u3002\u5F00\u542F\u540E\u4F1A\u6301\u7EED\u751F\u6548\uFF0C\u76F4\u5230\u4F60\u5173\u95ED\u6216\u624B\u52A8\u5207\u56DE\u666E\u901A\u6A21\u578B\u3002',\n        onboardingStep1Title: '1 \xB7 \u9009\u62E9\u804A\u5929\u6A21\u578B\u5E76\u5F00\u542F\u8BC6\u56FE',\n        onboardingStep1Body: '\u5148\u5728\u804A\u5929\u9875\u53F3\u4E0B\u89D2\u9009\u62E9\u4F60\u5E73\u65F6\u4F7F\u7528\u7684\u6A21\u578B\u3002\u9700\u8981\u770B\u56FE\u65F6\uFF0C\u70B9\u51FB\u6A21\u578B\u9009\u62E9\u5668\u5DE6\u4FA7\u7684\u300C\u8BC6\u56FE\u300D\uFF1B\u51FA\u73B0 \u2713 \u8868\u793A\u5DF2\u5F00\u542F\uFF0C\u4E0D\u9700\u8981\u65F6\u518D\u4E3B\u52A8\u5173\u95ED\u3002',\n        guideStep1Title: '\u7B2C 1 \u6B65 \xB7 \u9009\u62E9\u804A\u5929\u6A21\u578B\u5E76\u8BA4\u8BC6\u300C\u8BC6\u56FE\u300D',\n        guideStep1Body: '\u9AD8\u4EAE\u7684\u662F\u804A\u5929\u6A21\u578B\u9009\u62E9\u5668\uFF1B\u5B83\u5DE6\u4FA7\u5C31\u662F\u300C\u8BC6\u56FE\u300D\u6309\u94AE\u3002\u5148\u9009\u62E9\u4F60\u5E73\u65F6\u4F7F\u7528\u7684\u804A\u5929\u6A21\u578B\uFF1B\u9700\u8981\u770B\u56FE\u65F6\u70B9\u51FB\u300C\u8BC6\u56FE\u300D\uFF0C\u51FA\u73B0 \u2713 \u8868\u793A\u5DF2\u5F00\u542F\u3002\u5F00\u542F\u540E\u4F1A\u6301\u7EED\u751F\u6548\uFF0C\u76F4\u5230\u4F60\u5173\u95ED\u6216\u624B\u52A8\u5207\u56DE\u666E\u901A\u6A21\u578B\u3002\u9009\u597D\u540E\u70B9\u51FB\u300C\u4E0B\u4E00\u6B65\u300D\u3002'\n      });\n    }\n    if (next.en && typeof next.en === 'object') {\n      next.en = Object.assign({}, next.en, {\n        quickStartTitle: 'Chat model + Vision mode',\n        quickStartBody: 'Choose the chat model you normally use first. When you need image understanding, click \u201CVision\u201D beside the composer; a \u2713 means it is on. It stays on until you turn it off or manually switch back to a normal model.',\n        onboardingStep1Title: '1 \xB7 Choose your chat model and enable Vision',\n        onboardingStep1Body: 'Choose the model you normally use from the lower-right chat selector. When you need image understanding, click \u201CVision\u201D immediately to the left of the model selector; a \u2713 means it is on. Turn it off again when you no longer need it.',\n        guideStep1Title: 'Step 1 \xB7 Choose your chat model and find \u201CVision\u201D',\n        guideStep1Body: 'The highlighted control is the chat model selector; the \u201CVision\u201D button is immediately to its left. Choose your normal chat model first, then click \u201CVision\u201D when you need image understanding. A \u2713 means it is on, and it stays on until you turn it off or manually switch back to a normal model. Click \u201CNext\u201D when done.'\n      });\n    }\n    return next;\n  }\n\n  function contextWithVisionModeCopy(ctx) {\n    if (!ctx || typeof ctx !== 'object' || typeof Proxy !== 'function') return ctx;\n    var locale = ctx.locale;\n    if (!locale || (typeof locale !== 'object' && typeof locale !== 'function')) return ctx;\n    var wrappedLocale = new Proxy(locale, {\n      get: function(target, property) {\n        if (property === 'register') {\n          var register = Reflect.get(target, property, target);\n          if (typeof register !== 'function') return register;\n          return function(namespace, dictionaries) {\n            var rest = Array.prototype.slice.call(arguments, 2);\n            return register.apply(target, [namespace, patchVisionModeCopy(namespace, dictionaries)].concat(rest));\n          };\n        }\n        var value = Reflect.get(target, property, target);\n        return typeof value === 'function' ? value.bind(target) : value;\n      }\n    });\n    return new Proxy(ctx, {\n      get: function(target, property) {\n        if (property === 'locale') return wrappedLocale;\n        var value = Reflect.get(target, property, target);\n        return typeof value === 'function' ? value.bind(target) : value;\n      }\n    });\n  }\n\n  function bindVisionModeSettings(ctx) {\n    try {\n      var binder = ctx && ctx.settingsScope;\n      if (!binder || typeof binder.bind !== 'function') return undefined;\n      return binder.bind({ namespace: 'vision-router' });\n    } catch (_) {\n      return undefined;\n    }\n  }\n\n  // #138 Windows clipboard compatibility: desktop clipboards may expose an\n  // image as BMP/empty MIME, or may declare a supported MIME that disagrees with\n  // the actual bytes (for example .png + image/png carrying JPEG bytes). DSH\n  // validates the declaration before/while creating the draft, and its local\n  // attachment store rejects declaration/content mismatches. Inspect image-like\n  // clipboard files by magic bytes before Lexical's CRITICAL paste handler sees\n  // them; canonical files keep the original File object and are never re-encoded.\n  function installClipboardImagePasteCompat(ctx) {\n    if (!ctx || typeof ctx.effect !== 'function') return;\n    ctx.effect(function() {\n      var doc = window.document;\n      if (!doc || typeof doc.addEventListener !== 'function') return function(){};\n      if (\n        typeof window.DataTransfer !== 'function' ||\n        typeof window.ClipboardEvent !== 'function' ||\n        typeof window.File !== 'function' ||\n        typeof WeakSet !== 'function'\n      ) return function(){};\n\n      var replayed = new WeakSet();\n      var supported = {\n        'image/png': true,\n        'image/jpeg': true,\n        'image/webp': true,\n        'image/gif': true\n      };\n      var bitmapTypes = {\n        'image/bmp': true,\n        'image/x-bmp': true,\n        'image/x-ms-bmp': true\n      };\n\n      function mediaType(value) {\n        return typeof value === 'string' ? value.trim().toLowerCase() : '';\n      }\n\n      function imageLikeName(value) {\n        return typeof value === 'string' && /\\.(?:png|jpe?g|webp|gif|bmp|dib)$/i.test(value.trim());\n      }\n\n      function needsInspection(file) {\n        if (!file) return false;\n        var type = mediaType(file.type);\n        return type === '' || type.indexOf('image/') === 0 || imageLikeName(file.name);\n      }\n\n      var normalizedBitmapFiles = new WeakSet();\n      var maxExactDedupeBytes = 8 * 1024 * 1024;\n      var maxVisualDedupeSourceBytes = 16 * 1024 * 1024;\n      var maxVisualDedupeDimension = 4096;\n      var maxVisualDedupePixels = 9000000;\n      var visualDedupeTile = 256;\n\n      function supportedImage(file) {\n        return !!file && supported[mediaType(file.type)] === true;\n      }\n\n      function syntheticClipboardName(name) {\n        var value = typeof name === 'string' ? name.trim() : '';\n        if (value === '') return true;\n        return /^(?:image|clipboard)(?:[ _-]?\\d+)?\\.(?:png|jpe?g|webp|gif)$/i.test(value);\n      }\n\n      function syntheticClipboardFile(file) {\n        return !!file && (normalizedBitmapFiles.has(file) || syntheticClipboardName(file.name));\n      }\n\n      function hasDedupeSignal(files) {\n        var images = files.filter(supportedImage);\n        for (var i = 0; i < images.length; i += 1) {\n          for (var j = i + 1; j < images.length; j += 1) {\n            var left = images[i];\n            var right = images[j];\n            if (\n              (Number.isFinite(left.size) && left.size > 0 && left.size === right.size) ||\n              (mediaType(left.type) === mediaType(right.type) &&\n                (syntheticClipboardFile(left) || syntheticClipboardFile(right)))\n            ) return true;\n          }\n        }\n        return false;\n      }\n\n      function bytesOf(file) {\n        if (!file || typeof file.arrayBuffer !== 'function') return Promise.resolve(undefined);\n        try {\n          return Promise.resolve(file.arrayBuffer()).then(function(buffer) {\n            return new Uint8Array(buffer);\n          }, function(){ return undefined; });\n        } catch (_) {\n          return Promise.resolve(undefined);\n        }\n      }\n\n      function sameBytes(left, right) {\n        if (\n          !left || !right ||\n          !Number.isFinite(left.size) || left.size <= 0 || left.size !== right.size ||\n          left.size > maxExactDedupeBytes\n        ) return Promise.resolve(false);\n        return Promise.all([bytesOf(left), bytesOf(right)]).then(function(values) {\n          var a = values[0];\n          var b = values[1];\n          if (!a || !b || a.length !== b.length) return false;\n          for (var i = 0; i < a.length; i += 1) if (a[i] !== b[i]) return false;\n          return true;\n        }, function(){ return false; });\n      }\n\n      function visualPairAllowed(left, right) {\n        if (!left || !right) return false;\n        if (mediaType(left.type) !== 'image/png' || mediaType(right.type) !== 'image/png') return false;\n        if (!(syntheticClipboardFile(left) || syntheticClipboardFile(right))) return false;\n        return Number.isFinite(left.size) && left.size > 0 && left.size <= maxVisualDedupeSourceBytes &&\n          Number.isFinite(right.size) && right.size > 0 && right.size <= maxVisualDedupeSourceBytes;\n      }\n\n      function closeBitmap(bitmap) {\n        try { if (bitmap && typeof bitmap.close === 'function') bitmap.close(); } catch (_) {}\n      }\n\n      function visualInfoAllowed(leftInfo, rightInfo) {\n        if (!leftInfo || !rightInfo || leftInfo.type !== 'image/png' || rightInfo.type !== 'image/png') return false;\n        var width = leftInfo.width;\n        var height = leftInfo.height;\n        return Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0 &&\n          width === rightInfo.width && height === rightInfo.height &&\n          width <= maxVisualDedupeDimension && height <= maxVisualDedupeDimension &&\n          width * height <= maxVisualDedupePixels;\n      }\n\n      function bitmapPixelsMatch(left, right) {\n        if (!visualPairAllowed(left, right) || typeof window.createImageBitmap !== 'function') return Promise.resolve(false);\n        return Promise.all([headType(left), headType(right)]).then(function(infos) {\n          if (!visualInfoAllowed(infos[0], infos[1])) return false;\n          return Promise.resolve(window.createImageBitmap(left)).then(function(leftBitmap) {\n          return Promise.resolve(window.createImageBitmap(right)).then(function(rightBitmap) {\n            try {\n              var width = leftBitmap && leftBitmap.width;\n              var height = leftBitmap && leftBitmap.height;\n              if (\n                !Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0 ||\n                width !== rightBitmap.width || height !== rightBitmap.height ||\n                width > maxVisualDedupeDimension || height > maxVisualDedupeDimension ||\n                width * height > maxVisualDedupePixels\n              ) return false;\n              var canvas = doc.createElement('canvas');\n              var context = canvas.getContext && canvas.getContext('2d', { willReadFrequently: true });\n              if (!context || typeof context.drawImage !== 'function' || typeof context.getImageData !== 'function') return false;\n              for (var y = 0; y < height; y += visualDedupeTile) {\n                for (var x = 0; x < width; x += visualDedupeTile) {\n                  var tileWidth = Math.min(visualDedupeTile, width - x);\n                  var tileHeight = Math.min(visualDedupeTile, height - y);\n                  canvas.width = tileWidth;\n                  canvas.height = tileHeight;\n                  context.drawImage(leftBitmap, x, y, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);\n                  var leftPixels = context.getImageData(0, 0, tileWidth, tileHeight).data;\n                  context.drawImage(rightBitmap, x, y, tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);\n                  var rightPixels = context.getImageData(0, 0, tileWidth, tileHeight).data;\n                  if (!leftPixels || !rightPixels || leftPixels.length !== rightPixels.length) return false;\n                  for (var i = 0; i < leftPixels.length; i += 1) {\n                    if (leftPixels[i] !== rightPixels[i]) return false;\n                  }\n                }\n              }\n              return true;\n            } catch (_) {\n              return false;\n            } finally {\n              closeBitmap(leftBitmap);\n              closeBitmap(rightBitmap);\n            }\n          }, function() {\n            closeBitmap(leftBitmap);\n            return false;\n          });\n          }, function(){ return false; });\n        }, function(){ return false; });\n      }\n\n      function duplicatePair(left, right) {\n        if (!supportedImage(left) || !supportedImage(right)) return Promise.resolve(false);\n        return sameBytes(left, right).then(function(exact) {\n          return exact ? true : bitmapPixelsMatch(left, right);\n        }, function(){ return false; });\n      }\n\n      function preferredDuplicate(left, right) {\n        if (syntheticClipboardFile(left) && !syntheticClipboardFile(right)) return right;\n        return left;\n      }\n\n      function dedupeBatch(files) {\n        if (!hasDedupeSignal(files)) return Promise.resolve(files);\n        var kept = [];\n        var chain = Promise.resolve();\n        files.forEach(function(file) {\n          chain = chain.then(function() {\n            var index = 0;\n            function compareNext() {\n              if (index >= kept.length) {\n                kept.push(file);\n                return Promise.resolve();\n              }\n              var current = index;\n              index += 1;\n              return duplicatePair(kept[current], file).then(function(duplicate) {\n                if (!duplicate) return compareNext();\n                kept[current] = preferredDuplicate(kept[current], file);\n                return undefined;\n              }, function(){ return compareNext(); });\n            }\n            return compareNext();\n          });\n        });\n        return chain.then(function(){ return kept; }, function(){ return files; });\n      }\n\n      function composerEditable(target) {\n        var element = target && target.nodeType === 1\n          ? target\n          : target && target.parentElement;\n        if (!element || typeof element.closest !== 'function') return null;\n        var editable = element.closest('[data-composer-input]');\n        if (!editable || typeof editable.closest !== 'function') return null;\n        return editable.closest('[data-composer-card]') ? editable : null;\n      }\n\n      function snapshotText(data) {\n        var entries = [];\n        var types = data && data.types ? Array.from(data.types) : [];\n        types.forEach(function(type) {\n          if (type === 'Files') return;\n          try {\n            var value = data.getData(type);\n            if (typeof value === 'string' && value !== '') entries.push([type, value]);\n          } catch (_) {}\n        });\n        return entries;\n      }\n\n      var maxBitmapSourceBytes = 64 * 1024 * 1024;\n      var maxBitmapDimension = 10000;\n      var maxBitmapPixels = 100000000;\n\n      function sniffImageInfo(bytes) {\n        if (!bytes || bytes.length < 2) return undefined;\n        if (\n          bytes.length >= 8 &&\n          bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47 &&\n          bytes[4] === 0x0d && bytes[5] === 0x0a && bytes[6] === 0x1a && bytes[7] === 0x0a\n        ) {\n          if (bytes.length < 24 || typeof DataView !== 'function') return { type: 'image/png' };\n          try {\n            var pngView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);\n            return {\n              type: 'image/png',\n              width: pngView.getUint32(16, false),\n              height: pngView.getUint32(20, false)\n            };\n          } catch (_) {\n            return { type: 'image/png' };\n          }\n        }\n        if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return { type: 'image/jpeg' };\n        if (\n          bytes.length >= 6 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 &&\n          bytes[3] === 0x38 && (bytes[4] === 0x37 || bytes[4] === 0x39) && bytes[5] === 0x61\n) return { type: 'image/gif' };\n        if (\n          bytes.length >= 12 && bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&\n          bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50\n) return { type: 'image/webp' };\n        if (bytes[0] === 0x42 && bytes[1] === 0x4d) {\n          if (bytes.length < 26 || typeof DataView !== 'function') return { type: 'image/bmp' };\n          try {\n            var view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);\n            var dibSize = bytes.length >= 18 ? view.getUint32(14, true) : 0;\n            if (dibSize < 40) return { type: 'image/bmp' };\n            return {\n              type: 'image/bmp',\n              width: Math.abs(view.getInt32(18, true)),\n              height: Math.abs(view.getInt32(22, true))\n            };\n          } catch (_) {\n            return { type: 'image/bmp' };\n          }\n        }\n        return undefined;\n      }\n\n      function headType(file) {\n        try {\n          var blob = typeof file.slice === 'function' ? file.slice(0, 32) : file;\n          if (!blob || typeof blob.arrayBuffer !== 'function') return Promise.resolve(undefined);\n          return Promise.resolve(blob.arrayBuffer()).then(function(buffer) {\n            return sniffImageInfo(new Uint8Array(buffer));\n          }, function(){ return undefined; });\n        } catch (_) {\n          return Promise.resolve(undefined);\n        }\n      }\n\n      function fileNameFor(type, original) {\n        var name = typeof original === 'string' ? original : '';\n        var suffix = type === 'image/png' ? '.png'\n          : type === 'image/jpeg' ? '.jpg'\n          : type === 'image/gif' ? '.gif'\n          : type === 'image/webp' ? '.webp'\n          : '';\n        if (!name) return suffix ? 'clipboard' + suffix : 'clipboard-image';\n        if (!suffix) return name;\n        return /\\.(?:png|jpe?g|webp|gif|bmp|dib)$/i.test(name)\n          ? name.replace(/\\.(?:png|jpe?g|webp|gif|bmp|dib)$/i, suffix)\n          : name;\n      }\n\n      function retypeFile(file, type) {\n        return new window.File([file], fileNameFor(type, file && file.name), {\n          type: type,\n          lastModified: file && Number.isFinite(file.lastModified) ? file.lastModified : Date.now()\n        });\n      }\n\n      function bitmapDecodeAllowed(file, info) {\n        if (!file || !info) return false;\n        if (!Number.isFinite(file.size) || file.size <= 0 || file.size > maxBitmapSourceBytes) return false;\n        if (!Number.isFinite(info.width) || !Number.isFinite(info.height) || info.width <= 0 || info.height <= 0) return false;\n        if (info.width > maxBitmapDimension || info.height > maxBitmapDimension) return false;\n        return info.width * info.height <= maxBitmapPixels;\n      }\n\n      function bitmapToPng(file) {\n        if (typeof window.createImageBitmap !== 'function') return Promise.reject(new Error('createImageBitmap unavailable'));\n        return Promise.resolve(window.createImageBitmap(file)).then(function(bitmap) {\n          return new Promise(function(resolve, reject) {\n            var close = function() {\n              try { if (bitmap && typeof bitmap.close === 'function') bitmap.close(); } catch (_) {}\n            };\n            try {\n              var canvas = doc.createElement('canvas');\n              canvas.width = bitmap.width;\n              canvas.height = bitmap.height;\n              var context = canvas.getContext && canvas.getContext('2d');\n              if (!context || typeof context.drawImage !== 'function' || typeof canvas.toBlob !== 'function') {\n                close();\n                reject(new Error('canvas PNG conversion unavailable'));\n                return;\n              }\n              context.drawImage(bitmap, 0, 0);\n              canvas.toBlob(function(blob) {\n                close();\n                if (!blob) {\n                  reject(new Error('canvas PNG conversion failed'));\n                  return;\n                }\n                try {\n                  var normalized = new window.File([blob], fileNameFor('image/png', file && file.name), {\n                    type: 'image/png',\n                    lastModified: file && Number.isFinite(file.lastModified) ? file.lastModified : Date.now()\n                  });\n                  normalizedBitmapFiles.add(normalized);\n                  resolve(normalized);\n                } catch (error) {\n                  reject(error);\n                }\n              }, 'image/png');\n            } catch (error) {\n              close();\n              reject(error);\n            }\n          });\n        });\n      }\n\n      function normalizeFile(file) {\n        return headType(file).then(function(info) {\n          var detected = info && info.type;\n          if (detected && supported[detected]) {\n            return mediaType(file && file.type) === detected ? file : retypeFile(file, detected);\n          }\n          if (detected === 'image/bmp' && bitmapDecodeAllowed(file, info)) return bitmapToPng(file);\n          return file;\n        }, function(){ return file; });\n      }\n\n      function replayEvent(files, textEntries) {\n        try {\n          var transfer = new window.DataTransfer();\n          if (!transfer.items || typeof transfer.items.add !== 'function') return null;\n          files.forEach(function(file){ transfer.items.add(file); });\n          textEntries.forEach(function(entry){ transfer.setData(entry[0], entry[1]); });\n          var event = new window.ClipboardEvent('paste', {\n            clipboardData: transfer,\n            bubbles: true,\n            cancelable: true,\n            composed: true\n          });\n          return event && event.clipboardData === transfer ? event : null;\n        } catch (_) {\n          return null;\n        }\n      }\n\n      function dispatchReplay(target, preferred, fallback) {\n        var event = preferred || fallback;\n        if (!event || !target || typeof target.dispatchEvent !== 'function') return;\n        replayed.add(event);\n        try {\n          target.dispatchEvent(event);\n        } catch (_) {\n          if (fallback && fallback !== event) {\n            replayed.add(fallback);\n            try { target.dispatchEvent(fallback); } catch (_) {}\n          }\n        }\n      }\n\n      function onPaste(event) {\n        if (!event || replayed.has(event)) return;\n        var target = composerEditable(event.target);\n        if (!target) return;\n        var data = event.clipboardData;\n        if (!data || !data.items) return;\n        var files = Array.from(data.items)\n          .filter(function(item){ return item && item.kind === 'file'; })\n          .map(function(item){ try { return item.getAsFile(); } catch (_) { return null; } })\n          .filter(function(file){ return !!file; });\n        if (!files.some(needsInspection) && !hasDedupeSignal(files)) return;\n\n        // Snapshot every string flavor while the trusted paste event still owns\n        // a readable clipboard data store. Build a known-good fallback replay\n        // before canceling the original event so conversion failure never eats\n        // the user's text or files.\n        var textEntries = snapshotText(data);\n        var fallback = replayEvent(files, textEntries);\n        if (!fallback) return;\n\n        if (typeof event.preventDefault === 'function') event.preventDefault();\n        if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();\n\n        Promise.all(files.map(function(file){\n          return needsInspection(file)\n            ? normalizeFile(file).catch(function(){ return file; })\n            : Promise.resolve(file);\n        })).then(function(normalized) {\n          return dedupeBatch(normalized).then(function(deduped) {\n            dispatchReplay(target, replayEvent(deduped, textEntries), fallback);\n          });\n        }, function() {\n          dispatchReplay(target, fallback, null);\n        });\n      }\n\n      doc.addEventListener('paste', onPaste, true);\n      return function(){ doc.removeEventListener('paste', onPaste, true); };\n    }, 'vision-router: clipboard image paste normalization');\n  }\n\n  function installVisionModeToggle(ctx, React, primitives) {\n    if (!ctx || typeof ctx.inject !== 'function' || !React) return;\n    var zh = {\n      label: '\u8BC6\u56FE',\n      enable: '\u5F00\u542F\u8BC6\u56FE\u6A21\u5F0F',\n      disable: '\u5173\u95ED\u8BC6\u56FE\u6A21\u5F0F',\n      unavailable: '\u5F53\u524D\u6A21\u578B\u6CA1\u6709\u5BF9\u5E94\u7684\u300C+ \u81EA\u52A8\u8BC6\u56FE\u300D\u7248\u672C',\n      loading: '\u6B63\u5728\u8BFB\u53D6\u6A21\u578B\u4FE1\u606F\u2026',\n      switching: '\u6B63\u5728\u5207\u6362\u8BC6\u56FE\u6A21\u5F0F\u2026',\n      failed: '\u6A21\u578B\u64CD\u4F5C\u5931\u8D25\uFF1A{message}',\n      failedUnknown: '\u672A\u77E5\u9519\u8BEF'\n    };\n    var en = {\n      label: 'Vision',\n      enable: 'Enable Vision mode',\n      disable: 'Disable Vision mode',\n      unavailable: 'No matching \u201C+ Auto Vision\u201D model is available',\n      loading: 'Loading model information\u2026',\n      switching: 'Switching Vision mode\u2026',\n      failed: 'Model action failed: {message}',\n      failedUnknown: 'Unknown error'\n    };\n\n    try {\n      ctx.effect(function(){ return ctx.locale.register(VISION_MODE_NS, { zh: zh, en: en }); }, 'vision-router: mode toggle locale');\n    } catch (_) {}\n\n    function FallbackToast(props) {\n      React.useEffect(function(){\n        if (typeof setTimeout !== 'function') return undefined;\n        var timer = setTimeout(props.onDone, 4000);\n        return function(){ if (typeof clearTimeout === 'function') clearTimeout(timer); };\n      }, [props.text]);\n      return React.createElement('div', {\n        role: 'alert',\n        style: {\n          position: 'fixed',\n          top: 36,\n          left: '50%',\n          transform: 'translateX(-50%)',\n          zIndex: 12000,\n          maxWidth: 'min(760px, calc(100vw - 32px))',\n          boxSizing: 'border-box',\n          padding: '12px 16px',\n          borderRadius: 12,\n          border: '1px solid var(--dsw-alias-border-l2)',\n          background: 'var(--dsw-alias-bg-layer-2)',\n          color: 'var(--dsw-alias-label-primary)',\n          boxShadow: '0 12px 40px #0005',\n          fontSize: 13,\n          lineHeight: 1.5\n        }\n      }, '\u26A0 ', props.text);\n    }\n\n    var ToastComponent = primitives && typeof primitives.Toast === 'function' ? primitives.Toast : FallbackToast;\n    var WarningIcon = primitives && typeof primitives.IconWarningOutline16 === 'function'\n      ? primitives.IconWarningOutline16\n      : undefined;\n\n    var settings = bindVisionModeSettings(ctx);\n    var unavailableSettingsState = { value: undefined };\n    ctx.inject(['slots', 'modelDirectories', 'sessions', 'remote'], function(scope) {\n      // Cold directoryFor calls use the caller's Cordis context, including its\n      // remote.session declaration. Probe only once modelDirectories is ready;\n      // older Hosts must not acquire a hard dependency on the alpha namespace.\n      var session;\n      try {\n        session = typeof scope.get === 'function' ? scope.get('remote.session') : undefined;\n      } catch (_) {}\n      if (session) scope.inject(['remote.session'], installToggle);\n      else installToggle(scope);\n    });\n\n    function installToggle(scope) {\n      var models;\n      try {\n        models = scope.modelDirectories || (typeof scope.get === 'function' ? scope.get('modelDirectories') : undefined);\n      } catch (_) {\n        models = undefined;\n      }\n      if (!models || typeof models.directoryFor !== 'function') return;\n\n      function fallbackTranslate(active) {\n        return function(key, params) {\n          var template = zh[key] || (active ? zh.disable : zh.enable);\n          if (!params) return template;\n          return template.replace(/\\{(\\w+)\\}/g, function(match, name) {\n            return Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match;\n          });\n        };\n      }\n\n      function VisionModeToggle(props) {\n        var directory = props.directory;\n        var store = directory && directory.store;\n        var fallbackState = { current: null, groups: [], status: 'idle', error: null };\n        var state = React.useSyncExternalStore(\n          store && typeof store.subscribe === 'function' ? function(listener){ return store.subscribe(listener); } : function(){ return function(){}; },\n          store && typeof store.getSnapshot === 'function' ? function(){ return store.getSnapshot(); } : function(){ return fallbackState; }\n        );\n        var settingsState = React.useSyncExternalStore(\n          settings && typeof settings.subscribe === 'function' ? function(listener){ return settings.subscribe(listener); } : function(){ return function(){}; },\n          settings && typeof settings.getSnapshot === 'function'\n            ? function(){ return settings.getSnapshot(); }\n            : function(){ return unavailableSettingsState; }\n        );\n        var visionConfig = settingsState && settingsState.value && typeof settingsState.value === 'object'\n          ? settingsState.value\n          : {};\n        var pair = resolveVisionModePair(state.groups, state.current, visionConfig);\n        var active = pair.mode === 'on';\n        var toastState = React.useState(null);\n        var toast = toastState[0];\n        var setToast = toastState[1];\n        var busy = state.status === 'selecting';\n        var loading = state.status === 'idle' || state.status === 'loading';\n        var removed = props.session && props.session.removed === true;\n        var disabled = props.available !== true || removed || busy || loading || pair.mode === 'unavailable';\n        var t = typeof props.t === 'function' ? props.t : fallbackTranslate(active);\n        var title = busy\n          ? t('switching')\n          : loading\n            ? t('loading')\n            : pair.mode === 'unavailable'\n              ? t('unavailable')\n              : active ? t('disable') : t('enable');\n        var style = {\n          appearance: 'none',\n          minHeight: 28,\n          display: 'inline-flex',\n          alignItems: 'center',\n          gap: 5,\n          padding: '4px 8px',\n          borderRadius: 8,\n          border: '1px solid ' + (active ? 'var(--dsw-alias-brand-primary)' : 'var(--dsw-alias-border-l2)'),\n          background: active\n            ? 'color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent)'\n            : 'transparent',\n          color: active ? 'var(--dsw-alias-brand-primary)' : 'var(--dsw-alias-label-secondary)',\n          boxShadow: active ? 'inset 0 0 0 1px var(--dsw-alias-brand-primary)' : 'none',\n          font: 'inherit',\n          fontSize: 12,\n          lineHeight: 1.4,\n          fontWeight: active ? 650 : 500,\n          cursor: disabled ? 'default' : 'pointer',\n          opacity: disabled && (pair.mode === 'unavailable' || loading) ? 0.45 : 1,\n          whiteSpace: 'nowrap'\n        };\n\n        function announceRejectedSelection() {\n          var latest;\n          try {\n            latest = store && typeof store.getSnapshot === 'function' ? store.getSnapshot() : undefined;\n          } catch (_) {\n            latest = undefined;\n          }\n          var message = latest && typeof latest.error === 'string' && latest.error !== ''\n            ? latest.error\n            : t('failedUnknown');\n          setToast(function(previous){\n            return {\n              seq: previous && Number.isFinite(previous.seq) ? previous.seq + 1 : 1,\n              text: t('failed', { message: message })\n            };\n          });\n        }\n\n        var button = React.createElement('button', {\n          type: 'button',\n          'data-vision-router-mode-toggle': 'true',\n          'aria-pressed': active,\n          'aria-label': title,\n          title: title,\n          disabled: disabled,\n          style: style,\n          onClick: function() {\n            if (disabled || !pair.target || typeof props.select !== 'function') return;\n            setToast(null);\n            void props.select(pair.target).then(function(accepted){\n              if (!accepted) announceRejectedSelection();\n            });\n          }\n        },\n          React.createElement('svg', {\n            width: 14,\n            height: 14,\n            viewBox: '0 0 14 14',\n            fill: 'none',\n            'aria-hidden': 'true',\n            focusable: 'false',\n            style: { display: 'block', flex: '0 0 auto' }\n          }, React.createElement('path', {\n            fillRule: 'evenodd',\n            clipRule: 'evenodd',\n            d: 'M7 2.25c-2.84 0-5.04 1.69-6.25 4.25a1.15 1.15 0 0 0 0 1C1.96 10.06 4.16 11.75 7 11.75s5.04-1.69 6.25-4.25a1.15 1.15 0 0 0 0-1C12.04 3.94 9.84 2.25 7 2.25Zm0 1.25c2.16 0 3.96 1.21 5.05 3.5C10.96 9.29 9.16 10.5 7 10.5S3.04 9.29 1.95 7C3.04 4.71 4.84 3.5 7 3.5Zm0 1.25A2.25 2.25 0 1 0 7 9.25a2.25 2.25 0 0 0 0-4.5Zm0 1.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z',\n            fill: 'currentColor'\n          })),\n          React.createElement('span', null, t('label')),\n          active\n            ? React.createElement('svg', {\n                width: 12,\n                height: 12,\n                viewBox: '0 0 14 14',\n                fill: 'none',\n                'aria-hidden': 'true',\n                focusable: 'false',\n                style: { display: 'block', flex: '0 0 auto', marginLeft: 1 }\n              }, React.createElement('path', {\n                d: 'M2.75 7.15 5.6 10 11.25 4.35',\n                stroke: 'currentColor',\n                strokeWidth: 1.5,\n                strokeLinecap: 'round',\n                strokeLinejoin: 'round'\n              }))\n            : null\n        );\n\n        var toastNode = toast\n          ? React.createElement(ToastComponent, {\n              key: toast.seq,\n              text: toast.text,\n              icon: WarningIcon\n                ? React.createElement(WarningIcon)\n                : React.createElement('span', { 'aria-hidden': 'true' }, '\u26A0'),\n              anchor: typeof document !== 'undefined'\n                ? document.querySelector('[data-composer-card]')\n                : null,\n              onDone: function(){ setToast(null); }\n            })\n          : null;\n        return React.createElement(React.Fragment, null, button, toastNode);\n      }\n\n      scope.effect(function() {\n        return scope.slots.inject('conversation.input.right', function*() {\n          yield scope.slots.register({\n            name: 'conversation.input.right',\n            id: 'vision-router-mode-toggle',\n            order: 40,\n            locale: VISION_MODE_NS,\n            inject: function(sessionId) {\n              var directory = models.directoryFor(sessionId);\n              var available = true;\n              try {\n                available = !scope.sessions || typeof scope.sessions.subagentAddress !== 'function'\n                  ? true\n                  : scope.sessions.subagentAddress(sessionId) === undefined;\n              } catch (_) {\n                available = false;\n              }\n              return {\n                directory: directory,\n                available: available,\n                select: function(selection) {\n                  if (!available || !directory || typeof directory.select !== 'function') {\n                    return Promise.resolve(false);\n                  }\n                  try {\n                    return Promise.resolve(directory.select(selection)).then(\n                      function(){ return true; },\n                      function(){ return false; }\n                    );\n                  } catch (_) {\n                    return Promise.resolve(false);\n                  }\n                }\n              };\n            }\n          }, VisionModeToggle);\n        });\n      }, 'vision-router: composer vision mode toggle');\n    }\n  }\n\n  function decorateVisionRouterPlugin(plugin, React, primitives) {\n    if (!plugin || typeof plugin !== 'object' || typeof plugin.apply !== 'function') return plugin;\n    if (plugin.apply.__visionRouterModeToggle) return plugin;\n    var originalApply = plugin.apply;\n    function apply(ctx) {\n      var decoratedCtx = contextWithVisionModeCopy(ctx);\n      var args = Array.prototype.slice.call(arguments);\n      args[0] = decoratedCtx;\n      var result = originalApply.apply(this, args);\n      try {\n        installClipboardImagePasteCompat(decoratedCtx);\n      } catch (error) {\n        try { console.warn('vision-router: failed to install clipboard image paste compatibility', error); } catch (_) {}\n      }\n      try {\n        installVisionModeToggle(decoratedCtx, React, primitives);\n      } catch (error) {\n        try { console.warn('vision-router: failed to install composer vision mode toggle', error); } catch (_) {}\n      }\n      return result;\n    }\n    try { Object.defineProperty(apply, '__visionRouterModeToggle', { value: true }); } catch (_) {}\n    plugin.apply = apply;\n    return plugin;\n  }\n\n  function patchLoader(loader) {\n    if (!loader || (typeof loader !== 'object' && typeof loader !== 'function')) return;\n\n    if (typeof loader.load === 'function' && !loader.load.__visionRouterPresentationBoundary) {\n      var original = loader.load;\n      function load(spec) {\n        if (spec && spec.id === TARGET && typeof spec.factory === 'function') {\n          var factory = spec.factory;\n          spec = Object.assign({}, spec, {\n            factory: function(require) {\n              var React = require('react');\n              var primitives;\n              try {\n                primitives = require('@deepseek-ai/dsh-client-ui-primitives');\n              } catch (_) {\n                primitives = undefined;\n              }\n              var presentation = createPresentation(React);\n              function scopedRequire(id) {\n                if (id === LEGACY_ATTACHMENT_VALUE) return presentation;\n                return require(id);\n              }\n              return decorateVisionRouterPlugin(factory(scopedRequire), React, primitives);\n            }\n          });\n        }\n        return original.call(this, spec);\n      }\n      Object.defineProperty(load, '__visionRouterPresentationBoundary', { value: true });\n      loader.load = load;\n    }\n\n    // rc.8's parser installs a queue-mode facade first. When the Web shell\n    // later calls create(), ClientModuleSystem switches that *same object* to\n    // live mode by assigning a brand-new loader.load function. That assignment\n    // necessarily erases every queue-time wrapper. Wrap create itself so the\n    // boundary is re-applied immediately after the official queue -> live\n    // transition and before lazy third-party bundles can register.\n    if (typeof loader.create === 'function' && !loader.create.__visionRouterPresentationBoundary) {\n      var originalCreate = loader.create;\n      function create() {\n        var result = originalCreate.apply(this, arguments);\n        patchLoader(loader);\n        return result;\n      }\n      Object.defineProperty(create, '__visionRouterPresentationBoundary', { value: true });\n      loader.create = create;\n    }\n  }\n\n  function install() {\n    installGuideMutationFence();\n    if (window.__ModuleLoader__) {\n      patchLoader(window.__ModuleLoader__);\n      return;\n    }\n    var descriptor = Object.getOwnPropertyDescriptor(window, '__ModuleLoader__');\n    if (descriptor && descriptor.configurable === false) return;\n    var stored;\n    Object.defineProperty(window, '__ModuleLoader__', {\n      configurable: true,\n      enumerable: true,\n      get: function(){ return stored; },\n      set: function(value) {\n        stored = value;\n        patchLoader(value);\n        Object.defineProperty(window, '__ModuleLoader__', {\n          configurable: true,\n          enumerable: true,\n          writable: true,\n          value: stored\n        });\n      }\n    });\n  }\n\n  install();\n})();";
var MARK = "data-dsh-kiligz-vision-boundary";
function inject3(html) {
  if (typeof html !== "string" || html.includes(MARK)) return html;
  const script = "<script " + MARK + ">" + PRELUDE.replace(/<\/script/gi, "<\\/script") + "</script>";
  const closeHead = html.indexOf("</head>");
  return closeHead < 0 ? html + script : html.slice(0, closeHead) + script + html.slice(closeHead);
}
function installBaseVisionClientBoundary(ctx) {
  ctx.inject?.(["webServer"], (webCtx) => {
    webCtx.effect(() => webCtx.webServer.tapIndex(inject3), "dsh-kiligz-base: Vision input boundary");
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
  installBaseVisionClientBoundary(ctx);
  ctx.plugin(automation, { ...AUTOMATION_DEFAULTS, ...config.automation });
  ctx.plugin(lib_exports);
  ctx.plugin(lib_exports2);
  ctx.plugin(skill_mcp_manager_exports);
  ctx.plugin(autoContinue);
  ctx.plugin(visionRouter, { progressiveTools: false, ...config.vision });
  ctx.plugin(betterSidebar, config.betterSidebar);
}
export {
  apply4 as apply,
  name3 as name
};
