export interface ProductChanged {
  action: 'sync' | 'create' | 'update'
  products: DataSinkProduct[]
}

export interface ProductDeleted {
  action: 'delete'
  productIds: number[]
}

export interface CollectionChanged {
  action: 'sync' | 'create' | 'update'
  collections: DataSinkCollection[]
}

export interface CollectionDeleted {
  action: 'delete'
  collectionIds: number[]
}

export type RequestBody =
  | ProductChanged
  | ProductDeleted
  | CollectionChanged
  | CollectionDeleted

export interface DataSinkCollection {
  id: `gid://shopify/Collection/${string}`
  createdAt: string
  handle: string
  descriptionHtml: string
  image?: DataSinkCollectionImage
  rules?: {
    column: string
    condition: string
    relation: string
  }[]
  disjunctive?: boolean
  sortOrder: string
  title: string
  updatedAt: string
}

export interface DataSinkProduct {
  id: `gid://shopify/Product/${string}`
  title: string
  description: string
  descriptionHtml: string
  featuredImage?: DataSinkProductImage
  handle: string
  images: DataSinkProductImage[]
  options: DataSinkProductOption[]
  priceRange: DataSinkProductPriceRange
  productType: string
  tags: string[]
  variants: DataSinkProductVariant[]
  vendor: string
  status: 'active' | 'archived' | 'draft' | 'unknown'
  publishedAt: string
  createdAt: string
  updatedAt: string
}
export interface DataSinkProductImage {
  id: `gid://shopify/ProductImage/${string}`
  altText?: string
  height?: number
  width?: number
  src: string
}

export interface DataSinkProductOption {
  id: `gid://shopify/ProductOption/${string}`
  name: string
  position: number
  values: string[]
}

export interface DataSinkProductPriceRange {
  minVariantPrice?: number
  maxVariantPrice?: number
}
export interface DataSinkProductVariant {
  id: `gid://shopify/ProductVariant/${string}`
  title: string
  compareAtPrice?: number
  barcode?: string
  inventoryPolicy: string
  inventoryQuantity: number
  inventoryManagement: string
  position: number
  requiresShipping: boolean
  fulfillmentService: string
  sku: string
  taxable: boolean
  weight: number
  weightUnit: string
  price: string
  createdAt: string
  updatedAt: string
  image?: DataSinkProductImage
  product: {
    id: `gid://shopify/Product/${string}`
    status: 'active' | 'archived' | 'draft' | 'unknown'
  }
  selectedOptions: {
    name: string
    value: string
  }[]
}

export interface DataSinkCollectionImage {
  altText: string
  height?: number
  width?: number
  src: string
}
