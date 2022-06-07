import * as React from 'react'
import { useField, useFormikContext } from 'formik'
import { FieldProps } from '../Fields/types'
import { Field } from '../Fields'
import { optional } from 'zod'
import { useEffect, useState } from 'react'
import { sizeCountryOptions } from '../CustomFields/sizeCountryOptions'
import { sizeConversionOptions } from '../CustomFields/sizeConversionOptions'

interface CountryOption {
  id: string
  value: string
  label: string
}

interface ConversionRule {
  mm: number
  inches: number
  us: number
  can: number
  uk: string
  aus: string
  sa: string
  fr: number
  in: number
  cn: number
  jp: number
  arg: number
  bo: number
  br: number
  cl: number
  col: number
  ecua: number
  guy: number
  para: number
  per: number
  surm: number
  uru: number
  vz: number
  tr: number
  il: number
  label: number
  value: number
  id: string
}

interface ConvertSizeFieldProps extends Omit<FieldProps, 'type'> {
  sizeOptions: ConversionRule[]
}

interface Values {
  size?: ConversionRule
  countryA?: CountryOption['value']
  countryB?: CountryOption['value']
  sizeA?: string | number
  sizeB?: string | number
}

export const ConvertSizeField = (props: ConvertSizeFieldProps) => {
  const { values, touched, setFieldValue } = useFormikContext<Values>()
  const [field, meta] = useField(props)

  const localizeOptions = (options: ConversionRule[], locale?: string) => {
    if (!locale) return options
    const selectedCountry = sizeCountryOptions.find((o) => o.value == locale)
    if (!selectedCountry) return options
    return options.map((option) => {
      return {
        ...option,
        value: option[selectedCountry.id],
        label: option[selectedCountry.id],
      }
    })
  }

  const [localizedOptions, setLocalizedOptions] = useState<ConversionRule[]>(
    localizeOptions(
      props.sizeOptions,
      props.name == 'sizeA' ? values.countryA : values.countryB,
    ),
  )

  console.log('field', field)
  console.log('meta', meta)
  console.log('field values', values)
  console.log('reformat size options based on locale')

  // useEffect(() => {
  //   // set the value always match size value across fields
  //   if (props.name == 'sizeA') {
  //     setFieldValue('sizeB', values.sizeA)
  //   } else if (props.name == 'sizeB') {
  //     setFieldValue('sizeA', values.sizeB)
  //   }
  // }, [values.sizeA, values.sizeB])

  useEffect(() => {
    if (props.name == 'sizeB') return
    setLocalizedOptions(localizeOptions(props.sizeOptions, values.countryA))
  }, [values.countryA])

  useEffect(() => {
    if (props.name == 'sizeA') return
    setLocalizedOptions(localizeOptions(props.sizeOptions, values.countryB))
  }, [values.countryB])

  useEffect(() => {
    const countryA = sizeCountryOptions.find((o) => o.value == values.countryA)
    const countryB = sizeCountryOptions.find((o) => o.value == values.countryB)
    console.log('countryA option', countryA)
    console.log('countryB option', countryB)
    if (!countryA || !countryB) return
    const sizeOption = sizeConversionOptions.find(
      (o) => o[countryA.id] == values.sizeA,
    )
    console.log('sizeA changed, current sizeOption:', sizeOption)
  }, [values.sizeA])

  useEffect(() => {
    const countryA = sizeCountryOptions.find((o) => o.value == values.countryA)
    const countryB = sizeCountryOptions.find((o) => o.value == values.countryB)
    if (!countryA || !countryB) return
    const sizeOption = sizeConversionOptions.find(
      (o) => o[countryB.id] == values.sizeB,
    )
    console.log('sizeB changed, current sizeOption:', sizeOption)
  }, [values.sizeB])

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
