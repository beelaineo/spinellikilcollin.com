import * as React from 'react'
import { QuantitySelectorCart } from '../ProductDetail/styled'
import { QuantityInput } from '../../components/QuantityInput'
import { Heading } from '../../components/Text'
import { Image } from '../../components/Image'
import { IoMdClose } from 'react-icons/io'
import { CheckoutProductWrapper, RemoveCart } from './styled'
import { formatMoney } from '../../utils/currency'
import { StorefrontApiCheckoutLineItem } from '../../types'

const { useState } = React

interface CheckoutLineItemProps {
  lineItem: StorefrontApiCheckoutLineItem
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
      <Heading level={5} weight={2} color="dark">
        {title}
      </Heading>
      <div>
        <Heading level={5} weight={5} color="dark">
          {formatMoney(variant.priceV2)}
        </Heading>
        <QuantitySelectorCart className={hovered} width="40px">
          Quantity: {'     '}
          <button
            type="button"
            onClick={() => updateLineItemQuantity(quantity - 1)}
          >
            <span>&#8722;</span>
          </button>
          <QuantityInput
            quantity={quantity}
            setQuantity={updateLineItemQuantity}
          />
          <button
            type="button"
            onClick={() => updateLineItemQuantity(quantity + 1)}
          >
            <span>&#43;</span>
          </button>
        </QuantitySelectorCart>
      </div>
      <RemoveCart onClick={() => updateLineItemQuantity(0)}>
        <IoMdClose className={hovered} />
      </RemoveCart>
    </CheckoutProductWrapper>
  )
}
