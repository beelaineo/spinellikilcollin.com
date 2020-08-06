import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../postmark'

export interface RequestRingSizerArgs {
  name: string
  email: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  country: string
  product?: string
  variant?: string
}

const Subject = 'New ring sizer request'

const textTemplate = (args: RequestRingSizerArgs): string => stripIndents`
  New ring sizer request:

  ${args.email}

  ${args.name} 
  ${args.address1}${args.address2 ? `\n${args.address2}` : ''}
  ${args.city}, ${args.state} ${args.zip}
  ${args.country}

  Interested in: ${args.product || ''} ${args.variant || ''}
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
