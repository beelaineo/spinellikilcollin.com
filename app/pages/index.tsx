import * as React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Homepage as HomepageType } from '../src/types'
import { Homepage as HomepageView } from '../src/views'
import {
  imageTextBlockFragment,
  carouselFragment,
  heroFragment,
} from '../src/graphql'

const homepageQuery = gql`
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
  const { data, loading, error } = useQuery<HomepageResponse>(homepageQuery)
  if (error)
    return (
      <React.Fragment>
        <p>error!</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </React.Fragment>
    )

  if (loading) return <p>Loading...</p>
  const homepage = data?.Homepage
  if (!homepage) throw new Error('No homepage data fetched')

  return <HomepageView homepage={homepage} />
}

export default Homepage
