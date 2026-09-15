/**
 * @kiligzzz/dsh-session-archive — read-only archived Session browser.
 *
 * DSH 0.1.5-rc.2 exposes archiveSession but no public inverse or coordinated
 * permanent-delete API. This plugin therefore consumes only public read
 * contracts: archivedSessionIds and read-only session persistence handles.
 */

import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Context } from 'cordis'
import type {} from '@deepseek-ai/dsh-host-webserver'

/** Exact route used by the browser panel. */
export const ROUTE = '/_dsh/session-archive'

/** Stable Cordis plugin name. */
export const name = '@kiligzzz/dsh-session-archive'

/** Public services required by the read-only surface. */
export const inject = ['workspaceRegistry', 'sessionPersistence']

const MAX_BODY = 64 * 1024
const QUESTION_LIMIT = 100

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/** Content-restricted JSON response. */
function responseJson(res: ServerResponse, status: number, body: unknown): void {
  const bytes = Buffer.from(JSON.stringify(body))
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Content-Length', String(bytes.length))
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'")
  res.writeHead(status)
  res.end(bytes)
}

/** Reject cross-origin mutation-shaped requests even though this route is read-only. */
function sameOriginPost(req: IncomingMessage): boolean {
  const fetchSite = req.headers['sec-fetch-site']
  if (fetchSite === 'cross-site') return false
  const origin = req.headers.origin
  if (origin === undefined) return fetchSite === 'same-origin' || fetchSite === 'same-site' || fetchSite === 'none'
  const host = req.headers.host
  if (host === undefined) return false
  try {
    const parsed = new URL(origin)
    return (parsed.protocol === 'http:' || parsed.protocol === 'https:') && parsed.host === host
  } catch {
    return false
  }
}

/** Read a small JSON body (Content-Type enforced). */
async function readJson(req: IncomingMessage): Promise<unknown> {
  const contentType = req.headers['content-type']?.split(';')[0]?.trim().toLowerCase()
  if (contentType !== 'application/json') throw new TypeError('Content-Type must be application/json')
  const chunks: Buffer[] = []
  let bytes = 0
  for await (const chunk of req) {
    const part = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    bytes += part.length
    if (bytes > MAX_BODY) throw new RangeError(`request body exceeds ${MAX_BODY} bytes`)
    chunks.push(part)
  }
  if (chunks.length === 0) throw new TypeError('request body is empty')
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
}

function publicMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

interface RegistryFace {
  readonly archivedSessionIds: readonly string[]
}

interface SessionPersistenceFace {
  open(id: string, access: 'read', options?: { signal?: AbortSignal }): Promise<SessionReadHandle>
}

interface SessionReadHandle {
  readonly header: { id: string; cwd?: string }
  read(offset?: number, length?: number, options?: { signal?: AbortSignal }): Promise<{
    eventState: string
    events: readonly SessionLogEvent[]
  }>
  close(): Promise<void>
}

interface SessionLogEvent {
  seq: number
  type: string
  data?: Record<string, unknown>
  time?: number
}

function blockText(block: unknown): string | undefined {
  if (typeof block !== 'object' || block === null) return undefined
  const record = block as Record<string, unknown>
  if (typeof record.text === 'string' && record.text.length > 0) return record.text
  if (typeof record.content === 'string' && record.content.length > 0) return record.content
  return undefined
}

function contentLines(value: unknown, limit = 8): string[] {
  const lines: string[] = []
  const push = (text: unknown, cap = 300): void => {
    if (typeof text !== 'string') return
    const normalized = text.trim()
    if (normalized.length === 0) return
    lines.push(normalized.length > cap ? `${normalized.slice(0, cap)}…` : normalized)
  }
  if (Array.isArray(value)) {
    for (const block of value) push(blockText(block))
  } else {
    push(value)
  }
  return lines.slice(0, limit)
}

/** Read-only façade over the registry-global archived-session set. */
export class WorkspaceArchive {
  constructor(
    private readonly registry: RegistryFace,
    private readonly persistence: SessionPersistenceFace,
  ) {}

  /** Archived ids in host order. The clone prevents callers mutating registry state. */
  list(): string[] {
    return [...this.registry.archivedSessionIds]
  }

  /** Read one archived Session preview through the public persistence handle. */
  async preview(sessionId: string): Promise<{
    title: string | undefined
    cwd: string | undefined
    questions: Array<{ seq: number; text: string[] }>
  }> {
    if (typeof sessionId !== 'string' || sessionId.length === 0) throw new TypeError('sessionId must be a non-empty string')
    if (!this.registry.archivedSessionIds.includes(sessionId)) {
      const error = new Error('session is not archived') as Error & { code?: string }
      error.code = 'not-archived'
      throw error
    }

    const handle = await this.persistence.open(sessionId, 'read')
    let events: readonly SessionLogEvent[]
    try {
      ;({ events } = await handle.read())
    } finally {
      await handle.close()
    }

    let title: string | undefined
    for (let i = events.length - 1; i >= 0; i--) {
      const event = events[i]
      if (event.type !== 'session/title') continue
      const data = event.data ?? {}
      if (typeof data.title === 'string' && data.title.length > 0) {
        title = data.title
        break
      }
    }

    const questions: Array<{ seq: number; text: string[] }> = []
    for (let i = events.length - 1; i >= 0 && questions.length < QUESTION_LIMIT; i--) {
      const event = events[i]
      if (event.type !== 'user/message') continue
      const data = event.data ?? {}
      const source = isRecord(data.source) ? data.source : undefined
      const sourceKind = typeof source?.kind === 'string' ? source.kind : 'user'
      if (sourceKind !== 'user') continue
      const text = contentLines(data.content)
      if (text.length > 0) questions.push({ seq: event.seq, text })
    }

    return {
      title,
      cwd: typeof handle.header.cwd === 'string' ? handle.header.cwd : undefined,
      questions,
    }
  }
}

async function handle(archive: WorkspaceArchive, req: IncomingMessage, res: ServerResponse): Promise<void> {
  if (req.method === 'GET') {
    responseJson(res, 200, { ok: true, value: { archivedSessionIds: archive.list(), capabilities: { preview: true, restore: false, delete: false } } })
    return
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    responseJson(res, 405, { ok: false, error: { code: 'method-not-allowed', message: 'Use GET or POST' } })
    return
  }
  if (!sameOriginPost(req)) {
    responseJson(res, 403, { ok: false, error: { code: 'origin-rejected', message: 'The request must originate from this DSH Web application' } })
    return
  }

  try {
    const body = await readJson(req)
    if (!isRecord(body) || body.action !== 'preview') {
      responseJson(res, 409, { ok: false, error: { code: 'unsupported-action', message: 'Current DSH does not expose a safe restore or permanent-delete API' } })
      return
    }
    if (typeof body.sessionId !== 'string' || body.sessionId.length === 0) throw new TypeError('sessionId is required')
    const preview = await archive.preview(body.sessionId)
    responseJson(res, 200, { ok: true, value: { preview } })
  } catch (error) {
    const code = typeof error === 'object' && error !== null && typeof (error as { code?: unknown }).code === 'string'
      ? String((error as { code: string }).code)
      : 'preview-failed'
    responseJson(res, error instanceof RangeError ? 413 : 400, { ok: false, error: { code, message: publicMessage(error) } })
  }
}

/** Plugin entry. */
export function apply(ctx: Context): void {
  const archive = new WorkspaceArchive(ctx.workspaceRegistry, ctx.sessionPersistence)
  ctx.provide('workspaceArchive', archive)
  ctx.inject(['webServer'], (webCtx) => {
    const detach = webCtx.webServer.register({
      kind: 'exact',
      path: ROUTE,
      handler: (req, res) => { void handle(archive, req, res) },
    })
    webCtx.effect(() => detach, 'dsh-session-archive: route')
  })
}
