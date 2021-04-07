import * as React from 'react'
import { useFormikContext } from 'formik'
import { QuizProductType, RichImage } from '../../../types'
import { useTabs } from '../../../components/Tabs'
import { Heading } from '../../../components/Text'
import { HiddenField } from '../../../components/Forms'
import { Image } from '../../../components/Image'
import { unique } from '../../../utils'
import {
  NextButton,
  QuizTabWrapper,
  KindButtons,
  KindButtonWrapper,
} from './styled'

const { useState, useEffect } = React

interface KindButtonProps {
  image: RichImage
  selected: boolean
  label: string
  onClick: () => void
}

const KindButton = ({ image, label, selected, onClick }: KindButtonProps) => {
  if (!image || !label) return null

  return (
    <KindButtonWrapper selected={selected} type="button" onClick={onClick}>
      <Image ratio={1} image={image} />
      <Heading color={selected ? 'body.9' : 'body.5'} level={4}>
        {label}
      </Heading>
    </KindButtonWrapper>
  )
}

interface KindProps {
  quizProductTypes: QuizProductType[]
}

export const Kind = ({ quizProductTypes }: KindProps) => {
  const [kinds, setKinds] = useState<string[]>([])
  const { setFieldValue } = useFormikContext()
  const { goToTab } = useTabs()

  const toggleKindValue = (value: string | null | undefined) => () => {
    if (!value) return

    if (kinds.includes(value)) {
      setKinds(kinds.filter((k) => k !== value))
    } else {
      setKinds(unique([...kinds, value]))
    }
  }

  const advance = () => goToTab('details')
  const disabled = kinds.length === 0

  useEffect(() => {
    setFieldValue('kind', kinds)
  }, [kinds])

  return (
    <QuizTabWrapper>
      <Heading level={4}>Let’s start by answering a few questions.</Heading>
      <Heading level={3}>What kind of piece are you looking for?</Heading>
      <HiddenField name="kind" />
      <KindButtons>
        {quizProductTypes.map(({ _key, title, image }) =>
          title && image ? (
            <KindButton
              key={_key || 'some-key'}
              label={title}
              image={image}
              selected={kinds.includes(title)}
              onClick={toggleKindValue(title)}
            />
          ) : null,
        )}
      </KindButtons>
      <NextButton onClick={advance} disabled={disabled} />
    </QuizTabWrapper>
  )
}
