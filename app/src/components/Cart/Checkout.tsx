import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { useCheckout } from 'use-shopify'
import { Button } from '../Button'
import { useCart } from '../../providers/CartProvider'
import { Form, Field } from '../../components/Forms'
import { Heading } from '../../components/Text'
import { ModalBackground, CartSidebar, CartBottom, CartInner } from './styled'
import { CheckoutProduct } from './CheckoutProduct'
import { Affirm } from '../../components/Affirm'

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
    <>
      <ModalBackground open={cartOpen} onClick={closeCart} />
      <CartSidebar open={cartOpen}>
        <Heading my={4} level={2} color="dark" textAlign="center">
          {title}
        </Heading>
        {lineItems.length === 0 ? (
          <CartInner>
            <Heading level={3}>Your cart is empty</Heading>
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
                  <Heading level={3} weight={2}>
                    Total:
                  </Heading>
                  <div>
                    <Heading level={3} textTransform="uppercase" weight={2}>
                      ${checkout.paymentDueV2.amount}
                    </Heading>
                    <Affirm price={checkout.paymentDueV2} />
                  </div>
                </>
              ) : null}
              <div>
                <Form<FormValues> onSubmit={handleSubmit} initialValues={{}}>
                  <Heading level={4} textAlign="center">
                    Please leave special instructions below
                  </Heading>
                  <Field type="textarea" name="notes" />
                  <Button type="submit" level={1} disabled={loading}>
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
    </>
  )
}
