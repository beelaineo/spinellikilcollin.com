import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import Link from 'next/link'
import { useShopify, useAnalytics } from '../../providers'
import { ShopifyStorefrontCheckoutLineItem as CheckoutLineItemType } from '../../types/generated-shopify'
import { Heading } from '../../components/Text'
import { Image } from '../../components/Image'
import TrashIcon from '../../svg/TrashCan.svg'
import { Button } from '../../components/Button'
import { Price } from '../../components/Price'
import {
  CheckoutProductWrapper,
  CheckoutItemDetails,
  CheckoutProductCloseButton as CloseButton,
  CheckoutProductCloseButtonWrapper as CloseButtonWrapper,
  QuantityInput,
  QuantityWrapper,
  QuantityAdjustButton,
} from './styled'

const { useEffect, useState } = React

interface CheckoutLineItemProps {
  lineItem: CheckoutLineItemType
}

export const CheckoutProduct = ({ lineItem }: CheckoutLineItemProps) => {
  const { sendRemoveFromCart } = useAnalytics()
  const { title, variant, quantity } = lineItem
  const [quantityValue, setQuantityValue] = useState(lineItem.quantity)
  const { updateLineItem } = useShopify()
  const product = variant?.product

  const handleQuantityChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value
    const newQuantity = parseInt(value, 10)
    setQuantityValue(newQuantity)
    if (value === '') return
  }
  useEffect(() => {
    setQuantityValue(lineItem.quantity)
    if (lineItem.quantity === 0) {
      sendRemoveFromCart({ product: lineItem, variant, quantity })
    }
  }, [lineItem.quantity])

  const handleQuantityIncrement = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setQuantityValue(lineItem.quantity + 1)
  }

  const handleQuantityDecrement = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setQuantityValue(lineItem.quantity - 1)
  }

  useEffect(() => {
    if (quantityValue === lineItem.quantity) return
    const update = async () => {
      await updateLineItem({ id: lineItem.id, quantity: quantityValue })
    }
    const timeout = setTimeout(update, 500)
    return () => clearTimeout(timeout)
  }, [quantityValue, lineItem.quantity])

  const remove = async () => {
    sendRemoveFromCart({ product: lineItem, variant, quantity })
    await updateLineItem({ id: lineItem.id, quantity: 0 })
  }

  const displayTitle = (title, variant) => {
    let displayTitle = title

    const getFirstWord = (text: string) => {
      const index = text.indexOf(' ')
      if (index > -1) {
        return text.substring(0, index).trim()
      } else {
        return text
      }
    }

    if (
      variant?.selectedOptions?.some((o) => o.name === 'Quantity') &&
      variant?.selectedOptions?.some((o) => o.name === 'Color')
    ) {
      if (
        variant?.selectedOptions
          ?.find((o) => o.name === 'Color')
          ?.value.includes(getFirstWord(title))
      ) {
        displayTitle = variant?.selectedOptions?.find(
          (o) => o.name === 'Color',
        )?.value
      } else if (
        variant?.selectedOptions
          ?.find((o) => o.name === 'Style')
          ?.value.includes(getFirstWord(title))
      ) {
        displayTitle = variant?.selectedOptions?.find(
          (o) => o.name === 'Style',
        )?.value
      }
      displayTitle += ` (${
        variant?.selectedOptions?.find((o) => o.name === 'Quantity')?.value
      })`
    } else if (
      variant?.selectedOptions?.some((o) => o.name === 'Color') ||
      variant?.selectedOptions?.some((o) => o.name === 'Style')
    ) {
      if (
        variant?.selectedOptions
          ?.find((o) => o.name === 'Color')
          ?.value.includes(getFirstWord(title))
      ) {
        displayTitle = variant?.selectedOptions?.find(
          (o) => o.name === 'Color',
        )?.value
      } else if (
        variant?.selectedOptions
          ?.find((o) => o.name === 'Style')
          ?.value.includes(getFirstWord(title))
      ) {
        displayTitle = variant?.selectedOptions?.find(
          (o) => o.name === 'Style',
        )?.value
      } else {
        displayTitle = title
      }
    } else if (variant?.selectedOptions?.some((o) => o.name === 'Quantity')) {
      displayTitle = ` (${
        variant?.selectedOptions?.find((o) => o.name === 'Quantity')?.value
      })`
    }
    return displayTitle
  }

  // Write a const function here that returns an array of Options to display in cart. Example: "Size: 8" or "Length: 18"
  const displayOptions = (variant) => {
    const options: Record<string, unknown>[] = []
    if (variant?.selectedOptions?.some((o) => o.name === 'Size')) {
      options.push({
        name: 'Size',
        value: variant?.selectedOptions?.find((o) => o.name === 'Size')?.value,
      })
    }
    if (variant?.selectedOptions?.some((o) => o.name === 'Length')) {
      options.push({
        name: 'Length',
        value: variant?.selectedOptions?.find((o) => o.name === 'Length')
          ?.value,
      })
    }
    if (variant?.selectedOptions?.some((o) => o.name === 'Chain')) {
      options.push({
        name: 'Chain',
        value: variant?.selectedOptions?.find((o) => o.name === 'Chain')?.value,
      })
    }
    return options
  }

  useEffect(() => {
    if (!variant) {
      remove()
    }
  }, [variant])

  if (!variant) return null
  if (!product?.handle) throw new Error('Product handle was not fetched')

  const params = new URLSearchParams()
  params.set('v', variant.id)
  const linkAs = `/products/${product.handle}?`
    .concat(params.toString())
    .replace(/\?$/, '')

  return (
    <CheckoutProductWrapper>
      <Link href="/products/[productSlug]" as={linkAs}>
        <a aria-label="Link to product page">
          <Image image={variant.image} />
        </a>
      </Link>
      <CheckoutItemDetails>
        <div>
          <Link href="/products/[productSlug]" as={linkAs}>
            <a aria-label="Link to product page">
              <Heading
                level={5}
                weight={2}
                mb={0}
                mt={0}
                textTransform="uppercase"
              >
                {displayTitle(title, variant)}
              </Heading>
            </a>
          </Link>
          <Heading level={5} weight={2} mb={0} mt={0} textTransform="uppercase">
            <Price price={variant.priceV2} />
          </Heading>
          {displayOptions(variant).map((o, i) => {
            return (
              <Heading level={5} weight={2} mb={0} mt={0} key={i}>
                {`${o.name}: ${o.value}`}
              </Heading>
            )
          })}
        </div>
        <Box my={0}>
          <QuantityWrapper>
            <Heading weight={2} my={0} level={5}>
              Quantity:
            </Heading>
            <QuantityAdjustButton onClick={handleQuantityDecrement}>
              -
            </QuantityAdjustButton>
            <QuantityInput
              type="number"
              value={quantityValue}
              onChange={handleQuantityChange}
            />
            <QuantityAdjustButton onClick={handleQuantityIncrement}>
              +
            </QuantityAdjustButton>
          </QuantityWrapper>
        </Box>
        <CloseButtonWrapper>
          <CloseButton onClick={remove} />
        </CloseButtonWrapper>
      </CheckoutItemDetails>
    </CheckoutProductWrapper>
  )
}
