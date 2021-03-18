import * as React from 'react'
import { useFormikContext } from 'formik'
import { Button } from '../../../components/Button'
import { TextArea } from '../../../components/Forms'
import { Heading } from '../../../components/Text'
import { ContactFields, QuizTabWrapper } from './styled'

export const Notes = () => {
  const { values } = useFormikContext()
  return (
    <QuizTabWrapper>
      <Heading textAlign="center" level={2}>
        Any other thoughts?
      </Heading>
      <ContactFields>
        <TextArea name="notes" />
      </ContactFields>
      <Button type="submit" mt={4} level={2}>
        Submit
      </Button>
    </QuizTabWrapper>
  )
}
