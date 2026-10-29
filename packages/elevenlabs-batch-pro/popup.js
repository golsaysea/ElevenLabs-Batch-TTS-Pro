document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. 基础工具与 UI 元素定义
  // ==========================================
  const getEl = (id) => document.getElementById(id);

  // 集中定义 UI 元素，使用安全获取方式
  const ui = {
    // 顶部与弹窗
    themeBtn: getEl('themeToggle'),
    settingsBtn: getEl('openSettingsBtn'),
    settingsModal: getEl('settingsModal'),
    closeSettingsBtn: getEl('closeSettingsBtn'),

    // 错误弹窗
    errorModal: getEl('errorModal'),
    errorMsg: getEl('errorMessage'),
    closeErrorBtn: getEl('closeErrorBtn'),
    confirmErrorBtn: getEl('confirmErrorBtn'),

    // 侧边栏 - 账号
    statusDot: document.querySelector('.status-dot'),
    aliasDisplay: getEl('currentAliasDisplay'),
    quotaDisplay: getEl('poolQuota'),
    poolApiCount: getEl('poolApiCount'),
    accountCard: getEl('accountCard'),
    accountDropdown: getEl('quickSwitchDropdown'),
    quickKeyInput: getEl('quickKeyInput'),
    quickKeyBtn: getEl('quickKeySubmitBtn'),

    // 侧边栏 - 控制
    voice: getEl('voiceSelect'),
    customVoiceId: getEl('customVoiceId'),
    checkVoiceIdBtn: getEl('checkVoiceIdBtn'),
    refresh: getEl('refreshVoices'),
    model: getEl('modelSelect'),
    refreshModels: getEl('refreshModels'),
    format: getEl('formatSelect'), 

    // 侧边栏 - 参数
    stab: getEl('stability'),
    sim: getEl('similarity'),
    style: getEl('style'),
    boost: getEl('speakerBoost'),
    speed: getEl('speed'),
    v3Stab: getEl('v3Stability'),
    valStab: getEl('valStab'),
    valSim: getEl('valSim'),
    valStyle: getEl('valStyle'),
    valSpeed: getEl('valSpeed'),
    v2Area: getEl('v2-specifics'),
    stabilityArea: getEl('stability-control'),
    similarityArea: getEl('similarity-control'),
    speedArea: getEl('speed-control'),
    styleArea: getEl('style-control'),
    boostArea: getEl('speaker-boost-control'),
    v3Area: getEl('v3-stability-control'),
    autoSplit3Min: getEl('autoSplit3Min'),
    autoDelete: getEl('autoDelete'),

    // 路径与内容区
    baseFolderInput: getEl('baseFolderInput'),
    quickFolder: getEl('quickFolderInput'),
    openFolder: getEl('quickOpenFolderBtn'),
    container: getEl('listContainer'), // 核心容器
    addBtn: getEl('addCardBtn'),
    clearBtn: getEl('clearAllBtn'),
    splitLongBtn: getEl('splitLongBtn'),
    genBtn: getEl('generateBtn'),
    totalChars: getEl('totalCharsDisplay'),
    totalDuration: getEl('totalDurationDisplay'),
    remainChars: getEl('remainingDisplay'),
    statusBar: getEl('status'),

    // 设置与 Key 管理
    keyList: getEl('keyListContainer'),
    keySearch: getEl('keySearch'),
    refreshKeysBtn: getEl('refreshKeysBtn'),
    cleanupKeysBtn: getEl('cleanupKeysBtn'),
    cleanupUserRead: getEl('cleanupUserRead'),
    resetGenerationSkipsBtn: getEl('resetGenerationSkipsBtn'),
    generationSkipCount: getEl('generationSkipCount'),
    generationSkipStatus: getEl('generationSkipStatus'),
    undoKeyCleanupBtn: getEl('undoKeyCleanupBtn'),
    keyCleanupStatus: getEl('keyCleanupStatus'),
    scanVoicePoolBtn: getEl('scanVoicePoolBtn'),
    scanVoiceLibrariesBtn: getEl('scanVoiceLibrariesBtn'),
    voiceLibrarySummary: getEl('voiceLibrarySummary'),
    voiceSearch: getEl('voiceSearch'),
    voicePoolSummary: getEl('voicePoolSummary'),
    keyPrevPage: getEl('keyPrevPage'),
    keyNextPage: getEl('keyNextPage'),
    keyPageInfo: getEl('keyPageInfo'),
    keyListCount: getEl('keyListCount'),
    newAlias: getEl('newKeyAlias'),
    newKey: getEl('newKeyVal'),
    addKeyBtn: getEl('saveNewKeyBtn'),
    exportBtn: getEl('exportDataBtn'),
    importBtn: getEl('importDataBtn'),
    fileInput: getEl('importFileInput'),
    importKeysBtn: getEl('importKeysBtn'),
    keyFileInput: getEl('keyFileInput'),
    exportCsvBtn: getEl('exportCsvBtn'),
    poolConcurrency: getEl('poolConcurrency'),
    voicePriorityPolicy: getEl('voicePriorityPolicy'),
    voicePrioritySummary: getEl('voicePrioritySummary'),
    poolSummary: getEl('poolSummary'),
    scanPoolBtn: getEl('scanPoolBtn'),
    pauseBtn: getEl('pauseBatchBtn'),
    batchProgress: getEl('batchProgress'),
    batchProgressBar: getEl('batchProgressBar'),
    bulkBtn: getEl('bulkImportBtn'),
    bulkModal: getEl('bulkImportModal'),
    closeBulkBtn: getEl('closeBulkBtn'),
    bulkText: getEl('bulkTextInput'),
    bulkMode: getEl('bulkSplitMode'),
    bulkPreview: getEl('bulkPreview'),
    confirmBulkBtn: getEl('confirmBulkBtn'),
    bulkFileBtn: getEl('bulkFileBtn'),
    bulkFile: getEl('bulkTextFile'),

    // 其他工具工坊
    otherToolsBtn: getEl('otherToolsBtn'),
    sidebarOtherToolsBtn: getEl('sidebarOtherToolsBtn'),
    otherToolsModal: getEl('otherToolsModal'),
    closeOtherToolsBtn: getEl('closeOtherToolsBtn'),
    toolKeySelect: getEl('toolKeySelect'),
    otherToolsStatus: getEl('otherToolsStatus'),
    otherToolsAudioPanel: getEl('otherToolsAudioPanel'),
    otherToolsAudioMeta: getEl('otherToolsAudioMeta'),
    otherToolsAudioPlayer: getEl('otherToolsAudioPlayer'),
    otherToolsDownloadBtn: getEl('otherToolsDownloadBtn'),
    otherToolsHistoryWrap: getEl('otherToolsHistoryWrap'),
    otherToolsHistoryList: getEl('otherToolsHistoryList'),
    // 音效
    sfxPrompt: getEl('sfxPrompt'),
    sfxDurationMode: getEl('sfxDurationMode'),
    sfxDuration: getEl('sfxDuration'),
    sfxInfluence: getEl('sfxInfluence'),
    valSfxInfluence: getEl('valSfxInfluence'),
    sfxLoop: getEl('sfxLoop'),
    sfxAutoDownload: getEl('sfxAutoDownload'),
    sfxGenerateBtn: getEl('sfxGenerateBtn'),
    // 音乐
    musicPrompt: getEl('musicPrompt'),
    musicModel: getEl('musicModel'),
    musicDurationMode: getEl('musicDurationMode'),
    musicDurationSec: getEl('musicDurationSec'),
    musicInstrumental: getEl('musicInstrumental'),
    musicAutoDownload: getEl('musicAutoDownload'),
    musicGenerateBtn: getEl('musicGenerateBtn'),
    // 语音变声
    stsAudioFile: getEl('stsAudioFile'),
    stsCustomVoiceId: getEl('stsCustomVoiceId'),
    stsModel: getEl('stsModel'),
    stsRemoveNoise: getEl('stsRemoveNoise'),
    stsAutoDownload: getEl('stsAutoDownload'),
    stsGenerateBtn: getEl('stsGenerateBtn'),
    // 人声提取
    isoAudioFile: getEl('isoAudioFile'),
    isoAutoDownload: getEl('isoAutoDownload'),
    isoGenerateBtn: getEl('isoGenerateBtn'),
    // 语音转文字
    sttAudioFile: getEl('sttAudioFile'),
    sttModel: getEl('sttModel'),
    sttTagEvents: getEl('sttTagEvents'),
    sttDiarize: getEl('sttDiarize'),
    sttGenerateBtn: getEl('sttGenerateBtn'),
    sttOutputText: getEl('sttOutputText'),
    sttCopyBtn: getEl('sttCopyBtn'),
    sttDownloadTxtBtn: getEl('sttDownloadTxtBtn'),
    sttSendToQueueBtn: getEl('sttSendToQueueBtn'),

    // 声音清理与去重
    cleanVoicesBtn: getEl('cleanVoicesBtn'),
    voiceCleanupModal: getEl('voiceCleanupModal'),
    closeVoiceCleanupBtn: getEl('closeVoiceCleanupBtn'),
    cancelVoiceCleanupBtn: getEl('cancelVoiceCleanupBtn'),
    voiceCleanupSummary: getEl('voiceCleanupSummary'),
    voiceCleanupSearch: getEl('voiceCleanupSearch'),
    selectDuplicateVoicesBtn: getEl('selectDuplicateVoicesBtn'),
    clearVoiceSelectionBtn: getEl('clearVoiceSelectionBtn'),
    voiceCleanupList: getEl('voiceCleanupList'),
    voiceCleanupStatus: getEl('voiceCleanupStatus'),
    confirmDeleteVoicesBtn: getEl('confirmDeleteVoicesBtn')
  };

  const KEY_PAGE_SIZE = 50;
  const QUOTA_SCAN_CONCURRENCY = 4;
  // Keep official model IDs selectable when cached lists predate a release or model-list access is restricted.
  const BUILTIN_MODELS = [
    { model_id: 'eleven_v4', name: 'Eleven v4', maximum_text_length_per_request: 10000 },
    { model_id: 'eleven_v4_turbo', name: 'Eleven v4 Turbo' },
    { model_id: 'eleven_multilingual_v2', name: 'Multilingual v2', maximum_text_length_per_request: 10000 },
    { model_id: 'eleven_flash_v2_5', name: 'Flash v2.5', maximum_text_length_per_request: 40000 },
    { model_id: 'eleven_v3', name: 'Eleven v3', maximum_text_length_per_request: 5000 },
    { model_id: 'eleven_turbo_v2_5', name: 'Turbo v2.5' }
  ];
  let modelRequestId = 0;
  let modelLoading = false;
  let quotaScanQueue = [];
  let quotaScanRunning = 0;
  const quotaRequests = new Map();
  const voiceRequests = new Map();
  const voiceScans = new Map();
  const libraryRequests = new Map();
  let libraryScan = null;
  let libraryProgress = null;
  let librarySaveTimer = null;
  let voiceOptionsSignature = '';
  let preferredVoice = '';
  let voiceFamiliesDirty = true;
  let allocationCache = null;
  let quotaSaveTimer = null;
  let quotaSavePromise = Promise.resolve();
  const quotaWaiters = [];
  let quotaRequestRunning = 0;
  let poolScanning = null;
  let poolScanTimer;
  let poolRenderTimer = null;
  let batchJobs = [];
  let activePool = null;
  let bulkLoadedTexts = null;
  let activePreview = null;
  let previewRunning = false;

  // 全局状态管理
  let state = {
    keys: [],
    currentKey: '',
    currentQuota: 0,
    folder: '',
    baseFolder: 'ElevenLabs_Pro',
    voiceList: [],
    quotaListCache: {},
    voiceAccessCache: new Map(),
    generationSkips: new ElevenApiPool.GenerationSkips(),
    voiceLibraries: new Map(),
    voiceCatalog: new Map(),
    voiceFamilies: new Map(),
    voiceOverrides: {},
    keyMaintenance: false,
    cleanupBackup: null,
    modelList: [],
    keyPage: 0,
    poolSummary: null,
    concurrency: 2,
    voicePriority: 'prefer',
    batchRunning: false,
    pauseRequested: false,
    ready: false
  };

  // ==========================================
  // 2. 核心通用函数
  // ==========================================

  // 状态栏提示
  function setStatus(msg, type = 'normal') {
    if (!ui.statusBar) return;
    ui.statusBar.textContent = msg;
    ui.statusBar.className = 'status-bar';
    if (type === 'error') ui.statusBar.classList.add('status-error');

    // 如果是普通消息，3秒后消失；如果是错误，6秒后消失
    const timeout = type === 'error' ? 6000 : 3000;
    setTimeout(() => {
      if (!state.batchRunning && ui.statusBar.textContent === msg) {
        ui.statusBar.textContent = '就绪';
        ui.statusBar.className = 'status-bar';
      }
    }, timeout);
  }

  // 错误弹窗
  function showError(msg) {
    if (ui.errorMsg && ui.errorModal) {
      ui.errorMsg.textContent = msg;
      ui.errorModal.classList.remove('hidden');
    } else {
      alert(msg); // 兜底
    }
  }

  // ElevenLabs 官方只要求 xi-api-key 请求头，不要求 Key 必须是 sk_ 前缀。
  function stripWrappingQuotes(value) {
    let text = String(value || '').trim();
    while (
      text.length >= 2 &&
      ((text[0] === '"' && text[text.length - 1] === '"') ||
        (text[0] === "'" && text[text.length - 1] === "'") ||
        (text[0] === '`' && text[text.length - 1] === '`'))
    ) {
      text = text.slice(1, -1).trim();
    }
    return text;
  }

  function looksLikeApiKey(value) {
    const key = stripWrappingQuotes(value).replace(/[\u200B-\u200D\uFEFF]/g, '');
    if (!/^[A-Za-z0-9._+=-]{11,}$/.test(key)) return false;
    if (/^sutkn_/i.test(key)) return false;
    return !/^(api[_-]?key|elevenlabs[_-]?api[_-]?key|xi[_-]?api[_-]?key|key[_-]?id)$/i.test(key);
  }

  function findApiKeyInValue(value) {
    if (!value) return '';
    if (typeof value === 'string') return normalizeApiKey(value);
    if (Array.isArray(value)) {
      for (const item of value) {
        const key = findApiKeyInValue(item);
        if (key) return key;
      }
      return '';
    }
    if (typeof value === 'object') {
      const priorityFields = ['xi-api-key', 'xi_api_key', 'ELEVENLABS_API_KEY', 'apiKey', 'api_key', 'api-key', 'key'];
      for (const field of priorityFields) {
        if (Object.prototype.hasOwnProperty.call(value, field)) {
          const key = normalizeApiKey(value[field]);
          if (key) return key;
        }
      }
      for (const item of Object.values(value)) {
        const key = findApiKeyInValue(item);
        if (key) return key;
      }
    }
    return '';
  }

  function normalizeApiKey(raw) {
    if (!raw) return '';
    let text = String(raw).replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
    if (!text) return '';
    text = stripWrappingQuotes(text);

    if ((text.startsWith('{') && text.endsWith('}')) || (text.startsWith('[') && text.endsWith(']'))) {
      try {
        const key = findApiKeyInValue(JSON.parse(text));
        if (key) return key;
      } catch (e) { }
    }

    const labeledPatterns = [
      /(?:xi-api-key|xi_api_key|ELEVENLABS_API_KEY|api[_\s-]*key)\s*[:=]\s*["'`]?([^"'`\s,;]+)/i,
      /-H\s+["'`]xi-api-key:\s*([^"'`\s]+)/i
    ];
    for (const pattern of labeledPatterns) {
      const match = text.match(pattern);
      if (match && looksLikeApiKey(match[1])) return stripWrappingQuotes(match[1]);
    }

    if (looksLikeApiKey(text)) return text;

    const candidates = text.match(/[A-Za-z0-9][A-Za-z0-9._+=-]{10,}/g) || [];
    const key = candidates.find(looksLikeApiKey);
    return key ? stripWrappingQuotes(key) : '';
  }

  function parseCsvLine(line) {
    const cells = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cell += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (ch === ',' && !inQuotes) {
        cells.push(stripWrappingQuotes(cell));
        cell = '';
      } else {
        cell += ch;
      }
    }
    cells.push(stripWrappingQuotes(cell));
    return cells.map(c => c.trim()).filter(c => c);
  }

  function parseImportedKeyLine(line, fallbackAlias) {
    const cells = parseCsvLine(line);
    if (cells.length === 0) return null;

    let key = '';
    let keyIndex = -1;
    for (let idx = cells.length - 1; idx >= 0; idx--) {
        const normalized = normalizeApiKey(cells[idx]);
        if (normalized) {
          key = normalized;
          keyIndex = idx;
          break;
        }
    }

    if (!key) key = normalizeApiKey(line);
    if (!key) return null;

    const aliasCells = keyIndex > 0 ? cells.slice(0, keyIndex) : [];
    // Legacy CSV files have a group column before the alias. Ignore it on import.
    const aliasSource = aliasCells.length >= 2 ? aliasCells.slice(1) : aliasCells;
    const alias = aliasSource
      .filter(c => !/^(分组|组|group|备注名|备注|名称|name|alias|api[_\s-]*key|key)$/i.test(c))
      .join(', ')
      .trim() || fallbackAlias;

    return { alias, key };
  }

  function normalizeKeyItems(items, deduplicate = true) {
    const seen = new Set();
    const list = [];
    (Array.isArray(items) ? items : []).forEach((item, idx) => {
      const rawKey = typeof item === 'string' ? item : item && item.key;
      const rawAlias = item && typeof item === 'object' ? item.alias : '';
      const key = normalizeApiKey(rawKey);
      if (!key || (deduplicate && seen.has(key))) return;
      seen.add(key);
      list.push({ alias: String(rawAlias || '账号 ' + (idx + 1)).trim(), key });
    });
    return list;
  }

  function saveKeyList() {
    chrome.storage.local.set({ 'saved_key_list': state.keys });
    pruneVoiceLibraries();
    syncKeyMaintenanceControls();
    renderPoolControls();
    schedulePoolScan();
  }

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  async function readElevenError(resp, fallback = 'API 请求失败') {
    let code = '';
    let message = '';

    try {
      const data = await resp.clone().json();
      const detail = data.detail || data;
      if (typeof detail === 'string') {
        message = detail;
      } else if (detail) {
        code = detail.code || detail.status || detail.type || data.code || data.status || '';
        message = detail.message || data.message || '';
      }
    } catch (e) {
      try { message = await resp.clone().text(); } catch (err) { }
    }

    return explainElevenError(resp.status, code, message) || message || `${fallback} (HTTP ${resp.status})`;
  }

  function explainElevenError(status, code, message, param = '') {
    const text = `${code} ${message}`.toLowerCase();
    if (ElevenApiPool.isFormatAccessError({ status, code, message, param })) {
      return `${message || '当前输出格式受套餐限制'}\n此账号套餐不支持所选输出格式，不代表 API Key 无效。可切换 MP3 标准 128k，或使用支持该格式的账号。`;
    }
    if (/max_character_limit_exceeded|text_too_long/.test(text)) return message || '文案超过模型单次字符上限，请拆分。';
    if (/quota_exceeded|credit_limit|insufficient_credits|insufficient_quota/.test(text)) return `${message || '额度不足'}\n这个 Key 的额度或自定义 credit limit 不足，正在匹配其他 API。`;
    if (text.includes('insufficient_permissions')) return `${message || 'API Key 权限不足'}\n请检查这个 Key 的相关接口权限。`;
    if (ElevenApiKeys.isApiKeyIdError({ status, code, rawMessage: message })) {
      return `粘贴的是 Key ID，不是 API 密钥。\n请在 ElevenLabs 后台创建或轮换密钥，复制当次显示的完整 API Key；不能给 Key ID 加 sk_ 来转换。\n\n${message}`;
    }
    if (ElevenApiKeys.isConfirmedInvalid({ status, code })) {
      return `${message || 'API Key 无效或缺失'}\n\n已兼容非 sk_ 前缀 Key。请确认粘贴的是完整 ElevenLabs API Key，不是 Key ID、尾号 hint 或多余说明文字。`;
    }
    if (status === 401) {
      return `${message || '当前接口鉴权失败'}\n不能仅凭 HTTP 401 判断 Key 无效，请检查返回的错误码、有效期和接口权限。`;
    }
    if (status === 403 || text.includes('forbidden') || text.includes('workspace_access_denied')) {
      if (/^(?:api_key_)?ip[ _-](not[ _-]allowed|allow[ _-]?list|whitelist|restricted|blocked)/.test(String(code).toLowerCase()) || /\bip address\b|\ballow[ _-]?list\b|\bwhite[ _-]?list\b|ip ?白名单/.test(text)) {
        return `${message || '请求被拒绝'}\n\n这个 Key 可能开启了 IP allowlist，当前网络不在白名单内。`;
      }
      return `${message || '请求被拒绝'}\n\nKey 已被服务器识别，但权限、工作区访问、套餐或 IP 白名单可能不允许当前操作。`;
    }
    if (status === 429 || text.includes('rate_limit') || text.includes('concurrent_limit')) {
      return `${message || '请求太频繁'}\n\n触发了 ElevenLabs 速率或并发限制，稍等后再继续生成。`;
    }
    if (text.includes('quota') || text.includes('character_limit')) {
      return `${message || '额度不足'}\n\n这个 Key 的字符额度或自定义 credit limit 可能已经用完。`;
    }
    return message;
  }
  // 关闭错误弹窗
  if (ui.closeErrorBtn) ui.closeErrorBtn.addEventListener('click', () => ui.errorModal.classList.add('hidden'));
  if (ui.confirmErrorBtn) ui.confirmErrorBtn.addEventListener('click', () => ui.errorModal.classList.add('hidden'));

  // 切换深色模式
  if (ui.themeBtn) {
    ui.themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      ui.themeBtn.textContent = isDark ? '🌙' : '🌞';
      chrome.storage.local.set({ 'app_theme': isDark ? 'dark' : 'light' });
    });
  }

  // 打开/关闭设置
  if (ui.settingsBtn) {
    ui.settingsBtn.addEventListener('click', () => {
      renderKeyList();
      if (ui.settingsModal) ui.settingsModal.classList.remove('hidden');
    });
  }
  if (ui.closeSettingsBtn) {
    ui.closeSettingsBtn.addEventListener('click', () => ui.settingsModal.classList.add('hidden'));
  }

  // ==========================================
  // 3. 初始化加载逻辑
  // ==========================================
  function init() {
    chrome.storage.local.get(null, (res) => {
      // 恢复主题
      if (res.app_theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (ui.themeBtn) ui.themeBtn.textContent = '🌙';
      }

      // 恢复基础数据
      const rawKeyList = res.saved_key_list || [];
      state.keys = normalizeKeyItems(rawKeyList, false);
      state.cleanupBackup = res.api_cleanup_backup && Array.isArray(res.api_cleanup_backup.keys) ? res.api_cleanup_backup : null;
      syncKeyMaintenanceControls();
      state.currentKey = normalizeApiKey(res.xi_key) || '';
      if (!state.currentKey && state.keys.length) state.currentKey = state.keys[0].key;
      state.folder = res.save_folder || '';
      state.keyPage = 0;
      ui.keySearch.value = '';
      chrome.storage.local.remove(['active_key_group', 'pool_scope']);
      if (JSON.stringify(rawKeyList) !== JSON.stringify(state.keys)) {
        saveKeyList();
      }
      if (res.xi_key && state.currentKey && res.xi_key !== state.currentKey) {
        chrome.storage.local.set({ 'xi_key': state.currentKey });
      }
      state.baseFolder = res.base_folder_name || 'ElevenLabs_Pro';
      state.concurrency = Math.max(1, Math.min(4, Number(res.pool_concurrency) || 2));
      state.pauseRequested = false;
      ui.poolConcurrency.value = String(state.concurrency);
      state.voicePriority = res.pool_voice_priority === 'protect' ? 'protect' : 'prefer';
      ui.voicePriorityPolicy.value = state.voicePriority;
      allocationCache = null;
      if (res.custom_voice_id) ui.customVoiceId.value = res.custom_voice_id;
      preferredVoice = res.xi_voice_family || res.xi_voice || '';
      state.voiceOverrides = res.voice_route_overrides && typeof res.voice_route_overrides === 'object' ? res.voice_route_overrides : {};
      state.quotaListCache = {};
      const allowedKeys = new Set(getPoolKeys().map(item => item.key));
      state.generationSkips = new ElevenApiPool.GenerationSkips(Array.isArray(res.generation_skip_cache) ? res.generation_skip_cache.filter(record => record && allowedKeys.has(record.key)) : []);
      if (Array.isArray(res.pool_quota_cache)) for (const record of res.pool_quota_cache) {
        if (record && allowedKeys.has(record.key) && record.info && Number.isFinite(record.info.ts)) state.quotaListCache[record.key] = ElevenApiKeys.normalizeQuotaInfo(record.info);
      }
      const cachedLibraries = res.voice_libraries_cache;
      clearTimeout(librarySaveTimer);
      state.voiceLibraries.clear();
      state.voiceCatalog.clear();
      state.voiceFamilies.clear();
      voiceFamiliesDirty = true;
      state.voiceAccessCache.clear();
      if (Array.isArray(res.voice_access_cache)) for (const info of res.voice_access_cache) {
        if (info && allowedKeys.has(info.key) && /^[A-Za-z0-9_-]+$/.test(info.voice || '') &&
          ['available', 'unavailable', 'unknown'].includes(info.access) && Number.isFinite(info.ts) && info.ts <= Date.now() && Date.now() - info.ts < 300000) {
          state.voiceAccessCache.set(voiceCacheKey(info.key, info.voice), info);
        }
      }
      voiceOptionsSignature = '';
      ui.voice.value = '';
      if (Array.isArray(cachedLibraries)) {
        const allowed = new Set(getPoolKeys().map(item => item.key));
        for (const library of cachedLibraries) {
          if (library && typeof library.key === 'string' && allowed.has(library.key) && Array.isArray(library.voices)) {
            setVoiceLibrary(library.key, library, false);
          }
        }
      }
      renderPoolControls();

      if (ui.quickFolder) ui.quickFolder.value = state.folder;
      if (ui.baseFolderInput) ui.baseFolderInput.value = state.baseFolder;

      updateAccountStatus();

      // 恢复滑块和参数
      if (res.xi_stab != null) updateVal('stab', res.xi_stab);
      if (res.xi_sim != null) updateVal('sim', res.xi_sim);
      if (res.xi_style != null) updateVal('style', res.xi_style);
      if (res.xi_speed != null) updateVal('speed', res.xi_speed);
      ui.v3Stab.value = String(normalizeV3Stability(res.xi_v3_stability ?? (res.xi_model === 'eleven_v3' ? res.xi_stab : 0.5)));
      if (res.xi_v3_stability == null) chrome.storage.local.set({ xi_v3_stability: Number(ui.v3Stab.value) });
      if (res.xi_boost !== undefined && ui.boost) ui.boost.checked = res.xi_boost;
      if (ui.autoSplit3Min) ui.autoSplit3Min.checked = res.auto_split_3m !== undefined ? Boolean(res.auto_split_3m) : true;
      if (res.auto_del !== undefined && ui.autoDelete) ui.autoDelete.checked = res.auto_del;
      
      // 🌟 恢复格式选择
      if (res.output_format && ui.format) {
          ui.format.value = res.output_format;
      }

      // 加载模型和声音
      renderModels(BUILTIN_MODELS, res.xi_model);
      if (state.currentKey) {
        fetchModels(state.currentKey, res.xi_model);
        loadVoices(state.currentKey, res.xi_voice_family || res.xi_voice);
        fetchQuotaWithCache(state.currentKey, res.quota_cache);
      }

      // 恢复已保存的卡片
      if (ui.container) {
        ui.container.innerHTML = '';
        if (res.saved_jobs && res.saved_jobs.length > 0) {
          res.saved_jobs.forEach(job => addCard(job.text, false, job));
        } else if (res.saved_cards && res.saved_cards.length > 0) {
          res.saved_cards.forEach(t => addCard(t, false));
        } else {
          addCard(); // 默认加一张空卡
        }
        updateStats();
      }
      state.ready = true;
      if (!ui.settingsModal.classList.contains('hidden')) renderKeyList();
      scanPool();
    });
  }
  init(); // 执行初始化

  // ==========================================
  // 4. 事件监听 - 基础控制与格式修复
  // ==========================================
  if (ui.autoSplit3Min) {
    ui.autoSplit3Min.addEventListener('change', () => {
      chrome.storage.local.set({ auto_split_3m: ui.autoSplit3Min.checked });
      updateBulkPreview();
      updateStats();
    });
  }
  if (ui.autoDelete) ui.autoDelete.addEventListener('change', () => chrome.storage.local.set({ 'auto_del': ui.autoDelete.checked }));
  
  // 🌟 格式选择监听 (修复：增加视觉反馈，不用确认按钮) 🌟
  if (ui.format) {
    ui.format.addEventListener('change', () => {
        const val = ui.format.value;
        chrome.storage.local.set({ 'output_format': val });
        renderVoicePoolSummary();
        renderGenerationSkips();
        
        let label = "MP3";
        if (val === 'mp3_as_mp4') label = "MP4 (视频格式)";
        else if (val.includes('pcm')) label = "WAV (无损)";
        else if (val.includes('192')) label = "MP3 (高质)";
        
        setStatus(`✅ 格式已切换: ${label}`);
        updateStats();
    });
  }

  // 文件夹输入监听
  if (ui.baseFolderInput) {
    ui.baseFolderInput.addEventListener('input', (e) => {
      state.baseFolder = e.target.value.trim() || 'ElevenLabs_Pro';
      chrome.storage.local.set({ 'base_folder_name': state.baseFolder });
    });
  }
  if (ui.quickFolder) {
    ui.quickFolder.addEventListener('input', (e) => {
      state.folder = e.target.value.trim();
      chrome.storage.local.set({ 'save_folder': state.folder });
    });
  }

  // 按钮监听
  if (ui.addBtn) ui.addBtn.addEventListener('click', () => { if (!state.batchRunning) { addCard(); updateStats(); } });
  if (ui.splitLongBtn) {
    ui.splitLongBtn.addEventListener('click', () => {
      if (state.batchRunning) return;
      const count = splitAllOverThreeMinutesCards();
      if (count > 0) setStatus(`✂️ 已将 ${count} 段超 3 分钟文案各智能拆分为 2 份`);
    });
  }
  if (ui.clearBtn) ui.clearBtn.addEventListener('click', () => {
    if (state.batchRunning || !confirm('确认清空列表?')) return;
    stopActivePreview();
    ui.container.querySelectorAll('.card').forEach(card => ElevenAudioStore.remove(card.taskData.id).catch(() => {}));
    ui.container.innerHTML = ''; addCard(); saveCards(); updateStats();
    batchJobs = []; ui.batchProgress.textContent = '等待开始'; ui.batchProgressBar.value = 0;
  });

  function getBulkTexts() { return bulkLoadedTexts || ElevenApiPool.splitTexts(ui.bulkText.value, ui.bulkMode.value); }
  function updateBulkPreview() {
    const raw = getBulkTexts();
    if (ui.autoSplit3Min && ui.autoSplit3Min.checked && raw.length) {
      const expanded = ElevenApiPool.expandOverThreeMinutes(raw, { speed: currentSpeechSpeed() });
      if (expanded.splitCount > 0) {
        ui.bulkPreview.textContent = `${raw.length} 段（${expanded.splitCount} 段超3分 → 自动拆为 ${expanded.texts.length} 段）`;
        return;
      }
    }
    ui.bulkPreview.textContent = `${raw.length} 段`;
  }
  ui.bulkBtn.addEventListener('click', () => { if (!state.batchRunning) { ui.bulkModal.classList.remove('hidden'); updateBulkPreview(); } });
  ui.closeBulkBtn.addEventListener('click', () => ui.bulkModal.classList.add('hidden'));
  ui.bulkText.addEventListener('input', () => { bulkLoadedTexts = null; updateBulkPreview(); });
  ui.bulkMode.addEventListener('change', () => { bulkLoadedTexts = null; updateBulkPreview(); });
  ui.bulkFileBtn.addEventListener('click', () => ui.bulkFile.click());
  ui.bulkFile.addEventListener('change', async () => {
    try {
      const texts = [];
      for (const file of ui.bulkFile.files) {
        const content = await file.text();
        if (file.name.toLowerCase().endsWith('.json')) {
          const data = JSON.parse(content);
          const items = Array.isArray(data) ? data : data.texts || data.saved_cards || data.saved_jobs;
          if (!Array.isArray(items)) throw new Error('JSON 文案须为数组，或包含 texts 数组。');
          texts.push(...items.map(item => typeof item === 'string' ? item : item && item.text || '').filter(text => text.trim()));
        } else texts.push(...ElevenApiPool.splitTexts(content, ui.bulkMode.value));
      }
      bulkLoadedTexts = texts;
      ui.bulkText.value = texts.join('\n\n');
      updateBulkPreview();
    } catch (error) { showError(`导入文案失败：${error.message}`); }
    ui.bulkFile.value = '';
  });
  ui.confirmBulkBtn.addEventListener('click', () => {
    if (state.batchRunning) return;
    const rawTexts = getBulkTexts();
    if (!rawTexts.length) return;
    const expanded = ui.autoSplit3Min && ui.autoSplit3Min.checked
      ? ElevenApiPool.expandOverThreeMinutes(rawTexts, { speed: currentSpeechSpeed() })
      : { texts: rawTexts, splitCount: 0 };
    const texts = expanded.texts;
    const fragment = document.createDocumentFragment();
    ui.container.querySelectorAll('.card').forEach(card => { if (!card.querySelector('textarea').value.trim()) card.remove(); });
    texts.forEach(text => fragment.appendChild(addCard(text, false)));
    ui.container.appendChild(fragment);
    refreshIndexes(); saveCards(); updateStats();
    ui.bulkText.value = ''; bulkLoadedTexts = null; ui.bulkModal.classList.add('hidden');
    setStatus(expanded.splitCount > 0
      ? `✂️ 已加入 ${texts.length} 段文案（自动将 ${expanded.splitCount} 段超 3 分钟文案各分为 2 份）`
      : `已加入 ${texts.length} 段文案`);
  });

  // ==========================================
  // 5. Voice ID 验证逻辑
  // ==========================================
  if (ui.checkVoiceIdBtn) {
    ui.checkVoiceIdBtn.addEventListener('click', () => {
      const id = ui.customVoiceId.value.trim();
      if (!id) return setStatus('请输入 ID', 'error');

      const exists = state.voiceList.find(v => v.voice_id === id);
      if (exists) {
        ui.voiceSearch.value = '';
        ui.voice.value = '';
        preferredVoice = id;
        renderVoiceLibraries();
        const family = [...state.voiceFamilies.values()].find(item => item.voiceIds.has(id));
        ui.voice.value = family ? family.id : id;
        preferredVoice = ui.voice.value;
        ui.customVoiceId.value = '';
        chrome.storage.local.set({ xi_voice: id, xi_voice_family: family ? family.id : '', custom_voice_id: '' });
        renderVoicePoolSummary();
        setStatus(`已选中: ${exists.name}`);
        return;
      }
      setStatus('正在验证 ID...');
      checkVoiceIdFromApi(id);
    });
  }

  async function checkVoiceIdFromApi(id) {
    if (!state.currentKey) return;
    try {
      const res = await fetch(`https://api.elevenlabs.io/v1/voices/${id}`, { headers: { 'xi-api-key': state.currentKey } });
      if (res.ok) {
        const data = await res.json();
        if (data.voice_id !== id) throw new Error('返回的 Voice ID 不匹配');
        const opt = document.createElement('option');
        opt.value = data.voice_id;
        opt.textContent = `✅ [验证通过] ${data.name}`;
        opt.selected = true;
        ui.voice.prepend(opt);
        ui.customVoiceId.value = '';
        preferredVoice = id;
        chrome.storage.local.set({ xi_voice: id, custom_voice_id: '' });
        renderVoicePoolSummary();
        setStatus(`ID 有效: ${data.name}`);
      } else {
        setStatus(await readElevenError(res, 'Voice ID 验证失败'), 'error');
      }
    } catch (e) {
      setStatus(`验证失败：${e.message || '网络错误'}`, 'error');
    }
  }

  // ==========================================
  // 6. 核心生成逻辑 (Batch Generate)
  // ==========================================
  function getPoolKeys() {
    const seen = new Set();
    const keys = state.keys.filter(item => {
      if (seen.has(item.key)) return false;
      seen.add(item.key); return true;
    });
    if (keys.length || !state.currentKey || state.keys.length) return keys;
    return [{ key: state.currentKey, alias: '当前账号' }];
  }

  function renderPoolControls() {
    if (poolRenderTimer !== null) { clearTimeout(poolRenderTimer); poolRenderTimer = null; }
    const items = getPoolKeys();
    const summary = ElevenApiPool.summarize(items.map(item => {
      const info = state.quotaListCache[item.key];
      return { key: item.key, scanned: Boolean(info), remaining: info && info.left, accountId: info && info.accountId,
        disabled: info && info.disabled, invalid: info && info.invalid, quotaState: info && info.quotaState,
        limited: info && info.limited, ceiling: info && info.ceiling };
    }));
    state.poolSummary = summary;
    const balance = summary.known || (summary.total && summary.scanned === summary.total && !summary.unknown) ? summary.remaining.toLocaleString() : '--';
    ui.quotaDisplay.textContent = balance;
    ui.poolApiCount.textContent = `${summary.total.toLocaleString()} 个 API`;
    ui.statusDot.classList.toggle('active', summary.available > 0 || summary.unknown > 0);
    ui.poolSummary.textContent = summary.total ? `已扫描 ${summary.scanned}/${summary.total} · 有额度 ${summary.available}\n用尽 ${summary.exhausted} · 额度权限 ${summary.permissions} · 访问受限 ${summary.restricted}\n未知 ${summary.unknown} · 确认无效 ${summary.invalid}${summary.limited ? ` · 临时受限 ${summary.limited}` : ''}` : '暂无 API';
    ui.remainChars.textContent = `综合额度: ${balance} credits`;
    renderVoiceLibraries();
    renderVoicePoolSummary();
    refreshQueryDetails();
    return summary;
  }

  function schedulePoolRender() {
    if (poolRenderTimer !== null) return;
    poolRenderTimer = setTimeout(() => { poolRenderTimer = null; renderPoolControls(); }, 200);
  }

  function saveQuotaSnapshot() {
    clearTimeout(quotaSaveTimer);
    quotaSavePromise = quotaSavePromise.catch(() => {}).then(writeQuotaSnapshot);
    return quotaSavePromise;
  }

  function writeQuotaSnapshot() {
    const records = getPoolKeys().filter(item => state.quotaListCache[item.key]).map(item => {
      const info = { ...state.quotaListCache[item.key] };
      if (!Number.isFinite(info.ceiling)) delete info.ceiling;
      return { key: item.key, info };
    });
    const keys = new Set(getPoolKeys().map(item => item.key));
    const access = [...state.voiceAccessCache.values()].filter(info => keys.has(info.key) && Date.now() - info.ts < 300000);
    const skips = state.generationSkips.values().filter(record => keys.has(record.key));
    return writeLocal({ pool_quota_cache: records, voice_access_cache: access, generation_skip_cache: skips });
  }

  function scheduleQuotaSave() {
    clearTimeout(quotaSaveTimer);
    quotaSaveTimer = setTimeout(() => saveQuotaSnapshot().catch(() => setStatus('额度快照保存失败，账号未改变', 'error')), 500);
  }

  function schedulePoolScan() {
    if (!state.ready || state.batchRunning) return;
    clearTimeout(poolScanTimer);
    poolScanTimer = setTimeout(() => { renderPoolControls(); scanPool(); updateStats(); }, 400);
  }

  async function scanPool(force = false) {
    if (poolScanning) {
      await poolScanning;
      const missing = getPoolKeys().some(item => !ElevenVoiceIndex.freshQuota(state.quotaListCache[item.key]));
      if (force || missing) return scanPool(force);
      return;
    }
    const items = getPoolKeys().map(item => ({ ...item }));
    ui.scanPoolBtn.disabled = true;
    ui.scanPoolBtn.textContent = '扫描中';
    let cursor = 0;
    poolScanning = (async () => {
      await Promise.all(Array.from({ length: Math.min(QUOTA_SCAN_CONCURRENCY, items.length) }, async () => {
        while (cursor < items.length && (!state.batchRunning || !state.pauseRequested)) {
          const item = items[cursor++];
          await getQuotaInfo(item.key, force);
          schedulePoolRender();
        }
      }));
    })();
    try { await poolScanning; }
    finally {
      poolScanning = null;
      ui.scanPoolBtn.disabled = state.batchRunning;
      ui.scanPoolBtn.textContent = '扫描额度';
      renderPoolControls();
      updateStats();
      const current = state.quotaListCache[state.currentKey];
      if (!state.batchRunning && current && current.disabled) {
        const replacement = getPoolKeys().find(item => state.quotaListCache[item.key] && !state.quotaListCache[item.key].disabled);
        if (replacement) switchKey(replacement.key);
      }
    }
  }

  async function fetchWithTimeout(url, options, timeout = 20000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try { return await fetch(url, { ...options, signal: controller.signal }); }
    catch (error) {
      const failure = new Error(error.message || '查询请求未成功');
      failure.name = error.name || 'Error';
      failure.code = error.name === 'AbortError' ? 'query_timeout' : 'query_network_error';
      failure.timeoutMs = error.name === 'AbortError' ? timeout : 0;
      throw failure;
    }
    finally { clearTimeout(timer); }
  }

  function queryErrorInfo(error, key, endpoint) {
    const redact = value => String(value || '').split(key).join('[已隐藏]').slice(0, 500);
    return { httpStatus: Number(error.status) || 0, errorCode: redact(error.code),
      errorMessage: redact(error.rawMessage || error.message), message: redact(error.message), errorType: error.name || '',
      timeoutMs: Number(error.timeoutMs) || 0, endpoint };
  }
  function queryResponseError(message, code) {
    return Object.assign(new Error(message), { status: 200, code, rawMessage: message });
  }
  async function readQuotaResponse(response) {
    if (!response.ok) throw await createApiError(response, '额度扫描失败');
    let data;
    try { data = await response.json(); }
    catch { throw queryResponseError('额度接口返回的内容不是有效 JSON，无法读取额度。', 'invalid_quota_response'); }
    const balance = ElevenApiKeys.quotaBalance(data);
    if (!balance) throw Object.assign(queryResponseError('额度接口没有返回有效的 character_limit / character_count，不能据此判定额度为零。', 'invalid_quota_response'),
      { accountId: typeof data?.user_id === 'string' ? data.user_id : '' });
    return { ...balance, accountId: typeof data.user_id === 'string' ? data.user_id : '' };
  }

  async function acquireQuotaSlot() {
    if (quotaRequestRunning < QUOTA_SCAN_CONCURRENCY) { quotaRequestRunning++; return; }
    await new Promise(resolve => quotaWaiters.push(resolve));
  }

  function releaseQuotaSlot() {
    if (quotaWaiters.length) quotaWaiters.shift()();
    else quotaRequestRunning--;
  }

  async function getQuotaInfo(key, force = false) {
    const cached = state.quotaListCache[key];
    if (!force && ElevenVoiceIndex.freshQuota(cached)) return cached;
    if (quotaRequests.has(key)) return quotaRequests.get(key);
    const request = (async () => {
      await acquireQuotaSlot();
      let info;
      let endpoint = '/v1/user';
      const attempts = [];
      let accountId = cached?.accountId || '';
      try {
        const headers = { 'xi-api-key': key };
        let res = await fetchWithTimeout('https://api.elevenlabs.io/v1/user', { headers });
        let result;
        try { result = await readQuotaResponse(res); }
        catch (firstError) {
          if (!(res.status === 403 && ElevenApiKeys.quotaErrorState(firstError) !== 'restricted') && firstError.code !== 'invalid_quota_response') throw firstError;
          if (firstError.accountId) accountId = firstError.accountId;
          attempts.push(queryErrorInfo(firstError, key, endpoint));
          endpoint = '/v1/user/subscription'; res = await fetchWithTimeout('https://api.elevenlabs.io' + endpoint, { headers });
          result = await readQuotaResponse(res);
        }
        info = { ...result, accountId: result.accountId || accountId, quotaState: 'ok', httpStatus: 200, endpoint, ts: Date.now() };
      } catch (error) {
        const quotaState = ElevenApiKeys.quotaErrorState(error);
        info = { left: null, disabled: ['invalid', 'restricted'].includes(quotaState),
          invalid: quotaState === 'invalid', quotaState, accountId, ...queryErrorInfo(error, key, endpoint), queryAttempts: attempts, ts: Date.now() };
      } finally { releaseQuotaSlot(); }
      if (state.quotaListCache[key]?.accountId !== info.accountId) allocationCache = null;
      state.quotaListCache[key] = info;
      scheduleQuotaSave();
      schedulePoolRender();
      return info;
    })();
    quotaRequests.set(key, request);
    try { return await request; }
    finally { quotaRequests.delete(key); }
  }

  async function createApiError(resp, fallback) {
    let detail = {};
    try { const data = await resp.clone().json(); detail = data.detail || data; } catch (error) { }
    const code = typeof detail === 'object' ? detail.code || detail.status || detail.type || '' : '';
    const message = typeof detail === 'string' ? detail : detail.message || fallback;
    const error = new Error(explainElevenError(resp.status, code, message, typeof detail === 'object' ? detail.param : '') || message);
    error.code = code;
    error.rawMessage = message;
    error.param = typeof detail === 'object' ? detail.param || '' : '';
    error.status = resp.status;
    const retryAfter = resp.headers.get('retry-after');
    error.retryAfterMs = retryAfter ? (Number.isFinite(Number(retryAfter)) ? Number(retryAfter) * 1000 : Math.max(0, Date.parse(retryAfter) - Date.now())) : 0;
    return error;
  }

  function lockBatch(locked) {
    if (locked) stopActivePreview();
    state.batchRunning = locked;
    ui.pauseBtn.disabled = !locked || state.pauseRequested;
    for (const element of document.querySelectorAll('input, select, textarea, button, .del-btn')) {
      if (['pauseBatchBtn', 'themeToggle', 'closeErrorBtn', 'confirmErrorBtn', 'closeSettingsBtn'].includes(element.id)) continue;
      if (element.tagName === 'SPAN') element.style.pointerEvents = locked ? 'none' : '';
      else if (locked) { element.dataset.wasDisabled = String(element.disabled); element.disabled = true; }
      else if (element.dataset.wasDisabled !== undefined) { element.disabled = element.dataset.wasDisabled === 'true'; delete element.dataset.wasDisabled; }
    }
    ui.accountCard.style.pointerEvents = locked ? 'none' : '';
    ui.accountDropdown.classList.add('hidden');
    ui.settingsModal.classList.add('hidden');
    ui.scanPoolBtn.disabled = locked || Boolean(poolScanning);
    ui.refreshModels.disabled = locked || modelLoading;
    syncKeyMaintenanceControls();
    updateStats();
  }

  function updateBatchProgress() {
    if (!batchJobs.length) return;
    const count = status => batchJobs.filter(job => job.card.dataset.status === status).length;
    const done = count('done');
    const failed = count('failed') + count('uncertain') + count('download_failed');
    const running = count('running') + count('downloading') + count('waiting');
    ui.batchProgress.textContent = `${state.pauseRequested ? '已暂停 · ' : ''}完成 ${done}/${batchJobs.length} · 失败 ${failed} · 处理中 ${running}`;
    ui.batchProgressBar.max = batchJobs.length;
    ui.batchProgressBar.value = done + failed;
  }

  function setTaskStatus(card, status, entry = null, message = '', persist = true) {
    const labels = { pending: '待生成', waiting: '等待中', running: '生成中', downloading: '下载中', done: '已完成', failed: '失败', uncertain: '待确认', download_failed: '下载失败' };
    card.dataset.status = status;
    if (entry) card.taskData.account = entry.alias;
    card.taskData.message = message;
    card.querySelector('.task-status').textContent = `${labels[status] || status}${card.taskData.account ? ` · ${card.taskData.account}` : ''}`;
    card.querySelector('.task-message').textContent = message;
    const retry = card.querySelector('.task-retry');
    retry.classList.toggle('hidden', !['done', 'uncertain', 'download_failed'].includes(status));
    retry.textContent = status === 'download_failed' ? '重试下载' : '重新生成';
    retry.disabled = state.batchRunning;
    if (status === 'done' && ui.autoDelete.checked) {
      card.remove();
      ElevenAudioStore.remove(card.taskData.id).catch(() => {});
      refreshIndexes();
    }
    if (persist) { saveCards(); updateBatchProgress(); updateStats(); }
  }

  if (ui.scanPoolBtn) ui.scanPoolBtn.addEventListener('click', () => scanPool(true));
  ui.poolConcurrency.addEventListener('change', () => {
    state.concurrency = Number(ui.poolConcurrency.value);
    chrome.storage.local.set({ pool_concurrency: state.concurrency });
  });
  ui.voicePriorityPolicy.addEventListener('change', async () => {
    if (state.batchRunning || state.keyMaintenance) { ui.voicePriorityPolicy.value = state.voicePriority; return; }
    const next = ui.voicePriorityPolicy.value === 'protect' ? 'protect' : 'prefer';
    setKeyMaintenance(true);
    try {
      await writeLocal({ pool_voice_priority: next });
      state.voicePriority = next;
      allocationCache = null;
      renderVoicePoolSummary();
      if (!ui.settingsModal.classList.contains('hidden')) renderKeyList();
    } catch {
      ui.voicePriorityPolicy.value = state.voicePriority;
      setStatus('分配策略保存失败，原策略和账号已保留', 'error');
    } finally { setKeyMaintenance(false); }
  });
  ui.customVoiceId.addEventListener('input', () => {
    chrome.storage.local.set({ custom_voice_id: ui.customVoiceId.value.trim() });
    renderVoicePoolSummary();
    if (!ui.settingsModal.classList.contains('hidden')) renderKeyList();
  });
  ui.pauseBtn.addEventListener('click', () => {
    state.pauseRequested = true;
    ui.pauseBtn.disabled = true;
    setStatus('暂停中，等待正在生成的文案完成');
  });
  window.addEventListener('beforeunload', event => {
    if (state.batchRunning) { event.preventDefault(); event.returnValue = ''; }
  });

  if (ui.genBtn) ui.genBtn.addEventListener('click', async () => {
    if (state.batchRunning || state.keyMaintenance) return;
    if (!getPoolKeys().length) return showError('请在设置中导入 API Key。');
    if (ui.autoSplit3Min && ui.autoSplit3Min.checked) {
      splitAllOverThreeMinutesCards();
    }
    const cards = Array.from(ui.container.querySelectorAll('.card'));
    batchJobs = cards.map((card, index) => ({ card, index: card.taskData.index || index + 1, text: card.querySelector('textarea').value.trim() }))
      .filter(job => job.text && ['pending', 'failed'].includes(job.card.dataset.status));
    if (!batchJobs.length) return showError('没有待生成文案。');
    const voice = selectedVoiceId();
    const routes = getVoiceRoutes(voice);
    if (!routes.size) return showError('请选择已汇总的声音，或输入有效 Voice ID。');
    const rawFormat = ui.format.value;
    const cfg = { voice, model: ui.model.value, apiFormat: selectedOutputFormat(),
      fileExt: rawFormat === 'mp3_as_mp4' ? 'mp4' : rawFormat.startsWith('pcm') ? 'wav' : 'mp3',
      voiceSettings: readVoiceSettings(ui.model.value),
      folder: state.folder, baseFolder: state.baseFolder };
    state.pauseRequested = false;
    batchJobs.forEach(job => { job.card.taskData.index = job.index; setTaskStatus(job.card, 'pending', null, '', false); });
    saveCards(); updateBatchProgress();
    activePool = null;
    lockBatch(true);
    try {
      setStatus('使用本地声音映射分配任务');
      const priorities = getAllocationPriorities();
      activePool = new ElevenApiPool.Pool(getPoolKeys().filter(item => routes.has(item.key) && getVoiceCache(item.key, routes.get(item.key))?.access !== 'unavailable').map(item => {
        const info = state.quotaListCache[item.key] || {};
        const fresh = ElevenVoiceIndex.freshQuota(info);
        const limits = state.generationSkips.limits(item.key, routes.get(item.key), cfg.model, cfg.apiFormat);
        const priority = priorities.get(item.key);
        return { ...item, voiceId: routes.get(item.key), remaining: fresh ? info.left : null, accountId: info.accountId,
          disabled: Boolean(fresh && info.disabled) || limits.disabled || priority.blocked, ceiling: limits.ceiling, readyAt: limits.readyAt,
          priorityRank: priority.rank, priorityCoverage: priority.coverage, priorityReserved: priority.reserved,
          skipReason: priority.blocked ? '当前策略保留自定义声音额度，系统声音只使用系统专用账号。' : limits.disabled ? generationDiagnostic(limits.record) : '' };
      }));
      const model = state.modelList.find(item => item.model_id === cfg.model);
      const limit = model && model.maximum_text_length_per_request;
      const tasks = batchJobs.filter(job => {
        if (limit && Array.from(job.text).length > limit) { setTaskStatus(job.card, 'failed', null, `这段文案超过模型单次 ${limit} 字符上限，请拆分后重试。`); return false; }
        return true;
      }).sort((a, b) => b.text.length - a.text.length);
      await ElevenApiPool.run(tasks, activePool, {
        concurrency: state.concurrency, stopped: () => state.pauseRequested,
        estimate: text => ElevenApiPool.estimateCost(text, model),
        generate: async (job, entry) => {
          if (!ElevenVoiceIndex.freshQuota(state.quotaListCache[entry.key])) {
            const info = await getQuotaInfo(entry.key);
            if (info.disabled) throw Object.assign(new Error(info.message || 'API 不可用'), {
              preflight: true, status: info.httpStatus || (info.invalid ? 401 : 403), code: info.errorCode || (info.invalid ? 'invalid_api_key' : 'workspace_access_denied') });
            if (Number.isFinite(info.left)) {
              entry.account.remaining = info.left;
              if (info.left < ElevenApiPool.estimateCost(job.text, model)) throw Object.assign(new Error('当前账号额度不足'), { preflight: true, status: 401, code: 'quota_exceeded' });
            }
          }
          const result = await generate(job.text, { ...cfg, voice: entry.voiceId, key: entry.key });
          state.voiceAccessCache.set(voiceCacheKey(entry.key, entry.voiceId), { key: entry.key, voice: entry.voiceId, access: 'available', ts: Date.now() });
          return result;
        },
        download: async (job, result) => {
          const filename = buildDownloadPath(job.text, cfg, job.index);
          const saved = { blob: result.blob, filename };
          job.card.audioResult = saved;
          await ElevenAudioStore.put(job.card.taskData.id, saved).catch(() => {});
          await downloadAudio(job.card, saved);
          job.card.audioResult = null;
          await ElevenAudioStore.remove(job.card.taskData.id).catch(() => {});
        },
        onStatus: (job, status, entry, message) => setTaskStatus(job.card, status, entry, message),
        onSkip: (entry, error, kind, cost) => {
          const affected = ['rate', 'uncertain'].includes(kind) && entry.accountId ?
            getPoolKeys().filter(item => item.key === entry.key || state.quotaListCache[item.key]?.accountId === entry.accountId) : [entry];
          for (const item of affected) state.generationSkips.mark(error, { key: item.key, voice: routes.get(item.key), model: cfg.model, format: cfg.apiFormat, cost });
          scheduleQuotaSave();
          renderGenerationSkips();
        },
        onQuota: (pool, changedEntry) => {
          for (const entry of pool.entries) {
            if (entry.account !== changedEntry.account) continue;
            const info = state.quotaListCache[entry.key];
            if (info) { info.left = entry.account.remaining; info.ts = Date.now(); }
            if (entry.key === state.currentKey && Number.isFinite(entry.account.remaining)) { state.currentQuota = entry.account.remaining; updateStatsUI(state.currentQuota); }
          }
          scheduleQuotaSave();
          renderPoolControls();
        },
        onFatal: () => { state.pauseRequested = true; }
      });
    } catch (error) {
      showError(error.message || '批量任务异常');
    } finally {
      let snapshotSaved = true;
      await saveQuotaSnapshot().catch(() => { snapshotSaved = false; });
      lockBatch(false);
      ui.pauseBtn.disabled = true;
      updateBatchProgress();
      renderPoolControls();
      saveCards();
      if (!snapshotSaved) setStatus('跳过标记/额度缓存保存失败，当前窗口已保留；请暂勿刷新', 'error');
      else setStatus(state.pauseRequested ? '已暂停，可继续未完成文案' : ui.batchProgress.textContent);
    }
  });

  async function generate(text, cfg) {
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${cfg.voice}?output_format=${cfg.apiFormat}`;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 180000);
    try {
    const resp = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'xi-api-key': cfg.key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        model_id: cfg.model,
        voice_settings: cfg.voiceSettings
      })
    });

    if (!resp.ok) {
      throw await createApiError(resp, '生成失败');
    }

    const blob = await resp.blob();
    const header = resp.headers.get('character-cost');
    let outputBlob = blob;
    if (cfg.apiFormat.startsWith('pcm')) outputBlob = wrapPcmAsWav(await blob.arrayBuffer(), Number(cfg.apiFormat.split('_')[1]));
    return { blob: outputBlob, cost: header !== null && Number.isFinite(Number(header)) ? Number(header) : null };
    } catch (error) {
      if (!error.status) { error.kind = 'uncertain'; error.message = '网络中断或生成超时，结果待确认。请先检查 ElevenLabs 历史记录，再手动重试。'; }
      throw error;
    } finally { clearTimeout(timer); }
  }

  function wrapPcmAsWav(buffer, sampleRate) {
    const header = new ArrayBuffer(44);
    const view = new DataView(header);
    const write = (offset, value) => { for (let i = 0; i < value.length; i++) view.setUint8(offset + i, value.charCodeAt(i)); };
    write(0, 'RIFF'); view.setUint32(4, buffer.byteLength + 36, true); write(8, 'WAVE'); write(12, 'fmt ');
    view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true); view.setUint32(28, sampleRate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
    write(36, 'data'); view.setUint32(40, buffer.byteLength, true);
    return new Blob([header, buffer], { type: 'audio/wav' });
  }

  function buildDownloadPath(text, cfg, index) {
    const safe = value => String(value || '').replace(/[\\/:*?"<>|\x00-\x1f]/g, '_').replace(/^\.+|[. ]+$/g, '').trim();
    const filename = `${String(index).padStart(4, '0')}_${safe(text.substring(0, 15)) || 'audio'}.${cfg.fileExt}`;
    const base = safe(cfg.baseFolder) || 'ElevenLabs_Pro';
    const sub = safe(cfg.folder);
    return sub ? `${base}/${sub}/${filename}` : `${base}/${filename}`;
  }

  async function downloadAudio(card, result) {
    const url = URL.createObjectURL(result.blob);
    try {
      const id = await new Promise((resolve, reject) => chrome.downloads.download({ url, filename: result.filename, saveAs: false, conflictAction: 'uniquify' }, downloadId => {
        if (chrome.runtime.lastError || !downloadId) reject(new Error(chrome.runtime.lastError ? chrome.runtime.lastError.message : '无法开始下载'));
        else resolve(downloadId);
      }));
      card.taskData.downloadId = id;
      saveCards();
      await new Promise((resolve, reject) => {
        let settled = false;
        const finish = error => {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          chrome.downloads.onChanged.removeListener(listener);
          if (error) reject(error); else resolve();
        };
        const listener = delta => {
          if (delta.id !== id) return;
          if (delta.state && delta.state.current === 'complete') finish();
          if (delta.error || (delta.state && delta.state.current === 'interrupted')) finish(new Error(delta.error ? delta.error.current : '下载中断'));
        };
        const timer = setTimeout(() => finish(new Error('下载等待超时，请检查下载列表并重试下载。')), 120000);
        chrome.downloads.onChanged.addListener(listener);
        chrome.downloads.search({ id }, items => {
          if (chrome.runtime.lastError) return finish(new Error(chrome.runtime.lastError.message));
          const item = items && items[0];
          if (item && item.state === 'complete') finish();
          else if (item && item.state === 'interrupted') finish(new Error(item.error || '下载中断'));
        });
      });
    } finally { URL.revokeObjectURL(url); }
  }

  // ==========================================
  // 7. API 数据获取 (Voices, Models, Quota)
  // ==========================================
  function selectedVoiceId() { return ui.customVoiceId.value.trim() || ui.voice.value; }
  function selectedOutputFormat() { return ui.format.value === 'mp3_as_mp4' ? 'mp3_44100_128' : ui.format.value; }
  function ensureVoiceFamilies() {
    if (!voiceFamiliesDirty) return;
    state.voiceFamilies = ElevenVoiceIndex.build(state.voiceCatalog.values());
    voiceFamiliesDirty = false;
    allocationCache = null;
  }
  function allocationSelection() {
    ensureVoiceFamilies();
    const voice = selectedVoiceId();
    return state.voiceFamilies.get(voice) || [...state.voiceFamilies.values()].find(family => family.voiceIds.has(voice)) || null;
  }
  function getAllocationPriorities() {
    const selected = allocationSelection();
    const signature = selected?.id || selectedVoiceId();
    if (!allocationCache || allocationCache.selection !== signature || allocationCache.policy !== state.voicePriority) {
      const items = getPoolKeys().map(item => ({ ...item, accountId: state.quotaListCache[item.key]?.accountId }));
      allocationCache = { selection: signature, policy: state.voicePriority,
        priorities: ElevenVoiceIndex.allocationPriorities(items, state.voiceLibraries, state.voiceFamilies, selected, state.voicePriority) };
    }
    return allocationCache.priorities;
  }
  function allocationDiagnostic(priority, quota) {
    if (ElevenVoiceIndex.freshQuota(quota) && quota.invalid === true) return '密钥无效 · 不参与生成';
    if (!priority) return '';
    const label = priority.systemOnly ? '系统专用 · 优先' : priority.rank === 0 ? '当前声音专用 · 优先' :
      priority.rank === 1 ? '声音库未知 · 备用' : `保留其他自定义声音 · 最少 ${priority.coverage} 个账号共享 · ${priority.reserved} 组`;
    return label + (priority.blocked ? ' · 已保护' : '');
  }
  function getVoiceRoutes(selection = selectedVoiceId(), ignoreCustom = false) {
    const custom = !ignoreCustom && ui.customVoiceId.value.trim();
    const family = !custom && state.voiceFamilies.get(selection);
    if (family && family.category !== 'premade') return ElevenVoiceIndex.routes(family, state.voiceOverrides[family.id]);
    const id = custom || (family && family.id) || selection;
    return /^[A-Za-z0-9_-]+$/.test(id || '') ? new Map(getPoolKeys().map(item => [item.key, id])) : new Map();
  }
  function voiceCacheKey(key, voice) { return key + ':' + voice; }
  function getVoiceCache(key, voice) {
    const info = state.voiceAccessCache.get(voiceCacheKey(key, voice));
    return info && Date.now() - info.ts < 300000 ? info : null;
  }

  function renderVoicePoolSummary() {
    const voice = selectedVoiceId();
    if (!voice) { ui.voicePoolSummary.textContent = '未选择声音'; ui.voicePrioritySummary.textContent = ''; return; }
    const items = getPoolKeys();
    const priorities = getAllocationPriorities();
    const routes = getVoiceRoutes(voice);
    const counts = { available: 0, unavailable: 0, unknown: 0, unscanned: 0 };
    const visible = [];
    let skipped = 0;
    let formatBlocked = 0;
    const allocationCounts = { first: 0, personal: 0, unknown: 0 };
    for (const item of items) {
      if (!routes.has(item.key)) continue;
      const info = getVoiceCache(item.key, routes.get(item.key));
      const priority = priorities.get(item.key);
      allocationCounts[priority.rank === 0 ? 'first' : priority.rank === 1 ? 'unknown' : 'personal']++;
      counts[info ? info.access : 'unscanned']++;
      const limits = state.generationSkips.limits(item.key, routes.get(item.key), ui.model.value, selectedOutputFormat());
      if (limits.formatBlocked) formatBlocked++;
      if (limits.disabled || limits.ceiling <= 0 || limits.readyAt > Date.now() || priority.blocked) skipped++;
      else if (!info || info.access !== 'unavailable') visible.push(item);
    }
    const quota = ElevenApiPool.summarize(visible.map(item => {
      const info = state.quotaListCache[item.key];
      return { key: item.key, accountId: info && info.accountId, remaining: info && info.left,
        disabled: info && info.disabled, invalid: info && info.invalid, quotaState: info && info.quotaState, scanned: Boolean(info) };
    }));
    const family = state.voiceFamilies.get(voice);
    ui.voicePrioritySummary.textContent = allocationSelection()?.category === 'premade'
      ? `系统专用 ${allocationCounts.first} · 自定义备用 ${allocationCounts.personal} · 库未知 ${allocationCounts.unknown}`
      : `当前声音优先 ${allocationCounts.first} · 保留其他声音 ${allocationCounts.personal} · 库未知 ${allocationCounts.unknown}`;
    const name = family?.name || voice;
    ui.voicePoolSummary.title = name + '\n映射 Voice ID: ' + [...new Set(routes.values())].join(', ');
    const stale = visible.filter(item => state.quotaListCache[item.key] && !ElevenVoiceIndex.freshQuota(state.quotaListCache[item.key])).length;
    ui.voicePoolSummary.textContent = `已映射 ${routes.size}/${items.length} API · 声音可见 ${counts.available}/${routes.size} · 无声音 ${counts.unavailable} · 未知 ${counts.unknown} · 未核验 ${counts.unscanned}\n生成跳过 ${skipped}${formatBlocked ? `（格式受限 ${formatBlocked}）` : ''} · 可尝试 ${visible.length}\n对应已知额度 ${quota.remaining.toLocaleString()} credits${stale ? ' · 过期快照 ' + stale : ''}`;
  }

  async function getVoiceAccess(key, voice, force = false) {
    const cached = getVoiceCache(key, voice);
    if (!force && cached) return cached;
    const id = voiceCacheKey(key, voice);
    if (voiceRequests.has(id)) return voiceRequests.get(id);
    const request = (async () => {
      await acquireQuotaSlot();
      let info;
      try {
        const response = await fetchWithTimeout('https://api.elevenlabs.io/v1/voices/' + encodeURIComponent(voice), { headers: { 'xi-api-key': key } });
        if (!response.ok) throw await createApiError(response, '声音权限查询失败');
        let data;
        try { data = await response.json(); }
        catch { throw queryResponseError('声音接口返回的内容不是有效 JSON。', 'invalid_voice_response'); }
        if (!data || typeof data.voice_id !== 'string') throw queryResponseError('声音接口没有返回有效 Voice ID。', 'invalid_voice_response');
        info = { access: data.voice_id === voice ? 'available' : 'unknown', name: data.name || '', httpStatus: 200,
          endpoint: '/v1/voices/' + voice, errorCode: data.voice_id === voice ? '' : 'voice_id_mismatch',
          errorMessage: data.voice_id === voice ? '' : '返回 Voice ID 与所选 ID 不一致，暂时无法确认声音访问。', ts: Date.now() };
      } catch (error) {
        info = { access: ElevenApiKeys.voiceAccessError(error), ...queryErrorInfo(error, key, '/v1/voices/' + voice), ts: Date.now() };
      } finally { releaseQuotaSlot(); }
      state.voiceAccessCache.set(id, { ...info, key, voice });
      scheduleQuotaSave();
      schedulePoolRender();
      return info;
    })();
    voiceRequests.set(id, request);
    try { return await request; }
    finally { voiceRequests.delete(id); }
  }

  async function scanVoicePool(voice, force = false) {
    if (!voice) return;
    for (const [id, info] of state.voiceAccessCache) if (Date.now() - info.ts >= 300000) state.voiceAccessCache.delete(id);
    if (voiceScans.has(voice)) {
      await voiceScans.get(voice);
      if (!force) return;
    }
    const routes = getVoiceRoutes(voice);
    const items = getPoolKeys().filter(item => routes.has(item.key));
    let cursor = 0;
    const scan = (async () => {
      await Promise.all(Array.from({ length: Math.min(4, items.length) }, async () => {
        while (cursor < items.length && (!state.batchRunning || !state.pauseRequested)) {
          const item = items[cursor++];
          if (state.quotaListCache[item.key]?.disabled) continue;
          await getVoiceAccess(item.key, routes.get(item.key), force);
        }
      }));
    })();
    voiceScans.set(voice, scan);
    syncKeyMaintenanceControls();
    try { await scan; }
    finally {
      voiceScans.delete(voice);
      syncKeyMaintenanceControls();
      renderVoicePoolSummary();
      if (!ui.settingsModal.classList.contains('hidden')) renderKeyList();
    }
  }

  ui.scanVoicePoolBtn.addEventListener('click', () => {
    const voice = selectedVoiceId();
    if (!voice || !getVoiceRoutes(voice).size) return showError('请选择声音或填写 Voice ID。');
    scanVoicePool(voice, true).catch(error => showError(error.message));
  });

  function voiceQuota(keys) {
    return ElevenApiPool.summarize(Array.from(keys, key => {
      const info = state.quotaListCache[key];
      return { key, accountId: info && info.accountId, remaining: info && info.left,
        disabled: info && info.disabled, invalid: info && info.invalid, quotaState: info && info.quotaState, scanned: Boolean(info) };
    }));
  }

  function setVoiceLibrary(key, library, persist = true) {
    const previous = state.voiceLibraries.get(key);
    if (previous) for (const voice of previous.voices) {
      const entry = state.voiceCatalog.get(voice.voice_id);
      if (entry) { entry.sources.delete(key); if (!entry.sources.size) state.voiceCatalog.delete(voice.voice_id); }
    }
    if (library) {
      const unique = new Map();
      for (const voice of library.voices) {
        if (voice && typeof voice.voice_id === 'string' && /^[A-Za-z0-9_-]+$/.test(voice.voice_id)) {
          const record = { voice_id: voice.voice_id, name: String(voice.name || voice.voice_id), category: String(voice.category || '') };
          if (typeof voice.is_owner === 'boolean') record.is_owner = voice.is_owner;
          unique.set(voice.voice_id, record);
        }
      }
      const clean = { key, voices: [...unique.values()], ts: Number(library.ts) || 0, error: library.error || '',
        endpoint: library.endpoint || '/v2/voices', httpStatus: library.httpStatus || 0, errorCode: library.errorCode || '',
        errorMessage: library.errorMessage || '', errorType: library.errorType || '', timeoutMs: library.timeoutMs || 0 };
      state.voiceLibraries.set(key, clean);
      for (const voice of clean.voices) {
        let entry = state.voiceCatalog.get(voice.voice_id);
        if (!entry) { entry = { ...voice, sources: new Map() }; state.voiceCatalog.set(voice.voice_id, entry); }
        entry.sources.set(key, voice);
      }
    } else state.voiceLibraries.delete(key);
    voiceFamiliesDirty = true;
    schedulePoolRender();
    if (persist) {
      clearTimeout(librarySaveTimer);
      librarySaveTimer = setTimeout(() => {
        writeLocal({ voice_libraries_cache: [...state.voiceLibraries.values()] })
          .catch(() => { ui.voiceLibrarySummary.textContent += ' · 缓存保存失败（账号未改变）'; });
      }, 500);
    }
  }

  function pruneVoiceLibraries() {
    allocationCache = null;
    const allowed = new Set(getPoolKeys().map(item => item.key));
    for (const key of state.voiceLibraries.keys()) if (!allowed.has(key)) setVoiceLibrary(key, null);
  }

  function renderVoiceLibraries() {
    const items = getPoolKeys();
    ensureVoiceFamilies();
    if (typeof updateCleanVoicesBadge === 'function') updateCleanVoicesBadge();
    const cached = items.filter(item => state.voiceLibraries.has(item.key)).length;
    const failed = items.filter(item => state.voiceLibraries.get(item.key)?.error).length;
    const stale = items.filter(item => {
      const ts = state.voiceLibraries.get(item.key)?.ts;
      return ts && Date.now() - ts >= 900000;
    }).length;
    ui.voiceLibrarySummary.textContent = libraryProgress
      ? `汇总 ${libraryProgress.done}/${libraryProgress.total} 个 API · ${state.voiceFamilies.size} 个声音 · 查询失败 ${libraryProgress.failed}`
      : `${state.voiceFamilies.size} 个声音 · 已查询 ${cached}/${items.length} 个 API${failed ? ' · 查询失败 ' + failed : ''}${stale ? ' · 旧缓存 ' + stale : ''}`;
    state.voiceList = [...state.voiceCatalog.values()].map(entry => {
      const voice = entry.sources.get(state.currentKey) || entry.sources.values().next().value;
      return { ...voice, sources: entry.sources };
    }).filter(voice => ElevenVoiceIndex.familyId(voice));
    const query = ui.voiceSearch.value.trim().toLowerCase();
    let selected = ui.voice.value || preferredVoice;
    if (!state.voiceFamilies.has(selected)) {
      const family = [...state.voiceFamilies.values()].find(item => item.voiceIds.has(selected));
      if (family) selected = family.id;
      else if (state.voiceCatalog.has(selected)) selected = '';
    }
    const options = [...state.voiceFamilies.values()].sort((a, b) => a.name.localeCompare(b.name)).filter(family => !query || family.id === selected ||
      family.name.toLowerCase().includes(query) || [...family.voiceIds].some(id => id.toLowerCase().includes(query))).map(family => {
      const routes = getVoiceRoutes(family.id, true);
      const sources = new Set([...routes].filter(([key, id]) => getVoiceCache(key, id)?.access !== 'unavailable').map(([key]) => key));
      const quota = voiceQuota(sources);
      return { id: family.id, category: family.category, voiceIds: [...family.voiceIds],
        label: `${family.name} · ${sources.size} API · 已知 ${quota.remaining.toLocaleString()} credits` };
    });
    if (selected && !options.some(option => option.id === selected)) {
      options.unshift({ id: selected, category: 'personal', voiceIds: /^[A-Za-z0-9_-]+$/.test(selected) ? [selected] : [], label: selected.startsWith('own:') ? decodeURIComponent(selected.slice(4)) + ' · 待汇总' : selected + ' · 待核验' });
    }
    const signature = JSON.stringify(options);
    if (signature !== voiceOptionsSignature) {
      voiceOptionsSignature = signature;
      ui.voice.replaceChildren();
      const groups = new Map([['own', '我的克隆 / 生成'], ['default', '系统声音']].map(([key, label]) => {
        const group = document.createElement('optgroup'); group.label = label; return [key, group];
      }));
      for (const option of options) {
        const element = document.createElement('option'); element.value = option.id; element.textContent = option.label;
        element.title = 'Voice IDs: ' + option.voiceIds.join(', ');
        element.dataset.voiceIds = JSON.stringify(option.voiceIds);
        const group = option.category === 'premade' ? 'default' : 'own';
        groups.get(group).appendChild(element);
      }
      for (const group of groups.values()) if (group.children.length) ui.voice.appendChild(group);
      if (!options.length) {
        const empty = document.createElement('option'); empty.value = ''; empty.textContent = items.length ? '尚无声音，汇总声音库或填写 ID' : '请先配置 Key'; ui.voice.appendChild(empty);
      }
      if (selected) ui.voice.value = selected;
      preferredVoice = ui.voice.value;
    } else if (selected && ui.voice.value !== selected) {
      ui.voice.value = selected;
      preferredVoice = selected;
    }
  }

  async function getVoiceLibrary(key, force = false) {
    const cached = state.voiceLibraries.get(key);
    if (!force && cached && !cached.error && cached.ts <= Date.now() && Date.now() - cached.ts < 900000) return cached;
    if (libraryRequests.has(key)) return libraryRequests.get(key);
    const request = (async () => {
      const voices = [], tokens = new Set();
      let token = '';
      try {
        do {
          const url = new URL('https://api.elevenlabs.io/v2/voices');
          url.searchParams.set('page_size', '100'); url.searchParams.set('include_total_count', 'false');
          if (token) url.searchParams.set('next_page_token', token);
          await acquireQuotaSlot();
          let data;
          try {
            const response = await fetchWithTimeout(url.href, { headers: { 'xi-api-key': key } });
            if (!response.ok) throw await createApiError(response, '声音库查询失败');
            try { data = await response.json(); }
            catch { throw queryResponseError('声音库接口返回的内容不是有效 JSON。', 'invalid_voice_response'); }
          } finally { releaseQuotaSlot(); }
          if (!data || !Array.isArray(data.voices)) throw queryResponseError('声音库响应格式错误：缺少 voices 列表。', 'invalid_voice_response');
          voices.push(...data.voices);
          token = data.has_more ? data.next_page_token : '';
          if (data.has_more && (typeof token !== 'string' || !token || tokens.has(token))) throw queryResponseError('声音库分页异常，查询未完成，原声音缓存仍保留。', 'invalid_voice_pagination');
          if (token) tokens.add(token);
        } while (token);
        const library = { voices, ts: Date.now(), httpStatus: 200, endpoint: '/v2/voices' };
        if (getPoolKeys().some(item => item.key === key)) setVoiceLibrary(key, library);
        return library;
      } catch (error) {
        // A failed or incomplete refresh must not discard the previous account's voices.
        if (getPoolKeys().some(item => item.key === key)) {
          const details = queryErrorInfo(error, key, '/v2/voices');
          setVoiceLibrary(key, { voices: cached?.voices || [], ts: cached?.ts || 0, error: details.message, ...details });
        }
        throw error;
      }
    })();
    libraryRequests.set(key, request);
    try { return await request; } finally { libraryRequests.delete(key); }
  }

  async function loadVoices(key, savedId = null) {
    if (!key) return;
    if (savedId && !ui.voice.value) preferredVoice = savedId;
    renderVoiceLibraries();
    try { await getVoiceLibrary(key); renderVoiceLibraries(); renderVoicePoolSummary(); }
    catch (error) { setStatus('声音库查询失败：' + error.message, 'error'); renderVoiceLibraries(); }
  }

  async function scanVoiceLibraries(force = false) {
    if (libraryScan || state.batchRunning || state.keyMaintenance) return;
    const items = getPoolKeys();
    let cursor = 0;
    libraryProgress = { done: 0, total: items.length, failed: 0 };
    const scan = (async () => {
      await Promise.all(Array.from({ length: Math.min(4, items.length) }, async () => {
        while (cursor < items.length) {
          const item = items[cursor++];
          try { await getVoiceLibrary(item.key, force); } catch { libraryProgress.failed++; }
          libraryProgress.done++; schedulePoolRender();
        }
      }));
    })();
    libraryScan = scan;
    syncKeyMaintenanceControls();
    try { await scan; }
    finally { libraryScan = null; libraryProgress = null; syncKeyMaintenanceControls(); renderVoiceLibraries(); renderVoicePoolSummary(); }
  }

  ui.scanVoiceLibrariesBtn.addEventListener('click', () => scanVoiceLibraries());
  ui.voiceSearch.addEventListener('input', renderVoiceLibraries);

  async function fetchModels(key, savedModelId = null, force = false) {
    const requestId = ++modelRequestId;
    modelLoading = true;
    ui.refreshModels.disabled = true;
    try {
      const cached = await new Promise(r => chrome.storage.local.get(['models_cache'], res => r(res.models_cache)));
      if (key !== state.currentKey || requestId !== modelRequestId) return;
      const now = Date.now();
      if (!force && cached && Array.isArray(cached.data) && (!cached.key || cached.key === key) && (now - cached.ts < 86400000)) {
        renderModels(cached.data, savedModelId);
      }
      await fetchModelsFromApi(key, savedModelId, requestId);
    } catch (e) {
      if (key === state.currentKey && requestId === modelRequestId) setStatus('模型列表加载失败：' + e.message, 'error');
    } finally {
      if (requestId === modelRequestId) {
        modelLoading = false;
        ui.refreshModels.disabled = state.batchRunning;
      }
    }
  }

  async function fetchModelsFromApi(key, savedModelId, requestId) {
    const selectedAtStart = ui.model.value;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    try {
      const res = await fetch('https://api.elevenlabs.io/v1/models', { headers: { 'xi-api-key': key }, signal: controller.signal });
      if (key !== state.currentKey || requestId !== modelRequestId) return;
      if (!res.ok) {
        const msg = await readElevenError(res, '模型列表加载失败');
        if (key === state.currentKey && requestId === modelRequestId) setStatus(msg, 'error');
        return;
      }
      const data = await res.json();
      if (key !== state.currentKey || requestId !== modelRequestId) return;
      if (!Array.isArray(data)) throw new Error('模型列表响应格式错误');
      chrome.storage.local.set({ 'models_cache': { key, data, ts: Date.now() } });
      const preferred = ui.model.value !== selectedAtStart ? ui.model.value : savedModelId || ui.model.value;
      renderModels(data, preferred);
    } finally { clearTimeout(timer); }
  }

  function renderModels(models, savedModelId) {
    if (!ui.model) return;
    const preferred = savedModelId || ui.model.value || 'eleven_multilingual_v2';
    const byId = new Map(BUILTIN_MODELS.map(model => [model.model_id, { ...model }]));
    for (const model of Array.isArray(models) ? models : []) {
      if (!model || typeof model.model_id !== 'string' || !model.model_id) continue;
      if (model.can_do_text_to_speech === false) byId.delete(model.model_id);
      else byId.set(model.model_id, { ...byId.get(model.model_id), ...model });
    }
    state.modelList = Array.from(byId.values());
    models = [...state.modelList];
    ui.model.innerHTML = '';
    
    const groupMain = document.createElement('optgroup'); groupMain.label = "🔥 核心模型";
    const groupOther = document.createElement('optgroup'); groupOther.label = "🧊 其他模型";
    
    const mainIds = BUILTIN_MODELS.map(model => model.model_id);
    
    models.sort((a, b) => {
      let idxA = mainIds.indexOf(a.model_id);
      let idxB = mainIds.indexOf(b.model_id);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return String(a.name || a.model_id).localeCompare(String(b.name || b.model_id));
    });

    models.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m.model_id;
      let name = m.name || m.model_id;
      if (m.model_id === 'eleven_v4') name = 'Eleven v4 (高质量)';
      if (m.model_id === 'eleven_v4_turbo') name = 'Eleven v4 Turbo (低延迟)';
      if (m.model_id === 'eleven_multilingual_v2') name = 'Multilingual v2 (推荐/情感)';
      if (m.model_id === 'eleven_turbo_v2_5') name = 'Turbo v2.5 (旧版)';
      if (m.model_id === 'eleven_v3') name = 'Eleven v3';
      opt.textContent = name;
      
      if (mainIds.includes(m.model_id)) groupMain.appendChild(opt);
      else groupOther.appendChild(opt);
    });

    ui.model.appendChild(groupMain);
    ui.model.appendChild(groupOther);
    ui.model.value = preferred;
    if (!ui.model.value) ui.model.value = 'eleven_multilingual_v2';
    if (!ui.model.value && ui.model.options.length) ui.model.selectedIndex = 0;
    updateModelUI();
  }

  async function fetchQuotaWithCache(key, cacheData) {
    const now = Date.now();
    // 缓存 5 分钟
    if (cacheData && cacheData.key === key && (now - cacheData.ts < 300000)) {
      state.currentQuota = cacheData.amount;
      updateStatsUI(state.currentQuota);
      fetchQuota(key, true);
    } else {
      renderPoolControls();
      fetchQuota(key);
    }
  }

  async function fetchQuota(key, isSilent = false) {
    try {
      const info = await getQuotaInfo(key);
      if (key !== state.currentKey) return;
      if (!Number.isFinite(info.left)) throw new Error(info.message || '额度未知');
      state.currentQuota = info.left;
      updateStatsUI(state.currentQuota);
      chrome.storage.local.set({ 'quota_cache': { key: key, amount: state.currentQuota, ts: Date.now() } });
    } catch (e) {
      renderPoolControls();
      if (!isSilent) setStatus(e.message || '额度查询失败', 'error');
    }
  }

  function updateStatsUI(quota) {
    renderPoolControls();
    updateStats();
  }

  // ==========================================
  // 8. Key 管理与账号切换
  // ==========================================
  function readLocal(keys) {
    return new Promise((resolve, reject) => chrome.storage.local.get(keys, data => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message)); else resolve(data);
    }));
  }

  function writeLocal(values) {
    return new Promise((resolve, reject) => chrome.storage.local.set(values, () => {
      const error = chrome.runtime.lastError;
      if (error) reject(new Error(error.message)); else resolve();
    }));
  }

  function syncKeyMaintenanceControls() {
    const busy = state.batchRunning || state.keyMaintenance;
    for (const control of [ui.importKeysBtn, ui.keyFileInput, ui.importBtn, ui.fileInput, ui.addKeyBtn,
      ui.newAlias, ui.newKey, ui.quickKeyInput, ui.quickKeyBtn]) control.disabled = busy;
    ui.cleanupKeysBtn.disabled = busy || !getPoolKeys().length;
    ui.cleanupUserRead.disabled = busy;
    ui.voicePriorityPolicy.disabled = busy;
    for (const button of ui.keyList.querySelectorAll('.query-retry-btn')) button.disabled = busy;
    renderGenerationSkips();
    ui.undoKeyCleanupBtn.disabled = busy || !state.cleanupBackup || Boolean(state.cleanupBackup.restored_at);
    ui.refreshKeysBtn.disabled = busy;
    ui.scanVoicePoolBtn.disabled = busy || voiceScans.size > 0 || !getPoolKeys().length;
    ui.scanVoiceLibrariesBtn.disabled = busy || Boolean(libraryScan) || !getPoolKeys().length;
    ui.refresh.disabled = busy || Boolean(libraryScan) || !getPoolKeys().length;
    ui.keyList.setAttribute('aria-busy', String(state.keyMaintenance));
  }

  function setKeyMaintenance(value) {
    state.keyMaintenance = value;
    syncKeyMaintenanceControls();
    updateStats();
  }

  function applyAccountList(keys, current) {
    const changed = current !== state.currentKey;
    state.keys = keys;
    state.currentKey = current;
    pruneVoiceLibraries();
    state.keyPage = 0;
    if (changed) {
      state.currentQuota = 0;
      if (current) { loadVoices(current); fetchModels(current); fetchQuota(current); }
      else {
        preferredVoice = '';
        ui.voice.value = '';
        renderVoiceLibraries();
      }
    }
    updateAccountStatus();
    renderKeyList();
    updateStats();
    if (!ui.accountDropdown.classList.contains('hidden')) renderQuickDropdown();
  }

  ui.cleanupUserRead.addEventListener('change', () => { ui.keyCleanupStatus.textContent = ''; });

  function applyVoiceQueryDetails(row, key, mappedId) {
    const quota = state.quotaListCache[key];
    const invalidKey = ElevenVoiceIndex.freshQuota(quota) && quota.invalid === true;
    const current = mappedId && getVoiceCache(key, mappedId);
    const previous = mappedId && state.voiceAccessCache.get(voiceCacheKey(key, mappedId));
    const voiceText = invalidKey ? '此 API 已被官方明确判定无效，当前无法查询或生成声音；请按额度查询中的原因更换完整 API Key。' :
      mappedId ? ElevenApiKeys.queryDiagnostic(current || previous, 'voice', key) : '当前声音在此账号尚未映射，不代表 Key 无效。';
    row.querySelector('.voice-diagnostic').textContent = !invalidKey && !current && previous ? '声音查询记录已过期，需要重新核验。\n' + voiceText : voiceText;
    const tag = row.querySelector('.voice-access-tag');
    tag.textContent = invalidKey ? '密钥无效' : current ? { available: '有此声音', unavailable: '无此声音', unknown: '声音未知' }[current.access] : mappedId ? '已映射' : '未映射';
    tag.title = 'Voice ID: ' + (mappedId || '无') + '\n' + voiceText;
    let libraryText = ElevenApiKeys.queryDiagnostic(state.voiceLibraries.get(key), 'library', key);
    const priority = getAllocationPriorities().get(key);
    if (!libraryText && priority?.rank === 1) libraryText = priority.known ?
      '声音库未确认：列表中没有本工具支持的系统或自定义声音，暂时无法判断分布。' :
      '声音库未确认：同账号的其他 Key 尚未完整汇总，无法确认是否仅含系统声音。';
    row.querySelector('.library-diagnostic').textContent = libraryText;
  }
  function refreshQueryDetails() {
    const routes = getVoiceRoutes();
    for (const row of ui.keyList.querySelectorAll('.key-item[data-key]')) {
      const key = row.dataset.key;
      applyVoiceQueryDetails(row, key, routes.get(key));
      row.querySelector('.allocation-diagnostic').textContent = allocationDiagnostic(getAllocationPriorities().get(key), state.quotaListCache[key]);
      const quota = state.quotaListCache[key];
      if (ElevenVoiceIndex.freshQuota(quota)) applyQuotaToTag(key, row.querySelector('.quota-tag'), false, row.querySelector('.reset-tag'), quota);
    }
  }
  async function retryAccountQuery(key, topic) {
    if (state.batchRunning || state.keyMaintenance) return;
    setKeyMaintenance(true);
    try {
      if (topic === 'quota') await getQuotaInfo(key, true);
      else {
        try { await getVoiceLibrary(key, true); } catch { /* Keep the query failure and previous catalog visible. */ }
        ensureVoiceFamilies();
        const voice = getVoiceRoutes().get(key);
        if (voice) await getVoiceAccess(key, voice, true);
      }
      await saveQuotaSnapshot();
      renderPoolControls();
      setStatus(topic === 'quota' ? ElevenApiKeys.queryDiagnostic(state.quotaListCache[key], 'quota', key).split('\n')[0] || '该账号额度查询成功' : '该账号声音查询完成，结果已更新');
    } catch (error) { setStatus('查询或缓存保存失败，账号与原声音数据已保留', 'error'); }
    finally { setKeyMaintenance(false); refreshQueryDetails(); }
  }

  function generationDiagnostic(record) {
    if (!record) return '';
    const labels = { key: '生成权限/密钥不可用', voice: '此声音不可生成', model: '此模型不可生成', route: '此声音/模型组合不可生成', format: '此输出格式套餐不支持（' + record.format + '）', quota: '生成额度受限', rate: '生成限流，暂避', uncertain: '生成结果待确认，暂避' };
    return [labels[record.scope], record.httpStatus ? 'HTTP ' + record.httpStatus : '', record.code, record.message].filter(Boolean).join(' · ');
  }

  function renderGenerationSkips() {
    const keys = new Set(getPoolKeys().map(item => item.key));
    const count = new Set(state.generationSkips.values().filter(record => keys.has(record.key)).map(record => record.key)).size;
    ui.generationSkipCount.textContent = `已标记 ${count} 个 API`;
    ui.resetGenerationSkipsBtn.disabled = state.batchRunning || state.keyMaintenance || count === 0;
    const routes = getVoiceRoutes();
    for (const row of ui.keyList.querySelectorAll('.key-item[data-key]')) {
      const record = state.generationSkips.limits(row.dataset.key, routes.get(row.dataset.key), ui.model.value, selectedOutputFormat()).record;
      row.querySelector('.generation-diagnostic').textContent = generationDiagnostic(record);
    }
  }

  ui.resetGenerationSkipsBtn.addEventListener('click', async () => {
    if (state.batchRunning || state.keyMaintenance) return;
    if (!confirm('清除生成跳过标记？账号、额度、声音和文案都会保留。请先修好权限或声音/模型访问，下一次生成再尝试。待确认文案不会自动重发。')) return;
    setKeyMaintenance(true);
    clearTimeout(quotaSaveTimer);
    try {
      await quotaSavePromise.catch(() => {});
      clearTimeout(quotaSaveTimer);
      await writeLocal({ generation_skip_cache: [] });
      state.generationSkips = new ElevenApiPool.GenerationSkips();
      ui.generationSkipStatus.textContent = '已清除生成跳过标记';
      renderVoicePoolSummary();
    } catch {
      ui.generationSkipStatus.textContent = '保存失败，原跳过标记和账号完整保留';
    } finally {
      setKeyMaintenance(false);
      scheduleQuotaSave();
    }
  });

  ui.cleanupKeysBtn.addEventListener('click', async () => {
    if (state.batchRunning || state.keyMaintenance) return;
    const options = { removeMissingUserRead: ui.cleanupUserRead.checked };
    setKeyMaintenance(true);
    ui.keyCleanupStatus.textContent = '正在核验 API...';
    try {
      const before = await readLocal(['saved_key_list', 'xi_key']);
      const original = normalizeKeyItems(before.saved_key_list || [], false);
      const current = normalizeApiKey(before.xi_key) || state.currentKey;
      const items = original.length ? original : current ? [{ key: current, alias: '当前账号' }] : [];
      const unique = normalizeKeyItems(items);
      await Promise.all(unique.map(async item => { await getQuotaInfo(item.key); schedulePoolRender(); }));
      const first = ElevenApiKeys.planCleanup(items, state.quotaListCache, Date.now(), options);
      await Promise.all([...first.invalidKeys, ...first.permissionKeys].map(key => getQuotaInfo(key, true)));
      const plan = ElevenApiKeys.planCleanup(items, state.quotaListCache, Date.now(), options);
      if (!plan.removed) {
        ui.keyCleanupStatus.textContent = options.removeMissingUserRead ?
          '没有已确认无效、重复或明确缺少 user_read 的 API；其他未知账号保留。' :
          '没有已确认无效或重复的 API；未勾选权限清理，权限、访问限制和查询失败的账号均保留。';
        return;
      }
      const permissionCount = plan.permissionKeys.length ? `、${plan.permissionKeys.length} 个缺少 user_read 的 API` : '';
      if (!confirm(`清理 ${plan.invalidKeys.length} 个无效 API、${plan.duplicateKeys.length} 条重复记录${permissionCount}，保留 ${plan.kept.length} 个。\n仅从本地账号池移除，不会注销或撤销官方 Key。将保留撤销备份；开启权限后可重新导入。确认清理？`)) {
        ui.keyCleanupStatus.textContent = '已取消清理。'; return;
      }
      const latest = await readLocal(['saved_key_list', 'xi_key']);
      // Do not overwrite edits made from another extension window during the scan.
      if (JSON.stringify(latest.saved_key_list || []) !== JSON.stringify(before.saved_key_list || [])) throw new Error('账号列表已改变，请重新清理。');
      const selected = normalizeApiKey(latest.xi_key) || current;
      const next = plan.kept.some(item => item.key === selected) ? selected :
        (plan.kept.find(item => !state.quotaListCache[item.key]?.disabled) || plan.kept[0])?.key || '';
      const backup = { keys: items, currentKey: current, created_at: new Date().toISOString(), removed: plan.removed,
        missing_user_read: plan.permissionKeys.length };
      await writeLocal({ api_cleanup_backup: backup, saved_key_list: plan.kept, xi_key: next });
      state.cleanupBackup = backup;
      const kept = new Set(plan.kept.map(item => item.key));
      for (const key of [...plan.invalidKeys, ...plan.permissionKeys]) if (!kept.has(key)) delete state.quotaListCache[key];
      scheduleQuotaSave();
      applyAccountList(plan.kept, next);
      const permissionsRemoved = plan.permissionKeys.length ? `、缺少 user_read ${plan.permissionKeys.length} 个` : '';
      ui.keyCleanupStatus.textContent = `已清理无效 ${plan.invalidKeys.length} 个、重复 ${plan.duplicateKeys.length} 条${permissionsRemoved}，剩余 ${plan.kept.length} 个 API。`;
    } catch (error) { ui.keyCleanupStatus.textContent = '清理未完成：' + error.message; }
    finally { setKeyMaintenance(false); renderPoolControls(); }
  });

  ui.undoKeyCleanupBtn.addEventListener('click', async () => {
    if (state.batchRunning || state.keyMaintenance) return;
    setKeyMaintenance(true);
    try {
      const latest = await readLocal(['api_cleanup_backup', 'saved_key_list', 'xi_key']);
      const backup = latest.api_cleanup_backup;
      if (!backup || !Array.isArray(backup.keys) || backup.restored_at) return;
      if (!confirm('撤销上次清理，恢复移除的账号并保留之后新增的账号？')) return;
      const fresh = await readLocal(['saved_key_list', 'xi_key', 'api_cleanup_backup']);
      if (JSON.stringify(fresh.api_cleanup_backup) !== JSON.stringify(backup)) throw new Error('清理备份已改变，请重新撤销。');
      const keys = normalizeKeyItems([...(fresh.saved_key_list || []), ...backup.keys]);
      const current = normalizeApiKey(fresh.xi_key) || normalizeApiKey(backup.currentKey) || keys[0]?.key || '';
      const restored = { ...backup, restored_at: new Date().toISOString() };
      await writeLocal({ saved_key_list: keys, xi_key: current, api_cleanup_backup: restored });
      state.cleanupBackup = restored;
      applyAccountList(keys, current);
      schedulePoolScan();
      ui.keyCleanupStatus.textContent = `已撤销清理，现有 ${keys.length} 个 API。`;
    } catch (error) { ui.keyCleanupStatus.textContent = '撤销未完成：' + error.message; }
    finally { setKeyMaintenance(false); }
  });

  function handleQuickKey() {
    if (state.keyMaintenance || state.batchRunning) return;
    const key = normalizeApiKey(ui.quickKeyInput.value);
    if (!key) return showError('未识别到 API Key。可以直接粘贴完整 Key，也可以粘贴 xi-api-key: xxx 或 ELEVENLABS_API_KEY=xxx。');
    if (state.keys.some(k => k.key === key)) {
      setStatus('Key 已存在');
      switchKey(key);
      ui.quickKeyInput.value = '';
      return;
    }
    const alias = '账号 ' + (state.keys.length + 1);
    state.keys.push({ alias, key });
    saveKeyList();
    switchKey(key);
    ui.quickKeyInput.value = '';
    setStatus('已添加: ' + alias);
  }

  if (ui.quickKeyBtn) ui.quickKeyBtn.addEventListener('click', handleQuickKey);
  if (ui.quickKeyInput) ui.quickKeyInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleQuickKey(); });
  ui.keySearch.addEventListener('input', () => { state.keyPage = 0; renderKeyList(); });
  ui.keyPrevPage.addEventListener('click', () => { state.keyPage--; renderKeyList(); });
  ui.keyNextPage.addEventListener('click', () => { state.keyPage++; renderKeyList(); });
  ui.refreshKeysBtn.addEventListener('click', async () => {
    ui.refreshKeysBtn.disabled = true;
    try { await scanPool(true); renderKeyList(); }
    finally { ui.refreshKeysBtn.disabled = state.batchRunning; }
  });

  function getFilteredKeys(query = '') {
    const search = query.trim().toLowerCase();
    return state.keys.map((item, idx) => ({ item, idx }))
      .filter(({ item }) => !search || `${item.alias} ${item.key.slice(-4)}`.toLowerCase().includes(search));
  }

  function renderKeyList() {
    if (!ui.keyList) return;
    syncKeyMaintenanceControls();
    const matches = getFilteredKeys(ui.keySearch.value);
    const pages = Math.max(1, Math.ceil(matches.length / KEY_PAGE_SIZE));
    state.keyPage = Math.max(0, Math.min(pages - 1, state.keyPage));
    ui.keyPageInfo.textContent = `${state.keyPage + 1} / ${pages}`;
    ui.keyListCount.textContent = `${matches.length.toLocaleString()} 个 API`;
    ui.keyPrevPage.disabled = state.keyPage === 0;
    ui.keyNextPage.disabled = state.keyPage >= pages - 1;
    ui.keyList.innerHTML = '';
    if (state.keys.length === 0) {
      ui.keyList.innerHTML = '<div class="empty-tip">暂无 Key</div>';
      return;
    }

    const visibleItems = matches.slice(state.keyPage * KEY_PAGE_SIZE, (state.keyPage + 1) * KEY_PAGE_SIZE);
    const selectedRoutes = getVoiceRoutes();
    const priorities = getAllocationPriorities();
    if (visibleItems.length === 0) {
      ui.keyList.innerHTML = '<div class="empty-tip">没有匹配的 API</div>';
      return;
    }

    visibleItems.forEach(({ item, idx }) => {
      const div = document.createElement('div');
      const isActive = item.key === state.currentKey;
      div.className = 'key-item ' + (isActive ? 'active' : '');
      div.dataset.key = item.key;
      div.innerHTML =
        '<div class="key-main-info">' +
          '<div class="key-header">' +
            '<span class="key-alias" title="修改">' + escapeHtml(item.alias) + '</span>' +
            '<span class="key-edit">✎</span>' +
            (isActive ? '<span class="current-badge">查询账号</span>' : '') +
            '<span class="quota-tag loading" id="quota-tag-' + idx + '">...</span>' +
            '<span class="reset-tag" id="reset-tag-' + idx + '"></span>' +
            '<span class="voice-access-tag"></span>' +
          '</div>' +
          '<div class="key-code">•••• ' + escapeHtml(item.key.slice(-4)) + '</div>' +
          '<div class="quota-diagnostic"></div>' +
          '<div class="generation-diagnostic"></div>' +
          '<div class="allocation-diagnostic"></div>' +
          '<div class="voice-diagnostic"></div>' +
          '<div class="library-diagnostic"></div>' +
        '</div>' +
        '<div class="key-actions">' +
          '<div class="key-del" title="删除">🗑️</div>' +
        '</div>';

      const aliasSpan = div.querySelector('.key-alias');
      const editBtn = div.querySelector('.key-edit');
      const voice = selectedVoiceId();
      const mappedId = selectedRoutes.get(item.key);
      div.querySelector('.generation-diagnostic').textContent = generationDiagnostic(state.generationSkips.limits(item.key, mappedId, ui.model.value, selectedOutputFormat()).record);
      div.querySelector('.allocation-diagnostic').textContent = allocationDiagnostic(priorities.get(item.key), state.quotaListCache[item.key]);
      const voiceInfo = mappedId && getVoiceCache(item.key, mappedId);
      const voiceTag = div.querySelector('.voice-access-tag');
      voiceTag.textContent = voiceInfo ? { available: '有此声音', unavailable: '无此声音', unknown: '声音未知' }[voiceInfo.access] : mappedId ? '已映射' : '未映射';
      voiceTag.title = 'Voice ID: ' + (mappedId || '无') + (voiceInfo?.message ? '\n' + voiceInfo.message : '');
      applyVoiceQueryDetails(div, item.key, mappedId);
      for (const topic of ['quota', 'voice']) {
        const button = document.createElement('button');
        button.type = 'button'; button.className = 'icon-btn-small query-retry-btn'; button.dataset.topic = topic;
        button.innerHTML = topic === 'quota' ? '&#8635;' : '&#9835;';
        button.title = topic === 'quota' ? '重新查询此账号额度' : '重新查询此账号声音库与当前声音';
        button.setAttribute('aria-label', item.alias + ' ' + button.title);
        button.disabled = state.batchRunning || state.keyMaintenance;
        button.addEventListener('click', async event => { event.stopPropagation(); await retryAccountQuery(item.key, topic); });
        div.querySelector('.key-actions').appendChild(button);
      }
      const family = !ui.customVoiceId.value.trim() && state.voiceFamilies.get(voice);
      const choices = family && family.byKey.get(item.key);
      if (choices && choices.length) {
        const selector = document.createElement('select');
        selector.className = 'voice-route-select'; selector.title = '当前声音在此账号的 Voice ID';
        selector.setAttribute('aria-label', item.alias + ' 声音 ID');
        for (const choice of choices) {
          const option = document.createElement('option'); option.value = choice.voice_id; option.textContent = choice.voice_id; selector.appendChild(option);
        }
        selector.value = mappedId; selector.disabled = state.batchRunning || state.keyMaintenance;
        selector.addEventListener('change', async () => {
          if (state.batchRunning || state.keyMaintenance) return;
          const next = { ...state.voiceOverrides, [family.id]: { ...state.voiceOverrides[family.id], [item.key]: selector.value } };
          try { await writeLocal({ voice_route_overrides: next }); state.voiceOverrides = next; renderPoolControls(); renderKeyList(); }
          catch { selector.value = mappedId; showError('声音映射保存失败，原映射已保留。'); }
        });
        div.querySelector('.key-main-info').appendChild(selector);
      }

      div.addEventListener('click', (e) => {
        if (!e.target.closest('.key-del') && !e.target.closest('.key-edit') && !e.target.closest('input') && !e.target.closest('select')) {
          switchKey(item.key);
        }
      });

      const startEditing = (e) => {
        e.stopPropagation();
        if (state.keyMaintenance || state.batchRunning) return;
        const input = document.createElement('input');
        input.type = 'text'; input.value = item.alias; input.className = 'alias-input';
        aliasSpan.replaceWith(input);
        input.focus();

        const save = () => {
          const val = input.value.trim();
          if (val && val !== item.alias) {
            state.keys[idx].alias = val;
            saveKeyList();
            updateAccountStatus();
          }
          renderKeyList();
        };
        input.addEventListener('blur', save);
        input.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') save(); });
        input.addEventListener('click', (ev) => ev.stopPropagation());
      };

      editBtn.addEventListener('click', startEditing);

      div.querySelector('.key-del').addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.keyMaintenance || state.batchRunning) return;
        if (confirm('删除 ' + item.alias + '?')) {
          state.keys.splice(idx, 1);
          saveKeyList();
          if (item.key === state.currentKey) {
            state.currentKey = state.keys.length ? state.keys[0].key : '';
            chrome.storage.local.set({ xi_key: state.currentKey });
            if (state.currentKey) { loadVoices(state.currentKey); fetchModels(state.currentKey); }
            updateAccountStatus();
          }
          renderPoolControls(); updateStats();
          renderKeyList();
        }
      });

      ui.keyList.appendChild(div);
      const quotaTag = document.getElementById('quota-tag-' + idx);
      queueQuotaCheck(item.key, quotaTag, false, document.getElementById('reset-tag-' + idx));
    });
  }

  function switchKey(key) {
    if (state.batchRunning || state.keyMaintenance) return;
    const normalizedKey = normalizeApiKey(key);
    if (!normalizedKey) return showError('未识别到可用的 ElevenLabs API Key。');
    state.currentKey = normalizedKey;
    renderPoolControls();
    state.currentQuota = 0;
    chrome.storage.local.set({ 'xi_key': normalizedKey });
    updateAccountStatus();
    fetchModels(normalizedKey);
    loadVoices(normalizedKey);
    fetchQuota(normalizedKey);
    if (ui.settingsModal) ui.settingsModal.classList.add('hidden');
    setStatus('✅ 已切换');
  }

  function updateAccountStatus() {
    if (!state.currentKey) {
      ui.aliasDisplay.textContent = '查询账号：未配置';
      renderPoolControls();
      return;
    }
    const item = state.keys.find(k => k.key === state.currentKey);
    ui.aliasDisplay.textContent = `查询账号：${item ? item.alias : '当前账号'}`;
    ui.aliasDisplay.title = item ? item.alias : '当前账号';
    renderPoolControls();
  }

  // ==========================================
  // 9. 导入导出与其他功能
  // ==========================================
  // 导出 CSV
  if (ui.exportCsvBtn) {
    ui.exportCsvBtn.addEventListener('click', () => {
      if (state.keys.length === 0) return alert('无数据');
      let c = "\uFEFF备注名,API_Key\n";
      state.keys.forEach(k => {
        const a = '"' + String(k.alias).replace(/"/g, '""') + '"';
        const key = '"' + String(k.key).replace(/"/g, '""') + '"';
        c += a + ',' + key + '\n';
      });
      const b = new Blob([c], { type: 'text/csv;charset=utf-8;' });
      chrome.downloads.download({ url: URL.createObjectURL(b), filename: `ElevenLabs_Keys.csv`, saveAs: true });
    });
  }
  
  // 快速下拉菜单
  if (ui.accountCard) {
    ui.accountCard.addEventListener('click', (e) => {
      e.stopPropagation();
      ui.accountDropdown.classList.toggle('hidden');
      if (!ui.accountDropdown.classList.contains('hidden')) renderQuickDropdown();
    });
  }
  if (ui.accountDropdown) ui.accountDropdown.addEventListener('click', (e) => e.stopPropagation());
  document.addEventListener('click', () => ui.accountDropdown.classList.add('hidden'));

  function renderQuickDropdown() {
    ui.accountDropdown.innerHTML = '';
    if (state.keys.length === 0) {
      ui.accountDropdown.innerHTML = '<div style="padding:10px;font-size:12px;color:#888;">暂无账号</div>';
      return;
    }

    const search = document.createElement('input');
    search.type = 'search'; search.className = 'quick-api-search'; search.placeholder = '搜索查询账号';
    search.setAttribute('aria-label', '搜索查询账号');
    ui.accountDropdown.appendChild(search);
    const results = document.createElement('div');
    ui.accountDropdown.appendChild(results);
    const render = () => {
      const matches = getFilteredKeys(search.value);
      results.innerHTML = '';
      matches.slice(0, KEY_PAGE_SIZE).forEach(({ item, idx }) => {
      const div = document.createElement('div');
      div.className = 'dropdown-item ' + (item.key === state.currentKey ? 'active' : '');
      div.innerHTML = '<span class="dd-name">' + escapeHtml(item.alias) + '</span><span class="dd-quota" id="dd-quota-' + idx + '">...</span>';
      div.addEventListener('click', () => {
        switchKey(item.key);
        ui.accountDropdown.classList.add('hidden');
      });
      results.appendChild(div);
      const quotaTag = document.getElementById('dd-quota-' + idx);
      queueQuotaCheck(item.key, quotaTag, true);
      });
      const count = document.createElement('div');
      count.className = 'dropdown-result-count';
      count.textContent = `${Math.min(KEY_PAGE_SIZE, matches.length)} / ${matches.length} 个 API`;
      results.appendChild(count);
    };
    search.addEventListener('input', render);
    render();
  }

  // 打开文件夹
  if (ui.openFolder) {
    ui.openFolder.addEventListener('click', () => {
      const sub = state.folder.replace(/[\\:*?"<>|]/g, "_") || "ElevenLabs_Pro";
      chrome.downloads.search({ limit: 10, orderBy: ['-startTime'] }, (items) => {
        let f = false;
        for (let i of items) if (i.exists && i.filename.includes(sub)) { chrome.downloads.show(i.id); f = true; break; }
        if (!f) chrome.downloads.showDefaultFolder();
      });
    });
  }

  // 配置文件导出导入
  if (ui.exportBtn) ui.exportBtn.addEventListener('click', () => { chrome.storage.local.get(null, (i) => { const b = new Blob([JSON.stringify(i, null, 2)], { type: 'application/json' }); chrome.downloads.download({ url: URL.createObjectURL(b), filename: `Config.json`, saveAs: true }); }); });
  if (ui.importBtn) ui.importBtn.addEventListener('click', () => { if (!state.keyMaintenance && !state.batchRunning) ui.fileInput.click(); });
  if (ui.fileInput) ui.fileInput.addEventListener('change', (e) => { const f = e.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = (ev) => { if (state.keyMaintenance || state.batchRunning) return showError('请等待账号操作结束后再恢复。'); try { chrome.storage.local.clear(() => chrome.storage.local.set(JSON.parse(ev.target.result), () => { alert('恢复成功'); init(); renderKeyList(); })); } catch (err) { alert('错误'); } }; r.readAsText(f); e.target.value = ''; });

  // Key 添加
  if (ui.addKeyBtn) ui.addKeyBtn.addEventListener('click', () => {
    if (state.keyMaintenance || state.batchRunning) return;
    const alias = ui.newAlias.value.trim() || '账号 ' + (state.keys.length + 1);
    const key = normalizeApiKey(ui.newKey.value);
    if (!key) return showError('未识别到 API Key。可以直接粘贴完整 Key，也可以粘贴 xi-api-key: xxx 或 ELEVENLABS_API_KEY=xxx。');
    if (state.keys.some(k => k.key === key)) {
      setStatus('Key 已存在');
      switchKey(key);
      return;
    }
    const shouldSwitch = state.keys.length === 0;
    state.keys.push({ alias, key });
    saveKeyList();
    if (shouldSwitch) switchKey(key);
    ui.newAlias.value = '';
    ui.newKey.value = '';
    renderKeyList();
    setStatus(`已添加: ${alias}`);
  });
  
  // 批量导入 Key
  if (ui.importKeysBtn) ui.importKeysBtn.addEventListener('click', () => ui.keyFileInput.click());
  if (ui.keyFileInput) ui.keyFileInput.addEventListener('change', async (e) => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const t = await f.text();
      if (state.keyMaintenance || state.batchRunning) return showError('请等待账号操作结束后再导入。');
      const lines = t.split(/\r\n|\n/).filter(line => line.trim());
      let importedItems;
      if (f.name.toLowerCase().endsWith('.json')) {
        const data = JSON.parse(t.replace(/^\uFEFF/, ''));
        const items = Array.isArray(data) ? data : data.saved_key_list || data.keys || [data];
        importedItems = normalizeKeyItems(items.map(item => typeof item === 'string' ? item : {
          key: item.key || item.apiKey || item.api_key || item['xi-api-key'], alias: item.alias || item.name
        }));
      } else importedItems = lines.map((line, index) => parseImportedKeyLine(line.trim(), '账号 ' + (state.keys.length + index + 1)));
      let added = 0;
      let updated = 0;
      let skipped = 0;
      importedItems.forEach((item) => {
        if (!item) {
          skipped++;
          return;
        }
        const existing = state.keys.find(x => x.key === item.key);
        if (existing) {
          existing.alias = item.alias || existing.alias;
          updated++;
          return;
        }
        state.keys.push(item);
        added++;
      });
      if (added > 0 || updated > 0) {
        saveKeyList();
        renderKeyList();
        if (!state.currentKey) switchKey(state.keys[0].key);
        alert('导入 ' + added + ' 个，更新 ' + updated + ' 个' + (skipped ? '，跳过 ' + skipped + ' 行' : ''));
      } else {
        alert('无新 Key。支持纯 Key、xi-api-key: xxx、ELEVENLABS_API_KEY=xxx、CSV。');
      }
    } catch (err) { alert('导入失败'); } e.target.value = '';
  });

  // UI 参数变动监听
  if (ui.model) ui.model.addEventListener('change', () => { chrome.storage.local.set({ 'xi_model': ui.model.value }); updateModelUI(); renderVoicePoolSummary(); renderGenerationSkips(); updateStats(); });
  ui.refreshModels.addEventListener('click', () => {
    if (!state.currentKey) return showError('请先配置 API Key。');
    fetchModels(state.currentKey, null, true);
  });
  function updateModelUI() {
    const controls = modelControls(ui.model.value);
    ui.v3Area.style.display = controls.v3 ? 'block' : 'none';
    ui.stabilityArea.style.display = controls.v3 ? 'none' : 'block';
    ui.similarityArea.style.display = controls.similarity ? 'block' : 'none';
    ui.speedArea.style.display = controls.speed ? 'block' : 'none';
    ui.v2Area.style.display = controls.style || controls.boost ? 'block' : 'none';
    ui.styleArea.style.display = controls.style ? 'block' : 'none';
    ui.boostArea.style.display = controls.boost ? 'flex' : 'none';
    updateStats();
  }

  function modelControls(modelId) {
    const model = state.modelList.find(item => item.model_id === modelId) || {};
    if (modelId === 'eleven_v3') return { v3: true };
    if (['eleven_v4', 'eleven_v4_turbo'].includes(modelId)) return { similarity: true };
    const v2 = ['eleven_multilingual_v2', 'eleven_flash_v2', 'eleven_flash_v2_5', 'eleven_turbo_v2', 'eleven_turbo_v2_5'].includes(modelId);
    const multilingualV2 = modelId === 'eleven_multilingual_v2';
    return { similarity: v2, speed: v2,
      style: typeof model.can_use_style === 'boolean' ? model.can_use_style : multilingualV2,
      boost: typeof model.can_use_speaker_boost === 'boolean' ? model.can_use_speaker_boost : multilingualV2 };
  }

  function normalizeV3Stability(value) {
    return value != null && value !== '' && [0, 0.5, 1].includes(Number(value)) ? Number(value) : 0.5;
  }

  function readVoiceSettings(modelId) {
    const controls = modelControls(modelId);
    const settings = { stability: controls.v3 ? normalizeV3Stability(ui.v3Stab.value) : Number(ui.stab.value) };
    if (controls.similarity) settings.similarity_boost = Number(ui.sim.value);
    if (controls.speed) settings.speed = Number(ui.speed.value);
    if (controls.style) settings.style = Number(ui.style.value);
    if (controls.boost) settings.use_speaker_boost = ui.boost.checked;
    return settings;
  }

  function currentSpeechSpeed() {
    return modelControls(ui.model.value).speed ? (Number(ui.speed.value) || 1) : 1;
  }
  
  if (ui.stab) ui.stab.addEventListener('input', (e) => updateVal('stab', e.target.value));
  if (ui.sim) ui.sim.addEventListener('input', (e) => updateVal('sim', e.target.value));
  if (ui.style) ui.style.addEventListener('input', (e) => updateVal('style', e.target.value));
  ui.speed.addEventListener('input', (e) => updateVal('speed', e.target.value));
  ui.v3Stab.addEventListener('change', () => { chrome.storage.local.set({ xi_v3_stability: normalizeV3Stability(ui.v3Stab.value) }); updateStats(); });
  if (ui.boost) ui.boost.addEventListener('change', (e) => { chrome.storage.local.set({ 'xi_boost': e.target.checked }); updateStats(); });
  if (ui.voice) ui.voice.addEventListener('change', (e) => {
    preferredVoice = e.target.value;
    const family = state.voiceFamilies.get(e.target.value);
    chrome.storage.local.set({ xi_voice_family: family ? family.id : '', xi_voice: family ? [...family.voiceIds][0] : e.target.value });
    renderVoicePoolSummary();
    if (!ui.settingsModal.classList.contains('hidden')) renderKeyList();
    updateStats();
  });

  function updateVal(type, val) {
    const d = parseFloat(val).toFixed(2);
    if (type === 'stab') { ui.stab.value = val; ui.valStab.textContent = d; chrome.storage.local.set({ 'xi_stab': val }); }
    if (type === 'sim') { ui.sim.value = val; ui.valSim.textContent = d; chrome.storage.local.set({ 'xi_sim': val }); }
    if (type === 'style') { ui.style.value = val; ui.valStyle.textContent = d; chrome.storage.local.set({ 'xi_style': val }); }
    if (type === 'speed') {
      const number = Number(val);
      const speed = Number.isFinite(number) ? Math.max(0.7, Math.min(1.2, number)) : 1;
      ui.speed.value = speed; ui.valSpeed.textContent = speed.toFixed(2) + 'x'; chrome.storage.local.set({ xi_speed: speed });
    }
    updateStats();
  }

  if (ui.refresh) ui.refresh.addEventListener('click', () => scanVoiceLibraries(true));

  // ==========================================
  // 10. 卡片、智能时长与首句试听逻辑
  // ==========================================
  function buildPreviewSignature(firstSentence) {
    if (!firstSentence) return '';
    const voice = selectedVoiceId();
    const model = ui.model.value;
    return JSON.stringify({
      text: firstSentence,
      voice,
      customVoice: ui.customVoiceId.value.trim(),
      overrides: state.voiceOverrides[voice] || null,
      model,
      apiFormat: selectedOutputFormat(),
      voiceSettings: readVoiceSettings(model)
    });
  }

  function stopActivePreview() {
    if (!activePreview) return;
    const current = activePreview;
    activePreview = null;
    if (current.timer) clearTimeout(current.timer);
    if (current.audio) {
      current.audio.onended = null;
      current.audio.onerror = null;
      try { current.audio.pause(); } catch (e) {}
    }
    if (current.url) URL.revokeObjectURL(current.url);
    if (current.card && current.card.isConnected) {
      const btn = current.card.querySelector('.task-preview');
      if (btn) {
        btn.classList.remove('playing');
        btn.textContent = '🔊 试听首句';
      }
      updateCardMeta(current.card);
    }
  }

  async function playPreviewBlob(card, blob, firstSentence, accountAlias = '', fromCache = false) {
    stopActivePreview();
    const btn = card.querySelector('.task-preview');
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    const session = { card, audio, url, timer: null };
    activePreview = session;
    if (btn) {
      btn.disabled = false;
      btn.classList.add('playing');
      btn.textContent = '⏹️ 停止';
      btn.title = `正在试听第一句：${firstSentence}\n点击停止播放`;
    }
    const tag = fromCache ? '缓存免扣费' : accountAlias || '当前账号';
    setStatus(`🔊 正在试听首句 (${tag})：${firstSentence}`);

    const finish = () => {
      if (activePreview !== session) return;
      stopActivePreview();
      if (!state.batchRunning) setStatus('试听完毕');
    };
    const scheduleFallbackFinish = () => {
      if (activePreview !== session || session.timer) return;
      const fallbackMs = Math.min(2500, Math.max(600, ElevenApiPool.estimateDuration(firstSentence, { speed: currentSpeechSpeed() }).seconds * 350));
      session.timer = setTimeout(finish, fallbackMs);
    };
    audio.onended = finish;
    audio.onerror = scheduleFallbackFinish;
    try {
      await audio.play();
    } catch (err) {
      scheduleFallbackFinish();
    }
  }

  async function previewCardFirstSentence(card) {
    if (activePreview && activePreview.card === card) {
      stopActivePreview();
      setStatus('已停止试听');
      return;
    }
    if (state.batchRunning || state.keyMaintenance || previewRunning) return;
    stopActivePreview();
    const rawText = card.querySelector('textarea').value.trim();
    const firstSentence = ElevenApiPool.extractFirstSentence(rawText);
    if (!firstSentence) return showError('请先输入文案后再试听第一句。');
    if (!getPoolKeys().length) return showError('请在设置中导入 API Key。');
    const voice = selectedVoiceId();
    const routes = getVoiceRoutes(voice);
    if (!routes.size) return showError('请选择已汇总的声音，或输入有效 Voice ID。');

    const modelId = ui.model.value;
    const model = state.modelList.find(item => item.model_id === modelId);
    const limit = model && model.maximum_text_length_per_request;
    if (limit && Array.from(firstSentence).length > limit) {
      return showError(`首句超过模型单次 ${limit} 字符上限，请添加标点分句后再试听。`);
    }

    const signature = buildPreviewSignature(firstSentence);
    if (card.previewCache && card.previewCache.key === signature && card.previewCache.blob) {
      await playPreviewBlob(card, card.previewCache.blob, firstSentence, card.previewCache.account, true);
      return;
    }

    const btn = card.querySelector('.task-preview');
    previewRunning = true;
    if (btn) {
      btn.disabled = true;
      btn.textContent = '⏳ 合成中';
    }
    updateStats();
    const cfg = {
      voice,
      model: modelId,
      apiFormat: selectedOutputFormat(),
      voiceSettings: readVoiceSettings(modelId)
    };
    let previewResult = null;
    let previewEntry = null;
    let failMessage = '';

    try {
      setStatus(`🎧 正在合成首句试听：${firstSentence}`);
      const priorities = getAllocationPriorities();
      const pool = new ElevenApiPool.Pool(getPoolKeys().filter(item => routes.has(item.key) && getVoiceCache(item.key, routes.get(item.key))?.access !== 'unavailable').map(item => {
        const info = state.quotaListCache[item.key] || {};
        const fresh = ElevenVoiceIndex.freshQuota(info);
        const limits = state.generationSkips.limits(item.key, routes.get(item.key), cfg.model, cfg.apiFormat);
        const priority = priorities.get(item.key);
        return {
          ...item,
          voiceId: routes.get(item.key),
          remaining: fresh ? info.left : null,
          accountId: info.accountId,
          disabled: Boolean(fresh && info.disabled) || limits.disabled || priority.blocked,
          ceiling: limits.ceiling,
          readyAt: limits.readyAt,
          priorityRank: priority.rank,
          priorityCoverage: priority.coverage,
          priorityReserved: priority.reserved,
          skipReason: priority.blocked ? '当前策略保留自定义声音额度，系统声音只使用系统专用账号。' : limits.disabled ? generationDiagnostic(limits.record) : ''
        };
      }));

      await ElevenApiPool.run([{ id: card.taskData.id + ':preview', text: firstSentence }], pool, {
        concurrency: 1,
        stopped: () => state.batchRunning,
        estimate: text => ElevenApiPool.estimateCost(text, model),
        generate: async (job, entry) => {
          if (!ElevenVoiceIndex.freshQuota(state.quotaListCache[entry.key])) {
            const info = await getQuotaInfo(entry.key);
            if (info.disabled) throw Object.assign(new Error(info.message || 'API 不可用'), {
              preflight: true, status: info.httpStatus || (info.invalid ? 401 : 403), code: info.errorCode || (info.invalid ? 'invalid_api_key' : 'workspace_access_denied')
            });
            if (Number.isFinite(info.left)) {
              entry.account.remaining = info.left;
              if (info.left < ElevenApiPool.estimateCost(job.text, model)) throw Object.assign(new Error('当前账号额度不足'), { preflight: true, status: 401, code: 'quota_exceeded' });
            }
          }
          const result = await generate(job.text, { ...cfg, voice: entry.voiceId, key: entry.key });
          state.voiceAccessCache.set(voiceCacheKey(entry.key, entry.voiceId), { key: entry.key, voice: entry.voiceId, access: 'available', ts: Date.now() });
          return result;
        },
        download: async (job, result, entry) => {
          previewResult = result;
          previewEntry = entry;
        },
        onStatus: (job, status, entry, message) => {
          if (['failed', 'uncertain'].includes(status)) failMessage = message;
        },
        onSkip: (entry, error, kind, cost) => {
          const affected = ['rate', 'uncertain'].includes(kind) && entry.accountId ?
            getPoolKeys().filter(item => item.key === entry.key || state.quotaListCache[item.key]?.accountId === entry.accountId) : [entry];
          for (const item of affected) state.generationSkips.mark(error, { key: item.key, voice: routes.get(item.key), model: cfg.model, format: cfg.apiFormat, cost });
          scheduleQuotaSave();
          renderGenerationSkips();
        },
        onQuota: (poolInstance, changedEntry) => {
          for (const entry of poolInstance.entries) {
            if (entry.account !== changedEntry.account) continue;
            const info = state.quotaListCache[entry.key];
            if (info) { info.left = entry.account.remaining; info.ts = Date.now(); }
            if (entry.key === state.currentKey && Number.isFinite(entry.account.remaining)) { state.currentQuota = entry.account.remaining; updateStatsUI(state.currentQuota); }
          }
          scheduleQuotaSave();
          renderPoolControls();
        }
      });
    } catch (error) {
      failMessage = error.message || '试听请求失败';
    } finally {
      previewRunning = false;
      if (btn && (!activePreview || activePreview.card !== card)) {
        btn.classList.remove('playing');
        btn.textContent = '🔊 试听首句';
      }
      await saveQuotaSnapshot().catch(() => {});
      renderPoolControls();
      updateStats();
    }

    if (previewResult && previewResult.blob && card.isConnected) {
      card.previewCache = { key: signature, blob: previewResult.blob, account: previewEntry ? previewEntry.alias : '', text: firstSentence };
      updateCardMeta(card);
      await playPreviewBlob(card, previewResult.blob, firstSentence, previewEntry ? previewEntry.alias : '', false);
    } else if (failMessage) {
      setStatus(`试听失败：${failMessage.split('\n')[0]}`, 'error');
      card.querySelector('.task-message').textContent = `试听失败：${failMessage}`;
    }
  }

  const SPLIT_REASON_LABELS = {
    paragraph: '段落换行处',
    transition: '转折句末处',
    sentence: '完整句末处',
    semicolon: '分号/停顿处',
    clause: '分句逗号处',
    space: '词语空格处',
    midpoint: '时长中点处'
  };

  function splitCardIntoTwo(card, persist = true) {
    if (!card || !card.isConnected || state.batchRunning) return false;
    const ta = card.querySelector('textarea');
    const raw = ta ? ta.value : '';
    const speed = currentSpeechSpeed();
    const res = ElevenApiPool.splitOverThreeMinutes(raw, { speed });
    if (!res.split || res.parts.length < 2) return false;
    if (activePreview && activePreview.card === card) stopActivePreview();
    ta.value = res.parts[0];
    card.taskData.account = '';
    card.taskData.index = 0;
    card.taskData.downloadId = null;
    card.audioResult = null;
    ElevenAudioStore.remove(card.taskData.id).catch(() => {});
    setTaskStatus(card, 'pending', null, '', false);
    updateCardMeta(card, speed);

    const secondCard = addCard(res.parts[1], false);
    ui.container.insertBefore(secondCard, card.nextSibling);
    if (persist) {
      refreshIndexes();
      saveCards();
      updateStats();
      const d1 = res.partDurations[0] ? res.partDurations[0].formatted : '';
      const d2 = res.partDurations[1] ? res.partDurations[1].formatted : '';
      const reasonLabel = SPLIT_REASON_LABELS[res.reason] || '合适语义边界';
      setStatus(`✂️ 已在「${reasonLabel}」智能分为 2 段（${d1} + ${d2}）`);
    }
    return true;
  }

  function splitAllOverThreeMinutesCards() {
    if (!ui.container || state.batchRunning) return 0;
    const cards = Array.from(ui.container.querySelectorAll('.card'));
    let splitCount = 0;
    for (const card of cards) {
      if (!['pending', 'failed'].includes(card.dataset.status)) continue;
      if (splitCardIntoTwo(card, false)) splitCount++;
    }
    if (splitCount > 0) {
      refreshIndexes();
      saveCards();
      updateStats();
    }
    return splitCount;
  }

  function updateCardMeta(card, speed = currentSpeechSpeed()) {
    const ta = card.querySelector('textarea');
    const raw = ta ? ta.value : '';
    const cc = card.querySelector('.char-c');
    if (cc) cc.textContent = `${raw.length} 字`;
    const est = ElevenApiPool.estimateDuration(raw, { speed });
    const firstSentence = ElevenApiPool.extractFirstSentence(raw);
    const splitInfo = est.seconds > 180 ? ElevenApiPool.splitOverThreeMinutes(raw, { speed }) : null;
    const canSplit = Boolean(splitInfo && splitInfo.split);
    const durEl = card.querySelector('.dur-c');
    if (durEl) {
      durEl.classList.toggle('over-limit', est.seconds > 180);
      durEl.textContent = est.seconds > 180 ? `${est.formatted} · 超3分` : est.formatted;
      const splitHint = canSplit && splitInfo.partDurations
        ? `\n⚠️ 超过 3 分钟，建议在「${SPLIT_REASON_LABELS[splitInfo.reason] || '语义边界'}」拆分为 2 份（${splitInfo.partDurations[0].formatted} + ${splitInfo.partDurations[1].formatted}）`
        : '';
      durEl.title = est.seconds > 0
        ? `预计时长：${est.formatted}（朗读 ${est.speechSeconds}秒 + 标点/短句停顿 ${est.pauseSeconds}秒 · 共 ${est.clauses} 个分句${est.shortClauses ? '，含 ' + est.shortClauses + ' 个短句' : ''} · 语速 ${speed.toFixed(2)}x）${splitHint}${firstSentence ? '\n首句：' + firstSentence : ''}`
        : '输入文案后自动根据标点与短句智能估算时长';
    }
    const splitBtn = card.querySelector('.task-split');
    if (splitBtn) {
      const showSplit = canSplit && ['pending', 'failed'].includes(card.dataset.status);
      splitBtn.classList.toggle('hidden', !showSplit);
      splitBtn.disabled = state.batchRunning || state.keyMaintenance || previewRunning;
      if (showSplit && splitInfo.partDurations) {
        const reasonLabel = SPLIT_REASON_LABELS[splitInfo.reason] || '语义边界';
        splitBtn.title = `预计时长超过 3 分钟，点击在「${reasonLabel}」智能分为 2 段（${splitInfo.partDurations[0].formatted} + ${splitInfo.partDurations[1].formatted}）`;
      }
    }
    const previewBtn = card.querySelector('.task-preview');
    if (previewBtn && (!activePreview || activePreview.card !== card)) {
      const signature = buildPreviewSignature(firstSentence);
      const isCached = Boolean(firstSentence && card.previewCache && card.previewCache.key === signature);
      if (!previewRunning) {
        previewBtn.textContent = '🔊 试听首句';
        previewBtn.classList.remove('playing');
      }
      previewBtn.disabled = state.batchRunning || state.keyMaintenance || previewRunning || !firstSentence || !getPoolKeys().length;
      previewBtn.title = firstSentence
        ? `试听第一句：${firstSentence}${isCached ? '\n（已缓存，点击直接免扣费播放）' : ''}`
        : '请先输入文案后再试听第一句';
    }
    return est;
  }

  function addCard(text = '', autoSave = true, savedJob = null) {
    if (!ui.container) return;
    const div = document.createElement('div');
    div.className = 'card';
    div.taskData = { id: savedJob && savedJob.id || crypto.randomUUID(), account: savedJob && savedJob.account || '',
      message: savedJob && savedJob.message || '', index: savedJob && savedJob.index || 0,
      downloadId: savedJob && savedJob.downloadId || null };
    const savedStatus = savedJob && savedJob.status || 'pending';
    div.dataset.status = ['running', 'waiting'].includes(savedStatus) ? 'uncertain' : savedStatus === 'downloading' ? 'download_failed' : savedStatus;
    div.innerHTML = `
      <textarea placeholder="输入文案..."></textarea>
      <div class="task-message"></div>
      <div class="card-footer">
        <div><span class="idx-tag">#${ui.container.children.length + 1}</span><span class="task-status"></span></div>
        <div class="right-tools">
          <span class="char-c">0 字</span>
          <span class="dur-c">0秒</span>
          <span class="divider-vertical">|</span>
          <button class="btn-outlined task-retry hidden">重试下载</button>
          <button type="button" class="tool-btn-icon task-split hidden" title="超过 3 分钟，智能拆分为 2 段">✂️ 分2段</button>
          <button type="button" class="tool-btn-icon task-preview" title="试听本段第一句">🔊 试听首句</button>
          <button class="tool-btn-icon" title="复制并去网页版生成" style="width:auto;padding:0 5px;font-size:11px;height:24px;">🌐 网页生成</button>
          <span class="del-btn">删除</span>
        </div>
      </div>
    `;
    
    const ta = div.querySelector('textarea');
    ta.value = text;
    updateCardMeta(div);
    
    ta.addEventListener('input', () => {
      if (state.batchRunning) return;
      if (activePreview && activePreview.card === div) stopActivePreview();
      updateCardMeta(div);
      div.taskData.account = ''; div.taskData.index = 0; div.taskData.downloadId = null; div.audioResult = null;
      ElevenAudioStore.remove(div.taskData.id).catch(() => {});
      setTaskStatus(div, 'pending');
    });
    div.querySelector('.del-btn').addEventListener('click', () => {
      if (state.batchRunning) return;
      if (activePreview && activePreview.card === div) stopActivePreview();
      ElevenAudioStore.remove(div.taskData.id).catch(() => {});
      div.remove(); refreshIndexes(); saveCards(); updateStats();
    });
    div.querySelector('.task-split').addEventListener('click', () => {
      splitCardIntoTwo(div, true);
    });
    div.querySelector('.task-preview').addEventListener('click', () => {
      previewCardFirstSentence(div);
    });
    div.querySelector('.task-retry').addEventListener('click', async () => {
      if (state.batchRunning) return;
      if (div.dataset.status === 'download_failed') {
        const result = div.audioResult || await ElevenAudioStore.get(div.taskData.id).catch(() => null);
        if (result) {
          const retryButton = div.querySelector('.task-retry');
          retryButton.disabled = true;
          try { await downloadAudio(div, result); div.audioResult = null; setTaskStatus(div, 'done'); await ElevenAudioStore.remove(div.taskData.id).catch(() => {}); }
          catch (error) { setTaskStatus(div, 'download_failed', null, error.message); }
          finally { retryButton.disabled = false; }
          return;
        }
        if (!confirm('未找到缓存音频。重新生成可能再次消耗额度，是否继续？')) return;
      } else if (!confirm('重新生成会再次消耗额度。请先确认生成历史，是否继续？')) return;
      div.taskData.account = ''; div.taskData.downloadId = null;
      setTaskStatus(div, 'pending');
    });

    const webBtn = div.querySelector('button[title="复制并去网页版生成"]');
    webBtn.addEventListener('click', () => {
      const content = ta.value.trim();
      if (!content) return alert('请先输入文案');
      navigator.clipboard.writeText(content).then(() => { chrome.tabs.create({ url: 'https://elevenlabs.io/app/speech-synthesis' }); });
    });

    // 🌟🌟🌟 粘贴逻辑 (V6.5 最终版：修复粘连+保留格式) 🌟🌟🌟
    ta.addEventListener('paste', (e) => {
      if (state.batchRunning) { e.preventDefault(); return; }
      e.preventDefault();
      
      const clipboardData = e.clipboardData || window.clipboardData;
      const html = clipboardData.getData('text/html');
      const plain = clipboardData.getData('text/plain');
      let segs = [];

      // A. 优先处理 HTML 表格 (Excel/Google Sheets)
      if (html) {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const tds = doc.querySelectorAll('td');

        if (tds.length > 0) {
          tds.forEach(td => {
             // 1. 获取 HTML
             let rawHtml = td.innerHTML;
             
             // 2. 核心修复：强制将所有可能导致粘连的标签替换为空格
             // 替换 <br>, <p>, </div>, </tr> 为空格
             rawHtml = rawHtml.replace(/<br\s*\/?>/gi, ' ');
             rawHtml = rawHtml.replace(/<\/p>/gi, ' ');
             rawHtml = rawHtml.replace(/<\/div>/gi, ' ');
             rawHtml = rawHtml.replace(/<\/tr>/gi, ' ');
             
             // 3. 提取纯文本
             const tempDiv = document.createElement('div');
             tempDiv.innerHTML = rawHtml;
             let txt = tempDiv.textContent || tempDiv.innerText || "";
             
             // 4. 清理多余空格 (合并连续空格)
             txt = txt.replace(/\s+/g, ' ').trim();
             
             if (txt) segs.push(txt);
          });
        }
      }

      // B. 兜底处理 (纯文本)
      if (segs.length === 0 && plain) {
         segs = plain.split(/\r\n|\n/).filter(t => t.trim());
      }

      // C. 填入数据
      if (segs.length > 0) {
        let splitCount = 0;
        if (ui.autoSplit3Min && ui.autoSplit3Min.checked) {
          const expanded = ElevenApiPool.expandOverThreeMinutes(segs, { speed: currentSpeechSpeed() });
          segs = expanded.texts;
          splitCount = expanded.splitCount;
        }
        // 第一格
        ta.value = segs[0];
        ta.dispatchEvent(new Event('input')); 

        // 剩余格
        if (segs.length > 1) {
          let curr = div;
          for (let i = 1; i < segs.length; i++) {
             const n = addCard(segs[i], false);
             ui.container.insertBefore(n, curr.nextSibling);
             curr = n;
          }
        }
        
        refreshIndexes();
        saveCards();
        updateStats();
        if (splitCount > 0) {
          setStatus(`✂️ 检测到 ${splitCount} 段超 3 分钟文案，已按合适位置自动分为 2 份`);
        }
      }
    });

    if (!div.parentNode) ui.container.appendChild(div);
    const statusLabels = { pending: '待生成', failed: '失败', done: '已完成', uncertain: '待确认', download_failed: '下载失败' };
    div.querySelector('.task-status').textContent = `${statusLabels[div.dataset.status] || '待生成'}${div.taskData.account ? ` · ${div.taskData.account}` : ''}`;
    div.querySelector('.task-message').textContent = div.dataset.status === 'uncertain' ? '上次任务中断，请先检查生成历史后再重试。' : div.taskData.message;
    const retry = div.querySelector('.task-retry');
    retry.classList.toggle('hidden', !['done', 'uncertain', 'download_failed'].includes(div.dataset.status));
    retry.textContent = div.dataset.status === 'download_failed' ? '重试下载' : '重新生成';
    if (div.dataset.status === 'download_failed' && div.taskData.downloadId) {
      chrome.downloads.search({ id: div.taskData.downloadId }, items => {
        if (!chrome.runtime.lastError && items && items[0] && items[0].state === 'complete') {
          setTaskStatus(div, 'done'); ElevenAudioStore.remove(div.taskData.id).catch(() => {});
        }
      });
    }
    if (autoSave) saveCards();
    return div;
  }

  function refreshIndexes() { if (!ui.container) return; Array.from(ui.container.children).forEach((c, i) => c.querySelector('.idx-tag').textContent = `#${i + 1}`); }
  function saveCards() {
    if (!ui.container) return;
    const jobs = Array.from(ui.container.querySelectorAll('.card')).map(card => ({ ...card.taskData, text: card.querySelector('textarea').value, status: card.dataset.status }));
    chrome.storage.local.set({ saved_cards: jobs.map(job => job.text), saved_jobs: jobs });
  }
  function updateStats() {
    if (!ui.container) return;
    const cards = Array.from(ui.container.querySelectorAll('.card'));
    const speed = currentSpeechSpeed();
    let total = 0;
    let totalSeconds = 0;
    let totalClauses = 0;
    let totalShortClauses = 0;
    let overLimitCount = 0;
    cards.forEach(card => {
      const text = card.querySelector('textarea').value;
      total += text.length;
      const est = updateCardMeta(card, speed);
      totalSeconds += est.seconds;
      totalClauses += est.clauses;
      totalShortClauses += est.shortClauses;
      const splitBtn = card.querySelector('.task-split');
      if (splitBtn && !splitBtn.classList.contains('hidden')) overLimitCount++;
    });
    if (ui.splitLongBtn) {
      ui.splitLongBtn.classList.toggle('hidden', overLimitCount === 0);
      ui.splitLongBtn.disabled = state.batchRunning || state.keyMaintenance || previewRunning || overLimitCount === 0;
      ui.splitLongBtn.textContent = overLimitCount > 0 ? `✂️ 超3分拆2段 (${overLimitCount})` : '✂️ 超3分拆2段';
    }
    ui.totalChars.textContent = `总字数: ${total}`;
    if (ui.totalDuration) {
      const formatted = ElevenApiPool.formatDuration(totalSeconds);
      ui.totalDuration.textContent = `预计时长: ${formatted}`;
      ui.totalDuration.title = totalSeconds > 0
        ? `共 ${totalClauses} 个分句（含 ${totalShortClauses} 个短句）· 按当前语速 ${speed.toFixed(2)}x 与标点停顿智能估算`
        : '输入文案后自动根据标点与短句智能估算总时长';
    }
    
    const ready = cards.some(card => card.querySelector('textarea').value.trim() && ['pending', 'failed'].includes(card.dataset.status));
    const summary = state.poolSummary;
    if (summary) ui.remainChars.textContent = `综合额度: ${ui.quotaDisplay.textContent} credits`;
    ui.genBtn.disabled = state.batchRunning || state.keyMaintenance || previewRunning || !ready || !getPoolKeys().length;
    ui.genBtn.textContent = state.batchRunning ? '自动生成中...' : state.pauseRequested ? '继续未完成文案' : '开始自动生成';
    ui.genBtn.style.background = '';
  }

  // 辅助：列表额度检查
  function queueQuotaCheck(key, tagElement, simpleMode = false, resetElement = null, forceRefresh = false) {
    if (!tagElement) return;
    tagElement.dataset.key = key;
    if (resetElement) resetElement.dataset.key = key;
    const cached = state.quotaListCache[key];
    if (!forceRefresh && ElevenVoiceIndex.freshQuota(cached)) {
      applyQuotaToTag(key, tagElement, simpleMode, resetElement, cached);
      return;
    }
    tagElement.textContent = '排队';
    tagElement.title = '正在排队扫描额度';
    const diagnostic = tagElement.closest('.key-item')?.querySelector('.quota-diagnostic');
    if (diagnostic) diagnostic.textContent = '额度查询：正在排队扫描，尚未得到结果，不代表 Key 无效。';
    quotaScanQueue.push({ key, tagElement, simpleMode, resetElement, forceRefresh });
    runQuotaScanQueue();
  }

  function runQuotaScanQueue() {
    while (quotaScanRunning < QUOTA_SCAN_CONCURRENCY && quotaScanQueue.length > 0) {
      const task = quotaScanQueue.shift();
      if (!task.tagElement || !task.tagElement.isConnected || task.tagElement.dataset.key !== task.key) continue;
      quotaScanRunning++;
      checkQuotaForList(task.key, task.tagElement, task.simpleMode, task.resetElement, task.forceRefresh)
        .finally(() => {
          quotaScanRunning--;
          runQuotaScanQueue();
        });
    }
  }

  function applyQuotaToTag(key, tagElement, simpleMode, resetElement, data) {
    if (!tagElement || !tagElement.isConnected || tagElement.dataset.key !== key) return;
    const left = data.left;
    const labels = { invalid: '确认无效', permission: '额度权限不足', restricted: '访问受限', quota: '额度受限', rate: '查询限流', network: '查询失败', unknown: '查询未知' };
    const cause = [data.httpStatus ? 'HTTP ' + data.httpStatus : '', data.errorCode || ''].filter(Boolean).join(' · ');
    const diagnostic = tagElement.closest('.key-item')?.querySelector('.quota-diagnostic');
    const detail = ElevenApiKeys.queryDiagnostic(data, 'quota', key);
    if (diagnostic) {
      diagnostic.textContent = detail;
      diagnostic.title = data.endpoint || '';
    }
    if (!Number.isFinite(left)) {
      tagElement.textContent = labels[data.quotaState] || (data.invalid ? '确认无效' : data.disabled ? '访问受限' : '查询未知');
      tagElement.title = detail || [cause, data.message || '额度未知，将在生成时检查'].filter(Boolean).join('\n');
      if (!simpleMode) tagElement.className = 'quota-tag ' + (data.invalid ? 'error' : 'low');
      return;
    }
    tagElement.title = '';
    if (simpleMode) {
      tagElement.textContent = (left / 1000).toFixed(1) + 'k';
      tagElement.style.color = left < 1000 ? '#ef4444' : '#10b981';
    } else {
      tagElement.textContent = '剩 ' + left.toLocaleString();
      tagElement.className = 'quota-tag ' + (left < 1000 ? 'low' : 'good');
      if (resetElement && resetElement.dataset.key === key && data.resetUnix) {
        const d = Math.ceil(Math.abs(new Date(data.resetUnix * 1000) - new Date()) / 86400000);
        resetElement.textContent = d + '天后刷新';
      }
    }
  }

  async function checkQuotaForList(key, tagElement, simpleMode = false, resetElement = null, forceRefresh = false) {
    if (!tagElement) return;

    const applyQuota = (data) => {
      applyQuotaToTag(key, tagElement, simpleMode, resetElement, data);
    };

    const cached = state.quotaListCache[key];
    if (!forceRefresh && ElevenVoiceIndex.freshQuota(cached)) {
      applyQuota(cached);
      return;
    }

    try {
      const data = await getQuotaInfo(key, forceRefresh);
      applyQuota(data);
    } catch (e) {
      const msg = e.message || '';
      if (!tagElement || !tagElement.isConnected || tagElement.dataset.key !== key) return;
      tagElement.textContent = msg.includes('权限') ? '权限' : 'Err';
      tagElement.title = msg;
      if (!simpleMode) tagElement.className = 'quota-tag error';
    }
  }

  // ==========================================
  // 11. 其他工具工坊 (音效 / 音乐 / 变声 / 降噪 / 转文字)
  // ==========================================
  const toolHistory = [];
  let currentToolAudio = null;
  let toolTaskRunning = false;

  function setToolStatus(msg, type = 'normal') {
    if (!ui.otherToolsStatus) return;
    ui.otherToolsStatus.textContent = msg;
    ui.otherToolsStatus.className = 'other-tools-status';
    if (type === 'error') ui.otherToolsStatus.classList.add('error');
    else if (type === 'success') ui.otherToolsStatus.classList.add('success');
  }

  function getToolPriorities(voiceOverride = '') {
    ensureVoiceFamilies();
    const items = getPoolKeys().map(item => ({ ...item, accountId: state.quotaListCache[item.key]?.accountId }));
    let selected = { id: '__system__', category: 'premade' };
    if (voiceOverride) {
      selected = state.voiceFamilies.get(voiceOverride) ||
        [...state.voiceFamilies.values()].find(family => family.voiceIds.has(voiceOverride)) ||
        { id: voiceOverride, category: 'premade' };
    }
    return ElevenVoiceIndex.allocationPriorities(items, state.voiceLibraries, state.voiceFamilies, selected, state.voicePriority);
  }

  function formatToolPriorityTag(priority, quota) {
    if (quota?.invalid) return '密钥无效';
    if (Number.isFinite(quota?.left) && quota.left <= 0) return '额度用尽';
    if (!priority) return '';
    if (priority.systemOnly) return '系统声音专用·优先';
    if (priority.rank === 0) return '目标声音专用·优先';
    if (priority.rank === 2) return `共享${priority.coverage}号·备用`;
    return '声音库未汇总';
  }

  function sortToolCandidatesList(list, priorities) {
    return [...list].sort((a, b) => {
      const qa = state.quotaListCache[a.key];
      const qb = state.quotaListCache[b.key];
      const invA = qa?.invalid ? 1 : 0;
      const invB = qb?.invalid ? 1 : 0;
      if (invA !== invB) return invA - invB;

      const disA = qa?.disabled ? 1 : 0;
      const disB = qb?.disabled ? 1 : 0;
      if (disA !== disB) return disA - disB;

      const exhA = Number.isFinite(qa?.left) && qa.left <= 0 ? 1 : 0;
      const exhB = Number.isFinite(qb?.left) && qb.left <= 0 ? 1 : 0;
      if (exhA !== exhB) return exhA - exhB;

      const pa = priorities.get(a.key) || { rank: 1, coverage: 0, reserved: 0, blocked: false };
      const pb = priorities.get(b.key) || { rank: 1, coverage: 0, reserved: 0, blocked: false };
      const blkA = pa.blocked ? 1 : 0;
      const blkB = pb.blocked ? 1 : 0;
      if (blkA !== blkB) return blkA - blkB;

      const priorityDiff = (pa.rank - pb.rank) || (pb.coverage - pa.coverage) || (pa.reserved - pb.reserved);
      if (priorityDiff !== 0) return priorityDiff;

      const la = Number.isFinite(qa?.left) ? qa.left : -1;
      const lb = Number.isFinite(qb?.left) ? qb.left : -1;
      return lb - la;
    });
  }

  function populateToolKeySelect() {
    if (!ui.toolKeySelect) return;
    const prev = ui.toolKeySelect.value || '__auto__';
    ui.toolKeySelect.innerHTML = '';
    const priorities = getToolPriorities();
    const sorted = sortToolCandidatesList(getPoolKeys(), priorities);
    const systemOnlyCount = sorted.filter(item => priorities.get(item.key)?.systemOnly).length;

    const autoOpt = document.createElement('option');
    autoOpt.value = '__auto__';
    autoOpt.textContent = `🔄 自动优先系统声音 API（系统专用 ${systemOnlyCount} 个 / 共 ${sorted.length} 个，按系统优先→共享多→余额多轮换）`;
    ui.toolKeySelect.appendChild(autoOpt);

    sorted.forEach((item, idx) => {
      const opt = document.createElement('option');
      opt.value = item.key;
      const quota = state.quotaListCache[item.key];
      const priority = priorities.get(item.key);
      const tag = formatToolPriorityTag(priority, quota);
      const leftText = quota && Number.isFinite(quota.left) ? ` · 剩 ${quota.left.toLocaleString()}` : '';
      const alias = item.alias || `账号 ${idx + 1}`;
      opt.textContent = `${tag ? '[' + tag + '] ' : ''}${alias} (••••${item.key.slice(-4)})${leftText}`;
      ui.toolKeySelect.appendChild(opt);
    });

    if (prev && Array.from(ui.toolKeySelect.options).some(o => o.value === prev)) {
      ui.toolKeySelect.value = prev;
    } else {
      ui.toolKeySelect.value = '__auto__';
    }
  }

  function openOtherToolsModal(defaultTab = '') {
    populateToolKeySelect();
    if (defaultTab) switchOtherToolTab(defaultTab);
    if (ui.otherToolsModal) ui.otherToolsModal.classList.remove('hidden');
  }

  function closeOtherToolsModal() {
    if (ui.otherToolsAudioPlayer) {
      try { ui.otherToolsAudioPlayer.pause(); } catch (_) {}
    }
    if (ui.otherToolsModal) ui.otherToolsModal.classList.add('hidden');
  }

  function switchOtherToolTab(tabName) {
    if (!ui.otherToolsModal) return;
    ui.otherToolsModal.querySelectorAll('.tool-tab-btn').forEach(btn => {
      const active = btn.dataset.tab === tabName;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    ui.otherToolsModal.querySelectorAll('.tool-pane').forEach(pane => {
      const active = pane.dataset.pane === tabName;
      pane.classList.toggle('active', active);
      pane.classList.toggle('hidden', !active);
    });
  }

  if (ui.otherToolsBtn) ui.otherToolsBtn.addEventListener('click', () => openOtherToolsModal());
  if (ui.sidebarOtherToolsBtn) ui.sidebarOtherToolsBtn.addEventListener('click', () => openOtherToolsModal());
  if (ui.closeOtherToolsBtn) ui.closeOtherToolsBtn.addEventListener('click', closeOtherToolsModal);

  if (ui.otherToolsModal) {
    ui.otherToolsModal.querySelectorAll('.tool-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => switchOtherToolTab(btn.dataset.tab));
    });
    ui.otherToolsModal.querySelectorAll('.tool-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const target = getEl(chip.dataset.target);
        if (target) {
          target.value = chip.dataset.prompt || '';
          target.focus();
        }
      });
    });
  }

  if (ui.sfxDurationMode) {
    ui.sfxDurationMode.addEventListener('change', () => {
      if (ui.sfxDuration) ui.sfxDuration.classList.toggle('hidden', ui.sfxDurationMode.value !== 'custom');
    });
  }
  if (ui.sfxInfluence) {
    ui.sfxInfluence.addEventListener('input', (e) => {
      if (ui.valSfxInfluence) ui.valSfxInfluence.textContent = parseFloat(e.target.value).toFixed(2);
    });
  }
  if (ui.musicDurationMode) {
    ui.musicDurationMode.addEventListener('change', () => {
      if (ui.musicDurationSec) ui.musicDurationSec.classList.toggle('hidden', ui.musicDurationMode.value !== 'custom');
    });
  }

  function getOrderedToolCandidates(voiceOverride = '') {
    const all = getPoolKeys();
    if (!all.length) return { candidates: [], priorities: new Map() };
    const priorities = getToolPriorities(voiceOverride);
    const selected = ui.toolKeySelect ? ui.toolKeySelect.value : '__auto__';
    if (selected && selected !== '__auto__') {
      const exact = all.find(k => k.key === selected);
      return { candidates: exact ? [exact] : [{ key: selected, alias: '选定账号' }], priorities };
    }
    const sorted = sortToolCandidatesList(all, priorities);
    const usable = sorted.filter(item => {
      const q = state.quotaListCache[item.key];
      if (q?.invalid || q?.disabled) return false;
      if (Number.isFinite(q?.left) && q.left <= 0) return false;
      return true;
    });
    const unblocked = usable.filter(item => !priorities.get(item.key)?.blocked);
    return {
      candidates: unblocked.length ? unblocked : (usable.length ? usable : sorted),
      priorities
    };
  }

  async function runWithToolApiPool(actionLabel, taskFn, options = {}) {
    const { candidates, priorities } = getOrderedToolCandidates(options.voiceOverride || '');
    if (!candidates.length) {
      throw new Error('请先在主界面或设置中添加至少一个 ElevenLabs API Key');
    }
    let lastError = null;
    for (let i = 0; i < candidates.length; i++) {
      const entry = candidates[i];
      const alias = entry.alias || `账号 ${i + 1}`;
      const priority = priorities.get(entry.key);
      const tag = formatToolPriorityTag(priority, state.quotaListCache[entry.key]);
      const displayAlias = tag ? `${alias} (${tag})` : alias;
      try {
        setToolStatus(`⏳ 正在通过 [${displayAlias}] 执行${actionLabel}...`);
        const res = await taskFn(entry.key, displayAlias);
        getQuotaInfo(entry.key, true).then(() => {
          scheduleQuotaSave();
          renderPoolControls();
          populateToolKeySelect();
        }).catch(() => {});
        return { result: res, entry, alias: displayAlias };
      } catch (err) {
        lastError = err;
        const status = err.status || 0;
        const canRetryNext = candidates.length > 1 && (status === 401 || status === 402 || status === 403 || status === 429 || /quota|limit|invalid|unauthorized|forbidden|permission/i.test(err.message || ''));
        if (!canRetryNext) break;
      }
    }
    throw lastError || new Error(`${actionLabel}失败`);
  }

  function sanitizeToolFilename(raw, fallback = 'audio') {
    const cleaned = String(raw || '')
      .replace(/[\r\n]+/g, ' ')
      .replace(/[\\/:*?"<>|]/g, '_')
      .replace(/\s+/g, '_')
      .slice(0, 32)
      .replace(/^_+|_+$/g, '');
    return cleaned || fallback;
  }

  function saveToolAudioBlob(blob, subfolder, prefix, ext = 'mp3') {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base = (state.baseFolder || 'ElevenLabs_Pro').replace(/[\\:*?"<>|]/g, '_') || 'ElevenLabs_Pro';
        const sub = subfolder ? subfolder.replace(/[\\:*?"<>|]/g, '_').trim() : '';
        const stamp = new Date().toISOString().slice(11, 19).replace(/:/g, '');
        const filename = `${prefix}_${stamp}.${ext}`;
        const finalPath = sub ? `${base}/${sub}/${filename}` : `${base}/${filename}`;
        chrome.downloads.download({
          url: reader.result,
          filename: finalPath,
          saveAs: false,
          conflictAction: 'uniquify'
        }, (downloadId) => {
          if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
          else resolve({ downloadId, finalPath });
        });
      };
      reader.onerror = () => reject(new Error('音频读取失败'));
      reader.readAsDataURL(blob);
    });
  }

  function showToolAudioResult({ blob, title, subfolder, prefix, ext = 'mp3', accountAlias }) {
    if (currentToolAudio && currentToolAudio.url) {
      // Keep URL alive in history if needed
    }
    const url = URL.createObjectURL(blob);
    const item = { blob, url, title, subfolder, prefix, ext, accountAlias, time: new Date().toLocaleTimeString() };
    currentToolAudio = item;
    toolHistory.unshift(item);
    if (toolHistory.length > 10) {
      const popped = toolHistory.pop();
      if (popped && popped.url && popped !== currentToolAudio) {
        try { URL.revokeObjectURL(popped.url); } catch (_) {}
      }
    }

    if (ui.otherToolsAudioPanel) ui.otherToolsAudioPanel.classList.remove('hidden');
    if (ui.otherToolsAudioMeta) ui.otherToolsAudioMeta.textContent = `${title} · 账号: ${accountAlias}`;
    if (ui.otherToolsAudioPlayer) {
      ui.otherToolsAudioPlayer.src = url;
      ui.otherToolsAudioPlayer.play().catch(() => {});
    }
    renderToolHistory();
  }

  function renderToolHistory() {
    if (!ui.otherToolsHistoryWrap || !ui.otherToolsHistoryList) return;
    ui.otherToolsHistoryWrap.classList.toggle('hidden', toolHistory.length === 0);
    ui.otherToolsHistoryList.innerHTML = '';
    toolHistory.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'tool-history-item';
      row.innerHTML = `
        <span class="tool-history-title" title="${escapeHtml(item.title)}">[${escapeHtml(item.time)}] ${escapeHtml(item.title)} (${escapeHtml(item.accountAlias)})</span>
        <div class="tool-history-actions">
          <button type="button" class="btn-outlined hist-play-btn">▶ 播放</button>
          <button type="button" class="btn-outlined hist-dl-btn">💾 下载</button>
        </div>
      `;
      row.querySelector('.hist-play-btn').addEventListener('click', () => {
        currentToolAudio = item;
        if (ui.otherToolsAudioMeta) ui.otherToolsAudioMeta.textContent = `${item.title} · 账号: ${item.accountAlias}`;
        if (ui.otherToolsAudioPlayer) {
          ui.otherToolsAudioPlayer.src = item.url;
          ui.otherToolsAudioPlayer.play().catch(() => {});
        }
      });
      row.querySelector('.hist-dl-btn').addEventListener('click', async () => {
        try {
          const saved = await saveToolAudioBlob(item.blob, item.subfolder, item.prefix, item.ext);
          setToolStatus(`✅ 已保存至 下载/${saved.finalPath}`, 'success');
        } catch (err) {
          setToolStatus(`❌ 下载失败：${err.message}`, 'error');
        }
      });
      ui.otherToolsHistoryList.appendChild(row);
    });
  }

  if (ui.otherToolsDownloadBtn) {
    ui.otherToolsDownloadBtn.addEventListener('click', async () => {
      if (!currentToolAudio) return;
      try {
        const saved = await saveToolAudioBlob(currentToolAudio.blob, currentToolAudio.subfolder, currentToolAudio.prefix, currentToolAudio.ext);
        setToolStatus(`✅ 已保存至 下载/${saved.finalPath}`, 'success');
      } catch (err) {
        setToolStatus(`❌ 下载失败：${err.message}`, 'error');
      }
    });
  }

  function setToolButtonsBusy(busy) {
    toolTaskRunning = busy;
    [ui.sfxGenerateBtn, ui.musicGenerateBtn, ui.stsGenerateBtn, ui.isoGenerateBtn, ui.sttGenerateBtn].forEach(btn => {
      if (btn) btn.disabled = busy;
    });
  }

  // 11.1 音效生成 (POST /v1/sound-generation)
  if (ui.sfxGenerateBtn) {
    ui.sfxGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const prompt = ui.sfxPrompt ? ui.sfxPrompt.value.trim() : '';
      if (!prompt) return setToolStatus('⚠️ 请先输入音效描述提示词', 'error');

      const isCustomDur = ui.sfxDurationMode && ui.sfxDurationMode.value === 'custom';
      const customDur = ui.sfxDuration ? Math.min(30, Math.max(0.5, parseFloat(ui.sfxDuration.value) || 5)) : 5;
      const influence = ui.sfxInfluence ? Math.min(1, Math.max(0, parseFloat(ui.sfxInfluence.value) || 0.3)) : 0.3;
      const loop = Boolean(ui.sfxLoop && ui.sfxLoop.checked);
      const autoDl = Boolean(ui.sfxAutoDownload && ui.sfxAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = ui.sfxGenerateBtn.textContent;
      ui.sfxGenerateBtn.textContent = '⏳ 音效生成中...';

      try {
        const { result: blob, alias } = await runWithToolApiPool('音效生成', async (key) => {
          const payload = {
            text: prompt,
            prompt_influence: influence
          };
          if (isCustomDur) payload.duration_seconds = customDur;
          if (loop) payload.loop = true;

          const resp = await fetch('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', {
            method: 'POST',
            headers: {
              'xi-api-key': key,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          if (!resp.ok) {
            const msg = await readElevenError(resp, '音效生成失败');
            throw Object.assign(new Error(msg), { status: resp.status });
          }
          return await resp.blob();
        });

        const prefix = `SFX_${sanitizeToolFilename(prompt, 'sound')}`;
        showToolAudioResult({
          blob,
          title: `🔊 音效: ${prompt.slice(0, 28)}`,
          subfolder: 'SFX_音效',
          prefix,
          ext: 'mp3',
          accountAlias: alias
        });

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'SFX_音效', prefix, 'mp3');
          setToolStatus(`✅ 音效生成成功并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 音效生成成功（账号: ${alias}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        setToolStatus(`❌ 音效生成失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        ui.sfxGenerateBtn.textContent = origText;
      }
    });
  }

  // 11.2 音乐生成 (默认降级生成 BGM 音乐 + 付费模型兼容优化)
  function buildBgmPromptText(rawPrompt, forceInstrumental) {
    let text = String(rawPrompt || '').trim();
    if (!/(music|beat|song|melody|track|soundtrack|bgm|score|音乐|配乐|伴奏|曲|旋律)/i.test(text)) {
      text = `Background music track: ${text}`;
    }
    if (forceInstrumental && !/(instrumental|no vocals|without vocals|纯音乐|无人声|伴奏)/i.test(text)) {
      text = `${text}, instrumental background music, no vocals`;
    }
    return text;
  }

  async function requestBgmMusicWithCompatibility(key, rawPrompt, isCustomDur, durSec, forceInstrumental) {
    const bgmText = buildBgmPromptText(rawPrompt, forceInstrumental);
    const targetDur = Math.min(30, Math.max(3, Number(durSec) || 22));
    const attempts = [];
    if (isCustomDur) {
      attempts.push({ text: bgmText, duration_seconds: targetDur, prompt_influence: 0.5, loop: true });
      if (targetDur > 22) {
        attempts.push({ text: bgmText, duration_seconds: 22, prompt_influence: 0.5, loop: true });
      }
      attempts.push({ text: bgmText, duration_seconds: Math.min(22, targetDur), prompt_influence: 0.5 });
    }
    attempts.push({ text: bgmText, prompt_influence: 0.5 });

    let lastResp = null;
    for (let i = 0; i < attempts.length; i++) {
      const resp = await fetch('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', {
        method: 'POST',
        headers: {
          'xi-api-key': key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(attempts[i])
      });
      if (resp.ok) return await resp.blob();
      lastResp = resp;
      if (resp.status !== 400 && resp.status !== 422) break;
    }
    const msg = await readElevenError(lastResp, 'BGM 音乐生成失败');
    throw Object.assign(new Error(msg), { status: lastResp ? lastResp.status : 0 });
  }

  async function requestPaidMusicWithCompatibility(key, prompt, modelId, isCustomDur, durSec, forceInstrumental) {
    const modelChain = [];
    [modelId, 'music_v1', 'music_v2', 'music_v2_5', 'auto'].forEach((m) => {
      if (m && !modelChain.includes(m)) modelChain.push(m);
    });

    let lastResp = null;
    for (let i = 0; i < modelChain.length; i++) {
      const candidateModel = modelChain[i];
      const payload = {
        prompt,
        force_instrumental: forceInstrumental
      };
      if (isCustomDur) payload.music_length_ms = Math.round(durSec * 1000);
      if (candidateModel && candidateModel !== 'auto') payload.model_id = candidateModel;

      const resp = await fetch('https://api.elevenlabs.io/v1/music?output_format=mp3_44100_128', {
        method: 'POST',
        headers: {
          'xi-api-key': key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (resp.ok) {
        return { blob: await resp.blob(), usedModel: candidateModel };
      }
      lastResp = resp;
      if (resp.status !== 400 && resp.status !== 404 && resp.status !== 422) {
        break;
      }
    }

    const msg = await readElevenError(lastResp, '付费音乐接口调用失败');
    throw Object.assign(new Error(msg), { status: lastResp ? lastResp.status : 0 });
  }

  if (ui.musicGenerateBtn) {
    ui.musicGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const prompt = ui.musicPrompt ? ui.musicPrompt.value.trim() : '';
      if (!prompt) return setToolStatus('⚠️ 请先输入音乐风格或描述提示词', 'error');

      const modelId = ui.musicModel ? ui.musicModel.value : 'bgm_default';
      const selectedKeyVal = ui.toolKeySelect ? ui.toolKeySelect.value : '__auto__';
      const isManualAccount = Boolean(selectedKeyVal && selectedKeyVal !== '__auto__');
      const isPaidModelSelected = Boolean(modelId && modelId !== 'bgm_default');
      // 除非用户同时手动选择了具体（付费）账户且选择了付费音乐模型，否则默认降级使用 BGM 音乐生成引擎
      const usePaidMusicApi = isManualAccount && isPaidModelSelected;

      const isCustomDur = ui.musicDurationMode && ui.musicDurationMode.value === 'custom';
      const rawDurSec = ui.musicDurationSec ? (parseInt(ui.musicDurationSec.value, 10) || 22) : 22;
      const durSec = usePaidMusicApi
        ? Math.min(300, Math.max(3, rawDurSec))
        : Math.min(30, Math.max(3, rawDurSec));
      const forceInstrumental = Boolean(ui.musicInstrumental && ui.musicInstrumental.checked);
      const autoDl = Boolean(ui.musicAutoDownload && ui.musicAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = ui.musicGenerateBtn.textContent;
      ui.musicGenerateBtn.textContent = usePaidMusicApi
        ? '⏳ 付费模型音乐合成中 (约10~40秒)...'
        : '⏳ 正在合成 BGM 配乐...';

      try {
        let usedModeLabel = 'BGM 配乐模式';
        const { result: blob, alias } = await runWithToolApiPool('音乐生成', async (key) => {
          if (usePaidMusicApi) {
            const { blob: paidBlob, usedModel } = await requestPaidMusicWithCompatibility(
              key,
              prompt,
              modelId,
              isCustomDur,
              durSec,
              forceInstrumental
            );
            usedModeLabel = `Eleven Music (${usedModel === 'auto' ? '自动模型' : usedModel})`;
            return paidBlob;
          }
          if (isPaidModelSelected && !isManualAccount) {
            usedModeLabel = '默认降级 BGM 模式 (未指定付费账号)';
          }
          return await requestBgmMusicWithCompatibility(
            key,
            prompt,
            isCustomDur,
            durSec,
            forceInstrumental
          );
        });

        const prefix = `Music_${sanitizeToolFilename(prompt, 'track')}`;
        showToolAudioResult({
          blob,
          title: `🎵 音乐 [${usedModeLabel}]: ${prompt.slice(0, 24)}`,
          subfolder: 'Music_音乐',
          prefix,
          ext: 'mp3',
          accountAlias: alias
        });

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'Music_音乐', prefix, 'mp3');
          setToolStatus(`✅ 音乐生成成功 [${usedModeLabel}] 并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 音乐生成成功 [${usedModeLabel}]（账号: ${alias}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        const extraHint = usePaidMusicApi && (err.status === 402 || err.status === 403 || /free_users|permission|paid|subscription/i.test(err.message || ''))
          ? '（当前所选账号可能为免费号或未开启 Music 权限，可切换为「免费 BGM 配乐模式」）'
          : '';
        setToolStatus(`❌ 音乐生成失败：${err.message}${extraHint}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        ui.musicGenerateBtn.textContent = origText;
      }
    });
  }

  // 11.3 语音变声 (POST /v1/speech-to-speech/{voice_id})
  if (ui.stsGenerateBtn) {
    ui.stsGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const file = ui.stsAudioFile && ui.stsAudioFile.files && ui.stsAudioFile.files[0];
      if (!file) return setToolStatus('⚠️ 请先选择要变声的源音频文件', 'error');

      const customVoice = ui.stsCustomVoiceId ? ui.stsCustomVoiceId.value.trim() : '';
      const baseVoice = customVoice || selectedVoiceId();
      if (!baseVoice) return setToolStatus('⚠️ 请在主界面选择目标声音，或填写目标 Voice ID', 'error');

      const stsModel = ui.stsModel ? ui.stsModel.value : 'eleven_multilingual_sts_v2';
      const removeNoise = Boolean(ui.stsRemoveNoise && ui.stsRemoveNoise.checked);
      const autoDl = Boolean(ui.stsAutoDownload && ui.stsAutoDownload.checked);
      const routes = !customVoice ? getVoiceRoutes(baseVoice) : new Map();

      setToolButtonsBusy(true);
      const origText = ui.stsGenerateBtn.textContent;
      ui.stsGenerateBtn.textContent = '⏳ 正在转换音色...';

      try {
        const { result: blob, alias } = await runWithToolApiPool('语音变声', async (key) => {
          const resolvedVoiceId = routes.get(key) || (baseVoice.startsWith('name:') ? '' : baseVoice);
          if (!resolvedVoiceId) {
            throw Object.assign(new Error('该账号未映射所选声音，尝试切换其他账号'), { status: 403 });
          }
          const formData = new FormData();
          formData.append('audio', file, file.name || 'input.mp3');
          formData.append('model_id', stsModel);
          formData.append('remove_background_noise', String(removeNoise));
          formData.append('voice_settings', JSON.stringify({
            stability: parseFloat(ui.stab ? ui.stab.value : '0.5') || 0.5,
            similarity_boost: parseFloat(ui.sim ? ui.sim.value : '0.75') || 0.75
          }));

          const resp = await fetch(`https://api.elevenlabs.io/v1/speech-to-speech/${encodeURIComponent(resolvedVoiceId)}?output_format=mp3_44100_128`, {
            method: 'POST',
            headers: { 'xi-api-key': key },
            body: formData
          });
          if (!resp.ok) {
            const msg = await readElevenError(resp, '语音变声失败');
            throw Object.assign(new Error(msg), { status: resp.status });
          }
          return await resp.blob();
        }, { voiceOverride: baseVoice });

        const baseName = file.name ? file.name.replace(/\.[^.]+$/, '') : 'sts';
        const prefix = `STS_${sanitizeToolFilename(baseName, 'voicechange')}`;
        showToolAudioResult({
          blob,
          title: `🎭 变声: ${file.name}`,
          subfolder: 'STS_变声',
          prefix,
          ext: 'mp3',
          accountAlias: alias
        });

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'STS_变声', prefix, 'mp3');
          setToolStatus(`✅ 语音变声完成并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 语音变声完成（账号: ${alias}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        setToolStatus(`❌ 语音变声失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        ui.stsGenerateBtn.textContent = origText;
      }
    });
  }

  // 11.4 人声提取 / 降噪 (POST /v1/audio-isolation)
  if (ui.isoGenerateBtn) {
    ui.isoGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const file = ui.isoAudioFile && ui.isoAudioFile.files && ui.isoAudioFile.files[0];
      if (!file) return setToolStatus('⚠️ 请先选择要提取人声的音频文件', 'error');

      const autoDl = Boolean(ui.isoAutoDownload && ui.isoAutoDownload.checked);

      setToolButtonsBusy(true);
      const origText = ui.isoGenerateBtn.textContent;
      ui.isoGenerateBtn.textContent = '⏳ 正在分离背景音与提纯人声...';

      try {
        const { result: blob, alias } = await runWithToolApiPool('人声提取降噪', async (key) => {
          const formData = new FormData();
          formData.append('audio', file, file.name || 'audio.mp3');

          const resp = await fetch('https://api.elevenlabs.io/v1/audio-isolation', {
            method: 'POST',
            headers: { 'xi-api-key': key },
            body: formData
          });
          if (!resp.ok) {
            const msg = await readElevenError(resp, '人声提取失败');
            throw Object.assign(new Error(msg), { status: resp.status });
          }
          return await resp.blob();
        });

        const baseName = file.name ? file.name.replace(/\.[^.]+$/, '') : 'vocal';
        const prefix = `Vocal_${sanitizeToolFilename(baseName, 'isolated')}`;
        showToolAudioResult({
          blob,
          title: `🧹 纯净人声: ${file.name}`,
          subfolder: 'Vocal_人声提取',
          prefix,
          ext: 'mp3',
          accountAlias: alias
        });

        if (autoDl) {
          const saved = await saveToolAudioBlob(blob, 'Vocal_人声提取', prefix, 'mp3');
          setToolStatus(`✅ 人声提取成功并已保存至 下载/${saved.finalPath}`, 'success');
        } else {
          setToolStatus(`✅ 人声提取成功（账号: ${alias}），可在下方试听或保存`, 'success');
        }
      } catch (err) {
        setToolStatus(`❌ 人声提取失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        ui.isoGenerateBtn.textContent = origText;
      }
    });
  }

  // 11.5 语音转文字 (POST /v1/speech-to-text)
  if (ui.sttGenerateBtn) {
    ui.sttGenerateBtn.addEventListener('click', async () => {
      if (toolTaskRunning) return;
      const file = ui.sttAudioFile && ui.sttAudioFile.files && ui.sttAudioFile.files[0];
      if (!file) return setToolStatus('⚠️ 请先选择要识别的音频或视频文件', 'error');

      const preferredModel = ui.sttModel ? ui.sttModel.value : 'scribe_v1';
      const tagEvents = Boolean(ui.sttTagEvents && ui.sttTagEvents.checked);
      const diarize = Boolean(ui.sttDiarize && ui.sttDiarize.checked);

      setToolButtonsBusy(true);
      const origText = ui.sttGenerateBtn.textContent;
      ui.sttGenerateBtn.textContent = '⏳ 正在识别语音文字...';

      try {
        const { result: data, alias } = await runWithToolApiPool('语音转文字', async (key) => {
          const sendRequest = async (modelToUse) => {
            const formData = new FormData();
            formData.append('file', file, file.name || 'audio.mp3');
            formData.append('model_id', modelToUse);
            formData.append('tag_audio_events', String(tagEvents));
            formData.append('diarize', String(diarize));
            return fetch('https://api.elevenlabs.io/v1/speech-to-text', {
              method: 'POST',
              headers: { 'xi-api-key': key },
              body: formData
            });
          };

          let resp = await sendRequest(preferredModel);
          if (!resp.ok && (resp.status === 400 || resp.status === 422) && preferredModel !== 'scribe_v1') {
            resp = await sendRequest('scribe_v1');
          }
          if (!resp.ok) {
            const msg = await readElevenError(resp, '语音转文字失败');
            throw Object.assign(new Error(msg), { status: resp.status });
          }
          return await resp.json();
        });

        let formattedText = String(data && data.text || '').trim();
        if (diarize && Array.isArray(data && data.words) && data.words.length > 0) {
          const lines = [];
          let currentSpeaker = null;
          let currentBuffer = '';
          for (const w of data.words) {
            const spk = w.speaker_id || w.speaker || '';
            if (spk && spk !== currentSpeaker) {
              if (currentBuffer.trim()) {
                lines.push(currentSpeaker ? `[${currentSpeaker}] ${currentBuffer.trim()}` : currentBuffer.trim());
              }
              currentSpeaker = spk;
              currentBuffer = w.text || '';
            } else {
              currentBuffer += w.text || '';
            }
          }
          if (currentBuffer.trim()) {
            lines.push(currentSpeaker ? `[${currentSpeaker}] ${currentBuffer.trim()}` : currentBuffer.trim());
          }
          if (lines.length > 1) formattedText = lines.join('\n');
        }

        if (ui.sttOutputText) ui.sttOutputText.value = formattedText;
        setToolStatus(`✅ 语音识别完成（账号: ${alias}，共 ${formattedText.length} 字）`, 'success');
      } catch (err) {
        setToolStatus(`❌ 语音转文字失败：${err.message}`, 'error');
      } finally {
        setToolButtonsBusy(false);
        ui.sttGenerateBtn.textContent = origText;
      }
    });
  }

  if (ui.sttCopyBtn) {
    ui.sttCopyBtn.addEventListener('click', async () => {
      const txt = ui.sttOutputText ? ui.sttOutputText.value.trim() : '';
      if (!txt) return setToolStatus('⚠️ 暂无可复制的识别文本', 'error');
      try {
        await navigator.clipboard.writeText(txt);
        setToolStatus('✅ 已复制识别文本到剪贴板', 'success');
      } catch (_) {
        setToolStatus('❌ 复制失败，请手动选中复制', 'error');
      }
    });
  }

  if (ui.sttDownloadTxtBtn) {
    ui.sttDownloadTxtBtn.addEventListener('click', () => {
      const txt = ui.sttOutputText ? ui.sttOutputText.value.trim() : '';
      if (!txt) return setToolStatus('⚠️ 暂无可导出的识别文本', 'error');
      const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const stamp = new Date().toISOString().slice(11, 19).replace(/:/g, '');
      chrome.downloads.download({
        url,
        filename: `${(state.baseFolder || 'ElevenLabs_Pro').replace(/[\\:*?"<>|]/g, '_')}/STT_转文字_${stamp}.txt`,
        saveAs: false
      }, () => {
        setTimeout(() => URL.revokeObjectURL(url), 5000);
        setToolStatus('✅ 已导出识别文本 TXT', 'success');
      });
    });
  }

  if (ui.sttSendToQueueBtn) {
    ui.sttSendToQueueBtn.addEventListener('click', () => {
      const txt = ui.sttOutputText ? ui.sttOutputText.value.trim() : '';
      if (!txt) return setToolStatus('⚠️ 暂无可加入队列的识别文本', 'error');
      let segs = txt.split(/\r?\n+/).map(s => s.trim()).filter(Boolean);
      if (ui.autoSplit3Min && ui.autoSplit3Min.checked) {
        segs = ElevenApiPool.expandOverThreeMinutes(segs, { speed: currentSpeechSpeed() }).texts;
      }
      const existingCards = Array.from(ui.container.querySelectorAll('.card'));
      if (existingCards.length === 1 && !existingCards[0].querySelector('textarea').value.trim()) {
        existingCards[0].remove();
      }
      segs.forEach(s => addCard(s, false));
      refreshIndexes();
      saveCards();
      updateStats();
      setToolStatus(`✅ 已将 ${segs.length} 段识别文本加入主界面文案队列`, 'success');
      setStatus(`📥 已从语音转文字导入 ${segs.length} 段文案`);
    });
  }

  // ==========================================
  // 🧹 声音清理与重名去重管理 (跨账号/单账号云端清理 + 本地移除)
  // ==========================================
  const selectedCleanupTargets = new Set(); // format: `${key}::${voice_id}`

  function getAccountAliasByKey(key) {
    const found = (state.keys || []).find(item => item.key === key);
    return found ? found.alias : `Key(...${String(key || '').slice(-4)})`;
  }

  function analyzePoolVoicesForCleanup() {
    const duplicateGroups = [];
    const duplicateExtraTargets = [];
    const singleCustomItems = [];
    let totalCustomCount = 0;

    for (const [key, lib] of state.voiceLibraries.entries()) {
      const alias = getAccountAliasByKey(key);
      const voices = Array.isArray(lib && lib.voices) ? lib.voices : [];
      const byName = new Map();
      for (const v of voices) {
        if (!v || !v.voice_id || v.category === 'premade') continue;
        totalCustomCount++;
        const nameKey = String(v.name || '').trim().replace(/\s+/g, ' ').toLowerCase();
        if (!nameKey) continue;
        const list = byName.get(nameKey) || [];
        list.push({ key, alias, voice: v, targetId: `${key}::${v.voice_id}` });
        byName.set(nameKey, list);
      }

      for (const [, group] of byName.entries()) {
        if (group.length > 1) {
          duplicateGroups.push({ key, alias, name: group[0].voice.name, items: group });
          for (let i = 1; i < group.length; i++) {
            duplicateExtraTargets.push(group[i].targetId);
          }
        } else if (group[0]) {
          singleCustomItems.push(group[0]);
        }
      }
    }

    return {
      totalCustomCount,
      duplicateGroups,
      duplicateExtraTargets,
      singleCustomItems
    };
  }

  function updateCleanVoicesBadge() {
    if (!ui.cleanVoicesBtn) return;
    const { duplicateExtraTargets } = analyzePoolVoicesForCleanup();
    const dupCount = duplicateExtraTargets.length;
    ui.cleanVoicesBtn.textContent = dupCount > 0 ? `🧹 清理重名 (${dupCount})` : '🧹 清理声音';
    ui.cleanVoicesBtn.classList.toggle('has-dups', dupCount > 0);
  }

  function setVoiceCleanupStatus(msg, type = 'normal') {
    if (!ui.voiceCleanupStatus) return;
    ui.voiceCleanupStatus.textContent = msg;
    ui.voiceCleanupStatus.classList.remove('error', 'success');
    if (type === 'error') ui.voiceCleanupStatus.classList.add('error');
    if (type === 'success') ui.voiceCleanupStatus.classList.add('success');
  }

  function updateVoiceCleanupButtonCount() {
    if (!ui.confirmDeleteVoicesBtn) return;
    const count = selectedCleanupTargets.size;
    ui.confirmDeleteVoicesBtn.textContent = `🧹 一键清理已勾选声音 (${count})`;
    ui.confirmDeleteVoicesBtn.disabled = count === 0;
  }

  function selectDefaultDuplicateVoices() {
    const { duplicateExtraTargets } = analyzePoolVoicesForCleanup();
    selectedCleanupTargets.clear();
    duplicateExtraTargets.forEach(t => selectedCleanupTargets.add(t));
    updateVoiceCleanupButtonCount();
  }

  function createPoolVoiceCleanupRow(item, options = {}) {
    const row = document.createElement('div');
    row.className = `voice-cleanup-item${options.isDuplicateExtra ? ' is-dup' : ''}`;

    const left = document.createElement('div');
    left.className = 'voice-cleanup-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = selectedCleanupTargets.has(item.targetId);
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) selectedCleanupTargets.add(item.targetId);
      else selectedCleanupTargets.delete(item.targetId);
      updateVoiceCleanupButtonCount();
    });

    const badge = document.createElement('span');
    if (options.isPrimaryOfDup) {
      badge.className = 'voice-cleanup-badge keep';
      badge.textContent = '✅ 保留主项';
    } else if (options.isDuplicateExtra) {
      badge.className = 'voice-cleanup-badge dup';
      badge.textContent = `⚠️ 重名副本 #${options.dupIndex}`;
    } else {
      badge.className = 'voice-cleanup-badge cat';
      const catMap = { generated: '设计/生成', cloned: '克隆', professional: '专业库' };
      badge.textContent = catMap[item.voice.category] || item.voice.category || '自定义';
    }

    const nameSpan = document.createElement('span');
    nameSpan.className = 'voice-cleanup-name';
    const shortId = String(item.voice.voice_id || '').slice(-6);
    nameSpan.textContent = `${item.voice.name} (ID: ...${shortId}) · [${item.alias}]`;
    nameSpan.title = `${item.voice.name} · Voice ID: ${item.voice.voice_id} · 所属账号: ${item.alias}`;

    left.appendChild(checkbox);
    left.appendChild(badge);
    left.appendChild(nameSpan);

    const actions = document.createElement('div');
    actions.className = 'voice-cleanup-actions';

    const delOneBtn = document.createElement('button');
    delOneBtn.type = 'button';
    delOneBtn.className = 'btn-ghost';
    delOneBtn.textContent = '🗑️ 删除';
    delOneBtn.addEventListener('click', () => {
      executePoolVoiceCleanup([item.targetId]);
    });
    actions.appendChild(delOneBtn);

    row.appendChild(left);
    row.appendChild(actions);
    return row;
  }

  function renderVoiceCleanupModal() {
    if (!ui.voiceCleanupList) return;
    const { totalCustomCount, duplicateGroups, duplicateExtraTargets, singleCustomItems } = analyzePoolVoicesForCleanup();
    const query = (ui.voiceCleanupSearch ? ui.voiceCleanupSearch.value : '').trim().toLowerCase();

    if (ui.voiceCleanupSummary) {
      ui.voiceCleanupSummary.textContent = `已扫描账号共 ${totalCustomCount} 个自定义声音 · 发现 ${duplicateGroups.length} 组同名重复（共 ${duplicateExtraTargets.length} 个多余副本）`;
    }

    ui.voiceCleanupList.replaceChildren();
    let renderedCount = 0;

    for (const group of duplicateGroups) {
      const matchedItems = group.items.filter(it =>
        !query ||
        String(it.voice.name || '').toLowerCase().includes(query) ||
        String(it.voice.voice_id || '').toLowerCase().includes(query) ||
        String(it.alias || '').toLowerCase().includes(query)
      );
      if (matchedItems.length === 0) continue;

      const title = document.createElement('div');
      title.className = 'voice-cleanup-group-title';
      title.textContent = `🔁 同名重复组：「${group.name}」· 账号 [${group.alias}]（共 ${group.items.length} 个，默认保留第 1 个）`;
      ui.voiceCleanupList.appendChild(title);

      group.items.forEach((it, idx) => {
        if (query && !matchedItems.includes(it)) return;
        ui.voiceCleanupList.appendChild(createPoolVoiceCleanupRow(it, {
          isPrimaryOfDup: idx === 0,
          isDuplicateExtra: idx > 0,
          dupIndex: idx + 1
        }));
        renderedCount++;
      });
    }

    const matchedSingles = singleCustomItems.filter(it =>
      !query ||
      String(it.voice.name || '').toLowerCase().includes(query) ||
      String(it.voice.voice_id || '').toLowerCase().includes(query) ||
      String(it.alias || '').toLowerCase().includes(query)
    );
    if (matchedSingles.length > 0) {
      const singleTitle = document.createElement('div');
      singleTitle.className = 'voice-cleanup-group-title normal';
      singleTitle.textContent = `📋 其他自定义 / 收藏声音（共 ${matchedSingles.length} 个，可手动勾选清理复制错的声音）`;
      ui.voiceCleanupList.appendChild(singleTitle);

      for (const it of matchedSingles) {
        ui.voiceCleanupList.appendChild(createPoolVoiceCleanupRow(it, {
          isPrimaryOfDup: false,
          isDuplicateExtra: false
        }));
        renderedCount++;
      }
    }

    if (renderedCount === 0) {
      const empty = document.createElement('div');
      empty.className = 'voice-cleanup-group-title normal';
      empty.textContent = state.voiceLibraries.size === 0
        ? '⚠️ 尚未汇总声音库，请先点击左侧「汇总声音库」或 🔄 刷新按钮。'
        : '🎉 没有匹配的重复或自定义声音。';
      ui.voiceCleanupList.appendChild(empty);
    }

    updateVoiceCleanupButtonCount();
  }

  async function openVoiceCleanupModal() {
    if (!ui.voiceCleanupModal) return;
    if (state.voiceLibraries.size === 0 && state.currentKey) {
      try { await getVoiceLibrary(state.currentKey); } catch (_) {}
    }
    selectDefaultDuplicateVoices();
    renderVoiceCleanupModal();
    ui.voiceCleanupModal.classList.remove('hidden');
  }

  function closeVoiceCleanupModal() {
    if (ui.voiceCleanupModal) ui.voiceCleanupModal.classList.add('hidden');
  }

  async function executePoolVoiceCleanup(targetList) {
    const targets = Array.isArray(targetList) ? targetList.filter(Boolean) : [...selectedCleanupTargets];
    if (targets.length === 0) {
      setVoiceCleanupStatus('⚠️ 请先勾选需要清理的声音', 'error');
      return;
    }

    if (ui.confirmDeleteVoicesBtn) ui.confirmDeleteVoicesBtn.disabled = true;
    let cloudDeleted = 0;
    let localRemoved = 0;
    const removedByKey = new Map();

    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      const sepIdx = target.indexOf('::');
      if (sepIdx === -1) continue;
      const key = target.slice(0, sepIdx);
      const voiceId = target.slice(sepIdx + 2);
      setVoiceCleanupStatus(`⏳ 正在清理声音 (${i + 1} / ${targets.length})...`);

      let deletedOnServer = false;
      try {
        const res = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
          method: 'DELETE',
          headers: { 'xi-api-key': key }
        });
        if (res.ok || res.status === 404) {
          deletedOnServer = true;
          cloudDeleted++;
        }
      } catch (_) {}

      if (!deletedOnServer) {
        localRemoved++;
      }

      const setForKey = removedByKey.get(key) || new Set();
      setForKey.add(voiceId);
      removedByKey.set(key, setForKey);
      selectedCleanupTargets.delete(target);
    }

    for (const [key, voiceIdSet] of removedByKey.entries()) {
      const lib = state.voiceLibraries.get(key);
      if (lib && Array.isArray(lib.voices)) {
        setVoiceLibrary(key, {
          ...lib,
          voices: lib.voices.filter(v => !voiceIdSet.has(v.voice_id))
        });
      }
    }

    renderVoiceLibraries();
    renderVoiceCleanupModal();

    const summaryParts = [];
    if (cloudDeleted > 0) summaryParts.push(`云端彻底删除 ${cloudDeleted} 个`);
    if (localRemoved > 0) summaryParts.push(`本地列表移除 ${localRemoved} 个`);
    const doneMsg = `✅ 清理完成：共处理 ${targets.length} 个声音（${summaryParts.join('，')}）`;
    setVoiceCleanupStatus(doneMsg, 'success');
    setStatus(doneMsg);
  }

  if (ui.cleanVoicesBtn) ui.cleanVoicesBtn.addEventListener('click', openVoiceCleanupModal);
  if (ui.closeVoiceCleanupBtn) ui.closeVoiceCleanupBtn.addEventListener('click', closeVoiceCleanupModal);
  if (ui.cancelVoiceCleanupBtn) ui.cancelVoiceCleanupBtn.addEventListener('click', closeVoiceCleanupModal);
  if (ui.voiceCleanupModal) {
    ui.voiceCleanupModal.addEventListener('click', (e) => {
      if (e.target === ui.voiceCleanupModal) closeVoiceCleanupModal();
    });
  }
  if (ui.voiceCleanupSearch) ui.voiceCleanupSearch.addEventListener('input', renderVoiceCleanupModal);
  if (ui.selectDuplicateVoicesBtn) {
    ui.selectDuplicateVoicesBtn.addEventListener('click', () => {
      selectDefaultDuplicateVoices();
      renderVoiceCleanupModal();
      setVoiceCleanupStatus(`🎯 已自动勾选 ${selectedCleanupTargets.size} 个同名多余副本（每组保留第 1 个）`);
    });
  }
  if (ui.clearVoiceSelectionBtn) {
    ui.clearVoiceSelectionBtn.addEventListener('click', () => {
      selectedCleanupTargets.clear();
      renderVoiceCleanupModal();
      setVoiceCleanupStatus('已取消全部勾选');
    });
  }
  if (ui.confirmDeleteVoicesBtn) {
    ui.confirmDeleteVoicesBtn.addEventListener('click', () => {
      executePoolVoiceCleanup([...selectedCleanupTargets]);
    });
  }

});
