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
import { Maybe, ShopifyProduct, ShopifyProductVariant } from '../../../types'
import Checkmark from '../../../svg/Checkmark.svg'
import { Button } from '../../Button'
import { ConversionRule, CountryOption } from './types'
import { CheckoutLineItemInput } from '../../../providers/ShopifyProvider/types'
import Link from 'next/link'

const { useState, useEffect } = React

const MainWrapper = styled.div`
  position: relative;
`

const HeaderWrapper = styled.div`
  position: relative;
`

const CurrentVariantWrapper = styled.div`
  display: flex;
  align-items: center;
`

const FieldsWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 5;
    display: grid;
    grid-template-columns: 1fr 1fr 0.5fr 1fr 1fr;
    align-items: center;
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

    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr 1fr;
    }
  `}
`

const ButtonsWrapper = styled.div`
  ${({ theme }) => css`
    margin-top: 4;
    button {
      width: 100%;
    }
    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr 1fr;
    }
  `}
`

const ArrowWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    grid-column: span 1;
    justify-self: center;
    font-size: 28px;
    font-weight: 100;
    pointer-events: none;
    padding-top: 4;
    ${theme.mediaQueries.mobile} {
      display: none;
    }
  `}
`

const Divider = styled.div`
  ${({ theme }) => css`
    display: none;
    position: relative;
    width: 100%;
    height: 1px;
    margin: 3 auto;
    background-color: grays.5;
    grid-column: span 2;
    justify-self: center;
    pointer-events: none;
    ${theme.mediaQueries.mobile} {
      display: block;
    }
  `}
`

interface SizeConverterFormProps {
  initialSize?: Maybe<string>
  title?: Maybe<string>
  subtitle?: Maybe<string>
  currentVariant?: ShopifyProductVariant
  currentProduct?: ShopifyProduct
  addLineItem?: (lineItem: CheckoutLineItemInput) => Promise<void>
  openRingSizerModal?: ({
    currentProduct: ShopifyProduct,
    currentVariant: ShopifyProductVariant,
  }) => void
  closeModal?: () => void
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
  currentVariant,
  currentProduct,
  addLineItem,
  openRingSizerModal,
  closeModal,
}: SizeConverterFormProps) => {
  const initialSizeParsed = initialSize ? parseFloat(initialSize) : undefined
  console.log('initialSizeParsed', initialSizeParsed)
  console.log('currentVariant', currentVariant)
  console.log('currentProduct', currentProduct)

  const currentVariantTitle = currentVariant?.title?.substring(
    0,
    currentVariant?.title?.indexOf('/'),
  )
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

  console.log('initialRule', initialRule)

  const ValidationSchema = Yup.object().shape({
    countryA: Yup.string().required('Required'),
    countryB: Yup.string().required('Required'),
    sizeA: Yup.string().required('Required'),
    sizeB: Yup.string().required('Required'),
  })

  const [initialValues, setInitialValues] = useState<FormValues>({
    size: initialRule,
    countryA: initialRule ? sizeCountryOptions[0].value : undefined,
    countryB: undefined,
    sizeA: initialRule,
    sizeB: undefined,
  })

  useEffect(() => {
    console.log('update Initial Values')
    setInitialValues({
      size: initialRule,
      countryA: initialRule ? sizeCountryOptions[0].value : undefined,
      countryB: undefined,
      sizeA: initialRule,
      sizeB: undefined,
    })
  }, [initialRule])

  const handleATCClick = () => {
    if (!currentVariant) return
    if (!currentProduct) return
    if (!addLineItem) return
    if (typeof currentVariant.shopifyVariantID !== 'string') return

    // sendAddToCart({
    //   product: currentProduct,
    //   variant: currentVariant,
    //   quantity: 1,
    // })
    addLineItem({
      variantId: currentVariant.shopifyVariantID,
      quantity: 1,
    })
    if (!closeModal) return
    closeModal()
    // openCart('Product Added to Cart!')
  }
  const handleRingSizerClick = () => {
    console.log('openRingSizerModal', openRingSizerModal)
    if (openRingSizerModal !== undefined) {
      openRingSizerModal({
        currentProduct: currentProduct,
        currentVariant: currentVariant,
      })
    } else {
      return
    }
  }

  return (
    <MainWrapper>
      <HeaderWrapper>
        <Heading textAlign={'left'} mt={4} mb={3} level={2}>
          {title ? title : `International Ring Size Converter`}
        </Heading>
        {currentVariant ? (
          <CurrentVariantWrapper>
            <Checkmark />
            <Heading ml={2} my={0} level={3} textTransform={'uppercase'}>
              {currentVariantTitle}
            </Heading>
          </CurrentVariantWrapper>
        ) : null}
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
          <Divider />
          <ArrowWrapper>→</ArrowWrapper>
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
        <ButtonsWrapper>
          {addLineItem ? (
            <Button level={1} my={4} onClick={handleATCClick} type="button">
              Add to Cart in My Size
            </Button>
          ) : (
            <Link href="/about/appointments">
              <Button level={1} my={4} type="button">
                Schedule an Appointment
              </Button>
            </Link>
          )}
          <Button level={2} onClick={handleRingSizerClick} type="button">
            Request a Ring Sizer
          </Button>
        </ButtonsWrapper>
      </Form>
    </MainWrapper>
  )
}
