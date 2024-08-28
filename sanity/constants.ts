// Currency code (ISO 4217) to use when displaying prices in the studio

// https://en.wikipedia.org/wiki/ISO_4217
export const DEFAULT_CURRENCY_CODE = 'USD'

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
export const LOCKED_DOCUMENT_TYPES = [
  'settings',
  'home',
  'homepage',
  'media.tag',
  'emailSignatureSettings',
  'siteSettings',
  'productInfoSettings',
  'productListingSettings',
]

// Document types which:
// - cannot be created in the 'new document' menu
// - cannot be duplicated, unpublished or deleted
// - are from the Sanity Connect Shopify app - and can be linked to on Shopify
export const SHOPIFY_DOCUMENT_TYPES = ['product', 'productVariant', 'collection']

// References to include in 'internal' links
export const PAGE_REFERENCES = [
  {type: 'product'},
  {type: 'collection'},
  {type: 'journalPage'},
  {type: 'journalEntry'},
  {type: 'teamPage'},
  {type: 'magazine'},
  {type: 'contact'},
  {type: 'faq'},
  {type: 'appointments'},
  {type: 'customize'},
  {type: 'about'},
  {type: 'page'},
  {type: 'paymentPlans'},
  {type: 'customerCare'},
  {type: 'homepage'},
]

// API version to use when using the Sanity client within the studio
// https://www.sanity.io/help/studio-client-specify-api-version
export const SANITY_API_VERSION = '2022-10-25'

// Your Shopify store ID.
// This is your unique store (e.g. 'my-store-name' in the complete URL of 'https://admin.shopify.com/store/my-store-name/').
// Set this to enable helper links in document status banners and shortcut links on products and collections.
export const SHOPIFY_STORE_ID = ''
