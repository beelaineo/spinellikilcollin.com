import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Homepage as HomepageType } from '../src/types'
import { NotFound, Homepage as HomepageView } from '../src/views'
import {
  imageTextBlockFragment,
  carouselFragment,
  heroFragment,
} from '../src/graphql'
import { request } from '../src/graphql'

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
  Homepage?: HomepageType
}

interface HomepageProps {
  homepage?: HomepageType
}

export const Homepage = ({ homepage }: HomepageProps) => {
  if (!homepage) return <NotFound />
  return <HomepageView homepage={homepage} />
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  const response = await request<HomepageResponse>(homepageQuery)
  const homepage = response?.Homepage || null
  return { props: { homepage }, unstable_revalidate: 60 }
}

export default Homepage
