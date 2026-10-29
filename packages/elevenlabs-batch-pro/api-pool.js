(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ElevenApiPool = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';

  function isFormatAccessError(error = {}) {
    const status = Number(error.status || 0);
    if (status < 400 || status >= 500 || status === 429) return false;
    const code = String(error.code || '').toLowerCase();
    const text = `${error.rawMessage || ''} ${error.message || ''}`.toLowerCase();
    return /^(output|audio)_format_(not_allowed|access_denied|not_available_for_tier|requires_subscription)$/.test(code) ||
      ((error.param === 'output_format' || /output[ _-]format|audio[ _-]format|输出格式|音频格式/.test(text)) && /only available|require|subscription|tier|paid plan|套餐|仅支持|仅限/.test(text));
  }

  function formatFromError(error = {}) {
    const match = `${error.rawMessage || ''} ${error.message || ''}`.match(/\b(?:mp3|opus)_\d+_\d+\b|\b(?:pcm|wav|ulaw|alaw)_\d+\b/i);
    return match ? match[0].toLowerCase() : '';
  }

  function classifyError(error = {}) {
    if (error.kind) return error.kind;
    const status = Number(error.status || 0);
    const text = `${error.code || ''} ${error.rawMessage || ''} ${error.message || ''}`.toLowerCase();
    // A failed POST with no definitive rejection may already have been billed.
    if (!status || status >= 500) return 'uncertain';
    if (/unusual_activity|abuse|suspicious/.test(text)) return 'policy';
    if (/max_character_limit_exceeded|text_too_long/.test(text)) return 'request';
    if (/quota_exceeded|credit_limit|insufficient_credits|insufficient_quota/.test(text)) return 'quota';
    if (isFormatAccessError(error)) return 'format';
    if (/voice_(not_found|access|not_allowed|disabled|unavailable|not_verified)|model_(not_found|access|not_allowed|not_available|not_supported)|unsupported_model|paid_plan|payment_required|free[_ ]users|subscription_required/.test(text)) return 'access';
    if (status === 402) return 'quota';
    if (/invalid_api_key|missing_api_key|insufficient_permissions|forbidden|workspace_access_denied/.test(text) || status === 401 || status === 403) return 'key';
    if (status === 429 || /rate_limit|concurrent.*limit|too_many_concurrent/.test(text)) return 'rate';
    return 'request';
  }

  class GenerationSkips {
    constructor(records = [], now = Date.now()) {
      this.records = new Map();
      if (!Array.isArray(records)) return;
      for (const original of records) {
        if (!original || typeof original !== 'object') continue;
        const record = { ...original };
        // Repair old global marks only when the saved rejection proves a format restriction.
        if (['key', 'voice', 'model', 'route'].includes(record.scope) && isFormatAccessError({ status: record.httpStatus, code: record.code, message: record.message })) {
          record.format = record.format || formatFromError(record);
          if (!record.format) continue;
          record.scope = 'format';
        }
        if (!record || typeof record.key !== 'string' || !record.key ||
          !['key', 'voice', 'model', 'route', 'format', 'quota', 'rate', 'uncertain'].includes(record.scope) ||
          !Number.isFinite(record.ts) || record.ts > now || !Number.isFinite(record.until) ||
          (record.until !== 0 && record.until <= now) ||
          (['voice', 'route'].includes(record.scope) && !record.voice) ||
          (['model', 'route'].includes(record.scope) && !record.model) ||
          (record.scope === 'format' && (typeof record.format !== 'string' || !record.format)) ||
          (['quota', 'rate', 'uncertain'].includes(record.scope) && record.until === 0) ||
          (record.scope === 'quota' && (!Number.isFinite(record.ceiling) || record.ceiling < 0))) continue;
        const safe = { key: record.key, scope: record.scope, voice: String(record.voice || ''), model: String(record.model || ''), format: String(record.format || ''),
          ts: record.ts, until: record.until, ceiling: record.ceiling, httpStatus: Number(record.httpStatus) || 0,
          code: String(record.code || '').split(record.key).join('[Key]').slice(0, 100),
          message: String(record.message || '').split(record.key).join('[Key]').slice(0, 500) };
        this.records.set(this.id(safe), safe);
      }
    }

    id(record) {
      return JSON.stringify([record.key, record.scope, ['voice', 'route'].includes(record.scope) ? record.voice : '',
        ['model', 'route'].includes(record.scope) ? record.model : '', record.scope === 'format' ? record.format : '']);
    }

    mark(error, context, now = Date.now()) {
      if (error.preflight) return null;
      const kind = classifyError(error);
      const { key, voice = '', model = '', format = '', cost } = context;
      if (typeof key !== 'string' || !key) return null;
      let scope = kind;
      if (kind === 'access') {
        const code = String(error.code || '').toLowerCase();
        const text = `${error.rawMessage || ''} ${error.message || ''}`.toLowerCase();
        scope = /^voice_/.test(code) ? 'voice' : /^model_|unsupported_model/.test(code) ? 'model' :
          /voice[_ ](not[_ ]found|access[_ ]denied)/.test(text) ? 'voice' : /model[_ ](not[_ ]found|access[_ ]denied)/.test(text) ? 'model' : 'route';
      }
      if (!['key', 'voice', 'model', 'route', 'format', 'quota', 'rate', 'uncertain'].includes(scope)) return null;
      if ((['voice', 'route'].includes(scope) && !voice) || (['model', 'route'].includes(scope) && !model)) return null;
      if (scope === 'format' && !format) return null;
      if (scope === 'quota' && (!Number.isFinite(cost) || cost < 1)) return null;
      const retry = Number(error.retryAfterMs);
      const until = scope === 'quota' ? now + 300000 : scope === 'rate' ? now + Math.max(30000, Number.isFinite(retry) ? Math.max(0, retry) : 0) : scope === 'uncertain' ? now + 60000 : 0;
      const record = { key, scope, voice, model, format, ts: now, until, ceiling: scope === 'quota' ? cost - 1 : undefined,
        httpStatus: Number(error.status) || 0, code: String(error.code || '').split(key).join('[Key]').slice(0, 100),
        message: String(error.rawMessage || error.message || '请求失败').split(key).join('[Key]').slice(0, 500) };
      const previous = this.records.get(this.id(record));
      if (previous && previous.until > now && scope === 'quota') record.ceiling = Math.min(previous.ceiling, record.ceiling);
      if (previous && previous.until > until && ['rate', 'uncertain'].includes(scope)) record.until = previous.until;
      this.records.set(this.id(record), record);
      return record;
    }

    limits(key, voice, model, format = '', now = Date.now()) {
      const result = { disabled: false, formatBlocked: false, ceiling: Infinity, readyAt: 0, record: null };
      for (const scope of ['key', 'voice', 'model', 'route', 'format', 'quota', 'rate', 'uncertain']) {
        const id = this.id({ key, voice, model, format, scope });
        const record = this.records.get(id);
        if (!record) continue;
        if (record.until && record.until <= now) { this.records.delete(id); continue; }
        if (scope === 'quota') result.ceiling = record.ceiling;
        else if (['rate', 'uncertain'].includes(scope)) result.readyAt = Math.max(result.readyAt, record.until);
        else result.disabled = true;
        if (scope === 'format') result.formatBlocked = true;
        if (!result.record) result.record = record;
      }
      return result;
    }

    values(now = Date.now()) {
      for (const [id, record] of this.records) if (record.until && record.until <= now) this.records.delete(id);
      return [...this.records.values()];
    }
  }

  function estimateCost(text, model) {
    const multiplier = Number(model && model.model_rates && model.model_rates.character_cost_multiplier);
    const factor = Number.isFinite(multiplier) && multiplier > 0 ? multiplier : 1;
    return Math.max(1, Math.ceil(Array.from(text).length * factor));
  }

  function extractFirstSentence(text) {
    const normalized = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
    if (!normalized) return '';
    const sentenceRegex = /(?:[^。！？!?；;\n.]|\.(?=\d)|\b(?:Mr|Mrs|Ms|Dr|Prof|Sr|Jr|St|vs|etc)\.|[A-Za-z]\.)+(?:[。！？!?；;]+|\.{3,}|…+|\.(?!\d))?["'”’）)\]}》」』]*/gi;
    const spokenChars = value => String(value || '')
      .replace(/\[[^\]\n]{1,40}\]/g, '')
      .replace(/[\s"'“”‘’（()）[\]{}《》「」『』—….,，、。！？!?；;:：-]/g, '');
    let match;
    let candidate = '';
    while ((match = sentenceRegex.exec(normalized)) !== null) {
      const piece = match[0].trim();
      if (!piece) continue;
      candidate = candidate ? `${candidate} ${piece}` : piece;
      if (spokenChars(candidate).length > 0) break;
    }
    if (!candidate) candidate = normalized.split(/\n+/)[0].trim();

    const hasSentenceEnd = /(?:[。！？!?；;…]+|\.{3,}|\.(?!\d))["'”’）)\]}》」』]*$/.test(candidate);
    const spokenLen = Array.from(spokenChars(candidate)).length;
    if ((!hasSentenceEnd && spokenLen > 15) || spokenLen > 60) {
      const clauses = candidate.match(/[^，,、：:——]+(?:[，,、：:——]+["'”’）)\]}》」』]*)?/g);
      if (clauses && clauses.length > 1) {
        let shortCandidate = '';
        for (const clause of clauses) {
          shortCandidate += clause;
          if (Array.from(spokenChars(shortCandidate)).length >= 6) break;
        }
        if (shortCandidate.trim()) candidate = shortCandidate.trim();
      }
    }
    const chars = Array.from(candidate);
    return chars.length > 80 ? chars.slice(0, 80).join('').trim() : candidate;
  }

  function formatDuration(seconds) {
    const num = Number(seconds);
    if (!Number.isFinite(num) || num <= 0) return '0秒';
    const total = Math.max(1, Math.round(num));
    if (total < 60) return `约 ${total}秒`;
    if (total < 3600) {
      const mins = Math.floor(total / 60);
      const secs = total % 60;
      return secs ? `约 ${mins}分${secs}秒` : `约 ${mins}分钟`;
    }
    const hours = Math.floor(total / 3600);
    const mins = Math.floor((total % 3600) / 60);
    const secs = total % 60;
    return `约 ${hours}小时${mins ? mins + '分' : ''}${secs ? secs + '秒' : ''}`;
  }

  function estimateDuration(text, options = {}) {
    const normalized = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
    if (!normalized) {
      return { seconds: 0, rawSeconds: 0, formatted: '0秒', chars: 0, clauses: 0, shortClauses: 0, pauseSeconds: 0, speechSeconds: 0 };
    }
    const speedInput = Number(options && options.speed);
    const speed = Number.isFinite(speedInput) && speedInput > 0 ? Math.max(0.5, Math.min(2, speedInput)) : 1;

    let tagSeconds = 0;
    const withoutTags = normalized.replace(/\[([^\]\n]{1,40})\]/g, (_, inner) => {
      const tag = inner.trim().toLowerCase();
      if (/^(?:long[ _-]?)?pause|停顿|长停顿$/.test(tag)) tagSeconds += 0.7;
      else if (/^short[ _-]?pause|短停顿|气口$/.test(tag)) tagSeconds += 0.35;
      else if (/laugh|sigh|gasp|chuckle|cough|clear.*throat|cry|sob|groan|yawn|笑|叹气|喘气|咳嗽/.test(tag)) tagSeconds += 0.55;
      return ' ';
    });

    const bodyForPauses = withoutTags.replace(/[。！？!?；;，,、：:…—.\s"'“”‘’（()）[\]{}《》「」『』-]+$/, '');
    const paragraphBreaks = (bodyForPauses.match(/\n+/g) || []).length;
    const ellipsesAndDashes = (bodyForPauses.match(/…+|——|--+|\.{3,}/g) || []).length;
    const cleanedForSimplePunct = bodyForPauses.replace(/…+|——|--+|\.{3,}/g, ' ');
    const sentenceEnds = (cleanedForSimplePunct.match(/[。！？!?；;]+|\.(?!\d)/g) || []).length;
    const clausePauses = (cleanedForSimplePunct.match(/[，,、：:]+/g) || []).length;

    let pauseSeconds = tagSeconds +
      paragraphBreaks * 0.65 +
      ellipsesAndDashes * 0.55 +
      sentenceEnds * 0.46 +
      clausePauses * 0.26;

    const rawClauses = withoutTags
      .split(/(?:\n+|…+|——|--+|\.{3,}|[。！？!?；;，,、：:]+|\.(?!\d))+/)
      .map(s => s.trim())
      .filter(Boolean);

    let speechSeconds = 0;
    let clauses = 0;
    let shortClauses = 0;

    for (const clause of rawClauses) {
      const cjkMatches = clause.match(/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uac00-\ud7af]/g) || [];
      const numberMatches = clause.match(/\d+(?:[.,]\d+)?%?/g) || [];
      const wordMatches = clause.replace(/\d+(?:[.,]\d+)?%?/g, ' ').match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || [];

      let digitUnits = 0;
      for (const numStr of numberMatches) {
        const digits = (numStr.match(/\d/g) || []).length;
        const symbols = (numStr.match(/[.,%]/g) || []).length;
        speechSeconds += digits * 0.30 + symbols * 0.22;
        digitUnits += digits + symbols;
      }

      speechSeconds += cjkMatches.length * 0.235;

      for (const word of wordMatches) {
        const len = word.length;
        speechSeconds += len <= 3 ? 0.24 : len <= 6 ? 0.34 : 0.34 + Math.ceil((len - 6) / 3) * 0.09;
      }

      const units = cjkMatches.length + digitUnits + wordMatches.length;
      if (units === 0) continue;
      clauses++;

      if (units <= 4) {
        shortClauses++;
        pauseSeconds += 0.18;
      } else if (units <= 8) {
        shortClauses++;
        pauseSeconds += 0.10;
      } else if (units >= 22) {
        pauseSeconds += Math.floor(units / 20) * 0.16;
      }
    }

    const totalRaw = clauses > 0 || tagSeconds > 0 ? (speechSeconds + pauseSeconds + 0.25) / speed : 0;
    const seconds = totalRaw > 0 ? Math.max(1, Math.round(totalRaw)) : 0;
    return {
      seconds,
      rawSeconds: Number(totalRaw.toFixed(2)),
      formatted: formatDuration(seconds),
      chars: Array.from(normalized).length,
      clauses,
      shortClauses,
      pauseSeconds: Number((pauseSeconds / speed).toFixed(2)),
      speechSeconds: Number((speechSeconds / speed).toFixed(2))
    };
  }

  function findQuoteDepthMap(text) {
    const depth = new Uint16Array(text.length + 1);
    const pairs = new Map([
      ['\u201c', '\u201d'], ['\u2018', '\u2019'], ['\u300c', '\u300d'], ['\u300e', '\u300f'],
      ['\uff08', '\uff09'], ['(', ')'], ['[', ']'], ['\u300a', '\u300b']
    ]);
    const closers = new Set(pairs.values());
    const stack = [];
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (pairs.has(ch)) stack.push(pairs.get(ch));
      else if (closers.has(ch)) {
        const idx = stack.lastIndexOf(ch);
        if (idx !== -1) stack.splice(idx, 1);
      }
      depth[i + 1] = stack.length;
    }
    return depth;
  }

  function splitTextIntoTwo(text, options = {}) {
    const normalized = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
    const speedInput = Number(options && options.speed);
    const speed = Number.isFinite(speedInput) && speedInput > 0 ? Math.max(0.5, Math.min(2, speedInput)) : 1;
    const maxSeconds = Number(options && options.maxSeconds) > 0 ? Number(options.maxSeconds) : 180;
    const totalDuration = estimateDuration(normalized, { speed });
    if (!normalized || (totalDuration.clauses < 2 && !/\s/.test(normalized))) {
      return { split: false, parts: normalized ? [normalized] : [], boundaryType: 'none', reason: 'none', durations: [totalDuration], partDurations: [totalDuration], totalDuration };
    }

    const quoteDepth = findQuoteDepthMap(normalized);
    const transitionRe = /^(?:\[[^\]\n]{1,40}\]\s*)*(?:(?:第[一二三四五六七八九十百]+[部分点条步章节段]?|其[次二三四]|另外|此外|同时|与此同时|不仅如此|相反|然而|但是|不过|接下来|紧接着|再来看|下面我们|现在我们|最后|总之|总的来说|总而言之|综上所述|换句话说|一方面|另一方面|首先|其次|再者|所以|因此|那么|说完了|聊完了|讲完了)|(?:next|second|secondly|third|finally|moreover|furthermore|however|meanwhile|in addition|on the other hand|lastly)\b)/i;

    const boundaryRe = /(?:[。！？!?；;，,、：:.]+["'”’）)\]}》」』]*)?\n+|([。！？!?]+|[；;]+|\.{3,}|…+|——|--+|\.(?!\d)(?=\s|$|["'”’）)\]}》」』])|[，,、：:]+)(["'”’）)\]}》」』]*)/g;
    const rawCandidates = [];
    let match;
    while ((match = boundaryRe.exec(normalized)) !== null) {
      const fullMatch = match[0];
      const punct = match[1] || fullMatch;
      const splitPos = match.index + fullMatch.length;
      if (splitPos <= 0 || splitPos >= normalized.length) continue;

      let type = 'clause';
      let baseScore = 35;
      if (fullMatch.includes('\n')) {
        type = 'paragraph';
        baseScore = 100;
      } else if (/[。！？!?]/.test(punct) || punct === '.') {
        const rightPreview = normalized.slice(splitPos).trim();
        if (transitionRe.test(rightPreview)) {
          type = 'transition';
          baseScore = 95;
        } else {
          type = 'sentence';
          baseScore = 82;
        }
      } else if (/[；;]/.test(punct) || /…|\.{3,}|——|--/.test(punct)) {
        type = 'semicolon';
        baseScore = 65;
      }

      rawCandidates.push({
        pos: splitPos,
        type,
        baseScore,
        insideQuote: quoteDepth[splitPos] > 0
      });
    }

    if (rawCandidates.length === 0) {
      const spaceRe = /\s+/g;
      while ((match = spaceRe.exec(normalized)) !== null) {
        const splitPos = match.index + match[0].length;
        if (splitPos > 0 && splitPos < normalized.length) {
          rawCandidates.push({ pos: splitPos, type: 'space', baseScore: 20, insideQuote: quoteDepth[splitPos] > 0 });
        }
      }
    }

    if (rawCandidates.length === 0) {
      return { split: false, parts: [normalized], boundaryType: 'none', reason: 'none', durations: [totalDuration], partDurations: [totalDuration], totalDuration };
    }

    const totalLen = normalized.length;
    let windowCandidates = rawCandidates.filter(c => {
      const charRatio = c.pos / totalLen;
      return charRatio >= 0.20 && charRatio <= 0.80;
    });
    if (windowCandidates.length === 0) windowCandidates = rawCandidates;

    const highTierInCore = windowCandidates.filter(c => {
      const charRatio = c.pos / totalLen;
      return c.baseScore >= 65 && charRatio >= 0.28 && charRatio <= 0.72;
    });
    const poolToEvaluate = highTierInCore.length > 0 ? highTierInCore : windowCandidates;

    let best = null;
    const totalRaw = Math.max(0.1, totalDuration.rawSeconds);

    for (const cand of poolToEvaluate) {
      const leftText = normalized.slice(0, cand.pos).trim();
      const rightText = normalized.slice(cand.pos).trim();
      if (!leftText || !rightText) continue;

      const d1 = estimateDuration(leftText, { speed });
      const d2 = estimateDuration(rightText, { speed });
      if (d1.seconds <= 0 || d2.seconds <= 0) continue;

      const sumRaw = Math.max(0.1, d1.rawSeconds + d2.rawSeconds);
      const ratio = d1.rawSeconds / sumRaw;
      const distFromHalf = Math.abs(ratio - 0.5);

      let score = cand.baseScore - distFromHalf * 180;
      if (cand.insideQuote) score -= 50;
      if (ratio < 0.28 || ratio > 0.72) score -= 35;
      if (totalRaw <= maxSeconds * 1.95 && (d1.seconds > maxSeconds || d2.seconds > maxSeconds)) {
        score -= 45;
      }

      if (!best || score > best.score) {
        best = {
          score,
          part1: leftText,
          part2: rightText,
          type: cand.type,
          d1,
          d2
        };
      }
    }

    if (!best) {
      return { split: false, parts: [normalized], boundaryType: 'none', reason: 'none', durations: [totalDuration], partDurations: [totalDuration], totalDuration };
    }

    return {
      split: true,
      parts: [best.part1, best.part2],
      boundaryType: best.type,
      reason: best.type,
      durations: [best.d1, best.d2],
      partDurations: [best.d1, best.d2],
      totalDuration
    };
  }

  function splitOverThreeMinutes(text, options = {}) {
    const maxSeconds = Number(options && options.maxSeconds) > 0 ? Number(options.maxSeconds) : 180;
    const normalized = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').trim();
    const totalDuration = estimateDuration(normalized, options);
    if (!normalized || totalDuration.seconds <= maxSeconds) {
      return { split: false, parts: normalized ? [normalized] : [], boundaryType: 'none', reason: 'none', durations: [totalDuration], partDurations: [totalDuration], totalDuration };
    }
    return splitTextIntoTwo(normalized, { ...options, maxSeconds });
  }

  function expandOverThreeMinutes(texts, options = {}) {
    const expanded = [];
    let splitCount = 0;
    for (const item of Array.isArray(texts) ? texts : []) {
      const text = String(item || '').trim();
      if (!text) continue;
      const result = splitOverThreeMinutes(text, options);
      if (result.split && result.parts.length === 2) {
        expanded.push(result.parts[0], result.parts[1]);
        splitCount++;
      } else {
        expanded.push(text);
      }
    }
    return { texts: expanded, splitCount };
  }

  function splitTexts(text, mode = 'lines') {
    const normalized = String(text || '').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
    const items = mode === 'whole' ? [normalized] : normalized.split(mode === 'paragraphs' ? /\n[\t ]*\n+/ : /\n/);
    return items.map(item => item.trim()).filter(Boolean);
  }

  function summarize(items) {
    const result = { total: items.length, scanned: 0, known: 0, remaining: 0, available: 0, exhausted: 0, unknown: 0, invalid: 0, limited: 0, permissions: 0, restricted: 0 };
    const accounts = new Map();
    for (const item of items) {
      if (!item.scanned) continue;
      result.scanned++;
      if (item.invalid === true) { result.invalid++; continue; }
      if (item.disabled) { result.restricted++; continue; }
      if (item.quotaState === 'permission') { result.permissions++; continue; }
      if (item.quotaState === 'quota') { result.limited++; continue; }
      const known = Number.isFinite(item.remaining);
      if (known) {
        result.known++;
        const id = item.accountId || item.key;
        const remaining = Math.max(0, item.remaining);
        accounts.set(id, accounts.has(id) ? Math.min(accounts.get(id), remaining) : remaining);
      } else result.unknown++;
      if (item.limited) result.limited++;
      else if (known && (item.remaining <= 0 || item.ceiling <= 0)) result.exhausted++;
      else if (known) result.available++;
    }
    result.remaining = Array.from(accounts.values()).reduce((sum, value) => sum + value, 0);
    return result;
  }

  class Pool {
    constructor(items) {
      this.accounts = new Map();
      this.entries = items.map(item => {
        const accountId = item.accountId || item.key;
        const remaining = Number.isFinite(item.remaining) ? Math.max(0, item.remaining) : null;
        let account = this.accounts.get(accountId);
        if (!account) {
          account = { remaining, busy: false, readyAt: 0 };
          this.accounts.set(accountId, account);
        } else if (remaining !== null) {
          account.remaining = account.remaining === null ? remaining : Math.min(account.remaining, remaining);
        }
        const readyAt = Number.isFinite(item.readyAt) ? Math.max(0, item.readyAt) : 0;
        account.readyAt = Math.max(account.readyAt, readyAt);
        return { ...item, account, busy: false, uses: 0, disabled: Boolean(item.disabled),
          ceiling: Number.isFinite(item.ceiling) ? Math.max(0, item.ceiling) : Infinity, readyAt,
          priorityRank: Number.isFinite(item.priorityRank) ? item.priorityRank : 0,
          priorityCoverage: Number.isFinite(item.priorityCoverage) ? item.priorityCoverage : 0,
          priorityReserved: Number.isFinite(item.priorityReserved) ? item.priorityReserved : 0 };
      });
    }

    candidates(cost, tried) {
      return this.entries.filter(entry => !entry.disabled && !tried.has(entry.key) && cost <= entry.ceiling &&
        (entry.account.remaining === null || entry.account.remaining >= cost));
    }

    acquire(cost, tried) {
      const comparePriority = (a, b) => a.priorityRank - b.priorityRank || b.priorityCoverage - a.priorityCoverage || a.priorityReserved - b.priorityReserved;
      const available = this.candidates(cost, tried)
        .filter(entry => Math.max(entry.readyAt, entry.account.readyAt) <= Date.now())
        .sort((a, b) => comparePriority(a, b) || a.uses - b.uses || (b.account.remaining ?? -1) - (a.account.remaining ?? -1));
      const best = available[0];
      // Busy preferred accounts are not exhausted: wait instead of spending protected credits.
      const entry = best && available.find(item => !item.busy && !item.account.busy && comparePriority(item, best) === 0);
      if (!entry) return null;
      entry.busy = true;
      entry.account.busy = true;
      entry.uses++;
      return entry;
    }

    release(entry) {
      entry.busy = false;
      entry.account.busy = false;
    }

    debit(entry, cost) {
      if (entry.account.remaining !== null) entry.account.remaining = Math.max(0, entry.account.remaining - cost);
    }

    summary() {
      const accounts = new Set();
      let remaining = 0;
      let unknown = 0;
      let available = 0;
      for (const entry of this.entries) {
        if (entry.disabled) continue;
        available++;
        if (accounts.has(entry.account)) continue;
        accounts.add(entry.account);
        if (entry.account.remaining === null) unknown++;
        else remaining += entry.account.remaining;
      }
      return { remaining, unknown, available, total: this.entries.length };
    }
  }

  async function run(tasks, pool, options) {
    const sleep = options.sleep || (ms => new Promise(resolve => setTimeout(resolve, ms)));
    const stopped = options.stopped || (() => false);
    const emit = (task, status, entry, message = '') => options.onStatus && options.onStatus(task, status, entry, message);
    let cursor = 0;

    async function processTask(task) {
      const cost = options.estimate(task.text);
      const tried = new Set();
      let lastMessage = '';
      while (!stopped()) {
        const entry = pool.acquire(cost, tried);
        if (!entry) {
          if (pool.candidates(cost, tried).length > 0) {
            emit(task, 'waiting', null, '等待可用账号');
            await sleep(150);
            continue;
          }
          const savedReason = pool.entries.find(item => item.disabled && item.skipReason)?.skipReason;
          emit(task, 'failed', null, lastMessage || [`没有可用 API 能承接这段文案（预计 ${cost} credits）`, savedReason].filter(Boolean).join('\n'));
          return;
        }
        let charged = false;
        try {
          let result;
          for (let retry = 0; ; retry++) {
            emit(task, 'running', entry, retry ? '限流后重试' : '正在生成');
            try {
              result = await options.generate(task, entry);
              break;
            } catch (error) {
              if (classifyError(error) !== 'rate' || retry >= 2) throw error;
              const delay = Number(error.retryAfterMs);
              const waitMs = Math.max(1000 * Math.pow(2, retry), Number.isFinite(delay) ? Math.max(0, delay) : 0);
              if (waitMs > 10000) throw error;
              emit(task, 'waiting', entry, `请求限流，${Math.ceil(waitMs / 1000)} 秒后重试`);
              // Short waits make pause responsive while respecting Retry-After.
              for (let elapsed = 0; elapsed < waitMs && !stopped(); elapsed += 250) await sleep(Math.min(250, waitMs - elapsed));
              if (stopped()) { emit(task, 'pending', null, '已暂停'); return; }
            }
          }
          const actualCost = Number.isFinite(result.cost) && result.cost >= 0 ? result.cost : cost;
          pool.debit(entry, actualCost);
          charged = true;
          if (options.onQuota) options.onQuota(pool, entry);
          emit(task, 'downloading', entry, '正在下载');
          await options.download(task, result, entry);
          emit(task, 'done', entry, '已完成');
          return;
        } catch (error) {
          const kind = charged ? 'download' : classifyError(error);
          lastMessage = error.message || '请求失败';
          if (kind === 'quota') {
            entry.ceiling = Math.min(entry.ceiling, cost - 1);
            // A key-specific credit limit does not invalidate sibling keys.
            tried.add(entry.key);
          } else if (kind === 'key' || kind === 'access' || kind === 'format') {
            entry.disabled = true;
            entry.skipReason = lastMessage;
            tried.add(entry.key);
          } else if (kind === 'rate') {
            const delay = Number(error.retryAfterMs);
            entry.readyAt = Date.now() + Math.max(30000, Number.isFinite(delay) ? Math.max(0, delay) : 0);
            entry.account.readyAt = entry.readyAt;
            for (const sibling of pool.entries) if (sibling.account === entry.account) tried.add(sibling.key);
          } else {
            if (kind === 'uncertain') {
              pool.debit(entry, cost);
              for (const sibling of pool.entries) if (sibling.account === entry.account) sibling.disabled = true;
              if (options.onSkip) options.onSkip(entry, error, kind, cost);
              if (options.onQuota) options.onQuota(pool, entry);
            }
            emit(task, kind === 'download' ? 'download_failed' : kind === 'uncertain' ? 'uncertain' : 'failed', entry, lastMessage);
            if (options.onFatal && kind === 'policy') options.onFatal(kind, lastMessage);
            return;
          }
          if (options.onSkip) options.onSkip(entry, error, kind, cost);
          if (options.onQuota) options.onQuota(pool, entry);
          emit(task, 'waiting', entry, `切换 API：${lastMessage}`);
        } finally {
          pool.release(entry);
        }
      }
      emit(task, 'pending', null, '已暂停');
    }

    async function worker() {
      while (!stopped() && cursor < tasks.length) {
        const task = tasks[cursor++];
        await processTask(task);
      }
    }
    const concurrency = Math.max(1, Math.min(4, Number(options.concurrency) || 2));
    await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, worker));
  }

  return { Pool, GenerationSkips, run, estimateCost, extractFirstSentence, formatDuration, estimateDuration, splitTextIntoTwo, splitOverThreeMinutes, expandOverThreeMinutes, classifyError, isFormatAccessError, formatFromError, splitTexts, summarize };
});
