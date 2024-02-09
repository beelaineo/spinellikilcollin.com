import * as React from 'react'
import { useRouter } from 'next/router'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Button } from '../Button'
import { useAnalytics, useCart, useCountry } from '../../providers'
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
  FreeShippingIndicator,
  ProgressBar,
  ProgressBarWrapper,
  CartItems,
} from './styled'
import { CheckoutProduct } from './CheckoutProduct'
import { BooleanCheckbox } from './BooleanCheckbox'
import { Affirm } from '../Affirm'
import { Price } from '../Price'
import { StringValueNode } from 'graphql'
import { CSSTransition } from 'react-transition-group'
import { render } from '@testing-library/react'
import { Klarna } from '../Klarna'
import { Maybe, ShopifyStorefrontMoneyV2 } from '../../types'

const { useState, useRef, useEffect } = React

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max)

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
  const router = useRouter()
  const [freeShippingMessage, setFreeShippingMessage] = useState('')
  const [progress, setProgress] = useState(0)

  const showFreeShippingIndicator = false

  const lineItems =
    checkout && checkout.lineItems ? unwindEdges(checkout.lineItems)[0] : []
  const title = message || 'Your Cart'

  const [totalPrice, setTotalPrice] =
    useState<Maybe<ShopifyStorefrontMoneyV2>>(null)
  const [notesVisible, setNotesVisible] = useState(false)

  const handleNotesToggle = (e) => {
    setNotesVisible(e.target.checked)
  }

  const sideCart = useRef<any>(null)

  const freeShippingThreshold = 500

  const freeShippingPosition =
    freeShippingThreshold - checkout?.totalPriceV2?.amount || 0

  useEffect(() => {
    if (cartOpen) {
      sideCart.current.focus()
    }
  }, [cartOpen])

  useEffect(() => {
    if (cartOpen) {
      setProgress(
        clamp(
          100 - (freeShippingPosition / freeShippingThreshold) * 100,
          0,
          100,
        ),
      )
    }
  }, [cartOpen, checkout?.totalPriceV2.amount, freeShippingPosition])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFreeShippingMessage(
        freeShippingPosition <= 0
          ? `Your order qualifies for free shipping!`
          : `You're only $${freeShippingPosition} away from free shipping!`,
      )
    }, 500)
    return () => clearTimeout(timeout)
  }, [freeShippingPosition])

  useEffect(() => {
    cartOpen && closeCart()
  }, [router])

  useEffect(() => {
    checkout && setTotalPrice(checkout.totalPriceV2)
    console.log('UPDATED CHECKOUT', checkout)
  }, [checkout])

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
    <CartSidebar open={cartOpen} ref={sideCart} tabIndex={-1}>
      <CartHeading>
        {cartOpen ? (
          <CloseButtonWrapper>
            <Hamburger open={true} onClick={closeCart} />
          </CloseButtonWrapper>
        ) : null}

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
          <Button level={2} mx="auto" onClick={closeCart} hidden={!cartOpen}>
            Continue Shopping
          </Button>
        </CartInner>
      ) : (
        <>
          <CartInner isLoading={loading} hidden={!cartOpen}>
            <CartItems>
              {lineItems.map((lineItem) => {
                return <CheckoutProduct key={lineItem.id} lineItem={lineItem} />
              })}
            </CartItems>
            {showFreeShippingIndicator && (
              <CSSTransition
                in={progress < 100}
                classNames="free-shipping"
                timeout={500}
              >
                <FreeShippingIndicator>
                  <Heading textAlign="left" color="body.7" my={3} level={4}>
                    {freeShippingMessage}
                  </Heading>

                  <ProgressBarWrapper>
                    <ProgressBar style={{ width: `${progress}%` }} />
                  </ProgressBarWrapper>

                  <Button
                    onClick={closeCart}
                    hidden={!cartOpen}
                    type="button"
                    textDecoration="underline"
                    mt={2}
                    mb={2}
                    level={3}
                  >
                    Continue shopping
                  </Button>
                </FreeShippingIndicator>
              </CSSTransition>
            )}
          </CartInner>

          <CartBottom hidden={!cartOpen}>
            {checkout && checkout?.totalPriceV2?.amount ? (
              <SubtotalWrapper>
                <Heading level={4} weight={2}>
                  Total:
                </Heading>
                <div>
                  <Heading level={4} textTransform="uppercase" weight={2}>
                    <Price price={totalPrice} style={'full'} />
                  </Heading>
                  {lineItems?.some(
                    (item) =>
                      item.variant?.product?.productType === 'Gift Card',
                  ) ? null : (
                    <div className="payment-plans">
                      <style
                        jsx
                        // eslint-disable-next-line react/no-unknown-property
                        global
                      >{`
                        #klarnaPlacement::part(osm-cta) {
                          text-decoration: none;
                        }
                        #klarnaPlacement ::part(osm-message) {
                          font-family: 'Inferi', 'Georgia', serif;
                          font-weight: 200;
                          line-height: 18.2px;
                        }
                        #klarnaPlacement ::part(osm-cta) {
                          font-family: 'Inferi', 'Georgia', serif;
                          font-weight: 200;
                          line-height: 18.2px;
                        }
                        @media screen and (max-width: 460px) {
                          .payment-plans
                            #klarnaPlacement
                            ::part(osm-container) {
                            margin-top: 1.5em;
                          }
                        }
                        @media screen and (min-width: 640px) {
                          .payment-plans
                            #klarnaPlacement
                            ::part(osm-container) {
                            margin-top: 1.5em;
                          }
                        }
                      `}</style>
                      <Affirm price={checkout.totalPriceV2} />
                      <Klarna price={checkout.totalPriceV2} />
                    </div>
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
