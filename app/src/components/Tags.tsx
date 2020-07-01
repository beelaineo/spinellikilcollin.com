import * as React from 'react'
import { Heading } from './Text'

interface TagLinkProps {
  tag: string
}

export const TagLink = ({ tag }: TagLinkProps) => {
  return (
    <Heading
      ml={3}
      level={4}
      textDecoration="underline"
      textTransform="uppercase"
    >
      {tag}
    </Heading>
  )
}
