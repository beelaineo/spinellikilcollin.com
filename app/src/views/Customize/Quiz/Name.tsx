import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import { useFormikContext } from 'formik'
import { useTabs } from '../../../components/Tabs'
import { Field } from '../../../components/Forms'
import { Heading } from '../../../components/Text'
import { ContactFields, QuizTabWrapper, NextButton } from './styled'
import { FormValues } from './types'

export const Name = () => {
  const { goToTab } = useTabs()
  const { values } = useFormikContext<FormValues>()
  const advance = () => goToTab('contact')

  return (
    <QuizTabWrapper>
      <Heading textAlign="center" level={2}>
        What’s your name?
      </Heading>
      <ContactFields>
        <Field name="full_name" placeholder="Name" />
      </ContactFields>
      <NextButton onClick={advance} disabled={values.full_name.length === 0} />
    </QuizTabWrapper>
  )
}
