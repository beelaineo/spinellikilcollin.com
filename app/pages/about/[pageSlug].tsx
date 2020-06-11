import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { Page as PageType } from '../../src/types'
import { NotFound, PageView } from '../../src/views'
import { request } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const pageQuery = gql`
  query PageQuery($slug: String!) {
    allPage(where: { slug: { current: { eq: $slug } } }) {
      _id
      title
      subtitle
      slug {
        current
      }
      bodyRaw
    }
  }
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
  if (!params) return { props: { page: undefined } }
  const variables = { slug: params.pageSlug }
  const [response, shopData] = await Promise.all([
    request<PageResponse>(pageQuery, variables),
    requestShopData(),
  ])

  const pages = response?.allPage
  const page = pages && pages.length ? pages[0] : null
  return { props: { page, shopData }, unstable_revalidate: 60 }
}

/**
 * Static Paths
 */

// const pageHandlesQuery = gql`
//   query PageSlugQuery {
//     allPage {
//       _id
//       slug {
//         current
//       }
//     }
//   }
// `

export const getStaticPaths: GetStaticPaths = async () => {
  // const result = await request<PageResponse>(pageHandlesQuery)
  // const pages = definitely(result?.allPage)
  // const paths = pages.map((page) => ({
  //   params: { pageSlug: page?.slug?.current ?? undefined },
  // }))

  return {
    paths: [],
    fallback: true,
  }
}

export default Page
