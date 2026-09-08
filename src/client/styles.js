/** Shared semantic-token UI normalization for all integrated feature surfaces. */
export const BASE_STYLE_ID = '@kiligzzz/dsh-kiligz-base/styles'

export const BASE_CSS = `
div:has(> [data-slot="sidebar.footer.action"]){flex-direction:column!important;align-items:stretch!important;gap:2px!important}
.kb-footer-stack{display:flex;flex-direction:column;width:100%;gap:2px;order:1}
.kb-footer-row{display:flex;width:100%;min-width:0;flex:none}
.dsa-footer-wrap{order:2}
.kb-footer-button{display:flex;align-items:center;justify-content:flex-start;gap:8px;width:100%;min-width:0;min-height:20px;padding:2px 8px;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-secondary);font:inherit;font-size:12px;line-height:16px;text-align:left;cursor:pointer}
.kb-footer-button:hover,.kb-footer-button:focus-visible{background:var(--dsw-specific-sidebar-nav-item-hover);color:var(--dsw-alias-label-primary);outline:none}
.kb-footer-button:focus-visible{box-shadow:inset 0 0 0 1px var(--dsw-alias-border-l2)}
.kb-footer-icon{display:inline-flex;flex:0 0 12px;width:12px;height:12px;align-items:center;justify-content:center;color:currentColor}
.kb-footer-icon svg{display:block;width:12px;height:12px;stroke:currentColor}
.kb-footer-label{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.kb-footer-stack[data-wide="false"]{width:auto;align-items:center}
.kb-footer-stack[data-wide="false"] .kb-footer-row{width:auto}
.kb-footer-stack[data-wide="false"] .kb-footer-button{justify-content:center;width:36px;height:20px;padding:2px 0;gap:0}
.kb-footer-stack[data-wide="false"] .kb-footer-label{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.kb-switch,.cm-switch,.dsh-st-switch,[role="switch"]{position:relative!important;width:30px!important;height:17px!important;min-width:30px!important;padding:0!important;border:0!important;border-radius:999px!important;background:var(--dsw-static-neutral-bluish-600)!important;box-shadow:none!important;appearance:none!important}
.kb-switch::after,.cm-switch::after,.dsh-st-switch::after,[role="switch"]::after{content:""!important;position:absolute!important;top:2px!important;left:2px!important;width:13px!important;height:13px!important;border-radius:50%!important;background:var(--dsw-static-neutral-bluish-00)!important;box-shadow:none!important;transform:none!important;transition:left .15s ease!important}
.kb-switch.is-on::after,.cm-switch.on::after,.dsh-st-switch.is-on::after,[role="switch"][aria-checked="true"]::after{left:15px!important;transform:none!important}
.kb-switch:focus-visible,.cm-switch:focus-visible,.dsh-st-switch:focus-visible,[role="switch"]:focus-visible{outline:1px solid var(--dsw-alias-border-l2)!important;outline-offset:2px!important}
[role="dialog"] input[type="checkbox"] + span[aria-hidden="true"]{width:30px!important;height:17px!important;padding:2px!important;border:0!important;border-radius:999px!important;background:var(--dsw-static-neutral-bluish-600)!important;box-shadow:none!important}
[role="dialog"] input[type="checkbox"] + span[aria-hidden="true"] span{width:13px!important;height:13px!important;background:var(--dsw-static-neutral-bluish-00)!important;transform:none!important}
[role="dialog"] input[type="checkbox"]:checked + span[aria-hidden="true"] span{transform:translateX(13px)!important;background:var(--dsw-static-neutral-bluish-00)!important}
[role="dialog"] input[type="checkbox"]:focus-visible + span[aria-hidden="true"]{outline:1px solid var(--dsw-alias-border-l2)!important;outline-offset:2px!important}
.cm-search,.cm-input,.cm-select,.cm-textarea,.dsh-st-search,.dsh-st-field input,.dsh-st-field select,.dsh-st-field textarea,.vr-input{border:1px solid var(--dsw-alias-border-l2)!important;border-radius:6px!important;background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)!important;box-shadow:none!important}
.cm-search:focus,.cm-input:focus,.cm-select:focus,.cm-textarea:focus,.dsh-st-search:focus,.dsh-st-field input:focus-visible,.dsh-st-field select:focus-visible,.dsh-st-field textarea:focus-visible,.vr-input:focus-visible{border-color:var(--dsw-alias-border-l2)!important;outline:1px solid var(--dsw-alias-border-l2)!important;outline-offset:1px!important}
.cm-btn,.dsh-st-btn,.vr-btn,.dshAcDiscard,.dshAcSave{border:1px solid var(--dsw-alias-border-l2)!important;border-radius:6px!important;background:var(--dsw-alias-bg-layer-2)!important;color:var(--dsw-alias-label-primary)!important;box-shadow:none!important}
.cm-btn:hover,.dsh-st-btn:hover:not(:disabled),.vr-btn:hover:not(:disabled),.dshAcDiscard:hover:not(:disabled),.dshAcSave:hover:not(:disabled){border-color:var(--dsw-alias-border-l2)!important;background:var(--dsw-alias-bg-layer-3)!important;color:var(--dsw-alias-label-primary)!important}
.cm-item,.dsh-st-card,.dsh-st-empty,.vr-card,.dshAcCard{border:1px solid var(--dsw-alias-border-l1)!important;border-radius:8px!important;background:var(--dsw-alias-bg-layer-2)!important;box-shadow:none!important}
.vr-check{appearance:none!important;display:inline-grid!important;place-items:center!important;width:16px!important;height:16px!important;border:1px solid var(--dsw-alias-border-l2)!important;border-radius:3px!important;background:var(--dsw-alias-bg-layer-2)!important}
.vr-check:checked::after{content:"";width:6px;height:6px;border-radius:50%;background:var(--dsw-static-neutral-bluish-00)}
.vr-check:checked{background:var(--dsw-static-neutral-bluish-600)!important}
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
