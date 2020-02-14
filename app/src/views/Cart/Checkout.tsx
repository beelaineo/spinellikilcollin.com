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
import { Header6, Header5, Header3 } from '../../components/Text'
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
      <Header3 color="dark" align="center">
        Your cart
      </Header3>
      <CartInner open={false}>
        {checkout.lineItems.edges.map((lineItem) => {
          const { id, title, variant, quantity } = lineItem.node
          // const updateLineItemQuantity = createUpdateLineItemHandler(id)
          return (
            <CheckoutProduct
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
              <Header5
                transform="uppercase"
                weight="light"
                color="lightGrayBody"
              >
                Subtotal:
              </Header5>
            </FlexHalf>
            <FlexHalf>
              <Header5
                align="right"
                transform="uppercase"
                weight="light"
                color="dark"
              >
                ${checkout.paymentDueV2.amount}
              </Header5>
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

          <Header6 align="center">
            Shipping and discount codes are added at checkout.
          </Header6>
        </NormalizeDiv>
      </CartBottom>
    </NormalizeDiv>
  )
}
