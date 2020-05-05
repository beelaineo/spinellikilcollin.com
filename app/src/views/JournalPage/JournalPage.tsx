import * as React from 'react'
import { PageWrapper } from '../../components/Layout'
import { JournalEntry } from '../../types'
import { JournalEntryLink } from './JournalEntryLink'

interface JournalPageProps {
  entries: JournalEntry[]
}

export const JournalPage = ({ entries }: JournalPageProps) => {
  return (
    <PageWrapper>
      {entries.map((entry, index) => (
        <JournalEntryLink
          isFirst={index === 0}
          entry={entry}
          key={entry._id || 'some-key'}
        />
      ))}
    </PageWrapper>
  )
}
