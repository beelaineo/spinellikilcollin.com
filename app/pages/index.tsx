import * as React from 'react'
import gql from 'graphql-tag'
import fetch from 'isomorphic-unfetch'
import { useQuery } from '@apollo/react-hooks'
import { ContentBlock } from '../src/components/ContentBlock'
import { Homepage as HomepageType } from '../src/types'
import { Homepage as HomepageView } from '../src/views'
import {
  imageTextBlockFragment,
  carouselFragment,
  heroFragment,
} from '../src/graphql/fragments'

const homepageQuery = /*  GraphQL */ gql`
  query HomepageQuery {
    Homepage(id: "homepage") {
      _id
      content {
        ... on ImageTextBlock {
          __typename
          ...ImageTextBlockFragment
        }
        ... on Hero {
          __typename
          ...HeroFragment
        }
        ... on Carousel {
          __typename
          ...CarouselFragment
        }
      }
    }
  }
  ${imageTextBlockFragment}
  ${carouselFragment}
  ${heroFragment}
`

export interface HomepageResponse {
  Homepage: HomepageType
}

export const Homepage = () => {
  const { loading, error, data } = useQuery<HomepageResponse>(homepageQuery)
  if (error)
    return (
      <React.Fragment>
        <p>error!</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </React.Fragment>
    )

  if (loading || !data || !data.Homepage.content) return null
  return <HomepageView homepage={data.Homepage} />
}

export default Homepage
