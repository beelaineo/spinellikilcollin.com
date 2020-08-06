import { getCookie } from '../utils'

type Values = Record<string, string | number | boolean | undefined>

const HUBSPOT_API_URL =
  'https://api.hsforms.com/submissions/v3/integration/submit'
const PORTAL_ID = '7668999'

interface ValueObject {
  name: string
  value: string | number | boolean | undefined
}

const parseValues = (values: Values): ValueObject[] =>
  Object.entries(values).map(([name, value]) => ({
    name,
    value,
  }))

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
    submittedAt: new Date().getTime().toString(),
    fields: parseValues(values),
    context,
  }
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((r) => r.json())
    .catch((e) => {
      console.log('ERROR')
      console.log(e)
      throw e
    })
}
