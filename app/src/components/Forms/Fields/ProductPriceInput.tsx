import * as React from 'react'
import { Field as FormikField } from 'formik'
import MaskedInput, { conformToMask } from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { FieldProps } from './Field'
import { Span } from '../../Text'
import { FieldWrapper } from './styled'
import {
  InputWrapper,
  Input as InputElement,
  InputRange as InputRangeElement,
} from './styled'
import { Option } from '.'

export interface ProductPriceInputProps extends FieldProps {
  type?: string
  renderBeforeInput?: () => React.ReactNode
  pipe?: (conformedValue: string) => string
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

export const ProductPriceInput = (props: ProductPriceInputProps) => {
  const {
    name,
    required,
    placeholder,
    type,
    color,
    options,
    renderBeforeInput,
    validate,
    onChange,
  } = props

  const optionsNumeric =
    options !== undefined
      ? options.map((option: Option) => {
          return Number(option.label.replace(/[^0-9\.-]+/g, ''))
        })
      : []

  const conformValue = (conformedValue: string) => {
    const numericValue = Number(conformedValue.replace(/[^0-9\.-]+/g, ''))

    const closest = optionsNumeric.reduce(function (prev, curr) {
      return Math.abs(curr - numericValue) < Math.abs(prev - numericValue)
        ? curr
        : prev
    })
    const remasked = conformToMask(closest.toString(), currencyMask)
    return remasked.conformedValue
  }

  return (
    <FieldWrapper>
      <FormikField validate={validate} name={name}>
        {({ field }) => (
          <>
            <Span mr={2} fontWeight={200} color="body.7">
              Slide to select amount:
            </Span>
            <InputRangeElement
              {...field}
              value={field.value || '50'}
              id={field.name}
              onChange={field.onChange}
              onInput={onChange}
              required={required}
              placeholder={placeholder}
              color={color}
              type={'range'}
              min={50}
              max={5000}
              step={50}
            />
          </>
        )}
      </FormikField>
    </FieldWrapper>
  )
}
