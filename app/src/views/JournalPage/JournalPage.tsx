import * as React from 'react'
import { PageWrapper } from '../../components/Layout'
import { JournalPage as JournalPageType, JournalEntry } from '../../types'
import { JournalEntryLink } from './JournalEntryLink'
import { SEO } from '../../components/SEO'

interface JournalPageProps {
  entries: JournalEntry[]
  journalPage: JournalPageType
}

export const JournalPage = ({ journalPage, entries }: JournalPageProps) => {
  const { title, seo } = journalPage
  const defaultSeo = {
    title: title ?? 'Journal',
  }
  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path="journal" />
      <PageWrapper px={{ xs: 4, lg: 7 }} tabIndex={-1}>
        {entries.map((entry, index) => (
          <JournalEntryLink
            featured={index === 0}
            entry={entry}
            key={entry._id || 'some-key'}
          />
        ))}
      </PageWrapper>
    </>
  )
}
