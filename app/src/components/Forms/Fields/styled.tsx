import styled, { css } from '@xstyled/styled-components'
import { Label as BaseLabel } from '../../Text'

interface FieldWrapperProps {
  noBorder?: boolean
  noBackground?: boolean
}

export const FieldWrapper = styled.div`
  ${({ noBorder, noBackground }: FieldWrapperProps) => css`
    ${noBorder
      ? ``
      : css`
          border: 1px solid;
          border-color: highlight.0;
          padding: 2;
        `}
    text-align: left;
    border-radius: round;
    ${noBackground
      ? ''
      : css`
          background-color: white;
        `}

    & + & {
      margin-top: 3;
    }

    @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
      margin-top: 2;
    }
  `}
`

interface LabelProps {
  required?: boolean
}
export const Label = styled(BaseLabel)`
  ${({ required }: LabelProps) => css`
    position: relative;
    display: inline-block;
    margin-bottom: 1;

    a {
      color: higlight.0;
      text-decoration: underline;
    }

    ${required
      ? css`
          &:after {
            content: '*';
            color: highlight.2;
            margin-left: 0.2em;
          }
        `
      : ''}
  `}
`

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Input = styled.input`
  ${({ color, theme }) => css`
    padding: 0 0;
    width: 100%;
    display: block;
    border: 1px solid transparent;
    font-size: 3;
    font-family: sans;
    background-color: transparent;
    color: ${color ? theme.colors[color] : theme.colors.body[0]};
    &::placeholder {
      color: body.3;
    }

    & + ${Label} {
      margin-top: 1;
    }
  `}
`

export const SelectElement = styled.select`
  padding: 1 0 0;
  margin-top: 1;
  width: 100%;
  border: LL;
  display: block;
  height: 42px;
  font-size: 3;
  font-family: sans;
  background-color: transparent;
`
