import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Field as FormikField } from 'formik'
import { FieldProps } from './types'
import { Label } from './styled'

export const CheckboxElement = styled.input`
  -webkit-appearance: none;
  border-radius: 0;
  border: 1px solid;
  border-color: body.5;
  background-color: white;
  margin-top: 3px;

  width: 12px;
  height: 12px;
  position: relative;
  cursor: pointer;

  &:checked {
    background-color: body.5;
  }
`

export const CheckboxWrapper = styled.div`
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

export const Checkbox = ({
  required,
  disabled,
  name,
  label,
}: CheckboxProps) => {
  return (
    <FormikField type="checkbox" name={name}>
      {({ field }) => (
        <CheckboxWrapper>
          <CheckboxElement
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
        </CheckboxWrapper>
      )}
    </FormikField>
  )
}
