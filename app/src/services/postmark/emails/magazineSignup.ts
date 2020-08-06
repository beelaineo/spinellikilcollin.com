import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../postmark'

export interface MagazineSignupArgs {
  firstname: string
  lastname: string
  email: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  country: string
}

const Subject = 'New .925 signup'

const textTemplate = (args: MagazineSignupArgs): string => stripIndents`
  New .925 subscription request:

  ${args.email}

  ${args.firstname} ${args.lastname} 
  ${args.address1}${args.address2 ? `\n${args.address2}` : ''}
  ${args.city}, ${args.state} ${args.zip}
  ${args.country}
`

export const magazineSignup = (args: MagazineSignupArgs): Message => {
  return {
    From: DEAR,
    To: DEAR,
    Subject,
    TextBody: textTemplate(args),
    Tag: '925',
    TrackOpens: false,
  }
}
