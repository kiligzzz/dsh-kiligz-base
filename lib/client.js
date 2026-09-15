window.__ModuleLoader__.load({ id: "@kiligzzz/dsh-kiligz-base", factory: (require) => {
var module = { exports: {} }; var exports = module.exports;
const __dshKiligzFeatureFactories = [(require) => {
var module = { exports: {} }; var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.tsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime = require("react/jsx-runtime");
var NS = "session-archive";
var ROUTE = "/_dsh/session-archive";
var en = {
  nav: "Archived sessions",
  open: "Archived sessions",
  empty: "No archived sessions.",
  searchPlaceholder: "Search by title\u2026",
  searchEmpty: "No sessions match.",
  restore: "Restore",
  restoring: "Restoring\u2026",
  restored: "Restored",
  delete: "Delete",
  deleting: "Deleting\u2026",
  deleteTitle: "Delete session",
  deleteWarning: "This permanently deletes the session and its log from disk. This cannot be undone.",
  deleteConfirm: "Delete",
  deleteFailed: "Delete failed",
  deleteLiveError: "This session is still running. Please try again later.",
  failed: "Action failed",
  untitled: "Untitled session",
  ungrouped: "Ungrouped",
  now: "now",
  close: "Close",
  title: "Archived sessions",
  intro: "These sessions are hidden from every list. Current DSH exposes safe preview only; restore and permanent deletion are unavailable.",
  preview: "Preview",
  previewTitle: "Session preview",
  previewNote: "Showing user questions only.",
  previewLoading: "Loading\u2026",
  previewEmpty: "No questions to show.",
  previewFailed: "Preview failed"
};
function relativeTimeLabel(updatedAt, now, locale) {
  const diff = Math.max(0, now - updatedAt);
  const min = Math.floor(diff / 6e4);
  if (min < 1) return locale === "zh" ? "\u521A\u521A" : "now";
  if (min < 60) return locale === "zh" ? `${min}\u5206\u949F\u524D` : `${min}min`;
  const hours = Math.floor(min / 60);
  if (hours < 24) return locale === "zh" ? `${hours}\u5C0F\u65F6\u524D` : `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return locale === "zh" ? `${days}\u5929\u524D` : `${days}d`;
  const months = Math.floor(days / 30);
  if (months < 12) return locale === "zh" ? `${months}\u4E2A\u6708\u524D` : `${months}mo`;
  const years = Math.floor(months / 12);
  return locale === "zh" ? `${years}\u5E74\u524D` : `${years}y`;
}
function absoluteTimeLabel(updatedAt) {
  const d = new Date(updatedAt);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
var zh = {
  nav: "\u5DF2\u5F52\u6863\u4F1A\u8BDD",
  open: "\u5DF2\u5F52\u6863\u4F1A\u8BDD",
  empty: "\u8FD8\u6CA1\u6709\u5DF2\u5F52\u6863\u7684\u4F1A\u8BDD\u3002",
  searchPlaceholder: "\u6309\u6807\u9898\u641C\u7D22\u2026",
  searchEmpty: "\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD\u3002",
  restore: "\u6062\u590D",
  restoring: "\u6062\u590D\u4E2D\u2026",
  restored: "\u5DF2\u6062\u590D",
  delete: "\u5220\u9664",
  deleting: "\u5220\u9664\u4E2D\u2026",
  deleteTitle: "\u5220\u9664\u4F1A\u8BDD",
  deleteWarning: "\u8FD9\u5C06\u4ECE\u78C1\u76D8\u4E0A\u6C38\u4E45\u5220\u9664\u8BE5\u4F1A\u8BDD\u53CA\u5176\u65E5\u5FD7\uFF0C\u4E14\u65E0\u6CD5\u64A4\u9500\u3002",
  deleteConfirm: "\u5220\u9664",
  deleteFailed: "\u5220\u9664\u5931\u8D25",
  deleteLiveError: "\u8BE5\u4F1A\u8BDD\u4ECD\u5728\u8FD0\u884C\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u5220\u9664\u3002",
  failed: "\u64CD\u4F5C\u5931\u8D25",
  untitled: "\u672A\u547D\u540D\u4F1A\u8BDD",
  ungrouped: "\u672A\u5206\u7EC4",
  now: "\u521A\u521A",
  close: "\u5173\u95ED",
  title: "\u5DF2\u5F52\u6863\u4F1A\u8BDD",
  intro: "\u8FD9\u4E9B\u4F1A\u8BDD\u5DF2\u4ECE\u6240\u6709\u5217\u8868\u4E2D\u9690\u85CF\u3002\u5F53\u524D DSH \u53EA\u63D0\u4F9B\u5B89\u5168\u9884\u89C8\uFF0C\u6682\u4E0D\u652F\u6301\u6062\u590D\u6216\u6C38\u4E45\u5220\u9664\u3002",
  preview: "\u9884\u89C8",
  previewTitle: "\u4F1A\u8BDD\u9884\u89C8",
  previewNote: "\u4EC5\u5C55\u793A\u7528\u6237\u95EE\u9898\u3002",
  previewLoading: "\u52A0\u8F7D\u4E2D\u2026",
  previewEmpty: "\u6CA1\u6709\u53EF\u663E\u793A\u7684\u95EE\u9898\u3002",
  previewFailed: "\u9884\u89C8\u5931\u8D25"
};
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
async function postPreview(sessionId) {
  let response;
  try {
    response = await fetch(ROUTE, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "preview", sessionId })
    });
  } catch {
    return { ok: false, error: "Network request failed" };
  }
  let body;
  try {
    body = await response.json();
  } catch {
    return { ok: false, error: "Non-JSON response" };
  }
  if (response.ok && isRecord(body) && body.ok === true && isRecord(body.value)) {
    return { ok: true, preview: body.value.preview };
  }
  const failure = body;
  return { ok: false, error: failure.error?.message ?? `HTTP ${response.status}` };
}
function folderOf(id, workspaces) {
  for (const workspace of workspaces) {
    if (workspace.sessionIds.includes(id)) return workspace;
  }
  return void 0;
}
function buildGroups(archivedIds, byId, workspaces, t) {
  const groups = /* @__PURE__ */ new Map();
  const ungrouped = { key: "ungrouped", label: t("ungrouped"), sessions: [] };
  for (const id of archivedIds) {
    const summary = byId[id];
    if (summary === void 0) continue;
    const title = summary.title !== void 0 && summary.title.length > 0 ? summary.title : t("untitled");
    const workspace = folderOf(id, workspaces);
    const group = workspace === void 0 ? ungrouped : groups.get(workspace.workspaceId) ?? {
      key: workspace.workspaceId,
      label: workspace.title,
      path: workspace.path,
      sessions: []
    };
    if (workspace !== void 0) groups.set(workspace.workspaceId, group);
    group.sessions.push({ summary, title, updatedAt: summary.updatedAt });
  }
  const ordered = [];
  for (const workspace of workspaces) {
    const group = groups.get(workspace.workspaceId);
    if (group !== void 0 && group.sessions.length > 0) ordered.push(group);
  }
  if (ungrouped.sessions.length > 0) ordered.push(ungrouped);
  for (const group of ordered) {
    group.sessions.sort((a, b) => (b.updatedAt ?? -Infinity) - (a.updatedAt ?? -Infinity));
  }
  return ordered;
}
function matchesTitle(value, query) {
  return value.toLowerCase().includes(query);
}
function ArchivedRow({ title, updatedAt, onPreview, t }) {
  const now = Date.now();
  const locale = t("now") === "\u521A\u521A" ? "zh" : "en";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "dsa-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.StateDot, { state: "archived" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        className: "dsa-row-main",
        title: t("preview"),
        onClick: onPreview,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: title })
      }
    ),
    updatedAt !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "time",
      {
        className: "dsa-row-time",
        dateTime: new Date(updatedAt).toISOString(),
        title: absoluteTimeLabel(updatedAt),
        children: relativeTimeLabel(updatedAt, now, locale)
      }
    ) : null
  ] });
}
function PreviewModal({ session, loading, error, preview, onClose, t }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_dsh_client_ui_primitives.Modal,
    {
      open: true,
      className: "dsa-preview-modal",
      contentClassName: "dsa-preview-content",
      onClose,
      title: t("previewTitle"),
      closeLabel: t("close"),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsa-preview", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { className: "dsa-preview-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: preview?.title ?? session.title }),
          preview?.cwd !== void 0 && preview.cwd.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: preview.cwd }) : null,
          preview !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsa-preview-count", children: preview.questions.length }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsa-preview-note", children: t("previewNote") }),
        loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsa-preview-empty", children: t("previewLoading") }) : error !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "dsa-error", children: [
          t("previewFailed"),
          ": ",
          error
        ] }) : preview === void 0 || preview.questions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsa-preview-empty", children: t("previewEmpty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { className: "dsa-questions", children: preview.questions.map((question, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { className: "dsa-question", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsa-question-index", children: index + 1 }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsa-question-text", children: question.text.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: line }, i)) })
        ] }, question.seq)) })
      ] })
    }
  );
}
function PanelBody({ useWorkspaces, useSessions, t }) {
  const archivedIds = useWorkspaces((state) => state.archivedSessionIds);
  const byId = useSessions((state) => state.byId);
  const workspaces = useWorkspaces((state) => state.items);
  const [query, setQuery] = (0, import_react.useState)("");
  const [collapsed, setCollapsed] = (0, import_react.useState)(/* @__PURE__ */ new Set());
  const [previewing, setPreviewing] = (0, import_react.useState)(null);
  const [previewLoading, setPreviewLoading] = (0, import_react.useState)(false);
  const [previewData, setPreviewData] = (0, import_react.useState)(void 0);
  const [previewError, setPreviewError] = (0, import_react.useState)(void 0);
  const groups = (0, import_react.useMemo)(
    () => buildGroups(archivedIds ?? [], byId, workspaces, t),
    [archivedIds, byId, workspaces, t]
  );
  if (groups.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsa-empty", children: t("empty") });
  }
  const openPreview = (id, title) => {
    setPreviewing({ id, title });
    setPreviewLoading(true);
    setPreviewData(void 0);
    setPreviewError(void 0);
    void postPreview(id).then((result) => {
      setPreviewLoading(false);
      if (!result.ok) {
        setPreviewError(result.error);
        return;
      }
      setPreviewData(result.preview);
    });
  };
  const toggleGroup = (key) => {
    setCollapsed((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };
  const q = query.trim().toLowerCase();
  const visible = q.length === 0 ? groups : groups.map((group) => ({
    ...group,
    sessions: group.sessions.filter(({ title }) => matchesTitle(title, q))
  })).filter((group) => group.sessions.length > 0);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsa-body", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_dsh_client_ui_primitives.Input,
      {
        className: "dsa-search",
        value: query,
        onChange: (event) => {
          setQuery(event.target.value);
        },
        placeholder: t("searchPlaceholder")
      }
    ),
    visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsa-empty", children: t("searchEmpty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsa-groups", children: visible.map((group) => {
      const isCollapsed = collapsed.has(group.key);
      const groupSessions = group.sessions;
      if (groupSessions.length === 0) return null;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "dsa-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            type: "button",
            className: "dsa-group-head",
            "aria-expanded": !isCollapsed,
            onClick: () => {
              toggleGroup(group.key);
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsa-chevron", "data-open": !isCollapsed || void 0, "aria-hidden": "true", children: "\u25B8" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: group.label }),
              group.path !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: group.path }) : null,
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsa-group-count", children: groupSessions.length })
            ]
          }
        ),
        !isCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "dsa-list", children: groupSessions.map(({ summary, title, updatedAt }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ArchivedRow,
          {
            title,
            updatedAt,
            onPreview: () => {
              openPreview(summary.id, title);
            },
            t
          },
          summary.id
        )) }) : null
      ] }, group.key);
    }) }),
    previewing === null ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      PreviewModal,
      {
        session: previewing,
        loading: previewLoading,
        error: previewError,
        preview: previewData,
        onClose: () => {
          setPreviewing(null);
        },
        t
      }
    )
  ] });
}
function ArchiveIcon() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 16 16", width: "15", height: "15", "aria-hidden": "true", fill: "none", stroke: "currentColor", strokeWidth: "1.35", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2.5 3h11v3h-11V3Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 6h10v7H3V6Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6.5 9h3" })
  ] });
}
function FooterEntry({ useWorkspaces, useSessions, t, wide, ...rest }) {
  const [open, setOpen] = (0, import_react.useState)(false);
  const narrow = wide === false;
  const translate = t ?? ((key) => en[key]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: narrow ? "dsa-footer-wrap dsa-narrow" : "dsa-footer-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_dsh_client_ui_primitives.Button,
      {
        variant: "ghost",
        className: "dsa-footer-entry",
        onClick: () => {
          setOpen(true);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsa-footer-icon", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveIcon, {}) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsa-footer-label", children: translate("open") })
        ]
      }
    ) }),
    open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_dsh_client_ui_primitives.Modal,
      {
        open: true,
        className: "dsa-modal",
        contentClassName: "dsa-modal-content",
        onClose: () => {
          setOpen(false);
        },
        title: translate("title"),
        closeLabel: translate("close"),
        description: translate("intro"),
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelBody, { useWorkspaces, useSessions, t: translate })
      }
    ) : null
  ] });
}
var CSS = `
/* \u771F\u6B63\u7684\u5E03\u5C40\u5BB9\u5668\u662F sidebar \u5BBF\u4E3B\u7684 footerActions div\uFF08display:flex\uFF0C\u9ED8\u8BA4 row\uFF09\u3002
   slot wrapper [data-slot] \u672C\u8EAB\u662F display:contents\uFF08\u4E0D\u751F\u6210\u76D2\u5B50\uFF09\uFF0C\u76F4\u63A5\u5199\u5728\u5B83\u8EAB\u4E0A\u7684
   flex \u5C5E\u6027\u662F\u7A7A\u64CD\u4F5C\uFF0C\u5FC5\u987B\u7528 :has() \u9009\u4E2D\u5176\u7236\u5BB9\u5668\u3002
   \u5782\u76F4\u5806\u53E0\u540E\uFF0Ccordis-panel / \u63D2\u4EF6\u5E02\u573A / \u5DF2\u5F52\u6863\u4F1A\u8BDD \u4E09\u4E2A width:100% \u7684\u6574\u884C\u6309\u94AE\u5404\u5360
   \u4E00\u884C\uFF0C\u4EFB\u4F55\u4E00\u65B9\uFF08\u5305\u62EC\u4E34\u65F6\u6302\u8F7D\u7684 Cordis \u9762\u677F\uFF09\u90FD\u4E0D\u4F1A\u518D\u628A\u5176\u4ED6\u6761\u76EE\u6324\u51FA\u89C6\u53E3\uFF1B
   \u7A84 rail \u6A21\u5F0F\u4E0B\u6761\u76EE\u5404\u81EA\u662F 36px \u5706\u5F62\u56FE\u6807\uFF0C\u7AD6\u6392\u540C\u6837\u4E0D\u6EA2\u51FA\u3002 */
div:has(> [data-slot="sidebar.footer.action"]){flex-direction:column}
.dsa-footer-wrap{display:flex;width:100%;min-width:0;flex:none}
.dsa-footer-icon{display:inline-flex;align-items:center;justify-content:center;flex:none;line-height:0}
.dsa-footer-entry{display:flex;flex-direction:row;justify-content:flex-start !important;align-items:center;gap:8px;flex:1 1 auto;min-width:0;white-space:nowrap;overflow:hidden;padding-inline:var(--dsb-btn-pad-x,8px)}
.dsa-footer-label{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:0 1 auto;min-width:0}
.dsa-footer-wrap.dsa-narrow{width:auto !important;flex:none !important;justify-content:center}
.dsa-footer-wrap.dsa-narrow .dsa-footer-entry{width:36px !important;height:36px !important;flex:none;justify-content:center !important;align-items:center !important;gap:0 !important;padding:0 !important;border-radius:50%}
.dsa-footer-wrap.dsa-narrow .dsa-footer-entry:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dsa-footer-wrap.dsa-narrow .dsa-footer-label{display:none}
.dsa-modal{width:min(760px,94vw)!important;height:min(640px,88vh)!important;display:flex!important;flex-direction:column}
.dsa-modal-content{display:flex!important;flex-direction:column;flex:1;min-height:0}
.dsa-modal-content>div:last-child{flex:1;min-height:0;overflow:auto}
.dsa-body{display:grid;gap:10px;min-width:0;padding:2px 2px 12px}
.dsa-search{width:100%}
.dsa-empty{margin:0;color:var(--dsw-alias-label-tertiary);font-size:12px;padding:8px 2px}
.dsa-error{padding:8px 10px;border-radius:9px;background:rgba(205,72,72,.1);color:#aa3939;font-size:12px;line-height:1.4}
.dsa-groups{display:grid;gap:14px}
.dsa-group{display:grid;gap:6px}
.dsa-group-head{display:flex;align-items:center;gap:7px;min-width:0;padding:0;border:0;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer;width:100%}
.dsa-group-head:focus-visible{outline:2px solid var(--dsw-alias-border-l3);outline-offset:-2px;border-radius:6px}
.dsa-chevron{color:var(--dsw-alias-label-tertiary);font-size:10px;flex:none;transition:transform .14s ease}
.dsa-chevron[data-open]{transform:rotate(90deg)}
.dsa-group-head strong{font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dsa-group-head code{font-size:10px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.dsa-group-count{margin-left:auto;flex:none;font-size:10px;padding:2px 7px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary)}
.dsa-list{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.dsa-row{display:flex;align-items:center;gap:10px;padding:9px 10px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1)}
.dsa-row-main{min-width:0;flex:1;display:grid;gap:2px;padding:0;border:0;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer}
.dsa-row-main strong{font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dsa-row-time{flex:none;font-size:11px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;font-variant-numeric:tabular-nums;cursor:default}
.dsa-row-main:hover strong{color:var(--dsw-alias-label-primary)}
.dsa-row-main:focus-visible{outline:2px solid var(--dsw-alias-border-l3);outline-offset:-2px;border-radius:6px}
.dsa-row-main:disabled{cursor:default}
.dsa-preview-modal{width:min(540px,90vw)!important;height:min(480px,75vh)!important;display:flex!important;flex-direction:column}
.dsa-preview-content{display:flex!important;flex-direction:column;flex:1;min-height:0}
.dsa-preview-content>div:last-child{flex:1;min-height:0;overflow:auto}
.dsa-preview{display:grid;gap:8px;min-width:0}
.dsa-preview-head{display:flex;align-items:center;gap:8px;padding:2px 0 6px;border-bottom:1px solid var(--dsw-alias-border-l1)}
.dsa-preview-head strong{font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dsa-preview-head code{font-size:10px;color:var(--dsw-alias-label-tertiary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0}
.dsa-preview-count{margin-left:auto;flex:none;font-size:10px;padding:2px 8px;border-radius:999px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-tertiary)}
.dsa-preview-note{margin:0;padding:6px 10px;border-radius:8px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:11px;line-height:1.5}
.dsa-preview-empty{margin:0;padding:12px 2px;color:var(--dsw-alias-label-tertiary);font-size:12px}
.dsa-questions{list-style:none;margin:0;padding:0;display:grid;gap:8px}
.dsa-question{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1)}
.dsa-question-index{flex:none;font-size:11px;font-weight:650;color:var(--dsw-alias-label-tertiary);padding-top:1px;min-width:20px;text-align:right}
.dsa-question-text{margin:0;display:grid;gap:4px;min-width:0}
.dsa-question-text span{font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-word;color:var(--dsw-alias-label-primary)}
`;
function installStyles() {
  const id = "@kiligzzz/dsh-session-archive/client";
  const existing = document.querySelector(`style[data-plugin-css="${id}"]`);
  if (existing !== null) return () => {
  };
  const style = document.createElement("style");
  style.dataset.plugin = "@kiligzzz/dsh-session-archive";
  style.dataset.pluginCss = id;
  style.textContent = CSS;
  document.head.appendChild(style);
  return () => {
    style.remove();
  };
}
var inject = ["slots", "locale"];
function apply(ctx) {
  ctx.effect(installStyles, "@kiligzzz/dsh-session-archive: styles");
  ctx.effect(() => ctx.locale.register(NS, { en, zh }), "@kiligzzz/dsh-session-archive: locale");
  const t = ctx.locale.bind(NS);
  ctx.slots.inject("sidebar.footer.action", () => ctx.slots.register({
    name: "sidebar.footer.action",
    id: "session-archive",
    // 排在插件市场（community-market order=10）上方、Cordis 面板（默认 order=0）下方。
    order: 5,
    label: () => t("nav"),
    inject: () => ({ t })
  }, FooterEntry));
}

return module.exports; },
(require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    const React = require("react");
const { IconChevronDownOutline14, IconChevronRightOutline14, IconEditOutline16, IconFolderOpenOutline16, IconPlusOutline16, IconRefreshOutline16, IconTrashOutline16 } = require("@deepseek-ai/dsh-client-ui-primitives");
    const { Button, Modal } = require("@deepseek-ai/dsh-client-ui-primitives");

    // ── 样式注入 ──
    const CSS =
      ".cm-page{display:flex;flex-direction:column;gap:10px;height:100%;overflow:auto;padding:4px 2px 24px;font-size:13px;color:var(--dsw-alias-label-primary)}" +
      ".cm-head{display:flex;align-items:center;justify-content:space-between;gap:8px}" +
      ".cm-title{font-size:15px;font-weight:600;color:var(--dsw-alias-label-primary)}" +
      ".cm-sub{color:var(--dsw-alias-label-secondary);font-size:12px;margin-top:2px;line-height:1.5}" +
      ".cm-search{background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;color:var(--dsw-alias-label-primary);font-size:12.5px;padding:5px 8px;outline:none;width:100%;box-sizing:border-box}" +
      ".cm-search:focus{border-color:var(--dsw-alias-brand-primary)}" +
      ".cm-btn{background:transparent;border:1px solid var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);border-radius:6px;padding:4px 10px;font-size:12px;cursor:pointer;flex:none}" +
      ".cm-btn:hover{border-color:var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-primary)}" +
      ".cm-btn.primary{border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}" +
      ".cm-btn.danger{border-color:var(--dsw-alias-state-error-primary);color:var(--dsw-alias-state-error-primary);background:transparent}" +
      ".cm-list{display:flex;flex-direction:column;gap:6px}" +
      ".cm-item{display:flex;flex-direction:column;gap:4px;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:8px 10px}" +
      ".cm-item-row{display:flex;align-items:center;gap:8px;min-width:0}" +
      ".cm-item-name{font-weight:500;color:var(--dsw-alias-label-primary);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}" +
      ".cm-item-desc{color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}" +
      ".cm-src{color:var(--dsw-alias-label-secondary);font-size:11px;line-height:1.4;word-break:break-all}" +
      ".cm-toolbox{margin-top:2px;border:1px solid var(--dsw-alias-border-l1);border-radius:6px;padding:4px 8px;background:var(--dsw-alias-bg-layer-2)}" +
      ".cm-oauth-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:4px 0;border-bottom:1px dashed var(--dsw-alias-border-l1)}" +
      ".cm-toolrow{position:relative;display:flex;gap:8px;align-items:baseline;padding:3px 0;border-bottom:1px dashed var(--dsw-alias-border-l1)}" +
      ".cm-toolrow:last-child{border-bottom:none}" +
      ".cm-toolname{font-family:ui-monospace,Menlo,monospace;font-size:11.5px;color:var(--dsw-alias-label-primary);flex:none;min-width:130px}" +
      ".cm-tooldesc{font-size:11.5px;color:var(--dsw-alias-label-secondary);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;min-width:0}" +
      ".cm-tooltip{position:absolute;left:0;top:100%;background:#ffffff;border:1px solid #d5d5dd;border-radius:6px;padding:8px 10px;max-width:560px;max-height:240px;overflow:auto;font-size:12px;line-height:1.5;color:#33333c;white-space:pre-wrap;word-break:break-all;z-index:60;box-shadow:0 6px 22px rgba(0,0,0,.16), 0 1px 4px rgba(0,0,0,.08);opacity:0;visibility:hidden;transition:opacity .1s ease 0s, visibility 0s linear 0s}" +
      ".cm-toolrow:hover .cm-tooltip, .cm-tooltip:hover{opacity:1;visibility:visible;transition:opacity .12s ease .5s, visibility 0s linear .5s}" +
      ".cm-ico{background:none;border:none;color:var(--dsw-alias-label-secondary);cursor:pointer;font-size:13px;padding:2px 4px;border-radius:4px}" +
      ".cm-ico:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-2)}" +
      ".cm-ico.danger:hover{color:var(--dsw-alias-state-error-primary)}" +
      ".cm-switch{position:relative;width:30px;height:17px;border-radius:9px;background:var(--dsw-alias-border-l4);border:none;cursor:pointer;flex:none;padding:0;transition:background .15s}" +
      ".cm-switch::after{content:\"\";position:absolute;top:2px;left:2px;width:13px;height:13px;border-radius:50%;background:var(--dsw-static-neutral-bluish-00);transition:left .15s}" +
      ".cm-switch.on::after{left:15px}" +
      ".cm-badge{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:10.5px;border-radius:4px;padding:1px 6px;flex:none}" +
      ".cm-badge.link{color:var(--dsw-alias-brand-primary);border:1px solid var(--dsw-alias-brand-primary)}" +
      ".cm-dot{width:8px;height:8px;border-radius:50%;flex:none}" +
      ".cm-dot.on{background:var(--dsw-alias-state-success-primary)}" +
      ".cm-dot.off{background:var(--dsw-alias-label-tertiary)}" +
      ".cm-dot.err{background:var(--dsw-alias-state-warn-primary)}" +
      ".cm-tools{color:var(--dsw-alias-label-secondary);font-size:11.5px;flex:none}" +
      ".cm-err{color:var(--dsw-alias-state-warn-primary);font-size:12px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-state-warn-primary);border-radius:6px;padding:6px 8px;white-space:pre-wrap;word-break:break-all}" +
      ".cm-ok{color:var(--dsw-alias-state-success-primary);font-size:12px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-state-success-primary);border-radius:6px;padding:6px 8px;white-space:pre-wrap;word-break:break-all}" +
      ".cm-form{display:flex;flex-direction:column;gap:8px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1);border-radius:8px;padding:10px}" +
      ".cm-field{display:flex;flex-direction:column;gap:4px}" +
      ".cm-label{font-size:11.5px;color:var(--dsw-alias-label-secondary)}" +
      ".cm-input{background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;color:var(--dsw-alias-label-primary);font-size:12.5px;padding:5px 8px;outline:none}" +
      ".cm-input:focus{border-color:var(--dsw-alias-brand-primary)}" +
      ".cm-select{background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;color:var(--dsw-alias-label-primary);font-size:12.5px;padding:5px 8px;outline:none}" +
      ".cm-select:focus{border-color:var(--dsw-alias-brand-primary)}" +
      ".cm-textarea{background:var(--dsw-alias-bg-base);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;color:var(--dsw-alias-label-primary);font-size:12px;padding:6px 8px;outline:none;font-family:ui-monospace,Menlo,monospace;min-height:60px;resize:vertical}" +
      ".cm-textarea:focus{border-color:var(--dsw-alias-brand-primary)}" +
      ".cm-actions{display:flex;gap:6px;justify-content:flex-end}" +
      ".cm-empty{color:var(--dsw-alias-label-secondary);font-size:12.5px;padding:14px 4px;text-align:center}" +
      ".cm-sync{display:flex;flex-direction:column;gap:6px;background:var(--dsw-alias-bg-layer-2);border:1px dashed var(--dsw-alias-border-l2);border-radius:8px;padding:10px}" +
      ".cm-sync-row{display:flex;gap:6px;align-items:center}" +
      ".cm-sync-row .cm-input{flex:1}" +
      ".cm-modal{position:fixed;inset:0;background:rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center;z-index:1000}" +
      ".cm-modal-box{background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:16px 18px;min-width:320px;max-width:460px;box-shadow:0 8px 30px rgba(0,0,0,.25)}";
    const cssTagId = "@kiligzzz/dsh-skill-mcp-manager/styles";
    if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(cssTagId) + "]") === null) {
      const tag = document.createElement("style");
      tag.dataset.plugin = "@kiligzzz/dsh-skill-mcp-manager";
      tag.dataset.pluginCss = cssTagId;
      tag.textContent = CSS;
      document.head.appendChild(tag);
    }

    // ── REST API（skill-mcp-manager-host 提供）──
    async function apiGet(sessionId) {
      const query = sessionId ? "?sessionId=" + encodeURIComponent(sessionId) : "";
      const r = await fetch("/capabilities-api" + query);
      const d = await r.json();
      if (!d || d.ok !== true) throw new Error((d && d.error) || "请求失败");
      return d;
    }
    async function apiPost(path, body) {
      const r = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body || {}),
      });
      const d = await r.json();
      if (!d || d.ok !== true) throw new Error((d && d.error) || "请求失败");
      return d;
    }

    function msg(e) { return String((e && e.message) || e); }

    function Switch({ on, onChange }) {
      const label = on ? "点击禁用" : "点击启用";
      return React.createElement("button", {
        type: "button",
        role: "switch",
        "aria-checked": on,
        "aria-label": label,
        className: "cm-switch" + (on ? " on" : ""),
        onClick: (ev) => { ev.stopPropagation(); onChange(!on); },
        title: label,
      });
    }

    function ConfirmModal({ title, message, detail, confirmText, onConfirm, onCancel }) {
      return React.createElement(Modal, {
        open: true,
        title,
        closeLabel: "关闭",
        onClose: onCancel,
        className: "cm-confirm-modal",
        footer: React.createElement(React.Fragment, null,
          React.createElement(Button, { variant: "outline", onClick: onCancel }, "取消"),
          React.createElement(Button, { variant: "primary", className: "cm-danger-action", onClick: onConfirm }, confirmText || "删除"),
        ),
      },
      React.createElement("div", { className: "cm-confirm-copy" },
        React.createElement("p", null, message),
        detail ? React.createElement("code", null, detail) : null,
      ));
    }

    function normalizeName(fname) {
      return String(fname).replace(/\.md$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    }

    // ── Skill 管理页 ──
    function SkillPage({ sessionId }) {
      const [data, setData] = React.useState(null);
      const [search, setSearch] = React.useState("");
      const [syncSource, setSyncSource] = React.useState("");
      const [syncMsg, setSyncMsg] = React.useState("");
      const [confirmDel, setConfirmDel] = React.useState(null);
      const [err, setErr] = React.useState("");
      const fileRef = React.useRef(null);

      const refresh = () => apiGet(sessionId).then(setData).catch((e) => setErr(msg(e)));
      React.useEffect(() => { refresh(); }, [sessionId]);

      const toggle = (name, enabled) =>
        apiPost("/capabilities-api/skill/toggle", { name, enabled, sessionId }).then(refresh).catch((e) => setErr(msg(e)));
      const openEdit = (name) =>
        apiPost("/capabilities-api/skill/open", { name, sessionId }).catch((e) => setErr(msg(e)));
      const doDelete = () => {
        const item = confirmDel;
        setConfirmDel(null);
        apiPost("/capabilities-api/skill/delete", { name: item.name, sessionId }).then(refresh).catch((e) => setErr(msg(e)));
      };
      const onFile = (e) => {
        const f = e.target.files && e.target.files[0];
        e.target.value = "";
        if (!f) return;
        const reader = new FileReader();
        reader.onload = () => {
          const content = String(reader.result || "");
          const name = normalizeName(f.name);
          if (!name) { setErr("文件名无法转为 kebab-case"); return; }
          apiPost("/capabilities-api/skill/import", { name, content }).then(refresh).catch((x) => setErr(msg(x)));
        };
        reader.readAsText(f);
      };
      const doSync = () => {
        const source = syncSource.trim();
        if (!source) { setErr("请填写源文件夹路径"); return; }
        setSyncMsg("同步中…");
        apiPost("/capabilities-api/skill/sync", { source })
          .then((r) => {
            setSyncMsg("已同步: " + (r.synced || []).join(", ") + (r.skipped && r.skipped.length ? "；跳过: " + r.skipped.join(", ") : ""));
            refresh();
          })
          .catch((x) => { setSyncMsg(""); setErr(msg(x)); });
      };

      const all = data ? data.skills.catalog : [];
      const q = search.trim().toLowerCase();
      const items = q ? all.filter((s) => s.name.toLowerCase().includes(q) || String(s.description || "").toLowerCase().includes(q)) : all;
      const rows = items.map((s) =>
        React.createElement("div", { key: s.name, className: "cm-item" },
          React.createElement("div", { className: "cm-item-row" },
            React.createElement("span", { className: "cm-item-name", title: s.name }, s.name),
            React.createElement("span", { className: "cm-badge", title: s.resourceBase || s.source }, s.sourceLabel || s.source),
            s.synced ? React.createElement("span", { className: "cm-badge link", title: s.syncedSource ? "软链自 " + s.syncedSource : "软链" }, "同步") : null,
            s.editable ? React.createElement("button", { className: "cm-ico", title: "用系统编辑器打开", onClick: () => openEdit(s.name) }, React.createElement(IconEditOutline16, { size: 14 })) : null,
            s.editable ? React.createElement("button", { className: "cm-ico danger", title: "删除", onClick: () => setConfirmDel(s) }, React.createElement(IconTrashOutline16, { size: 14 })) : null,
            s.editable ? React.createElement(Switch, { on: s.enabled, onChange: (v) => toggle(s.name, v) }) : null,
          ),
          s.description ? React.createElement("div", { className: "cm-item-desc" }, s.description) : null,
          s.synced && s.syncedSource ? React.createElement("div", { className: "cm-src" }, "来源: " + s.syncedSource) : null,
        )
      );

      const delMsg = confirmDel
        ? (confirmDel.synced
            ? "「" + confirmDel.name + "」是软链同步的 skill，移除将只删除链接，源文件夹不受影响。"
            : "确定删除 skill「" + confirmDel.name + "」吗？其文件将被永久删除，不可恢复。")
        : "";

      return React.createElement("div", { className: "cm-page" },
        React.createElement("div", { className: "cm-head" },
          React.createElement("div", null,
            React.createElement("div", { className: "cm-title" }, "DSH Skill MCP Manager"),
            React.createElement("div", { className: "cm-sub" }, "当前会话的官方 Skill 目录；仅 ~/.dsh/skills 条目可修改"),
          ),
          React.createElement("button", { className: "cm-btn primary", onClick: () => fileRef.current && fileRef.current.click() }, React.createElement(React.Fragment, null, React.createElement(IconPlusOutline16, { size: 14 }), "导入 Skill")),
        ),
        React.createElement("input", { ref: fileRef, type: "file", accept: ".md,.markdown", style: { display: "none" }, onChange: onFile }),
        React.createElement("input", { className: "cm-search", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "搜索 skill…" }),
        React.createElement("div", { className: "cm-sync" },
          React.createElement("div", { className: "cm-label" }, "从文件夹同步（软链到 ~/.dsh/skills，源目录改动实时生效）"),
          React.createElement("div", { className: "cm-sync-row" },
            React.createElement("input", { className: "cm-input", value: syncSource, onChange: (e) => setSyncSource(e.target.value), placeholder: "/path/to/skills-folder" }),
            React.createElement("button", { className: "cm-btn primary", onClick: doSync }, "同步"),
          ),
          syncMsg ? React.createElement("div", { className: "cm-sub" }, syncMsg) : null,
        ),
        err ? React.createElement("div", { className: "cm-err" }, err) : null,
        rows.length ? React.createElement("div", { className: "cm-list" }, rows)
          : React.createElement("div", { className: "cm-empty" }, data ? (q ? "无匹配 skill。" : "暂无 Skill。点击「+ 导入 Skill」或从文件夹同步。") : "加载中…"),
        confirmDel ? React.createElement(ConfirmModal, {
          title: confirmDel.synced ? "移除同步 Skill" : "删除 Skill",
          message: delMsg,
          detail: confirmDel.synced && confirmDel.syncedSource ? "软链来源: " + confirmDel.syncedSource : undefined,
          confirmText: confirmDel.synced ? "移除链接" : "删除",
          onConfirm: doDelete,
          onCancel: () => setConfirmDel(null),
        }) : null,
      );
    }

    // ── MCP 管理页 ──
    function McpPage() {
      const [data, setData] = React.useState(null);
      const [search, setSearch] = React.useState("");
      const [expanded, setExpanded] = React.useState(null);
      const [form, setForm] = React.useState(null);
      const [confirmDel, setConfirmDel] = React.useState(null);
      const [confirmLogout, setConfirmLogout] = React.useState(null);
      const [oauthBusy, setOauthBusy] = React.useState({});
      const [oauthLinks, setOauthLinks] = React.useState({});
      const [err, setErr] = React.useState("");

      const refresh = () => apiGet().then(setData).catch((e) => setErr(msg(e)));
      React.useEffect(() => { refresh(); }, []);

      const emptyForm = () => ({ name: "", transport: "stdio", command: "npx", args: "", env: "", url: "", headers: "", authType: "none", description: "", enabled: true });
      const findServer = (name) => data && data.mcp.servers.find((s) => s.name === name);
      const openEdit = (s) => setForm({
        name: s.name, transport: s.transport,
        command: s.command || "", args: (s.args || []).join(", "),
        env: envText(s.env), url: s.url || "", headers: headersText(s.headers),
        authType: s.auth && s.auth.type === "oauth" ? "oauth" : "none",
        description: s.description || "", enabled: !!s.enabled,
      });
      const toggle = (name, enabled) =>
        apiPost("/capabilities-api/mcp/save", { server: findServer(name) ? Object.assign({}, findServer(name), { enabled }) : { name, enabled } })
          .then(refresh).catch((e) => setErr(msg(e)));
      const saveForm = () => {
        const s = form;
        const server = {
          name: s.name.trim(), transport: s.transport, command: s.command.trim(),
          args: s.args.split(",").map((x) => x.trim()).filter(Boolean),
          env: parseKv(s.env, "="), url: s.url.trim(), headers: parseKv(s.headers, ":"),
          auth: s.authType === "oauth" ? { type: "oauth" } : null,
          description: s.description.trim(), enabled: s.enabled,
        };
        apiPost("/capabilities-api/mcp/save", { server }).then(() => { setForm(null); refresh(); }).catch((e) => setErr(msg(e)));
      };
      const doDelete = () => {
        const name = confirmDel;
        setConfirmDel(null);
        apiPost("/capabilities-api/mcp/remove", { name }).then(refresh).catch((e) => setErr(msg(e)));
      };
      const [refreshing, setRefreshing] = React.useState({});
      const [refreshAllProgress, setRefreshAllProgress] = React.useState(null);
      const refreshAll = async () => {
        const servers = data ? data.mcp.servers : [];
        setRefreshAllProgress({ done: 0, total: servers.length });
        try {
          for (let i = 0; i < servers.length; i += 1) {
            await refreshOne(servers[i].name);
            setRefreshAllProgress({ done: i + 1, total: servers.length });
          }
        } finally { setRefreshAllProgress(null); }
      };
      const refreshOne = (name) => {
        setRefreshing((current) => Object.assign({}, current, { [name]: true }));
        return apiPost("/capabilities-api/mcp/catalog", { name }).then(refresh)
          .catch((e) => setErr(msg(e)))
          .finally(() => setRefreshing((current) => Object.assign({}, current, { [name]: false })));
      };
      const startOauth = (name) => {
        setErr("");
        const popup = window.open("about:blank", "_blank");
        if (popup) popup.opener = null;
        setOauthBusy((current) => Object.assign({}, current, { [name]: Date.now() }));
        apiPost("/capabilities-api/mcp/oauth/login", { name }).then((result) => {
          if (result.authorized) {
            if (popup) popup.close();
            setOauthBusy((current) => { const next = Object.assign({}, current); delete next[name]; return next; });
            return refreshOne(name);
          }
          if (!result.url) throw new Error("OAuth 登录未返回授权地址");
          if (popup) popup.location.href = result.url;
          else setOauthLinks((current) => Object.assign({}, current, { [name]: result.url }));
        }).catch((e) => {
          if (popup) popup.close();
          setOauthBusy((current) => { const next = Object.assign({}, current); delete next[name]; return next; });
          setErr(msg(e));
        });
      };
      const doOauthLogout = () => {
        const name = confirmLogout;
        setConfirmLogout(null);
        apiPost("/capabilities-api/mcp/oauth/logout", { name }).then(refresh).catch((e) => setErr(msg(e)));
      };
      React.useEffect(() => {
        const names = Object.keys(oauthBusy);
        if (!names.length) return undefined;
        const timer = setInterval(() => {
          apiGet().then((next) => {
            setData(next);
            setOauthBusy((current) => {
              const updated = Object.assign({}, current);
              for (const name of Object.keys(updated)) {
                const server = next.mcp.servers.find((item) => item.name === name);
                if (server && server.oauth && server.oauth.state === "authorized") {
                  delete updated[name];
                  setOauthLinks((links) => { const nextLinks = Object.assign({}, links); delete nextLinks[name]; return nextLinks; });
                } else if (Date.now() - updated[name] > 10 * 60 * 1000) {
                  delete updated[name];
                  setErr("OAuth 登录已超时，请重新认证");
                }
              }
              return updated;
            });
          }).catch((e) => setErr(msg(e)));
        }, 1500);
        return () => clearInterval(timer);
      }, [Object.keys(oauthBusy).sort().join("|")]);
      const openConfig = () => apiPost("/capabilities-api/mcp/open-config", {}).catch((e) => setErr(msg(e)));
      const copyLog = (text) => { try { navigator.clipboard.writeText(text); } catch (e) { /* ignore */ } };

      function parseKv(text, sep) {
        const out = {};
        String(text || "").split("\n").forEach((line) => {
          const i = line.indexOf(sep);
          if (i > 0) out[line.slice(0, i).trim()] = line.slice(i + 1).trim();
        });
        return out;
      }
      function envText(env) { return Object.keys(env || {}).map((k) => k + "=" + env[k]).join("\n"); }
      function headersText(headers) { return Object.keys(headers || {}).map((k) => k + ": " + headers[k]).join("\n"); }

      const all = data ? data.mcp.servers : [];
      const q = search.trim().toLowerCase();
      const servers = q ? all.filter((s) => s.name.toLowerCase().includes(q) || String(s.description || "").toLowerCase().includes(q)) : all;
      const rows = servers.map((s) => {
        const st = s.status || {};
        const dot = st.state === "available" ? "on" : (st.state === "error" ? "err" : "off");
        const toolList = Array.isArray(s.tools) ? s.tools : [];
        const catalog = s.catalog || {};
        const isOauth = !!(s.auth && s.auth.type === "oauth");
        const oauth = s.oauth || { state: "none" };
        const oauthLabel = oauth.state === "authorized" ? "已认证" : (oauth.state === "expired" ? "已过期" : (oauth.state === "error" ? "认证异常" : "未认证"));
        const countLabel = toolList.length ? String(toolList.length) + " tools" : (catalog.updatedAt ? "0 tools" : "工具未获取");
        const scopeLabel = (st.scope === "session" && s.enabled ? "按需加载 · " : "") + countLabel;
        return React.createElement("div", { key: s.name, className: "cm-item" },
          React.createElement("div", { className: "cm-item-row" },
            React.createElement("button", { className: "cm-ico", onClick: () => setExpanded(expanded === s.name ? null : s.name), title: toolList.length ? "展开工具列表" : "展开" }, React.createElement(expanded === s.name ? IconChevronDownOutline14 : IconChevronRightOutline14, { size: 14 })),
            React.createElement("span", { className: "cm-item-name", title: s.name }, s.name),
            React.createElement("span", { className: "cm-badge" }, "用户"),
            isOauth ? React.createElement("span", { className: "cm-badge", title: oauthLabel }, "OAuth") : null,
            React.createElement("span", { className: "cm-dot " + dot, title: st.state }),
            React.createElement("span", { className: "cm-tools" }, scopeLabel),
            React.createElement("button", { className: "cm-ico", title: "编辑", onClick: () => openEdit(s) }, React.createElement(IconEditOutline16, { size: 14 })),
            React.createElement("button", { className: "cm-ico", title: refreshing[s.name] ? "正在获取工具清单" : "刷新工具清单", disabled: !!refreshing[s.name], onClick: () => refreshOne(s.name) }, React.createElement(IconRefreshOutline16, { size: 14 })),
            React.createElement("button", { className: "cm-ico danger", title: "删除", onClick: () => setConfirmDel(s.name) }, React.createElement(IconTrashOutline16, { size: 14 })),
            React.createElement(Switch, { on: !!s.enabled, onChange: (v) => toggle(s.name, v) }),
          ),
          s.description ? React.createElement("div", { className: "cm-item-desc" }, s.description) : null,
          expanded === s.name && st.error ?
            React.createElement("div", { className: "cm-err" }, String(st.error),
              React.createElement("div", { className: "cm-actions", style: { marginTop: 6 } },
                React.createElement("button", { className: "cm-btn", onClick: () => copyLog(String(st.error)) }, "复制日志"),
              ),
            ) : null,
          expanded === s.name ?
            React.createElement("div", { className: "cm-toolbox" },
              isOauth ? React.createElement("div", { className: "cm-oauth-row" },
                React.createElement("span", { className: "cm-src" }, "OAuth：" + oauthLabel),
                oauthLinks[s.name] ? React.createElement("a", { className: "cm-btn", href: oauthLinks[s.name], target: "_blank", rel: "noopener noreferrer" }, "打开登录页") : null,
                oauth.state === "authorized"
                  ? React.createElement("button", { className: "cm-btn", onClick: () => setConfirmLogout(s.name) }, "退出")
                  : React.createElement("button", { className: "cm-btn", disabled: !!oauthBusy[s.name], onClick: () => startOauth(s.name) }, oauthBusy[s.name] ? "等待授权…" : "登录"),
              ) : null,
              catalog.updatedAt ? React.createElement("div", { className: "cm-src" }, "更新于 " + new Date(catalog.updatedAt).toLocaleString()) : null,
              catalog.error ? React.createElement("div", { className: "cm-err" }, catalog.error) : null,
              toolList.length
                ? toolList.map((t) => {
                    const tname = typeof t === "string" ? t : t.name;
                    const tdesc = typeof t === "string" ? "" : (t.description || "");
                    return React.createElement("div", { key: tname, className: "cm-toolrow" },
                      React.createElement("span", { className: "cm-toolname" }, tname),
                      tdesc ? React.createElement("span", { className: "cm-tooldesc" }, tdesc) : null,
                      tdesc ? React.createElement("div", { className: "cm-tooltip" }, tdesc) : null,
                    );
                  })
                : React.createElement("div", { className: "cm-src" }, refreshing[s.name] ? "正在获取工具清单…" : (catalog.updatedAt ? "此服务没有工具" : "尚未获取工具清单")),
            ) : null,
        );
      });

      const formEl = form ? React.createElement("div", { className: "cm-form" },
        React.createElement("div", { className: "cm-field" },
          React.createElement("span", { className: "cm-label" }, "名称 (kebab-case, 工具前缀 mcp__<name>__)"),
          React.createElement("input", { className: "cm-input", value: form.name, onChange: (e) => setForm(Object.assign({}, form, { name: e.target.value })) }),
        ),
        React.createElement("div", { className: "cm-field" },
          React.createElement("span", { className: "cm-label" }, "传输"),
          React.createElement("select", { className: "cm-select", value: form.transport, onChange: (e) => setForm(Object.assign({}, form, { transport: e.target.value })) },
            React.createElement("option", { value: "stdio" }, "stdio"),
            React.createElement("option", { value: "streamable-http" }, "streamable-http"),
          ),
        ),
        form.transport === "stdio" ?
          React.createElement(React.Fragment, null,
            React.createElement("div", { className: "cm-field" },
              React.createElement("span", { className: "cm-label" }, "命令"),
              React.createElement("input", { className: "cm-input", value: form.command, onChange: (e) => setForm(Object.assign({}, form, { command: e.target.value })) }),
            ),
            React.createElement("div", { className: "cm-field" },
              React.createElement("span", { className: "cm-label" }, "参数 (逗号分隔)"),
              React.createElement("input", { className: "cm-input", value: form.args, onChange: (e) => setForm(Object.assign({}, form, { args: e.target.value })) }),
            ),
            React.createElement("div", { className: "cm-field" },
              React.createElement("span", { className: "cm-label" }, "环境变量 (每行 KEY=value)"),
              React.createElement("textarea", { className: "cm-textarea", value: form.env, onChange: (e) => setForm(Object.assign({}, form, { env: e.target.value })) }),
            ),
          ) :
          React.createElement(React.Fragment, null,
            React.createElement("div", { className: "cm-field" },
              React.createElement("span", { className: "cm-label" }, "URL"),
              React.createElement("input", { className: "cm-input", value: form.url, onChange: (e) => setForm(Object.assign({}, form, { url: e.target.value })) }),
            ),
            React.createElement("div", { className: "cm-field" },
              React.createElement("span", { className: "cm-label" }, "认证"),
              React.createElement("select", { className: "cm-select", value: form.authType, onChange: (e) => setForm(Object.assign({}, form, { authType: e.target.value })) },
                React.createElement("option", { value: "none" }, "无 / 自定义请求头"),
                React.createElement("option", { value: "oauth" }, "OAuth（浏览器登录并自动刷新）"),
              ),
            ),
            React.createElement("div", { className: "cm-field" },
              React.createElement("span", { className: "cm-label" }, form.authType === "oauth" ? "附加请求头 (OAuth 会覆盖 Authorization)" : "请求头 (每行 Name: value，如 Authorization: Bearer xxx)"),
              React.createElement("textarea", { className: "cm-textarea", value: form.headers, onChange: (e) => setForm(Object.assign({}, form, { headers: e.target.value })) }),
            ),
          ),
        React.createElement("div", { className: "cm-field" },
          React.createElement("span", { className: "cm-label" }, "描述 (进入会话能力清单，帮助模型判断)"),
          React.createElement("input", { className: "cm-input", value: form.description, onChange: (e) => setForm(Object.assign({}, form, { description: e.target.value })) }),
        ),
        React.createElement("div", { className: "cm-field" },
          React.createElement("span", { className: "cm-label" }, "启用（允许会话根据描述按需加载）"),
          React.createElement("div", null, React.createElement(Switch, { on: form.enabled, onChange: (v) => setForm(Object.assign({}, form, { enabled: v })) })),
        ),
        React.createElement("div", { className: "cm-actions" },
          React.createElement("button", { className: "cm-btn", onClick: () => setForm(null) }, "取消"),
          React.createElement("button", { className: "cm-btn primary", onClick: saveForm }, "保存"),
        ),
      ) : null;

      return React.createElement("div", { className: "cm-page" },
        React.createElement("div", { className: "cm-head" },
          React.createElement("div", null,
            React.createElement("div", { className: "cm-title" }, "MCP 管理"),
            React.createElement("div", { className: "cm-sub" }, "统一管理MCP服务，配置文件：~/.dsh/mcp.json"),
          ),
          React.createElement("div", { className: "cm-actions", style: { gap: 6 } },
            React.createElement("button", { className: "cm-btn", onClick: refreshAll, disabled: !data || refreshAllProgress !== null || Object.values(refreshing).some(Boolean), title: "刷新所有已配置 MCP 的工具清单" }, refreshAllProgress ? "刷新中 " + refreshAllProgress.done + "/" + refreshAllProgress.total : React.createElement(React.Fragment, null, React.createElement(IconRefreshOutline16, { size: 14 }), "刷新全部工具")),
            React.createElement("button", { className: "cm-btn", onClick: openConfig }, React.createElement(React.Fragment, null, React.createElement(IconFolderOpenOutline16, { size: 14 }), "打开配置文件")),
            React.createElement("button", { className: "cm-btn primary", onClick: () => setForm(emptyForm()) }, React.createElement(React.Fragment, null, React.createElement(IconPlusOutline16, { size: 14 }), "配置 MCP")),
          ),
        ),
        err ? React.createElement("div", { className: "cm-err" }, err) : null,
        React.createElement("input", { className: "cm-search", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "搜索 MCP server…" }),
        formEl,
        rows.length ? React.createElement("div", { className: "cm-list" }, rows)
          : React.createElement("div", { className: "cm-empty" }, data ? (q ? "无匹配 MCP server。" : "暂无 MCP server。点击「+ 配置 MCP」或编辑 ~/.dsh/mcp.json。") : "加载中…"),
        confirmDel ? React.createElement(ConfirmModal, {
          title: "删除 MCP Server",
          message: "确定删除 MCP server「" + confirmDel + "」吗？将从 ~/.dsh/mcp.json 移除并卸载活跃会话中的对应工具。",
          confirmText: "删除",
          onConfirm: doDelete,
          onCancel: () => setConfirmDel(null),
        }) : null,
        confirmLogout ? React.createElement(ConfirmModal, {
          title: "退出 OAuth",
          message: "确定退出「" + confirmLogout + "」的 OAuth 吗？共享同一认证资源的 MCP 会同时退出。",
          confirmText: "退出",
          onConfirm: doOauthLogout,
          onCancel: () => setConfirmLogout(null),
        }) : null,
      );
    }

    module.exports = {
      name: "@kiligzzz/dsh-skill-mcp-manager",
      // 0.1.2+ 兼容：客户端服务需在 bundle 内声明 inject（exports.inject，服务名列表）。
      // slots 为 hardDependency，缺失时 loader 抛 "cannot get property slots without inject"。
      inject: ["slots"],
      apply() {},
    };
    module.exports.__dshKiligz = { SkillPage, McpPage };
return module.exports;
  },
(require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_store = require("@deepseek-ai/dsh-client-store");
		//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		/** Max emphasized-text tint alpha (schema bound for the inline-code chips). */
		const EMPHASIS_ALPHA_MAX = .45;
		/**
		* The color roles the customizer exposes. Each role maps to one or more
		* `--dsw-alias-*` tokens; an empty string means "keep the stock token".
		* Bubble roles were removed: the harness renders its only bubble background
		* on user messages (assistant turns have none), so bubbles now follow the
		* accent color instead of owning separate settings.
		*/
		const APPEARANCE_ROLES = [
			"accent",
			"background",
			"panel",
			"input",
			"text",
			"border"
		];
		/** The section with every color role left stock and every effect off.
		* The accent defaults to the harness brand blue so a fresh install reads
		* as the stock theme — buttons, links and chips all ride that blue. */
		const DEFAULT_SETTINGS = {
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
			emphasisAlpha: .22,
			preset: ""
		};
		/** Number fields and their schema bounds, used to sanitize persisted input. */
		const NUMERIC_BOUNDS = {
			backgroundOpacity: {
				min: 0,
				max: 1
			},
			backgroundBlur: {
				min: 0,
				max: 30
			},
			scrim: {
				min: 0,
				max: 1
			},
			surfaceAlpha: {
				min: 0,
				max: 1
			},
			inputAlpha: {
				min: 0,
				max: 1
			},
			codeAlpha: {
				min: 0,
				max: 1
			},
			conversationGlassBlur: {
				min: 0,
				max: 20
			},
			glassBlur: {
				min: 0,
				max: 20
			},
			emphasisAlpha: {
				min: 0,
				max: EMPHASIS_ALPHA_MAX
			}
		};
		/** Boolean fields, used to sanitize persisted input. */
		const BOOLEAN_FIELDS = [
			"imageDark",
			"sidebarOpaque",
			"conversationGlass",
			"aistudioComposer",
			"glassComposer",
			"glowComposer"
		];
		/** Canonicalize a hex color: lowercase, 3-digit expanded to 6-digit. */
		function normalizeHex(value) {
			if (value.length === 4) {
				const [, r, g, b] = value;
				return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
			}
			return value.toLowerCase();
		}
		/**
		* Validate and coerce one parsed settings document against the schema, so
		* hand-edited or stale localStorage can never produce invalid CSS (e.g. a
		* string blur feeding `${value}px` or an alpha outside 0..1). Unknown fields
		* are dropped; every field that fails its check falls back to the default.
		* Legacy persisted `1`/`0` booleans (older checkbox writes) are coerced to
		* real booleans so existing users keep their settings.
		* @param raw - the parsed localStorage section, or any foreign value.
		* @returns a complete, schema-valid settings section.
		*/
		function sanitizeSettings(raw) {
			if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return { ...DEFAULT_SETTINGS };
			const source = raw;
			const result = { ...DEFAULT_SETTINGS };
			for (const role of APPEARANCE_ROLES) {
				const value = source[role];
				if (typeof value === "string" && (value === "" || /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(value))) result[role] = value === "" ? "" : normalizeHex(value);
			}
			const strings = [
				"backgroundImage",
				"backgroundVideo",
				"preset"
			];
			const index = result;
			for (const field of strings) {
				const value = source[field];
				if (typeof value === "string") index[field] = value;
			}
			for (const [field, { min, max }] of Object.entries(NUMERIC_BOUNDS)) {
				const value = source[field];
				if (typeof value === "number" && Number.isFinite(value)) index[field] = Math.min(max, Math.max(min, value));
			}
			for (const field of BOOLEAN_FIELDS) {
				const value = source[field];
				if (typeof value === "boolean") result[field] = value;
				else if (value === 0) result[field] = false;
				else if (value === 1) result[field] = true;
			}
			return result;
		}
		//#endregion
		//#region src/client/color.ts
		const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
		/**
		* Validate a user-typed hex color.
		* @param value - candidate `#rgb` or `#rrggbb` string.
		* @returns whether the value is a valid hex color.
		*/
		function isHexColor(value) {
			return HEX_RE.test(value);
		}
		/**
		* Parse a hex color to rgb channels.
		* @param value - `#rgb` or `#rrggbb` string.
		* @returns the parsed channels.
		*/
		function parseHex(value) {
			const hex = value.slice(1);
			if (hex.length === 3) {
				const first = hex.slice(0, 1);
				return {
					r: parseInt(first + first, 16),
					g: parseInt(hex.slice(1, 2) + hex.slice(1, 2), 16),
					b: parseInt(hex.slice(2, 3) + hex.slice(2, 3), 16)
				};
			}
			return {
				r: parseInt(hex.slice(0, 2), 16),
				g: parseInt(hex.slice(2, 4), 16),
				b: parseInt(hex.slice(4, 6), 16)
			};
		}
		/**
		* Format rgb channels back to a canonical lowercase `#rrggbb` string.
		* @param channels - the rgb channels to format.
		* @returns the hex color string.
		*/
		function formatHex(channels) {
			const to = (channel) => channel.toString(16).padStart(2, "0");
			return `#${to(channels.r)}${to(channels.g)}${to(channels.b)}`;
		}
		/**
		* Mix a color toward a base by weight: `weight = 0` returns the color,
		* `weight = 1` returns the base.
		* @param value - source hex color.
		* @param base - target hex color.
		* @param weight - 0..1 fraction of the base in the result.
		* @returns the mixed hex color.
		*/
		function mixHex(value, base, weight) {
			const from = parseHex(value);
			const to = parseHex(base);
			const channel = (a, b) => Math.round(a + (b - a) * weight);
			return formatHex({
				r: channel(from.r, to.r),
				g: channel(from.g, to.g),
				b: channel(from.b, to.b)
			});
		}
		/**
		* Render a hex color with an alpha channel as an rgba() string.
		* @param value - `#rgb` or `#rrggbb` string.
		* @param alpha - 0..1 opacity.
		* @returns the rgba() CSS color.
		*/
		function withAlpha(value, alpha) {
			const { r, g, b } = parseHex(value);
			return `rgba(${r}, ${g}, ${b}, ${alpha})`;
		}
		const HEX6_RE = /^#[0-9a-fA-F]{6}$/;
		/**
		* Relative luminance of a 6-digit hex color, 0 (black) .. 1 (white), using
		* sRGB weights. Used to keep foreground text readable over user-picked
		* backgrounds.
		* @param value - `#rrggbb` string.
		* @returns the luminance, or 0 for malformed input.
		*/
		function relativeLuminance(value) {
			const hex = /^#[0-9a-fA-F]{3}$/.test(value) ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}` : value;
			if (!HEX6_RE.test(hex)) return 0;
			const r = parseInt(hex.slice(1, 3), 16) / 255;
			const g = parseInt(hex.slice(3, 5), 16) / 255;
			const b = parseInt(hex.slice(5, 7), 16) / 255;
			const linear = (c) => c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
			return .2126 * linear(r) + .7152 * linear(g) + .0722 * linear(b);
		}
		/**
		* Whether a hex color counts as "dark" for the surface-family flip (relative
		* luminance below 0.18).
		* @param value - `#rrggbb` string.
		* @returns whether the color is dark.
		*/
		function isDarkColor(value) {
			return relativeLuminance(value) < .18;
		}
		//#endregion
		//#region src/client/image.ts
		/**
		* Browser-side image preparation for the background upload: samples the
		* source brightness and accent color, and resamples only when the longest
		* edge exceeds the decode-safe bound (quality-first WebP). The payload is
		* otherwise stored as the original bytes — no recompression, no quality loss.
		*/
		/** Input file size cap (bytes). Deliberately generous: images persist in
		* IndexedDB, not localStorage, so this is a sanity guard against absurd
		* files (multi-hundred-MB scans), not a real constraint. */
		const MAX_INPUT_BYTES = 209715200;
		/** Longest-edge bound above which an image is resampled. Beyond this, decode
		* and GPU texture costs get pathological; a quality-0.95 WebP keeps it
		* visually indistinguishable. */
		const RESAMPLE_EDGE = 4096;
		/** Quality used when resampling oversized images. */
		const RESAMPLE_QUALITY = .95;
		/** Average-brightness threshold below which an image counts as dark. */
		const IMAGE_DARK_THRESHOLD = .35;
		/** Hue buckets for the accent sampler (12 bins of 30°). */
		const ACCENT_HUE_BUCKETS = 12;
		/** Saturation floor for a pixel to count toward the accent (ignores grays). */
		const ACCENT_MIN_SATURATION = .18;
		/** Target lightness the sampled accent is normalized to. */
		const ACCENT_TARGET_LIGHTNESS = .46;
		/** Target saturation the sampled accent is normalized to. */
		const ACCENT_TARGET_SATURATION = .5;
		/** MIME types accepted by the upload controls. */
		const ACCEPTED_IMAGE_TYPES = [
			"image/jpeg",
			"image/png",
			"image/webp",
			"image/gif",
			"image/avif"
		];
		/**
		* Fit a bitmap so its longest edge is at most `maxEdge`, preserving aspect.
		* @param width - source width.
		* @param height - source height.
		* @param maxEdge - longest-edge bound in px.
		* @returns the fitted size.
		*/
		function fitWithin(width, height, maxEdge) {
			const safe = (v) => Number.isFinite(v) && v > 0 ? Math.round(v) : 1;
			if (!Number.isFinite(width) || !Number.isFinite(height) || !Number.isFinite(maxEdge) || maxEdge <= 0) return {
				width: safe(width),
				height: safe(height)
			};
			if (width <= 0 || height <= 0) return {
				width: safe(width),
				height: safe(height)
			};
			const scale = Math.min(1, maxEdge / Math.max(width, height));
			return {
				width: Math.round(width * scale),
				height: Math.round(height * scale)
			};
		}
		/**
		* Sample the average brightness of a bitmap on a fixed small grid, so the
		* cost stays constant regardless of file size.
		* @param bmp - the decoded source bitmap.
		* @returns true when the average perceived luminance is below the dark threshold.
		*/
		function sampleImageDarkness(bmp) {
			const grid = 24;
			const canvas = document.createElement("canvas");
			canvas.width = grid;
			canvas.height = grid;
			const context = canvas.getContext("2d");
			if (context === null) return false;
			context.drawImage(bmp, 0, 0, grid, grid);
			let data;
			try {
				data = context.getImageData(0, 0, grid, grid).data;
			} catch (_readbackUnavailable) {
				return false;
			}
			let sum = 0;
			for (let i = 0; i < data.length; i += 4) {
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				sum += (.299 * r + .587 * g + .114 * b) / 255;
			}
			return sum / 576 < IMAGE_DARK_THRESHOLD;
		}
		/**
		* Sample a dominant, readable accent color from a bitmap: bucket pixels by
		* hue (ignoring near-gray and near-black/white), weight each bucket by its
		* saturation, take the strongest bucket's average RGB, then normalize the
		* hue-preserving lightness/saturation so the result works as an accent on
		* light surfaces (dark enough for white text). Pure utility — no DOM.
		* @param bmp - the decoded source bitmap.
		* @returns a `#rrggbb` hex, or null when the image has no usable hue.
		*/
		function sampleAccentColor(bmp) {
			const grid = 32;
			const canvas = document.createElement("canvas");
			canvas.width = grid;
			canvas.height = grid;
			const context = canvas.getContext("2d");
			if (context === null) return null;
			context.drawImage(bmp, 0, 0, grid, grid);
			let data;
			try {
				data = context.getImageData(0, 0, grid, grid).data;
			} catch (_readbackUnavailable) {
				return null;
			}
			const buckets = new Array(ACCENT_HUE_BUCKETS);
			for (let i = 0; i < ACCENT_HUE_BUCKETS; i += 1) buckets[i] = [
				0,
				0,
				0,
				0,
				0
			];
			for (let i = 0; i < data.length; i += 4) {
				const r = data[i] / 255;
				const g = data[i + 1] / 255;
				const b = data[i + 2] / 255;
				const max = Math.max(r, g, b);
				const min = Math.min(r, g, b);
				const l = (max + min) / 2;
				if (l < .08 || l > .92 || max - min < ACCENT_MIN_SATURATION) continue;
				let hue = 0;
				if (max === min) continue;
				const delta = max - min;
				if (max === r) hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
				else if (max === g) hue = ((b - r) / delta + 2) / 6;
				else hue = ((r - g) / delta + 4) / 6;
				const acc = buckets[Math.min(11, Math.floor(hue * ACCENT_HUE_BUCKETS))];
				acc[0] += r;
				acc[1] += g;
				acc[2] += b;
				acc[3] += 1;
				acc[4] += delta;
			}
			let best;
			let bestScore = -1;
			for (const acc of buckets) {
				if (acc[3] === 0) continue;
				const score = acc[3] * (acc[4] / acc[3]);
				if (score > bestScore) {
					bestScore = score;
					best = acc;
				}
			}
			if (best === void 0) return null;
			const [rSum, gSum, bSum, count] = best;
			return hslToHex(rgbToHsl(rSum / count, gSum / count, bSum / count, ACCENT_TARGET_SATURATION, ACCENT_TARGET_LIGHTNESS));
		}
		/** RGB (0..1) → HSL, optionally re-clamped to the given saturation/lightness. */
		function rgbToHsl(r, g, b, sat, light) {
			const max = Math.max(r, g, b);
			const min = Math.min(r, g, b);
			const l = (max + min) / 2;
			let h = 0;
			let s = 0;
			if (max !== min) {
				const delta = max - min;
				s = l > .5 ? delta / (2 - max - min) : delta / (max + min);
				if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
				else if (max === g) h = ((b - r) / delta + 2) / 6;
				else h = ((r - g) / delta + 4) / 6;
			}
			return [
				h,
				sat ?? s,
				light ?? l
			];
		}
		/** HSL (h: 0..1, s/l: 0..1) → `#rrggbb`. */
		function hslToHex([h, s, l]) {
			const hue = (h - Math.floor(h)) * 6;
			const c = (1 - Math.abs(2 * l - 1)) * s;
			const x = c * (1 - Math.abs(hue % 2 - 1));
			const m = l - c / 2;
			let rgb;
			if (hue < 1) rgb = [
				c,
				x,
				0
			];
			else if (hue < 2) rgb = [
				x,
				c,
				0
			];
			else if (hue < 3) rgb = [
				0,
				c,
				x
			];
			else if (hue < 4) rgb = [
				0,
				x,
				c
			];
			else if (hue < 5) rgb = [
				x,
				0,
				c
			];
			else rgb = [
				c,
				0,
				x
			];
			const toHex = (v) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
			return `#${toHex(rgb[0])}${toHex(rgb[1])}${toHex(rgb[2])}`;
		}
		/**
		* Derive a coordinated dark palette from one accent color: the background
		* family steps through lightness (background → panel → input), so the
		* surfaces share the wallpaper hue without all being the same color. The
		* text role is deliberately left alone — the user's text color stays in
		* control.
		* @param accentHex - the sampled accent (`#rrggbb`).
		* @returns the derived role colors.
		*/
		function derivePalette(accentHex) {
			const [h, s] = rgbToHsl(...hexToRgb(accentHex));
			const hex = (sat, light) => hslToHex([
				h,
				sat,
				light
			]);
			return {
				background: hex(s * .35, .1),
				panel: hex(s * .35, .16),
				input: hex(s * .35, .21),
				border: hex(s * .25, .34)
			};
		}
		/** `#rrggbb` → RGB (0..1). */
		function hexToRgb(hex) {
			return [
				Number.parseInt(hex.slice(1, 3), 16) / 255,
				Number.parseInt(hex.slice(3, 5), 16) / 255,
				Number.parseInt(hex.slice(5, 7), 16) / 255
			];
		}
		/**
		* Prepare an image blob for the background: enforce the sanity size cap,
		* sample darkness/accent, and resample only when the longest edge exceeds
		* `RESAMPLE_EDGE` (quality-first encode, alpha preserved for PNG). Undecodable
		* formats (and animated GIFs within the edge bound) pass through as-is.
		* @param source - the image payload to prepare.
		* @returns the prepared payload with its sampled metadata.
		*/
		async function prepareImage(source) {
			if (!source.type.startsWith("image/")) throw new Error(`unsupported file type "${source.type}"`);
			if (source.size > 209715200) throw new Error(`image exceeds the ${MAX_INPUT_BYTES / 1024 / 1024}MB input limit`);
			const bitmap = await tryDecode(source);
			if (bitmap === void 0) return {
				blob: source,
				imageDark: false,
				accent: null
			};
			try {
				const imageDark = sampleImageDarkness(bitmap);
				const accent = sampleAccentColor(bitmap);
				if (Math.max(bitmap.width, bitmap.height) <= 4096) return {
					blob: source,
					imageDark,
					accent
				};
				return {
					blob: await resampleWithinEdge(bitmap, source.type === "image/png"),
					imageDark,
					accent
				};
			} finally {
				bitmap.close();
			}
		}
		/** Decode the blob to a bitmap, or undefined when the format is unsupported. */
		async function tryDecode(source) {
			try {
				return await createImageBitmap(source);
			} catch (_unsupportedImageFormat) {
				return;
			}
		}
		/**
		* Resample an oversized bitmap down to the `RESAMPLE_EDGE` bound. Encodes
		* WebP at near-lossless quality; browsers without WebP encoding fall back to
		* PNG (lossless, larger). Animated sources lose animation here — accepted,
		* since only >4096px files take this path.
		* @param bitmap - decoded oversized source.
		* @param keepAlpha - whether to preserve a transparent channel (PNG).
		* @returns the resampled blob.
		*/
		async function resampleWithinEdge(bitmap, keepAlpha) {
			const size = fitWithin(bitmap.width, bitmap.height, RESAMPLE_EDGE);
			const canvas = document.createElement("canvas");
			canvas.width = size.width;
			canvas.height = size.height;
			const ctx = canvas.getContext("2d");
			if (ctx === null) throw new Error("canvas unavailable for resampling");
			ctx.drawImage(bitmap, 0, 0, size.width, size.height);
			return canvasToBlob(canvas, keepAlpha, RESAMPLE_QUALITY);
		}
		/**
		* Encode a canvas to a blob: PNG keeps alpha; everything else prefers WebP
		* at the given quality and falls back through PNG when WebP is unsupported.
		* @param canvas - the drawn canvas.
		* @param keepAlpha - whether transparency must survive.
		* @param quality - encoder quality for lossy formats.
		* @returns the encoded blob, rejecting when encoding fails entirely.
		*/
		function canvasToBlob(canvas, keepAlpha, quality) {
			const type = keepAlpha ? "image/png" : "image/webp";
			return new Promise((resolve, reject) => {
				canvas.toBlob((blob) => {
					if (blob !== null && blob.type === type) {
						resolve(blob);
						return;
					}
					canvas.toBlob((fallback) => {
						if (fallback === null) reject(/* @__PURE__ */ new Error("image encoding failed"));
						else resolve(fallback);
					}, "image/png");
				}, type, quality);
			});
		}
		//#endregion
		//#region src/client/blob-db.ts
		/**
		* Shared IndexedDB database for the plugin's background blobs (videos and
		* images). One database, one version, one upgrade path: both object stores
		* are created idempotently so either store file can open the database first.
		*/
		/** Database identity. */
		const DB_NAME = "dsh-ui-appearance";
		/** Object store holding background video blobs keyed by record id. */
		const VIDEO_STORE = "videos";
		/** Object store holding background image blobs keyed by record id. */
		const IMAGE_STORE = "images";
		/**
		* Open (and create/upgrade) the blob database, resolving once it is ready.
		* @returns the opened database connection.
		*/
		function openBlobDb() {
			return new Promise((resolve, reject) => {
				const request = indexedDB.open(DB_NAME, 2);
				request.onupgradeneeded = () => {
					const db = request.result;
					if (!db.objectStoreNames.contains("videos")) db.createObjectStore(VIDEO_STORE);
					if (!db.objectStoreNames.contains("images")) db.createObjectStore(IMAGE_STORE);
				};
				request.onsuccess = () => {
					resolve(request.result);
				};
				request.onerror = () => {
					reject(request.error ?? /* @__PURE__ */ new Error("indexeddb open failed"));
				};
			});
		}
		/**
		* Wrap one IDB transaction in a promise, resolving after the transaction commits.
		* @param storeName - object store the transaction touches.
		* @param mode - transaction mode.
		* @param action - the request to run against the store.
		* @returns the request's result, resolved only after commit.
		*/
		function runBlobTx(storeName, mode, action) {
			return new Promise((resolve, reject) => {
				openBlobDb().then((db) => {
					const transaction = db.transaction(storeName, mode);
					const request = action(transaction.objectStore(storeName));
					let result;
					request.onsuccess = () => {
						result = request.result;
					};
					request.onerror = () => {
						reject(request.error ?? /* @__PURE__ */ new Error("indexeddb request failed"));
					};
					transaction.oncomplete = () => {
						db.close();
						resolve(result);
					};
					transaction.onerror = () => {
						reject(transaction.error ?? /* @__PURE__ */ new Error("indexeddb transaction failed"));
					};
				}, reject);
			});
		}
		/** Generate one record key (time-ordered prefix + random suffix). */
		function newBlobKey() {
			return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
		}
		//#endregion
		//#region src/client/image-store.ts
		/**
		* IndexedDB-backed storage for background images. Images ride the same
		* database as videos (blob-db.ts) so the settings section only carries a
		* short record key instead of a multi-megabyte data URL — the localStorage
		* quota never sees the payload.
		*/
		/**
		* Store an image blob and return its record key.
		* @param blob - the image payload (original bytes, or resampled oversized ones).
		* @param name - original file name.
		* @returns the record key to persist in the settings section.
		*/
		async function saveImage(blob, name) {
			const record = {
				data: blob,
				name
			};
			const key = newBlobKey();
			await runBlobTx(IMAGE_STORE, "readwrite", (store) => store.put(record, key));
			return key;
		}
		/**
		* Load a stored image by key.
		* @param key - record key from the settings section.
		* @returns the image blob, or undefined when absent.
		*/
		async function getImage(key) {
			const record = await runBlobTx(IMAGE_STORE, "readonly", (store) => store.get(key));
			if (record === void 0) return void 0;
			return record.data;
		}
		/**
		* Delete a stored image by key.
		* @param key - record key to remove.
		* @returns settlement of the delete transaction.
		*/
		function deleteImage(key) {
			return runBlobTx(IMAGE_STORE, "readwrite", (store) => store.delete(key));
		}
		//#endregion
		//#region src/client/video-store.ts
		/**
		* IndexedDB-backed storage for background videos. Videos are too large for
		* localStorage, so the settings section only carries the record key; the
		* blob lives here and is streamed into the background layer on demand.
		* Database open/upgrade lives in blob-db.ts (shared with image-store).
		*/
		/** Video upload cap (bytes); larger files are refused up front. */
		const MAX_VIDEO_BYTES = 52428800;
		/** MIME types accepted by the video upload control. */
		const ACCEPTED_VIDEO_TYPES = [
			"video/mp4",
			"video/webm",
			"video/ogg"
		];
		/**
		* Store a video blob and return its record key.
		* @param blob - the video payload.
		* @param name - original file name.
		* @returns the record key to persist in the settings section.
		*/
		async function saveVideo(blob, name) {
			if (blob.size > 52428800) throw new Error(`video exceeds the ${MAX_VIDEO_BYTES / 1024 / 1024}MB limit`);
			const record = {
				data: blob,
				name
			};
			const key = newBlobKey();
			await runBlobTx(VIDEO_STORE, "readwrite", (store) => store.put(record, key));
			return key;
		}
		/**
		* Load a stored video by key, materialized back into a Blob.
		* @param key - record key from the settings section.
		* @returns the video blob, or undefined when absent.
		*/
		async function getVideo(key) {
			const record = await runBlobTx(VIDEO_STORE, "readonly", (store) => store.get(key));
			if (record === void 0) return void 0;
			if (record.data instanceof Blob) return record.data;
			return new Blob([record.data], { type: record.type ?? "" });
		}
		/**
		* Delete a stored video by key.
		* @param key - record key to remove.
		* @returns settlement of the delete transaction.
		*/
		function deleteVideo(key) {
			return runBlobTx(VIDEO_STORE, "readwrite", (store) => store.delete(key));
		}
		//#endregion
		//#region src/client/url-load.ts
		/**
		* Loading background media from a remote URL: fetch the resource, then feed
		* it through the same image/video pipelines as local uploads (preparation,
		* darkness sampling, IndexedDB storage). CORS-unfriendly hosts are reported
		* as a distinct user-facing error instead of a silent failure.
		*/
		/** Video extensions the URL classifier recognizes. */
		const VIDEO_EXT = /\.(mp4|webm|ogg|mov|m4v)([?#]|$)/i;
		/** A remote-load failure carrying a user-facing code. */
		var UrlLoadFailure = class extends Error {
			/** The user-facing failure code. */
			code;
			constructor(code) {
				super(code);
				this.code = code;
			}
		};
		/**
		* Guess the media kind from the URL. Extension-based; unknown extensions
		* default to image (a wrong guess surfaces as a type error after fetch).
		* @param url - the remote URL.
		* @returns the guessed kind.
		*/
		function classifyUrl(url) {
			return VIDEO_EXT.test(url) ? "video" : "image";
		}
		/**
		* Fetch a remote resource as a blob, mapping failures to user-facing codes.
		* @param url - the remote URL.
		* @returns the fetched blob.
		* @throws UrlLoadFailure with a 'cors', 'http' or 'network' code.
		*/
		async function fetchBlob(url) {
			let response;
			try {
				response = await fetch(url, { mode: "cors" });
			} catch {
				throw new UrlLoadFailure("cors");
			}
			if (!response.ok) throw new UrlLoadFailure("http");
			let blob;
			try {
				blob = await response.blob();
			} catch {
				throw new UrlLoadFailure("network");
			}
			if (blob.size === 0) throw new UrlLoadFailure("network");
			return blob;
		}
		/**
		* Derive a display name from the URL path (the stored record's name).
		* @param url - the remote URL.
		* @returns the file-name part of the path, or 'background'.
		*/
		function urlToName(url) {
			try {
				const name = new URL(url).pathname.split("/").pop();
				return name !== void 0 && name !== "" ? name : "background";
			} catch {
				return "background";
			}
		}
		/** Fallback MIME per guessed kind when the server omits Content-Type. */
		function mimeFor(kind) {
			return kind === "video" ? "video/mp4" : "image/jpeg";
		}
		/**
		* Load an image from a URL through the preparation pipeline.
		* @param url - the remote image URL.
		* @returns the prepared result (blob + darkness flag).
		* @throws UrlLoadFailure with a 'type' or 'size' code past the fetch stage.
		*/
		async function loadImageFromUrl(url) {
			const kind = classifyUrl(url);
			const blob = await fetchBlob(url);
			const type = blob.type === "" ? mimeFor(kind) : blob.type;
			if (!type.startsWith("image/")) throw new UrlLoadFailure("type");
			if (blob.size > 209715200) throw new UrlLoadFailure("size");
			return prepareImage(new File([blob], urlToName(url), { type }));
		}
		/**
		* Load a video from a URL into a File ready for the IndexedDB store.
		* @param url - the remote video URL.
		* @returns the video file.
		* @throws UrlLoadFailure with a 'type' or 'size' code past the fetch stage.
		*/
		async function loadVideoFromUrl(url) {
			const kind = classifyUrl(url);
			const blob = await fetchBlob(url);
			const type = blob.type === "" ? mimeFor(kind) : blob.type;
			if (!type.startsWith("video/")) throw new UrlLoadFailure("type");
			if (blob.size > 52428800) throw new UrlLoadFailure("size");
			return new File([blob], urlToName(url), { type });
		}
		//#endregion
		//#region src/client/color-scheme.ts
		/**
		* Color scheme export/import: a portable JSON carrier for the eight color
		* roles. Pure functions — no DOM, no storage — so the format is unit-testable
		* and shared by the settings row.
		*/
		/** Current scheme format version. */
		const SCHEME_VERSION = 1;
		/**
		* Serialize the current color roles into the portable scheme JSON.
		* @param settings - current appearance settings.
		* @returns the scheme JSON string.
		*/
		function exportColorScheme(settings) {
			const colors = {};
			for (const role of APPEARANCE_ROLES) colors[role] = settings[role];
			return JSON.stringify({
				version: SCHEME_VERSION,
				colors
			}, null, 2);
		}
		/**
		* Parse and validate an imported scheme JSON.
		* @param json - the pasted scheme text.
		* @returns the validated role colors, or throws with a descriptive message.
		*/
		function parseColorScheme(json) {
			let raw;
			try {
				raw = JSON.parse(json);
			} catch {
				throw new Error("not valid JSON");
			}
			if (typeof raw !== "object" || raw === null || Array.isArray(raw)) throw new Error("scheme root must be an object");
			const colors = raw.colors;
			if (typeof colors !== "object" || colors === null || Array.isArray(colors)) throw new Error("scheme.colors must be an object");
			const result = {};
			for (const [role, value] of Object.entries(colors)) {
				if (!APPEARANCE_ROLES.includes(role)) continue;
				if (value !== "" && !(typeof value === "string" && isHexColor(value))) throw new Error(`role "${role}" has an invalid color: ${JSON.stringify(value)}`);
				result[role] = value;
			}
			return result;
		}
		//#endregion
		//#region src/client/tokens.ts
		/** Override-layer source name pinned to this package (also names inspection). */
		const OVERRIDE_SOURCE = "@deepseek-ai/dsh-client-ui-appearance";
		/** Mode base a derived step mixes toward: light mixes toward white. */
		const LIGHT_BASE = "#ffffff";
		/** Mode base a derived step mixes toward: dark mixes toward near-black. */
		const DARK_BASE = "#151517";
		/** Ink painted ON a light label fill (badge letters, selection text). */
		const LIGHT_INK = "#fafaf9";
		/** Ink painted ON a dark label fill (host stock light-mode label). */
		const DARK_INK = "#0f1115";
		/**
		* The on-ink counterpart of a label color. The sidebar wordmark's "harness"
		* badge paints its chip with `currentColor` (the label color) and its letters
		* with `--dsw-alias-label-primary-inverted`; `::selection` pairs its
		* background with `-foreground` the same way. Overriding the label color
		* without re-deriving these two breaks both pairings — a white chip keeps
		* the stock light-mode white letters and the badge disappears.
		*/
		const onInk = (label) => {
			const contrast = (ink) => {
				const a = relativeLuminance(label);
				const b = relativeLuminance(ink);
				return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
			};
			return contrast(LIGHT_INK) >= contrast(DARK_INK) ? LIGHT_INK : DARK_INK;
		};
		/**
		* Stock surface colors per mode (design-platform.css alias tokens, resolved
		* to their static steps). The translucent pass bakes these into rgba() when
		* no role color or dark-flip value applies; keep in sync with the theme
		* package's design-platform.css.
		*/
		const DEFAULT_SURFACE_COLORS = {
			"--dsw-alias-bg-base": {
				light: "#ffffff",
				dark: "#151517"
			},
			"--dsw-alias-bg-layer-1": {
				light: "#ffffff",
				dark: "#232324"
			},
			"--dsw-alias-bg-layer-2": {
				light: "#ffffff",
				dark: "#2c2c2e"
			},
			"--dsw-alias-bg-layer-3": {
				light: "#ffffff",
				dark: "#353638"
			},
			"--dsw-alias-bg-overlay": {
				light: "#e9ecf2",
				dark: "#61666b"
			},
			"--dsw-alias-bg-module-platform": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-bg-multi-select": {
				light: "#f5f6f7",
				dark: "#2c2c2e"
			},
			"--dsw-specific-sidebar-fill": {
				light: "#f9fafb",
				dark: "#1b1b1c"
			},
			"--dsw-specific-input-major": {
				light: "#ffffff",
				dark: "#2c2c2e"
			},
			"--dsw-specific-bubble-highlight": {
				light: "#d3e2ff",
				dark: "#43454a"
			},
			"--dsw-specific-bubble": {
				light: "#edf3fe",
				dark: "#2c2c2e"
			},
			"--dsw-specific-sidebar-nav-item-active": {
				light: "#ebeef2",
				dark: "#43454a"
			},
			"--dsw-specific-sidebar-nav-item-hover": {
				light: "#f1f3f5",
				dark: "#2c2c2e"
			},
			"--dsw-specific-menu": {
				light: "#ffffff",
				dark: "#353638"
			},
			"--dsw-specific-selector": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-fill-l2": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-interactive-bg-hover-solid": {
				light: "#f1f3f5",
				dark: "#353638"
			},
			"--dsw-specific-tip": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-markdown-inline-code": {
				light: "#ebeef2",
				dark: "#2c2c2e"
			},
			"--dsw-alias-markdown-code-block": {
				light: "#f9fafb",
				dark: "#1b1b1c"
			},
			"--dsw-alias-markdown-code-block-banner": {
				light: "#f9fafb",
				dark: "#2c2c2e"
			},
			"--dsw-alias-button-elevated-fill": {
				light: "#ffffff",
				dark: "#43454a"
			},
			"--dsw-alias-button-floating-fill": {
				light: "#ffffff",
				dark: "#2c2c2e"
			},
			"--dsw-alias-button-floating-hover": {
				light: "#f1f3f5",
				dark: "#353638"
			},
			"--dsw-alias-button-primary-fill": {
				light: "#4176e6",
				dark: "#679efe"
			},
			"--dsw-alias-button-info-fill": {
				light: "#4176e6",
				dark: "#679efe"
			},
			"--dsw-alias-button-info-hover": {
				light: "#679efe",
				dark: "#4176e6"
			},
			"--dsw-alias-button-primary-hover": {
				light: "#43454a",
				dark: "#ebeef2"
			}
		};
		/**
		* Compute the full override layer for one settings snapshot. Every role with
		* a non-empty color contributes its token group; a surfaceAlpha below 1 turns
		* the major surface tokens translucent. Returns an empty object when nothing
		* is customized, which removes the override layer entirely.
		* @param settings - current appearance settings.
		* @returns token-name → per-mode value pairs.
		*/
		function buildTokenOverrides(settings) {
			const tokens = {};
			const emit = (name, light, dark) => {
				tokens[name] = {
					light,
					dark
				};
			};
			const modePair = (value) => [value, value];
			const step = (value, weight) => [mixHex(value, LIGHT_BASE, weight), mixHex(value, DARK_BASE, weight)];
			const { accent, background, panel, input, text, border, backgroundImage, imageDark, surfaceAlpha, inputAlpha, codeAlpha, sidebarOpaque, emphasisAlpha } = settings;
			let infoHover;
			let primaryHover;
			if (accent !== "") {
				const [light, dark] = modePair(accent);
				emit("--dsw-alias-brand-primary", light, dark);
				emit("--dsw-alias-state-business-primary", light, dark);
				emit("--dsw-alias-button-info-fill", light, dark);
				infoHover = step(accent, .15);
				emit("--dsw-alias-button-info-hover", infoHover[0], infoHover[1]);
				primaryHover = step(accent, .22);
				emit("--dsw-alias-button-primary-hover", primaryHover[0], primaryHover[1]);
				emit("--dsw-specific-bubble", light, dark);
				emit("--dsw-specific-bubble-highlight", light, dark);
			}
			if (background !== "") {
				const [light, dark] = modePair(background);
				emit("--dsw-alias-bg-base", light, dark);
				const [l1l, l1d] = step(background, .04);
				emit("--dsw-alias-bg-layer-1", l1l, l1d);
				const [l2l, l2d] = step(background, .08);
				emit("--dsw-alias-bg-layer-2", l2l, l2d);
				const [l3l, l3d] = step(background, .14);
				emit("--dsw-alias-bg-layer-3", l3l, l3d);
				const [modl, modd] = step(background, .06);
				emit("--dsw-alias-bg-module-platform", modl, modd);
				const [ovl, ovd] = step(background, .18);
				emit("--dsw-alias-bg-overlay", ovl, ovd);
				if (panel === "") {
					const [sideL, sideD] = step(background, .05);
					emit("--dsw-specific-sidebar-fill", sideL, sideD);
				}
			}
			if (panel !== "") {
				const [light, dark] = modePair(panel);
				emit("--dsw-alias-bg-layer-1", light, dark);
				const [l2l, l2d] = step(panel, .08);
				emit("--dsw-alias-bg-layer-2", l2l, l2d);
				const [l3l, l3d] = step(panel, .14);
				emit("--dsw-alias-bg-layer-3", l3l, l3d);
				const [ovl, ovd] = step(panel, .1);
				emit("--dsw-alias-bg-overlay", ovl, ovd);
				const [modl, modd] = step(panel, .06);
				emit("--dsw-alias-bg-module-platform", modl, modd);
				const [sideL, sideD] = step(panel, .04);
				emit("--dsw-specific-sidebar-fill", sideL, sideD);
			}
			if (input !== "") {
				const [light, dark] = modePair(input);
				emit("--dsw-specific-input-major", light, dark);
				const [loginL, loginD] = step(input, .06);
				emit("--dsw-specific-login-input", loginL, loginD);
			}
			if (text !== "") {
				const [light, dark] = modePair(text);
				emit("--dsw-alias-label-primary", light, dark);
				const [secL, secD] = step(text, .38);
				emit("--dsw-alias-label-secondary", secL, secD);
				const [terL, terD] = step(text, .58);
				emit("--dsw-alias-label-tertiary", terL, terD);
				const ink = onInk(light);
				emit("--dsw-alias-label-primary-inverted", ink, ink);
				emit("--dsw-alias-label-primary-foreground", ink, ink);
			}
			if (border !== "") {
				const [light, dark] = modePair(border);
				emit("--dsw-alias-border-l1", light, dark);
				emit("--dsw-alias-border-l2", light, dark);
				const [l3l, l3d] = step(border, .3);
				emit("--dsw-alias-border-l3", l3l, l3d);
			}
			const controlBase = panel !== "" ? panel : background;
			let controlButtonFill;
			let controlButtonHover;
			let controlNavActive;
			let controlNavHover;
			if (controlBase !== "") {
				const lift = (weight) => {
					const mixed = mixHex(controlBase, LIGHT_BASE, weight);
					return [mixed, mixed];
				};
				const emphasize = (weight) => [mixHex(controlBase, DARK_BASE, weight), mixHex(controlBase, LIGHT_BASE, weight)];
				controlButtonFill = lift(.06);
				controlButtonHover = lift(.12);
				controlNavActive = emphasize(.1);
				controlNavHover = emphasize(.05);
				emit("--dsw-alias-button-elevated-fill", controlButtonFill[0], controlButtonFill[1]);
				emit("--dsw-alias-button-floating-fill", controlButtonFill[0], controlButtonFill[1]);
				emit("--dsw-alias-button-floating-hover", controlButtonHover[0], controlButtonHover[1]);
				emit("--dsw-specific-sidebar-nav-item-active", controlNavActive[0], controlNavActive[1]);
				emit("--dsw-specific-sidebar-nav-item-hover", controlNavHover[0], controlNavHover[1]);
				emit("--dsw-specific-selector", controlButtonFill[0], controlButtonFill[1]);
				emit("--dsw-alias-interactive-bg-hover-solid", controlButtonHover[0], controlButtonHover[1]);
			}
			if (backgroundImage !== "") emit("--dsw-alias-bg-base", "transparent", "transparent");
			const flipBase = backgroundImage !== "" ? imageDark ? "#151517" : void 0 : background !== "" && isDarkColor(background) ? background : void 0;
			let flipLayer1;
			let flipLayer2;
			let flipSidebar;
			let flipButtonElevated;
			let flipButtonFloating;
			let flipButtonFloatingHover;
			if (flipBase !== void 0) {
				flipLayer1 = mixHex(flipBase, LIGHT_BASE, .06);
				flipLayer2 = mixHex(flipBase, LIGHT_BASE, .12);
				flipSidebar = mixHex(flipBase, LIGHT_BASE, .03);
				flipButtonElevated = "rgb(67, 69, 74)";
				flipButtonFloating = "rgb(44, 44, 46)";
				flipButtonFloatingHover = "rgb(53, 54, 56)";
				emit("--dsw-alias-bg-layer-1", flipLayer1, flipLayer1);
				emit("--dsw-alias-bg-layer-2", flipLayer2, flipLayer2);
				emit("--dsw-specific-sidebar-fill", flipSidebar, flipSidebar);
				if (text === "") {
					emit("--dsw-alias-label-primary", "#fafaf9", "#fafaf9");
					emit("--dsw-alias-label-secondary", "#d6d3d1", "#d6d3d1");
					emit("--dsw-alias-label-primary-inverted", DARK_INK, DARK_INK);
					emit("--dsw-alias-label-primary-foreground", DARK_INK, DARK_INK);
				}
				emit("--dsw-alias-button-elevated-fill", flipButtonElevated, flipButtonElevated);
				emit("--dsw-alias-button-floating-fill", flipButtonFloating, flipButtonFloating);
				emit("--dsw-alias-button-floating-hover", flipButtonFloatingHover, flipButtonFloatingHover);
				emit("--dsw-specific-sidebar-nav-item-active", flipButtonElevated, flipButtonElevated);
				emit("--dsw-specific-sidebar-nav-item-hover", flipButtonFloating, flipButtonFloating);
				emit("--dsw-specific-selector", flipButtonFloating, flipButtonFloating);
				emit("--dsw-alias-interactive-bg-hover-solid", flipButtonFloatingHover, flipButtonFloatingHover);
			}
			const bakeAlpha = (token, explicit, flip, a) => {
				if (explicit === "transparent") {
					emit(token, "transparent", "transparent");
					return;
				}
				const base = explicit !== void 0 && explicit !== "" ? {
					light: explicit,
					dark: explicit
				} : flip !== void 0 ? {
					light: flip,
					dark: flip
				} : DEFAULT_SURFACE_COLORS[token] ?? {
					light: LIGHT_BASE,
					dark: DARK_BASE
				};
				emit(token, withAlpha(base.light, a), withAlpha(base.dark, a));
			};
			const bakeAccent = (token, a) => {
				if (accent === "") {
					bakeAlpha(token, void 0, void 0, a);
					return;
				}
				const [light, dark] = modePair(accent);
				emit(token, withAlpha(light, a), withAlpha(dark, a));
			};
			bakeAlpha("--dsw-specific-input-major", input, void 0, inputAlpha);
			bakeAlpha("--dsw-alias-markdown-code-block", void 0, void 0, codeAlpha);
			bakeAlpha("--dsw-alias-markdown-code-block-banner", void 0, void 0, codeAlpha);
			if (surfaceAlpha < 1) {
				const alpha = surfaceAlpha;
				const translucent = (token, explicit, flip) => {
					bakeAlpha(token, explicit, flip, alpha);
				};
				translucent("--dsw-alias-bg-base", backgroundImage !== "" ? "transparent" : background, void 0);
				translucent("--dsw-alias-bg-layer-1", panel, flipLayer1);
				translucent("--dsw-alias-bg-layer-2", panel !== "" ? mixHex(panel, LIGHT_BASE, .08) : void 0, flipLayer2);
				translucent("--dsw-alias-bg-layer-3", void 0, void 0);
				translucent("--dsw-alias-bg-overlay", void 0, void 0);
				translucent("--dsw-alias-bg-module-platform", void 0, void 0);
				translucent("--dsw-alias-bg-multi-select", void 0, void 0);
				if (!sidebarOpaque) translucent("--dsw-specific-sidebar-fill", panel ?? background, flipSidebar);
				translucent("--dsw-specific-bubble", accent, void 0);
				translucent("--dsw-specific-bubble-highlight", accent, void 0);
				const bakeControl = (token, derived, flip) => {
					if (flip !== void 0) {
						emit(token, withAlpha(flip, alpha), withAlpha(flip, alpha));
						return;
					}
					if (derived !== void 0) {
						emit(token, withAlpha(derived[0], alpha), withAlpha(derived[1], alpha));
						return;
					}
					bakeAlpha(token, void 0, void 0, alpha);
				};
				bakeControl("--dsw-alias-button-elevated-fill", controlButtonFill, flipButtonElevated);
				bakeControl("--dsw-alias-button-floating-fill", controlButtonFill, flipButtonFloating);
				bakeControl("--dsw-alias-button-floating-hover", controlButtonHover, flipButtonFloatingHover);
				bakeControl("--dsw-specific-sidebar-nav-item-active", controlNavActive, flipButtonElevated);
				bakeControl("--dsw-specific-sidebar-nav-item-hover", controlNavHover, flipButtonFloating);
				translucent("--dsw-specific-menu", void 0, void 0);
				translucent("--dsw-alias-fill-l2", void 0, void 0);
				bakeControl("--dsw-alias-interactive-bg-hover-solid", controlButtonHover, flipButtonFloatingHover);
				translucent("--dsw-specific-tip", void 0, void 0);
				const inlineCodeBase = accent !== "" && accent !== void 0 ? accent : "#4176e6";
				const inlineCodeBaseDark = accent !== "" && accent !== void 0 ? accent : "#679efe";
				emit("--dsw-alias-markdown-inline-code", withAlpha(inlineCodeBase, emphasisAlpha), withAlpha(inlineCodeBaseDark, emphasisAlpha));
			}
			if (surfaceAlpha < 1 || inputAlpha < 1) {
				bakeAccent("--dsw-alias-button-primary-fill", inputAlpha);
				bakeAccent("--dsw-alias-button-info-fill", inputAlpha);
				const bakeInputHover = (token, derived) => {
					if (derived !== void 0) {
						emit(token, withAlpha(derived[0], inputAlpha), withAlpha(derived[1], inputAlpha));
						return;
					}
					bakeAlpha(token, void 0, void 0, inputAlpha);
				};
				bakeInputHover("--dsw-alias-button-info-hover", infoHover);
				bakeInputHover("--dsw-alias-button-primary-hover", primaryHover);
				const plusBase = flipButtonFloating ?? controlButtonFill?.[0];
				if (plusBase !== void 0) emit("--dsw-specific-selector", withAlpha(plusBase, inputAlpha), withAlpha(plusBase, inputAlpha));
				else bakeAlpha("--dsw-specific-selector", void 0, void 0, inputAlpha);
			}
			return tokens;
		}
		/** The shipped presets; `default` clears every role color. */
		const APPEARANCE_PRESETS = [
			{
				id: "default",
				colors: {}
			},
			{
				id: "midnight",
				colors: {
					accent: "#7c9cff",
					background: "#1b1e2c",
					panel: "#232737",
					input: "#202435",
					text: "#e6e9f4",
					border: "#343a52"
				}
			},
			{
				id: "ocean",
				colors: {
					accent: "#4fc3f7",
					background: "#0c2231",
					panel: "#12303f",
					input: "#0f2a38",
					text: "#e1f1fa",
					border: "#1e455c"
				}
			},
			{
				id: "forest",
				colors: {
					accent: "#81c784",
					background: "#12241b",
					panel: "#183026",
					input: "#152b21",
					text: "#e7f0ea",
					border: "#2b4637"
				}
			},
			{
				id: "rose",
				colors: {
					accent: "#f48fb1",
					background: "#291a21",
					panel: "#36232d",
					input: "#2e1f27",
					text: "#f7e9ee",
					border: "#4a3340"
				}
			},
			{
				id: "monochrome",
				colors: {
					accent: "#b4b4b9",
					background: "#17171a",
					panel: "#202025",
					input: "#1c1c20",
					text: "#eeeef0",
					border: "#333338"
				}
			}
		];
		//#endregion
		//#region \0dsh-css:/Users/ivan/dsh/plugins/dsh-kiligz-base/vendor/features/ui-appearance/src/client/AppearanceCustomizerRow.module.css.mjs
		const css = ".zA5oWG_group{border-bottom:1px solid var(--dsw-alias-border-l2);padding:16px 0}.zA5oWG_body{flex-direction:column;gap:18px;padding:14px 0 4px;display:flex}.zA5oWG_section{flex-direction:column;gap:10px;display:flex}.zA5oWG_sectionTitle{color:var(--dsw-alias-label-secondary);font-size:13px;font-weight:500;line-height:20px}.zA5oWG_chipRow{flex-wrap:wrap;gap:8px;display:flex}.zA5oWG_chip{border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:999px;padding:5px 12px;font-size:13px;line-height:20px}.zA5oWG_chip:hover:not(.zA5oWG_chipSelected){background:var(--dsw-alias-interactive-bg-hover)}.zA5oWG_chipSelected{background:var(--dsw-alias-bg-module-platform);border-color:var(--dsw-static-neutral-bluish-400)}.zA5oWG_colorGrid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px 16px;display:grid}.zA5oWG_colorField{align-items:center;gap:8px;min-width:0;display:flex}.zA5oWG_colorLabel{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:13px;line-height:20px;overflow:hidden}.zA5oWG_colorSwatch{border:1px solid var(--dsw-alias-border-l2);cursor:pointer;border-radius:6px;flex:none;width:26px;height:26px;position:relative;overflow:hidden}.zA5oWG_colorSwatchInput{opacity:0;cursor:pointer;border:none;width:100%;height:100%;padding:0;position:absolute;inset:0}.zA5oWG_colorHex{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-specific-input-major);width:66px;color:var(--dsw-alias-label-primary);font:inherit;text-transform:lowercase;border-radius:6px;flex:none;padding:4px 8px;font-size:12px;line-height:18px}.zA5oWG_uploadRow{flex-wrap:wrap;align-items:center;gap:10px;display:flex}.zA5oWG_fileInput{display:none}.zA5oWG_urlRow{align-items:center;gap:10px;margin-top:10px;display:flex}.zA5oWG_urlInput{border:1px solid var(--dsw-alias-border-l2);min-width:0;font:inherit;color:var(--dsw-alias-label-primary);background:0 0;border-radius:8px;flex:1;padding:5px 10px;font-size:13px;line-height:20px}.zA5oWG_urlInput::placeholder{color:var(--dsw-alias-label-tertiary)}.zA5oWG_urlInput:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-1px}.zA5oWG_thumb{border:1px solid var(--dsw-alias-border-l2);object-fit:cover;border-radius:6px;flex:none;width:52px;height:32px}.zA5oWG_ghostButton{border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:8px;padding:5px 12px;font-size:13px;line-height:20px}.zA5oWG_ghostButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.zA5oWG_ghostButton:disabled{cursor:default;opacity:.55}.zA5oWG_sliderRow{align-items:center;gap:10px;display:flex}.zA5oWG_sliderLabel{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;line-height:20px}.zA5oWG_slider{appearance:none;background:var(--dsw-static-neutral-bluish-600);border-radius:999px;flex:auto;min-width:96px;height:16px}.zA5oWG_slider::-webkit-slider-thumb{appearance:none;background:var(--dsw-static-neutral-bluish-00);border:0;border-radius:50%;width:14px;height:14px}.zA5oWG_slider::-moz-range-thumb{background:var(--dsw-static-neutral-bluish-00);border:0;border-radius:50%;width:14px;height:14px}.zA5oWG_sliderValue{width:44px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;text-align:right;flex:none;font-size:12px;line-height:18px}.zA5oWG_checkRow{cursor:pointer;align-items:center;gap:8px;display:flex}.zA5oWG_checkbox{appearance:none;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);border-radius:3px;place-items:center;width:16px;height:16px;margin:0;display:inline-grid}.zA5oWG_checkbox:checked{background:var(--dsw-static-neutral-bluish-600)}.zA5oWG_checkbox:checked:after{content:\"\";background:var(--dsw-static-neutral-bluish-00);border-radius:50%;width:6px;height:6px}.zA5oWG_hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.zA5oWG_footer{justify-content:flex-start;display:flex}.zA5oWG_dragging{outline:1px dashed var(--dsw-alias-border-l3);outline-offset:6px;border-radius:8px}.zA5oWG_schemePanel{flex-direction:column;gap:8px;display:flex}.zA5oWG_schemeInput{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-specific-input-major);width:100%;color:var(--dsw-alias-label-primary);font:inherit;resize:vertical;border-radius:6px;padding:8px 10px;font-size:12px;line-height:18px}";
		const tagId = "@kiligzzz/dsh-ui-appearance/AppearanceCustomizerRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@kiligzzz/dsh-ui-appearance";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var AppearanceCustomizerRow_module_css_default = {
			"chipRow": "zA5oWG_chipRow",
			"colorHex": "zA5oWG_colorHex",
			"sectionTitle": "zA5oWG_sectionTitle",
			"chip": "zA5oWG_chip",
			"slider": "zA5oWG_slider",
			"body": "zA5oWG_body",
			"checkRow": "zA5oWG_checkRow",
			"schemeInput": "zA5oWG_schemeInput",
			"chipSelected": "zA5oWG_chipSelected",
			"urlInput": "zA5oWG_urlInput",
			"thumb": "zA5oWG_thumb",
			"colorField": "zA5oWG_colorField",
			"urlRow": "zA5oWG_urlRow",
			"footer": "zA5oWG_footer",
			"section": "zA5oWG_section",
			"dragging": "zA5oWG_dragging",
			"hint": "zA5oWG_hint",
			"sliderValue": "zA5oWG_sliderValue",
			"colorGrid": "zA5oWG_colorGrid",
			"colorSwatch": "zA5oWG_colorSwatch",
			"uploadRow": "zA5oWG_uploadRow",
			"sliderLabel": "zA5oWG_sliderLabel",
			"schemePanel": "zA5oWG_schemePanel",
			"colorSwatchInput": "zA5oWG_colorSwatchInput",
			"checkbox": "zA5oWG_checkbox",
			"ghostButton": "zA5oWG_ghostButton",
			"sliderRow": "zA5oWG_sliderRow",
			"colorLabel": "zA5oWG_colorLabel",
			"group": "zA5oWG_group",
			"fileInput": "zA5oWG_fileInput"
		};
		//#endregion
		//#region src/client/AppearanceCustomizerRow.tsx
		/**
		* The Appearance customizer row registered into the General section item slot
		* (below ui-theme's Appearance preference row): preset chips, eight color
		* pickers, the background upload/drop zone with opacity and blur sliders, and
		* the interface transparency / glass sliders. All writes go through the
		* injected face; the scope round-trip reconciles.
		*/
		/** Stock (light-mode) display color per role, shown when the role is unset
		* so the swatch always mirrors what the theme actually uses. */
		const STOCK_ROLE_COLORS = {
			accent: "#4176e6",
			background: "#ffffff",
			panel: "#ffffff",
			input: "#ffffff",
			text: "#0f1115",
			border: "#d9dde3"
		};
		/** One color field row: native swatch + hex text input. */
		function ColorField(props) {
			const { label, value, stock, onChange } = props;
			const [draft, setDraft] = (0, react.useState)(value);
			(0, react.useEffect)(() => {
				setDraft(value);
			}, [value]);
			const commit = () => {
				const hex = draft.trim();
				if (hex === value) return;
				if (isHexColor(hex)) onChange(hex);
				else setDraft(value);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: AppearanceCustomizerRow_module_css_default.colorField,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.colorLabel,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.colorSwatch,
						style: { backgroundColor: value === "" ? stock : value },
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
							type: "color",
							className: AppearanceCustomizerRow_module_css_default.colorSwatchInput,
							"aria-label": `${label} (color picker)`,
							value: value === "" ? stock : value,
							onChange: (event) => {
								onChange(event.target.value);
							}
						})
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "text",
						className: AppearanceCustomizerRow_module_css_default.colorHex,
						"aria-label": `${label} (hex)`,
						value: draft,
						spellCheck: false,
						onChange: (event) => {
							setDraft(event.target.value);
						},
						onBlur: commit,
						onKeyDown: (event) => {
							if (event.key === "Enter") commit();
						}
					})
				]
			});
		}
		/** One labeled slider with a formatted value readout. */
		function Slider(props) {
			const { label, value, min, max, step, format, onChange } = props;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: AppearanceCustomizerRow_module_css_default.sliderRow,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.sliderLabel,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "range",
						className: AppearanceCustomizerRow_module_css_default.slider,
						"aria-label": label,
						min,
						max,
						step,
						value,
						onChange: (event) => {
							onChange(Number(event.target.value));
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.sliderValue,
						children: format(value)
					})
				]
			});
		}
		/** Map a remote-load failure code to the localized message key. */
		function urlErrorText(code, t) {
			return t(`background.urlError.${code}`);
		}
		/** Map a local-read failure code to the localized message key ('read' keeps
		* the base key as the catch-all). */
		function localErrorText(prefix, code, t) {
			return t(code === "read" ? prefix : `${prefix}.${code}`);
		}
		/** Thumbnail for the stored wallpaper. Legacy tokens are inline data URLs
		* (rendered directly); current tokens are IndexedDB keys resolved to object
		* URLs, revoked when the token changes or the row unmounts. */
		function BackgroundThumb(props) {
			const { token } = props;
			const [src, setSrc] = (0, react.useState)("");
			(0, react.useEffect)(() => {
				if (token === "") {
					setSrc("");
					return;
				}
				if (token.startsWith("data:")) {
					setSrc(token);
					return;
				}
				let stale = false;
				let objectUrl;
				getImage(token).then((blob) => {
					if (blob === void 0 || stale) return;
					objectUrl = URL.createObjectURL(blob);
					setSrc(objectUrl);
				});
				return () => {
					stale = true;
					if (objectUrl !== void 0) URL.revokeObjectURL(objectUrl);
				};
			}, [token]);
			if (src === "") return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
				className: AppearanceCustomizerRow_module_css_default.thumb,
				src,
				alt: ""
			});
		}
		/**
		* Render the appearance customizer row.
		* @param props - composed slot props.
		* @returns the row element tree.
		*/
		function AppearanceCustomizerRow({ t, useStore, set, setImage, setVideo, applyPreset, applyColors, resetAll }) {
			const settings = useStore((s) => s.settings);
			const [open, setOpen] = (0, react.useState)(false);
			const [reading, setReading] = (0, react.useState)(false);
			const [readError, setReadError] = (0, react.useState)(null);
			const [videoReading, setVideoReading] = (0, react.useState)(false);
			const [videoError, setVideoError] = (0, react.useState)(null);
			const [dragging, setDragging] = (0, react.useState)(false);
			const [urlDraft, setUrlDraft] = (0, react.useState)("");
			const [urlReading, setUrlReading] = (0, react.useState)(false);
			const [urlError, setUrlError] = (0, react.useState)(null);
			const [schemeOpen, setSchemeOpen] = (0, react.useState)(false);
			const [schemeDraft, setSchemeDraft] = (0, react.useState)("");
			const [schemeError, setSchemeError] = (0, react.useState)(false);
			const [exported, setExported] = (0, react.useState)(false);
			const fileRef = (0, react.useRef)(null);
			const videoRef = (0, react.useRef)(null);
			const applyWallpaperPalette = (accentHex) => {
				set("accent", accentHex);
				const palette = derivePalette(accentHex);
				for (const [role, hex] of Object.entries(palette)) if (settings[role] === "") set(role, hex);
				set("preset", "custom");
			};
			const readFile = async (file) => {
				if (file === void 0) return;
				if (!file.type.startsWith("image/")) {
					setReadError("type");
					return;
				}
				if (file.size > 209715200) {
					setReadError("size");
					return;
				}
				setReading(true);
				setReadError(null);
				try {
					const payload = await prepareImage(file);
					setImage({
						url: await saveImage(payload.blob, file.name),
						imageDark: payload.imageDark
					});
					if (payload.accent !== null) applyWallpaperPalette(payload.accent);
				} catch {
					setReadError("read");
				} finally {
					setReading(false);
				}
			};
			const readVideo = async (file) => {
				if (file === void 0) return;
				if (!file.type.startsWith("video/")) {
					setVideoError("type");
					return;
				}
				if (file.size > 52428800) {
					setVideoError("size");
					return;
				}
				setVideoReading(true);
				setVideoError(null);
				try {
					const oldKey = settings.backgroundVideo;
					if (oldKey !== "") deleteVideo(oldKey);
					setVideo(await saveVideo(file, file.name));
				} catch {
					setVideoError("read");
				} finally {
					setVideoReading(false);
				}
			};
			const removeVideo = () => {
				if (settings.backgroundVideo !== "") deleteVideo(settings.backgroundVideo);
				setVideo(null);
			};
			const loadFromUrl = async () => {
				const url = urlDraft.trim();
				if (url === "") return;
				setUrlReading(true);
				setUrlError(null);
				try {
					if (classifyUrl(url) === "video") {
						const file = await loadVideoFromUrl(url);
						const oldKey = settings.backgroundVideo;
						if (oldKey !== "") deleteVideo(oldKey);
						setVideo(await saveVideo(file, file.name));
					} else {
						const payload = await loadImageFromUrl(url);
						setImage({
							url: await saveImage(payload.blob, urlToName(url)),
							imageDark: payload.imageDark
						});
						if (payload.accent !== null) applyWallpaperPalette(payload.accent);
					}
					setUrlDraft("");
				} catch (error) {
					setUrlError(error instanceof UrlLoadFailure ? error.code : "network");
				} finally {
					setUrlReading(false);
				}
			};
			const onPick = (event) => {
				const file = event.target.files?.[0];
				event.target.value = "";
				readFile(file);
			};
			const onPickVideo = (event) => {
				const file = event.target.files?.[0];
				event.target.value = "";
				readVideo(file);
			};
			const onDrop = (event) => {
				event.preventDefault();
				setDragging(false);
				const file = event.dataTransfer.files?.[0];
				if (file?.type.startsWith("video/")) readVideo(file);
				else readFile(file);
			};
			const changeRole = (role, hex) => {
				set(role, hex.length === 4 ? formatHex(parseHex(hex)) : hex.toLowerCase());
				set("preset", "custom");
			};
			const doExport = async () => {
				setExported(false);
				try {
					await navigator.clipboard.writeText(exportColorScheme(settings));
					setExported(true);
				} catch {
					setSchemeError(true);
				}
			};
			const doImport = () => {
				setSchemeError(false);
				try {
					applyColors(parseColorScheme(schemeDraft));
					setSchemeOpen(false);
					setSchemeDraft("");
				} catch {
					setSchemeError(true);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: AppearanceCustomizerRow_module_css_default.group,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.DisclosureRow, {
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPersonalizationOutline16, {}),
					title: t("row.title"),
					open,
					expandable: true,
					expandOnRowClick: true,
					onToggle: () => {
						setOpen((value) => !value);
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceCustomizerRow_module_css_default.body,
						onClick: (event) => {
							event.stopPropagation();
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.sectionTitle,
									children: t("presets.title")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.chipRow,
									role: "group",
									children: APPEARANCE_PRESETS.map((preset) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: clsx(AppearanceCustomizerRow_module_css_default.chip, settings.preset === preset.id && AppearanceCustomizerRow_module_css_default.chipSelected),
										"aria-pressed": settings.preset === preset.id,
										onClick: () => {
											applyPreset(preset.id);
										},
										children: t(`preset.${preset.id}`)
									}, preset.id))
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.sectionTitle,
									children: t("colors.title")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.colorGrid,
									children: APPEARANCE_ROLES.map((role) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorField, {
										label: t(`color.${role}`),
										value: settings[role],
										stock: STOCK_ROLE_COLORS[role],
										onChange: (hex) => {
											changeRole(role, hex);
										},
										t
									}, role))
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: clsx(AppearanceCustomizerRow_module_css_default.section, dragging && AppearanceCustomizerRow_module_css_default.dragging),
								onDragOver: (event) => {
									event.preventDefault();
									setDragging(true);
								},
								onDragLeave: () => {
									setDragging(false);
								},
								onDrop,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("background.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.uploadRow,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												ref: fileRef,
												className: AppearanceCustomizerRow_module_css_default.fileInput,
												type: "file",
												accept: ACCEPTED_IMAGE_TYPES.join(","),
												onChange: onPick
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												disabled: reading,
												onClick: () => {
													fileRef.current?.click();
												},
												children: reading ? t("background.reading") : settings.backgroundImage === "" ? t("background.upload") : t("background.replace")
											}),
											settings.backgroundImage !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BackgroundThumb, { token: settings.backgroundImage }), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: () => {
													setImage(null);
												},
												children: t("background.remove")
											})] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												ref: videoRef,
												className: AppearanceCustomizerRow_module_css_default.fileInput,
												type: "file",
												accept: ACCEPTED_VIDEO_TYPES.join(","),
												onChange: onPickVideo
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												disabled: videoReading,
												onClick: () => {
													videoRef.current?.click();
												},
												children: videoReading ? t("background.reading") : settings.backgroundVideo !== "" ? t("background.replace") : t("background.videoUpload")
											}),
											settings.backgroundVideo !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: removeVideo,
												children: t("background.videoRemove")
											})
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.urlRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "url",
											className: AppearanceCustomizerRow_module_css_default.urlInput,
											"aria-label": t("background.url"),
											placeholder: t("background.urlPlaceholder"),
											value: urlDraft,
											spellCheck: false,
											onChange: (event) => {
												setUrlDraft(event.target.value);
												setUrlError(null);
											},
											onKeyDown: (event) => {
												if (event.key === "Enter") loadFromUrl();
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: AppearanceCustomizerRow_module_css_default.ghostButton,
											disabled: urlReading || urlDraft.trim() === "",
											onClick: () => {
												loadFromUrl();
											},
											children: urlReading ? t("background.urlLoading") : t("background.urlLoad")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.hint,
										children: urlError !== null ? urlErrorText(urlError, t) : videoError !== null ? localErrorText("background.videoError", videoError, t) : settings.backgroundVideo !== "" ? t("background.videoHint") : readError !== null ? localErrorText("background.readError", readError, t) : t("background.dropHint")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.opacity"),
										value: settings.backgroundOpacity,
										min: 0,
										max: 1,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("backgroundOpacity", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.blur"),
										value: settings.backgroundBlur,
										min: 0,
										max: 30,
										step: 1,
										format: (value) => `${value}px`,
										onChange: (value) => {
											set("backgroundBlur", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.scrim"),
										value: settings.scrim,
										min: 0,
										max: 1,
										step: .05,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("scrim", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.hint,
										children: t("background.scrimHint")
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("surface.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.opacity"),
										value: settings.surfaceAlpha,
										min: 0,
										max: 1,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("surfaceAlpha", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.inputOpacity"),
										value: settings.inputAlpha,
										min: 0,
										max: 1,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("inputAlpha", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.codeOpacity"),
										value: settings.codeAlpha,
										min: 0,
										max: 1,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("codeAlpha", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.emphasis"),
										value: settings.emphasisAlpha,
										min: 0,
										max: EMPHASIS_ALPHA_MAX,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("emphasisAlpha", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.sidebarOpaque,
											onChange: (event) => {
												set("sidebarOpaque", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("surface.sidebar")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.glass"),
										value: settings.glassBlur,
										min: 0,
										max: 20,
										step: 1,
										format: (value) => `${value}px`,
										onChange: (value) => {
											set("glassBlur", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.conversationGlass,
											onChange: (event) => {
												set("conversationGlass", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("surface.conversationGlass")
										})]
									}),
									settings.conversationGlass && /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.conversationGlassBlur"),
										value: settings.conversationGlassBlur,
										min: 0,
										max: 20,
										step: 1,
										format: (value) => `${value}px`,
										onChange: (value) => {
											set("conversationGlassBlur", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("composer.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.aistudioComposer,
											onChange: (event) => {
												set("aistudioComposer", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("composer.aistudio")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.glassComposer,
											onChange: (event) => {
												set("glassComposer", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("composer.glass")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.glowComposer,
											onChange: (event) => {
												set("glowComposer", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("composer.glow")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.hint,
										children: t("surface.hint")
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("scheme.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.uploadRow,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: () => {
													doExport();
												},
												children: t("scheme.export")
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: () => {
													setSchemeOpen((value) => !value);
												},
												children: t("scheme.import")
											}),
											exported && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: AppearanceCustomizerRow_module_css_default.hint,
												children: t("scheme.exported")
											})
										]
									}),
									schemeOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.schemePanel,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
												className: AppearanceCustomizerRow_module_css_default.schemeInput,
												"aria-label": t("scheme.import"),
												rows: 4,
												placeholder: t("scheme.importPlaceholder"),
												value: schemeDraft,
												onChange: (event) => {
													setSchemeDraft(event.target.value);
													setSchemeError(false);
												}
											}),
											schemeError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: AppearanceCustomizerRow_module_css_default.hint,
												children: t("scheme.invalid")
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: AppearanceCustomizerRow_module_css_default.uploadRow,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: AppearanceCustomizerRow_module_css_default.ghostButton,
													onClick: doImport,
													children: t("scheme.apply")
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: AppearanceCustomizerRow_module_css_default.ghostButton,
													onClick: () => {
														setSchemeOpen(false);
														setSchemeDraft("");
														setSchemeError(false);
													},
													children: t("scheme.cancel")
												})]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: AppearanceCustomizerRow_module_css_default.footer,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: AppearanceCustomizerRow_module_css_default.ghostButton,
									onClick: resetAll,
									children: t("actions.reset")
								})
							})
						]
					})
				})
			});
		}
		//#endregion
		//#region src/client/settings-store.ts
		/**
		* Appearance row slot store: a mirror of the settings scope section plus
		* optimistic patches from the row's own write path. The apply-world change
		* listener is the authoritative writer; the injected `set` patches first so
		* sliders and pickers feel instant, then the scope round-trip reconciles.
		*/
		/**
		* Declares the Appearance customizer row state and write surface.
		* @returns the store handle.
		*/
		function createAppearanceRowStore() {
			return (0, _deepseek_ai_dsh_client_store.defineStore)({
				init: () => ({
					settings: { ...DEFAULT_SETTINGS },
					revision: -1
				}),
				actions: {
					sync: (d, settings, revision) => {
						if (revision <= d.revision) return;
						d.settings = { ...settings };
						d.revision = revision;
					},
					patch: (d, partial) => {
						d.settings = {
							...d.settings,
							...partial
						};
					}
				}
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `settings.appearance` namespace dictionaries (the customizer row's copy). */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"row.title": "个性化外观",
			"presets.title": "预设主题",
			"preset.default": "默认",
			"preset.midnight": "午夜",
			"preset.ocean": "海洋",
			"preset.forest": "森林",
			"preset.rose": "玫瑰",
			"preset.monochrome": "单色",
			"colors.title": "主题颜色",
			"color.accent": "主色",
			"color.background": "背景色",
			"color.panel": "面板色",
			"color.input": "输入框色",
			"color.text": "文字色",
			"color.border": "边框色",
			"background.title": "背景",
			"background.upload": "上传图片",
			"background.replace": "更换图片",
			"background.remove": "删除图片",
			"background.reading": "读取中…",
			"background.dropHint": "支持 JPG / PNG / WebP / GIF,不限大小;超过 4096px 会等比缩边",
			"background.readError": "无法读取该图片,请换一张试试",
			"background.readError.type": "这不是图片文件(JPG / PNG / WebP),无法作为背景",
			"background.readError.size": "图片超过大小上限(200MB),请换一张试试",
			"background.video": "视频背景",
			"background.videoUpload": "上传视频",
			"background.videoRemove": "删除视频",
			"background.videoError": "无法读取该视频,请换一个试试",
			"background.videoError.size": "视频超过大小上限(50MB),请压缩或裁剪后再试",
			"background.videoHint": "视频自动静音循环播放;与背景图片互斥",
			"background.url": "从 URL 加载背景",
			"background.urlPlaceholder": "粘贴图片或视频 URL",
			"background.urlLoad": "加载",
			"background.urlLoading": "加载中…",
			"background.urlError.network": "无法加载该地址,请检查网络或地址是否正确",
			"background.urlError.cors": "该地址不允许跨域读取(CORS),无法作为背景使用",
			"background.urlError.http": "服务器返回错误状态,无法加载",
			"background.urlError.type": "该地址的内容不是图片或视频",
			"background.urlError.size": "文件超过大小限制(图片 25MB / 视频 50MB)",
			"background.opacity": "背景图片不透明度",
			"background.blur": "背景模糊",
			"background.scrim": "背景遮罩",
			"background.scrimHint": "调高遮罩,背景图片上的文字更易读",
			"surface.title": "界面",
			"surface.opacity": "面板不透明度",
			"surface.inputOpacity": "输入框不透明度",
			"surface.codeOpacity": "代码块不透明度",
			"surface.emphasis": "强调字浓度",
			"surface.sidebar": "侧边栏保持不透明",
			"surface.glass": "毛玻璃强度",
			"surface.conversationGlass": "会话区毛玻璃",
			"surface.conversationGlassBlur": "会话区模糊",
			"surface.hint": "背景图会显示在主区域;调低面板不透明度可让卡片、侧边栏也透出;输入框/代码块不透明度独立于面板(100% = 不透明);开启会话区毛玻璃后,对话区与详情区透出壁纸",
			"composer.title": "输入框特效",
			"composer.aistudio": "新会话流光",
			"composer.glass": "玻璃输入框",
			"composer.glow": "运行流光",
			"composer.hint": "新会话流光给新会话输入框加渐变光晕边框;玻璃输入框给新会话输入框 Liquid Glass 半透明质感;运行流光在 agent 工作时给输入框边缘加流动彩色光影",
			"surface.preview": "效果预览:代码块背景与强调字(随上方滑块实时变化)",
			"scheme.title": "配色方案",
			"scheme.export": "导出配色",
			"scheme.import": "导入配色",
			"scheme.importPlaceholder": "粘贴导出的配色 JSON…",
			"scheme.apply": "应用",
			"scheme.cancel": "取消",
			"scheme.invalid": "配色 JSON 无效,请检查后重试",
			"scheme.exported": "配色已复制到剪贴板",
			"actions.reset": "恢复默认"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"row.title": "Appearance",
			"presets.title": "Presets",
			"preset.default": "Default",
			"preset.midnight": "Midnight",
			"preset.ocean": "Ocean",
			"preset.forest": "Forest",
			"preset.rose": "Rose",
			"preset.monochrome": "Monochrome",
			"colors.title": "Theme colors",
			"color.accent": "Accent",
			"color.background": "Background",
			"color.panel": "Panels",
			"color.input": "Input",
			"color.text": "Text",
			"color.border": "Border",
			"background.title": "Background",
			"background.upload": "Upload image",
			"background.replace": "Replace image",
			"background.remove": "Remove image",
			"background.reading": "Reading…",
			"background.dropHint": "JPG / PNG / WebP / GIF — no size limit; images over 4096px are scaled down",
			"background.readError": "Could not read this image, try another one",
			"background.readError.type": "That is not an image file (JPG / PNG / WebP)",
			"background.readError.size": "Image exceeds the size limit (200MB) — try a smaller one",
			"background.video": "Video background",
			"background.videoUpload": "Upload video",
			"background.videoRemove": "Remove video",
			"background.videoError": "Could not read that video, try another one",
			"background.videoError.size": "Video exceeds the size limit (50MB) — trim or compress it first",
			"background.videoHint": "Video plays muted in a loop; exclusive with the image background",
			"background.url": "Load background from URL",
			"background.urlPlaceholder": "Paste an image or video URL",
			"background.urlLoad": "Load",
			"background.urlLoading": "Loading…",
			"background.urlError.network": "Could not load that URL — check the network or the address",
			"background.urlError.cors": "That address does not allow cross-origin reads (CORS)",
			"background.urlError.http": "The server returned an error status",
			"background.urlError.type": "That address is not an image or a video",
			"background.urlError.size": "File exceeds the size limit (images 25MB / videos 50MB)",
			"background.opacity": "Image opacity",
			"background.blur": "Background blur",
			"background.scrim": "Background scrim",
			"background.scrimHint": "Raise the scrim to keep text readable over the image",
			"surface.title": "Interface",
			"surface.opacity": "Panel opacity",
			"surface.inputOpacity": "Input opacity",
			"surface.codeOpacity": "Code block opacity",
			"surface.emphasis": "Emphasis tint",
			"surface.sidebar": "Keep the sidebar opaque",
			"surface.glass": "Glass blur",
			"surface.conversationGlass": "Conversation glass",
			"surface.conversationGlassBlur": "Conversation blur",
			"surface.hint": "The wallpaper shows in the main area; lower panel opacity to reveal cards and the sidebar. Input/code-block opacity is independent of the panel (100% = opaque). Enabling conversation glass makes the chat and details columns translucent",
			"composer.title": "Composer effects",
			"composer.aistudio": "New session glow",
			"composer.glass": "Glass composer",
			"composer.glow": "Running glow",
			"composer.hint": "New session glow adds a gradient aura border to the new-session composer; Glass composer gives it a Liquid Glass look; Running glow lights a flowing gradient ring around the composer while the agent works",
			"surface.preview": "Preview: code-block background and emphasized text (updates live with the sliders above)",
			"scheme.title": "Color scheme",
			"scheme.export": "Export colors",
			"scheme.import": "Import colors",
			"scheme.importPlaceholder": "Paste an exported color scheme JSON…",
			"scheme.apply": "Apply",
			"scheme.cancel": "Cancel",
			"scheme.invalid": "Invalid color scheme JSON, check and retry",
			"scheme.exported": "Color scheme copied to clipboard",
			"actions.reset": "Reset to default"
		};
		//#endregion
		//#region src/client/applier.ts
		/** Background layer element id (the stylesheet targets it). */
		const BG_LAYER_ID = "dsw-appearance-bg";
		/** Stylesheet element id owned by this plugin. */
		const STYLE_ID = "dsw-appearance-styles";
		/** Composer-effect body attributes (mirrors the host half's constants). */
		const COMPOSER_ATTRS = {
			aistudio: "data-dsh-aistudio-composer",
			glass: "data-dsh-glass-composer",
			glow: "data-dsh-glow-composer"
		};
		/** CSS variables the applier writes on body, consumed by the stylesheet. */
		const BODY_VARIABLES = [
			"--dsw-appearance-bg-image",
			"--dsw-appearance-bg-opacity",
			"--dsw-appearance-blur",
			"--dsw-appearance-scrim"
		];
		/**
		* Static sheet: the background layer is pushed to `z-index: -1` so it paints
		* below all content but above the body background — surfaces painted with
		* translucent tokens still show the image through, and no stacking context is
		* created on #root. `inset: -48px` gives the blur filter room so edges never
		* show transparent bleed.
		*
		* #root is deliberately left untouched: no `position`/`z-index`, no
		* `backdrop-filter`. A non-none backdrop-filter turns #root into the
		* containing block of every fixed-position descendant (menus, tooltips,
		* toasts), and any `z-index` traps those descendants in a stacking context
		* scoped to #root — whose own effective z then sits at the page level. Either
		* would let top-level third-party panels (e.g. a plugin panel at
		* `position: fixed; z-index: 40`) paint over the DSH settings dialog
		* (`position: fixed; z-index: 1000`, a descendant of #root). Pushing the
		* wallpaper layer to -1 instead of lifting #root keeps fixed overlays at the
		* top level, so the dialog always wins. Blurring the wallpaper directly is
		* visually equivalent here — the only thing behind #root is this layer — and
		* leaves fixed positioning alone.
		*
		* The readability scrim rides inside the layer's own background-image stack:
		* a uniform veil whose alpha is `var(--dsw-appearance-scrim)` — the browser
		* re-rasterizes the layer live as the slider moves, no JS wiring needed.
		* The veil hue follows the base theme (white-ish in light mode, near-black in
		* dark mode). Selection and focus rings follow the user's accent through the
		* overridden brand tokens.
		*/
		const SHEET = `
#${BG_LAYER_ID} {
  position: fixed;
  inset: -48px;
  z-index: -1;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image:
    linear-gradient(rgba(255, 255, 255, var(--dsw-appearance-scrim, 0)) 0%, rgba(255, 255, 255, var(--dsw-appearance-scrim, 0)) 100%),
    var(--dsw-appearance-bg-image, none);
  opacity: var(--dsw-appearance-bg-opacity, 1);
  filter: blur(var(--dsw-appearance-blur, 0px));
}
#${BG_LAYER_ID} video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: none;
}
#${BG_LAYER_ID}[data-video] video {
  display: block;
}
#${BG_LAYER_ID}[data-video] {
  background-image: none;
}
body[data-ds-dark-theme] #${BG_LAYER_ID} {
  background-image:
    linear-gradient(rgba(8, 10, 18, var(--dsw-appearance-scrim, 0)) 0%, rgba(8, 10, 18, var(--dsw-appearance-scrim, 0)) 100%),
    var(--dsw-appearance-bg-image, none);
}
#root ::selection {
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-label-primary-foreground);
}
#root :focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary);
  outline-offset: 2px;
}
/* Conversation-area glass: when the dedicated toggle is on, the Desktop shell
   columns (advanced/extended mode) drop their opaque fill so the wallpaper
   layer behind them shows through the chat. The readability veil stays in
   the wallpaper layer itself (--dsw-appearance-scrim); surfaces painted with
   translucent tokens (bubbles, composer, code) keep their own alpha from the
   surface/input/code sliders, so text stays readable while the area frosted. */
body[data-dsw-conversation-glass] .dshDesktopConversationSurface,
body[data-dsw-conversation-glass] .dshDesktopDetailsSurface {
  background: transparent !important;
}
body[data-dsw-conversation-glass] .dshDesktopFrame {
  background: transparent !important;
}
/* Frosted-glass overlays: translucent popovers (model picker menu, plugin
   panels) and the composer input card let the wallpaper through but blur whatever
   sits underneath (chat text), so overlays stay see-through without text showing
   through confusingly. */
[role="menu"],
[role="listbox"] {
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}
[data-dsh-panel-host] [class*="_panel"] {
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}
/* The right sidebar overlays the conversation on narrow layouts. Give it an
   almost-solid theme surface so underlying text cannot compete with preview
   content while retaining a restrained frosted finish. */
[data-sidebar-right-panel] {
  background: color-mix(in srgb, var(--dsw-static-neutral-bluish-50) 96%, transparent) !important;
  backdrop-filter: blur(20px) saturate(1.15);
  -webkit-backdrop-filter: blur(20px) saturate(1.15);
}
body[data-ds-dark-theme] [data-sidebar-right-panel] {
  background: color-mix(in srgb, var(--dsw-static-neutral-bluish-900) 96%, transparent) !important;
}
[data-composer-card] {
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
}
/* Nested backdrop-filter limit: the model menu renders INSIDE the composer
   card, and browsers discard a child's backdrop-filter when an ancestor
   already has one. Instead of toggling the card blur (visible flash), give
   the menu a half-solid base built from its own theme token (relative color
   keeps the hue, raises alpha): it rides on the card's already-blurred
   backdrop, so the menu stays readable while the card never loses its
   frosted look. Where the menu is NOT nested, its own blur still applies. */
[role="menu"],
[role="listbox"] {
  background: rgb(from var(--dsw-specific-menu) r g b / 0.5) !important;
}
/* Composer effects (migrated from dsh-glass-composer). Each effect gates on a
   body attribute the host half pre-applies before mount and the applier keeps
   in sync with the settings section. */
[data-phase="hero"] [data-composer-card]{transition:background .3s ease,border-color .3s ease,box-shadow .3s ease}
body[data-dsh-glass-composer] [data-phase="hero"] [data-composer-card]{background:rgba(255,255,255,.45);-webkit-backdrop-filter:blur(28px) saturate(1.8);backdrop-filter:blur(28px) saturate(1.8);border:1px solid rgba(255,255,255,.65);box-shadow:0 12px 40px rgba(70,90,180,.14),inset 0 1px 0 rgba(255,255,255,.85),inset 0 -1px 0 rgba(255,255,255,.28)}
body[data-ds-dark-theme][data-dsh-glass-composer] [data-phase="hero"] [data-composer-card]{background:rgba(26,28,36,.42);border:1px solid rgba(255,255,255,.16);box-shadow:0 14px 48px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.15),inset 0 -1px 0 rgba(255,255,255,.05)}
@property --dshGlowAngle{syntax:"<angle>";initial-value:0deg;inherits:false}
[data-composer-card]{transition:border-color .25s ease}
body[data-dsh-glow-composer] [data-composer-card][data-composer-running]{border-color:transparent}
body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:before,
body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:after{content:"";position:absolute;pointer-events:none;border-radius:24px;background:conic-gradient(from var(--dshGlowAngle),transparent 0deg 240deg,#4D6BFE 275deg,#9E4DFF 310deg,#00C2D8 335deg,#FF5CA8 350deg,transparent 360deg);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude}
body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:before{inset:-1.5px;padding:1.5px}
body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:after{inset:-4px;padding:4px;filter:blur(4px);opacity:.4}
@media (prefers-reduced-motion:no-preference){body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:before,body[data-dsh-glow-composer] [data-composer-card][data-composer-running]:after{animation:dshGlowSpin 3.2s linear infinite}}
@keyframes dshGlowSpin{to{--dshGlowAngle:360deg}}
@property --dshAuroraAngle{syntax:"<angle>";initial-value:0deg;inherits:false}
body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]{border-color:transparent}
body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]:before{content:"";position:absolute;pointer-events:none;inset:-2px;padding:2px;border-radius:24px;opacity:.9;background:conic-gradient(from var(--dshAuroraAngle),#4285F4 0deg,#A142F4 90deg,#FF5CA8 160deg,#F9AB00 235deg,#00C2D8 300deg,#4285F4 360deg);-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);mask-composite:exclude}
body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]:after{content:"";position:absolute;pointer-events:none;inset:-70px;border-radius:92px;background:conic-gradient(from var(--dshAuroraAngle),#4285F4 0deg,#A142F4 90deg,#FF5CA8 160deg,#F9AB00 235deg,#00C2D8 300deg,#4285F4 360deg);filter:blur(40px) saturate(1.2);opacity:.2;z-index:-1}
body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]:hover:before{opacity:1;filter:saturate(1.2) brightness(1.08)}
@media (prefers-reduced-motion:no-preference){body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]:before{animation:dshAuroraSpin 4s linear infinite}body[data-dsh-aistudio-composer] [data-phase="hero"] [data-composer-card]:after{animation:dshAuroraSpin 10s linear infinite}}
@keyframes dshAuroraSpin{to{--dshAuroraAngle:360deg}}
`;
		/**
		* Projects one appearance settings snapshot onto the document. Replaces the
		* token override layer on every apply; retracts everything in dispose.
		*/
		var AppearanceApplier = class {
			ctx;
			style;
			layer;
			videoEl;
			videoUrl;
			videoKey = "";
			imageToken = "";
			imageUrl;
			removeOverrides;
			runningObserver;
			/**
			* @param ctx - client context providing the theme service.
			*/
			constructor(ctx) {
				this.ctx = ctx;
				this.style = document.createElement("style");
				this.style.id = STYLE_ID;
				this.style.textContent = SHEET;
				document.head.append(this.style);
				this.layer = document.createElement("div");
				this.layer.id = BG_LAYER_ID;
				document.body.prepend(this.layer);
				this.observeRunning();
			}
			/**
			* Apply a settings snapshot: rebuild the theme override layer and refresh
			* the body CSS variables. Undefined values (settings not yet loaded) apply
			* the stock defaults, which removes the override layer.
			* @param settings - current appearance settings or undefined while loading.
			*/
			apply(settings) {
				const value = settings ?? DEFAULT_SETTINGS;
				this.removeOverrides?.();
				this.removeOverrides = void 0;
				const tokens = buildTokenOverrides(value);
				if (Object.keys(tokens).length > 0) this.removeOverrides = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, tokens);
				const body = document.body;
				this.syncImage(value.backgroundImage);
				body.style.setProperty("--dsw-appearance-bg-opacity", String(value.backgroundOpacity));
				body.style.setProperty("--dsw-appearance-blur", `${value.backgroundBlur + value.glassBlur}px`);
				body.style.setProperty("--dsw-mask-blur", `blur(${value.glassBlur}px)`);
				body.style.setProperty("--dsw-appearance-scrim", String(value.scrim));
				if (value.conversationGlass) {
					body.dataset.dswConversationGlass = "";
					body.style.setProperty("--dsw-appearance-blur", `${value.backgroundBlur + value.glassBlur + value.conversationGlassBlur}px`);
				} else {
					delete body.dataset.dswConversationGlass;
					body.style.setProperty("--dsw-appearance-blur", `${value.backgroundBlur + value.glassBlur}px`);
				}
				this.syncVideo(value.backgroundVideo);
				body.toggleAttribute(COMPOSER_ATTRS.aistudio, value.aistudioComposer);
				body.toggleAttribute(COMPOSER_ATTRS.glass, value.glassComposer);
				body.toggleAttribute(COMPOSER_ATTRS.glow, value.glowComposer);
			}
			/**
			* Load or clear the wallpaper for a background token. Legacy records still
			* carry an inline data URL (applied directly); current records hold an
			* IndexedDB key resolved through an object URL. Reuses the object URL when
			* the token is unchanged, so repeated applies never re-read IndexedDB.
			* @param token - record key, legacy data URL, or '' to clear.
			*/
			async syncImage(token) {
				if (token === this.imageToken) return;
				this.imageToken = token;
				this.teardownImage();
				const body = document.body;
				if (token === "") {
					body.style.setProperty("--dsw-appearance-bg-image", "none");
					return;
				}
				if (token.startsWith("data:")) {
					body.style.setProperty("--dsw-appearance-bg-image", `url("${token}")`);
					return;
				}
				const blob = await getImage(token);
				if (this.imageToken !== token) return;
				if (blob === void 0) {
					this.imageToken = "";
					body.style.setProperty("--dsw-appearance-bg-image", "none");
					return;
				}
				this.imageUrl = URL.createObjectURL(blob);
				body.style.setProperty("--dsw-appearance-bg-image", `url("${this.imageUrl}")`);
			}
			/** Revoke the wallpaper object URL, if any. */
			teardownImage() {
				if (this.imageUrl !== void 0) {
					URL.revokeObjectURL(this.imageUrl);
					this.imageUrl = void 0;
				}
			}
			/**
			* Load or clear the background video for a record key. Reuses the element
			* and object URL when the key is unchanged, so repeated applies never
			* re-read IndexedDB.
			* @param key - video record key, or '' to clear.
			*/
			async syncVideo(key) {
				if (key === this.videoKey) return;
				this.videoKey = key;
				this.teardownVideo();
				if (key === "") {
					this.layer.removeAttribute("data-video");
					return;
				}
				const record = await getVideo(key);
				if (record === void 0 || this.videoKey !== key) {
					this.videoKey = "";
					this.layer.removeAttribute("data-video");
					return;
				}
				const video = this.ensureVideo();
				this.videoUrl = URL.createObjectURL(record);
				video.src = this.videoUrl;
				video.play().catch(() => {});
				video.onerror = () => {
					this.videoKey = "";
					this.layer.removeAttribute("data-video");
					this.teardownVideo();
				};
				this.layer.setAttribute("data-video", "");
			}
			/** Create the background video element once. */
			ensureVideo() {
				if (this.videoEl === void 0) {
					const video = document.createElement("video");
					video.muted = true;
					video.loop = true;
					video.playsInline = true;
					video.autoplay = true;
					this.layer.append(video);
					this.videoEl = video;
				}
				return this.videoEl;
			}
			/** Remove the video element and revoke its object URL. */
			teardownVideo() {
				this.videoEl?.remove();
				this.videoEl = void 0;
				if (this.videoUrl !== void 0) {
					URL.revokeObjectURL(this.videoUrl);
					this.videoUrl = void 0;
				}
			}
			/**
			* Composer running-state mirror (migrated from dsh-glass-composer): the
			* glow ring needs to know when the agent is running. The harness exposes no
			* DOM signal on the composer card, so the running state is inferred from
			* the primary button's stop-vs-send icon shape (svg > rect 10x10 = stop)
			* and mirrored onto [data-composer-card] as data-composer-running. A
			* MutationObserver reschedules a throttled scan on any DOM change; the CSS
			* gates the ring on body[data-dsh-glow-composer] so the observer runs even
			* when the effect is off (cheap, keeps the signal fresh for instant toggle).
			*/
			observeRunning() {
				const root = document.documentElement ?? document.body;
				if (!root || typeof MutationObserver === "undefined") return;
				const schedule = () => {
					if (typeof requestAnimationFrame === "function") requestAnimationFrame(() => this.scanRunning());
					else setTimeout(() => this.scanRunning(), 120);
				};
				this.runningObserver = new MutationObserver(schedule);
				this.runningObserver.observe(root, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: ["aria-label", "data-composer-running"]
				});
				schedule();
			}
			scanRunning() {
				const cards = document.querySelectorAll("[data-composer-card]");
				for (let i = 0; i < cards.length; i++) this.syncRunning(cards[i]);
			}
			syncRunning(card) {
				let running = false;
				const buttons = card.querySelectorAll("button[type=\"button\"]");
				for (let i = 0; i < buttons.length; i++) {
					const svg = buttons[i].querySelector("svg");
					if (svg !== null && svg.querySelector("rect[width=\"10\"][height=\"10\"]") !== null) {
						running = true;
						break;
					}
				}
				if (running) card.setAttribute("data-composer-running", "");
				else card.removeAttribute("data-composer-running");
			}
			/** Retract the override layer, the stylesheet, the layer element, and body variables. */
			dispose() {
				this.removeOverrides?.();
				this.removeOverrides = void 0;
				this.runningObserver?.disconnect();
				this.runningObserver = void 0;
				this.videoKey = "";
				this.teardownVideo();
				this.imageToken = "";
				this.teardownImage();
				this.style.remove();
				this.layer.remove();
				const body = document.body;
				for (const name of BODY_VARIABLES) body.style.removeProperty(name);
				body.style.removeProperty("--dsw-mask-blur");
				delete body.dataset.dswConversationGlass;
				for (const attr of Object.values(COMPOSER_ATTRS)) body.removeAttribute(attr);
			}
		};
		//#endregion
		//#region src/client/index.ts
		/** Namespace owning this feature's settings-row copy. */
		const SETTINGS_NS = "settings.appearance";
		/** Required services: slots/locale for the row, theme for token overrides. */
		const inject = [
			"slots",
			"locale",
			"theme"
		];
		/** localStorage key holding the whole settings section. */
		const STORAGE_KEY = "dsh-ui-appearance.settings";
		/**
		* Read the persisted section, tolerating a missing, corrupt, or out-of-schema
		* entry: parse failures fall back to the stock defaults, and every parsed
		* field is validated against the schema bounds before it reaches the UI.
		* One-shot migration: composer-effect preferences previously lived in their
		* own localStorage keys (dsh-glass-composer); when a stored section predates
		* the merge, seed the composer fields from those keys so existing users keep
		* their toggle choices. Returns the default section when nothing is stored.
		* @returns the stored settings, or the stock defaults.
		*/
		function readStoredSettings() {
			try {
				const raw = localStorage.getItem(STORAGE_KEY);
				if (raw === null) return { ...DEFAULT_SETTINGS };
				const migrated = { ...sanitizeSettings(JSON.parse(raw)) };
				const stored = JSON.parse(raw);
				if (typeof stored.aistudioComposer !== "boolean" && typeof stored.glassComposer !== "boolean" && typeof stored.glowComposer !== "boolean") {
					migrated.aistudioComposer = readLegacyToggle("dsh.aistudioComposer", DEFAULT_SETTINGS.aistudioComposer);
					migrated.glassComposer = readLegacyToggle("dsh.glassComposer", DEFAULT_SETTINGS.glassComposer);
					migrated.glowComposer = readLegacyToggle("dsh.glowComposer", DEFAULT_SETTINGS.glowComposer);
				}
				return migrated;
			} catch (_unreadableStorage) {
				return { ...DEFAULT_SETTINGS };
			}
		}
		/** Read a legacy composer-toggle localStorage key ('1'/'0' or absent). */
		function readLegacyToggle(key, fallback) {
			try {
				const value = localStorage.getItem(key);
				if (value === null) return fallback;
				return value === "1";
			} catch (_storageUnreadable) {
				return fallback;
			}
		}
		/**
		* One-shot migration: move a legacy inline data-URL wallpaper into the
		* IndexedDB image store and swap the settings field to its record key.
		* Failures keep the legacy value — the applier passes inline data URLs
		* through untouched, so nothing breaks either way.
		* @param read - read the live backgroundImage token (detects races).
		* @param commitSwap - persist the swapped-in record key.
		*/
		function migrateLegacyImage(read, commitSwap) {
			const legacy = read();
			if (!legacy.startsWith("data:")) return;
			(async () => {
				try {
					const key = await saveImage(await (await fetch(legacy)).blob(), "background");
					if (read() !== legacy) {
						deleteImage(key);
						return;
					}
					commitSwap(key);
				} catch (_migrationFailed) {}
			})();
		}
		/**
		* Client plugin body: load the persisted section, mount the DOM applier, and
		* register the customizer row into the General section.
		* @param ctx - client cordis context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "ui-appearance: settings row dictionaries");
			const store = createAppearanceRowStore();
			let bound;
			let current = readStoredSettings();
			let revision = 0;
			let applier;
			const publish = () => {
				revision += 1;
				bound?.sync(current, revision);
				applier?.apply(current);
			};
			ctx.effect(() => {
				try {
					navigator.storage?.persist?.().catch(() => {});
				} catch (_storageUnsupported) {}
				applier = new AppearanceApplier(ctx);
				applier.apply(current);
				migrateLegacyImage(() => current.backgroundImage, (key) => {
					current = {
						...current,
						backgroundImage: key
					};
					commit();
				});
				return () => {
					applier?.dispose();
					applier = void 0;
				};
			}, "ui-appearance: DOM applier");
			ctx.effect(() => {
				const onStorage = (event) => {
					if (event.key !== null && event.key !== "dsh-ui-appearance.settings") return;
					current = readStoredSettings();
					publish();
				};
				window.addEventListener("storage", onStorage);
				return () => {
					window.removeEventListener("storage", onStorage);
				};
			}, "ui-appearance: storage sync");
			const commit = () => {
				try {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
				} catch (_storageQuota) {}
				publish();
			};
			const set = (field, value) => {
				const patch = { ...current };
				patch[field] = value;
				current = patch;
				commit();
			};
			const setImage = (image) => {
				const patch = { ...current };
				const old = patch.backgroundImage;
				if (old !== "" && !old.startsWith("data:") && old !== (image?.url ?? "")) deleteImage(old);
				patch.backgroundImage = image?.url ?? "";
				patch.imageDark = image?.imageDark ?? false;
				if (image !== null) patch.backgroundVideo = "";
				current = patch;
				commit();
			};
			const setVideo = (key) => {
				if (key !== null && key !== current.backgroundVideo && current.backgroundVideo !== "") deleteVideo(current.backgroundVideo);
				const patch = { ...current };
				patch.backgroundVideo = key ?? "";
				if (key !== null) {
					const oldImage = patch.backgroundImage;
					if (oldImage !== "" && !oldImage.startsWith("data:")) deleteImage(oldImage);
					patch.backgroundImage = "";
					patch.imageDark = false;
				}
				current = patch;
				commit();
			};
			const applyPreset = (id) => {
				const preset = APPEARANCE_PRESETS.find((candidate) => candidate.id === id);
				if (preset === void 0) return;
				const partial = { preset: id };
				if (id === "default") for (const role of APPEARANCE_ROLES) partial[role] = "";
				else for (const [role, hex] of Object.entries(preset.colors)) {
					if (hex === void 0) continue;
					partial[role] = hex;
				}
				current = {
					...current,
					...partial
				};
				commit();
			};
			const applyColors = (colors) => {
				const entries = Object.entries(colors).filter((entry) => APPEARANCE_ROLES.includes(entry[0]) && entry[1] !== void 0 && entry[1] !== "");
				if (entries.length === 0) return;
				const partial = { preset: "custom" };
				for (const [role, hex] of entries) partial[role] = hex;
				current = {
					...current,
					...partial
				};
				commit();
			};
			const resetAll = () => {
				current = {
					...DEFAULT_SETTINGS,
					preset: "default"
				};
				commit();
			};
			const injected = (actions) => {
				bound = actions;
				publish();
				return {
					set,
					setImage,
					setVideo,
					applyPreset,
					applyColors,
					resetAll
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "appearance-custom",
				order: 20,
				store,
				locale: SETTINGS_NS,
				inject: injected
			}, AppearanceCustomizerRow));
		}
		//#endregion
		exports.SETTINGS_NS = SETTINGS_NS;
		exports.STORAGE_KEY = STORAGE_KEY;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	},
(require) => {
var module = { exports: {} }; var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);
var import_react11 = require("react");

// src/client/AutomationView.tsx
var import_react6 = require("react");
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/helpers.ts
function formatRunTrigger(trigger, t) {
  return t(`run.trigger.${trigger}`);
}
var AutomationFormError = class extends Error {
  constructor(key) {
    super(key);
    this.key = key;
  }
};
var SKILL_GESTURE_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
function skillGestureToken(skill) {
  const raw = SKILL_GESTURE_NAME.test(skill.name) ? skill.name : skill.id;
  return `/${raw}`;
}
function insertSkillGesture(prompt, token, caret) {
  const normalized = token.startsWith("/") ? token : `/${token}`;
  const escaped = normalized.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (new RegExp(`(^|\\s)${escaped}(?=\\s|$)`).test(prompt)) {
    return { text: prompt, caret: Math.min(Math.max(caret, 0), prompt.length) };
  }
  const at = Math.min(Math.max(caret, 0), prompt.length);
  const prefix = prompt.slice(0, at);
  const suffix = prompt.slice(at);
  const lead = prefix.length > 0 && !/\s$/.test(prefix) ? " " : "";
  const inserted = `${lead}${normalized} `;
  return { text: prefix + inserted + suffix, caret: prefix.length + inserted.length };
}
function localDateTimeValue(date = /* @__PURE__ */ new Date()) {
  const future = new Date(date.getTime() + 60 * 60 * 1e3);
  future.setMinutes(0, 0, 0);
  const offset = future.getTimezoneOffset() * 6e4;
  return new Date(future.getTime() - offset).toISOString().slice(0, 16);
}
function defaultFormState(now = /* @__PURE__ */ new Date(), workspaces = [], defaultModel, defaultPermission = "") {
  return {
    name: "",
    prompt: "",
    scheduleKind: "daily",
    onceAt: localDateTimeValue(now),
    everyMinutes: "60",
    maxConcurrentRuns: "1",
    intervalAnchor: "",
    time: "09:00",
    weekdays: [1, 2, 3, 4, 5],
    hourlyMinute: "00",
    monthDay: "1",
    customDays: "2",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Shanghai",
    permission: defaultPermission,
    workspaceId: workspaces[0]?.id ?? "",
    modelKey: defaultModel === void 0 || defaultModel === null ? "default" : `${defaultModel.provider}::${defaultModel.model}`,
    reasoningEffort: defaultModel?.reasoning?.defaultEffort ?? "none",
    skills: []
  };
}
function buildCreateInput(form, workspaces, models, now = /* @__PURE__ */ new Date(), options = {}) {
  const maxConcurrentRuns = Number(form.maxConcurrentRuns);
  if (!Number.isSafeInteger(maxConcurrentRuns) || maxConcurrentRuns < 1) throw new AutomationFormError("form.error.maxConcurrentRuns");
  const name2 = form.name.trim();
  const prompt = form.prompt.trim();
  if (name2 === "") throw new AutomationFormError("form.error.name");
  if (prompt === "") throw new AutomationFormError("form.error.prompt");
  const workspace = workspaces.find((item) => item.id === form.workspaceId);
  if (workspace === void 0) throw new AutomationFormError("form.error.workspace");
  let schedule;
  switch (form.scheduleKind) {
    case "once": {
      const at = new Date(form.onceAt);
      if (!Number.isFinite(at.getTime()) || options.allowPastOnce !== true && at.getTime() <= now.getTime()) {
        throw new AutomationFormError("form.error.once");
      }
      schedule = { kind: "once", at: at.toISOString(), timeZone: form.timeZone };
      break;
    }
    case "interval": {
      const everyMinutes = Number(form.everyMinutes);
      if (!Number.isInteger(everyMinutes) || everyMinutes < 1 || everyMinutes > 43200) {
        throw new AutomationFormError("form.error.interval");
      }
      schedule = {
        kind: "interval",
        everyMinutes,
        anchor: form.intervalAnchor.trim() || now.toISOString(),
        timeZone: form.timeZone
      };
      break;
    }
    case "daily":
      schedule = { kind: "daily", time: form.time, timeZone: form.timeZone };
      break;
    case "weekly":
      if (form.weekdays.length === 0) throw new AutomationFormError("form.error.weekdays");
      schedule = { kind: "weekly", time: form.time, weekdays: [...form.weekdays].sort((a, b) => a - b), timeZone: form.timeZone };
      break;
    case "hourly": {
      const minute = Number(form.hourlyMinute);
      if (!Number.isInteger(minute) || minute < 0 || minute > 59) throw new AutomationFormError("form.error.interval");
      schedule = { kind: "hourly", minute, timeZone: form.timeZone };
      break;
    }
    case "monthly": {
      const day = Number(form.monthDay);
      if (!Number.isInteger(day) || day < 1 || day > 31) throw new AutomationFormError("form.error.interval");
      schedule = { kind: "monthly", day, time: form.time, timeZone: form.timeZone };
      break;
    }
    case "custom": {
      const everyDays = Number(form.customDays);
      if (!Number.isInteger(everyDays) || everyDays < 1) throw new AutomationFormError("form.error.interval");
      schedule = { kind: "custom", everyDays, time: form.time, timeZone: form.timeZone };
      break;
    }
  }
  const selected = models.find((item) => `${item.provider}::${item.model}` === form.modelKey);
  return {
    name: name2,
    prompt,
    schedule,
    timeZone: form.timeZone,
    permission: form.permission,
    maxConcurrentRuns,
    workspaceId: workspace.id,
    cwd: workspace.path,
    ...selected === void 0 ? { provider: null, model: null } : { provider: selected.provider, model: selected.model },
    reasoningEffort: form.reasoningEffort === "none" ? null : form.reasoningEffort
  };
}
function formatRelativeTime(iso, now, t) {
  const value = Date.parse(iso);
  if (!Number.isFinite(value)) return iso;
  const deltaMinutes = Math.round((value - now.getTime()) / 6e4);
  const abs = Math.abs(deltaMinutes);
  if (abs < 1) return t("time.now");
  const future = deltaMinutes > 0;
  if (abs < 60) return t(future ? "time.inMinute" : "time.minuteAgo", { count: abs });
  const hours = Math.round(abs / 60);
  if (hours < 24) return t(future ? "time.inHour" : "time.hourAgo", { count: hours });
  const days = Math.round(hours / 24);
  return t(future ? "time.inDay" : "time.dayAgo", { count: days });
}
function formatSchedule(schedule, t) {
  switch (schedule.kind) {
    case "once":
      return t("schedule.onceAt", { time: new Date(schedule.at).toLocaleString() });
    case "interval":
      return t("schedule.everyMinutes", { count: schedule.everyMinutes });
    case "daily":
      return t("schedule.dailyAt", { time: schedule.time });
    case "weekly": {
      const days = schedule.weekdays.map((day) => t(`day.${day}`)).join("\u3001");
      return t("schedule.weeklyAt", { days, time: schedule.time });
    }
    case "hourly":
      return t("schedule.hourlyAt", { minute: String(schedule.minute).padStart(2, "0") });
    case "monthly":
      return t("schedule.monthlyAt", { day: schedule.day, time: schedule.time });
    case "custom":
      return t("schedule.customAt", { count: schedule.everyDays, time: schedule.time });
  }
}
function formatWithin(iso, now, t) {
  const delta = Date.parse(iso) - now.getTime();
  if (!Number.isFinite(delta) || delta <= 0) return t("time.now");
  const minutes = Math.max(1, Math.ceil(delta / 6e4));
  if (minutes < 60) return t("time.withinMinute", { count: minutes });
  const hours = Math.ceil(minutes / 60);
  if (hours < 24) return t("time.withinHour", { count: hours });
  return t("time.withinDay", { count: Math.ceil(hours / 24) });
}
function formatDuration(startedAt, finishedAt) {
  if (startedAt === void 0 || finishedAt === void 0) return void 0;
  const seconds = (Date.parse(finishedAt) - Date.parse(startedAt)) / 1e3;
  if (!Number.isFinite(seconds) || seconds < 0) return void 0;
  return `${seconds.toFixed(1)}s`;
}
function clockTime(iso) {
  const value = new Date(iso);
  if (Number.isNaN(value.getTime())) return iso;
  return value.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}
var HISTORY_STATUS_OPTIONS = [
  "succeeded",
  "failed",
  "interrupted",
  "running",
  "queued",
  "skipped",
  "cancelled"
];
function sortStamp(value) {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
function sortAutomations(items, key, direction) {
  const factor = direction === "asc" ? 1 : -1;
  return items.slice().sort((left, right) => {
    if (key === "planned") {
      const leftNext = left.nextRunAt;
      const rightNext = right.nextRunAt;
      if (leftNext === void 0 || rightNext === void 0) {
        if (leftNext === void 0 && rightNext === void 0) {
          return left.name.localeCompare(right.name) || left.id.localeCompare(right.id);
        }
        return leftNext === void 0 ? 1 : -1;
      }
      const primary2 = sortStamp(leftNext) - sortStamp(rightNext);
      if (primary2 !== 0) return primary2 * factor;
      return left.name.localeCompare(right.name) || left.id.localeCompare(right.id);
    }
    const primary = sortStamp(left.createdAt) - sortStamp(right.createdAt);
    if (primary !== 0) return primary * factor;
    return left.id.localeCompare(right.id);
  });
}
var SETTINGS_SORT_DEFAULT_KEY = "dsh-automation.sort-default.settings";
var OVERVIEW_SORT_DEFAULT_KEY = "dsh-automation.sort-default.overview";
function readSortDefault(storage, storageKey) {
  if (storage === void 0) return void 0;
  try {
    const raw = storage.getItem(storageKey);
    if (raw === null) return void 0;
    const parsed = JSON.parse(raw);
    if (parsed.key !== "created" && parsed.key !== "planned") return void 0;
    if (parsed.direction !== "asc" && parsed.direction !== "desc") return void 0;
    return { key: parsed.key, direction: parsed.direction };
  } catch {
    return void 0;
  }
}
function writeSortDefault(storage, storageKey, key, direction) {
  storage.setItem(storageKey, JSON.stringify({ key, direction }));
}
function groupHistory(runs, range, now, t) {
  const buckets = /* @__PURE__ */ new Map();
  for (const run of runs) {
    const at = new Date(run.finishedAt ?? run.startedAt ?? run.scheduledFor);
    if (Number.isNaN(at.getTime())) continue;
    let key;
    if (range === "month") {
      key = `${at.getFullYear()}-${String(at.getMonth() + 1).padStart(2, "0")}`;
    } else if (range === "week") {
      const start = startOfWeek(at);
      key = localDayKey(start);
    } else {
      key = localDayKey(at);
    }
    const existing = buckets.get(key) ?? [];
    existing.push(run);
    buckets.set(key, existing);
  }
  return [...buckets.entries()].map(([key, items]) => ({
    key,
    label: items[0] === void 0 ? key : range === "month" ? t("history.month", { month: key.replace("-", "/") }) : range === "week" ? t("history.week", { date: key.slice(5).replace("-", "/") }) : key === localDayKey(now) ? t("history.today") : key === localDayKey(new Date(now.getTime() - 864e5)) ? t("history.yesterday") : t("history.date", { date: key.slice(5).replace("-", "/") }),
    items
  }));
}
function localDayKey(value) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
}
function startOfWeek(value) {
  const next = new Date(value);
  const day = next.getDay();
  const offset = day === 0 ? 6 : day - 1;
  next.setHours(0, 0, 0, 0);
  next.setDate(next.getDate() - offset);
  return next;
}
function formFromAutomation(item, workspaces = [], defaultModel, defaultPermission = item.permission) {
  const base = defaultFormState(/* @__PURE__ */ new Date(), workspaces, defaultModel, defaultPermission);
  const schedule = item.schedule;
  const modelKey = item.provider && item.model ? `${item.provider}::${item.model}` : "default";
  const common = {
    ...base,
    name: item.name,
    prompt: item.prompt,
    permission: item.permission,
    maxConcurrentRuns: String(item.maxConcurrentRuns ?? 1),
    workspaceId: item.workspaceId ?? base.workspaceId,
    modelKey,
    reasoningEffort: item.reasoningEffort ?? "none",
    timeZone: item.timeZone || schedule.timeZone || base.timeZone
  };
  switch (schedule.kind) {
    case "once":
      return { ...common, scheduleKind: "once", onceAt: toLocalInput(schedule.at) };
    case "interval":
      return {
        ...common,
        scheduleKind: "interval",
        everyMinutes: String(schedule.everyMinutes),
        intervalAnchor: schedule.anchor ?? ""
      };
    case "hourly":
      return { ...common, scheduleKind: "hourly", hourlyMinute: String(schedule.minute).padStart(2, "0") };
    case "daily":
      return { ...common, scheduleKind: "daily", time: schedule.time };
    case "weekly":
      return { ...common, scheduleKind: "weekly", time: schedule.time, weekdays: [...schedule.weekdays] };
    case "monthly":
      return { ...common, scheduleKind: "monthly", time: schedule.time, monthDay: String(schedule.day) };
    case "custom":
      return { ...common, scheduleKind: "custom", time: schedule.time, customDays: String(schedule.everyDays) };
  }
}
function toLocalInput(iso) {
  const value = new Date(iso);
  if (Number.isNaN(value.getTime())) return localDateTimeValue();
  const offset = value.getTimezoneOffset() * 6e4;
  return new Date(value.getTime() - offset).toISOString().slice(0, 16);
}

// src/run-title.ts
var RUN_STAMP_OPTIONS = {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
};
var zonedRunStampFormatters = /* @__PURE__ */ new Map();
function runStampFormatter(timeZone) {
  const cached = zonedRunStampFormatters.get(timeZone);
  if (cached !== void 0) return cached;
  const formatter = new Intl.DateTimeFormat("en-CA", { ...RUN_STAMP_OPTIONS, timeZone });
  zonedRunStampFormatters.set(timeZone, formatter);
  return formatter;
}
function formatRunStamp(iso, timeZone) {
  const value = new Date(iso);
  if (Number.isNaN(value.getTime())) return iso;
  if (timeZone === void 0) {
    const date = `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
    const time = `${String(value.getHours()).padStart(2, "0")}:${String(value.getMinutes()).padStart(2, "0")}`;
    return `${date} ${time}`;
  }
  try {
    const parts = runStampFormatter(timeZone).formatToParts(value);
    const part = (type) => parts.find((item) => item.type === type)?.value;
    const [year, month, day, hour, minute] = ["year", "month", "day", "hour", "minute"].map((type) => part(type));
    if ([year, month, day, hour, minute].some((item) => item === void 0)) return iso;
    return `${year}-${month}-${day} ${hour}:${minute}`;
  } catch {
    return iso;
  }
}

// src/client/schedule-rail-model.ts
var AUTOMATION_SESSION_PREFIX = "dsh-automation-session-";
var NATIVE_SIDEBAR_TAB_KEY = "dsh-automation.sidebar-tab";
function groupScheduledSessions(automations, runs) {
  const nameById = /* @__PURE__ */ new Map();
  const timeZoneById = /* @__PURE__ */ new Map();
  for (const item of automations) {
    nameById.set(item.id, item.name);
    if (item.timeZone !== void 0) timeZoneById.set(item.id, item.timeZone);
  }
  for (const run of runs) {
    const stored = (run.automationName || "").trim();
    if (stored !== "" && stored !== run.automationId && !nameById.has(run.automationId)) {
      nameById.set(run.automationId, stored);
    }
  }
  const ids = [];
  const seen = /* @__PURE__ */ new Set();
  for (const item of automations) {
    if (seen.has(item.id)) continue;
    ids.push(item.id);
    seen.add(item.id);
  }
  for (const run of runs) {
    if (run.sessionId === void 0 || run.sessionId === "" || seen.has(run.automationId)) continue;
    ids.push(run.automationId);
    seen.add(run.automationId);
  }
  return ids.map((id) => {
    const name2 = nameById.get(id) ?? id;
    return {
      id,
      name: name2,
      sessions: runs.filter((run) => run.automationId === id && run.sessionId !== void 0 && run.sessionId !== "").slice().sort((left, right) => Date.parse(right.startedAt ?? right.scheduledFor) - Date.parse(left.startedAt ?? left.scheduledFor)).map((run) => ({
        id: run.sessionId,
        running: run.status === "running" || run.status === "queued",
        label: formatRunStamp(run.startedAt ?? run.scheduledFor, timeZoneById.get(id)) + " - " + name2
      }))
    };
  }).filter((group) => group.sessions.length > 0);
}
function automationToggleMutation(status) {
  return status === "active" ? "pause" : "resume";
}
function deriveTaskOverviewRows(automations) {
  return automations.map((item) => ({
    id: item.id,
    name: item.name,
    status: item.status,
    ...item.nextRunAt === void 0 ? {} : { nextRunAt: item.nextRunAt }
  }));
}
function keepScheduledSessionLink(sessionId, archived, _presentIds) {
  if (sessionId === void 0 || sessionId === "") return false;
  if (archived.has(sessionId)) return false;
  return true;
}
function scheduledSessionNeedsSnapshotRefresh(sessionId, runs) {
  if (sessionId === void 0 || sessionId === null || sessionId === "") return false;
  if (!sessionId.startsWith(AUTOMATION_SESSION_PREFIX)) return false;
  return !(runs ?? []).some((run) => run.sessionId === sessionId);
}
function collectScheduledSessionIds(runs) {
  const ids = /* @__PURE__ */ new Set();
  for (const run of runs ?? []) {
    const id = run.sessionId;
    if (typeof id === "string" && id !== "") ids.add(id);
  }
  return ids;
}
var AUTOMATION_TITLE_RE = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/;
function isAutomationSidebarSession(id, item, scheduledIds = /* @__PURE__ */ new Set()) {
  if (id.startsWith(AUTOMATION_SESSION_PREFIX) || scheduledIds.has(id)) return true;
  const title = String(item?.title ?? item?.displayTitle ?? "");
  return AUTOMATION_TITLE_RE.test(title);
}
function isNativeTaskSession(item, scheduledIds = /* @__PURE__ */ new Set()) {
  if (item === void 0 || item.blank === true) return false;
  if (item.origin === "im" || item.origin === "subagent") return false;
  const id = item.id ?? "";
  if (id.startsWith("im:")) return false;
  if (isAutomationSidebarSession(id, item, scheduledIds)) return false;
  return true;
}
function groupNativeTaskSessions(sessions, workspaces, ungroupedLabel, scheduledIds = /* @__PURE__ */ new Set()) {
  const byId = sessions.byId ?? {};
  const archived = new Set(workspaces?.archivedSessionIds ?? []);
  const assigned = /* @__PURE__ */ new Set();
  const groups = [];
  for (const workspace of workspaces?.items ?? []) {
    const items = (workspace.sessionIds ?? []).map((id) => byId[id]).filter((item) => item !== void 0 && item.id !== void 0 && isNativeTaskSession(item, scheduledIds) && !archived.has(item.id));
    for (const item of items) {
      if (item.id !== void 0) assigned.add(item.id);
    }
    if (items.length > 0) {
      groups.push({
        id: workspace.workspaceId ?? workspace.id ?? workspace.path ?? workspace.title ?? "workspace",
        label: workspace.title || workspace.path || ungroupedLabel,
        sessions: items
      });
    }
  }
  const ungrouped = (sessions.ids ?? []).map((id) => byId[id]).filter((item) => item !== void 0 && item.id !== void 0 && !assigned.has(item.id) && isNativeTaskSession(item, scheduledIds) && !archived.has(item.id));
  if (ungrouped.length > 0) groups.push({ id: "", label: ungroupedLabel, sessions: ungrouped });
  return groups;
}
function readNativeSidebarTab(raw) {
  if (raw === "channels" || raw === "schedule" || raw === "tasks") return raw;
  return "tasks";
}
function shouldFollowSessionTab(previousCurrent, current) {
  const prev = previousCurrent ?? "";
  const next = current ?? "";
  return next !== "" && prev !== next;
}
function ownedSidebarTabIds(input) {
  const ids = ["tasks"];
  for (const id of input.extraTabIds) {
    if (id === "" || id === "tasks" || id === "schedule" || ids.includes(id)) continue;
    ids.push(id);
  }
  if (input.channelsReady && !ids.includes("channels")) ids.push("channels");
  ids.push("schedule");
  return ids;
}
function resolveVisibleSidebarTab(input) {
  if (input.extraTabIds.includes(input.tab)) return input.tab;
  if (input.tab === "channels" && !input.channelsReady) return "tasks";
  return input.tab;
}
function tabForSessionId(sessionId, scheduledIds) {
  if (sessionId === void 0 || sessionId === null || sessionId === "") return void 0;
  if (scheduledIds !== void 0 ? scheduledIds.has(sessionId) : sessionId.startsWith(AUTOMATION_SESSION_PREFIX)) return "schedule";
  if (sessionId.startsWith("im:")) return "channels";
  return void 0;
}
function occupantLooksLikeCodexUi(value) {
  return /dsh-codex-ui|michengai-codex-ui|michengai\.codexUi|codex-ui/i.test(String(value ?? ""));
}
function slotOccupantName(item) {
  const record = item;
  return String(
    record?.options?.locale ?? record?.options?.id ?? record?.options?.name ?? record?.options?.registrant ?? record?.component?.displayName ?? record?.component?.name ?? record?.id ?? record?.name ?? ""
  );
}
function hasCodexUiSidebar(entries) {
  return (entries ?? []).some((item) => occupantLooksLikeCodexUi(slotOccupantName(item)));
}
var taskFilterCache = /* @__PURE__ */ new WeakMap();
var workspaceFilterCache = /* @__PURE__ */ new WeakMap();
function scheduledCacheKey(scheduledIds) {
  if (scheduledIds.size === 0) return "";
  return [...scheduledIds].sort().join("\0");
}
function filterTaskSessionState(state, scheduledIds = /* @__PURE__ */ new Set()) {
  const src = state ?? { ids: [], byId: {}, current: null };
  const key = scheduledCacheKey(scheduledIds);
  if (typeof src === "object" && src !== null) {
    const hit = taskFilterCache.get(src);
    if (hit !== void 0 && hit.key === key) return hit.result;
  }
  const ids = (src.ids ?? []).filter((id) => {
    const value = String(id);
    return !value.startsWith("im:") && !isAutomationSidebarSession(value, src.byId?.[value], scheduledIds);
  });
  const unchanged = ids.length === (src.ids ?? []).length;
  const result = unchanged ? src : { ...src, ids, byId: Object.fromEntries(ids.map((id) => [id, src.byId?.[id]]).filter((entry) => entry[1] !== void 0)) };
  if (typeof src === "object" && src !== null) taskFilterCache.set(src, { key, result });
  return result;
}
function openScheduledSession(id, openRuntime, openHost) {
  if (id === "") return false;
  const attempts = id.startsWith(AUTOMATION_SESSION_PREFIX) || id.startsWith("im:") ? [openRuntime, openHost] : [openHost, openRuntime];
  for (const attempt of attempts) {
    if (typeof attempt !== "function") continue;
    try {
      attempt(id);
      return true;
    } catch {
    }
  }
  return false;
}
async function ensureOpenScheduledSession(input) {
  const id = input.id.trim();
  if (id === "") return false;
  await input.adopt?.(id).catch(() => void 0);
  const listed = () => input.listed?.(id) === true;
  if (!listed() && input.refresh !== void 0) {
    await input.refresh().catch(() => void 0);
  }
  if (openScheduledSession(id, input.openRuntime, input.openHost)) return true;
  if (input.refresh !== void 0) {
    await input.refresh().catch(() => void 0);
  }
  return openScheduledSession(id, input.openRuntime, input.openHost);
}
function isHiddenSidebarSessionId(id, scheduledIds = /* @__PURE__ */ new Set()) {
  return id.startsWith("im:") || isAutomationSidebarSession(id, void 0, scheduledIds);
}
function filterWorkspaceListState(state, scheduledIds = /* @__PURE__ */ new Set()) {
  const src = state ?? { items: [], archivedSessionIds: [] };
  const key = scheduledCacheKey(scheduledIds);
  if (typeof src === "object" && src !== null) {
    const hit = workspaceFilterCache.get(src);
    if (hit !== void 0 && hit.key === key) return hit.result;
  }
  let changed = false;
  const items = (src.items ?? []).map((workspace) => {
    const sessionIds = (workspace.sessionIds ?? []).filter((sid) => !isHiddenSidebarSessionId(String(sid), scheduledIds));
    if (sessionIds.length !== (workspace.sessionIds ?? []).length) {
      changed = true;
      return { ...workspace, sessionIds };
    }
    return workspace;
  });
  const result = changed ? { ...src, items } : src;
  if (typeof src === "object" && src !== null) workspaceFilterCache.set(src, { key, result });
  return result;
}
function wrapperFlags(component) {
  if (component === void 0 || component === null || typeof component !== "function" && typeof component !== "object") return {};
  return component;
}
function isOwnAutomationWrapper(component) {
  return wrapperFlags(component).__dshAutomationWrapped === true;
}
function resolveOfficialTreeComponent(component) {
  const seen = /* @__PURE__ */ new Set();
  let current = component;
  while (current !== void 0 && current !== null && !seen.has(current)) {
    seen.add(current);
    const flags = wrapperFlags(current);
    const next = flags.__dshAutomationOriginal ?? flags.__imConnectOriginal;
    if (next !== void 0 && next !== current) {
      current = next;
      continue;
    }
    if (flags.__dshAutomationWrapped === true || flags.__imConnectWrapped === true) return void 0;
    return current;
  }
  return void 0;
}
function isAutomationWorkspaceWrapper(item) {
  const record = item;
  const id = String(record?.options?.id ?? "");
  const name2 = String(record?.component?.displayName ?? record?.component?.name ?? "");
  return id === "dsh-automation-native-switcher" || id === "dsh-automation-wrap-bump" || name2 === "AutomationNativeWorkspaceShell" || name2 === "AutomationWrapBump" || isOwnAutomationWrapper(record?.component);
}
function pickWrappableWorkspacesEntry(entries) {
  for (const item of entries) {
    const record = item;
    if (record?.component === void 0) continue;
    if (isAutomationWorkspaceWrapper(item)) continue;
    return item;
  }
  return void 0;
}
function applyWorkspaceBrowserQuery(groups, query, sort, groupMode = "workspace") {
  const needle = query.trim().toLocaleLowerCase();
  const filtered = groups.map((group) => {
    if (needle === "") return group;
    if (group.name.toLocaleLowerCase().includes(needle)) return group;
    const sessions = group.sessions.filter((session) => `${session.title ?? ""} ${session.label ?? ""}`.toLocaleLowerCase().includes(needle));
    return { ...group, sessions };
  }).filter((group) => group.sessions.length > 0 || needle !== "" && group.name.toLocaleLowerCase().includes(needle));
  if (groupMode === "list") {
    const sessions = filtered.flatMap((group) => [...group.sessions]);
    if (sort === "time") sessions.sort((left, right) => sessionTime(right) - sessionTime(left));
    return sessions.length === 0 ? [] : [{ ...filtered[0], name: "", sessions }];
  }
  if (sort === "manual") return filtered;
  return [...filtered].sort((left, right) => latestSessionTime(right) - latestSessionTime(left));
}
function sessionTime(session) {
  const ts = Date.parse(session.updatedAt ?? "");
  return Number.isFinite(ts) ? ts : 0;
}
function latestSessionTime(group) {
  let latest = 0;
  for (const session of group.sessions) {
    const ts = sessionTime(session);
    if (ts > latest) latest = ts;
  }
  return latest;
}

// src/client/icons.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function IconFrame({ children, ...props }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 24 24", width: "18", height: "18", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", ...props, children });
}
function PlusIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconFrame, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14M5 12h14" }) });
}
function RefreshIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconFrame, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 7v5h-5" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.1 15.5A7.5 7.5 0 1 1 19 12" })
  ] });
}
function PlayIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 16 16", width: 16, height: 16, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4.6 3.4 11.7 8l-7.1 4.6V3.4Z", fill: "currentColor", stroke: "currentColor", strokeWidth: "1.6", strokeLinejoin: "round" }) });
}
function TrashIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FillIcon, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M14.478 4.841 14.214 10.115c-.104 2.072-.147 2.896-.827 3.846a3.53 3.53 0 0 1-1.044.993c-.519.333-1.101.478-1.784.546-.671.067-1.509.066-2.559.066s-1.887.001-2.558-.066c-.683-.068-1.266-.213-1.784-.546a3.53 3.53 0 0 1-1.044-.993c-.681-.95-.724-1.774-.828-3.846L1.522 4.841l1.368-.068.263 5.273c.109 2.176.171 2.556.573 3.117a2.16 2.16 0 0 0 .673.64c.263.169.603.277 1.179.334.587.059 1.345.06 2.422.06s1.834-.001 2.422-.06c.575-.057.916-.165 1.179-.335.262-.168.49-.386.672-.64.402-.56.464-.94.573-3.116l.263-5.273 1.369.068ZM5.43 6.228h1.37v5.163H5.43V6.228Zm3.77 0h1.37v5.163H9.2V6.228ZM8.536.434c.644 0 1.116-.007 1.56.137.14.045.276.101.406.168.416.212.745.552 1.2 1.007l.796.795h2.876v1.37H.626V2.541h2.876l.796-.795c.456-.455.784-.795 1.2-1.007.13-.067.266-.123.405-.168C6.348.427 6.82.434 7.464.434h1.072Zm-1.072 1.37c-.732 0-.948.008-1.138.07a2.2 2.2 0 0 0-.206.085c-.156.08-.296.204-.678.583h5.117c-.382-.379-.522-.503-.679-.583a2.2 2.2 0 0 0-.205-.085c-.191-.062-.406-.07-1.138-.07H7.464Z" }) });
}
function ShieldIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconFrame, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3.8 19 6v5.1c0 4.3-2.6 7.4-7 9.1-4.4-1.7-7-4.8-7-9.1V6l7-2.2Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9.4 12 1.7 1.7 3.7-4" })
  ] });
}
function CalendarIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconFrame, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: "4", y: "5.5", width: "16", height: "14", rx: "2" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 3.8v3.4M16 3.8v3.4M4 9.5h16" })
  ] });
}
function MoreIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconFrame, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "6", cy: "12", r: "1.2", fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "1.2", fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "18", cy: "12", r: "1.2", fill: "currentColor" })
  ] });
}
function InfoIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconFrame, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "8.25" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 10.4V16" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 7.6h.01" })
  ] });
}
function ClockIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(IconFrame, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "12", cy: "12", r: "8.25" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 7.6v4.6l3 1.8" })
  ] });
}
function ChatIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconFrame, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5.5 6.5h13v9.2H9.2L5.5 18.8V6.5Z" }) });
}
function GithubIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true", focusable: "false", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M8 0a8 8 0 0 0-2.53 15.59c.4.074.547-.173.547-.385 0-.19-.007-.693-.01-1.36-2.226.484-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.726-.496.055-.486.055-.486.803.056 1.225.824 1.225.824.714 1.223 1.872.87 2.328.665.072-.517.28-.87.508-1.07-1.777-.202-3.645-.888-3.645-3.956 0-.874.31-1.588.823-2.148-.083-.202-.357-1.017.078-2.12 0 0 .672-.215 2.2.82A7.65 7.65 0 0 1 8 4.8c.68.003 1.365.092 2.004.27 1.527-1.035 2.197-.82 2.197-.82.437 1.103.162 1.918.08 2.12.513.56.822 1.274.822 2.148 0 3.076-1.872 3.752-3.654 3.95.288.248.544.735.544 1.482 0 1.07-.01 1.932-.01 2.195 0 .214.144.463.55.384A8.001 8.001 0 0 0 8 0Z" }) });
}
function FolderIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconFrame, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 7.2h6.1l1.7 1.8H20V18H4V7.2Z" }) });
}
function SparkleIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconFrame, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3.6 13.3 8.7 18.4 10 13.3 11.3 12 16.4 10.7 11.3 5.6 10 10.7 8.7 12 3.6Z" }) });
}
function FillIcon({ children, width = 16, height = 16 }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 16 16", width, height, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children });
}
function CloseOutlineIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FillIcon, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M14.1168 13.197L13.197 14.1167L1.8833 2.80303L2.80309 1.88324L14.1168 13.197Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M13.197 1.88326L14.1168 2.80305L2.80309 14.1168L1.8833 13.197L13.197 1.88326Z" })
  ] });
}
function CheckOutlineIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FillIcon, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M15.0498 3.92579L8.49512 12.3818C8.25774 12.6881 8.04517 12.9645 7.84668 13.1689C7.63957 13.3823 7.38732 13.5841 7.04492 13.6719C6.86373 13.7183 6.6757 13.7346 6.48926 13.7197C6.13666 13.6915 5.8528 13.5355 5.6123 13.3604C5.38201 13.1926 5.12573 12.9567 4.83984 12.6953L1.03125 9.21289L1.96875 8.1875L5.77734 11.6699C6.08684 11.9529 6.27773 12.1249 6.43066 12.2363C6.50183 12.2882 6.54699 12.3135 6.57324 12.3252C6.58525 12.3305 6.59269 12.3322 6.5957 12.333C6.59802 12.3336 6.59961 12.334 6.59961 12.334C6.63317 12.3367 6.66758 12.3335 6.7002 12.3252C6.7002 12.3252 6.70211 12.3251 6.7041 12.3242C6.70698 12.3229 6.71348 12.319 6.72461 12.3115C6.74849 12.2956 6.78843 12.2642 6.84961 12.2012C6.98138 12.0654 7.13957 11.8628 7.39648 11.5313L13.9502 3.07422L15.0498 3.92579Z" }) });
}
function SearchOutlineIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FillIcon, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M11.894845 6.647401C11.894845 3.725463 9.534486 1.356779 6.623219 1.35657C3.711786 1.35657 1.351635 3.725338 1.351635 6.647401C1.351843 9.569296 3.711911 11.938273 6.623219 11.938273C9.534361 11.938064 11.894637 9.569171 11.894845 6.647401ZM13.245462 6.647401C13.245254 10.317935 10.280401 13.293613 6.623219 13.293821C2.965871 13.293821 0.000204 10.31806 0 6.647401C0 2.976574 2.965746 0 6.623219 0C10.280526 0.000205 13.245462 2.9767 13.245462 6.647401Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M16.000417 15.041079L15.044449 16.000433L11.530434 12.473588L12.486298 11.514234L16.000417 15.041079Z" })
  ] });
}
function SlidersIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FillIcon, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M2.2 3.4h6.05a1.85 1.85 0 0 0 3.5 0H13.8v1.3H11.75a1.85 1.85 0 0 0-3.5 0H2.2V3.4Zm8.6 1.15A.75.75 0 1 1 10.05 4.55.75.75 0 0 1 10.8 4.55ZM2.2 7.35h2.35a1.85 1.85 0 0 0 3.5 0H13.8v1.3H8.05a1.85 1.85 0 0 0-3.5 0H2.2V7.35Zm4.1 1.15A.75.75 0 1 1 5.55 8.5a.75.75 0 0 1 .75-.75ZM2.2 11.3h7.35a1.85 1.85 0 0 0 3.5 0H13.8v1.3h-.75a1.85 1.85 0 0 0-3.5 0H2.2v-1.3Zm9.9 1.15a.75.75 0 1 1-.75-.75.75.75 0 0 1 .75.75Z" }) });
}
function FolderClosedIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FillIcon, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", transform: "translate(1.5 2.429)", d: "M5.05582 0.518756L4.50669 0.86654L5.05582 0.518756ZM13 9.4837L13.65 9.4837L13.65 3.53962L13 3.53962L12.35 3.53962L12.35 9.4837L13 9.4837ZM11.3264 1.86603L11.3264 1.21603L6.52313 1.21603L6.52313 1.86603L6.52313 2.51603L11.3264 2.51603L11.3264 1.86603ZM5.58054 1.34727L6.12968 0.999489L5.60495 0.170972L5.05582 0.518756L4.50669 0.86654L5.03141 1.69506L5.58054 1.34727ZM4.11323 1.23058e-13L4.11323 -0.65L1.67359 -0.65L1.67359 5.00699e-14L1.67359 0.65L4.11323 0.65L4.11323 1.23058e-13ZM0 1.67359L-0.65 1.67359L-0.65 9.4837L0 9.4837L0.65 9.4837L0.65 1.67359L0 1.67359ZM11.3264 11.1573L11.3264 10.5073L1.67359 10.5073L1.67359 11.1573L1.67359 11.8073L11.3264 11.8073L11.3264 11.1573ZM0 9.4837L-0.65 9.4837C-0.65 10.767 0.390308 11.8073 1.67359 11.8073L1.67359 11.1573L1.67359 10.5073C1.10828 10.5073 0.65 10.049 0.65 9.4837L0 9.4837ZM1.67359 5.00699e-14L1.67359 -0.65C0.390307 -0.65 -0.65 0.390309 -0.65 1.67359L0 1.67359L0.65 1.67359C0.65 1.10828 1.10828 0.65 1.67359 0.65L1.67359 5.00699e-14ZM5.05582 0.518756L5.60495 0.170972C5.28121 -0.340193 4.71829 -0.65 4.11323 -0.65L4.11323 1.23058e-13L4.11323 0.65C4.27282 0.65 4.4213 0.731715 4.50669 0.86654L5.05582 0.518756ZM6.52313 1.86603L6.52313 1.21603C6.36354 1.21603 6.21507 1.13431 6.12968 0.999489L5.58054 1.34727L5.03141 1.69506C5.35515 2.20622 5.91808 2.51603 6.52313 2.51603L6.52313 1.86603ZM13 3.53962L13.65 3.53962C13.65 2.25634 12.6097 1.21603 11.3264 1.21603L11.3264 1.86603L11.3264 2.51603C11.8917 2.51603 12.35 2.97431 12.35 3.53962L13 3.53962ZM13 9.4837L12.35 9.4837C12.35 10.049 11.8917 10.5073 11.3264 10.5073L11.3264 11.1573L11.3264 11.8073C12.6097 11.8073 13.65 10.767 13.65 9.4837L13 9.4837Z" }) });
}
function FolderOpenIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FillIcon, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M5.19629 1.57104C5.81144 1.5711 6.38623 1.8786 6.72754 2.39038L7.19922 3.09839C7.28454 3.22635 7.42824 3.30344 7.58203 3.30347H12.1699C13.5039 3.30348 14.5859 4.38548 14.5859 5.71948V6.62671C15.2694 7.02689 15.6605 7.85012 15.4385 8.68726L14.3848 12.658C14.1037 13.7164 13.1449 14.4527 12.0498 14.4529H2.91699C1.51651 14.4529 0.451662 13.2814 0.501954 11.9519V3.98706C0.501954 2.65305 1.58396 1.57104 2.91797 1.57104H5.19629ZM3.7793 7.75562C3.30994 7.75562 2.89883 8.07153 2.77832 8.52515L1.91602 11.7722C1.74167 12.4291 2.23734 13.073 2.91699 13.073H12.0498C12.5191 13.0728 12.9304 12.757 13.0508 12.3035L14.1045 8.33374C14.1819 8.04202 13.9619 7.756 13.6602 7.75562H3.7793ZM2.91797 2.9519C2.34625 2.9519 1.88281 3.41534 1.88281 3.98706V7.2937C2.33068 6.7269 3.02249 6.37476 3.7793 6.37476H13.2051V5.71948C13.2051 5.14777 12.7416 4.68434 12.1699 4.68433H7.58203C6.96675 4.6843 6.39209 4.37595 6.05078 3.86401L5.5791 3.15601C5.49379 3.02821 5.34995 2.95196 5.19629 2.9519H2.91797Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", opacity: "0.2", d: "M13.6602 7.75525C13.9618 7.7556 14.1815 8.04179 14.1045 8.33337L13.0508 12.3031C12.9304 12.7567 12.5191 13.0725 12.0498 13.0726H2.91701C2.23744 13.0725 1.7417 12.4287 1.91603 11.7719L2.77834 8.52478C2.89898 8.07146 3.31018 7.75532 3.77931 7.75525H13.6602ZM5.1963 2.95154C5.34985 2.95159 5.49377 3.02803 5.57912 3.15564L6.0508 3.86365C6.39205 4.37553 6.96685 4.68385 7.58205 4.68396H12.1699C12.7416 4.68396 13.2049 5.14754 13.2051 5.71912V6.37439H3.77931C3.02267 6.37444 2.33067 6.72671 1.88283 7.29333V3.98669C1.88299 3.4152 2.34649 2.95168 2.91798 2.95154H5.1963Z" })
  ] });
}
function ChevronIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 14 14", width: props.width || 14, height: props.height || 14, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M4.25 2.828v8.344c0 .49.592.735.939.389l4.172-4.172a.55.55 0 0 0 0-.778L5.189 2.439c-.347-.347-.939-.101-.939.389Z" }) });
}
function EllipsisIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FillIcon, { ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M4.55146 8.00001C4.55146 8.63513 4.03659 9.15001 3.40146 9.15001C2.76634 9.15001 2.25146 8.63513 2.25146 8.00001C2.25146 7.36488 2.76634 6.85001 3.40146 6.85001C4.03659 6.85001 4.55146 7.36488 4.55146 8.00001Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M9.1476 8.00001C9.1476 8.63513 8.63273 9.15001 7.9976 9.15001C7.36248 9.15001 6.8476 8.63513 6.8476 8.00001C6.8476 7.36488 7.36248 6.85001 7.9976 6.85001C8.63273 6.85001 9.1476 7.36488 9.1476 8.00001Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M13.7486 8.00001C13.7486 8.63513 13.2338 9.15001 12.5986 9.15001C11.9635 9.15001 11.4486 8.63513 11.4486 8.00001C11.4486 7.36488 11.9635 6.85001 12.5986 6.85001C13.2338 6.85001 13.7486 7.36488 13.7486 8.00001Z" })
  ] });
}
function PencilIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FillIcon, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M9.941 1.349a2.54 2.54 0 0 1 2.473 0c.292.171.555.442.897.784.341.341.612.604.783.896a2.54 2.54 0 0 1 0 2.473c-.171.292-.442.555-.784.896L6.659 13.05c-.378.378-.652.661-.994.86-.341.199-.722.298-1.238.44l-1.183.326c-.469.13-.899.25-1.243.292-.349.043-.821.033-1.19-.336-.369-.369-.379-.841-.336-1.19.042-.344.163-.774.292-1.243l.326-1.183c.143-.516.242-.897.44-1.238.199-.342.482-.615.86-.994l6.652-6.651c.341-.342.604-.613.896-.784Zm1.759 1.222a1.16 1.16 0 0 0-1.045 0c-.095.056-.206.158-.61.562L9.456 3.721l2.265 2.265.589-.588c.404-.403.507-.515.562-.61a1.16 1.16 0 0 0 0-1.045c-.056-.095-.158-.206-.562-.61-.404-.404-.515-.507-.61-.562ZM3.394 9.784c-.429.429-.551.56-.637.706-.085.147-.138.318-.3.903l-.326 1.183c-.129.468-.209.766-.242.978.212-.033.51-.112.979-.241l1.183-.327c.585-.161.756-.214.902-.3.147-.085.277-.208.706-.636l5.062-5.063-2.265-2.265-5.062 5.062Z" }) });
}
function BranchIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FillIcon, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", d: "M13.076 1.372c1.008 0 1.826.819 1.826 1.827s-.818 1.826-1.826 1.826c-.78 0-1.444-.488-1.706-1.175H4.355c.439.415.804.915 1.062 1.485l1.69 3.733a4.83 4.83 0 0 0 4.312 2.97c.29-.626.923-1.061 1.658-1.061 1.008 0 1.826.818 1.826 1.826s-.818 1.826-1.826 1.826c-.823 0-1.519-.545-1.747-1.293a6.34 6.34 0 0 1-5.406-3.731L4.232 5.871A3.83 3.83 0 0 0 1.098 3.85V2.549h10.272c.263-.687.927-1.177 1.706-1.177Zm0 10.904a.525.525 0 1 0 0 1.052.525.525 0 0 0 0-1.052Zm0-9.603a.526.526 0 1 0 0 1.053.526.526 0 0 0 0-1.053Z" }) });
}
function ArchiveIcon(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { viewBox: "0 0 20 20", width: props.width || 16, height: props.height || 16, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", fillRule: "evenodd", clipRule: "evenodd", d: "M15.866 2.06a2.526 2.526 0 0 1 2.525 2.525v.902c0 .54-.172 1.04-.461 1.45l.009.085v5.866c0 .746 0 1.35-.039 1.837-.035.434-.106.825-.262 1.189l-.072.154a3.03 3.03 0 0 1-1.262 1.366l-.236.132c-.408.208-.848.294-1.344.334-.488.04-1.091.04-1.837.04H7.111c-.746 0-1.35 0-1.837-.04-.434-.035-.825-.105-1.189-.261l-.154-.073a3.03 3.03 0 0 1-1.366-1.262l-.132-.235a2.53 2.53 0 0 1-.335-1.344c-.04-.487-.039-1.091-.039-1.837V7.022c0-.029.005-.057.008-.086A2.48 2.48 0 0 1 1.609 5.487v-.902A2.526 2.526 0 0 1 4.134 2.06h11.732Zm.632 5.87a2.48 2.48 0 0 1-.632.083H4.134a2.48 2.48 0 0 1-.634-.083v4.959c0 .77 0 1.304.034 1.72.034.406.095.635.182.806l.076.137c.191.311.465.565.792.731l.141.061c.156.055.361.096.666.121.415.034.95.035 1.72.035h5.775c.77 0 1.305 0 1.72-.035.407-.033.636-.095.807-.182l.138-.077c.311-.191.565-.464.731-.791l.06-.142c.056-.155.097-.36.122-.665.034-.415.034-.95.034-1.72V7.93ZM4.134 3.5a1.086 1.086 0 0 0-1.085 1.085v.902c0 .599.486 1.085 1.085 1.085h11.732c.599 0 1.085-.486 1.085-1.085v-.902A1.086 1.086 0 0 0 15.866 3.5H4.134Z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { fill: "currentColor", d: "M12.796 12.566v-1.483H7.205v1.483h5.591Z" })
  ] });
}
var RUNNING_CELLS = [
  [0, 0],
  [4, 0],
  [8, 0],
  [8, 4],
  [8, 8],
  [4, 8],
  [0, 8],
  [0, 4]
];
function RunningStateDot() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "dsh-st-run-dot", width: 10, height: 10, viewBox: "0 0 10 10", shapeRendering: "crispEdges", "aria-hidden": "true", children: RUNNING_CELLS.map(([x, y], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "rect",
    {
      className: "dsh-st-run-dot-cell",
      x,
      y,
      width: "2",
      height: "2",
      style: { animationDelay: `${(index - RUNNING_CELLS.length) * 125}ms` }
    },
    `${x}-${y}`
  )) });
}

// src/client/create-modal.tsx
var import_react2 = require("react");

// src/client/permissions.ts
var BUILT_IN_PERMISSION_LABELS = /* @__PURE__ */ new Map([
  ["read-only", ["permission.readOnly", "Read Only"]],
  ["workspace-write", ["permission.workspaceWrite", "Workspace Write"]],
  ["danger-full-access", ["permission.fullAccess", "Full access"]]
]);
function permissionLabel(option, t) {
  const builtIn = BUILT_IN_PERMISSION_LABELS.get(option.value);
  if (builtIn !== void 0 && (option.name === option.value || option.name === builtIn[1])) {
    return t(builtIn[0]);
  }
  return option.name || option.value;
}

// src/client/create-modal-logic.ts
function shouldConfirmFullAccess(current, next) {
  return current !== next && next === "danger-full-access";
}

// src/client/menu.tsx
var import_react = require("react");
var import_react_dom = require("react-dom");
var import_jsx_runtime2 = require("react/jsx-runtime");
var MenuHostContext = (0, import_react.createContext)(null);
function useMenuOpen() {
  const [open, setOpen] = (0, import_react.useState)(false);
  const root = (0, import_react.useRef)(null);
  const menu = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const close = (event) => {
      const target = event.target;
      if (root.current !== null && root.current.contains(target)) return;
      if (menu.current !== null && menu.current.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, [open]);
  return { open, setOpen, root, menu };
}
function flyoutStyle(anchor, host, up, end) {
  const box = anchor.getBoundingClientRect();
  const frame = host.getBoundingClientRect();
  const gap = 6;
  return {
    position: "absolute",
    zIndex: 1200,
    top: up === true ? "auto" : `${box.bottom - frame.top + gap}px`,
    bottom: up === true ? `${frame.bottom - box.top + gap}px` : "auto",
    left: end === true ? "auto" : `${box.left - frame.left}px`,
    right: end === true ? `${frame.right - box.right}px` : "auto"
  };
}
function MenuPopup({
  open,
  anchor,
  menuRef,
  up,
  end,
  className,
  ariaLabel,
  children,
  onClick
}) {
  const host = (0, import_react.useContext)(MenuHostContext);
  const [style, setStyle] = (0, import_react.useState)({});
  (0, import_react.useLayoutEffect)(() => {
    if (!open || anchor.current === null || host === null) return;
    const update = () => {
      if (anchor.current !== null) setStyle(flyoutStyle(anchor.current, host, up, end));
    };
    update();
    window.addEventListener("resize", update);
    document.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      document.removeEventListener("scroll", update, true);
    };
  }, [open, anchor, host, up, end]);
  if (!open) return null;
  const node = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      ref: menuRef,
      className: `${className}${host !== null ? " is-float" : ""}`,
      role: "menu",
      "aria-label": ariaLabel,
      style: host !== null ? style : void 0,
      onMouseDown: (event) => event.stopPropagation(),
      onClick: (event) => {
        event.stopPropagation();
        onClick?.();
      },
      children
    }
  );
  if (host !== null) return (0, import_react_dom.createPortal)(node, host);
  return node;
}
function MenuHostProvider({
  host,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MenuHostContext.Provider, { value: host, children });
}
function MenuRow({
  icon,
  label,
  hint,
  active,
  chevron,
  kv,
  onClick
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { type: "button", className: `dsh-st-menu-row${active === true ? " is-on" : ""}${kv === true ? " is-kv" : ""}`, onClick, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dsh-st-menu-row-main", children: [
      icon,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: label })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "dsh-st-menu-row-side", children: [
      hint !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: hint }),
      active === true && chevron !== true && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "dsh-st-tick" }),
      chevron === true && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("i", { className: "dsh-st-next" })
    ] })
  ] });
}
function MenuSelect({
  value,
  options,
  onChange,
  wide,
  pill,
  up,
  icon
}) {
  const menu = useMenuOpen();
  const current = options.find((item) => item.value === value)?.label ?? value;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `dsh-st-select${wide === true ? " is-wide" : ""}${pill === true ? " is-pill" : ""}${menu.open ? " is-open" : ""}`, ref: menu.root, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "button",
      {
        type: "button",
        className: "dsh-st-select-btn",
        onMouseDown: (event) => event.stopPropagation(),
        onClick: () => menu.setOpen((value2) => !value2),
        children: [
          icon,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: current }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("em", {})
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      MenuPopup,
      {
        open: menu.open,
        anchor: menu.root,
        menuRef: menu.menu,
        up,
        end: up,
        className: `dsh-st-select-menu${pill === true ? " is-composer" : ""}${up === true ? " is-up" : ""}${up === true ? " is-end" : ""}`,
        children: options.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          MenuRow,
          {
            icon: item.icon,
            label: item.label,
            active: item.value === value,
            onClick: () => {
              onChange(item.value);
              menu.setOpen(false);
            }
          },
          item.value
        ))
      }
    )
  ] });
}
function MenuPanel({
  label,
  children,
  ghost,
  up,
  persist
}) {
  const menu = useMenuOpen();
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `dsh-st-select${ghost === true ? " is-pill" : ""}${menu.open ? " is-open" : ""}`, ref: menu.root, children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "button",
      {
        type: "button",
        className: "dsh-st-chip-btn",
        onMouseDown: (event) => event.stopPropagation(),
        onClick: () => menu.setOpen((value) => !value),
        children: [
          label,
          ghost === true && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("em", {})
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      MenuPopup,
      {
        open: menu.open,
        anchor: menu.root,
        menuRef: menu.menu,
        up,
        className: `dsh-st-select-menu is-composer${up === true ? " is-up" : ""}`,
        onClick: () => {
          if (persist !== true) menu.setOpen(false);
        },
        children
      }
    )
  ] });
}
function useMenuState() {
  return useMenuOpen();
}

// src/client/create-modal.tsx
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime3 = require("react/jsx-runtime");
var WEEKDAYS = [1, 2, 3, 4, 5, 6, 7];
var KINDS = ["once", "interval", "hourly", "daily", "weekly", "monthly", "custom"];
var HOURS = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, "0"));
var MINUTES = Array.from({ length: 60 }, (_, index) => String(index).padStart(2, "0"));
function CreateModal({
  t,
  permissionT,
  modelT,
  busy,
  workspaces,
  models,
  modelFailures,
  defaultModel,
  skills,
  permissions,
  defaultPermission,
  draft,
  editing,
  onClose,
  onSubmit
}) {
  const [form, setForm] = (0, import_react2.useState)(() => ({ ...defaultFormState(/* @__PURE__ */ new Date(), workspaces, defaultModel, defaultPermission), ...draft }));
  const [validationError, setValidationError] = (0, import_react2.useState)();
  const [confirmingPermission, setConfirmingPermission] = (0, import_react2.useState)();
  const [fullAccessAcknowledged, setFullAccessAcknowledged] = (0, import_react2.useState)(false);
  const update = (patch) => {
    setForm((current) => ({ ...current, ...patch }));
    setValidationError(void 0);
  };
  const choosePermission = (permission) => {
    if (shouldConfirmFullAccess(form.permission, permission)) {
      setFullAccessAcknowledged(false);
      setConfirmingPermission(permission);
      return;
    }
    update({ permission });
  };
  const cancelFullAccessConfirmation = () => {
    setFullAccessAcknowledged(false);
    setConfirmingPermission(void 0);
  };
  const confirmFullAccess = () => {
    if (!fullAccessAcknowledged || confirmingPermission === void 0) return;
    update({ permission: confirmingPermission });
    cancelFullAccessConfirmation();
  };
  (0, import_react2.useEffect)(() => {
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      if (document.querySelector(".dsh-st-model-select-menu") !== null) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      onClose();
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
    };
  }, [onClose]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSubmit(form);
    } catch (caught) {
      if (caught instanceof AutomationFormError) {
        setValidationError(t(caught.key));
        return;
      }
      setValidationError(caught instanceof Error ? caught.message : t("error.action"));
    }
  };
  const datePart = form.onceAt.slice(0, 10);
  const timePart = form.onceAt.slice(11, 16) || "09:00";
  const today = localDateValue(/* @__PURE__ */ new Date());
  const minOnceTime = datePart === today ? localTimeValue(/* @__PURE__ */ new Date()) : void 0;
  const [menuHost, setMenuHost] = (0, import_react2.useState)(null);
  const workspace = workspaces.find((item) => item.id === form.workspaceId);
  const promptRef = (0, import_react2.useRef)(null);
  const caretRef = (0, import_react2.useRef)(0);
  const rememberCaret = () => {
    const el = promptRef.current;
    if (el !== null) caretRef.current = el.selectionStart;
  };
  const insertSkill = (skill) => {
    const next = insertSkillGesture(form.prompt, skillGestureToken(skill), caretRef.current);
    update({ prompt: next.text });
    queueMicrotask(() => {
      const el = promptRef.current;
      if (el === null) return;
      el.focus();
      el.setSelectionRange(next.caret, next.caret);
      caretRef.current = next.caret;
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-st-mask", role: "presentation", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(MenuHostProvider, { host: menuHost, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("form", { className: "dsh-st-modal", onClick: (event) => event.stopPropagation(), onSubmit: handleSubmit, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-st-modal-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { children: editing === true ? t("modal.edit") : t("modal.title") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: t("form.subtitle") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dsh-st-modal-close", onClick: onClose, "aria-label": t("form.cancel"), children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(CloseOutlineIcon, { width: 14, height: 14 }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "dsh-st-field", children: [
        t("form.name"),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { value: form.name, placeholder: t("form.namePlaceholder"), onChange: (event) => update({ name: event.target.value }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-st-plan-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-st-field", children: [
          t("form.planTime"),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-st-inline", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              MenuSelect,
              {
                value: form.scheduleKind,
                options: KINDS.map((kind) => ({ value: kind, label: t(`form.${kind}`) })),
                onChange: (value) => update({ scheduleKind: value })
              }
            ),
            form.scheduleKind === "once" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "date", min: today, value: datePart, onChange: (event) => update({ onceAt: clampOnceAt(`${event.target.value}T${timePart}`) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TimeSelect, { value: timePart, ...minOnceTime === void 0 ? {} : { minTime: minOnceTime }, onChange: (value) => update({ onceAt: clampOnceAt(`${datePart}T${value}`) }) })
            ] }),
            form.scheduleKind === "interval" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { className: "is-narrow", type: "number", min: 1, value: form.everyMinutes, onChange: (event) => update({ everyMinutes: event.target.value }) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-suffix", children: t("form.minutesShort") })
            ] }),
            form.scheduleKind === "hourly" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(MenuSelect, { value: form.hourlyMinute, options: MINUTES.map((item) => ({ value: item, label: item })), onChange: (value) => update({ hourlyMinute: value }) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-suffix", children: t("form.minutesShort") })
            ] }),
            (form.scheduleKind === "daily" || form.scheduleKind === "weekly") && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TimeSelect, { value: form.time, onChange: (value) => update({ time: value }) }),
            form.scheduleKind === "monthly" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                MenuSelect,
                {
                  value: form.monthDay,
                  options: Array.from({ length: 31 }, (_, index) => {
                    const day = String(index + 1);
                    return { value: day, label: t("form.monthDay", { day }) };
                  }),
                  onChange: (value) => update({ monthDay: value })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TimeSelect, { value: form.time, onChange: (value) => update({ time: value }) })
            ] }),
            form.scheduleKind === "custom" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { className: "is-narrow", type: "number", min: 1, value: form.customDays, onChange: (event) => update({ customDays: event.target.value }) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-suffix", children: t("form.daysShort") }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TimeSelect, { value: form.time, onChange: (value) => update({ time: value }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "dsh-st-field dsh-st-concurrency", title: t("form.maxConcurrentRunsHint"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("form.maxConcurrentRuns") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("input", { type: "number", min: 1, step: 1, required: true, value: form.maxConcurrentRuns, onChange: (event) => update({ maxConcurrentRuns: event.target.value }) })
        ] })
      ] }),
      form.scheduleKind === "weekly" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-st-weekdays", children: WEEKDAYS.map((day) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "button",
        {
          type: "button",
          className: form.weekdays.includes(day) ? "is-on" : "",
          onClick: () => update({
            weekdays: form.weekdays.includes(day) ? form.weekdays.filter((value) => value !== day) : [...form.weekdays, day]
          }),
          children: t(`day.${day}`)
        },
        day
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-st-field", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: t("form.prompt") }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-st-prompt-card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("textarea", { ref: promptRef, value: form.prompt, placeholder: t("form.promptPlaceholder"), onChange: (event) => {
            rememberCaret();
            update({ prompt: event.target.value });
          }, onSelect: rememberCaret, onClick: rememberCaret, onKeyUp: rememberCaret }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-st-composer", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-st-composer-left", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(MenuPanel, { ghost: true, up: true, label: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FolderIcon, { width: 14, height: 14 }),
                workspace?.title || t("form.workspace")
              ] }), children: [
                workspaces.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-st-select-empty", children: t("form.error.workspace") }),
                workspaces.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  MenuRow,
                  {
                    icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(FolderIcon, { width: 14, height: 14 }),
                    label: item.title,
                    active: item.id === form.workspaceId,
                    onClick: () => update({ workspaceId: item.id })
                  },
                  item.id
                ))
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(MenuPanel, { ghost: true, up: true, label: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SparkleIcon, { width: 14, height: 14 }),
                t("form.skills")
              ] }), children: [
                skills.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-st-select-empty", children: t("form.skillsEmpty") }),
                skills.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  MenuRow,
                  {
                    icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(SparkleIcon, { width: 14, height: 14 }),
                    label: item.name,
                    onClick: () => insertSkill(item)
                  },
                  item.id
                ))
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                MenuSelect,
                {
                  pill: true,
                  up: true,
                  icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ShieldIcon, { width: 14, height: 14 }),
                  value: form.permission,
                  options: permissions.map((option) => ({
                    value: option.value,
                    label: permissionLabel(option, t),
                    icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ShieldIcon, { width: 14, height: 14 })
                  })),
                  onChange: choosePermission
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-st-composer-right", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              ModelPicker,
              {
                modelT,
                models,
                failures: modelFailures,
                modelKey: form.modelKey,
                reasoningEffort: form.reasoningEffort,
                onSelection: (modelKey, reasoningEffort) => update({ modelKey, reasoningEffort })
              }
            ) })
          ] })
        ] })
      ] }),
      validationError !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "dsh-st-error", children: validationError }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-st-modal-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "button", className: "dsh-st-btn", onClick: onClose, disabled: busy, children: t("form.cancel") }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { type: "submit", className: "dsh-st-btn dsh-st-btn--primary", disabled: busy, children: t("modal.save") })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-st-flyout-root", ref: setMenuHost }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      import_dsh_client_ui_primitives.RiskConfirmation,
      {
        open: confirmingPermission !== void 0,
        title: permissionT("confirm.title"),
        description: permissionT("confirm.description"),
        acknowledgeLabel: permissionT("confirm.acknowledge"),
        cancelLabel: permissionT("confirm.cancel"),
        confirmLabel: permissionT("confirm.enable"),
        acknowledged: fullAccessAcknowledged,
        onAcknowledgedChange: setFullAccessAcknowledged,
        onCancel: cancelFullAccessConfirmation,
        onConfirm: confirmFullAccess
      }
    )
  ] }) });
}
function ModelPicker({
  modelT,
  models,
  failures,
  modelKey,
  reasoningEffort,
  onSelection
}) {
  const menu = useMenuState();
  const [pane, setPane] = (0, import_react2.useState)("root");
  const selected = models.find((item) => `${item.provider}::${item.model}` === modelKey);
  const reasoning = selected?.reasoning;
  const effectiveEffort = reasoningEffort === "none" ? reasoning?.defaultEffort : reasoningEffort;
  const effortLabel = reasoning === void 0 ? void 0 : effectiveEffort === void 0 ? modelT("effort.providerDefault") : reasoning.efforts.find((item) => item.id === effectiveEffort)?.name ?? effectiveEffort;
  const trigger = selected?.label ?? modelT("trigger.fallback");
  const modelGroups = Array.from(models.reduce((groups, item) => {
    const group = groups.get(item.provider) ?? { label: item.providerLabel, models: [] };
    group.models.push(item);
    groups.set(item.provider, group);
    return groups;
  }, /* @__PURE__ */ new Map()));
  (0, import_react2.useEffect)(() => {
    if (!menu.open) return;
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      if (pane !== "root") setPane("root");
      else menu.setOpen(false);
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      window.removeEventListener("keydown", onKey, true);
    };
  }, [menu.open, menu.setOpen, pane]);
  const selectModel = (item) => {
    onSelection(
      `${item.provider}::${item.model}`,
      item.reasoning?.defaultEffort ?? "none"
    );
    menu.setOpen(false);
    setPane("root");
  };
  const selectEffort = (effort) => {
    onSelection(modelKey, effort);
    menu.setOpen(false);
    setPane("root");
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: `dsh-st-model-select${menu.open ? " is-open" : ""}`, ref: menu.root, children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "button",
      {
        type: "button",
        className: "dsh-st-model-select-trigger",
        "aria-label": selected === void 0 ? modelT("trigger.selectAria") : effortLabel === void 0 ? modelT("trigger.aria", { model: selected.label }) : modelT("trigger.ariaEffort", { model: selected.label, effort: effortLabel }),
        onMouseDown: (event) => event.stopPropagation(),
        onClick: () => {
          if (menu.open) {
            menu.setOpen(false);
            return;
          }
          setPane("root");
          menu.setOpen(true);
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: trigger }),
          effortLabel !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-model-trigger-effort", children: effortLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconChevronDownOutline14, { className: `dsh-st-model-trigger-chevron${menu.open ? " is-open" : ""}` })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(MenuPopup, { open: menu.open, anchor: menu.root, menuRef: menu.menu, up: true, end: true, className: "dsh-st-model-select-menu is-up is-end", ariaLabel: modelT("menu.aria"), children: [
      pane === "root" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          MenuRow,
          {
            kv: true,
            label: modelT("menu.model"),
            hint: selected?.label ?? modelT("trigger.fallback"),
            chevron: true,
            onClick: () => setPane("model")
          }
        ),
        reasoning !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          MenuRow,
          {
            kv: true,
            label: modelT("menu.effort"),
            hint: effortLabel ?? modelT("effort.providerDefault"),
            chevron: true,
            onClick: () => setPane("effort")
          }
        )
      ] }),
      pane === "model" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        failures.map((failure) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-st-model-warning", children: modelT("warning.groupLoad", { name: failure.providerLabel, message: failure.message }) }, failure.provider)),
        modelGroups.map(([provider, group]) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { role: "group", "aria-label": group.label, className: "dsh-st-model-group", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-st-model-group-title", children: group.label }),
          group.models.map((item) => {
            const value = `${item.provider}::${item.model}`;
            return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "button",
              {
                type: "button",
                role: "menuitemradio",
                "aria-checked": value === modelKey,
                className: "dsh-st-model-option",
                title: item.label,
                onClick: () => selectModel(item),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-model-option-copy", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-model-name", children: item.label }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-model-check", children: value === modelKey && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconCheckOutline16, {}) })
                ]
              },
              value
            );
          })
        ] }, provider)),
        modelGroups.length === 0 && failures.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-st-model-empty", children: modelT("empty.models") })
      ] }),
      pane === "effort" && reasoning !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        reasoning.defaultEffort === void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            type: "button",
            role: "menuitemradio",
            "aria-checked": reasoningEffort === "none",
            className: "dsh-st-model-option",
            onClick: () => selectEffort("none"),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-model-option-copy", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-model-name", children: modelT("effort.providerDefault") }) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-model-check", children: reasoningEffort === "none" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconCheckOutline16, {}) })
            ]
          }
        ),
        reasoning.efforts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "button",
          {
            type: "button",
            role: "menuitemradio",
            "aria-checked": effectiveEffort === item.id,
            className: "dsh-st-model-option",
            onClick: () => selectEffort(item.id),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "dsh-st-model-option-copy", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-model-name", children: item.name }),
                item.description !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-model-description", children: item.description })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-model-check", children: effectiveEffort === item.id && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_dsh_client_ui_primitives.IconCheckOutline16, {}) })
            ]
          },
          item.id
        )),
        reasoning.efforts.length === 0 && reasoning.defaultEffort !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-st-model-empty", children: modelT("empty.efforts") })
      ] })
    ] })
  ] });
}
function TimeSelect({
  value,
  onChange,
  minTime
}) {
  const hour = value.slice(0, 2) || "09";
  const minute = value.slice(3, 5) || "00";
  const minHour = minTime?.slice(0, 2);
  const minMinute = minTime?.slice(3, 5);
  const hours = HOURS.filter((item) => minHour === void 0 || item >= minHour);
  const minutes = MINUTES.filter((item) => minHour === void 0 || hour > minHour || minMinute === void 0 || item >= minMinute);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-st-time", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(MenuSelect, { value: hour, options: hours.map((item) => ({ value: item, label: item })), onChange: (next) => onChange(`${next}:${minute}`) }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-st-time-sep", children: ":" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(MenuSelect, { value: minute, options: minutes.map((item) => ({ value: item, label: item })), onChange: (next) => onChange(`${hour}:${next}`) })
  ] });
}
function localDateValue(now) {
  const offset = now.getTimezoneOffset() * 6e4;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
function localTimeValue(now) {
  const offset = now.getTimezoneOffset() * 6e4;
  return new Date(now.getTime() - offset).toISOString().slice(11, 16);
}
function clampOnceAt(value) {
  const selected = new Date(value);
  const now = /* @__PURE__ */ new Date();
  if (!Number.isFinite(selected.getTime()) || selected.getTime() > now.getTime()) return value;
  const next = new Date(now.getTime() + 6e4);
  next.setSeconds(0, 0);
  const offset = next.getTimezoneOffset() * 6e4;
  return new Date(next.getTime() - offset).toISOString().slice(0, 16);
}

// src/client/delete-confirmation.tsx
var import_react3 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
function DeleteConfirmation({
  target,
  t,
  busy,
  onCancel,
  onConfirm
}) {
  (0, import_react3.useEffect)(() => {
    if (target === void 0 || busy) return;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      onCancel();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [busy, onCancel, target]);
  if (target === void 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "dsh-st-mask", onMouseDown: (event) => event.stopPropagation(), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "section",
    {
      className: "dsh-st-confirm-modal",
      role: "alertdialog",
      "aria-modal": "true",
      "aria-labelledby": "dsh-st-confirm-delete-title",
      "aria-describedby": "dsh-st-confirm-delete-description",
      onMouseDown: (event) => event.stopPropagation(),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { id: "dsh-st-confirm-delete-title", children: t("card.confirmDelete") }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "dsh-st-confirm-target", children: target.name }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { id: "dsh-st-confirm-delete-description", children: t("card.confirmDeleteHint") }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "dsh-st-modal-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "dsh-st-btn", autoFocus: true, disabled: busy, onClick: onCancel, children: t("card.cancel") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "dsh-st-btn dsh-st-btn--danger", disabled: busy, onClick: onConfirm, children: t("card.confirm") })
        ] })
      ]
    }
  ) });
}

// src/client/dropdown-menu.tsx
var import_react4 = require("react");
var import_react_dom2 = require("react-dom");
var import_jsx_runtime5 = require("react/jsx-runtime");
function DropdownMenu({
  ariaLabel,
  className,
  buttonClassName,
  menuClassName,
  options,
  trigger
}) {
  const [open, setOpen] = (0, import_react4.useState)(false);
  const root = (0, import_react4.useRef)(null);
  const menuRef = (0, import_react4.useRef)(null);
  const [menuStyle, setMenuStyle] = (0, import_react4.useState)({});
  const selectedLabel = options.find((option) => option.selected)?.label ?? options[0]?.label ?? ariaLabel;
  (0, import_react4.useEffect)(() => {
    if (!open) return;
    const close = (event) => {
      if (root.current !== null && root.current.contains(event.target)) return;
      if (menuRef.current?.contains(event.target) === true) return;
      setOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  (0, import_react4.useLayoutEffect)(() => {
    if (!open) return;
    const update = () => {
      const button = root.current?.querySelector(".dsh-st-dropdown-btn");
      const rect = button?.getBoundingClientRect();
      if (rect === void 0) return;
      const height = menuRef.current?.offsetHeight ?? 220;
      const margin = 8;
      let top = rect.bottom + 6;
      if (top + height > window.innerHeight - margin) top = Math.max(margin, rect.top - height - 6);
      const right = Math.max(margin, window.innerWidth - rect.right);
      setMenuStyle((current) => current.top === top && current.right === right ? current : { position: "fixed", top, right });
    };
    const onScroll = (event) => {
      if (event.target instanceof Node && menuRef.current?.contains(event.target)) return;
      update();
    };
    update();
    window.addEventListener("resize", update);
    document.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("resize", update);
      document.removeEventListener("scroll", onScroll, true);
    };
  }, [open, selectedLabel]);
  const menu = open && typeof document !== "undefined" ? (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { ref: menuRef, className: `dsh-st-dropdown-menu is-float${menuClassName === void 0 ? "" : ` ${menuClassName}`}`, style: menuStyle, children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      DropdownRow,
      {
        label: option.label,
        selected: option.selected,
        trailing: option.trailing,
        onSelect: () => {
          if (option.keepOpen !== true) setOpen(false);
          option.onSelect();
        }
      },
      option.key
    )) }),
    document.body
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `dsh-st-dropdown${className === void 0 ? "" : ` ${className}`}`, ref: root, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: `dsh-st-dropdown-btn${buttonClassName === void 0 ? "" : ` ${buttonClassName}`}${open ? " is-open" : ""}`, "aria-label": ariaLabel, "aria-expanded": open, onClick: () => setOpen((value) => !value), children: trigger ?? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-st-dropdown-label", children: selectedLabel }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ChevronIcon, { width: 10, height: 10, className: "dsh-st-dropdown-chevron" })
    ] }) }),
    menu
  ] });
}
function DropdownRow({
  label,
  selected,
  trailing,
  onSelect
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "div",
    {
      className: `dsh-st-dropdown-row${selected ? " is-selected" : ""}${trailing === void 0 ? "" : " has-trailing"}`,
      role: "menuitemradio",
      "aria-checked": selected,
      tabIndex: 0,
      onClick: onSelect,
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-st-dropdown-label-cell", children: label }),
        trailing !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            type: "button",
            className: `dsh-st-dropdown-default${trailing.active ? " is-on" : ""}`,
            disabled: trailing.active,
            onClick: (event) => {
              event.stopPropagation();
              trailing.onSelect();
            },
            children: trailing.label
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-st-dropdown-spacer" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-st-dropdown-check", children: selected ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CheckOutlineIcon, { width: 16, height: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-st-sort-tick" }) })
      ]
    }
  );
}

// src/client/prefill.ts
var pending = null;
var listeners = /* @__PURE__ */ new Set();
function setChatPrefill(text) {
  pending = text;
  for (const listener of [...listeners]) listener(pending);
}
function takeChatPrefill() {
  const value = pending;
  pending = null;
  return value;
}
function peekChatPrefill() {
  return pending;
}
function subscribeChatPrefill(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function applyPrefillToDom(text) {
  const seat = document.querySelector("[data-composer-seat] textarea");
  if (!(seat instanceof HTMLTextAreaElement)) return false;
  const descriptor = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value");
  descriptor?.set?.call(seat, text);
  seat.dispatchEvent(new InputEvent("input", { bubbles: true }));
  seat.focus();
  return true;
}

// src/client/protocol.ts
function unwrapRpcResult(value) {
  if (typeof value !== "object" || value === null || !("ok" in value)) {
    throw new Error("\u81EA\u52A8\u5316\u4E3B\u673A\u8FD4\u56DE\u4E86\u65E0\u6548\u54CD\u5E94\u3002");
  }
  const result = value;
  if (result.ok === true && "value" in result) return result.value;
  if (result.ok === false && "error" in result) {
    const error = result.error;
    throw new Error(error?.message ?? "\u81EA\u52A8\u5316\u8BF7\u6C42\u5931\u8D25\u3002");
  }
  throw new Error("\u81EA\u52A8\u5316\u4E3B\u673A\u8FD4\u56DE\u4E86\u65E0\u6548\u54CD\u5E94\u3002");
}

// src/client/runtime.ts
var CHANNEL = "/dsh-automation";
var IDLE_POLL_INTERVAL_MS = 15e3;
var ACTIVE_POLL_INTERVAL_MS = 2e3;
var HOST_SESSION_RETRY_REFRESH_GAPS = [1, 2, 4];
var HOST_SESSION_MAX_ATTEMPTS = HOST_SESSION_RETRY_REFRESH_GAPS.length + 1;
var HOST_SESSION_REARM_INTERVAL_MS = 5 * 60 * 1e3;
var RECENT_TERMINAL_RUN_WINDOW_MS = 24 * 60 * 60 * 1e3;
function snapshotPollIntervalMs(runs) {
  return (runs ?? []).some((run) => run.status === "running" || run.status === "queued") ? ACTIVE_POLL_INTERVAL_MS : IDLE_POLL_INTERVAL_MS;
}
function effectiveSnapshotPollIntervalMs(runs, foregroundSubscribers) {
  return foregroundSubscribers > 0 ? snapshotPollIntervalMs(runs) : IDLE_POLL_INTERVAL_MS;
}
function isTransportError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return /failed to fetch|networkerror|load failed|network request failed/i.test(message);
}
function sessionIdsNeedingHostSync(runs, serverNow) {
  const parsedNow = Date.parse(serverNow);
  const referenceTime = Number.isFinite(parsedNow) ? parsedNow : Date.now();
  const cutoff = referenceTime - RECENT_TERMINAL_RUN_WINDOW_MS;
  return [...new Set(runs.filter((run) => {
    if (run.status === "queued" || run.status === "running") return true;
    const timestamp = Date.parse(run.finishedAt ?? run.startedAt ?? run.scheduledFor);
    return Number.isFinite(timestamp) && timestamp >= cutoff;
  }).map((run) => run.sessionId).filter((sessionId) => sessionId !== void 0 && sessionId !== ""))].sort();
}
function installAutomationSessionSync(runtime, getSessions, options = {}) {
  let stopped = false;
  let completedRefreshes = 0;
  let automationRefreshInProgress = runtime.source.getSnapshot().phase === "loading";
  let trackedSessions;
  let trackedMissingKey;
  let attempts = 0;
  let nextAttemptRefresh = 0;
  let nextRearmAt = 0;
  let warnedMissingKey;
  let hostRefreshPromise;
  let reconcileAfterRefresh = false;
  const resetAttempts = (missingKey) => {
    trackedMissingKey = missingKey;
    attempts = 0;
    nextAttemptRefresh = completedRefreshes;
    nextRearmAt = 0;
    warnedMissingKey = void 0;
  };
  const missingSessionKey = (sessions) => {
    const snapshot = runtime.source.getSnapshot().snapshot;
    const hostSnapshot = sessions?.list?.getSnapshot();
    if (snapshot === void 0 || hostSnapshot === void 0 || sessions?.refresh === void 0) return void 0;
    const present = /* @__PURE__ */ new Set([
      ...hostSnapshot.ids ?? [],
      ...Object.keys(hostSnapshot.byId ?? {})
    ]);
    return sessionIdsNeedingHostSync(snapshot.runs, snapshot.serverNow).filter((sessionId) => !present.has(sessionId)).join("\0");
  };
  const reconcile = () => {
    if (stopped) return;
    const sessions = getSessions();
    if (sessions !== trackedSessions) {
      trackedSessions = sessions;
      resetAttempts();
    }
    const missingKey = missingSessionKey(sessions);
    if (missingKey === void 0) return;
    if (missingKey === "") {
      resetAttempts();
      return;
    }
    if (missingKey !== trackedMissingKey) resetAttempts(missingKey);
    if (attempts >= HOST_SESSION_MAX_ATTEMPTS) {
      if ((options.now ?? Date.now)() < nextRearmAt) return;
      resetAttempts(missingKey);
    }
    if (completedRefreshes < nextAttemptRefresh) return;
    if (hostRefreshPromise !== void 0) {
      reconcileAfterRefresh = true;
      return;
    }
    const attemptIndex = attempts;
    attempts += 1;
    const retryGap = HOST_SESSION_RETRY_REFRESH_GAPS[attemptIndex];
    nextAttemptRefresh = retryGap === void 0 ? Number.POSITIVE_INFINITY : completedRefreshes + retryGap;
    if (attempts >= HOST_SESSION_MAX_ATTEMPTS) {
      nextRearmAt = (options.now ?? Date.now)() + HOST_SESSION_REARM_INTERVAL_MS;
    }
    hostRefreshPromise = Promise.resolve().then(async () => {
      await sessions.refresh();
    }).catch((error) => {
      if (!stopped && warnedMissingKey !== missingKey) {
        warnedMissingKey = missingKey;
        console.warn("[dsh-automation] \u5237\u65B0 Host \u4F1A\u8BDD\u5217\u8868\u5931\u8D25", error);
      }
    }).finally(() => {
      hostRefreshPromise = void 0;
      if (stopped || !reconcileAfterRefresh) return;
      reconcileAfterRefresh = false;
      reconcile();
    });
  };
  const unsubscribe = runtime.source.subscribe(() => {
    const phase = runtime.source.getSnapshot().phase;
    if (phase === "loading") {
      automationRefreshInProgress = true;
    } else if (automationRefreshInProgress) {
      automationRefreshInProgress = false;
      completedRefreshes += 1;
    }
    reconcile();
  }, { background: true });
  reconcile();
  return () => {
    stopped = true;
    reconcileAfterRefresh = false;
    unsubscribe();
  };
}
function createAutomationRuntime(rpc) {
  let state = { phase: "idle" };
  let refreshPromise;
  let pollTimer;
  let removePageResumeListeners = () => void 0;
  const listeners2 = /* @__PURE__ */ new Set();
  const foregroundListeners = /* @__PURE__ */ new Set();
  const armPoll = () => {
    if (pollTimer !== void 0) clearInterval(pollTimer);
    if (listeners2.size === 0) {
      pollTimer = void 0;
      return;
    }
    pollTimer = setInterval(
      () => {
        void refresh().catch(() => void 0);
      },
      effectiveSnapshotPollIntervalMs(state.snapshot?.runs, foregroundListeners.size)
    );
  };
  const armPageResumeListeners = () => {
    removePageResumeListeners();
    if (foregroundListeners.size === 0) return;
    const refreshOnResume = () => {
      void refresh().catch(() => void 0);
    };
    const refreshOnVisible = () => {
      if (document.visibilityState === "visible") refreshOnResume();
    };
    if (typeof window !== "undefined") window.addEventListener("focus", refreshOnResume);
    if (typeof document !== "undefined") document.addEventListener("visibilitychange", refreshOnVisible);
    removePageResumeListeners = () => {
      if (typeof window !== "undefined") window.removeEventListener("focus", refreshOnResume);
      if (typeof document !== "undefined") document.removeEventListener("visibilitychange", refreshOnVisible);
      removePageResumeListeners = () => void 0;
    };
  };
  const publish = (next) => {
    const previousInterval = effectiveSnapshotPollIntervalMs(state.snapshot?.runs, foregroundListeners.size);
    state = next;
    if (listeners2.size > 0 && previousInterval !== effectiveSnapshotPollIntervalMs(state.snapshot?.runs, foregroundListeners.size)) armPoll();
    for (const listener of [...listeners2]) listener();
  };
  const source = {
    getSnapshot: () => state,
    subscribe: (listener, options = {}) => {
      const hadListeners = listeners2.size > 0;
      const hadForegroundListeners = foregroundListeners.size > 0;
      listeners2.add(listener);
      if (options.background !== true) foregroundListeners.add(listener);
      if (!hadListeners || options.background !== true && !hadForegroundListeners) {
        queueMicrotask(() => {
          if (listeners2.size > 0) void refresh().catch(() => void 0);
        });
      }
      armPoll();
      if (foregroundListeners.size > 0 && !hadForegroundListeners) armPageResumeListeners();
      return () => {
        listeners2.delete(listener);
        foregroundListeners.delete(listener);
        if (listeners2.size === 0 && pollTimer !== void 0) {
          clearInterval(pollTimer);
          pollTimer = void 0;
        } else if (listeners2.size > 0) {
          armPoll();
        }
        if (foregroundListeners.size === 0) removePageResumeListeners();
      };
    }
  };
  const refresh = async () => {
    if (refreshPromise !== void 0) return refreshPromise;
    const previous = state.snapshot;
    publish(previous === void 0 ? { phase: "loading" } : {
      phase: "loading",
      snapshot: previous,
      ...state.refreshedAt === void 0 ? {} : { refreshedAt: state.refreshedAt }
    });
    refreshPromise = (async () => {
      try {
        const response = await rpc.call(CHANNEL, "snapshot", { sessionId: "settings" });
        const snapshot = unwrapRpcResult(response);
        publish({ phase: "ready", snapshot, refreshedAt: Date.now() });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        publish(previous === void 0 ? { phase: "error", error: message } : {
          phase: "error",
          snapshot: previous,
          error: message,
          ...state.refreshedAt === void 0 ? {} : { refreshedAt: state.refreshedAt }
        });
        throw error;
      } finally {
        refreshPromise = void 0;
      }
    })();
    return refreshPromise;
  };
  const callRpc = async (endpoint, payload) => {
    try {
      return await rpc.call(CHANNEL, endpoint, payload);
    } catch (error) {
      if (!isTransportError(error)) throw error;
      return await rpc.call(CHANNEL, endpoint, payload);
    }
  };
  const mutateThenRefresh = async (endpoint, payload, patch) => {
    unwrapRpcResult(await callRpc(endpoint, payload));
    const applyPatch = () => {
      if (patch !== void 0 && state.snapshot !== void 0) {
        publish({ phase: "ready", snapshot: patch(state.snapshot), refreshedAt: Date.now() });
      }
    };
    const pendingBeforeRefresh = refreshPromise;
    applyPatch();
    if (pendingBeforeRefresh !== void 0) {
      await pendingBeforeRefresh.catch(() => void 0);
      applyPatch();
    }
    try {
      await refresh();
    } catch {
    }
  };
  return {
    source,
    refresh,
    async createAutomation(input) {
      const payload = { sessionId: "settings", input };
      await mutateThenRefresh("create", payload);
    },
    async mutateAutomation(automationId, mutation) {
      const payload = { sessionId: "settings", automationId, mutation };
      await mutateThenRefresh("mutate", payload, mutation === "delete" ? (snapshot) => ({
        ...snapshot,
        automations: snapshot.automations.filter((item) => item.id !== automationId)
      }) : (snapshot) => ({
        ...snapshot,
        automations: snapshot.automations.map((item) => item.id === automationId ? { ...item, status: mutation === "pause" ? "paused" : "active" } : item)
      }));
    },
    async updateAutomation(automationId, input) {
      const payload = { sessionId: "settings", automationId, input };
      await mutateThenRefresh("update", payload);
    },
    async runNow(automationId) {
      const payload = { sessionId: "settings", automationId };
      await mutateThenRefresh("run-now", payload);
    },
    async markRunRead(runId) {
      const payload = { sessionId: "settings", runId };
      await mutateThenRefresh("mark-read", payload);
    },
    async adoptSession(sessionId) {
      unwrapRpcResult(await rpc.call(CHANNEL, "adopt-session", { sessionId }));
    },
    async forgetSession(sessionId) {
      await mutateThenRefresh("forget-session", { sessionId }, (snapshot) => ({
        ...snapshot,
        runs: snapshot.runs.map((run) => {
          if (run.sessionId !== sessionId) return run;
          const { sessionId: _ignored, ...rest } = run;
          return rest;
        })
      }));
    },
    async forgetAutomationSessions(automationId) {
      await mutateThenRefresh("forget-automation-sessions", { automationId }, (snapshot) => ({
        ...snapshot,
        runs: snapshot.runs.map((run) => {
          if (run.automationId !== automationId) return run;
          const { sessionId: _ignored, ...rest } = run;
          return rest;
        })
      }));
    }
  };
}

// src/client/sort-menu.tsx
var import_react5 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var SORT_OPTIONS = [
  ["created", "desc"],
  ["created", "asc"],
  ["planned", "asc"],
  ["planned", "desc"]
];
function SortMenu({
  t,
  storage,
  storageKey,
  sortKey,
  sortDirection,
  onSelect,
  compact = false,
  iconOnly = false,
  className
}) {
  const [saved, setSaved] = (0, import_react5.useState)(() => readSortDefault(storage, storageKey));
  const options = SORT_OPTIONS.map(([key, direction]) => {
    const selected = sortKey === key && sortDirection === direction;
    const isDefault = saved?.key === key && saved.direction === direction;
    return {
      key: `${key}-${direction}`,
      label: t(key === "planned" ? `sort.planned.${direction}` : `sort.created.${direction}`),
      selected,
      keepOpen: true,
      onSelect: () => onSelect(key, direction),
      ...selected && storage !== void 0 ? {
        trailing: {
          label: t("sort.default.saved"),
          active: isDefault,
          onSelect: () => {
            writeSortDefault(storage, storageKey, key, direction);
            setSaved({ key, direction });
          }
        }
      } : {}
    };
  });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    DropdownMenu,
    {
      ariaLabel: t("sort.by"),
      ...compact || className !== void 0 ? { className: [compact ? "dsh-st-dropdown-compact" : "", className ?? ""].filter(Boolean).join(" ") } : {},
      ...iconOnly ? { buttonClassName: "dsh-st-n-head-btn", trigger: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SlidersIcon, { width: 16, height: 16 }) } : {},
      menuClassName: compact ? "dsh-st-dropdown-sort dsh-st-dropdown-compact" : "dsh-st-dropdown-sort",
      options
    }
  );
}

// src/client/task-settings-request.ts
var AUTOMATION_TASK_SETTINGS_EVENT = "dsh-automation:open-task-settings";
var AUTOMATION_TASK_SETTINGS_STORAGE_KEY = "dsh-automation:pending-task-settings";
function parseAutomationTaskSettingsRequest(value) {
  if (typeof value !== "object" || value === null) return void 0;
  const record = value;
  if (typeof record.name !== "string" || record.name.trim() === "" || !Array.isArray(record.sessionIds) || record.sessionIds.some((id) => typeof id !== "string")) return void 0;
  if (record.automationId !== void 0 && (typeof record.automationId !== "string" || record.automationId.trim() === "")) return void 0;
  return {
    ...typeof record.automationId === "string" ? { automationId: record.automationId } : {},
    name: record.name,
    sessionIds: [...record.sessionIds]
  };
}
function writeAutomationTaskSettingsRequest(storage, request) {
  try {
    storage?.setItem(AUTOMATION_TASK_SETTINGS_STORAGE_KEY, JSON.stringify(request));
  } catch {
  }
}
function requestAutomationTaskSettings(request) {
  if (typeof window === "undefined") return;
  writeAutomationTaskSettingsRequest(window.sessionStorage, request);
  window.dispatchEvent(new CustomEvent(AUTOMATION_TASK_SETTINGS_EVENT, { detail: request }));
}
function readAutomationTaskSettingsRequest(storage) {
  if (storage === void 0) return void 0;
  try {
    const raw = storage.getItem(AUTOMATION_TASK_SETTINGS_STORAGE_KEY);
    return raw === null ? void 0 : parseAutomationTaskSettingsRequest(JSON.parse(raw));
  } catch {
    return void 0;
  }
}
function clearAutomationTaskSettingsRequest(storage) {
  try {
    storage?.removeItem(AUTOMATION_TASK_SETTINGS_STORAGE_KEY);
  } catch {
  }
}
function resolveAutomationTaskSettings(request, automations, runs) {
  if (request.automationId !== void 0) {
    const exact = automations.find((item) => item.id === request.automationId);
    if (exact !== void 0) return exact;
  }
  const sessionIds = new Set(request.sessionIds);
  const automationId = runs.find((run) => run.sessionId !== void 0 && sessionIds.has(run.sessionId))?.automationId;
  const mapped = automations.find((item) => item.id === automationId);
  if (mapped !== void 0) return mapped;
  const named = automations.filter((item) => item.name === request.name);
  return named.length === 1 ? named[0] : void 0;
}

// src/client/AutomationView.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var SORT_STORAGE = typeof window === "undefined" ? void 0 : window.localStorage;
var TASK_SETTINGS_STORAGE = typeof window === "undefined" ? void 0 : window.sessionStorage;
var EXAMPLES = [
  { name: "\u6BCF\u65E5\u56DE\u5F52\u68C0\u67E5", scheduleKind: "daily", time: "09:00", weekdays: [1, 2, 3, 4, 5] },
  { name: "\u6BCF\u5468\u4F9D\u8D56\u5DE1\u68C0", scheduleKind: "weekly", time: "10:00", weekdays: [1] },
  { name: "\u5DE5\u4F5C\u65E5\u65E9\u62A5", scheduleKind: "weekly", time: "08:00", weekdays: [1, 2, 3, 4, 5] }
];
function AutomationView({ t, permissionT, modelT, runtime, closeSettings }) {
  const state = (0, import_react6.useSyncExternalStore)(runtime.source.subscribe, runtime.source.getSnapshot, runtime.source.getSnapshot);
  const [tab, setTab] = (0, import_react6.useState)("mine");
  const [query, setQuery] = (0, import_react6.useState)("");
  const [creating, setCreating] = (0, import_react6.useState)(false);
  const [editingId, setEditingId] = (0, import_react6.useState)();
  const [deleteTarget, setDeleteTarget] = (0, import_react6.useState)();
  const [draft, setDraft] = (0, import_react6.useState)();
  const [busy, setBusy] = (0, import_react6.useState)(false);
  const [error, setError] = (0, import_react6.useState)();
  const [historyRange, setHistoryRange] = (0, import_react6.useState)("day");
  const [historyTask, setHistoryTask] = (0, import_react6.useState)("all");
  const [historyStatus, setHistoryStatus] = (0, import_react6.useState)("all");
  const [sortKey, setSortKey] = (0, import_react6.useState)(() => readSortDefault(SORT_STORAGE, SETTINGS_SORT_DEFAULT_KEY)?.key ?? "created");
  const [sortDirection, setSortDirection] = (0, import_react6.useState)(() => readSortDefault(SORT_STORAGE, SETTINGS_SORT_DEFAULT_KEY)?.direction ?? "desc");
  const [taskSettingsRequest, setTaskSettingsRequest] = (0, import_react6.useState)(() => readAutomationTaskSettingsRequest(TASK_SETTINGS_STORAGE));
  const now = (0, import_react6.useMemo)(() => new Date(state.snapshot?.serverNow ?? Date.now()), [state.snapshot?.serverNow, state.refreshedAt]);
  const snapshot = state.snapshot;
  const workspaces = snapshot?.workspaces ?? [];
  const models = snapshot?.models ?? [];
  const permissions = snapshot?.permissions ?? [];
  const defaultPermission = snapshot?.defaultPermission ?? "";
  const automations = sortAutomations(
    (snapshot?.automations ?? []).filter((item) => query.trim() === "" || `${item.name} ${item.prompt}`.toLowerCase().includes(query.trim().toLowerCase())),
    sortKey,
    sortDirection
  );
  const runs = (snapshot?.runs ?? []).filter((run) => {
    if (historyTask !== "all" && run.automationId !== historyTask) return false;
    if (historyStatus !== "all" && run.status !== historyStatus) return false;
    return true;
  });
  const groups = groupHistory(runs, historyRange, now, t);
  const runAction = async (action) => {
    setBusy(true);
    setError(void 0);
    try {
      await action();
    } catch (caught) {
      setError(caught instanceof AutomationFormError ? t(caught.key) : isTransportError(caught) ? t("error.offline") : caught instanceof Error ? caught.message : t("error.action"));
    } finally {
      setBusy(false);
    }
  };
  const closeModal = () => {
    setCreating(false);
    setDraft(void 0);
    setEditingId(void 0);
  };
  const openCreate = (partial) => {
    if (defaultPermission === "" || permissions.length === 0) return;
    setEditingId(void 0);
    setDraft(partial);
    setCreating(true);
  };
  const openEdit = (item) => {
    setEditingId(item.id);
    setDraft(formFromAutomation(item, workspaces, snapshot?.defaultModel ?? null, snapshot?.defaultPermission ?? item.permission));
    setCreating(true);
  };
  (0, import_react6.useEffect)(() => {
    if (typeof window === "undefined") return;
    const onTaskSettings = (event) => {
      const request = parseAutomationTaskSettingsRequest(event.detail);
      if (request !== void 0) setTaskSettingsRequest(request);
    };
    window.addEventListener(AUTOMATION_TASK_SETTINGS_EVENT, onTaskSettings);
    return () => {
      window.removeEventListener(AUTOMATION_TASK_SETTINGS_EVENT, onTaskSettings);
    };
  }, []);
  (0, import_react6.useEffect)(() => {
    if (taskSettingsRequest === void 0 || snapshot === void 0) return;
    const item = resolveAutomationTaskSettings(taskSettingsRequest, snapshot.automations, snapshot.runs);
    clearAutomationTaskSettingsRequest(TASK_SETTINGS_STORAGE);
    setTaskSettingsRequest(void 0);
    setTab("mine");
    setQuery("");
    if (item === void 0) {
      setError(t("error.taskMissing"));
      return;
    }
    openEdit(item);
  }, [snapshot, taskSettingsRequest, t]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-shell", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("header", { className: "dsh-st-top", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-heading", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-heading-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h1", { children: t("tab") }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-heading-links", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("a", { className: "dsh-st-heading-link", href: "https://github.com/MichengAI/dsh-automation", target: "_blank", rel: "noreferrer", "aria-label": t("header.githubProject"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(GithubIcon, {}),
              t("header.githubProject")
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("a", { className: "dsh-st-heading-link", href: "https://github.com/MichengAI/dsh-automation/issues", target: "_blank", rel: "noreferrer", "aria-label": t("header.githubFeedback"), children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(import_dsh_client_ui_primitives2.IconListPenOutline16, {}),
              t("header.githubFeedback")
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: t("header.lead") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-toolbar", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("input", { className: "dsh-st-search", value: query, placeholder: t("search.placeholder"), onChange: (event) => setQuery(event.target.value) }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", { type: "button", className: "dsh-st-btn", onClick: () => {
          setChatPrefill(t("chat.prompt"));
          closeSettings?.();
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChatIcon, {}),
          t("action.chatCreate")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", { type: "button", className: "dsh-st-btn dsh-st-btn--primary", disabled: defaultPermission === "" || permissions.length === 0, onClick: () => openCreate(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(PlusIcon, {}),
          t("action.create")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: "dsh-st-icon", onClick: () => {
          void runtime.refresh();
        }, "aria-label": t("section.refresh"), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(RefreshIcon, {}) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dsh-st-banner", role: "note", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(InfoIcon, {}),
      t("banner.wake")
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { className: "dsh-st-examples", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dsh-st-examples-head", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h2", { children: t("examples.title") }) }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dsh-st-example-row", children: EXAMPLES.map((example, index) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
        "button",
        {
          type: "button",
          className: "dsh-st-example",
          disabled: defaultPermission === "" || permissions.length === 0,
          onClick: () => openCreate({
            name: t(`examples.${index + 1}.title`),
            prompt: t(`examples.${index + 1}.body`),
            scheduleKind: example.scheduleKind,
            time: example.time,
            weekdays: example.weekdays
          }),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("strong", { children: t(`examples.${index + 1}.title`) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: t(`examples.${index + 1}.body`) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "dsh-st-chip", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ClockIcon, {}),
              t(`examples.${index + 1}.chip`)
            ] })
          ]
        },
        example.name
      )) })
    ] }),
    error !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "dsh-st-error", children: error }),
    (state.phase === "idle" || state.phase === "loading" && snapshot === void 0) && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "dsh-st-muted", children: t("loading") }),
    state.phase === "error" && snapshot === void 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { children: t("error.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: state.error }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: "dsh-st-btn dsh-st-btn--primary", onClick: () => {
        void runtime.refresh();
      }, children: t("error.retry") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-tabs", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: tab === "mine" ? "is-on" : "", onClick: () => setTab("mine"), children: t("tabs.mine") }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: tab === "runs" ? "is-on" : "", onClick: () => setTab("runs"), children: t("tabs.runs") }),
      tab === "mine" && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dsh-st-sort-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
        SortMenu,
        {
          t,
          ...SORT_STORAGE === void 0 ? {} : { storage: SORT_STORAGE },
          storageKey: SETTINGS_SORT_DEFAULT_KEY,
          sortKey,
          sortDirection,
          onSelect: (key, direction) => {
            setSortKey(key);
            setSortDirection(direction);
          }
        }
      ) }),
      tab === "runs" && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-filters", children: [
        ["day", "week", "month"].map((range) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: historyRange === range ? "is-on" : "", onClick: () => setHistoryRange(range), children: t(`history.range.${range}`) }, range)),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          DropdownMenu,
          {
            ariaLabel: t("history.allTasks"),
            options: [
              { key: "all", label: t("history.allTasks"), selected: historyTask === "all", onSelect: () => setHistoryTask("all") },
              ...(snapshot?.automations ?? []).map((item) => ({
                key: item.id,
                label: item.name,
                selected: historyTask === item.id,
                onSelect: () => setHistoryTask(item.id)
              }))
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          DropdownMenu,
          {
            ariaLabel: t("history.allStatus"),
            options: [
              { key: "all", label: t("history.allStatus"), selected: historyStatus === "all", onSelect: () => setHistoryStatus("all") },
              ...HISTORY_STATUS_OPTIONS.map((status) => ({
                key: status,
                label: t(`status.${status}`),
                selected: historyStatus === status,
                onSelect: () => setHistoryStatus(status)
              }))
            ]
          }
        )
      ] })
    ] }),
    tab === "mine" && (automations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { children: t("empty.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: t("empty.body") })
    ] }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dsh-st-grid", children: automations.map((item) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      TaskCard,
      {
        item,
        t,
        now,
        busy,
        onEdit: () => openEdit(item),
        onToggle: () => {
          void runAction(() => runtime.mutateAutomation(item.id, automationToggleMutation(item.status)));
        },
        onRun: () => {
          void runAction(() => runtime.runNow(item.id));
        },
        onDelete: () => setDeleteTarget(item)
      },
      item.id
    )) })),
    tab === "runs" && (groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dsh-st-empty", children: t("runs.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "dsh-st-timeline", children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("section", { className: "dsh-st-group", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { children: group.label }),
      group.items.map((run) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(RunRow, { run, t }, run.id))
    ] }, group.key)) })),
    creating && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      CreateModal,
      {
        t,
        permissionT,
        modelT,
        busy,
        workspaces,
        models,
        modelFailures: snapshot?.modelFailures ?? [],
        defaultModel: snapshot?.defaultModel ?? null,
        skills: snapshot?.skills ?? [],
        permissions,
        defaultPermission,
        editing: editingId !== void 0,
        ...draft === void 0 ? {} : { draft },
        onClose: closeModal,
        onSubmit: async (form) => {
          const input = buildCreateInput(form, workspaces, models, /* @__PURE__ */ new Date(), {
            allowPastOnce: editingId !== void 0
          });
          await runAction(async () => {
            if (editingId === void 0) await runtime.createAutomation(input);
            else await runtime.updateAutomation(editingId, input);
            closeModal();
          });
        }
      },
      editingId ?? "create"
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      DeleteConfirmation,
      {
        target: deleteTarget,
        t,
        busy,
        onCancel: () => setDeleteTarget(void 0),
        onConfirm: () => {
          const target = deleteTarget;
          if (target === void 0) return;
          void runAction(async () => {
            await runtime.mutateAutomation(target.id, "delete");
            setDeleteTarget(void 0);
          });
        }
      }
    )
  ] });
}
function TaskCard({
  item,
  t,
  now,
  busy,
  onEdit,
  onToggle,
  onRun,
  onDelete
}) {
  const [menu, setMenu] = (0, import_react6.useState)(false);
  const root = (0, import_react6.useRef)(null);
  (0, import_react6.useEffect)(() => {
    if (!menu) return;
    const close = (event) => {
      if (root.current !== null && !root.current.contains(event.target)) setMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, [menu]);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("article", { className: "dsh-st-card", ref: root, onClick: onEdit, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-card-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: `dsh-st-switch ${item.status === "active" ? "is-on" : ""}`, role: "switch", "aria-checked": item.status === "active", disabled: busy, onClick: (event) => {
        event.stopPropagation();
        onToggle();
      } }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: "dsh-st-more", onClick: (event) => {
        event.stopPropagation();
        setMenu((value) => !value);
      }, "aria-label": t("card.more"), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(MoreIcon, {}) }),
      menu && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-menu", onClick: (event) => event.stopPropagation(), children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", { type: "button", disabled: busy, onClick: () => {
          setMenu(false);
          onRun();
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(PlayIcon, { width: 16, height: 16 }),
          t("menu.run")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", { type: "button", disabled: busy, onClick: () => {
          setMenu(false);
          onEdit();
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(PencilIcon, { width: 16, height: 16 }),
          t("menu.edit")
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", { type: "button", className: "is-danger", disabled: busy, onClick: () => {
          setMenu(false);
          onDelete();
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(TrashIcon, { width: 16, height: 16 }),
          t("menu.delete")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { children: item.name }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { children: item.prompt }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "dsh-st-card-foot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "dsh-st-chip", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ClockIcon, {}),
        formatSchedule(item.schedule, t)
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: item.nextRunAt === void 0 ? t("stats.noneScheduled") : t("history.nextApprox", { when: formatWithin(item.nextRunAt, now, t) }) })
    ] })
  ] });
}
function RunRow({ run, t }) {
  const duration = formatDuration(run.startedAt, run.finishedAt);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("article", { className: `dsh-st-run is-${run.status}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("strong", { children: run.automationName }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: clockTime(run.startedAt ?? run.scheduledFor) }),
      duration !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: duration }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: formatRunTrigger(run.trigger, t) })
    ] })
  ] });
}

// src/client/locales.ts
var NS = "dsh-automation";
var en = {
  tab: "Scheduled tasks",
  "sidebar.tab": "Scheduled",
  "sidebar.tabs": "Workspace views",
  "sidebar.tasksTab": "Tasks",
  "sidebar.channelsTab": "Channels",
  "sidebar.views": "Scheduled views",
  "sidebar.viewOverview": "Task overview",
  "sidebar.empty": "No scheduled runs yet.",
  "sidebar.tasksEmpty": "No web tasks yet.",
  "sidebar.ungrouped": "Ungrouped",
  "sidebar.section": "Scheduled",
  "sidebar.workspaces": "Workspaces",
  "sidebar.search": "Search",
  "sidebar.searchSessions": "Search sessions...",
  "sidebar.clearSearch": "Clear search",
  "sidebar.filter": "Filter",
  "sidebar.groupBy": "Group by",
  "sidebar.groupWorkspace": "By workspace",
  "sidebar.groupList": "Single list",
  "sidebar.sortBy": "Sort by",
  "sidebar.sortManual": "Manual",
  "sidebar.sortTime": "Recently updated",
  "header.lead": "Plan automatic tasks, or trigger them by hand. Describe the recurring work in any chat to create it quickly.",
  "header.githubProject": "GitHub",
  "header.githubFeedback": "Issues",
  "examples.title": "Recommended examples",
  "examples.1.title": "Daily regression check",
  "examples.1.body": "Create a scheduled task that runs every day and inspects new test failures.",
  "examples.1.chip": "Every day 09:00",
  "examples.2.title": "Weekly dependency review",
  "examples.2.body": "Create a scheduled task that runs every Monday and reports outdated or risky dependencies.",
  "examples.2.chip": "Monday 10:00",
  "examples.3.title": "Weekday morning briefing",
  "examples.3.body": "Create a scheduled task that runs on weekdays and summarizes overnight changes.",
  "examples.3.chip": "Weekdays 08:00",
  "chat.hint": "In any conversation, describe the recurring work and ask the Agent to call automation_create.",
  "chat.prompt": "I want to create a scheduled task that runs every [interval] and does [the actual task]",
  "menu.run": "Run task",
  "menu.edit": "Edit task",
  "menu.delete": "Delete task",
  "session.rename": "Rename",
  "session.fork": "Fork session",
  "session.archive": "Archive session",
  "session.moreActions": "More actions for {title}",
  "session.groupActions": "Actions for {name}",
  "session.taskSettings": "Task settings",
  "session.archiveGroup": "Archive all conversations",
  "session.archiveGroupConfirm": "Archive all",
  "session.archiveGroupDescription": "Archive all {count} conversations for \u201C{name}\u201D. You can restore them later in Settings \u2192 Archived.",
  "session.archiveGroupPending": "Archiving conversations\u2026",
  "session.archiveGroupFailed": "Some conversations could not be archived: {message}",
  "session.archiveGroupClose": "Close",
  "session.archiveGroupCancel": "Cancel",
  "session.idle": "Idle",
  "session.runningStatus": "Running",
  "session.delete": "Remove from Scheduled",
  "session.deleteFolder": "Remove folder",
  "session.confirmDeleteFolder": "Remove this folder from Scheduled?",
  "session.confirmDeleteFolderHint": 'This only unlists {count} session(s) in "{name}" from Scheduled. Host sessions are not deleted and they stay hidden from Tasks.',
  "session.confirmDeleteFolderAction": "Remove from Scheduled",
  "history.range.day": "By day",
  "history.range.week": "By week",
  "history.range.month": "By month",
  "history.allTasks": "All tasks",
  "history.allStatus": "All statuses",
  "history.today": "Today",
  "history.yesterday": "Yesterday",
  "history.date": "{date}",
  "history.week": "Week of {date}",
  "history.month": "{month}",
  "history.nextApprox": "Next run in about {when}",
  "time.withinMinute": "about {count} minutes",
  "time.withinHour": "about {count} hours",
  "time.withinDay": "about {count} days",
  "search.placeholder": "Search scheduled tasks...",
  "action.chatCreate": "Create in chat",
  "action.create": "New scheduled task",
  "banner.wake": "Scheduled tasks run only while this computer stays awake.",
  "tabs.mine": "My tasks",
  "tabs.runs": "Run history",
  "sort.by": "Sort",
  "sort.created.asc": "Created time ascending",
  "sort.created.desc": "Created time descending",
  "sort.planned.asc": "Planned time ascending",
  "sort.planned.desc": "Planned time descending",
  "sort.default.saved": "Default",
  "form.workspace": "Workspace",
  "form.workspacePath": "Folder path",
  "form.workspacePathPlaceholder": "D:\\work\\project",
  "form.model": "Model",
  "form.modelSelect": "Select model",
  "form.effort": "Reasoning",
  "form.effort.none": "Default",
  "form.effort.low": "Low",
  "form.effort.medium": "Medium",
  "form.effort.high": "High",
  "form.error.workspace": "Select a workspace.",
  "modal.title": "New scheduled task",
  "modal.edit": "Edit scheduled task",
  "modal.save": "Save",
  "header.eyebrow": "Unattended coding work",
  "header.title": "Automations",
  "header.subtitle": "Schedule standalone, auditable Agent runs for this workspace.",
  "header.create": "New automation",
  "header.closeCreate": "Hide form",
  "scope.workspace": "Workspace",
  "scope.folder": "Working directory",
  "stats.total": "All",
  "stats.active": "Active",
  "stats.next": "Next run",
  "stats.attention": "Needs attention",
  "stats.noneScheduled": "None scheduled",
  "stats.noAttention": "All clear",
  "section.automations": "Workspace automations",
  "section.automationsHint": "Each trigger starts a fresh DSH Session and keeps its own audit record.",
  "section.runs": "Recent runs",
  "section.runsHint": "Latest outcomes for this workspace.",
  "section.refresh": "Refresh",
  "empty.title": "Let recurring coding work run itself",
  "empty.body": "Save a self-contained task, a schedule, and a permission boundary. Every run starts in a new Session.",
  "empty.action": "Create the first automation",
  "runs.empty": "No runs yet. Run one now, or wait for the next scheduled occurrence.",
  "overview.empty": "No scheduled tasks yet. Create one in Settings.",
  "form.title": "Create automation",
  "form.subtitle": "Write a complete, standalone task. Scheduled runs do not inherit this conversation.",
  "form.name": "Name",
  "form.namePlaceholder": "Daily regression triage",
  "form.prompt": "Task prompt",
  "form.promptPlaceholder": "Inspect new test failures, locate the regression, and propose a verified minimal fix\u2026",
  "form.schedule": "Schedule",
  "form.planTime": "Schedule",
  "form.hourly": "Hourly",
  "form.monthly": "Monthly",
  "form.custom": "Custom",
  "form.minutesShort": "min",
  "form.daysShort": "days",
  "form.monthDay": "Day {day} of month",
  "form.skills": "Skills",
  "form.skillsEmpty": "No skills available",
  "schedule.hourlyAt": "Every hour at :{minute}",
  "schedule.monthlyAt": "Monthly on day {day} \xB7 {time}",
  "schedule.customAt": "Every {count} days \xB7 {time}",
  "form.once": "Does not repeat",
  "form.interval": "Interval",
  "form.daily": "Daily",
  "form.weekly": "Weekly",
  "form.runAt": "Run at",
  "form.every": "Every",
  "form.minutes": "minutes",
  "form.time": "Time",
  "form.days": "Weekdays",
  "form.timeZone": "Time zone",
  "form.maxConcurrentRuns": "Concurrency",
  "form.maxConcurrentRunsHint": "Queued and running executions share this limit. Defaults to 1; when full, scheduled triggers are skipped and manual runs are rejected.",
  "form.error.maxConcurrentRuns": "Enter a positive whole number for concurrent runs.",
  "form.permission": "Permission boundary",
  "permission.readOnly": "Read Only",
  "permission.workspaceWrite": "Workspace Write",
  "permission.fullAccess": "Full access",
  "form.cancel": "Cancel",
  "form.submit": "Create automation",
  "form.submitting": "Creating\u2026",
  "form.error.name": "Enter a name.",
  "form.error.prompt": "Enter a complete, standalone task prompt.",
  "form.error.once": "Choose a valid future date and time.",
  "form.error.interval": "The interval must be between 1 and 43,200 minutes.",
  "form.error.weekdays": "Select at least one weekday.",
  "day.1": "Mon",
  "day.2": "Tue",
  "day.3": "Wed",
  "day.4": "Thu",
  "day.5": "Fri",
  "day.6": "Sat",
  "day.7": "Sun",
  "status.active": "Active",
  "status.paused": "Paused",
  "status.queued": "Queued",
  "status.running": "Running",
  "status.succeeded": "Succeeded",
  "status.failed": "Failed",
  "status.skipped": "Skipped",
  "status.cancelled": "Cancelled",
  "status.interrupted": "Interrupted",
  "card.nextRun": "Next",
  "card.lastRun": "Last",
  "card.never": "Not yet run",
  "schedule.onceAt": "Once \xB7 {time}",
  "schedule.everyMinutes": "Every {count} minutes",
  "schedule.dailyAt": "Daily \xB7 {time}",
  "schedule.weeklyAt": "{days} \xB7 {time}",
  "card.pause": "Pause",
  "card.resume": "Resume",
  "card.runNow": "Run now",
  "card.more": "More actions",
  "card.delete": "Delete",
  "card.confirmDelete": "Delete this automation?",
  "card.confirmDeleteHint": "Run history is kept for audit.",
  "card.confirm": "Delete",
  "card.cancel": "Cancel",
  "run.trigger.schedule": "Scheduled",
  "run.trigger.manual": "Manual",
  "run.openSession": "Session {id}",
  "run.markRead": "Mark reviewed",
  loading: "Loading automations\u2026",
  "error.title": "Automations could not be loaded",
  "error.retry": "Try again",
  "error.action": "The action failed. Please try again.",
  "error.taskMissing": "This scheduled task no longer exists.",
  "error.offline": "Could not reach the local automation service. Check that DSH is still running and try again.",
  "time.now": "now",
  "time.minuteAgo": "{count}m ago",
  "time.hourAgo": "{count}h ago",
  "time.dayAgo": "{count}d ago",
  "time.inMinute": "in {count}m",
  "time.inHour": "in {count}h",
  "time.inDay": "in {count}d"
};
var zh = {
  tab: "\u5B9A\u65F6\u4EFB\u52A1",
  "sidebar.tab": "\u5B9A\u65F6",
  "sidebar.tabs": "\u5DE5\u4F5C\u533A\u5206\u7C7B",
  "sidebar.tasksTab": "\u4EFB\u52A1",
  "sidebar.channelsTab": "\u9891\u9053",
  "sidebar.views": "\u5B9A\u65F6\u9875\u89C6\u56FE",
  "sidebar.viewOverview": "\u4EFB\u52A1\u603B\u89C8",
  "sidebar.empty": "\u8FD8\u6CA1\u6709\u5B9A\u65F6\u4EFB\u52A1\u6267\u884C\u8BB0\u5F55\u3002",
  "sidebar.tasksEmpty": "\u6682\u65E0\u7F51\u9875\u4EFB\u52A1",
  "sidebar.ungrouped": "\u672A\u5206\u7EC4",
  "sidebar.section": "\u5B9A\u65F6\u4EFB\u52A1",
  "sidebar.workspaces": "\u5DE5\u4F5C\u533A",
  "sidebar.search": "\u641C\u7D22",
  "sidebar.searchSessions": "\u641C\u7D22\u4F1A\u8BDD...",
  "sidebar.clearSearch": "\u6E05\u9664\u641C\u7D22",
  "sidebar.filter": "\u7B5B\u9009",
  "sidebar.groupBy": "\u5206\u7EC4\u65B9\u5F0F",
  "sidebar.groupWorkspace": "\u6309\u5DE5\u4F5C\u533A",
  "sidebar.groupList": "\u5355\u5217\u8868",
  "sidebar.sortBy": "\u6392\u5E8F\u65B9\u5F0F",
  "sidebar.sortManual": "\u624B\u52A8\u6392\u5E8F",
  "sidebar.sortTime": "\u6700\u8FD1\u66F4\u65B0",
  "header.lead": "\u6309\u8BA1\u5212\u81EA\u52A8\u6267\u884C\u4EFB\u52A1\uFF0C\u4E5F\u53EF\u968F\u65F6\u624B\u52A8\u89E6\u53D1\u3002\u5728\u4EFB\u610F\u5BF9\u8BDD\u4E2D\u63CF\u8FF0\u4F60\u60F3\u5B9A\u671F\u505A\u7684\u4E8B\uFF0C\u5373\u53EF\u5FEB\u901F\u521B\u5EFA",
  "header.githubProject": "GitHub",
  "header.githubFeedback": "\u95EE\u9898\u53CD\u9988",
  "examples.title": "\u63A8\u8350\u6848\u4F8B",
  "examples.1.title": "\u6BCF\u65E5\u56DE\u5F52\u68C0\u67E5",
  "examples.1.body": "\u6211\u8981\u521B\u5EFA\u4E00\u4E2A\u5B9A\u65F6\u4EFB\u52A1\uFF0C\u6BCF\u3010\u5929\u3011\u6267\u884C\u3010\u68C0\u67E5\u65B0\u589E\u6D4B\u8BD5\u5931\u8D25\u5E76\u7ED9\u51FA\u6700\u5C0F\u4FEE\u590D\u3011\u3002",
  "examples.1.chip": "\u6BCF\u5929 09:00",
  "examples.2.title": "\u6BCF\u5468\u4F9D\u8D56\u5DE1\u68C0",
  "examples.2.body": "\u6211\u8981\u521B\u5EFA\u4E00\u4E2A\u5B9A\u65F6\u4EFB\u52A1\uFF0C\u6BCF\u3010\u5468\u4E00\u3011\u6267\u884C\u3010\u68C0\u67E5\u8FC7\u671F\u6216\u6709\u98CE\u9669\u7684\u4F9D\u8D56\u5E76\u7ED9\u51FA\u5904\u7406\u5EFA\u8BAE\u3011\u3002",
  "examples.2.chip": "\u6BCF\u5468\u4E00 10:00",
  "examples.3.title": "\u5DE5\u4F5C\u65E5\u65E9\u62A5",
  "examples.3.body": "\u6211\u8981\u521B\u5EFA\u4E00\u4E2A\u5B9A\u65F6\u4EFB\u52A1\uFF0C\u6BCF\u3010\u5DE5\u4F5C\u65E5\u3011\u6267\u884C\u3010\u6C47\u603B\u6628\u591C\u4ED3\u5E93\u53D8\u66F4\u5E76\u7ED9\u51FA\u4ECA\u65E5\u5173\u6CE8\u70B9\u3011\u3002",
  "examples.3.chip": "\u5DE5\u4F5C\u65E5 08:00",
  "chat.hint": "\u5728\u4EFB\u610F\u5BF9\u8BDD\u4E2D\u63CF\u8FF0\u4F60\u60F3\u5B9A\u671F\u505A\u7684\u4E8B\uFF0C\u5E76\u8BA9 Agent \u8C03\u7528 automation_create\u3002",
  "chat.prompt": "\u6211\u8981\u521B\u5EFA\u4E00\u4E2A\u5B9A\u65F6\u4EFB\u52A1\uFF0C\u6BCF\u3010\u65F6\u95F4\u95F4\u9694\u3011\u6267\u884C\u3010\u5177\u4F53\u4EFB\u52A1\u3011",
  "menu.run": "\u6267\u884C\u4EFB\u52A1",
  "menu.edit": "\u7F16\u8F91\u4EFB\u52A1",
  "menu.delete": "\u5220\u9664\u4EFB\u52A1",
  "session.rename": "\u91CD\u547D\u540D",
  "session.fork": "\u5206\u53C9\u4F1A\u8BDD",
  "session.archive": "\u5F52\u6863\u4F1A\u8BDD",
  "session.moreActions": "\u201C{title}\u201D\u7684\u66F4\u591A\u64CD\u4F5C",
  "session.groupActions": "\u201C{name}\u201D\u7684\u4EFB\u52A1\u64CD\u4F5C",
  "session.taskSettings": "\u4EFB\u52A1\u8BBE\u7F6E",
  "session.archiveGroup": "\u5F52\u6863\u6574\u7EC4\u4F1A\u8BDD",
  "session.archiveGroupConfirm": "\u786E\u8BA4\u5F52\u6863",
  "session.archiveGroupDescription": "\u5C06\u5F52\u6863\u201C{name}\u201D\u4E0B\u7684 {count} \u4E2A\u4F1A\u8BDD\u3002\u5F52\u6863\u540E\u53EF\u4EE5\u5728\u201C\u8BBE\u7F6E \u2192 \u5DF2\u5F52\u6863\u201D\u4E2D\u6062\u590D\u3002",
  "session.archiveGroupPending": "\u6B63\u5728\u5F52\u6863\u6574\u7EC4\u4F1A\u8BDD\u2026",
  "session.archiveGroupFailed": "\u90E8\u5206\u4F1A\u8BDD\u5F52\u6863\u5931\u8D25\uFF1A{message}",
  "session.archiveGroupClose": "\u5173\u95ED",
  "session.archiveGroupCancel": "\u53D6\u6D88",
  "session.idle": "\u7A7A\u95F2",
  "session.runningStatus": "\u8FD0\u884C\u4E2D",
  "session.delete": "\u4ECE\u5B9A\u65F6\u9875\u79FB\u9664",
  "session.deleteFolder": "\u4ECE\u5B9A\u65F6\u9875\u79FB\u9664\u6587\u4EF6\u5939",
  "session.confirmDeleteFolder": "\u4ECE\u5B9A\u65F6\u9875\u79FB\u9664\u8FD9\u4E2A\u6587\u4EF6\u5939\uFF1F",
  "session.confirmDeleteFolderHint": "\u53EA\u4F1A\u628A\u300C{name}\u300D\u4E0B\u7684 {count} \u6761\u4F1A\u8BDD\u4ECE\u5B9A\u65F6\u9875\u6458\u6389\uFF0C\u4E0D\u4F1A\u5220\u9664\u5BBF\u4E3B Session\u3002\u4EFB\u52A1\u9875\u672C\u6765\u4E5F\u4E0D\u5C55\u793A\u8FD9\u4E9B\u81EA\u52A8\u5316\u4F1A\u8BDD\u3002",
  "session.confirmDeleteFolderAction": "\u4ECE\u5B9A\u65F6\u9875\u79FB\u9664",
  "history.range.day": "\u6309\u5929",
  "history.range.week": "\u6309\u5468",
  "history.range.month": "\u6309\u6708",
  "history.allTasks": "\u5168\u90E8\u4EFB\u52A1",
  "history.allStatus": "\u5168\u90E8\u72B6\u6001",
  "history.today": "\u4ECA\u5929",
  "history.yesterday": "\u6628\u5929",
  "history.date": "{date}",
  "history.week": "{date} \u5F53\u5468",
  "history.month": "{month}",
  "history.nextApprox": "\u4E0B\u6B21\u6267\u884C \u5927\u7EA6 {when}",
  "time.withinMinute": "{count} \u5206\u949F\u5185",
  "time.withinHour": "{count} \u5C0F\u65F6\u5185",
  "time.withinDay": "{count} \u5929\u5185",
  "search.placeholder": "\u641C\u7D22\u5B9A\u65F6\u4EFB\u52A1...",
  "action.chatCreate": "\u901A\u8FC7\u5BF9\u8BDD\u521B\u5EFA",
  "action.create": "\u65B0\u5EFA\u5B9A\u65F6\u4EFB\u52A1",
  "banner.wake": "\u5B9A\u65F6\u4EFB\u52A1\u4EC5\u5728\u7535\u8111\u4FDD\u6301\u5524\u9192\u65F6\u8FD0\u884C",
  "tabs.mine": "\u6211\u7684\u5B9A\u65F6\u4EFB\u52A1",
  "tabs.runs": "\u6267\u884C\u8BB0\u5F55",
  "sort.by": "\u6392\u5E8F",
  "sort.created.asc": "\u6309\u521B\u5EFA\u65F6\u95F4\u5347\u5E8F",
  "sort.created.desc": "\u6309\u521B\u5EFA\u65F6\u95F4\u5012\u5E8F",
  "sort.planned.asc": "\u6309\u8BA1\u5212\u65F6\u95F4\u5347\u5E8F",
  "sort.planned.desc": "\u6309\u8BA1\u5212\u65F6\u95F4\u5012\u5E8F",
  "sort.default.saved": "\u9ED8\u8BA4",
  "form.workspace": "\u5DE5\u4F5C\u76EE\u5F55",
  "form.workspacePath": "\u76EE\u5F55\u8DEF\u5F84",
  "form.workspacePathPlaceholder": "D:\\work\\project",
  "form.model": "\u6A21\u578B",
  "form.modelSelect": "\u9009\u62E9\u6A21\u578B",
  "form.effort": "\u63A8\u7406\u7B49\u7EA7",
  "form.effort.none": "\u9ED8\u8BA4",
  "form.effort.low": "Low",
  "form.effort.medium": "Medium",
  "form.effort.high": "High",
  "form.error.workspace": "\u8BF7\u9009\u62E9\u5DE5\u4F5C\u533A\u3002",
  "modal.title": "\u65B0\u5EFA\u5B9A\u65F6\u4EFB\u52A1",
  "modal.edit": "\u7F16\u8F91\u5B9A\u65F6\u4EFB\u52A1",
  "modal.save": "\u4FDD\u5B58",
  "header.eyebrow": "\u81EA\u4E3B\u7F16\u7801\u4EFB\u52A1",
  "header.title": "\u81EA\u52A8\u5316",
  "header.subtitle": "\u4E3A\u5F53\u524D\u5DE5\u4F5C\u533A\u5B89\u6392\u72EC\u7ACB\u3001\u53EF\u5BA1\u8BA1\u7684 Agent \u8FD0\u884C\u3002",
  "header.create": "\u65B0\u5EFA\u81EA\u52A8\u5316",
  "header.closeCreate": "\u6536\u8D77\u8868\u5355",
  "scope.workspace": "\u5DE5\u4F5C\u533A",
  "scope.folder": "\u5DE5\u4F5C\u76EE\u5F55",
  "stats.total": "\u5168\u90E8",
  "stats.active": "\u5DF2\u542F\u7528",
  "stats.next": "\u4E0B\u6B21\u8FD0\u884C",
  "stats.attention": "\u9700\u8981\u5173\u6CE8",
  "stats.noneScheduled": "\u6682\u65E0\u8BA1\u5212",
  "stats.noAttention": "\u4E00\u5207\u6B63\u5E38",
  "section.automations": "\u5DE5\u4F5C\u533A\u81EA\u52A8\u5316",
  "section.automationsHint": "\u6BCF\u6B21\u89E6\u53D1\u90FD\u4F1A\u521B\u5EFA\u4E00\u4E2A\u5168\u65B0\u7684 DSH Session\uFF0C\u5E76\u4FDD\u7559\u72EC\u7ACB\u5BA1\u8BA1\u8BB0\u5F55\u3002",
  "section.runs": "\u6700\u8FD1\u8FD0\u884C",
  "section.runsHint": "\u5F53\u524D\u5DE5\u4F5C\u533A\u6700\u8FD1\u7684\u6267\u884C\u72B6\u6001\u3002",
  "section.refresh": "\u5237\u65B0",
  "empty.title": "\u8BA9\u91CD\u590D\u7684\u7F16\u7801\u5DE5\u4F5C\u81EA\u52A8\u8FD0\u884C",
  "empty.body": "\u8BBE\u7F6E\u4E00\u4E2A\u76EE\u6807\u660E\u786E\u7684\u4EFB\u52A1\u3001\u8FD0\u884C\u65F6\u95F4\u548C\u6743\u9650\u8FB9\u754C\u3002\u6BCF\u6B21\u8FD0\u884C\u90FD\u4ECE\u5168\u65B0 Session \u5F00\u59CB\u3002",
  "empty.action": "\u521B\u5EFA\u7B2C\u4E00\u4E2A\u81EA\u52A8\u5316",
  "runs.empty": "\u8FD8\u6CA1\u6709\u8FD0\u884C\u8BB0\u5F55\u3002\u4F60\u53EF\u4EE5\u7ACB\u5373\u8FD0\u884C\u4E00\u6B21\uFF0C\u6216\u7B49\u5F85\u8BA1\u5212\u89E6\u53D1\u3002",
  "overview.empty": "\u6682\u65E0\u5B9A\u65F6\u4EFB\u52A1\uFF0C\u53EF\u5230\u8BBE\u7F6E\u9875\u521B\u5EFA\u3002",
  "form.title": "\u521B\u5EFA\u81EA\u52A8\u5316",
  "form.subtitle": "\u8BF7\u5199\u5B8C\u6574\u3001\u72EC\u7ACB\u7684\u4EFB\u52A1\u8BF4\u660E\uFF1A\u5B9A\u65F6\u8FD0\u884C\u4E0D\u4F1A\u7EE7\u627F\u5F53\u524D\u5BF9\u8BDD\u3002",
  "form.name": "\u540D\u79F0",
  "form.namePlaceholder": "\u6BCF\u65E5\u56DE\u5F52\u6D4B\u8BD5\u5206\u8BCA",
  "form.prompt": "\u4EFB\u52A1\u6307\u4EE4",
  "form.promptPlaceholder": "\u68C0\u67E5\u65B0\u589E\u6D4B\u8BD5\u5931\u8D25\uFF0C\u5B9A\u4F4D\u56DE\u5F52\u539F\u56E0\uFF0C\u5E76\u7ED9\u51FA\u7ECF\u8FC7\u9A8C\u8BC1\u7684\u6700\u5C0F\u4FEE\u590D\u65B9\u6848\u2026\u2026",
  "form.schedule": "\u8FD0\u884C\u8BA1\u5212",
  "form.planTime": "\u8BA1\u5212\u65F6\u95F4",
  "form.hourly": "\u6BCF\u5C0F\u65F6",
  "form.monthly": "\u6BCF\u6708",
  "form.custom": "\u81EA\u5B9A\u4E49",
  "form.minutesShort": "\u5206",
  "form.daysShort": "\u5929",
  "form.monthDay": "\u6BCF\u6708\u7B2C {day} \u5929",
  "form.skills": "\u6280\u80FD",
  "form.skillsEmpty": "\u6682\u65E0\u53EF\u7528\u6280\u80FD",
  "schedule.hourlyAt": "\u6BCF\u5C0F\u65F6 :{minute}",
  "schedule.monthlyAt": "\u6BCF\u6708 {day} \u65E5 \xB7 {time}",
  "schedule.customAt": "\u6BCF {count} \u5929 \xB7 {time}",
  "form.once": "\u4E0D\u91CD\u590D",
  "form.interval": "\u95F4\u9694",
  "form.daily": "\u6BCF\u5929",
  "form.weekly": "\u6BCF\u5468",
  "form.runAt": "\u8FD0\u884C\u65F6\u95F4",
  "form.every": "\u6BCF\u9694",
  "form.minutes": "\u5206\u949F",
  "form.time": "\u65F6\u95F4",
  "form.days": "\u661F\u671F",
  "form.timeZone": "\u65F6\u533A",
  "form.maxConcurrentRuns": "\u5E76\u53D1\u6570\u91CF",
  "form.maxConcurrentRunsHint": "\u540C\u4E00\u4EFB\u52A1\u7684\u6392\u961F\u53CA\u8FD0\u884C\u6B21\u6570\u5171\u7528\u6B64\u4E0A\u9650\uFF0C\u9ED8\u8BA4 1\uFF1B\u6EE1\u989D\u65F6\u8DF3\u8FC7\u5F53\u6B21\u5B9A\u65F6\u89E6\u53D1\uFF0C\u624B\u52A8\u8FD0\u884C\u5C06\u88AB\u62D2\u7EDD\u3002",
  "form.error.maxConcurrentRuns": "\u5E76\u53D1\u6570\u91CF\u5FC5\u987B\u4E3A\u5927\u4E8E\u7B49\u4E8E 1 \u7684\u6574\u6570\u3002",
  "form.permission": "\u6743\u9650\u8FB9\u754C",
  "permission.readOnly": "\u53EA\u8BFB",
  "permission.workspaceWrite": "\u5DE5\u4F5C\u533A\u5199\u5165",
  "permission.fullAccess": "\u5B8C\u5168\u8BBF\u95EE",
  "form.cancel": "\u53D6\u6D88",
  "form.submit": "\u521B\u5EFA\u81EA\u52A8\u5316",
  "form.submitting": "\u521B\u5EFA\u4E2D\u2026",
  "form.error.name": "\u8BF7\u8F93\u5165\u540D\u79F0\u3002",
  "form.error.prompt": "\u8BF7\u8F93\u5165\u5B8C\u6574\u3001\u72EC\u7ACB\u7684\u4EFB\u52A1\u6307\u4EE4\u3002",
  "form.error.once": "\u8BF7\u9009\u62E9\u6709\u6548\u7684\u672A\u6765\u65E5\u671F\u548C\u65F6\u95F4\u3002",
  "form.error.interval": "\u8FD0\u884C\u95F4\u9694\u5FC5\u987B\u5728 1 \u5230 43,200 \u5206\u949F\u4E4B\u95F4\u3002",
  "form.error.weekdays": "\u8BF7\u81F3\u5C11\u9009\u62E9\u4E00\u5929\u3002",
  "day.1": "\u5468\u4E00",
  "day.2": "\u5468\u4E8C",
  "day.3": "\u5468\u4E09",
  "day.4": "\u5468\u56DB",
  "day.5": "\u5468\u4E94",
  "day.6": "\u5468\u516D",
  "day.7": "\u5468\u65E5",
  "status.active": "\u5DF2\u542F\u7528",
  "status.paused": "\u5DF2\u6682\u505C",
  "status.queued": "\u6392\u961F\u4E2D",
  "status.running": "\u8FD0\u884C\u4E2D",
  "status.succeeded": "\u5DF2\u5B8C\u6210",
  "status.failed": "\u5931\u8D25",
  "status.skipped": "\u5DF2\u8DF3\u8FC7",
  "status.cancelled": "\u5DF2\u53D6\u6D88",
  "status.interrupted": "\u5DF2\u4E2D\u65AD",
  "card.nextRun": "\u4E0B\u6B21",
  "card.lastRun": "\u6700\u8FD1",
  "card.never": "\u5C1A\u672A\u8FD0\u884C",
  "schedule.onceAt": "\u5355\u6B21 \xB7 {time}",
  "schedule.everyMinutes": "\u6BCF {count} \u5206\u949F",
  "schedule.dailyAt": "\u6BCF\u5929 \xB7 {time}",
  "schedule.weeklyAt": "{days} \xB7 {time}",
  "card.pause": "\u6682\u505C",
  "card.resume": "\u6062\u590D",
  "card.runNow": "\u7ACB\u5373\u8FD0\u884C",
  "card.more": "\u66F4\u591A\u64CD\u4F5C",
  "card.delete": "\u5220\u9664",
  "card.confirmDelete": "\u786E\u8BA4\u5220\u9664\u8FD9\u4E2A\u81EA\u52A8\u5316\uFF1F",
  "card.confirmDeleteHint": "\u8FD0\u884C\u5386\u53F2\u4F1A\u4FDD\u7559\u7528\u4E8E\u5BA1\u8BA1\u3002",
  "card.confirm": "\u786E\u8BA4\u5220\u9664",
  "card.cancel": "\u53D6\u6D88",
  "run.trigger.schedule": "\u5B9A\u65F6\u89E6\u53D1",
  "run.trigger.manual": "\u624B\u52A8\u89E6\u53D1",
  "run.openSession": "Session {id}",
  "run.markRead": "\u6807\u8BB0\u5DF2\u5904\u7406",
  loading: "\u6B63\u5728\u52A0\u8F7D\u81EA\u52A8\u5316\u2026",
  "error.title": "\u65E0\u6CD5\u52A0\u8F7D\u81EA\u52A8\u5316",
  "error.retry": "\u91CD\u8BD5",
  "error.action": "\u64CD\u4F5C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5\u3002",
  "error.taskMissing": "\u8BE5\u5B9A\u65F6\u4EFB\u52A1\u5DF2\u4E0D\u5B58\u5728\u3002",
  "error.offline": "\u65E0\u6CD5\u8FDE\u63A5\u672C\u673A\u81EA\u52A8\u5316\u670D\u52A1\uFF0C\u8BF7\u786E\u8BA4 DSH \u4ECD\u5728\u8FD0\u884C\u540E\u91CD\u8BD5\u3002",
  "time.now": "\u521A\u521A",
  "time.minuteAgo": "{count} \u5206\u949F\u524D",
  "time.hourAgo": "{count} \u5C0F\u65F6\u524D",
  "time.dayAgo": "{count} \u5929\u524D",
  "time.inMinute": "{count} \u5206\u949F\u540E",
  "time.inHour": "{count} \u5C0F\u65F6\u540E",
  "time.inDay": "{count} \u5929\u540E"
};

// src/client/native-tabs.ts
var NATIVE_TABS_KEY = "__dshNativeTabs";
function createNativeTabRegistry(officialTree) {
  const tabs = /* @__PURE__ */ new Map();
  const sessionFilters = [];
  const listeners2 = /* @__PURE__ */ new Set();
  let cachedTabs = [];
  const rebuild = () => {
    cachedTabs = [...tabs.values()].sort((left, right) => (left.order ?? 0) - (right.order ?? 0));
  };
  const emit = () => {
    for (const listener of listeners2) listener();
  };
  return {
    version: 1,
    officialTree,
    sessionFilters,
    getTabs() {
      return cachedTabs;
    },
    subscribe(listener) {
      listeners2.add(listener);
      return () => {
        listeners2.delete(listener);
      };
    },
    insert(tab) {
      if (tab.id === "") return () => void 0;
      const existed = tabs.get(tab.id);
      tabs.set(tab.id, tab);
      if (existed !== tab) {
        rebuild();
        emit();
      }
      return () => {
        tabs.delete(tab.id);
        rebuild();
        emit();
      };
    },
    addSessionFilter(filter) {
      sessionFilters.push(filter);
      emit();
      return () => {
        const index = sessionFilters.indexOf(filter);
        if (index >= 0) sessionFilters.splice(index, 1);
        emit();
      };
    }
  };
}
function getNativeTabRegistry(target) {
  if (target === void 0 || target === null || typeof target !== "object" && typeof target !== "function") return void 0;
  const registry = target[NATIVE_TABS_KEY];
  if (registry === void 0 || registry === null || typeof registry !== "object") return void 0;
  return typeof registry.insert === "function" ? registry : void 0;
}
function attachNativeTabRegistry(target, registry) {
  try {
    target[NATIVE_TABS_KEY] = registry;
  } catch {
  }
  return registry;
}
function findNativeTabRegistry(entry) {
  const record = entry;
  return getNativeTabRegistry(entry) ?? getNativeTabRegistry(record?.component);
}
function isForeignSidebarHost(component) {
  if (component === void 0 || component === null) return false;
  const flags = component;
  if (flags.__dshNativeTabHost === true) return true;
  if (flags.__imConnectWrapped === true) return true;
  return getNativeTabRegistry(component) !== void 0;
}

// src/client/native-session-list.tsx
var import_react9 = require("react");
var import_react_dom3 = require("react-dom");
var import_dsh_client_ui_primitives3 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/native-session-menu.ts
function resolveEventElement(target) {
  if (target == null || typeof target !== "object") return null;
  const node = target;
  if (node.nodeType === 3 || node.nodeType === 8) {
    return node.parentElement ?? null;
  }
  return node;
}
function shouldCloseNativeSessionMenu(target, keepInside) {
  const el = resolveEventElement(target);
  if (el == null) return true;
  return !keepInside.some((root) => {
    if (root == null || typeof root !== "object") return false;
    if (root === el) return true;
    const box = root;
    return typeof box.contains === "function" && box.contains(el);
  });
}
function pointerPoint(event) {
  const x = Number(event?.clientX);
  const y = Number(event?.clientY);
  return {
    x: Number.isFinite(x) ? x : 8,
    y: Number.isFinite(y) ? y : 8
  };
}
function clampMenuPoint(x, y, width, height, viewport) {
  const pad = 8;
  const vw = viewport.width || width + pad * 2;
  const vh = viewport.height || height + pad * 2;
  return {
    x: Math.max(pad, Math.min(x, Math.max(pad, vw - width - pad))),
    y: Math.max(pad, Math.min(y, Math.max(pad, vh - height - pad)))
  };
}
function nextOpenSessionMenu(current, clicked, point) {
  if (current?.id === clicked) return null;
  return { id: clicked, x: point.x, y: point.y };
}
function nativeSessionMenuStyle(point, size = { width: 218, height: 176 }, viewport = { width: 1e3, height: 800 }) {
  const pos = clampMenuPoint(point.x, point.y, size.width, size.height, viewport);
  return {
    position: "fixed",
    zIndex: 4e3,
    left: `${Math.round(pos.x)}px`,
    top: `${Math.round(pos.y)}px`
  };
}
function nativeSessionHoverStyle(row, card, viewport) {
  const pad = 8;
  const left = row.right + pad;
  const top = row.top + card.height > viewport.height - pad ? Math.max(pad, viewport.height - card.height - pad) : Math.max(pad, row.top);
  return {
    position: "fixed",
    zIndex: 4100,
    left: `${Math.round(left)}px`,
    top: `${Math.round(top)}px`
  };
}
function relativeTime(value, t, now = Date.now()) {
  const ts = Date.parse(value || "");
  if (!Number.isFinite(ts)) return "";
  const delta = Math.max(0, now - ts);
  const min = Math.floor(delta / 6e4);
  if (min < 1) return t("time.now");
  if (min < 60) return t("time.minuteAgo", { count: min });
  const hour = Math.floor(min / 60);
  if (hour < 24) return t("time.hourAgo", { count: hour });
  return t("time.dayAgo", { count: Math.floor(hour / 24) });
}

// src/client/native-group-actions.ts
var ARCHIVE_MANAGER_PLUGIN = "@michengai/dsh-archive-manager";
function hasArchiveManagerPlugin(root) {
  return root?.querySelector(`[data-plugin="${ARCHIVE_MANAGER_PLUGIN}"]`) != null;
}
function scheduledGroupShowsActiveFolder(expanded, sessionIds, selectedId) {
  return expanded && selectedId !== null && sessionIds.includes(selectedId);
}
async function archiveScheduledGroup(sessionIds, archiveSession) {
  for (const sessionId of sessionIds) await archiveSession(sessionId);
}

// src/client/schedule-overview.tsx
var import_react7 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var SORT_STORAGE2 = typeof window === "undefined" ? void 0 : window.localStorage;
function ScheduleViewSwitch({
  t,
  view,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "dsh-st-rail-views", role: "tablist", "aria-label": t("sidebar.views"), children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", role: "tab", "aria-selected": view === "runs", className: view === "runs" ? "is-on" : void 0, onClick: () => onChange("runs"), children: t("tabs.runs") }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", role: "tab", "aria-selected": view === "overview", className: view === "overview" ? "is-on" : void 0, onClick: () => onChange("overview"), children: t("sidebar.viewOverview") })
  ] });
}
function ScheduleOverview({
  t,
  automations,
  serverNow,
  openTaskSettings,
  onToggleAutomation
}) {
  const [sortKey, setSortKey] = (0, import_react7.useState)(() => readSortDefault(SORT_STORAGE2, OVERVIEW_SORT_DEFAULT_KEY)?.key ?? "planned");
  const [sortDirection, setSortDirection] = (0, import_react7.useState)(() => readSortDefault(SORT_STORAGE2, OVERVIEW_SORT_DEFAULT_KEY)?.direction ?? "asc");
  const [busyIds, setBusyIds] = (0, import_react7.useState)(() => /* @__PURE__ */ new Set());
  const now = (0, import_react7.useMemo)(() => new Date(serverNow ?? Date.now()), [serverNow]);
  const rows = (0, import_react7.useMemo)(() => {
    const sorted = sortAutomations(automations, sortKey, sortDirection);
    return deriveTaskOverviewRows(sorted);
  }, [automations, sortDirection, sortKey]);
  const scheduleSummaries = (0, import_react7.useMemo)(() => new Map(automations.map((item) => [item.id, formatSchedule(item.schedule, t)])), [automations, t]);
  const toggleAutomation = (automationId, mutation) => {
    if (onToggleAutomation === void 0 || busyIds.has(automationId)) return;
    setBusyIds((current) => new Set(current).add(automationId));
    void Promise.resolve(onToggleAutomation(automationId, mutation)).catch((error) => {
      console.warn("[dsh-automation] \u5207\u6362\u4EFB\u52A1\u72B6\u6001\u5931\u8D25", error);
    }).finally(() => {
      setBusyIds((current) => {
        const next = new Set(current);
        next.delete(automationId);
        return next;
      });
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "dsh-st-overview", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "dsh-st-overview-head", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "dsh-st-overview-title", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("strong", { children: t("sidebar.viewOverview") }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { "aria-label": `${rows.length}`, children: rows.length })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        SortMenu,
        {
          t,
          compact: true,
          iconOnly: true,
          className: "dsh-st-overview-sort",
          ...SORT_STORAGE2 === void 0 ? {} : { storage: SORT_STORAGE2 },
          storageKey: OVERVIEW_SORT_DEFAULT_KEY,
          sortKey,
          sortDirection,
          onSelect: (key, direction) => {
            setSortKey(key);
            setSortDirection(direction);
          }
        }
      )
    ] }),
    rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "dsh-st-rail-empty", children: t("overview.empty") }) : rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      OverviewRow,
      {
        t,
        row,
        now,
        scheduleSummary: scheduleSummaries.get(row.id) ?? "",
        toggleDisabled: onToggleAutomation === void 0 || busyIds.has(row.id),
        onToggleAutomation: toggleAutomation,
        ...openTaskSettings === void 0 ? {} : { openTaskSettings }
      },
      row.id
    ))
  ] });
}
function OverviewRow({
  t,
  row,
  now,
  scheduleSummary,
  openTaskSettings,
  toggleDisabled,
  onToggleAutomation
}) {
  const paused = row.status !== "active";
  const nextRun = row.nextRunAt === void 0 ? t("stats.noneScheduled") : formatWithin(row.nextRunAt, now, t);
  const nextRunCompact = row.nextRunAt === void 0 ? t("stats.noneScheduled") : formatRelativeTime(row.nextRunAt, now, t);
  const nextRunLabel = `${t("stats.next")}: ${nextRun}`;
  const toggleLabel = paused ? t("card.resume") : t("card.pause");
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: `dsh-st-overview-row${paused ? " is-paused" : ""}`, children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      "button",
      {
        type: "button",
        className: "dsh-st-overview-open",
        disabled: openTaskSettings === void 0,
        onClick: () => {
          openTaskSettings?.({ automationId: row.id, name: row.name, sessionIds: [] });
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "dsh-st-overview-copy", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "dsh-st-overview-name", children: row.name }),
            scheduleSummary !== "" && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("span", { className: "dsh-st-overview-schedule", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(CalendarIcon, { width: 14, height: 14 }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: scheduleSummary })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "dsh-st-overview-next", title: nextRunLabel, "aria-label": nextRunLabel, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("strong", { children: nextRunCompact }) })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("label", { className: "dsh-st-overview-toggle", title: toggleLabel, children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        "input",
        {
          type: "checkbox",
          role: "switch",
          checked: !paused,
          "aria-checked": !paused,
          "aria-label": toggleLabel,
          disabled: toggleDisabled,
          onChange: () => {
            onToggleAutomation?.(row.id, automationToggleMutation(row.status));
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { "aria-hidden": "true" })
    ] })
  ] });
}

// src/client/workspace-toolbar.tsx
var import_react8 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
function officialSearchIconSize(expanded) {
  return expanded ? 11 : 14;
}
function WorkspaceToolbar({
  t,
  query,
  sort,
  groupMode,
  onQueryChange,
  onSortChange,
  onGroupModeChange
}) {
  const [searching, setSearching] = (0, import_react8.useState)(query.trim() !== "");
  const [filterOpen, setFilterOpen] = (0, import_react8.useState)(false);
  const inputRef = (0, import_react8.useRef)(null);
  const rootRef = (0, import_react8.useRef)(null);
  const searchSize = officialSearchIconSize(searching);
  (0, import_react8.useEffect)(() => {
    if (searching) inputRef.current?.focus();
  }, [searching]);
  (0, import_react8.useEffect)(() => {
    if (!filterOpen) return;
    const close = (event) => {
      const target = event.target;
      if (target instanceof Node && rootRef.current?.contains(target)) return;
      setFilterOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [filterOpen]);
  const openSearch = () => {
    setFilterOpen(false);
    setSearching(true);
  };
  const closeSearch = () => {
    onQueryChange("");
    setSearching(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: searching ? "dsh-st-n-toolbar is-search" : "dsh-st-n-toolbar", ref: rootRef, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "dsh-st-n-head-label", children: t("sidebar.workspaces") }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "dsh-st-n-search-slot", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "dsh-st-n-search", onClick: openSearch, children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "dsh-st-n-search-btn", "aria-label": t("sidebar.search"), "aria-expanded": searching, onClick: openSearch, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SearchOutlineIcon, { width: searchSize, height: searchSize }) }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("input", { ref: inputRef, className: "dsh-st-n-search-input", value: query, placeholder: t("sidebar.searchSessions"), "aria-label": t("sidebar.searchSessions"), tabIndex: searching ? 0 : -1, "aria-hidden": !searching, onChange: (event) => onQueryChange(event.target.value), onKeyDown: (event) => {
        if (event.key === "Escape") closeSearch();
      } }),
      searching && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: "dsh-st-n-search-clear", "aria-label": t("sidebar.clearSearch"), onClick: (event) => {
        event.stopPropagation();
        closeSearch();
      }, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CloseOutlineIcon, { width: 14, height: 14 }) })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "dsh-st-n-head-acts", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "dsh-st-n-head-filter", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("button", { type: "button", className: filterOpen ? "dsh-st-n-head-btn is-on" : "dsh-st-n-head-btn", "aria-label": t("sidebar.filter"), "aria-expanded": filterOpen, onClick: () => setFilterOpen((open) => !open), children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(SlidersIcon, { width: 16, height: 16 }) }),
      filterOpen && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "dsh-st-n-filter-menu", role: "menu", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "dsh-st-n-filter-label", children: t("sidebar.groupBy") }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FilterRow, { label: t("sidebar.groupWorkspace"), selected: groupMode === "workspace", onSelect: () => {
          onGroupModeChange("workspace");
          setFilterOpen(false);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FilterRow, { label: t("sidebar.groupList"), selected: groupMode === "list", onSelect: () => {
          onGroupModeChange("list");
          setFilterOpen(false);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "dsh-st-n-filter-split" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "dsh-st-n-filter-label", children: t("sidebar.sortBy") }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FilterRow, { label: t("sidebar.sortManual"), selected: sort === "manual", onSelect: () => {
          onSortChange("manual");
          setFilterOpen(false);
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(FilterRow, { label: t("sidebar.sortTime"), selected: sort === "time", onSelect: () => {
          onSortChange("time");
          setFilterOpen(false);
        } })
      ] })
    ] }) })
  ] });
}
function FilterRow({
  label,
  selected,
  onSelect
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("button", { type: "button", role: "menuitemradio", "aria-checked": selected, className: selected ? "is-on" : void 0, onClick: onSelect, children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { children: label }),
    selected ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CheckOutlineIcon, { width: 16, height: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("span", { className: "dsh-st-n-filter-tick" })
  ] });
}

// src/client/native-session-list.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var EMPTY_SESSION_BY_ID = {};
function NativeScheduleSessionList(props) {
  const { t, runtime, openSession, useSessions, useWorkspaces, renameSession, archiveSession, forkSession, openTaskSettings } = props;
  const state = (0, import_react9.useSyncExternalStore)(runtime.source.subscribe, runtime.source.getSnapshot, runtime.source.getSnapshot);
  const selectedId = useSessions ? useSessions((snap) => snap.current ?? null) : null;
  const sessionById = useSessions ? useSessions((snap) => snap.byId ?? EMPTY_SESSION_BY_ID) : EMPTY_SESSION_BY_ID;
  const archivedIds = useWorkspaces ? useWorkspaces((snap) => snap.archivedSessionIds ?? []) : [];
  const [folded, setFolded] = (0, import_react9.useState)({});
  const [openMenu, setOpenMenu] = (0, import_react9.useState)(null);
  const [openGroupMenu, setOpenGroupMenu] = (0, import_react9.useState)();
  const [archiveGroupTarget, setArchiveGroupTarget] = (0, import_react9.useState)();
  const [archiveGroupBusy, setArchiveGroupBusy] = (0, import_react9.useState)(false);
  const [archiveGroupError, setArchiveGroupError] = (0, import_react9.useState)();
  const [archiveManagerInstalled, setArchiveManagerInstalled] = (0, import_react9.useState)(() => typeof document !== "undefined" && hasArchiveManagerPlugin(document));
  const [query, setQuery] = (0, import_react9.useState)("");
  const [sort, setSort] = (0, import_react9.useState)("time");
  const [groupMode, setGroupMode] = (0, import_react9.useState)("workspace");
  const [view, setView] = (0, import_react9.useState)("runs");
  const snapshotRefreshFor = (0, import_react9.useRef)(null);
  const archived = (0, import_react9.useMemo)(() => new Set(archivedIds), [archivedIds]);
  const listedIds = useSessions ? useSessions((snap) => Array.isArray(snap.ids) ? snap.ids : void 0) : void 0;
  const presentIds = (0, import_react9.useMemo)(() => {
    if (listedIds !== void 0) return new Set(listedIds);
    const keys = Object.keys(sessionById);
    return keys.length > 0 ? new Set(keys) : void 0;
  }, [listedIds, sessionById]);
  const groups = (0, import_react9.useMemo)(() => {
    const snapshot = state.snapshot;
    if (snapshot === void 0) return [];
    const timeZoneById = new Map(snapshot.automations.map((item) => [item.id, item.timeZone]));
    return groupScheduledSessions(snapshot.automations, snapshot.runs).map((group) => ({
      ...group,
      sessions: group.sessions.filter((session) => keepScheduledSessionLink(session.id, archived, presentIds)).map((session) => {
        const run = snapshot.runs.find((item) => item.sessionId === session.id);
        return {
          ...session,
          title: formatRunStamp(run && (run.startedAt || run.scheduledFor) || "", timeZoneById.get(group.id)),
          updatedAt: run && (run.startedAt || run.scheduledFor) || "",
          running: session.running || sessionById[session.id]?.running === true
        };
      })
    })).filter((group) => group.sessions.length > 0);
  }, [archived, presentIds, sessionById, state.snapshot]);
  (0, import_react9.useEffect)(() => {
    if (!scheduledSessionNeedsSnapshotRefresh(selectedId, state.snapshot?.runs)) {
      snapshotRefreshFor.current = null;
      return;
    }
    if (snapshotRefreshFor.current === selectedId) return;
    snapshotRefreshFor.current = selectedId;
    void runtime.refresh().catch(() => void 0);
  }, [runtime, selectedId, state.snapshot?.runs]);
  const visibleGroups = (0, import_react9.useMemo)(() => applyWorkspaceBrowserQuery(groups.map((group) => ({ ...group, name: group.name })), query, sort, groupMode), [groups, query, sort, groupMode]);
  (0, import_react9.useEffect)(() => {
    if (typeof document === "undefined" || typeof MutationObserver === "undefined") return;
    const refresh = () => {
      setArchiveManagerInstalled(hasArchiveManagerPlugin(document));
    };
    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
    };
  }, []);
  const canArchiveGroup = archiveManagerInstalled && archiveSession !== void 0;
  const confirmArchiveGroup = () => {
    if (archiveGroupTarget === void 0 || archiveSession === void 0 || archiveGroupBusy) return;
    const target = archiveGroupTarget;
    setArchiveGroupBusy(true);
    setArchiveGroupError(void 0);
    void archiveScheduledGroup(target.sessionIds, archiveSession).then(() => {
      setArchiveGroupTarget(void 0);
    }).catch((caught) => {
      setArchiveGroupError(caught instanceof Error ? caught.message : t("error.action"));
    }).finally(() => {
      setArchiveGroupBusy(false);
    });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dsh-st-n", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ScheduleViewSwitch, { t, view, onChange: setView }),
    view === "overview" ? state.snapshot === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "dsh-st-n-empty", children: state.phase === "loading" ? t("loading") : t("overview.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      ScheduleOverview,
      {
        t,
        automations: state.snapshot.automations,
        onToggleAutomation: (automationId, mutation) => runtime.mutateAutomation(automationId, mutation),
        ...openTaskSettings === void 0 ? {} : { openTaskSettings },
        ...state.snapshot.serverNow === void 0 ? {} : { serverNow: state.snapshot.serverNow }
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(WorkspaceToolbar, { t, query, sort, groupMode, onQueryChange: setQuery, onSortChange: setSort, onGroupModeChange: setGroupMode }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dsh-st-n-tree", role: "tree", children: [
        state.phase === "loading" && visibleGroups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "dsh-st-n-empty", children: t("loading") }),
        visibleGroups.length === 0 && state.phase !== "loading" && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "dsh-st-n-empty", children: t("sidebar.empty") }),
        visibleGroups.map((group) => {
          const expanded = folded[group.id] !== true;
          const hasCurrentSession = scheduledGroupShowsActiveFolder(expanded, group.sessions.map((session) => session.id), selectedId);
          return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dsh-st-n-group", children: [
            groupMode === "workspace" && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              NativeScheduleGroupRow,
              {
                t,
                id: group.id,
                name: group.name,
                sessionIds: group.sessions.map((session) => session.id),
                expanded,
                hasCurrentSession,
                menuOpen: openGroupMenu === group.id,
                canArchiveGroup,
                onToggle: () => setFolded((current) => ({ ...current, [group.id]: expanded })),
                onMenuChange: (open) => {
                  setOpenMenu(null);
                  setOpenGroupMenu(open ? group.id : void 0);
                },
                onTaskSettings: () => {
                  openTaskSettings?.({ automationId: group.id, name: group.name, sessionIds: group.sessions.map((session) => session.id) });
                },
                onArchiveGroup: () => {
                  setArchiveGroupError(void 0);
                  setArchiveGroupTarget({ id: group.id, name: group.name, sessionIds: group.sessions.map((session) => session.id) });
                }
              }
            ),
            (groupMode === "list" || expanded) && group.sessions.map((session) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              NativeSessionRow,
              {
                t,
                id: session.id,
                title: session.title,
                hoverTitle: String(sessionById[session.id]?.displayTitle ?? sessionById[session.id]?.title ?? group.name),
                updatedAt: session.updatedAt,
                running: session.running,
                selected: selectedId === session.id,
                menuOpen: openMenu?.id === session.id,
                menuPoint: openMenu === null || openMenu.id !== session.id ? { x: 8, y: 8 } : { x: openMenu.x, y: openMenu.y },
                onToggleMenu: (event) => {
                  setOpenGroupMenu(void 0);
                  setOpenMenu((current) => nextOpenSessionMenu(current, session.id, pointerPoint(event)));
                },
                onCloseMenu: () => setOpenMenu((current) => current?.id === session.id ? null : current),
                onOpen: () => {
                  setOpenMenu(null);
                  openSession?.(session.id);
                },
                ...renameSession === void 0 ? {} : { renameSession },
                ...archiveSession === void 0 ? {} : { archiveSession },
                ...forkSession === void 0 ? {} : { forkSession }
              },
              session.id
            ))
          ] }, group.id);
        })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
      import_dsh_client_ui_primitives3.Modal,
      {
        open: archiveGroupTarget !== void 0,
        onClose: () => {
          if (archiveGroupBusy) return;
          setArchiveGroupTarget(void 0);
          setArchiveGroupError(void 0);
        },
        closeLabel: t("session.archiveGroupClose"),
        title: t("session.archiveGroup"),
        footer: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dsh-st-n-dialog-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_dsh_client_ui_primitives3.Button, { variant: "outline", disabled: archiveGroupBusy, onClick: () => {
            setArchiveGroupTarget(void 0);
            setArchiveGroupError(void 0);
          }, children: t("session.archiveGroupCancel") }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_dsh_client_ui_primitives3.Button, { variant: "outline", className: "dsh-st-n-danger-button", disabled: archiveGroupBusy, onClick: confirmArchiveGroup, children: t("session.archiveGroupConfirm") })
        ] }),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "dsh-st-n-dialog-copy", children: archiveGroupTarget === void 0 ? "" : t("session.archiveGroupDescription", { name: archiveGroupTarget.name, count: archiveGroupTarget.sessionIds.length }) }),
          archiveGroupBusy && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "dsh-st-n-dialog-status", role: "status", children: t("session.archiveGroupPending") }),
          archiveGroupError !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "dsh-st-n-dialog-error", role: "alert", children: t("session.archiveGroupFailed", { message: archiveGroupError }) })
        ]
      }
    )
  ] });
}
function NativeScheduleGroupRow(props) {
  const { t, id, name: name2, expanded, hasCurrentSession, menuOpen, canArchiveGroup, onToggle, onMenuChange, onTaskSettings, onArchiveGroup } = props;
  const items = [
    { id: "task-settings", label: t("session.taskSettings"), icon: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_dsh_client_ui_primitives3.IconSettingsOutline16, { size: 16 }) },
    ...canArchiveGroup ? [
      { type: "separator", id: "archive-separator" },
      { id: "archive-group", label: t("session.archiveGroup"), icon: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_dsh_client_ui_primitives3.IconArchiveOutline20, { size: 16 }), danger: true }
    ] : []
  ];
  const rowClass = "dsh-st-n-row" + (hasCurrentSession ? " has-current-session" : "") + (menuOpen ? " is-menu" : "");
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "div",
    {
      className: rowClass,
      role: "treeitem",
      "aria-expanded": expanded,
      "data-n-group": id,
      onClick: onToggle,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "dsh-st-n-slot dsh-st-n-folder", children: expanded ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(FolderOpenIcon, { width: 16, height: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(FolderClosedIcon, { width: 16, height: 16 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "dsh-st-n-title", children: name2 }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "dsh-st-n-acts", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          import_dsh_client_ui_primitives3.Menu,
          {
            open: menuOpen,
            onClose: () => {
              onMenuChange(false);
            },
            items,
            onSelect: (action) => {
              onMenuChange(false);
              if (action === "task-settings") onTaskSettings();
              if (action === "archive-group") onArchiveGroup();
            },
            portal: true,
            dense: true,
            compact: true,
            anchor: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "button",
              {
                type: "button",
                className: "dsh-st-n-ico",
                "aria-label": t("session.groupActions", { name: name2 }),
                onMouseDown: (event) => {
                  event.stopPropagation();
                },
                onClick: (event) => {
                  event.stopPropagation();
                  onMenuChange(!menuOpen);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_dsh_client_ui_primitives3.IconEllipsisOutline16, { size: 16 })
              }
            )
          }
        ) })
      ]
    }
  );
}
function NativeSessionRow(props) {
  const { t, id, title, hoverTitle, updatedAt, running, selected, menuOpen, menuPoint, onToggleMenu, onCloseMenu, onOpen, renameSession, archiveSession, forkSession } = props;
  const rowRef = (0, import_react9.useRef)(null);
  const menuRef = (0, import_react9.useRef)(null);
  const hoverRef = (0, import_react9.useRef)(null);
  const [hoverOpen, setHoverOpen] = (0, import_react9.useState)(false);
  const [hoverStyle, setHoverStyle] = (0, import_react9.useState)({});
  const hoverTimer = (0, import_react9.useRef)(void 0);
  const [renaming, setRenaming] = (0, import_react9.useState)(false);
  const [draft, setDraft] = (0, import_react9.useState)(title);
  const [menuStyle, setMenuStyle] = (0, import_react9.useState)({});
  (0, import_react9.useEffect)(() => {
    setDraft(title);
  }, [title]);
  (0, import_react9.useEffect)(() => {
    if (!menuOpen) return;
    const close = (event) => {
      if (!shouldCloseNativeSessionMenu(event.target, [rowRef.current, menuRef.current])) return;
      onCloseMenu();
    };
    const onKey = (event) => {
      if (event.key === "Escape") onCloseMenu();
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, onCloseMenu]);
  (0, import_react9.useLayoutEffect)(() => {
    if (!menuOpen) return;
    const update = () => {
      const el = menuRef.current;
      const size = el === null ? { width: 218, height: 176 } : { width: el.offsetWidth, height: el.offsetHeight };
      setMenuStyle(nativeSessionMenuStyle(menuPoint, size, { width: window.innerWidth, height: window.innerHeight }));
    };
    update();
    window.addEventListener("resize", update);
    document.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      document.removeEventListener("scroll", update, true);
    };
  }, [menuOpen, menuPoint]);
  (0, import_react9.useEffect)(() => {
    if (!hoverOpen || menuOpen) return;
    const update = () => {
      const row = rowRef.current?.getBoundingClientRect();
      const card = hoverRef.current;
      if (row === void 0) return;
      const size = card === null ? { width: 220, height: 96 } : { width: card.offsetWidth, height: card.offsetHeight };
      setHoverStyle(nativeSessionHoverStyle({ right: row.right, top: row.top }, size, { width: window.innerWidth, height: window.innerHeight }));
    };
    update();
    window.addEventListener("resize", update);
    document.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      document.removeEventListener("scroll", update, true);
    };
  }, [hoverOpen, menuOpen, title, updatedAt, running]);
  (0, import_react9.useEffect)(() => () => {
    if (hoverTimer.current !== void 0) window.clearTimeout(hoverTimer.current);
  }, []);
  const run = (action) => {
    void Promise.resolve(action()).catch(() => void 0);
  };
  const showHover = () => {
    if (menuOpen) return;
    if (hoverTimer.current !== void 0) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setHoverOpen(true), 500);
  };
  const hideHover = () => {
    if (hoverTimer.current !== void 0) window.clearTimeout(hoverTimer.current);
    setHoverOpen(false);
  };
  const rowClass = "dsh-st-n-sess" + (selected ? " is-on" : "") + (menuOpen ? " is-menu" : "");
  if (renaming) {
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: rowClass, ref: rowRef, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("input", { className: "dsh-st-n-rename", value: draft, autoFocus: true, "aria-label": t("session.rename"), onChange: (event) => setDraft(event.target.value), onClick: (event) => event.stopPropagation(), onKeyDown: (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        setRenaming(false);
        if (draft.trim() !== "" && draft.trim() !== title) run(() => renameSession?.(id, draft.trim()));
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setRenaming(false);
        setDraft(title);
      }
    }, onBlur: () => {
      setRenaming(false);
      if (draft.trim() !== "" && draft.trim() !== title) run(() => renameSession?.(id, draft.trim()));
    } }) });
  }
  const menuItems = [
    { id: "rename", label: t("session.rename"), icon: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(PencilIcon, { width: 16, height: 16 }), go: () => {
      setRenaming(true);
    } },
    { id: "fork", label: t("session.fork"), icon: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(BranchIcon, { width: 16, height: 16 }), go: () => run(() => forkSession?.(id)) },
    { id: "archive", label: t("session.archive"), icon: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ArchiveIcon, { width: 16, height: 16 }), go: () => run(() => archiveSession?.(id)) }
  ];
  const menu = menuOpen && typeof document !== "undefined" ? (0, import_react_dom3.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { ref: menuRef, className: "dsh-st-n-menu is-float", "data-n-menu": id, style: menuStyle, onMouseDown: (event) => event.stopPropagation(), onClick: (event) => event.stopPropagation(), children: menuItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("button", { type: "button", className: void 0, onClick: () => {
      onCloseMenu();
      item.go();
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "dsh-st-n-mi", children: item.icon }),
      item.label
    ] }, item.id)) }),
    document.body
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: rowClass, ref: rowRef, role: "treeitem", tabIndex: 0, "aria-selected": selected, "data-n-menu-root": id, onClick: onOpen, onMouseEnter: showHover, onMouseLeave: hideHover, onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  }, onContextMenu: (event) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleMenu(event);
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "dsh-st-n-slot", children: running ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(RunningStateDot, {}) : null }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "dsh-st-n-title", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "dsh-st-n-time", children: relativeTime(updatedAt, t) }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "dsh-st-n-acts", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("button", { type: "button", className: "dsh-st-n-ico", "aria-label": t("session.moreActions", { title }), onMouseDown: (event) => event.stopPropagation(), onClick: (event) => {
      event.stopPropagation();
      hideHover();
      onToggleMenu(event);
    }, children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(EllipsisIcon, { width: 16, height: 16 }) }) }),
    menu,
    hoverOpen && !menuOpen && typeof document !== "undefined" && (0, import_react_dom3.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { ref: hoverRef, className: "dsh-st-n-hover", style: hoverStyle, onMouseEnter: showHover, onMouseLeave: hideHover, children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "dsh-st-n-hover-title", children: (hoverTitle ?? title).trim() || title }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "dsh-st-n-hover-time", children: relativeTime(updatedAt, t) }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dsh-st-n-hover-state", children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: running ? "dsh-st-n-hover-dot is-run" : "dsh-st-n-hover-dot" }),
          running ? t("session.runningStatus") : t("session.idle")
        ] })
      ] }),
      document.body
    )
  ] });
}

// src/client/ScheduleRail.tsx
var import_react10 = require("react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var EMPTY_EXTRA_TABS = [];
var noopSubscribe = (_listener) => () => void 0;
var OfficialTreeGuard = class extends import_react10.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.warn("[dsh-automation] official workspace tree crashed", error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
};
function ScheduleRail({
  t,
  runtime,
  openSession,
  openTaskSettings,
  view: controlledView,
  showViewSwitch = true
}) {
  const state = (0, import_react10.useSyncExternalStore)(runtime.source.subscribe, runtime.source.getSnapshot, runtime.source.getSnapshot);
  const [folded, setFolded] = (0, import_react10.useState)({});
  const [localView, setLocalView] = (0, import_react10.useState)("runs");
  const view = controlledView ?? localView;
  const snapshot = state.snapshot;
  const groups = (0, import_react10.useMemo)(() => {
    if (snapshot === void 0) return [];
    return groupScheduledSessions(snapshot.automations, snapshot.runs);
  }, [snapshot]);
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dsh-st-rail", children: [
    showViewSwitch && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ScheduleViewSwitch, { t, view, onChange: setLocalView }),
    view === "overview" ? snapshot === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-st-rail-empty", children: state.phase === "loading" ? t("loading") : t("overview.empty") }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      ScheduleOverview,
      {
        t,
        automations: snapshot.automations,
        onToggleAutomation: (automationId, mutation) => runtime.mutateAutomation(automationId, mutation),
        ...openTaskSettings === void 0 ? {} : { openTaskSettings },
        ...snapshot.serverNow === void 0 ? {} : { serverNow: snapshot.serverNow }
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(import_jsx_runtime11.Fragment, { children: [
      state.phase === "loading" && groups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-st-rail-empty", children: t("loading") }),
      groups.length === 0 && state.phase !== "loading" && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-st-rail-empty", children: t("sidebar.empty") }),
      groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("section", { className: "dsh-st-rail-group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
          "button",
          {
            type: "button",
            className: "dsh-st-rail-head",
            onClick: () => setFolded((current) => ({ ...current, [group.id]: !current[group.id] })),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "dsh-st-rail-folder", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(ClockIcon, { width: 16, height: 16 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "dsh-st-rail-title", children: group.name })
            ]
          }
        ),
        folded[group.id] !== true && group.sessions.map((session) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
          "button",
          {
            type: "button",
            className: "dsh-st-rail-session",
            onClick: () => openSession?.(session.id),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: session.label }),
              session.running && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(RunningStateDot, {})
            ]
          },
          session.id
        ))
      ] }, group.id))
    ] })
  ] });
}
function NativeScheduleShell({
  t,
  runtime,
  officialTree,
  hostProps,
  openSession,
  openTaskSettings,
  useSessions,
  useWorkspaces,
  renderSlot,
  hasChannels,
  subscribeChannels,
  tabRegistry,
  wide
}) {
  const Official = officialTree;
  const [tab, setTab] = (0, import_react10.useState)(() => {
    try {
      return readNativeSidebarTab(window.localStorage.getItem(NATIVE_SIDEBAR_TAB_KEY));
    } catch {
      return "tasks";
    }
  });
  const extraTabs = (0, import_react10.useSyncExternalStore)(
    tabRegistry?.subscribe ?? noopSubscribe,
    () => tabRegistry?.getTabs() ?? EMPTY_EXTRA_TABS,
    () => EMPTY_EXTRA_TABS
  );
  const channelsReady = (0, import_react10.useSyncExternalStore)(
    subscribeChannels ?? noopSubscribe,
    () => {
      try {
        return hasChannels?.() === true;
      } catch {
        return false;
      }
    },
    () => false
  );
  const currentId = useSessions?.((state) => state?.current ?? null);
  const automationState = (0, import_react10.useSyncExternalStore)(runtime.source.subscribe, runtime.source.getSnapshot, runtime.source.getSnapshot);
  const scheduledIds = (0, import_react10.useMemo)(() => collectScheduledSessionIds(automationState.snapshot?.runs), [automationState.snapshot]);
  const snapshotRefreshFor = (0, import_react10.useRef)(null);
  (0, import_react10.useEffect)(() => {
    if (!scheduledSessionNeedsSnapshotRefresh(currentId, automationState.snapshot?.runs)) {
      snapshotRefreshFor.current = null;
      return;
    }
    if (snapshotRefreshFor.current === currentId) return;
    snapshotRefreshFor.current = currentId ?? null;
    void runtime.refresh().catch(() => void 0);
  }, [automationState.snapshot?.runs, currentId, runtime]);
  const useFilteredSessions = (0, import_react10.useCallback)((selector, eq) => {
    if (useSessions === void 0) return selector({ ids: [], byId: {}, current: null });
    return useSessions((state) => selector(filterTaskSessionState(state, scheduledIds)), eq);
  }, [useSessions, scheduledIds]);
  const useFilteredWorkspaces = (0, import_react10.useCallback)((selector, eq) => {
    if (useWorkspaces === void 0) return selector({ items: [], archivedSessionIds: [] });
    return useWorkspaces((state) => selector(filterWorkspaceListState(state, scheduledIds)), eq);
  }, [useWorkspaces, scheduledIds]);
  (0, import_react10.useEffect)(() => {
    try {
      window.localStorage.setItem(NATIVE_SIDEBAR_TAB_KEY, tab);
    } catch {
    }
  }, [tab]);
  const previousCurrentId = (0, import_react10.useRef)(currentId);
  const tabFollowReady = (0, import_react10.useRef)(false);
  (0, import_react10.useEffect)(() => {
    if (!tabFollowReady.current) {
      tabFollowReady.current = true;
      previousCurrentId.current = currentId;
      return;
    }
    const previous = previousCurrentId.current;
    previousCurrentId.current = currentId;
    if (!shouldFollowSessionTab(previous, currentId)) return;
    const next = tabForSessionId(currentId ?? void 0, scheduledIds);
    const extraIds = extraTabs.map((item) => item.id);
    if (next === "channels" && (channelsReady || extraIds.includes("channels"))) setTab("channels");
    const matched = extraTabs.find((item) => currentId !== void 0 && currentId !== null && item.matchSession?.(String(currentId)) === true);
    if (matched !== void 0 && matched.id !== "schedule") setTab(matched.id);
  }, [currentId, channelsReady, extraTabs, scheduledIds]);
  const rawOfficialProps = { ...hostProps ?? {}, ...wide === void 0 ? {} : { wide } };
  const filteredOfficialProps = {
    ...rawOfficialProps,
    ...useSessions === void 0 ? {} : { useSessions: useFilteredSessions },
    ...useWorkspaces === void 0 ? {} : { useWorkspaces: useFilteredWorkspaces }
  };
  const renderOfficial = (props) => {
    if (Official === void 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(NativeTaskRail, { t, ...openSession === void 0 ? {} : { openSession }, ...useSessions === void 0 ? {} : { useSessions: useFilteredSessions }, ...useWorkspaces === void 0 ? {} : { useWorkspaces } });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(OfficialTreeGuard, { fallback: (0, import_react10.createElement)(Official, rawOfficialProps), children: (0, import_react10.createElement)(Official, props) });
  };
  if (wide === false) return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_jsx_runtime11.Fragment, { children: renderOfficial(filteredOfficialProps) });
  const foreignTabs = extraTabs.filter((item) => item.id !== "schedule");
  const visibleTab = resolveVisibleSidebarTab({
    tab,
    channelsReady,
    extraTabIds: ownedSidebarTabIds({ extraTabIds: foreignTabs.map((item) => item.id), channelsReady })
  });
  const hostedSchedule = extraTabs.find((item) => item.id === "schedule");
  const scheduleBody = hostedSchedule === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(NativeScheduleSessionList, { t, runtime, ...openSession === void 0 ? {} : { openSession }, ...openTaskSettings === void 0 ? {} : { openTaskSettings }, ...useSessions === void 0 ? {} : { useSessions }, ...useWorkspaces === void 0 ? {} : { useWorkspaces } }) : hostedSchedule.render({ ...hostProps ?? {}, openSession, open: openSession, useSessions, wide: true });
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dsh-st-shell-rail", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dsh-st-shell-tabs", role: "tablist", "aria-label": t("sidebar.tabs"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { type: "button", role: "tab", "aria-selected": visibleTab === "tasks", className: visibleTab === "tasks" ? "is-on" : void 0, onClick: () => setTab("tasks"), children: t("sidebar.tasksTab") }),
      foreignTabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { type: "button", role: "tab", "aria-selected": visibleTab === item.id, className: visibleTab === item.id ? "is-on" : void 0, onClick: () => setTab(item.id), children: item.label }, item.id)),
      channelsReady && foreignTabs.every((item) => item.id !== "channels") && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { type: "button", role: "tab", "aria-selected": visibleTab === "channels", className: visibleTab === "channels" ? "is-on" : void 0, onClick: () => setTab("channels"), children: t("sidebar.channelsTab") }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { type: "button", role: "tab", "aria-selected": visibleTab === "schedule", className: visibleTab === "schedule" ? "is-on" : void 0, onClick: () => setTab("schedule"), children: t("sidebar.tab") })
    ] }),
    visibleTab === "schedule" ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-st-shell-body", children: scheduleBody }) : foreignTabs.find((item) => item.id === visibleTab) !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-st-shell-body", children: foreignTabs.find((item) => item.id === visibleTab)?.render({ ...hostProps ?? {}, openSession, open: openSession, useSessions, wide: true }) }) : visibleTab === "channels" ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-st-shell-body", children: renderSlot?.("sidebar.channels", { ...hostProps ?? {}, openSession, open: openSession, useSessions, wide: true, skin: "native" }) }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-st-official-tree", children: renderOfficial(filteredOfficialProps) })
  ] });
}
function NativeTaskRail({
  t,
  openSession,
  useSessions,
  useWorkspaces
}) {
  const snap = useSessions === void 0 ? { ids: [], byId: {}, current: null } : useSessions((state) => state ?? { ids: [], byId: {}, current: null });
  const workspaces = useWorkspaces === void 0 ? void 0 : useWorkspaces((state) => state ?? { items: [], archivedSessionIds: [] });
  const groups = groupNativeTaskSessions(snap, workspaces, t("sidebar.ungrouped"));
  if (groups.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-st-rail-empty", children: t("sidebar.tasksEmpty") });
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-st-rail", children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("section", { className: "dsh-st-rail-group", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-st-rail-head is-static", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "dsh-st-rail-title", children: group.label }) }),
    group.sessions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "button",
      {
        type: "button",
        className: `dsh-st-rail-session${snap.current === item.id ? " is-on" : ""}`,
        onClick: () => {
          if (item.id !== void 0) openSession?.(item.id);
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { children: item.title || item.id })
      },
      item.id
    ))
  ] }, group.id || "ungrouped")) });
}

// src/client/styles.ts
var STYLE_ID = "dsh-automation-styles";
var CSS_TEXT = `
.dsh-st-shell{container-type:inline-size;min-width:0;box-sizing:border-box;max-width:1080px;width:100%;margin:0 auto;padding:0 0 32px;color:var(--dsw-alias-label-primary);font-family:var(--dsw-font-family,system-ui)}
.dsh-st-top{display:flex;flex-direction:column;align-items:stretch;gap:12px;margin-bottom:12px}
.dsh-st-heading h1,.dsh-st-top h1{margin:0;font-size:24px;line-height:32px;font-weight:600;letter-spacing:-.4px;white-space:nowrap}
.dsh-st-heading-row{display:flex;align-items:center;gap:8px;min-width:0;flex-wrap:wrap}.dsh-st-heading-links{display:inline-flex;align-items:center;gap:4px;min-width:0;flex-wrap:wrap}.dsh-st-heading-link{display:inline-flex;align-items:center;gap:5px;min-height:28px;padding:0 8px;color:var(--dsw-alias-label-secondary);background:transparent;border:1px solid var(--dsw-alias-border-l2);border-radius:7px;font-size:12px;font-weight:500;line-height:18px;text-decoration:none;white-space:nowrap}.dsh-st-heading-link:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.dsh-st-heading-link:focus-visible{outline:2px solid var(--dsw-alias-state-success-primary);outline-offset:2px}.dsh-st-heading-link svg{flex:none}
.dsh-st-heading p,.dsh-st-top p{margin:12px 0 0;max-width:none;color:var(--dsw-alias-label-tertiary);font-size:14px;line-height:22px}
.dsh-st-toolbar{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-start;gap:8px}
.dsh-st-search{flex:1;min-width:0;max-width:280px;height:32px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-3,var(--dsw-alias-bg-layer-1));color:inherit;font:inherit;font-size:13px}
.dsh-st-btn,.dsh-st-icon{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:32px;padding:0 12px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:transparent;color:inherit;font:inherit;font-size:13px;cursor:pointer;white-space:nowrap}
.dsh-st-icon{width:32px;padding:0;flex:none}
.dsh-st-btn--primary{border-color:transparent;background:var(--dsw-alias-button-primary-fill,#fff);color:var(--dsw-alias-label-primary-foreground,#111)}
.dsh-st-btn--danger{border-color:var(--dsw-alias-state-error-primary,#f85149);background:var(--dsw-alias-state-error-primary,#f85149);color:#fff}
.dsh-st-hint{margin:-6px 0 14px;padding:10px 12px;border-radius:12px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:12px}
.dsh-st-banner{display:flex;align-items:flex-start;gap:8px;margin-bottom:16px;padding:10px 14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.5}
.dsh-st-banner>span{display:inline-flex;align-items:flex-start;gap:8px}
.dsh-st-switch{width:42px;height:26px;border:0;border-radius:999px;background:rgba(120,120,128,.36);box-shadow:inset 0 0 0 1px rgba(255,255,255,.06);position:relative;cursor:pointer}
.dsh-st-switch:after{content:'';position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.28);transition:transform .16s ease}
.dsh-st-switch.is-on{background:#34c759}
.dsh-st-switch.is-on:after{transform:translateX(16px)}
.dsh-st-examples{margin-bottom:22px}
.dsh-st-examples-head h2{margin:0 0 10px;font-size:13px;font-weight:600;color:var(--dsw-alias-label-secondary)}
.dsh-st-example-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.dsh-st-example{display:flex;flex-direction:column;align-items:flex-start;gap:8px;min-height:132px;padding:14px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-2,rgba(255,255,255,.03));color:inherit;text-align:left;cursor:pointer}
.dsh-st-example:hover{border-color:rgba(75,124,255,.45)}
.dsh-st-example strong{font-size:14px}
.dsh-st-example p{margin:0;color:var(--dsw-alias-label-secondary);font-size:12px;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.dsh-st-tabs{display:flex;align-items:center;gap:16px;margin:4px 0 16px}
.dsh-st-tabs>button{padding:8px 0;border:0;border-bottom:2px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.dsh-st-tabs>button.is-on{border-bottom-color:currentColor;color:var(--dsw-alias-label-primary);font-weight:650}
.dsh-st-dropdown{position:relative;min-width:0}
.dsh-st-sort-wrap{display:flex;align-items:center;gap:6px;margin-left:auto}
.dsh-st-dropdown-btn{display:inline-flex;align-items:center;gap:4px;max-width:220px;height:28px;padding:0 10px;border:0;border-radius:999px;background:var(--dsw-alias-bg-layer-3,rgba(255,255,255,.14));color:var(--dsw-alias-label-primary,inherit);font-family:inherit;font-size:13px;line-height:20px;cursor:pointer;white-space:nowrap}
.dsh-st-dropdown-btn:hover,.dsh-st-dropdown-btn.is-open{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.18))}
.dsh-st-dropdown-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dsh-st-dropdown-chevron{flex:none;transition:transform .16s ease;transform:rotate(90deg)}
.dsh-st-dropdown-btn.is-open .dsh-st-dropdown-chevron{transform:rotate(-90deg)}
.dsh-st-dropdown-menu{box-sizing:border-box;position:absolute;right:0;top:calc(100% + 6px);z-index:30;width:max-content;min-width:180px;max-width:calc(100vw - 16px);max-height:260px;overflow-x:hidden;overflow-y:auto;padding:6px;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.12));border-radius:12px;background:var(--dsw-alias-bg-layer-3,#303033);box-shadow:var(--dsw-shadow-lv3,0 8px 24px rgba(0,0,0,.32))}
.dsh-st-dropdown-menu.is-float{position:fixed;right:auto;top:auto;z-index:1200}
.dsh-st-dropdown-menu.dsh-st-dropdown-sort{min-width:0;transition:width .12s ease}
.dsh-st-dropdown-row{box-sizing:border-box;display:flex;align-items:center;justify-content:flex-start;gap:8px;width:100%;min-height:36px;padding:6px 10px;border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary,inherit);font-family:inherit;font-size:13px;line-height:20px;cursor:pointer;text-align:left}
.dsh-st-dropdown-label-cell{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dsh-st-dropdown-row:not(.has-trailing) .dsh-st-dropdown-label-cell{flex:1}
.dsh-st-dropdown-row.has-trailing .dsh-st-dropdown-label-cell{flex:none}
.dsh-st-dropdown-spacer{min-width:0}
.dsh-st-dropdown-row:not(.has-trailing) .dsh-st-dropdown-spacer{flex:0 0 0}
.dsh-st-dropdown-row.has-trailing .dsh-st-dropdown-spacer{flex:1 1 auto}
.dsh-st-dropdown-row.has-trailing{gap:0}
.dsh-st-dropdown-row.has-trailing .dsh-st-dropdown-label-cell{margin-right:8px}
.dsh-st-dropdown-row.has-trailing .dsh-st-dropdown-default{margin-right:4px}
.dsh-st-dropdown-check{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;flex:none}
.dsh-st-dropdown-row:hover,.dsh-st-dropdown-row.is-selected{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.08));color:var(--dsw-alias-label-primary,inherit)}
.dsh-st-dropdown-default{box-sizing:border-box;display:inline-flex;align-items:center;justify-content:center;width:auto;min-width:0;height:22px;padding:0 6px;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.14));border-radius:999px;background:var(--dsw-alias-bg-layer-3,rgba(255,255,255,.14));color:var(--dsw-alias-label-primary,inherit);font-family:inherit;font-size:12px;line-height:18px;cursor:pointer;white-space:nowrap;overflow:hidden}
.dsh-st-dropdown-default:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.2))}
.dsh-st-dropdown-default:disabled,.dsh-st-dropdown-default.is-on{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.08);color:var(--dsw-alias-label-tertiary,#8b8f98);cursor:default}
.dsh-st-dropdown.dsh-st-dropdown-compact .dsh-st-dropdown-btn{font-size:12px;line-height:18px}
.dsh-st-dropdown-menu.dsh-st-dropdown-compact .dsh-st-dropdown-row{font-size:12px;line-height:18px}
.dsh-st-dropdown-menu.dsh-st-dropdown-compact .dsh-st-dropdown-default{font-size:11px;line-height:16px}
.dsh-st-sort-tick{width:16px;height:16px;flex:none}
.dsh-st-filters{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-left:auto}
.dsh-st-filters>button{height:28px;padding:0 10px;border:0;border-radius:999px;background:rgba(255,255,255,.06);color:inherit;font-size:12px}
.dsh-st-filters>button.is-on{background:rgba(255,255,255,.14)}
.dsh-st-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.dsh-st-card,.dsh-st-empty{position:relative;padding:16px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-2,rgba(255,255,255,.03))}
.dsh-st-card{cursor:pointer}
.dsh-st-card:hover{border-color:rgba(75,124,255,.45)}
.dsh-st-card h3,.dsh-st-empty h3{margin:10px 0 6px;font-size:14px;font-weight:500}
.dsh-st-card p,.dsh-st-empty p{margin:0 0 14px;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.dsh-st-card-head{display:flex;align-items:center;justify-content:space-between}
.dsh-st-card-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:12px;border-top:1px dashed var(--dsw-alias-border-l2);color:var(--dsw-alias-label-tertiary);font-size:12px}
.dsh-st-chip{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;background:rgba(255,255,255,.06)}
.dsh-st-more{width:28px;height:28px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-tertiary);cursor:pointer}
.dsh-st-menu{position:absolute;top:40px;right:12px;z-index:3;min-width:148px;padding:6px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-base);box-shadow:0 10px 30px rgba(0,0,0,.28)}
.dsh-st-menu button{display:flex;width:100%;align-items:center;gap:8px;padding:8px 10px;border:0;border-radius:8px;background:transparent;color:inherit;cursor:pointer}
.dsh-st-menu button svg{flex:none}
.dsh-st-menu button:hover{background:rgba(255,255,255,.06)}
.dsh-st-menu .is-danger{color:#ff6b6b}
.dsh-st-timeline{display:flex;flex-direction:column;gap:22px;padding-left:10px}
.dsh-st-group{position:relative;padding-left:18px}
.dsh-st-group:before{content:'';position:absolute;top:8px;bottom:0;left:4px;width:1px;background:rgba(255,255,255,.08)}
.dsh-st-group h3{margin:0 0 10px;font-size:13px;font-weight:600}
.dsh-st-run{position:relative;margin:0 0 12px}
.dsh-st-run:after{content:'';position:absolute;top:6px;left:-18px;width:7px;height:7px;border-radius:50%;background:#34c759}
.dsh-st-run.is-failed:after,.dsh-st-run.is-interrupted:after{background:#ff6b6b}
.dsh-st-run.is-queued:after,.dsh-st-run.is-skipped:after,.dsh-st-run.is-cancelled:after{background:#8b8f98}
.dsh-st-run strong{display:block;margin-bottom:4px;font-size:14px}
.dsh-st-run p{display:flex;gap:10px;margin:0;color:var(--dsw-alias-label-tertiary);font-size:12px}
.dsh-st-error{color:#ff6b6b;font-size:12px}
.dsh-st-muted{color:var(--dsw-alias-label-secondary)}
.dsh-st-mask{position:fixed;inset:0;z-index:40;display:flex;align-items:center;justify-content:center;padding:24px;overflow:auto;background:var(--dsw-alias-bg-mask-1);backdrop-filter:var(--dsw-mask-blur)}.dsh-st-flyout-root{position:absolute;inset:0;z-index:1200;overflow:visible;pointer-events:none}.dsh-st-flyout-root .dsh-st-select-menu,.dsh-st-flyout-root .dsh-st-model-select-menu{pointer-events:auto}
.dsh-st-modal,.dsh-st-modal *{box-sizing:border-box}.dsh-st-modal{display:flex;flex-direction:column;width:min(760px,calc(100vw - 48px));max-width:100%;max-height:min(92vh,900px);overflow:hidden;padding:24px;border:0;border-radius:24px;background:var(--dsw-alias-bg-layer-2);box-shadow:var(--dsw-elevation-prominent)}
.dsh-st-confirm-modal,.dsh-st-confirm-modal *{box-sizing:border-box}.dsh-st-confirm-modal{width:min(420px,calc(100vw - 48px));padding:24px;border:1px solid var(--dsw-alias-border-l2);border-radius:18px;background:var(--dsw-alias-bg-base);box-shadow:var(--dsw-shadow-lv3,0 12px 36px rgba(0,0,0,.36))}.dsh-st-confirm-modal h2{margin:0 0 10px;font-size:18px}.dsh-st-confirm-modal p{margin:0 0 8px;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:1.5}.dsh-st-confirm-modal .dsh-st-confirm-target{color:var(--dsw-alias-label-primary);font-weight:600;overflow-wrap:anywhere}
.dsh-st-modal-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
.dsh-st-modal-head h2{margin:0 0 4px;font-size:20px}
.dsh-st-modal-close{display:inline-flex;align-items:center;justify-content:center;flex:none;width:28px;height:28px;padding:0;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer}
.dsh-st-modal-close:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dsh-st-modal-close:focus-visible{outline:2px solid var(--dsw-alias-label-tertiary);outline-offset:-2px}
.dsh-st-field{display:flex;flex-direction:column;gap:6px;margin-bottom:12px;min-width:0;max-width:100%;font-size:13px}.dsh-st-field:has(.dsh-st-prompt-card){flex:1;min-height:0;margin-bottom:10px}
.dsh-st-field input,.dsh-st-field select,.dsh-st-field textarea{width:100%;padding:9px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1);color:inherit}
.dsh-st-field textarea{min-height:140px;max-width:100%;resize:vertical}
.dsh-st-inline{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.dsh-st-inline select,.dsh-st-inline input{flex:1;min-width:120px}
.dsh-st-weekdays{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}
.dsh-st-weekdays button{min-width:40px;padding:6px 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:transparent;color:inherit;cursor:pointer}
.dsh-st-weekdays button.is-on{border-color:#4b7cff;color:#4b7cff}
.dsh-st-check{display:inline-flex;align-items:center;gap:6px;margin:0 0 12px;font-size:12px}
.dsh-st-modal-actions{display:flex;justify-content:flex-end;flex:none;gap:8px;margin-top:8px}
@media(max-width:860px){.dsh-st-toolbar{flex-wrap:wrap}.dsh-st-search{flex-basis:100%;max-width:none}.dsh-st-grid,.dsh-st-example-row{grid-template-columns:1fr}.dsh-st-filters{width:100%;margin:8px 0}}
.dsh-st-select{position:relative;min-width:108px;z-index:1}.dsh-st-select.is-open{z-index:30}
.dsh-st-select.is-wide{min-width:148px}
.dsh-st-select-btn,.dsh-st-field input,.dsh-st-field textarea{border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:rgba(255,255,255,.04);color:inherit}
.dsh-st-select-btn{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:36px;width:100%;padding:0 12px;cursor:pointer}
.dsh-st-select.is-pill{width:auto;min-width:0;flex:none}
.dsh-st-select.is-pill .dsh-st-select-btn{width:auto;min-height:28px;height:28px;padding:0 8px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);font-size:13px;font-weight:500;gap:6px;white-space:nowrap}
.dsh-st-select.is-pill .dsh-st-select-btn:hover{background:rgba(255,255,255,.06);color:var(--dsw-alias-label-primary)}
.dsh-st-select.is-pill .dsh-st-select-menu,.dsh-st-select-menu.is-composer{min-width:260px}
.dsh-st-select-btn em{width:8px;height:8px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:rotate(45deg) translateY(-2px);opacity:.7}
.dsh-st-select-menu{position:absolute;top:calc(100% + 6px);left:0;z-index:30;min-width:196px;max-height:280px;overflow:auto;padding:6px;border:1px solid var(--dsw-alias-border-inverted,var(--dsw-alias-border-l2));border-radius:14px;background:var(--dsw-specific-menu,var(--dsw-alias-bg-base));box-shadow:var(--dsw-shadow-lv3,0 16px 40px rgba(0,0,0,.42))}
.dsh-st-select-menu.is-up{top:auto;bottom:calc(100% + 6px)}
.dsh-st-select-menu.is-end{left:auto;right:0}.dsh-st-select-menu.is-float{position:absolute;z-index:1200;max-height:min(280px,calc(100vh - 24px));box-sizing:border-box}
.dsh-st-menu-row{white-space:nowrap}
.dsh-st-menu-row.is-kv .dsh-st-menu-row-main{flex:none}
.dsh-st-menu-row.is-kv .dsh-st-menu-row-side{flex:1;justify-content:flex-end;min-width:0}
.dsh-st-select-menu button,.dsh-st-menu-row{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;padding:8px 10px;border:0;border-radius:10px;background:transparent;color:inherit;text-align:left;cursor:pointer;font-size:13px}
.dsh-st-menu-row-main{display:inline-flex;align-items:center;gap:8px;min-width:0}
.dsh-st-menu-row-side{display:inline-flex;align-items:center;gap:8px;color:var(--dsw-alias-label-secondary);font-size:12px}
.dsh-st-menu-row-side small{display:block;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-tertiary)}
.dsh-st-select-menu button:hover,.dsh-st-menu-row:hover,.dsh-st-menu-row.is-on{background:var(--dsw-alias-interactive-bg-hover)}
.dsh-st-tick,.dsh-st-next{width:7px;height:11px;border-right:1.6px solid currentColor;border-bottom:1.6px solid currentColor;flex:none}
.dsh-st-tick{height:12px;width:6px;transform:rotate(45deg) translateY(-2px);border-right-color:#7aa2ff;border-bottom-color:#7aa2ff}
.dsh-st-next{height:7px;transform:rotate(-45deg);opacity:.55}
.dsh-st-select-empty{padding:14px 12px;color:var(--dsw-alias-label-tertiary);font-size:12px;text-align:center}
.dsh-st-chip-btn{display:inline-flex;align-items:center;gap:6px;min-height:28px;height:28px;padding:0 8px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary);font-size:13px;font-weight:500;white-space:nowrap;cursor:pointer}
.dsh-st-chip-btn:hover{background:rgba(255,255,255,.06);color:var(--dsw-alias-label-primary)}
.dsh-st-chip-btn.is-static{cursor:default;opacity:.78}
.dsh-st-chip-btn em,.dsh-st-select.is-pill .dsh-st-select-btn em{width:6px;height:6px;margin-left:2px;opacity:.55}
.dsh-st-model-select{position:relative;z-index:1;min-width:0;flex:none}.dsh-st-model-select.is-open{z-index:30}.dsh-st-model-select-trigger{display:flex;align-items:center;gap:4px;min-width:0;max-width:260px;height:28px;padding:0 4px 0 8px;border:0;border-radius:24px;background:transparent;color:var(--dsw-alias-label-secondary);font-size:13px;font-weight:500;line-height:20px;cursor:pointer}.dsh-st-model-select-trigger:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}.dsh-st-model-select-trigger>span:first-child{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dsh-st-model-trigger-effort{flex:none;color:var(--dsw-alias-label-tertiary);white-space:nowrap}.dsh-st-model-trigger-chevron{flex:none;transition:transform .16s ease}.dsh-st-model-trigger-chevron.is-open{transform:rotate(180deg)}.dsh-st-model-select-menu{z-index:30;width:max-content;min-width:min(240px,calc(100vw - 32px));max-width:calc(100vw - 32px);max-height:min(360px,calc(100vh - 96px));overflow-y:auto;padding:4px;border:1px solid var(--dsw-alias-border-inverted,var(--dsw-alias-border-l2));border-radius:12px;background:var(--dsw-specific-menu,var(--dsw-alias-bg-base));box-shadow:var(--dsw-shadow-lv3)}.dsh-st-model-select-menu.is-float{position:absolute;z-index:1200;box-sizing:border-box}.dsh-st-model-select-menu .dsh-st-menu-row{min-height:40px;padding:0 10px;border-radius:10px;font-size:14px}.dsh-st-model-select-menu .dsh-st-menu-row-side>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.dsh-st-model-select-menu .dsh-st-menu-row.is-kv .dsh-st-menu-row-side{font-size:13px;color:var(--dsw-alias-label-tertiary)}.dsh-st-model-group+.dsh-st-model-group{margin-top:4px}.dsh-st-model-group-title{position:sticky;top:0;z-index:1;padding:5px 8px 3px;background:var(--dsw-specific-menu,var(--dsw-alias-bg-base));color:var(--dsw-alias-label-tertiary);font-size:12px;font-weight:500;line-height:18px}.dsh-st-model-option{display:flex;width:100%;min-height:38px;align-items:center;gap:8px;padding:6px 8px;border:0;border-radius:10px;background:transparent;color:var(--dsw-alias-label-primary);text-align:left;cursor:pointer}.dsh-st-model-option:hover,.dsh-st-model-option:focus-visible{background:var(--dsw-alias-interactive-bg-hover);outline:none}.dsh-st-model-option-copy{display:flex;min-width:0;flex:1;flex-direction:column}.dsh-st-model-name{overflow:hidden;font-size:14px;font-weight:500;line-height:20px;text-overflow:ellipsis;white-space:nowrap}.dsh-st-model-description{overflow:hidden;color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px;text-overflow:ellipsis;white-space:nowrap}.dsh-st-model-check{display:grid;flex:0 0 18px;place-items:center;color:var(--dsw-alias-label-primary)}.dsh-st-model-warning{margin:4px;padding:8px;border-radius:8px;background:var(--dsw-alias-interactive-bg-hover-danger,rgba(248,81,73,.1));color:var(--dsw-alias-state-error-primary,#f85149);font-size:12px;line-height:18px}.dsh-st-model-empty{padding:14px 12px;color:var(--dsw-alias-label-tertiary);font-size:12px;text-align:center}
.dsh-st-suffix{color:var(--dsw-alias-label-secondary);font-size:13px}
.dsh-st-inline input.is-narrow{width:72px;flex:none}
.dsh-st-plan-row{display:flex;align-items:flex-start;gap:16px}.dsh-st-plan-row>.dsh-st-field:first-child{flex:1}.dsh-st-plan-row>.dsh-st-concurrency{flex:0 0 120px}
.dsh-st-time{display:inline-flex;align-items:center;gap:2px;min-height:36px;padding:0 8px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:rgba(255,255,255,.04)}
.dsh-st-time .dsh-st-select{min-width:48px}
.dsh-st-time .dsh-st-select-btn{width:auto;min-height:32px;padding:0 6px;border:0;background:transparent}
.dsh-st-time-sep{padding:0 2px;color:var(--dsw-alias-label-secondary)}
.dsh-st-inline input[type=date]{min-width:148px;max-width:170px}
.dsh-st-weekdays button{min-width:52px;height:34px;border-radius:999px;border:1px solid var(--dsw-alias-border-l2);background:transparent}
.dsh-st-weekdays button.is-on{border-color:transparent;background:#fff;color:#111}
.dsh-st-prompt-card{display:flex;flex-direction:column;flex:1;min-height:160px;max-width:100%;border:1px solid var(--dsw-alias-border-l2);border-radius:22px;overflow:visible;background:rgba(255,255,255,.03)}
.dsh-st-prompt-card textarea{flex:1;width:100%;max-width:100%;min-height:140px;border:0;background:transparent;padding:16px 18px;font-size:14px;line-height:1.65;resize:none}
.dsh-st-composer,.dsh-st-composer-left,.dsh-st-composer-right{display:flex;align-items:center;flex-wrap:nowrap}
.dsh-st-composer{justify-content:space-between;gap:8px;padding:2px 8px 10px;border-top:0}
.dsh-st-composer-left,.dsh-st-composer-right{gap:2px;min-width:0}
.dsh-st-composer .dsh-st-select{min-width:0}
.dsh-st-composer svg{flex:none}
.dsh-st-menu-split{height:1px;margin:6px 8px;background:rgba(255,255,255,.08)}
.dsh-st-subdialog{margin:0 0 12px;padding:12px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:rgba(255,255,255,.03)}
.dsh-st-subdialog>strong{display:block;margin:0 0 8px;font-size:13px}
.dsh-st-rail-views{display:flex;flex:none;gap:3px;margin:16px 8px 10px;padding:2px;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.1));border-radius:9px;background:var(--dsw-alias-bg-layer-2,rgba(255,255,255,.035))}
.dsh-st-rail-views button{flex:1;appearance:none;border:1px solid transparent;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary,#9ca3af);padding:3px 7px;font-size:12px;line-height:18px;cursor:pointer;transition:background .16s ease,border-color .16s ease,color .16s ease,box-shadow .16s ease}
.dsh-st-rail-views button:hover{color:var(--dsw-alias-label-primary,inherit)}
.dsh-st-rail-views button.is-on{border-color:var(--dsw-alias-border-l2,rgba(255,255,255,.18));background:var(--dsw-alias-bg-layer-3,rgba(255,255,255,.15));color:var(--dsw-alias-label-primary,#fff);font-weight:650;box-shadow:0 1px 3px rgba(0,0,0,.34),inset 0 1px rgba(255,255,255,.06)}
.dsh-st-overview{display:flex;flex-direction:column;flex:1;min-height:0;overflow-y:auto;padding:2px 8px 14px}
.dsh-st-overview-head{display:flex;flex:none;align-items:center;justify-content:space-between;gap:8px;height:36px;min-height:36px;margin-bottom:4px;padding:6px 0}
.dsh-st-overview-title{display:flex;align-items:baseline;min-width:0;gap:6px;color:var(--dsw-alias-label-tertiary,#81858C)}
.dsh-st-overview-title strong{font-size:14px;font-weight:400;line-height:20px}
.dsh-st-overview-title span{display:inline-grid;place-items:center;min-width:18px;height:18px;padding:0 5px;border-radius:999px;background:var(--dsw-alias-bg-layer-3,rgba(255,255,255,.1));color:var(--dsw-alias-label-tertiary,#8b8f98);font-size:11px;line-height:18px}
.dsh-st-overview-sort{display:flex;align-items:center}
.dsh-st-overview-row{position:relative;width:100%;min-height:56px;margin:0 0 8px;border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.1));border-radius:9px;background:var(--dsw-alias-bg-layer-2,rgba(255,255,255,.035));color:var(--dsw-alias-label-primary,inherit);box-shadow:inset 0 1px rgba(255,255,255,.025);transition:background .14s ease,border-color .14s ease;overflow:hidden}
.dsh-st-overview-row:hover{border-color:var(--dsw-alias-border-inverted,rgba(255,255,255,.18));background:var(--dsw-alias-bg-layer-3,rgba(255,255,255,.06))}
.dsh-st-overview-open{display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:18px 18px;align-items:center;gap:4px 8px;width:100%;min-height:56px;padding:8px 9px;border:0;background:transparent;color:inherit;text-align:left;cursor:pointer}
.dsh-st-overview-open:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#4c8dff);outline-offset:-2px}
.dsh-st-overview-open:disabled{cursor:default}
.dsh-st-overview-copy{display:contents}
.dsh-st-overview-name{box-sizing:border-box;grid-column:1/3;grid-row:1;min-width:0;padding-right:44px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:13px;line-height:18px;font-weight:580}
.dsh-st-overview-schedule{display:inline-flex;grid-column:1;grid-row:2;align-items:center;gap:5px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--dsw-alias-label-tertiary,#8b8f98);font-size:12px;line-height:16px}
.dsh-st-overview-schedule svg{flex:none}
.dsh-st-overview-schedule>span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dsh-st-overview-next{display:inline-flex;grid-column:2;grid-row:2;justify-self:end;flex:none;min-width:0;align-items:center;color:var(--dsw-alias-label-tertiary,#8b8f98);line-height:16px;white-space:nowrap}
.dsh-st-overview-next strong{color:var(--dsw-alias-label-secondary,#b6bac2);font-size:12px;font-weight:600;line-height:16px;white-space:nowrap}
.dsh-st-overview-row:not(.is-paused) .dsh-st-overview-next strong{color:#45d483}
.dsh-st-overview-toggle{position:absolute;top:3px;right:2px;z-index:1;display:inline-flex;align-items:center;justify-content:center;width:44px;height:28px;cursor:pointer}
.dsh-st-overview-toggle input{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none}
.dsh-st-overview-toggle>span{position:relative;width:28px;height:16px;border-radius:999px;background:var(--dsw-alias-bg-layer-3,rgba(255,255,255,.14));box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l2,rgba(255,255,255,.12));transition:background .14s ease}
.dsh-st-overview-toggle>span::after{position:absolute;top:2px;left:2px;width:12px;height:12px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.32);content:"";transition:transform .14s ease}
.dsh-st-overview-toggle input:checked+span{background:#32cd8f;box-shadow:none}
.dsh-st-overview-toggle input:checked+span::after{transform:translateX(12px)}
.dsh-st-overview-toggle input:focus-visible+span{outline:2px solid var(--dsw-alias-state-business-primary,#4c8dff);outline-offset:2px}
.dsh-st-overview-toggle:has(input:disabled){cursor:wait;opacity:.62}
.dsh-st-rail{box-sizing:border-box;height:100%;overflow:auto;padding:4px var(--dsh-sidebar-inline-padding,12px) 18px 8px;color:inherit;scrollbar-gutter:stable}
.dsh-st-rail-empty{padding:16px 10px;color:var(--dsw-alias-label-tertiary,#8b8f98);font-size:12px}
.dsh-st-rail-group{margin:0 0 8px}
.dsh-st-rail-head,.dsh-st-rail-session{display:flex;align-items:center;gap:8px;width:100%;border:0;background:transparent;color:inherit;text-align:left;cursor:pointer}
.dsh-st-rail-head{min-height:32px;padding:4px 8px;border-radius:8px;font-size:13px;font-weight:600}
.dsh-st-rail-session{min-height:28px;padding:3px 8px 3px 28px;border-radius:8px;color:var(--dsw-alias-label-secondary,#9ca39f);font-size:12px}
.dsh-st-rail-head:hover,.dsh-st-rail-session:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.dsh-st-rail-folder{display:grid;place-items:center;width:16px;height:20px;flex:none;opacity:.8}
.dsh-st-rail-title{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dsh-st-rail-session span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dsh-st-rail-dot{width:6px;height:6px;margin-left:auto;border-radius:50%;background:#34c759;flex:none}.dsh-st-run-dot{flex:none;color:var(--dsw-static-deepseek-450,#4c8dff)}.dsh-st-run-dot-cell{fill:currentColor;opacity:.15;animation:dsh-st-run-chase 1s infinite}@keyframes dsh-st-run-chase{0%,12.4%{opacity:1}12.5%,24.9%{opacity:.6}25%,37.4%{opacity:.35}37.5%,100%{opacity:.15}}
.dsh-st-shell-rail{display:flex;flex-direction:column;min-height:0;flex:1;height:100%;overflow:hidden}
.dsh-st-shell-tabs{display:flex;flex:none;gap:18px;padding:6px 12px 0;border-bottom:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.08))}
.dsh-st-shell-tabs button{appearance:none;border:0;background:transparent;color:var(--dsw-alias-label-secondary,#8b8f98);padding:8px 0 9px;font-size:13px;cursor:pointer}
.dsh-st-shell-tabs button.is-on{color:var(--dsw-alias-label-primary,inherit);box-shadow:inset 0 -2px 0 currentColor}
.dsh-st-shell-body{display:flex;min-height:0;flex:1;overflow:hidden}
.dsh-st-shell-body>*{min-width:0;flex:1}.dsh-st-official-tree{display:flex;min-height:0;flex:1;overflow:hidden}.dsh-st-official-tree>*{min-width:0;flex:1}
.dsh-st-rail-head.is-static{cursor:default;font-weight:600}
.dsh-st-rail-session.is-on{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.dsh-st-n,.dsh-st-n *{box-sizing:border-box}.dsh-st-n{box-sizing:border-box;display:flex;flex:1;min-width:0;max-width:100%;min-height:0;flex-direction:column;padding:0;padding-right:var(--dsh-sidebar-inline-padding,12px);color:var(--dsw-alias-label-primary,inherit);font:14px/20px inherit;overflow:hidden}.dsh-st-n-toolbar{box-sizing:border-box;flex:none;height:36px;margin:2px -4px 4px 0;padding-left:4px;display:flex;justify-content:flex-end;align-items:center;gap:4px;overflow:visible;position:relative;z-index:2;color:var(--dsw-alias-label-tertiary,#81858C);border-radius:12px}.dsh-st-n-head-label{white-space:nowrap;min-width:0;max-width:45%;flex:none;line-height:20px;font-size:14px;overflow:hidden;transition:max-width .18s var(--ds-ease-in-out,ease),margin-right .18s var(--ds-ease-in-out,ease),opacity .12s var(--ds-ease-in-out,ease),transform .18s var(--ds-ease-in-out,ease),visibility 0s linear}.dsh-st-n-toolbar.is-search .dsh-st-n-head-label{opacity:0;visibility:hidden;max-width:0;margin-right:-4px;transform:translate(-4px);transition-delay:0s,0s,0s,0s,.18s}.dsh-st-n-search-slot{box-sizing:border-box;min-width:28px;max-width:28px;transition:max-width .18s var(--ds-ease-in-out,ease);flex:none;align-items:center;margin-left:auto;display:flex;position:relative;z-index:2}.dsh-st-n-toolbar.is-search .dsh-st-n-search-slot{flex:1;min-width:0;max-width:100%}.dsh-st-n-search{box-sizing:border-box;cursor:text;width:100%;height:28px;color:var(--dsw-alias-label-secondary);transition:width .18s var(--ds-ease-in-out,ease),padding .18s var(--ds-ease-in-out,ease),border-color .18s var(--ds-ease-in-out,ease);background:transparent;border:none;border-radius:50%;flex:none;align-items:center;margin:0;padding:0;display:flex;overflow:hidden}.dsh-st-n-toolbar.is-search .dsh-st-n-search{border:1px solid var(--dsw-alias-border-l2,rgba(255,255,255,.10));width:calc(100% + 4px);height:30px;border-radius:10px;margin-inline:-2px;padding:0 4px 0 0}.dsh-st-n-search-btn,.dsh-st-n-head-btn{cursor:pointer;width:28px;height:28px;min-width:28px;min-height:28px;position:relative;z-index:1;color:var(--dsw-alias-label-secondary);background:transparent;border:none;border-radius:50%;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}.dsh-st-n-toolbar.is-search .dsh-st-n-search-btn{width:28px;height:30px}.dsh-st-n-search-btn:hover,.dsh-st-n-head-btn:hover,.dsh-st-n-head-btn.is-on{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,inherit)}.dsh-st-n-toolbar.is-search .dsh-st-n-search-btn:hover{background:transparent}.dsh-st-n-head-acts{opacity:1;visibility:visible;max-width:32px;transition:max-width .18s var(--ds-ease-in-out,ease),opacity .12s var(--ds-ease-in-out,ease),transform .18s var(--ds-ease-in-out,ease),visibility 0s linear;flex:none;align-items:center;gap:4px;display:flex;overflow:visible;position:relative}.dsh-st-n-toolbar.is-search .dsh-st-n-head-acts{opacity:0;visibility:hidden;pointer-events:none;max-width:0;transform:translate(4px);transition-delay:0s,0s,0s,.18s}.dsh-st-n-head-filter{position:relative}.dsh-st-n-search-input{display:none;opacity:0;pointer-events:none;width:0;min-width:0;flex:none;color:var(--dsw-alias-label-primary,inherit);transition:opacity .12s var(--ds-ease-in-out,ease);background:transparent;border:none;outline:none;flex:1;font-size:13px;line-height:18px}.dsh-st-n-toolbar.is-search .dsh-st-n-search-input{display:block;opacity:1;pointer-events:auto;margin-left:-2px;width:auto;flex:1;min-width:0}.dsh-st-n-search-input::placeholder{color:var(--dsw-alias-label-tertiary,#81858C)}.dsh-st-n-search-clear{cursor:pointer;width:24px;height:24px;color:var(--dsw-alias-label-secondary);background:transparent;border:none;border-radius:50%;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex}.dsh-st-n-search-clear:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}@media (prefers-reduced-motion:reduce){.dsh-st-n-head-label,.dsh-st-n-search-slot,.dsh-st-n-search,.dsh-st-n-head-acts,.dsh-st-n-search-input{transition:none}}.dsh-st-n-filter-menu{position:absolute;right:0;top:calc(100% + 6px);z-index:30;min-width:196px;padding:8px 6px;border:1px solid var(--dsw-alias-border-inverted,rgba(255,255,255,.12));border-radius:12px;background:var(--dsw-specific-menu,#1c2128);box-shadow:var(--dsw-shadow-lv3,0 8px 24px rgba(0,0,0,.36))}.dsh-st-n-filter-label{padding:6px 10px 4px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#81858C)}.dsh-st-n-filter-split{height:1px;margin:6px 8px;background:var(--dsw-alias-border-l2,rgba(255,255,255,.1))}.dsh-st-n-filter-menu button{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;min-height:36px;padding:6px 10px;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-primary,inherit);font:14px/20px inherit;cursor:pointer;text-align:left}.dsh-st-n-filter-menu button:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}.dsh-st-n-filter-tick{width:16px;height:16px;flex:none}.dsh-st-n-tree{flex:1;min-width:0;max-width:100%;min-height:0;overflow-x:hidden;overflow-y:auto;padding:0 0 16px;user-select:none}.dsh-st-n-empty{padding:14px 8px;color:var(--dsw-alias-label-tertiary,#8b8f98);font-size:12px}.dsh-st-n-group{min-width:0;max-width:100%}.dsh-st-n-row,.dsh-st-n-sess{display:flex;align-items:center;max-width:100%;border-radius:8px;padding:0 8px 0 12px;cursor:pointer;border:0;background:transparent;color:var(--dsw-alias-label-primary,inherit);text-align:left;font:14px/20px inherit}.dsh-st-n-row{height:34px;gap:6px}.dsh-st-n-sess{height:32px;gap:0;position:relative;width:100%;appearance:none}.dsh-st-n-row:hover,.dsh-st-n-sess:hover,.dsh-st-n-sess.is-on,.dsh-st-n-sess.is-menu{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}.dsh-st-n-slot{flex:none;width:16px;height:20px;display:inline-flex;align-items:center;justify-content:center}.dsh-st-n-folder{color:var(--dsw-alias-label-secondary,#9ca39f)}.dsh-st-n-lead{color:var(--dsw-alias-label-tertiary,#81858C)}.dsh-st-n-corner{color:var(--dsw-alias-label-caption,#ADB2B8);width:8px}.dsh-st-n-title{min-width:0;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:14px;line-height:20px}.dsh-st-n-sess .dsh-st-n-title{margin:0 6px 0 4px}.dsh-st-n-time{flex:none;font-size:12px;line-height:20px;color:var(--dsw-alias-label-tertiary,#81858C);white-space:nowrap}.dsh-st-n-acts{flex:none;display:none;align-items:center;gap:12px}.dsh-st-n-row:hover .dsh-st-n-acts,.dsh-st-n-sess:hover .dsh-st-n-acts,.dsh-st-n-row.is-menu .dsh-st-n-acts,.dsh-st-n-sess.is-menu .dsh-st-n-acts{display:inline-flex}.dsh-st-n-sess:hover .dsh-st-n-time,.dsh-st-n-sess.is-menu .dsh-st-n-time{display:none}.dsh-st-n-ico{display:inline-flex;align-items:center;justify-content:center;width:16px;height:16px;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-tertiary,#81858C);padding:0;cursor:pointer}.dsh-st-n-ico:hover{color:var(--dsw-alias-label-primary,inherit)}.dsh-st-n-menu.is-float{position:fixed;z-index:4000;right:auto;top:auto}.dsh-st-n-menu{position:absolute;right:8px;top:calc(100% + 4px);z-index:1100;min-width:218px;max-width:360px;box-sizing:border-box;padding:4px;display:flex;flex-direction:column;border:1px solid var(--dsw-alias-border-inverted,rgba(255,255,255,.12));border-radius:12px;background:var(--dsw-specific-menu,#1c2128);box-shadow:var(--dsw-shadow-lv3,0 8px 24px rgba(0,0,0,.36))}.dsh-st-n-menu button{display:flex;align-items:center;gap:8px;width:100%;min-height:40px;padding:8px 10px;border:0;border-radius:10px;background:transparent;cursor:pointer;font-size:14px;line-height:22px;color:var(--dsw-alias-label-primary,inherit);text-align:left}.dsh-st-n-menu button:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}.dsh-st-n-mi{display:inline-flex;flex:none;width:16px;height:16px;align-items:center;justify-content:center;color:var(--dsw-alias-label-tertiary,#81858C)}.dsh-st-n-menu button.danger{color:var(--dsw-alias-state-error-primary,#f85149)}.dsh-st-n-menu button.danger .dsh-st-n-mi{color:inherit}.dsh-st-n-menu button.danger:hover{background:var(--dsw-alias-interactive-bg-hover-danger,rgba(248,81,73,.12))}.dsh-st-n-hover{position:fixed;z-index:4100;min-width:188px;max-width:280px;padding:12px 14px;border:1px solid var(--dsw-alias-border-inverted,rgba(255,255,255,.12));border-radius:12px;background:var(--dsw-specific-menu,#1c2128);box-shadow:var(--dsw-shadow-lv3,0 8px 24px rgba(0,0,0,.36));color:var(--dsw-alias-label-primary,inherit)}.dsh-st-n-hover-title{font-size:14px;line-height:20px;font-weight:500}.dsh-st-n-hover-time{margin-top:4px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-tertiary,#81858C)}.dsh-st-n-hover-state{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:12px;line-height:18px;color:var(--dsw-alias-label-secondary,#9ca39f)}.dsh-st-n-hover-dot{width:8px;height:8px;border-radius:50%;background:#34c759;flex:none}.dsh-st-n-hover-dot.is-run{background:#4c8dff}.dsh-st-n-rename{flex:1;min-width:0;margin:0 6px 0 4px;border:1px solid var(--dsw-alias-border-l2);border-radius:4px;background:var(--dsw-alias-button-elevated-fill,rgba(255,255,255,.04));color:inherit;font:inherit;padding:0 2px}
.dsh-st-n-row{padding-left:8px}
.dsh-st-n-row.is-menu{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06))}
.dsh-st-overview-sort .dsh-st-n-head-btn.is-open{background:var(--dsw-alias-interactive-bg-hover,rgba(255,255,255,.06));color:var(--dsw-alias-label-primary,inherit)}
.dsh-st-n-row[aria-expanded="true"].has-current-session .dsh-st-n-folder{color:var(--dsw-static-deepseek-450,#4c8dff)}
.dsh-st-n-sess:focus{outline:none}.dsh-st-n-sess:focus-visible:not(.is-on){box-shadow:inset 0 0 0 2px var(--dsw-alias-state-business-primary,#4c8dff)}
.dsh-st-n-row>.dsh-st-n-acts{display:inline-flex;opacity:0;visibility:hidden;pointer-events:none}
.dsh-st-n-row:hover>.dsh-st-n-acts,.dsh-st-n-row:focus-within>.dsh-st-n-acts,.dsh-st-n-row.is-menu>.dsh-st-n-acts{opacity:1;visibility:visible;pointer-events:auto}
.dsh-st-n-dialog-actions{display:flex;justify-content:flex-end;gap:8px}
.dsh-st-n-dialog-copy{margin:0;color:var(--dsw-alias-label-secondary);font-size:14px;line-height:22px}
.dsh-st-n-dialog-status{margin-top:12px;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}
.dsh-st-n-dialog-error{margin-top:12px;color:var(--dsw-alias-state-error-primary,#f85149);font-size:13px;line-height:20px}
.dsh-st-n-danger-button{color:var(--dsw-alias-state-error-primary,#f85149)!important}
.dsh-st-n-danger-button:hover{background:var(--dsw-alias-interactive-bg-hover-danger,rgba(248,81,73,.12))!important}
`;
function installStyles() {
  const existing = document.getElementById(STYLE_ID);
  if (existing instanceof HTMLStyleElement) {
    existing.textContent = CSS_TEXT;
    return () => void 0;
  }
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS_TEXT;
  document.head.append(style);
  return () => {
    style.remove();
  };
}

// src/client/settings-navigation.ts
function pickSettingsSectionButton(buttons, labels) {
  for (const label of labels) {
    const target = label.trim();
    if (target === "") continue;
    const match = buttons.find((button) => button.textContent?.replace(/\s+/g, " ").trim() === target);
    if (match !== void 0) return match;
  }
  return void 0;
}
function pickSettingsLauncher(buttons) {
  const named = buttons.find((button) => {
    const label = `${button.textContent ?? ""} ${button.getAttribute("aria-label") ?? ""}`.trim();
    return /(^|\s)(设置|settings)(\s|$)/i.test(label);
  });
  return named ?? (buttons.length === 1 ? buttons[0] : void 0);
}
var cancelPendingNavigation;
function openSettingsSection(labels, onSelected, onMissing) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    onMissing?.();
    return;
  }
  const launchers = [...document.querySelectorAll('button[aria-haspopup="dialog"]')];
  const launcher = pickSettingsLauncher(launchers);
  const dialogOpen = document.querySelector('[role="dialog"]') !== null;
  if (!dialogOpen && launcher === void 0) {
    onMissing?.();
    return;
  }
  cancelPendingNavigation?.();
  if (!dialogOpen) launcher?.click();
  let frame;
  let finished = false;
  const observer = new MutationObserver(() => {
    schedule();
  });
  const cleanup = () => {
    if (finished) return;
    finished = true;
    observer.disconnect();
    window.clearTimeout(timeout);
    if (frame !== void 0) window.cancelAnimationFrame(frame);
    if (cancelPendingNavigation === cleanup) cancelPendingNavigation = void 0;
  };
  const select = () => {
    const buttons = [...document.querySelectorAll('[role="dialog"] nav button')];
    const target = pickSettingsSectionButton(buttons, labels);
    if (target === void 0) return false;
    cleanup();
    target.click();
    onSelected?.();
    return true;
  };
  const schedule = () => {
    if (finished || frame !== void 0) return;
    frame = window.requestAnimationFrame(() => {
      frame = void 0;
      select();
    });
  };
  const timeout = window.setTimeout(() => {
    if (select()) return;
    cleanup();
    onMissing?.();
  }, 1500);
  observer.observe(document.body, { childList: true, subtree: true });
  cancelPendingNavigation = cleanup;
  schedule();
}

// src/client/plugin-update-ui.ts
var UPDATE_HEADER = "x-michengai-plugin-update";
var STYLE_ID2 = "michengai-plugin-update-ui";
var CSS = `
.mpi-version{margin-left:8px;color:var(--dsw-alias-label-tertiary,#9da1aa);font-family:inherit;font-size:12px;font-weight:500;line-height:18px;letter-spacing:0;white-space:nowrap;vertical-align:baseline}.mpi-check{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:28px;padding:0 8px;border:1px solid var(--dsw-alias-border-l2,#4b4d52);border-radius:7px;background:transparent;color:var(--dsw-alias-label-secondary,#b8bbc2);font:inherit;font-size:12px;font-weight:500;line-height:18px;white-space:nowrap;cursor:pointer}.mpi-check:hover{background:var(--dsw-alias-interactive-bg-hover,#3a3b3f);color:var(--dsw-alias-label-primary,#fff)}.mpi-check:focus-visible,.mpi-action:focus-visible,.mpi-dialog-close:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary,#4f8cff);outline-offset:2px}.mpi-icon{display:inline-flex;flex:0 0 auto;width:16px;height:16px;align-items:center;justify-content:center;pointer-events:none}.mpi-icon svg{display:block;width:16px;height:16px}
.mpi-overlay{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(0,0,0,.62)}.mpi-dialog{position:relative;box-sizing:border-box;width:min(680px,100%);max-height:calc(100vh - 48px);overflow:auto;border:1px solid var(--dsw-alias-border-l2,#4b4d52);border-radius:14px;padding:22px;background:var(--dsw-alias-bg-layer-2,var(--dsw-specific-menu,#202124));color:var(--dsw-alias-label-primary,#fff);box-shadow:var(--dsw-shadow-lv3,0 16px 48px rgba(0,0,0,.24));font-family:inherit}.mpi-head{display:flex;align-items:center;justify-content:space-between;gap:12px}.mpi-dialog h2{margin:0;font-size:18px;line-height:26px}.mpi-dialog-close{display:inline-flex;flex:0 0 28px;width:28px;height:28px;align-items:center;justify-content:center;padding:0;border:0;border-radius:8px;background:transparent;color:var(--dsw-alias-label-secondary,#b8bbc2);cursor:pointer}.mpi-dialog-close:hover{background:var(--dsw-alias-interactive-bg-hover,#3a3b3f);color:var(--dsw-alias-label-primary,#fff)}.mpi-intro{margin:8px 0 18px;color:var(--dsw-alias-label-secondary,#c2c4ca);font-size:13px;line-height:20px}.mpi-meta{display:grid;grid-template-columns:max-content minmax(0,1fr);gap:8px 18px;margin:0 0 16px;font-size:12px;line-height:18px}.mpi-meta dt{color:var(--dsw-alias-label-secondary,#c2c4ca)}.mpi-meta dd{margin:0;font-family:ui-monospace,SFMono-Regular,Consolas,monospace}.mpi-status{margin:0 0 18px;border-radius:7px;padding:12px 14px;background:var(--dsw-alias-bg-layer-3,var(--dsw-specific-menu-item-hover,#252527));font-size:13px;font-weight:600;line-height:20px}.mpi-status[data-kind=error]{color:var(--dsw-alias-state-error-primary,#ff6464)}.mpi-status[data-kind=success]{color:var(--dsw-alias-state-success-primary,#36d67a)}.mpi-manual{border-top:1px solid var(--dsw-alias-border-l2,#4b4d52);padding-top:16px}.mpi-manual h3{margin:0 0 6px;font-size:14px;line-height:20px}.mpi-manual p{margin:0 0 10px;color:var(--dsw-alias-label-secondary,#c2c4ca);font-size:12px;line-height:18px}.mpi-command{display:flex;align-items:center;gap:8px;border:1px solid var(--dsw-alias-border-l2,#4b4d52);border-radius:7px;padding:10px;background:var(--dsw-alias-bg-layer-3,var(--dsw-specific-menu-item-hover,#252527))}.mpi-command code{min-width:0;flex:1;overflow:auto;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:12px;line-height:18px;white-space:nowrap}.mpi-actions{display:flex;align-items:center;justify-content:flex-end;gap:12px;margin-top:18px}.mpi-actions-group{display:flex;gap:8px}.mpi-action{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:32px;border:1px solid var(--dsw-alias-border-l2,#4b4d52);border-radius:7px;padding:6px 10px;background:transparent;color:inherit;font:inherit;font-size:12px;cursor:pointer}.mpi-action:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover,#414247)}.mpi-action:disabled{cursor:not-allowed;opacity:.55}.mpi-primary{border-color:var(--dsw-alias-state-business-primary,#4f8cff);background:var(--dsw-alias-state-business-primary,#4f8cff);color:#fff}.mpi-progress{height:4px;margin-top:10px;overflow:hidden;border-radius:99px;background:var(--dsw-alias-border-l2,#4b4d52)}.mpi-progress::after{display:block;width:32%;height:100%;background:var(--dsw-alias-state-business-primary,#4f8cff);content:'';animation:mpi-wave 1.15s ease-in-out infinite}@keyframes mpi-wave{from{transform:translateX(-110%)}to{transform:translateX(330%)}}@media(max-width:560px){.mpi-overlay{padding:10px}.mpi-dialog{max-height:calc(100vh - 20px);padding:16px}.mpi-actions{align-items:stretch}.mpi-actions-group{justify-content:flex-end;flex-wrap:wrap}.mpi-meta{grid-template-columns:1fr;gap:2px}.mpi-meta dd{margin-bottom:6px}}
`;
var ZH = {
  check: "\u68C0\u67E5\u66F4\u65B0",
  update: "\u66F4\u65B0",
  close: "\u5173\u95ED",
  recheck: "\u91CD\u65B0\u68C0\u67E5",
  auto: "\u81EA\u52A8\u66F4\u65B0",
  updating: "\u6B63\u5728\u66F4\u65B0\u2026",
  copy: "\u590D\u5236\u547D\u4EE4",
  copied: "\u5DF2\u590D\u5236",
  copyFailed: "\u590D\u5236\u5931\u8D25",
  checking: "\u6B63\u5728\u68C0\u67E5\u66F4\u65B0\u2026",
  latest: "\u5DF2\u662F\u6700\u65B0\u7248\u672C",
  found: "\u53D1\u73B0\u65B0\u7248\u672C",
  failed: "\u68C0\u67E5\u66F4\u65B0\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002",
  current: "\u8FD0\u884C\u7248\u672C",
  latestLabel: "\u6700\u65B0\u7248\u672C",
  profile: "\u76EE\u6807 profile",
  unknown: "\u672A\u77E5",
  manual: "\u624B\u5DE5\u66F4\u65B0",
  manualHint: "\u81EA\u52A8\u66F4\u65B0\u5931\u8D25\u65F6\uFF0C\u53EF\u5728\u5F53\u524D DSH \u7EC8\u7AEF\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF0C\u5B8C\u6210\u540E\u91CD\u542F DSH Web\u3002",
  intro: "\u4EC5\u68C0\u67E5\u5E76\u66F4\u65B0\u5F53\u524D\u63D2\u4EF6\uFF0C\u4E0D\u4F1A\u8054\u52A8\u5B89\u88C5\u5176\u4ED6\u63D2\u4EF6\u3002",
  restart: "\u66F4\u65B0\u5B8C\u6210\uFF0C\u8BF7\u91CD\u542F DSH Web\u3002",
  restarting: "\u66F4\u65B0\u5B8C\u6210\uFF0C\u6B63\u5728\u91CD\u542F DSH Desktop\u2026",
  unavailable: "\u5F53\u524D\u73AF\u5883\u4E0D\u652F\u6301\u81EA\u52A8\u66F4\u65B0\uFF0C\u8BF7\u4F7F\u7528\u624B\u5DE5\u66F4\u65B0\u547D\u4EE4\u3002"
};
var EN = {
  check: "Check for updates",
  update: "Update",
  close: "Close",
  recheck: "Check again",
  auto: "Update automatically",
  updating: "Updating\u2026",
  copy: "Copy command",
  copied: "Copied",
  copyFailed: "Copy failed",
  checking: "Checking for updates\u2026",
  latest: "You are up to date",
  found: "New version available",
  failed: "Could not check for updates. Try again later.",
  current: "Running version",
  latestLabel: "Latest version",
  profile: "Target profile",
  unknown: "Unknown",
  manual: "Manual update",
  manualHint: "If automatic update fails, run this command in the current DSH terminal, then restart DSH Web.",
  intro: "Only this plugin is checked and updated. Other plugins are not changed.",
  restart: "Update complete. Restart DSH Web.",
  restarting: "Update complete. Restarting DSH Desktop\u2026",
  unavailable: "Automatic update is unavailable. Use the manual command."
};
function strings() {
  const lang = document.documentElement.lang.toLowerCase();
  const settings = document.querySelector('[role="dialog"]')?.textContent ?? "";
  return lang.startsWith("en") || settings.includes("Settings") && !settings.includes("\u8BBE\u7F6E") ? EN : ZH;
}
function ensureStyle() {
  if (document.getElementById(STYLE_ID2) !== null) return;
  const style = document.createElement("style");
  style.id = STYLE_ID2;
  style.textContent = CSS;
  (document.head ?? document.documentElement).append(style);
}
function validPayload(value) {
  if (value === null || typeof value !== "object") return false;
  const item = value;
  return typeof item.packageName === "string" && typeof item.currentVersion === "string" && typeof item.updateAvailable === "boolean" && typeof item.profileName === "string" && typeof item.canAutoUpdate === "boolean" && typeof item.latestCheckFailed === "boolean" && (item.latestVersion === void 0 || typeof item.latestVersion === "string");
}
async function requestStatus(endpoint, method, signal) {
  const signalOption = signal === void 0 ? {} : { signal };
  const response = await fetch(endpoint, method === "GET" ? { cache: "no-store", ...signalOption } : {
    method: "POST",
    headers: { "content-type": "application/json", [UPDATE_HEADER]: "1" },
    body: "{}",
    ...signalOption
  });
  const value = await response.json();
  if (!response.ok || !validPayload(value)) throw new Error(typeof value.error === "string" ? value.error : strings().failed);
  return value;
}
function manualPluginUpdateCommand(profileName, packageName, version) {
  const profile = profileName.trim() === "" ? "" : ` --profile ${profileName.trim()}`;
  return `dsh plugin${profile} add ${packageName}@${version} --registry=https://registry.npmjs.org/`;
}
function handlePluginUpdateEscape(event, close) {
  if (event.key !== "Escape") return false;
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
  close();
  return true;
}
function observePluginUpdate(options) {
  if (typeof document === "undefined" || document.body === null) return () => {
  };
  ensureStyle();
  const controller = new AbortController();
  let payload;
  let overlay;
  let frame;
  const setButtonContent = (button, label, iconName) => {
    const icon = options.createIcon(iconName);
    icon.classList.add("mpi-icon");
    icon.setAttribute("aria-hidden", "true");
    const text = document.createElement("span");
    text.dataset.mpiLabel = "";
    text.textContent = label;
    button.replaceChildren(icon, text);
  };
  const setButtonLabel = (button, label) => {
    const text = button.querySelector("[data-mpi-label]");
    if (text === null) button.textContent = label;
    else text.textContent = label;
  };
  const applyControls = () => {
    const row = document.querySelector(options.titleRowSelector);
    if (row === null) return;
    const heading = row.querySelector("h1,h2");
    if (heading !== null && payload !== void 0) {
      let version = heading.querySelector(`.mpi-version[data-package="${options.packageName}"]`);
      if (version === null) {
        version = document.createElement("span");
        version.className = "mpi-version";
        version.dataset.package = options.packageName;
        heading.append(version);
      }
      const versionLabel = `v${payload.currentVersion}`;
      if (version.textContent !== versionLabel) version.textContent = versionLabel;
    }
    const links = row.querySelector(options.linksSelector);
    if (links === null || links.querySelector(`[data-mpi-check="${options.packageName}"]`) !== null) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mpi-check";
    button.dataset.mpiCheck = options.packageName;
    setButtonContent(button, strings().check, "refresh");
    button.addEventListener("click", openDialog);
    links.append(button);
  };
  const load = async () => {
    payload = await requestStatus(options.endpoint, "GET", controller.signal);
    applyControls();
    return payload;
  };
  const closeDialog = () => {
    overlay?.remove();
    overlay = void 0;
  };
  function openDialog() {
    closeDialog();
    const text = strings();
    overlay = document.createElement("div");
    overlay.className = "mpi-overlay";
    const dialog = document.createElement("section");
    dialog.className = "mpi-dialog";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.innerHTML = `<header class="mpi-head"><h2></h2><button type="button" class="mpi-dialog-close" data-action="close"></button></header><p class="mpi-intro"></p><dl class="mpi-meta"><dt></dt><dd data-role="current"></dd><dt></dt><dd data-role="latest"></dd><dt></dt><dd data-role="profile"></dd></dl><div class="mpi-status" role="status"></div><div class="mpi-progress" hidden></div><section class="mpi-manual"><h3></h3><p></p><div class="mpi-command"><code></code><button type="button" class="mpi-action" data-action="copy"></button></div></section><footer class="mpi-actions"><div class="mpi-actions-group"><button type="button" class="mpi-action" data-action="check"></button><button type="button" class="mpi-action mpi-primary" data-action="update"></button></div></footer>`;
    const name2 = document.documentElement.lang.toLowerCase().startsWith("en") ? options.enName : options.zhName;
    dialog.querySelector("h2").textContent = `${name2} ${text.update}`;
    dialog.querySelector(".mpi-intro").textContent = text.intro;
    const terms = dialog.querySelectorAll("dt");
    terms[0].textContent = text.current;
    terms[1].textContent = text.latestLabel;
    terms[2].textContent = text.profile;
    dialog.querySelector(".mpi-manual h3").textContent = text.manual;
    dialog.querySelector(".mpi-manual p").textContent = text.manualHint;
    const status = dialog.querySelector(".mpi-status");
    const progress = dialog.querySelector(".mpi-progress");
    const command = dialog.querySelector(".mpi-command code");
    const close = dialog.querySelector("[data-action=close]");
    const check = dialog.querySelector("[data-action=check]");
    const update = dialog.querySelector("[data-action=update]");
    const copy = dialog.querySelector("[data-action=copy]");
    setButtonContent(close, text.close, "close");
    close.querySelector("[data-mpi-label]")?.remove();
    close.setAttribute("aria-label", text.close);
    close.title = text.close;
    setButtonContent(check, text.recheck, "refresh");
    setButtonContent(update, text.auto, "download");
    setButtonContent(copy, text.copy, "copy");
    let busy = false;
    const setMessage = (message, kind = "") => {
      status.textContent = message;
      status.dataset.kind = kind;
    };
    const setBusy = (value) => {
      busy = value;
      check.disabled = value;
      copy.disabled = value;
      update.disabled = value || payload?.canAutoUpdate !== true || payload.updateAvailable !== true;
      progress.hidden = !value;
    };
    const render = () => {
      dialog.querySelector("[data-role=current]").textContent = payload === void 0 ? text.unknown : `v${payload.currentVersion}`;
      dialog.querySelector("[data-role=latest]").textContent = payload?.latestVersion === void 0 ? text.unknown : `v${payload.latestVersion}`;
      dialog.querySelector("[data-role=profile]").textContent = payload?.profileName ?? text.unknown;
      command.textContent = manualPluginUpdateCommand(payload?.profileName ?? "", options.packageName, payload?.latestVersion ?? "latest");
      update.disabled = busy || payload?.canAutoUpdate !== true || payload.updateAvailable !== true;
      if (payload === void 0) setMessage(text.checking);
      else if (payload.latestCheckFailed) setMessage(text.failed, "error");
      else if (payload.updateAvailable) setMessage(`${text.found}: v${payload.latestVersion ?? text.unknown}`);
      else setMessage(text.latest, "success");
      if (payload !== void 0 && !payload.canAutoUpdate && payload.updateAvailable) setMessage(text.unavailable);
    };
    const checkNow = async () => {
      if (busy) return;
      setBusy(true);
      setMessage(text.checking);
      try {
        await load();
        setBusy(false);
        render();
      } catch (error) {
        setBusy(false);
        setMessage(error instanceof Error ? error.message : text.failed, "error");
      }
    };
    const updateNow = async () => {
      if (busy) return;
      setBusy(true);
      setButtonLabel(update, text.updating);
      setMessage(text.updating);
      try {
        payload = await requestStatus(options.endpoint, "POST", controller.signal);
        applyControls();
        render();
        setMessage(payload.autoReload === true ? text.restarting : text.restart, "success");
      } catch (error) {
        setMessage(error instanceof Error ? error.message : text.failed, "error");
      } finally {
        setButtonLabel(update, text.auto);
        setBusy(false);
      }
    };
    close.addEventListener("click", closeDialog);
    check.addEventListener("click", () => {
      void checkNow();
    });
    update.addEventListener("click", () => {
      void updateNow();
    });
    copy.addEventListener("click", () => {
      void navigator.clipboard?.writeText(command.textContent ?? "").then(() => {
        setButtonLabel(copy, text.copied);
        setTimeout(() => {
          setButtonLabel(copy, text.copy);
        }, 1400);
      }).catch(() => {
        setButtonLabel(copy, text.copyFailed);
      });
    });
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) closeDialog();
    });
    overlay.addEventListener("keydown", (event) => {
      handlePluginUpdateEscape(event, closeDialog);
    }, true);
    overlay.append(dialog);
    document.body.append(overlay);
    render();
    close.focus();
    void checkNow();
  }
  const observer = new MutationObserver(() => {
    if (frame !== void 0) return;
    frame = window.requestAnimationFrame(() => {
      frame = void 0;
      applyControls();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  applyControls();
  void load().catch(() => {
  });
  return () => {
    controller.abort();
    observer.disconnect();
    closeDialog();
    if (frame !== void 0) window.cancelAnimationFrame(frame);
    document.querySelectorAll(`[data-mpi-check="${options.packageName}"],.mpi-version[data-package="${options.packageName}"]`).forEach((node) => node.remove());
  };
}

// src/client/index.ts
var name = "dsh-automation-client";
var inject = ["slots", "locale", "connection", "sessions"];
var UPDATE_ICON_PATHS = {
  refresh: ["M13.5 5.5V2.5m0 0h-3m3 0-2.1 2.1A5.5 5.5 0 1 0 13.2 12"],
  download: ["M8 2v8m0 0 3-3m-3 3-3-3M3 13v2h10v-2"],
  copy: ["M5 5h8v8H5z", "M3 3h8"],
  close: ["m4 4 8 8M12 4 4 12"]
};
function createPluginUpdateIcon(name2) {
  const element = document.createElement("span");
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  for (const d of UPDATE_ICON_PATHS[name2]) {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    svg.append(path);
  }
  element.append(svg);
  return element;
}
var SETTINGS_CLOCK_SVG = '<svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" data-dsh-schedule-icon="1"><path fill="currentColor" d="M8 1.15A6.85 6.85 0 1 0 8 14.85 6.85 6.85 0 0 0 8 1.15Zm0 1.4a5.45 5.45 0 1 1 0 10.9 5.45 5.45 0 0 1 0-10.9Z"/><path fill="currentColor" d="M8.62 4.35H7.28v4.2l3.02 1.78.67-1.13-2.35-1.39V4.35Z"/></svg>';
function isSessionSelector(value) {
  return typeof value === "function";
}
function isWorkspaceSelector(value) {
  return typeof value === "function";
}
function installSettingsNavIcon(labels) {
  const wanted = new Set(labels().map((item) => item.trim()).filter((item) => item !== ""));
  const applyButton = (button) => {
    const text = (button.textContent ?? "").replace(/\s+/g, " ").trim();
    if (!wanted.has(text)) return;
    const svg = button.querySelector("svg");
    if (svg === null || svg.getAttribute("data-dsh-schedule-icon") === "1") return;
    svg.outerHTML = SETTINGS_CLOCK_SVG;
  };
  const scan = (root) => {
    if (root instanceof HTMLButtonElement) applyButton(root);
    for (const button of root.querySelectorAll?.("button") ?? []) applyButton(button);
  };
  scan(document);
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const target = mutation.target instanceof Element ? mutation.target : mutation.target.parentElement;
      const owner = target?.closest("button");
      if (owner instanceof HTMLButtonElement) applyButton(owner);
      for (const node of mutation.addedNodes) {
        if (node instanceof Element) scan(node);
      }
    }
  });
  observer.observe(document.documentElement, { childList: true, characterData: true, subtree: true });
  return () => {
    observer.disconnect();
  };
}
function apply(ctx) {
  ctx.effect(() => installStyles(), "dsh-automation: styles");
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-automation: locale");
  const runtime = createAutomationRuntime(ctx.connection.rpc);
  if (module.exports.__dshKiligz) module.exports.__dshKiligz.runtime = runtime;
  ctx.effect(() => installAutomationSessionSync(runtime, () => ctx.sessions), "dsh-automation: session sync");
}
function createScheduledSessionOpener(ctx, runtime, hostOpen) {
  return (sessionId) => {
    void ensureOpenScheduledSession({
      id: sessionId,
      adopt: (id) => runtime.adoptSession(id),
      listed: (id) => {
        const snap = ctx.sessions?.list?.getSnapshot();
        return snap?.byId?.[id] !== void 0 || (snap?.ids ?? []).some((item) => item === id);
      },
      ...ctx.sessions?.refresh === void 0 ? {} : { refresh: () => ctx.sessions.refresh() },
      ...ctx.sessions === void 0 ? {} : { openRuntime: (id) => {
        ctx.sessions.open(id);
      } },
      ...hostOpen === void 0 ? {} : { openHost: hostOpen }
    });
  };
}
function PrefillBridge(props) {
  (0, import_react11.useEffect)(() => {
    const applyPrefill = (text) => {
      if (text === null || text === "") return;
      if (props.inputActions !== void 0) {
        props.inputActions.setDraft(text);
        takeChatPrefill();
        return;
      }
      if (applyPrefillToDom(text)) takeChatPrefill();
    };
    applyPrefill(peekChatPrefill());
    return subscribeChatPrefill(applyPrefill);
  }, [props.inputActions]);
  return null;
}
function readSlotEntries(ctx, name2) {
  try {
    const read = ctx.slots.entriesOfSlot ?? ctx.slots.entries;
    return read?.call(ctx.slots, name2) ?? [];
  } catch {
    return [];
  }
}
function slotHasEntries(ctx, name2) {
  return readSlotEntries(ctx, name2).length > 0;
}
module.exports.__dshKiligz = { AutomationView, createAutomationRuntime, runtime: undefined };
return module.exports; },
(require) => {
    var module = { exports: {} }
    var exports = module.exports
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
    let react = require('react')
    let react_jsx_runtime = require('react/jsx-runtime')

    // #111: core chevron icon with a safe fallback (unprotected require would
    // crash the whole client half if the primitives package is absent).
    let ChevronIcon = null
    try {
      const primitives = require('@deepseek-ai/dsh-client-ui-primitives')
      ChevronIcon = primitives && primitives.IconChevronDownOutline14
    } catch (noPrimitives) {
      ChevronIcon = null
    }
    const FallbackChevron = () =>
      react.createElement('svg', {
        width: 14, height: 14, viewBox: '0 0 14 14', 'aria-hidden': 'true',
        style: { display: 'block' },
      },
        react.createElement('path', {
          d: 'M3 5l4 4 4-4', fill: 'none', stroke: 'currentColor',
          strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round',
        }),
      )
    const Chevron = ChevronIcon || FallbackChevron

    // ---------------------------------------------------------------- css
    const css =
      '.vbr{display:flex;flex-direction:column;gap:12px;padding:16px 20px;color:var(--dsw-alias-label-primary);max-width:620px}' +
      '.vbr h2{font-size:16px;font-weight:600;margin:0}' +
      '.vbr p{margin:0;font-size:13px;line-height:1.45}' +
      '.vbr .hint{color:var(--dsw-alias-label-secondary)}' +
      '.vbr .err{color:var(--dsw-alias-state-error-primary)}' +
      '.vbr .ok{color:var(--dsw-alias-state-success-primary)}' +
      '.vbr label{font-size:13px;font-weight:500;display:block;margin-bottom:4px}' +
      '.vbr select, .vbr input[type=text]{width:100%;border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-input-major);border-radius:6px;padding:6px 8px;font-size:13px;min-height:32px;box-sizing:border-box;color-scheme:light dark}' +
      '.vbr .row{display:flex;gap:8px;align-items:center;margin-top:8px}' +
      '.vbr-chan{border:1px solid var(--dsw-alias-border-l2);border-radius:6px;padding:8px;margin-top:8px;display:flex;flex-direction:column;gap:6px}' +
      '.vbr-card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none}' +
      '.vbr-card-header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;display:flex;align-items:center;gap:12px;padding:14px 16px}' +
      '.vbr-card-name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}' +
      '.vbr-card-description{color:var(--dsw-alias-label-secondary);font-size:13px}' +
      '.vbr-card-chevron{margin-left:auto;flex:none;color:var(--dsw-alias-label-tertiary);transition:transform .16s}' +
      '.vbr-card-open .vbr-card-chevron{transform:rotate(180deg)}' +
      '.vbr-body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}' +
      '.vbr-field{display:flex;flex-direction:column;gap:6px;padding:12px 0}' +
      '.vbr button, .vbr select, .vbr input[type=text]{appearance:none;font:inherit;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-3);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:0 12px;font-size:13px;color-scheme:light dark}' +
      '.vbr button, .vbr select{height:34px}' +
      '.vbr button.primary{border-color:transparent;background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-3)}' +
      '.vbr button:disabled{opacity:.5;cursor:default}' +
      '.vbr input[type=text]{height:34px}' +
      '.vbr-input-btn{display:inline-flex;align-items:center;gap:4px;height:28px;padding:0 8px;font-size:12px;font-weight:500;border-radius:6px;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-input-major);color:var(--dsw-alias-label-secondary);cursor:pointer;transition:background-color .16s ease,border-color .16s ease,color .16s ease;white-space:nowrap;user-select:none}' +
      '.vbr-input-btn:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-layer-3)}' +
      '.vbr-input-btn.active{color:var(--dsw-alias-brand-primary,#6366f1);border-color:var(--dsw-alias-brand-primary,#6366f1)}'
    const tagId = 'dsh-vision-bridge/settings-card.module.css'
    if (typeof document !== 'undefined' && document.querySelector('style[data-plugin-css=' + JSON.stringify(tagId) + ']') === null) {
      const tag = document.createElement('style')
      tag.dataset.plugin = 'dsh-vision-bridge'
      tag.dataset.pluginCss = tagId
      tag.textContent = css
      document.head.appendChild(tag)
    }

    // -------------------------------------------------------------- i18n
    const NS = 'dsh-vision-bridge'

    const en = {
      title: 'Vision',
      subtitle: 'Images in chat are processed by the vision model you choose here. Leave both fields empty to auto-pick the first vision-capable model from the catalog.',
      provider: 'Vision provider',
      model: 'Vision model',
      auto: 'Auto',
      save: 'Save',
      saving: 'Saving…',
      saved: 'Saved',
      reset: 'Reset (auto)',
      failed: 'Failed to load/save',
      reqBoth: 'Pick both provider and model, or leave both empty for auto',
      modelInvalid: 'Model does not accept images',
      current: 'Current: {provider} / {model}',
      currentAuto: 'Auto (auto-pick)',
      noVisionModels: 'No vision models in the catalog (input: [text, image]) — add one in Settings → Models.',
      loading: '…',
      mode: 'Mode',
      modeHybrid: 'Hybrid (auto-rewrite + tools)',
      modeLlm: 'LLM only (auto-rewrite, tools still available)',
      modeTools: 'Tools only (no auto-rewrite, model must call describe_image)',
      describeStrategy: 'Describe strategy',
      strategyAuto: 'Auto (use vision LLM)',
      strategyLlm: 'Vision LLM',
      strategyOcrLocal: 'Local OCR (reserved)',
      strategyCacheOnly: 'Cache only (no network)',
      escalation: 'Escalation',
      escalationSimple: 'Simple only (one pass)',
      escalationAuto: 'Auto-escalate (second pass on complex images)',
      advanced: 'Advanced',
      channels: 'Channels',
      channelsHint: 'Extra vision endpoints (OpenAI-compatible, Ollama, custom). Empty — auto-pick from catalog.',
      addChannel: 'Add channel',
      remove: 'Remove',
      testVision: 'Test vision',
      testing: 'Testing…',
      testOk: 'OK ({ms}ms)',
      testFail: 'Failed: {err}',
      type: 'Type',
      baseURL: 'Base URL',
      apiKey: 'API key',
      model: 'Model',
      protocol: 'Protocol',
      protocolOpenaiChat: 'openai-chat',
      protocolOpenaiResponses: 'openai-responses',
      requestTemplate: 'Request template',
      responsePath: 'Response path',
      keyOk: 'key OK',
      keyMissing: 'no key',
      keyHidden: 'unknown',
      empty: '-',
      filterProviders: 'Filter providers…',
      presetLocal: 'Preset: Local',
      presetCloud: 'Preset: Cloud',
      presetLmStudio: 'Preset: LM Studio',
      bench: 'Bench',
      vllm: 'vLLM',
      sglang: 'SGLang',
      jsonrpc: 'JSON-RPC',
      protocol: 'Protocol',
      method: 'Method',
      freeProviders: 'Free providers',
      autoDiscoverOllama: 'Auto-discover Ollama models',
      channelOrderMode: 'Channel order',
      tileLargeImages: 'Tile large images',
      deskew: 'Deskew images',
      enhanceImage: 'Enhance image quality',
      selfCheck: 'Visual self-check',
      consensus: 'Multi-model consensus (hallucination filter)',
      maskPII: 'Mask PII in prompts',
      maskSystemPaths: 'Mask paths/IP in responses',
      blurFaces: 'Blur faces',
      stripEXIF: 'Strip EXIF metadata',
      nsfwFilter: 'NSFW filter',
      security: 'Security',
      channelOrderManual: 'Manual',
      channelOrderAutoLatency: 'By latency',
      imageMaxWidth: 'Max width (px)',
      imageMaxHeight: 'Max height (px)',
      imageQuality: 'Quality (1-100)',
      circuitState: 'Circuit',
      circuitClosed: 'OK',
      circuitOpen: 'Blocked',
      circuitHalfOpen: 'Testing',
    }
    const ru = {
      title: 'Vision',
      subtitle: 'Картинки в чате автоматически обрабатывает выбранная vision-модель. Можешь оставить поля пустыми — автоподбор первой vision-модели из каталога.',
      provider: 'Провайдер vision',
      model: 'Vision-модель',
      auto: 'Авто',
      save: 'Сохранить',
      saving: 'Сохранение…',
      saved: 'Сохранено',
      reset: 'Сброс (авто)',
      failed: 'Не удалось загрузить/сохранить',
      reqBoth: 'Укажите и провайдера, и модель — или оба пустые для автоподбора',
      modelInvalid: 'Модель не принимает изображения',
      current: 'Сейчас: {provider} / {model}',
      currentAuto: 'Авто (используется автоподбор)',
      noVisionModels: 'В каталоге нет vision-моделей (input: [text, image]) — добавьте vision-модель в Настройки → Модели.',
      loading: '…',
      mode: 'Режим',
      modeHybrid: 'Гибрид (авто-подмена + tools)',
      modeLlm: 'Только LLM (авто-подмена, tools доступны)',
      modeTools: 'Только tools (без авто-подмены, модель сама вызывает describe_image)',
      describeStrategy: 'Стратегия описания',
      strategyAuto: 'Авто (vision-LLM)',
      strategyLlm: 'Vision-LLM',
      strategyOcrLocal: 'Локальный OCR (резерв)',
      strategyCacheOnly: 'Только кэш (без сети)',
      escalation: 'Эскалация',
      escalationSimple: 'Простой (один проход)',
      escalationAuto: 'Авто-эскалация (второй проход для сложных)',
      advanced: 'Дополнительно',
      channels: 'Каналы',
      channelsHint: 'Доп. vision-эндпоинты (OpenAI-совместимые, Ollama, custom). Пусто — автоподбор из каталога.',
      addChannel: 'Добавить канал',
      remove: 'Удалить',
      testVision: 'Проверить vision',
      testing: 'Проверка…',
      testOk: 'OK ({ms}ms)',
      testFail: 'Ошибка: {err}',
      type: 'Тип',
      baseURL: 'Базовый URL',
      apiKey: 'API ключ',
      model: 'Модель',
      protocol: 'Протокол',
      protocolOpenaiChat: 'openai-chat',
      protocolOpenaiResponses: 'openai-responses',
      requestTemplate: 'Шаблон запроса',
      responsePath: 'Путь ответа',
      keyOk: 'ключ задан',
      keyMissing: 'нет ключа',
      keyHidden: 'неизвестно',
      empty: '-',
      filterProviders: 'Фильтр провайдеров…',
      presetLocal: 'Пресет: Локально',
      presetCloud: 'Пресет: Облако',
      presetLmStudio: 'Пресет: LM Studio',
      bench: 'Бенч',
      vllm: 'vLLM',
      sglang: 'SGLang',
      jsonrpc: 'JSON-RPC',
      protocol: 'Протокол',
      method: 'Метод',
      freeProviders: 'Бесплатные провайдеры',
      autoDiscoverOllama: 'Авто-обнаружение моделей Ollama',
      channelOrderMode: 'Порядок каналов',
      tileLargeImages: 'Тайлинг больших изображений',
      deskew: 'Выравнивание изображений',
      enhanceImage: 'Улучшение качества',
      selfCheck: 'Визуальная самопроверка',
      consensus: 'Мультимодельный консенсус (устранение галлюцинаций)',
      maskPII: 'Маскировать PII в промптах',
      maskSystemPaths: 'Маскировать пути/IP в ответах',
      blurFaces: 'Размывать лица',
      stripEXIF: 'Удалять EXIF',
      nsfwFilter: 'NSFW фильтр',
      security: 'Безопасность',
      channelOrderManual: 'Ручной',
      channelOrderAutoLatency: 'По латентности',
      imageMaxWidth: 'Макс. ширина (px)',
      imageMaxHeight: 'Макс. высота (px)',
      imageQuality: 'Качество (1-100)',
      circuitState: 'Состояние',
      circuitClosed: 'ОК',
      circuitOpen: 'Заблокирован',
      circuitHalfOpen: 'Проверка',
    }

    function useActiveLocale(ctx) {
      return react.useSyncExternalStore(
        react.useMemo(() => (cb) => (ctx && ctx.locale ? ctx.locale.subscribe(cb) : () => {}), [ctx]),
        react.useCallback(() => {
          if (ctx && ctx.locale) {
            const active = ctx.locale.getSnapshot().active
            if (typeof active === 'string' && active) return active
          }
          return typeof navigator !== 'undefined' ? String(navigator.language || '').slice(0, 2) : ''
        }, [ctx])
      )
    }

    function makeT(DICT, fallbackKeys) {
      return (key, vars) => {
        let s = (DICT && DICT[key]) || (fallbackKeys && fallbackKeys[key]) || key
        if (vars) {
          for (const k of Object.keys(vars)) s = String(s).replace(new RegExp('\\{' + k + '\\}', 'g'), String(vars[k]))
        }
        return s
      }
    }

    const zh = {
      title: '看图',
      subtitle: '对话里的图片会先交给这里选择的视觉模型处理；两项留空时自动从模型目录挑选。',
      provider: '看图提供方',
      model: '看图模型',
      auto: '自动',
      save: '保存',
      saving: '保存中…',
      saved: '已保存',
      reset: '重置为自动',
      failed: '加载或保存失败',
      reqBoth: '请同时选择提供方和模型，或两项都留空使用自动',
      modelInvalid: '该模型不支持图片输入',
      current: '当前：{provider} / {model}',
      currentAuto: '自动选择',
      noVisionModels: '模型目录里没有支持图片的模型，请先在「设置 → 模型」里添加。',
      loading: '加载中…',
      mode: '模式',
      modeHybrid: '自动描述 + 工具',
      modeLlm: '只自动描述',
      modeTools: '只用工具',
      describeStrategy: '描述策略',
      strategyAuto: '自动',
      strategyLlm: '视觉模型',
      strategyOcrLocal: '本地 OCR',
      strategyCacheOnly: '只用缓存',
      escalation: '升级策略',
      escalationSimple: '单次处理',
      escalationAuto: '复杂图片二次处理',
      advanced: '高级',
      channels: '通道',
      channelsHint: '额外的视觉服务端点；留空则自动从模型目录挑选。',
      addChannel: '添加通道',
      remove: '移除',
      testVision: '测试识图',
      testing: '测试中…',
      testOk: '正常（{ms}ms）',
      testFail: '失败：{err}',
      type: '类型',
      baseURL: '服务地址',
      apiKey: 'API Key',
      protocol: '协议',
      requestTemplate: '请求模板',
      responsePath: '响应路径',
      keyOk: '已配置密钥',
      keyMissing: '缺少密钥',
      keyHidden: '未知',
      empty: '-',
      filterProviders: '筛选提供方…',
      bench: '性能测试',
      freeProviders: '免费提供方',
      autoDiscoverOllama: '自动发现 Ollama 模型',
      channelOrderMode: '通道顺序',
      channelOrderManual: '手动',
      channelOrderAutoLatency: '按延迟',
      tileLargeImages: '大图分块',
      deskew: '倾斜校正',
      enhanceImage: '画质增强',
      selfCheck: '视觉自检',
      consensus: '多模型共识',
      maskPII: '脱敏提示词中的个人信息',
      maskSystemPaths: '脱敏回复中的路径与 IP',
      blurFaces: '人脸模糊',
      stripEXIF: '移除 EXIF',
      nsfwFilter: 'NSFW 过滤',
      security: '安全',
      imageMaxWidth: '最大宽度（像素）',
      imageMaxHeight: '最大高度（像素）',
      imageQuality: '画质（1-100）',
      circuitState: '熔断状态',
      circuitClosed: '正常',
      circuitOpen: '已熔断',
      circuitHalfOpen: '探测中',
    }

    function pickDictionary(locale) {
      const tag = String(locale || '').slice(0, 2)
      if (tag === 'ru') return ru
      if (tag === 'zh') return zh
      return en
    }

    // -------------------------------------------------------------- helpers
    async function api(method, body) {
      const res = await fetch('/dsh-vision-bridge/config', {
        method,
        headers: body ? { 'Content-Type': 'application/json' } : {},
        body: body ? JSON.stringify(body) : undefined,
      })
      let data = null
      try { data = await res.json() } catch {}
      return { ok: res.ok, status: res.status, data }
    }
    async function fetchModels() {
      try {
        const res = await fetch('/dsh-vision-bridge/models', { cache: 'no-store' })
        if (!res.ok) return []
        const data = await res.json()
        const all = (data && Array.isArray(data.models)) ? data.models : []
        return all
      } catch { return [] }
    }

    // -------------------------------------------------------------- component
    function VisionSettingsPanel(props) {
      const isZh = String((props && props.locale) || '').slice(0, 2) === 'zh'
      const copy = isZh
        ? {
            provider: '看图提供方',
            model: '看图模型',
            auto: '自动',
            hint: '选择读图使用的模型；两项都留空时，自动挑选模型目录里第一个支持图片的模型。',
            empty: '模型目录里没有支持图片的模型，请先在「设置 → 模型」里添加。',
            save: '保存',
            saving: '保存中…',
            saved: '已保存',
            failed: '保存失败',
          }
        : {
            provider: 'Vision provider',
            model: 'Vision model',
            auto: 'Auto',
            hint: 'Pick the model used to read images. Leave both empty to auto-pick the first vision-capable model in the catalog.',
            empty: 'No vision-capable model in the catalog. Add one in Settings → Models.',
            save: 'Save',
            saving: 'Saving…',
            saved: 'Saved',
            failed: 'Save failed',
          }
      const [catalog, setCatalog] = react.useState([])
      const [provider, setProvider] = react.useState('')
      const [model, setModel] = react.useState('')
      const [loaded, setLoaded] = react.useState(false)
      const [saving, setSaving] = react.useState(false)
      const [status, setStatus] = react.useState('')
      const stored = react.useRef({ provider: '', model: '' })

      react.useEffect(() => {
        let alive = true
        void (async () => {
          const [config, list] = await Promise.all([api('GET'), fetchModels()])
          if (!alive) return
          const entries = Array.isArray(list) ? list : []
          const vision = entries.filter((item) => item && item.vision === true)
          setCatalog(vision)
          const data = (config && config.data) || {}
          const currentProvider = String(data.visionProvider || data.provider || '')
          const currentModel = String(data.visionModel || data.model || '')
          stored.current = { provider: currentProvider, model: currentModel }
          setProvider(currentProvider)
          setModel(currentModel)
          setLoaded(true)
        })()
        return () => { alive = false }
      }, [])

      const providerIds = Array.from(new Set(catalog.map((item) => item && item.provider).filter(Boolean))).sort()
      const models = catalog.filter((item) => item && item.provider === provider)
      const dirty = provider !== stored.current.provider || model !== stored.current.model

      const save = async () => {
        setSaving(true)
        setStatus('')
        try {
          const scope = props && props.ctx && props.ctx.settingsScope && typeof props.ctx.settingsScope.bind === 'function'
            ? props.ctx.settingsScope.bind({ namespace: NS })
            : null
          if (scope && typeof scope.update === 'function') scope.update({ visionProvider: provider, visionModel: model })
          const response = await api('POST', { provider, model })
          if (!response || !response.ok) {
            const detail = (response && response.data && (response.data.error || response.data.message)) || (response && response.status) || ''
            throw new Error(typeof detail === 'string' && detail.length > 0 ? detail : copy.failed)
          }
          stored.current = { provider, model }
          setStatus(copy.saved)
        } catch (error) {
          setStatus(String((error && error.message) || error))
        } finally {
          setSaving(false)
        }
      }

      const option = (value, label, key) => react.createElement('option', { key: key || value || 'auto', value }, label)
      const selectField = (label, value, options, onChange) => react.createElement('div', { className: 'vbr-field' },
        react.createElement('label', null, label),
        react.createElement('select', { value, onChange: (event) => onChange(event.target.value) }, options))

      return react.createElement('div', { className: 'vbr' },
        selectField(copy.provider, provider,
          [option('', copy.auto)].concat(providerIds.map((id) => option(id, id))),
          (value) => { setProvider(value); setModel('') }),
        provider
          ? selectField(copy.model, model,
              [option('', copy.auto)].concat(models.map((item) => option(item.model, item.name || item.model, item.provider + '/' + item.model))),
              setModel)
          : null,
        react.createElement('p', { className: 'hint' }, copy.hint),
        loaded && catalog.length === 0 ? react.createElement('p', { className: 'err' }, copy.empty) : null,
        react.createElement('div', { className: 'row' },
          react.createElement('button', { type: 'button', className: 'primary', disabled: saving || !loaded || !dirty, onClick: save }, saving ? copy.saving : copy.save),
          status ? react.createElement('p', { className: 'hint' }, status) : null))
    }

      // #111: single-fire guard — the entry point can be invoked twice (e.g.
      // when a service is checked before it exists); without a flag we'd mount
      // two independent states that drift apart.
      let applied = false
      function apply(ctx) {

        // #90: Global Lightbox Viewer for Chat Images (Idempotent)
        if (typeof window !== 'undefined' && typeof document !== 'undefined' && !window.__vbr_lightbox_installed) {
          window.__vbr_lightbox_installed = true;
          const openLightbox = (imgSrc, altText) => {
            let existing = document.getElementById('vbr-lightbox-overlay');
            if (existing) existing.remove();

            const overlay = document.createElement('div');
            overlay.id = 'vbr-lightbox-overlay';
            overlay.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:24px;animation:vbrFadeIn 0.2s ease-out;';

            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = altText || 'Preview';
            img.style.cssText = 'max-width:92vw;max-height:90vh;border-radius:8px;box-shadow:0 12px 48px rgba(0,0,0,0.75);object-fit:contain;cursor:default;';

            const closeBtn = document.createElement('button');
            closeBtn.textContent = '✕';
            closeBtn.style.cssText = 'position:absolute;top:20px;right:24px;background:rgba(255,255,255,0.2);color:#fff;border:none;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;';
            closeBtn.onclick = () => overlay.remove();

            overlay.onclick = (e) => {
              if (e.target === overlay || e.target === closeBtn) overlay.remove();
            };

            const onKey = (e) => {
              if (e.key === 'Escape') {
                overlay.remove();
                window.removeEventListener('keydown', onKey);
              }
            };
            window.addEventListener('keydown', onKey);

            overlay.appendChild(img);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
          };

          document.addEventListener('click', (e) => {
            const img = e.target.closest('img');
            if (!img) return;
            if (img.width < 40 && img.height < 40) return;
            if (img.closest('#vbr-lightbox-overlay') || img.closest('.vbr-card-chevron') || img.closest('button')) return;
            if (img.src && (img.src.startsWith('data:image') || img.src.includes('attachment') || img.src.includes('blob:') || img.src.includes('http'))) {
              e.preventDefault();
              e.stopPropagation();
              openLightbox(img.src, img.alt);
            }
          }, true);
        }

        if (applied) return
        applied = true
        // Register the plugin's own dictionaries so the DSH locale service can
        // bind its namespace and the UI follows the active UI language live.
        ctx.effect(() => ctx.locale.register(NS, { en, ru, zh }), 'dsh-vision-bridge: dictionaries')
        function useLocale() {
          return useActiveLocale(ctx)
        }
        // #44: collapsible card in Plugins tab `settings.plugin.item` (like Model Sync/Spendmeter).
        // key must equal settings namespace (NS). Fallback to old sidebar section if slot missing.
        function VisionCard(props) {
          const locale = useLocale(); const t = makeT(pickDictionary(locale), en); const [open, setOpen] = react.useState(false)
          return react.createElement('div', { className: 'vbr-card' + (open ? ' vbr-card-open' : '') },
            react.createElement('button', { type: 'button', className: 'vbr-card-header', 'aria-expanded': open, onClick: () => setOpen((v) => !v) },
              react.createElement('span', { className: 'vbr-card-head-text' },
                react.createElement('span', { className: 'vbr-card-name' }, t('title')),
                react.createElement('span', { className: 'vbr-card-description' }, t('subtitle'))),
              react.createElement('span', { className: 'vbr-card-chevron', 'aria-hidden': 'true' }, react.createElement(Chevron))),
            open ? react.createElement('div', { className: 'vbr-body' }, react.createElement(VisionSettingsPanel, { ...props, locale })) : null)
        }
      const tryPluginItem = () => {
        try {
          ctx.slots.inject('settings.plugin.item', () =>
            ctx.slots.register(
              {
                name: 'settings.plugin.item',
                key: NS,
                locale: NS,
                inject: () => ({ ctx }),
              },
              (props) => react.createElement(VisionCard, props),
            ),
          )
          return true
        } catch {
          return false
        }
      }
      if (!tryPluginItem()) {
        ctx.slots.inject('settings.section', () =>
          ctx.slots.register(
            {
              name: 'settings.section',
              id: 'vision',
              order: 25,
              label: () => 'Vision',
              inject: () => ({ ctx }),
            },
            (props) => react.createElement(VisionSettingsPanel, { ...props, ctx, locale: useLocale() }),
          ),
        )
      }
      // Composer controls stay disabled in this bundle; PDF drop and paste remain available.
      const handlePdfUpload = async (file) => {
        const showToast = (msg, isErr) => {
          let t = document.getElementById('vbr-pdf-toast')
          if (!t) {
            t = document.createElement('div')
            t.id = 'vbr-pdf-toast'
            t.style.cssText = 'position:fixed;bottom:80px;right:24px;z-index:99999;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:500;box-shadow:0 4px 16px rgba(0,0,0,0.3);transition:all 0.3s;'
            document.body.appendChild(t)
          }
          t.style.background = 'var(--dsw-alias-bg-layer-2)'
          t.style.color = isErr ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-label-primary)'
          t.style.border = '1px solid var(--dsw-alias-border-l2)'
          t.textContent = msg
          setTimeout(() => { if (t) t.remove() }, 4000)
        }

        showToast('正在转换 PDF 页面…', false)
        try {
          const res = await fetch('/dsh-vision-bridge/upload-pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/pdf' },
            body: file,
          })
          const d = await res.json()
          if (!res.ok || !d.ok) throw new Error(d.error || 'Ошибка конвертации')
          showToast('PDF 已载入：' + d.count + ' 页', false)

          if (d.pages && d.pages.length > 0) {
            for (const p of d.pages) {
              const b64Data = p.dataUrl.split(',')[1]
              const byteChars = atob(b64Data)
              const byteNumbers = new Array(byteChars.length)
              for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i)
              const byteArray = new Uint8Array(byteNumbers)
              const imgBlob = new Blob([byteArray], { type: 'image/png' })
              const imgFile = new File([imgBlob], p.name, { type: 'image/png' })

              const dt = new DataTransfer()
              dt.items.add(imgFile)
              const activeEl = document.querySelector('textarea, [contenteditable="true"]') || document.body
              const pasteEv = new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: dt })
              activeEl.dispatchEvent(pasteEv)
            }
          }
        } catch (e) {
          showToast('PDF 处理失败：' + (e.message || e), true)
        }
      }

      // Global Drag & Drop Handler for PDFs
      if (typeof window !== 'undefined' && !window.__vbr_pdf_drag_installed) {
        window.__vbr_pdf_drag_installed = true
        window.addEventListener('dragover', (e) => {
          if (e.dataTransfer && Array.from(e.dataTransfer.types || []).includes('Files')) {
            e.preventDefault()
          }
        }, false)

        window.addEventListener('drop', async (e) => {
          const files = e.dataTransfer ? Array.from(e.dataTransfer.files || []) : []
          const pdfFile = files.find((f) => f.name && f.name.toLowerCase().endsWith('.pdf'))
          if (pdfFile) {
            e.preventDefault()
            e.stopPropagation()
            await handlePdfUpload(pdfFile)
          }
        }, true)
      }


    }
    exports.apply = apply
    exports.inject = ['slots', 'locale', 'settingsScope']
    return module.exports
  }];
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.jsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react2 = __toESM(require("react"), 1);
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/icons.jsx
var import_react = __toESM(require("react"), 1);
function iconProps(size) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.35,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: "false"
  };
}
function ScheduleIcon({ size = 16 }) {
  return import_react.default.createElement(
    "svg",
    iconProps(size),
    import_react.default.createElement("circle", { cx: 8, cy: 8.25, r: 5.15 }),
    import_react.default.createElement("path", { d: "M8 5.25v3.2l2.15 1.25M4.35 2.35 2.75 3.8M11.65 2.35l1.6 1.45" })
  );
}
function SkillIcon({ size = 16 }) {
  return import_react.default.createElement(
    "svg",
    iconProps(size),
    import_react.default.createElement("path", { d: "M3.25 2.25h6.2l2.3 2.3v4.1M3.25 2.25v11.5h5.4M9.45 2.25v2.3h2.3M5.35 6.4h3.45M5.35 8.8h2.2" }),
    import_react.default.createElement("path", { d: "m11.55 9.45.38 1.05c.18.5.57.89 1.07 1.07l1.05.38-1.05.38c-.5.18-.89.57-1.07 1.07l-.38 1.05-.38-1.05a1.82 1.82 0 0 0-1.07-1.07l-1.05-.38 1.05-.38c.5-.18.89-.57 1.07-1.07l.38-1.05Z" })
  );
}
function McpIcon({ size = 16 }) {
  return import_react.default.createElement(
    "svg",
    iconProps(size),
    import_react.default.createElement("path", { d: "m5.05 8.35 4.7-4.7a2.15 2.15 0 0 1 3.05 3.04l-5.9 5.9a3 3 0 0 1-4.25-4.24l5.4-5.4" }),
    import_react.default.createElement("path", { d: "m5.25 9.75 5.45-5.45" })
  );
}

// src/client/styles.js
var BASE_STYLE_ID = "@kiligzzz/dsh-kiligz-base/styles";
var BASE_CSS = `
div:has(> [data-slot="sidebar.footer.action"]){flex-direction:column!important;align-items:stretch!important;gap:2px!important}
.kb-footer-wrap,.dsa-footer-wrap{display:flex;width:100%;min-width:0;flex:none}
.kb-footer-entry,.dsa-footer-entry{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:8px!important;width:100%!important;height:36px!important;min-width:0;padding:0 var(--dsb-btn-pad-x,8px)!important;border:0!important;border-radius:8px!important;background:transparent!important;color:var(--dsw-alias-label-secondary)!important;font:inherit!important;font-size:14px!important;line-height:20px!important;text-align:left;cursor:pointer;overflow:hidden;white-space:nowrap;transition:background-color .16s ease,color .16s ease}
.kb-footer-entry:hover,.kb-footer-entry:focus-visible,.dsa-footer-entry:hover,.dsa-footer-entry:focus-visible{background:var(--dsw-alias-interactive-bg-hover)!important;color:var(--dsw-alias-label-primary)!important;outline:none}
.kb-footer-entry:focus-visible,.dsa-footer-entry:focus-visible{box-shadow:inset 0 0 0 2px var(--dsw-alias-border-l3)}
.kb-footer-icon,.dsa-footer-icon{display:inline-flex;align-items:center;justify-content:center;flex:0 0 16px;width:16px;height:16px;line-height:0;color:currentColor}
.kb-footer-icon svg,.dsa-footer-icon svg{display:block;width:16px;height:16px}
.kb-footer-label,.dsa-footer-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kb-footer-wrap.kb-narrow,.dsa-footer-wrap.dsa-narrow{width:auto!important;justify-content:center}
.kb-footer-wrap.kb-narrow .kb-footer-entry,.dsa-footer-wrap.dsa-narrow .dsa-footer-entry{justify-content:center!important;width:36px!important;height:36px!important;padding:0!important;gap:0!important;border-radius:50%!important}
.kb-footer-wrap.kb-narrow .kb-footer-label,.dsa-footer-wrap.dsa-narrow .dsa-footer-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.kb-modal{display:flex!important;flex-direction:column;width:min(760px,94vw)!important;height:min(640px,88vh)!important;border-radius:24px!important}
.kb-modal-content{display:flex!important;flex:1;min-height:0;flex-direction:column}
.kb-modal-content>div:last-child{display:flex!important;flex:1;min-height:0;flex-direction:column;overflow:auto}
.kb-modal-focus{display:flex;flex:1;min-width:0;min-height:0;flex-direction:column}
/* One toolbar row for every manager modal: search on the left, actions on the right. */
.kb-modal .dsh-st-shell{width:100%;max-width:none;margin:0;padding:0 0 12px}
.kb-modal .dsh-st-heading{display:none}
.kb-modal .dsh-st-top{display:block;margin:0 0 12px}
.kb-modal .dsh-st-toolbar{flex-wrap:nowrap;justify-content:flex-start;gap:8px}
.kb-modal .dsh-st-search{flex:1;min-width:0;max-width:none}
.kb-modal .cm-page{display:grid!important;grid-template-columns:minmax(0,1fr) auto;align-items:start;gap:10px;height:auto;min-height:0;overflow:visible;padding:0 0 12px}
.kb-modal .cm-page>.cm-head{display:contents!important}
.kb-modal .cm-page>.cm-head>div:first-child{display:none!important}
.kb-modal .cm-page>.cm-head>*:not(:first-child){grid-column:2;grid-row:1;justify-self:end;align-self:center}
.kb-modal .cm-page>.cm-search{grid-column:1;grid-row:1;width:100%;align-self:center}
.kb-modal .cm-page>*:not(.cm-head):not(.cm-search){grid-column:1/-1}
.kb-modal .cm-search,.kb-modal .dsh-st-search{box-sizing:border-box;height:32px;min-height:32px;padding:0 12px;font-size:13px}
/* SKILL management anchors its directory action beside the page header instead of on its own row. */
.kb-manager-panel{position:relative;display:flex;flex:1;min-width:0;min-height:0;flex-direction:column}
.kb-manager-panel .kb-manager-actions{position:absolute;top:2px;right:0;z-index:2;width:28px;height:28px}
.kb-manager-panel .cm-page{grid-template-columns:minmax(0,1fr) auto 28px}
.kb-inline-error{margin:0 0 8px;padding:8px 10px;border:1px solid var(--dsw-alias-border-l2);border-radius:8px;background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-state-error-primary);font-size:12px;line-height:18px}
.kb-icon-button,.cm-ico,.dsh-st-icon,.dsh-st-more{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:28px!important;height:28px!important;min-width:28px!important;padding:0!important;border:1px solid transparent!important;border-radius:7px!important;background:transparent!important;color:var(--dsw-alias-label-secondary)!important;font-size:0!important;cursor:pointer;transition:background-color .16s ease,border-color .16s ease,color .16s ease}
.kb-icon-button:hover,.kb-icon-button:focus-visible,.cm-ico:hover,.cm-ico:focus-visible,.dsh-st-icon:hover,.dsh-st-icon:focus-visible,.dsh-st-more:hover,.dsh-st-more:focus-visible{border-color:var(--dsw-alias-border-l2)!important;background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)!important;outline:none}
.cm-ico svg,.kb-icon-button svg{width:14px;height:14px}
.cm-ico.danger:hover{color:var(--dsw-alias-state-error-primary)!important}
.cm-switch,.dsh-st-switch{position:relative!important;width:32px!important;height:18px!important;min-width:32px!important;padding:0!important;border:0!important;border-radius:999px!important;background:var(--dsw-static-neutral-bluish-600)!important;box-shadow:none!important;appearance:none!important;cursor:pointer;transition:background-color .18s ease!important}
.cm-switch::after,.dsh-st-switch::after{content:""!important;position:absolute!important;top:2px!important;left:2px!important;width:14px!important;height:14px!important;border-radius:50%!important;background:var(--dsw-static-neutral-bluish-00)!important;box-shadow:var(--dsw-shadow-lv1,none)!important;transform:translateX(0)!important;transition:transform .18s cubic-bezier(.2,.8,.2,1)!important}
.cm-switch.on,.dsh-st-switch.is-on{background:var(--dsw-static-green-500)!important}
.cm-switch.on::after,.dsh-st-switch.is-on::after{transform:translateX(14px)!important}
.cm-switch:focus-visible,.dsh-st-switch:focus-visible{outline:2px solid var(--dsw-alias-border-l3)!important;outline-offset:2px!important}
.cm-switch:disabled,.dsh-st-switch:disabled{cursor:not-allowed;opacity:.45}
.dsh-st-overview-toggle>span{box-sizing:border-box!important;width:32px!important;height:18px!important;border:0!important;border-radius:999px!important;background:var(--dsw-static-neutral-bluish-600)!important;box-shadow:none!important;transition:background-color .18s ease!important}
.dsh-st-overview-toggle>span::after{top:2px!important;left:2px!important;width:14px!important;height:14px!important;background:var(--dsw-static-neutral-bluish-00)!important;box-shadow:var(--dsw-shadow-lv1,none)!important;transform:translateX(0)!important;transition:transform .18s cubic-bezier(.2,.8,.2,1)!important}
.dsh-st-overview-toggle input:checked+span{background:var(--dsw-static-green-500)!important}
.dsh-st-overview-toggle input:checked+span::after{transform:translateX(14px)!important}
[role="dialog"] label>input[type="checkbox"]+span[aria-hidden="true"]:has(>span){box-sizing:border-box!important;display:inline-flex!important;align-items:center!important;width:32px!important;height:18px!important;padding:2px!important;border:0!important;border-radius:999px!important;background:var(--dsw-static-neutral-bluish-600)!important;box-shadow:none!important;transition:background-color .18s ease!important}
[role="dialog"] label>input[type="checkbox"]+span[aria-hidden="true"]>span{width:14px!important;height:14px!important;border-radius:50%!important;background:var(--dsw-static-neutral-bluish-00)!important;box-shadow:var(--dsw-shadow-lv1,none)!important;transform:translateX(0)!important;transition:transform .18s cubic-bezier(.2,.8,.2,1)!important}
[role="dialog"] label>input[type="checkbox"]:checked+span[aria-hidden="true"]:has(>span){background:var(--dsw-static-green-500)!important}
[role="dialog"] label>input[type="checkbox"]:checked+span[aria-hidden="true"]>span{transform:translateX(14px)!important}
[role="dialog"] label>input[type="checkbox"]:focus-visible+span[aria-hidden="true"]{outline:2px solid var(--dsw-alias-border-l3)!important;outline-offset:2px!important}
.cm-search,.cm-input,.cm-select,.cm-textarea,.dsh-st-search,.dsh-st-field input,.dsh-st-field select,.dsh-st-field textarea,.vr-input{border:1px solid var(--dsw-alias-border-l2)!important;border-radius:8px!important;background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)!important;box-shadow:none!important}
.cm-search:focus,.cm-input:focus,.cm-select:focus,.cm-textarea:focus,.dsh-st-search:focus,.dsh-st-field input:focus-visible,.dsh-st-field select:focus-visible,.dsh-st-field textarea:focus-visible,.vr-input:focus-visible{border-color:var(--dsw-alias-border-l3)!important;outline:2px solid color-mix(in srgb,var(--dsw-alias-border-l3) 45%,transparent)!important;outline-offset:1px!important}
.cm-btn,.dsh-st-btn,.vr-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:32px;border:1px solid var(--dsw-alias-border-l2)!important;border-radius:8px!important;background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)!important;box-shadow:none!important;transition:background-color .16s ease,border-color .16s ease,color .16s ease}
.cm-btn:hover,.dsh-st-btn:hover:not(:disabled),.vr-btn:hover:not(:disabled){border-color:var(--dsw-alias-border-l3)!important;background:var(--dsw-alias-bg-layer-3)!important;color:var(--dsw-alias-label-primary)!important}
.cm-btn:focus-visible,.dsh-st-btn:focus-visible,.vr-btn:focus-visible{outline:2px solid var(--dsw-alias-border-l3)!important;outline-offset:2px!important}
.cm-btn svg{width:14px;height:14px}
.cm-btn.primary,.dsh-st-btn--primary{border-color:var(--dsw-alias-border-l3)!important;background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)!important}
.cm-btn.danger,.cm-danger-action,.dsa-delete-confirm{border-color:var(--dsw-alias-state-error-primary)!important;background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-state-error-primary)!important}
.cm-confirm-modal{width:min(420px,90vw)!important}
.cm-confirm-copy{display:grid;gap:8px;color:var(--dsw-alias-label-secondary);font-size:13px;line-height:20px}
.cm-confirm-copy p{margin:0}
.cm-confirm-copy code{overflow-wrap:anywhere;color:var(--dsw-alias-label-tertiary);font-size:12px}
.cm-tooltip{border-color:var(--dsw-alias-border-l2)!important;background:var(--dsw-specific-menu)!important;color:var(--dsw-alias-label-primary)!important;box-shadow:var(--dsw-shadow-lv3)!important}
.cm-item,.dsh-st-card,.dsh-st-empty,.dsa-row,.dsa-question{border:1px solid var(--dsw-alias-border-l1)!important;border-radius:8px!important;background:var(--dsw-alias-bg-layer-2)!important;box-shadow:none!important}
.dsa-group-head:focus-visible,.dsa-row-main:focus-visible,.dsa-delete-btn:focus-visible{outline:2px solid var(--dsw-alias-border-l3)!important;outline-offset:2px!important}
.dsa-row-main:hover strong{color:var(--dsw-alias-label-primary)!important}
.vr-check{appearance:none!important;display:inline-grid!important;place-items:center!important;width:16px!important;height:16px!important;border:1px solid var(--dsw-alias-border-l2)!important;border-radius:4px!important;background:var(--dsw-alias-bg-layer-2)!important}
.vr-check:checked::after{content:"";width:6px;height:6px;border-radius:50%;background:var(--dsw-static-neutral-bluish-00)}
.vr-check:checked{background:var(--dsw-static-green-500)!important}
/* Settings \u2192 Plugins: integrated cards reuse the native PluginCard shell. */
.vbr-card{position:relative;isolation:auto;overflow:hidden;transform:none!important;border:.5px solid var(--dsw-alias-border-l4)!important;border-radius:16px!important;background:var(--dsw-alias-bg-layer-3)!important;box-shadow:none!important;transition:border-color .16s ease,background-color .16s ease!important}
.vbr-card::before,.vbr-card::after{content:none!important;display:none!important}
.vbr-card:hover{border-color:var(--dsw-alias-label-dimmed)!important;background:var(--dsw-alias-bg-layer-3)!important;box-shadow:none!important;transform:none!important}
.vbr-card-open{border-color:var(--dsw-alias-label-dimmed)!important;background:var(--dsw-alias-bg-layer-2)!important;box-shadow:none!important;transform:none!important}
.vbr-card-header{display:flex!important;align-items:center!important;gap:12px!important;width:100%;min-width:0;padding:14px 16px!important;border:0!important;border-radius:12px!important;background:none!important;color:inherit!important;font:inherit!important;text-align:left;cursor:pointer}
.vbr-card-header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary)!important;outline-offset:-2px!important}
.vbr-card-head-text{display:flex!important;flex-direction:column;flex:1;gap:4px;min-width:0}
.vbr-card-name{color:var(--dsw-alias-label-primary)!important;font-size:15px!important;font-weight:600!important;line-height:1.4!important}
.vbr-card-description{color:var(--dsw-alias-label-tertiary)!important;font-size:13px!important;line-height:1.5!important}
.vbr-card-chevron{margin-left:auto!important;flex:none;color:var(--dsw-alias-label-tertiary)!important;transition:transform .16s ease!important}
.vbr-card-open .vbr-card-chevron{transform:rotate(180deg)!important}
.vbr-body{border-top:.5px solid var(--dsw-alias-border-l2)!important;margin:0 16px!important;padding-bottom:8px!important}
/* The trimmed Vision Bridge panel sits inside the shared card body. */
.vbr-body .vbr{max-width:none;gap:10px;padding:12px 0 4px}
.vbr-field>label{color:var(--dsw-alias-label-secondary);font-size:13px;font-weight:500;margin:0}
.vbr-body .row{margin-top:4px}
.vbr-body .row>button{appearance:none;font:inherit;cursor:pointer;border:1px solid var(--dsw-alias-border-l2)!important;border-radius:8px!important;background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)!important;padding:5px 14px!important;font-size:13px!important;line-height:1.5!important}
.vbr-body .row>button.primary{border-color:transparent!important;background:var(--dsw-alias-label-primary)!important;color:var(--dsw-alias-bg-layer-3)!important}
.vbr-body .row>button:disabled{opacity:.4;cursor:default}
@media (prefers-reduced-motion:reduce){.kb-footer-entry,.dsa-footer-entry,.kb-icon-button,.cm-ico,.dsh-st-icon,.dsh-st-more,.cm-switch,.cm-switch::after,.dsh-st-switch,.dsh-st-switch::after,.dsh-st-overview-toggle>span,.dsh-st-overview-toggle>span::after,[role="dialog"] label>input[type="checkbox"]+span[aria-hidden="true"],[role="dialog"] label>input[type="checkbox"]+span[aria-hidden="true"]>span,.vbr-card,.vbr-card-chevron{transition:none!important;animation:none!important}}
`;
function installBaseStyles() {
  const existing = document.querySelector(`style[data-plugin-css="${BASE_STYLE_ID}"]`);
  if (existing !== null) return () => {
  };
  const style = document.createElement("style");
  style.dataset.plugin = "@kiligzzz/dsh-kiligz-base";
  style.dataset.pluginCss = BASE_STYLE_ID;
  style.textContent = BASE_CSS;
  document.head.appendChild(style);
  return () => style.remove();
}

// src/client/index.jsx
var inject = ["slots", "locale", "connection"];
var NS = "dsh-kiligz-base";
var dictionaries = {
  zh: {
    automation: "\u5B9A\u65F6\u4EFB\u52A1",
    skill: "SKILL \u7BA1\u7406",
    mcp: "MCP \u7BA1\u7406",
    close: "\u5173\u95ED",
    openSkillsDirectory: "\u6253\u5F00 Skill \u76EE\u5F55",
    actionFailed: "\u64CD\u4F5C\u5931\u8D25"
  },
  en: {
    automation: "Scheduled tasks",
    skill: "SKILL management",
    mcp: "MCP management",
    close: "Close",
    openSkillsDirectory: "Open Skill directory",
    actionFailed: "Action failed"
  }
};
var ENTRY_DEFINITIONS = [
  { id: "automation", order: 2, labelKey: "automation", Icon: ScheduleIcon },
  { id: "skill", order: 3, labelKey: "skill", Icon: SkillIcon },
  { id: "mcp", order: 4, labelKey: "mcp", Icon: McpIcon }
];
async function capabilityAction(path) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}"
  });
  const value = await response.json();
  if (!response.ok || value?.ok !== true) throw new Error(value?.error ?? "Request failed");
}
function ModalFocusScope({ children }) {
  const rootRef = import_react2.default.useRef(null);
  import_react2.default.useEffect(() => {
    const root = rootRef.current;
    const dialog = root?.closest('[role="dialog"]');
    if (!(dialog instanceof HTMLElement)) return void 0;
    const controls = () => [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')].filter((node) => {
      if (!(node instanceof HTMLElement) || node.hidden) return false;
      const style = window.getComputedStyle(node);
      return style.display !== "none" && style.visibility !== "hidden";
    });
    const preferred = root.querySelector('.cm-search, .dsh-st-search, input:not([type="hidden"]), textarea, select, button:not(:disabled)');
    const first = preferred instanceof HTMLElement ? preferred : controls()[0];
    if (first instanceof HTMLElement) first.focus();
    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const items = controls();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };
    dialog.addEventListener("keydown", onKeyDown);
    return () => dialog.removeEventListener("keydown", onKeyDown);
  }, []);
  return import_react2.default.createElement("div", { ref: rootRef, className: "kb-modal-focus" }, children);
}
function AutomationPanel({ panel, rpc, t, permissionT, modelT, onClose }) {
  const fallbackRuntime = import_react2.default.useMemo(() => panel.createAutomationRuntime(rpc), [panel, rpc]);
  return import_react2.default.createElement(panel.AutomationView, {
    t,
    permissionT,
    modelT,
    runtime: panel.runtime ?? fallbackRuntime,
    closeSettings: onClose
  });
}
function SkillPanel({ panel, t, sessionId }) {
  const [error, setError] = import_react2.default.useState("");
  const openDirectory = () => {
    setError("");
    void capabilityAction("/capabilities-api/skill/open-directory").catch((cause) => {
      setError(cause instanceof Error ? cause.message : t("actionFailed"));
    });
  };
  return import_react2.default.createElement(
    "div",
    { className: "kb-manager-panel" },
    import_react2.default.createElement(
      "div",
      { className: "kb-manager-actions" },
      import_react2.default.createElement("button", {
        type: "button",
        className: "kb-icon-button",
        title: t("openSkillsDirectory"),
        "aria-label": t("openSkillsDirectory"),
        onClick: openDirectory
      }, import_react2.default.createElement(import_dsh_client_ui_primitives.IconFolderOpenOutline16, { size: 16 }))
    ),
    error.length > 0 ? import_react2.default.createElement("p", { className: "kb-inline-error", role: "alert" }, error) : null,
    import_react2.default.createElement(panel.SkillPage, { sessionId })
  );
}
function ManagerBody({ entryId, panels, rpc, automationT, permissionT, modelT, t, onClose, sessionId }) {
  if (entryId === "automation" && panels.automation !== void 0) {
    return import_react2.default.createElement(AutomationPanel, {
      panel: panels.automation,
      rpc,
      t: automationT,
      permissionT,
      modelT,
      onClose
    });
  }
  if (entryId === "skill" && panels.skillMcp !== void 0) {
    return import_react2.default.createElement(SkillPanel, { panel: panels.skillMcp, t, sessionId });
  }
  if (entryId === "mcp" && panels.skillMcp !== void 0) {
    return import_react2.default.createElement(panels.skillMcp.McpPage);
  }
  return import_react2.default.createElement("p", { className: "kb-inline-error", role: "alert" }, t("actionFailed"));
}
function FooterEntry({ wide, entryId, label, panels, rpc, automationT, permissionT, modelT, t, useSessions }) {
  const sessionId = useSessions((snapshot) => snapshot.current);
  const entry = ENTRY_DEFINITIONS.find((candidate) => candidate.id === entryId) ?? ENTRY_DEFINITIONS[0];
  const [open, setOpen] = import_react2.default.useState(false);
  const triggerRef = import_react2.default.useRef(null);
  const close = () => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };
  return import_react2.default.createElement(
    import_react2.default.Fragment,
    null,
    import_react2.default.createElement(
      "div",
      { className: wide ? "kb-footer-wrap" : "kb-footer-wrap kb-narrow" },
      import_react2.default.createElement(
        "button",
        {
          ref: triggerRef,
          type: "button",
          className: "kb-footer-entry",
          title: label,
          "aria-label": label,
          "aria-haspopup": "dialog",
          "aria-expanded": open,
          onClick: () => setOpen(true)
        },
        import_react2.default.createElement("span", { className: "kb-footer-icon" }, import_react2.default.createElement(entry.Icon, { size: 16 })),
        import_react2.default.createElement("span", { className: "kb-footer-label" }, label)
      )
    ),
    open ? import_react2.default.createElement(import_dsh_client_ui_primitives.Modal, {
      open: true,
      className: "kb-modal",
      contentClassName: "kb-modal-content",
      onClose: close,
      title: label,
      closeLabel: t("close")
    }, import_react2.default.createElement(
      ModalFocusScope,
      null,
      import_react2.default.createElement(ManagerBody, {
        entryId: entry.id,
        panels,
        rpc,
        automationT,
        permissionT,
        modelT,
        t,
        onClose: close,
        sessionId
      })
    )) : null
  );
}
function apply(ctx) {
  ctx.effect(installBaseStyles, "dsh-kiligz-base: unified styles");
  const panels = {};
  for (const factory of __dshKiligzFeatureFactories) {
    const feature = factory(require);
    if (feature.__dshKiligz?.AutomationView !== void 0) panels.automation = feature.__dshKiligz;
    if (feature.__dshKiligz?.SkillPage !== void 0) panels.skillMcp = feature.__dshKiligz;
    ctx.plugin(feature);
  }
  ctx.effect(() => ctx.locale.register(NS, dictionaries), "dsh-kiligz-base: locale");
  const t = ctx.locale.bind(NS);
  const automationT = ctx.locale.bind("dsh-automation");
  const permissionT = ctx.locale.bind("permission.access");
  const modelT = ctx.locale.bind("model");
  ctx.slots.inject("sidebar.footer.action", function* registerManagerEntries() {
    for (const entry of ENTRY_DEFINITIONS) {
      const label = () => t(entry.labelKey);
      yield ctx.slots.register({
        name: "sidebar.footer.action",
        id: `dsh-kiligz-base-${entry.id}`,
        order: entry.order,
        label,
        locale: NS,
        inject: () => ({
          entryId: entry.id,
          label: label(),
          panels,
          rpc: ctx.connection.rpc,
          automationT,
          permissionT,
          modelT,
          t
        })
      }, FooterEntry);
    }
  });
}

return { apply: module.exports.apply, inject: module.exports.inject }; } });
