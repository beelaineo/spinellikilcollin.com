import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Field as FormikField } from 'formik'
import { FieldProps } from './Field'

export const CheckboxElement = styled.input`
  -webkit-appearance: none;
  border-radius: 0;
  border: 1px solid;
  border-color: body.6;
  background-color: white;

  width: 12px;
  height: 12px;
  position: relative;

  &:checked {
    background-color: body.6;
  }
`

export const CheckboxWrapper = styled.div`
  display: grid;
  grid-template-columns: 35px 1fr;
  cursor: pointer;

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
  label,
  required,
  type,
  placeholder,
  disabled,
  name,
}: CheckboxProps) => {
  return (
    <FormikField type="checkbox" name={name}>
      {({ field }) => (
        <CheckboxWrapper>
          <div>
            <CheckboxElement
              {...field}
              value={field.value || false}
              id={field.name}
              required={required}
              placeholder={placeholder}
              type={type}
              disabled={disabled}
            />
          </div>
        </CheckboxWrapper>
      )}
    </FormikField>
  )
}
