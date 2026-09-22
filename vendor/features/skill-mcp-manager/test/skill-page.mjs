import assert from 'node:assert/strict'
import fs from 'node:fs'
import vm from 'node:vm'

const source = fs.readFileSync(new URL('../lib/client.js', import.meta.url), 'utf8')
const state = []
let cursor = 0
let mounted = false
let effect
let component
let plugin
let response
let timer
const requests = []
const React = {
  createElement(type, props, ...children) { return { type, props: props || {}, children } },
  useState(initial) {
    const index = cursor++
    if (!(index in state)) state[index] = initial
    return [state[index], (value) => { state[index] = value }]
  },
  useRef(initial) {
    const index = cursor++
    if (!(index in state)) state[index] = { current: initial }
    return state[index]
  },
  useEffect(callback) { if (!mounted) effect = callback },
}
vm.runInNewContext(source, {
  window: { __ModuleLoader__: { load(entry) { plugin = entry.factory((id) => id === 'react' ? React : {}) } } },
  AbortController,
  setTimeout(callback) { timer = callback; return 1 },
  clearTimeout() {},
  fetch(url, options) { requests.push({ url, options }); return response(url, options) },
})
plugin.apply({
  uiWorkspace: { async pickDirectory() { return null } },
  slots: {
    inject(name, callback) { callback() },
    register(spec, render) { if (spec.id === 'capabilities-skills') component = render().type },
  },
})
const render = () => { cursor = 0; return component({ sessionId: 'test-session', pickDirectory: async () => null }) }
const text = (node) => typeof node === 'string' ? node : node && typeof node === 'object' ? (node.children || []).flat(Infinity).map(text).join(' ') : ''
const findButton = (node, label) => {
  if (!node || typeof node !== 'object') return undefined
  if (node.type === 'button' && text(node).includes(label)) return node
  return (node.children || []).flat(Infinity).map((child) => findButton(child, label)).find(Boolean)
}
const flush = () => new Promise((resolve) => setImmediate(resolve))
response = async () => ({ ok: false, status: 404 })
render()
const cleanup = effect()
mounted = true
await flush()
let view = render()
assert.match(text(view), /接口尚未加载/)
assert.match(text(view), /列表加载失败/)
assert.doesNotMatch(text(view), /加载中…/)
assert.equal(requests[0].url, '/capabilities-api/skills?sessionId=test-session')
response = async () => ({ ok: true, status: 200, async json() { return { ok: true, skills: { catalog: [{ name: 'available-skill' }] } } } })
await findButton(view, '重试').props.onClick()
view = render()
assert.match(text(view), /available-skill/)
assert.doesNotMatch(text(view), /接口尚未加载/)
response = async () => ({ ok: false, status: 400, async json() { return { error: 'provider failed' } } })
// Mount a fresh page to exercise a stalled request and the timeout state.
cleanup()
state.length = 0
mounted = false
response = (url, { signal }) => new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(signal.reason), { once: true }))
render()
const cleanupStalled = effect()
mounted = true
assert.match(text(render()), /加载中…/)
timer()
await flush()
view = render()
assert.match(text(view), /加载超时/)
assert.doesNotMatch(text(view), /加载中…/)
assert.equal(findButton(view, '重试').props.disabled, false)
cleanupStalled()
console.log('PASS Skill page: independent request, actionable old-host error, retry recovery and timeout settlement')
