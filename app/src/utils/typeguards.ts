import { Product } from '../types'

export const isProduct = (obj: any | void | null): obj is Product =>
  Boolean(obj && obj?.__typename === 'Product')
