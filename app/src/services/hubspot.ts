import { getCookie } from '../utils'
import { Sentry } from '../services/sentry'
import { config } from '../config'
import Debug from 'debug'

const debug = Debug('dev:hubspot')

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
  const context = {
    hutk,
    pageUri,
    pageName,
  }
  const body = {
    fields: parseValues(formatPhoneField(values)),
    context,
  }
  if (config.STOREFRONT_ENV !== 'production') {
    debug('Not currently in production. Mocking Hubpsot form submission:')
    debug(body)
    return
  }

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
  } catch (err) {
    Sentry.setContext('hubspotResponse', err)
    Sentry.setContext('hubspotFormData', { body })
    Sentry.configureScope((scope) => scope.setTag('integration', 'hubspot'))
    Sentry.captureException(err)
  }
}
