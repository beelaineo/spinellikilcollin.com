import * as React from 'react'
import {
  ErrorMessage,
  Field as FormikField,
  FieldProps as FormikFieldProps,
  FieldValidator,
} from 'formik'
import { Heading } from '../../Text'
import { Checkbox } from './Checkbox'
import { Radio } from './Radio'
import { Input } from './Input'
import { TextArea } from './TextArea'
import { NumberInput } from './Number'
import { Select } from './Select'
import { Label, FieldWrapper } from './styled'
import { PhoneField } from '../CustomFields/PhoneField'
import { countryOptions } from '../CustomFields/countryOptions'
import { sizeConversionOptions } from '../CustomFields/sizeConversionOptions'
import { sizeCountryOptions } from '../CustomFields/sizeCountryOptions'

import { Option, FieldProps, Mask } from './types'
/**
 * Base Field
 */
export type WithFormik<T> = T & {
  formik: FormikFieldProps
}

export const Field = (fieldProps: FieldProps) => {
  const { label, name, required, type, helpText, children } = fieldProps
  if (fieldProps.type === 'hidden') {
    return (
      <FormikField name={fieldProps.name}>
        {({ field }) => <input type="hidden" {...field} />}
      </FormikField>
    )
  }

  const renderInner = () => {
    switch (type) {
      case 'radio':
        return <Radio {...fieldProps} />
      case 'checkbox':
        return <Checkbox {...fieldProps} />
      case 'number':
        return <NumberInput {...fieldProps} />
      case 'select':
        return <Select {...fieldProps} />
      case 'countrySelector':
        return <Select options={countryOptions} {...fieldProps} />
      case 'sizeLocaleSelector':
        return (
          <Select
            options={sizeConversionOptions}
            {...fieldProps}
            placeholderSelected={true}
          />
        )
      case 'sizeLocaleCountrySelector':
        return (
          <Select
            options={sizeCountryOptions}
            {...fieldProps}
            placeholderSelected={true}
          />
        )
      case 'textarea':
        return <TextArea {...fieldProps} />
      case 'tel':
        return <PhoneField {...fieldProps} />
      default:
        return <Input {...fieldProps} />
    }
  }
  const className = `field field--${fieldProps.type} field--${fieldProps.name}`

  const noBorder = type === 'checkbox' || type === 'number'

  return (
    <div className={className}>
      {label && type != 'checkbox' ? (
        <Label required={required} htmlFor={name}>
          {label}
        </Label>
      ) : null}
      <FieldWrapper noBorder={noBorder}>
        {children ? children : renderInner()}
      </FieldWrapper>
      {helpText ? (
        <Heading level={5} mt={1} weight={1} color="body.3">
          {helpText}
        </Heading>
      ) : null}
      <ErrorMessage
        name={fieldProps.name}
        render={(message) => (
          <Heading level={5} weight={1} mt={1} mb={2} color="red">
            {message}
          </Heading>
        )}
      />
    </div>
  )
}
