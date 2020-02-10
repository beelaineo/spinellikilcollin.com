import * as React from 'react'
import { ShopifyProduct } from '../../src/types'
import { NotFound, ProductDetail } from '../../src/views'

interface ProductQueryResult {
  productByHandle: ShopifyProduct
  allShopifyProducts: [ShopifyProduct]
}

interface ProductProps {
  productData: ShopifyProduct
}

function head<T>(arr: T[]): T {
  return arr ? arr[0] : undefined
}

const Product = ({ productData }: ProductProps) => {
  if (!productData) return <NotFound />
  return <ProductDetail product={productData} />
}

Product.getInitialProps = async (ctx: any) => {
  return {}
}

export default Product
