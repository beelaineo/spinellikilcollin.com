import { Paginated } from '@good-idea/unwind-edges'
import { MailingAddress } from './customer'
import { Variant } from './product'
import { MoneyV2, CurrencyCode } from './money'
import {
  ShopifyStorefrontCheckoutLineItem,
  ShopifyStorefrontDiscountApplication,
  ShopifyStorefrontDiscountAllocation,
  ShopifyStorefrontOrderLineItem,
  ShopifyStorefrontOrder,
  ShopifyStorefrontCheckout,
  ShopifyStorefrontMailingAddressInput,
  ShopifyStorefrontAttributeInput,
  ShopifyStorefrontCheckoutLineItemInput,
  ShopifyStorefrontCheckoutLineItemUpdateInput,
  ShopifyStorefrontUserError,
} from '../../../types/generated-shopify'

export type DiscountApplication = ShopifyStorefrontDiscountApplication
export type DiscountAllocation = ShopifyStorefrontDiscountAllocation
export type CheckoutLineItem = ShopifyStorefrontCheckoutLineItem
export type OrderLineItem = ShopifyStorefrontOrderLineItem
export type Order = ShopifyStorefrontOrder
export type Checkout = ShopifyStorefrontCheckout
export type MailingAddressInput = ShopifyStorefrontMailingAddressInput
export type AttributeInput = ShopifyStorefrontAttributeInput
export type CheckoutLineItemInput = ShopifyStorefrontCheckoutLineItemInput
export type CheckoutLineItemUpdateInput =
  ShopifyStorefrontCheckoutLineItemUpdateInput
export type UserError = ShopifyStorefrontUserError

export type CheckoutResponse<Key extends string> = {
  [K in Key]: {
    checkout?: Checkout
    checkoutUserErrors?: UserError[]
  }
}
