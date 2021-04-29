const path = require('path')
const webpack = require('webpack')
const dotEnv = require('dotenv')
const bundleAnalyzer = require('@next/bundle-analyzer')
const withSourceMaps = require('@zeit/next-source-maps')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const redirectsJson = require('./src/data/redirects.json')

dotEnv.config()

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const SENTRY_DSN = process.env.SENTRY_DSN
const SENTRY_ORG = process.env.SENTRY_ORG
const SENTRY_PROJECT = process.env.SENTRY_PROJECT
const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID
const ALGOLIA_SEARCH_KEY = process.env.ALGOLIA_SEARCH_KEY
const ALGOLIA_ADMIN_KEY = process.env.ALGOLIA_ADMIN_KEY
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
const SANITY_DATASET = process.env.SANITY_DATASET
const SANITY_READ_TOKEN = process.env.SANITY_READ_TOKEN
const POSTMARK_KEY = process.env.POSTMARK_KEY
const STOREFRONT_ENV = process.env.STOREFRONT_ENV
const EXCHANGE_RATE_API_KEY = process.env.EXCHANGE_RATE_API_KEY
const SHOPIFY_CHECKOUT_DOMAIN = process.env.SHOPIFY_CHECKOUT_DOMAIN

const VERCEL_GITHUB_COMMIT_SHA = process.env.VERCEL_GITHUB_COMMIT_SHA
const VERCEL_URL = process.env.VERCEL_URL

module.exports = withSourceMaps(
  withBundleAnalyzer({
    // future: {
    //   webpack5: true,
    // },
    publicRuntimeConfig: {
      EXCHANGE_RATE_API_KEY,
      SANITY_PROJECT_ID,
      SANITY_DATASET,
      SANITY_READ_TOKEN,
      SENTRY_DSN,
      ALGOLIA_APP_ID,
      ALGOLIA_SEARCH_KEY,
      STOREFRONT_ENV,
      SHOPIFY_CHECKOUT_DOMAIN,
    },
    serverRuntimeConfig: {
      PROJECT_ROOT: __dirname,
      ALGOLIA_ADMIN_KEY,
      POSTMARK_KEY,
    },
    redirects: async function redirects() {
      return redirectsJson.map(({ from, to }) => ({
        source: from,
        destination: to,
        permanent: false,
      }))
    },
    webpack: (config, { isServer, buildId }) => {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.SENTRY_RELEASE': JSON.stringify(buildId),
        }),
      )

      const release = VERCEL_GITHUB_COMMIT_SHA || VERCEL_URL

      if (
        release &&
        SENTRY_DSN &&
        SENTRY_ORG &&
        SENTRY_PROJECT &&
        SENTRY_AUTH_TOKEN
      ) {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: '.next',
            ignore: ['node_modules'],
            urlPrefix: '~/_next',
            release,
          }),
        )
      }

      if (!isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser'
      }

      return config
    },
  }),
)
