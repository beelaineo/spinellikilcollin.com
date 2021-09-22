import * as React from 'react'
import gql from 'graphql-tag'
import { getParam, definitely } from '../../src/utils'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Page as PageType, Directory } from '../../src/types'
import { NotFound, PageView, DirectoryView } from '../../src/views'
import {
  seoFragment,
  carouselFragment,
  imageTextBlockFragment,
  textBlockFragment,
  heroFragment,
  request,
} from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const pageQuery = gql`
  query PageQuery($slug: String!) {
    allDirectory(where: { slug: { current: { eq: $slug } } }) {
      __typename
      introText
      hero {
        ...HeroFragment
      }
      seo {
        ...SEOFragment
      }
      pageLinks {
        _key
        title
        summary
        ctaText
        image {
          ...RichImageFragment
        }
        linkedPage {
          __typename
          ... on Contact {
            _id
            _type
            _key
            title
          }
          ... on Customize {
            _id
            _type
            _key
            title
          }
          ... on JournalEntry {
            _id
            _type
            _key
            title
            slug {
              current
            }
          }
          ... on JournalPage {
            _id
            _type
            _key
            title
          }
          ... on Magazine {
            _id
            _type
            _key
            title
          }
          ... on Page {
            _id
            _type
            _key
            title
            slug {
              current
            }
          }
          ... on ShopifyProduct {
            _id
            _key
            _type
            title
            handle
          }
          ... on ShopifyCollection {
            _id
            _key
            _type
            title
            handle
          }
        }
      }
    }
    allPage(where: { slug: { current: { eq: $slug } } }) {
      __typename
      _id
      title
      subtitle
      fullWidth
      hideTitle
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
        ... on TextBlock {
          __typename
          ...TextBlockFragment
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
  ${textBlockFragment}
`

interface PageResponse {
  allPage: PageType[]
  allDirectory: Directory[]
}

interface PageProps {
  page?: PageType | Directory
}

const Page = ({ page }: PageProps) => {
  if (!page) return <NotFound />
  if (page.__typename === 'Directory') return <DirectoryView data={page} />
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

  const pages = response?.allPage || []
  const directories = response?.allDirectory || []
  const page = [...pages, ...directories][0] || null
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
