import { config } from './index'

const { STOREFRONT_ENV } = config

interface FeatureFlagEnv {
  development: boolean
  staging: boolean
  production: boolean
}

interface FeatureFlag {
  enabled: boolean
}

const createFlags = <FlagsConfig extends Record<string, FeatureFlagEnv>>(
  config: FlagsConfig,
) => config

const flagsConfig = createFlags({
  customizationPage: {
    development: true,
    staging: true,
    production: false,
  },
})

const isEnabled = (config: FeatureFlagEnv): boolean => {
  return config[STOREFRONT_ENV] || false
}

export type FlagKey = keyof typeof flagsConfig

export const flags = Object.entries(flagsConfig).reduce(
  (allFlags, [key, config]) => ({
    ...allFlags,
    [key]: { enabled: isEnabled(config) },
  }),
  {},
)
