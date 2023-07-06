import * as React from 'react'
import { useFormikContext } from 'formik'
import { FieldProps } from '../Fields/types'
import { Field } from '../Fields'
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
  setReferenceSize: (size: number | string) => void
}

interface Values {
  size?: ConversionRule
  countryA?: CountryOption['value']
  countryB?: CountryOption['value']
  sizeA?: string | number
  sizeB?: string | number
}

export const ConvertSizeField = ({
  setReferenceSize,
  ...props
}: ConvertSizeFieldProps) => {
  const { values, setFieldValue } = useFormikContext<Values>()

  const [sizeA, setSizeA] = useState<string | number | undefined>(
    values.sizeA || undefined,
  )
  const [sizeB, setSizeB] = useState<string | number | undefined>(
    values.sizeB || undefined,
  )

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
    if (!countryB) return

    const sizeOption = sizeConversionOptions.find(
      (o) => o[countryB.id] == values.sizeB,
    )

    if (sizeOption === undefined) return

    const usIndex = Object.keys(sizeOption).findIndex((o) => o == 'us')

    setReferenceSize(Object.values(sizeOption)[usIndex])
  }, [values.sizeB])

  useEffect(() => {
    if (!values.countryA) {
      return
    }
    setFieldValue('sizeA', sizeA)
  }, [sizeA])

  useEffect(() => {
    if (!values.countryB) {
      return
    }
    setFieldValue('sizeB', sizeB)
  }, [sizeB])

  return (
    <Field
      type="sizeLocaleSelector"
      {...props}
      options={localizedOptions}
      placeholder="Size"
      label="Size"
      disabled={props.name === 'sizeA' ? !values.countryA : !values.countryB}
    />
  )
}
