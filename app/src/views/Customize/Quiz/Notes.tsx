import * as React from 'react'
import { useFormikContext } from 'formik'
import { Button } from '../../../components/Button'
import { TextArea } from '../../../components/Forms'
import { Heading } from '../../../components/Text'
import { QuizTabWrapper } from './styled'

export const Notes = () => {
  const { values } = useFormikContext()
  return (
    <QuizTabWrapper>
      <Heading textAlign="center" level={2}>
        Any other thoughts?
      </Heading>
      <TextArea name="notes" />
      <Button type="submit" mt={3} level={2}>
        Submit
      </Button>
    </QuizTabWrapper>
  )
}
