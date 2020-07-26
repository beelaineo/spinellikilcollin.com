import {
  ShopifyProduct,
  ShopifyProductVariant,
  ShopifySourceProduct,
  ShopifySourceProductVariant,
} from '../../types'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export interface CartEvent {
  product: SelectedProduct
  quantity: number
}

export interface SelectedProduct {
  product: ShopifyProduct | ShopifySourceProduct
  variant: ShopifyProductVariant | ShopifySourceProductVariant
}

export interface EcommerceObject {
  name: string
  id: string
  price: string
  category: string
  variant: string
  list?: string
  position?: number
}

export enum EventType {
  Impressions = 'productImpressions',
}

interface ImpressionEvent {
  event: EventType.Impressions
  ecommerce: {
    impressions: EcommerceObject[]
  }
}

export type GTagEvent = ImpressionEvent
