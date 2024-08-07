import styled, { css } from '@xstyled/styled-components'
import { Label as BaseLabel } from '../../Text'

interface FieldWrapperProps {
  noBorder?: boolean
}

export const FieldWrapper = styled.div<FieldWrapperProps>`
  ${({ noBorder, theme }) => css`
    ${noBorder
      ? ``
      : css`
          color: body.8;
          font-family: serif;
          font-size: 5;
        `}
    text-align: left;
    position: relative;
    background-color: transparent;
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

export const Label = styled(BaseLabel)<LabelProps>`
  ${({ required }) => css`
    position: relative;
    display: inline-block;
    font-weight: 2;
    cursor: inherit;
    color: body.9;
    margin-bottom: 2;

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

interface InputWrapperProps {
  type?: string
}
export const InputWrapper = styled.div<InputWrapperProps>`
  ${({ type, theme }) => css`
    display: flex;
    align-items: center;
    max-width: 100%;
    border: 1px solid;
    width: 100%;
  `}
`

export const Input = styled.input`
  ${({ color, theme, type }) => css`
    padding: 3 2;
    height: 42px;
    // width: 100%;
    display: block;
    border-color: body.5;
    font-size: 5;
    font-family: serif;
    background-color: white;
    color: ${color ? theme.colors[color] : theme.colors.body[8]};
    font-variant-numeric: ${type === 'tel' ? 'tabular-nums' : 'auto'};
    width: 100%;

    &.gift-card-input {
      background-color: ${theme.colors.body[2]};
    }

    &::placeholder {
      color: body.6;
    }

    & + ${Label} {
      margin-top: 2;
    }

    ${theme.mediaQueries.mobile} {
      padding: 2;
      height: 32px;
    }
  `}
`

export const InputRange = styled.input`
  ${({ color, theme, type }) => css`
    padding: 3 2;
    height: 42px;
    width: 100%;
    display: block;
    border-color: body.5;
    font-size: 5;
    font-family: serif;
    background-color: transparent;
    color: ${color ? theme.colors[color] : theme.colors.body[8]};
    font-variant-numeric: ${type === 'tel' ? 'tabular-nums' : 'auto'};
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
    }

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: body.6;
    }

    &::-ms-track {
      width: 100%;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      color: transparent;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 15px;
      width: 15px;
      border: 1px solid;
      border-color: ${theme.colors.body[6]};
      border-radius: 16px;
      background: ${theme.colors.body[0]};
      cursor: pointer;
      margin-top: -7.5px;
    }

    &::-moz-range-thumb {
      height: 15px;
      width: 15px;
      border: 1px solid;
      border-color: ${theme.colors.body[6]};
      border-radius: 16px;
      background: ${theme.colors.body[0]};
      cursor: pointer;
    }

    &::-ms-thumb {
      height: 15px;
      width: 15px;
      border: 1px solid;
      border-color: ${theme.colors.body[6]};
      border-radius: 16px;
      background: ${theme.colors.body[0]};
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 1px;
      cursor: pointer;
      background: ${theme.colors.body[6]};
    }

    &:focus::-webkit-slider-runnable-track {
      border-color: ${theme.colors.body[7]};
    }

    &::-moz-range-track {
      width: 100%;
      height: 1px;
      cursor: pointer;
      background: ${theme.colors.body[6]};
    }

    &::-ms-track {
      width: 100%;
      height: 1px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      border-width: 1px 0;
      color: transparent;
    }
    &::-ms-fill-lower {
      border-color: ${theme.colors.body[6]};
    }
    &:focus::-ms-fill-lower {
      border-color: ${theme.colors.body[7]};
    }
    &::-ms-fill-upper {
      border-color: ${theme.colors.body[6]};
    }
    &:focus::-ms-fill-upper {
      border-color: ${theme.colors.body[7]};
    }

    & + ${Label} {
      margin-top: 2;
    }

    ${theme.mediaQueries.mobile} {
      padding: 2;
    }
  `}
`

export const TextAreaElement = styled(Input)`
  ${({ theme }) => css`
    height: 80px;
    resize: none;
    ${theme.mediaQueries.mobile} {
      padding: 2;
      height: 80px;
    }
  `}
`

export const SelectElement = styled.select`
  ${({ theme }) => css`
    height: 32px;
    max-width: 150px;
    min-width: 150px;
    width: 100%;
    border: 1px solid;
    border-color: body.5;
    border-radius: 0;
    font-size: 1rem;
    cursor: pointer;
    background: none;
    padding: 0 28px 0 3;
    font-family: serif;
    appearance: none;
    -webkit-border-radius: 0px;
    color: body.6;
    font-size: 5;

    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%);
    background-position: calc(100% - 14px) 50%, calc(100% - 10px) 50%;
    background-size: 5px 5px, 5px 5px, 1px 1.5em;
    background-repeat: no-repeat;

    option {
      color: body.7;
      font-family: serif;
    }

    ${theme.mediaQueries.mobile} {
      height: 32px;
    }
  `}
`
