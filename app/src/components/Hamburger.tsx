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
    width: 36px;
    height: 24px;
    margin-top: -9px;

    display: block;
    z-index: 3;
    &:hover {
      opacity: 0.5;
    }

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: black;
      display: block;
      margin: 0;
      transition: 50ms ease;
    }

    span:nth-child(1) {
      top: 0;
      display: ${open ? 'none' : 'block'};
    }
    span:nth-child(3) {
      top: 50%;

      transform: ${open ? 'rotate(-45deg)' : 'rotate(0) translateY(-50%)'};
    }
    span:nth-child(2) {
      top: 50%;
      display: ${open ? 'block' : 'none'};
      transform: ${open ? 'rotate(45deg)' : 'rotate(0) translateY(0px)'};
    }
    span:nth-child(4) {
      bottom: 0;
      display: ${open ? 'none' : 'block'};
    }
    ${theme.mediaQueries.mobile} {
      width: 20px;
      height: 14px;
      margin-top: 0;

      span:nth-child(1) {
        transform: ${open ? 'rotate(45deg)' : 'rotate(0) translateY(0px)'};
      }
      span:nth-child(3) {
        transform: ${open ? 'rotate(-45deg)' : 'rotate(0) translateY(0px)'};
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
      <span />
    </HamburgerWrapper>
  )
}
