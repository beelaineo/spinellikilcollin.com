import * as React from 'react'
import styled from '@xstyled/styled-components'
import { FormBlock } from '../../types'
import { CustomizationForm, RingSizerForm, VIPSignupForm } from '../Forms'

const Wrapper = styled.div`
  margin: 9 auto;
  max-width: 500px;
  padding: 5;
  background-color: body.0;
  box-shadow: 0 2px 6px 1px rgba(0, 0, 0, 0.2);
`

interface EmbeddedFormProps {
  block: FormBlock
}

export const EmbeddedForm = ({ block }: EmbeddedFormProps) => {
  switch (block.formType) {
    case 'customizationInquiry':
      return (
        <Wrapper>
          <CustomizationForm />
        </Wrapper>
      )
    case 'ringSizer':
      return (
        <Wrapper>
          <RingSizerForm />
        </Wrapper>
      )
    case 'vipSignup':
      return (
        <Wrapper>
          <VIPSignupForm />
        </Wrapper>
      )
    default:
      console.warn('No form is set up for this block:', block)
      return null
  }
}
