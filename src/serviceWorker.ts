import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { precacheAndRoute } from 'workbox-precaching';
import { skipWaiting, clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';

enum CacheName {
  Data = 'data-cache',
  TeamImages = 'team-images-cache',
  PlayerImages = 'player-images-cache',
}

skipWaiting();
clientsClaim();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST || []);

registerRoute(
  ({ url }) =>
    url.origin === 'https://cors-anywhere.herokuapp.com' &&
    url.pathname.startsWith('/https://stats.nba.com/stats/leagueLeaders'),
  new CacheFirst({
    cacheName: CacheName.Data,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        // Only cache requests for a day
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.origin === 'https://stats.nba.com' && url.pathname.startsWith('/media/img/teams/logos'),
  new CacheFirst({
    cacheName: CacheName.TeamImages,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        // Only cache requests for a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  }),
);

registerRoute(
  ({ url }) => url.origin === 'https://ak-static.cms.nba.com' && url.pathname.startsWith('/wp-content/uploads/headshots/nba/latest'),
  new CacheFirst({
    cacheName: CacheName.PlayerImages,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        // Only cache requests for a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      }),
    ],
  }),
)
