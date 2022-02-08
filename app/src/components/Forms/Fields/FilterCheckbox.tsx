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
      min-width: 124px;
      margin: 0 2;
      text-align: center;
      border: 0.5px solid ${theme.colors.grays[5]};
      border-radius: 2em;
      background-color: body.2;
    }

    &:checked ~ label,
    &:hover ~ label {
      background-color: body.4;
    }
  `}
`

export const FilterCheckboxWrapper = styled.div`
  display: grid;
  grid-template-columns: 25px 1fr;
  align-items: center;
  margin: 7px 0 0;
  cursor: pointer;
  align-items: start;

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
