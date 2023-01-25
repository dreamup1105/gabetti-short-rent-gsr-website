const title = "Gabetti Short Rent: Luxury & Corporate Short Rent"
const description = "Gabetti Short Rent is the company of the Gabetti Group that deals with providing dedicated services to investors, developers and private customers for the full outsourcing of real estate units of the highest quality intended for short rent, for business or tourism needs."
// Global page headers: https://go.nuxtjs.dev/config-head
const baseAPI = process.env.BASE_URL.replace('/api/v1/website/', '')
export const head = {
    title,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover'},
      {name: 'format-detection', content: 'telephone=no'},
      {name: 'facebook-domain-verification', content: process.env.FACEBOOK_DOMAIN_VERIFICATION_TOKEN},
      // Common metatags
      {hid: 'title', name: 'title', content: 'Gabetti Shor Rent'},
      {hid: 'description', name: 'description', content: description},
      {hid: 'keywords', name: 'keywords', content: 'gabetti short rent'},
      {hid: 'application-name', name: 'application-name', content: 'Gabetti Short Rent'},
      {hid: 'robots', name: 'robots', content: process.env.ENVIRONMENT === 'production' ? 'index, follow' : 'none'},
      // Facebook metatags
      {hid: 'og:title', property: 'og:title', content: title},
      {hid: 'og:type', property: 'og:type', content: 'website'},
      {hid: 'og:description', property: 'og:description', content: description},
      {hid: 'og:site_name', property: 'og:site_name', content: 'Gabetti Short Rent'},
      {hid: 'og:url', property: 'og:url', content: process.env.APP_URL},
      {hid: 'og:image', property: 'og:image', content: process.env.APP_URL + '/logo-bg-red.png'},
      //{hid: 'og:image:width', property: 'og:image:width', content: '300'},
      //{hid: 'og:image:height', property: 'og:image:height', content: '200'},
      // Twitter image
      {hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image'},
      {hid: 'twitter:site', property: 'twitter:site', content: '@gabettishortrent'},
      {hid: 'twitter:creator', property: 'twitter:creator', content: '@gabettishortrent'},
      {hid: 'twitter:title', property: 'twitter:title', content: 'Gabetti Short Rent'},
      {hid: 'twitter:description', property: 'twitter:description', content: description},
      {hid: 'twitter:image', property: 'twitter:image', content: `${process.env.APP_URL}/logo-bg-red.png`},
      // Google metatags
      {hid: 'g:name', itemprop: 'name', content: title},
      {hid: 'g:description', itemprop: 'description', content: description},
      {hid: 'g:image', itemprop: 'image', content: `${process.env.APP_URL}/logo-bg-red.png`},
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'preconnect',
        href: 'https://www.googletagmanager.com'
      },
      {
        rel: 'preconnect',
        href: `${baseAPI}`
      },
      {
        rel: 'preconnect',
        href: `${process.env.DO_URL}`
      },
      {
        rel: 'preconnect',
        href: 'https://consent.cookiebot.com'
      }
    ],
}
