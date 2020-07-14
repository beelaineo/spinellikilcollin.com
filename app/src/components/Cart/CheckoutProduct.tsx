import * as React from 'react'
import { Box } from '@xstyled/styled-components'
import {
  useCheckout,
  CheckoutLineItem as CheckoutLineItemType,
} from 'use-shopify'
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
  const { title, variant, quantity } = lineItem
  const [quantityValue, setQuantityValue] = useState(lineItem.quantity)
  const { updateLineItem } = useCheckout()

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
    await updateLineItem({ id: lineItem.id, quantity: 0 })
  }

  if (!variant) throw new Error('no variant how?')

  return (
    <CheckoutProductWrapper>
      <Image image={variant.image} />
      <CheckoutItemDetails>
        <div>
          <Heading level={5} weight={2} textTransform="uppercase">
            {title}
          </Heading>
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
