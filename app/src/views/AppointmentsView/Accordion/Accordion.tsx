import * as React from 'react'
import { Label, Wrapper, Inner, Item } from './styled'
import { useEffect, useRef } from 'react'

interface AccordionProps {
  renderLabel: any
  children: React.ReactNode
  index: number
  setActiveIndex: (index: number) => void
  isActive: boolean
}

export const Accordion = ({
  renderLabel,
  index,
  setActiveIndex,
  isActive,
  children,
}: AccordionProps) => {
  const [open, setOpen] = React.useState(false)

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

  const handleClick = () => {
    setActiveIndex(open ? -1 : index)
  }

  useEffect(() => {
    setOpen(isActive)
  }, [isActive])

  return (
    <Wrapper>
      <Label onClick={handleClick}> {renderLabel()}</Label>
      <Inner tabIndex={-1} open={open} height={height}>
        <Item ref={refContainer}>{children}</Item>
      </Inner>
    </Wrapper>
  )
}
