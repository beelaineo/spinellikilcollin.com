import * as NodeSentryInitializer from '@sentry/node'
import * as BrowserSentryInitializer from '@sentry/browser'
import type { Scope } from '@sentry/browser'
import path from 'path'
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

const getClient = () => {
  if (ENV === 'production' || ENV === 'staging' || FORCE) {
    if (!SENTRY_DSN) throw new Error('No Sentry DSN supplied')
    SentryInitializer.init({
      dsn: SENTRY_DSN,
      environment: ENV,
      integrations: [
        BrowserSentryInitializer.rewriteFramesIntegration({
          root: global.__rootdir__,
        }),
      ],
      /**
       * Ignore hydration errors when logging to Sentry (until we fix them).
       *
       * If you see more errors that should be ignored, open one in Sentry and look for
       * the description of the "sentry.event" line in the breadcrumbs and find the URL
       * for the minified react error, then paste it here.
       *
       * References:
       *
       *  - Github issue: https://github.com/getsentry/sentry-javascript/issues/6295#issuecomment-1352958925
       *  - Full list of minified error codes: https://github.com/facebook/react/blob/main/scripts/error-codes/codes.json
       */
      ignoreErrors: [
        // Hydration failed because the initial UI does not match what was rendered on the server.
        'https://reactjs.org/docs/error-decoder.html?invariant=418',
        // There was an error while hydrating this Suspense boundary. Switched to client rendering.
        'https://reactjs.org/docs/error-decoder.html?invariant=422',
        // There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root...
        'https://reactjs.org/docs/error-decoder.html?invariant=423',
        // Text content does not match server-rendered HTML...
        'https://reactjs.org/docs/error-decoder.html?invariant=425',
      ],
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
