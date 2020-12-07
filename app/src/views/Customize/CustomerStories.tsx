import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Maybe, CustomerStories as CustomerStoriesType } from '../../types'
import { Carousel } from '../../components/Carousel'
import { definitely } from '../../utils'

const StoryWrapper = styled.div`
  ${({ theme }) => css`
    padding: 3;
    width: 45vw;

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
    <Carousel>
      {stories.map((story) => (
        <StoryWrapper key={story?._key || 'some-story-key'}>
          {story.body}
        </StoryWrapper>
      ))}
    </Carousel>
  )
}
