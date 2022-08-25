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
import { FieldWrapper } from '../../Forms/Fields/styled'
import { Maybe } from '../../../types'

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

const HeaderWrapper = styled.div`
  position: relative;

  h4 {
    max-width: 16rem;
  }
`

const FieldsWrapper = styled.div`
  margin-top: 5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3;

  & > * {
    grid-column: span 1;
  }

  .field {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  ${FieldWrapper}
  ${({ theme }) => css`
    select {
      flex-grow: 1;
      height: 42px;
      width: 100%;
      max-width: initial;
      min-width: unset;
      border-color: ${theme.colors.grays[4]};

      :disabled {
        cursor: default;
      }
    }
  `}
`

const ArrowsWrapper = styled.div`
  position: relative;
  grid-column: span 2;
  justify-self: center;
  font-size: 28px;
  font-weight: 100;
  pointer-events: none;
`

interface SizeConverterFormProps {
  initialSize?: Maybe<string>
  title?: Maybe<string>
  subtitle?: Maybe<string>
  onContinue?: () => void
}

type FormValues = {
  size?: ConversionRule
  countryA?: CountryOption['value']
  countryB?: CountryOption['value']
  sizeA?: ConversionRule
  sizeB?: ConversionRule
}

export const SizeConverterForm = ({
  initialSize,
  title,
  subtitle,
}: SizeConverterFormProps) => {
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
      <HeaderWrapper>
        <Heading textAlign={'left'} mt={4} mb={3} level={3}>
          {title ? title : `International Size Converter`}
        </Heading>
        <Heading color="grays.5" level={4} fontStyle="italic">
          {subtitle
            ? subtitle
            : `Select the size and country of origin and we'll do the rest`}
        </Heading>
      </HeaderWrapper>
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
          <ArrowsWrapper>↑ ↓</ArrowsWrapper>
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
