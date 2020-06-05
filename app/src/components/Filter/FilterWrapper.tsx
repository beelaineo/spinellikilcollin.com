import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { OpenButton } from './styled'

const { useState } = React

interface WithOpen {
  open: boolean
}

const Wrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.mobile} {
      border-color: body.0;
      border-bottom: 1px solid;
    }
  `}
`

const UpDown = styled.div<WithOpen>`
  ${({ open }) => css`
    width: 10px;
    height: 10px;
    border-color: currentColor;
    border-top: 1px solid;
    border-right: 1px solid;
    transform: rotate(${open ? '-45deg' : '135deg'});
    transform-origin: 50% 50%;
    margin-right: 5px;
  `}
`

const ButtonWrapper = styled.div`
  ${({ theme }) => css`
    display: none;

    ${theme.mediaQueries.mobile} {
      justify-content: space-between;
      align-items: center;
      display: flex;
      padding: 4 0;
    }
  `}
`

const Inner = styled.div<WithOpen>`
  ${({ theme, open }) => css`
    ${theme.mediaQueries.mobile} {
      display: ${open ? 'block' : 'none'};
    }
  `}
`

interface FilterWrapperProps {
  heading?: string | null | void
  children: React.ReactNode
}

export const FilterWrapper = ({ heading, children }: FilterWrapperProps) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)
  return (
    <Wrapper>
      <ButtonWrapper>
        <OpenButton textTransform="upperCase" level={3} onClick={toggleOpen}>
          {heading}
          <UpDown open={open} />
        </OpenButton>
      </ButtonWrapper>
      <Inner open={open}>{children}</Inner>
    </Wrapper>
  )
}
