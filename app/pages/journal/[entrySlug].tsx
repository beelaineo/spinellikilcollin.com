import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getParam, definitely } from '../../src/utils'
import { JournalEntry as JournalEntryType } from '../../src/types'
import { NotFound } from '../../src/views/NotFound'
import { JournalEntryPage } from '../../src/views/JournalEntryPage'
import { request, seoFragment, heroFragment } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const journalEntryQuery = gql`
  query JournalEntryQuery($slug: String) {
    allJournalEntry(where: { slug: { current: { eq: $slug } } }) {
      _id
      _type
      publishDate
      title
      subtitle
      slug {
        current
      }
      tags
      bodyRaw
      hero {
        ...HeroFragment
      }
      seo {
        ...SEOFragment
      }
    }
  }
  ${heroFragment}
  ${seoFragment}
`

interface JournalEntryProps {
  entry?: JournalEntryType
}

const JournalEntry = ({ entry }: JournalEntryProps) => {
  if (!entry) return <NotFound />
  return <JournalEntryPage entry={entry} />
}

interface Response {
  allJournalEntry: JournalEntryType[]
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params?.entrySlug) return { props: { entry: undefined } }
  const slug = getParam(params.entrySlug)
  const variables = { slug }
  const [response, shopData] = await Promise.all([
    request<Response>(journalEntryQuery, variables),
    requestShopData(),
  ])

  const entries = response?.allJournalEntry

  const entry = entries && entries.length ? entries[0] : null
  return { props: { entry, shopData }, revalidate: 10 }
}

/**
 * Static Paths
 */

const pageHandlesQuery = gql`
  query JournalEntriesHandlesQuery {
    allJournalEntry {
      _id
      _updatedAt
      slug {
        current
      }
    }
  }
`

export const getStaticPaths: GetStaticPaths = async () => {
  // When this is true (in preview environments) don't pre-render pages
  // if (process.env.SKIP_BUILD_STATIC_GENERATION) {
  //   return {
  //     paths: [],
  //     fallback: 'blocking',
  //   }
  // }

  const result = await request<Response>(pageHandlesQuery)
  const entries = definitely(result?.allJournalEntry)
  const paths = entries.map((entry) => ({
    params: {
      entrySlug: entry?.slug?.current ?? undefined,
      updatedAt: entry?._updatedAt?.toString(),
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default JournalEntry
