import * as React from 'react'
import { RichText } from '../RichText'
import { Header5 } from '../Text'
import { ProductInfo } from '../../types'
import { Wrapper, ToggleButton, Inner } from './styled'
import { useEffect, useRef } from 'react'

interface AccordionProps {
  content: ProductInfo
}

const AccordionTextWrapper = (props: any) => (
  <Header5 {...props} weight="normal" />
)

export const Accordion = ({ content }: AccordionProps) => {
  const { title, bodyRaw } = content
  const [open, setOpen] = React.useState(false)
  const [height, updateHeight] = React.useState(0)
  const toggleOpen = () => setOpen(!open)

  const refContainer = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!refContainer.current) return
    updateHeight(refContainer.current.clientHeight)
  }, [refContainer])

  return (
    <Wrapper>
      <ToggleButton onClick={toggleOpen}>{title}</ToggleButton>
      <Inner open={open} ref={refContainer}>
        <RichText blockWrapper={AccordionTextWrapper} body={bodyRaw} />
      </Inner>
    </Wrapper>
  )
}
