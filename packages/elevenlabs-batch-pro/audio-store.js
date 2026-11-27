const ElevenAudioStore = (() => {
  let database;
  function open() {
    if (typeof indexedDB === 'undefined') return Promise.reject(new Error('IndexedDB unavailable'));
    if (!database) database = new Promise((resolve, reject) => {
      const request = indexedDB.open('elevenlabs-pending-audio', 2);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('audio')) db.createObjectStore('audio');
        if (!db.objectStoreNames.contains('handles')) db.createObjectStore('handles');
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => { database = null; reject(request.error); };
    });
    return database;
  }
  async function transact(storeName, mode, action) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, mode);
      const request = action(transaction.objectStore(storeName));
      transaction.oncomplete = () => resolve(request.result);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error || new Error('音频缓存中断'));
    });
  }
  return {
    put: (id, result) => transact('audio', 'readwrite', store => store.put(result, id)),
    get: id => transact('audio', 'readonly', store => store.get(id)),
    remove: id => transact('audio', 'readwrite', store => store.delete(id)),
    putHandle: (id, handle) => transact('handles', 'readwrite', store => store.put(handle, id)),
    getHandle: id => transact('handles', 'readonly', store => store.get(id)),
    removeHandle: id => transact('handles', 'readwrite', store => store.delete(id))
  };
})();
