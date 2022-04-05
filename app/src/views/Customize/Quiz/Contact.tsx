import * as React from 'react'
import { useFormikContext } from 'formik'
import { useTabs } from '../../../components/Tabs'
import { Field } from '../../../components/Forms'
import { Heading } from '../../../components/Text'
import { QuizTabWrapper, ContactFields, NextButton } from './styled'
import { FormValues } from './types'

const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}/

const validateEmail = (value: string) => {
  if (!emailRegex.test(value)) return 'Enter a valid email address'
  return undefined
}

export const Contact = () => {
  const { goToTab } = useTabs()
  const { values, errors } = useFormikContext<FormValues>()
  const advance = () => goToTab('notes')
  const advanceDisabled =
    Boolean(values.email.length > 0 && errors.email !== undefined) &&
    Boolean(values.phone.length > 0 && errors.phone !== undefined)

  return (
    <QuizTabWrapper>
      <Heading textAlign="center" level={2}>
        How do we reach you?
      </Heading>
      <ContactFields>
        <Field
          required
          name="email"
          validate={validateEmail}
          type="email"
          placeholder="Email"
        />
        <Field name="phone" type="tel" placeholder="Phone" />
      </ContactFields>
      <NextButton onClick={advance} disabled={advanceDisabled} />
    </QuizTabWrapper>
  )
}
