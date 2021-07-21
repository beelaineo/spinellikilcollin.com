import crypto from 'crypto'
import Debug from 'debug'
import Mailchimp from 'mailchimp-api-v3'
import { Sentry } from '../sentry'

const debug = Debug('app:mailchimp')

const KEY = process.env.MAILCHIMP_API_KEY
const LIST = process.env.MAILCHIMP_LIST_ID

if (!LIST) throw new Error('You must provide a mailchimp list ID')

interface MailchimpResponse {
  success: boolean
  error?: Error
}

interface MailchimpService {
  subscribe: (input: SubscribeInput) => Promise<MailchimpResponse>
}

interface MockRequest {
  method: string
  path: string
  body?: any
}

const mockMailChimpClient = {
  request: async (req: MockRequest) => {
    debug(' -- MOCKING MAILCHIMP -- in test mode')
    debug(req)
  },
}

const client = KEY ? new Mailchimp(KEY) : mockMailChimpClient

interface SubscribeInput {
  email: string
}

export const mailchimp: MailchimpService = {
  subscribe: async (input: SubscribeInput) => {
    try {
      const { email } = input
      const hash = crypto
        //
        .createHash('md5')
        .update(email)
        .digest('hex')
      const path = `/lists/${LIST}/members/${hash}`

      await client.request({
        method: 'put',
        path,
        body: {
          email_address: email,
          status_if_new: 'subscribed',
        },
      })
      debug(`Successfully subscribed: ${email}`)
      return {
        success: true,
      }
    } catch (error) {
      Sentry.captureException(error)
      return {
        success: false,
        error,
      }
    }
  },
}
