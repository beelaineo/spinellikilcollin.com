import * as SentryInitializer from '@sentry/node'
import { Severity } from '@sentry/node'
import path from 'path'
import { RewriteFrames } from '@sentry/integrations'
import Debug from 'debug'

/** Some Sentry setup for sourcemaps */
// This allows TypeScript to detect our global value
declare global {
  /* eslint-disable-next-line */
  namespace NodeJS {
    interface Global {
      /* eslint-disable-next-line */
      __rootdir__: string
    }
  }
}

const rootdir = path.resolve(__dirname || process.cwd(), '..')

global.__rootdir__ = rootdir

const debug = Debug('app:sentry')

const ENV = process.env.NODE_ENV
const FORCE = Boolean(process.env.FORCE_SENTRY)
const DSN = process.env.SENTRY_DSN

export let Sentry: typeof SentryInitializer

if (ENV === 'production' || ENV === 'staging' || FORCE) {
  if (!DSN) throw new Error('No Sentry DSN supplied')
  Sentry = SentryInitializer
  Sentry.init({
    dsn: DSN,
    environment: ENV,
    integrations: [
      new RewriteFrames({
        root: global.__rootdir__,
      }),
    ],
  })
} else {
  debug('Mocking local sentry')
  const noop = () => {}
  Sentry = {
    // @ts-ignore
    setUserContext: noop,
    requestHandler: () => (req: any, res: any, next: any) => next(),
    parsers: {
      parseRequest: noop,
    },
    configureScope: () => {},
    captureException: (e: any) => {
      debug('Captured exception:')
      debug(e)
      const randomId = Math.random()
        .toString()
        .replace('0.', '')
      return `mock-ref-${randomId}`
    },
    captureMessage: (m: string, severity?: Severity) => {
      debug('Captured message:')
      debug(severity)
      debug(m)
      return m
    },
  }
}
