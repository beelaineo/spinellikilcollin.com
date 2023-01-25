import React from 'react'
import styled, { css } from '@xstyled/styled-components'
import {
  ShopifyProduct,
  ShopifyProductOption,
  ShopifyProductVariant,
  ShopifyProductOptionValue,
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
} from '../../../utils'
import { useModal } from '../../../providers/ModalProvider'
import Link from 'next/link'

const { useEffect, useState } = React

interface ProductOptionSelectorProps {
  variants: ShopifyProductVariant[]
  product: ShopifyProduct
  currentVariant: ShopifyProductVariant
  option: ShopifyProductOption
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

const DiamondInfoSpan = styled.span`
  display: inline-block;
  padding-left: 5;
  text-decoration: underline;
  cursor: pointer;
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

export const ProductOptionSelector = ({
  option,
  product,
  variants,
  changeValueForOption,
  currentVariant,
  isInput,
  disableStockIndication,
}: ProductOptionSelectorProps) => {
  if (!option || !option.name || !option.shopifyOptionId || !option.values) {
    console.warn('Missing option config', option)
    return null
  }

  if (option.values.length === 0) return null

  const [activeStone, setActiveStone] = useState<Maybe<Stone> | undefined>(null)
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

  const stockedVariants = product.sourceData?.variants?.edges
    ?.filter((variant) => {
      return (
        variant?.node?.availableForSale === true &&
        variant?.node?.currentlyNotInStock === false &&
        !variant?.node?.selectedOptions?.find((o) => o?.name == 'Carat')
      )
    })
    .map((variant) => variant?.node)

  const stockedColorOptions = stockedVariants
    ?.map((variant) => {
      return variant?.selectedOptions?.find(
        (option) => option?.name === 'Color',
      )
    })
    .map((option) => slugify(option?.value))

  const currentSelectedColor =
    currentVariant?.sourceData?.selectedOptions?.find(
      (option) => option?.name === 'Color',
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

  const formatLabel = (value: string, option: ShopifyProductOption) => {
    if (disableStockIndication == true) return value
    let i = 0
    currentVariantStockedOptions?.forEach((v) => {
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

    const optionLabel = i > 0 ? value + ' | Ready to Ship' : value
    return optionLabel
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
    (option: ShopifyProductOption, { value }: ShopifyProductOptionValue) =>
    () => {
      if (value) selectOption(value)
    }

  const isSwatchActive = (
    option: ShopifyProductOption,
    value: ShopifyProductOptionValue,
  ): boolean => {
    return optionMatchesVariant(option.name || 'foo', value, currentVariant)
  }

  useEffect(() => {
    const d = currentSelectedDiamond?.value
    const stones = product?.options?.find((o) => o?.name === 'Carat')?.values
    const stone = stones?.find((s) => s?.value === d)
    setActiveStone(stone?.stone)
  }, [currentVariant])

  const { openDiamondModal } = useModal()

  const handleSubmit = (values: any) => {
    //
  }
  return (
    <Wrapper>
      <Heading level={5} mb={2}>
        {isInput ? null : option.name}
        {option.name === 'Carat' ? (
          <>
            {activeStone ? (
              <DiamondInfoSpan
                onClick={() =>
                  openDiamondModal({
                    currentProduct: product,
                    currentVariant: currentVariant || undefined,
                    currentDiamond: currentSelectedDiamond || undefined,
                  })
                }
              >
                Diamond Info
              </DiamondInfoSpan>
            ) : null}
            <Link href={'/about/appointments'}>
              <a target={'_blank'}>Appointments</a>
            </Link>
          </>
        ) : null}
      </Heading>
      <SelectWrapper isInput={isInput}>
        {isValidSwatchOption(option) ? (
          <SwatchesWrapper>
            <OptionSwatches
              onSwatchClick={handleSwatchClick}
              isSwatchActive={isSwatchActive}
              option={option}
              stockedOptions={stockedColorOptions}
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
