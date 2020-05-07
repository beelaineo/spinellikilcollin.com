import 'isomorphic-unfetch'
import path from 'path'
import fs from 'fs'
import Debug from 'debug'
import * as gsheets from 'gsheets'

const debug = Debug('build:json')

const fetchSheet = async (
  sheetName: string,
  fileName: string,
): Promise<void> => {
  const response = await gsheets.getWorksheet(
    '1SPbFACsAK3BRPqp-AsMjP-xFjouCXCNxyExpQ-QOnNE',
    sheetName,
  )
  const data = response.data

  fs.writeFileSync(
    path.resolve(__dirname, '..', 'data', `${fileName}.json`),
    JSON.stringify(data, null, 2),
  )
  debug(`📚 Saved ${fileName}.json`)
}

const run = async () => {
  await fetchSheet('Country translations', 'countries')
  await fetchSheet('states', 'states')
}

run()
