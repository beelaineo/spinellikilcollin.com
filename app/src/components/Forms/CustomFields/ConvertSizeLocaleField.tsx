import * as React from 'react'
import { useFormikContext } from 'formik'
import { FieldProps } from '../Fields/types'
import { Field } from '../Fields'

interface CountryOption {
  id: string
  value: string
  label: string
}

interface ConversionRule {
  mm: number
  in: number
  'us-can': string
  'uk-aus-sa': string
  fr: number
  'in-cn-jp-sa-etc': number
  id: string
  label: string
  value: string
}

type ConvertSizeLocaleFieldProps = Omit<FieldProps, 'type'>

interface Values {
  countryA?: CountryOption
  countryB?: CountryOption
  size?: ConversionRule
}

export const ConvertSizeLocaleField = (props: ConvertSizeLocaleFieldProps) => {
  const { values } = useFormikContext<Values>()
  console.log('field values', values)
  return (
    <Field
      type="sizeLocaleCountrySelector"
      {...props}
      placeholder="Country"
      label="Country"
    />
  )
}
