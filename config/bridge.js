  //bridge: process.env.NODE_ENV === 'production',
  export const bridge = {

    // -- Opt-in features --

    // Use Vite as the bundler instead of webpack 4
    // vite: true,

    // Enable Nuxt 3 compatible useHead
    // meta: true,

    // -- Default features --

    // Use legacy server instead of Nitro
    // https://nitro.unjs.io/config
    nitro: {
      prerender: { crawlLinks: false }
    },

    // Disable Nuxt 3 compatible `nuxtApp` interface
    // app: false,

    // Disable Composition API support
    // capi: false,

    // ... or just disable legacy Composition API support
    // capi: {
    //   legacy: false
    // },

    // Do not transpile modules
    // transpile: false,

    // Disable <script setup> support
    // scriptSetup: false,

    // Disable composables auto importing
    // imports: false,

    // Do not warn about module incompatibilities
    // constraints: false
  }
