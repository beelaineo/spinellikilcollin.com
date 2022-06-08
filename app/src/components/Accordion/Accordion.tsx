import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Label, Wrapper, Inner } from './styled'
import { useEffect, useRef } from 'react'
import { PlusMinus } from '../PlusMinus'

interface AccordionProps {
  label: string
  children: React.ReactNode
}

export const Accordion = ({ label, children }: AccordionProps) => {
  const [open, setOpen] = React.useState(false)
  const [height, updateHeight] = React.useState(0)
  const toggleOpen = () => setOpen(!open)

  const refContainer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!refContainer.current) return
    updateHeight(refContainer.current.clientHeight)
  }, [refContainer])

  const formatSelector = (label: string) => {
    return label
      .concat(' accordion')
      .normalize('NFKD') // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
      .toLowerCase() // Convert the string to lowercase letters
      .trim() // Remove whitespace from both sides of a string (optional)
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
  }

  return (
    <Wrapper id={formatSelector(label)}>
      <Label onClick={toggleOpen}>
        {label}
        <PlusMinus open={open} />
      </Label>
      <Inner open={open} ref={refContainer}>
        {children}
      </Inner>
    </Wrapper>
  )
}
