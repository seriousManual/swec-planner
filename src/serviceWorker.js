import { clearCaches, fillStaticCache, tryToFetchAndStoreInCache } from './lib/cache';
import { receivedPushNotification } from './lib/state/reducers/notifications';

/* eslint no-restricted-globals: "off" */

const { assets } = global.serviceWorkerOption;
const STATIC_RESOURCES = [
  '/',
  '/static/vapid-keys.public.json',
  '/logo/logo144x144.png',
  '/logo/mp.png'
].concat(assets);

self.addEventListener('install', () => {
  console.log('install');

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('activate');

  event.waitUntil((async () => {
    await clearCaches(caches);
    await fillStaticCache(caches, STATIC_RESOURCES);
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  console.log(`fetch: ${request.method} ${request.url}`);

  const url = new URL(request.url);

  if (request.method.toLowerCase() !== 'get') {
    console.log('passing non-GET request');
    return;
  }

  if (!url.protocol.startsWith('http')) {
    console.log('passing non-HTTP(s) request');
    return;
  }

  if (url.pathname.startsWith('/sockjs-node/')) {
    console.log('passing WebSocket request');
    return;
  }

  event.respondWith(tryToFetchAndStoreInCache(caches, request));
});

function notifyClientOfSessionUpdate(client, payload) {
  const messageChannel = new MessageChannel();
  client.postMessage(receivedPushNotification(payload), [messageChannel.port2]);
}

self.addEventListener('push', event => {
  let content = event.data.json();

  const title = content.notification.title;
  const options = {
    body: content.notification.body,
    icon: '/logo/logo192x192.png'
  }

  self.clients.matchAll()
    .then(clients => {
      clients.forEach(client => notifyClientOfSessionUpdate(client, { title, ...options }));
    })
    .catch(console.error);
});
