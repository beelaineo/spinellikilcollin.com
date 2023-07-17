import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../types'

export interface WeddingCustomizationInquiryArgs {
  name: string
  email: string
  location: string
  phone: string
  product: string
  variant: string
  customization_wedding_details: string
  customization_wedding_budget: string
  communicationsConsent: boolean
}

const Subject = 'New wedding customization inquiry'

const textTemplate = (
  args: WeddingCustomizationInquiryArgs,
): string => stripIndents`
  New wedding customization inquiry:

  ${args.name} 

  Email Address: ${args.email}
  Location: ${args.location}
  ${args.phone ? `Phone: ${args.phone}` : ''}
  Consent to receive communications: ${args.communicationsConsent}

  Budget: ${args.customization_wedding_budget}
  Notes: ${args.customization_wedding_details}

  ${args.variant ? `Interested in: ${args.variant}` : ''}
  ${args.product ? `Product: ${args.product}` : ''}
`

export const weddingCustomizationInquiry = (
  args: WeddingCustomizationInquiryArgs,
): Message => {
  return {
    From: DEAR,
    To: DEAR,
    Subject,
    TextBody: textTemplate(args),
    Tag: 'weddingCustomizationInquiry',
    TrackOpens: false,
  }
}
