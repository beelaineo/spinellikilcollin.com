import styled, { css, DefaultTheme } from 'styled-components'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
  height: string
}

export const ToggleButton = styled.button`
  ${({ theme }) => css`
    font-size: ${theme.font.size.h4};
    font-weight: ${theme.font.weight.semi};
    letter-spacing: 1px;
    text-transform: capitalize;
    color: ${(props) => props.theme.color.dark};
    background-color: transparent;
    width: 100%;
    text-align: left;
    position: relative;
    &::after {
      content: '+';
      display: block;
      position: absolute;
      right: 0;
      top: -2px;
      font-size: 15px;
  `}
`

export const Inner = styled.div`
  ${({ theme, open, height }: WithOpen) => css`
    /* display: ${open ? 'block' : 'none'}; */
    height: ${open ? height + 'px' : '0'};
    transition: 150ms linear;
    overflow: hidden;
    p {
      padding: ${theme.layout.spacing.half} 0 ${theme.layout.spacing.double};
    }
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
