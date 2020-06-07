import React from 'react'
import styled, { css, DefaultTheme } from '@xstyled/styled-components'

export interface HamburgerWrapperProps {
  theme: DefaultTheme
  open?: boolean
}

const HamburgerWrapper = styled.button`
  ${({ open, theme }: HamburgerWrapperProps) => css`
    cursor: pointer;
    transition: 250ms ease;
    position: relative;
    z-index: 3;
    &:hover {
      opacity: 0.5;
    }

    span {
      width: 30px;
      height: 1px;
      background-color: black;
      display: block;
      margin: 9px 0;
      transition: 50ms ease;
    }

    span:nth-child(1) {
      transform: ${open
        ? 'rotate(45deg) translateY(1px) translateX(10px)'
        : 'rotate(0) translateY(0px)'};
    }
    span:nth-child(3) {
      transform: ${open
        ? 'rotate(-45deg) translateY(3px) translateX(6px)'
        : 'rotate(0) translateY(0px)'};
    }
    span:nth-child(2) {
      display: ${open ? 'none' : 'block'};
    }
    ${theme.mediaQueries.mobile} {
      span {
        margin: 6px 0;
        width: 20px;
      }

      span:nth-child(1) {
        transform: ${open
          ? 'rotate(45deg) translateY(1px) translateX(8px)'
          : 'rotate(0) translateY(0px)'};
      }
      span:nth-child(3) {
        transform: ${open
          ? 'rotate(-45deg) translateY(3px) translateX(4px)'
          : 'rotate(0) translateY(0px)'};
      }
    }
  `}
`

interface HamburgerProps {
  open: boolean
  onClick?: () => void
  /* */
}

export const Hamburger = ({ open, onClick }: HamburgerProps) => {
  return (
    <HamburgerWrapper open={open} onClick={onClick}>
      <span />
      <span />
      <span />
    </HamburgerWrapper>
  )
}
