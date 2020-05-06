const dotEnv = require('dotenv')
dotEnv.config()

module.exports = {
  env: {
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_READ_TOKEN: process.env.SANITY_READ_TOKEN,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    //
    // This option is rarely needed, and should be reserved for advanced
    // setups. You may be looking for `ignoreDevErrors` instead.
    // !! WARN !!
    // ignoreBuildErrors: true,
  },
}
