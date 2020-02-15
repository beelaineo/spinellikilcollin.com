import styled, { css, DefaultTheme } from '@xstyled/styled-components'
import { AccordionButton } from './components/AccordionButton'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
}

export const ToggleButton = styled.button`
  font-size: 4;
  font-weight: 4;
  letter-spacing: 1px;
  text-transform: capitalize;
  color: body.8;
  background-color: transparent;
  width: 100%;
  text-align: left;
  position: relative;
  &::after {
    content: '+';
    display: block;
    position: absolute;
    right: 0;
    transform: translateY(-50%);
    font-size: 15px;
    top: 50%;
  }
  &:hover {
    opacity: 0.5;
  }
`

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

interface AccordionButton {
  theme: DefaultTheme
  selected: boolean
  size: string
}

export const AccordionButtonStyles = styled.button`
  ${({ selected, size }: AccordionButton) => css`
    padding: 3 4;
    margin: 3;
    background-color: ${selected ? 'body.8' : 'transparent'};
    color: ${selected ? 'body.1' : 'body.8'};
    border: 1px solid body.8;
    border-radius: ${size === 'large' ? '24px' : '50%'};
  `}
`
