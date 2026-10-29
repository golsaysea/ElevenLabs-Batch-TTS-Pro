(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ElevenApiKeys = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';

  function isConfirmedInvalid(error) {
    const code = String(error.code || error.errorCode || '').toLowerCase();
    return [400, 401].includes(Number(error.status || error.httpStatus)) && ['invalid_api_key', 'missing_api_key'].includes(code);
  }

  function isApiKeyIdError(error) {
    const message = String(error.rawMessage || error.errorMessage || error.message || '');
    return isConfirmedInvalid(error) && /\bAPI\s+key\s+ID\s+used\s+as\s+API\s+key\b/i.test(message);
  }

  function isMissingUserRead(error) {
    if (![401, 403].includes(Number(error.status || error.httpStatus))) return false;
    const message = String(error.rawMessage || error.errorMessage || error.message || '');
    return /(?:missing|lacks?|lacking|requires?|required|(?:do|does) not have|\u7f3a\u5c11|\u7f3a\u5931|\u9700\u8981)[^.!?;\n]{0,180}\buser_read\b|\buser_read\b[^.!?;\n]{0,100}(?:is missing|is required|not (?:enabled|granted)|\u672a\u5f00\u542f|\u672a\u6388\u4e88)/i.test(message);
  }

  function planCleanup(items, cache, now = Date.now(), options = {}) {
    const seen = new Set();
    const kept = [], invalidKeys = [], duplicateKeys = [], permissionKeys = [];
    for (const item of items) {
      if (!item || typeof item.key !== 'string' || !item.key) { kept.push(item); continue; }
      if (seen.has(item.key)) { duplicateKeys.push(item.key); continue; }
      seen.add(item.key);
      const info = cache[item.key];
      const fresh = info && !info.needsQuotaRefresh && Number.isFinite(info.ts) && info.ts <= now && now - info.ts < 300000;
      if (fresh && info.invalid === true) invalidKeys.push(item.key);
      else if (fresh && options.removeMissingUserRead && isMissingUserRead(info)) permissionKeys.push(item.key);
      else kept.push(item);
    }
    return { kept, invalidKeys, duplicateKeys, permissionKeys, removed: items.length - kept.length };
  }

  function voiceAccessError(error) {
    const code = String(error.code || '').toLowerCase();
    if ((Number(error.status) === 404 && code === 'voice_not_found') ||
        (Number(error.status) === 403 && code === 'voice_access_denied')) return 'unavailable';
    return 'unknown';
  }

  function quotaErrorState(error) {
    const status = Number(error.status || 0);
    const code = String(error.code || '').toLowerCase();
    if (!status || status >= 500) return 'network';
    if (status === 429) return 'rate';
    if (isConfirmedInvalid(error)) return 'invalid';
    if (isMissingUserRead(error)) return 'permission';
    if (['insufficient_permissions', 'missing_permissions'].includes(code)) return 'permission';
    if (status === 402 || /^(quota_exceeded|credit_limit_exceeded|insufficient_credits|insufficient_quota)$/.test(code)) return 'quota';
    if ([400, 401, 403].includes(status) && (code === 'workspace_access_denied' ||
      /^ip.*(allow|restricted|blocked)/.test(code) || /^(api_key_expired|expired_api_key|key_expired)$/.test(code))) return 'restricted';
    return 'unknown';
  }

  function normalizeQuotaInfo(info) {
    if (!info || typeof info !== 'object') return null;
    if (info.invalid === true || isConfirmedInvalid(info)) return { ...info, left: null, quotaState: 'invalid', invalid: true, disabled: true };
    if (isMissingUserRead(info)) return { ...info, quotaState: 'permission', invalid: false, disabled: false };
    if (info.quotaState === 'ok' && !Number.isFinite(info.left)) return { ...info, quotaState: 'unknown', invalid: false, disabled: false,
      errorCode: info.errorCode || 'cached_quota_missing', errorMessage: info.errorMessage || '旧额度记录未保存有效数值和完整原因，请重新查询此账号。' };
    if (['ok', 'permission', 'quota', 'restricted', 'rate', 'network', 'unknown'].includes(info.quotaState)) {
      return { ...info, invalid: false, disabled: info.quotaState === 'restricted' };
    }
    if (info.disabled || !Number.isFinite(info.left)) {
      // Legacy disabled flags do not establish that a key is invalid. Recheck instead of guessing.
      return { ...info, left: null, disabled: false, invalid: false, quotaState: 'unknown', needsQuotaRefresh: true };
    }
    return { ...info, quotaState: 'ok' };
  }

  function quotaBalance(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) return null;
    const subscription = data.subscription || data;
    const number = value => typeof value === 'number' || typeof value === 'string' && value.trim() ? Number(value) : NaN;
    const limit = number(subscription.character_limit), used = number(subscription.character_count);
    if (!Number.isFinite(limit) || !Number.isFinite(used) || limit < 0 || used < 0) return null;
    const reset = number(subscription.next_character_count_reset_unix);
    return { left: Math.max(0, limit - used), resetUnix: Number.isFinite(reset) ? Math.max(0, reset) : 0 };
  }

  function queryDiagnostic(info, subject = 'quota', key = '') {
    const name = { quota: '额度查询', voice: '当前声音查询', library: '声音库查询' }[subject] || '接口查询';
    if (!info) return `${name}：${subject === 'library' ? '未汇总声音库' : subject === 'voice' ? '尚未核验此 Voice ID' : '尚未扫描额度'}，不代表 Key 无效。`;
    if (subject === 'quota' && Number.isFinite(info.left) && !info.needsQuotaRefresh && (!info.quotaState || info.quotaState === 'ok')) return '';
    if (subject === 'voice' && info.access === 'available') return '';
    if (subject === 'library' && !info.error && Number.isFinite(info.ts) && info.ts > 0 && info.ts <= Date.now()) {
      return Array.isArray(info.voices) && info.voices.length ? '' : `${name}：已查询，但声音列表为空，尚不能确认声音分布。`;
    }
    const status = Number(info.httpStatus || info.status) || 0;
    const code = String(info.errorCode || info.code || '');
    const raw = String(info.errorMessage || info.rawMessage || info.error || info.message || '');
    const permission = raw.match(/\b(user_read|voices_read|models_read|subscription_read|history_read|text_to_speech)\b/i)?.[0];
    let reason = '接口未说明具体原因', advice = '保留此 API，重新查询后查看接口返回；读取结果不代表生成权限。';
    if (isApiKeyIdError({ status, code, rawMessage: raw })) {
      reason = '粘贴的是 Key ID，不是 API 密钥';
      advice = '请在 ElevenLabs 后台创建或轮换密钥，复制当次显示的完整 API Key；不能给 Key ID 加 sk_ 来转换。';
    }
    else if (info.invalid || isConfirmedInvalid({ status, code })) { reason = '接口明确返回密钥无效'; advice = '确认完整 Key、有效期和是否已撤销。'; }
    else if (code === 'query_timeout' || info.errorType === 'AbortError') { reason = '读取超时'; advice = '检查网络或代理后重查，不据此判定 Key 无效。'; }
    else if (status === 429 || info.quotaState === 'rate') { reason = '查询限流'; advice = '稍后重新查询，不据此判定 Key 无效。'; }
    else if (status >= 500) { reason = 'ElevenLabs 服务暂时异常'; advice = '稍后重新查询，当前不能据此判定 Key 无效。'; }
    else if (subject === 'voice' && (info.access === 'unavailable' || voiceAccessError({ status, code }) === 'unavailable')) {
      reason = '此账号未找到或无权访问所选声音'; advice = '核对该账号的 Voice ID，不据此判断整个 Key 无效。';
    }
    else if (code === 'voice_id_mismatch') { reason = '返回的 Voice ID 与所选 ID 不一致'; advice = '核对该账号的声音 ID 后重新查询，未禁止尝试生成。'; }
    else if (/invalid_(quota|voice)_response|invalid_voice_pagination|cached_quota_missing/.test(code)) { reason = '响应或旧记录缺少有效数据'; advice = '重新查询此账号；缺少字段不等于额度为零或 Key 无效。'; }
    else if (info.quotaState === 'permission' || ['insufficient_permissions', 'missing_permissions'].includes(code) || isMissingUserRead({ status, rawMessage: raw }) || permission && /missing|lack|not (enabled|granted)|缺少|缺失|未开启|未授予/i.test(raw)) {
      reason = permission ? `缺少 ${permission} 读取权限` : '读取权限不足（接口未指出具体权限）';
      advice = permission ? `为此 Key 开启 ${permission} 后重新查询；读取权限与生成权限分开。` : '检查此 Key 的相关读取权限后重查，不建议直接删除。';
    } else if (info.quotaState === 'quota' || /^(quota_exceeded|credit_limit_exceeded|insufficient_credits|insufficient_quota)$/.test(code)) {
      reason = '接口返回额度或 credit limit 限制'; advice = '核对服务器额度与此 Key 的限制后重查，不据此判定 Key 无效。';
    } else if (info.quotaState === 'restricted' || /workspace_access_denied|^ip_|key_expired|expired_api_key|api_key_expired/.test(code)) {
      reason = '访问或有效期受限'; advice = '按接口原始提示检查工作区、有效期或 IP 白名单。';
    } else if (code === 'query_network_error' || info.quotaState === 'network') {
      reason = '网络请求未成功'; advice = '可能涉及网络、代理或浏览器拦截；浏览器未提供更细原因，请检查后重查。';
    } else if (status === 401 || status === 403) {
      reason = '读取接口鉴权未确认'; advice = '仅凭此状态不能确认 Key 无效；检查接口权限、有效期或工作区访问后重查。';
    } else if (!status && !code && !raw) {
      reason = '旧记录没有保存原因'; advice = '重新查询此账号获取具体响应，不猜测为 Key 无效。';
    }
    const cause = [info.endpoint ? 'GET ' + info.endpoint : '', status ? 'HTTP ' + status : '', code].filter(Boolean).join(' · ');
    const previous = Array.isArray(info.queryAttempts) ? info.queryAttempts.slice(0, 2).map(item =>
      ['先前查询 ' + (item.endpoint || ''), item.httpStatus ? 'HTTP ' + item.httpStatus : '', item.errorCode, item.errorMessage].filter(Boolean).join(' · ')) : [];
    const text = [name + '：' + reason, cause, raw.slice(0, 500), ...previous, advice].filter(Boolean).join('\n');
    return key ? text.split(key).join('[已隐藏]') : text;
  }

  return { isConfirmedInvalid, isApiKeyIdError, isMissingUserRead, planCleanup, voiceAccessError, quotaErrorState, normalizeQuotaInfo, quotaBalance, queryDiagnostic };
});
