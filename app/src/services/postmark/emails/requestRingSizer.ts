import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../postmark'

export interface RequestRingSizerArgs {
  name: string
  emailAddress: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  productName: string
}

const Subject = 'New ring sizer request'

const textTemplate = (args: RequestRingSizerArgs): string => stripIndents`
  New ring sizer:

  ${args.emailAddress}

  ${args.name} 
  ${args.address1}${args.address2 ? `\n${args.address2}` : ''}
  ${args.city}, ${args.state} ${args.postalCode}
  ${args.country}

  Interested in: ${args.productName}
`

export const requestRingSizer = (args: RequestRingSizerArgs): Message => {
  return {
    From: DEAR,
    To: DEAR,
    Subject,
    TextBody: textTemplate(args),
    Tag: 'ringSizer',
    TrackOpens: false,
  }
}
