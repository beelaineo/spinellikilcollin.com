import styled, { css, DefaultTheme } from 'styled-components'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
}

export const ToggleButton = styled.button`
  ${({ theme }) => css`
    font-size: ${theme.font.size.h4};
    font-weight: ${theme.font.weight.semi};
    letter-spacing: 1px;
    text-transform: capitalize;
    color: ${(props) => props.theme.color.dark};
  `}
`

export const Inner = styled.div`
  ${({ theme, open }: WithOpen) => css`
    display: ${open ? 'block' : 'none'};
    padding: ${theme.layout.spacing.double} 0;
  `}
`

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.layout.spacing.singleHalf} 0 0;
    margin: ${theme.layout.spacing.singleHalf} 0 0;
    font-family: ${theme.font.family.serif};
    border-top: 1px solid ${theme.color.dark};
    button {
      font-family: ${theme.font.family.serif};
    }
  `}
`
