import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Field as FormikField } from 'formik'
import { FieldProps } from './Field'
import { Label } from './styled'

export const FilterCheckboxElement = styled.input`
  ${({ theme }) => css`
    -webkit-appearance: none;
    cursor: pointer;
    opacity: 0;
    position: absolute;

    & ~ label {
      padding: 2 4;
      min-width: 105px;
      margin: 0 5px;
      text-align: center;
      border: 1px solid ${theme.colors.grays[5]};
      border-radius: 2em;
      background-color: body.2;
      line-height: 1;
    }

    &:checked ~ label {
      background-color: grays.4;
    }
    @media screen and (min-width: 961px) {
      &:hover ~ label {
        background-color: grays.4;
      }
    }
    @media screen and (max-width: 960px) {
      & ~ label {
        margin: 0;
        width: 100%;
      }
    }
  `}
`

export const FilterCheckboxWrapper = styled.div`
  align-items: center;
  margin: 7px 0 0;
  cursor: pointer;
  align-items: start;
  flex: 49%;
  flex-grow: 0;

  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    display: flex;
    align-items: flex-top;
    & > *:first-child {
      justify-content: flex-center;
      margin-right: 15px;
    }
  }
`

export interface CheckboxProps extends FieldProps {
  type?: string
  //
}

export const FilterCheckbox = ({
  required,
  disabled,
  name,
  label,
}: CheckboxProps) => {
  return (
    <FormikField type="checkbox" name={name}>
      {({ field }) => (
        <FilterCheckboxWrapper>
          <FilterCheckboxElement
            {...field}
            value={field.value || false}
            id={field.name}
            required={required}
            type="checkbox"
            disabled={disabled}
          />
          <Label color="body.9" htmlFor={field.name}>
            {label}
          </Label>
        </FilterCheckboxWrapper>
      )}
    </FormikField>
  )
}
