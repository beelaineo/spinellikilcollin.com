import {
  ShopifyStorefrontProductVariant as Variant,
  ShopifyStorefrontProduct,
  ShopifyStorefrontCheckoutLineItem as CheckoutLineItem,
} from '../../types/generated-shopify'
import {
  Product,
  ShopifyProductVariant,
  ShopifySourceProduct,
  ShopifySourceProductVariant,
} from '../../types'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: any
  }
}

export interface SelectedProduct {
  product:
    | Product
    | CheckoutLineItem
    | ShopifyStorefrontProduct
    | undefined
    | null
  variant:
    | ShopifyProductVariant
    | ShopifySourceProductVariant
    | Variant
    | undefined
    | null
  quantity?: number
}

export interface EcommerceObject {
  name?: string | null
  id?: string | null
  price?: string
  category?: string
  variant?: string
  list?: string
  position?: number
  quantity?: number
}

export enum EventType {
  Impressions = 'productImpressions',
  CarouselClick = 'carouselClick',
  FilterClick = 'filterClick',
  ProductClick = 'productClick',
  ProductDetailView = 'productDetail',
  AddToCart = 'productAddToCart',
  RemoveFromCart = 'productRemoveFromCart',
  BeginCheckout = 'productBeginCheckout',
  QuickLinkClick = 'quickLinkClick',
}

interface ImpressionEvent {
  event: EventType.Impressions
  ecommerce: {
    impressions: EcommerceObject[]
  }
}

interface CarouselClickEvent {
  event: EventType.CarouselClick
}

interface FilterClickEvent {
  event: EventType.FilterClick
}

interface ProductClickEvent {
  event: EventType.ProductClick
  ecommerce: {
    products: EcommerceObject[]
  }
}

interface ProductDetailEvent {
  event: EventType.ProductDetailView
  ecommerce: {
    products: EcommerceObject[]
  }
}

interface AddToCartEvent {
  event: EventType.AddToCart
  ecommerce: {
    add: {
      products: EcommerceObject[]
    }
  }
}

interface RemoveFromCartEvent {
  event: EventType.RemoveFromCart
  ecommerce: {
    remove: {
      products: EcommerceObject[]
    }
  }
}

interface BeginCheckoutEvent {
  event: EventType.BeginCheckout
  ecommerce: {
    checkout: {
      products: EcommerceObject[]
    }
  }
}

interface QuickLinkClickEvent {
  event: EventType.QuickLinkClick
}

export type GTagEvent =
  | CarouselClickEvent
  | FilterClickEvent
  | ImpressionEvent
  | ProductClickEvent
  | ProductDetailEvent
  | AddToCartEvent
  | RemoveFromCartEvent
  | BeginCheckoutEvent
  | QuickLinkClickEvent
