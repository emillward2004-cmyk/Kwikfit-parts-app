const DB_NAME = "KwikfitPartsDB";
const STORE_NAME = "parts";

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      const store = db.createObjectStore(STORE_NAME, {
        keyPath: "id"
      });

      store.createIndex("category", "category");
      store.createIndex("partName", "partName");
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}