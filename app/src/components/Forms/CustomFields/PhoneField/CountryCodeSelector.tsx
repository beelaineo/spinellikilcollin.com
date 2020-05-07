import * as React from 'react'
import styled, { Box } from '@xstyled/styled-components'
import { Heading } from '../../../Text'
import { CountryOption } from './utils'
import { HiddenSelect } from './HiddenSelect'

interface CountryCodeSelectorProps {
  options: CountryOption[]
  currentOption?: CountryOption
  name: string
}

const Wrapper = styled(Box)`
  display: block;
  position: relative;
`

interface SelectWrapperProps {
  visible: boolean
}

const ButtonWrapper = styled.div`
  margin-right: 1;
  display: flex;
  align-items: center;
`

const DialingCode = styled(Heading)`
  padding: 1px 0 0;
`

const CountryButton = styled.div`
  display: block;
  text-align: center;
  font-size: 2;
  padding: 0 2 0 19px;
  border: 1px solid;
  margin-right: 1;
  color: body.4;
  position: relative;
  border-radius: 2px;

  &:after {
    content: '';
    position: absolute;
    left: 5px;
    top: calc(50% - 6px);
    transform: rotate(45deg);
    border-color: currentColor;
    border: 4px solid;
    border-top-color: transparent;
    border-left-color: transparent;
  }

  &:hover {
    color: body.2;
  }
`

export const CountryCodeSelector = ({
  name,
  options,
  currentOption,
}: CountryCodeSelectorProps) => {
  const dialingCode = currentOption?.meta?.dialingCode

  return (
    <Wrapper>
      <ButtonWrapper>
        <CountryButton>
          {currentOption ? currentOption.meta.flagEmoji : ''}
        </CountryButton>
        <HiddenSelect options={options} name={name} />
        <DialingCode level={3} color="body.1">
          {dialingCode ? '+' + dialingCode : ''}
        </DialingCode>
      </ButtonWrapper>
    </Wrapper>
  )
}
