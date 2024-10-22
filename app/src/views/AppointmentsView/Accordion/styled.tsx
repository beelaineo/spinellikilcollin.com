import styled, { css } from '@xstyled/styled-components'
import { DefaultTheme } from 'styled-components'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
  height: number
}

export const Inner = styled.div<WithOpen>`
  ${({ open, height }) => css`
    overflow: hidden;
    ${open
      ? css`
          height: ${height};
          opacity: 1;
          visibility: visible;
          transition: height 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            opacity 0.5s linear, visibility 0s linear;
        `
      : css`
          height: 0;
          opacity: 0;
          visibility: hidden;
          transition: height 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            opacity 0.5s linear, visibility 0s linear 0.5s;
        `};
  `}
`

export const Item = styled.div`
  padding: 4 0 4;
  opacity: 1;
`

export const Wrapper = styled.div``

export const Label = styled.button`
  ${({ theme }) => css`
    position: relative;

    width: 100%;
    text-align: left;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:focus-visible {
      ${theme.focus.left()}
    }
  `}
`
