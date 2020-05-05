import * as React from 'react'
import { CheckoutLineItem as CheckoutLineItemType } from 'use-shopify'
import { QuantitySelectorCart } from '../ProductDetail/styled'
import { QuantityInput } from '../../components/QuantityInput'
import { Heading } from '../../components/Text'
import { Image } from '../../components/Image'
import { IoMdClose } from 'react-icons/io'
import {
  CheckoutProductWrapper,
  CheckoutItemDetails,
  RemoveCart,
} from './styled'
import { formatMoney } from '../../utils/currency'

const { useState } = React

interface CheckoutLineItemProps {
  lineItem: CheckoutLineItemType
}

export const CheckoutProduct = ({ lineItem }: CheckoutLineItemProps) => {
  const { title, variant, quantity } = lineItem
  // const updateLineItemQuantity = props.updateLineItemQuantity
  //
  const updateLineItemQuantity = (args: any) => alert('todo')

  const [hovered, setHover] = useState('invisible')
  if (!variant) throw new Error('no variant how?')

  /* Handlers */
  const updateHover = () => {
    setHover('visible')
  }
  const removeHover = () => {
    setHover('invisible')
  }

  return (
    <CheckoutProductWrapper onMouseOver={updateHover} onMouseOut={removeHover}>
      <Image image={variant.image} />
      <CheckoutItemDetails>
        <Heading level={5} weight={2} color="dark" textTransform="uppercase">
          {title}
        </Heading>
        <Heading level={5} weight={2} color="dark" textTransform="uppercase">
          {formatMoney(variant.priceV2)}
        </Heading>
        <QuantitySelectorCart className={hovered}>
          <Heading weight={2} color="dark" level={5}>
            Quantity: {'     '}
          </Heading>
          <QuantityInput
            quantity={quantity}
            setQuantity={updateLineItemQuantity}
          />
        </QuantitySelectorCart>
        <RemoveCart onClick={() => updateLineItemQuantity(0)}>
          <IoMdClose className={hovered} />
        </RemoveCart>
      </CheckoutItemDetails>
    </CheckoutProductWrapper>
  )
}
