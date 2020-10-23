import * as React from 'react'
import { QuizBlock } from '../../../types'
import { Tabs, Tab } from '../../../components/Tabs'
import { Intro } from './Intro'
import { Details } from './Details'
import { Contact } from './Contact'
import { Kind } from './Kind'
import { Notes } from './Notes'
import { Name } from './Name'

interface QuizProps {
  quizBlock: QuizBlock
}

export const Quiz = ({ quizBlock }: QuizProps) => {
  return (
    <Tabs initialTab="intro">
      <Tab name="intro">
        <Intro quizBlock={quizBlock} />
      </Tab>
      <Tab name="kind">
        <Kind />
      </Tab>
      <Tab name="details">
        <Details />
      </Tab>
      <Tab name="name">
        <Name />
      </Tab>
      <Tab name="contact">
        <Contact />
      </Tab>
      <Tab name="notes">
        <Notes />
      </Tab>
    </Tabs>
  )
}
