// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        // Is not local host. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              // At this point, the old content will have been purged and
              // the fresh content will have been added to the cache.
              // It's the perfect time to display a "New content is
              // available; please refresh." message in your web app.
              console.log('New content is available; please refresh.');

              // Execute callback
              if (config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log('Content is cached for offline use.');

              // Execute callback
              if (config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl)
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

/* Static */

const CACHE_VERSION = 1;
const STATIC_CACHE = `static-cache-v${CACHE_VERSION}`;
const IMAGES_CACHE = `images-cache-v`;
const OTHERS_CACHE = `others-cache-v`;
const allCaches = [
  STATIC_CACHE,
  IMAGES_CACHE,
  OTHERS_CACHE
];

/* Functions */

function isImageURL(url) {
  let img_types = ["jpg", "jpeg", "png", "gif"];
  var isImage = false;
  for(let type of img_types) {
    if(url.endsWith(type)) { isImage = true; break; }
  }
  return isImage;
}

function storeInCache(cacheName, requestClone, responseClone) {
  return caches.open(cacheName).then(function(cache){
    return cache.put(requestClone, responseClone)
  });
}

function isExternalResources(url) {
  return url.startsWith('http');
}

/* Listeners */

window.self.addEventListener("install", function(event){
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function(cache){
      console.log("Current Cache: ", STATIC_CACHE);
      return cache.addAll([
        "/",
        "/index.html"
      ]);
    })
  );
});

window.self.addEventListener("activate", function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      console.log("Clearing Old Caches...");
      Promise.all(
        cacheNames.map(function(cacheName){
          if(!allCaches.includes(cacheName)) {
            console.log(`Deleting: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

window.self.addEventListener("fetch", function(event){
  if(event.request.method === "GET") {
    event.respondWith(
      caches.match(event.request).then(function(result){
        if(result) { return result; }
        var url = new URL(event.request.url);
        try {
          return fetch(event.request).then(function(response){
            // if(url.origin !== location.origin) { useCache = OTHERS_CACHE; }
            // else { useCache = isImageURL(event.request.url) ? IMAGES_CACHE : STATIC_CACHE; }
            let useCache = isImageURL(event.request.url) ? IMAGES_CACHE : STATIC_CACHE;
            storeInCache(useCache, event.request.clone(), response.clone());
            return response;
          });
        }
        catch(e) {
          console.log(e);
        }
      })
    );
  }
  else {
    event.respondWith( fetch(event.request) );
  }
});


export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
