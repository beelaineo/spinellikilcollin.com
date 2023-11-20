export type VariantPriceRange = {
  minVariantPrice?: number
  maxVariantPrice?: number
}

export type ShopifyDocumentCollection = {
  _id: `shopifyCollection-${string}` // Shopify product ID
  _type: 'collection'
  store: {
    id: number
    gid: `gid://shopify/Collection/${string}`
    createdAt: string
    isDeleted: boolean
    descriptionHtml: string
    imageUrl?: string
    rules?: {
      _key: string
      _type: 'object'
      column: Uppercase<string>
      condition: string
      relation: Uppercase<string>
    }[]
    disjunctive?: boolean
    slug: {
      _type: 'slug'
      current: string
    }
    sortOrder: string
    title: string
    updatedAt?: string
  }
}

export type ShopifyDocumentProductVariant = {
  _id: `shopifyProductVariant-${string}` // Shopify product ID
  _type: 'productVariant'
  store: {
    id: number
    gid: `gid://shopify/ProductVariant/${string}`
    compareAtPrice: number
    createdAt: string
    isDeleted: boolean
    option1: string
    option2: string
    option3: string
    previewImageUrl?: string
    price: number
    productGid: `gid://shopify/Product/${string}`
    productId: number
    sku: string
    status: 'active' | 'archived' | 'draft' | 'unknown'
    title: string
    updatedAt?: string

    inventory: {
      policy: string
      quantity?: number
      management: string
      isAvailable?: boolean
    }
  }
}

export type ShopifyDocumentProduct = {
  _id: `shopifyProduct-${string}` // Shopify product ID
  _type: 'product'
  shopifyId: `gid://shopify/Product/${string}`
  store: {
    id: number
    gid: `gid://shopify/Product/${string}`
    priceRange: VariantPriceRange
    productType: string
    slug: { _type: string; current: string }
    status: 'active' | 'archived' | 'draft' | 'unknown'
    tags: string[]
    title: string
    updatedAt?: string
    previewImageUrl?: string
    createdAt: string
    isDeleted: boolean
    variants?: { _key: string; _type: string; _ref: string; _weak: boolean }[]
    options: {
      _type: string
      _key: string
      name: string
      values: string[]
    }[]
    vendor: string
    descriptionHtml: string
  }
}
