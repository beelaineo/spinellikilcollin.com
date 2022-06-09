import React from 'react'
import styled, { css, DefaultTheme } from '@xstyled/styled-components'

export interface HamburgerWrapperProps {
  theme: DefaultTheme
  open?: boolean
  colorTheme?: 'light' | 'dark'
}

const HamburgerWrapper = styled.button`
  ${({ open, theme, colorTheme }: HamburgerWrapperProps) => css`
    cursor: pointer;
    transition: 250ms ease;
    position: relative;
    width: 36px;
    height: 24px;

    display: block;
    z-index: 3;
    &:hover {
      opacity: 0.5;
    }
    &:focus {
      outline-color: ${theme.colors.grays[5]};
      outline-offset: 2px;
      outline-style: auto;
    }

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: ${colorTheme == 'light'
        ? theme.colors.grays[1]
        : 'black'};
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
    ${theme.mediaQueries.tablet} {
      width: 28px;
      height: 19px;
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
  colorTheme?: 'light' | 'dark'
  /* */
}

export const Hamburger = ({ open, onClick, colorTheme }: HamburgerProps) => {
  return (
    <HamburgerWrapper
      open={open}
      onClick={onClick}
      colorTheme={colorTheme}
      aria-label={open ? 'Close' : 'Open'}
    >
      <span />
      <span />
      <span />
      <span />
    </HamburgerWrapper>
  )
}
