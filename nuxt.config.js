import { defineNuxtConfig } from '@nuxt/bridge';
import ApiRoutes from './api_routes.json';
import DestinationRoutes from './api_destinations.json';
import RedirectRoutes from './api_redirects.json';
import { build } from './config/build';
import {bridge, head, publicRuntimeConfig, env, purgeCSS, render} from './config/index';
// modules configuration
import {
  auth,
  axios,
  googleFonts,
  hotjar,
  i18n,
  image,
  robots,
  sentry,
  sitemap
} from './config/modules/index';

export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // SPA fallback
  ssr: false,

  // nuxt analyze
  telemetry: false,

  bridge,
  publicRuntimeConfig,
  env,
  head,

  app: {
    cdnURL: process.env.CDN_URL
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/persistedState',
      ssr: false
    },
    {
      src: '~/plugins/vueAppleLogin',
      ssr: false
    },
    '~/plugins/axios',
    '~/plugins/veeValidate',
    '~/plugins/vueSanitize'
    //'~/plugins/vueLogrocket',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://image.nuxtjs.org/
    '@nuxt/image',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    // https://github.com/BKWLD/vue-ssr-carousel
    'vue-ssr-carousel/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/partytown',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
    // Doc:  https://www.npmjs.com/package/@nuxtjs/auth
    '@nuxtjs/auth',
    '@nuxtjs/sitemap',
    '@nuxtjs/toast',
    // Doc: https://github.com/nuxt-community/gtm-module
    '@nuxtjs/gtm',
    // Doc: https://www.npmjs.com/package/@nuxtjs/robots
    '@nuxtjs/robots',
    // Doc: https://github.com/kippie-bv/nuxt-hotjar
    // "@kippie-bv/nuxt-hotjar",
    'nuxt-stripejs',
    // Doc: https://google-fonts.nuxtjs.org/
    '@nuxtjs/google-fonts',
    // Doc: https://github.com/frenchrabbit/nuxt-precompress
    'nuxt-precompress'
  ],

  modern: true,
  build,
  render,

  redirect: () => {
    const redirects = RedirectRoutes;
    let result = [];
    redirects.forEach(redirect => {
      result.push({
        from: redirect.from,
        to: redirect.to
      });
    });
    return result;
  },

  // Google tag configuration code
  gtm: {
    enabled: process.env.ENVIRONMENT !== 'development',
    id: 'GTM-M2RTRSZ'
  },

  // Stripe configuration
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  },

  nuxtPrecompress: {
    enabled: true,
    test: /\.(js|css|html|txt|xml|svg)$/,
  },

  auth,
  axios,
  googleFonts,
  hotjar,
  i18n,
  image,
  robots,
  sentry,
  sitemap,

  toast: {
    position: 'top-center',
    duration: 5000,
    class: 'gsr-toast',
    keepOnHover: true
  },

  tailwindcss: {
    purgeCSSInDev: true,
    viewer: false
  },

  purgeCSS,

  generate: {
    fallback: true,
    crawler: false,
    concurrency: 500,
    routes: [
      '/'
    ],
    exclude: [
      /^\/wishlist/
    ]
  },

  hooks: {
    'build:extendRoutes': (routes, resolve) => {
      const apiRoutesPermalinks = ApiRoutes;
      const destinationsRoutesPermalinks = DestinationRoutes;

      const apiRoutes = apiRoutesPermalinks.map(entity => {
        return {
          path: `/${entity.locale}/${entity.permalink}`,
          component: resolve(__dirname, `dynamicPages/${entity.type}.vue`),
          name: `${entity.type}${entity.id}___${entity.locale}`
        };
      });
      routes.push({
        path: '/it/'
      });
      routes.push(...apiRoutes);

      // Build destinations routes
      const destinationsRoutes = destinationsRoutesPermalinks.map(entity => {
        return {
          path: `/${entity.locale}/q/${entity.permalink}`,
          component: resolve(__dirname, `pages/q/_destination.vue`),
          name: `${entity.type}${entity.id}___${entity.locale}`
        };
      });
      routes.push(...destinationsRoutes);
    },
  },

  vue: {
    config: {
      productionTip: process.env.NODE_ENV !== 'production',
      devtools: process.env.NODE_ENV !== 'production'
    }
  }
});
