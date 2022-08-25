import * as React from 'react'
import { useFormikContext } from 'formik'
import { FieldProps } from '../Fields/types'
import { Field } from '../Fields'
import { optional } from 'zod'

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

interface ConvertSizeFieldProps extends Omit<FieldProps, 'type'> {
  locale?: CountryOption
  sizeOptions: ConversionRule[]
}

interface Values {
  countryA?: CountryOption
  countryB?: CountryOption
  size?: ConversionRule
}

export const ConvertSizeField = (props: ConvertSizeFieldProps) => {
  const { values } = useFormikContext<Values>()
  console.log('field values', values)
  console.log('locale', props.locale)
  console.log('reformat size options based on locale')

  const localizeOptions = (
    options: ConversionRule[],
    locale?: CountryOption,
  ) => {
    if (!locale) return options
    console.log('locale', locale)
    console.log('options', options)
    return options.map((option) => {
      return {
        ...option,
        value: option[locale.id],
        label: option[locale.id],
      }
    })
  }

  const localizedOptions = localizeOptions(props.sizeOptions, props.locale)

  console.log('localizedOptions', localizedOptions)

  return (
    <Field
      type="sizeLocaleSelector"
      {...props}
      options={localizedOptions}
      placeholder="Size"
      label="Size"
    />
  )
}
