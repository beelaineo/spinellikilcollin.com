import * as React from 'react'
import styled, { css } from 'styled-components'

interface PlusMinusProps {
  open: boolean
}

const Wrapper = styled.div`
  ${({ open }: PlusMinusProps) => css`
    width: 1em;
    height: 1em;
    position: relative;

    & span {
      position: absolute;
      background-color: currentColor;
    }

    & span:nth-of-type(1) {
      width: 1px;
      height: 100%;
      top: 0;
      left: 50%;
      display: ${open ? 'none' : 'initial'};
    }

    & span:nth-of-type(2) {
      width: 100%;
      height: 1px;
      left: 0;
      top: 50%;
    }
  `}
`

export const PlusMinus = ({ open }: PlusMinusProps) => (
  <Wrapper open={open}>
    <span />
    <span />
  </Wrapper>
)
