// Build Configuration: https://go.nuxtjs.dev/config-build
export const build = {
  // extend(config, ctx) {
  //   config.devtool = ctx.isClient ? 'eval-source-map' : 'inline-source-map';
  //   if (ctx.isClient) {
  //     config.optimization.splitChunks.maxSize = 200000;
  //   }
  // },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'async',
        cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.(css|vue)$/,
          chunks: 'all',
          enforce: true
        }
      },
    }
  },
  filenames: {
      app: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `js/[contenthash:7]${isModern ? '.modern' : ''}.js`,
      chunk: ({ isDev, isModern }) => isDev ? `[name]${isModern ? '.modern' : ''}.js` : `js/[contenthash:7]${isModern ? '.modern' : ''}.js`,
      css: ({ isDev }) => isDev ? '[name].css' : 'css/[contenthash:7].css',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name].[contenthash:7].[ext]',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name].[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name].[contenthash:7].[ext]'
  },
  splitChunks: {
    layouts: false,
    pages: true,
    commons: true
  },
  html: {
    minify: {
      collapseBooleanAttributes: true,
      decodeEntities: true,
      minifyCSS: true,
      minifyJS: true,
      processConditionalComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      trimCustomFragments: true,
      useShortDoctype: true
    }
  },
  extractCSS: {
    ignoreOrder: true
  },
  optimizeCSS: true,
  cssSourceMap: false,
  quiet: false,
  sourceMap: process.env.NODE_ENV !== 'production',
  transpile: [
    /(.+)(@\/plugins\/)(.+)(\.js)$/, // Transpile Unix paths for all utils files
    /(.+)(@\\plugins\\)(.+)(\.js)$/, // Transpile Windows paths for all utils files
    'v-calendar',
    'dom7',
    'q',
    'qs',
    'strict-uri-encode',
    'string_decoder',
    'split-on-first',
    'query-string',
    'querystring',
    'querystring-es3',
    "vee-validate/dist/rules"
  ],
  babel: {
    compact: false,
    presets({isServer}, [preset, options]) {
      if (isServer) {
        options.targets = {node: '16.13.0'};
      }
    },
  },
  // Experimental features
  // cache: process.env.NODE_ENV !== 'production',
  // hardSource: process.env.NODE_ENV !== 'production'
}
