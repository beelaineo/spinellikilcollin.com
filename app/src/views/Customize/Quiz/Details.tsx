import * as React from 'react'
import { useFormikContext } from 'formik'
import { useTabs } from '../../../components/Tabs'
import { Heading } from '../../../components/Text'
import { HiddenField } from '../../../components/Forms'
import {
  NextButton,
  QuizTabWrapper,
  DetailButtons,
  DetailButtonWrapper,
} from './styled'

const { useState, useEffect } = React

interface DetailButtonProps {
  value: string
  handleClick: () => void
  isSelected: boolean
}

const DetailButton = ({
  value,
  handleClick,
  isSelected,
}: DetailButtonProps) => (
  <DetailButtonWrapper
    type="button"
    onClick={handleClick}
    isSelected={isSelected}
  >
    {value}
  </DetailButtonWrapper>
)

interface DetailsProps {
  quizStyles: string[]
}

export const Details = ({ quizStyles }: DetailsProps) => {
  const [details, setDetails] = useState<string[]>([])
  const { setFieldValue } = useFormikContext()
  const { goToTab } = useTabs()

  const advance = () => goToTab('name')

  const toggleSelection = (value: string) => () => {
    if (!details.includes(value)) {
      setDetails([...details, value])
    } else {
      setDetails(details.filter((d) => d !== value))
    }
  }

  useEffect(() => {
    setFieldValue('styles', details)
  }, [details])

  return (
    <QuizTabWrapper>
      <Heading textAlign="center" level={2}>
        Tell us about your style preferences!{'\n'}Select the details you tend
        to gravitate towards.
      </Heading>
      <HiddenField name="details" />
      <DetailButtons>
        {quizStyles.map((value) => (
          <DetailButton
            key={value}
            value={value}
            handleClick={toggleSelection(value)}
            isSelected={details.includes(value)}
          />
        ))}
      </DetailButtons>
      <NextButton onClick={advance} disabled={details.length === 0} />
    </QuizTabWrapper>
  )
}
