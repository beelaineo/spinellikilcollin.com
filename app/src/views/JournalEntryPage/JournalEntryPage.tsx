import * as React from 'react'
import Link from 'next/link'
import { JournalEntry } from '../../types'
import { PageWrapper } from '../../components/Layout'
import { Heading } from '../../components/Text'

interface JournalEntryPageProps {
  entry: JournalEntry
}

export const JournalEntryPage = ({ entry }: JournalEntryPageProps) => {
  return (
    <PageWrapper>
      <Link href="/journal">
        <a>
          <Heading level={5}>Back to Journal</Heading>
        </a>
      </Link>
    </PageWrapper>
  )
}
