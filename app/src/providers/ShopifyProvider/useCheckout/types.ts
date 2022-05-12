import { UserError, Checkout } from '../types'

export const STARTED_REQUEST = 'STARTED_REQUEST'
export const FETCHED_CHECKOUT = 'FETCHED_CHECKOUT'
export const CREATED_CHECKOUT = 'CREATED_CHECKOUT'
export const APPLIED_DISCOUNT = 'APPLIED_DISCOUNT'
export const REMOVED_DISCOUNT = 'REMOVED_DISCOUNT'
export const ADDED_LINE_ITEMS = 'ADDED_LINE_ITEMS'
export const UPDATED_LINE_ITEMS = 'UPDATED_LINE_ITEMS'
export const RECEIVED_ERRORS = 'RECEIVED_ERRORS'
export const CART_CLEARED = 'RECEIVED_ERRORS'

export interface CheckoutState {
  loading: boolean
  ready: boolean
  checkoutUserErrors: UserError[]
  checkout: Checkout | void
}
