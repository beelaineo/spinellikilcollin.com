import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Maybe, CustomerStories as CustomerStoriesType } from '../../types'
import { Loop } from '../../components/Loop'
import { P } from '../../components/Text'
import { definitely } from '../../utils'

const StoryWrapper = styled.div`
  ${({ theme }) => css`
    padding: 3 5;
    width: 45vw;
    text-align: center;

    ${theme.mediaQueries.mobile} {
      width: 100vw;
    }
  `}
`
interface CustomerStoriesProps {
  customerStories?: Maybe<CustomerStoriesType>
}

export const CustomerStories = ({ customerStories }: CustomerStoriesProps) => {
  if (!customerStories) return null
  const stories = definitely(customerStories.stories)
  if (!stories.length) return null

  return (
    <Loop>
      {stories.map((story) => (
        <StoryWrapper key={story?._key || 'some-story-key'}>
          <P mb={4} fontStyle="italic">
            {story.body}
          </P>
          <P>—{story.byLine}</P>
        </StoryWrapper>
      ))}
    </Loop>
  )
}
