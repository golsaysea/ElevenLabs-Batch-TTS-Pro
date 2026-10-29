const ElevenAudioStore = (() => {
  let database;
  function open() {
    if (!database) database = new Promise((resolve, reject) => {
      const request = indexedDB.open('elevenlabs-pending-audio', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('audio');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => { database = null; reject(request.error); };
    });
    return database;
  }
  async function transact(mode, action) {
    const db = await open();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('audio', mode);
      const request = action(transaction.objectStore('audio'));
      transaction.oncomplete = () => resolve(request.result);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error || new Error('音频缓存中断'));
    });
  }
  return {
    put: (id, result) => transact('readwrite', store => store.put(result, id)),
    get: id => transact('readonly', store => store.get(id)),
    remove: id => transact('readwrite', store => store.delete(id))
  };
})();
