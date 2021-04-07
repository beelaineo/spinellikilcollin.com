import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Maybe, CustomizeExamples } from '../../types'
import { ImageTextBlock } from '../../components/ContentBlock/ImageTextBlock'
import { Heading } from '../../components/Text'
import { definitely } from '../../utils'

const ExamplesWrapper = styled.div`
  text-align: center;
`

const ExamplesGrid = styled.div`
  ${({ theme }) => css`
    margin-top: 9;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 4;

    ${theme.mediaQueries.tablet} {
      grid-template-columns: repeat(2, 1fr);
    }
  `}
`

interface ExamplesProps {
  examples?: Maybe<CustomizeExamples>
}

export const Examples = ({ examples }: ExamplesProps) => {
  if (!examples) return null
  const links = definitely(examples.links)
  const { title, subtitle } = examples
  if (!links.length) return null
  return (
    <ExamplesWrapper>
      <Heading mb={2} level={3}>
        {title}
      </Heading>
      <Heading level={4}>{subtitle}</Heading>
      <ExamplesGrid>
        {links.map((link) => (
          <ImageTextBlock
            linkParams={{ customizeOpen: true }}
            key={link._key || 'some-key'}
            content={link}
          />
        ))}
      </ExamplesGrid>
    </ExamplesWrapper>
  )
}
