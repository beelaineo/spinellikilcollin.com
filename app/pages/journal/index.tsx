import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import {
  Maybe,
  JournalPage as JournalPageType,
  JournalEntry,
} from '../../src/types'
import { request, seoFragment, richImageFragment } from '../../src/graphql'
import { NotFound } from '../../src/views/NotFound'
import { JournalPage } from '../../src/views/JournalPage'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const journalPageQuery = gql`
  query JournalPageQuery($currentDate: Date) {
    JournalPage(id: "journalPage") {
      title
      seo {
        ...SEOFragment
      }
    }
    allJournalEntry(
      where: { publishDate: { lte: $currentDate } }
      sort: { publishDate: DESC }
    ) {
      _id
      _type
      publishDate
      title
      subtitle
      slug {
        current
      }
      thumbnail {
        ...RichImageFragment
      }
      tags
    }
  }
  ${seoFragment}
  ${richImageFragment}
`

interface Response {
  allJournalEntry: JournalEntry[]
  JournalPage: Maybe<JournalPageType>
}

interface JournalPageProps {
  entries: JournalEntry[]
  journalPage?: JournalPageType
}

const Journal = ({ entries, journalPage }: JournalPageProps) => {
  if (!journalPage) return <NotFound />
  return <JournalPage journalPage={journalPage} entries={entries} />
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const now = new Date()
  const currentDate = [
    now.getFullYear(),
    (now.getMonth() + 1).toString().padStart(2, '0'),
    now.getDate().toString().padStart(2, '0'),
  ].join('-')
  const variables = { currentDate }
  const [response, shopData] = await Promise.all([
    request<Response>(journalPageQuery, variables),
    requestShopData(),
  ])

  const entries = response?.allJournalEntry ?? []
  const journalPage = response?.JournalPage
  return { props: { journalPage, entries, shopData }, revalidate: 10 }
}

export default Journal
