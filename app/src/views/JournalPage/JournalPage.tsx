import * as React from 'react'
import { JournalEntry } from '../../types'

interface JournalPageProps {
  entries: JournalEntry[]
}

export const JournalPage = (props: JournalPageProps) => {
  console.log(props)
  return <div>...</div>
}
