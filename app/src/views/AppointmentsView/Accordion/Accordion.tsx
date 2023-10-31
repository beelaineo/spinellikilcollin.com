import * as React from 'react'
import { Label, Wrapper, Inner, Item } from './styled'
import { useEffect, useRef } from 'react'

interface AccordionProps {
  renderLabel: any
  children: React.ReactNode
}

export const Accordion = ({ renderLabel, children }: AccordionProps) => {
  const [open, setOpen] = React.useState(false)
  const toggleOpen = () => setOpen(!open)

  const [height, updateHeight] = React.useState(0)

  const refContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = refContainer?.current

    if (!element) return

    const observer = new ResizeObserver(() => {
      if (!refContainer.current) return

      updateHeight(refContainer.current.clientHeight)
    })

    observer.observe(element)
    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <Wrapper>
      <Label onClick={() => setOpen(!open)}>{renderLabel()}</Label>
      <Inner tabIndex={-1} open={open} height={height}>
        <Item ref={refContainer}>{children}</Item>
      </Inner>
    </Wrapper>
  )
}
