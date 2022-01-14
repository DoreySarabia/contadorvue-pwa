// Service Worker 
const CACHE_NAME = "v1_cache_contador_app_vue"
// Para tener listado de lo que se almacena
const urlsToCache = [
    "./",
    ",/img/icon.png",
    ",/img/icon32.png",
    ",/img/icon64.png",
    ",/img/icon128.png",
    ",/img/icon256.png",
    ",/img/icon512.png",
    ",/img/icon1024.png",
    "./js/main.js",
    "https://unpkg.com/vue@next",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css",
    "./js/mount.js",
    ",/css/styles.css"
];
// Acceder a eventos
// Acceder a serviceworker con self y ejecutar del lado del navegador
self.addEventListener("install", (e) => {
    // escucha y ejecuta
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            // trabaja cache 1x1
            cache => cache
            .addAll(urlsToCache)
            .then(
                // espera a que llegue todo cache
                () => self.skipWaiting())
            .catch(
                // en caso de fallar mostrar el por que
                (err) => console.log(err))
        )
    )
})

// activar cache y compararlo
// evento que verifica que todo funcione correctamente
self.addEventListener("activate", (e) => {
    // almacenar todo cache en la conts
    const cacheWhiteList = [CACHE_NAME]
    // espera que todo se ejecute
    e.waitUntil(
        caches.keys().then(
            // en caso de recibir la cache dar el nombre para comparar
            cacheNames => {
                return Promise.all(
                    // recibir la colección de nombres y mapear url 1x1
                    cacheNames.map((cacheName) =>{
                            if(cacheWhiteList.indexOf(cacheName) === -1){
                                return caches.delete(cacheName)
                            }
                        })
                )
            })
            .then(
            // en caso de no ser alterado actualiza cache
            () => self.clients.claim())
    )
})


// encargado de peticiones, descargar cache

self.addEventListener("fetch", (e) => {
    // responder cuando algo pase
    e.respondWith(
        // hacer match con la peticion
        caches.match(e.request).then((
            res) => {
                if (res) {
                    return res
                }
                // recibe entrada y responde
               return fetch(e.request)
            })
    )
})