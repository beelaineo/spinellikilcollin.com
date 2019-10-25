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

  let refContainer = useRef('0')
  useEffect(() => {
    updateHeight(refContainer.current.firstChild.clientHeight)
  }, [])

  return (
    <Wrapper>
      <ToggleButton onClick={toggleOpen}>{title}</ToggleButton>
      <Inner open={open}>
        <RichText blockWrapper={AccordionTextWrapper} body={bodyRaw} />
      </Inner>
    </Wrapper>
  )
}
