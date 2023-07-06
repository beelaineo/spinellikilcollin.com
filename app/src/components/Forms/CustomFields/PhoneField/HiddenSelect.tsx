import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Field as FormikField } from 'formik'
import { CountryPhoneOption } from './types'

interface HiddenSelectProps {
  options: CountryPhoneOption[]
  name: string
}

const Outer = styled.div``

const SelectElement = styled.select`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
`

export const HiddenSelect = ({ options, name }: HiddenSelectProps) => {
  return (
    <Outer>
      <FormikField name={name}>
        {({ field }) => (
          <SelectElement tabIndex={-1} {...field} aria-label={name}>
            {options.map(({ id, value, label, disabled }) => (
              <option key={id} value={value} disabled={disabled}>
                {label}
              </option>
            ))}
          </SelectElement>
        )}
      </FormikField>
    </Outer>
  )
}
