workbox.core.skipWaiting();
workbox.core.clientsClaim();

const routeCache = [
  'localhost',
  'https://media.graphcms.com',
  'https://pwa-web.herokuapp.com'
];

workbox.routing.registerRoute(
  new RegExp(routeCache.join('|')),
  new workbox.strategies.StaleWhileRevalidate()
);

const preCache = [
  '/main.bundle.js',
  '/listPage.bundle.js',
  '/detailPage.bundle.js',
  '/index.html',
  '/list/index.html',
  '/detail/index.html',
];

workbox.precaching.precache(preCache);
