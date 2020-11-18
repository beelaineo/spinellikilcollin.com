import * as React from 'react'
import gql from 'graphql-tag'
import { getParam, definitely } from '../../src/utils'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Page as PageType } from '../../src/types'
import { NotFound, PageView } from '../../src/views'
import {
  seoFragment,
  carouselFragment,
  imageTextBlockFragment,
  heroFragment,
  request,
} from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const pageQuery = gql`
  query PageQuery($slug: String!) {
    allPage(where: { slug: { current: { eq: $slug } } }) {
      _id
      title
      subtitle
      hero {
        ...HeroFragment
      }
      slug {
        current
      }
      bodyRaw
      content {
        ... on ImageTextBlock {
          __typename
          ...ImageTextBlockFragment
        }
        ... on Carousel {
          __typename
          ...CarouselFragment
        }
      }

      seo {
        ...SEOFragment
      }
    }
  }
  ${heroFragment}
  ${seoFragment}
  ${carouselFragment}
  ${imageTextBlockFragment}
`

interface PageResponse {
  allPage: PageType[]
}

interface PageProps {
  page?: PageType
}
const Page = ({ page }: PageProps) => {
  if (!page) return <NotFound />
  return <PageView page={page} />
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params?.pageSlug) return { props: { page: undefined } }
  const slug = getParam(params.pageSlug)
  const variables = { slug }
  const [response, shopData] = await Promise.all([
    request<PageResponse>(pageQuery, variables),
    requestShopData(),
  ])

  const pages = response?.allPage
  const page = pages && pages.length ? pages[0] : null
  return { props: { page, shopData }, revalidate: 60 }
}

/**
 * Static Paths
 */

const pageHandlesQuery = gql`
  query PageSlugQuery {
    allPage {
      _id
      _updatedAt
      slug {
        current
      }
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  const result = await request<PageResponse>(pageHandlesQuery)
  const pages = definitely(result?.allPage)
  const paths = pages.map((page) => ({
    params: {
      pageSlug: page?.slug?.current ?? undefined,
      updatedAt: page?._updatedAt?.toString(),
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default Page
