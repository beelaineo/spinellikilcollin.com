import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../types'

export interface CustomizationInquiryArgs {
  name: string
  email: string
  location: string
  phone: string
  product: string
  variant: string
  customization_details: string
  customization_budget: string
  communicationsConsent: boolean
}

const Subject = 'New customization inquiry'

const textTemplate = (args: CustomizationInquiryArgs): string => stripIndents`
  New customization inquiry:

  ${args.name} 

  Email Address: ${args.email}
  Location: ${args.location}
  ${args.phone ? `Phone: ${args.phone}` : ''}
  Consent to receive communications: ${args.communicationsConsent}

  Budget: ${args.customization_budget}
  Notes: ${args.customization_details}

  ${args.variant ? `Interested in: ${args.variant}` : ''}
  ${args.product ? `Product: ${args.product}` : ''}
`

export const customizationInquiry = (
  args: CustomizationInquiryArgs,
): Message => {
  return {
    From: DEAR,
    To: DEAR,
    Subject,
    TextBody: textTemplate(args),
    Tag: 'customizationInquiry',
    TrackOpens: false,
  }
}
