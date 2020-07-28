const path = require('path')
const webpack = require('webpack')
const dotEnv = require('dotenv')
const bundleAnalyzer = require('@next/bundle-analyzer')
const withSourceMaps = require('@zeit/next-source-maps')
const SentryWebpackPlugin = require('@sentry/webpack-plugin')

dotEnv.config()

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const SENTRY_DSN = process.env.SENTRY_DSN
const SENTRY_ORG = process.env.SENTRY_ORG
const SENTRY_PROJECT = process.env.SENTRY_PROJECT
const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN

const VERCEL_GITHUB_COMMIT_SHA = process.env.VERCEL_GITHUB_COMMIT_SHA
const VERCEL_URL = process.env.VERCEL_URL

module.exports = withSourceMaps(
  withBundleAnalyzer({
    env: {
      SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
      SANITY_DATASET: process.env.SANITY_DATASET,
      SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
      SENTRY_DSN: process.env.SENTRY_DSN,
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
        console.log('Sentry release: ', release)
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
