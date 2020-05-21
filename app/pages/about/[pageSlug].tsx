import * as React from 'react'
import gql from 'graphql-tag'
import { Page as PageType } from '../../src/types'
import { NotFound, PageView } from '../../src/views'
import { PageContext } from '../_app'

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

Page.getInitialProps = async (ctx: PageContext) => {
  const { apolloClient, query } = ctx
  const variables = {
    slug: query.pageSlug,
  }
  const response = await apolloClient.query<PageResponse>({
    query: pageQuery,
    variables,
  })
  const pages = response?.data?.allPage

  const page = pages.length ? pages[0] : undefined
  return { page }
}

export default Page
