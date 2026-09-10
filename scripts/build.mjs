import { build } from 'esbuild'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import vm from 'node:vm'
import { CLIENT_PRESENTATION_PRELUDE } from '../node_modules/dsh-vision-router/lib/client-presentation-boundary.js'

const id = '@kiligzzz/dsh-kiligz-base'
const hostExternal = [
  '@deepseek-ai/*',
  'cordis',
  '@michengai/dsh-automation',
  'dsh-better-sidebar',
  'dsh-client-auto-continue',
  'dsh-vision-router',
]
const clientExternal = [
  '@deepseek-ai/*',
  'cordis',
  'react',
  'react/jsx-runtime',
  'react-dom',
  'react-dom/client',
]
const featureClientBundles = [
  'vendor/features/session-archive/lib/client.js',
  'vendor/features/skill-mcp-manager/lib/client.js',
  'vendor/features/ui-appearance/lib/client.js',
  'node_modules/@michengai/dsh-automation/lib/client.js',
  'node_modules/dsh-client-auto-continue/lib/client.js',
  'node_modules/dsh-vision-router/lib/client.js',
  'node_modules/dsh-better-sidebar/lib/client.js',
]

function replaceOnce(source, before, after, label) {
  if (!source.includes(before)) throw new Error(`dsh-kiligz-base: ${label} patch marker not found`)
  return source.replace(before, after)
}

function removeBetween(source, start, end, replacement, label) {
  const startAt = source.indexOf(start)
  if (startAt < 0) throw new Error(`dsh-kiligz-base: ${label} start marker not found`)
  const endAt = source.indexOf(end, startAt)
  if (endAt < 0) throw new Error(`dsh-kiligz-base: ${label} end marker not found`)
  return source.slice(0, startAt) + replacement + source.slice(endAt)
}

function removeIncluding(source, start, end, replacement, label) {
  const startAt = source.indexOf(start)
  if (startAt < 0) throw new Error(`dsh-kiligz-base: ${label} start marker not found`)
  const endAt = source.indexOf(end, startAt)
  if (endAt < 0) throw new Error(`dsh-kiligz-base: ${label} end marker not found`)
  return source.slice(0, startAt) + replacement + source.slice(endAt + end.length)
}

function exposePanel(path, source) {
  const tail = 'return module.exports;'
  if (path.includes('dsh-automation')) {
    let output = removeBetween(
      source,
      '  ctx.slots.inject("settings.section", () => ctx.slots.register({',
      '  ctx.slots.inject("sidebar.schedule",',
      '',
      'automation settings section',
    )
    output = replaceOnce(
      output,
      '  ctx.effect(() => installSettingsNavIcon(() => [t("tab"), "Scheduled tasks", "\\u5B9A\\u65F6\\u4EFB\\u52A1"]), "dsh-automation: settings icon");\n',
      '',
      'automation settings icon',
    )
    output = replaceOnce(
      output,
      'const runtime = createAutomationRuntime(ctx.connection.rpc);',
      'const runtime = createAutomationRuntime(ctx.connection.rpc);\n  if (module.exports.__dshKiligz) module.exports.__dshKiligz.runtime = runtime;',
      'automation runtime export',
    )
    return replaceOnce(
      output,
      tail,
      'module.exports.__dshKiligz = { AutomationView, createAutomationRuntime, runtime: undefined };\n' + tail,
      'automation panel export',
    )
  }
  if (path.includes('skill-mcp-manager')) {
    let output = replaceOnce(
      source,
      'const React = require("react");',
      'const React = require("react");\nconst { IconChevronDownOutline14, IconChevronRightOutline14, IconEditOutline16, IconFolderOpenOutline16, IconPlusOutline16, IconRefreshOutline16, IconTrashOutline16 } = require("@deepseek-ai/dsh-client-ui-primitives");',
      'skill icon import',
    )
    output = output
      .replaceAll('}, "✎")', '}, React.createElement(IconEditOutline16, { size: 14 }))')
      .replaceAll('}, "🗑")', '}, React.createElement(IconTrashOutline16, { size: 14 }))')
      .replaceAll('}, "⟳")', '}, React.createElement(IconRefreshOutline16, { size: 14 }))')
      .replace('}, expanded === s.name ? "▾" : "▸")', '}, React.createElement(expanded === s.name ? IconChevronDownOutline14 : IconChevronRightOutline14, { size: 14 }))')
      .replace('}, "+ 导入 Skill")', '}, React.createElement(React.Fragment, null, React.createElement(IconPlusOutline16, { size: 14 }), "导入 Skill"))')
      .replace('refreshAllProgress ? "刷新中 " + refreshAllProgress.done + "/" + refreshAllProgress.total : "⟳ 刷新全部工具"', 'refreshAllProgress ? "刷新中 " + refreshAllProgress.done + "/" + refreshAllProgress.total : React.createElement(React.Fragment, null, React.createElement(IconRefreshOutline16, { size: 14 }), "刷新全部工具")')
      .replace('}, "打开配置文件")', '}, React.createElement(React.Fragment, null, React.createElement(IconFolderOpenOutline16, { size: 14 }), "打开配置文件"))')
      .replace('}, "+ 配置 MCP")', '}, React.createElement(React.Fragment, null, React.createElement(IconPlusOutline16, { size: 14 }), "配置 MCP"))')
    output = removeIncluding(
      output,
      '      apply(ctx) {',
      '      },\n    };',
      '      apply() {},\n    };',
      'skill MCP settings sections',
    )
    return replaceOnce(
      output,
      tail,
      'module.exports.__dshKiligz = { SkillPage, McpPage };\n' + tail,
      'skill MCP panel export',
    )
  }
  return source
}

async function writeVisionBoundarySource() {
  const adaptedPrelude = CLIENT_PRESENTATION_PRELUDE.replace(
    "var TARGET = 'dsh-vision-router';",
    `var TARGET = ${JSON.stringify(id)};`,
  )
  const source = `const PRELUDE = ${JSON.stringify(adaptedPrelude)};
const MARK = 'data-dsh-kiligz-vision-boundary';
function inject(html) {
  if (typeof html !== 'string' || html.includes(MARK)) return html;
  const script = '<script ' + MARK + '>' + PRELUDE.replace(/<\\/script/gi, '<\\\\/script') + '</script>';
  const closeHead = html.indexOf('</head>');
  return closeHead < 0 ? html + script : html.slice(0, closeHead) + script + html.slice(closeHead);
}
export function installBaseVisionClientBoundary(ctx) {
  ctx.inject?.(['webServer'], (webCtx) => {
    webCtx.effect(() => webCtx.webServer.tapIndex(inject), 'dsh-kiligz-base: Vision input boundary');
  });
}
`
  await writeFile('src/vision-client-boundary.generated.js', source)
}

/** Extract a classic bundle's factory without materializing its plugin. */
async function factorySource(path) {
  const source = await readFile(path, 'utf8')
  let registration
  const sandbox = {
    window: {
      __ModuleLoader__: {
        load(value) {
          registration = value
        },
      },
    },
  }
  vm.runInNewContext(source, sandbox, { filename: path })
  if (registration === undefined || typeof registration.factory !== 'function') {
    throw new Error(`dsh-kiligz-base: ${path} did not register a Client factory`)
  }
  const factory = registration.factory.toString().replace(/accent-color\s*:[^;}'"]+;?/g, '')
  return exposePanel(path, factory)
}

await mkdir('lib', { recursive: true })
await writeVisionBoundarySource()
await build({
  entryPoints: ['src/index.js'],
  outfile: 'lib/index.js',
  bundle: true,
  format: 'esm',
  platform: 'node',
  target: 'node22',
  external: hostExternal,
  logLevel: 'info',
})

const result = await build({
  entryPoints: ['src/client/index.jsx'],
  outfile: 'lib/client.js',
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  external: clientExternal,
  jsx: 'automatic',
  write: false,
  logLevel: 'info',
})
const artifact = result.outputFiles.find((file) => file.path.endsWith('/lib/client.js'))
if (artifact === undefined) throw new Error('dsh-kiligz-base: client artifact missing')
const factories = await Promise.all(featureClientBundles.map(factorySource))
const wrapped = [
  `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => {`,
  'var module = { exports: {} }; var exports = module.exports;',
  `const __dshKiligzFeatureFactories = [${factories.join(',\n')}];`,
  artifact.text,
  'return { apply: module.exports.apply, inject: module.exports.inject }; } });',
  '',
].join('\n')
await writeFile('lib/client.js', wrapped)
console.log('dsh-kiligz-base build complete')
