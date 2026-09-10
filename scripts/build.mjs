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
  '@goodandready/dsh-vision-bridge',
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
  'node_modules/@goodandready/dsh-vision-bridge/lib/client.js',
  'node_modules/dsh-better-sidebar/lib/client.js',
]

/** Simplified Vision Bridge settings panel: provider and model only, localized. */
const VISION_SETTINGS_PANEL = `    function VisionSettingsPanel(props) {
      const isZh = String((props && props.locale) || '').slice(0, 2) === 'zh'
      const copy = isZh
        ? {
            provider: '看图提供方',
            model: '看图模型',
            auto: '自动',
            hint: '选择读图使用的模型；两项都留空时，自动挑选模型目录里第一个支持图片的模型。',
            empty: '模型目录里没有支持图片的模型，请先在「设置 → 模型」里添加。',
            save: '保存',
            saving: '保存中…',
            saved: '已保存',
            failed: '保存失败',
          }
        : {
            provider: 'Vision provider',
            model: 'Vision model',
            auto: 'Auto',
            hint: 'Pick the model used to read images. Leave both empty to auto-pick the first vision-capable model in the catalog.',
            empty: 'No vision-capable model in the catalog. Add one in Settings → Models.',
            save: 'Save',
            saving: 'Saving…',
            saved: 'Saved',
            failed: 'Save failed',
          }
      const [catalog, setCatalog] = react.useState([])
      const [provider, setProvider] = react.useState('')
      const [model, setModel] = react.useState('')
      const [loaded, setLoaded] = react.useState(false)
      const [saving, setSaving] = react.useState(false)
      const [status, setStatus] = react.useState('')
      const stored = react.useRef({ provider: '', model: '' })

      react.useEffect(() => {
        let alive = true
        void (async () => {
          const [config, list] = await Promise.all([api('GET'), fetchModels()])
          if (!alive) return
          const entries = Array.isArray(list) ? list : []
          const vision = entries.filter((item) => item && item.vision !== false)
          setCatalog(vision.length > 0 ? vision : entries)
          const data = (config && config.data) || {}
          const currentProvider = String(data.visionProvider || data.provider || '')
          const currentModel = String(data.visionModel || data.model || '')
          stored.current = { provider: currentProvider, model: currentModel }
          setProvider(currentProvider)
          setModel(currentModel)
          setLoaded(true)
        })()
        return () => { alive = false }
      }, [])

      const providerIds = Array.from(new Set(catalog.map((item) => item && item.provider).filter(Boolean))).sort()
      const models = catalog.filter((item) => item && item.provider === provider)
      const dirty = provider !== stored.current.provider || model !== stored.current.model

      const save = async () => {
        setSaving(true)
        setStatus('')
        try {
          const scope = props && props.ctx && props.ctx.settingsScope && typeof props.ctx.settingsScope.bind === 'function'
            ? props.ctx.settingsScope.bind({ namespace: NS })
            : null
          if (scope && typeof scope.update === 'function') scope.update({ visionProvider: provider, visionModel: model })
          const response = await api('POST', { provider, model })
          if (!response || !response.ok) {
            const detail = (response && response.data && (response.data.error || response.data.message)) || (response && response.status) || ''
            throw new Error(typeof detail === 'string' && detail.length > 0 ? detail : copy.failed)
          }
          stored.current = { provider, model }
          setStatus(copy.saved)
        } catch (error) {
          setStatus(String((error && error.message) || error))
        } finally {
          setSaving(false)
        }
      }

      const option = (value, label, key) => react.createElement('option', { key: key || value || 'auto', value }, label)
      const selectField = (label, value, options, onChange) => react.createElement('div', { className: 'vbr-field' },
        react.createElement('label', null, label),
        react.createElement('select', { value, onChange: (event) => onChange(event.target.value) }, options))

      return react.createElement('div', { className: 'vbr' },
        selectField(copy.provider, provider,
          [option('', copy.auto)].concat(providerIds.map((id) => option(id, id))),
          (value) => { setProvider(value); setModel('') }),
        provider
          ? selectField(copy.model, model,
              [option('', copy.auto)].concat(models.map((item) => option(item.model, item.name || item.model, item.provider + '/' + item.model))),
              setModel)
          : null,
        react.createElement('p', { className: 'hint' }, copy.hint),
        loaded && catalog.length === 0 ? react.createElement('p', { className: 'err' }, copy.empty) : null,
        react.createElement('div', { className: 'row' },
          react.createElement('button', { type: 'button', className: 'primary', disabled: saving || !loaded || !dirty, onClick: save }, saving ? copy.saving : copy.save),
          status ? react.createElement('p', { className: 'hint' }, status) : null))
    }`

/** Chinese copy for the Vision Bridge settings card. */
const VISION_ZH_DICTIONARY = `    const zh = {
      title: '看图',
      subtitle: '对话里的图片会先交给这里选择的视觉模型处理；两项留空时自动从模型目录挑选。',
      provider: '看图提供方',
      model: '看图模型',
      auto: '自动',
      save: '保存',
      saving: '保存中…',
      saved: '已保存',
      reset: '重置为自动',
      failed: '加载或保存失败',
      reqBoth: '请同时选择提供方和模型，或两项都留空使用自动',
      modelInvalid: '该模型不支持图片输入',
      current: '当前：{provider} / {model}',
      currentAuto: '自动选择',
      noVisionModels: '模型目录里没有支持图片的模型，请先在「设置 → 模型」里添加。',
      loading: '加载中…',
      mode: '模式',
      modeHybrid: '自动描述 + 工具',
      modeLlm: '只自动描述',
      modeTools: '只用工具',
      describeStrategy: '描述策略',
      strategyAuto: '自动',
      strategyLlm: '视觉模型',
      strategyOcrLocal: '本地 OCR',
      strategyCacheOnly: '只用缓存',
      escalation: '升级策略',
      escalationSimple: '单次处理',
      escalationAuto: '复杂图片二次处理',
      advanced: '高级',
      channels: '通道',
      channelsHint: '额外的视觉服务端点；留空则自动从模型目录挑选。',
      addChannel: '添加通道',
      remove: '移除',
      testVision: '测试识图',
      testing: '测试中…',
      testOk: '正常（{ms}ms）',
      testFail: '失败：{err}',
      type: '类型',
      baseURL: '服务地址',
      apiKey: 'API Key',
      protocol: '协议',
      requestTemplate: '请求模板',
      responsePath: '响应路径',
      keyOk: '已配置密钥',
      keyMissing: '缺少密钥',
      keyHidden: '未知',
      empty: '-',
      filterProviders: '筛选提供方…',
      bench: '性能测试',
      freeProviders: '免费提供方',
      autoDiscoverOllama: '自动发现 Ollama 模型',
      channelOrderMode: '通道顺序',
      channelOrderManual: '手动',
      channelOrderAutoLatency: '按延迟',
      tileLargeImages: '大图分块',
      deskew: '倾斜校正',
      enhanceImage: '画质增强',
      selfCheck: '视觉自检',
      consensus: '多模型共识',
      maskPII: '脱敏提示词中的个人信息',
      maskSystemPaths: '脱敏回复中的路径与 IP',
      blurFaces: '人脸模糊',
      stripEXIF: '移除 EXIF',
      nsfwFilter: 'NSFW 过滤',
      security: '安全',
      imageMaxWidth: '最大宽度（像素）',
      imageMaxHeight: '最大高度（像素）',
      imageQuality: '画质（1-100）',
      circuitState: '熔断状态',
      circuitClosed: '正常',
      circuitOpen: '已熔断',
      circuitHalfOpen: '探测中',
    }`

/** Resolve the Vision Bridge dictionary for the active UI language. */
const VISION_PICK_DICTIONARY = `    function pickDictionary(locale) {
      const tag = String(locale || '').slice(0, 2)
      if (tag === 'ru') return ru
      if (tag === 'zh') return zh
      return en
    }`

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
  if (path.includes('dsh-vision-bridge')) {
    // The Bridge composer toggle and its PDF button are not part of this
    // bundle's interaction model: vision stays on the configured hybrid mode,
    // so the whole composer control slot is dropped. The PDF drop/paste path
    // stays available and only keeps its localized toasts.
    let output = source
      .replace("        showToast('📄 Конвертация страниц PDF...', false)", "        showToast('正在转换 PDF 页面…', false)")
      .replace("          showToast('✅ Загружено ' + d.count + ' стр. из PDF', false)", "          showToast('PDF 已载入：' + d.count + ' 页', false)")
      .replace("          showToast('❌ Ошибка PDF: ' + (e.message || e), true)", "          showToast('PDF 处理失败：' + (e.message || e), true)")
      .replace("          t.style.background = isErr ? '#dc2626' : '#2563eb'\n          t.style.color = '#fff'", "          t.style.background = 'var(--dsw-alias-bg-layer-2)'\n          t.style.color = isErr ? 'var(--dsw-alias-state-error-primary)' : 'var(--dsw-alias-label-primary)'\n          t.style.border = '1px solid var(--dsw-alias-border-l2)'")
      .replace('transition:all .15s', 'transition:background-color .16s ease,border-color .16s ease,color .16s ease')
      .replace('      // ------------------------------------------------------- conversation.input.right / composer bar\n      // Renders the mode toggle ("👁️ Vision: hybrid") and the "📄 +PDF" button right next to the message input.\n', '      // Composer controls stay disabled in this bundle; PDF drop and paste remain available.\n')
    output = removeBetween(
      output,
      '      function VisionInputControls(props) {',
      '      // Slot 1: conversation.input.right',
      '',
      'Vision Bridge composer component',
    )
    output = removeIncluding(
      output,
      '      // Slot 1: conversation.input.right',
      '      } catch (_e) {}',
      '',
      'Vision Bridge composer slot',
    )
    output = replaceOnce(
      output,
      '    // -------------------------------------------------------------- helpers',
      `${VISION_ZH_DICTIONARY}\n\n${VISION_PICK_DICTIONARY}\n\n    // -------------------------------------------------------------- helpers`,
      'Vision Bridge locale dictionary',
    )
    output = replaceOnce(
      output,
      'ctx.locale.register(NS, { en, ru })',
      'ctx.locale.register(NS, { en, ru, zh })',
      'Vision Bridge locale registration',
    )
    output = replaceOnce(
      output,
      "const locale = useLocale(); const t = makeT(locale === 'ru' ? ru : en, en);",
      'const locale = useLocale(); const t = makeT(pickDictionary(locale), en);',
      'Vision Bridge card locale',
    )
    output = removeBetween(
      output,
      '    function VisionSection(props) {',
      '      // #111: single-fire guard',
      `${VISION_SETTINGS_PANEL}\n\n`,
      'Vision Bridge settings panel',
    )
    output = output.replaceAll('react.createElement(VisionSection, ', 'react.createElement(VisionSettingsPanel, ')
    if (output.includes('VisionSection')) throw new Error('dsh-kiligz-base: Vision Bridge settings panel reference not fully replaced')
    return output
  }
  return source
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
  const factory = registration.factory
    .toString()
    .replace(/accent-color\s*:[^;}'"]+;?/g, '')
    .replace(/[ \t]+$/gm, '')
  return exposePanel(path, factory)
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
  'return { apply: module.exports.apply, inject: module.exports.inject }; } });',
  '',
].join('\n')
await writeFile('lib/client.js', wrapped)
console.log('dsh-kiligz-base build complete')
