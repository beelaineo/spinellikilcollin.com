export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /**
   * Represents an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)-encoded date and time string.
   * For example, 3:50 pm on September 7, 2019 in the time zone of UTC (Coordinated Universal Time) is
   * represented as `"2019-09-07T15:50:00Z`".
   *
   */
  DateTime: Date
  /**
   * A signed decimal number, which supports arbitrary precision and is serialized as a string.
   *
   * Example values: `"29.99"`, `"29.999"`.
   *
   */
  Decimal: any
  /**
   * A string containing HTML code. Refer to the [HTML spec](https://html.spec.whatwg.org/#elements-3) for a
   * complete list of HTML elements.
   *
   * Example value: `"<p>Grey cotton knit sweater.</p>"`
   *
   */
  HTML: any
  /**
   * A [JSON](https://www.json.org/json-en.html) object.
   *
   * Example value:
   * `{
   *   "product": {
   *     "id": "gid://shopify/Product/1346443542550",
   *     "title": "White T-shirt",
   *     "options": [{
   *       "name": "Size",
   *       "values": ["M", "L"]
   *     }]
   *   }
   * }`
   *
   */
  JSON: { [key: string]: any }
  /** A monetary value string without a currency symbol or code. Example value: `"100.57"`. */
  Money: any
  /**
   * Represents an [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986) and
   * [RFC 3987](https://datatracker.ietf.org/doc/html/rfc3987)-compliant URI string.
   *
   * For example, `"https://johns-apparel.myshopify.com"` is a valid URL. It includes a scheme (`https`) and a host
   * (`johns-apparel.myshopify.com`).
   *
   */
  URL: any
}

/**
 * A version of the API, as defined by [Shopify API versioning](https://shopify.dev/api/usage/versioning).
 * Versions are commonly referred to by their handle (for example, `2021-10`).
 */
export interface ShopifyStorefrontApiVersion {
  __typename: 'ApiVersion'
  /** The human-readable name of the version. */
  displayName: Scalars['String']
  /** The unique identifier of an ApiVersion. All supported API versions have a date-based (YYYY-MM) or `unstable` handle. */
  handle: Scalars['String']
  /** Whether the version is actively supported by Shopify. Supported API versions are guaranteed to be stable. Unsupported API versions include unstable, release candidate, and end-of-life versions that are marked as unsupported. For more information, refer to [Versioning](https://shopify.dev/api/usage/versioning). */
  supported: Scalars['Boolean']
}

/** Details about the gift card used on the checkout. */
export interface ShopifyStorefrontAppliedGiftCard
  extends ShopifyStorefrontNode {
  __typename: 'AppliedGiftCard'
  /**
   * The amount that was taken from the gift card by applying it.
   * @deprecated Use `amountUsedV2` instead.
   */
  amountUsed: Scalars['Money']
  /** The amount that was taken from the gift card by applying it. */
  amountUsedV2: ShopifyStorefrontMoneyV2
  /**
   * The amount left on the gift card.
   * @deprecated Use `balanceV2` instead.
   */
  balance: Scalars['Money']
  /** The amount left on the gift card. */
  balanceV2: ShopifyStorefrontMoneyV2
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The last characters of the gift card. */
  lastCharacters: Scalars['String']
  /** The amount that was applied to the checkout in its currency. */
  presentmentAmountUsed: ShopifyStorefrontMoneyV2
}

/** An article in an online store blog. */
export interface ShopifyStorefrontArticle
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode,
    ShopifyStorefrontOnlineStorePublishable {
  __typename: 'Article'
  /**
   * The article's author.
   * @deprecated Use `authorV2` instead.
   */
  author: ShopifyStorefrontArticleAuthor
  /** The article's author. */
  authorV2?: Maybe<ShopifyStorefrontArticleAuthor>
  /** The blog that the article belongs to. */
  blog: ShopifyStorefrontBlog
  /** List of comments posted on the article. */
  comments: ShopifyStorefrontCommentConnection
  /** Stripped content of the article, single line with HTML tags removed. */
  content: Scalars['String']
  /** The content of the article, complete with HTML formatting. */
  contentHtml: Scalars['HTML']
  /** Stripped excerpt of the article, single line with HTML tags removed. */
  excerpt?: Maybe<Scalars['String']>
  /** The excerpt of the article, complete with HTML formatting. */
  excerptHtml?: Maybe<Scalars['HTML']>
  /** A human-friendly unique string for the Article automatically generated from its title. */
  handle: Scalars['String']
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The image associated with the article. */
  image?: Maybe<ShopifyStorefrontImage>
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /**
   * A paginated list of metafields associated with the resource.
   * @deprecated As of 2022-07, the paginated `metafields` field has been repurposed to require a list of metafield identifiers.
   *
   */
  metafields: ShopifyStorefrontMetafieldConnection
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']>
  /** The date and time when the article was published. */
  publishedAt: Scalars['DateTime']
  /** The article’s SEO information. */
  seo?: Maybe<ShopifyStorefrontSeo>
  /** A categorization that a article can be tagged with. */
  tags: Array<Scalars['String']>
  /** The article’s name. */
  title: Scalars['String']
  /**
   * The url pointing to the article accessible from the web.
   * @deprecated Use `onlineStoreUrl` instead.
   */
  url: Scalars['URL']
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleCommentsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleContentArgs = {
  truncateAt?: Maybe<Scalars['Int']>
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleExcerptArgs = {
  truncateAt?: Maybe<Scalars['Int']>
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleImageArgs = {
  maxWidth?: Maybe<Scalars['Int']>
  maxHeight?: Maybe<Scalars['Int']>
  crop?: Maybe<ShopifyStorefrontCropRegion>
  scale?: Maybe<Scalars['Int']>
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleMetafieldArgs = {
  namespace: Scalars['String']
  key: Scalars['String']
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** The author of an article. */
export interface ShopifyStorefrontArticleAuthor {
  __typename: 'ArticleAuthor'
  /** The author's bio. */
  bio?: Maybe<Scalars['String']>
  /** The author’s email. */
  email: Scalars['String']
  /** The author's first name. */
  firstName: Scalars['String']
  /** The author's last name. */
  lastName: Scalars['String']
  /** The author's full name. */
  name: Scalars['String']
}

/** An auto-generated type for paginating through multiple Articles. */
export interface ShopifyStorefrontArticleConnection {
  __typename: 'ArticleConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontArticleEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one Article and a cursor during pagination. */
export interface ShopifyStorefrontArticleEdge {
  __typename: 'ArticleEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of ArticleEdge. */
  node: ShopifyStorefrontArticle
}

/** The set of valid sort keys for the Article query. */
export enum ShopifyStorefrontArticleSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `blog_title` value. */
  BlogTitle = 'BLOG_TITLE',
  /** Sort by the `author` value. */
  Author = 'AUTHOR',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by the `published_at` value. */
  PublishedAt = 'PUBLISHED_AT',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  Relevance = 'RELEVANCE',
}

/** Represents a generic custom attribute. */
export interface ShopifyStorefrontAttribute {
  __typename: 'Attribute'
  /** Key or name of the attribute. */
  key: Scalars['String']
  /** Value of the attribute. */
  value?: Maybe<Scalars['String']>
}

/** The input fields for an attribute. */
export type ShopifyStorefrontAttributeInput = {
  /** Key or name of the attribute. */
  key: Scalars['String']
  /** Value of the attribute. */
  value: Scalars['String']
}

/** Automatic discount applications capture the intentions of a discount that was automatically applied. */
export interface ShopifyStorefrontAutomaticDiscountApplication
  extends ShopifyStorefrontDiscountApplication {
  __typename: 'AutomaticDiscountApplication'
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyStorefrontDiscountApplicationAllocationMethod
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyStorefrontDiscountApplicationTargetSelection
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyStorefrontDiscountApplicationTargetType
  /** The title of the application. */
  title: Scalars['String']
  /** The value of the discount application. */
  value: ShopifyStorefrontPricingValue
}

/** A collection of available shipping rates for a checkout. */
export interface ShopifyStorefrontAvailableShippingRates {
  __typename: 'AvailableShippingRates'
  /**
   * Whether or not the shipping rates are ready.
   * The `shippingRates` field is `null` when this value is `false`.
   * This field should be polled until its value becomes `true`.
   */
  ready: Scalars['Boolean']
  /** The fetched shipping rates. `null` until the `ready` field is `true`. */
  shippingRates?: Maybe<Array<ShopifyStorefrontShippingRate>>
}

/** An online store blog. */
export interface ShopifyStorefrontBlog
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode,
    ShopifyStorefrontOnlineStorePublishable {
  __typename: 'Blog'
  /** Find an article by its handle. */
  articleByHandle?: Maybe<ShopifyStorefrontArticle>
  /** List of the blog's articles. */
  articles: ShopifyStorefrontArticleConnection
  /** The authors who have contributed to the blog. */
  authors: Array<ShopifyStorefrontArticleAuthor>
  /** A human-friendly unique string for the Blog automatically generated from its title. */
  handle: Scalars['String']
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /**
   * A paginated list of metafields associated with the resource.
   * @deprecated As of 2022-07, the paginated `metafields` field has been repurposed to require a list of metafield identifiers.
   *
   */
  metafields: ShopifyStorefrontMetafieldConnection
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']>
  /** The blog's SEO information. */
  seo?: Maybe<ShopifyStorefrontSeo>
  /** The blogs’s title. */
  title: Scalars['String']
  /**
   * The url pointing to the blog accessible from the web.
   * @deprecated Use `onlineStoreUrl` instead.
   */
  url: Scalars['URL']
}

/** An online store blog. */
export type ShopifyStorefrontBlogArticleByHandleArgs = {
  handle: Scalars['String']
}

/** An online store blog. */
export type ShopifyStorefrontBlogArticlesArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontArticleSortKeys>
  query?: Maybe<Scalars['String']>
}

/** An online store blog. */
export type ShopifyStorefrontBlogMetafieldArgs = {
  namespace: Scalars['String']
  key: Scalars['String']
}

/** An online store blog. */
export type ShopifyStorefrontBlogMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** An auto-generated type for paginating through multiple Blogs. */
export interface ShopifyStorefrontBlogConnection {
  __typename: 'BlogConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontBlogEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one Blog and a cursor during pagination. */
export interface ShopifyStorefrontBlogEdge {
  __typename: 'BlogEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of BlogEdge. */
  node: ShopifyStorefrontBlog
}

/** The set of valid sort keys for the Blog query. */
export enum ShopifyStorefrontBlogSortKeys {
  /** Sort by the `handle` value. */
  Handle = 'HANDLE',
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  Relevance = 'RELEVANCE',
}

/** Card brand, such as Visa or Mastercard, which can be used for payments. */
export enum ShopifyStorefrontCardBrand {
  /** Visa. */
  Visa = 'VISA',
  /** Mastercard. */
  Mastercard = 'MASTERCARD',
  /** Discover. */
  Discover = 'DISCOVER',
  /** American Express. */
  AmericanExpress = 'AMERICAN_EXPRESS',
  /** Diners Club. */
  DinersClub = 'DINERS_CLUB',
  /** JCB. */
  Jcb = 'JCB',
}

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 */
export interface ShopifyStorefrontCart extends ShopifyStorefrontNode {
  __typename: 'Cart'
  /** The attributes associated with the cart. Attributes are represented as key-value pairs. */
  attributes: Array<ShopifyStorefrontAttribute>
  /** Information about the buyer that is interacting with the cart. */
  buyerIdentity: ShopifyStorefrontCartBuyerIdentity
  /** The URL of the checkout for the cart. */
  checkoutUrl: Scalars['URL']
  /** The date and time when the cart was created. */
  createdAt: Scalars['DateTime']
  /** The case-insensitive discount codes that the customer added at checkout. */
  discountCodes: Array<ShopifyStorefrontCartDiscountCode>
  /**
   * The estimated costs that the buyer will pay at checkout.
   * The estimated costs are subject to change and changes will be reflected at checkout.
   * The `estimatedCost` field uses the `buyerIdentity` field to determine
   * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
   * @deprecated Use `cost` instead.
   */
  estimatedCost: ShopifyStorefrontCartEstimatedCost
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** A list of lines containing information about the items the customer intends to purchase. */
  lines: ShopifyStorefrontCartLineConnection
  /** A note that is associated with the cart. For example, the note can be a personalized message to the buyer. */
  note?: Maybe<Scalars['String']>
  /** The date and time when the cart was updated. */
  updatedAt: Scalars['DateTime']
}

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 */
export type ShopifyStorefrontCartLinesArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** Return type for `cartAttributesUpdate` mutation. */
export interface ShopifyStorefrontCartAttributesUpdatePayload {
  __typename: 'CartAttributesUpdatePayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** The discounts automatically applied to the cart line based on prerequisites that have been met. */
export interface ShopifyStorefrontCartAutomaticDiscountAllocation
  extends ShopifyStorefrontCartDiscountAllocation {
  __typename: 'CartAutomaticDiscountAllocation'
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: ShopifyStorefrontMoneyV2
  /** The title of the allocated discount. */
  title: Scalars['String']
}

/** Represents information about the buyer that is interacting with the cart. */
export interface ShopifyStorefrontCartBuyerIdentity {
  __typename: 'CartBuyerIdentity'
  /** The country where the buyer is located. */
  countryCode?: Maybe<ShopifyStorefrontCountryCode>
  /** The customer account associated with the cart. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** The email address of the buyer that is interacting with the cart. */
  email?: Maybe<Scalars['String']>
  /** The phone number of the buyer that is interacting with the cart. */
  phone?: Maybe<Scalars['String']>
}

/**
 * Specifies the input fields to update the buyer information associated with a cart.
 * Buyer identity is used to determine
 * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * and should match the customer's shipping address.
 */
export type ShopifyStorefrontCartBuyerIdentityInput = {
  /** The email address of the buyer that is interacting with the cart. */
  email?: Maybe<Scalars['String']>
  /** The phone number of the buyer that is interacting with the cart. */
  phone?: Maybe<Scalars['String']>
  /** The country where the buyer is located. */
  countryCode?: Maybe<ShopifyStorefrontCountryCode>
  /** The access token used to identify the customer associated with the cart. */
  customerAccessToken?: Maybe<Scalars['String']>
}

/** Return type for `cartBuyerIdentityUpdate` mutation. */
export interface ShopifyStorefrontCartBuyerIdentityUpdatePayload {
  __typename: 'CartBuyerIdentityUpdatePayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** The discount that has been applied to the cart line using a discount code. */
export interface ShopifyStorefrontCartCodeDiscountAllocation
  extends ShopifyStorefrontCartDiscountAllocation {
  __typename: 'CartCodeDiscountAllocation'
  /** The code used to apply the discount. */
  code: Scalars['String']
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: ShopifyStorefrontMoneyV2
}

/** Return type for `cartCreate` mutation. */
export interface ShopifyStorefrontCartCreatePayload {
  __typename: 'CartCreatePayload'
  /** The new cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** The discounts that have been applied to the cart line. */
export type ShopifyStorefrontCartDiscountAllocation = {
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: ShopifyStorefrontMoneyV2
}

/** The discount codes applied to the cart. */
export interface ShopifyStorefrontCartDiscountCode {
  __typename: 'CartDiscountCode'
  /** Whether the discount code is applicable to the cart's current contents. */
  applicable: Scalars['Boolean']
  /** The code for the discount. */
  code: Scalars['String']
}

/** Return type for `cartDiscountCodesUpdate` mutation. */
export interface ShopifyStorefrontCartDiscountCodesUpdatePayload {
  __typename: 'CartDiscountCodesUpdatePayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** Possible error codes that can be returned by `CartUserError`. */
export enum ShopifyStorefrontCartErrorCode {
  /** The input value is invalid. */
  Invalid = 'INVALID',
  /** The input value should be less than the maximum value allowed. */
  LessThan = 'LESS_THAN',
  /** Merchandise line was not found in cart. */
  InvalidMerchandiseLine = 'INVALID_MERCHANDISE_LINE',
  /** Missing discount code. */
  MissingDiscountCode = 'MISSING_DISCOUNT_CODE',
  /** Missing note. */
  MissingNote = 'MISSING_NOTE',
}

/**
 * The estimated costs that the buyer will pay at checkout.
 * The estimated cost uses
 * [`CartBuyerIdentity`](https://shopify.dev/api/storefront/reference/cart/cartbuyeridentity)
 * to determine
 * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
 */
export interface ShopifyStorefrontCartEstimatedCost {
  __typename: 'CartEstimatedCost'
  /** The estimated amount, before taxes and discounts, for the customer to pay. */
  subtotalAmount: ShopifyStorefrontMoneyV2
  /** The estimated total amount for the customer to pay. */
  totalAmount: ShopifyStorefrontMoneyV2
  /** The estimated duty amount for the customer to pay at checkout. */
  totalDutyAmount?: Maybe<ShopifyStorefrontMoneyV2>
  /** The estimated tax amount for the customer to pay at checkout. */
  totalTaxAmount?: Maybe<ShopifyStorefrontMoneyV2>
}

/** The input fields to create a cart. */
export type ShopifyStorefrontCartInput = {
  /** An array of key-value pairs that contains additional information about the cart. */
  attributes?: Maybe<Array<ShopifyStorefrontAttributeInput>>
  /** A list of merchandise lines to add to the cart. */
  lines?: Maybe<Array<ShopifyStorefrontCartLineInput>>
  /** The case-insensitive discount codes that the customer added at checkout. */
  discountCodes?: Maybe<Array<Scalars['String']>>
  /** A note that is associated with the cart. For example, the note can be a personalized message to the buyer. */
  note?: Maybe<Scalars['String']>
  /**
   * The customer associated with the cart. Used to determine [international pricing]
   * (https://shopify.dev/custom-storefronts/internationalization/international-pricing).
   * Buyer identity should match the customer's shipping address.
   */
  buyerIdentity?: Maybe<ShopifyStorefrontCartBuyerIdentityInput>
}

/** Represents information about the merchandise in the cart. */
export interface ShopifyStorefrontCartLine extends ShopifyStorefrontNode {
  __typename: 'CartLine'
  /** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
  attributes: Array<ShopifyStorefrontAttribute>
  /** The discounts that have been applied to the cart line. */
  discountAllocations: Array<ShopifyStorefrontCartDiscountAllocation>
  /**
   * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
   * @deprecated Use `cost` instead.
   */
  estimatedCost: ShopifyStorefrontCartLineEstimatedCost
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The merchandise that the buyer intends to purchase. */
  merchandise: ShopifyStorefrontMerchandise
  /** The quantity of the merchandise that the customer intends to purchase. */
  quantity: Scalars['Int']
  /** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
  sellingPlanAllocation?: Maybe<ShopifyStorefrontSellingPlanAllocation>
}

/** An auto-generated type for paginating through multiple CartLines. */
export interface ShopifyStorefrontCartLineConnection {
  __typename: 'CartLineConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontCartLineEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one CartLine and a cursor during pagination. */
export interface ShopifyStorefrontCartLineEdge {
  __typename: 'CartLineEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of CartLineEdge. */
  node: ShopifyStorefrontCartLine
}

/** The estimated cost of the merchandise line that the buyer will pay at checkout. */
export interface ShopifyStorefrontCartLineEstimatedCost {
  __typename: 'CartLineEstimatedCost'
  /** The estimated cost of the merchandise line before discounts. */
  subtotalAmount: ShopifyStorefrontMoneyV2
  /** The estimated total cost of the merchandise line. */
  totalAmount: ShopifyStorefrontMoneyV2
}

/** The input fields to create a merchandise line on a cart. */
export type ShopifyStorefrontCartLineInput = {
  /** An array of key-value pairs that contains additional information about the merchandise line. */
  attributes?: Maybe<Array<ShopifyStorefrontAttributeInput>>
  /** The quantity of the merchandise. */
  quantity?: Maybe<Scalars['Int']>
  /** The ID of the merchandise that the buyer intends to purchase. */
  merchandiseId: Scalars['ID']
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: Maybe<Scalars['ID']>
}

/** The input fields to update a line item on a cart. */
export type ShopifyStorefrontCartLineUpdateInput = {
  /** The ID of the merchandise line. */
  id: Scalars['ID']
  /** The quantity of the line item. */
  quantity?: Maybe<Scalars['Int']>
  /** The ID of the merchandise for the line item. */
  merchandiseId?: Maybe<Scalars['ID']>
  /** An array of key-value pairs that contains additional information about the merchandise line. */
  attributes?: Maybe<Array<ShopifyStorefrontAttributeInput>>
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: Maybe<Scalars['ID']>
}

/** Return type for `cartLinesAdd` mutation. */
export interface ShopifyStorefrontCartLinesAddPayload {
  __typename: 'CartLinesAddPayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** Return type for `cartLinesRemove` mutation. */
export interface ShopifyStorefrontCartLinesRemovePayload {
  __typename: 'CartLinesRemovePayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** Return type for `cartLinesUpdate` mutation. */
export interface ShopifyStorefrontCartLinesUpdatePayload {
  __typename: 'CartLinesUpdatePayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** Return type for `cartNoteUpdate` mutation. */
export interface ShopifyStorefrontCartNoteUpdatePayload {
  __typename: 'CartNoteUpdatePayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** Represents an error that happens during execution of a cart mutation. */
export interface ShopifyStorefrontCartUserError
  extends ShopifyStorefrontDisplayableError {
  __typename: 'CartUserError'
  /** The error code. */
  code?: Maybe<ShopifyStorefrontCartErrorCode>
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']>>
  /** The error message. */
  message: Scalars['String']
}

/** A container for all the information required to checkout items and pay. */
export interface ShopifyStorefrontCheckout extends ShopifyStorefrontNode {
  __typename: 'Checkout'
  /** The gift cards used on the checkout. */
  appliedGiftCards: Array<ShopifyStorefrontAppliedGiftCard>
  /**
   * The available shipping rates for this Checkout.
   * Should only be used when checkout `requiresShipping` is `true` and
   * the shipping address is valid.
   */
  availableShippingRates?: Maybe<ShopifyStorefrontAvailableShippingRates>
  /** The identity of the customer associated with the checkout. */
  buyerIdentity: ShopifyStorefrontCheckoutBuyerIdentity
  /** The date and time when the checkout was completed. */
  completedAt?: Maybe<Scalars['DateTime']>
  /** The date and time when the checkout was created. */
  createdAt: Scalars['DateTime']
  /** The currency code for the checkout. */
  currencyCode: ShopifyStorefrontCurrencyCode
  /** A list of extra information that is added to the checkout. */
  customAttributes: Array<ShopifyStorefrontAttribute>
  /**
   * The customer associated with the checkout.
   * @deprecated This field will always return null. If you have an authentication token for the customer, you can use the `customer` field on the query root to retrieve it.
   */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** Discounts that have been applied on the checkout. */
  discountApplications: ShopifyStorefrontDiscountApplicationConnection
  /** The email attached to this checkout. */
  email?: Maybe<Scalars['String']>
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** A list of line item objects, each one containing information about an item in the checkout. */
  lineItems: ShopifyStorefrontCheckoutLineItemConnection
  /** The sum of all the prices of all the items in the checkout. Duties, taxes, shipping and discounts excluded. */
  lineItemsSubtotalPrice: ShopifyStorefrontMoneyV2
  /** The note associated with the checkout. */
  note?: Maybe<Scalars['String']>
  /** The resulting order from a paid checkout. */
  order?: Maybe<ShopifyStorefrontOrder>
  /** The Order Status Page for this Checkout, null when checkout is not completed. */
  orderStatusUrl?: Maybe<Scalars['URL']>
  /**
   * The amount left to be paid. This is equal to the cost of the line items, taxes and shipping minus discounts and gift cards.
   * @deprecated Use `paymentDueV2` instead.
   */
  paymentDue: Scalars['Money']
  /** The amount left to be paid. This is equal to the cost of the line items, duties, taxes, and shipping, minus discounts and gift cards. */
  paymentDueV2: ShopifyStorefrontMoneyV2
  /**
   * Whether or not the Checkout is ready and can be completed. Checkouts may
   * have asynchronous operations that can take time to finish. If you want
   * to complete a checkout or ensure all the fields are populated and up to
   * date, polling is required until the value is true.
   */
  ready: Scalars['Boolean']
  /** States whether or not the fulfillment requires shipping. */
  requiresShipping: Scalars['Boolean']
  /** The shipping address to where the line items will be shipped. */
  shippingAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /** The discounts that have been allocated onto the shipping line by discount applications. */
  shippingDiscountAllocations: Array<ShopifyStorefrontDiscountAllocation>
  /** Once a shipping rate is selected by the customer it is transitioned to a `shipping_line` object. */
  shippingLine?: Maybe<ShopifyStorefrontShippingRate>
  /**
   * Price of the checkout before shipping and taxes.
   * @deprecated Use `subtotalPriceV2` instead.
   */
  subtotalPrice: Scalars['Money']
  /** The price at checkout before duties, shipping, and taxes. */
  subtotalPriceV2: ShopifyStorefrontMoneyV2
  /** Whether the checkout is tax exempt. */
  taxExempt: Scalars['Boolean']
  /** Whether taxes are included in the line item and shipping line prices. */
  taxesIncluded: Scalars['Boolean']
  /** The sum of all the duties applied to the line items in the checkout. */
  totalDuties?: Maybe<ShopifyStorefrontMoneyV2>
  /**
   * The sum of all the prices of all the items in the checkout, taxes and discounts included.
   * @deprecated Use `totalPriceV2` instead.
   */
  totalPrice: Scalars['Money']
  /** The sum of all the prices of all the items in the checkout, including duties, taxes, and discounts. */
  totalPriceV2: ShopifyStorefrontMoneyV2
  /**
   * The sum of all the taxes applied to the line items and shipping lines in the checkout.
   * @deprecated Use `totalTaxV2` instead.
   */
  totalTax: Scalars['Money']
  /** The sum of all the taxes applied to the line items and shipping lines in the checkout. */
  totalTaxV2: ShopifyStorefrontMoneyV2
  /** The date and time when the checkout was last updated. */
  updatedAt: Scalars['DateTime']
  /** The url pointing to the checkout accessible from the web. */
  webUrl: Scalars['URL']
}

/** A container for all the information required to checkout items and pay. */
export type ShopifyStorefrontCheckoutDiscountApplicationsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** A container for all the information required to checkout items and pay. */
export type ShopifyStorefrontCheckoutLineItemsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** The input fields required to update a checkout's attributes. */
export type ShopifyStorefrontCheckoutAttributesUpdateInput = {
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: Maybe<Scalars['String']>
  /** A list of extra information that is added to the checkout. */
  customAttributes?: Maybe<Array<ShopifyStorefrontAttributeInput>>
  /**
   * Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
   * The required attributes are city, province, and country.
   * Full validation of the addresses is still done at completion time. Defaults to `false` with
   * each operation.
   */
  allowPartialAddresses?: Maybe<Scalars['Boolean']>
}

/** Return type for `checkoutAttributesUpdate` mutation. */
export interface ShopifyStorefrontCheckoutAttributesUpdatePayload {
  __typename: 'CheckoutAttributesUpdatePayload'
  /** The updated checkout object. */
  checkout: ShopifyStorefrontCheckout
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** The input fields required to update a checkout's attributes. */
export type ShopifyStorefrontCheckoutAttributesUpdateV2Input = {
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: Maybe<Scalars['String']>
  /** A list of extra information that is added to the checkout. */
  customAttributes?: Maybe<Array<ShopifyStorefrontAttributeInput>>
  /**
   * Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
   * The required attributes are city, province, and country.
   * Full validation of the addresses is still done at completion time. Defaults to `false` with
   * each operation.
   */
  allowPartialAddresses?: Maybe<Scalars['Boolean']>
}

/** Return type for `checkoutAttributesUpdateV2` mutation. */
export interface ShopifyStorefrontCheckoutAttributesUpdateV2Payload {
  __typename: 'CheckoutAttributesUpdateV2Payload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** The identity of the customer associated with the checkout. */
export interface ShopifyStorefrontCheckoutBuyerIdentity {
  __typename: 'CheckoutBuyerIdentity'
  /** The country code for the checkout. For example, `CA`. */
  countryCode?: Maybe<ShopifyStorefrontCountryCode>
}

/** The input fields for the identity of the customer associated with the checkout. */
export type ShopifyStorefrontCheckoutBuyerIdentityInput = {
  /**
   * The country code of one of the shop's
   * [enabled countries](https://help.shopify.com/en/manual/payments/shopify-payments/multi-currency/setup).
   * For example, `CA`. Including this field creates a checkout in the specified country's currency.
   */
  countryCode: ShopifyStorefrontCountryCode
}

/** Return type for `checkoutCompleteFree` mutation. */
export interface ShopifyStorefrontCheckoutCompleteFreePayload {
  __typename: 'CheckoutCompleteFreePayload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutCompleteWithCreditCard` mutation. */
export interface ShopifyStorefrontCheckoutCompleteWithCreditCardPayload {
  __typename: 'CheckoutCompleteWithCreditCardPayload'
  /** The checkout on which the payment was applied. */
  checkout: ShopifyStorefrontCheckout
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /** A representation of the attempted payment. */
  payment?: Maybe<ShopifyStorefrontPayment>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutCompleteWithCreditCardV2` mutation. */
export interface ShopifyStorefrontCheckoutCompleteWithCreditCardV2Payload {
  __typename: 'CheckoutCompleteWithCreditCardV2Payload'
  /** The checkout on which the payment was applied. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /** A representation of the attempted payment. */
  payment?: Maybe<ShopifyStorefrontPayment>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutCompleteWithTokenizedPayment` mutation. */
export interface ShopifyStorefrontCheckoutCompleteWithTokenizedPaymentPayload {
  __typename: 'CheckoutCompleteWithTokenizedPaymentPayload'
  /** The checkout on which the payment was applied. */
  checkout: ShopifyStorefrontCheckout
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /** A representation of the attempted payment. */
  payment?: Maybe<ShopifyStorefrontPayment>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutCompleteWithTokenizedPaymentV2` mutation. */
export interface ShopifyStorefrontCheckoutCompleteWithTokenizedPaymentV2Payload {
  __typename: 'CheckoutCompleteWithTokenizedPaymentV2Payload'
  /** The checkout on which the payment was applied. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /** A representation of the attempted payment. */
  payment?: Maybe<ShopifyStorefrontPayment>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutCompleteWithTokenizedPaymentV3` mutation. */
export interface ShopifyStorefrontCheckoutCompleteWithTokenizedPaymentV3Payload {
  __typename: 'CheckoutCompleteWithTokenizedPaymentV3Payload'
  /** The checkout on which the payment was applied. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /** A representation of the attempted payment. */
  payment?: Maybe<ShopifyStorefrontPayment>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** The input fields required to create a checkout. */
export type ShopifyStorefrontCheckoutCreateInput = {
  /** The email with which the customer wants to checkout. */
  email?: Maybe<Scalars['String']>
  /** A list of line item objects, each one containing information about an item in the checkout. */
  lineItems?: Maybe<Array<ShopifyStorefrontCheckoutLineItemInput>>
  /** The shipping address to where the line items will be shipped. */
  shippingAddress?: Maybe<ShopifyStorefrontMailingAddressInput>
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: Maybe<Scalars['String']>
  /** A list of extra information that is added to the checkout. */
  customAttributes?: Maybe<Array<ShopifyStorefrontAttributeInput>>
  /**
   * Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
   * The required attributes are city, province, and country.
   * Full validation of addresses is still done at completion time. Defaults to `null`.
   */
  allowPartialAddresses?: Maybe<Scalars['Boolean']>
  /**
   * The three-letter currency code of one of the shop's enabled presentment currencies.
   * Including this field creates a checkout in the specified currency. By default, new
   * checkouts are created in the shop's primary currency.
   *  This argument is deprecated: Use the `buyerIdentity.countryCode` field instead.
   */
  presentmentCurrencyCode?: Maybe<ShopifyStorefrontCurrencyCode>
  /** The identity of the customer associated with the checkout. */
  buyerIdentity?: Maybe<ShopifyStorefrontCheckoutBuyerIdentityInput>
}

/** Return type for `checkoutCreate` mutation. */
export interface ShopifyStorefrontCheckoutCreatePayload {
  __typename: 'CheckoutCreatePayload'
  /** The new checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /** The checkout queue token. Available only to selected stores. */
  queueToken?: Maybe<Scalars['String']>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutCustomerAssociate` mutation. */
export interface ShopifyStorefrontCheckoutCustomerAssociatePayload {
  __typename: 'CheckoutCustomerAssociatePayload'
  /** The updated checkout object. */
  checkout: ShopifyStorefrontCheckout
  /** The associated customer object. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutCustomerAssociateV2` mutation. */
export interface ShopifyStorefrontCheckoutCustomerAssociateV2Payload {
  __typename: 'CheckoutCustomerAssociateV2Payload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /** The associated customer object. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutCustomerDisassociate` mutation. */
export interface ShopifyStorefrontCheckoutCustomerDisassociatePayload {
  __typename: 'CheckoutCustomerDisassociatePayload'
  /** The updated checkout object. */
  checkout: ShopifyStorefrontCheckout
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutCustomerDisassociateV2` mutation. */
export interface ShopifyStorefrontCheckoutCustomerDisassociateV2Payload {
  __typename: 'CheckoutCustomerDisassociateV2Payload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutDiscountCodeApply` mutation. */
export interface ShopifyStorefrontCheckoutDiscountCodeApplyPayload {
  __typename: 'CheckoutDiscountCodeApplyPayload'
  /** The updated checkout object. */
  checkout: ShopifyStorefrontCheckout
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutDiscountCodeApplyV2` mutation. */
export interface ShopifyStorefrontCheckoutDiscountCodeApplyV2Payload {
  __typename: 'CheckoutDiscountCodeApplyV2Payload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutDiscountCodeRemove` mutation. */
export interface ShopifyStorefrontCheckoutDiscountCodeRemovePayload {
  __typename: 'CheckoutDiscountCodeRemovePayload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutEmailUpdate` mutation. */
export interface ShopifyStorefrontCheckoutEmailUpdatePayload {
  __typename: 'CheckoutEmailUpdatePayload'
  /** The checkout object with the updated email. */
  checkout: ShopifyStorefrontCheckout
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutEmailUpdateV2` mutation. */
export interface ShopifyStorefrontCheckoutEmailUpdateV2Payload {
  __typename: 'CheckoutEmailUpdateV2Payload'
  /** The checkout object with the updated email. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Possible error codes that can be returned by `CheckoutUserError`. */
export enum ShopifyStorefrontCheckoutErrorCode {
  /** The input value is blank. */
  Blank = 'BLANK',
  /** The input value is invalid. */
  Invalid = 'INVALID',
  /** The input value is too long. */
  TooLong = 'TOO_LONG',
  /** The input value needs to be blank. */
  Present = 'PRESENT',
  /** The input value should be less than the maximum value allowed. */
  LessThan = 'LESS_THAN',
  /** The input value should be greater than or equal to the minimum value allowed. */
  GreaterThanOrEqualTo = 'GREATER_THAN_OR_EQUAL_TO',
  /** The input value should be less than or equal to the maximum value allowed. */
  LessThanOrEqualTo = 'LESS_THAN_OR_EQUAL_TO',
  /** Checkout is already completed. */
  AlreadyCompleted = 'ALREADY_COMPLETED',
  /** Checkout is locked. */
  Locked = 'LOCKED',
  /** Input value is not supported. */
  NotSupported = 'NOT_SUPPORTED',
  /** Input email contains an invalid domain name. */
  BadDomain = 'BAD_DOMAIN',
  /** Input Zip is invalid for country provided. */
  InvalidForCountry = 'INVALID_FOR_COUNTRY',
  /** Input Zip is invalid for country and province provided. */
  InvalidForCountryAndProvince = 'INVALID_FOR_COUNTRY_AND_PROVINCE',
  /** Invalid state in country. */
  InvalidStateInCountry = 'INVALID_STATE_IN_COUNTRY',
  /** Invalid province in country. */
  InvalidProvinceInCountry = 'INVALID_PROVINCE_IN_COUNTRY',
  /** Invalid region in country. */
  InvalidRegionInCountry = 'INVALID_REGION_IN_COUNTRY',
  /** Shipping rate expired. */
  ShippingRateExpired = 'SHIPPING_RATE_EXPIRED',
  /** Gift card cannot be applied to a checkout that contains a gift card. */
  GiftCardUnusable = 'GIFT_CARD_UNUSABLE',
  /** Gift card is disabled. */
  GiftCardDisabled = 'GIFT_CARD_DISABLED',
  /** Gift card code is invalid. */
  GiftCardCodeInvalid = 'GIFT_CARD_CODE_INVALID',
  /** Gift card has already been applied. */
  GiftCardAlreadyApplied = 'GIFT_CARD_ALREADY_APPLIED',
  /** Gift card currency does not match checkout currency. */
  GiftCardCurrencyMismatch = 'GIFT_CARD_CURRENCY_MISMATCH',
  /** Gift card is expired. */
  GiftCardExpired = 'GIFT_CARD_EXPIRED',
  /** Gift card has no funds left. */
  GiftCardDepleted = 'GIFT_CARD_DEPLETED',
  /** Gift card was not found. */
  GiftCardNotFound = 'GIFT_CARD_NOT_FOUND',
  /** Cart does not meet discount requirements notice. */
  CartDoesNotMeetDiscountRequirementsNotice = 'CART_DOES_NOT_MEET_DISCOUNT_REQUIREMENTS_NOTICE',
  /** Discount expired. */
  DiscountExpired = 'DISCOUNT_EXPIRED',
  /** Discount disabled. */
  DiscountDisabled = 'DISCOUNT_DISABLED',
  /** Discount limit reached. */
  DiscountLimitReached = 'DISCOUNT_LIMIT_REACHED',
  /** Higher value discount applied. */
  HigherValueDiscountApplied = 'HIGHER_VALUE_DISCOUNT_APPLIED',
  /** Maximum number of discount codes limit reached. */
  MaximumDiscountCodeLimitReached = 'MAXIMUM_DISCOUNT_CODE_LIMIT_REACHED',
  /** Discount not found. */
  DiscountNotFound = 'DISCOUNT_NOT_FOUND',
  /** Customer already used once per customer discount notice. */
  CustomerAlreadyUsedOncePerCustomerDiscountNotice = 'CUSTOMER_ALREADY_USED_ONCE_PER_CUSTOMER_DISCOUNT_NOTICE',
  /** Discount code isn't working right now. Please contact us for help. */
  DiscountCodeApplicationFailed = 'DISCOUNT_CODE_APPLICATION_FAILED',
  /** Checkout is already completed. */
  Empty = 'EMPTY',
  /** Not enough in stock. */
  NotEnoughInStock = 'NOT_ENOUGH_IN_STOCK',
  /** Missing payment input. */
  MissingPaymentInput = 'MISSING_PAYMENT_INPUT',
  /** The amount of the payment does not match the value to be paid. */
  TotalPriceMismatch = 'TOTAL_PRICE_MISMATCH',
  /** Line item was not found in checkout. */
  LineItemNotFound = 'LINE_ITEM_NOT_FOUND',
  /** Unable to apply discount. */
  UnableToApply = 'UNABLE_TO_APPLY',
  /** Discount already applied. */
  DiscountAlreadyApplied = 'DISCOUNT_ALREADY_APPLIED',
  /** Throttled during checkout. */
  ThrottledDuringCheckout = 'THROTTLED_DURING_CHECKOUT',
  /** Queue token has expired. */
  ExpiredQueueToken = 'EXPIRED_QUEUE_TOKEN',
  /** Queue token is invalid. */
  InvalidQueueToken = 'INVALID_QUEUE_TOKEN',
  /** Cannot specify country and presentment currency code. */
  InvalidCountryAndCurrency = 'INVALID_COUNTRY_AND_CURRENCY',
}

/** Return type for `checkoutGiftCardApply` mutation. */
export interface ShopifyStorefrontCheckoutGiftCardApplyPayload {
  __typename: 'CheckoutGiftCardApplyPayload'
  /** The updated checkout object. */
  checkout: ShopifyStorefrontCheckout
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutGiftCardRemove` mutation. */
export interface ShopifyStorefrontCheckoutGiftCardRemovePayload {
  __typename: 'CheckoutGiftCardRemovePayload'
  /** The updated checkout object. */
  checkout: ShopifyStorefrontCheckout
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutGiftCardRemoveV2` mutation. */
export interface ShopifyStorefrontCheckoutGiftCardRemoveV2Payload {
  __typename: 'CheckoutGiftCardRemoveV2Payload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutGiftCardsAppend` mutation. */
export interface ShopifyStorefrontCheckoutGiftCardsAppendPayload {
  __typename: 'CheckoutGiftCardsAppendPayload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** A single line item in the checkout, grouped by variant and attributes. */
export interface ShopifyStorefrontCheckoutLineItem
  extends ShopifyStorefrontNode {
  __typename: 'CheckoutLineItem'
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes: Array<ShopifyStorefrontAttribute>
  /** The discounts that have been allocated onto the checkout line item by discount applications. */
  discountAllocations: Array<ShopifyStorefrontDiscountAllocation>
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The quantity of the line item. */
  quantity: Scalars['Int']
  /** Title of the line item. Defaults to the product's title. */
  title: Scalars['String']
  /** Unit price of the line item. */
  unitPrice?: Maybe<ShopifyStorefrontMoneyV2>
  /** Product variant of the line item. */
  variant?: Maybe<ShopifyStorefrontProductVariant>
}

/** An auto-generated type for paginating through multiple CheckoutLineItems. */
export interface ShopifyStorefrontCheckoutLineItemConnection {
  __typename: 'CheckoutLineItemConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontCheckoutLineItemEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one CheckoutLineItem and a cursor during pagination. */
export interface ShopifyStorefrontCheckoutLineItemEdge {
  __typename: 'CheckoutLineItemEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of CheckoutLineItemEdge. */
  node: ShopifyStorefrontCheckoutLineItem
}

/** The input fields to create a line item on a checkout. */
export type ShopifyStorefrontCheckoutLineItemInput = {
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes?: Maybe<Array<ShopifyStorefrontAttributeInput>>
  /** The quantity of the line item. */
  quantity: Scalars['Int']
  /** The ID of the product variant for the line item. */
  variantId: Scalars['ID']
}

/** The input fields to update a line item on the checkout. */
export type ShopifyStorefrontCheckoutLineItemUpdateInput = {
  /** The ID of the line item. */
  id?: Maybe<Scalars['ID']>
  /** The variant ID of the line item. */
  variantId?: Maybe<Scalars['ID']>
  /** The quantity of the line item. */
  quantity?: Maybe<Scalars['Int']>
  /** Extra information in the form of an array of Key-Value pairs about the line item. */
  customAttributes?: Maybe<Array<ShopifyStorefrontAttributeInput>>
}

/** Return type for `checkoutLineItemsAdd` mutation. */
export interface ShopifyStorefrontCheckoutLineItemsAddPayload {
  __typename: 'CheckoutLineItemsAddPayload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutLineItemsRemove` mutation. */
export interface ShopifyStorefrontCheckoutLineItemsRemovePayload {
  __typename: 'CheckoutLineItemsRemovePayload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutLineItemsReplace` mutation. */
export interface ShopifyStorefrontCheckoutLineItemsReplacePayload {
  __typename: 'CheckoutLineItemsReplacePayload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCheckoutUserError>
}

/** Return type for `checkoutLineItemsUpdate` mutation. */
export interface ShopifyStorefrontCheckoutLineItemsUpdatePayload {
  __typename: 'CheckoutLineItemsUpdatePayload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutShippingAddressUpdate` mutation. */
export interface ShopifyStorefrontCheckoutShippingAddressUpdatePayload {
  __typename: 'CheckoutShippingAddressUpdatePayload'
  /** The updated checkout object. */
  checkout: ShopifyStorefrontCheckout
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutShippingAddressUpdateV2` mutation. */
export interface ShopifyStorefrontCheckoutShippingAddressUpdateV2Payload {
  __typename: 'CheckoutShippingAddressUpdateV2Payload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `checkoutShippingLineUpdate` mutation. */
export interface ShopifyStorefrontCheckoutShippingLineUpdatePayload {
  __typename: 'CheckoutShippingLineUpdatePayload'
  /** The updated checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Represents an error that happens during execution of a checkout mutation. */
export interface ShopifyStorefrontCheckoutUserError
  extends ShopifyStorefrontDisplayableError {
  __typename: 'CheckoutUserError'
  /** The error code. */
  code?: Maybe<ShopifyStorefrontCheckoutErrorCode>
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']>>
  /** The error message. */
  message: Scalars['String']
}

/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export interface ShopifyStorefrontCollection
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode,
    ShopifyStorefrontOnlineStorePublishable {
  __typename: 'Collection'
  /** Stripped description of the collection, single line with HTML tags removed. */
  description: Scalars['String']
  /** The description of the collection, complete with HTML formatting. */
  descriptionHtml: Scalars['HTML']
  /**
   * A human-friendly unique string for the collection automatically generated from its title.
   * Limit of 255 characters.
   */
  handle: Scalars['String']
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** Image associated with the collection. */
  image?: Maybe<ShopifyStorefrontImage>
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /**
   * A paginated list of metafields associated with the resource.
   * @deprecated As of 2022-07, the paginated `metafields` field has been repurposed to require a list of metafield identifiers.
   *
   */
  metafields: ShopifyStorefrontMetafieldConnection
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']>
  /** List of products in the collection. */
  products: ShopifyStorefrontProductConnection
  /** The collection’s name. Limit of 255 characters. */
  title: Scalars['String']
  /** The date and time when the collection was last modified. */
  updatedAt: Scalars['DateTime']
}

/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export type ShopifyStorefrontCollectionDescriptionArgs = {
  truncateAt?: Maybe<Scalars['Int']>
}

/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export type ShopifyStorefrontCollectionImageArgs = {
  maxWidth?: Maybe<Scalars['Int']>
  maxHeight?: Maybe<Scalars['Int']>
  crop?: Maybe<ShopifyStorefrontCropRegion>
  scale?: Maybe<Scalars['Int']>
}

/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export type ShopifyStorefrontCollectionMetafieldArgs = {
  namespace: Scalars['String']
  key: Scalars['String']
}

/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export type ShopifyStorefrontCollectionMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** A collection represents a grouping of products that a shop owner can create to organize them or make their shops easier to browse. */
export type ShopifyStorefrontCollectionProductsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontProductCollectionSortKeys>
  filters?: Maybe<Array<ShopifyStorefrontProductFilter>>
}

/** An auto-generated type for paginating through multiple Collections. */
export interface ShopifyStorefrontCollectionConnection {
  __typename: 'CollectionConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontCollectionEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one Collection and a cursor during pagination. */
export interface ShopifyStorefrontCollectionEdge {
  __typename: 'CollectionEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of CollectionEdge. */
  node: ShopifyStorefrontCollection
}

/** The set of valid sort keys for the Collection query. */
export enum ShopifyStorefrontCollectionSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  Relevance = 'RELEVANCE',
}

/** A comment on an article. */
export interface ShopifyStorefrontComment extends ShopifyStorefrontNode {
  __typename: 'Comment'
  /** The comment’s author. */
  author: ShopifyStorefrontCommentAuthor
  /** Stripped content of the comment, single line with HTML tags removed. */
  content: Scalars['String']
  /** The content of the comment, complete with HTML formatting. */
  contentHtml: Scalars['HTML']
  /** A globally-unique ID. */
  id: Scalars['ID']
}

/** A comment on an article. */
export type ShopifyStorefrontCommentContentArgs = {
  truncateAt?: Maybe<Scalars['Int']>
}

/** The author of a comment. */
export interface ShopifyStorefrontCommentAuthor {
  __typename: 'CommentAuthor'
  /** The author's email. */
  email: Scalars['String']
  /** The author’s name. */
  name: Scalars['String']
}

/** An auto-generated type for paginating through multiple Comments. */
export interface ShopifyStorefrontCommentConnection {
  __typename: 'CommentConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontCommentEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one Comment and a cursor during pagination. */
export interface ShopifyStorefrontCommentEdge {
  __typename: 'CommentEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of CommentEdge. */
  node: ShopifyStorefrontComment
}

/** A country. */
export interface ShopifyStorefrontCountry {
  __typename: 'Country'
  /** The currency of the country. */
  currency: ShopifyStorefrontCurrency
  /** The ISO code of the country. */
  isoCode: ShopifyStorefrontCountryCode
  /** The name of the country. */
  name: Scalars['String']
  /** The unit system used in the country. */
  unitSystem: ShopifyStorefrontUnitSystem
}

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
 */
export enum ShopifyStorefrontCountryCode {
  /** Afghanistan. */
  Af = 'AF',
  /** Åland Islands. */
  Ax = 'AX',
  /** Albania. */
  Al = 'AL',
  /** Algeria. */
  Dz = 'DZ',
  /** Andorra. */
  Ad = 'AD',
  /** Angola. */
  Ao = 'AO',
  /** Anguilla. */
  Ai = 'AI',
  /** Antigua & Barbuda. */
  Ag = 'AG',
  /** Argentina. */
  Ar = 'AR',
  /** Armenia. */
  Am = 'AM',
  /** Aruba. */
  Aw = 'AW',
  /** Ascension Island. */
  Ac = 'AC',
  /** Australia. */
  Au = 'AU',
  /** Austria. */
  At = 'AT',
  /** Azerbaijan. */
  Az = 'AZ',
  /** Bahamas. */
  Bs = 'BS',
  /** Bahrain. */
  Bh = 'BH',
  /** Bangladesh. */
  Bd = 'BD',
  /** Barbados. */
  Bb = 'BB',
  /** Belarus. */
  By = 'BY',
  /** Belgium. */
  Be = 'BE',
  /** Belize. */
  Bz = 'BZ',
  /** Benin. */
  Bj = 'BJ',
  /** Bermuda. */
  Bm = 'BM',
  /** Bhutan. */
  Bt = 'BT',
  /** Bolivia. */
  Bo = 'BO',
  /** Bosnia & Herzegovina. */
  Ba = 'BA',
  /** Botswana. */
  Bw = 'BW',
  /** Bouvet Island. */
  Bv = 'BV',
  /** Brazil. */
  Br = 'BR',
  /** British Indian Ocean Territory. */
  Io = 'IO',
  /** Brunei. */
  Bn = 'BN',
  /** Bulgaria. */
  Bg = 'BG',
  /** Burkina Faso. */
  Bf = 'BF',
  /** Burundi. */
  Bi = 'BI',
  /** Cambodia. */
  Kh = 'KH',
  /** Canada. */
  Ca = 'CA',
  /** Cape Verde. */
  Cv = 'CV',
  /** Caribbean Netherlands. */
  Bq = 'BQ',
  /** Cayman Islands. */
  Ky = 'KY',
  /** Central African Republic. */
  Cf = 'CF',
  /** Chad. */
  Td = 'TD',
  /** Chile. */
  Cl = 'CL',
  /** China. */
  Cn = 'CN',
  /** Christmas Island. */
  Cx = 'CX',
  /** Cocos (Keeling) Islands. */
  Cc = 'CC',
  /** Colombia. */
  Co = 'CO',
  /** Comoros. */
  Km = 'KM',
  /** Congo - Brazzaville. */
  Cg = 'CG',
  /** Congo - Kinshasa. */
  Cd = 'CD',
  /** Cook Islands. */
  Ck = 'CK',
  /** Costa Rica. */
  Cr = 'CR',
  /** Croatia. */
  Hr = 'HR',
  /** Cuba. */
  Cu = 'CU',
  /** Curaçao. */
  Cw = 'CW',
  /** Cyprus. */
  Cy = 'CY',
  /** Czechia. */
  Cz = 'CZ',
  /** Côte d’Ivoire. */
  Ci = 'CI',
  /** Denmark. */
  Dk = 'DK',
  /** Djibouti. */
  Dj = 'DJ',
  /** Dominica. */
  Dm = 'DM',
  /** Dominican Republic. */
  Do = 'DO',
  /** Ecuador. */
  Ec = 'EC',
  /** Egypt. */
  Eg = 'EG',
  /** El Salvador. */
  Sv = 'SV',
  /** Equatorial Guinea. */
  Gq = 'GQ',
  /** Eritrea. */
  Er = 'ER',
  /** Estonia. */
  Ee = 'EE',
  /** Eswatini. */
  Sz = 'SZ',
  /** Ethiopia. */
  Et = 'ET',
  /** Falkland Islands. */
  Fk = 'FK',
  /** Faroe Islands. */
  Fo = 'FO',
  /** Fiji. */
  Fj = 'FJ',
  /** Finland. */
  Fi = 'FI',
  /** France. */
  Fr = 'FR',
  /** French Guiana. */
  Gf = 'GF',
  /** French Polynesia. */
  Pf = 'PF',
  /** French Southern Territories. */
  Tf = 'TF',
  /** Gabon. */
  Ga = 'GA',
  /** Gambia. */
  Gm = 'GM',
  /** Georgia. */
  Ge = 'GE',
  /** Germany. */
  De = 'DE',
  /** Ghana. */
  Gh = 'GH',
  /** Gibraltar. */
  Gi = 'GI',
  /** Greece. */
  Gr = 'GR',
  /** Greenland. */
  Gl = 'GL',
  /** Grenada. */
  Gd = 'GD',
  /** Guadeloupe. */
  Gp = 'GP',
  /** Guatemala. */
  Gt = 'GT',
  /** Guernsey. */
  Gg = 'GG',
  /** Guinea. */
  Gn = 'GN',
  /** Guinea-Bissau. */
  Gw = 'GW',
  /** Guyana. */
  Gy = 'GY',
  /** Haiti. */
  Ht = 'HT',
  /** Heard & McDonald Islands. */
  Hm = 'HM',
  /** Vatican City. */
  Va = 'VA',
  /** Honduras. */
  Hn = 'HN',
  /** Hong Kong SAR. */
  Hk = 'HK',
  /** Hungary. */
  Hu = 'HU',
  /** Iceland. */
  Is = 'IS',
  /** India. */
  In = 'IN',
  /** Indonesia. */
  Id = 'ID',
  /** Iran. */
  Ir = 'IR',
  /** Iraq. */
  Iq = 'IQ',
  /** Ireland. */
  Ie = 'IE',
  /** Isle of Man. */
  Im = 'IM',
  /** Israel. */
  Il = 'IL',
  /** Italy. */
  It = 'IT',
  /** Jamaica. */
  Jm = 'JM',
  /** Japan. */
  Jp = 'JP',
  /** Jersey. */
  Je = 'JE',
  /** Jordan. */
  Jo = 'JO',
  /** Kazakhstan. */
  Kz = 'KZ',
  /** Kenya. */
  Ke = 'KE',
  /** Kiribati. */
  Ki = 'KI',
  /** North Korea. */
  Kp = 'KP',
  /** Kosovo. */
  Xk = 'XK',
  /** Kuwait. */
  Kw = 'KW',
  /** Kyrgyzstan. */
  Kg = 'KG',
  /** Laos. */
  La = 'LA',
  /** Latvia. */
  Lv = 'LV',
  /** Lebanon. */
  Lb = 'LB',
  /** Lesotho. */
  Ls = 'LS',
  /** Liberia. */
  Lr = 'LR',
  /** Libya. */
  Ly = 'LY',
  /** Liechtenstein. */
  Li = 'LI',
  /** Lithuania. */
  Lt = 'LT',
  /** Luxembourg. */
  Lu = 'LU',
  /** Macao SAR. */
  Mo = 'MO',
  /** Madagascar. */
  Mg = 'MG',
  /** Malawi. */
  Mw = 'MW',
  /** Malaysia. */
  My = 'MY',
  /** Maldives. */
  Mv = 'MV',
  /** Mali. */
  Ml = 'ML',
  /** Malta. */
  Mt = 'MT',
  /** Martinique. */
  Mq = 'MQ',
  /** Mauritania. */
  Mr = 'MR',
  /** Mauritius. */
  Mu = 'MU',
  /** Mayotte. */
  Yt = 'YT',
  /** Mexico. */
  Mx = 'MX',
  /** Moldova. */
  Md = 'MD',
  /** Monaco. */
  Mc = 'MC',
  /** Mongolia. */
  Mn = 'MN',
  /** Montenegro. */
  Me = 'ME',
  /** Montserrat. */
  Ms = 'MS',
  /** Morocco. */
  Ma = 'MA',
  /** Mozambique. */
  Mz = 'MZ',
  /** Myanmar (Burma). */
  Mm = 'MM',
  /** Namibia. */
  Na = 'NA',
  /** Nauru. */
  Nr = 'NR',
  /** Nepal. */
  Np = 'NP',
  /** Netherlands. */
  Nl = 'NL',
  /** Netherlands Antilles. */
  An = 'AN',
  /** New Caledonia. */
  Nc = 'NC',
  /** New Zealand. */
  Nz = 'NZ',
  /** Nicaragua. */
  Ni = 'NI',
  /** Niger. */
  Ne = 'NE',
  /** Nigeria. */
  Ng = 'NG',
  /** Niue. */
  Nu = 'NU',
  /** Norfolk Island. */
  Nf = 'NF',
  /** North Macedonia. */
  Mk = 'MK',
  /** Norway. */
  No = 'NO',
  /** Oman. */
  Om = 'OM',
  /** Pakistan. */
  Pk = 'PK',
  /** Palestinian Territories. */
  Ps = 'PS',
  /** Panama. */
  Pa = 'PA',
  /** Papua New Guinea. */
  Pg = 'PG',
  /** Paraguay. */
  Py = 'PY',
  /** Peru. */
  Pe = 'PE',
  /** Philippines. */
  Ph = 'PH',
  /** Pitcairn Islands. */
  Pn = 'PN',
  /** Poland. */
  Pl = 'PL',
  /** Portugal. */
  Pt = 'PT',
  /** Qatar. */
  Qa = 'QA',
  /** Cameroon. */
  Cm = 'CM',
  /** Réunion. */
  Re = 'RE',
  /** Romania. */
  Ro = 'RO',
  /** Russia. */
  Ru = 'RU',
  /** Rwanda. */
  Rw = 'RW',
  /** St. Barthélemy. */
  Bl = 'BL',
  /** St. Helena. */
  Sh = 'SH',
  /** St. Kitts & Nevis. */
  Kn = 'KN',
  /** St. Lucia. */
  Lc = 'LC',
  /** St. Martin. */
  Mf = 'MF',
  /** St. Pierre & Miquelon. */
  Pm = 'PM',
  /** Samoa. */
  Ws = 'WS',
  /** San Marino. */
  Sm = 'SM',
  /** São Tomé & Príncipe. */
  St = 'ST',
  /** Saudi Arabia. */
  Sa = 'SA',
  /** Senegal. */
  Sn = 'SN',
  /** Serbia. */
  Rs = 'RS',
  /** Seychelles. */
  Sc = 'SC',
  /** Sierra Leone. */
  Sl = 'SL',
  /** Singapore. */
  Sg = 'SG',
  /** Sint Maarten. */
  Sx = 'SX',
  /** Slovakia. */
  Sk = 'SK',
  /** Slovenia. */
  Si = 'SI',
  /** Solomon Islands. */
  Sb = 'SB',
  /** Somalia. */
  So = 'SO',
  /** South Africa. */
  Za = 'ZA',
  /** South Georgia & South Sandwich Islands. */
  Gs = 'GS',
  /** South Korea. */
  Kr = 'KR',
  /** South Sudan. */
  Ss = 'SS',
  /** Spain. */
  Es = 'ES',
  /** Sri Lanka. */
  Lk = 'LK',
  /** St. Vincent & Grenadines. */
  Vc = 'VC',
  /** Sudan. */
  Sd = 'SD',
  /** Suriname. */
  Sr = 'SR',
  /** Svalbard & Jan Mayen. */
  Sj = 'SJ',
  /** Sweden. */
  Se = 'SE',
  /** Switzerland. */
  Ch = 'CH',
  /** Syria. */
  Sy = 'SY',
  /** Taiwan. */
  Tw = 'TW',
  /** Tajikistan. */
  Tj = 'TJ',
  /** Tanzania. */
  Tz = 'TZ',
  /** Thailand. */
  Th = 'TH',
  /** Timor-Leste. */
  Tl = 'TL',
  /** Togo. */
  Tg = 'TG',
  /** Tokelau. */
  Tk = 'TK',
  /** Tonga. */
  To = 'TO',
  /** Trinidad & Tobago. */
  Tt = 'TT',
  /** Tristan da Cunha. */
  Ta = 'TA',
  /** Tunisia. */
  Tn = 'TN',
  /** Turkey. */
  Tr = 'TR',
  /** Turkmenistan. */
  Tm = 'TM',
  /** Turks & Caicos Islands. */
  Tc = 'TC',
  /** Tuvalu. */
  Tv = 'TV',
  /** Uganda. */
  Ug = 'UG',
  /** Ukraine. */
  Ua = 'UA',
  /** United Arab Emirates. */
  Ae = 'AE',
  /** United Kingdom. */
  Gb = 'GB',
  /** United States. */
  Us = 'US',
  /** U.S. Outlying Islands. */
  Um = 'UM',
  /** Uruguay. */
  Uy = 'UY',
  /** Uzbekistan. */
  Uz = 'UZ',
  /** Vanuatu. */
  Vu = 'VU',
  /** Venezuela. */
  Ve = 'VE',
  /** Vietnam. */
  Vn = 'VN',
  /** British Virgin Islands. */
  Vg = 'VG',
  /** Wallis & Futuna. */
  Wf = 'WF',
  /** Western Sahara. */
  Eh = 'EH',
  /** Yemen. */
  Ye = 'YE',
  /** Zambia. */
  Zm = 'ZM',
  /** Zimbabwe. */
  Zw = 'ZW',
  /** Unknown Region. */
  Zz = 'ZZ',
}

/** Credit card information used for a payment. */
export interface ShopifyStorefrontCreditCard {
  __typename: 'CreditCard'
  /** The brand of the credit card. */
  brand?: Maybe<Scalars['String']>
  /** The expiry month of the credit card. */
  expiryMonth?: Maybe<Scalars['Int']>
  /** The expiry year of the credit card. */
  expiryYear?: Maybe<Scalars['Int']>
  /** The credit card's BIN number. */
  firstDigits?: Maybe<Scalars['String']>
  /** The first name of the card holder. */
  firstName?: Maybe<Scalars['String']>
  /** The last 4 digits of the credit card. */
  lastDigits?: Maybe<Scalars['String']>
  /** The last name of the card holder. */
  lastName?: Maybe<Scalars['String']>
  /** The masked credit card number with only the last 4 digits displayed. */
  maskedNumber?: Maybe<Scalars['String']>
}

/**
 * Specifies the fields required to complete a checkout with
 * a Shopify vaulted credit card payment.
 */
export type ShopifyStorefrontCreditCardPaymentInput = {
  /** The amount of the payment. */
  amount: Scalars['Money']
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. For more information, refer to [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests). */
  idempotencyKey: Scalars['String']
  /** The billing address for the payment. */
  billingAddress: ShopifyStorefrontMailingAddressInput
  /** The ID returned by Shopify's Card Vault. */
  vaultId: Scalars['String']
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: Maybe<Scalars['Boolean']>
}

/**
 * Specifies the fields required to complete a checkout with
 * a Shopify vaulted credit card payment.
 */
export type ShopifyStorefrontCreditCardPaymentInputV2 = {
  /** The amount and currency of the payment. */
  paymentAmount: ShopifyStorefrontMoneyInput
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. For more information, refer to [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests). */
  idempotencyKey: Scalars['String']
  /** The billing address for the payment. */
  billingAddress: ShopifyStorefrontMailingAddressInput
  /** The ID returned by Shopify's Card Vault. */
  vaultId: Scalars['String']
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: Maybe<Scalars['Boolean']>
}

/** The part of the image that should remain after cropping. */
export enum ShopifyStorefrontCropRegion {
  /** Keep the center of the image. */
  Center = 'CENTER',
  /** Keep the top of the image. */
  Top = 'TOP',
  /** Keep the bottom of the image. */
  Bottom = 'BOTTOM',
  /** Keep the left of the image. */
  Left = 'LEFT',
  /** Keep the right of the image. */
  Right = 'RIGHT',
}

/** A currency. */
export interface ShopifyStorefrontCurrency {
  __typename: 'Currency'
  /** The ISO code of the currency. */
  isoCode: ShopifyStorefrontCurrencyCode
  /** The name of the currency. */
  name: Scalars['String']
  /** The symbol of the currency. */
  symbol: Scalars['String']
}

/**
 * The three-letter currency codes that represent the world currencies used in stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 */
export enum ShopifyStorefrontCurrencyCode {
  /** United States Dollars (USD). */
  Usd = 'USD',
  /** Euro (EUR). */
  Eur = 'EUR',
  /** United Kingdom Pounds (GBP). */
  Gbp = 'GBP',
  /** Canadian Dollars (CAD). */
  Cad = 'CAD',
  /** Afghan Afghani (AFN). */
  Afn = 'AFN',
  /** Albanian Lek (ALL). */
  All = 'ALL',
  /** Algerian Dinar (DZD). */
  Dzd = 'DZD',
  /** Angolan Kwanza (AOA). */
  Aoa = 'AOA',
  /** Argentine Pesos (ARS). */
  Ars = 'ARS',
  /** Armenian Dram (AMD). */
  Amd = 'AMD',
  /** Aruban Florin (AWG). */
  Awg = 'AWG',
  /** Australian Dollars (AUD). */
  Aud = 'AUD',
  /** Barbadian Dollar (BBD). */
  Bbd = 'BBD',
  /** Azerbaijani Manat (AZN). */
  Azn = 'AZN',
  /** Bangladesh Taka (BDT). */
  Bdt = 'BDT',
  /** Bahamian Dollar (BSD). */
  Bsd = 'BSD',
  /** Bahraini Dinar (BHD). */
  Bhd = 'BHD',
  /** Burundian Franc (BIF). */
  Bif = 'BIF',
  /** Belize Dollar (BZD). */
  Bzd = 'BZD',
  /** Bermudian Dollar (BMD). */
  Bmd = 'BMD',
  /** Bhutanese Ngultrum (BTN). */
  Btn = 'BTN',
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  Bam = 'BAM',
  /** Brazilian Real (BRL). */
  Brl = 'BRL',
  /** Bolivian Boliviano (BOB). */
  Bob = 'BOB',
  /** Botswana Pula (BWP). */
  Bwp = 'BWP',
  /** Brunei Dollar (BND). */
  Bnd = 'BND',
  /** Bulgarian Lev (BGN). */
  Bgn = 'BGN',
  /** Burmese Kyat (MMK). */
  Mmk = 'MMK',
  /** Cambodian Riel. */
  Khr = 'KHR',
  /** Cape Verdean escudo (CVE). */
  Cve = 'CVE',
  /** Cayman Dollars (KYD). */
  Kyd = 'KYD',
  /** Central African CFA Franc (XAF). */
  Xaf = 'XAF',
  /** Chilean Peso (CLP). */
  Clp = 'CLP',
  /** Chinese Yuan Renminbi (CNY). */
  Cny = 'CNY',
  /** Colombian Peso (COP). */
  Cop = 'COP',
  /** Comorian Franc (KMF). */
  Kmf = 'KMF',
  /** Congolese franc (CDF). */
  Cdf = 'CDF',
  /** Costa Rican Colones (CRC). */
  Crc = 'CRC',
  /** Croatian Kuna (HRK). */
  Hrk = 'HRK',
  /** Czech Koruny (CZK). */
  Czk = 'CZK',
  /** Danish Kroner (DKK). */
  Dkk = 'DKK',
  /** Dominican Peso (DOP). */
  Dop = 'DOP',
  /** East Caribbean Dollar (XCD). */
  Xcd = 'XCD',
  /** Egyptian Pound (EGP). */
  Egp = 'EGP',
  /** Ethiopian Birr (ETB). */
  Etb = 'ETB',
  /** CFP Franc (XPF). */
  Xpf = 'XPF',
  /** Fijian Dollars (FJD). */
  Fjd = 'FJD',
  /** Gambian Dalasi (GMD). */
  Gmd = 'GMD',
  /** Ghanaian Cedi (GHS). */
  Ghs = 'GHS',
  /** Guatemalan Quetzal (GTQ). */
  Gtq = 'GTQ',
  /** Guyanese Dollar (GYD). */
  Gyd = 'GYD',
  /** Georgian Lari (GEL). */
  Gel = 'GEL',
  /** Haitian Gourde (HTG). */
  Htg = 'HTG',
  /** Honduran Lempira (HNL). */
  Hnl = 'HNL',
  /** Hong Kong Dollars (HKD). */
  Hkd = 'HKD',
  /** Hungarian Forint (HUF). */
  Huf = 'HUF',
  /** Icelandic Kronur (ISK). */
  Isk = 'ISK',
  /** Indian Rupees (INR). */
  Inr = 'INR',
  /** Indonesian Rupiah (IDR). */
  Idr = 'IDR',
  /** Israeli New Shekel (NIS). */
  Ils = 'ILS',
  /** Iraqi Dinar (IQD). */
  Iqd = 'IQD',
  /** Jamaican Dollars (JMD). */
  Jmd = 'JMD',
  /** Japanese Yen (JPY). */
  Jpy = 'JPY',
  /** Jersey Pound. */
  Jep = 'JEP',
  /** Jordanian Dinar (JOD). */
  Jod = 'JOD',
  /** Kazakhstani Tenge (KZT). */
  Kzt = 'KZT',
  /** Kenyan Shilling (KES). */
  Kes = 'KES',
  /** Kuwaiti Dinar (KWD). */
  Kwd = 'KWD',
  /** Kyrgyzstani Som (KGS). */
  Kgs = 'KGS',
  /** Laotian Kip (LAK). */
  Lak = 'LAK',
  /** Latvian Lati (LVL). */
  Lvl = 'LVL',
  /** Lebanese Pounds (LBP). */
  Lbp = 'LBP',
  /** Lesotho Loti (LSL). */
  Lsl = 'LSL',
  /** Liberian Dollar (LRD). */
  Lrd = 'LRD',
  /** Lithuanian Litai (LTL). */
  Ltl = 'LTL',
  /** Malagasy Ariary (MGA). */
  Mga = 'MGA',
  /** Macedonia Denar (MKD). */
  Mkd = 'MKD',
  /** Macanese Pataca (MOP). */
  Mop = 'MOP',
  /** Malawian Kwacha (MWK). */
  Mwk = 'MWK',
  /** Maldivian Rufiyaa (MVR). */
  Mvr = 'MVR',
  /** Mexican Pesos (MXN). */
  Mxn = 'MXN',
  /** Malaysian Ringgits (MYR). */
  Myr = 'MYR',
  /** Mauritian Rupee (MUR). */
  Mur = 'MUR',
  /** Moldovan Leu (MDL). */
  Mdl = 'MDL',
  /** Moroccan Dirham. */
  Mad = 'MAD',
  /** Mongolian Tugrik. */
  Mnt = 'MNT',
  /** Mozambican Metical. */
  Mzn = 'MZN',
  /** Namibian Dollar. */
  Nad = 'NAD',
  /** Nepalese Rupee (NPR). */
  Npr = 'NPR',
  /** Netherlands Antillean Guilder. */
  Ang = 'ANG',
  /** New Zealand Dollars (NZD). */
  Nzd = 'NZD',
  /** Nicaraguan Córdoba (NIO). */
  Nio = 'NIO',
  /** Nigerian Naira (NGN). */
  Ngn = 'NGN',
  /** Norwegian Kroner (NOK). */
  Nok = 'NOK',
  /** Omani Rial (OMR). */
  Omr = 'OMR',
  /** Panamian Balboa (PAB). */
  Pab = 'PAB',
  /** Pakistani Rupee (PKR). */
  Pkr = 'PKR',
  /** Papua New Guinean Kina (PGK). */
  Pgk = 'PGK',
  /** Paraguayan Guarani (PYG). */
  Pyg = 'PYG',
  /** Peruvian Nuevo Sol (PEN). */
  Pen = 'PEN',
  /** Philippine Peso (PHP). */
  Php = 'PHP',
  /** Polish Zlotych (PLN). */
  Pln = 'PLN',
  /** Qatari Rial (QAR). */
  Qar = 'QAR',
  /** Romanian Lei (RON). */
  Ron = 'RON',
  /** Russian Rubles (RUB). */
  Rub = 'RUB',
  /** Rwandan Franc (RWF). */
  Rwf = 'RWF',
  /** Samoan Tala (WST). */
  Wst = 'WST',
  /** Saudi Riyal (SAR). */
  Sar = 'SAR',
  /** Serbian dinar (RSD). */
  Rsd = 'RSD',
  /** Seychellois Rupee (SCR). */
  Scr = 'SCR',
  /** Singapore Dollars (SGD). */
  Sgd = 'SGD',
  /** Sudanese Pound (SDG). */
  Sdg = 'SDG',
  /** Syrian Pound (SYP). */
  Syp = 'SYP',
  /** South African Rand (ZAR). */
  Zar = 'ZAR',
  /** South Korean Won (KRW). */
  Krw = 'KRW',
  /** South Sudanese Pound (SSP). */
  Ssp = 'SSP',
  /** Solomon Islands Dollar (SBD). */
  Sbd = 'SBD',
  /** Sri Lankan Rupees (LKR). */
  Lkr = 'LKR',
  /** Surinamese Dollar (SRD). */
  Srd = 'SRD',
  /** Swazi Lilangeni (SZL). */
  Szl = 'SZL',
  /** Swedish Kronor (SEK). */
  Sek = 'SEK',
  /** Swiss Francs (CHF). */
  Chf = 'CHF',
  /** Taiwan Dollars (TWD). */
  Twd = 'TWD',
  /** Thai baht (THB). */
  Thb = 'THB',
  /** Tanzanian Shilling (TZS). */
  Tzs = 'TZS',
  /** Trinidad and Tobago Dollars (TTD). */
  Ttd = 'TTD',
  /** Tunisian Dinar (TND). */
  Tnd = 'TND',
  /** Turkish Lira (TRY). */
  Try = 'TRY',
  /** Turkmenistani Manat (TMT). */
  Tmt = 'TMT',
  /** Ugandan Shilling (UGX). */
  Ugx = 'UGX',
  /** Ukrainian Hryvnia (UAH). */
  Uah = 'UAH',
  /** United Arab Emirates Dirham (AED). */
  Aed = 'AED',
  /** Uruguayan Pesos (UYU). */
  Uyu = 'UYU',
  /** Uzbekistan som (UZS). */
  Uzs = 'UZS',
  /** Vanuatu Vatu (VUV). */
  Vuv = 'VUV',
  /** Vietnamese đồng (VND). */
  Vnd = 'VND',
  /** West African CFA franc (XOF). */
  Xof = 'XOF',
  /** Yemeni Rial (YER). */
  Yer = 'YER',
  /** Zambian Kwacha (ZMW). */
  Zmw = 'ZMW',
  /** Belarusian Ruble (BYN). */
  Byn = 'BYN',
  /** Belarusian Ruble (BYR). */
  Byr = 'BYR',
  /** Djiboutian Franc (DJF). */
  Djf = 'DJF',
  /** Eritrean Nakfa (ERN). */
  Ern = 'ERN',
  /** Falkland Islands Pounds (FKP). */
  Fkp = 'FKP',
  /** Gibraltar Pounds (GIP). */
  Gip = 'GIP',
  /** Guinean Franc (GNF). */
  Gnf = 'GNF',
  /** Iranian Rial (IRR). */
  Irr = 'IRR',
  /** Kiribati Dollar (KID). */
  Kid = 'KID',
  /** Libyan Dinar (LYD). */
  Lyd = 'LYD',
  /** Mauritanian Ouguiya (MRU). */
  Mru = 'MRU',
  /** Sierra Leonean Leone (SLL). */
  Sll = 'SLL',
  /** Saint Helena Pounds (SHP). */
  Shp = 'SHP',
  /** Somali Shilling (SOS). */
  Sos = 'SOS',
  /** Sao Tome And Principe Dobra (STD). */
  Std = 'STD',
  /** Tajikistani Somoni (TJS). */
  Tjs = 'TJS',
  /** Tongan Pa'anga (TOP). */
  Top = 'TOP',
  /** Venezuelan Bolivares (VEF). */
  Vef = 'VEF',
  /** Venezuelan Bolivares (VES). */
  Ves = 'VES',
  /** Unrecognized currency. */
  Xxx = 'XXX',
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export interface ShopifyStorefrontCustomer
  extends ShopifyStorefrontHasMetafields {
  __typename: 'Customer'
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing: Scalars['Boolean']
  /** A list of addresses for the customer. */
  addresses: ShopifyStorefrontMailingAddressConnection
  /** The date and time when the customer was created. */
  createdAt: Scalars['DateTime']
  /** The customer’s default address. */
  defaultAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /** The customer’s name, email or phone number. */
  displayName: Scalars['String']
  /** The customer’s email address. */
  email?: Maybe<Scalars['String']>
  /** The customer’s first name. */
  firstName?: Maybe<Scalars['String']>
  /** A unique ID for the customer. */
  id: Scalars['ID']
  /** The customer's most recently updated, incomplete checkout. */
  lastIncompleteCheckout?: Maybe<ShopifyStorefrontCheckout>
  /** The customer’s last name. */
  lastName?: Maybe<Scalars['String']>
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /**
   * A paginated list of metafields associated with the resource.
   * @deprecated As of 2022-07, the paginated `metafields` field has been repurposed to require a list of metafield identifiers.
   *
   */
  metafields: ShopifyStorefrontMetafieldConnection
  /** The orders associated with the customer. */
  orders: ShopifyStorefrontOrderConnection
  /** The customer’s phone number. */
  phone?: Maybe<Scalars['String']>
  /**
   * A comma separated list of tags that have been added to the customer.
   * Additional access scope required: unauthenticated_read_customer_tags.
   */
  tags: Array<Scalars['String']>
  /** The date and time when the customer information was updated. */
  updatedAt: Scalars['DateTime']
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyStorefrontCustomerAddressesArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyStorefrontCustomerMetafieldArgs = {
  namespace: Scalars['String']
  key: Scalars['String']
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyStorefrontCustomerMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyStorefrontCustomerOrdersArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontOrderSortKeys>
  query?: Maybe<Scalars['String']>
}

/** A CustomerAccessToken represents the unique token required to make modifications to the customer object. */
export interface ShopifyStorefrontCustomerAccessToken {
  __typename: 'CustomerAccessToken'
  /** The customer’s access token. */
  accessToken: Scalars['String']
  /** The date and time when the customer access token expires. */
  expiresAt: Scalars['DateTime']
}

/** The input fields required to create a customer access token. */
export type ShopifyStorefrontCustomerAccessTokenCreateInput = {
  /** The email associated to the customer. */
  email: Scalars['String']
  /** The login password to be used by the customer. */
  password: Scalars['String']
}

/** Return type for `customerAccessTokenCreate` mutation. */
export interface ShopifyStorefrontCustomerAccessTokenCreatePayload {
  __typename: 'CustomerAccessTokenCreatePayload'
  /** The newly created customer access token object. */
  customerAccessToken?: Maybe<ShopifyStorefrontCustomerAccessToken>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `customerAccessTokenCreateWithMultipass` mutation. */
export interface ShopifyStorefrontCustomerAccessTokenCreateWithMultipassPayload {
  __typename: 'CustomerAccessTokenCreateWithMultipassPayload'
  /** An access token object associated with the customer. */
  customerAccessToken?: Maybe<ShopifyStorefrontCustomerAccessToken>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
}

/** Return type for `customerAccessTokenDelete` mutation. */
export interface ShopifyStorefrontCustomerAccessTokenDeletePayload {
  __typename: 'CustomerAccessTokenDeletePayload'
  /** The destroyed access token. */
  deletedAccessToken?: Maybe<Scalars['String']>
  /** ID of the destroyed customer access token. */
  deletedCustomerAccessTokenId?: Maybe<Scalars['String']>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `customerAccessTokenRenew` mutation. */
export interface ShopifyStorefrontCustomerAccessTokenRenewPayload {
  __typename: 'CustomerAccessTokenRenewPayload'
  /** The renewed customer access token object. */
  customerAccessToken?: Maybe<ShopifyStorefrontCustomerAccessToken>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `customerActivateByUrl` mutation. */
export interface ShopifyStorefrontCustomerActivateByUrlPayload {
  __typename: 'CustomerActivateByUrlPayload'
  /** The customer that was activated. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** A new customer access token for the customer. */
  customerAccessToken?: Maybe<ShopifyStorefrontCustomerAccessToken>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
}

/** The input fields to activate a customer. */
export type ShopifyStorefrontCustomerActivateInput = {
  /** The activation token required to activate the customer. */
  activationToken: Scalars['String']
  /** New password that will be set during activation. */
  password: Scalars['String']
}

/** Return type for `customerActivate` mutation. */
export interface ShopifyStorefrontCustomerActivatePayload {
  __typename: 'CustomerActivatePayload'
  /** The customer object. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: Maybe<ShopifyStorefrontCustomerAccessToken>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `customerAddressCreate` mutation. */
export interface ShopifyStorefrontCustomerAddressCreatePayload {
  __typename: 'CustomerAddressCreatePayload'
  /** The new customer address object. */
  customerAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `customerAddressDelete` mutation. */
export interface ShopifyStorefrontCustomerAddressDeletePayload {
  __typename: 'CustomerAddressDeletePayload'
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /** ID of the deleted customer address. */
  deletedCustomerAddressId?: Maybe<Scalars['String']>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `customerAddressUpdate` mutation. */
export interface ShopifyStorefrontCustomerAddressUpdatePayload {
  __typename: 'CustomerAddressUpdatePayload'
  /** The customer’s updated mailing address. */
  customerAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** The input fields to create a new customer. */
export type ShopifyStorefrontCustomerCreateInput = {
  /** The customer’s first name. */
  firstName?: Maybe<Scalars['String']>
  /** The customer’s last name. */
  lastName?: Maybe<Scalars['String']>
  /** The customer’s email. */
  email: Scalars['String']
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone?: Maybe<Scalars['String']>
  /** The login password used by the customer. */
  password: Scalars['String']
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: Maybe<Scalars['Boolean']>
}

/** Return type for `customerCreate` mutation. */
export interface ShopifyStorefrontCustomerCreatePayload {
  __typename: 'CustomerCreatePayload'
  /** The created customer object. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `customerDefaultAddressUpdate` mutation. */
export interface ShopifyStorefrontCustomerDefaultAddressUpdatePayload {
  __typename: 'CustomerDefaultAddressUpdatePayload'
  /** The updated customer object. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Possible error codes that can be returned by `CustomerUserError`. */
export enum ShopifyStorefrontCustomerErrorCode {
  /** The input value is blank. */
  Blank = 'BLANK',
  /** The input value is invalid. */
  Invalid = 'INVALID',
  /** The input value is already taken. */
  Taken = 'TAKEN',
  /** The input value is too long. */
  TooLong = 'TOO_LONG',
  /** The input value is too short. */
  TooShort = 'TOO_SHORT',
  /** Unidentified customer. */
  UnidentifiedCustomer = 'UNIDENTIFIED_CUSTOMER',
  /** Customer is disabled. */
  CustomerDisabled = 'CUSTOMER_DISABLED',
  /** Input password starts or ends with whitespace. */
  PasswordStartsOrEndsWithWhitespace = 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE',
  /** Input contains HTML tags. */
  ContainsHtmlTags = 'CONTAINS_HTML_TAGS',
  /** Input contains URL. */
  ContainsUrl = 'CONTAINS_URL',
  /** Invalid activation token. */
  TokenInvalid = 'TOKEN_INVALID',
  /** Customer already enabled. */
  AlreadyEnabled = 'ALREADY_ENABLED',
  /** Address does not exist. */
  NotFound = 'NOT_FOUND',
  /** Input email contains an invalid domain name. */
  BadDomain = 'BAD_DOMAIN',
  /** Multipass token is not valid. */
  InvalidMultipassRequest = 'INVALID_MULTIPASS_REQUEST',
}

/** Return type for `customerRecover` mutation. */
export interface ShopifyStorefrontCustomerRecoverPayload {
  __typename: 'CustomerRecoverPayload'
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Return type for `customerResetByUrl` mutation. */
export interface ShopifyStorefrontCustomerResetByUrlPayload {
  __typename: 'CustomerResetByUrlPayload'
  /** The customer object which was reset. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: Maybe<ShopifyStorefrontCustomerAccessToken>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** The input fields to reset a customer's password. */
export type ShopifyStorefrontCustomerResetInput = {
  /** The reset token required to reset the customer’s password. */
  resetToken: Scalars['String']
  /** New password that will be set as part of the reset password process. */
  password: Scalars['String']
}

/** Return type for `customerReset` mutation. */
export interface ShopifyStorefrontCustomerResetPayload {
  __typename: 'CustomerResetPayload'
  /** The customer object which was reset. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** A newly created customer access token object for the customer. */
  customerAccessToken?: Maybe<ShopifyStorefrontCustomerAccessToken>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** The input fields to update the Customer information. */
export type ShopifyStorefrontCustomerUpdateInput = {
  /** The customer’s first name. */
  firstName?: Maybe<Scalars['String']>
  /** The customer’s last name. */
  lastName?: Maybe<Scalars['String']>
  /** The customer’s email. */
  email?: Maybe<Scalars['String']>
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_. To remove the phone number, specify `null`.
   */
  phone?: Maybe<Scalars['String']>
  /** The login password used by the customer. */
  password?: Maybe<Scalars['String']>
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: Maybe<Scalars['Boolean']>
}

/** Return type for `customerUpdate` mutation. */
export interface ShopifyStorefrontCustomerUpdatePayload {
  __typename: 'CustomerUpdatePayload'
  /** The updated customer object. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /**
   * The newly created customer access token. If the customer's password is updated, all previous access tokens
   * (including the one used to perform this mutation) become invalid, and a new token is generated.
   */
  customerAccessToken?: Maybe<ShopifyStorefrontCustomerAccessToken>
  /** The list of errors that occurred from executing the mutation. */
  customerUserErrors: Array<ShopifyStorefrontCustomerUserError>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `customerUserErrors` instead.
   */
  userErrors: Array<ShopifyStorefrontUserError>
}

/** Represents an error that happens during execution of a customer mutation. */
export interface ShopifyStorefrontCustomerUserError
  extends ShopifyStorefrontDisplayableError {
  __typename: 'CustomerUserError'
  /** The error code. */
  code?: Maybe<ShopifyStorefrontCustomerErrorCode>
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']>>
  /** The error message. */
  message: Scalars['String']
}

/** Digital wallet, such as Apple Pay, which can be used for accelerated checkouts. */
export enum ShopifyStorefrontDigitalWallet {
  /** Apple Pay. */
  ApplePay = 'APPLE_PAY',
  /** Android Pay. */
  AndroidPay = 'ANDROID_PAY',
  /** Google Pay. */
  GooglePay = 'GOOGLE_PAY',
  /** Shopify Pay. */
  ShopifyPay = 'SHOPIFY_PAY',
}

/** An amount discounting the line that has been allocated by a discount. */
export interface ShopifyStorefrontDiscountAllocation {
  __typename: 'DiscountAllocation'
  /** Amount of discount allocated. */
  allocatedAmount: ShopifyStorefrontMoneyV2
  /** The discount this allocated amount originated from. */
  discountApplication: ShopifyStorefrontDiscountApplication
}

/**
 * Discount applications capture the intentions of a discount source at
 * the time of application.
 */
export type ShopifyStorefrontDiscountApplication = {
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyStorefrontDiscountApplicationAllocationMethod
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyStorefrontDiscountApplicationTargetSelection
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyStorefrontDiscountApplicationTargetType
  /** The value of the discount application. */
  value: ShopifyStorefrontPricingValue
}

/** The method by which the discount's value is allocated onto its entitled lines. */
export enum ShopifyStorefrontDiscountApplicationAllocationMethod {
  /** The value is spread across all entitled lines. */
  Across = 'ACROSS',
  /** The value is applied onto every entitled line. */
  Each = 'EACH',
  /** The value is specifically applied onto a particular line. */
  One = 'ONE',
}

/** An auto-generated type for paginating through multiple DiscountApplications. */
export interface ShopifyStorefrontDiscountApplicationConnection {
  __typename: 'DiscountApplicationConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontDiscountApplicationEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one DiscountApplication and a cursor during pagination. */
export interface ShopifyStorefrontDiscountApplicationEdge {
  __typename: 'DiscountApplicationEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of DiscountApplicationEdge. */
  node: ShopifyStorefrontDiscountApplication
}

/**
 * The lines on the order to which the discount is applied, of the type defined by
 * the discount application's `targetType`. For example, the value `ENTITLED`, combined with a `targetType` of
 * `LINE_ITEM`, applies the discount on all line items that are entitled to the discount.
 * The value `ALL`, combined with a `targetType` of `SHIPPING_LINE`, applies the discount on all shipping lines.
 */
export enum ShopifyStorefrontDiscountApplicationTargetSelection {
  /** The discount is allocated onto all the lines. */
  All = 'ALL',
  /** The discount is allocated onto only the lines that it's entitled for. */
  Entitled = 'ENTITLED',
  /** The discount is allocated onto explicitly chosen lines. */
  Explicit = 'EXPLICIT',
}

/** The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards. */
export enum ShopifyStorefrontDiscountApplicationTargetType {
  /** The discount applies onto line items. */
  LineItem = 'LINE_ITEM',
  /** The discount applies onto shipping lines. */
  ShippingLine = 'SHIPPING_LINE',
}

/**
 * Discount code applications capture the intentions of a discount code at
 * the time that it is applied.
 */
export interface ShopifyStorefrontDiscountCodeApplication
  extends ShopifyStorefrontDiscountApplication {
  __typename: 'DiscountCodeApplication'
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyStorefrontDiscountApplicationAllocationMethod
  /** Specifies whether the discount code was applied successfully. */
  applicable: Scalars['Boolean']
  /** The string identifying the discount code that was used at the time of application. */
  code: Scalars['String']
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyStorefrontDiscountApplicationTargetSelection
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyStorefrontDiscountApplicationTargetType
  /** The value of the discount application. */
  value: ShopifyStorefrontPricingValue
}

/** Represents an error in the input of a mutation. */
export type ShopifyStorefrontDisplayableError = {
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']>>
  /** The error message. */
  message: Scalars['String']
}

/** Represents a web address. */
export interface ShopifyStorefrontDomain {
  __typename: 'Domain'
  /** The host name of the domain (eg: `example.com`). */
  host: Scalars['String']
  /** Whether SSL is enabled or not. */
  sslEnabled: Scalars['Boolean']
  /** The URL of the domain (eg: `https://example.com`). */
  url: Scalars['URL']
}

/** Represents a video hosted outside of Shopify. */
export interface ShopifyStorefrontExternalVideo
  extends ShopifyStorefrontMedia,
    ShopifyStorefrontNode {
  __typename: 'ExternalVideo'
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']>
  /**
   * The URL.
   * @deprecated Use `originUrl` instead.
   */
  embeddedUrl: Scalars['URL']
  /** The host of the external video. */
  host: ShopifyStorefrontMediaHost
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The media content type. */
  mediaContentType: ShopifyStorefrontMediaContentType
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyStorefrontImage>
}

/** A filter that is supported on the parent field. */
export interface ShopifyStorefrontFilter {
  __typename: 'Filter'
  /** A unique identifier. */
  id: Scalars['String']
  /** A human-friendly string for this filter. */
  label: Scalars['String']
  /** An enumeration that denotes the type of data this filter represents. */
  type: ShopifyStorefrontFilterType
  /** The list of values for this filter. */
  values: Array<ShopifyStorefrontFilterValue>
}

/**
 * The type of data that the filter group represents.
 *
 * For more information, refer to [Filter products in a collection with the Storefront API]
 * (https://shopify.dev/custom-storefronts/products-collections/filter-products).
 */
export enum ShopifyStorefrontFilterType {
  /** A list of selectable values. */
  List = 'LIST',
  /** A range of prices. */
  PriceRange = 'PRICE_RANGE',
}

/** A selectable value within a filter. */
export interface ShopifyStorefrontFilterValue {
  __typename: 'FilterValue'
  /** The number of results that match this filter value. */
  count: Scalars['Int']
  /** A unique identifier. */
  id: Scalars['String']
  /**
   * An input object that can be used to filter by this value on the parent field.
   *
   * The value is provided as a helper for building dynamic filtering UI. For example, if you have a list of selected `FilterValue` objects, you can combine their respective `input` values to use in a subsequent query.
   */
  input: Scalars['JSON']
  /** A human-friendly string for this filter value. */
  label: Scalars['String']
}

/** Represents a single fulfillment in an order. */
export interface ShopifyStorefrontFulfillment {
  __typename: 'Fulfillment'
  /** List of the fulfillment's line items. */
  fulfillmentLineItems: ShopifyStorefrontFulfillmentLineItemConnection
  /** The name of the tracking company. */
  trackingCompany?: Maybe<Scalars['String']>
  /**
   * Tracking information associated with the fulfillment,
   * such as the tracking number and tracking URL.
   */
  trackingInfo: Array<ShopifyStorefrontFulfillmentTrackingInfo>
}

/** Represents a single fulfillment in an order. */
export type ShopifyStorefrontFulfillmentFulfillmentLineItemsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** Represents a single fulfillment in an order. */
export type ShopifyStorefrontFulfillmentTrackingInfoArgs = {
  first?: Maybe<Scalars['Int']>
}

/** Represents a single line item in a fulfillment. There is at most one fulfillment line item for each order line item. */
export interface ShopifyStorefrontFulfillmentLineItem {
  __typename: 'FulfillmentLineItem'
  /** The associated order's line item. */
  lineItem: ShopifyStorefrontOrderLineItem
  /** The amount fulfilled in this fulfillment. */
  quantity: Scalars['Int']
}

/** An auto-generated type for paginating through multiple FulfillmentLineItems. */
export interface ShopifyStorefrontFulfillmentLineItemConnection {
  __typename: 'FulfillmentLineItemConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontFulfillmentLineItemEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one FulfillmentLineItem and a cursor during pagination. */
export interface ShopifyStorefrontFulfillmentLineItemEdge {
  __typename: 'FulfillmentLineItemEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of FulfillmentLineItemEdge. */
  node: ShopifyStorefrontFulfillmentLineItem
}

/** Tracking information associated with the fulfillment. */
export interface ShopifyStorefrontFulfillmentTrackingInfo {
  __typename: 'FulfillmentTrackingInfo'
  /** The tracking number of the fulfillment. */
  number?: Maybe<Scalars['String']>
  /** The URL to track the fulfillment. */
  url?: Maybe<Scalars['URL']>
}

/** The input fields used to specify a geographical location. */
export type ShopifyStorefrontGeoCoordinateInput = {
  /** The coordinate's latitude value. */
  latitude: Scalars['Float']
  /** The coordinate's longitude value. */
  longitude: Scalars['Float']
}

/** Represents information about the metafields associated to the specified resource. */
export type ShopifyStorefrontHasMetafields = {
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /**
   * A paginated list of metafields associated with the resource.
   * @deprecated As of 2022-07, the paginated `metafields` field has been repurposed to require a list of metafield identifiers.
   *
   */
  metafields: ShopifyStorefrontMetafieldConnection
}

/** Represents information about the metafields associated to the specified resource. */
export type ShopifyStorefrontHasMetafieldsMetafieldArgs = {
  namespace: Scalars['String']
  key: Scalars['String']
}

/** Represents information about the metafields associated to the specified resource. */
export type ShopifyStorefrontHasMetafieldsMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** Represents an image resource. */
export interface ShopifyStorefrontImage {
  __typename: 'Image'
  /** A word or phrase to share the nature or contents of an image. */
  altText?: Maybe<Scalars['String']>
  /** The original height of the image in pixels. Returns `null` if the image is not hosted by Shopify. */
  height?: Maybe<Scalars['Int']>
  /** A unique ID for the image. */
  id?: Maybe<Scalars['ID']>
  /**
   * The location of the original image as a URL.
   *
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   * @deprecated Use `url` instead.
   */
  originalSrc: Scalars['URL']
  /**
   * The location of the image as a URL.
   * @deprecated Use `url` instead.
   */
  src: Scalars['URL']
  /**
   * The location of the transformed image as a URL.
   *
   * All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
   * Otherwise any transformations which an image type does not support will be ignored.
   * @deprecated Use `url(transform:)` instead
   */
  transformedSrc: Scalars['URL']
  /**
   * The location of the image as a URL.
   *
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   *
   * All transformation options are considered "best-effort". Any transformation that the original image type doesn't support will be ignored.
   *
   * If you need multiple variations of the same image, then you can use [GraphQL aliases](https://graphql.org/learn/queries/#aliases).
   */
  url: Scalars['URL']
  /** The original width of the image in pixels. Returns `null` if the image is not hosted by Shopify. */
  width?: Maybe<Scalars['Int']>
}

/** Represents an image resource. */
export type ShopifyStorefrontImageTransformedSrcArgs = {
  maxWidth?: Maybe<Scalars['Int']>
  maxHeight?: Maybe<Scalars['Int']>
  crop?: Maybe<ShopifyStorefrontCropRegion>
  scale?: Maybe<Scalars['Int']>
  preferredContentType?: Maybe<ShopifyStorefrontImageContentType>
}

/** Represents an image resource. */
export type ShopifyStorefrontImageUrlArgs = {
  transform?: Maybe<ShopifyStorefrontImageTransformInput>
}

/** An auto-generated type for paginating through multiple Images. */
export interface ShopifyStorefrontImageConnection {
  __typename: 'ImageConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontImageEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** List of supported image content types. */
export enum ShopifyStorefrontImageContentType {
  /** A PNG image. */
  Png = 'PNG',
  /** A JPG image. */
  Jpg = 'JPG',
  /** A WEBP image. */
  Webp = 'WEBP',
}

/** An auto-generated type which holds one Image and a cursor during pagination. */
export interface ShopifyStorefrontImageEdge {
  __typename: 'ImageEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of ImageEdge. */
  node: ShopifyStorefrontImage
}

/**
 * The available options for transforming an image.
 *
 * All transformation options are considered best effort. Any transformation that the original image type doesn't support will be ignored.
 */
export type ShopifyStorefrontImageTransformInput = {
  /**
   * The region of the image to remain after cropping.
   * Must be used in conjunction with the `maxWidth` and/or `maxHeight` fields, where the `maxWidth` and `maxHeight` aren't equal.
   * The `crop` argument should coincide with the smaller value. A smaller `maxWidth` indicates a `LEFT` or `RIGHT` crop, while
   * a smaller `maxHeight` indicates a `TOP` or `BOTTOM` crop. For example, `{ maxWidth: 5, maxHeight: 10, crop: LEFT }` will result
   * in an image with a width of 5 and height of 10, where the right side of the image is removed.
   */
  crop?: Maybe<ShopifyStorefrontCropRegion>
  /** Image width in pixels between 1 and 5760. */
  maxWidth?: Maybe<Scalars['Int']>
  /** Image height in pixels between 1 and 5760. */
  maxHeight?: Maybe<Scalars['Int']>
  /** Image size multiplier for high-resolution retina displays. Must be within 1..3. */
  scale?: Maybe<Scalars['Int']>
  /**
   * Convert the source image into the preferred content type.
   * Supported conversions: `.svg` to `.png`, any file type to `.jpg`, and any file type to `.webp`.
   */
  preferredContentType?: Maybe<ShopifyStorefrontImageContentType>
}

/** Information about the localized experiences configured for the shop. */
export interface ShopifyStorefrontLocalization {
  __typename: 'Localization'
  /** The list of countries with enabled localized experiences. */
  availableCountries: Array<ShopifyStorefrontCountry>
  /** The country of the active localized experience. Use the `@inContext` directive to change this value. */
  country: ShopifyStorefrontCountry
}

/** Represents a location where product inventory is held. */
export interface ShopifyStorefrontLocation extends ShopifyStorefrontNode {
  __typename: 'Location'
  /** The address of the location. */
  address: ShopifyStorefrontLocationAddress
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The name of the location. */
  name: Scalars['String']
}

/** Represents the address of a location. */
export interface ShopifyStorefrontLocationAddress {
  __typename: 'LocationAddress'
  /** The first line of the address for the location. */
  address1?: Maybe<Scalars['String']>
  /** The second line of the address for the location. */
  address2?: Maybe<Scalars['String']>
  /** The city of the location. */
  city?: Maybe<Scalars['String']>
  /** The country of the location. */
  country?: Maybe<Scalars['String']>
  /** The country code of the location. */
  countryCode?: Maybe<Scalars['String']>
  /** A formatted version of the address for the location. */
  formatted: Array<Scalars['String']>
  /** The latitude coordinates of the location. */
  latitude?: Maybe<Scalars['Float']>
  /** The longitude coordinates of the location. */
  longitude?: Maybe<Scalars['Float']>
  /** The phone number of the location. */
  phone?: Maybe<Scalars['String']>
  /** The province of the location. */
  province?: Maybe<Scalars['String']>
  /** The code for the province, state, or district of the address of the location. */
  provinceCode?: Maybe<Scalars['String']>
  /** The ZIP code of the location. */
  zip?: Maybe<Scalars['String']>
}

/** An auto-generated type for paginating through multiple Locations. */
export interface ShopifyStorefrontLocationConnection {
  __typename: 'LocationConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontLocationEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one Location and a cursor during pagination. */
export interface ShopifyStorefrontLocationEdge {
  __typename: 'LocationEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of LocationEdge. */
  node: ShopifyStorefrontLocation
}

/** The set of valid sort keys for the Location query. */
export enum ShopifyStorefrontLocationSortKeys {
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `name` value. */
  Name = 'NAME',
  /** Sort by the `city` value. */
  City = 'CITY',
  /** Sort by the `distance` value. */
  Distance = 'DISTANCE',
}

/** Represents a mailing address for customers and shipping. */
export interface ShopifyStorefrontMailingAddress extends ShopifyStorefrontNode {
  __typename: 'MailingAddress'
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']>
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']>
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']>
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']>
  /** The name of the country. */
  country?: Maybe<Scalars['String']>
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   * @deprecated Use `countryCodeV2` instead.
   */
  countryCode?: Maybe<Scalars['String']>
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   */
  countryCodeV2?: Maybe<ShopifyStorefrontCountryCode>
  /** The first name of the customer. */
  firstName?: Maybe<Scalars['String']>
  /** A formatted version of the address, customized by the provided arguments. */
  formatted: Array<Scalars['String']>
  /** A comma-separated list of the values for city, province, and country. */
  formattedArea?: Maybe<Scalars['String']>
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The last name of the customer. */
  lastName?: Maybe<Scalars['String']>
  /** The latitude coordinate of the customer address. */
  latitude?: Maybe<Scalars['Float']>
  /** The longitude coordinate of the customer address. */
  longitude?: Maybe<Scalars['Float']>
  /** The full name of the customer, based on firstName and lastName. */
  name?: Maybe<Scalars['String']>
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone?: Maybe<Scalars['String']>
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']>
  /**
   * The two-letter code for the region.
   *
   * For example, ON.
   */
  provinceCode?: Maybe<Scalars['String']>
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']>
}

/** Represents a mailing address for customers and shipping. */
export type ShopifyStorefrontMailingAddressFormattedArgs = {
  withName?: Maybe<Scalars['Boolean']>
  withCompany?: Maybe<Scalars['Boolean']>
}

/** An auto-generated type for paginating through multiple MailingAddresses. */
export interface ShopifyStorefrontMailingAddressConnection {
  __typename: 'MailingAddressConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontMailingAddressEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one MailingAddress and a cursor during pagination. */
export interface ShopifyStorefrontMailingAddressEdge {
  __typename: 'MailingAddressEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of MailingAddressEdge. */
  node: ShopifyStorefrontMailingAddress
}

/** The input fields to create or update a mailing address. */
export type ShopifyStorefrontMailingAddressInput = {
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']>
  /** The second line of the address. Typically the number of the apartment, suite, or unit. */
  address2?: Maybe<Scalars['String']>
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']>
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']>
  /** The name of the country. */
  country?: Maybe<Scalars['String']>
  /** The first name of the customer. */
  firstName?: Maybe<Scalars['String']>
  /** The last name of the customer. */
  lastName?: Maybe<Scalars['String']>
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   */
  phone?: Maybe<Scalars['String']>
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']>
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']>
}

/** Manual discount applications capture the intentions of a discount that was manually created. */
export interface ShopifyStorefrontManualDiscountApplication
  extends ShopifyStorefrontDiscountApplication {
  __typename: 'ManualDiscountApplication'
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyStorefrontDiscountApplicationAllocationMethod
  /** The description of the application. */
  description?: Maybe<Scalars['String']>
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyStorefrontDiscountApplicationTargetSelection
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyStorefrontDiscountApplicationTargetType
  /** The title of the application. */
  title: Scalars['String']
  /** The value of the discount application. */
  value: ShopifyStorefrontPricingValue
}

/** Represents a media interface. */
export type ShopifyStorefrontMedia = {
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']>
  /** The media content type. */
  mediaContentType: ShopifyStorefrontMediaContentType
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyStorefrontImage>
}

/** An auto-generated type for paginating through multiple Media. */
export interface ShopifyStorefrontMediaConnection {
  __typename: 'MediaConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontMediaEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** The possible content types for a media object. */
export enum ShopifyStorefrontMediaContentType {
  /** An externally hosted video. */
  ExternalVideo = 'EXTERNAL_VIDEO',
  /** A Shopify hosted image. */
  Image = 'IMAGE',
  /** A 3d model. */
  Model_3D = 'MODEL_3D',
  /** A Shopify hosted video. */
  Video = 'VIDEO',
}

/** An auto-generated type which holds one Media and a cursor during pagination. */
export interface ShopifyStorefrontMediaEdge {
  __typename: 'MediaEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of MediaEdge. */
  node: ShopifyStorefrontMedia
}

/** Host for a Media Resource. */
export enum ShopifyStorefrontMediaHost {
  /** Host for YouTube embedded videos. */
  Youtube = 'YOUTUBE',
  /** Host for Vimeo embedded videos. */
  Vimeo = 'VIMEO',
}

/** Represents a Shopify hosted image. */
export interface ShopifyStorefrontMediaImage
  extends ShopifyStorefrontMedia,
    ShopifyStorefrontNode {
  __typename: 'MediaImage'
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']>
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The image for the media. */
  image?: Maybe<ShopifyStorefrontImage>
  /** The media content type. */
  mediaContentType: ShopifyStorefrontMediaContentType
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyStorefrontImage>
}

/** The merchandise to be purchased at checkout. */
export type ShopifyStorefrontMerchandise = ShopifyStorefrontProductVariant

/**
 * Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are
 * comprised of keys, values, and value types.
 */
export interface ShopifyStorefrontMetafield extends ShopifyStorefrontNode {
  __typename: 'Metafield'
  /** The date and time when the storefront metafield was created. */
  createdAt: Scalars['DateTime']
  /** The description of a metafield. */
  description?: Maybe<Scalars['String']>
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The unique identifier for the metafield within its namespace. */
  key: Scalars['String']
  /** The container for a group of metafields that the metafield is associated with. */
  namespace: Scalars['String']
  /** The type of resource that the metafield is attached to. */
  parentResource: ShopifyStorefrontMetafieldParentResource
  /** Returns a reference object if the metafield's type is a resource reference. */
  reference?: Maybe<ShopifyStorefrontMetafieldReference>
  /**
   * The type name of the metafield.
   * Refer to the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
   */
  type: Scalars['String']
  /** The date and time when the metafield was last updated. */
  updatedAt: Scalars['DateTime']
  /** The data stored in the metafield. Always stored as a string, regardless of the metafield's type. */
  value: Scalars['String']
  /**
   * Represents the metafield value type.
   * @deprecated `valueType` is deprecated and replaced by `type` in API version 2021-07.
   */
  valueType: ShopifyStorefrontMetafieldValueType
}

/** An auto-generated type for paginating through multiple Metafields. */
export interface ShopifyStorefrontMetafieldConnection {
  __typename: 'MetafieldConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontMetafieldEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one Metafield and a cursor during pagination. */
export interface ShopifyStorefrontMetafieldEdge {
  __typename: 'MetafieldEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of MetafieldEdge. */
  node: ShopifyStorefrontMetafield
}

/**
 * A filter used to view a subset of products in a collection matching a specific metafield value.
 *
 * Only the following metafield types are currently supported:
 * - `number_integer`
 * - `number_decimal`
 * - `single_line_text_field`
 * - `boolean` as of 2022-04.
 */
export type ShopifyStorefrontMetafieldFilter = {
  /** The namespace of the metafield to filter on. */
  namespace: Scalars['String']
  /** The key of the metafield to filter on. */
  key: Scalars['String']
  /** The value of the metafield. */
  value: Scalars['String']
}

/** A resource that the metafield belongs to. */
export type ShopifyStorefrontMetafieldParentResource =
  | ShopifyStorefrontArticle
  | ShopifyStorefrontBlog
  | ShopifyStorefrontCollection
  | ShopifyStorefrontCustomer
  | ShopifyStorefrontOrder
  | ShopifyStorefrontPage
  | ShopifyStorefrontProduct
  | ShopifyStorefrontProductVariant
  | ShopifyStorefrontShop

/** Returns the resource which is being referred to by a metafield. */
export type ShopifyStorefrontMetafieldReference =
  | ShopifyStorefrontMediaImage
  | ShopifyStorefrontPage
  | ShopifyStorefrontProduct
  | ShopifyStorefrontProductVariant

/** Metafield value types. */
export enum ShopifyStorefrontMetafieldValueType {
  /** A string metafield. */
  String = 'STRING',
  /** An integer metafield. */
  Integer = 'INTEGER',
  /** A json string metafield. */
  JsonString = 'JSON_STRING',
  /** A boolean metafield. */
  Boolean = 'BOOLEAN',
}

/** Represents a Shopify hosted 3D model. */
export interface ShopifyStorefrontModel3d
  extends ShopifyStorefrontMedia,
    ShopifyStorefrontNode {
  __typename: 'Model3d'
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']>
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The media content type. */
  mediaContentType: ShopifyStorefrontMediaContentType
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyStorefrontImage>
  /** The sources for a 3d model. */
  sources: Array<ShopifyStorefrontModel3dSource>
}

/** Represents a source for a Shopify hosted 3d model. */
export interface ShopifyStorefrontModel3dSource {
  __typename: 'Model3dSource'
  /** The filesize of the 3d model. */
  filesize: Scalars['Int']
  /** The format of the 3d model. */
  format: Scalars['String']
  /** The MIME type of the 3d model. */
  mimeType: Scalars['String']
  /** The URL of the 3d model. */
  url: Scalars['String']
}

/** The input fields for a monetary value with currency. */
export type ShopifyStorefrontMoneyInput = {
  /** Decimal money amount. */
  amount: Scalars['Decimal']
  /** Currency of the money. */
  currencyCode: ShopifyStorefrontCurrencyCode
}

/** A monetary value with currency. */
export interface ShopifyStorefrontMoneyV2 {
  __typename: 'MoneyV2'
  /** Decimal money amount. */
  amount: Scalars['Decimal']
  /** Currency of the money. */
  currencyCode: ShopifyStorefrontCurrencyCode
}

/** An auto-generated type for paginating through multiple MoneyV2s. */
export interface ShopifyStorefrontMoneyV2Connection {
  __typename: 'MoneyV2Connection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontMoneyV2Edge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one MoneyV2 and a cursor during pagination. */
export interface ShopifyStorefrontMoneyV2Edge {
  __typename: 'MoneyV2Edge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of MoneyV2Edge. */
  node: ShopifyStorefrontMoneyV2
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export interface ShopifyStorefrontMutation {
  __typename: 'Mutation'
  /** Updates the attributes on a cart. */
  cartAttributesUpdate?: Maybe<ShopifyStorefrontCartAttributesUpdatePayload>
  /**
   * Updates customer information associated with a cart.
   * Buyer identity is used to determine
   * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
   * and should match the customer's shipping address.
   */
  cartBuyerIdentityUpdate?: Maybe<ShopifyStorefrontCartBuyerIdentityUpdatePayload>
  /** Creates a new cart. */
  cartCreate?: Maybe<ShopifyStorefrontCartCreatePayload>
  /** Updates the discount codes applied to the cart. */
  cartDiscountCodesUpdate?: Maybe<ShopifyStorefrontCartDiscountCodesUpdatePayload>
  /** Adds a merchandise line to the cart. */
  cartLinesAdd?: Maybe<ShopifyStorefrontCartLinesAddPayload>
  /** Removes one or more merchandise lines from the cart. */
  cartLinesRemove?: Maybe<ShopifyStorefrontCartLinesRemovePayload>
  /** Updates one or more merchandise lines on a cart. */
  cartLinesUpdate?: Maybe<ShopifyStorefrontCartLinesUpdatePayload>
  /** Updates the note on the cart. */
  cartNoteUpdate?: Maybe<ShopifyStorefrontCartNoteUpdatePayload>
  /**
   * Updates the attributes of a checkout if `allowPartialAddresses` is `true`.
   * @deprecated Use `checkoutAttributesUpdateV2` instead.
   */
  checkoutAttributesUpdate?: Maybe<ShopifyStorefrontCheckoutAttributesUpdatePayload>
  /** Updates the attributes of a checkout if `allowPartialAddresses` is `true`. */
  checkoutAttributesUpdateV2?: Maybe<ShopifyStorefrontCheckoutAttributesUpdateV2Payload>
  /** Completes a checkout without providing payment information. You can use this mutation for free items or items whose purchase price is covered by a gift card. */
  checkoutCompleteFree?: Maybe<ShopifyStorefrontCheckoutCompleteFreePayload>
  /**
   * Completes a checkout using a credit card token from Shopify's Vault.
   * @deprecated Use `checkoutCompleteWithCreditCardV2` instead.
   */
  checkoutCompleteWithCreditCard?: Maybe<ShopifyStorefrontCheckoutCompleteWithCreditCardPayload>
  /** Completes a checkout using a credit card token from Shopify's card vault. Before you can complete checkouts using CheckoutCompleteWithCreditCardV2, you need to  [_request payment processing_](https://shopify.dev/apps/channels/getting-started#request-payment-processing). */
  checkoutCompleteWithCreditCardV2?: Maybe<ShopifyStorefrontCheckoutCompleteWithCreditCardV2Payload>
  /**
   * Completes a checkout with a tokenized payment.
   * @deprecated Use `checkoutCompleteWithTokenizedPaymentV2` instead.
   */
  checkoutCompleteWithTokenizedPayment?: Maybe<ShopifyStorefrontCheckoutCompleteWithTokenizedPaymentPayload>
  /**
   * Completes a checkout with a tokenized payment.
   * @deprecated Use `checkoutCompleteWithTokenizedPaymentV3` instead.
   */
  checkoutCompleteWithTokenizedPaymentV2?: Maybe<ShopifyStorefrontCheckoutCompleteWithTokenizedPaymentV2Payload>
  /** Completes a checkout with a tokenized payment. */
  checkoutCompleteWithTokenizedPaymentV3?: Maybe<ShopifyStorefrontCheckoutCompleteWithTokenizedPaymentV3Payload>
  /** Creates a new checkout. */
  checkoutCreate?: Maybe<ShopifyStorefrontCheckoutCreatePayload>
  /**
   * Associates a customer to the checkout.
   * @deprecated Use `checkoutCustomerAssociateV2` instead.
   */
  checkoutCustomerAssociate?: Maybe<ShopifyStorefrontCheckoutCustomerAssociatePayload>
  /** Associates a customer to the checkout. */
  checkoutCustomerAssociateV2?: Maybe<ShopifyStorefrontCheckoutCustomerAssociateV2Payload>
  /**
   * Disassociates the current checkout customer from the checkout.
   * @deprecated Use `checkoutCustomerDisassociateV2` instead.
   */
  checkoutCustomerDisassociate?: Maybe<ShopifyStorefrontCheckoutCustomerDisassociatePayload>
  /** Disassociates the current checkout customer from the checkout. */
  checkoutCustomerDisassociateV2?: Maybe<ShopifyStorefrontCheckoutCustomerDisassociateV2Payload>
  /**
   * Applies a discount to an existing checkout using a discount code.
   * @deprecated Use `checkoutDiscountCodeApplyV2` instead.
   */
  checkoutDiscountCodeApply?: Maybe<ShopifyStorefrontCheckoutDiscountCodeApplyPayload>
  /** Applies a discount to an existing checkout using a discount code. */
  checkoutDiscountCodeApplyV2?: Maybe<ShopifyStorefrontCheckoutDiscountCodeApplyV2Payload>
  /** Removes the applied discounts from an existing checkout. */
  checkoutDiscountCodeRemove?: Maybe<ShopifyStorefrontCheckoutDiscountCodeRemovePayload>
  /**
   * Updates the email on an existing checkout.
   * @deprecated Use `checkoutEmailUpdateV2` instead.
   */
  checkoutEmailUpdate?: Maybe<ShopifyStorefrontCheckoutEmailUpdatePayload>
  /** Updates the email on an existing checkout. */
  checkoutEmailUpdateV2?: Maybe<ShopifyStorefrontCheckoutEmailUpdateV2Payload>
  /**
   * Applies a gift card to an existing checkout using a gift card code. This will replace all currently applied gift cards.
   * @deprecated Use `checkoutGiftCardsAppend` instead.
   */
  checkoutGiftCardApply?: Maybe<ShopifyStorefrontCheckoutGiftCardApplyPayload>
  /**
   * Removes an applied gift card from the checkout.
   * @deprecated Use `checkoutGiftCardRemoveV2` instead.
   */
  checkoutGiftCardRemove?: Maybe<ShopifyStorefrontCheckoutGiftCardRemovePayload>
  /** Removes an applied gift card from the checkout. */
  checkoutGiftCardRemoveV2?: Maybe<ShopifyStorefrontCheckoutGiftCardRemoveV2Payload>
  /** Appends gift cards to an existing checkout. */
  checkoutGiftCardsAppend?: Maybe<ShopifyStorefrontCheckoutGiftCardsAppendPayload>
  /** Adds a list of line items to a checkout. */
  checkoutLineItemsAdd?: Maybe<ShopifyStorefrontCheckoutLineItemsAddPayload>
  /** Removes line items from an existing checkout. */
  checkoutLineItemsRemove?: Maybe<ShopifyStorefrontCheckoutLineItemsRemovePayload>
  /** Sets a list of line items to a checkout. */
  checkoutLineItemsReplace?: Maybe<ShopifyStorefrontCheckoutLineItemsReplacePayload>
  /** Updates line items on a checkout. */
  checkoutLineItemsUpdate?: Maybe<ShopifyStorefrontCheckoutLineItemsUpdatePayload>
  /**
   * Updates the shipping address of an existing checkout.
   * @deprecated Use `checkoutShippingAddressUpdateV2` instead.
   */
  checkoutShippingAddressUpdate?: Maybe<ShopifyStorefrontCheckoutShippingAddressUpdatePayload>
  /** Updates the shipping address of an existing checkout. */
  checkoutShippingAddressUpdateV2?: Maybe<ShopifyStorefrontCheckoutShippingAddressUpdateV2Payload>
  /** Updates the shipping lines on an existing checkout. */
  checkoutShippingLineUpdate?: Maybe<ShopifyStorefrontCheckoutShippingLineUpdatePayload>
  /**
   * Creates a customer access token.
   * The customer access token is required to modify the customer object in any way.
   */
  customerAccessTokenCreate?: Maybe<ShopifyStorefrontCustomerAccessTokenCreatePayload>
  /**
   * Creates a customer access token using a
   * [multipass token](https://shopify.dev/api/multipass) instead of email and
   * password. A customer record is created if the customer doesn't exist. If a customer
   * record already exists but the record is disabled, then the customer record is enabled.
   */
  customerAccessTokenCreateWithMultipass?: Maybe<ShopifyStorefrontCustomerAccessTokenCreateWithMultipassPayload>
  /** Permanently destroys a customer access token. */
  customerAccessTokenDelete?: Maybe<ShopifyStorefrontCustomerAccessTokenDeletePayload>
  /**
   * Renews a customer access token.
   *
   * Access token renewal must happen *before* a token expires.
   * If a token has already expired, a new one should be created instead via `customerAccessTokenCreate`.
   */
  customerAccessTokenRenew?: Maybe<ShopifyStorefrontCustomerAccessTokenRenewPayload>
  /** Activates a customer. */
  customerActivate?: Maybe<ShopifyStorefrontCustomerActivatePayload>
  /** Activates a customer with the activation url received from `customerCreate`. */
  customerActivateByUrl?: Maybe<ShopifyStorefrontCustomerActivateByUrlPayload>
  /** Creates a new address for a customer. */
  customerAddressCreate?: Maybe<ShopifyStorefrontCustomerAddressCreatePayload>
  /** Permanently deletes the address of an existing customer. */
  customerAddressDelete?: Maybe<ShopifyStorefrontCustomerAddressDeletePayload>
  /** Updates the address of an existing customer. */
  customerAddressUpdate?: Maybe<ShopifyStorefrontCustomerAddressUpdatePayload>
  /** Creates a new customer. */
  customerCreate?: Maybe<ShopifyStorefrontCustomerCreatePayload>
  /** Updates the default address of an existing customer. */
  customerDefaultAddressUpdate?: Maybe<ShopifyStorefrontCustomerDefaultAddressUpdatePayload>
  /**
   * Sends a reset password email to the customer. The reset password
   * email contains a reset password URL and token that you can pass to
   * the [`customerResetByUrl`](https://shopify.dev/api/storefront/latest/mutations/customerResetByUrl) or
   * [`customerReset`](https://shopify.dev/api/storefront/latest/mutations/customerReset) mutation to reset the
   * customer password.
   *
   * This mutation is throttled by IP. With authenticated access,
   * you can provide a [`Shopify-Storefront-Buyer-IP`](https://shopify.dev/api/usage/authentication#optional-ip-header) instead of the request IP.
   *
   * Make sure that the value provided to `Shopify-Storefront-Buyer-IP` is trusted. Unthrottled access to this
   * mutation presents a security risk.
   */
  customerRecover?: Maybe<ShopifyStorefrontCustomerRecoverPayload>
  /** "Resets a customer’s password with the token received from a reset password email. You can send a reset password email with the [`customerRecover`](https://shopify.dev/api/storefront/latest/mutations/customerRecover) mutation." */
  customerReset?: Maybe<ShopifyStorefrontCustomerResetPayload>
  /** "Resets a customer’s password with the reset password URL received from a reset password email. You can send a reset password email with the [`customerRecover`](https://shopify.dev/api/storefront/latest/mutations/customerRecover) mutation." */
  customerResetByUrl?: Maybe<ShopifyStorefrontCustomerResetByUrlPayload>
  /** Updates an existing customer. */
  customerUpdate?: Maybe<ShopifyStorefrontCustomerUpdatePayload>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartAttributesUpdateArgs = {
  attributes: Array<ShopifyStorefrontAttributeInput>
  cartId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartBuyerIdentityUpdateArgs = {
  cartId: Scalars['ID']
  buyerIdentity: ShopifyStorefrontCartBuyerIdentityInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartCreateArgs = {
  input?: Maybe<ShopifyStorefrontCartInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartDiscountCodesUpdateArgs = {
  cartId: Scalars['ID']
  discountCodes?: Maybe<Array<Scalars['String']>>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartLinesAddArgs = {
  lines: Array<ShopifyStorefrontCartLineInput>
  cartId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartLinesRemoveArgs = {
  cartId: Scalars['ID']
  lineIds: Array<Scalars['ID']>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartLinesUpdateArgs = {
  cartId: Scalars['ID']
  lines: Array<ShopifyStorefrontCartLineUpdateInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartNoteUpdateArgs = {
  cartId: Scalars['ID']
  note?: Maybe<Scalars['String']>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutAttributesUpdateArgs = {
  checkoutId: Scalars['ID']
  input: ShopifyStorefrontCheckoutAttributesUpdateInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutAttributesUpdateV2Args = {
  checkoutId: Scalars['ID']
  input: ShopifyStorefrontCheckoutAttributesUpdateV2Input
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCompleteFreeArgs = {
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCompleteWithCreditCardArgs = {
  checkoutId: Scalars['ID']
  payment: ShopifyStorefrontCreditCardPaymentInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCompleteWithCreditCardV2Args = {
  checkoutId: Scalars['ID']
  payment: ShopifyStorefrontCreditCardPaymentInputV2
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCompleteWithTokenizedPaymentArgs =
  {
    checkoutId: Scalars['ID']
    payment: ShopifyStorefrontTokenizedPaymentInput
  }

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCompleteWithTokenizedPaymentV2Args =
  {
    checkoutId: Scalars['ID']
    payment: ShopifyStorefrontTokenizedPaymentInputV2
  }

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCompleteWithTokenizedPaymentV3Args =
  {
    checkoutId: Scalars['ID']
    payment: ShopifyStorefrontTokenizedPaymentInputV3
  }

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCreateArgs = {
  input: ShopifyStorefrontCheckoutCreateInput
  queueToken?: Maybe<Scalars['String']>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCustomerAssociateArgs = {
  checkoutId: Scalars['ID']
  customerAccessToken: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCustomerAssociateV2Args = {
  checkoutId: Scalars['ID']
  customerAccessToken: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCustomerDisassociateArgs = {
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCustomerDisassociateV2Args = {
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutDiscountCodeApplyArgs = {
  discountCode: Scalars['String']
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutDiscountCodeApplyV2Args = {
  discountCode: Scalars['String']
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutDiscountCodeRemoveArgs = {
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutEmailUpdateArgs = {
  checkoutId: Scalars['ID']
  email: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutEmailUpdateV2Args = {
  checkoutId: Scalars['ID']
  email: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutGiftCardApplyArgs = {
  giftCardCode: Scalars['String']
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutGiftCardRemoveArgs = {
  appliedGiftCardId: Scalars['ID']
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutGiftCardRemoveV2Args = {
  appliedGiftCardId: Scalars['ID']
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutGiftCardsAppendArgs = {
  giftCardCodes: Array<Scalars['String']>
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutLineItemsAddArgs = {
  lineItems: Array<ShopifyStorefrontCheckoutLineItemInput>
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutLineItemsRemoveArgs = {
  checkoutId: Scalars['ID']
  lineItemIds: Array<Scalars['ID']>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutLineItemsReplaceArgs = {
  lineItems: Array<ShopifyStorefrontCheckoutLineItemInput>
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutLineItemsUpdateArgs = {
  checkoutId: Scalars['ID']
  lineItems: Array<ShopifyStorefrontCheckoutLineItemUpdateInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutShippingAddressUpdateArgs = {
  shippingAddress: ShopifyStorefrontMailingAddressInput
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutShippingAddressUpdateV2Args = {
  shippingAddress: ShopifyStorefrontMailingAddressInput
  checkoutId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutShippingLineUpdateArgs = {
  checkoutId: Scalars['ID']
  shippingRateHandle: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAccessTokenCreateArgs = {
  input: ShopifyStorefrontCustomerAccessTokenCreateInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAccessTokenCreateWithMultipassArgs =
  {
    multipassToken: Scalars['String']
  }

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAccessTokenDeleteArgs = {
  customerAccessToken: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAccessTokenRenewArgs = {
  customerAccessToken: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerActivateArgs = {
  id: Scalars['ID']
  input: ShopifyStorefrontCustomerActivateInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerActivateByUrlArgs = {
  activationUrl: Scalars['URL']
  password: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAddressCreateArgs = {
  customerAccessToken: Scalars['String']
  address: ShopifyStorefrontMailingAddressInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAddressDeleteArgs = {
  id: Scalars['ID']
  customerAccessToken: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAddressUpdateArgs = {
  customerAccessToken: Scalars['String']
  id: Scalars['ID']
  address: ShopifyStorefrontMailingAddressInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerCreateArgs = {
  input: ShopifyStorefrontCustomerCreateInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerDefaultAddressUpdateArgs = {
  customerAccessToken: Scalars['String']
  addressId: Scalars['ID']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerRecoverArgs = {
  email: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerResetArgs = {
  id: Scalars['ID']
  input: ShopifyStorefrontCustomerResetInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerResetByUrlArgs = {
  resetUrl: Scalars['URL']
  password: Scalars['String']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerUpdateArgs = {
  customerAccessToken: Scalars['String']
  customer: ShopifyStorefrontCustomerUpdateInput
}

/**
 * An object with an ID field to support global identification, in accordance with the
 * [Relay specification](https://relay.dev/graphql/objectidentification.htm#sec-Node-Interface).
 * This interface is used by the [node](https://shopify.dev/api/admin-graphql/unstable/queries/node)
 * and [nodes](https://shopify.dev/api/admin-graphql/unstable/queries/nodes) queries.
 */
export type ShopifyStorefrontNode = {
  /** A globally-unique ID. */
  id: Scalars['ID']
}

/** Represents a resource that can be published to the Online Store sales channel. */
export type ShopifyStorefrontOnlineStorePublishable = {
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']>
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export interface ShopifyStorefrontOrder
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode {
  __typename: 'Order'
  /** The reason for the order's cancellation. Returns `null` if the order wasn't canceled. */
  cancelReason?: Maybe<ShopifyStorefrontOrderCancelReason>
  /** The date and time when the order was canceled. Returns null if the order wasn't canceled. */
  canceledAt?: Maybe<Scalars['DateTime']>
  /** The code of the currency used for the payment. */
  currencyCode: ShopifyStorefrontCurrencyCode
  /** The subtotal of line items and their discounts, excluding line items that have been removed. Does not contain order-level discounts, duties, shipping costs, or shipping discounts. Taxes are not included unless the order is a taxes-included order. */
  currentSubtotalPrice: ShopifyStorefrontMoneyV2
  /** The total cost of duties for the order, including refunds. */
  currentTotalDuties?: Maybe<ShopifyStorefrontMoneyV2>
  /** The total amount of the order, including duties, taxes and discounts, minus amounts for line items that have been removed. */
  currentTotalPrice: ShopifyStorefrontMoneyV2
  /** The total of all taxes applied to the order, excluding taxes for returned line items. */
  currentTotalTax: ShopifyStorefrontMoneyV2
  /** The locale code in which this specific order happened. */
  customerLocale?: Maybe<Scalars['String']>
  /** The unique URL that the customer can use to access the order. */
  customerUrl?: Maybe<Scalars['URL']>
  /** Discounts that have been applied on the order. */
  discountApplications: ShopifyStorefrontDiscountApplicationConnection
  /** Whether the order has had any edits applied or not. */
  edited: Scalars['Boolean']
  /** The customer's email address. */
  email?: Maybe<Scalars['String']>
  /** The financial status of the order. */
  financialStatus?: Maybe<ShopifyStorefrontOrderFinancialStatus>
  /** The fulfillment status for the order. */
  fulfillmentStatus: ShopifyStorefrontOrderFulfillmentStatus
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** List of the order’s line items. */
  lineItems: ShopifyStorefrontOrderLineItemConnection
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /**
   * A paginated list of metafields associated with the resource.
   * @deprecated As of 2022-07, the paginated `metafields` field has been repurposed to require a list of metafield identifiers.
   *
   */
  metafields: ShopifyStorefrontMetafieldConnection
  /**
   * Unique identifier for the order that appears on the order.
   * For example, _#1000_ or _Store1001.
   */
  name: Scalars['String']
  /** A unique numeric identifier for the order for use by shop owner and customer. */
  orderNumber: Scalars['Int']
  /** The total cost of duties charged at checkout. */
  originalTotalDuties?: Maybe<ShopifyStorefrontMoneyV2>
  /** The total price of the order before any applied edits. */
  originalTotalPrice: ShopifyStorefrontMoneyV2
  /** The customer's phone number for receiving SMS notifications. */
  phone?: Maybe<Scalars['String']>
  /**
   * The date and time when the order was imported.
   * This value can be set to dates in the past when importing from other systems.
   * If no value is provided, it will be auto-generated based on current date and time.
   */
  processedAt: Scalars['DateTime']
  /** The address to where the order will be shipped. */
  shippingAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /** The discounts that have been allocated onto the shipping line by discount applications. */
  shippingDiscountAllocations: Array<ShopifyStorefrontDiscountAllocation>
  /** The unique URL for the order's status page. */
  statusUrl: Scalars['URL']
  /**
   * Price of the order before shipping and taxes.
   * @deprecated Use `subtotalPriceV2` instead.
   */
  subtotalPrice?: Maybe<Scalars['Money']>
  /** Price of the order before duties, shipping and taxes. */
  subtotalPriceV2?: Maybe<ShopifyStorefrontMoneyV2>
  /** List of the order’s successful fulfillments. */
  successfulFulfillments?: Maybe<Array<ShopifyStorefrontFulfillment>>
  /**
   * The sum of all the prices of all the items in the order, taxes and discounts included (must be positive).
   * @deprecated Use `totalPriceV2` instead.
   */
  totalPrice: Scalars['Money']
  /** The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive). */
  totalPriceV2: ShopifyStorefrontMoneyV2
  /**
   * The total amount that has been refunded.
   * @deprecated Use `totalRefundedV2` instead.
   */
  totalRefunded: Scalars['Money']
  /** The total amount that has been refunded. */
  totalRefundedV2: ShopifyStorefrontMoneyV2
  /**
   * The total cost of shipping.
   * @deprecated Use `totalShippingPriceV2` instead.
   */
  totalShippingPrice: Scalars['Money']
  /** The total cost of shipping. */
  totalShippingPriceV2: ShopifyStorefrontMoneyV2
  /**
   * The total cost of taxes.
   * @deprecated Use `totalTaxV2` instead.
   */
  totalTax?: Maybe<Scalars['Money']>
  /** The total cost of taxes. */
  totalTaxV2?: Maybe<ShopifyStorefrontMoneyV2>
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyStorefrontOrderDiscountApplicationsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyStorefrontOrderLineItemsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyStorefrontOrderMetafieldArgs = {
  namespace: Scalars['String']
  key: Scalars['String']
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyStorefrontOrderMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyStorefrontOrderSuccessfulFulfillmentsArgs = {
  first?: Maybe<Scalars['Int']>
}

/** Represents the reason for the order's cancellation. */
export enum ShopifyStorefrontOrderCancelReason {
  /** The customer wanted to cancel the order. */
  Customer = 'CUSTOMER',
  /** Payment was declined. */
  Declined = 'DECLINED',
  /** The order was fraudulent. */
  Fraud = 'FRAUD',
  /** There was insufficient inventory. */
  Inventory = 'INVENTORY',
  /** The order was canceled for an unlisted reason. */
  Other = 'OTHER',
}

/** An auto-generated type for paginating through multiple Orders. */
export interface ShopifyStorefrontOrderConnection {
  __typename: 'OrderConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontOrderEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one Order and a cursor during pagination. */
export interface ShopifyStorefrontOrderEdge {
  __typename: 'OrderEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of OrderEdge. */
  node: ShopifyStorefrontOrder
}

/** Represents the order's current financial status. */
export enum ShopifyStorefrontOrderFinancialStatus {
  /** Displayed as **Pending**. */
  Pending = 'PENDING',
  /** Displayed as **Authorized**. */
  Authorized = 'AUTHORIZED',
  /** Displayed as **Partially paid**. */
  PartiallyPaid = 'PARTIALLY_PAID',
  /** Displayed as **Partially refunded**. */
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  /** Displayed as **Voided**. */
  Voided = 'VOIDED',
  /** Displayed as **Paid**. */
  Paid = 'PAID',
  /** Displayed as **Refunded**. */
  Refunded = 'REFUNDED',
}

/** Represents the order's aggregated fulfillment status for display purposes. */
export enum ShopifyStorefrontOrderFulfillmentStatus {
  /** Displayed as **Unfulfilled**. None of the items in the order have been fulfilled. */
  Unfulfilled = 'UNFULFILLED',
  /** Displayed as **Partially fulfilled**. Some of the items in the order have been fulfilled. */
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  /** Displayed as **Fulfilled**. All of the items in the order have been fulfilled. */
  Fulfilled = 'FULFILLED',
  /** Displayed as **Restocked**. All of the items in the order have been restocked. Replaced by "UNFULFILLED" status. */
  Restocked = 'RESTOCKED',
  /** Displayed as **Pending fulfillment**. A request for fulfillment of some items awaits a response from the fulfillment service. Replaced by "IN_PROGRESS" status. */
  PendingFulfillment = 'PENDING_FULFILLMENT',
  /** Displayed as **Open**. None of the items in the order have been fulfilled. Replaced by "UNFULFILLED" status. */
  Open = 'OPEN',
  /** Displayed as **In progress**. Some of the items in the order have been fulfilled, or a request for fulfillment has been sent to the fulfillment service. */
  InProgress = 'IN_PROGRESS',
  /** Displayed as **On hold**. All of the unfulfilled items in this order are on hold. */
  OnHold = 'ON_HOLD',
  /** Displayed as **Scheduled**. All of the unfulfilled items in this order are scheduled for fulfillment at later time. */
  Scheduled = 'SCHEDULED',
}

/** Represents a single line in an order. There is one line item for each distinct product variant. */
export interface ShopifyStorefrontOrderLineItem {
  __typename: 'OrderLineItem'
  /** The number of entries associated to the line item minus the items that have been removed. */
  currentQuantity: Scalars['Int']
  /** List of custom attributes associated to the line item. */
  customAttributes: Array<ShopifyStorefrontAttribute>
  /** The discounts that have been allocated onto the order line item by discount applications. */
  discountAllocations: Array<ShopifyStorefrontDiscountAllocation>
  /** The total price of the line item, including discounts, and displayed in the presentment currency. */
  discountedTotalPrice: ShopifyStorefrontMoneyV2
  /** The total price of the line item, not including any discounts. The total price is calculated using the original unit price multiplied by the quantity, and it is displayed in the presentment currency. */
  originalTotalPrice: ShopifyStorefrontMoneyV2
  /** The number of products variants associated to the line item. */
  quantity: Scalars['Int']
  /** The title of the product combined with title of the variant. */
  title: Scalars['String']
  /** The product variant object associated to the line item. */
  variant?: Maybe<ShopifyStorefrontProductVariant>
}

/** An auto-generated type for paginating through multiple OrderLineItems. */
export interface ShopifyStorefrontOrderLineItemConnection {
  __typename: 'OrderLineItemConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontOrderLineItemEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one OrderLineItem and a cursor during pagination. */
export interface ShopifyStorefrontOrderLineItemEdge {
  __typename: 'OrderLineItemEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of OrderLineItemEdge. */
  node: ShopifyStorefrontOrderLineItem
}

/** The set of valid sort keys for the Order query. */
export enum ShopifyStorefrontOrderSortKeys {
  /** Sort by the `processed_at` value. */
  ProcessedAt = 'PROCESSED_AT',
  /** Sort by the `total_price` value. */
  TotalPrice = 'TOTAL_PRICE',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  Relevance = 'RELEVANCE',
}

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export interface ShopifyStorefrontPage
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode,
    ShopifyStorefrontOnlineStorePublishable {
  __typename: 'Page'
  /** The description of the page, complete with HTML formatting. */
  body: Scalars['HTML']
  /** Summary of the page body. */
  bodySummary: Scalars['String']
  /** The timestamp of the page creation. */
  createdAt: Scalars['DateTime']
  /** A human-friendly unique string for the page automatically generated from its title. */
  handle: Scalars['String']
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /**
   * A paginated list of metafields associated with the resource.
   * @deprecated As of 2022-07, the paginated `metafields` field has been repurposed to require a list of metafield identifiers.
   *
   */
  metafields: ShopifyStorefrontMetafieldConnection
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']>
  /** The page's SEO information. */
  seo?: Maybe<ShopifyStorefrontSeo>
  /** The title of the page. */
  title: Scalars['String']
  /** The timestamp of the latest page update. */
  updatedAt: Scalars['DateTime']
  /**
   * The url pointing to the page accessible from the web.
   * @deprecated Use `onlineStoreUrl` instead.
   */
  url: Scalars['URL']
}

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type ShopifyStorefrontPageMetafieldArgs = {
  namespace: Scalars['String']
  key: Scalars['String']
}

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type ShopifyStorefrontPageMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** An auto-generated type for paginating through multiple Pages. */
export interface ShopifyStorefrontPageConnection {
  __typename: 'PageConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontPageEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one Page and a cursor during pagination. */
export interface ShopifyStorefrontPageEdge {
  __typename: 'PageEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of PageEdge. */
  node: ShopifyStorefrontPage
}

/**
 * Returns information about pagination in a connection, in accordance with the
 * [Relay specification](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo).
 * For more information, please read our [GraphQL Pagination Usage Guide](https://shopify.dev/api/usage/pagination-graphql).
 */
export interface ShopifyStorefrontPageInfo {
  __typename: 'PageInfo'
  /** Whether there are more pages to fetch following the current page. */
  hasNextPage: Scalars['Boolean']
  /** Whether there are any pages prior to the current page. */
  hasPreviousPage: Scalars['Boolean']
}

/** The set of valid sort keys for the Page query. */
export enum ShopifyStorefrontPageSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  Relevance = 'RELEVANCE',
}

/** A payment applied to a checkout. */
export interface ShopifyStorefrontPayment extends ShopifyStorefrontNode {
  __typename: 'Payment'
  /**
   * The amount of the payment.
   * @deprecated Use `amountV2` instead.
   */
  amount: Scalars['Money']
  /** The amount of the payment. */
  amountV2: ShopifyStorefrontMoneyV2
  /** The billing address for the payment. */
  billingAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /** The checkout to which the payment belongs. */
  checkout: ShopifyStorefrontCheckout
  /** The credit card used for the payment in the case of direct payments. */
  creditCard?: Maybe<ShopifyStorefrontCreditCard>
  /** A message describing a processing error during asynchronous processing. */
  errorMessage?: Maybe<Scalars['String']>
  /** A globally-unique ID. */
  id: Scalars['ID']
  /**
   * A client-side generated token to identify a payment and perform idempotent operations.
   * For more information, refer to
   * [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests).
   */
  idempotencyKey?: Maybe<Scalars['String']>
  /** The URL where the customer needs to be redirected so they can complete the 3D Secure payment flow. */
  nextActionUrl?: Maybe<Scalars['URL']>
  /** Whether the payment is still processing asynchronously. */
  ready: Scalars['Boolean']
  /** A flag to indicate if the payment is to be done in test mode for gateways that support it. */
  test: Scalars['Boolean']
  /** The actual transaction recorded by Shopify after having processed the payment with the gateway. */
  transaction?: Maybe<ShopifyStorefrontTransaction>
}

/** Settings related to payments. */
export interface ShopifyStorefrontPaymentSettings {
  __typename: 'PaymentSettings'
  /** List of the card brands which the shop accepts. */
  acceptedCardBrands: Array<ShopifyStorefrontCardBrand>
  /** The url pointing to the endpoint to vault credit cards. */
  cardVaultUrl: Scalars['URL']
  /** The country where the shop is located. */
  countryCode: ShopifyStorefrontCountryCode
  /** The three-letter code for the shop's primary currency. */
  currencyCode: ShopifyStorefrontCurrencyCode
  /** A list of enabled currencies (ISO 4217 format) that the shop accepts. Merchants can enable currencies from their Shopify Payments settings in the Shopify admin. */
  enabledPresentmentCurrencies: Array<ShopifyStorefrontCurrencyCode>
  /** The shop’s Shopify Payments account ID. */
  shopifyPaymentsAccountId?: Maybe<Scalars['String']>
  /** List of the digital wallets which the shop supports. */
  supportedDigitalWallets: Array<ShopifyStorefrontDigitalWallet>
}

/** The valid values for the types of payment token. */
export enum ShopifyStorefrontPaymentTokenType {
  /** Apple Pay token type. */
  ApplePay = 'APPLE_PAY',
  /** Vault payment token type. */
  Vault = 'VAULT',
  /** Shopify Pay token type. */
  ShopifyPay = 'SHOPIFY_PAY',
  /** Google Pay token type. */
  GooglePay = 'GOOGLE_PAY',
  /** Stripe token type. */
  StripeVaultToken = 'STRIPE_VAULT_TOKEN',
}

/** The input fields for a filter used to view a subset of products in a collection matching a specific price range. */
export type ShopifyStorefrontPriceRangeFilter = {
  /** The minimum price in the range. Defaults to zero. */
  min?: Maybe<Scalars['Float']>
  /** The maximum price in the range. Empty indicates no max price. */
  max?: Maybe<Scalars['Float']>
}

/** The value of the percentage pricing object. */
export interface ShopifyStorefrontPricingPercentageValue {
  __typename: 'PricingPercentageValue'
  /** The percentage value of the object. */
  percentage: Scalars['Float']
}

/** The price value (fixed or percentage) for a discount application. */
export type ShopifyStorefrontPricingValue =
  | ShopifyStorefrontMoneyV2
  | ShopifyStorefrontPricingPercentageValue

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export interface ShopifyStorefrontProduct
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode,
    ShopifyStorefrontOnlineStorePublishable {
  __typename: 'Product'
  /** Indicates if at least one product variant is available for sale. */
  availableForSale: Scalars['Boolean']
  /** List of collections a product belongs to. */
  collections: ShopifyStorefrontCollectionConnection
  /** The compare at price of the product across all variants. */
  compareAtPriceRange: ShopifyStorefrontProductPriceRange
  /** The date and time when the product was created. */
  createdAt: Scalars['DateTime']
  /** Stripped description of the product, single line with HTML tags removed. */
  description: Scalars['String']
  /** The description of the product, complete with HTML formatting. */
  descriptionHtml: Scalars['HTML']
  /**
   * The featured image for the product.
   *
   * This field is functionally equivalent to `images(first: 1)`.
   */
  featuredImage?: Maybe<ShopifyStorefrontImage>
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   */
  handle: Scalars['String']
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** List of images associated with the product. */
  images: ShopifyStorefrontImageConnection
  /** The media associated with the product. */
  media: ShopifyStorefrontMediaConnection
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /**
   * A paginated list of metafields associated with the resource.
   * @deprecated As of 2022-07, the paginated `metafields` field has been repurposed to require a list of metafield identifiers.
   *
   */
  metafields: ShopifyStorefrontMetafieldConnection
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']>
  /** List of product options. */
  options: Array<ShopifyStorefrontProductOption>
  /**
   * List of price ranges in the presentment currencies for this shop.
   * @deprecated Use `@inContext` instead.
   */
  presentmentPriceRanges: ShopifyStorefrontProductPriceRangeConnection
  /** The price range. */
  priceRange: ShopifyStorefrontProductPriceRange
  /** A categorization that a product can be tagged with, commonly used for filtering and searching. */
  productType: Scalars['String']
  /** The date and time when the product was published to the channel. */
  publishedAt: Scalars['DateTime']
  /** Whether the product can only be purchased with a selling plan. */
  requiresSellingPlan: Scalars['Boolean']
  /** A list of a product's available selling plan groups. A selling plan group represents a selling method. For example, 'Subscribe and save' is a selling method where customers pay for goods or services per delivery. A selling plan group contains individual selling plans. */
  sellingPlanGroups: ShopifyStorefrontSellingPlanGroupConnection
  /** The product's SEO information. */
  seo: ShopifyStorefrontSeo
  /**
   * A comma separated list of tags that have been added to the product.
   * Additional access scope required for private apps: unauthenticated_read_product_tags.
   */
  tags: Array<Scalars['String']>
  /** The product’s title. */
  title: Scalars['String']
  /** The total quantity of inventory in stock for this Product. */
  totalInventory?: Maybe<Scalars['Int']>
  /**
   * The date and time when the product was last modified.
   * A product's `updatedAt` value can change for different reasons. For example, if an order
   * is placed for a product that has inventory tracking set up, then the inventory adjustment
   * is counted as an update.
   */
  updatedAt: Scalars['DateTime']
  /**
   * Find a product’s variant based on its selected options.
   * This is useful for converting a user’s selection of product options into a single matching variant.
   * If there is not a variant for the selected options, `null` will be returned.
   */
  variantBySelectedOptions?: Maybe<ShopifyStorefrontProductVariant>
  /** List of the product’s variants. */
  variants: ShopifyStorefrontProductVariantConnection
  /** The product’s vendor name. */
  vendor: Scalars['String']
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductCollectionsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductDescriptionArgs = {
  truncateAt?: Maybe<Scalars['Int']>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductImagesArgs = {
  maxWidth?: Maybe<Scalars['Int']>
  maxHeight?: Maybe<Scalars['Int']>
  crop?: Maybe<ShopifyStorefrontCropRegion>
  scale?: Maybe<Scalars['Int']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontProductImageSortKeys>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductMediaArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontProductMediaSortKeys>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductMetafieldArgs = {
  namespace: Scalars['String']
  key: Scalars['String']
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductOptionsArgs = {
  first?: Maybe<Scalars['Int']>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductPresentmentPriceRangesArgs = {
  presentmentCurrencies?: Maybe<Array<ShopifyStorefrontCurrencyCode>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductSellingPlanGroupsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductVariantBySelectedOptionsArgs = {
  selectedOptions: Array<ShopifyStorefrontSelectedOptionInput>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also qualifies as a product, as do services (such as equipment rental, work for hire, customization of another product or an extended warranty).
 */
export type ShopifyStorefrontProductVariantsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontProductVariantSortKeys>
}

/** The set of valid sort keys for the ProductCollection query. */
export enum ShopifyStorefrontProductCollectionSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `price` value. */
  Price = 'PRICE',
  /** Sort by the `best-selling` value. */
  BestSelling = 'BEST_SELLING',
  /** Sort by the `created` value. */
  Created = 'CREATED',
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `manual` value. */
  Manual = 'MANUAL',
  /** Sort by the `collection-default` value. */
  CollectionDefault = 'COLLECTION_DEFAULT',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  Relevance = 'RELEVANCE',
}

/** An auto-generated type for paginating through multiple Products. */
export interface ShopifyStorefrontProductConnection {
  __typename: 'ProductConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontProductEdge>
  /** A list of available filters. */
  filters: Array<ShopifyStorefrontFilter>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one Product and a cursor during pagination. */
export interface ShopifyStorefrontProductEdge {
  __typename: 'ProductEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of ProductEdge. */
  node: ShopifyStorefrontProduct
}

/**
 * The input fields for a filter used to view a subset of products in a collection.
 * By default, the `available` and `price` filters are enabled. Filters are customized with the Shopify Search & Discovery app.
 * Learn more about [customizing storefront filtering](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters).
 */
export type ShopifyStorefrontProductFilter = {
  /** Filter on if the product is available for sale. */
  available?: Maybe<Scalars['Boolean']>
  /** A variant option to filter on. */
  variantOption?: Maybe<ShopifyStorefrontVariantOptionFilter>
  /** The product type to filter on. */
  productType?: Maybe<Scalars['String']>
  /** The product vendor to filter on. */
  productVendor?: Maybe<Scalars['String']>
  /** A range of prices to filter with-in. */
  price?: Maybe<ShopifyStorefrontPriceRangeFilter>
  /** A product metafield to filter on. */
  productMetafield?: Maybe<ShopifyStorefrontMetafieldFilter>
  /** A variant metafield to filter on. */
  variantMetafield?: Maybe<ShopifyStorefrontMetafieldFilter>
}

/** The set of valid sort keys for the ProductImage query. */
export enum ShopifyStorefrontProductImageSortKeys {
  /** Sort by the `created_at` value. */
  CreatedAt = 'CREATED_AT',
  /** Sort by the `position` value. */
  Position = 'POSITION',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  Relevance = 'RELEVANCE',
}

/** The set of valid sort keys for the ProductMedia query. */
export enum ShopifyStorefrontProductMediaSortKeys {
  /** Sort by the `position` value. */
  Position = 'POSITION',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  Relevance = 'RELEVANCE',
}

/**
 * Product property names like "Size", "Color", and "Material" that the customers can select.
 * Variants are selected based on permutations of these options.
 * 255 characters limit each.
 */
export interface ShopifyStorefrontProductOption extends ShopifyStorefrontNode {
  __typename: 'ProductOption'
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The product option’s name. */
  name: Scalars['String']
  /** The corresponding value to the product option name. */
  values: Array<Scalars['String']>
}

/** The price range of the product. */
export interface ShopifyStorefrontProductPriceRange {
  __typename: 'ProductPriceRange'
  /** The highest variant's price. */
  maxVariantPrice: ShopifyStorefrontMoneyV2
  /** The lowest variant's price. */
  minVariantPrice: ShopifyStorefrontMoneyV2
}

/** An auto-generated type for paginating through multiple ProductPriceRanges. */
export interface ShopifyStorefrontProductPriceRangeConnection {
  __typename: 'ProductPriceRangeConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontProductPriceRangeEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one ProductPriceRange and a cursor during pagination. */
export interface ShopifyStorefrontProductPriceRangeEdge {
  __typename: 'ProductPriceRangeEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of ProductPriceRangeEdge. */
  node: ShopifyStorefrontProductPriceRange
}

/** The set of valid sort keys for the Product query. */
export enum ShopifyStorefrontProductSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `product_type` value. */
  ProductType = 'PRODUCT_TYPE',
  /** Sort by the `vendor` value. */
  Vendor = 'VENDOR',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by the `created_at` value. */
  CreatedAt = 'CREATED_AT',
  /** Sort by the `best_selling` value. */
  BestSelling = 'BEST_SELLING',
  /** Sort by the `price` value. */
  Price = 'PRICE',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  Relevance = 'RELEVANCE',
}

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export interface ShopifyStorefrontProductVariant
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode {
  __typename: 'ProductVariant'
  /**
   * Indicates if the product variant is in stock.
   * @deprecated Use `availableForSale` instead.
   */
  available?: Maybe<Scalars['Boolean']>
  /** Indicates if the product variant is available for sale. */
  availableForSale: Scalars['Boolean']
  /** The barcode (for example, ISBN, UPC, or GTIN) associated with the variant. */
  barcode?: Maybe<Scalars['String']>
  /**
   * The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPrice` is higher than `price`.
   * @deprecated Use `compareAtPriceV2` instead.
   */
  compareAtPrice?: Maybe<Scalars['Money']>
  /** The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPriceV2` is higher than `priceV2`. */
  compareAtPriceV2?: Maybe<ShopifyStorefrontMoneyV2>
  /** Whether a product is out of stock but still available for purchase (used for backorders). */
  currentlyNotInStock: Scalars['Boolean']
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** Image associated with the product variant. This field falls back to the product image if no image is available. */
  image?: Maybe<ShopifyStorefrontImage>
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /**
   * A paginated list of metafields associated with the resource.
   * @deprecated As of 2022-07, the paginated `metafields` field has been repurposed to require a list of metafield identifiers.
   *
   */
  metafields: ShopifyStorefrontMetafieldConnection
  /**
   * List of prices and compare-at prices in the presentment currencies for this shop.
   * @deprecated Use `@inContext` instead.
   */
  presentmentPrices: ShopifyStorefrontProductVariantPricePairConnection
  /**
   * List of unit prices in the presentment currencies for this shop.
   * @deprecated Use `@inContext` instead.
   */
  presentmentUnitPrices: ShopifyStorefrontMoneyV2Connection
  /**
   * The product variant’s price.
   * @deprecated Use `priceV2` instead.
   */
  price: Scalars['Money']
  /** The product variant’s price. */
  priceV2: ShopifyStorefrontMoneyV2
  /** The product object that the product variant belongs to. */
  product: ShopifyStorefrontProduct
  /** The total sellable quantity of the variant for online sales channels. */
  quantityAvailable?: Maybe<Scalars['Int']>
  /** Whether a customer needs to provide a shipping address when placing an order for the product variant. */
  requiresShipping: Scalars['Boolean']
  /** List of product options applied to the variant. */
  selectedOptions: Array<ShopifyStorefrontSelectedOption>
  /** Represents an association between a variant and a selling plan. Selling plan allocations describe which selling plans are available for each variant, and what their impact is on pricing. */
  sellingPlanAllocations: ShopifyStorefrontSellingPlanAllocationConnection
  /** The SKU (stock keeping unit) associated with the variant. */
  sku?: Maybe<Scalars['String']>
  /** The in-store pickup availability of this variant by location. */
  storeAvailability: ShopifyStorefrontStoreAvailabilityConnection
  /** The product variant’s title. */
  title: Scalars['String']
  /** The unit price value for the variant based on the variant's measurement. */
  unitPrice?: Maybe<ShopifyStorefrontMoneyV2>
  /** The unit price measurement for the variant. */
  unitPriceMeasurement?: Maybe<ShopifyStorefrontUnitPriceMeasurement>
  /** The weight of the product variant in the unit system specified with `weight_unit`. */
  weight?: Maybe<Scalars['Float']>
  /** Unit of measurement for weight. */
  weightUnit: ShopifyStorefrontWeightUnit
}

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyStorefrontProductVariantImageArgs = {
  maxWidth?: Maybe<Scalars['Int']>
  maxHeight?: Maybe<Scalars['Int']>
  crop?: Maybe<ShopifyStorefrontCropRegion>
  scale?: Maybe<Scalars['Int']>
}

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyStorefrontProductVariantMetafieldArgs = {
  namespace: Scalars['String']
  key: Scalars['String']
}

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyStorefrontProductVariantMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyStorefrontProductVariantPresentmentPricesArgs = {
  presentmentCurrencies?: Maybe<Array<ShopifyStorefrontCurrencyCode>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyStorefrontProductVariantPresentmentUnitPricesArgs = {
  presentmentCurrencies?: Maybe<Array<ShopifyStorefrontCurrencyCode>>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyStorefrontProductVariantSellingPlanAllocationsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** A product variant represents a different version of a product, such as differing sizes or differing colors. */
export type ShopifyStorefrontProductVariantStoreAvailabilityArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** An auto-generated type for paginating through multiple ProductVariants. */
export interface ShopifyStorefrontProductVariantConnection {
  __typename: 'ProductVariantConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontProductVariantEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one ProductVariant and a cursor during pagination. */
export interface ShopifyStorefrontProductVariantEdge {
  __typename: 'ProductVariantEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of ProductVariantEdge. */
  node: ShopifyStorefrontProductVariant
}

/** The compare-at price and price of a variant sharing a currency. */
export interface ShopifyStorefrontProductVariantPricePair {
  __typename: 'ProductVariantPricePair'
  /** The compare-at price of the variant with associated currency. */
  compareAtPrice?: Maybe<ShopifyStorefrontMoneyV2>
  /** The price of the variant with associated currency. */
  price: ShopifyStorefrontMoneyV2
}

/** An auto-generated type for paginating through multiple ProductVariantPricePairs. */
export interface ShopifyStorefrontProductVariantPricePairConnection {
  __typename: 'ProductVariantPricePairConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontProductVariantPricePairEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one ProductVariantPricePair and a cursor during pagination. */
export interface ShopifyStorefrontProductVariantPricePairEdge {
  __typename: 'ProductVariantPricePairEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of ProductVariantPricePairEdge. */
  node: ShopifyStorefrontProductVariantPricePair
}

/** The set of valid sort keys for the ProductVariant query. */
export enum ShopifyStorefrontProductVariantSortKeys {
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `sku` value. */
  Sku = 'SKU',
  /** Sort by the `position` value. */
  Position = 'POSITION',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   */
  Relevance = 'RELEVANCE',
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export interface ShopifyStorefrontQueryRoot {
  __typename: 'QueryRoot'
  /** List of the shop's articles. */
  articles: ShopifyStorefrontArticleConnection
  /** Fetch a specific `Blog` by one of its unique attributes. */
  blog?: Maybe<ShopifyStorefrontBlog>
  /**
   * Find a blog by its handle.
   * @deprecated Use `blog` instead.
   */
  blogByHandle?: Maybe<ShopifyStorefrontBlog>
  /** List of the shop's blogs. */
  blogs: ShopifyStorefrontBlogConnection
  /**
   * Retrieve a cart by its ID. For more information, refer to
   * [Manage a cart with the Storefront API](https://shopify.dev/custom-storefronts/cart/manage).
   */
  cart?: Maybe<ShopifyStorefrontCart>
  /** Fetch a specific `Collection` by one of its unique attributes. */
  collection?: Maybe<ShopifyStorefrontCollection>
  /**
   * Find a collection by its handle.
   * @deprecated Use `collection` instead.
   */
  collectionByHandle?: Maybe<ShopifyStorefrontCollection>
  /** List of the shop’s collections. */
  collections: ShopifyStorefrontCollectionConnection
  /**
   * The customer associated with the given access token. Tokens are obtained by using the
   * [`customerAccessTokenCreate` mutation](https://shopify.dev/docs/api/storefront/latest/mutations/customerAccessTokenCreate).
   */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** Returns the localized experiences configured for the shop. */
  localization: ShopifyStorefrontLocalization
  /**
   * List of the shop's locations that support in-store pickup.
   *
   * When sorting by distance, you must specify a location via the `near` argument.
   */
  locations: ShopifyStorefrontLocationConnection
  /** Returns a specific node by ID. */
  node?: Maybe<ShopifyStorefrontNode>
  /** Returns the list of nodes with the given IDs. */
  nodes: Array<Maybe<ShopifyStorefrontNode>>
  /** Fetch a specific `Page` by one of its unique attributes. */
  page?: Maybe<ShopifyStorefrontPage>
  /**
   * Find a page by its handle.
   * @deprecated Use `page` instead.
   */
  pageByHandle?: Maybe<ShopifyStorefrontPage>
  /** List of the shop's pages. */
  pages: ShopifyStorefrontPageConnection
  /** Fetch a specific `Product` by one of its unique attributes. */
  product?: Maybe<ShopifyStorefrontProduct>
  /**
   * Find a product by its handle.
   * @deprecated Use `product` instead.
   */
  productByHandle?: Maybe<ShopifyStorefrontProduct>
  /**
   * Find recommended products related to a given `product_id`.
   * To learn more about how recommendations are generated, see
   * [*Showing product recommendations on product pages*](https://help.shopify.com/themes/development/recommended-products).
   */
  productRecommendations?: Maybe<Array<ShopifyStorefrontProduct>>
  /**
   * Tags added to products.
   * Additional access scope required: unauthenticated_read_product_tags.
   */
  productTags: ShopifyStorefrontStringConnection
  /** List of product types for the shop's products that are published to your app. */
  productTypes: ShopifyStorefrontStringConnection
  /** List of the shop’s products. */
  products: ShopifyStorefrontProductConnection
  /** The list of public Storefront API versions, including supported, release candidate and unstable versions. */
  publicApiVersions: Array<ShopifyStorefrontApiVersion>
  /** The shop associated with the storefront access token. */
  shop: ShopifyStorefrontShop
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootArticlesArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontArticleSortKeys>
  query?: Maybe<Scalars['String']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootBlogArgs = {
  id?: Maybe<Scalars['ID']>
  handle?: Maybe<Scalars['String']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootBlogByHandleArgs = {
  handle: Scalars['String']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootBlogsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontBlogSortKeys>
  query?: Maybe<Scalars['String']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCartArgs = {
  id: Scalars['ID']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCollectionArgs = {
  id?: Maybe<Scalars['ID']>
  handle?: Maybe<Scalars['String']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCollectionByHandleArgs = {
  handle: Scalars['String']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCollectionsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontCollectionSortKeys>
  query?: Maybe<Scalars['String']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCustomerArgs = {
  customerAccessToken: Scalars['String']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootLocationsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontLocationSortKeys>
  near?: Maybe<ShopifyStorefrontGeoCoordinateInput>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootNodeArgs = {
  id: Scalars['ID']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootNodesArgs = {
  ids: Array<Scalars['ID']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootPageArgs = {
  id?: Maybe<Scalars['ID']>
  handle?: Maybe<Scalars['String']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootPageByHandleArgs = {
  handle: Scalars['String']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootPagesArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontPageSortKeys>
  query?: Maybe<Scalars['String']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductArgs = {
  id?: Maybe<Scalars['ID']>
  handle?: Maybe<Scalars['String']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductByHandleArgs = {
  handle: Scalars['String']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductRecommendationsArgs = {
  productId: Scalars['ID']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductTagsArgs = {
  first: Scalars['Int']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductTypesArgs = {
  first: Scalars['Int']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontProductSortKeys>
  query?: Maybe<Scalars['String']>
}

/** SEO information. */
export interface ShopifyStorefrontSeo {
  __typename: 'SEO'
  /** The meta description. */
  description?: Maybe<Scalars['String']>
  /** The SEO title. */
  title?: Maybe<Scalars['String']>
}

/**
 * Script discount applications capture the intentions of a discount that
 * was created by a Shopify Script.
 */
export interface ShopifyStorefrontScriptDiscountApplication
  extends ShopifyStorefrontDiscountApplication {
  __typename: 'ScriptDiscountApplication'
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyStorefrontDiscountApplicationAllocationMethod
  /**
   * The description of the application as defined by the Script.
   * @deprecated Use `title` instead.
   */
  description: Scalars['String']
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyStorefrontDiscountApplicationTargetSelection
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyStorefrontDiscountApplicationTargetType
  /** The title of the application as defined by the Script. */
  title: Scalars['String']
  /** The value of the discount application. */
  value: ShopifyStorefrontPricingValue
}

/**
 * Properties used by customers to select a product variant.
 * Products can have multiple options, like different sizes or colors.
 */
export interface ShopifyStorefrontSelectedOption {
  __typename: 'SelectedOption'
  /** The product option’s name. */
  name: Scalars['String']
  /** The product option’s value. */
  value: Scalars['String']
}

/** The input fields required for a selected option. */
export type ShopifyStorefrontSelectedOptionInput = {
  /** The product option’s name. */
  name: Scalars['String']
  /** The product option’s value. */
  value: Scalars['String']
}

/** Represents how products and variants can be sold and purchased. */
export interface ShopifyStorefrontSellingPlan {
  __typename: 'SellingPlan'
  /** The description of the selling plan. */
  description?: Maybe<Scalars['String']>
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'. */
  name: Scalars['String']
  /** The selling plan options available in the drop-down list in the storefront. For example, 'Delivery every week' or 'Delivery every 2 weeks' specifies the delivery frequency options for the product. Individual selling plans contribute their options to the associated selling plan group. For example, a selling plan group might have an option called `option1: Delivery every`. One selling plan in that group could contribute `option1: 2 weeks` with the pricing for that option, and another selling plan could contribute `option1: 4 weeks`, with different pricing. */
  options: Array<ShopifyStorefrontSellingPlanOption>
  /** The price adjustments that a selling plan makes when a variant is purchased with a selling plan. */
  priceAdjustments: Array<ShopifyStorefrontSellingPlanPriceAdjustment>
  /** Whether purchasing the selling plan will result in multiple deliveries. */
  recurringDeliveries: Scalars['Boolean']
}

/** Represents an association between a variant and a selling plan. Selling plan allocations describe the options offered for each variant, and the price of the variant when purchased with a selling plan. */
export interface ShopifyStorefrontSellingPlanAllocation {
  __typename: 'SellingPlanAllocation'
  /** A list of price adjustments, with a maximum of two. When there are two, the first price adjustment goes into effect at the time of purchase, while the second one starts after a certain number of orders. A price adjustment represents how a selling plan affects pricing when a variant is purchased with a selling plan. Prices display in the customer's currency if the shop is configured for it. */
  priceAdjustments: Array<ShopifyStorefrontSellingPlanAllocationPriceAdjustment>
  /** A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'. */
  sellingPlan: ShopifyStorefrontSellingPlan
}

/** An auto-generated type for paginating through multiple SellingPlanAllocations. */
export interface ShopifyStorefrontSellingPlanAllocationConnection {
  __typename: 'SellingPlanAllocationConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontSellingPlanAllocationEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one SellingPlanAllocation and a cursor during pagination. */
export interface ShopifyStorefrontSellingPlanAllocationEdge {
  __typename: 'SellingPlanAllocationEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of SellingPlanAllocationEdge. */
  node: ShopifyStorefrontSellingPlanAllocation
}

/** The resulting prices for variants when they're purchased with a specific selling plan. */
export interface ShopifyStorefrontSellingPlanAllocationPriceAdjustment {
  __typename: 'SellingPlanAllocationPriceAdjustment'
  /** The price of the variant when it's purchased without a selling plan for the same number of deliveries. For example, if a customer purchases 6 deliveries of $10.00 granola separately, then the price is 6 x $10.00 = $60.00. */
  compareAtPrice: ShopifyStorefrontMoneyV2
  /** The effective price for a single delivery. For example, for a prepaid subscription plan that includes 6 deliveries at the price of $48.00, the per delivery price is $8.00. */
  perDeliveryPrice: ShopifyStorefrontMoneyV2
  /** The price of the variant when it's purchased with a selling plan For example, for a prepaid subscription plan that includes 6 deliveries of $10.00 granola, where the customer gets 20% off, the price is 6 x $10.00 x 0.80 = $48.00. */
  price: ShopifyStorefrontMoneyV2
  /** The resulting price per unit for the variant associated with the selling plan. If the variant isn't sold by quantity or measurement, then this field returns `null`. */
  unitPrice?: Maybe<ShopifyStorefrontMoneyV2>
}

/** An auto-generated type for paginating through multiple SellingPlans. */
export interface ShopifyStorefrontSellingPlanConnection {
  __typename: 'SellingPlanConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontSellingPlanEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one SellingPlan and a cursor during pagination. */
export interface ShopifyStorefrontSellingPlanEdge {
  __typename: 'SellingPlanEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of SellingPlanEdge. */
  node: ShopifyStorefrontSellingPlan
}

/** A fixed amount that's deducted from the original variant price. For example, $10.00 off. */
export interface ShopifyStorefrontSellingPlanFixedAmountPriceAdjustment {
  __typename: 'SellingPlanFixedAmountPriceAdjustment'
  /** The money value of the price adjustment. */
  adjustmentAmount: ShopifyStorefrontMoneyV2
}

/** A fixed price adjustment for a variant that's purchased with a selling plan. */
export interface ShopifyStorefrontSellingPlanFixedPriceAdjustment {
  __typename: 'SellingPlanFixedPriceAdjustment'
  /** A new price of the variant when it's purchased with the selling plan. */
  price: ShopifyStorefrontMoneyV2
}

/** Represents a selling method. For example, 'Subscribe and save' is a selling method where customers pay for goods or services per delivery. A selling plan group contains individual selling plans. */
export interface ShopifyStorefrontSellingPlanGroup {
  __typename: 'SellingPlanGroup'
  /** A display friendly name for the app that created the selling plan group. */
  appName?: Maybe<Scalars['String']>
  /** The name of the selling plan group. */
  name: Scalars['String']
  /** Represents the selling plan options available in the drop-down list in the storefront. For example, 'Delivery every week' or 'Delivery every 2 weeks' specifies the delivery frequency options for the product. */
  options: Array<ShopifyStorefrontSellingPlanGroupOption>
  /** A list of selling plans in a selling plan group. A selling plan is a representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'. */
  sellingPlans: ShopifyStorefrontSellingPlanConnection
}

/** Represents a selling method. For example, 'Subscribe and save' is a selling method where customers pay for goods or services per delivery. A selling plan group contains individual selling plans. */
export type ShopifyStorefrontSellingPlanGroupSellingPlansArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** An auto-generated type for paginating through multiple SellingPlanGroups. */
export interface ShopifyStorefrontSellingPlanGroupConnection {
  __typename: 'SellingPlanGroupConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontSellingPlanGroupEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one SellingPlanGroup and a cursor during pagination. */
export interface ShopifyStorefrontSellingPlanGroupEdge {
  __typename: 'SellingPlanGroupEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of SellingPlanGroupEdge. */
  node: ShopifyStorefrontSellingPlanGroup
}

/**
 * Represents an option on a selling plan group that's available in the drop-down list in the storefront.
 *
 * Individual selling plans contribute their options to the associated selling plan group. For example, a selling plan group might have an option called `option1: Delivery every`. One selling plan in that group could contribute `option1: 2 weeks` with the pricing for that option, and another selling plan could contribute `option1: 4 weeks`, with different pricing.
 */
export interface ShopifyStorefrontSellingPlanGroupOption {
  __typename: 'SellingPlanGroupOption'
  /** The name of the option. For example, 'Delivery every'. */
  name: Scalars['String']
  /** The values for the options specified by the selling plans in the selling plan group. For example, '1 week', '2 weeks', '3 weeks'. */
  values: Array<Scalars['String']>
}

/** An option provided by a Selling Plan. */
export interface ShopifyStorefrontSellingPlanOption {
  __typename: 'SellingPlanOption'
  /** The name of the option (ie "Delivery every"). */
  name?: Maybe<Scalars['String']>
  /** The value of the option (ie "Month"). */
  value?: Maybe<Scalars['String']>
}

/** A percentage amount that's deducted from the original variant price. For example, 10% off. */
export interface ShopifyStorefrontSellingPlanPercentagePriceAdjustment {
  __typename: 'SellingPlanPercentagePriceAdjustment'
  /** The percentage value of the price adjustment. */
  adjustmentPercentage: Scalars['Int']
}

/** Represents by how much the price of a variant associated with a selling plan is adjusted. Each variant can have up to two price adjustments. If a variant has multiple price adjustments, then the first price adjustment applies when the variant is initially purchased. The second price adjustment applies after a certain number of orders (specified by the `orderCount` field) are made. If a selling plan doesn't have any price adjustments, then the unadjusted price of the variant is the effective price. */
export interface ShopifyStorefrontSellingPlanPriceAdjustment {
  __typename: 'SellingPlanPriceAdjustment'
  /** The type of price adjustment. An adjustment value can have one of three types: percentage, amount off, or a new price. */
  adjustmentValue: ShopifyStorefrontSellingPlanPriceAdjustmentValue
  /** The number of orders that the price adjustment applies to. If the price adjustment always applies, then this field is `null`. */
  orderCount?: Maybe<Scalars['Int']>
}

/** Represents by how much the price of a variant associated with a selling plan is adjusted. Each variant can have up to two price adjustments. */
export type ShopifyStorefrontSellingPlanPriceAdjustmentValue =
  | ShopifyStorefrontSellingPlanFixedAmountPriceAdjustment
  | ShopifyStorefrontSellingPlanFixedPriceAdjustment
  | ShopifyStorefrontSellingPlanPercentagePriceAdjustment

/** A shipping rate to be applied to a checkout. */
export interface ShopifyStorefrontShippingRate {
  __typename: 'ShippingRate'
  /** Human-readable unique identifier for this shipping rate. */
  handle: Scalars['String']
  /**
   * Price of this shipping rate.
   * @deprecated Use `priceV2` instead.
   */
  price: Scalars['Money']
  /** Price of this shipping rate. */
  priceV2: ShopifyStorefrontMoneyV2
  /** Title of this shipping rate. */
  title: Scalars['String']
}

/** Shop represents a collection of the general settings and information about the shop. */
export interface ShopifyStorefrontShop extends ShopifyStorefrontHasMetafields {
  __typename: 'Shop'
  /**
   * List of the shop' articles.
   * @deprecated Use `QueryRoot.articles` instead.
   */
  articles: ShopifyStorefrontArticleConnection
  /**
   * List of the shop' blogs.
   * @deprecated Use `QueryRoot.blogs` instead.
   */
  blogs: ShopifyStorefrontBlogConnection
  /**
   * Find a collection by its handle.
   * @deprecated Use `QueryRoot.collectionByHandle` instead.
   */
  collectionByHandle?: Maybe<ShopifyStorefrontCollection>
  /**
   * List of the shop’s collections.
   * @deprecated Use `QueryRoot.collections` instead.
   */
  collections: ShopifyStorefrontCollectionConnection
  /**
   * The three-letter code for the currency that the shop accepts.
   * @deprecated Use `paymentSettings` instead.
   */
  currencyCode: ShopifyStorefrontCurrencyCode
  /** A description of the shop. */
  description?: Maybe<Scalars['String']>
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /**
   * A paginated list of metafields associated with the resource.
   * @deprecated As of 2022-07, the paginated `metafields` field has been repurposed to require a list of metafield identifiers.
   *
   */
  metafields: ShopifyStorefrontMetafieldConnection
  /** A string representing the way currency is formatted when the currency isn’t specified. */
  moneyFormat: Scalars['String']
  /** The shop’s name. */
  name: Scalars['String']
  /** Settings related to payments. */
  paymentSettings: ShopifyStorefrontPaymentSettings
  /** The primary domain of the shop’s Online Store. */
  primaryDomain: ShopifyStorefrontDomain
  /** The shop’s privacy policy. */
  privacyPolicy?: Maybe<ShopifyStorefrontShopPolicy>
  /**
   * Find a product by its handle.
   * @deprecated Use `QueryRoot.productByHandle` instead.
   */
  productByHandle?: Maybe<ShopifyStorefrontProduct>
  /**
   * A list of tags that have been added to products.
   * Additional access scope required: unauthenticated_read_product_tags.
   * @deprecated Use `QueryRoot.productTags` instead.
   */
  productTags: ShopifyStorefrontStringConnection
  /**
   * List of the shop’s product types.
   * @deprecated Use `QueryRoot.productTypes` instead.
   */
  productTypes: ShopifyStorefrontStringConnection
  /**
   * List of the shop’s products.
   * @deprecated Use `QueryRoot.products` instead.
   */
  products: ShopifyStorefrontProductConnection
  /** The shop’s refund policy. */
  refundPolicy?: Maybe<ShopifyStorefrontShopPolicy>
  /** The shop’s shipping policy. */
  shippingPolicy?: Maybe<ShopifyStorefrontShopPolicy>
  /** Countries that the shop ships to. */
  shipsToCountries: Array<ShopifyStorefrontCountryCode>
  /**
   * The shop’s Shopify Payments account ID.
   * @deprecated Use `paymentSettings` instead.
   */
  shopifyPaymentsAccountId?: Maybe<Scalars['String']>
  /** The shop’s subscription policy. */
  subscriptionPolicy?: Maybe<ShopifyStorefrontShopPolicyWithDefault>
  /** The shop’s terms of service. */
  termsOfService?: Maybe<ShopifyStorefrontShopPolicy>
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopArticlesArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontArticleSortKeys>
  query?: Maybe<Scalars['String']>
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopBlogsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontBlogSortKeys>
  query?: Maybe<Scalars['String']>
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopCollectionByHandleArgs = {
  handle: Scalars['String']
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopCollectionsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontCollectionSortKeys>
  query?: Maybe<Scalars['String']>
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopMetafieldArgs = {
  namespace: Scalars['String']
  key: Scalars['String']
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopMetafieldsArgs = {
  namespace?: Maybe<Scalars['String']>
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopProductByHandleArgs = {
  handle: Scalars['String']
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopProductTagsArgs = {
  first: Scalars['Int']
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopProductTypesArgs = {
  first: Scalars['Int']
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopProductsArgs = {
  first?: Maybe<Scalars['Int']>
  after?: Maybe<Scalars['String']>
  last?: Maybe<Scalars['Int']>
  before?: Maybe<Scalars['String']>
  reverse?: Maybe<Scalars['Boolean']>
  sortKey?: Maybe<ShopifyStorefrontProductSortKeys>
  query?: Maybe<Scalars['String']>
}

/** Policy that a merchant has configured for their store, such as their refund or privacy policy. */
export interface ShopifyStorefrontShopPolicy extends ShopifyStorefrontNode {
  __typename: 'ShopPolicy'
  /** Policy text, maximum size of 64kb. */
  body: Scalars['String']
  /** Policy’s handle. */
  handle: Scalars['String']
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** Policy’s title. */
  title: Scalars['String']
  /** Public URL to the policy. */
  url: Scalars['URL']
}

/**
 * A policy for the store that comes with a default value, such as a subscription policy.
 * If the merchant hasn't configured a policy for their store, then the policy will return the default value.
 * Otherwise, the policy will return the merchant-configured value.
 */
export interface ShopifyStorefrontShopPolicyWithDefault {
  __typename: 'ShopPolicyWithDefault'
  /** The text of the policy. Maximum size: 64KB. */
  body: Scalars['String']
  /** The handle of the policy. */
  handle: Scalars['String']
  /** The unique ID of the policy. A default policy doesn't have an ID. */
  id?: Maybe<Scalars['ID']>
  /** The title of the policy. */
  title: Scalars['String']
  /** Public URL to the policy. */
  url: Scalars['URL']
}

/**
 * The availability of a product variant at a particular location.
 * Local pick-up must be enabled in the  store's shipping settings, otherwise this will return an empty result.
 */
export interface ShopifyStorefrontStoreAvailability {
  __typename: 'StoreAvailability'
  /** Whether the product variant is in-stock at this location. */
  available: Scalars['Boolean']
  /** The location where this product variant is stocked at. */
  location: ShopifyStorefrontLocation
  /** Returns the estimated amount of time it takes for pickup to be ready (Example: Usually ready in 24 hours). */
  pickUpTime: Scalars['String']
}

/** An auto-generated type for paginating through multiple StoreAvailabilities. */
export interface ShopifyStorefrontStoreAvailabilityConnection {
  __typename: 'StoreAvailabilityConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontStoreAvailabilityEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one StoreAvailability and a cursor during pagination. */
export interface ShopifyStorefrontStoreAvailabilityEdge {
  __typename: 'StoreAvailabilityEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of StoreAvailabilityEdge. */
  node: ShopifyStorefrontStoreAvailability
}

/** An auto-generated type for paginating through a list of Strings. */
export interface ShopifyStorefrontStringConnection {
  __typename: 'StringConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontStringEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** An auto-generated type which holds one String and a cursor during pagination. */
export interface ShopifyStorefrontStringEdge {
  __typename: 'StringEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']
  /** The item at the end of StringEdge. */
  node: Scalars['String']
}

/**
 * Specifies the fields required to complete a checkout with
 * a tokenized payment.
 */
export type ShopifyStorefrontTokenizedPaymentInput = {
  /** The amount of the payment. */
  amount: Scalars['Money']
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. For more information, refer to [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests). */
  idempotencyKey: Scalars['String']
  /** The billing address for the payment. */
  billingAddress: ShopifyStorefrontMailingAddressInput
  /** The type of payment token. */
  type: Scalars['String']
  /** A simple string or JSON containing the required payment data for the tokenized payment. */
  paymentData: Scalars['String']
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: Maybe<Scalars['Boolean']>
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: Maybe<Scalars['String']>
}

/**
 * Specifies the fields required to complete a checkout with
 * a tokenized payment.
 */
export type ShopifyStorefrontTokenizedPaymentInputV2 = {
  /** The amount and currency of the payment. */
  paymentAmount: ShopifyStorefrontMoneyInput
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. For more information, refer to [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests). */
  idempotencyKey: Scalars['String']
  /** The billing address for the payment. */
  billingAddress: ShopifyStorefrontMailingAddressInput
  /** A simple string or JSON containing the required payment data for the tokenized payment. */
  paymentData: Scalars['String']
  /** Whether to execute the payment in test mode, if possible. Test mode is not supported in production stores. Defaults to `false`. */
  test?: Maybe<Scalars['Boolean']>
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: Maybe<Scalars['String']>
  /** The type of payment token. */
  type: Scalars['String']
}

/**
 * Specifies the fields required to complete a checkout with
 * a tokenized payment.
 */
export type ShopifyStorefrontTokenizedPaymentInputV3 = {
  /** The amount and currency of the payment. */
  paymentAmount: ShopifyStorefrontMoneyInput
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. For more information, refer to [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests). */
  idempotencyKey: Scalars['String']
  /** The billing address for the payment. */
  billingAddress: ShopifyStorefrontMailingAddressInput
  /** A simple string or JSON containing the required payment data for the tokenized payment. */
  paymentData: Scalars['String']
  /** Whether to execute the payment in test mode, if possible. Test mode is not supported in production stores. Defaults to `false`. */
  test?: Maybe<Scalars['Boolean']>
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: Maybe<Scalars['String']>
  /** The type of payment token. */
  type: ShopifyStorefrontPaymentTokenType
}

/** An object representing exchange of money for a product or service. */
export interface ShopifyStorefrontTransaction {
  __typename: 'Transaction'
  /**
   * The amount of money that the transaction was for.
   * @deprecated Use `amountV2` instead.
   */
  amount: Scalars['Money']
  /** The amount of money that the transaction was for. */
  amountV2: ShopifyStorefrontMoneyV2
  /** The kind of the transaction. */
  kind: ShopifyStorefrontTransactionKind
  /**
   * The status of the transaction.
   * @deprecated Use `statusV2` instead.
   */
  status: ShopifyStorefrontTransactionStatus
  /** The status of the transaction. */
  statusV2?: Maybe<ShopifyStorefrontTransactionStatus>
  /** Whether the transaction was done in test mode or not. */
  test: Scalars['Boolean']
}

/** The different kinds of order transactions. */
export enum ShopifyStorefrontTransactionKind {
  /** An authorization and capture performed together in a single step. */
  Sale = 'SALE',
  /** A transfer of the money that was reserved during the authorization stage. */
  Capture = 'CAPTURE',
  /**
   * An amount reserved against the cardholder's funding source.
   * Money does not change hands until the authorization is captured.
   */
  Authorization = 'AUTHORIZATION',
  /** An authorization for a payment taken with an EMV credit card reader. */
  EmvAuthorization = 'EMV_AUTHORIZATION',
  /** Money returned to the customer when they have paid too much. */
  Change = 'CHANGE',
}

/** Transaction statuses describe the status of a transaction. */
export enum ShopifyStorefrontTransactionStatus {
  /** The transaction is pending. */
  Pending = 'PENDING',
  /** The transaction succeeded. */
  Success = 'SUCCESS',
  /** The transaction failed. */
  Failure = 'FAILURE',
  /** There was an error while processing the transaction. */
  Error = 'ERROR',
}

/** The measurement used to calculate a unit price for a product variant (e.g. $9.99 / 100ml). */
export interface ShopifyStorefrontUnitPriceMeasurement {
  __typename: 'UnitPriceMeasurement'
  /** The type of unit of measurement for the unit price measurement. */
  measuredType?: Maybe<ShopifyStorefrontUnitPriceMeasurementMeasuredType>
  /** The quantity unit for the unit price measurement. */
  quantityUnit?: Maybe<ShopifyStorefrontUnitPriceMeasurementMeasuredUnit>
  /** The quantity value for the unit price measurement. */
  quantityValue: Scalars['Float']
  /** The reference unit for the unit price measurement. */
  referenceUnit?: Maybe<ShopifyStorefrontUnitPriceMeasurementMeasuredUnit>
  /** The reference value for the unit price measurement. */
  referenceValue: Scalars['Int']
}

/** The accepted types of unit of measurement. */
export enum ShopifyStorefrontUnitPriceMeasurementMeasuredType {
  /** Unit of measurements representing volumes. */
  Volume = 'VOLUME',
  /** Unit of measurements representing weights. */
  Weight = 'WEIGHT',
  /** Unit of measurements representing lengths. */
  Length = 'LENGTH',
  /** Unit of measurements representing areas. */
  Area = 'AREA',
}

/** The valid units of measurement for a unit price measurement. */
export enum ShopifyStorefrontUnitPriceMeasurementMeasuredUnit {
  /** 1000 milliliters equals 1 liter. */
  Ml = 'ML',
  /** 100 centiliters equals 1 liter. */
  Cl = 'CL',
  /** Metric system unit of volume. */
  L = 'L',
  /** 1 cubic meter equals 1000 liters. */
  M3 = 'M3',
  /** 1000 milligrams equals 1 gram. */
  Mg = 'MG',
  /** Metric system unit of weight. */
  G = 'G',
  /** 1 kilogram equals 1000 grams. */
  Kg = 'KG',
  /** 1000 millimeters equals 1 meter. */
  Mm = 'MM',
  /** 100 centimeters equals 1 meter. */
  Cm = 'CM',
  /** Metric system unit of length. */
  M = 'M',
  /** Metric system unit of area. */
  M2 = 'M2',
}

/** Systems of weights and measures. */
export enum ShopifyStorefrontUnitSystem {
  /** Imperial system of weights and measures. */
  ImperialSystem = 'IMPERIAL_SYSTEM',
  /** Metric system of weights and measures. */
  MetricSystem = 'METRIC_SYSTEM',
}

/** Represents an error in the input of a mutation. */
export interface ShopifyStorefrontUserError
  extends ShopifyStorefrontDisplayableError {
  __typename: 'UserError'
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']>>
  /** The error message. */
  message: Scalars['String']
}

/** The input fields for a filter used to view a subset of products in a collection matching a specific variant option. */
export type ShopifyStorefrontVariantOptionFilter = {
  /** The name of the variant option to filter on. */
  name: Scalars['String']
  /** The value of the variant option to filter on. */
  value: Scalars['String']
}

/** Represents a Shopify hosted video. */
export interface ShopifyStorefrontVideo
  extends ShopifyStorefrontMedia,
    ShopifyStorefrontNode {
  __typename: 'Video'
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']>
  /** A globally-unique ID. */
  id: Scalars['ID']
  /** The media content type. */
  mediaContentType: ShopifyStorefrontMediaContentType
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyStorefrontImage>
  /** The sources for a video. */
  sources: Array<ShopifyStorefrontVideoSource>
}

/** Represents a source for a Shopify hosted video. */
export interface ShopifyStorefrontVideoSource {
  __typename: 'VideoSource'
  /** The format of the video source. */
  format: Scalars['String']
  /** The height of the video. */
  height: Scalars['Int']
  /** The video MIME type. */
  mimeType: Scalars['String']
  /** The URL of the video. */
  url: Scalars['String']
  /** The width of the video. */
  width: Scalars['Int']
}

/** Units of measurement for weight. */
export enum ShopifyStorefrontWeightUnit {
  /** 1 kilogram equals 1000 grams. */
  Kilograms = 'KILOGRAMS',
  /** Metric system unit of mass. */
  Grams = 'GRAMS',
  /** 1 pound equals 16 ounces. */
  Pounds = 'POUNDS',
  /** Imperial system unit of mass. */
  Ounces = 'OUNCES',
}
