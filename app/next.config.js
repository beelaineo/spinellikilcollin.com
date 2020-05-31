const dotEnv = require('dotenv')
const bundleAnalyzer = require('@next/bundle-analyzer')
dotEnv.config()

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
  },
})
