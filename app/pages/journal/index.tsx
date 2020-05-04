import * as React from 'react'
import gql from 'graphql-tag'
import { ThemeProvider } from '@xstyled/styled-components'
import { JournalEntry } from '../../src/types'
import { richImageFragment } from '../../src/graphql'
import { PageContext } from '../_app'
import { JournalPage } from '../../src/views/JournalPage'

const journalPageQuery = gql`
  query JournalPageQuery {
    allJournalEntry {
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

Journal.getInitialProps = async (
  ctx: PageContext,
): Promise<JournalPageProps> => {
  const { apolloClient } = ctx
  const now = new Date()
  const currentDate = [
    now.getFullYear(),
    now
      //
      .getMonth()
      .toString()
      .padStart(2, '0'),
    now
      //
      .getDate()
      .toString()
      .padStart(2, '0'),
  ].join('-')
  const variables = { currentDate }
  const response = await apolloClient.query<Response>({
    query: journalPageQuery,
    variables,
  })
  const entries = response.data.allJournalEntry || []
  return { entries }
}

export default Journal
