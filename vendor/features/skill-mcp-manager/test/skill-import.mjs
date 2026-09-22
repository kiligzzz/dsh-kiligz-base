import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { apply } from '../index.js'

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'dsh-skill-import-'))
const previousHome = process.env.DSH_HOME
process.env.DSH_HOME = path.join(temp, 'home')
const cleanups = []
let service
const ctx = {
  tools: { register() { return () => {} } },
  get(name) { return name === 'credentials' ? {} : undefined },
  provide(name, value) { if (name === 'capabilityManager') service = value },
  on() { return () => {} },
  effect(callback) { const cleanup = callback(); if (typeof cleanup === 'function') cleanups.push(cleanup) },
}
const makeSkill = (directory, name) => {
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, 'SKILL.md'), `---\nname: ${name}\ndescription: Import fixture\n---\n# Fixture\n`)
  return directory
}
try {
  apply(ctx)
  const source = makeSkill(path.join(temp, '原目录 with spaces'), 'sample-skill')
  fs.mkdirSync(path.join(source, 'scripts'))
  fs.mkdirSync(path.join(source, 'empty'))
  fs.writeFileSync(path.join(source, 'scripts/run.sh'), '#!/bin/sh\nexit 0\n', { mode: 0o755 })
  fs.writeFileSync(path.join(source, '.hidden'), 'hidden')
  const bytes = Buffer.from([0, 255, 128, 10])
  fs.writeFileSync(path.join(source, 'asset.bin'), bytes)
  fs.symlinkSync('asset.bin', path.join(source, 'asset-link'))
  const result = await service.importSkill(source)
  assert.equal(result.path, path.join(process.env.DSH_HOME, 'skills', path.basename(source)))
  assert.equal(result.name, 'sample-skill')
  assert.equal(fs.lstatSync(result.path).isSymbolicLink(), false)
  assert.deepEqual(fs.readFileSync(path.join(result.path, 'asset.bin')), bytes)
  assert.equal(fs.readFileSync(path.join(result.path, '.hidden'), 'utf8'), 'hidden')
  assert.equal(fs.statSync(path.join(result.path, 'empty')).isDirectory(), true)
  assert.equal(fs.statSync(path.join(result.path, 'scripts/run.sh')).mode & 0o777, 0o755)
  assert.equal(fs.readlinkSync(path.join(result.path, 'asset-link')), 'asset.bin')
  assert.equal(fs.existsSync(path.join(source, 'SKILL.md')), true)
  await assert.rejects(service.importSkill(source), /同名 Skill/)
  const duplicate = makeSkill(path.join(temp, 'other'), 'sample-skill')
  await assert.rejects(service.importSkill(duplicate), /同名 Skill/)
  const missing = path.join(temp, 'missing-skill')
  fs.mkdirSync(missing)
  await assert.rejects(service.importSkill(missing), /缺少 SKILL.md/)
  await assert.rejects(service.importSkill('relative'), /请选择 Skill 目录/)
  const dangling = makeSkill(path.join(temp, 'dangling'), 'dangling-skill')
  fs.symlinkSync('/nonexistent-dsh-import-fixture', path.join(service.skillsRoot, 'dangling'))
  await assert.rejects(service.importSkill(dangling), /目标目录已存在/)
  assert.equal(fs.lstatSync(path.join(service.skillsRoot, 'dangling')).isSymbolicLink(), true)
  const linkedSource = makeSkill(path.join(temp, 'actual'), 'linked-source')
  fs.symlinkSync(linkedSource, path.join(temp, 'source-link'))
  const linkedResult = await service.importSkill(path.join(temp, 'source-link'))
  assert.equal(fs.lstatSync(linkedResult.path).isDirectory(), true)
  assert.equal(fs.lstatSync(linkedResult.path).isSymbolicLink(), false)
  const recursiveSource = makeSkill(temp, 'recursive-skill')
  await assert.rejects(service.importSkill(recursiveSource), /自身或其子目录/)
  if (process.platform !== 'win32') {
    const { execFileSync } = await import('node:child_process')
    const broken = makeSkill(path.join(temp, 'unsupported-entry'), 'unsupported-entry')
    execFileSync('mkfifo', [path.join(broken, 'pipe')])
    await assert.rejects(service.importSkill(broken))
    assert.equal(fs.existsSync(path.join(service.skillsRoot, 'unsupported-entry')), false)
    assert.equal(fs.existsSync(path.join(broken, 'SKILL.md')), true)
  }
  console.log('PASS directory import: structure, bytes, permissions, symlinks, invalid input, collisions and rollback')
} finally {
  for (const cleanup of cleanups.reverse()) await cleanup()
  if (previousHome === undefined) delete process.env.DSH_HOME
  else process.env.DSH_HOME = previousHome
  fs.rmSync(temp, { recursive: true, force: true })
}
