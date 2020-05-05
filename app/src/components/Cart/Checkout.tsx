import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useCheckout } from 'use-shopify'
import { Button } from '../Button'
import { useCart } from '../../providers/CartProvider'
import { FlexContainer, FlexHalf } from '../../components/Layout/Flex'
import { Heading } from '../../components/Text'
import { CartBottom, CartInner } from '../../components/Cart'
import { CheckoutProduct } from './CheckoutProduct'

/**
 * Main Checkout view
 */

export const Checkout = () => {
  /* State */
  const { message } = useCart()
  const { checkout, loading } = useCheckout()

  if (
    !checkout ||
    !checkout.lineItems ||
    !checkout.lineItems.edges ||
    checkout.lineItems.edges.length < 1
  ) {
    return <div>Your cart is empty</div>
  }
  const lineItems =
    checkout && checkout.lineItems ? unwindEdges(checkout.lineItems)[0] : []

  const title = message || 'Your Cart'

  return (
    <div>
      <Heading level={2} color="dark" textAlign="center">
        {title}
      </Heading>
      <CartInner>
        {lineItems.map((lineItem) => {
          return <CheckoutProduct key={lineItem.id} lineItem={lineItem} />
        })}
      </CartInner>

      <CartBottom>
        {checkout?.paymentDueV2?.amount ? (
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
        ) : null}
        <div>
          <Button as="a" href={checkout.webUrl} disabled={loading}>
            Checkout
          </Button>

          <Heading level={6} textAlign="center">
            Shipping and discount codes are added at checkout.
          </Heading>
        </div>
      </CartBottom>
    </div>
  )
}
