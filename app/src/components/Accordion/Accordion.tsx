import * as React from 'react'
import { RichText } from '../RichText'
import { Header5 } from '../Text'
import { ProductInfo } from '../../types'
import { Wrapper, ToggleButton, Inner } from './styled'

interface AccordionProps {
  content: ProductInfo
}

const AccordionTextWrapper = (props: any) => (
  <Header5 {...props} weight="normal" />
)

export const Accordion = ({ content }: AccordionProps) => {
  const { title, bodyRaw } = content
  const [open, setOpen] = React.useState(false)
  const toggleOpen = () => setOpen(!open)

  return (
    <Wrapper>
      <ToggleButton onClick={toggleOpen}>{title}</ToggleButton>
      <Inner open={open}>
        <RichText blockWrapper={AccordionTextWrapper} body={bodyRaw} />
      </Inner>
    </Wrapper>
  )
}
