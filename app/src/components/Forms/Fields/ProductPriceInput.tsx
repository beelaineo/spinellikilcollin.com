import * as React from 'react'
import { Field as FormikField } from 'formik'
import MaskedInput, { conformToMask } from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { FieldProps, Option } from './types'
import { Span } from '../../Text'
import {
  FieldWrapper,
  InputWrapper,
  Input as InputElement,
  InputRange as InputRangeElement,
} from './styled'

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
              value={field.value || '0'}
              id={field.name}
              onChange={field.onChange}
              onInput={onChange}
              required={required}
              placeholder={placeholder}
              color={color}
              type={'range'}
              min={0}
              max={options ? options.length - 1 : 10000}
              step={1}
            />
          </>
        )}
      </FormikField>
    </FieldWrapper>
  )
}
