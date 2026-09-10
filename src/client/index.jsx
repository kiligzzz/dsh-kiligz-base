import React from 'react'
import {
  IconFolderOpenOutline16,
  Modal,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { McpIcon, ScheduleIcon, SkillIcon } from './icons.jsx'
import { installBaseStyles } from './styles.js'

export const inject = ['slots', 'locale', 'connection']

const NS = 'dsh-kiligz-base'

const dictionaries = {
  zh: {
    automation: '定时任务',
    skill: 'SKILL 管理',
    mcp: 'MCP 管理',
    close: '关闭',
    openSkillsDirectory: '打开 Skill 目录',
    actionFailed: '操作失败',
  },
  en: {
    automation: 'Scheduled tasks',
    skill: 'SKILL management',
    mcp: 'MCP management',
    close: 'Close',
    openSkillsDirectory: 'Open Skill directory',
    actionFailed: 'Action failed',
  },
}

const ENTRY_DEFINITIONS = [
  { id: 'automation', order: 2, labelKey: 'automation', Icon: ScheduleIcon },
  { id: 'skill', order: 3, labelKey: 'skill', Icon: SkillIcon },
  { id: 'mcp', order: 4, labelKey: 'mcp', Icon: McpIcon },
]

async function capabilityAction(path) {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  })
  const value = await response.json()
  if (!response.ok || value?.ok !== true) throw new Error(value?.error ?? 'Request failed')
}

function ModalFocusScope({ children }) {
  const rootRef = React.useRef(null)
  React.useEffect(() => {
    const root = rootRef.current
    const dialog = root?.closest('[role="dialog"]')
    if (!(dialog instanceof HTMLElement)) return undefined
    const controls = () => [...dialog.querySelectorAll('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])')]
      .filter((node) => {
        if (!(node instanceof HTMLElement) || node.hidden) return false
        const style = window.getComputedStyle(node)
        return style.display !== 'none' && style.visibility !== 'hidden'
      })
    const preferred = root.querySelector('.cm-search, .dsh-st-search, input:not([type="hidden"]), textarea, select, button:not(:disabled)')
    const first = preferred instanceof HTMLElement ? preferred : controls()[0]
    if (first instanceof HTMLElement) first.focus()
    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return
      const items = controls()
      if (items.length === 0) return
      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault()
        lastItem.focus()
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }
    dialog.addEventListener('keydown', onKeyDown)
    return () => dialog.removeEventListener('keydown', onKeyDown)
  }, [])
  return React.createElement('div', { ref: rootRef, className: 'kb-modal-focus' }, children)
}

function AutomationPanel({ panel, rpc, t, permissionT, modelT, onClose }) {
  const fallbackRuntime = React.useMemo(() => panel.createAutomationRuntime(rpc), [panel, rpc])
  return React.createElement(panel.AutomationView, {
    t,
    permissionT,
    modelT,
    runtime: panel.runtime ?? fallbackRuntime,
    closeSettings: onClose,
  })
}

function SkillPanel({ panel, t }) {
  const [error, setError] = React.useState('')
  const openDirectory = () => {
    setError('')
    void capabilityAction('/capabilities-api/skill/open-directory').catch((cause) => {
      setError(cause instanceof Error ? cause.message : t('actionFailed'))
    })
  }
  return React.createElement('div', { className: 'kb-manager-panel' },
    React.createElement('div', { className: 'kb-manager-actions' },
      React.createElement('button', {
        type: 'button',
        className: 'kb-icon-button',
        title: t('openSkillsDirectory'),
        'aria-label': t('openSkillsDirectory'),
        onClick: openDirectory,
      }, React.createElement(IconFolderOpenOutline16, { size: 16 })),
    ),
    error.length > 0 ? React.createElement('p', { className: 'kb-inline-error', role: 'alert' }, error) : null,
    React.createElement(panel.SkillPage),
  )
}

function ManagerBody({ entryId, panels, rpc, automationT, permissionT, modelT, t, onClose }) {
  if (entryId === 'automation' && panels.automation !== undefined) {
    return React.createElement(AutomationPanel, {
      panel: panels.automation,
      rpc,
      t: automationT,
      permissionT,
      modelT,
      onClose,
    })
  }
  if (entryId === 'skill' && panels.skillMcp !== undefined) {
    return React.createElement(SkillPanel, { panel: panels.skillMcp, t })
  }
  if (entryId === 'mcp' && panels.skillMcp !== undefined) {
    return React.createElement(panels.skillMcp.McpPage)
  }
  return React.createElement('p', { className: 'kb-inline-error', role: 'alert' }, t('actionFailed'))
}

function FooterEntry({ wide, entryId, label, panels, rpc, automationT, permissionT, modelT, t }) {
  const entry = ENTRY_DEFINITIONS.find((candidate) => candidate.id === entryId) ?? ENTRY_DEFINITIONS[0]
  const [open, setOpen] = React.useState(false)
  const triggerRef = React.useRef(null)
  const close = () => {
    setOpen(false)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }
  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: wide ? 'kb-footer-wrap' : 'kb-footer-wrap kb-narrow' },
      React.createElement('button', {
        ref: triggerRef,
        type: 'button',
        className: 'kb-footer-entry',
        title: label,
        'aria-label': label,
        'aria-haspopup': 'dialog',
        'aria-expanded': open,
        onClick: () => setOpen(true),
      },
      React.createElement('span', { className: 'kb-footer-icon' }, React.createElement(entry.Icon, { size: 16 })),
      React.createElement('span', { className: 'kb-footer-label' }, label)),
    ),
    open ? React.createElement(Modal, {
      open: true,
      className: 'kb-modal',
      contentClassName: 'kb-modal-content',
      onClose: close,
      title: label,
      closeLabel: t('close'),
    }, React.createElement(ModalFocusScope, null,
      React.createElement(ManagerBody, {
        entryId: entry.id,
        panels,
        rpc,
        automationT,
        permissionT,
        modelT,
        t,
        onClose: close,
      }),
    )) : null,
  )
}

export function apply(ctx) {
  ctx.effect(installBaseStyles, 'dsh-kiligz-base: unified styles')
  const panels = {}
  for (const factory of __dshKiligzFeatureFactories) {
    const feature = factory(require)
    if (feature.__dshKiligz?.AutomationView !== undefined) panels.automation = feature.__dshKiligz
    if (feature.__dshKiligz?.SkillPage !== undefined) panels.skillMcp = feature.__dshKiligz
    ctx.plugin(feature)
  }
  ctx.effect(() => ctx.locale.register(NS, dictionaries), 'dsh-kiligz-base: locale')
  const t = ctx.locale.bind(NS)
  const automationT = ctx.locale.bind('dsh-automation')
  const permissionT = ctx.locale.bind('permission.access')
  const modelT = ctx.locale.bind('model')
  ctx.slots.inject('sidebar.footer.action', function* registerManagerEntries() {
    for (const entry of ENTRY_DEFINITIONS) {
      const label = () => t(entry.labelKey)
      yield ctx.slots.register({
        name: 'sidebar.footer.action',
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
          t,
        }),
      }, FooterEntry)
    }
  })
}
