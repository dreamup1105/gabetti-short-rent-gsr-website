// Nuxt robots configuration
export const robots = [
  {
    UserAgent: '*',
    Disallow: () => '/it/account/'
  },
  {
    UserAgent: '*',
    Disallow: () => '/en/account/'
  },
  {
    UserAgent: '*',
    Disallow: () => '/account/personal-information'
  },
  {
    UserAgent: '*',
    Disallow: () => '/it/account/personal-information'
  },
  {
    UserAgent: '*',
    Disallow: () => '/en/account/personal-information'
  },
  {
    UserAgent: '*',
    Disallow: () => '/account/login-and-security'
  },
  {
    UserAgent: '*',
    Disallow: () => '/it/account/login-and-security'
  },
  {
    UserAgent: '*',
    Disallow: () => '/en/account/login-and-security'
  },
  {
    UserAgent: '*',
    Disallow: () => '/account/global-preferences'
  },
  {
    UserAgent: '*',
    Disallow: () => '/it/account/global-preferences'
  },
  {
    UserAgent: '*',
    Disallow: () => '/en/account/global-preferences'
  },
  {
    UserAgent: '*',
    Disallow: () => '/account/notifications'
  },
  {
    UserAgent: '*',
    Disallow: () => '/it/account/notifications'
  },
  {
    UserAgent: '*',
    Disallow: () => '/en/account/notifications'
  },
  {
    UserAgent: '*',
    Disallow: () => '/account/payments'
  },
  {
    UserAgent: '*',
    Disallow: () => '/it/account/payments'
  },
  {
    UserAgent: '*',
    Disallow: () => '/en/account/payments'
  },
  {
    UserAgent: '*',
    Disallow: () => '/privacy-policy'
  },
  {
    UserAgent: '*',
    Disallow: () => '/en/privacy-policy'
  },
  {
    UserAgent: '*',
    Disallow: () => '/it/informativa-privacy'
  },
  {
    UserAgent: '*',
    Disallow: () => '/reservations/finalize'
  },
  {
    UserAgent: '*',
    Disallow: () => '/it/reservations/finalize'
  },
  {
    UserAgent: '*',
    Disallow: () => '/en/reservations/finalize'
  },
]
