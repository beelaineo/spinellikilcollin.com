import * as React from 'react'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Button } from '../Button'
import { useAnalytics, useCart } from '../../providers'
import { useShopify } from '../../providers/ShopifyProvider'
import { Form, Field } from '../Forms'
import { Checkbox } from '../Forms/Fields/Checkbox'
import { Heading } from '../Text'
import { Hamburger } from '../Hamburger'
import {
  CartSidebar,
  CloseButtonWrapper,
  CartBottom,
  CartInner,
  CartHeading,
  SubtotalWrapper,
  OptionsWrapper,
} from './styled'
import { CheckoutProduct } from './CheckoutProduct'
import { BooleanCheckbox } from './BooleanCheckbox'
import { Affirm } from '../Affirm'
import { Price } from '../Price'
import { StringValueNode } from 'graphql'

const { useState } = React

/**
 * Main Checkout view
 */

interface FormValues {
  notes?: string
  notesBool?: boolean
  giftWrap?: boolean
}

const defString = (s: string | undefined): string => (s ? s : '')

export const Checkout = () => {
  /* State */
  const { message, open: cartOpen, closeCart } = useCart()
  const { goToCheckout, checkout, loading, addNote } = useShopify()

  const lineItems =
    checkout && checkout.lineItems ? unwindEdges(checkout.lineItems)[0] : []
  const title = message || 'Your Cart'

  const [notesVisible, setNotesVisible] = useState(false)

  const handleNotesToggle = (e) => {
    setNotesVisible(e.target.checked)
    console.log('notesVisible:', notesVisible)
  }

  const handleSubmit = async (values: FormValues) => {
    if (!checkout) throw new Error('There is no checkout')
    const { notes, giftWrap } = values
    const fullNote = giftWrap
      ? defString(notes)
          .concat('\n\n** Gift wrap requested **')
          .replace(/^\s+/, '')
      : notes

    if (fullNote) await addNote(fullNote)
    goToCheckout()
  }

  return (
    <CartSidebar open={cartOpen}>
      <CartHeading>
        <CloseButtonWrapper>
          <Hamburger open={true} onClick={closeCart} />
        </CloseButtonWrapper>

        <Heading my={0} level={3} color="dark" textAlign="center">
          <span role="status">{title}</span>
        </Heading>
      </CartHeading>
      {lineItems.length === 0 ? (
        <CartInner center>
          <Heading
            fontStyle="italic"
            textAlign="center"
            color="body.7"
            my={6}
            level={4}
          >
            Your cart is empty
          </Heading>
          <Button level={2} mx="auto" onClick={closeCart}>
            Continue Shopping
          </Button>
        </CartInner>
      ) : (
        <>
          <CartInner isLoading={loading}>
            {lineItems.map((lineItem) => {
              return <CheckoutProduct key={lineItem.id} lineItem={lineItem} />
            })}
          </CartInner>

          <CartBottom>
            {checkout && checkout?.paymentDueV2?.amount ? (
              <SubtotalWrapper>
                <Heading level={4} weight={2}>
                  Total:
                </Heading>
                <div>
                  <Heading level={4} textTransform="uppercase" weight={2}>
                    <Price price={checkout.paymentDueV2} style={'full'} />
                  </Heading>
                  {lineItems?.some(
                    (item) =>
                      item.variant?.product?.productType === 'Gift Card',
                  ) ? null : (
                    <Affirm price={checkout.paymentDueV2} />
                  )}
                </div>
              </SubtotalWrapper>
            ) : null}
            <Form<FormValues> onSubmit={handleSubmit} initialValues={{}}>
              <OptionsWrapper>
                <div></div>
                <div>
                  <BooleanCheckbox
                    onChange={handleNotesToggle}
                    label="Special Instructions"
                    name="notesBool"
                  />
                  <Checkbox label="Gift Wrap" name="giftWrap" />
                </div>
              </OptionsWrapper>
              {notesVisible ? (
                <Field
                  type="textarea"
                  name="notes"
                  placeholder="Please leave special instructions here"
                />
              ) : null}
              <Button
                type="submit"
                mt={4}
                mb={0}
                w="100%"
                level={1}
                disabled={loading}
              >
                Checkout
              </Button>

              <Heading my={3} level={6} textAlign="center">
                Shipping and discount codes are added at checkout.
              </Heading>

              <Heading my={3} level={6} textAlign="center">
                We accept the following forms of payment: Visa, Mastercard,
                Amex, Discover, PayPal, BitPay, Affirm, JCB, Diners Club, Elo,
                Shop Pay, Apple Pay, Google Pay
              </Heading>
            </Form>
          </CartBottom>
        </>
      )}
    </CartSidebar>
  )
}
