import { ServerClient, Message, Errors } from 'postmark'
import Debug from 'debug'
import { Sentry } from '../sentry'
import {
  contactInquiry,
  ContactInquiryArgs,
  customizationInquiry,
  CustomizationInquiryArgs,
  requestRingSizer,
  RequestRingSizerArgs,
  magazineSignup,
  MagazineSignupArgs,
  quizSubmission,
  QuizSubmissionArgs,
  vipSignup,
  VIPSignupArgs,
  weddingCustomizationInquiry,
  WeddingCustomizationInquiryArgs,
  VIPLoyaltyArgs,
  vipLoyalty,
  newCustomer,
  NewCustomerArgs,
  customerCare,
  CustomerCareArgs,
} from './emails'
import { config } from '../../config'

const debug = Debug('app:emails')

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

const { POSTMARK_KEY } = config

interface PostmarkService {
  sendMagazineSignup: (args: MagazineSignupArgs) => Promise<PostmarkResponse>
  sendVIPSignup: (args: VIPSignupArgs) => Promise<PostmarkResponse>
  sendVIPLoyalty: (args: VIPLoyaltyArgs) => Promise<PostmarkResponse>
  sendCustomerCare: (args: CustomerCareArgs) => Promise<PostmarkResponse>
  sendNewCustomer: (args: NewCustomerArgs) => Promise<PostmarkResponse>
  sendRequestRingSizer: (
    args: RequestRingSizerArgs,
  ) => Promise<PostmarkResponse>
  sendCustomizationInquiry: (
    args: CustomizationInquiryArgs,
  ) => Promise<PostmarkResponse>
  sendContactInquiry: (args: ContactInquiryArgs) => Promise<PostmarkResponse>
  sendQuizSubmission: (args: QuizSubmissionArgs) => Promise<PostmarkResponse>
  sendWeddingCustomizationInquiry: (
    args: WeddingCustomizationInquiryArgs,
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
    if (message.From.includes('example.com')) {
      debug(
        `Not sending mail. Sender email: ${message.From} (suspicious domain example.com)`,
      )
      Sentry.captureException(
        `Not sending mail. Sender email: ${message.From} (suspicious domain example.com)`,
        'postmark_error',
      )
      return {
        success: false,
        error: null,
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
  } catch (error: any | unknown) {
    Sentry.captureException(error, 'postmark_error')
    return {
      success: false,
      error,
    }
  }
}

export const postmark: PostmarkService = {
  sendCustomizationInquiry: async (args: CustomizationInquiryArgs) => {
    const message = customizationInquiry(args)
    return send(message)
  },

  sendRequestRingSizer: async (args: RequestRingSizerArgs) => {
    const message = requestRingSizer(args)
    return send(message)
  },

  sendMagazineSignup: async (args: MagazineSignupArgs) => {
    const message = magazineSignup(args)
    return send(message)
  },

  sendVIPSignup: async (args: VIPSignupArgs) => {
    const message = vipSignup(args)
    return send(message)
  },

  sendVIPLoyalty: async (args: VIPLoyaltyArgs) => {
    const message = vipLoyalty(args)
    return send(message)
  },

  sendNewCustomer: async (args: NewCustomerArgs) => {
    const message = newCustomer(args)
    return send(message)
  },

  sendCustomerCare: async (args: CustomerCareArgs) => {
    const message = customerCare(args)
    return send(message)
  },

  sendContactInquiry: async (args: ContactInquiryArgs) => {
    const message = contactInquiry(args)
    return send(message)
  },

  sendQuizSubmission: async (args: QuizSubmissionArgs) => {
    const message = quizSubmission(args)
    return send(message)
  },

  sendWeddingCustomizationInquiry: async (
    args: WeddingCustomizationInquiryArgs,
  ) => {
    const message = weddingCustomizationInquiry(args)
    return send(message)
  },
}
