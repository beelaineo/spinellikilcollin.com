import styled, { css, DefaultTheme } from '@xstyled/styled-components'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
}

export const Inner = styled.div`
  ${({ open }: WithOpen) => css`
    /* display: ${open ? 'block' : 'none'}; */
    max-height: ${open === true ? '200px' : '0'};
    visibility: ${open === true ? 'visible' : 'hidden'};
    transition: 150ms linear;
    overflow: hidden;
    p {
      padding: 2 0 5;
    }
  `}
`

export const Wrapper = styled.div`
  padding: 4 0 0;
  margin: 4 0 0;
  border-top: 1px solid body.8;
`

