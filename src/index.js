/**
 * Unified Host entry for dsh-kiligz-base.
 *
 * The Profile mounts one Loader row. This parent creates one child Cordis
 * fiber per feature, preserving each implementation's own inject declaration,
 * validated Config, routes, tools, settings, persistence, and teardown.
 */
import * as automation from '@michengai/dsh-automation'
import * as autoContinue from 'dsh-client-auto-continue'
import * as visionRouter from 'dsh-vision-router'
import * as betterSidebar from 'dsh-better-sidebar'
import * as appearance from '../vendor/features/ui-appearance/lib/index.js'
import * as sessionArchive from '../vendor/features/session-archive/lib/index.js'
import * as skillMcpManager from '../vendor/features/skill-mcp-manager/index.js'

export const name = '@kiligzzz/dsh-kiligz-base'

const AUTOMATION_DEFAULTS = {
  maxConcurrentRuns: 2,
  runTimeoutMinutes: 60,
  misfireGraceMinutes: 15,
  historyLimit: 200,
}

/** Mount all integrated feature fibers under this plugin's lifecycle. */
export function apply(ctx, config = {}) {
  ctx.plugin(automation, { ...AUTOMATION_DEFAULTS, ...config.automation })
  ctx.plugin(appearance)
  ctx.plugin(sessionArchive)
  ctx.plugin(skillMcpManager)
  ctx.plugin(autoContinue)
  ctx.plugin(visionRouter, { progressiveTools: false, ...config.vision })
  ctx.plugin(betterSidebar, config.betterSidebar)
}
