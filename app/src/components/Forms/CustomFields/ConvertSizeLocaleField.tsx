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

type ConvertSizeLocaleFieldProps = Omit<FieldProps, 'type'>

interface Values {
  countryA?: CountryOption
  countryB?: CountryOption
  sizeA?: ConversionRule
  sizeB?: ConversionRule
  size?: ConversionRule
}

export const ConvertSizeLocaleField = (props: ConvertSizeLocaleFieldProps) => {
  const { values } = useFormikContext<Values>()
  return (
    <Field
      type="sizeLocaleCountrySelector"
      {...props}
      placeholder="Country"
      label="Country"
    />
  )
}
