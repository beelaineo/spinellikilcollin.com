import { NextApiHandler } from 'next'
import * as z from 'zod'
import { fetchProducts, GoogleMerchantProduct } from '../../src/utils/catalogs'

const handler: NextApiHandler = async (req, res) => {
  const products: GoogleMerchantProduct[] = await fetchProducts()

  return res.status(200).json(products)
}

export default handler
