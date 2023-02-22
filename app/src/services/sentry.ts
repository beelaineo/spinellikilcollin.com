import * as NodeSentryInitializer from '@sentry/node'
import * as BrowserSentryInitializer from '@sentry/browser'
import type { Scope } from '@sentry/browser'
import path from 'path'
import { RewriteFrames } from '@sentry/integrations'
import Debug from 'debug'
import { config } from '../config'

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

const rootdir = path.resolve(__dirname || process.cwd(), '..', '..')

global.__rootdir__ = rootdir

const debug = Debug('dev:sentry')

const ENV = process.env.NODE_ENV as 'production' | 'development' | 'staging'
const FORCE = Boolean(process.env.FORCE_SENTRY)

const { SENTRY_DSN } = config

const SentryInitializer =
  typeof window === 'undefined'
    ? NodeSentryInitializer
    : BrowserSentryInitializer

const SentryErrorsToIgnore = [
  /^Hydration failed/,
  /error while hydrating/,
  /does not match server-rendered HTML/,
]

const getClient = () => {
  if (ENV === 'production' || ENV === 'staging' || FORCE) {
    if (!SENTRY_DSN) throw new Error('No Sentry DSN supplied')
    SentryInitializer.init({
      dsn: SENTRY_DSN,
      environment: ENV,
      integrations: [
        new RewriteFrames({
          root: global.__rootdir__,
        }),
      ],
      beforeSend: (event) => {
        const referer =
          event?.request?.headers?.referer || event?.request?.headers?.Referer
        if (
          referer &&
          SentryErrorsToIgnore.some((regExp) => regExp.test(referer))
        ) {
          return null
        }
        return event
      },
    })
    return SentryInitializer
  } else {
    debug('Mocking local sentry')
    const noop = () => undefined
    /**
     * A mocked client so we don't send errors in development
     */
    return {
      // @ts-ignore
      setUserContext: noop,
      // @ts-ignore
      requestHandler: () => (req, res, next) => next(),
      parsers: {
        parseRequest: noop,
      },
      setContext: (name: string, ctx: any) => {
        debug('Set context:')
        debug({ [name]: ctx })
      },
      configureScope: (callback: (scope: Scope) => void) => undefined,
      captureException: (e: Error, context: any) => {
        debug(`Captured exception: [${context?.tags?.event}]`)
        debug(e, { context })
        const randomId = Math.random().toString().replace('0.', '')
        return `mock-ref-${randomId}`
      },
      captureMessage: (m: string) => {
        debug('Captured message:')
        debug(m)
        return m
      },
    }
  }
}

const SentryClient = getClient()

export type SentryEvent =
  | 'sync_webhook_error'
  | 'postmark_error'
  | 'mailchimp_error'
  | 'hubspot_error'
  | 'currency_conversion'
  | 'shopify_query_error'
  | 'sanity_query_error'
  | 'graphql_request_error'
  | 'next_static_paths_error'
  | 'next_static_props_error'
  | 'sitemap_gen_error'
  | 'algolia_index_error'
  | 'algolia_parse_error'

/**
 * A wrapper for the base Sentry client that enforces
 * the usage of tags, and makes passing additional information
 * a little easier.
 *
 * Example usage:
 *
 * Sentry.captureException(someError, 'page_fetch_error', helpfulContext)
 */
export const Sentry = {
  captureException: (
    e: any,
    event: SentryEvent,
    extra?: Record<string, any>,
  ) => {
    console.error(e)
    SentryClient.captureException(e, { tags: { event }, extra })
  },
}
