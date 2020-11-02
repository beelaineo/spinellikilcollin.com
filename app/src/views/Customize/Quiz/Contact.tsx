import * as React from 'react'
import { useFormikContext } from 'formik'
import { useTabs } from '../../../components/Tabs'
import { Button } from '../../../components/Button'
import { Field } from '../../../components/Forms'
import { Heading } from '../../../components/Text'
import { QuizTabWrapper, FieldWithButton } from './styled'
import { FormValues } from './Quiz'
import RightArrow from '../../../svg/RightArrow.svg'

export const Contact = () => {
  const { goToTab } = useTabs()
  const { values } = useFormikContext<FormValues>()
  const advance = () => goToTab('notes')

  return (
    <QuizTabWrapper>
      <Heading textAlign="center" level={2}>
        How do we reach you?
      </Heading>
      <FieldWithButton>
        <Field required name="email" type="email" placeholder="Email" />
        <Button
          type="button"
          disabled={values.email.length === 0}
          onClick={advance}
          level={3}
        >
          <RightArrow />
        </Button>
      </FieldWithButton>
      <FieldWithButton>
        <Field name="phone" type="tel" placeholder="Phone" />
        <Button
          type="button"
          disabled={values.phone.length === 0}
          onClick={advance}
          level={3}
        >
          <RightArrow />
        </Button>
      </FieldWithButton>
    </QuizTabWrapper>
  )
}
