import * as React from 'react'
import * as Yup from 'yup'
import styled, { css } from '@xstyled/styled-components'
import { Heading } from '../../Text'
import { Form } from '../Form'
import { Field } from '../Fields/Field'
import { ConvertSizeField } from '../CustomFields/ConvertSizeField'
import { ConvertSizeLocaleField } from '../CustomFields/ConvertSizeLocaleField'
import { sizeConversionOptions } from '../CustomFields/sizeConversionOptions'
import { sizeCountryOptions } from '../CustomFields/sizeCountryOptions'
import { Select } from '../Fields/Select'
import { FieldWrapper } from '../../Forms/Fields/styled'
import { Button } from '../../Button'
import { Maybe, ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { string } from 'zod'
import { configureScope } from '@sentry/node'

const { useState, useEffect } = React

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

interface CountryOption {
  id: string
  value: string
  label: string
}

const MainWrapper = styled.div`
  position: relative;
`

const FieldsWrapper = styled.div`
  margin-top: 5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 4;
  grid-column-gap: 3;

  & > * {
    grid-column: 1 / 3;

    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7),
    &:nth-child(8) {
      grid-column: span 1;
    }
  }

  .field {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  ${FieldWrapper},
  select {
    flex-grow: 1;
    height: 100%;
    width: 100%;
    max-width: initial;
  }
`

interface SizeConverterFormProps {
  initialSize?: Maybe<string>
  onContinue?: () => void
}

type FormValues = {
  size?: ConversionRule
  countryA?: CountryOption['value']
  countryB?: CountryOption['value']
  sizeA?: ConversionRule
  sizeB?: ConversionRule
}

export const SizeConverterForm = ({ initialSize }: SizeConverterFormProps) => {
  const initialSizeParsed = initialSize ? parseFloat(initialSize) : undefined
  console.log('initialSizeParsed', initialSizeParsed)

  const stringifySize = (size?: number) => {
    if (size == NaN || !size) return undefined
    if (Number.isInteger(size)) return size.toString()

    const sizeSplits = size.toString().split('.')
    const int = sizeSplits[0]
    const dec = sizeSplits[1]

    const m = { 25: '¼', 5: '½', 75: '¾' }
    const fraction = dec in m ? ' ' + m[dec] : '.' + dec

    return `${int}${fraction}`
  }

  const size = stringifySize(initialSizeParsed)

  const initialRule = sizeConversionOptions.find(
    (option) => stringifySize(option['us']) === size,
  )

  const ValidationSchema = Yup.object().shape({
    countryA: Yup.string().required('Required'),
    countryB: Yup.string().required('Required'),
    sizeA: Yup.string().required('Required'),
    sizeB: Yup.string().required('Required'),
  })

  const initialValues: FormValues = {
    size: initialRule,
    countryA: initialRule ? sizeCountryOptions[0].value : undefined,
    countryB: undefined,
    sizeA: initialRule,
    sizeB: undefined,
  }

  return (
    <MainWrapper>
      <Heading mt={0} mb={5} level={3}>
        International Size Converter
      </Heading>
      <Heading color="body.8" level={4}>
        {`Select the size and country of origin and we'll do the rest`}
      </Heading>
      <Form
        id="size-converter-form"
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={() => {
          console.log(`converter form submit`)
        }}
      >
        <FieldsWrapper>
          <Field name="size" type="hidden" options={sizeConversionOptions} />
          <ConvertSizeLocaleField
            name="countryA"
            label="Country"
            placeholder="Country"
            options={sizeCountryOptions}
          />
          <ConvertSizeField
            name="sizeA"
            label="Size"
            placeholder="Size"
            sizeOptions={sizeConversionOptions}
          />
          <ConvertSizeLocaleField
            name="countryB"
            label="Country"
            placeholder="Country"
            options={sizeCountryOptions}
          />
          <ConvertSizeField
            name="sizeB"
            label="Size"
            placeholder="Size"
            sizeOptions={sizeConversionOptions}
          />
        </FieldsWrapper>
      </Form>
    </MainWrapper>
  )
}
