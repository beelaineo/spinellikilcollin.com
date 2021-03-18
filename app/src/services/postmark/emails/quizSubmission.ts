import { stripIndents } from 'common-tags'
import { Message } from 'postmark'
import { DEAR } from '../postmark'

export interface QuizSubmissionArgs {
  kind: string
  styles: string
  full_name: string
  email: string
  phone?: string
  notes?: string
}

const Subject = 'New Quiz Submission'

const textTemplate = (args: QuizSubmissionArgs): string => stripIndents`
  New Quiz Submission:

  ${args.full_name}
  ${args.email}
  ${args.phone}

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
