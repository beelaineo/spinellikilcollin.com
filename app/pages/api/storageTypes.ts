export type VariantPriceRange = {
  minVariantPrice?: number
  maxVariantPrice?: number
}

export type ShopifyDocumentCollection = {
  _id: `shopifyCollection-${string}` // Shopify product ID
  _type: 'collection'
  handle: string
  products?: {
    _type: 'reference'
    _key: string
    _ref: string
    _weak: boolean
  }[]
  shopifyId: `gid://shopify/Collection/${string}`
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
  title: string
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
    selectedOptions: {
      name: string
      value: string
    }[]
    previewImageUrl?: string
    image?: {
      id: `gid://shopify/ProductImage/${string}`
      altText?: string
      height?: number
      width?: number
      url: string
    }
    metafields?: {
      key: string
      namespace: string
      value: string
    }[]
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

interface ShopifyDocumentProductVariantMember {
  _key: string
  _type: 'shopifyProductVariant'
  id: `gid://shopify/ProductVariant/${string}`
  shopifyVariantID: `gid://shopify/ProductVariant/${string}`
  sourceData: {
    __typename: 'ProductVariant'
    _type: 'shopifySourceProductVariant'
    availableForSale: boolean
    compareAtPriceV2: {
      amount: number
      currencyCode: string
    }
    currentlyNotInStock: boolean
    id: `gid://shopify/ProductVariant/${string}`
    image?: {
      __typename: 'ShopifyVariantImage'
      id: `gid://shopify/ProductImage/${string}`
      altText?: string
      height?: number
      width?: number
      url: string
    }
    inventory: {
      policy: string
      quantity?: number
      management: string
      isAvailable?: boolean
    }
    isDeleted: boolean
    metafields?: {
      __typename: 'Metafield'
      _key: string
      id: string
      key: string
      namespace: string
      value: string
    }[]
    priceV2: {
      amount: number
      currencyCode: string
    }
    productGid: `gid://shopify/Product/${string}`
    productId: number
    requiresShipping: boolean
    selectedOptions: {
      _key: string
      _type: 'shopifySourceSelectedOption'
      name: string
      value: string
    }[]
    sku: string
    status: 'active' | 'archived' | 'draft' | 'unknown'
    title: string
    updatedAt?: string
  }
  title: string
}

interface ShopifyProductOptionValue {
  _key: string
  _type: 'productOptionValue'
  value: string
}

export type ShopifyDocumentProduct = {
  _id: `shopifyProduct-${string}` // Shopify product ID
  _type: 'product'
  shopifyId: `gid://shopify/Product/${string}`
  title: string
  handle: string
  collections?: {
    _type: 'reference'
    _key: string
    _ref: string
    _weak: boolean
  }[]
  options?: {
    _type: string
    _key: string
    name: string
    values: ShopifyProductOptionValue[]
  }[]
  store: {
    id: number
    gid: `gid://shopify/Product/${string}`
    priceRange: VariantPriceRange
    productType: string
    slug: { _type: string; current: string }
    status: 'active' | 'archived' | 'draft' | 'unknown'
    availableForSale: boolean
    tags: string[]
    title: string
    updatedAt?: string
    previewImageUrl?: string
    createdAt: string
    publishedAt: string
    isDeleted: boolean
    images?: {
      _key: string
      id: `gid://shopify/ProductImage/${string}`
      altText?: string
      height?: number
      width?: number
      src: string
    }[]
    metafields?: {
      key: string
      namespace: string
      value: string
    }[]
    variants?: ShopifyDocumentProductVariantMember[]
    options?: {
      _type: string
      _key: string
      name: string
      values: string[]
    }[]
    totalInventory: number
    tracksInventory: boolean
    vendor: string
    descriptionHtml: string
    description: string
  }
}
