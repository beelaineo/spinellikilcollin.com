import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import Link from 'next/link'
import { useShopify, useAnalytics } from '../../providers'
import { CheckoutLineItem as CheckoutLineItemType } from '../../providers/ShopifyProvider/types'
import { Heading } from '../../components/Text'
import { Image } from '../../components/Image'
import TrashIcon from '../../svg/TrashCan.svg'
import { Button } from '../../components/Button'
import { Price } from '../../components/Price'
import {
  CheckoutProductWrapper,
  CheckoutItemDetails,
  QuantityInput,
  QuantityWrapper,
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
  const { product } = variant

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
      // @ts-ignore
      sendRemoveFromCart({ product: lineItem, variant, quantity })
    }
  }, [lineItem.quantity])

  useEffect(() => {
    if (quantityValue === lineItem.quantity) return
    const update = async () => {
      await updateLineItem({ id: lineItem.id, quantity: quantityValue })
    }
    const timeout = setTimeout(update, 500)
    return () => clearTimeout(timeout)
  }, [quantityValue, lineItem.quantity])

  const remove = async () => {
    // @ts-ignore
    sendRemoveFromCart({ product: lineItem, variant, quantity })
    await updateLineItem({ id: lineItem.id, quantity: 0 })
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
        <a>
          <Image image={variant.image} />
        </a>
      </Link>
      <CheckoutItemDetails>
        <div>
          <Link href="/products/[productSlug]" as={linkAs}>
            <a>
              <Heading level={5} weight={2} textTransform="uppercase">
                {title}
              </Heading>
            </a>
          </Link>
          <Heading level={5} weight={2} mb={0} textTransform="uppercase">
            <Price
              // @ts-ignore
              price={variant.priceV2}
            />
          </Heading>
        </div>
        <Box my={3}>
          <QuantityWrapper>
            <Heading weight={2} my={0} level={5}>
              Quantity:
            </Heading>
            <QuantityInput
              type="number"
              value={quantityValue}
              onChange={handleQuantityChange}
            />
          </QuantityWrapper>
          <Heading level={5} weight={2} textTransform="uppercase">
            Total:{' '}
            <Price
              // @ts-ignore
              price={variant.priceV2}
              quantity={quantity}
            />
          </Heading>
        </Box>

        <div>
          <Button level={4} onClick={remove}>
            Remove <TrashIcon />
          </Button>
        </div>
      </CheckoutItemDetails>
    </CheckoutProductWrapper>
  )
}
