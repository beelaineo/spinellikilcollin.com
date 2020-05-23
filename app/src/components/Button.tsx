import styled, { css } from '@xstyled/styled-components'

interface ButtonProps {
  level?: 1 | 2 | 3
  disabled?: boolean
}

export const Button = styled.buttonBox`
  ${({ level, disabled }: ButtonProps) => css`
    pointer-events: ${disabled ? 'none' : 'auto'};
    opacity: ${disabled ? 0.3 : 1};
    font-family: serif;
    text-transform: uppercase;
    height: 42px;
    padding: 0 3;
    font-size: 4;
    svg {
      display: inline-block;
      margin: 0 0.2em;
      height: 1em;
    }

    ${level === undefined || level === 1
      ? css`
          color: body.1;
          background-color: body.9;
        `
      : level === 2
      ? css`
          color: body.9;
          background-color: transparent;
          border: 1px solid;
        `
      : css`
          display: inline;
          margin: 0;
          padding: 0;
          width: auto;
          height: auto;
          border: none;
        `}
  `}
`
