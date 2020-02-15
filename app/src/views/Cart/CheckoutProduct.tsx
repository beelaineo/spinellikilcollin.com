import * as React from 'react'
import { FlexContainer, FlexThree, FlexSix } from '../../components/Layout/Flex'
import { QuantitySelectorCart } from '../ProductDetail/styled'
import { QuantityInput } from '../../components/QuantityInput'
import { Heading } from '../../components/Text'
import { IoMdClose } from 'react-icons/io'
import { RemoveCart } from './styled'

const { useState } = React

export const CheckoutProduct = (props) => {
  const { title, variant, quantity } = props.lineItem.node
  const updateLineItemQuantity = props.updateLineItemQuantity

  const [hovered, setHover] = useState('invisible')

  /* Handlers */
  const updateHover = () => {
    setHover('visible')
  }
  const removeHover = () => {
    setHover('invisible')
  }

  return (
    <FlexContainer
      key={variant.id}
      margin="small"
      onMouseOver={updateHover}
      onMouseOut={removeHover}
    >
      <FlexThree>
        <img src={variant.image.originalSrc} />
      </FlexThree>
      <FlexSix marginVertical="0">
        <Heading level={5} weight={2} color="dark">
          {title}
        </Heading>
        <div>
          <FlexSix margin="small">
            <Heading level={5} weight={5} color="dark">
              ${variant.priceV2.amount}
            </Heading>
          </FlexSix>
          <FlexSix margin="small">
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
          </FlexSix>
        </div>
      </FlexSix>
      <RemoveCart onClick={() => updateLineItemQuantity(0)}>
        <IoMdClose className={hovered} />
      </RemoveCart>
    </FlexContainer>
  )
}
