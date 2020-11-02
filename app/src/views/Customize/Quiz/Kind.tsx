import * as React from 'react'
import { useFormikContext } from 'formik'
import { useTabs } from '../../../components/Tabs'
import { Heading } from '../../../components/Text'
import { HiddenField } from '../../../components/Forms'
import { QuizTabWrapper, KindButtons, KindButtonWrapper } from './styled'

const { useState, useEffect } = React

interface KindButtonProps {
  image: string
  label: string
  onClick: () => void
}

const KindButton = ({ image, label, onClick }: KindButtonProps) => (
  <KindButtonWrapper type="button" onClick={onClick}>
    <img src={`/static/images/quiz_${image}.png`} alt={label} />
    <Heading level={4}>{label}</Heading>
  </KindButtonWrapper>
)

export const Kind = () => {
  const [kind, setKind] = useState<string | undefined>(undefined)
  const { setFieldValue } = useFormikContext()
  const { goToTab } = useTabs()

  useEffect(() => {
    if (!kind) return
    setFieldValue('kind', kind)
    goToTab('details')
  }, [kind])

  const setKindValue = (value: string) => () => setKind(value)

  return (
    <QuizTabWrapper>
      <Heading level={4}>Let’s start by answering a few questions.</Heading>
      <Heading level={2}>What kind of piece are you looking for?</Heading>
      <HiddenField name="kind" />
      <KindButtons>
        <KindButton label="Ring" onClick={setKindValue('Ring')} image="ring" />
        <KindButton
          label="Necklace"
          onClick={setKindValue('Necklace')}
          image="necklace"
        />
        <KindButton
          label="Bracelet"
          onClick={setKindValue('Bracelet')}
          image="bracelet"
        />
        <KindButton
          label="Earrings"
          onClick={setKindValue('Earrings')}
          image="earrings"
        />
      </KindButtons>
    </QuizTabWrapper>
  )
}
