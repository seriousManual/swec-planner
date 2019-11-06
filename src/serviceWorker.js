import debug from 'debug'

import { clearCaches, fillStaticCache, tryToFetchAndStoreInCache } from './lib/cache';

const localDebug = debug('planner:sw');

/* eslint no-restricted-globals: "off" */

const { assets } = global.serviceWorkerOption;
const STATIC_RESOURCES = [
  '/',
  '/static/vapid-keys.public.json',
  '/logo/logo144x144.png',
  '/logo/mp.png'
].concat(assets);

self.addEventListener('install', () => {
  localDebug('install');

  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  localDebug('activate');

  event.waitUntil((async () => {
    await clearCaches(caches);
    await fillStaticCache(caches, STATIC_RESOURCES);
  })());
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  localDebug(`fetch: ${request.method} ${request.url}`);

  const url = new URL(request.url);

  if (request.method.toLowerCase() !== 'get') {
    localDebug('passing non-GET request');
    return;
  }

  if (!url.protocol.startsWith('http')) {
    localDebug('passing non-HTTP(s) request');
    return;
  }

  if (url.pathname.startsWith('/sockjs-node/')) {
    localDebug('passing WebSocket request');
    return;
  }

  event.respondWith(tryToFetchAndStoreInCache(caches, request));
});

function notifyClientOfSessionUpdate(client, payload) {
  const messageChannel = new MessageChannel();
  client.postMessage(payload, [messageChannel.port2]);
}

self.addEventListener('push', event => {
  let action = event.data.json();

  self.clients.matchAll()
    .then(clients => {
      clients.forEach(client => notifyClientOfSessionUpdate(client, action));
    })
    .catch(error);
});
