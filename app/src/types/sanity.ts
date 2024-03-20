import { Product, Collection } from './generated-sanity'

export interface GroqCollection extends Omit<Collection, '__typename'> {
  _type: 'collection'
}

export interface GroqProduct extends Omit<Product, '__typename'> {
  _type: 'product'
}
