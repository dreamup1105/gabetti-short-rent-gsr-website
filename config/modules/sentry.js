export const sentry = {
  dsn: process.env.SENTRY_DSN || false,
  disabled: process.env.ENVIRONMENT === 'development',
  config: {
    environment: process.env.ENVIRONMENT,
  },
}
