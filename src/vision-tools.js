export const VISION_TOOL_NAMES = Object.freeze([
  'describe_image',
  'vision_ground',
  'vision_compare',
  'vision_ocr',
])

const allowedVisionTools = new Set(VISION_TOOL_NAMES)

/** Create the private Tool facade owned by the Vision provider Fiber. */
function hardenedDefinition(definition) {
  if (definition.name !== 'describe_image') return definition
  const properties = { ...(definition.parameters?.properties ?? {}) }
  delete properties.urls
  const parameters = {
    ...definition.parameters,
    properties,
    ...(Array.isArray(definition.parameters?.required)
      ? { required: definition.parameters.required.filter((name) => name !== 'urls') }
      : {}),
  }
  return {
    ...definition,
    description: 'Describe conversation attachments or workspace image paths with the configured vision model.',
    parameters,
    async execute(args, exec) {
      if (Array.isArray(args?.urls) && args.urls.length > 0) {
        throw new Error('describe_image URL input is disabled; use an attachment id or workspace path')
      }
      const { urls: _urls, ...safeArgs } = args ?? {}
      return definition.execute(safeArgs, exec)
    },
  }
}

export function createVisionToolFacade(innerCtx, upstreamTools) {
  return {
    register(definition) {
      if (!allowedVisionTools.has(definition.name)) return () => {}
      const forwarded = hardenedDefinition(definition)
      return innerCtx.effect(
        () => upstreamTools.register(forwarded),
        `dsh-kiligz-base: vision tool ${definition.name}`,
      )
    },
  }
}

/**
 * Mount Vision Bridge behind a private tools service that forwards only the
 * small public surface owned by this bundle. The real DSH read_image remains
 * untouched in the Agent-scoped tool layer.
 */
export function mountVisionBridge(ctx, visionBridge, config = {}) {
  const upstreamTools = ctx.tools
  const visionCtx = ctx.isolate('tools')

  visionCtx.plugin({
    name: '@kiligzzz/dsh-kiligz-base/vision-tools',
    apply(innerCtx) {
      innerCtx.provide('tools', createVisionToolFacade(innerCtx, upstreamTools))
    },
  })

  return visionCtx.plugin(visionBridge, { mode: 'hybrid', ...config })
}
