import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import {
  Product,
  ProductOption,
  ShopifyProductVariant,
  ProductOptionValue,
  Maybe,
  ShopifySourceProductVariant,
  ShopifySourceSelectedOption,
  Stone,
} from '../../../types'
import { Heading } from '../../../components/Text'
import { Form, Field } from '../../../components/Forms'
import { OptionSwatches } from '../../../components/Product/ProductSwatches'
import { ProductPriceInput, Option } from '../../../components/Forms/Fields'
import { conformToMask } from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import {
  optionMatchesVariant,
  isValidSwatchOption,
  definitely,
  withTypenames,
} from '../../../utils'
import { useModal } from '../../../providers/ModalProvider'
import Link from 'next/link'
import { ShopifyStorefrontProductVariant } from '../../../types/generated-shopify'
import { sanityClient } from '../../../services/sanity'

const { useEffect, useState } = React

interface ProductOptionSelectorProps {
  variants: ShopifyProductVariant[]
  product: Product
  currentVariant: ShopifyProductVariant
  option: ProductOption
  changeValueForOption: (optionId: string) => (value: string) => void
  isInput: boolean
  disableStockIndication?: boolean
}

interface SelectWrapperProps {
  isInput: boolean
}

const currencyMask = createNumberMask({
  prefix: '$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2,
  integerLimit: 5,
  allowNegative: false,
  allowLeadingZeroes: false,
})

const Wrapper = styled.div`
  a {
    text-decoration: underline;
    display: inline-block;
    padding-left: 4;
  }
`

const SwatchesWrapper = styled.div`
  display: flex;
`

const SelectWrapper = styled.div<SelectWrapperProps>`
  ${({ theme, isInput }) => css`
    position: relative;
    max-width: ${isInput ? '100%' : '200px'};

    ${theme.mediaQueries.mobile} {
      width: 100%;
      max-width: initial;
    }

    &:has(select:focus-visible) {
      ${theme.focus.left()}
    }
  `}
`

const sanityQuery = async <R = any | null,>(
  query: string,
  params?: Record<string, any>,
): Promise<R> => {
  const results = await sanityClient.fetch<R>(query, params || {})
  // @ts-ignore
  return withTypenames<R>(results)
}

export const ProductOptionSelector = ({
  option,
  product,
  variants,
  changeValueForOption,
  currentVariant,
  isInput,
  disableStockIndication,
}: ProductOptionSelectorProps) => {
  if (!option || !option.name || !option.values) {
    console.warn('Missing option config', option)
    return null
  }

  if (option.values.length === 0) return null

  const [activeStone, setActiveStone] = useState<Maybe<Stone> | undefined>(null)
  const [includedVariants, setIncludedVariants] = useState<
    | Maybe<ShopifyStorefrontProductVariant[] | ShopifySourceProductVariant[]>
    | undefined
  >(null)
  const [stockedColorOptionsIncluded, setStockedColorOptionsIncluded] =
    useState<Maybe<string[]> | undefined>(null)

  const selectOption = changeValueForOption(option.name)

  const slugify = (text?: Maybe<string>) => {
    if (!text) return ''
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    selectOption(value)
  }

  const stockedVariants = product.store?.variants
    ?.filter((variant) => {
      return (
        variant?.sourceData?.availableForSale === true &&
        variant?.sourceData?.currentlyNotInStock === false &&
        !variant?.sourceData?.selectedOptions?.find(
          (o) => o?.value == 'Not sure of my size',
        ) &&
        !variant?.sourceData?.selectedOptions?.find((o) => o?.name == 'Carat')
      )
    })
    .map((variant) => variant?.sourceData)

  const stockedColorOptions = stockedVariants
    ?.map((variant) => {
      return variant?.selectedOptions?.find(
        (option) =>
          option?.name === 'Color' ||
          option?.name === 'Style' ||
          option?.name === 'Material',
      )
    })
    .map((option) => slugify(option?.value))

  const currentSelectedColor =
    currentVariant?.sourceData?.selectedOptions?.find(
      (option) => option?.name === 'Color',
    )

  const currentSelectedStyle =
    currentVariant?.sourceData?.selectedOptions?.find(
      (option) => option?.name === 'Style',
    )

  const currentSelectedMaterial =
    currentVariant?.sourceData?.selectedOptions?.find(
      (option) => option?.name === 'Material',
    )

  const currentSelectedDiamond =
    currentVariant?.sourceData?.selectedOptions?.find(
      (option) => option?.name === 'Carat',
    )

  const getVariantOptions = (variantOptions) => {
    const arr: Record<string, unknown>[] = []
    variantOptions.forEach((v) => {
      const key = slugify(v.name)
      const value: string = v.value
      const obj: Record<string, unknown> = { [key]: value }
      arr.push(obj)
    })
    return Object.assign({}, ...arr)
  }

  const currentVariantStockedOptions = stockedVariants?.map((variant) =>
    getVariantOptions(variant?.selectedOptions),
  )

  const getIncludedVariants = async (
    product: Product,
  ): Promise<ShopifyStorefrontProductVariant[] | null> => {
    const variants = await sanityQuery(
      `*[_type == 'product' && handle == $handle][0].store.variants[sourceData.metafields[key == "excludeFromIndication"].value == "false"]`,
      { handle: product?.handle },
    )
    return variants
  }

  const formatLabel = (value: string, option: ProductOption) => {
    if (disableStockIndication == true) {
      // console.log('current variant', currentVariant)
      // console.log('disableStockIndication is TRUE')
      // console.log('OPTION', option)
      // console.log('VALUE NAME', value)
      // console.log('includedVariants', includedVariants)
      // console.log('currentVariantStockedOptions', currentVariantStockedOptions)
      const disabledProductCurrentStockedOptions =
        currentVariantStockedOptions?.filter((o) => {
          return includedVariants?.some((v) => {
            return Boolean(v.title == `${o.color} / ${o.size}`)
          })
        })
      let i = 0
      disabledProductCurrentStockedOptions?.forEach((v) => {
        if (currentSelectedColor) {
          if (
            Object.values(v).includes(value) &&
            Object.values(v).includes(currentSelectedColor?.value)
          ) {
            i++
          }
        } else {
          if (Object.values(v).includes(value)) {
            i++
          }
        }
      })
      const optionLabel = i > 0 ? value + ' | In Stock' : value
      return optionLabel
    } else {
      let i = 0
      currentVariantStockedOptions?.forEach((v) => {
        if (currentSelectedColor) {
          if (
            Object.values(v).includes(value) &&
            Object.values(v).includes(currentSelectedColor?.value)
          ) {
            i++
          }
        } else if (currentSelectedStyle) {
          if (
            Object.values(v).includes(value) &&
            Object.values(v).includes(currentSelectedStyle?.value)
          ) {
            i++
          }
        } else if (currentSelectedMaterial) {
          if (
            Object.values(v).includes(value) &&
            Object.values(v).includes(currentSelectedMaterial?.value)
          ) {
            i++
          }
        } else {
          if (Object.values(v).includes(value)) {
            i++
          }
        }
      })
      const optionLabel = i > 0 ? value + ' | In Stock' : value
      return optionLabel
    }
  }

  const options = definitely(
    definitely(option.values).map(({ value }) =>
      value
        ? {
            value: value,
            id: value,
            label: formatLabel(value, option),
          }
        : null,
    ),
  )

  const optionsNumeric =
    options !== undefined
      ? options.map((option: Option) => {
          return Number(option.label.toString().replace(/[^0-9\.-]+/g, ''))
        })
      : []

  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue: number = Number(e.target.value) || 50
    const closest = optionsNumeric.reduce(function (prev, curr) {
      return Math.abs(curr - inputValue) < Math.abs(prev - inputValue)
        ? curr
        : prev
    })
    const remasked = conformToMask(closest.toString(), currencyMask)
    selectOption(remasked.conformedValue)
  }

  const handleSwatchClick =
    (option: ProductOption, { value }: ProductOptionValue) =>
    () => {
      if (value) selectOption(value)
    }

  const isSwatchActive = (
    option: ProductOption,
    value: ProductOptionValue,
  ): boolean => {
    return optionMatchesVariant(option.name || 'foo', value, currentVariant)
  }

  useEffect(() => {
    const d = currentSelectedDiamond?.value
    const stones = product?.options?.find((o) => o?.name === 'Carat')?.values
    const stone = stones?.find((s) => s?.value === d)
    setActiveStone(stone?.stone)
  }, [currentVariant])

  useEffect(() => {
    if (disableStockIndication == true) {
      const includedVariantsArray = getIncludedVariants(product)
      includedVariantsArray.then((variants) => {
        setIncludedVariants(variants)
      })
    }
    const colorOptions =
      disableStockIndication == true
        ? includedVariants
            ?.map((variant) => {
              return variant?.sourceData?.selectedOptions?.find(
                (option) =>
                  option?.name === 'Color' ||
                  option?.name === 'Style' ||
                  option?.name === 'Material',
              )
            })
            .map((option) => slugify(option?.value))
        : null
    setStockedColorOptionsIncluded(colorOptions)
  }, [disableStockIndication, includedVariants, product])

  const handleSubmit = (values: any) => {
    //
  }
  return (
    <Wrapper>
      <Heading level={5} mb={2}>
        {isInput ? null : option.name}
      </Heading>
      <SelectWrapper isInput={isInput}>
        {isValidSwatchOption(option) ? (
          <SwatchesWrapper>
            <OptionSwatches
              onSwatchClick={handleSwatchClick}
              isSwatchActive={isSwatchActive}
              option={option}
              stockedOptions={
                stockedColorOptionsIncluded
                  ? stockedColorOptionsIncluded
                  : stockedColorOptions
              }
              disableStockIndication={disableStockIndication}
            />
          </SwatchesWrapper>
        ) : (
          <Form onSubmit={handleSubmit} initialValues={{}}>
            {isInput ? (
              <ProductPriceInput
                name={option.name}
                onChange={handleProductInputChange}
                options={options}
              />
            ) : (
              <Field
                type="select"
                name={option.name}
                onChange={handleSelectChange}
                options={options}
              />
            )}
          </Form>
        )}
      </SelectWrapper>
    </Wrapper>
  )
}
