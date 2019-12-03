import styled, { css, DefaultTheme } from 'styled-components'
import { AccordionButton } from './components/AccordionButton'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
  height: string
}

export const ToggleButton = styled.button`
  ${({ theme, open }: WithOpen) => css`
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
      top: -16px;
      font-size: 15px;
    }
  `}
`
export const Inner = styled.div`
  ${({ theme, open, height }: WithOpen) => css`
    /* display: ${open ? 'block' : 'none'}; */
    max-height: ${open === true ? height + 'px' : '0'};
    visibility: ${open === true ? 'visible' : 'hidden'};
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

interface AccordionButton {
  theme: DefaultTheme
  selected: boolean
}

export const AccordionButtonStyles = styled.button`
  ${({ theme, selected }: AccordionButton) => css`
    padding: ${theme.layout.spacing.single} ${theme.layout.spacing.singleHalf};
    margin: ${theme.layout.spacing.small};
    font-family: ${theme.font.family.serif};
    background-color: ${selected ? theme.color.dark : 'transparent'};
    color: ${selected ? theme.color.light : theme.color.dark};
    border: 1px solid ${theme.color.dark};
    border-radius: 50%;
  `}
`
