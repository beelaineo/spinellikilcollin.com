import * as React from 'react'
import { useFormikContext } from 'formik'
import { useTabs } from '../../../components/Tabs'
import { Button } from '../../../components/Button'
import { Field } from '../../../components/Forms'
import { Heading } from '../../../components/Text'
import { QuizTabWrapper, FieldWithButton } from './styled'
import { FormValues } from './Quiz'
import RightArrow from '../../../svg/RightArrow.svg'

export const Name = () => {
  const { goToTab } = useTabs()
  const { values } = useFormikContext<FormValues>()
  const advance = () => goToTab('contact')

  return (
    <QuizTabWrapper>
      <Heading textAlign="center" level={2}>
        What’s your name?
      </Heading>
      <FieldWithButton>
        <Field name="full_name" placeholder="Name" />
        <Button
          type="button"
          disabled={values.full_name.length === 0}
          onClick={advance}
          level={3}
        >
          <RightArrow />
        </Button>
      </FieldWithButton>
    </QuizTabWrapper>
  )
}
