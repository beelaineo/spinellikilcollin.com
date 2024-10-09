import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'

interface PlusMinusProps {
  open: boolean
}

const Wrapper = styled.div<PlusMinusProps>`
  ${({ open }) => css`
    width: 12px;
    height: 12px;
    position: relative;
    flex-shrink: 0;
    & span {
      position: absolute;
      background-color: currentColor;
    }

    & span:nth-of-type(1) {
      width: 1px;
      height: 100%;
      top: 0;
      left: 50%;
      transition: 0.3s;
      transform: ${open
        ? 'translateX(-50%) rotate(-90deg)'
        : 'translateX(-50%)'};
      transform: translateX(-50%);
      display: ${open ? 'none' : 'initial'};
    }

    & span:nth-of-type(2) {
      width: 100%;
      height: 1px;
      transform: translateY(-50%);
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
