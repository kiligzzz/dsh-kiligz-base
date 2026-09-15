import assert from 'node:assert/strict'
import { createVisionToolFacade, VISION_TOOL_NAMES } from '../src/vision-tools.js'

assert.deepEqual(VISION_TOOL_NAMES, [
  'describe_image',
  'vision_ground',
  'vision_compare',
  'vision_ocr',
])
assert.equal(VISION_TOOL_NAMES.includes('read_image'), false)

const registered = new Map()
const cleanups = []
const innerCtx = {
  effect(factory) {
    const cleanup = factory()
    cleanups.push(cleanup)
    return cleanup
  },
}
const upstream = {
  register(definition) {
    assert.equal(registered.has(definition.name), false)
    registered.set(definition.name, definition)
    return () => registered.delete(definition.name)
  },
}
const tools = createVisionToolFacade(innerCtx, upstream)
let describedArgs
const describe = {
  name: 'describe_image',
  description: 'upstream',
  parameters: {
    type: 'object',
    properties: {
      attachmentIds: { type: 'array' },
      paths: { type: 'array' },
      urls: { type: 'array' },
    },
  },
  async execute(args) {
    describedArgs = args
    return { description: 'ok' }
  },
}
tools.register(describe)
for (const name of VISION_TOOL_NAMES.slice(1)) tools.register({ name })
for (const name of ['read_image', 'inspect_image', 'vision_crop', 'vision_export_report']) tools.register({ name })

assert.deepEqual([...registered.keys()], VISION_TOOL_NAMES)
assert.equal('urls' in registered.get('describe_image').parameters.properties, false)
await assert.rejects(
  registered.get('describe_image').execute({ urls: ['http://127.0.0.1/'] }, {}),
  /URL input is disabled/,
)
await registered.get('describe_image').execute({ paths: ['/tmp/image.png'] }, {})
assert.deepEqual(describedArgs, { paths: ['/tmp/image.png'] })

assert.equal(cleanups.length, VISION_TOOL_NAMES.length)
for (const cleanup of cleanups) cleanup()
assert.equal(registered.size, 0)

console.log('vision tool whitelist verification passed')
