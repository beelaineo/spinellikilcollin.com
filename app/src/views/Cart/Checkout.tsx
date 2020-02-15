import * as React from 'react'
import { useCheckout } from 'use-shopify'
import {
  NormalizeDiv,
  Button,
  QuantitySelectorCart,
} from '../ProductDetail/styled'
import { QuantityInput } from '../../components/QuantityInput'
import {
  FlexContainer,
  FlexHalf,
  FlexThree,
  FlexSix,
} from '../../components/Layout/Flex'
import { Loading } from '../Navigation/styled'
import { Heading } from '../../components/Text'
import { CartBottom, CartInner } from '../../components/Cart'
import { CheckoutProduct } from './CheckoutProduct'

const { useState } = React

/**
 * Main Checkout view
 */

export const Checkout = () => {
  /* State */
  const values = useCheckout()
  const { checkout, loading } = useCheckout()

  // const createUpdateLineItemHandler = (lineItemId: string) => (quantity) => {
  //   updateQuantity({ id: lineItemId, quantity: Math.max(quantity, 0) })
  // }

  if (!checkout || checkout.lineItems.length < 1) {
    // @ts-ignore
    return <NormalizeDiv top="0">Your cart is empty</NormalizeDiv>
  }

  return (
    // @ts-ignore
    <NormalizeDiv top="0">
      <Heading level={3} color="dark" textAlign="center">
        Your cart
      </Heading>
      <CartInner>
        {checkout.lineItems.edges.map((lineItem) => {
          const { id, title, variant, quantity } = lineItem.node
          // const updateLineItemQuantity = createUpdateLineItemHandler(id)
          return (
            <CheckoutProduct
              key={id}
              lineItem={lineItem}
              // updateLineItemQuantity={updateLineItemQuantity}
            />
          )
        })}
      </CartInner>

      <CartBottom>
        <Loading
          // @ts-ignore
          loading={loading}
        >
          <FlexContainer
            // @ts-ignore
            width="100%"
          >
            <FlexHalf>
              <Heading level={5} textTransform="uppercase" weight={2}>
                Subtotal:
              </Heading>
            </FlexHalf>
            <FlexHalf>
              <Heading
                level={5}
                textAlign="right"
                textTransform="uppercase"
                weight={2}
              >
                ${checkout.paymentDueV2.amount}
              </Heading>
            </FlexHalf>
          </FlexContainer>
        </Loading>
        <NormalizeDiv align="center">
          <Button
            as="a"
            href={checkout.webUrl}
            background="dark"
            color="light"
            weight="semi"
            width="100%"
            disabled={loading}
          >
            Checkout
          </Button>

          <Heading level={6} textAlign="center">
            Shipping and discount codes are added at checkout.
          </Heading>
        </NormalizeDiv>
      </CartBottom>
    </NormalizeDiv>
  )
}
