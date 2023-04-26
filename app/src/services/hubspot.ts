import { getCookie } from '../utils'
import { Sentry } from '../services/sentry'
import { config } from '../config'
import Debug from 'debug'
import publicIp from 'public-ip'

const debug = Debug('dev:hubspot')

interface CommunicationsOption {
  value: boolean
  subscriptionTypeId: string
  text: string
}

interface LegalConsentOptions {
  consent: {
    consentToProcess: boolean
    text: string
    communications: CommunicationsOption[]
  }
}

type Values = Record<string, string | number | boolean | undefined>

const HUBSPOT_API_URL =
  'https://api.hsforms.com/submissions/v3/integration/submit'
const PORTAL_ID = '7668999'

interface ValueObject {
  name: string
  value: string | number | boolean | undefined
}

const formatPhoneField = function (values: Values) {
  values.phone = '+' + values.dialingCode + ' ' + values.phone
  const { dialingCode, phoneCountryCode, ...hubspotValues } = values
  return hubspotValues
}

const parseValues = (values: Values): ValueObject[] =>
  Object.entries(values)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .filter(
      ({ name, value }) =>
        value !== undefined && typeof value === 'string' && value.length > 1,
    )

export const submitToHubspot = async (
  values: Values,
  hubspotFormId: string,
) => {
  if (typeof window === 'undefined') return
  const url = [HUBSPOT_API_URL, PORTAL_ID, hubspotFormId].join('/')
  const hutk = getCookie('hubspotutk')
  const pageUri = window.location.href.replace(/https?:\/\//, '')
  const pageName = document.title
  const ipAddress = await publicIp.v4()
  const context = {
    hutk,
    pageUri,
    pageName,
    ipAddress,
  }
  const legalConsentOptions = values.communicationsConsent && {
    consent: {
      consentToProcess: true,
      text: 'I agree to allow Spinelli Kilcollin to store and process my personal data.',
      communications: [
        {
          value: values.communicationsConsent,
          subscriptionTypeId: '9286953',
          text: 'I agree to receive marketing communications from Spinelli Kilcollin.',
        },
        {
          value: values.communicationsConsent,
          subscriptionTypeId: '9532507',
          text: 'I agree to receive one to one emails from Spinelli Kilcollin.',
        },
      ],
    },
  }
  const body = {
    fields: parseValues(formatPhoneField(values)),
    context,
    legalConsentOptions,
  }
  console.log('HUSBPOT FORM BODY SUBMITTED:', body)

  // if (config.STOREFRONT_ENV !== 'production') {
  //   console.log('Not currently in production. Mocking Hubpsot form submission:')
  //   debug('Not currently in production. Mocking Hubpsot form submission:')
  //   debug(body)
  //   return
  // }

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((r) => r.json())
    if (response.status === 'error') {
      throw response
    }
  } catch (err: any | unknown) {
    Sentry.captureException(err, 'hubspot_error', { hubspotFormData: body })
  }
}
