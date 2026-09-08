import { build } from 'esbuild'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import vm from 'node:vm'

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
  return registration.factory.toString().replace(/accent-color\s*:[^;}'"]+;?/g, '')
}

await mkdir('lib', { recursive: true })
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
  'return module.exports; } });',
  '',
].join('\n')
await writeFile('lib/client.js', wrapped)
console.log('dsh-kiligz-base build complete')
