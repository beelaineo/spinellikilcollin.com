import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../types'

export interface VIPSignupArgs {
  email: string
  date_of_birth?: string
  phone?: string
  special_date_1_?: string
  special_date_2_?: string
}

const Subject = 'New VIP Signup'

const textTemplate = (args: VIPSignupArgs): string => stripIndents`
  New VIP Signup (Birthdays) Form submission:

  ${args.email}
  ${args.phone}

  DOB: ${args.date_of_birth} 
  Special Date 1: ${args.special_date_1_}
  Special Date 2: ${args.special_date_2_}
`

export const vipSignup = (args: VIPSignupArgs): Message => {
  return {
    From: DEAR,
    To: DEAR,
    Subject,
    TextBody: textTemplate(args),
    Tag: 'VIPSignup',
    TrackOpens: false,
  }
}
