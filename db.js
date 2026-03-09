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
export function partExists(db, id) {
  return new Promise((resolve) => {
    const tx = db.transaction("parts", "readonly");
    const store = tx.objectStore("parts");
    const request = store.get(id);

    request.onsuccess = () => {
      resolve(!!request.result);
    };
  });
}