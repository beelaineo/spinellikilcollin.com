import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../postmark'

export interface CustomizationInquiryArgs {
  name: string
  emailAddress: string
  location: string
  phone?: string
  message?: string
  product?: string
  variant?: string
}

const Subject = 'New customization inquiry'

const textTemplate = (args: CustomizationInquiryArgs): string => stripIndents`
  New customization inquiry:

  ${args.name} 

  Email Address: ${args.emailAddress}
  Location: ${args.location}
  ${args.phone ? `Phone: ${args.phone}` : ''}

  Notes: ${args.message}

  ${args.product ? `Interested in: ${args.product} | ${args.variant}` : ''}
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
