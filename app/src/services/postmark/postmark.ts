import { ServerClient, Message, Errors } from 'postmark'
import Debug from 'debug'
import { Sentry } from '../sentry'
import {
  requestRingSizer,
  RequestRingSizerArgs,
  magazineSignup,
  MagazineSignupArgs,
} from './emails'

const debug = Debug('app:emails')

export const DEAR = 'Spinelli Kilcollin dear@spinellikilcollin.com'

/**
 * Client Setup
 */

type PostmarkResponse =
  | {
      success: true
      message: Message
    }
  | {
      success: false
      error: Errors.PostmarkError | null
    }

const POSTMARK_KEY = process.env.POSTMARK_KEY

interface PostmarkService {
  sendMagazineSignup: (args: MagazineSignupArgs) => Promise<PostmarkResponse>
  sendRequestRingSizer: (
    args: RequestRingSizerArgs,
  ) => Promise<PostmarkResponse>
}

if (!POSTMARK_KEY || !POSTMARK_KEY.length)
  throw new Error('You must provide a Postmark key')

const TEST_MODE = POSTMARK_KEY === 'POSTMARK_API_TEST'
if (TEST_MODE) debug('Postmark is in test mode')
const client = new ServerClient(POSTMARK_KEY)

const mockSend = (message: Message) => {
  debug(' -- MOCKING POSTMARK -- in test mode')
  debug('Sending email:')
  debug('To: ', message.To)
  debug('TextBody:', message.TextBody)
  if (message.HtmlBody) debug('HtmlBody:', message.HtmlBody)
}

const send = async (message: Message): Promise<PostmarkResponse> => {
  try {
    if (TEST_MODE) {
      mockSend(message)
      return {
        success: true,
        message,
      }
    }
    const response = await client.sendEmail(message)
    debug(
      `Sent email "${message.Subject} to ${message.To} - Postmark ID: ${response.MessageID}"`,
    )
    return {
      success: true,
      message,
    }
  } catch (error) {
    Sentry.captureException(error)
    return {
      success: false,
      error,
    }
  }
}

export const postmark: PostmarkService = {
  sendRequestRingSizer: async (args: RequestRingSizerArgs) => {
    const message = requestRingSizer(args)
    return send(message)
  },
  sendMagazineSignup: async (args: MagazineSignupArgs) => {
    const message = magazineSignup(args)
    return send(message)
  },
}
