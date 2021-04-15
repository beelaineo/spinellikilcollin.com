import 'isomorphic-unfetch'
import path from 'path'
import fs from 'fs'
import Debug from 'debug'
import * as gsheets from 'gsheets'

const debug = Debug('build:json')

const INTL_JSON_ID = '1SPbFACsAK3BRPqp-AsMjP-xFjouCXCNxyExpQ-QOnNE'
const REDIRECTS_ID = '10ULQzGyICG9Dn5MYXv2sdMwD6z5-agFNtZDxemTRXqI'

const fetchSheet = async (
  worksheetId: string,
  sheetName: string,
  fileName: string,
  postProcess?: (lines: any[]) => any[],
): Promise<void> => {
  const response = await gsheets.getWorksheet(worksheetId, sheetName)
  const data = postProcess ? postProcess(response.data) : response.data

  fs.writeFileSync(
    path.resolve(__dirname, '..', 'data', `${fileName}.json`),
    JSON.stringify(data, null, 2),
  )
  debug(`📚 Saved ${fileName}.json`)
}

interface Redirect {
  from: string
  to: string
}

const baseUrlRegex = /https?:\/\/(www\.)?spinellikilcollin\.com/

const stripBaseUrl = ({ from, to }: Redirect): Redirect => ({
  from: from.replace(baseUrlRegex, '').replace(/\?.*$/, ''),
  to: to.replace(baseUrlRegex, ''),
})

const stripBaseUrls = (redirects: Redirect[]): Redirect[] =>
  redirects.map(stripBaseUrl)

const run = async () => {
  await fetchSheet(INTL_JSON_ID, 'Country translations', 'countries')
  await fetchSheet(INTL_JSON_ID, 'states', 'states')
  await fetchSheet(REDIRECTS_ID, 'Valid Redirects', 'redirects', stripBaseUrls)
}

run()
