import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../types'

export interface VIPLoyaltyArgs {
  firstname: string
  lastname: string
  email: string
  phone?: string
  phoneCountryCode?: string
  dialingCode?: string
  birthday?: string
  anniversary?: string
  partner_s_name?: string
  partner_s_birthday?: string
  important_event?: string
  import_event_date?: string
  communicationsConsent: boolean
}

const Subject = 'New VIP Loyalty Signup'

const textTemplate = (args: VIPLoyaltyArgs): string => stripIndents`
  New VIP Loyalty Signup Form submission:

  ${args.firstname} ${args.lastname}
  ${args.email}
  ${args.phone}

  Consent to receive communications: ${args.communicationsConsent}

  DOB: ${args.birthday}
  Anniversary: ${args.anniversary}
  Partner's Name: ${args.partner_s_name}
  Partner's DOB: ${args.partner_s_birthday}
  Important Event: ${args.important_event}
  Important Event Date: ${args.import_event_date}
`

export const vipLoyalty = (args: VIPLoyaltyArgs): Message => {
  return {
    From: DEAR,
    To: DEAR,
    Subject,
    TextBody: textTemplate(args),
    Tag: 'VIPLoyalty',
    TrackOpens: false,
  }
}
