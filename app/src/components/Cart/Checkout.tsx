import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useCheckout } from 'use-shopify'
import { Button } from '../Button'
import { useCart } from '../../providers/CartProvider'
import { Form, Field } from '../Forms'
import { Heading } from '../Text'
import { Hamburger } from '../Hamburger'
import {
  CartSidebar,
  CloseButtonWrapper,
  CartBottom,
  CartInner,
} from './styled'
import { CheckoutProduct } from './CheckoutProduct'
import { Affirm } from '../Affirm'

/**
 * Main Checkout view
 */

interface FormValues {
  note?: string
}

export const Checkout = () => {
  /* State */
  const { message, open: cartOpen, closeCart } = useCart()
  const { checkout, loading, addNote } = useCheckout()

  const lineItems =
    checkout && checkout.lineItems ? unwindEdges(checkout.lineItems)[0] : []

  const title = message || 'Your Cart'

  const handleSubmit = async (values: FormValues) => {
    if (!checkout) throw new Error('There is no checkout')
    const { note } = values
    if (note) await addNote(note)
    // @ts-ignore
    window.location = checkout.webUrl
  }

  return (
    <CartSidebar open={cartOpen}>
      <CloseButtonWrapper>
        <Hamburger open={true} onClick={closeCart} />
      </CloseButtonWrapper>
      <Heading my={4} level={3} color="dark" textAlign="center">
        {title}
      </Heading>
      {lineItems.length === 0 ? (
        <CartInner>
          <Heading level={4}>Your cart is empty</Heading>
        </CartInner>
      ) : (
        <>
          <CartInner>
            {lineItems.map((lineItem) => {
              return <CheckoutProduct key={lineItem.id} lineItem={lineItem} />
            })}
          </CartInner>

          <CartBottom>
            {checkout && checkout?.paymentDueV2?.amount ? (
              <>
                <Heading level={4} weight={2}>
                  Total:
                </Heading>
                <div>
                  <Heading level={4} textTransform="uppercase" weight={2}>
                    ${checkout.paymentDueV2.amount}
                  </Heading>
                  <Affirm price={checkout.paymentDueV2} />
                </div>
              </>
            ) : null}
            <div>
              <Form<FormValues> onSubmit={handleSubmit} initialValues={{}}>
                <Heading level={5} textAlign="center">
                  Please leave special instructions below
                </Heading>
                <Field type="textarea" name="notes" />
                <Button type="submit" level={2} disabled={loading}>
                  Checkout
                </Button>

                <Heading level={6} textAlign="center">
                  Shipping and discount codes are added at checkout.
                </Heading>
              </Form>
            </div>
          </CartBottom>
        </>
      )}
    </CartSidebar>
  )
}
