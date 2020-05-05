import * as React from 'react'
import styled from '@xstyled/styled-components'
import { ContentBlock } from '../../components/ContentBlock'
import { definitely } from '../../utils'
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
        ? definitely(content).map((c) => (
            <ContentBlock key={c._key || 'some-key'} content={c} />
          ))
        : null}
    </Grid>
  )
}
