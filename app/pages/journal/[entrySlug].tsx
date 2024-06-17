import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getParam, definitely } from '../../src/utils'
import { useRouter } from 'next/router'
import { JournalEntry as JournalEntryType } from '../../src/types'
import { NotFound } from '../../src/views/NotFound'
import { JournalEntryPage } from '../../src/views/JournalEntryPage'
import { request, seoFragment, heroFragment } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'
import { usePrevious } from 'react-use'
import { useEffect } from 'react'
import { keepAliveDropCache } from 'react-next-keep-alive'
import { useRefetch } from '../../src/hooks'

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
        ...SeoFragment
      }
    }
  }
  ${heroFragment}
  ${seoFragment}
`

const journalEntryQueryById = gql`
  query JournalEntryQueryById($id: ID!) {
    allJournalEntry(where: { _id: { eq: $id } }) {
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
        ...SeoFragment
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
  const { query, isReady } = useRouter()
  // console.log('collection', collection)
  const token = query?.preview
  const preview = Boolean(query?.preview)

  const [entryState, setEntryState] = React.useState<string | string[]>('')

  const prevEntry = usePrevious(entryState)

  useEffect(() => {
    if (!entryState || !entryState.length) return

    const compareState =
      !prevEntry || !prevEntry.length ? entryState : prevEntry

    if (entryState !== compareState) {
      keepAliveDropCache('journal-entry-page', false)
    }
  }, [entryState, prevEntry])

  const refetchConfig = {
    listenQuery: `*[_type == "journalEntry" && _id == $id]`,
    listenQueryParams: { id: 'drafts.' + entry?._id },
    refetchQuery: journalEntryQueryById,
    refetchQueryParams: { id: 'drafts.' + entry?._id },
    parseResponse: getJournalEntryFromPreviewResponse,
    enabled: preview,
    token: token,
  }

  const data = useRefetch<JournalEntryType, Response>(entry, refetchConfig)

  try {
    if (preview === true) {
      if (!entry) return <NotFound />
      console.log('preview data', data)
      if (!data) return <JournalEntryPage entry={entry} />
      return <JournalEntryPage entry={data} />
    } else {
      if (!entry) return <NotFound />
      return <JournalEntryPage entry={entry} />
    }
  } catch (e) {
    return <NotFound />
  }
}

interface Response {
  allJournalEntry: JournalEntryType[]
}

const getJournalEntryFromPreviewResponse = (response: Response) => {
  const entry = response?.allJournalEntry[0]
  return entry
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
  return { props: { entry, shopData } }
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
