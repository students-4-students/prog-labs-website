import * as Sentry from '@sentry/nuxt';

Sentry.init({
  dsn: 'https://9dc39b0c8ff35765d03cf7ac69b3a0b7@o4507865453363200.ingest.de.sentry.io/4507865456771153',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});
