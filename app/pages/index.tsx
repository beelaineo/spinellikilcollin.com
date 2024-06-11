import * as React from 'react'
import { gql } from 'graphql-tag'
import { GetStaticProps } from 'next'
import { Homepage as HomepageType } from '../src/types'
import { NotFound, Homepage as HomepageView } from '../src/views'
import {
  imageTextBlockFragment,
  carouselFragment,
  heroFragment,
  seoFragment,
  request,
} from '../src/graphql'
import { requestShopData } from '../src/providers/ShopDataProvider/shopDataQuery'
import { Sentry } from '../src/services/sentry'
import { useRefetch } from '../src/hooks'
import { useRouter } from 'next/router'

const homepageQueryById = gql`
  query HomepageQuery($id: ID!) {
    Homepage(id: $id) {
      _id
      seo {
        ...SeoFragment
      }
      header_color
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
const homepageQuery = gql`
  query HomepageQuery {
    Homepage(id: "homepage") {
      _id
      seo {
        ...SeoFragment
      }
      header_color
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
  Homepage: HomepageType
}

interface HomepageProps {
  homepage: HomepageType
}

const getHomepageFromPreviewResponse = (response: HomepageResponse) => {
  const homepage = response?.Homepage
  return homepage
}

export const Homepage = ({ homepage }: HomepageProps) => {
  const router = useRouter()
  const token = router?.query?.preview
  const preview = Boolean(router.query.preview)

  const refetchConfig = {
    listenQuery: `*[_type == "homepage" && _id == $id]`,
    listenQueryParams: { id: 'drafts.homepage' },
    refetchQuery: homepageQueryById,
    refetchQueryParams: { id: 'drafts.homepage' },
    parseResponse: getHomepageFromPreviewResponse,
    enabled: preview,
    token: token,
  }
  const data = useRefetch<HomepageType, HomepageResponse>(
    homepage,
    refetchConfig,
  )

  try {
    if (preview === true) {
      if (!homepage) return <NotFound />

      if (!data) return <HomepageView homepage={homepage} />
      return <HomepageView homepage={data} />
    } else {
      if (!homepage) return <NotFound />
      return <HomepageView homepage={homepage} />
    }
  } catch (e) {
    return <NotFound />
  }
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async () => {
  try {
    const [response, shopData] = await Promise.all([
      request<HomepageResponse>(homepageQuery),
      requestShopData(),
    ])
    const homepage = response?.Homepage || null
    return { props: { shopData, homepage } }
  } catch (e) {
    Sentry.captureException(e, 'next_static_props_error', {
      route: 'index',
    })
    return { props: {} }
  }
}

export default Homepage
