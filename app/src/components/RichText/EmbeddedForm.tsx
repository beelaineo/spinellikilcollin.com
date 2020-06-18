import * as React from 'react'
import styled from '@xstyled/styled-components'
import { FormBlock } from '../../types'
import { CustomizationForm, RingSizerForm } from '../Forms'

const Wrapper = styled.div`
  margin: 3 auto;
  max-width: 500px;
  padding: 3;
  border: 1px solid;
  background-color: body.0;
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
    default:
      console.warn('No form is set up for this block:', block)
      return null
  }
}
