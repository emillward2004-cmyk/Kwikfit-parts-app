self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("parts-app").then(cache =>
      cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/app.js"
      ])
    )
  );
});