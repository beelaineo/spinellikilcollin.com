import * as React from 'react'
import { Field as FormikField } from 'formik'
import MaskedInput, { conformToMask } from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { FieldProps } from './Field'
import { FieldWrapper } from './styled'
import { InputWrapper, Input as InputElement } from './styled'
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
  } = props

  const optionsNumeric =
    options !== undefined
      ? options.map((option: Option) => {
          return Number(option.label.replace(/[^0-9\.-]+/g, ''))
        })
      : []

  console.log('options original:', options)
  console.log('optionsNumeric', optionsNumeric)

  const conformValue = (conformedValue: string) => {
    console.log('conformedValue', conformedValue)
    const numericValue = Number(conformedValue.replace(/[^0-9\.-]+/g, ''))
    console.log('numericValue,', numericValue)

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
            <InputWrapper type={type}>
              {renderBeforeInput ? renderBeforeInput() : null}
              <MaskedInput
                mask={currencyMask}
                onChange={field.onChange}
                pipe={conformValue}
                placeholder={placeholder}
                render={(ref, maskProps) => {
                  return (
                    <InputElement
                      {...maskProps}
                      //@ts-ignore
                      ref={ref}
                      inputMode={'numeric'}
                      value={field.value || ''}
                      id={field.name}
                      color={color}
                      required={required}
                      type={'text'}
                    />
                  )
                }}
              />
            </InputWrapper>
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
            />
          </>
        )}
      </FormikField>
    </FieldWrapper>
  )
}
