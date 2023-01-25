  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
export const axios = {
    baseURL: process.env.BASE_URL,
    redirectError: {},
    proxyHeaders: false,
    credentials: false,
    headers: {
      common: {
        Accept: 'application/json',
        'X-PLATFORM': 'website',
      },
    },
  }
