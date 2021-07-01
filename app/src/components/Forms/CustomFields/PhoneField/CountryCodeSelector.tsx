import * as React from 'react'
import styled, { css, Box } from '@xstyled/styled-components'
import { Heading } from '../../../Text'
import { CountryPhoneOption } from './utils'
import { HiddenSelect } from './HiddenSelect'

interface CountryCodeSelectorProps {
  options: CountryPhoneOption[]
  currentOption?: CountryPhoneOption
  name: string
  currentValue?: string | null
}

const Wrapper = styled(Box)`
  display: block;
  margin-right: -6px;
`

interface SelectWrapperProps {
  visible: boolean
}

const ButtonWrapper = styled.div`
  margin: 0 1;
  display: flex;
  align-items: center;
  position: relative;
`

const DialingCode = styled(Heading)`
  padding: 2px 0 0;
`

const CountryButton = styled.div`
  display: block;
  text-align: center;
  font-size: 3;
  padding: 0 2 0 19px;
  border: 1px solid;
  margin-right: 1;
  color: body.6;
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
  currentValue,
}: CountryCodeSelectorProps) => {
  const dialingCode = currentOption?.meta?.dialingCode
  const color = Boolean(currentValue && currentValue.length > 0)
    ? 'body.9'
    : 'body.6'

  return (
    <Wrapper>
      <ButtonWrapper>
        <CountryButton>
          {currentOption ? currentOption.meta.flagEmoji : ''}
        </CountryButton>
        <HiddenSelect options={options} name={name} />
        <DialingCode level={5} color={color}>
          {dialingCode ? '+' + dialingCode : ''}
        </DialingCode>
      </ButtonWrapper>
    </Wrapper>
  )
}
