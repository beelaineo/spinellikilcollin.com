import styled, { css, DefaultTheme } from '@xstyled/styled-components'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
  height: number
}

export const Inner = styled.div`
  ${({ open, height }: WithOpen) => css`
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
  padding: 2 0 4;
  opacity: 1;
`

export const Wrapper = styled.div`
  border-top: 1px solid;
  &:last-of-type {
    border-bottom: 1px solid;
  }
`

export const Label = styled.button`
  ${({ theme }) => css`
    font-size: 5;
    font-family: serif;
    position: relative;
    padding: 3 0;
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
