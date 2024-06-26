import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR, CARE } from '../types'

export interface CustomerCareArgs {
  firstname: string
  lastname: string
  email: string
  phone?: string
  phoneCountryCode?: string
  dialingCode?: string
  address1?: string
  address2?: string
  city: string
  state?: string
  zip?: string
  country?: string
  inquiry_type: string
  orderNumber?: string
  orderUnknown: boolean
  message?: string
  product?: string
  variant?: string
  image?: any
  communicationsConsent: boolean
}

const Subject = 'New Customer Care Inquiry'

const textTemplateOrder = (args: CustomerCareArgs): string => stripIndents`
  New Customer Care Form submission - ${args.inquiry_type}:

  ${args.firstname} ${args.lastname}
  ${args.address1}${args.address2 ? `\n${args.address2}` : ''}
  ${args.city}, ${args.state} ${args.zip}
  ${args.country}

  Email: ${args.email}
  Phone: ${args.phone}

  Message: ${args.message}

  Product: ${args.product}
  Variant: ${args.variant}

  Order Number: ${args.orderNumber}
  Order Unknown: ${args.orderUnknown}

  Consent to receive communications: ${args.communicationsConsent}
`

const textTemplate = (args: CustomerCareArgs): string => stripIndents`
  New Customer Care Form submission - ${args.inquiry_type}:

  ${args.firstname} ${args.lastname}
  ${args.address1}${args.address2 ? `\n${args.address2}` : ''}
  ${args.city}, ${args.state} ${args.zip}
  ${args.country}

  Email: ${args.email}
  Phone: ${args.phone}

  Message: ${args.message}

  Consent to receive communications: ${args.communicationsConsent}
`

export const customerCare = (args: CustomerCareArgs): Message => {
  const { inquiry_type } = args
  return {
    From: DEAR,
    To:
      inquiry_type == 'Start a Repair' || inquiry_type == 'Returns & Exchanges'
        ? CARE
        : DEAR,
    Subject,
    TextBody:
      inquiry_type == 'Start a Repair' || inquiry_type == 'Returns & Exchanges'
        ? textTemplateOrder(args)
        : textTemplate(args),
    Tag: 'CustomerCare',
    TrackOpens: false,
  }
}

// Return or start a repair:
// Form submission sent as email to clientcare@sk.com

// Place order, Custom inquiry
// 	Send email to dear@sk.com
