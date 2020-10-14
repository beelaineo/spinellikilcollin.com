import { NextApiHandler } from 'next'
import * as z from 'zod'
import { Parser as CSVParser } from 'json2csv'
import {
  fetchProducts,
  PinterestProduct,
  pinterestProductSchema,
} from '../../src/utils/catalogs'

const fields = Object.keys(pinterestProductSchema.shape)
const csvParser = new CSVParser({ fields })

const handler: NextApiHandler = async (req, res) => {
  const products: PinterestProduct[] = await fetchProducts()

  const csv = csvParser.parse(products)
  return res.status(200).send(csv)
}

export default handler
