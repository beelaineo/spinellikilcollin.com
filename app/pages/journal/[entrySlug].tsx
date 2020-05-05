import * as React from 'react'
import gql from 'graphql-tag'
import { JournalEntry as JournalEntryType } from '../../src/types'
import { PageContext } from '../_app'
import { NotFound } from '../../src/views/NotFound'
import { JournalEntryPage } from '../../src/views/JournalEntryPage'

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
    }
  }
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

JournalEntry.getInitialProps = async (ctx: PageContext) => {
  const { apolloClient, query } = ctx
  const variables = { slug: query.entrySlug }
  const response = await apolloClient.query<Response>({
    query: journalEntryQuery,
    variables,
  })
  const entries = response?.data?.allJournalEntry

  const entry = entries.length ? entries[0] : undefined
  return { entry }
}

export default JournalEntry
