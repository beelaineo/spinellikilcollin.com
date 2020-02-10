import * as React from 'react'
import { RichText } from '../../RichText'
import { Header5 } from '../../Text'
import { ProductInfo } from '../../../types'
import { Wrapper, ToggleButton, Inner, AccordionButtonStyles } from '../styled'
import { useEffect, useRef } from 'react'

interface AccordionButtonProps {
  children: React.ReactNode
  size: string
}

export const AccordionButton = ({ children, size }: AccordionButtonProps) => {
  const [selected, setSelected] = React.useState(false)
  const toggleOpen = () => setSelected(!selected)

  return (
    <AccordionButtonStyles size={size} onClick={toggleOpen} selected={selected}>
      {children}
    </AccordionButtonStyles>
  )
}
