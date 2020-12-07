import * as React from 'react'
import { Maybe, CustomizeExamples } from '../../types'
import { definitely } from '../../utils'

interface ExamplesProps {
  examples?: Maybe<CustomizeExamples>
}

export const Examples = ({ examples }: ExamplesProps) => {
  if (!examples) return null
  const links = definitely(examples.links)
  if (!links.length) return null
  return <div>...</div>
}
