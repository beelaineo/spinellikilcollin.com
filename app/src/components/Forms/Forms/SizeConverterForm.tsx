import * as React from 'react'
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

const { useState } = React

interface ConversionRule {
  mm: number
  in: number
  'us-can': string
  'uk-aus-sa': string
  fr: number
  'in-cn-jp-sa-etc': number
  label: string
  value: string
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
  countryA?: CountryOption
  countryB?: CountryOption
  size?: ConversionRule
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
    (option) => option['us-can'] === size,
  )

  const [currentSize, setCurrentSize] = useState(initialRule)
  const [countryA, setCountryA] = useState<CountryOption | undefined>(
    initialRule ? sizeCountryOptions[0] : undefined,
  )
  const [countryB, setCountryB] = useState<CountryOption | undefined>(undefined)
  console.log('currentSize', currentSize)

  const initialValues: FormValues = {
    countryA: initialRule ? sizeCountryOptions[0] : undefined,
    countryB: undefined,
    size: initialRule,
  }

  const handleLocaleChange = (e: any) => {
    const { value, name } = e.target
    const countryOption = sizeCountryOptions.find((o) => o.value == value)
    name == 'countryA' ? setCountryA(countryOption) : setCountryB(countryOption)
  }

  const handleSizeChange = (e: any) => {
    const { value, name } = e.target
    console.log('size field value', value)
    console.log('size field name', name)
    const sizeOption = sizeConversionOptions.find((o) => o.value == value)
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
        onSubmit={() => {
          console.log(`converter form submit`)
        }}
      >
        <FieldsWrapper>
          <ConvertSizeLocaleField
            name="countryA"
            label="Country"
            placeholder="Country"
            options={sizeCountryOptions}
            onChange={handleLocaleChange}
          />
          <ConvertSizeField
            name="size"
            label="Size"
            placeholder="Size"
            sizeOptions={sizeConversionOptions}
            locale={countryA}
          />
          <ConvertSizeLocaleField
            name="countryB"
            label="Country"
            placeholder="Country"
            options={sizeCountryOptions}
            onChange={handleLocaleChange}
          />
          <ConvertSizeField
            name="size"
            label="Size"
            placeholder="Size"
            sizeOptions={sizeConversionOptions}
            locale={countryB}
          />
        </FieldsWrapper>
      </Form>
    </MainWrapper>
  )
}
