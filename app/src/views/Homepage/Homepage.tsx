import * as React from 'react'
import { useQuery } from 'urql'
import { homepageQuery, HomepageResponse } from './homepageQuery'
import { ContentBlock } from '../../components/ContentBlock'
import { Homepage as HomepageType } from '../../types'

interface HomepageProps {
  homepage: HomepageType
}

export const Homepage = (props: HomepageProps) => {
  const { content } = props.homepage
  return (
    <React.Fragment>
      {content.map((c) => (
        <ContentBlock key={c._key} content={c} />
      ))}
    </React.Fragment>
  )
}
