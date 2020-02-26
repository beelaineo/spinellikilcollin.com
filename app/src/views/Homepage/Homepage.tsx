import * as React from 'react'
import styled from '@xstyled/styled-components'
import { ContentBlock } from '../../components/ContentBlock'
import { Homepage as HomepageType } from '../../types'

interface HomepageProps {
  homepage: HomepageType
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

export const Homepage = (props: HomepageProps) => {
  const { content } = props.homepage
  return (
    <Grid>
      {content
        ? content.map((c) =>
            c && c._key ? <ContentBlock key={c._key} content={c} /> : null,
          )
        : null}
    </Grid>
  )
}
