import * as SentryInitializer from '@sentry/node'

import { config } from './config'

const { SENTRY_DSN } = config

if (SENTRY_DSN) {
  SentryInitializer.init({ dsn: SENTRY_DSN })
}

export const Sentry = SentryInitializer
