import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Homepage as HomepageType } from '../src/types'
import { NotFound, Homepage as HomepageView } from '../src/views'
import {
  imageTextBlockFragment,
  carouselFragment,
  heroFragment,
  seoFragment,
} from '../src/graphql'
import { requestShopData } from '../src/providers/ShopDataProvider/shopDataQuery'
import { request } from '../src/graphql'

const homepageQuery = gql`
  query HomepageQuery {
    Homepage(id: "homepage") {
      _id
      seo {
        ...SEOFragment
      }
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
  ${seoFragment}
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
  const [response, shopData] = await Promise.all([
    request<HomepageResponse>(homepageQuery),
    requestShopData(),
  ])
  const homepage = response?.Homepage || null
  return { props: { shopData, homepage }, revalidate: 60 }
}

export default Homepage
