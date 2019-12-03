import * as React from 'react'
import { RichText } from '../RichText'
import { Header5 } from '../Text'
import { ProductInfo } from '../../types'
import { Wrapper, ToggleButton, Inner, AccordionButtonStyles } from '../styled'
import { useEffect, useRef } from 'react'

interface AccordionButtonProps {
  content: ButtonInfo
}

export const AccordionButton = ({ content }: AccordionButtonProps) => {
  const [selected, setSelected] = React.useState(false)
  const toggleOpen = () => setSelected(!selected)

  return (
    <AccordionButtonStyles onClick={toggleOpen} selected={selected}>
      {content}
    </AccordionButtonStyles>
  )
}
