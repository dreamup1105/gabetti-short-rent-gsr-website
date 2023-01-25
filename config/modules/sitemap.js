import SitemapRoutes from '../../api_sitemap.json';
export const sitemap = {
  exclude: [
    '/account',
    '/it/account',
    '/en/account',
    '/account/**',
    '/it/account/**',
    '/en/account/**',
    '/reservations',
    '/it/reservations',
    '/en/reservations',
    '/reservations/**',
    '/it/reservations/**',
    '/en/reservations/**',
    '/wishlists',
    '/it/wishlists',
    '/en/wishlists',
  ],
  routes() {
    const permalinks = SitemapRoutes;

    function getPriority(entity) {
      let priority = 0.5; // default priority for other stuffs

      if (entity.type === 'Accommodation') {
        priority = 0.8;
      }
      if (entity.type === 'Destination') {
        priority = 0.7;
      }
      return priority;
    }

    const routes = permalinks.map((entity) => {
      return {
        url: `/${entity.locale}/${entity.permalink}`,
        priority: getPriority(entity),
      };
    });
    const defaultRoutes = permalinks.filter(item => item.languageId === 'en').map((entity) => {
      return {
        url: `/${entity.permalink}`,
        priority: getPriority(entity),
      };
    });
    routes.push({
      url: '/it',
      priority: 1,
    });

    routes.push({
      url: '/en',
      priority: 0.9,
    });

    const allRoutes = [...routes, ...defaultRoutes];
    return allRoutes.sort((a, b) => (a.priority < b.priority) ? 1 : -1);
  },
  hostname: process.env.APP_URL,
  gzip: true,
}
