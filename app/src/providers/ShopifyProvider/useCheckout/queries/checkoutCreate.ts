import gql from 'graphql-tag'
import {
  CheckoutLineItemInput,
  AttributeInput,
  MailingAddressInput,
  CheckoutResponse,
  Maybe,
} from '../../types'
import { checkoutFragment } from '../../../../graphql'
import { ShopifyStorefrontCountryCode } from '../../../../types/generated-shopify'

export type CheckoutCreate = (
  input: CheckoutCreateInput,
) => CheckoutCreateResponse

export interface CheckoutCreateInput {
  email?: string
  lineItems?: CheckoutLineItemInput[]
  shippingAddress?: MailingAddressInput
  note?: string
  customAttributes?: AttributeInput[]
  allowPartialAddresses?: boolean
  countryCode: ShopifyStorefrontCountryCode
}

export type CheckoutCreateResponse = CheckoutResponse<'checkoutCreate'>

export const CHECKOUT_CREATE_LEGACY = gql`
  mutation CheckoutCreate(
    $email: String
    $lineItems: [CheckoutLineItemInput!]
    $shippingAddress: MailingAddressInput
    $note: String
    $customAttributes: [AttributeInput!]
    $allowPartialAddresses: Boolean
  ) {
    checkoutCreate(
      input: {
        email: $email
        lineItems: $lineItems
        shippingAddress: $shippingAddress
        note: $note
        customAttributes: $customAttributes
        allowPartialAddresses: $allowPartialAddresses
      }
    ) {
      checkoutUserErrors {
        __typename
        code
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${checkoutFragment}
`

export const CHECKOUT_CREATE = gql`
  mutation CheckoutCreate(
    $email: String
    $lineItems: [CheckoutLineItemInput!]
    $shippingAddress: MailingAddressInput
    $note: String
    $customAttributes: [AttributeInput!]
    $allowPartialAddresses: Boolean
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    checkoutCreate(
      input: {
        buyerIdentity: { countryCode: $countryCode }
        email: $email
        lineItems: $lineItems
        shippingAddress: $shippingAddress
        note: $note
        customAttributes: $customAttributes
        allowPartialAddresses: $allowPartialAddresses
      }
    ) {
      checkoutUserErrors {
        __typename
        code
        field
      }
      checkout {
        ...CheckoutFragment
      }
    }
  }
  ${checkoutFragment}
`
