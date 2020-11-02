import * as React from 'react'
import { useFormikContext } from 'formik'
import { useTabs } from '../../../components/Tabs'
import { Button } from '../../../components/Button'
import { Heading } from '../../../components/Text'
import { HiddenField } from '../../../components/Forms'
import RightArrow from '../../../svg/RightArrow.svg'
import { QuizTabWrapper, DetailButtons, DetailButtonWrapper } from './styled'

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

const values = [
  'Lots of gold!',
  'Bold and strong',
  'Minimal and clean',
  'Delicate',
  'The more stones, the Merrier!',
]

export const Details = () => {
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
        {values.map((value) => (
          <DetailButton
            key={value}
            value={value}
            handleClick={toggleSelection(value)}
            isSelected={details.includes(value)}
          />
        ))}
      </DetailButtons>
      <Button onClick={advance} level={3} disabled={details.length === 0}>
        Next
        <RightArrow />
      </Button>
    </QuizTabWrapper>
  )
}
