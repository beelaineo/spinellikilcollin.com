import * as React from 'react'
import gql from 'graphql-tag'
import { GetStaticProps } from 'next'
import { JournalEntry } from '../../src/types'
import { richImageFragment } from '../../src/graphql'
import { JournalPage } from '../../src/views/JournalPage'
import { request } from '../../src/graphql'
import { requestShopData } from '../../src/providers/ShopDataProvider/shopDataQuery'

const journalPageQuery = gql`
  query JournalPageQuery($currentDate: Date) {
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
  ${richImageFragment}
`

interface Response {
  allJournalEntry: JournalEntry[]
}

interface JournalPageProps {
  entries: JournalEntry[]
}

const Journal = ({ entries }: JournalPageProps) => {
  return <JournalPage entries={entries} />
}

/**
 * Initial Props
 */

export const getStaticProps: GetStaticProps = async (ctx) => {
  const now = new Date()
  const currentDate = [
    now.getFullYear(),
    (now.getMonth() + 1).toString().padStart(2, '0'),
    now
      //
      .getDate()
      .toString()
      .padStart(2, '0'),
  ].join('-')
  const variables = { currentDate }
  const [response, shopData] = await Promise.all([
    request<Response>(journalPageQuery, variables),
    requestShopData(),
  ])

  const entries = response?.allJournalEntry ?? []
  return { props: { entries, shopData }, unstable_revalidate: 60 }
}

export default Journal
