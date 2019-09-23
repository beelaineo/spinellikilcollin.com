import * as React from 'react'
import { RichText } from '../RichText'
import { Header5 } from '../Text'
import { Wrapper, ToggleButton, Inner } from './styled'
import { useEffect, useRef } from 'react'

interface AccordionProps {
  label: string
  content: { [key: string]: string }
}

const AccordionTextWrapper = (props: any) => (
  <Header5 {...props} weight="normal" />
)

export const Accordion = ({ label, content }: AccordionProps) => {
  const [open, setOpen] = React.useState(false)
  const [height, updateHeight] = React.useState(0)
  const toggleOpen = () => setOpen(!open)

  let refContainer = useRef('0')
  useEffect(() => {
    updateHeight(refContainer.current.firstChild.clientHeight)
  }, [])

  return (
    <Wrapper>
      <ToggleButton onClick={toggleOpen}>{label}</ToggleButton>
      <Inner open={open} ref={refContainer} height={height}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
          possimus laboriosam itaque illo reiciendis nesciunt odio alias labore
          architecto esse ex, eum accusantium officiis praesentium at odit, quas
          amet harum!
        </p>
        <RichText blockWrapper={AccordionTextWrapper} body={content} />
      </Inner>
    </Wrapper>
  )
}
