import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../types'

export interface ContactInquiryArgs {
  name: string
  email: string
  phone: string
  country: string
  state: string
  message: string
  formtype?: string
}

const textTemplate = ({
  //
  formtype,
  name,
  email,
  country,
  state,
  message,
}: ContactInquiryArgs): string => stripIndents`
  New ${formtype} inquiry:

  ${name}

  Email Address: ${email}
  Country: ${country}
  State/Region: ${state}

  Message:

  ${message}
`

export const contactInquiry = (args: ContactInquiryArgs): Message => {
  const Subject = `New ${args.formtype} inquiry`
  const Tag = `${args.formtype}Inquiry`
  return {
    From: DEAR,
    To: DEAR,
    Subject,
    TextBody: textTemplate(args),
    Tag,
    TrackOpens: false,
  }
}
