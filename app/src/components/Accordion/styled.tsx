import styled, { css, DefaultTheme } from '@xstyled/styled-components'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
  height: number
}

export const Inner = styled.div`
  ${({ open, height }: WithOpen) => css`
    transition: height 600ms cubic-bezier(0.65, 0, 0.35, 1),
      opacity 600ms linear;
    ${open
      ? css`
          height: ${height};
          opacity: 1;
        `
      : css`
          height: 0;
          opacity: 0;
        `};
  `}

  overflow: hidden;
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
`
