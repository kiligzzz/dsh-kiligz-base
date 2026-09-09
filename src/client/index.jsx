import React from 'react'
import {
  IconApiOutline14,
  IconClockOutline16,
  IconFolderOpenOutline16,
  IconSkillOutline16,
  Modal,
} from '@deepseek-ai/dsh-client-ui-primitives'
import { installBaseStyles } from './styles.js'

export const inject = ['slots', 'locale', 'connection']

const NS = 'dsh-kiligz-base'

const dictionaries = {
  zh: {
    automation: '定时任务',
    skill: 'SKILL 管理',
    mcp: 'MCP 管理',
    archive: '已归档会话',
    close: '关闭',
    openSkillsDirectory: '打开 Skill 目录',
    actionFailed: '操作失败',
  },
  en: {
    automation: 'Scheduled tasks',
    skill: 'SKILL management',
    mcp: 'MCP management',
    archive: 'Archived sessions',
    close: 'Close',
    openSkillsDirectory: 'Open Skill directory',
    actionFailed: 'Action failed',
  },
}

function footerIcon(kind) {
  if (kind === 'automation') return React.createElement(IconClockOutline16, { size: 15 })
  if (kind === 'skill') return React.createElement(IconSkillOutline16, { size: 15 })
  return React.createElement(IconApiOutline14, { size: 15 })
}

async function capabilityAction(path) {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  })
  const value = await response.json()
  if (!response.ok || value?.ok !== true) throw new Error(value?.error ?? 'Request failed')
}

function AutomationPanel({ panel, rpc, t, permissionT, modelT, onClose }) {
  const runtime = React.useMemo(() => panel.createAutomationRuntime(rpc), [panel, rpc])
  return React.createElement(panel.AutomationView, {
    t,
    permissionT,
    modelT,
    runtime,
    closeSettings: onClose,
  })
}

function SkillPanel({ panel, t }) {
  const [error, setError] = React.useState('')
  const openDirectory = () => {
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
    error.length > 0 ? React.createElement('p', { className: 'kb-inline-error', role: 'status' }, error) : null,
    React.createElement(panel.SkillPage),
  )
}

function ManagerModal({ active, panels, rpc, automationT, permissionT, modelT, t, onClose }) {
  if (active === null) return null
  let body
  if (active.id === 'automation' && panels.automation !== undefined) {
    body = React.createElement(AutomationPanel, {
      panel: panels.automation,
      rpc,
      t: automationT,
      permissionT,
      modelT,
      onClose,
    })
  } else if (active.id === 'skill' && panels.skillMcp !== undefined) {
    body = React.createElement(SkillPanel, { panel: panels.skillMcp, t })
  } else if (active.id === 'mcp' && panels.skillMcp !== undefined) {
    body = React.createElement(panels.skillMcp.McpPage)
  } else {
    body = React.createElement('p', { className: 'kb-inline-error', role: 'status' }, t('actionFailed'))
  }
  return React.createElement(Modal, {
    open: true,
    className: 'kb-modal',
    contentClassName: 'kb-modal-content',
    onClose,
    title: active.label,
    closeLabel: t('close'),
  }, body)
}

function BaseFooter({ wide, t, panels, rpc, automationT, permissionT, modelT }) {
  const [active, setActive] = React.useState(null)
  const entries = [
    { id: 'automation', label: t('automation') },
    { id: 'skill', label: t('skill') },
    { id: 'mcp', label: t('mcp') },
  ]
  return React.createElement(React.Fragment, null,
    React.createElement('div', { className: 'kb-footer-stack', 'data-wide': String(wide) }, entries.map((entry) => React.createElement(
      'div', { className: 'kb-footer-row', key: entry.id },
      React.createElement('button', {
        type: 'button',
        className: 'kb-footer-button',
        title: entry.label,
        'aria-label': entry.label,
        onClick: () => setActive(entry),
      },
      React.createElement('span', { className: 'kb-footer-icon' }, footerIcon(entry.id)),
      React.createElement('span', { className: 'kb-footer-label' }, entry.label)),
    ))),
    React.createElement(ManagerModal, {
      active,
      panels,
      rpc,
      automationT,
      permissionT,
      modelT,
      t,
      onClose: () => setActive(null),
    }),
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
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
    name: 'sidebar.footer.action',
    id: 'dsh-kiligz-base-tools',
    order: 3,
    label: () => t('automation'),
    inject: () => ({
      t,
      panels,
      rpc: ctx.connection.rpc,
      automationT,
      permissionT,
      modelT,
    }),
  }, BaseFooter))
}
