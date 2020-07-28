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

const NODE_MODULES_DIR = path.resolve(__dirname, '..', 'node_modules')
const SENTRY_DSN = process.env.SENTRY_DSN
const SENTRY_ORG = process.env.SENTRY_ORG
const SENTRY_PROJECT = process.env.SENTRY_PROJECT
const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN
const SENTRY_RELEASE = process.env.SENTRY_RELEASE

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

      console.log({
        SENTRY_DSN,
        SENTRY_ORG,
        SENTRY_RELEASE,
        SENTRY_PROJECT,
        SENTRY_AUTH_TOKEN,
      })
      if (SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN) {
        config.plugins.push(
          new SentryWebpackPlugin({
            include: '.next',
            ignore: ['node_modules'],
            urlPrefix: '~/_next',
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
