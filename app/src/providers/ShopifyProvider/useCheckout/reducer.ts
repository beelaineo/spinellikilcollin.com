import { Checkout, UserError } from '../types'

import {
  CheckoutState,
  STARTED_REQUEST,
  FETCHED_CHECKOUT,
  CREATED_CHECKOUT,
  APPLIED_DISCOUNT,
  REMOVED_DISCOUNT,
  ADDED_LINE_ITEMS,
  UPDATED_LINE_ITEMS,
  RECEIVED_ERRORS,
  CART_CLEARED,
} from './types'

interface StartedAction {
  type: typeof STARTED_REQUEST
}

interface GenericAction {
  type:
    | typeof FETCHED_CHECKOUT
    | typeof CREATED_CHECKOUT
    | typeof APPLIED_DISCOUNT
    | typeof REMOVED_DISCOUNT
    | typeof ADDED_LINE_ITEMS
    | typeof UPDATED_LINE_ITEMS
    | typeof RECEIVED_ERRORS
    | typeof CART_CLEARED
  checkout?: Checkout
  checkoutUserErrors?: UserError[]
}

export type CheckoutAction = StartedAction | GenericAction

export const reducer = (
  state: CheckoutState,
  action: CheckoutAction,
): CheckoutState => {
  switch (action.type) {
    case STARTED_REQUEST:
      return { ...state, loading: true }
    case CART_CLEARED:
      return {
        ...state,
        checkout: undefined,
        checkoutUserErrors: [],
        loading: false,
        ready: true,
      }
    case FETCHED_CHECKOUT:
    case CREATED_CHECKOUT:
    case APPLIED_DISCOUNT:
    case REMOVED_DISCOUNT:
    case ADDED_LINE_ITEMS:
    case UPDATED_LINE_ITEMS:
    case RECEIVED_ERRORS:
      const { checkoutUserErrors, checkout } = action
      return {
        ...state,
        checkoutUserErrors: checkoutUserErrors || [],
        checkout,
        loading: false,
        ready: true,
      }
    default:
      return state
  }
}
