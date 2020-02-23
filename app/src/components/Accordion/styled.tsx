import styled, { css, DefaultTheme } from '@xstyled/styled-components'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
}

export const Inner = styled.div`
  ${({ open }: WithOpen) => css`
    transition: 150ms linear;
    ${open
      ? css`
          display: block;
          padding: 2 0 4;
        `
      : css`
          display: none;
        `}
  `}
`

export const Wrapper = styled.div`
  border-top: 1px solid;

  &:last-of-type {
    border-bottom: 1px solid;
  }
`

export const Label = styled.button`
  font-size: 4;
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
