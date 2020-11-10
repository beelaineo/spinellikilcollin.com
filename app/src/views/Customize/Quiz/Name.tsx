import * as React from 'react'
import { useFormikContext } from 'formik'
import { useTabs } from '../../../components/Tabs'
import { Field } from '../../../components/Forms'
import { Heading } from '../../../components/Text'
import { QuizTabWrapper, NextButton } from './styled'
import { FormValues } from './Quiz'

export const Name = () => {
  const { goToTab } = useTabs()
  const { values } = useFormikContext<FormValues>()
  const advance = () => goToTab('contact')

  return (
    <QuizTabWrapper>
      <Heading textAlign="center" level={2}>
        What’s your name?
      </Heading>
      <Field name="full_name" placeholder="Name" />
      <NextButton onClick={advance} disabled={values.full_name.length === 0} />
    </QuizTabWrapper>
  )
}
