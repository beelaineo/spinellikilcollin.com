import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../types'

export interface NewCustomerArgs {
  email: string
  firstname: string
  lastname: string
  city?: string
  phone?: string
  phoneCountryCode?: string
  dialingCode?: string
  star_sign?: string
  communicationsConsent: boolean
  person?: string
}

const Subject = 'New Customer Intake Form Signup'

const textTemplate = (args: NewCustomerArgs): string => stripIndents`
  New Customer Intake Form signup:
  ${args.firstname} ${args.lastname}
  ${args.email}
  ${args.city}
  ${args.phone}

  ${args.person && `* Signed up by: ${args.person}`}
  
  Consent to receive communications: ${args.communicationsConsent}

  Star sign: ${args.star_sign}
`

export const newCustomer = (args: NewCustomerArgs): Message => {
  return {
    From: DEAR,
    To: DEAR,
    Subject,
    TextBody: textTemplate(args),
    Tag: 'NewCustomer',
    TrackOpens: false,
  }
}
