import { readFile, stat } from 'node:fs/promises'

const pkg = JSON.parse(await readFile('package.json', 'utf8'))
const patch = await readFile('cordis.patch.yml', 'utf8')
const client = await readFile('lib/client.js', 'utf8')
const manifest = JSON.parse(await readFile('vendor/manifest.json', 'utf8'))

const failures = []
if (pkg.name !== '@kiligzzz/dsh-kiligz-base') failures.push('package name mismatch')
if (pkg.dsh?.client?.platform !== 'web') failures.push('missing dsh.client.platform=web')
if (!patch.includes("name: '@kiligzzz/dsh-kiligz-base'")) failures.push('bundle patch has no base row')
if (patch.includes('dsh-kiligz-automation') || patch.includes('dsh-kiligz-better-sidebar')) failures.push('bundle patch must expose one base row, not child rows')
if (!client.includes('window.__ModuleLoader__.load({ id: "@kiligzzz/dsh-kiligz-base"')) failures.push('client is not a classic ModuleLoader bundle')
if (manifest.features?.length !== 7) failures.push('vendor manifest must describe seven features')
if (!client.includes('__dshKiligzFeatureFactories')) failures.push('client bundle does not compose feature factories')
if ((client.match(/window\.__ModuleLoader__\.load\(/g) ?? []).length !== 1) failures.push('client bundle must register exactly one ModuleLoader factory')
if (client.includes('accent-color:')) failures.push('client bundle must not use accent-color')
if (!client.includes('[role="switch"]')) failures.push('client bundle lacks the unified switch contract')
for (const path of ['lib/index.js', 'lib/client.js']) {
  try { await stat(path) } catch { failures.push(`missing ${path}`) }
}
if (failures.length > 0) throw new Error(`dsh-kiligz-base verify failed:\n- ${failures.join('\n- ')}`)
console.log('dsh-kiligz-base verification passed')
