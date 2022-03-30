import * as React from 'react'
import { CheckboxElement, CheckboxWrapper } from '../Forms/Fields/Checkbox'
import { Label } from '../Forms/Fields/styled'

interface BooleanCheckboxProps {
  onChange: (e: any) => void
  label: string
  name: string
}

export const BooleanCheckbox = ({
  onChange,
  label,
  name,
}: BooleanCheckboxProps) => {
  return (
    <CheckboxWrapper>
      <CheckboxElement
        id={name}
        name={name}
        type="checkbox"
        onChange={onChange}
      />
      <Label color="body.9" htmlFor={name}>
        {label}
      </Label>
    </CheckboxWrapper>
  )
}
