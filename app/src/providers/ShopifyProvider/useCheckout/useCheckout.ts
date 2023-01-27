import * as React from 'react'
import { DocumentNode } from 'graphql'
import {
  UserError,
  QueryFunction,
  Checkout,
  CheckoutLineItemInput,
  CheckoutLineItemUpdateInput,
  Maybe,
} from '../types'
import {
  defaultQueries,
  CheckoutCreateInput,
  CheckoutCreateResponse,
  CheckoutFetchInput,
  CheckoutAttributesUpdateArgs,
  CheckoutAttributesUpdateV2Input,
  CheckoutAttributesUpdateResponse,
  CheckoutFetchResponse,
  CheckoutDiscountCodeApplyInput,
  CheckoutDiscountCodeApplyResponse,
  CheckoutDiscountCodeRemoveInput,
  CheckoutDiscountCodeRemoveResponse,
  CheckoutLineItemsAddInput,
  CheckoutLineItemsAddResponse,
  CheckoutLineItemsUpdateInput,
  CheckoutLineItemsUpdateResponse,
} from './queries'
import { reducer } from './reducer'
import {
  UseCheckoutValues,
  CheckoutState,
  STARTED_REQUEST,
  FETCHED_CHECKOUT,
  CREATED_CHECKOUT,
  APPLIED_DISCOUNT,
  REMOVED_DISCOUNT,
  ADDED_LINE_ITEMS,
  UPDATED_LINE_ITEMS,
  CART_CLEARED,
  // RECEIVED_ERRORS,
} from './types'
import { VIEWER_CART_TOKEN, setCookie, getCookie } from '../../../utils'
import {
  ShopifyStorefrontAttributeInput,
  ShopifyStorefrontCheckout,
  ShopifyStorefrontCountryCode,
} from '../../../types/generated-shopify'
import { useCountry } from '../../CountryProvider'
import { unwindEdges } from '@good-idea/unwind-edges'
import { Scalars } from '../../../types'
import { fetch } from '@cloudinary/url-gen/qualifiers/source'

const { useReducer, useEffect, useState } = React

/**
 * API
 */

export interface UseCheckoutConfig {
  /* dummy config for now */
  foo?: string
}

interface UseCheckoutArguments {
  query: QueryFunction
  queries?: Partial<UseCheckoutQueries>
  config?: Partial<UseCheckoutConfig>
}

export interface UseCheckoutQueries {
  CHECKOUT_CREATE: string | DocumentNode
  CHECKOUT_FETCH: string | DocumentNode
  CHECKOUT_DISCOUNT_CODE_APPLY: string | DocumentNode
  CHECKOUT_DISCOUNT_CODE_REMOVE: string | DocumentNode
  CHECKOUT_ATTRIBUTES_UPDATE: string | DocumentNode
  CHECKOUT_LINE_ITEMS_ADD: string | DocumentNode
  CHECKOUT_LINE_ITEMS_UPDATE: string | DocumentNode
}

const initialState = {
  ready: false,
  loading: true,
  checkoutUserErrors: [],
  checkout: undefined,
}

/**
 * Helper Functions
 */

const setViewerCartCookie = (token: string) =>
  setCookie(VIEWER_CART_TOKEN, token)

const getViewerCartCookie = () => getCookie(VIEWER_CART_TOKEN)

interface CheckoutAndErrors {
  checkout?: Checkout
  checkoutUserErrors?: UserError[]
}

export const useCheckout = ({
  queries: userQueries,
  query,
}: UseCheckoutArguments): UseCheckoutValues => {
  const {
    CHECKOUT_CREATE,
    CHECKOUT_FETCH,
    CHECKOUT_DISCOUNT_CODE_APPLY,
    CHECKOUT_DISCOUNT_CODE_REMOVE,
    CHECKOUT_ATTRIBUTES_UPDATE,
    CHECKOUT_LINE_ITEMS_ADD,
    CHECKOUT_LINE_ITEMS_UPDATE,
  } = {
    ...defaultQueries,
    ...userQueries,
  }

  /**
   * State
   */

  const [state, dispatch] = useReducer(reducer, initialState)
  const { currentCountry } = useCountry()
  const [countryCode, setCountryCode] =
    useState<ShopifyStorefrontCountryCode>(currentCountry)

  /**
   * Base Methods
   *
   * These methods query the Shopify API. Their names should match the names of the
   * available queries & mutations.
   *
   */

  const checkoutCreate = async (variables?: CheckoutCreateInput) => {
    if (state.checkout) return { checkout: state.checkout }
    const result = await query<CheckoutCreateResponse, CheckoutCreateInput>(
      CHECKOUT_CREATE,
      variables || { countryCode: countryCode },
    )

    const { checkoutCreate: checkoutCreateResponse } = result.data

    if (checkoutCreateResponse.checkout)
      setViewerCartCookie(checkoutCreateResponse.checkout.id)
    dispatch({ type: CREATED_CHECKOUT, ...checkoutCreateResponse })
    return checkoutCreateResponse
  }

  const getOrCreateCheckout = async (variables?: CheckoutCreateInput) => {
    // if state checkout exists and matches countryCode, return it
    if (
      state.checkout &&
      state.checkout.buyerIdentity.countryCode == countryCode
    ) {
      console.log('state.checkout exists and matches countryCode')
      return {
        checkout: state.checkout,
        checkoutUserErrors: state.checkoutUserErrors,
      }
      // otherwise, create a new checkout with updated country code and context
    } else {
      // if state checkout had line items, add them to the new checkout
      if (state.checkout && state.checkout.lineItems) {
        console.log(
          'state checkout had line items, add them to the new checkout',
        )
        const lineItems = unwindEdges(state.checkout.lineItems)[0]
        const checkoutLineItemInputs: CheckoutLineItemInput[] = lineItems.map(
          (item) => {
            const itemId = Buffer.from(item.id, 'base64')
              .toString()
              .split('?')[0]
              .split('/')
              .pop()
            const shopifyId = `gid://shopify/ProductVariant/` + itemId
            return {
              quantity: item.quantity,
              variantId: shopifyId,
            }
          },
        )

        const variables: CheckoutCreateInput = {
          lineItems: checkoutLineItemInputs,
          countryCode: countryCode,
        }
        return checkoutCreate(variables)
      } else {
        console.log('create new checkout with updated country code')
        return checkoutCreate({ countryCode: countryCode })
      }
    }
  }

  const fetchCheckout = async () => {
    const checkoutToken = getViewerCartCookie()
    if (checkoutToken) {
      /* If a token exists, fetch it from Shopify */
      const variables = { id: checkoutToken, countryCode: countryCode }
      const result = await query<CheckoutFetchResponse, CheckoutFetchInput>(
        CHECKOUT_FETCH,
        variables,
      )
      const checkout = result.data ? result.data.node : undefined
      /* If checkout countryCode doesn't match CountryProvider countryCode, create a new checkout */
      console.log('checkout', checkout)
      console.log('countryCode', countryCode)
      if (
        checkout &&
        checkout.lineItems &&
        countryCode &&
        checkout?.buyerIdentity.countryCode != countryCode
      ) {
        console.log('country code mismatch, recreating checkout')
        // checkout.buyerIdentity.countryCode = currentCountry
        console.log('updated checkout', checkout)
        const lineItems = unwindEdges(checkout.lineItems)[0]
        console.log('lineItems', lineItems)
        // gid://shopify/ProductVariant/40037934202978"
        // gid://shopify/CheckoutLineItem/316199337984980?checkout=e68b2a56075d319108507004de90a761
        // customAttributes
        // quantity
        // variantId

        const checkoutLineItemInputs: CheckoutLineItemInput[] = lineItems.map(
          (item) => {
            const itemId = Buffer.from(item.id, 'base64')
              .toString()
              .split('?')[0]
              .split('/')
              .pop()
            const shopifyId = `gid://shopify/ProductVariant/` + itemId
            console.log(shopifyId)
            return {
              quantity: item.quantity,
              variantId: shopifyId,
            }
          },
        )

        const variables: CheckoutCreateInput = {
          lineItems: checkoutLineItemInputs,
          countryCode: countryCode,
        }
        checkoutCreate(variables)
      } else {
        dispatch({ type: FETCHED_CHECKOUT, checkout })
      }
    } else {
      /* When no token exists, dispatch this to set "loading" to false. */
      /* This might deserve its own action type, "NOTHING_TO_FETCH" */
      dispatch({ type: FETCHED_CHECKOUT, checkout: undefined })
    }
  }

  const checkoutLineItemsAdd = async (lineItems: CheckoutLineItemInput[]) => {
    const { checkout } = await getOrCreateCheckout()
    if (!checkout)
      throw new Error(
        'checkoutLineItemsAdd was called before a checkout was created.',
      )
    dispatch({ type: STARTED_REQUEST })

    const variables = { lineItems, checkoutId: checkout.id }
    const result = await query<
      CheckoutLineItemsAddResponse,
      CheckoutLineItemsAddInput
    >(CHECKOUT_LINE_ITEMS_ADD, variables)
    dispatch({ type: ADDED_LINE_ITEMS, ...result.data.checkoutLineItemsAdd })
  }

  const checkoutLineItemsUpdate = async (
    lineItems: CheckoutLineItemUpdateInput[],
  ) => {
    const { checkout } = await getOrCreateCheckout()
    if (!checkout) throw new Error('There is no checkout to update')
    dispatch({ type: STARTED_REQUEST })
    const result = await query<
      CheckoutLineItemsUpdateResponse,
      CheckoutLineItemsUpdateInput
    >(CHECKOUT_LINE_ITEMS_UPDATE, {
      lineItems,
      checkoutId: checkout.id,
    })

    dispatch({
      type: UPDATED_LINE_ITEMS,
      ...result.data.checkoutLineItemsUpdate,
    })
  }

  const checkoutDiscountCodeApply = async (discountCode: string) => {
    const { checkout } = await getOrCreateCheckout()
    if (!checkout)
      throw new Error(
        'checkoutDiscountCodeApply was called before a checkout was created.',
      )
    dispatch({ type: STARTED_REQUEST })
    const result = await query<
      CheckoutDiscountCodeApplyResponse,
      CheckoutDiscountCodeApplyInput
    >(CHECKOUT_DISCOUNT_CODE_APPLY, {
      checkoutId: checkout.id,
      discountCode,
    })
    dispatch({
      type: APPLIED_DISCOUNT,
      ...result.data.checkoutDiscountCodeApplyV2,
    })
  }

  const checkoutDiscountCodeRemove = async () => {
    const { checkout } = await getOrCreateCheckout()
    if (!checkout)
      throw new Error(
        'checkoutDiscountCodeRemove was called before a checkout was created.',
      )

    dispatch({ type: STARTED_REQUEST })
    const result = await query<
      CheckoutDiscountCodeRemoveResponse,
      CheckoutDiscountCodeRemoveInput
    >(CHECKOUT_DISCOUNT_CODE_REMOVE, {
      checkoutId: checkout.id,
    })
    dispatch({
      type: REMOVED_DISCOUNT,
      ...result.data.checkoutDiscountCodeRemove,
    })
  }

  const checkoutAttributesUpdate = async (
    input: CheckoutAttributesUpdateV2Input,
  ) => {
    const { checkout } = await getOrCreateCheckout()
    if (!checkout)
      throw new Error(
        'checkoutAttributesUpdate was called before a checkout was created.',
      )
    dispatch({ type: STARTED_REQUEST })
    const result = await query<
      CheckoutAttributesUpdateResponse,
      CheckoutAttributesUpdateArgs
    >(CHECKOUT_ATTRIBUTES_UPDATE, {
      checkoutId: checkout.id,
      input,
    })
    dispatch({
      type: APPLIED_DISCOUNT,
      ...result.data.checkoutAttributesUpdateV2,
    })
  }

  /**
   * Shortcut Methods
   *
   * These methods implement the base methods to provide simpler "shortcut"
   * functions with a simpler API
   */

  /* Adds a single line item to the checkout */
  const addLineItem = async (lineItem: CheckoutLineItemInput) =>
    checkoutLineItemsAdd([lineItem])

  /* Updates a single line item */
  const updateLineItem = async (lineItem: CheckoutLineItemUpdateInput) =>
    checkoutLineItemsUpdate([lineItem])

  const addNote = async (note: string) => checkoutAttributesUpdate({ note })

  const refetchCheckout = async () => {
    console.log('refetching checkout')
    fetchCheckout()
  }

  /* Clears the cart */
  const clearCheckout = async () => dispatch({ type: CART_CLEARED })

  /**
   * Effects
   */

  useEffect(() => {
    fetchCheckout()
  }, []) // fetch the checkout on load

  useEffect(() => {
    console.log('useCheckout state changed', state)
  }, [state])

  useEffect(() => {
    setCountryCode(currentCountry)
  }, [currentCountry])

  useEffect(() => {
    console.log('country code changed', countryCode)
    setTimeout(() => fetchCheckout(), 500)
  }, [countryCode])

  const value = {
    ...state,
    /* Base Methods */
    checkoutCreate,
    checkoutLineItemsAdd,
    checkoutLineItemsUpdate,
    checkoutDiscountCodeApply,
    checkoutDiscountCodeRemove,
    checkoutAttributesUpdate,

    /* Shortcut Methods */
    addLineItem,
    updateLineItem,
    clearCheckout,
    refetchCheckout,
    addNote,
  }

  return value
}
