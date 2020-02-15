import * as React from 'react'
import { ContentBlock } from '../../components/ContentBlock'
import { Homepage as HomepageType } from '../../types'

interface HomepageProps {
  homepage: HomepageType
}

export const Homepage = (props: HomepageProps) => {
  const { content } = props.homepage
  return (
    <React.Fragment>
      {content
        ? content.map((c) =>
            c && c._key ? <ContentBlock key={c._key} content={c} /> : null,
          )
        : null}
    </React.Fragment>
  )
}
