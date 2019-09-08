import * as React from 'react'
import { Placeholder } from '../Placeholder'
import { Hero } from '../../types'

interface HeroBlockProps {
  hero: Hero
}

export const HeroBlock = (props: HeroBlockProps) => {
  return <Placeholder label="Hero Block" data={props} />
}
