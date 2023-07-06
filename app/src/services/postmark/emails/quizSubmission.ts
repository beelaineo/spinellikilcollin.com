import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../types'
import { definitely } from '../../../utils'

export interface QuizSubmissionArgs {
  kind: string
  styles: string
  full_name: string
  email: string
  phone?: string
  notes?: string
  phoneCountryCode?: string
  dialingCode?: string
}

const Subject = 'New Quiz Submission'

const getPhoneNumber = ({
  phoneCountryCode,
  dialingCode,
  phone,
}: QuizSubmissionArgs): string =>
  phone
    ? definitely([phoneCountryCode, `+${dialingCode}`, phone]).join(' ')
    : '(no phone number provided)'

const textTemplate = (args: QuizSubmissionArgs): string => stripIndents`
  New Quiz Submission:

  ${args.full_name}
  ${args.email}
  ${getPhoneNumber(args)}

  Product kind: ${args.kind}
  Styles: ${args.styles}

  ${args.notes ? `Notes: ${args.notes}` : ''}
`

export const quizSubmission = (args: QuizSubmissionArgs): Message => {
  return {
    From: DEAR,
    To: DEAR,
    Subject,
    TextBody: textTemplate(args),
    Tag: 'Quiz',
    TrackOpens: false,
  }
}
