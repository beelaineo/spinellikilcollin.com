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

import {
  UserError,
  QueryFunction,
  Checkout,
  CheckoutLineItemInput,
  CheckoutLineItemUpdateInput,
} from '../types'

export const STARTED_REQUEST = 'STARTED_REQUEST'
export const FETCHED_CHECKOUT = 'FETCHED_CHECKOUT'
export const CREATED_CHECKOUT = 'CREATED_CHECKOUT'
export const APPLIED_DISCOUNT = 'APPLIED_DISCOUNT'
export const REMOVED_DISCOUNT = 'REMOVED_DISCOUNT'
export const ADDED_LINE_ITEMS = 'ADDED_LINE_ITEMS'
export const UPDATED_LINE_ITEMS = 'UPDATED_LINE_ITEMS'
export const RECEIVED_ERRORS = 'RECEIVED_ERRORS'
export const CART_CLEARED = 'RECEIVED_ERRORS'

interface CheckoutAndErrors {
  checkout?: Checkout
  checkoutUserErrors?: UserError[]
}

/**
 * State
 */

export interface CheckoutState {
  loading: boolean
  ready: boolean
  checkoutUserErrors: UserError[]
  checkout: Checkout | void
}

export interface UseCheckoutValues extends CheckoutState {
  /* All of CheckoutState, and */
  /* Base Methods */
  checkoutCreate: (args: CheckoutCreateInput) => Promise<CheckoutAndErrors>
  checkoutLineItemsAdd: (lineItems: CheckoutLineItemInput[]) => Promise<void>
  checkoutLineItemsUpdate: (
    lineItems: CheckoutLineItemUpdateInput[],
  ) => Promise<void>
  checkoutDiscountCodeApply: (discountCode: string) => Promise<void>
  checkoutDiscountCodeRemove: () => Promise<void>
  checkoutAttributesUpdate: (
    args: CheckoutAttributesUpdateV2Input,
  ) => Promise<void>

  /* Shortcut Methods */
  addLineItem: (lineItem: CheckoutLineItemInput) => Promise<void>
  updateLineItem: (lineItem: CheckoutLineItemUpdateInput) => Promise<void>
  clearCheckout: () => Promise<void>
  addNote: (note: string) => Promise<void>
}
