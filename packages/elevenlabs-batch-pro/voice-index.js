(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.ElevenVoiceIndex = api;
})(typeof globalThis === 'object' ? globalThis : this, function () {
  'use strict';
  const allowed = new Set(['premade', 'cloned', 'generated', 'professional']);
  function familyId(voice) {
    if (!allowed.has(voice.category) || voice.category !== 'premade' && voice.is_owner === false) return '';
    return voice.category === 'premade' ? voice.voice_id : 'own:' + encodeURIComponent(String(voice.name || voice.voice_id).trim());
  }
  function build(catalog) {
    const families = new Map();
    for (const entry of catalog) for (const [key, voice] of entry.sources) {
      const id = familyId(voice);
      if (!id) continue;
      let family = families.get(id);
      if (!family) {
        family = { id, name: String(voice.name || voice.voice_id).trim(), category: voice.category === 'premade' ? 'premade' : 'personal', byKey: new Map(), voiceIds: new Set() };
        families.set(id, family);
      }
      family.voiceIds.add(voice.voice_id);
      if (!family.byKey.has(key)) family.byKey.set(key, []);
      family.byKey.get(key).push(voice);
    }
    for (const family of families.values()) for (const voices of family.byKey.values()) voices.sort((a, b) => a.voice_id.localeCompare(b.voice_id));
    return families;
  }
  function routes(family, overrides = {}) {
    const result = new Map();
    if (!family) return result;
    for (const [key, voices] of family.byKey) {
      const selected = voices.find(voice => voice.voice_id === overrides[key]) || voices[0];
      if (selected) result.set(key, selected.voice_id);
    }
    return result;
  }
  function freshQuota(info, now = Date.now()) {
    return Boolean(info && !info.needsQuotaRefresh && Number.isFinite(info.ts) && info.ts <= now && now - info.ts < 300000 &&
      (!info.resetUnix || info.resetUnix * 1000 > now));
  }

  function allocationPriorities(items, libraries, families, selected, policy = 'prefer', now = Date.now()) {
    const accounts = new Map();
    const byKey = new Map();
    for (const item of items) {
      const id = item.accountId || item.key;
      if (!accounts.has(id)) accounts.set(id, { personal: new Set(), known: true, premade: false });
      const account = accounts.get(id);
      byKey.set(item.key, account);
      const library = libraries.get(item.key);
      const known = Boolean(library && Array.isArray(library.voices) && Number.isFinite(library.ts) && library.ts > 0 && library.ts <= now && !library.error);
      account.known = account.known && known;
      account.premade = account.premade || Boolean(library && Array.isArray(library.voices) && library.voices.some(voice => voice.category === 'premade'));
    }
    const coverage = new Map();
    for (const family of families.values()) {
      if (family.category === 'premade') continue;
      const providers = new Set();
      for (const key of family.byKey.keys()) {
        const account = byKey.get(key);
        if (account) { providers.add(account); account.personal.add(family.id); }
      }
      coverage.set(family.id, providers.size);
    }
    const result = new Map();
    for (const item of items) {
      const account = byKey.get(item.key);
      const others = [...account.personal].filter(id => id !== selected?.id);
      const systemOnly = account.known && account.premade && account.personal.size === 0;
      const rank = others.length ? 2 : account.known && (account.premade || account.personal.size) ? 0 : 1;
      result.set(item.key, { rank, coverage: others.length ? Math.min(...others.map(id => coverage.get(id))) : 0,
        reserved: others.length, systemOnly, known: account.known,
        blocked: selected?.category === 'premade' && policy === 'protect' && !systemOnly });
    }
    return result;
  }

  return { familyId, build, routes, freshQuota, allocationPriorities };
});
