import * as React from 'react'
import { useTabs, Tabs, Tab } from '../../../components/Tabs'
import { Form } from '../../../components/Forms'
import { Customize as CustomizeType } from '../../../types'
import { PageWrapper } from '../../../components/Layout'
import { HeroBlock } from '../../../components/ContentBlock/HeroBlock'
import { SEO } from '../../../components/SEO'
import { definitely, isValidHero, getHeroImage } from '../../../utils'
import { submitToHubspot } from '../../../services/hubspot'
import { Details } from './Details'
import { Contact } from './Contact'
import { Kind } from './Kind'
import { Notes } from './Notes'
import { Name } from './Name'
import { ThankYou } from './ThankYou'

interface QuizProps {
  customize: CustomizeType
}

export interface FormValues {
  kind: string[]
  styles: string[]
  full_name: string
  email: string
  phone: string
  notes: string
}

const initialValues: FormValues = {
  kind: [],
  styles: [],
  full_name: '',
  email: '',
  phone: '',
  notes: '',
}

const formId = 'a50b3513-a12c-49fd-88c0-60f0cb4cb6ef'

const QuizInner = ({ customize }: QuizProps) => {
  const { seo, hero, quizProductTypes, quizStyles } = customize
  const { goToTab } = useTabs()
  const defaultSeo = {
    title: 'Customize',
    image: getHeroImage(hero),
  }

  const handleSubmit = async (formValues: FormValues) => {
    const values = {
      ...formValues,
      styles: formValues.styles.join(', '),
      kind: formValues.kind.join(', '),
    }
    await fetch('/api/submitQuiz', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    await submitToHubspot(values, formId)
    goToTab('thankyou')
  }

  return (
    <>
      <SEO seo={seo} defaultSeo={defaultSeo} path="customize/quiz" />
      {hero && isValidHero(hero) ? <HeroBlock hero={hero} /> : null}
      <PageWrapper pt={3}>
        <Form<FormValues> initialValues={initialValues} onSubmit={handleSubmit}>
          <Tab name="kind">
            <Kind quizProductTypes={definitely(quizProductTypes)} />
          </Tab>
          <Tab name="details">
            <Details quizStyles={definitely(quizStyles)} />
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
          <Tab name="thankyou">
            <ThankYou />
          </Tab>
        </Form>
      </PageWrapper>
    </>
  )
}

export const Quiz = ({ customize }: QuizProps) => (
  <Tabs initialTab="kind" mode="hidden">
    <QuizInner customize={customize} />
  </Tabs>
)
