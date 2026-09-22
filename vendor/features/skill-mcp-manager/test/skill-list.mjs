import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { apply } from '../index.js'

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-skill-list-'))
const previousHome = process.env.DSH_HOME
process.env.DSH_HOME = temp
fs.writeFileSync(path.join(temp, 'mcp.json'), JSON.stringify({
  unavailable: { transport: 'streamable-http', url: 'https://invalid.example/mcp', auth: { type: 'oauth' } },
}))
const cleanups = []
let handler
let manager
let snapshotOptions
let snapshots = 0
let failSnapshot = false
const agent = { session: { header: { cwd: temp } } }
const ctx = {
  tools: { register() { return () => {} } },
  agents: { get(id) { assert.equal(id, 'session-one'); return agent } },
  skills: { async snapshot(options) {
    snapshotOptions = options
    snapshots++
    if (failSnapshot) throw new Error('skill provider failed')
    return { complete: true, skills: [{ name: 'test-skill', source: 'user-dsh', resourceBase: { kind: 'directory', path: path.join(temp, 'skills', 'test-skill') } }] }
  } },
  get(name) {
    if (name === 'credentials') return {}
    if (name === 'webServer') return { register(route) { handler = route.handler; return () => {} } }
  },
  provide(name, value) { if (name === 'capabilityManager') manager = value },
  on() { return () => {} },
  effect(callback) { const cleanup = callback(); if (typeof cleanup === 'function') cleanups.push(cleanup) },
}
const request = (url) => new Promise((resolve, reject) => {
  const timeout = setTimeout(() => reject(new Error('Skill list blocked on MCP status')), 1000)
  let status
  handler({ method: 'GET', url }, {
    writeHead(code) { status = code },
    end(body) { clearTimeout(timeout); resolve({ status, body: JSON.parse(body) }) },
  }).catch(reject)
})
try {
  apply(ctx)
  let mcpCalls = 0
  manager.listServers = () => { mcpCalls++; return new Promise(() => {}) }
  const result = await request('/capabilities-api/skills?sessionId=session-one')
  assert.equal(result.status, 200)
  assert.equal(result.body.skills.catalog[0].name, 'test-skill')
  assert.equal(result.body.skills.complete, true)
  assert.equal(mcpCalls, 0)
  assert.equal(snapshotOptions.scope, agent)
  assert.equal(snapshotOptions.cwd, temp)
  assert.ok(snapshotOptions.signal instanceof AbortSignal)
  failSnapshot = true
  const failure = await request('/capabilities-api/skills')
  assert.equal(failure.status, 400)
  assert.match(failure.body.error, /skill provider failed/)
  failSnapshot = false
  assert.equal((await request('/capabilities-api/skills')).status, 200)
  assert.equal(snapshots, 3)
  console.log('PASS Skill list remains independent of stalled MCP OAuth status; errors and retries return')
} finally {
  for (const cleanup of cleanups.reverse()) await cleanup()
  if (previousHome === undefined) delete process.env.DSH_HOME
  else process.env.DSH_HOME = previousHome
  fs.rmSync(temp, { recursive: true, force: true })
}
