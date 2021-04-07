import * as React from 'react'
import styled, { Box, css } from '@xstyled/styled-components'
import { Loop } from '../../components/Loop'
import { Image, ImageWrapper } from '../../components/Image'
import { Heading } from '../../components/Text'
import { definitely } from '../../utils'
import {
  Maybe,
  ExperienceBlock as ExperienceBlockType,
  Experience as ExperienceType,
} from '../../types'

const ExperienceBlockWrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 5;
    width: 500px;
    text-align: center;

    ${ImageWrapper} {
      max-width: 180px;
      margin: 0 auto;
    }

    ${theme.mediaQueries.mobile} {
      width: 100vw;
      padding: 0 9;
    }
  `}
`

interface ExperienceBlockProps {
  block: ExperienceBlockType
  index: number
}

export const ExperienceBlock: React.FC<ExperienceBlockProps> = ({
  index,
  block,
}) => {
  const { illustration, heading, body } = block

  const blockHeading = `${index + 1}. ${heading}`
  return (
    <ExperienceBlockWrapper>
      <Image image={illustration} sizes="(max-width: 768px) 100vw, 45vw" />
      <Heading level={3}>{blockHeading}</Heading>
      <Heading level={4}>{body}</Heading>
    </ExperienceBlockWrapper>
  )
}

const ExperienceWrapper = styled.div`
  text-align: center;
`

interface ExperienceProps {
  experience?: Maybe<ExperienceType>
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  if (!experience) return null
  const { title, subtitle, blocks } = experience

  return (
    <ExperienceWrapper>
      <Heading mb={2} level={3}>
        {title}
      </Heading>

      <Heading level={4}>{subtitle}</Heading>
      <Box py={4}>
        <Loop withButtons={true}>
          {definitely(blocks).map((block, index) => (
            <ExperienceBlock key={block._key} index={index} block={block} />
          ))}
        </Loop>
      </Box>
    </ExperienceWrapper>
  )
}
