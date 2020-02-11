import * as React from 'react'
import gql from 'graphql-tag'
import fetch from 'isomorphic-unfetch'
import { useQuery } from '@apollo/react-hooks'
import { ContentBlock } from '../src/components/ContentBlock'
import { Homepage as HomepageType } from '../src/types'
import { Homepage as HomepageView } from '../src/views'
import {
  withApollo,
  imageTextBlockFragment,
  carouselFragment,
  heroFragment,
} from '../src/graphql'

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

export interface HomepageProps {
  homepage?: HomepageType
  error?: any
}

export const Homepage = ({ homepage, error }: HomepageProps) => {
  if (error)
    return (
      <React.Fragment>
        <p>error!</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </React.Fragment>
    )

  if (!homepage) throw new Error('No homepage data fetched')

  return <HomepageView homepage={homepage} />
}

export interface HomepageResponse {
  Homepage: HomepageType
}

Homepage.getInitialProps = async (ctx: any) => {
  const { apolloClient } = ctx
  const response = await apolloClient.query({ query: homepageQuery })
  const homepage = response?.data?.Homepage
  return { homepage }
}

export default withApollo(Homepage)
