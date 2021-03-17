import { flags, FlagKey } from '../config/featureFlags'
import * as React from 'react'

interface FeatureFlagProps {
  flag: FlagKey
  children: React.ReactNode
}

export const FeatureFlag: React.FC<FeatureFlagProps> = ({
  flag,
  children,
}: FeatureFlagProps) => {
  const featureFlag = flags[flag]
  if (!featureFlag || featureFlag.enabled === false) return null
  return <>{children}</>
}
