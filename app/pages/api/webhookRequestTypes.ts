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

export type RequestBody = ShopifyGraphQLProduct | ShopifyGraphQLCollection

export type RequestAction =
  | 'productCreate'
  | 'productUpdate'
  | 'productDelete'
  | 'collectionCreate'
  | 'collectionUpdate'
  | 'collectionDelete'

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

export interface ShopifyGraphQLProduct {
  admin_graphql_api_id: `gid://shopify/Product/${string}`
  body_html: string
  created_at: string
  handle: string
  id: number
  product_type: string
  published_at: string
  template_suffix: string
  title: string
  updated_at: string
  vendor: string
  status: 'active' | 'archived' | 'draft' | 'unknown'
  published_scope: string
  tags: string
  variants: ShopifyGraphQLProductVariant[]
  options: ShopifyGraphQLProductOption[]
  images: ShopifyGraphQLProductImage[] | null
  image: ShopifyGraphQLProductImage | null
  media: ShopifyGraphQLProductMedia[] | null
  // id: `gid://shopify/Product/${string}`
  // description: string
  // descriptionHtml: string
  // featuredImage?: DataSinkProductImage
  // priceRange: DataSinkProductPriceRange
  // tags: string[]
  // totalInventory: number
  // tracksInventory: boolean
}

export interface ShopifyGraphQLProductImage {
  id: number
  product_id: number
  position: number
  created_at: string
  updated_at: string
  alt: string | null
  width: number
  height: number
  src: string
  variant_ids: number[]
  admin_graphql_api_id: `gid://shopify/ProductImage/${string}`
}

export interface ShopifyGraphQLProductMedia {
  id: number
  product_id: number
  position: number
  created_at: string
  updated_at: string
  alt: string | null
  status: string
  preview_image: ShopifyGraphQLProductImage
  variant_ids: number[]
  admin_graphql_api_id: `gid://shopify/ProductMedia/${string}`
}

export interface ShopifyGraphQLProductOption {
  id: number
  product_id: number
  name: string
  position: number
  values: string[]
}

export interface ShopifyGraphQLProductVariant {
  admin_graphql_api_id: `gid://shopify/ProductVariant/${string}`
  barcode: string
  compare_at_price: string
  created_at: string
  fulfillment_service: string
  id: number
  inventory_management: string
  inventory_policy: string
  inventory_quantity: number
  old_inventory_quantity: number
  option1: string
  option2: string
  option3: string
  position: number
  price: string
  product_id: number
  requires_shipping: boolean
  sku: string
  taxable: boolean
  title: string
  updated_at: string
  weight: number
  weight_unit: string
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

export interface ShopifyGraphQLCollectionRule {
  column: string
  condition: string
  relation: string
}

export interface ShopifyGraphQLCollectionImage {
  created_at: string
  alt: string | null
  width: number
  height: number
  src: string
}

export interface ShopifyGraphQLCollection {
  id: number
  handle: string
  title: string
  updated_at: string
  body_html: string
  published_at: string
  sort_order:
    | 'alpha-asc'
    | 'alpha-desc'
    | 'best-selling'
    | 'created'
    | 'created-desc'
    | 'manual'
    | 'price-asc'
    | 'price-desc'
  template_suffix: string
  disjunctive: boolean
  rules?: ShopifyGraphQLCollectionRule[]
  published_scope: string
  admin_graphql_api_id: `gid://shopify/Collection/${string}`
  image?: ShopifyGraphQLCollectionImage
}
