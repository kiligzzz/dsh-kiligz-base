/** Shared semantic-token UI normalization for all integrated feature surfaces. */
export const BASE_STYLE_ID = '@kiligzzz/dsh-kiligz-base/styles'

export const BASE_CSS = `
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
.cm-search,.cm-input,.cm-select,.cm-textarea,.dsh-st-search,.dsh-st-field input,.dsh-st-field select,.dsh-st-field textarea,.vr-input,.dshAcInput,.dshAcSelect{border:1px solid var(--dsw-alias-border-l2)!important;border-radius:8px!important;background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)!important;box-shadow:none!important}
.cm-search:focus,.cm-input:focus,.cm-select:focus,.cm-textarea:focus,.dsh-st-search:focus,.dsh-st-field input:focus-visible,.dsh-st-field select:focus-visible,.dsh-st-field textarea:focus-visible,.vr-input:focus-visible,.dshAcInput:focus-visible,.dshAcSelect:focus-visible{border-color:var(--dsw-alias-border-l3)!important;outline:2px solid color-mix(in srgb,var(--dsw-alias-border-l3) 45%,transparent)!important;outline-offset:1px!important}
.cm-btn,.dsh-st-btn,.vr-btn,.dshAcDiscard,.dshAcSave{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:32px;border:1px solid var(--dsw-alias-border-l2)!important;border-radius:8px!important;background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)!important;box-shadow:none!important;transition:background-color .16s ease,border-color .16s ease,color .16s ease}
.cm-btn:hover,.dsh-st-btn:hover:not(:disabled),.vr-btn:hover:not(:disabled),.dshAcDiscard:hover:not(:disabled),.dshAcSave:hover:not(:disabled){border-color:var(--dsw-alias-border-l3)!important;background:var(--dsw-alias-bg-layer-3)!important;color:var(--dsw-alias-label-primary)!important}
.cm-btn:focus-visible,.dsh-st-btn:focus-visible,.vr-btn:focus-visible,.dshAcDiscard:focus-visible,.dshAcSave:focus-visible{outline:2px solid var(--dsw-alias-border-l3)!important;outline-offset:2px!important}
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
/* Settings → Plugins: integrated cards reuse the native PluginCard shell. */
.vbr-card,.dshAcCard{position:relative;isolation:auto;overflow:hidden;transform:none!important;border:.5px solid var(--dsw-alias-border-l4)!important;border-radius:16px!important;background:var(--dsw-alias-bg-layer-3)!important;box-shadow:none!important;transition:border-color .16s ease,background-color .16s ease!important}
.vbr-card::before,.vbr-card::after,.dshAcCard::before,.dshAcCard::after{content:none!important;display:none!important}
.vbr-card:hover,.dshAcCard:hover{border-color:var(--dsw-alias-label-dimmed)!important;background:var(--dsw-alias-bg-layer-3)!important;box-shadow:none!important;transform:none!important}
.vbr-card-open,.dshAcCardOpen{border-color:var(--dsw-alias-label-dimmed)!important;background:var(--dsw-alias-bg-layer-2)!important;box-shadow:none!important;transform:none!important}
.vbr-card-header,.dshAcHeader{display:flex!important;align-items:center!important;gap:12px!important;width:100%;min-width:0;padding:14px 16px!important;border:0!important;border-radius:12px!important;background:none!important;color:inherit!important;font:inherit!important;text-align:left;cursor:pointer}
.vbr-card-header:focus-visible,.dshAcHeader:focus-visible{outline:2px solid var(--dsw-alias-brand-primary)!important;outline-offset:-2px!important}
.vbr-card-head-text,.dshAcHeadText{display:flex!important;flex-direction:column;flex:1;gap:4px;min-width:0}
.vbr-card-name,.dshAcName{color:var(--dsw-alias-label-primary)!important;font-size:15px!important;font-weight:600!important;line-height:1.4!important}
.vbr-card-description,.dshAcDescription{color:var(--dsw-alias-label-tertiary)!important;font-size:13px!important;line-height:1.5!important}
.vbr-card-chevron,.dshAcChevron{margin-left:auto!important;flex:none;color:var(--dsw-alias-label-tertiary)!important;transition:transform .16s ease!important}
.vbr-card-open .vbr-card-chevron,.dshAcChevronOpen{transform:rotate(180deg)!important}
.vbr-body,.dshAcBody{border-top:.5px solid var(--dsw-alias-border-l2)!important;margin:0 16px!important;padding-bottom:8px!important}
.dshAcFooter{display:flex!important;justify-content:flex-end!important;align-items:center!important;gap:8px!important;padding:12px 0 4px!important;border-top:.5px solid var(--dsw-alias-border-l2)!important}
.dshAcDiscard{appearance:none;font:inherit;cursor:pointer;border:1px solid var(--dsw-alias-border-l2)!important;border-radius:8px!important;background:transparent!important;color:var(--dsw-alias-label-secondary)!important;padding:5px 14px!important;font-size:13px!important;line-height:1.5!important}
.dshAcDiscard:hover:not(:disabled){color:var(--dsw-alias-label-primary)!important;border-color:var(--dsw-alias-label-dimmed)!important;background:transparent!important}
.dshAcSave{appearance:none;font:inherit;cursor:pointer;border:1px solid transparent!important;border-radius:8px!important;background:var(--dsw-alias-label-primary)!important;color:var(--dsw-alias-bg-layer-3)!important;padding:5px 14px!important;font-size:13px!important;line-height:1.5!important}
.dshAcSave:disabled,.dshAcDiscard:disabled{opacity:.4!important;cursor:default}
.dshAcRelayMark,.dshAcJourney,.dshAcGithub{display:none!important}
@media (prefers-reduced-motion:reduce){.kb-footer-entry,.dsa-footer-entry,.kb-icon-button,.cm-ico,.dsh-st-icon,.dsh-st-more,.cm-switch,.cm-switch::after,.dsh-st-switch,.dsh-st-switch::after,.dsh-st-overview-toggle>span,.dsh-st-overview-toggle>span::after,[role="dialog"] label>input[type="checkbox"]+span[aria-hidden="true"],[role="dialog"] label>input[type="checkbox"]+span[aria-hidden="true"]>span,.vbr-card,.dshAcCard,.vbr-card-chevron,.dshAcChevron{transition:none!important;animation:none!important}}
`

export function installBaseStyles() {
  const existing = document.querySelector(`style[data-plugin-css="${BASE_STYLE_ID}"]`)
  if (existing !== null) return () => {}
  const style = document.createElement('style')
  style.dataset.plugin = '@kiligzzz/dsh-kiligz-base'
  style.dataset.pluginCss = BASE_STYLE_ID
  style.textContent = BASE_CSS
  document.head.appendChild(style)
  return () => style.remove()
}
