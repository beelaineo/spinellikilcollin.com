import {
  imageTextBlockFragment,
  carouselFragment,
  heroFragment,
} from '../../graphql/fragments'
import gql from 'graphql-tag'
import { Homepage } from 'types'

export interface HomepageResponse {
  Homepage: Homepage
}

export const homepageQuery = /*  GraphQL */ gql`
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
