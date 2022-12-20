import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Label, Wrapper, Inner, Item } from './styled'
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
  }, [open, refContainer])

  useEffect(() => {
    if (open) return

    setTimeout(() => {
      setOpen(label === 'Description')
    }, 3000)
  }, [label])

  return (
    <Wrapper>
      <Label onClick={toggleOpen}>
        {label}
        <PlusMinus open={open} />
      </Label>
      <Inner open={open} height={height}>
        <Item ref={refContainer}>{children}</Item>
      </Inner>
    </Wrapper>
  )
}
