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

  const [sizeA, setSizeA] = useState<string | number>('')
  const [sizeB, setSizeB] = useState<string | number>('')

  const findMatchedValue = (arr: CountryOption[], val?: string | number) => {
    return arr.find((o) => o.value == val)
  }

  const countryA = findMatchedValue(sizeCountryOptions, values.countryA)
  const countryB = findMatchedValue(sizeCountryOptions, values.countryB)

  const localizeOptions = (options: ConversionRule[], locale?: string) => {
    if (!locale) return options
    const selectedCountry = findMatchedValue(sizeCountryOptions, locale)

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

  useEffect(() => {
    if (props.name == 'sizeB') return

    setLocalizedOptions(localizeOptions(props.sizeOptions, values.countryA))
  }, [values.countryA])

  useEffect(() => {
    if (props.name == 'sizeA') return

    setLocalizedOptions(localizeOptions(props.sizeOptions, values.countryB))
  }, [values.countryB])

  useEffect(() => {
    if (!countryA || !countryB) return

    const sizeOption = sizeConversionOptions.find(
      (o) => o[countryA.id] == values.sizeA,
    )

    if (sizeOption === undefined) return

    const sizeIndex = Object.keys(sizeOption).findIndex((o) => o == countryB.id)

    setSizeB(Object.values(sizeOption)[sizeIndex])
  }, [values.sizeA, countryB])

  useEffect(() => {
    if (!countryA || !countryB) return

    const sizeOption = sizeConversionOptions.find(
      (o) => o[countryB.id] == values.sizeB,
    )

    if (sizeOption === undefined) return

    const sizeIndex = Object.keys(sizeOption).findIndex((o) => o == countryA.id)

    setSizeA(Object.values(sizeOption)[sizeIndex])
  }, [values.sizeB, countryA])

  useEffect(() => {
    setFieldValue('sizeA', sizeA)
    console.log(sizeA)
  }, [sizeA])

  useEffect(() => {
    setFieldValue('sizeB', sizeB)
    console.log(sizeB)
  }, [sizeB])

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
