import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../postmark'

export interface CustomizationInquiryArgs {
  name: string
  emailAddress: string
  phone?: string
  state: string
  product?: string
  variant?: string
}

const Subject = 'New customization inquiry'

const textTemplate = (args: CustomizationInquiryArgs): string => stripIndents`
  New customization inquiry:

  ${args.emailAddress}

  ${args.name} 

  Interested in: ${args.product} | ${args.variant}
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
