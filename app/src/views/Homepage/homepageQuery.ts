import {
  contentBlockFragment,
  //
  // carouselFragment,
  // heroFragment,
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
      contentSections {
        ... on ContentBlock {
          ...ContentBlockFragment
        }
      }
    }
  }
  ${contentBlockFragment}
`
