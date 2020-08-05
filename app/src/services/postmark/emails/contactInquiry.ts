import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../postmark'

export interface ContactInquiryArgs {
  name: string
  emailAddress: string
  phone: string
  country: string
  state: string
  message: string
  formType?: string
}

const textTemplate = ({
  //
  formType,
  name,
  emailAddress,
  country,
  state,
  message,
}: ContactInquiryArgs): string => stripIndents`
  New ${formType} inquiry:

  ${name}

  Email Address: ${emailAddress}
  Country: ${country}
  State/Region: ${state}

  Message:

  ${message}
`

export const contactInquiry = (args: ContactInquiryArgs): Message => {
  const Subject = `New ${args.formType} inquiry`
  const Tag = `${args.formType}Inquiry`
  return {
    From: DEAR,
    To: DEAR,
    Subject,
    TextBody: textTemplate(args),
    Tag,
    TrackOpens: false,
  }
}
