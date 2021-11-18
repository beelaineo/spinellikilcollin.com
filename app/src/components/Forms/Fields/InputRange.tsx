import * as React from 'react'
import { Field as FormikField } from 'formik'
import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { FieldProps } from './Field'
import { InputWrapper, Input as InputElement } from './styled'

export interface InputRangeProps extends FieldProps {
  type?: string
  renderBeforeInput?: () => React.ReactNode
}

const currencyMask = createNumberMask({
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2,
  integerLimit: 5,
  allowNegative: false,
  allowLeadingZeroes: false,
})

export const InputRange = (props: InputRangeProps) => {
  const {
    name,
    required,
    readOnly,
    disabled,
    placeholder,
    type,
    color,
    renderBeforeInput,
    validate,
  } = props
  return (
    <FormikField validate={validate} name={name}>
      {({ field }) => (
        <>
          <InputWrapper type={type}>
            {renderBeforeInput ? renderBeforeInput() : null}
            <InputElement
              {...field}
              value={field.value || ''}
              id={field.name}
              onChange={field.onChange}
              required={required}
              placeholder={placeholder}
              color={color}
              type={'range'}
              min={50}
              max={7500}
              step={25}
              readOnly={readOnly}
              disabled={disabled}
            />
          </InputWrapper>
        </>
      )}
    </FormikField>
  )
}
