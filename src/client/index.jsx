import React from 'react'
import { installBaseStyles } from './styles.js'

export const inject = ['slots', 'locale']

const NS = 'dsh-kiligz-base'

const dictionaries = {
  zh: {
    automation: '定时任务',
    skill: 'SKILL 管理',
    mcp: 'MCP 管理',
    archive: '已归档会话',
    settings: '设置',
    unavailable: '设置页面尚未加载。',
  },
  en: {
    automation: 'Scheduled tasks',
    skill: 'SKILL management',
    mcp: 'MCP management',
    archive: 'Archived sessions',
    settings: 'Settings',
    unavailable: 'The settings page is not available yet.',
  },
}

function icon(kind) {
  const common = { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: '1.4', strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (kind === 'automation') return React.createElement('svg', common, React.createElement('circle', { cx: '8', cy: '8', r: '5.5' }), React.createElement('path', { d: 'M8 5v3l2 1.5' }))
  if (kind === 'skill') return React.createElement('svg', common, React.createElement('path', { d: 'M6.1 2.5a1.8 1.8 0 0 0-3.6 0v1.1H1.4v3h1.1v1.1a1.8 1.8 0 0 0 3.6 0V6.6h1.1v-3H6.1V2.5Z' }), React.createElement('path', { d: 'M9.2 4h2.4v2.1a1.8 1.8 0 1 1 0 3.6v2.1H9.2' }), React.createElement('path', { d: 'M6.1 11.5v2h3' }))
  if (kind === 'mcp') return React.createElement('svg', common, React.createElement('circle', { cx: '4', cy: '4', r: '1.5' }), React.createElement('circle', { cx: '12', cy: '5.5', r: '1.5' }), React.createElement('circle', { cx: '7.5', cy: '12', r: '1.5' }), React.createElement('path', { d: 'm5.3 4.6 5.2.7M5 5.3l1.7 5.2m4.5-3.5-2.5 3.7' }))
  return React.createElement('svg', common, React.createElement('path', { d: 'M2.5 3h11v3h-11zM3 6h10v7H3zM6.5 9h3' }))
}

/** Opens a Settings section by the locale-owned labels rendered by the shell. */
function openSettingsSection(labels) {
  const launcher = [...document.querySelectorAll('button[aria-haspopup="dialog"]')].find((node) => /(^|\s)(设置|settings)(\s|$)/i.test(`${node.textContent ?? ''} ${node.getAttribute('aria-label') ?? ''}`))
  if (document.querySelector('[role="dialog"]') === null) launcher?.click()
  const select = () => {
    const target = [...document.querySelectorAll('[role="dialog"] nav button')].find((node) => labels.includes(node.textContent?.replace(/\s+/g, ' ').trim() ?? ''))
    if (target instanceof HTMLButtonElement) {
      target.click()
      return true
    }
    return false
  }
  if (select()) return
  const observer = new MutationObserver(() => {
    if (select()) observer.disconnect()
  })
  observer.observe(document.body, { childList: true, subtree: true })
  window.setTimeout(() => observer.disconnect(), 1200)
}

function BaseFooter({ wide, t }) {
  const entries = [
    { id: 'automation', label: t('automation'), action: () => openSettingsSection(['定时任务', 'Scheduled tasks']) },
    { id: 'skill', label: t('skill'), action: () => openSettingsSection(['Skill', 'SKILL 管理', 'SKILL management']) },
    { id: 'mcp', label: t('mcp'), action: () => openSettingsSection(['MCP', 'MCP 管理', 'MCP management']) },
  ]
  return React.createElement('div', { className: 'kb-footer-stack', 'data-wide': String(wide) }, entries.map((entry) => React.createElement(
    'div', { className: 'kb-footer-row', key: entry.id },
    React.createElement('button', {
      type: 'button',
      className: 'kb-footer-button',
      title: entry.label,
      'aria-label': entry.label,
      onClick: entry.action,
    },
    React.createElement('span', { className: 'kb-footer-icon' }, icon(entry.id)),
    React.createElement('span', { className: 'kb-footer-label' }, entry.label)),
  )))
}

export function apply(ctx) {
  ctx.effect(installBaseStyles, 'dsh-kiligz-base: unified styles')
  for (const factory of __dshKiligzFeatureFactories) {
    const feature = factory(require)
    ctx.plugin(feature)
  }
  ctx.effect(() => ctx.locale.register(NS, dictionaries), 'dsh-kiligz-base: locale')
  const t = ctx.locale.bind(NS)
  ctx.slots.inject('sidebar.footer.action', () => ctx.slots.register({
    name: 'sidebar.footer.action',
    id: 'dsh-kiligz-base-tools',
    order: 3,
    label: () => t('automation'),
    inject: () => ({ t }),
  }, BaseFooter))
}
