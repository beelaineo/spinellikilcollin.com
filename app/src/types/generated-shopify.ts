export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  Color: { input: any; output: any }
  DateTime: { input: Date; output: Date }
  Decimal: { input: any; output: any }
  HTML: { input: any; output: any }
  JSON: { input: { [key: string]: any }; output: { [key: string]: any } }
  URL: { input: any; output: any }
  UnsignedInt64: { input: any; output: any }
}

/**
 * A version of the API, as defined by [Shopify API versioning](https://shopify.dev/api/usage/versioning).
 * Versions are commonly referred to by their handle (for example, `2021-10`).
 *
 */
export interface ShopifyStorefrontApiVersion {
  __typename: 'ApiVersion'
  /** The human-readable name of the version. */
  displayName: Scalars['String']['output']
  /** The unique identifier of an ApiVersion. All supported API versions have a date-based (YYYY-MM) or `unstable` handle. */
  handle: Scalars['String']['output']
  /** Whether the version is actively supported by Shopify. Supported API versions are guaranteed to be stable. Unsupported API versions include unstable, release candidate, and end-of-life versions that are marked as unsupported. For more information, refer to [Versioning](https://shopify.dev/api/usage/versioning). */
  supported: Scalars['Boolean']['output']
}

/**
 * The input fields for submitting Apple Pay payment method information for checkout.
 *
 */
export type ShopifyStorefrontApplePayWalletContentInput = {
  /** The customer's billing address. */
  billingAddress: ShopifyStorefrontMailingAddressInput
  /** The data for the Apple Pay wallet. */
  data: Scalars['String']['input']
  /** The header data for the Apple Pay wallet. */
  header: ShopifyStorefrontApplePayWalletHeaderInput
  /** The last digits of the card used to create the payment. */
  lastDigits?: InputMaybe<Scalars['String']['input']>
  /** The signature for the Apple Pay wallet. */
  signature: Scalars['String']['input']
  /** The version for the Apple Pay wallet. */
  version: Scalars['String']['input']
}

/**
 * The input fields for submitting wallet payment method information for checkout.
 *
 */
export type ShopifyStorefrontApplePayWalletHeaderInput = {
  /** The application data for the Apple Pay wallet. */
  applicationData?: InputMaybe<Scalars['String']['input']>
  /** The ephemeral public key for the Apple Pay wallet. */
  ephemeralPublicKey: Scalars['String']['input']
  /** The public key hash for the Apple Pay wallet. */
  publicKeyHash: Scalars['String']['input']
  /** The transaction ID for the Apple Pay wallet. */
  transactionId: Scalars['String']['input']
}

/** Details about the gift card used on the checkout. */
export interface ShopifyStorefrontAppliedGiftCard
  extends ShopifyStorefrontNode {
  __typename: 'AppliedGiftCard'
  /** The amount that was taken from the gift card by applying it. */
  amountUsed: ShopifyStorefrontMoneyV2
  /**
   * The amount that was taken from the gift card by applying it.
   * @deprecated Use `amountUsed` instead.
   */
  amountUsedV2: ShopifyStorefrontMoneyV2
  /** The amount left on the gift card. */
  balance: ShopifyStorefrontMoneyV2
  /**
   * The amount left on the gift card.
   * @deprecated Use `balance` instead.
   */
  balanceV2: ShopifyStorefrontMoneyV2
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The last characters of the gift card. */
  lastCharacters: Scalars['String']['output']
  /** The amount that was applied to the checkout in its currency. */
  presentmentAmountUsed: ShopifyStorefrontMoneyV2
}

/** An article in an online store blog. */
export interface ShopifyStorefrontArticle
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode,
    ShopifyStorefrontOnlineStorePublishable,
    ShopifyStorefrontTrackable {
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
  content: Scalars['String']['output']
  /** The content of the article, complete with HTML formatting. */
  contentHtml: Scalars['HTML']['output']
  /** Stripped excerpt of the article, single line with HTML tags removed. */
  excerpt?: Maybe<Scalars['String']['output']>
  /** The excerpt of the article, complete with HTML formatting. */
  excerptHtml?: Maybe<Scalars['HTML']['output']>
  /** A human-friendly unique string for the Article automatically generated from its title. */
  handle: Scalars['String']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The image associated with the article. */
  image?: Maybe<ShopifyStorefrontImage>
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']['output']>
  /** The date and time when the article was published. */
  publishedAt: Scalars['DateTime']['output']
  /** The article’s SEO information. */
  seo?: Maybe<ShopifyStorefrontSeo>
  /**
   * A categorization that a article can be tagged with.
   *
   */
  tags: Array<Scalars['String']['output']>
  /** The article’s name. */
  title: Scalars['String']['output']
  /** A URL parameters to be added to a page URL when it is linked from a GraphQL result. This allows for tracking the origin of the traffic. */
  trackingParameters?: Maybe<Scalars['String']['output']>
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleCommentsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleContentArgs = {
  truncateAt?: InputMaybe<Scalars['Int']['input']>
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleExcerptArgs = {
  truncateAt?: InputMaybe<Scalars['Int']['input']>
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/** An article in an online store blog. */
export type ShopifyStorefrontArticleMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/** The author of an article. */
export interface ShopifyStorefrontArticleAuthor {
  __typename: 'ArticleAuthor'
  /** The author's bio. */
  bio?: Maybe<Scalars['String']['output']>
  /** The author’s email. */
  email: Scalars['String']['output']
  /** The author's first name. */
  firstName: Scalars['String']['output']
  /** The author's last name. */
  lastName: Scalars['String']['output']
  /** The author's full name. */
  name: Scalars['String']['output']
}

/**
 * An auto-generated type for paginating through multiple Articles.
 *
 */
export interface ShopifyStorefrontArticleConnection {
  __typename: 'ArticleConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontArticleEdge>
  /** A list of the nodes contained in ArticleEdge. */
  nodes: Array<ShopifyStorefrontArticle>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one Article and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontArticleEdge {
  __typename: 'ArticleEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of ArticleEdge. */
  node: ShopifyStorefrontArticle
}

/** The set of valid sort keys for the Article query. */
export enum ShopifyStorefrontArticleSortKeys {
  /** Sort by the `author` value. */
  Author = 'AUTHOR',
  /** Sort by the `blog_title` value. */
  BlogTitle = 'BLOG_TITLE',
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `published_at` value. */
  PublishedAt = 'PUBLISHED_AT',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = 'RELEVANCE',
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
}

/** Represents a generic custom attribute. */
export interface ShopifyStorefrontAttribute {
  __typename: 'Attribute'
  /** Key or name of the attribute. */
  key: Scalars['String']['output']
  /** Value of the attribute. */
  value?: Maybe<Scalars['String']['output']>
}

/** The input fields for an attribute. */
export type ShopifyStorefrontAttributeInput = {
  /** Key or name of the attribute. */
  key: Scalars['String']['input']
  /** Value of the attribute. */
  value: Scalars['String']['input']
}

/**
 * Automatic discount applications capture the intentions of a discount that was automatically applied.
 *
 */
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
  title: Scalars['String']['output']
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
   *
   */
  ready: Scalars['Boolean']['output']
  /** The fetched shipping rates. `null` until the `ready` field is `true`. */
  shippingRates?: Maybe<Array<ShopifyStorefrontShippingRate>>
}

/** Represents a cart line common fields. */
export type ShopifyStorefrontBaseCartLine = {
  /** An attribute associated with the cart line. */
  attribute?: Maybe<ShopifyStorefrontAttribute>
  /** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
  attributes: Array<ShopifyStorefrontAttribute>
  /** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
  cost: ShopifyStorefrontCartLineCost
  /** The discounts that have been applied to the cart line. */
  discountAllocations: Array<ShopifyStorefrontCartDiscountAllocation>
  /**
   * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
   * @deprecated Use `cost` instead.
   */
  estimatedCost: ShopifyStorefrontCartLineEstimatedCost
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The merchandise that the buyer intends to purchase. */
  merchandise: ShopifyStorefrontMerchandise
  /** The quantity of the merchandise that the customer intends to purchase. */
  quantity: Scalars['Int']['output']
  /** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
  sellingPlanAllocation?: Maybe<ShopifyStorefrontSellingPlanAllocation>
}

/** Represents a cart line common fields. */
export type ShopifyStorefrontBaseCartLineAttributeArgs = {
  key: Scalars['String']['input']
}

/**
 * An auto-generated type for paginating through multiple BaseCartLines.
 *
 */
export interface ShopifyStorefrontBaseCartLineConnection {
  __typename: 'BaseCartLineConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontBaseCartLineEdge>
  /** A list of the nodes contained in BaseCartLineEdge. */
  nodes: Array<ShopifyStorefrontBaseCartLine>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one BaseCartLine and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontBaseCartLineEdge {
  __typename: 'BaseCartLineEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of BaseCartLineEdge. */
  node: ShopifyStorefrontBaseCartLine
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
  /**
   * A human-friendly unique string for the Blog automatically generated from its title.
   *
   */
  handle: Scalars['String']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']['output']>
  /** The blog's SEO information. */
  seo?: Maybe<ShopifyStorefrontSeo>
  /** The blogs’s title. */
  title: Scalars['String']['output']
}

/** An online store blog. */
export type ShopifyStorefrontBlogArticleByHandleArgs = {
  handle: Scalars['String']['input']
}

/** An online store blog. */
export type ShopifyStorefrontBlogArticlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  query?: InputMaybe<Scalars['String']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontArticleSortKeys>
}

/** An online store blog. */
export type ShopifyStorefrontBlogMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/** An online store blog. */
export type ShopifyStorefrontBlogMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/**
 * An auto-generated type for paginating through multiple Blogs.
 *
 */
export interface ShopifyStorefrontBlogConnection {
  __typename: 'BlogConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontBlogEdge>
  /** A list of the nodes contained in BlogEdge. */
  nodes: Array<ShopifyStorefrontBlog>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one Blog and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontBlogEdge {
  __typename: 'BlogEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of BlogEdge. */
  node: ShopifyStorefrontBlog
}

/** The set of valid sort keys for the Blog query. */
export enum ShopifyStorefrontBlogSortKeys {
  /** Sort by the `handle` value. */
  Handle = 'HANDLE',
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = 'RELEVANCE',
  /** Sort by the `title` value. */
  Title = 'TITLE',
}

/**
 * The store's [branding configuration](https://help.shopify.com/en/manual/promoting-marketing/managing-brand-assets).
 *
 */
export interface ShopifyStorefrontBrand {
  __typename: 'Brand'
  /** The colors of the store's brand. */
  colors: ShopifyStorefrontBrandColors
  /** The store's cover image. */
  coverImage?: Maybe<ShopifyStorefrontMediaImage>
  /** The store's default logo. */
  logo?: Maybe<ShopifyStorefrontMediaImage>
  /** The store's short description. */
  shortDescription?: Maybe<Scalars['String']['output']>
  /** The store's slogan. */
  slogan?: Maybe<Scalars['String']['output']>
  /** The store's preferred logo for square UI elements. */
  squareLogo?: Maybe<ShopifyStorefrontMediaImage>
}

/**
 * A group of related colors for the shop's brand.
 *
 */
export interface ShopifyStorefrontBrandColorGroup {
  __typename: 'BrandColorGroup'
  /** The background color. */
  background?: Maybe<Scalars['Color']['output']>
  /** The foreground color. */
  foreground?: Maybe<Scalars['Color']['output']>
}

/**
 * The colors of the shop's brand.
 *
 */
export interface ShopifyStorefrontBrandColors {
  __typename: 'BrandColors'
  /** The shop's primary brand colors. */
  primary: Array<ShopifyStorefrontBrandColorGroup>
  /** The shop's secondary brand colors. */
  secondary: Array<ShopifyStorefrontBrandColorGroup>
}

/** Card brand, such as Visa or Mastercard, which can be used for payments. */
export enum ShopifyStorefrontCardBrand {
  /** American Express. */
  AmericanExpress = 'AMERICAN_EXPRESS',
  /** Diners Club. */
  DinersClub = 'DINERS_CLUB',
  /** Discover. */
  Discover = 'DISCOVER',
  /** JCB. */
  Jcb = 'JCB',
  /** Mastercard. */
  Mastercard = 'MASTERCARD',
  /** Visa. */
  Visa = 'VISA',
}

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export interface ShopifyStorefrontCart
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode {
  __typename: 'Cart'
  /** An attribute associated with the cart. */
  attribute?: Maybe<ShopifyStorefrontAttribute>
  /** The attributes associated with the cart. Attributes are represented as key-value pairs. */
  attributes: Array<ShopifyStorefrontAttribute>
  /** Information about the buyer that's interacting with the cart. */
  buyerIdentity: ShopifyStorefrontCartBuyerIdentity
  /** The URL of the checkout for the cart. */
  checkoutUrl: Scalars['URL']['output']
  /** The estimated costs that the buyer will pay at checkout. The costs are subject to change and changes will be reflected at checkout. The `cost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing). */
  cost: ShopifyStorefrontCartCost
  /** The date and time when the cart was created. */
  createdAt: Scalars['DateTime']['output']
  /**
   * The delivery groups available for the cart, based on the buyer identity default
   * delivery address preference or the default address of the logged-in customer.
   *
   */
  deliveryGroups: ShopifyStorefrontCartDeliveryGroupConnection
  /** The discounts that have been applied to the entire cart. */
  discountAllocations: Array<ShopifyStorefrontCartDiscountAllocation>
  /** The case-insensitive discount codes that the customer added at checkout. */
  discountCodes: Array<ShopifyStorefrontCartDiscountCode>
  /**
   * The estimated costs that the buyer will pay at checkout. The estimated costs are subject to change and changes will be reflected at checkout. The `estimatedCost` field uses the `buyerIdentity` field to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
   * @deprecated Use `cost` instead.
   */
  estimatedCost: ShopifyStorefrontCartEstimatedCost
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** A list of lines containing information about the items the customer intends to purchase. */
  lines: ShopifyStorefrontBaseCartLineConnection
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /** A note that's associated with the cart. For example, the note can be a personalized message to the buyer. */
  note?: Maybe<Scalars['String']['output']>
  /** The total number of items in the cart. */
  totalQuantity: Scalars['Int']['output']
  /** The date and time when the cart was updated. */
  updatedAt: Scalars['DateTime']['output']
}

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type ShopifyStorefrontCartAttributeArgs = {
  key: Scalars['String']['input']
}

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type ShopifyStorefrontCartDeliveryGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type ShopifyStorefrontCartLinesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type ShopifyStorefrontCartMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/**
 * A cart represents the merchandise that a buyer intends to purchase,
 * and the estimated cost associated with the cart. Learn how to
 * [interact with a cart](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * during a customer's session.
 *
 */
export type ShopifyStorefrontCartMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
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
  title: Scalars['String']['output']
}

/** Represents information about the buyer that is interacting with the cart. */
export interface ShopifyStorefrontCartBuyerIdentity {
  __typename: 'CartBuyerIdentity'
  /** The country where the buyer is located. */
  countryCode?: Maybe<ShopifyStorefrontCountryCode>
  /** The customer account associated with the cart. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /**
   * An ordered set of delivery addresses tied to the buyer that is interacting with the cart.
   * The rank of the preferences is determined by the order of the addresses in the array. Preferences
   * can be used to populate relevant fields in the checkout flow.
   *
   */
  deliveryAddressPreferences: Array<ShopifyStorefrontDeliveryAddress>
  /** The email address of the buyer that's interacting with the cart. */
  email?: Maybe<Scalars['String']['output']>
  /** The phone number of the buyer that's interacting with the cart. */
  phone?: Maybe<Scalars['String']['output']>
  /**
   * A set of wallet preferences tied to the buyer that is interacting with the cart.
   * Preferences can be used to populate relevant payment fields in the checkout flow.
   *
   */
  walletPreferences: Array<Scalars['String']['output']>
}

/**
 * Specifies the input fields to update the buyer information associated with a cart.
 * Buyer identity is used to determine
 * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing)
 * and should match the customer's shipping address.
 *
 */
export type ShopifyStorefrontCartBuyerIdentityInput = {
  /** The country where the buyer is located. */
  countryCode?: InputMaybe<ShopifyStorefrontCountryCode>
  /** The access token used to identify the customer associated with the cart. */
  customerAccessToken?: InputMaybe<Scalars['String']['input']>
  /**
   * An ordered set of delivery addresses tied to the buyer that is interacting with the cart.
   * The rank of the preferences is determined by the order of the addresses in the array. Preferences
   * can be used to populate relevant fields in the checkout flow.
   *
   * The input must not contain more than `250` values.
   */
  deliveryAddressPreferences?: InputMaybe<
    Array<ShopifyStorefrontDeliveryAddressInput>
  >
  /** The email address of the buyer that is interacting with the cart. */
  email?: InputMaybe<Scalars['String']['input']>
  /** The phone number of the buyer that is interacting with the cart. */
  phone?: InputMaybe<Scalars['String']['input']>
  /**
   * A set of wallet preferences tied to the buyer that is interacting with the cart.
   * Preferences can be used to populate relevant payment fields in the checkout flow.
   *   Accepted value: `["shop_pay"]`.
   *
   * The input must not contain more than `250` values.
   */
  walletPreferences?: InputMaybe<Array<Scalars['String']['input']>>
}

/** Return type for `cartBuyerIdentityUpdate` mutation. */
export interface ShopifyStorefrontCartBuyerIdentityUpdatePayload {
  __typename: 'CartBuyerIdentityUpdatePayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/**
 * Represents how credit card details are provided for a direct payment.
 *
 */
export enum ShopifyStorefrontCartCardSource {
  /**
   * The credit card was provided by a third party and vaulted on their system.
   * Using this value requires a separate permission from Shopify.
   *
   */
  SavedCreditCard = 'SAVED_CREDIT_CARD',
}

/** The discount that has been applied to the cart line using a discount code. */
export interface ShopifyStorefrontCartCodeDiscountAllocation
  extends ShopifyStorefrontCartDiscountAllocation {
  __typename: 'CartCodeDiscountAllocation'
  /** The code used to apply the discount. */
  code: Scalars['String']['output']
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: ShopifyStorefrontMoneyV2
}

/** The completion action to checkout a cart. */
export type ShopifyStorefrontCartCompletionAction =
  ShopifyStorefrontCompletePaymentChallenge

/** The required completion action to checkout a cart. */
export interface ShopifyStorefrontCartCompletionActionRequired {
  __typename: 'CartCompletionActionRequired'
  /** The action required to complete the cart completion attempt. */
  action?: Maybe<ShopifyStorefrontCartCompletionAction>
  /** The ID of the cart completion attempt. */
  id: Scalars['String']['output']
}

/** The result of a cart completion attempt. */
export type ShopifyStorefrontCartCompletionAttemptResult =
  | ShopifyStorefrontCartCompletionActionRequired
  | ShopifyStorefrontCartCompletionFailed
  | ShopifyStorefrontCartCompletionProcessing
  | ShopifyStorefrontCartCompletionSuccess

/** A failed completion to checkout a cart. */
export interface ShopifyStorefrontCartCompletionFailed {
  __typename: 'CartCompletionFailed'
  /** The errors that caused the checkout to fail. */
  errors: Array<ShopifyStorefrontCompletionError>
  /** The ID of the cart completion attempt. */
  id: Scalars['String']['output']
}

/** A cart checkout completion that's still processing. */
export interface ShopifyStorefrontCartCompletionProcessing {
  __typename: 'CartCompletionProcessing'
  /** The ID of the cart completion attempt. */
  id: Scalars['String']['output']
  /** The number of milliseconds to wait before polling again. */
  pollDelay: Scalars['Int']['output']
}

/** A successful completion to checkout a cart and a created order. */
export interface ShopifyStorefrontCartCompletionSuccess {
  __typename: 'CartCompletionSuccess'
  /** The date and time when the job completed. */
  completedAt?: Maybe<Scalars['DateTime']['output']>
  /** The ID of the cart completion attempt. */
  id: Scalars['String']['output']
  /** The ID of the order that's created in Shopify. */
  orderId: Scalars['ID']['output']
  /** The URL of the order confirmation in Shopify. */
  orderUrl: Scalars['URL']['output']
}

/**
 * The costs that the buyer will pay at checkout.
 * The cart cost uses [`CartBuyerIdentity`](https://shopify.dev/api/storefront/reference/cart/cartbuyeridentity) to determine
 * [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing).
 *
 */
export interface ShopifyStorefrontCartCost {
  __typename: 'CartCost'
  /** The estimated amount, before taxes and discounts, for the customer to pay at checkout. The checkout charge amount doesn't include any deferred payments that'll be paid at a later date. If the cart has no deferred payments, then the checkout charge amount is equivalent to `subtotalAmount`. */
  checkoutChargeAmount: ShopifyStorefrontMoneyV2
  /** The amount, before taxes and cart-level discounts, for the customer to pay. */
  subtotalAmount: ShopifyStorefrontMoneyV2
  /** Whether the subtotal amount is estimated. */
  subtotalAmountEstimated: Scalars['Boolean']['output']
  /** The total amount for the customer to pay. */
  totalAmount: ShopifyStorefrontMoneyV2
  /** Whether the total amount is estimated. */
  totalAmountEstimated: Scalars['Boolean']['output']
  /** The duty amount for the customer to pay at checkout. */
  totalDutyAmount?: Maybe<ShopifyStorefrontMoneyV2>
  /** Whether the total duty amount is estimated. */
  totalDutyAmountEstimated: Scalars['Boolean']['output']
  /** The tax amount for the customer to pay at checkout. */
  totalTaxAmount?: Maybe<ShopifyStorefrontMoneyV2>
  /** Whether the total tax amount is estimated. */
  totalTaxAmountEstimated: Scalars['Boolean']['output']
}

/** Return type for `cartCreate` mutation. */
export interface ShopifyStorefrontCartCreatePayload {
  __typename: 'CartCreatePayload'
  /** The new cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** The discounts automatically applied to the cart line based on prerequisites that have been met. */
export interface ShopifyStorefrontCartCustomDiscountAllocation
  extends ShopifyStorefrontCartDiscountAllocation {
  __typename: 'CartCustomDiscountAllocation'
  /** The discounted amount that has been applied to the cart line. */
  discountedAmount: ShopifyStorefrontMoneyV2
  /** The title of the allocated discount. */
  title: Scalars['String']['output']
}

/** Information about the options available for one or more line items to be delivered to a specific address. */
export interface ShopifyStorefrontCartDeliveryGroup {
  __typename: 'CartDeliveryGroup'
  /** A list of cart lines for the delivery group. */
  cartLines: ShopifyStorefrontBaseCartLineConnection
  /** The destination address for the delivery group. */
  deliveryAddress: ShopifyStorefrontMailingAddress
  /** The delivery options available for the delivery group. */
  deliveryOptions: Array<ShopifyStorefrontCartDeliveryOption>
  /** The ID for the delivery group. */
  id: Scalars['ID']['output']
  /** The selected delivery option for the delivery group. */
  selectedDeliveryOption?: Maybe<ShopifyStorefrontCartDeliveryOption>
}

/** Information about the options available for one or more line items to be delivered to a specific address. */
export type ShopifyStorefrontCartDeliveryGroupCartLinesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/**
 * An auto-generated type for paginating through multiple CartDeliveryGroups.
 *
 */
export interface ShopifyStorefrontCartDeliveryGroupConnection {
  __typename: 'CartDeliveryGroupConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontCartDeliveryGroupEdge>
  /** A list of the nodes contained in CartDeliveryGroupEdge. */
  nodes: Array<ShopifyStorefrontCartDeliveryGroup>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one CartDeliveryGroup and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontCartDeliveryGroupEdge {
  __typename: 'CartDeliveryGroupEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of CartDeliveryGroupEdge. */
  node: ShopifyStorefrontCartDeliveryGroup
}

/** Information about a delivery option. */
export interface ShopifyStorefrontCartDeliveryOption {
  __typename: 'CartDeliveryOption'
  /** The code of the delivery option. */
  code?: Maybe<Scalars['String']['output']>
  /** The method for the delivery option. */
  deliveryMethodType: ShopifyStorefrontDeliveryMethodType
  /** The description of the delivery option. */
  description?: Maybe<Scalars['String']['output']>
  /** The estimated cost for the delivery option. */
  estimatedCost: ShopifyStorefrontMoneyV2
  /** The unique identifier of the delivery option. */
  handle: Scalars['String']['output']
  /** The title of the delivery option. */
  title?: Maybe<Scalars['String']['output']>
}

/**
 * The input fields for submitting direct payment method information for checkout.
 *
 */
export type ShopifyStorefrontCartDirectPaymentMethodInput = {
  /** The customer's billing address. */
  billingAddress: ShopifyStorefrontMailingAddressInput
  /** The source of the credit card payment. */
  cardSource?: InputMaybe<ShopifyStorefrontCartCardSource>
  /** The session ID for the direct payment method used to create the payment. */
  sessionId: Scalars['String']['input']
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
  applicable: Scalars['Boolean']['output']
  /** The code for the discount. */
  code: Scalars['String']['output']
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
  /** Delivery group was not found in cart. */
  InvalidDeliveryGroup = 'INVALID_DELIVERY_GROUP',
  /** Delivery option was not valid. */
  InvalidDeliveryOption = 'INVALID_DELIVERY_OPTION',
  /** Merchandise line was not found in cart. */
  InvalidMerchandiseLine = 'INVALID_MERCHANDISE_LINE',
  /** The metafields were not valid. */
  InvalidMetafields = 'INVALID_METAFIELDS',
  /** The payment wasn't valid. */
  InvalidPayment = 'INVALID_PAYMENT',
  /** Cannot update payment on an empty cart */
  InvalidPaymentEmptyCart = 'INVALID_PAYMENT_EMPTY_CART',
  /** The input value should be less than the maximum value allowed. */
  LessThan = 'LESS_THAN',
  /** Missing discount code. */
  MissingDiscountCode = 'MISSING_DISCOUNT_CODE',
  /** Missing note. */
  MissingNote = 'MISSING_NOTE',
  /** The payment method is not supported. */
  PaymentMethodNotSupported = 'PAYMENT_METHOD_NOT_SUPPORTED',
}

/** The estimated costs that the buyer will pay at checkout. The estimated cost uses [`CartBuyerIdentity`](https://shopify.dev/api/storefront/reference/cart/cartbuyeridentity) to determine [international pricing](https://shopify.dev/custom-storefronts/internationalization/international-pricing). */
export interface ShopifyStorefrontCartEstimatedCost {
  __typename: 'CartEstimatedCost'
  /** The estimated amount, before taxes and discounts, for the customer to pay at checkout. The checkout charge amount doesn't include any deferred payments that'll be paid at a later date. If the cart has no deferred payments, then the checkout charge amount is equivalent to`subtotal_amount`. */
  checkoutChargeAmount: ShopifyStorefrontMoneyV2
  /** The estimated amount, before taxes and discounts, for the customer to pay. */
  subtotalAmount: ShopifyStorefrontMoneyV2
  /** The estimated total amount for the customer to pay. */
  totalAmount: ShopifyStorefrontMoneyV2
  /** The estimated duty amount for the customer to pay at checkout. */
  totalDutyAmount?: Maybe<ShopifyStorefrontMoneyV2>
  /** The estimated tax amount for the customer to pay at checkout. */
  totalTaxAmount?: Maybe<ShopifyStorefrontMoneyV2>
}

/**
 * The input fields for submitting a billing address without a selected payment method.
 *
 */
export type ShopifyStorefrontCartFreePaymentMethodInput = {
  /** The customer's billing address. */
  billingAddress: ShopifyStorefrontMailingAddressInput
}

/** The input fields to create a cart. */
export type ShopifyStorefrontCartInput = {
  /**
   * An array of key-value pairs that contains additional information about the cart.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: InputMaybe<Array<ShopifyStorefrontAttributeInput>>
  /**
   * The customer associated with the cart. Used to determine [international pricing]
   * (https://shopify.dev/custom-storefronts/internationalization/international-pricing).
   * Buyer identity should match the customer's shipping address.
   *
   */
  buyerIdentity?: InputMaybe<ShopifyStorefrontCartBuyerIdentityInput>
  /**
   * The case-insensitive discount codes that the customer added at checkout.
   *
   * The input must not contain more than `250` values.
   */
  discountCodes?: InputMaybe<Array<Scalars['String']['input']>>
  /**
   * A list of merchandise lines to add to the cart.
   *
   * The input must not contain more than `250` values.
   */
  lines?: InputMaybe<Array<ShopifyStorefrontCartLineInput>>
  /**
   * The metafields to associate with this cart.
   *
   * The input must not contain more than `250` values.
   */
  metafields?: InputMaybe<Array<ShopifyStorefrontCartInputMetafieldInput>>
  /**
   * A note that's associated with the cart. For example, the note can be a personalized message to the buyer.
   *
   */
  note?: InputMaybe<Scalars['String']['input']>
}

/** The input fields for a cart metafield value to set. */
export type ShopifyStorefrontCartInputMetafieldInput = {
  /** The key name of the metafield. */
  key: Scalars['String']['input']
  /**
   * The type of data that the cart metafield stores.
   * The type of data must be a [supported type](https://shopify.dev/apps/metafields/types).
   *
   */
  type: Scalars['String']['input']
  /**
   * The data to store in the cart metafield. The data is always stored as a string, regardless of the metafield's type.
   *
   */
  value: Scalars['String']['input']
}

/** Represents information about the merchandise in the cart. */
export interface ShopifyStorefrontCartLine
  extends ShopifyStorefrontBaseCartLine,
    ShopifyStorefrontNode {
  __typename: 'CartLine'
  /** An attribute associated with the cart line. */
  attribute?: Maybe<ShopifyStorefrontAttribute>
  /** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
  attributes: Array<ShopifyStorefrontAttribute>
  /** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
  cost: ShopifyStorefrontCartLineCost
  /** The discounts that have been applied to the cart line. */
  discountAllocations: Array<ShopifyStorefrontCartDiscountAllocation>
  /**
   * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
   * @deprecated Use `cost` instead.
   */
  estimatedCost: ShopifyStorefrontCartLineEstimatedCost
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The merchandise that the buyer intends to purchase. */
  merchandise: ShopifyStorefrontMerchandise
  /** The quantity of the merchandise that the customer intends to purchase. */
  quantity: Scalars['Int']['output']
  /** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
  sellingPlanAllocation?: Maybe<ShopifyStorefrontSellingPlanAllocation>
}

/** Represents information about the merchandise in the cart. */
export type ShopifyStorefrontCartLineAttributeArgs = {
  key: Scalars['String']['input']
}

/** The cost of the merchandise line that the buyer will pay at checkout. */
export interface ShopifyStorefrontCartLineCost {
  __typename: 'CartLineCost'
  /** The amount of the merchandise line. */
  amountPerQuantity: ShopifyStorefrontMoneyV2
  /** The compare at amount of the merchandise line. */
  compareAtAmountPerQuantity?: Maybe<ShopifyStorefrontMoneyV2>
  /** The cost of the merchandise line before line-level discounts. */
  subtotalAmount: ShopifyStorefrontMoneyV2
  /** The total cost of the merchandise line. */
  totalAmount: ShopifyStorefrontMoneyV2
}

/**
 * The estimated cost of the merchandise line that the buyer will pay at checkout.
 *
 */
export interface ShopifyStorefrontCartLineEstimatedCost {
  __typename: 'CartLineEstimatedCost'
  /** The amount of the merchandise line. */
  amount: ShopifyStorefrontMoneyV2
  /** The compare at amount of the merchandise line. */
  compareAtAmount?: Maybe<ShopifyStorefrontMoneyV2>
  /** The estimated cost of the merchandise line before discounts. */
  subtotalAmount: ShopifyStorefrontMoneyV2
  /** The estimated total cost of the merchandise line. */
  totalAmount: ShopifyStorefrontMoneyV2
}

/** The input fields to create a merchandise line on a cart. */
export type ShopifyStorefrontCartLineInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: InputMaybe<Array<ShopifyStorefrontAttributeInput>>
  /** The ID of the merchandise that the buyer intends to purchase. */
  merchandiseId: Scalars['ID']['input']
  /** The quantity of the merchandise. */
  quantity?: InputMaybe<Scalars['Int']['input']>
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: InputMaybe<Scalars['ID']['input']>
}

/** The input fields to update a line item on a cart. */
export type ShopifyStorefrontCartLineUpdateInput = {
  /**
   * An array of key-value pairs that contains additional information about the merchandise line.
   *
   * The input must not contain more than `250` values.
   */
  attributes?: InputMaybe<Array<ShopifyStorefrontAttributeInput>>
  /** The ID of the merchandise line. */
  id: Scalars['ID']['input']
  /** The ID of the merchandise for the line item. */
  merchandiseId?: InputMaybe<Scalars['ID']['input']>
  /** The quantity of the line item. */
  quantity?: InputMaybe<Scalars['Int']['input']>
  /** The ID of the selling plan that the merchandise is being purchased with. */
  sellingPlanId?: InputMaybe<Scalars['ID']['input']>
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

/** The input fields to delete a cart metafield. */
export type ShopifyStorefrontCartMetafieldDeleteInput = {
  /**
   * The key name of the cart metafield. Can either be a composite key (`namespace.key`) or a simple key
   *  that relies on the default app-reserved namespace.
   *
   */
  key: Scalars['String']['input']
  /** The ID of the cart resource. */
  ownerId: Scalars['ID']['input']
}

/** Return type for `cartMetafieldDelete` mutation. */
export interface ShopifyStorefrontCartMetafieldDeletePayload {
  __typename: 'CartMetafieldDeletePayload'
  /** The ID of the deleted cart metafield. */
  deletedId?: Maybe<Scalars['ID']['output']>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontMetafieldDeleteUserError>
}

/** The input fields for a cart metafield value to set. */
export type ShopifyStorefrontCartMetafieldsSetInput = {
  /** The key name of the cart metafield. */
  key: Scalars['String']['input']
  /** The ID of the cart resource. */
  ownerId: Scalars['ID']['input']
  /**
   * The type of data that the cart metafield stores.
   * The type of data must be a [supported type](https://shopify.dev/apps/metafields/types).
   *
   */
  type: Scalars['String']['input']
  /**
   * The data to store in the cart metafield. The data is always stored as a string, regardless of the metafield's type.
   *
   */
  value: Scalars['String']['input']
}

/** Return type for `cartMetafieldsSet` mutation. */
export interface ShopifyStorefrontCartMetafieldsSetPayload {
  __typename: 'CartMetafieldsSetPayload'
  /** The list of cart metafields that were set. */
  metafields?: Maybe<Array<ShopifyStorefrontMetafield>>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontMetafieldsSetUserError>
}

/** Return type for `cartNoteUpdate` mutation. */
export interface ShopifyStorefrontCartNoteUpdatePayload {
  __typename: 'CartNoteUpdatePayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/**
 * The input fields for updating the payment method that will be used to checkout.
 *
 */
export type ShopifyStorefrontCartPaymentInput = {
  /** The amount that the customer will be charged at checkout. */
  amount: ShopifyStorefrontMoneyInput
  /**
   * The input fields to use when checking out a cart with a direct payment method (like a credit card).
   *
   */
  directPaymentMethod?: InputMaybe<ShopifyStorefrontCartDirectPaymentMethodInput>
  /**
   * The input fields to use to checkout a cart without providing a payment method.
   * Use this payment method input if the total cost of the cart is 0.
   *
   */
  freePaymentMethod?: InputMaybe<ShopifyStorefrontCartFreePaymentMethodInput>
  /**
   * An ID of the order placed on the originating platform.
   * Note that this value doesn't correspond to the Shopify Order ID.
   *
   */
  sourceIdentifier?: InputMaybe<Scalars['String']['input']>
  /**
   * The input fields to use when checking out a cart with a wallet payment method (like Shop Pay or Apple Pay).
   *
   */
  walletPaymentMethod?: InputMaybe<ShopifyStorefrontCartWalletPaymentMethodInput>
}

/** Return type for `cartPaymentUpdate` mutation. */
export interface ShopifyStorefrontCartPaymentUpdatePayload {
  __typename: 'CartPaymentUpdatePayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/**
 * The input fields for updating the selected delivery options for a delivery group.
 *
 */
export type ShopifyStorefrontCartSelectedDeliveryOptionInput = {
  /** The ID of the cart delivery group. */
  deliveryGroupId: Scalars['ID']['input']
  /** The handle of the selected delivery option. */
  deliveryOptionHandle: Scalars['String']['input']
}

/** Return type for `cartSelectedDeliveryOptionsUpdate` mutation. */
export interface ShopifyStorefrontCartSelectedDeliveryOptionsUpdatePayload {
  __typename: 'CartSelectedDeliveryOptionsUpdatePayload'
  /** The updated cart. */
  cart?: Maybe<ShopifyStorefrontCart>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** Return type for `cartSubmitForCompletion` mutation. */
export interface ShopifyStorefrontCartSubmitForCompletionPayload {
  __typename: 'CartSubmitForCompletionPayload'
  /** The result of cart submission for completion. */
  result?: Maybe<ShopifyStorefrontCartSubmitForCompletionResult>
  /** The list of errors that occurred from executing the mutation. */
  userErrors: Array<ShopifyStorefrontCartUserError>
}

/** The result of cart submit completion. */
export type ShopifyStorefrontCartSubmitForCompletionResult =
  | ShopifyStorefrontSubmitAlreadyAccepted
  | ShopifyStorefrontSubmitFailed
  | ShopifyStorefrontSubmitSuccess
  | ShopifyStorefrontSubmitThrottled

/** Represents an error that happens during execution of a cart mutation. */
export interface ShopifyStorefrontCartUserError
  extends ShopifyStorefrontDisplayableError {
  __typename: 'CartUserError'
  /** The error code. */
  code?: Maybe<ShopifyStorefrontCartErrorCode>
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>
  /** The error message. */
  message: Scalars['String']['output']
}

/**
 * The input fields for submitting wallet payment method information for checkout.
 *
 */
export type ShopifyStorefrontCartWalletPaymentMethodInput = {
  /** The payment method information for the Apple Pay wallet. */
  applePayWalletContent?: InputMaybe<ShopifyStorefrontApplePayWalletContentInput>
  /** The payment method information for the Shop Pay wallet. */
  shopPayWalletContent?: InputMaybe<ShopifyStorefrontShopPayWalletContentInput>
}

/**
 * A container for all the information required to checkout items and pay.
 *
 * The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
 *
 */
export interface ShopifyStorefrontCheckout extends ShopifyStorefrontNode {
  __typename: 'Checkout'
  /** The gift cards used on the checkout. */
  appliedGiftCards: Array<ShopifyStorefrontAppliedGiftCard>
  /**
   * The available shipping rates for this Checkout.
   * Should only be used when checkout `requiresShipping` is `true` and
   * the shipping address is valid.
   *
   */
  availableShippingRates?: Maybe<ShopifyStorefrontAvailableShippingRates>
  /** The identity of the customer associated with the checkout. */
  buyerIdentity: ShopifyStorefrontCheckoutBuyerIdentity
  /** The date and time when the checkout was completed. */
  completedAt?: Maybe<Scalars['DateTime']['output']>
  /** The date and time when the checkout was created. */
  createdAt: Scalars['DateTime']['output']
  /** The currency code for the checkout. */
  currencyCode: ShopifyStorefrontCurrencyCode
  /** A list of extra information that's added to the checkout. */
  customAttributes: Array<ShopifyStorefrontAttribute>
  /** Discounts that have been applied on the checkout. */
  discountApplications: ShopifyStorefrontDiscountApplicationConnection
  /** The email attached to this checkout. */
  email?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** A list of line item objects, each one containing information about an item in the checkout. */
  lineItems: ShopifyStorefrontCheckoutLineItemConnection
  /** The sum of all the prices of all the items in the checkout. Duties, taxes, shipping and discounts excluded. */
  lineItemsSubtotalPrice: ShopifyStorefrontMoneyV2
  /** The note associated with the checkout. */
  note?: Maybe<Scalars['String']['output']>
  /** The resulting order from a paid checkout. */
  order?: Maybe<ShopifyStorefrontOrder>
  /** The <b>Order status</b> page for this Checkout, null when checkout isn't completed. */
  orderStatusUrl?: Maybe<Scalars['URL']['output']>
  /** The amount left to be paid. This is equal to the cost of the line items, taxes, and shipping, minus discounts and gift cards. */
  paymentDue: ShopifyStorefrontMoneyV2
  /**
   * The amount left to be paid. This is equal to the cost of the line items, duties, taxes, and shipping, minus discounts and gift cards.
   * @deprecated Use `paymentDue` instead.
   */
  paymentDueV2: ShopifyStorefrontMoneyV2
  /**
   * Whether or not the Checkout is ready and can be completed. Checkouts may
   * have asynchronous operations that can take time to finish. If you want
   * to complete a checkout or ensure all the fields are populated and up to
   * date, polling is required until the value is true.
   *
   */
  ready: Scalars['Boolean']['output']
  /** States whether or not the fulfillment requires shipping. */
  requiresShipping: Scalars['Boolean']['output']
  /** The shipping address to where the line items will be shipped. */
  shippingAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /**
   * The discounts that have been allocated onto the shipping line by discount applications.
   *
   */
  shippingDiscountAllocations: Array<ShopifyStorefrontDiscountAllocation>
  /** Once a shipping rate is selected by the customer it's transitioned to a `shipping_line` object. */
  shippingLine?: Maybe<ShopifyStorefrontShippingRate>
  /** The price at checkout before shipping and taxes. */
  subtotalPrice: ShopifyStorefrontMoneyV2
  /**
   * The price at checkout before duties, shipping, and taxes.
   * @deprecated Use `subtotalPrice` instead.
   */
  subtotalPriceV2: ShopifyStorefrontMoneyV2
  /** Whether the checkout is tax exempt. */
  taxExempt: Scalars['Boolean']['output']
  /** Whether taxes are included in the line item and shipping line prices. */
  taxesIncluded: Scalars['Boolean']['output']
  /** The sum of all the duties applied to the line items in the checkout. */
  totalDuties?: Maybe<ShopifyStorefrontMoneyV2>
  /** The sum of all the prices of all the items in the checkout, including taxes and duties. */
  totalPrice: ShopifyStorefrontMoneyV2
  /**
   * The sum of all the prices of all the items in the checkout, including taxes and duties.
   * @deprecated Use `totalPrice` instead.
   */
  totalPriceV2: ShopifyStorefrontMoneyV2
  /** The sum of all the taxes applied to the line items and shipping lines in the checkout. */
  totalTax: ShopifyStorefrontMoneyV2
  /**
   * The sum of all the taxes applied to the line items and shipping lines in the checkout.
   * @deprecated Use `totalTax` instead.
   */
  totalTaxV2: ShopifyStorefrontMoneyV2
  /** The date and time when the checkout was last updated. */
  updatedAt: Scalars['DateTime']['output']
  /** The url pointing to the checkout accessible from the web. */
  webUrl: Scalars['URL']['output']
}

/**
 * A container for all the information required to checkout items and pay.
 *
 * The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
 *
 */
export type ShopifyStorefrontCheckoutDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/**
 * A container for all the information required to checkout items and pay.
 *
 * The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
 *
 */
export type ShopifyStorefrontCheckoutLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/** The input fields required to update a checkout's attributes. */
export type ShopifyStorefrontCheckoutAttributesUpdateV2Input = {
  /**
   * Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
   * The required attributes are city, province, and country.
   * Full validation of the addresses is still done at completion time. Defaults to `false` with
   * each operation.
   *
   */
  allowPartialAddresses?: InputMaybe<Scalars['Boolean']['input']>
  /**
   * A list of extra information that's added to the checkout.
   *
   * The input must not contain more than `250` values.
   */
  customAttributes?: InputMaybe<Array<ShopifyStorefrontAttributeInput>>
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: InputMaybe<Scalars['String']['input']>
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
   *
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
  /**
   * Allows setting partial addresses on a Checkout, skipping the full validation of attributes.
   * The required attributes are city, province, and country.
   * Full validation of addresses is still done at completion time. Defaults to `null`.
   *
   */
  allowPartialAddresses?: InputMaybe<Scalars['Boolean']['input']>
  /** The identity of the customer associated with the checkout. */
  buyerIdentity?: InputMaybe<ShopifyStorefrontCheckoutBuyerIdentityInput>
  /**
   * A list of extra information that's added to the checkout.
   *
   * The input must not contain more than `250` values.
   */
  customAttributes?: InputMaybe<Array<ShopifyStorefrontAttributeInput>>
  /** The email with which the customer wants to checkout. */
  email?: InputMaybe<Scalars['String']['input']>
  /**
   * A list of line item objects, each one containing information about an item in the checkout.
   *
   * The input must not contain more than `250` values.
   */
  lineItems?: InputMaybe<Array<ShopifyStorefrontCheckoutLineItemInput>>
  /** The text of an optional note that a shop owner can attach to the checkout. */
  note?: InputMaybe<Scalars['String']['input']>
  /** The shipping address to where the line items will be shipped. */
  shippingAddress?: InputMaybe<ShopifyStorefrontMailingAddressInput>
}

/** Return type for `checkoutCreate` mutation. */
export interface ShopifyStorefrontCheckoutCreatePayload {
  __typename: 'CheckoutCreatePayload'
  /** The new checkout object. */
  checkout?: Maybe<ShopifyStorefrontCheckout>
  /** The list of errors that occurred from executing the mutation. */
  checkoutUserErrors: Array<ShopifyStorefrontCheckoutUserError>
  /** The checkout queue token. Available only to selected stores. */
  queueToken?: Maybe<Scalars['String']['output']>
  /**
   * The list of errors that occurred from executing the mutation.
   * @deprecated Use `checkoutUserErrors` instead.
   */
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
  /** Checkout is already completed. */
  AlreadyCompleted = 'ALREADY_COMPLETED',
  /** Input email contains an invalid domain name. */
  BadDomain = 'BAD_DOMAIN',
  /** The input value is blank. */
  Blank = 'BLANK',
  /** Cart does not meet discount requirements notice. */
  CartDoesNotMeetDiscountRequirementsNotice = 'CART_DOES_NOT_MEET_DISCOUNT_REQUIREMENTS_NOTICE',
  /** Customer already used once per customer discount notice. */
  CustomerAlreadyUsedOncePerCustomerDiscountNotice = 'CUSTOMER_ALREADY_USED_ONCE_PER_CUSTOMER_DISCOUNT_NOTICE',
  /** Discount already applied. */
  DiscountAlreadyApplied = 'DISCOUNT_ALREADY_APPLIED',
  /** Discount code isn't working right now. Please contact us for help. */
  DiscountCodeApplicationFailed = 'DISCOUNT_CODE_APPLICATION_FAILED',
  /** Discount disabled. */
  DiscountDisabled = 'DISCOUNT_DISABLED',
  /** Discount expired. */
  DiscountExpired = 'DISCOUNT_EXPIRED',
  /** Discount limit reached. */
  DiscountLimitReached = 'DISCOUNT_LIMIT_REACHED',
  /** Discount not found. */
  DiscountNotFound = 'DISCOUNT_NOT_FOUND',
  /** Checkout is already completed. */
  Empty = 'EMPTY',
  /** Queue token has expired. */
  ExpiredQueueToken = 'EXPIRED_QUEUE_TOKEN',
  /** Gift card has already been applied. */
  GiftCardAlreadyApplied = 'GIFT_CARD_ALREADY_APPLIED',
  /** Gift card code is invalid. */
  GiftCardCodeInvalid = 'GIFT_CARD_CODE_INVALID',
  /** Gift card currency does not match checkout currency. */
  GiftCardCurrencyMismatch = 'GIFT_CARD_CURRENCY_MISMATCH',
  /** Gift card has no funds left. */
  GiftCardDepleted = 'GIFT_CARD_DEPLETED',
  /** Gift card is disabled. */
  GiftCardDisabled = 'GIFT_CARD_DISABLED',
  /** Gift card is expired. */
  GiftCardExpired = 'GIFT_CARD_EXPIRED',
  /** Gift card was not found. */
  GiftCardNotFound = 'GIFT_CARD_NOT_FOUND',
  /** Gift card cannot be applied to a checkout that contains a gift card. */
  GiftCardUnusable = 'GIFT_CARD_UNUSABLE',
  /** The input value should be greater than or equal to the minimum value allowed. */
  GreaterThanOrEqualTo = 'GREATER_THAN_OR_EQUAL_TO',
  /** Higher value discount applied. */
  HigherValueDiscountApplied = 'HIGHER_VALUE_DISCOUNT_APPLIED',
  /** The input value is invalid. */
  Invalid = 'INVALID',
  /** Cannot specify country and presentment currency code. */
  InvalidCountryAndCurrency = 'INVALID_COUNTRY_AND_CURRENCY',
  /** Input Zip is invalid for country provided. */
  InvalidForCountry = 'INVALID_FOR_COUNTRY',
  /** Input Zip is invalid for country and province provided. */
  InvalidForCountryAndProvince = 'INVALID_FOR_COUNTRY_AND_PROVINCE',
  /** Invalid province in country. */
  InvalidProvinceInCountry = 'INVALID_PROVINCE_IN_COUNTRY',
  /** Queue token is invalid. */
  InvalidQueueToken = 'INVALID_QUEUE_TOKEN',
  /** Invalid region in country. */
  InvalidRegionInCountry = 'INVALID_REGION_IN_COUNTRY',
  /** Invalid state in country. */
  InvalidStateInCountry = 'INVALID_STATE_IN_COUNTRY',
  /** The input value should be less than the maximum value allowed. */
  LessThan = 'LESS_THAN',
  /** The input value should be less than or equal to the maximum value allowed. */
  LessThanOrEqualTo = 'LESS_THAN_OR_EQUAL_TO',
  /** Line item was not found in checkout. */
  LineItemNotFound = 'LINE_ITEM_NOT_FOUND',
  /** Checkout is locked. */
  Locked = 'LOCKED',
  /** Maximum number of discount codes limit reached. */
  MaximumDiscountCodeLimitReached = 'MAXIMUM_DISCOUNT_CODE_LIMIT_REACHED',
  /** Missing payment input. */
  MissingPaymentInput = 'MISSING_PAYMENT_INPUT',
  /** Not enough in stock. */
  NotEnoughInStock = 'NOT_ENOUGH_IN_STOCK',
  /** Input value is not supported. */
  NotSupported = 'NOT_SUPPORTED',
  /** The input value needs to be blank. */
  Present = 'PRESENT',
  /** Product is not published for this customer. */
  ProductNotAvailable = 'PRODUCT_NOT_AVAILABLE',
  /** Shipping rate expired. */
  ShippingRateExpired = 'SHIPPING_RATE_EXPIRED',
  /** Throttled during checkout. */
  ThrottledDuringCheckout = 'THROTTLED_DURING_CHECKOUT',
  /** The input value is too long. */
  TooLong = 'TOO_LONG',
  /** The amount of the payment does not match the value to be paid. */
  TotalPriceMismatch = 'TOTAL_PRICE_MISMATCH',
  /** Unable to apply discount. */
  UnableToApply = 'UNABLE_TO_APPLY',
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
  id: Scalars['ID']['output']
  /** The quantity of the line item. */
  quantity: Scalars['Int']['output']
  /** Title of the line item. Defaults to the product's title. */
  title: Scalars['String']['output']
  /** Unit price of the line item. */
  unitPrice?: Maybe<ShopifyStorefrontMoneyV2>
  /** Product variant of the line item. */
  variant?: Maybe<ShopifyStorefrontProductVariant>
}

/**
 * An auto-generated type for paginating through multiple CheckoutLineItems.
 *
 */
export interface ShopifyStorefrontCheckoutLineItemConnection {
  __typename: 'CheckoutLineItemConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontCheckoutLineItemEdge>
  /** A list of the nodes contained in CheckoutLineItemEdge. */
  nodes: Array<ShopifyStorefrontCheckoutLineItem>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one CheckoutLineItem and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontCheckoutLineItemEdge {
  __typename: 'CheckoutLineItemEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of CheckoutLineItemEdge. */
  node: ShopifyStorefrontCheckoutLineItem
}

/** The input fields to create a line item on a checkout. */
export type ShopifyStorefrontCheckoutLineItemInput = {
  /**
   * Extra information in the form of an array of Key-Value pairs about the line item.
   *
   * The input must not contain more than `250` values.
   */
  customAttributes?: InputMaybe<Array<ShopifyStorefrontAttributeInput>>
  /** The quantity of the line item. */
  quantity: Scalars['Int']['input']
  /** The ID of the product variant for the line item. */
  variantId: Scalars['ID']['input']
}

/** The input fields to update a line item on the checkout. */
export type ShopifyStorefrontCheckoutLineItemUpdateInput = {
  /**
   * Extra information in the form of an array of Key-Value pairs about the line item.
   *
   * The input must not contain more than `250` values.
   */
  customAttributes?: InputMaybe<Array<ShopifyStorefrontAttributeInput>>
  /** The ID of the line item. */
  id?: InputMaybe<Scalars['ID']['input']>
  /** The quantity of the line item. */
  quantity?: InputMaybe<Scalars['Int']['input']>
  /** The variant ID of the line item. */
  variantId?: InputMaybe<Scalars['ID']['input']>
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
  field?: Maybe<Array<Scalars['String']['output']>>
  /** The error message. */
  message: Scalars['String']['output']
}

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export interface ShopifyStorefrontCollection
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode,
    ShopifyStorefrontOnlineStorePublishable,
    ShopifyStorefrontTrackable {
  __typename: 'Collection'
  /** Stripped description of the collection, single line with HTML tags removed. */
  description: Scalars['String']['output']
  /** The description of the collection, complete with HTML formatting. */
  descriptionHtml: Scalars['HTML']['output']
  /**
   * A human-friendly unique string for the collection automatically generated from its title.
   * Limit of 255 characters.
   *
   */
  handle: Scalars['String']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** Image associated with the collection. */
  image?: Maybe<ShopifyStorefrontImage>
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']['output']>
  /** List of products in the collection. */
  products: ShopifyStorefrontProductConnection
  /** The collection's SEO information. */
  seo: ShopifyStorefrontSeo
  /** The collection’s name. Limit of 255 characters. */
  title: Scalars['String']['output']
  /** A URL parameters to be added to a page URL when it is linked from a GraphQL result. This allows for tracking the origin of the traffic. */
  trackingParameters?: Maybe<Scalars['String']['output']>
  /** The date and time when the collection was last modified. */
  updatedAt: Scalars['DateTime']['output']
}

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type ShopifyStorefrontCollectionDescriptionArgs = {
  truncateAt?: InputMaybe<Scalars['Int']['input']>
}

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type ShopifyStorefrontCollectionMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type ShopifyStorefrontCollectionMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/**
 * A collection represents a grouping of products that a shop owner can create to
 * organize them or make their shops easier to browse.
 *
 */
export type ShopifyStorefrontCollectionProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  filters?: InputMaybe<Array<ShopifyStorefrontProductFilter>>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontProductCollectionSortKeys>
}

/**
 * An auto-generated type for paginating through multiple Collections.
 *
 */
export interface ShopifyStorefrontCollectionConnection {
  __typename: 'CollectionConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontCollectionEdge>
  /** A list of the nodes contained in CollectionEdge. */
  nodes: Array<ShopifyStorefrontCollection>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
  /** The total count of Collections. */
  totalCount: Scalars['UnsignedInt64']['output']
}

/**
 * An auto-generated type which holds one Collection and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontCollectionEdge {
  __typename: 'CollectionEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of CollectionEdge. */
  node: ShopifyStorefrontCollection
}

/** The set of valid sort keys for the Collection query. */
export enum ShopifyStorefrontCollectionSortKeys {
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = 'RELEVANCE',
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
}

/** A comment on an article. */
export interface ShopifyStorefrontComment extends ShopifyStorefrontNode {
  __typename: 'Comment'
  /** The comment’s author. */
  author: ShopifyStorefrontCommentAuthor
  /** Stripped content of the comment, single line with HTML tags removed. */
  content: Scalars['String']['output']
  /** The content of the comment, complete with HTML formatting. */
  contentHtml: Scalars['HTML']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
}

/** A comment on an article. */
export type ShopifyStorefrontCommentContentArgs = {
  truncateAt?: InputMaybe<Scalars['Int']['input']>
}

/** The author of a comment. */
export interface ShopifyStorefrontCommentAuthor {
  __typename: 'CommentAuthor'
  /** The author's email. */
  email: Scalars['String']['output']
  /** The author’s name. */
  name: Scalars['String']['output']
}

/**
 * An auto-generated type for paginating through multiple Comments.
 *
 */
export interface ShopifyStorefrontCommentConnection {
  __typename: 'CommentConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontCommentEdge>
  /** A list of the nodes contained in CommentEdge. */
  nodes: Array<ShopifyStorefrontComment>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one Comment and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontCommentEdge {
  __typename: 'CommentEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of CommentEdge. */
  node: ShopifyStorefrontComment
}

/** The action for the 3DS payment redirect. */
export interface ShopifyStorefrontCompletePaymentChallenge {
  __typename: 'CompletePaymentChallenge'
  /** The URL for the 3DS payment redirect. */
  redirectUrl?: Maybe<Scalars['URL']['output']>
}

/** An error that occurred during a cart completion attempt. */
export interface ShopifyStorefrontCompletionError {
  __typename: 'CompletionError'
  /** The error code. */
  code: ShopifyStorefrontCompletionErrorCode
  /** The error message. */
  message?: Maybe<Scalars['String']['output']>
}

/** The code of the error that occurred during a cart completion attempt. */
export enum ShopifyStorefrontCompletionErrorCode {
  Error = 'ERROR',
  InventoryReservationError = 'INVENTORY_RESERVATION_ERROR',
  PaymentAmountTooSmall = 'PAYMENT_AMOUNT_TOO_SMALL',
  PaymentCallIssuer = 'PAYMENT_CALL_ISSUER',
  PaymentCardDeclined = 'PAYMENT_CARD_DECLINED',
  PaymentError = 'PAYMENT_ERROR',
  PaymentGatewayNotEnabledError = 'PAYMENT_GATEWAY_NOT_ENABLED_ERROR',
  PaymentInsufficientFunds = 'PAYMENT_INSUFFICIENT_FUNDS',
  PaymentInvalidBillingAddress = 'PAYMENT_INVALID_BILLING_ADDRESS',
  PaymentInvalidCreditCard = 'PAYMENT_INVALID_CREDIT_CARD',
  PaymentInvalidCurrency = 'PAYMENT_INVALID_CURRENCY',
  PaymentInvalidPaymentMethod = 'PAYMENT_INVALID_PAYMENT_METHOD',
  PaymentTransientError = 'PAYMENT_TRANSIENT_ERROR',
}

/** Represents information about the grouped merchandise in the cart. */
export interface ShopifyStorefrontComponentizableCartLine
  extends ShopifyStorefrontBaseCartLine,
    ShopifyStorefrontNode {
  __typename: 'ComponentizableCartLine'
  /** An attribute associated with the cart line. */
  attribute?: Maybe<ShopifyStorefrontAttribute>
  /** The attributes associated with the cart line. Attributes are represented as key-value pairs. */
  attributes: Array<ShopifyStorefrontAttribute>
  /** The cost of the merchandise that the buyer will pay for at checkout. The costs are subject to change and changes will be reflected at checkout. */
  cost: ShopifyStorefrontCartLineCost
  /** The discounts that have been applied to the cart line. */
  discountAllocations: Array<ShopifyStorefrontCartDiscountAllocation>
  /**
   * The estimated cost of the merchandise that the buyer will pay for at checkout. The estimated costs are subject to change and changes will be reflected at checkout.
   * @deprecated Use `cost` instead.
   */
  estimatedCost: ShopifyStorefrontCartLineEstimatedCost
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The components of the line item. */
  lineComponents: Array<ShopifyStorefrontCartLine>
  /** The merchandise that the buyer intends to purchase. */
  merchandise: ShopifyStorefrontMerchandise
  /** The quantity of the merchandise that the customer intends to purchase. */
  quantity: Scalars['Int']['output']
  /** The selling plan associated with the cart line and the effect that each selling plan has on variants when they're purchased. */
  sellingPlanAllocation?: Maybe<ShopifyStorefrontSellingPlanAllocation>
}

/** Represents information about the grouped merchandise in the cart. */
export type ShopifyStorefrontComponentizableCartLineAttributeArgs = {
  key: Scalars['String']['input']
}

/** A country. */
export interface ShopifyStorefrontCountry {
  __typename: 'Country'
  /** The languages available for the country. */
  availableLanguages: Array<ShopifyStorefrontLanguage>
  /** The currency of the country. */
  currency: ShopifyStorefrontCurrency
  /** The ISO code of the country. */
  isoCode: ShopifyStorefrontCountryCode
  /** The market that includes this country. */
  market?: Maybe<ShopifyStorefrontMarket>
  /** The name of the country. */
  name: Scalars['String']['output']
  /** The unit system used in the country. */
  unitSystem: ShopifyStorefrontUnitSystem
}

/**
 * The code designating a country/region, which generally follows ISO 3166-1 alpha-2 guidelines.
 * If a territory doesn't have a country code value in the `CountryCode` enum, then it might be considered a subdivision
 * of another country. For example, the territories associated with Spain are represented by the country code `ES`,
 * and the territories associated with the United States of America are represented by the country code `US`.
 *
 */
export enum ShopifyStorefrontCountryCode {
  /** Ascension Island. */
  Ac = 'AC',
  /** Andorra. */
  Ad = 'AD',
  /** United Arab Emirates. */
  Ae = 'AE',
  /** Afghanistan. */
  Af = 'AF',
  /** Antigua & Barbuda. */
  Ag = 'AG',
  /** Anguilla. */
  Ai = 'AI',
  /** Albania. */
  Al = 'AL',
  /** Armenia. */
  Am = 'AM',
  /** Netherlands Antilles. */
  An = 'AN',
  /** Angola. */
  Ao = 'AO',
  /** Argentina. */
  Ar = 'AR',
  /** Austria. */
  At = 'AT',
  /** Australia. */
  Au = 'AU',
  /** Aruba. */
  Aw = 'AW',
  /** Åland Islands. */
  Ax = 'AX',
  /** Azerbaijan. */
  Az = 'AZ',
  /** Bosnia & Herzegovina. */
  Ba = 'BA',
  /** Barbados. */
  Bb = 'BB',
  /** Bangladesh. */
  Bd = 'BD',
  /** Belgium. */
  Be = 'BE',
  /** Burkina Faso. */
  Bf = 'BF',
  /** Bulgaria. */
  Bg = 'BG',
  /** Bahrain. */
  Bh = 'BH',
  /** Burundi. */
  Bi = 'BI',
  /** Benin. */
  Bj = 'BJ',
  /** St. Barthélemy. */
  Bl = 'BL',
  /** Bermuda. */
  Bm = 'BM',
  /** Brunei. */
  Bn = 'BN',
  /** Bolivia. */
  Bo = 'BO',
  /** Caribbean Netherlands. */
  Bq = 'BQ',
  /** Brazil. */
  Br = 'BR',
  /** Bahamas. */
  Bs = 'BS',
  /** Bhutan. */
  Bt = 'BT',
  /** Bouvet Island. */
  Bv = 'BV',
  /** Botswana. */
  Bw = 'BW',
  /** Belarus. */
  By = 'BY',
  /** Belize. */
  Bz = 'BZ',
  /** Canada. */
  Ca = 'CA',
  /** Cocos (Keeling) Islands. */
  Cc = 'CC',
  /** Congo - Kinshasa. */
  Cd = 'CD',
  /** Central African Republic. */
  Cf = 'CF',
  /** Congo - Brazzaville. */
  Cg = 'CG',
  /** Switzerland. */
  Ch = 'CH',
  /** Côte d’Ivoire. */
  Ci = 'CI',
  /** Cook Islands. */
  Ck = 'CK',
  /** Chile. */
  Cl = 'CL',
  /** Cameroon. */
  Cm = 'CM',
  /** China. */
  Cn = 'CN',
  /** Colombia. */
  Co = 'CO',
  /** Costa Rica. */
  Cr = 'CR',
  /** Cuba. */
  Cu = 'CU',
  /** Cape Verde. */
  Cv = 'CV',
  /** Curaçao. */
  Cw = 'CW',
  /** Christmas Island. */
  Cx = 'CX',
  /** Cyprus. */
  Cy = 'CY',
  /** Czechia. */
  Cz = 'CZ',
  /** Germany. */
  De = 'DE',
  /** Djibouti. */
  Dj = 'DJ',
  /** Denmark. */
  Dk = 'DK',
  /** Dominica. */
  Dm = 'DM',
  /** Dominican Republic. */
  Do = 'DO',
  /** Algeria. */
  Dz = 'DZ',
  /** Ecuador. */
  Ec = 'EC',
  /** Estonia. */
  Ee = 'EE',
  /** Egypt. */
  Eg = 'EG',
  /** Western Sahara. */
  Eh = 'EH',
  /** Eritrea. */
  Er = 'ER',
  /** Spain. */
  Es = 'ES',
  /** Ethiopia. */
  Et = 'ET',
  /** Finland. */
  Fi = 'FI',
  /** Fiji. */
  Fj = 'FJ',
  /** Falkland Islands. */
  Fk = 'FK',
  /** Faroe Islands. */
  Fo = 'FO',
  /** France. */
  Fr = 'FR',
  /** Gabon. */
  Ga = 'GA',
  /** United Kingdom. */
  Gb = 'GB',
  /** Grenada. */
  Gd = 'GD',
  /** Georgia. */
  Ge = 'GE',
  /** French Guiana. */
  Gf = 'GF',
  /** Guernsey. */
  Gg = 'GG',
  /** Ghana. */
  Gh = 'GH',
  /** Gibraltar. */
  Gi = 'GI',
  /** Greenland. */
  Gl = 'GL',
  /** Gambia. */
  Gm = 'GM',
  /** Guinea. */
  Gn = 'GN',
  /** Guadeloupe. */
  Gp = 'GP',
  /** Equatorial Guinea. */
  Gq = 'GQ',
  /** Greece. */
  Gr = 'GR',
  /** South Georgia & South Sandwich Islands. */
  Gs = 'GS',
  /** Guatemala. */
  Gt = 'GT',
  /** Guinea-Bissau. */
  Gw = 'GW',
  /** Guyana. */
  Gy = 'GY',
  /** Hong Kong SAR. */
  Hk = 'HK',
  /** Heard & McDonald Islands. */
  Hm = 'HM',
  /** Honduras. */
  Hn = 'HN',
  /** Croatia. */
  Hr = 'HR',
  /** Haiti. */
  Ht = 'HT',
  /** Hungary. */
  Hu = 'HU',
  /** Indonesia. */
  Id = 'ID',
  /** Ireland. */
  Ie = 'IE',
  /** Israel. */
  Il = 'IL',
  /** Isle of Man. */
  Im = 'IM',
  /** India. */
  In = 'IN',
  /** British Indian Ocean Territory. */
  Io = 'IO',
  /** Iraq. */
  Iq = 'IQ',
  /** Iran. */
  Ir = 'IR',
  /** Iceland. */
  Is = 'IS',
  /** Italy. */
  It = 'IT',
  /** Jersey. */
  Je = 'JE',
  /** Jamaica. */
  Jm = 'JM',
  /** Jordan. */
  Jo = 'JO',
  /** Japan. */
  Jp = 'JP',
  /** Kenya. */
  Ke = 'KE',
  /** Kyrgyzstan. */
  Kg = 'KG',
  /** Cambodia. */
  Kh = 'KH',
  /** Kiribati. */
  Ki = 'KI',
  /** Comoros. */
  Km = 'KM',
  /** St. Kitts & Nevis. */
  Kn = 'KN',
  /** North Korea. */
  Kp = 'KP',
  /** South Korea. */
  Kr = 'KR',
  /** Kuwait. */
  Kw = 'KW',
  /** Cayman Islands. */
  Ky = 'KY',
  /** Kazakhstan. */
  Kz = 'KZ',
  /** Laos. */
  La = 'LA',
  /** Lebanon. */
  Lb = 'LB',
  /** St. Lucia. */
  Lc = 'LC',
  /** Liechtenstein. */
  Li = 'LI',
  /** Sri Lanka. */
  Lk = 'LK',
  /** Liberia. */
  Lr = 'LR',
  /** Lesotho. */
  Ls = 'LS',
  /** Lithuania. */
  Lt = 'LT',
  /** Luxembourg. */
  Lu = 'LU',
  /** Latvia. */
  Lv = 'LV',
  /** Libya. */
  Ly = 'LY',
  /** Morocco. */
  Ma = 'MA',
  /** Monaco. */
  Mc = 'MC',
  /** Moldova. */
  Md = 'MD',
  /** Montenegro. */
  Me = 'ME',
  /** St. Martin. */
  Mf = 'MF',
  /** Madagascar. */
  Mg = 'MG',
  /** North Macedonia. */
  Mk = 'MK',
  /** Mali. */
  Ml = 'ML',
  /** Myanmar (Burma). */
  Mm = 'MM',
  /** Mongolia. */
  Mn = 'MN',
  /** Macao SAR. */
  Mo = 'MO',
  /** Martinique. */
  Mq = 'MQ',
  /** Mauritania. */
  Mr = 'MR',
  /** Montserrat. */
  Ms = 'MS',
  /** Malta. */
  Mt = 'MT',
  /** Mauritius. */
  Mu = 'MU',
  /** Maldives. */
  Mv = 'MV',
  /** Malawi. */
  Mw = 'MW',
  /** Mexico. */
  Mx = 'MX',
  /** Malaysia. */
  My = 'MY',
  /** Mozambique. */
  Mz = 'MZ',
  /** Namibia. */
  Na = 'NA',
  /** New Caledonia. */
  Nc = 'NC',
  /** Niger. */
  Ne = 'NE',
  /** Norfolk Island. */
  Nf = 'NF',
  /** Nigeria. */
  Ng = 'NG',
  /** Nicaragua. */
  Ni = 'NI',
  /** Netherlands. */
  Nl = 'NL',
  /** Norway. */
  No = 'NO',
  /** Nepal. */
  Np = 'NP',
  /** Nauru. */
  Nr = 'NR',
  /** Niue. */
  Nu = 'NU',
  /** New Zealand. */
  Nz = 'NZ',
  /** Oman. */
  Om = 'OM',
  /** Panama. */
  Pa = 'PA',
  /** Peru. */
  Pe = 'PE',
  /** French Polynesia. */
  Pf = 'PF',
  /** Papua New Guinea. */
  Pg = 'PG',
  /** Philippines. */
  Ph = 'PH',
  /** Pakistan. */
  Pk = 'PK',
  /** Poland. */
  Pl = 'PL',
  /** St. Pierre & Miquelon. */
  Pm = 'PM',
  /** Pitcairn Islands. */
  Pn = 'PN',
  /** Palestinian Territories. */
  Ps = 'PS',
  /** Portugal. */
  Pt = 'PT',
  /** Paraguay. */
  Py = 'PY',
  /** Qatar. */
  Qa = 'QA',
  /** Réunion. */
  Re = 'RE',
  /** Romania. */
  Ro = 'RO',
  /** Serbia. */
  Rs = 'RS',
  /** Russia. */
  Ru = 'RU',
  /** Rwanda. */
  Rw = 'RW',
  /** Saudi Arabia. */
  Sa = 'SA',
  /** Solomon Islands. */
  Sb = 'SB',
  /** Seychelles. */
  Sc = 'SC',
  /** Sudan. */
  Sd = 'SD',
  /** Sweden. */
  Se = 'SE',
  /** Singapore. */
  Sg = 'SG',
  /** St. Helena. */
  Sh = 'SH',
  /** Slovenia. */
  Si = 'SI',
  /** Svalbard & Jan Mayen. */
  Sj = 'SJ',
  /** Slovakia. */
  Sk = 'SK',
  /** Sierra Leone. */
  Sl = 'SL',
  /** San Marino. */
  Sm = 'SM',
  /** Senegal. */
  Sn = 'SN',
  /** Somalia. */
  So = 'SO',
  /** Suriname. */
  Sr = 'SR',
  /** South Sudan. */
  Ss = 'SS',
  /** São Tomé & Príncipe. */
  St = 'ST',
  /** El Salvador. */
  Sv = 'SV',
  /** Sint Maarten. */
  Sx = 'SX',
  /** Syria. */
  Sy = 'SY',
  /** Eswatini. */
  Sz = 'SZ',
  /** Tristan da Cunha. */
  Ta = 'TA',
  /** Turks & Caicos Islands. */
  Tc = 'TC',
  /** Chad. */
  Td = 'TD',
  /** French Southern Territories. */
  Tf = 'TF',
  /** Togo. */
  Tg = 'TG',
  /** Thailand. */
  Th = 'TH',
  /** Tajikistan. */
  Tj = 'TJ',
  /** Tokelau. */
  Tk = 'TK',
  /** Timor-Leste. */
  Tl = 'TL',
  /** Turkmenistan. */
  Tm = 'TM',
  /** Tunisia. */
  Tn = 'TN',
  /** Tonga. */
  To = 'TO',
  /** Türkiye. */
  Tr = 'TR',
  /** Trinidad & Tobago. */
  Tt = 'TT',
  /** Tuvalu. */
  Tv = 'TV',
  /** Taiwan. */
  Tw = 'TW',
  /** Tanzania. */
  Tz = 'TZ',
  /** Ukraine. */
  Ua = 'UA',
  /** Uganda. */
  Ug = 'UG',
  /** U.S. Outlying Islands. */
  Um = 'UM',
  /** United States. */
  Us = 'US',
  /** Uruguay. */
  Uy = 'UY',
  /** Uzbekistan. */
  Uz = 'UZ',
  /** Vatican City. */
  Va = 'VA',
  /** St. Vincent & Grenadines. */
  Vc = 'VC',
  /** Venezuela. */
  Ve = 'VE',
  /** British Virgin Islands. */
  Vg = 'VG',
  /** Vietnam. */
  Vn = 'VN',
  /** Vanuatu. */
  Vu = 'VU',
  /** Wallis & Futuna. */
  Wf = 'WF',
  /** Samoa. */
  Ws = 'WS',
  /** Kosovo. */
  Xk = 'XK',
  /** Yemen. */
  Ye = 'YE',
  /** Mayotte. */
  Yt = 'YT',
  /** South Africa. */
  Za = 'ZA',
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
  brand?: Maybe<Scalars['String']['output']>
  /** The expiry month of the credit card. */
  expiryMonth?: Maybe<Scalars['Int']['output']>
  /** The expiry year of the credit card. */
  expiryYear?: Maybe<Scalars['Int']['output']>
  /** The credit card's BIN number. */
  firstDigits?: Maybe<Scalars['String']['output']>
  /** The first name of the card holder. */
  firstName?: Maybe<Scalars['String']['output']>
  /** The last 4 digits of the credit card. */
  lastDigits?: Maybe<Scalars['String']['output']>
  /** The last name of the card holder. */
  lastName?: Maybe<Scalars['String']['output']>
  /** The masked credit card number with only the last 4 digits displayed. */
  maskedNumber?: Maybe<Scalars['String']['output']>
}

/**
 * Specifies the fields required to complete a checkout with
 * a Shopify vaulted credit card payment.
 *
 */
export type ShopifyStorefrontCreditCardPaymentInputV2 = {
  /** The billing address for the payment. */
  billingAddress: ShopifyStorefrontMailingAddressInput
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. For more information, refer to [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests). */
  idempotencyKey: Scalars['String']['input']
  /** The amount and currency of the payment. */
  paymentAmount: ShopifyStorefrontMoneyInput
  /** Executes the payment in test mode if possible. Defaults to `false`. */
  test?: InputMaybe<Scalars['Boolean']['input']>
  /** The ID returned by Shopify's Card Vault. */
  vaultId: Scalars['String']['input']
}

/** The part of the image that should remain after cropping. */
export enum ShopifyStorefrontCropRegion {
  /** Keep the bottom of the image. */
  Bottom = 'BOTTOM',
  /** Keep the center of the image. */
  Center = 'CENTER',
  /** Keep the left of the image. */
  Left = 'LEFT',
  /** Keep the right of the image. */
  Right = 'RIGHT',
  /** Keep the top of the image. */
  Top = 'TOP',
}

/** A currency. */
export interface ShopifyStorefrontCurrency {
  __typename: 'Currency'
  /** The ISO code of the currency. */
  isoCode: ShopifyStorefrontCurrencyCode
  /** The name of the currency. */
  name: Scalars['String']['output']
  /** The symbol of the currency. */
  symbol: Scalars['String']['output']
}

/**
 * The three-letter currency codes that represent the world currencies used in
 * stores. These include standard ISO 4217 codes, legacy codes,
 * and non-standard codes.
 *
 */
export enum ShopifyStorefrontCurrencyCode {
  /** United Arab Emirates Dirham (AED). */
  Aed = 'AED',
  /** Afghan Afghani (AFN). */
  Afn = 'AFN',
  /** Albanian Lek (ALL). */
  All = 'ALL',
  /** Armenian Dram (AMD). */
  Amd = 'AMD',
  /** Netherlands Antillean Guilder. */
  Ang = 'ANG',
  /** Angolan Kwanza (AOA). */
  Aoa = 'AOA',
  /** Argentine Pesos (ARS). */
  Ars = 'ARS',
  /** Australian Dollars (AUD). */
  Aud = 'AUD',
  /** Aruban Florin (AWG). */
  Awg = 'AWG',
  /** Azerbaijani Manat (AZN). */
  Azn = 'AZN',
  /** Bosnia and Herzegovina Convertible Mark (BAM). */
  Bam = 'BAM',
  /** Barbadian Dollar (BBD). */
  Bbd = 'BBD',
  /** Bangladesh Taka (BDT). */
  Bdt = 'BDT',
  /** Bulgarian Lev (BGN). */
  Bgn = 'BGN',
  /** Bahraini Dinar (BHD). */
  Bhd = 'BHD',
  /** Burundian Franc (BIF). */
  Bif = 'BIF',
  /** Bermudian Dollar (BMD). */
  Bmd = 'BMD',
  /** Brunei Dollar (BND). */
  Bnd = 'BND',
  /** Bolivian Boliviano (BOB). */
  Bob = 'BOB',
  /** Brazilian Real (BRL). */
  Brl = 'BRL',
  /** Bahamian Dollar (BSD). */
  Bsd = 'BSD',
  /** Bhutanese Ngultrum (BTN). */
  Btn = 'BTN',
  /** Botswana Pula (BWP). */
  Bwp = 'BWP',
  /** Belarusian Ruble (BYN). */
  Byn = 'BYN',
  /**
   * Belarusian Ruble (BYR).
   * @deprecated `BYR` is deprecated. Use `BYN` available from version `2021-01` onwards instead.
   */
  Byr = 'BYR',
  /** Belize Dollar (BZD). */
  Bzd = 'BZD',
  /** Canadian Dollars (CAD). */
  Cad = 'CAD',
  /** Congolese franc (CDF). */
  Cdf = 'CDF',
  /** Swiss Francs (CHF). */
  Chf = 'CHF',
  /** Chilean Peso (CLP). */
  Clp = 'CLP',
  /** Chinese Yuan Renminbi (CNY). */
  Cny = 'CNY',
  /** Colombian Peso (COP). */
  Cop = 'COP',
  /** Costa Rican Colones (CRC). */
  Crc = 'CRC',
  /** Cape Verdean escudo (CVE). */
  Cve = 'CVE',
  /** Czech Koruny (CZK). */
  Czk = 'CZK',
  /** Djiboutian Franc (DJF). */
  Djf = 'DJF',
  /** Danish Kroner (DKK). */
  Dkk = 'DKK',
  /** Dominican Peso (DOP). */
  Dop = 'DOP',
  /** Algerian Dinar (DZD). */
  Dzd = 'DZD',
  /** Egyptian Pound (EGP). */
  Egp = 'EGP',
  /** Eritrean Nakfa (ERN). */
  Ern = 'ERN',
  /** Ethiopian Birr (ETB). */
  Etb = 'ETB',
  /** Euro (EUR). */
  Eur = 'EUR',
  /** Fijian Dollars (FJD). */
  Fjd = 'FJD',
  /** Falkland Islands Pounds (FKP). */
  Fkp = 'FKP',
  /** United Kingdom Pounds (GBP). */
  Gbp = 'GBP',
  /** Georgian Lari (GEL). */
  Gel = 'GEL',
  /** Ghanaian Cedi (GHS). */
  Ghs = 'GHS',
  /** Gibraltar Pounds (GIP). */
  Gip = 'GIP',
  /** Gambian Dalasi (GMD). */
  Gmd = 'GMD',
  /** Guinean Franc (GNF). */
  Gnf = 'GNF',
  /** Guatemalan Quetzal (GTQ). */
  Gtq = 'GTQ',
  /** Guyanese Dollar (GYD). */
  Gyd = 'GYD',
  /** Hong Kong Dollars (HKD). */
  Hkd = 'HKD',
  /** Honduran Lempira (HNL). */
  Hnl = 'HNL',
  /** Croatian Kuna (HRK). */
  Hrk = 'HRK',
  /** Haitian Gourde (HTG). */
  Htg = 'HTG',
  /** Hungarian Forint (HUF). */
  Huf = 'HUF',
  /** Indonesian Rupiah (IDR). */
  Idr = 'IDR',
  /** Israeli New Shekel (NIS). */
  Ils = 'ILS',
  /** Indian Rupees (INR). */
  Inr = 'INR',
  /** Iraqi Dinar (IQD). */
  Iqd = 'IQD',
  /** Iranian Rial (IRR). */
  Irr = 'IRR',
  /** Icelandic Kronur (ISK). */
  Isk = 'ISK',
  /** Jersey Pound. */
  Jep = 'JEP',
  /** Jamaican Dollars (JMD). */
  Jmd = 'JMD',
  /** Jordanian Dinar (JOD). */
  Jod = 'JOD',
  /** Japanese Yen (JPY). */
  Jpy = 'JPY',
  /** Kenyan Shilling (KES). */
  Kes = 'KES',
  /** Kyrgyzstani Som (KGS). */
  Kgs = 'KGS',
  /** Cambodian Riel. */
  Khr = 'KHR',
  /** Kiribati Dollar (KID). */
  Kid = 'KID',
  /** Comorian Franc (KMF). */
  Kmf = 'KMF',
  /** South Korean Won (KRW). */
  Krw = 'KRW',
  /** Kuwaiti Dinar (KWD). */
  Kwd = 'KWD',
  /** Cayman Dollars (KYD). */
  Kyd = 'KYD',
  /** Kazakhstani Tenge (KZT). */
  Kzt = 'KZT',
  /** Laotian Kip (LAK). */
  Lak = 'LAK',
  /** Lebanese Pounds (LBP). */
  Lbp = 'LBP',
  /** Sri Lankan Rupees (LKR). */
  Lkr = 'LKR',
  /** Liberian Dollar (LRD). */
  Lrd = 'LRD',
  /** Lesotho Loti (LSL). */
  Lsl = 'LSL',
  /** Lithuanian Litai (LTL). */
  Ltl = 'LTL',
  /** Latvian Lati (LVL). */
  Lvl = 'LVL',
  /** Libyan Dinar (LYD). */
  Lyd = 'LYD',
  /** Moroccan Dirham. */
  Mad = 'MAD',
  /** Moldovan Leu (MDL). */
  Mdl = 'MDL',
  /** Malagasy Ariary (MGA). */
  Mga = 'MGA',
  /** Macedonia Denar (MKD). */
  Mkd = 'MKD',
  /** Burmese Kyat (MMK). */
  Mmk = 'MMK',
  /** Mongolian Tugrik. */
  Mnt = 'MNT',
  /** Macanese Pataca (MOP). */
  Mop = 'MOP',
  /** Mauritanian Ouguiya (MRU). */
  Mru = 'MRU',
  /** Mauritian Rupee (MUR). */
  Mur = 'MUR',
  /** Maldivian Rufiyaa (MVR). */
  Mvr = 'MVR',
  /** Malawian Kwacha (MWK). */
  Mwk = 'MWK',
  /** Mexican Pesos (MXN). */
  Mxn = 'MXN',
  /** Malaysian Ringgits (MYR). */
  Myr = 'MYR',
  /** Mozambican Metical. */
  Mzn = 'MZN',
  /** Namibian Dollar. */
  Nad = 'NAD',
  /** Nigerian Naira (NGN). */
  Ngn = 'NGN',
  /** Nicaraguan Córdoba (NIO). */
  Nio = 'NIO',
  /** Norwegian Kroner (NOK). */
  Nok = 'NOK',
  /** Nepalese Rupee (NPR). */
  Npr = 'NPR',
  /** New Zealand Dollars (NZD). */
  Nzd = 'NZD',
  /** Omani Rial (OMR). */
  Omr = 'OMR',
  /** Panamian Balboa (PAB). */
  Pab = 'PAB',
  /** Peruvian Nuevo Sol (PEN). */
  Pen = 'PEN',
  /** Papua New Guinean Kina (PGK). */
  Pgk = 'PGK',
  /** Philippine Peso (PHP). */
  Php = 'PHP',
  /** Pakistani Rupee (PKR). */
  Pkr = 'PKR',
  /** Polish Zlotych (PLN). */
  Pln = 'PLN',
  /** Paraguayan Guarani (PYG). */
  Pyg = 'PYG',
  /** Qatari Rial (QAR). */
  Qar = 'QAR',
  /** Romanian Lei (RON). */
  Ron = 'RON',
  /** Serbian dinar (RSD). */
  Rsd = 'RSD',
  /** Russian Rubles (RUB). */
  Rub = 'RUB',
  /** Rwandan Franc (RWF). */
  Rwf = 'RWF',
  /** Saudi Riyal (SAR). */
  Sar = 'SAR',
  /** Solomon Islands Dollar (SBD). */
  Sbd = 'SBD',
  /** Seychellois Rupee (SCR). */
  Scr = 'SCR',
  /** Sudanese Pound (SDG). */
  Sdg = 'SDG',
  /** Swedish Kronor (SEK). */
  Sek = 'SEK',
  /** Singapore Dollars (SGD). */
  Sgd = 'SGD',
  /** Saint Helena Pounds (SHP). */
  Shp = 'SHP',
  /** Sierra Leonean Leone (SLL). */
  Sll = 'SLL',
  /** Somali Shilling (SOS). */
  Sos = 'SOS',
  /** Surinamese Dollar (SRD). */
  Srd = 'SRD',
  /** South Sudanese Pound (SSP). */
  Ssp = 'SSP',
  /**
   * Sao Tome And Principe Dobra (STD).
   * @deprecated `STD` is deprecated. Use `STN` available from version `2022-07` onwards instead.
   */
  Std = 'STD',
  /** Sao Tome And Principe Dobra (STN). */
  Stn = 'STN',
  /** Syrian Pound (SYP). */
  Syp = 'SYP',
  /** Swazi Lilangeni (SZL). */
  Szl = 'SZL',
  /** Thai baht (THB). */
  Thb = 'THB',
  /** Tajikistani Somoni (TJS). */
  Tjs = 'TJS',
  /** Turkmenistani Manat (TMT). */
  Tmt = 'TMT',
  /** Tunisian Dinar (TND). */
  Tnd = 'TND',
  /** Tongan Pa'anga (TOP). */
  Top = 'TOP',
  /** Turkish Lira (TRY). */
  Try = 'TRY',
  /** Trinidad and Tobago Dollars (TTD). */
  Ttd = 'TTD',
  /** Taiwan Dollars (TWD). */
  Twd = 'TWD',
  /** Tanzanian Shilling (TZS). */
  Tzs = 'TZS',
  /** Ukrainian Hryvnia (UAH). */
  Uah = 'UAH',
  /** Ugandan Shilling (UGX). */
  Ugx = 'UGX',
  /** United States Dollars (USD). */
  Usd = 'USD',
  /** Uruguayan Pesos (UYU). */
  Uyu = 'UYU',
  /** Uzbekistan som (UZS). */
  Uzs = 'UZS',
  /** Venezuelan Bolivares (VED). */
  Ved = 'VED',
  /**
   * Venezuelan Bolivares (VEF).
   * @deprecated `VEF` is deprecated. Use `VES` available from version `2020-10` onwards instead.
   */
  Vef = 'VEF',
  /** Venezuelan Bolivares Soberanos (VES). */
  Ves = 'VES',
  /** Vietnamese đồng (VND). */
  Vnd = 'VND',
  /** Vanuatu Vatu (VUV). */
  Vuv = 'VUV',
  /** Samoan Tala (WST). */
  Wst = 'WST',
  /** Central African CFA Franc (XAF). */
  Xaf = 'XAF',
  /** East Caribbean Dollar (XCD). */
  Xcd = 'XCD',
  /** West African CFA franc (XOF). */
  Xof = 'XOF',
  /** CFP Franc (XPF). */
  Xpf = 'XPF',
  /** Unrecognized currency. */
  Xxx = 'XXX',
  /** Yemeni Rial (YER). */
  Yer = 'YER',
  /** South African Rand (ZAR). */
  Zar = 'ZAR',
  /** Zambian Kwacha (ZMW). */
  Zmw = 'ZMW',
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export interface ShopifyStorefrontCustomer
  extends ShopifyStorefrontHasMetafields {
  __typename: 'Customer'
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing: Scalars['Boolean']['output']
  /** A list of addresses for the customer. */
  addresses: ShopifyStorefrontMailingAddressConnection
  /** The date and time when the customer was created. */
  createdAt: Scalars['DateTime']['output']
  /** The customer’s default address. */
  defaultAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /** The customer’s name, email or phone number. */
  displayName: Scalars['String']['output']
  /** The customer’s email address. */
  email?: Maybe<Scalars['String']['output']>
  /** The customer’s first name. */
  firstName?: Maybe<Scalars['String']['output']>
  /** A unique ID for the customer. */
  id: Scalars['ID']['output']
  /**
   * The customer's most recently updated, incomplete checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  lastIncompleteCheckout?: Maybe<ShopifyStorefrontCheckout>
  /** The customer’s last name. */
  lastName?: Maybe<Scalars['String']['output']>
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /** The number of orders that the customer has made at the store in their lifetime. */
  numberOfOrders: Scalars['UnsignedInt64']['output']
  /** The orders associated with the customer. */
  orders: ShopifyStorefrontOrderConnection
  /** The customer’s phone number. */
  phone?: Maybe<Scalars['String']['output']>
  /**
   * A comma separated list of tags that have been added to the customer.
   * Additional access scope required: unauthenticated_read_customer_tags.
   *
   */
  tags: Array<Scalars['String']['output']>
  /** The date and time when the customer information was updated. */
  updatedAt: Scalars['DateTime']['output']
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyStorefrontCustomerAddressesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyStorefrontCustomerMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyStorefrontCustomerMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/** A customer represents a customer account with the shop. Customer accounts store contact information for the customer, saving logged-in customers the trouble of having to provide it at every checkout. */
export type ShopifyStorefrontCustomerOrdersArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  query?: InputMaybe<Scalars['String']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontOrderSortKeys>
}

/** A CustomerAccessToken represents the unique token required to make modifications to the customer object. */
export interface ShopifyStorefrontCustomerAccessToken {
  __typename: 'CustomerAccessToken'
  /** The customer’s access token. */
  accessToken: Scalars['String']['output']
  /** The date and time when the customer access token expires. */
  expiresAt: Scalars['DateTime']['output']
}

/** The input fields required to create a customer access token. */
export type ShopifyStorefrontCustomerAccessTokenCreateInput = {
  /** The email associated to the customer. */
  email: Scalars['String']['input']
  /** The login password to be used by the customer. */
  password: Scalars['String']['input']
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
  deletedAccessToken?: Maybe<Scalars['String']['output']>
  /** ID of the destroyed customer access token. */
  deletedCustomerAccessTokenId?: Maybe<Scalars['String']['output']>
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
  activationToken: Scalars['String']['input']
  /** New password that will be set during activation. */
  password: Scalars['String']['input']
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
  deletedCustomerAddressId?: Maybe<Scalars['String']['output']>
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
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: InputMaybe<Scalars['Boolean']['input']>
  /** The customer’s email. */
  email: Scalars['String']['input']
  /** The customer’s first name. */
  firstName?: InputMaybe<Scalars['String']['input']>
  /** The customer’s last name. */
  lastName?: InputMaybe<Scalars['String']['input']>
  /** The login password used by the customer. */
  password: Scalars['String']['input']
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>
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
  /** Customer already enabled. */
  AlreadyEnabled = 'ALREADY_ENABLED',
  /** Input email contains an invalid domain name. */
  BadDomain = 'BAD_DOMAIN',
  /** The input value is blank. */
  Blank = 'BLANK',
  /** Input contains HTML tags. */
  ContainsHtmlTags = 'CONTAINS_HTML_TAGS',
  /** Input contains URL. */
  ContainsUrl = 'CONTAINS_URL',
  /** Customer is disabled. */
  CustomerDisabled = 'CUSTOMER_DISABLED',
  /** The input value is invalid. */
  Invalid = 'INVALID',
  /** Multipass token is not valid. */
  InvalidMultipassRequest = 'INVALID_MULTIPASS_REQUEST',
  /** Address does not exist. */
  NotFound = 'NOT_FOUND',
  /** Input password starts or ends with whitespace. */
  PasswordStartsOrEndsWithWhitespace = 'PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE',
  /** The input value is already taken. */
  Taken = 'TAKEN',
  /** Invalid activation token. */
  TokenInvalid = 'TOKEN_INVALID',
  /** The input value is too long. */
  TooLong = 'TOO_LONG',
  /** The input value is too short. */
  TooShort = 'TOO_SHORT',
  /** Unidentified customer. */
  UnidentifiedCustomer = 'UNIDENTIFIED_CUSTOMER',
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
  /** New password that will be set as part of the reset password process. */
  password: Scalars['String']['input']
  /** The reset token required to reset the customer’s password. */
  resetToken: Scalars['String']['input']
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
  /** Indicates whether the customer has consented to be sent marketing material via email. */
  acceptsMarketing?: InputMaybe<Scalars['Boolean']['input']>
  /** The customer’s email. */
  email?: InputMaybe<Scalars['String']['input']>
  /** The customer’s first name. */
  firstName?: InputMaybe<Scalars['String']['input']>
  /** The customer’s last name. */
  lastName?: InputMaybe<Scalars['String']['input']>
  /** The login password used by the customer. */
  password?: InputMaybe<Scalars['String']['input']>
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_. To remove the phone number, specify `null`.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>
}

/** Return type for `customerUpdate` mutation. */
export interface ShopifyStorefrontCustomerUpdatePayload {
  __typename: 'CustomerUpdatePayload'
  /** The updated customer object. */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /**
   * The newly created customer access token. If the customer's password is updated, all previous access tokens
   * (including the one used to perform this mutation) become invalid, and a new token is generated.
   *
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
  field?: Maybe<Array<Scalars['String']['output']>>
  /** The error message. */
  message: Scalars['String']['output']
}

/** A delivery address of the buyer that is interacting with the cart. */
export type ShopifyStorefrontDeliveryAddress = ShopifyStorefrontMailingAddress

/**
 * The input fields for delivery address preferences.
 *
 */
export type ShopifyStorefrontDeliveryAddressInput = {
  /**
   * The ID of a customer address that is associated with the buyer that is interacting with the cart.
   *
   */
  customerAddressId?: InputMaybe<Scalars['ID']['input']>
  /** A delivery address preference of a buyer that is interacting with the cart. */
  deliveryAddress?: InputMaybe<ShopifyStorefrontMailingAddressInput>
}

/** List of different delivery method types. */
export enum ShopifyStorefrontDeliveryMethodType {
  /** Local Delivery. */
  Local = 'LOCAL',
  /** None. */
  None = 'NONE',
  /** Shipping to a Pickup Point. */
  PickupPoint = 'PICKUP_POINT',
  /** Local Pickup. */
  PickUp = 'PICK_UP',
  /** Retail. */
  Retail = 'RETAIL',
  /** Shipping. */
  Shipping = 'SHIPPING',
}

/** Digital wallet, such as Apple Pay, which can be used for accelerated checkouts. */
export enum ShopifyStorefrontDigitalWallet {
  /** Android Pay. */
  AndroidPay = 'ANDROID_PAY',
  /** Apple Pay. */
  ApplePay = 'APPLE_PAY',
  /** Google Pay. */
  GooglePay = 'GOOGLE_PAY',
  /** Shopify Pay. */
  ShopifyPay = 'SHOPIFY_PAY',
}

/**
 * An amount discounting the line that has been allocated by a discount.
 *
 */
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
 *
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
  /**
   * The value is specifically applied onto a particular line.
   * @deprecated Use ACROSS instead.
   */
  One = 'ONE',
}

/**
 * An auto-generated type for paginating through multiple DiscountApplications.
 *
 */
export interface ShopifyStorefrontDiscountApplicationConnection {
  __typename: 'DiscountApplicationConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontDiscountApplicationEdge>
  /** A list of the nodes contained in DiscountApplicationEdge. */
  nodes: Array<ShopifyStorefrontDiscountApplication>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one DiscountApplication and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontDiscountApplicationEdge {
  __typename: 'DiscountApplicationEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of DiscountApplicationEdge. */
  node: ShopifyStorefrontDiscountApplication
}

/**
 * The lines on the order to which the discount is applied, of the type defined by
 * the discount application's `targetType`. For example, the value `ENTITLED`, combined with a `targetType` of
 * `LINE_ITEM`, applies the discount on all line items that are entitled to the discount.
 * The value `ALL`, combined with a `targetType` of `SHIPPING_LINE`, applies the discount on all shipping lines.
 *
 */
export enum ShopifyStorefrontDiscountApplicationTargetSelection {
  /** The discount is allocated onto all the lines. */
  All = 'ALL',
  /** The discount is allocated onto only the lines that it's entitled for. */
  Entitled = 'ENTITLED',
  /** The discount is allocated onto explicitly chosen lines. */
  Explicit = 'EXPLICIT',
}

/**
 * The type of line (i.e. line item or shipping line) on an order that the discount is applicable towards.
 *
 */
export enum ShopifyStorefrontDiscountApplicationTargetType {
  /** The discount applies onto line items. */
  LineItem = 'LINE_ITEM',
  /** The discount applies onto shipping lines. */
  ShippingLine = 'SHIPPING_LINE',
}

/**
 * Discount code applications capture the intentions of a discount code at
 * the time that it is applied.
 *
 */
export interface ShopifyStorefrontDiscountCodeApplication
  extends ShopifyStorefrontDiscountApplication {
  __typename: 'DiscountCodeApplication'
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyStorefrontDiscountApplicationAllocationMethod
  /** Specifies whether the discount code was applied successfully. */
  applicable: Scalars['Boolean']['output']
  /** The string identifying the discount code that was used at the time of application. */
  code: Scalars['String']['output']
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
  field?: Maybe<Array<Scalars['String']['output']>>
  /** The error message. */
  message: Scalars['String']['output']
}

/** Represents a web address. */
export interface ShopifyStorefrontDomain {
  __typename: 'Domain'
  /** The host name of the domain (eg: `example.com`). */
  host: Scalars['String']['output']
  /** Whether SSL is enabled or not. */
  sslEnabled: Scalars['Boolean']['output']
  /** The URL of the domain (eg: `https://example.com`). */
  url: Scalars['URL']['output']
}

/** Represents a video hosted outside of Shopify. */
export interface ShopifyStorefrontExternalVideo
  extends ShopifyStorefrontMedia,
    ShopifyStorefrontNode {
  __typename: 'ExternalVideo'
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']['output']>
  /** The embed URL of the video for the respective host. */
  embedUrl: Scalars['URL']['output']
  /**
   * The URL.
   * @deprecated Use `originUrl` instead.
   */
  embeddedUrl: Scalars['URL']['output']
  /** The host of the external video. */
  host: ShopifyStorefrontMediaHost
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The media content type. */
  mediaContentType: ShopifyStorefrontMediaContentType
  /** The origin URL of the video on the respective host. */
  originUrl: Scalars['URL']['output']
  /** The presentation for a media. */
  presentation?: Maybe<ShopifyStorefrontMediaPresentation>
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyStorefrontImage>
}

/** A filter that is supported on the parent field. */
export interface ShopifyStorefrontFilter {
  __typename: 'Filter'
  /** A unique identifier. */
  id: Scalars['String']['output']
  /** A human-friendly string for this filter. */
  label: Scalars['String']['output']
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
 *
 */
export enum ShopifyStorefrontFilterType {
  /** A boolean value. */
  Boolean = 'BOOLEAN',
  /** A list of selectable values. */
  List = 'LIST',
  /** A range of prices. */
  PriceRange = 'PRICE_RANGE',
}

/** A selectable value within a filter. */
export interface ShopifyStorefrontFilterValue {
  __typename: 'FilterValue'
  /** The number of results that match this filter value. */
  count: Scalars['Int']['output']
  /** A unique identifier. */
  id: Scalars['String']['output']
  /**
   * An input object that can be used to filter by this value on the parent field.
   *
   * The value is provided as a helper for building dynamic filtering UI. For
   * example, if you have a list of selected `FilterValue` objects, you can combine
   * their respective `input` values to use in a subsequent query.
   *
   */
  input: Scalars['JSON']['output']
  /** A human-friendly string for this filter value. */
  label: Scalars['String']['output']
}

/** Represents a single fulfillment in an order. */
export interface ShopifyStorefrontFulfillment {
  __typename: 'Fulfillment'
  /** List of the fulfillment's line items. */
  fulfillmentLineItems: ShopifyStorefrontFulfillmentLineItemConnection
  /** The name of the tracking company. */
  trackingCompany?: Maybe<Scalars['String']['output']>
  /**
   * Tracking information associated with the fulfillment,
   * such as the tracking number and tracking URL.
   *
   */
  trackingInfo: Array<ShopifyStorefrontFulfillmentTrackingInfo>
}

/** Represents a single fulfillment in an order. */
export type ShopifyStorefrontFulfillmentFulfillmentLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/** Represents a single fulfillment in an order. */
export type ShopifyStorefrontFulfillmentTrackingInfoArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
}

/** Represents a single line item in a fulfillment. There is at most one fulfillment line item for each order line item. */
export interface ShopifyStorefrontFulfillmentLineItem {
  __typename: 'FulfillmentLineItem'
  /** The associated order's line item. */
  lineItem: ShopifyStorefrontOrderLineItem
  /** The amount fulfilled in this fulfillment. */
  quantity: Scalars['Int']['output']
}

/**
 * An auto-generated type for paginating through multiple FulfillmentLineItems.
 *
 */
export interface ShopifyStorefrontFulfillmentLineItemConnection {
  __typename: 'FulfillmentLineItemConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontFulfillmentLineItemEdge>
  /** A list of the nodes contained in FulfillmentLineItemEdge. */
  nodes: Array<ShopifyStorefrontFulfillmentLineItem>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one FulfillmentLineItem and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontFulfillmentLineItemEdge {
  __typename: 'FulfillmentLineItemEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of FulfillmentLineItemEdge. */
  node: ShopifyStorefrontFulfillmentLineItem
}

/** Tracking information associated with the fulfillment. */
export interface ShopifyStorefrontFulfillmentTrackingInfo {
  __typename: 'FulfillmentTrackingInfo'
  /** The tracking number of the fulfillment. */
  number?: Maybe<Scalars['String']['output']>
  /** The URL to track the fulfillment. */
  url?: Maybe<Scalars['URL']['output']>
}

/** The generic file resource lets you manage files in a merchant’s store. Generic files include any file that doesn’t fit into a designated type such as image or video. Example: PDF, JSON. */
export interface ShopifyStorefrontGenericFile extends ShopifyStorefrontNode {
  __typename: 'GenericFile'
  /** A word or phrase to indicate the contents of a file. */
  alt?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The MIME type of the file. */
  mimeType?: Maybe<Scalars['String']['output']>
  /** The size of the original file in bytes. */
  originalFileSize?: Maybe<Scalars['Int']['output']>
  /** The preview image for the file. */
  previewImage?: Maybe<ShopifyStorefrontImage>
  /** The URL of the file. */
  url?: Maybe<Scalars['URL']['output']>
}

/** The input fields used to specify a geographical location. */
export type ShopifyStorefrontGeoCoordinateInput = {
  /** The coordinate's latitude value. */
  latitude: Scalars['Float']['input']
  /** The coordinate's longitude value. */
  longitude: Scalars['Float']['input']
}

/** Represents information about the metafields associated to the specified resource. */
export type ShopifyStorefrontHasMetafields = {
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
}

/** Represents information about the metafields associated to the specified resource. */
export type ShopifyStorefrontHasMetafieldsMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/** Represents information about the metafields associated to the specified resource. */
export type ShopifyStorefrontHasMetafieldsMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/** The input fields to identify a metafield on an owner resource by namespace and key. */
export type ShopifyStorefrontHasMetafieldsIdentifier = {
  /** The identifier for the metafield. */
  key: Scalars['String']['input']
  /** The container the metafield belongs to. */
  namespace: Scalars['String']['input']
}

/** Represents an image resource. */
export interface ShopifyStorefrontImage {
  __typename: 'Image'
  /** A word or phrase to share the nature or contents of an image. */
  altText?: Maybe<Scalars['String']['output']>
  /** The original height of the image in pixels. Returns `null` if the image isn't hosted by Shopify. */
  height?: Maybe<Scalars['Int']['output']>
  /** A unique ID for the image. */
  id?: Maybe<Scalars['ID']['output']>
  /**
   * The location of the original image as a URL.
   *
   * If there are any existing transformations in the original source URL, they will remain and not be stripped.
   *
   * @deprecated Use `url` instead.
   */
  originalSrc: Scalars['URL']['output']
  /**
   * The location of the image as a URL.
   * @deprecated Use `url` instead.
   */
  src: Scalars['URL']['output']
  /**
   * The location of the transformed image as a URL.
   *
   * All transformation arguments are considered "best-effort". If they can be applied to an image, they will be.
   * Otherwise any transformations which an image type doesn't support will be ignored.
   *
   * @deprecated Use `url(transform:)` instead
   */
  transformedSrc: Scalars['URL']['output']
  /**
   * The location of the image as a URL.
   *
   * If no transform options are specified, then the original image will be preserved including any pre-applied transforms.
   *
   * All transformation options are considered "best-effort". Any transformation that the original image type doesn't support will be ignored.
   *
   * If you need multiple variations of the same image, then you can use [GraphQL aliases](https://graphql.org/learn/queries/#aliases).
   *
   */
  url: Scalars['URL']['output']
  /** The original width of the image in pixels. Returns `null` if the image isn't hosted by Shopify. */
  width?: Maybe<Scalars['Int']['output']>
}

/** Represents an image resource. */
export type ShopifyStorefrontImageTransformedSrcArgs = {
  crop?: InputMaybe<ShopifyStorefrontCropRegion>
  maxHeight?: InputMaybe<Scalars['Int']['input']>
  maxWidth?: InputMaybe<Scalars['Int']['input']>
  preferredContentType?: InputMaybe<ShopifyStorefrontImageContentType>
  scale?: InputMaybe<Scalars['Int']['input']>
}

/** Represents an image resource. */
export type ShopifyStorefrontImageUrlArgs = {
  transform?: InputMaybe<ShopifyStorefrontImageTransformInput>
}

/**
 * An auto-generated type for paginating through multiple Images.
 *
 */
export interface ShopifyStorefrontImageConnection {
  __typename: 'ImageConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontImageEdge>
  /** A list of the nodes contained in ImageEdge. */
  nodes: Array<ShopifyStorefrontImage>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/** List of supported image content types. */
export enum ShopifyStorefrontImageContentType {
  /** A JPG image. */
  Jpg = 'JPG',
  /** A PNG image. */
  Png = 'PNG',
  /** A WEBP image. */
  Webp = 'WEBP',
}

/**
 * An auto-generated type which holds one Image and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontImageEdge {
  __typename: 'ImageEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of ImageEdge. */
  node: ShopifyStorefrontImage
}

/**
 * The available options for transforming an image.
 *
 * All transformation options are considered best effort. Any transformation that
 * the original image type doesn't support will be ignored.
 *
 */
export type ShopifyStorefrontImageTransformInput = {
  /**
   * The region of the image to remain after cropping.
   * Must be used in conjunction with the `maxWidth` and/or `maxHeight` fields,
   * where the `maxWidth` and `maxHeight` aren't equal.
   * The `crop` argument should coincide with the smaller value. A smaller `maxWidth` indicates a `LEFT` or `RIGHT` crop, while
   * a smaller `maxHeight` indicates a `TOP` or `BOTTOM` crop. For example, `{
   * maxWidth: 5, maxHeight: 10, crop: LEFT }` will result
   * in an image with a width of 5 and height of 10, where the right side of the image is removed.
   *
   */
  crop?: InputMaybe<ShopifyStorefrontCropRegion>
  /**
   * Image height in pixels between 1 and 5760.
   *
   */
  maxHeight?: InputMaybe<Scalars['Int']['input']>
  /**
   * Image width in pixels between 1 and 5760.
   *
   */
  maxWidth?: InputMaybe<Scalars['Int']['input']>
  /**
   * Convert the source image into the preferred content type.
   * Supported conversions: `.svg` to `.png`, any file type to `.jpg`, and any file type to `.webp`.
   *
   */
  preferredContentType?: InputMaybe<ShopifyStorefrontImageContentType>
  /**
   * Image size multiplier for high-resolution retina displays. Must be within 1..3.
   *
   */
  scale?: InputMaybe<Scalars['Int']['input']>
}

/** Provide details about the contexts influenced by the @inContext directive on a field. */
export interface ShopifyStorefrontInContextAnnotation {
  __typename: 'InContextAnnotation'
  description: Scalars['String']['output']
  type: ShopifyStorefrontInContextAnnotationType
}

/** This gives information about the type of context that impacts a field. For example, for a query with @inContext(language: "EN"), the type would point to the name: LanguageCode and kind: ENUM. */
export interface ShopifyStorefrontInContextAnnotationType {
  __typename: 'InContextAnnotationType'
  kind: Scalars['String']['output']
  name: Scalars['String']['output']
}

/** A language. */
export interface ShopifyStorefrontLanguage {
  __typename: 'Language'
  /** The name of the language in the language itself. If the language uses capitalization, it is capitalized for a mid-sentence position. */
  endonymName: Scalars['String']['output']
  /** The ISO code. */
  isoCode: ShopifyStorefrontLanguageCode
  /** The name of the language in the current language. */
  name: Scalars['String']['output']
}

/** ISO 639-1 language codes supported by Shopify. */
export enum ShopifyStorefrontLanguageCode {
  /** Afrikaans. */
  Af = 'AF',
  /** Akan. */
  Ak = 'AK',
  /** Amharic. */
  Am = 'AM',
  /** Arabic. */
  Ar = 'AR',
  /** Assamese. */
  As = 'AS',
  /** Azerbaijani. */
  Az = 'AZ',
  /** Belarusian. */
  Be = 'BE',
  /** Bulgarian. */
  Bg = 'BG',
  /** Bambara. */
  Bm = 'BM',
  /** Bangla. */
  Bn = 'BN',
  /** Tibetan. */
  Bo = 'BO',
  /** Breton. */
  Br = 'BR',
  /** Bosnian. */
  Bs = 'BS',
  /** Catalan. */
  Ca = 'CA',
  /** Chechen. */
  Ce = 'CE',
  /** Central Kurdish. */
  Ckb = 'CKB',
  /** Czech. */
  Cs = 'CS',
  /** Church Slavic. */
  Cu = 'CU',
  /** Welsh. */
  Cy = 'CY',
  /** Danish. */
  Da = 'DA',
  /** German. */
  De = 'DE',
  /** Dzongkha. */
  Dz = 'DZ',
  /** Ewe. */
  Ee = 'EE',
  /** Greek. */
  El = 'EL',
  /** English. */
  En = 'EN',
  /** Esperanto. */
  Eo = 'EO',
  /** Spanish. */
  Es = 'ES',
  /** Estonian. */
  Et = 'ET',
  /** Basque. */
  Eu = 'EU',
  /** Persian. */
  Fa = 'FA',
  /** Fulah. */
  Ff = 'FF',
  /** Finnish. */
  Fi = 'FI',
  /** Filipino. */
  Fil = 'FIL',
  /** Faroese. */
  Fo = 'FO',
  /** French. */
  Fr = 'FR',
  /** Western Frisian. */
  Fy = 'FY',
  /** Irish. */
  Ga = 'GA',
  /** Scottish Gaelic. */
  Gd = 'GD',
  /** Galician. */
  Gl = 'GL',
  /** Gujarati. */
  Gu = 'GU',
  /** Manx. */
  Gv = 'GV',
  /** Hausa. */
  Ha = 'HA',
  /** Hebrew. */
  He = 'HE',
  /** Hindi. */
  Hi = 'HI',
  /** Croatian. */
  Hr = 'HR',
  /** Hungarian. */
  Hu = 'HU',
  /** Armenian. */
  Hy = 'HY',
  /** Interlingua. */
  Ia = 'IA',
  /** Indonesian. */
  Id = 'ID',
  /** Igbo. */
  Ig = 'IG',
  /** Sichuan Yi. */
  Ii = 'II',
  /** Icelandic. */
  Is = 'IS',
  /** Italian. */
  It = 'IT',
  /** Japanese. */
  Ja = 'JA',
  /** Javanese. */
  Jv = 'JV',
  /** Georgian. */
  Ka = 'KA',
  /** Kikuyu. */
  Ki = 'KI',
  /** Kazakh. */
  Kk = 'KK',
  /** Kalaallisut. */
  Kl = 'KL',
  /** Khmer. */
  Km = 'KM',
  /** Kannada. */
  Kn = 'KN',
  /** Korean. */
  Ko = 'KO',
  /** Kashmiri. */
  Ks = 'KS',
  /** Kurdish. */
  Ku = 'KU',
  /** Cornish. */
  Kw = 'KW',
  /** Kyrgyz. */
  Ky = 'KY',
  /** Latin. */
  La = 'LA',
  /** Luxembourgish. */
  Lb = 'LB',
  /** Ganda. */
  Lg = 'LG',
  /** Lingala. */
  Ln = 'LN',
  /** Lao. */
  Lo = 'LO',
  /** Lithuanian. */
  Lt = 'LT',
  /** Luba-Katanga. */
  Lu = 'LU',
  /** Latvian. */
  Lv = 'LV',
  /** Malagasy. */
  Mg = 'MG',
  /** Māori. */
  Mi = 'MI',
  /** Macedonian. */
  Mk = 'MK',
  /** Malayalam. */
  Ml = 'ML',
  /** Mongolian. */
  Mn = 'MN',
  /** Moldavian. */
  Mo = 'MO',
  /** Marathi. */
  Mr = 'MR',
  /** Malay. */
  Ms = 'MS',
  /** Maltese. */
  Mt = 'MT',
  /** Burmese. */
  My = 'MY',
  /** Norwegian (Bokmål). */
  Nb = 'NB',
  /** North Ndebele. */
  Nd = 'ND',
  /** Nepali. */
  Ne = 'NE',
  /** Dutch. */
  Nl = 'NL',
  /** Norwegian Nynorsk. */
  Nn = 'NN',
  /** Norwegian. */
  No = 'NO',
  /** Oromo. */
  Om = 'OM',
  /** Odia. */
  Or = 'OR',
  /** Ossetic. */
  Os = 'OS',
  /** Punjabi. */
  Pa = 'PA',
  /** Polish. */
  Pl = 'PL',
  /** Pashto. */
  Ps = 'PS',
  /** Portuguese. */
  Pt = 'PT',
  /** Portuguese (Brazil). */
  PtBr = 'PT_BR',
  /** Portuguese (Portugal). */
  PtPt = 'PT_PT',
  /** Quechua. */
  Qu = 'QU',
  /** Romansh. */
  Rm = 'RM',
  /** Rundi. */
  Rn = 'RN',
  /** Romanian. */
  Ro = 'RO',
  /** Russian. */
  Ru = 'RU',
  /** Kinyarwanda. */
  Rw = 'RW',
  /** Sanskrit. */
  Sa = 'SA',
  /** Sardinian. */
  Sc = 'SC',
  /** Sindhi. */
  Sd = 'SD',
  /** Northern Sami. */
  Se = 'SE',
  /** Sango. */
  Sg = 'SG',
  /** Serbo-Croatian. */
  Sh = 'SH',
  /** Sinhala. */
  Si = 'SI',
  /** Slovak. */
  Sk = 'SK',
  /** Slovenian. */
  Sl = 'SL',
  /** Shona. */
  Sn = 'SN',
  /** Somali. */
  So = 'SO',
  /** Albanian. */
  Sq = 'SQ',
  /** Serbian. */
  Sr = 'SR',
  /** Sundanese. */
  Su = 'SU',
  /** Swedish. */
  Sv = 'SV',
  /** Swahili. */
  Sw = 'SW',
  /** Tamil. */
  Ta = 'TA',
  /** Telugu. */
  Te = 'TE',
  /** Tajik. */
  Tg = 'TG',
  /** Thai. */
  Th = 'TH',
  /** Tigrinya. */
  Ti = 'TI',
  /** Turkmen. */
  Tk = 'TK',
  /** Tongan. */
  To = 'TO',
  /** Turkish. */
  Tr = 'TR',
  /** Tatar. */
  Tt = 'TT',
  /** Uyghur. */
  Ug = 'UG',
  /** Ukrainian. */
  Uk = 'UK',
  /** Urdu. */
  Ur = 'UR',
  /** Uzbek. */
  Uz = 'UZ',
  /** Vietnamese. */
  Vi = 'VI',
  /** Volapük. */
  Vo = 'VO',
  /** Wolof. */
  Wo = 'WO',
  /** Xhosa. */
  Xh = 'XH',
  /** Yiddish. */
  Yi = 'YI',
  /** Yoruba. */
  Yo = 'YO',
  /** Chinese. */
  Zh = 'ZH',
  /** Chinese (Simplified). */
  ZhCn = 'ZH_CN',
  /** Chinese (Traditional). */
  ZhTw = 'ZH_TW',
  /** Zulu. */
  Zu = 'ZU',
}

/** Information about the localized experiences configured for the shop. */
export interface ShopifyStorefrontLocalization {
  __typename: 'Localization'
  /** The list of countries with enabled localized experiences. */
  availableCountries: Array<ShopifyStorefrontCountry>
  /** The list of languages available for the active country. */
  availableLanguages: Array<ShopifyStorefrontLanguage>
  /** The country of the active localized experience. Use the `@inContext` directive to change this value. */
  country: ShopifyStorefrontCountry
  /** The language of the active localized experience. Use the `@inContext` directive to change this value. */
  language: ShopifyStorefrontLanguage
  /** The market including the country of the active localized experience. Use the `@inContext` directive to change this value. */
  market: ShopifyStorefrontMarket
}

/** Represents a location where product inventory is held. */
export interface ShopifyStorefrontLocation
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode {
  __typename: 'Location'
  /** The address of the location. */
  address: ShopifyStorefrontLocationAddress
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /** The name of the location. */
  name: Scalars['String']['output']
}

/** Represents a location where product inventory is held. */
export type ShopifyStorefrontLocationMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/** Represents a location where product inventory is held. */
export type ShopifyStorefrontLocationMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/**
 * Represents the address of a location.
 *
 */
export interface ShopifyStorefrontLocationAddress {
  __typename: 'LocationAddress'
  /** The first line of the address for the location. */
  address1?: Maybe<Scalars['String']['output']>
  /** The second line of the address for the location. */
  address2?: Maybe<Scalars['String']['output']>
  /** The city of the location. */
  city?: Maybe<Scalars['String']['output']>
  /** The country of the location. */
  country?: Maybe<Scalars['String']['output']>
  /** The country code of the location. */
  countryCode?: Maybe<Scalars['String']['output']>
  /** A formatted version of the address for the location. */
  formatted: Array<Scalars['String']['output']>
  /** The latitude coordinates of the location. */
  latitude?: Maybe<Scalars['Float']['output']>
  /** The longitude coordinates of the location. */
  longitude?: Maybe<Scalars['Float']['output']>
  /** The phone number of the location. */
  phone?: Maybe<Scalars['String']['output']>
  /** The province of the location. */
  province?: Maybe<Scalars['String']['output']>
  /**
   * The code for the province, state, or district of the address of the location.
   *
   */
  provinceCode?: Maybe<Scalars['String']['output']>
  /** The ZIP code of the location. */
  zip?: Maybe<Scalars['String']['output']>
}

/**
 * An auto-generated type for paginating through multiple Locations.
 *
 */
export interface ShopifyStorefrontLocationConnection {
  __typename: 'LocationConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontLocationEdge>
  /** A list of the nodes contained in LocationEdge. */
  nodes: Array<ShopifyStorefrontLocation>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one Location and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontLocationEdge {
  __typename: 'LocationEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of LocationEdge. */
  node: ShopifyStorefrontLocation
}

/** The set of valid sort keys for the Location query. */
export enum ShopifyStorefrontLocationSortKeys {
  /** Sort by the `city` value. */
  City = 'CITY',
  /** Sort by the `distance` value. */
  Distance = 'DISTANCE',
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `name` value. */
  Name = 'NAME',
}

/** Represents a mailing address for customers and shipping. */
export interface ShopifyStorefrontMailingAddress extends ShopifyStorefrontNode {
  __typename: 'MailingAddress'
  /** The first line of the address. Typically the street address or PO Box number. */
  address1?: Maybe<Scalars['String']['output']>
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2?: Maybe<Scalars['String']['output']>
  /** The name of the city, district, village, or town. */
  city?: Maybe<Scalars['String']['output']>
  /** The name of the customer's company or organization. */
  company?: Maybe<Scalars['String']['output']>
  /** The name of the country. */
  country?: Maybe<Scalars['String']['output']>
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   *
   * @deprecated Use `countryCodeV2` instead.
   */
  countryCode?: Maybe<Scalars['String']['output']>
  /**
   * The two-letter code for the country of the address.
   *
   * For example, US.
   *
   */
  countryCodeV2?: Maybe<ShopifyStorefrontCountryCode>
  /** The first name of the customer. */
  firstName?: Maybe<Scalars['String']['output']>
  /** A formatted version of the address, customized by the provided arguments. */
  formatted: Array<Scalars['String']['output']>
  /** A comma-separated list of the values for city, province, and country. */
  formattedArea?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The last name of the customer. */
  lastName?: Maybe<Scalars['String']['output']>
  /** The latitude coordinate of the customer address. */
  latitude?: Maybe<Scalars['Float']['output']>
  /** The longitude coordinate of the customer address. */
  longitude?: Maybe<Scalars['Float']['output']>
  /** The full name of the customer, based on firstName and lastName. */
  name?: Maybe<Scalars['String']['output']>
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: Maybe<Scalars['String']['output']>
  /** The region of the address, such as the province, state, or district. */
  province?: Maybe<Scalars['String']['output']>
  /**
   * The alphanumeric code for the region.
   *
   * For example, ON.
   *
   */
  provinceCode?: Maybe<Scalars['String']['output']>
  /** The zip or postal code of the address. */
  zip?: Maybe<Scalars['String']['output']>
}

/** Represents a mailing address for customers and shipping. */
export type ShopifyStorefrontMailingAddressFormattedArgs = {
  withCompany?: InputMaybe<Scalars['Boolean']['input']>
  withName?: InputMaybe<Scalars['Boolean']['input']>
}

/**
 * An auto-generated type for paginating through multiple MailingAddresses.
 *
 */
export interface ShopifyStorefrontMailingAddressConnection {
  __typename: 'MailingAddressConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontMailingAddressEdge>
  /** A list of the nodes contained in MailingAddressEdge. */
  nodes: Array<ShopifyStorefrontMailingAddress>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one MailingAddress and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontMailingAddressEdge {
  __typename: 'MailingAddressEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of MailingAddressEdge. */
  node: ShopifyStorefrontMailingAddress
}

/** The input fields to create or update a mailing address. */
export type ShopifyStorefrontMailingAddressInput = {
  /**
   * The first line of the address. Typically the street address or PO Box number.
   *
   */
  address1?: InputMaybe<Scalars['String']['input']>
  /**
   * The second line of the address. Typically the number of the apartment, suite, or unit.
   *
   */
  address2?: InputMaybe<Scalars['String']['input']>
  /**
   * The name of the city, district, village, or town.
   *
   */
  city?: InputMaybe<Scalars['String']['input']>
  /**
   * The name of the customer's company or organization.
   *
   */
  company?: InputMaybe<Scalars['String']['input']>
  /** The name of the country. */
  country?: InputMaybe<Scalars['String']['input']>
  /** The first name of the customer. */
  firstName?: InputMaybe<Scalars['String']['input']>
  /** The last name of the customer. */
  lastName?: InputMaybe<Scalars['String']['input']>
  /**
   * A unique phone number for the customer.
   *
   * Formatted using E.164 standard. For example, _+16135551111_.
   *
   */
  phone?: InputMaybe<Scalars['String']['input']>
  /** The region of the address, such as the province, state, or district. */
  province?: InputMaybe<Scalars['String']['input']>
  /** The zip or postal code of the address. */
  zip?: InputMaybe<Scalars['String']['input']>
}

/**
 * Manual discount applications capture the intentions of a discount that was manually created.
 *
 */
export interface ShopifyStorefrontManualDiscountApplication
  extends ShopifyStorefrontDiscountApplication {
  __typename: 'ManualDiscountApplication'
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyStorefrontDiscountApplicationAllocationMethod
  /** The description of the application. */
  description?: Maybe<Scalars['String']['output']>
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyStorefrontDiscountApplicationTargetSelection
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyStorefrontDiscountApplicationTargetType
  /** The title of the application. */
  title: Scalars['String']['output']
  /** The value of the discount application. */
  value: ShopifyStorefrontPricingValue
}

/** A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [the Shopify Markets conceptual overview](/docs/apps/markets). */
export interface ShopifyStorefrontMarket
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode {
  __typename: 'Market'
  /**
   * A human-readable unique string for the market automatically generated from its title.
   *
   */
  handle: Scalars['String']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
}

/** A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [the Shopify Markets conceptual overview](/docs/apps/markets). */
export type ShopifyStorefrontMarketMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/** A group of one or more regions of the world that a merchant is targeting for sales. To learn more about markets, refer to [the Shopify Markets conceptual overview](/docs/apps/markets). */
export type ShopifyStorefrontMarketMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/** Represents a media interface. */
export type ShopifyStorefrontMedia = {
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The media content type. */
  mediaContentType: ShopifyStorefrontMediaContentType
  /** The presentation for a media. */
  presentation?: Maybe<ShopifyStorefrontMediaPresentation>
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyStorefrontImage>
}

/**
 * An auto-generated type for paginating through multiple Media.
 *
 */
export interface ShopifyStorefrontMediaConnection {
  __typename: 'MediaConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontMediaEdge>
  /** A list of the nodes contained in MediaEdge. */
  nodes: Array<ShopifyStorefrontMedia>
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

/**
 * An auto-generated type which holds one Media and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontMediaEdge {
  __typename: 'MediaEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of MediaEdge. */
  node: ShopifyStorefrontMedia
}

/** Host for a Media Resource. */
export enum ShopifyStorefrontMediaHost {
  /** Host for Vimeo embedded videos. */
  Vimeo = 'VIMEO',
  /** Host for YouTube embedded videos. */
  Youtube = 'YOUTUBE',
}

/** Represents a Shopify hosted image. */
export interface ShopifyStorefrontMediaImage
  extends ShopifyStorefrontMedia,
    ShopifyStorefrontNode {
  __typename: 'MediaImage'
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The image for the media. */
  image?: Maybe<ShopifyStorefrontImage>
  /** The media content type. */
  mediaContentType: ShopifyStorefrontMediaContentType
  /** The presentation for a media. */
  presentation?: Maybe<ShopifyStorefrontMediaPresentation>
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyStorefrontImage>
}

/** A media presentation. */
export interface ShopifyStorefrontMediaPresentation
  extends ShopifyStorefrontNode {
  __typename: 'MediaPresentation'
  /** A JSON object representing a presentation view. */
  asJson?: Maybe<Scalars['JSON']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
}

/** A media presentation. */
export type ShopifyStorefrontMediaPresentationAsJsonArgs = {
  format: ShopifyStorefrontMediaPresentationFormat
}

/** The possible formats for a media presentation. */
export enum ShopifyStorefrontMediaPresentationFormat {
  /** A media image presentation. */
  Image = 'IMAGE',
  /** A model viewer presentation. */
  ModelViewer = 'MODEL_VIEWER',
}

/**
 * A [navigation menu](https://help.shopify.com/manual/online-store/menus-and-links) representing a hierarchy
 * of hyperlinks (items).
 *
 */
export interface ShopifyStorefrontMenu extends ShopifyStorefrontNode {
  __typename: 'Menu'
  /** The menu's handle. */
  handle: Scalars['String']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The menu's child items. */
  items: Array<ShopifyStorefrontMenuItem>
  /** The count of items on the menu. */
  itemsCount: Scalars['Int']['output']
  /** The menu's title. */
  title: Scalars['String']['output']
}

/** A menu item within a parent menu. */
export interface ShopifyStorefrontMenuItem extends ShopifyStorefrontNode {
  __typename: 'MenuItem'
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The menu item's child items. */
  items: Array<ShopifyStorefrontMenuItem>
  /** The linked resource. */
  resource?: Maybe<ShopifyStorefrontMenuItemResource>
  /** The ID of the linked resource. */
  resourceId?: Maybe<Scalars['ID']['output']>
  /** The menu item's tags to filter a collection. */
  tags: Array<Scalars['String']['output']>
  /** The menu item's title. */
  title: Scalars['String']['output']
  /** The menu item's type. */
  type: ShopifyStorefrontMenuItemType
  /** The menu item's URL. */
  url?: Maybe<Scalars['URL']['output']>
}

/**
 * The list of possible resources a `MenuItem` can reference.
 *
 */
export type ShopifyStorefrontMenuItemResource =
  | ShopifyStorefrontArticle
  | ShopifyStorefrontBlog
  | ShopifyStorefrontCollection
  | ShopifyStorefrontPage
  | ShopifyStorefrontProduct
  | ShopifyStorefrontShopPolicy

/** A menu item type. */
export enum ShopifyStorefrontMenuItemType {
  /** An article link. */
  Article = 'ARTICLE',
  /** A blog link. */
  Blog = 'BLOG',
  /** A catalog link. */
  Catalog = 'CATALOG',
  /** A collection link. */
  Collection = 'COLLECTION',
  /** A collection link. */
  Collections = 'COLLECTIONS',
  /** A frontpage link. */
  Frontpage = 'FRONTPAGE',
  /** An http link. */
  Http = 'HTTP',
  /** A page link. */
  Page = 'PAGE',
  /** A product link. */
  Product = 'PRODUCT',
  /** A search link. */
  Search = 'SEARCH',
  /** A shop policy link. */
  ShopPolicy = 'SHOP_POLICY',
}

/** The merchandise to be purchased at checkout. */
export type ShopifyStorefrontMerchandise = ShopifyStorefrontProductVariant

/**
 * Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are
 * comprised of keys, values, and value types.
 *
 */
export interface ShopifyStorefrontMetafield extends ShopifyStorefrontNode {
  __typename: 'Metafield'
  /** The date and time when the storefront metafield was created. */
  createdAt: Scalars['DateTime']['output']
  /** The description of a metafield. */
  description?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The unique identifier for the metafield within its namespace. */
  key: Scalars['String']['output']
  /** The container for a group of metafields that the metafield is associated with. */
  namespace: Scalars['String']['output']
  /** The type of resource that the metafield is attached to. */
  parentResource: ShopifyStorefrontMetafieldParentResource
  /** Returns a reference object if the metafield's type is a resource reference. */
  reference?: Maybe<ShopifyStorefrontMetafieldReference>
  /** A list of reference objects if the metafield's type is a resource reference list. */
  references?: Maybe<ShopifyStorefrontMetafieldReferenceConnection>
  /**
   * The type name of the metafield.
   * Refer to the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
   *
   */
  type: Scalars['String']['output']
  /** The date and time when the metafield was last updated. */
  updatedAt: Scalars['DateTime']['output']
  /** The data stored in the metafield. Always stored as a string, regardless of the metafield's type. */
  value: Scalars['String']['output']
}

/**
 * Metafields represent custom metadata attached to a resource. Metafields can be sorted into namespaces and are
 * comprised of keys, values, and value types.
 *
 */
export type ShopifyStorefrontMetafieldReferencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

/** Possible error codes that can be returned by `MetafieldDeleteUserError`. */
export enum ShopifyStorefrontMetafieldDeleteErrorCode {
  /** The owner ID is invalid. */
  InvalidOwner = 'INVALID_OWNER',
  /** Metafield not found. */
  MetafieldDoesNotExist = 'METAFIELD_DOES_NOT_EXIST',
}

/** An error that occurs during the execution of cart metafield deletion. */
export interface ShopifyStorefrontMetafieldDeleteUserError
  extends ShopifyStorefrontDisplayableError {
  __typename: 'MetafieldDeleteUserError'
  /** The error code. */
  code?: Maybe<ShopifyStorefrontMetafieldDeleteErrorCode>
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>
  /** The error message. */
  message: Scalars['String']['output']
}

/**
 * A filter used to view a subset of products in a collection matching a specific metafield value.
 *
 * Only the following metafield types are currently supported:
 * - `number_integer`
 * - `number_decimal`
 * - `single_line_text_field`
 * - `boolean` as of 2022-04.
 *
 */
export type ShopifyStorefrontMetafieldFilter = {
  /** The key of the metafield to filter on. */
  key: Scalars['String']['input']
  /** The namespace of the metafield to filter on. */
  namespace: Scalars['String']['input']
  /** The value of the metafield. */
  value: Scalars['String']['input']
}

/** A resource that the metafield belongs to. */
export type ShopifyStorefrontMetafieldParentResource =
  | ShopifyStorefrontArticle
  | ShopifyStorefrontBlog
  | ShopifyStorefrontCart
  | ShopifyStorefrontCollection
  | ShopifyStorefrontCustomer
  | ShopifyStorefrontLocation
  | ShopifyStorefrontMarket
  | ShopifyStorefrontOrder
  | ShopifyStorefrontPage
  | ShopifyStorefrontProduct
  | ShopifyStorefrontProductVariant
  | ShopifyStorefrontShop

/**
 * Returns the resource which is being referred to by a metafield.
 *
 */
export type ShopifyStorefrontMetafieldReference =
  | ShopifyStorefrontCollection
  | ShopifyStorefrontGenericFile
  | ShopifyStorefrontMediaImage
  | ShopifyStorefrontMetaobject
  | ShopifyStorefrontPage
  | ShopifyStorefrontProduct
  | ShopifyStorefrontProductVariant
  | ShopifyStorefrontVideo

/**
 * An auto-generated type for paginating through multiple MetafieldReferences.
 *
 */
export interface ShopifyStorefrontMetafieldReferenceConnection {
  __typename: 'MetafieldReferenceConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontMetafieldReferenceEdge>
  /** A list of the nodes contained in MetafieldReferenceEdge. */
  nodes: Array<ShopifyStorefrontMetafieldReference>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one MetafieldReference and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontMetafieldReferenceEdge {
  __typename: 'MetafieldReferenceEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of MetafieldReferenceEdge. */
  node: ShopifyStorefrontMetafieldReference
}

/** An error that occurs during the execution of `MetafieldsSet`. */
export interface ShopifyStorefrontMetafieldsSetUserError
  extends ShopifyStorefrontDisplayableError {
  __typename: 'MetafieldsSetUserError'
  /** The error code. */
  code?: Maybe<ShopifyStorefrontMetafieldsSetUserErrorCode>
  /** The index of the array element that's causing the error. */
  elementIndex?: Maybe<Scalars['Int']['output']>
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>
  /** The error message. */
  message: Scalars['String']['output']
}

/** Possible error codes that can be returned by `MetafieldsSetUserError`. */
export enum ShopifyStorefrontMetafieldsSetUserErrorCode {
  /** The input value is blank. */
  Blank = 'BLANK',
  /** The input value isn't included in the list. */
  Inclusion = 'INCLUSION',
  /** The owner ID is invalid. */
  InvalidOwner = 'INVALID_OWNER',
  /** The type is invalid. */
  InvalidType = 'INVALID_TYPE',
  /** The value is invalid for metafield type or for definition options. */
  InvalidValue = 'INVALID_VALUE',
  /** The input value should be less than or equal to the maximum value allowed. */
  LessThanOrEqualTo = 'LESS_THAN_OR_EQUAL_TO',
  /** The input value needs to be blank. */
  Present = 'PRESENT',
  /** The input value is too long. */
  TooLong = 'TOO_LONG',
  /** The input value is too short. */
  TooShort = 'TOO_SHORT',
}

/** An instance of a user-defined model based on a MetaobjectDefinition. */
export interface ShopifyStorefrontMetaobject extends ShopifyStorefrontNode {
  __typename: 'Metaobject'
  /** Accesses a field of the object by key. */
  field?: Maybe<ShopifyStorefrontMetaobjectField>
  /**
   * All object fields with defined values.
   * Omitted object keys can be assumed null, and no guarantees are made about field order.
   *
   */
  fields: Array<ShopifyStorefrontMetaobjectField>
  /** The unique handle of the metaobject. Useful as a custom ID. */
  handle: Scalars['String']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The type of the metaobject. Defines the namespace of its associated metafields. */
  type: Scalars['String']['output']
  /** The date and time when the metaobject was last updated. */
  updatedAt: Scalars['DateTime']['output']
}

/** An instance of a user-defined model based on a MetaobjectDefinition. */
export type ShopifyStorefrontMetaobjectFieldArgs = {
  key: Scalars['String']['input']
}

/**
 * An auto-generated type for paginating through multiple Metaobjects.
 *
 */
export interface ShopifyStorefrontMetaobjectConnection {
  __typename: 'MetaobjectConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontMetaobjectEdge>
  /** A list of the nodes contained in MetaobjectEdge. */
  nodes: Array<ShopifyStorefrontMetaobject>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one Metaobject and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontMetaobjectEdge {
  __typename: 'MetaobjectEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of MetaobjectEdge. */
  node: ShopifyStorefrontMetaobject
}

/** Provides the value of a Metaobject field. */
export interface ShopifyStorefrontMetaobjectField {
  __typename: 'MetaobjectField'
  /** The field key. */
  key: Scalars['String']['output']
  /** A referenced object if the field type is a resource reference. */
  reference?: Maybe<ShopifyStorefrontMetafieldReference>
  /** A list of referenced objects if the field type is a resource reference list. */
  references?: Maybe<ShopifyStorefrontMetafieldReferenceConnection>
  /**
   * The type name of the field.
   * See the list of [supported types](https://shopify.dev/apps/metafields/definitions/types).
   *
   */
  type: Scalars['String']['output']
  /** The field value. */
  value?: Maybe<Scalars['String']['output']>
}

/** Provides the value of a Metaobject field. */
export type ShopifyStorefrontMetaobjectFieldReferencesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
}

/** The input fields used to retrieve a metaobject by handle. */
export type ShopifyStorefrontMetaobjectHandleInput = {
  /** The handle of the metaobject. */
  handle: Scalars['String']['input']
  /** The type of the metaobject. */
  type: Scalars['String']['input']
}

/** Represents a Shopify hosted 3D model. */
export interface ShopifyStorefrontModel3d
  extends ShopifyStorefrontMedia,
    ShopifyStorefrontNode {
  __typename: 'Model3d'
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The media content type. */
  mediaContentType: ShopifyStorefrontMediaContentType
  /** The presentation for a media. */
  presentation?: Maybe<ShopifyStorefrontMediaPresentation>
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyStorefrontImage>
  /** The sources for a 3d model. */
  sources: Array<ShopifyStorefrontModel3dSource>
}

/** Represents a source for a Shopify hosted 3d model. */
export interface ShopifyStorefrontModel3dSource {
  __typename: 'Model3dSource'
  /** The filesize of the 3d model. */
  filesize: Scalars['Int']['output']
  /** The format of the 3d model. */
  format: Scalars['String']['output']
  /** The MIME type of the 3d model. */
  mimeType: Scalars['String']['output']
  /** The URL of the 3d model. */
  url: Scalars['String']['output']
}

/** The input fields for a monetary value with currency. */
export type ShopifyStorefrontMoneyInput = {
  /** Decimal money amount. */
  amount: Scalars['Decimal']['input']
  /** Currency of the money. */
  currencyCode: ShopifyStorefrontCurrencyCode
}

/**
 * A monetary value with currency.
 *
 */
export interface ShopifyStorefrontMoneyV2 {
  __typename: 'MoneyV2'
  /** Decimal money amount. */
  amount: Scalars['Decimal']['output']
  /** Currency of the money. */
  currencyCode: ShopifyStorefrontCurrencyCode
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
   *
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
  /** Deletes a cart metafield. */
  cartMetafieldDelete?: Maybe<ShopifyStorefrontCartMetafieldDeletePayload>
  /**
   * Sets cart metafield values. Cart metafield values will be set regardless if they were previously created or not.
   *
   * Allows a maximum of 25 cart metafields to be set at a time.
   *
   */
  cartMetafieldsSet?: Maybe<ShopifyStorefrontCartMetafieldsSetPayload>
  /** Updates the note on the cart. */
  cartNoteUpdate?: Maybe<ShopifyStorefrontCartNoteUpdatePayload>
  /** Update the customer's payment method that will be used to checkout. */
  cartPaymentUpdate?: Maybe<ShopifyStorefrontCartPaymentUpdatePayload>
  /** Update the selected delivery options for a delivery group. */
  cartSelectedDeliveryOptionsUpdate?: Maybe<ShopifyStorefrontCartSelectedDeliveryOptionsUpdatePayload>
  /** Submit the cart for checkout completion. */
  cartSubmitForCompletion?: Maybe<ShopifyStorefrontCartSubmitForCompletionPayload>
  /**
   * Updates the attributes of a checkout if `allowPartialAddresses` is `true`.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutAttributesUpdateV2?: Maybe<ShopifyStorefrontCheckoutAttributesUpdateV2Payload>
  /**
   * Completes a checkout without providing payment information. You can use this mutation for free items or items whose purchase price is covered by a gift card.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutCompleteFree?: Maybe<ShopifyStorefrontCheckoutCompleteFreePayload>
  /**
   * Completes a checkout using a credit card token from Shopify's card vault. Before you can complete checkouts using CheckoutCompleteWithCreditCardV2, you need to  [_request payment processing_](https://shopify.dev/apps/channels/getting-started#request-payment-processing).
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutCompleteWithCreditCardV2?: Maybe<ShopifyStorefrontCheckoutCompleteWithCreditCardV2Payload>
  /**
   * Completes a checkout with a tokenized payment.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutCompleteWithTokenizedPaymentV3?: Maybe<ShopifyStorefrontCheckoutCompleteWithTokenizedPaymentV3Payload>
  /**
   * Creates a new checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutCreate?: Maybe<ShopifyStorefrontCheckoutCreatePayload>
  /**
   * Associates a customer to the checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutCustomerAssociateV2?: Maybe<ShopifyStorefrontCheckoutCustomerAssociateV2Payload>
  /**
   * Disassociates the current checkout customer from the checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutCustomerDisassociateV2?: Maybe<ShopifyStorefrontCheckoutCustomerDisassociateV2Payload>
  /**
   * Applies a discount to an existing checkout using a discount code.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutDiscountCodeApplyV2?: Maybe<ShopifyStorefrontCheckoutDiscountCodeApplyV2Payload>
  /**
   * Removes the applied discounts from an existing checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutDiscountCodeRemove?: Maybe<ShopifyStorefrontCheckoutDiscountCodeRemovePayload>
  /**
   * Updates the email on an existing checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutEmailUpdateV2?: Maybe<ShopifyStorefrontCheckoutEmailUpdateV2Payload>
  /**
   * Removes an applied gift card from the checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutGiftCardRemoveV2?: Maybe<ShopifyStorefrontCheckoutGiftCardRemoveV2Payload>
  /**
   * Appends gift cards to an existing checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutGiftCardsAppend?: Maybe<ShopifyStorefrontCheckoutGiftCardsAppendPayload>
  /**
   * Adds a list of line items to a checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutLineItemsAdd?: Maybe<ShopifyStorefrontCheckoutLineItemsAddPayload>
  /**
   * Removes line items from an existing checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutLineItemsRemove?: Maybe<ShopifyStorefrontCheckoutLineItemsRemovePayload>
  /**
   * Sets a list of line items to a checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutLineItemsReplace?: Maybe<ShopifyStorefrontCheckoutLineItemsReplacePayload>
  /**
   * Updates line items on a checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutLineItemsUpdate?: Maybe<ShopifyStorefrontCheckoutLineItemsUpdatePayload>
  /**
   * Updates the shipping address of an existing checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutShippingAddressUpdateV2?: Maybe<ShopifyStorefrontCheckoutShippingAddressUpdateV2Payload>
  /**
   * Updates the shipping lines on an existing checkout.
   * @deprecated The Storefront GraphQL Checkout API is deprecated and will be removed in a future version. Please see https://shopify.dev/changelog/deprecation-of-checkout-apis for more information.
   */
  checkoutShippingLineUpdate?: Maybe<ShopifyStorefrontCheckoutShippingLineUpdatePayload>
  /**
   * Creates a customer access token.
   * The customer access token is required to modify the customer object in any way.
   *
   */
  customerAccessTokenCreate?: Maybe<ShopifyStorefrontCustomerAccessTokenCreatePayload>
  /**
   * Creates a customer access token using a
   * [multipass token](https://shopify.dev/api/multipass) instead of email and
   * password. A customer record is created if the customer doesn't exist. If a customer
   * record already exists but the record is disabled, then the customer record is enabled.
   *
   */
  customerAccessTokenCreateWithMultipass?: Maybe<ShopifyStorefrontCustomerAccessTokenCreateWithMultipassPayload>
  /** Permanently destroys a customer access token. */
  customerAccessTokenDelete?: Maybe<ShopifyStorefrontCustomerAccessTokenDeletePayload>
  /**
   * Renews a customer access token.
   *
   * Access token renewal must happen *before* a token expires.
   * If a token has already expired, a new one should be created instead via `customerAccessTokenCreate`.
   *
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
   * This mutation is throttled by IP. With private access,
   * you can provide a [`Shopify-Storefront-Buyer-IP`](https://shopify.dev/api/usage/authentication#optional-ip-header) instead of the request IP.
   * The header is case-sensitive and must be sent as `Shopify-Storefront-Buyer-IP`.
   *
   * Make sure that the value provided to `Shopify-Storefront-Buyer-IP` is trusted. Unthrottled access to this
   * mutation presents a security risk.
   *
   */
  customerRecover?: Maybe<ShopifyStorefrontCustomerRecoverPayload>
  /**
   * "Resets a customer’s password with the token received from a reset password email. You can send a reset password email with the [`customerRecover`](https://shopify.dev/api/storefront/latest/mutations/customerRecover) mutation."
   *
   */
  customerReset?: Maybe<ShopifyStorefrontCustomerResetPayload>
  /**
   * "Resets a customer’s password with the reset password URL received from a reset password email. You can send a reset password email with the [`customerRecover`](https://shopify.dev/api/storefront/latest/mutations/customerRecover) mutation."
   *
   */
  customerResetByUrl?: Maybe<ShopifyStorefrontCustomerResetByUrlPayload>
  /** Updates an existing customer. */
  customerUpdate?: Maybe<ShopifyStorefrontCustomerUpdatePayload>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartAttributesUpdateArgs = {
  attributes: Array<ShopifyStorefrontAttributeInput>
  cartId: Scalars['ID']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartBuyerIdentityUpdateArgs = {
  buyerIdentity: ShopifyStorefrontCartBuyerIdentityInput
  cartId: Scalars['ID']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartCreateArgs = {
  input?: InputMaybe<ShopifyStorefrontCartInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartDiscountCodesUpdateArgs = {
  cartId: Scalars['ID']['input']
  discountCodes?: InputMaybe<Array<Scalars['String']['input']>>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartLinesAddArgs = {
  cartId: Scalars['ID']['input']
  lines: Array<ShopifyStorefrontCartLineInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartLinesRemoveArgs = {
  cartId: Scalars['ID']['input']
  lineIds: Array<Scalars['ID']['input']>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartLinesUpdateArgs = {
  cartId: Scalars['ID']['input']
  lines: Array<ShopifyStorefrontCartLineUpdateInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartMetafieldDeleteArgs = {
  input: ShopifyStorefrontCartMetafieldDeleteInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartMetafieldsSetArgs = {
  metafields: Array<ShopifyStorefrontCartMetafieldsSetInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartNoteUpdateArgs = {
  cartId: Scalars['ID']['input']
  note?: InputMaybe<Scalars['String']['input']>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartPaymentUpdateArgs = {
  cartId: Scalars['ID']['input']
  payment: ShopifyStorefrontCartPaymentInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartSelectedDeliveryOptionsUpdateArgs = {
  cartId: Scalars['ID']['input']
  selectedDeliveryOptions: Array<ShopifyStorefrontCartSelectedDeliveryOptionInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCartSubmitForCompletionArgs = {
  attemptToken: Scalars['String']['input']
  cartId: Scalars['ID']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutAttributesUpdateV2Args = {
  checkoutId: Scalars['ID']['input']
  input: ShopifyStorefrontCheckoutAttributesUpdateV2Input
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCompleteFreeArgs = {
  checkoutId: Scalars['ID']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCompleteWithCreditCardV2Args = {
  checkoutId: Scalars['ID']['input']
  payment: ShopifyStorefrontCreditCardPaymentInputV2
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCompleteWithTokenizedPaymentV3Args =
  {
    checkoutId: Scalars['ID']['input']
    payment: ShopifyStorefrontTokenizedPaymentInputV3
  }

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCreateArgs = {
  input: ShopifyStorefrontCheckoutCreateInput
  queueToken?: InputMaybe<Scalars['String']['input']>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCustomerAssociateV2Args = {
  checkoutId: Scalars['ID']['input']
  customerAccessToken: Scalars['String']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutCustomerDisassociateV2Args = {
  checkoutId: Scalars['ID']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutDiscountCodeApplyV2Args = {
  checkoutId: Scalars['ID']['input']
  discountCode: Scalars['String']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutDiscountCodeRemoveArgs = {
  checkoutId: Scalars['ID']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutEmailUpdateV2Args = {
  checkoutId: Scalars['ID']['input']
  email: Scalars['String']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutGiftCardRemoveV2Args = {
  appliedGiftCardId: Scalars['ID']['input']
  checkoutId: Scalars['ID']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutGiftCardsAppendArgs = {
  checkoutId: Scalars['ID']['input']
  giftCardCodes: Array<Scalars['String']['input']>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutLineItemsAddArgs = {
  checkoutId: Scalars['ID']['input']
  lineItems: Array<ShopifyStorefrontCheckoutLineItemInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutLineItemsRemoveArgs = {
  checkoutId: Scalars['ID']['input']
  lineItemIds: Array<Scalars['ID']['input']>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutLineItemsReplaceArgs = {
  checkoutId: Scalars['ID']['input']
  lineItems: Array<ShopifyStorefrontCheckoutLineItemInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutLineItemsUpdateArgs = {
  checkoutId: Scalars['ID']['input']
  lineItems: Array<ShopifyStorefrontCheckoutLineItemUpdateInput>
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutShippingAddressUpdateV2Args = {
  checkoutId: Scalars['ID']['input']
  shippingAddress: ShopifyStorefrontMailingAddressInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCheckoutShippingLineUpdateArgs = {
  checkoutId: Scalars['ID']['input']
  shippingRateHandle: Scalars['String']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAccessTokenCreateArgs = {
  input: ShopifyStorefrontCustomerAccessTokenCreateInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAccessTokenCreateWithMultipassArgs =
  {
    multipassToken: Scalars['String']['input']
  }

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAccessTokenDeleteArgs = {
  customerAccessToken: Scalars['String']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAccessTokenRenewArgs = {
  customerAccessToken: Scalars['String']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerActivateArgs = {
  id: Scalars['ID']['input']
  input: ShopifyStorefrontCustomerActivateInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerActivateByUrlArgs = {
  activationUrl: Scalars['URL']['input']
  password: Scalars['String']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAddressCreateArgs = {
  address: ShopifyStorefrontMailingAddressInput
  customerAccessToken: Scalars['String']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAddressDeleteArgs = {
  customerAccessToken: Scalars['String']['input']
  id: Scalars['ID']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerAddressUpdateArgs = {
  address: ShopifyStorefrontMailingAddressInput
  customerAccessToken: Scalars['String']['input']
  id: Scalars['ID']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerCreateArgs = {
  input: ShopifyStorefrontCustomerCreateInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerDefaultAddressUpdateArgs = {
  addressId: Scalars['ID']['input']
  customerAccessToken: Scalars['String']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerRecoverArgs = {
  email: Scalars['String']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerResetArgs = {
  id: Scalars['ID']['input']
  input: ShopifyStorefrontCustomerResetInput
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerResetByUrlArgs = {
  password: Scalars['String']['input']
  resetUrl: Scalars['URL']['input']
}

/** The schema’s entry-point for mutations. This acts as the public, top-level API from which all mutation queries must start. */
export type ShopifyStorefrontMutationCustomerUpdateArgs = {
  customer: ShopifyStorefrontCustomerUpdateInput
  customerAccessToken: Scalars['String']['input']
}

/**
 * An object with an ID field to support global identification, in accordance with the
 * [Relay specification](https://relay.dev/graphql/objectidentification.htm#sec-Node-Interface).
 * This interface is used by the [node](https://shopify.dev/api/admin-graphql/unstable/queries/node)
 * and [nodes](https://shopify.dev/api/admin-graphql/unstable/queries/nodes) queries.
 *
 */
export type ShopifyStorefrontNode = {
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
}

/** Represents a resource that can be published to the Online Store sales channel. */
export type ShopifyStorefrontOnlineStorePublishable = {
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']['output']>
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export interface ShopifyStorefrontOrder
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode {
  __typename: 'Order'
  /** The address associated with the payment method. */
  billingAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /** The reason for the order's cancellation. Returns `null` if the order wasn't canceled. */
  cancelReason?: Maybe<ShopifyStorefrontOrderCancelReason>
  /** The date and time when the order was canceled. Returns null if the order wasn't canceled. */
  canceledAt?: Maybe<Scalars['DateTime']['output']>
  /** The code of the currency used for the payment. */
  currencyCode: ShopifyStorefrontCurrencyCode
  /** The subtotal of line items and their discounts, excluding line items that have been removed. Does not contain order-level discounts, duties, shipping costs, or shipping discounts. Taxes aren't included unless the order is a taxes-included order. */
  currentSubtotalPrice: ShopifyStorefrontMoneyV2
  /** The total cost of duties for the order, including refunds. */
  currentTotalDuties?: Maybe<ShopifyStorefrontMoneyV2>
  /** The total amount of the order, including duties, taxes and discounts, minus amounts for line items that have been removed. */
  currentTotalPrice: ShopifyStorefrontMoneyV2
  /** The total of all taxes applied to the order, excluding taxes for returned line items. */
  currentTotalTax: ShopifyStorefrontMoneyV2
  /** A list of the custom attributes added to the order. */
  customAttributes: Array<ShopifyStorefrontAttribute>
  /** The locale code in which this specific order happened. */
  customerLocale?: Maybe<Scalars['String']['output']>
  /** The unique URL that the customer can use to access the order. */
  customerUrl?: Maybe<Scalars['URL']['output']>
  /** Discounts that have been applied on the order. */
  discountApplications: ShopifyStorefrontDiscountApplicationConnection
  /** Whether the order has had any edits applied or not. */
  edited: Scalars['Boolean']['output']
  /** The customer's email address. */
  email?: Maybe<Scalars['String']['output']>
  /** The financial status of the order. */
  financialStatus?: Maybe<ShopifyStorefrontOrderFinancialStatus>
  /** The fulfillment status for the order. */
  fulfillmentStatus: ShopifyStorefrontOrderFulfillmentStatus
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** List of the order’s line items. */
  lineItems: ShopifyStorefrontOrderLineItemConnection
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /**
   * Unique identifier for the order that appears on the order.
   * For example, _#1000_ or _Store1001.
   *
   */
  name: Scalars['String']['output']
  /** A unique numeric identifier for the order for use by shop owner and customer. */
  orderNumber: Scalars['Int']['output']
  /** The total cost of duties charged at checkout. */
  originalTotalDuties?: Maybe<ShopifyStorefrontMoneyV2>
  /** The total price of the order before any applied edits. */
  originalTotalPrice: ShopifyStorefrontMoneyV2
  /** The customer's phone number for receiving SMS notifications. */
  phone?: Maybe<Scalars['String']['output']>
  /**
   * The date and time when the order was imported.
   * This value can be set to dates in the past when importing from other systems.
   * If no value is provided, it will be auto-generated based on current date and time.
   *
   */
  processedAt: Scalars['DateTime']['output']
  /** The address to where the order will be shipped. */
  shippingAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /**
   * The discounts that have been allocated onto the shipping line by discount applications.
   *
   */
  shippingDiscountAllocations: Array<ShopifyStorefrontDiscountAllocation>
  /** The unique URL for the order's status page. */
  statusUrl: Scalars['URL']['output']
  /** Price of the order before shipping and taxes. */
  subtotalPrice?: Maybe<ShopifyStorefrontMoneyV2>
  /**
   * Price of the order before duties, shipping and taxes.
   * @deprecated Use `subtotalPrice` instead.
   */
  subtotalPriceV2?: Maybe<ShopifyStorefrontMoneyV2>
  /** List of the order’s successful fulfillments. */
  successfulFulfillments?: Maybe<Array<ShopifyStorefrontFulfillment>>
  /** The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive). */
  totalPrice: ShopifyStorefrontMoneyV2
  /**
   * The sum of all the prices of all the items in the order, duties, taxes and discounts included (must be positive).
   * @deprecated Use `totalPrice` instead.
   */
  totalPriceV2: ShopifyStorefrontMoneyV2
  /** The total amount that has been refunded. */
  totalRefunded: ShopifyStorefrontMoneyV2
  /**
   * The total amount that has been refunded.
   * @deprecated Use `totalRefunded` instead.
   */
  totalRefundedV2: ShopifyStorefrontMoneyV2
  /** The total cost of shipping. */
  totalShippingPrice: ShopifyStorefrontMoneyV2
  /**
   * The total cost of shipping.
   * @deprecated Use `totalShippingPrice` instead.
   */
  totalShippingPriceV2: ShopifyStorefrontMoneyV2
  /** The total cost of taxes. */
  totalTax?: Maybe<ShopifyStorefrontMoneyV2>
  /**
   * The total cost of taxes.
   * @deprecated Use `totalTax` instead.
   */
  totalTaxV2?: Maybe<ShopifyStorefrontMoneyV2>
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyStorefrontOrderDiscountApplicationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyStorefrontOrderLineItemsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyStorefrontOrderMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyStorefrontOrderMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/** An order is a customer’s completed request to purchase one or more products from a shop. An order is created when a customer completes the checkout process, during which time they provides an email address, billing address and payment information. */
export type ShopifyStorefrontOrderSuccessfulFulfillmentsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
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

/**
 * An auto-generated type for paginating through multiple Orders.
 *
 */
export interface ShopifyStorefrontOrderConnection {
  __typename: 'OrderConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontOrderEdge>
  /** A list of the nodes contained in OrderEdge. */
  nodes: Array<ShopifyStorefrontOrder>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
  /** The total count of Orders. */
  totalCount: Scalars['UnsignedInt64']['output']
}

/**
 * An auto-generated type which holds one Order and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontOrderEdge {
  __typename: 'OrderEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of OrderEdge. */
  node: ShopifyStorefrontOrder
}

/** Represents the order's current financial status. */
export enum ShopifyStorefrontOrderFinancialStatus {
  /** Displayed as **Authorized**. */
  Authorized = 'AUTHORIZED',
  /** Displayed as **Paid**. */
  Paid = 'PAID',
  /** Displayed as **Partially paid**. */
  PartiallyPaid = 'PARTIALLY_PAID',
  /** Displayed as **Partially refunded**. */
  PartiallyRefunded = 'PARTIALLY_REFUNDED',
  /** Displayed as **Pending**. */
  Pending = 'PENDING',
  /** Displayed as **Refunded**. */
  Refunded = 'REFUNDED',
  /** Displayed as **Voided**. */
  Voided = 'VOIDED',
}

/** Represents the order's aggregated fulfillment status for display purposes. */
export enum ShopifyStorefrontOrderFulfillmentStatus {
  /** Displayed as **Fulfilled**. All of the items in the order have been fulfilled. */
  Fulfilled = 'FULFILLED',
  /** Displayed as **In progress**. Some of the items in the order have been fulfilled, or a request for fulfillment has been sent to the fulfillment service. */
  InProgress = 'IN_PROGRESS',
  /** Displayed as **On hold**. All of the unfulfilled items in this order are on hold. */
  OnHold = 'ON_HOLD',
  /** Displayed as **Open**. None of the items in the order have been fulfilled. Replaced by "UNFULFILLED" status. */
  Open = 'OPEN',
  /** Displayed as **Partially fulfilled**. Some of the items in the order have been fulfilled. */
  PartiallyFulfilled = 'PARTIALLY_FULFILLED',
  /** Displayed as **Pending fulfillment**. A request for fulfillment of some items awaits a response from the fulfillment service. Replaced by "IN_PROGRESS" status. */
  PendingFulfillment = 'PENDING_FULFILLMENT',
  /** Displayed as **Restocked**. All of the items in the order have been restocked. Replaced by "UNFULFILLED" status. */
  Restocked = 'RESTOCKED',
  /** Displayed as **Scheduled**. All of the unfulfilled items in this order are scheduled for fulfillment at later time. */
  Scheduled = 'SCHEDULED',
  /** Displayed as **Unfulfilled**. None of the items in the order have been fulfilled. */
  Unfulfilled = 'UNFULFILLED',
}

/** Represents a single line in an order. There is one line item for each distinct product variant. */
export interface ShopifyStorefrontOrderLineItem {
  __typename: 'OrderLineItem'
  /** The number of entries associated to the line item minus the items that have been removed. */
  currentQuantity: Scalars['Int']['output']
  /** List of custom attributes associated to the line item. */
  customAttributes: Array<ShopifyStorefrontAttribute>
  /** The discounts that have been allocated onto the order line item by discount applications. */
  discountAllocations: Array<ShopifyStorefrontDiscountAllocation>
  /** The total price of the line item, including discounts, and displayed in the presentment currency. */
  discountedTotalPrice: ShopifyStorefrontMoneyV2
  /** The total price of the line item, not including any discounts. The total price is calculated using the original unit price multiplied by the quantity, and it's displayed in the presentment currency. */
  originalTotalPrice: ShopifyStorefrontMoneyV2
  /** The number of products variants associated to the line item. */
  quantity: Scalars['Int']['output']
  /** The title of the product combined with title of the variant. */
  title: Scalars['String']['output']
  /** The product variant object associated to the line item. */
  variant?: Maybe<ShopifyStorefrontProductVariant>
}

/**
 * An auto-generated type for paginating through multiple OrderLineItems.
 *
 */
export interface ShopifyStorefrontOrderLineItemConnection {
  __typename: 'OrderLineItemConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontOrderLineItemEdge>
  /** A list of the nodes contained in OrderLineItemEdge. */
  nodes: Array<ShopifyStorefrontOrderLineItem>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one OrderLineItem and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontOrderLineItemEdge {
  __typename: 'OrderLineItemEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of OrderLineItemEdge. */
  node: ShopifyStorefrontOrderLineItem
}

/** The set of valid sort keys for the Order query. */
export enum ShopifyStorefrontOrderSortKeys {
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `processed_at` value. */
  ProcessedAt = 'PROCESSED_AT',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = 'RELEVANCE',
  /** Sort by the `total_price` value. */
  TotalPrice = 'TOTAL_PRICE',
}

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export interface ShopifyStorefrontPage
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode,
    ShopifyStorefrontOnlineStorePublishable,
    ShopifyStorefrontTrackable {
  __typename: 'Page'
  /** The description of the page, complete with HTML formatting. */
  body: Scalars['HTML']['output']
  /** Summary of the page body. */
  bodySummary: Scalars['String']['output']
  /** The timestamp of the page creation. */
  createdAt: Scalars['DateTime']['output']
  /** A human-friendly unique string for the page automatically generated from its title. */
  handle: Scalars['String']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']['output']>
  /** The page's SEO information. */
  seo?: Maybe<ShopifyStorefrontSeo>
  /** The title of the page. */
  title: Scalars['String']['output']
  /** A URL parameters to be added to a page URL when it is linked from a GraphQL result. This allows for tracking the origin of the traffic. */
  trackingParameters?: Maybe<Scalars['String']['output']>
  /** The timestamp of the latest page update. */
  updatedAt: Scalars['DateTime']['output']
}

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type ShopifyStorefrontPageMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/** Shopify merchants can create pages to hold static HTML content. Each Page object represents a custom page on the online store. */
export type ShopifyStorefrontPageMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/**
 * An auto-generated type for paginating through multiple Pages.
 *
 */
export interface ShopifyStorefrontPageConnection {
  __typename: 'PageConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontPageEdge>
  /** A list of the nodes contained in PageEdge. */
  nodes: Array<ShopifyStorefrontPage>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one Page and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontPageEdge {
  __typename: 'PageEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of PageEdge. */
  node: ShopifyStorefrontPage
}

/**
 * Returns information about pagination in a connection, in accordance with the
 * [Relay specification](https://relay.dev/graphql/connections.htm#sec-undefined.PageInfo).
 * For more information, please read our [GraphQL Pagination Usage Guide](https://shopify.dev/api/usage/pagination-graphql).
 *
 */
export interface ShopifyStorefrontPageInfo {
  __typename: 'PageInfo'
  /** The cursor corresponding to the last node in edges. */
  endCursor?: Maybe<Scalars['String']['output']>
  /** Whether there are more pages to fetch following the current page. */
  hasNextPage: Scalars['Boolean']['output']
  /** Whether there are any pages prior to the current page. */
  hasPreviousPage: Scalars['Boolean']['output']
  /** The cursor corresponding to the first node in edges. */
  startCursor?: Maybe<Scalars['String']['output']>
}

/** The set of valid sort keys for the Page query. */
export enum ShopifyStorefrontPageSortKeys {
  /** Sort by the `id` value. */
  Id = 'ID',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = 'RELEVANCE',
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
}

/** A payment applied to a checkout. */
export interface ShopifyStorefrontPayment extends ShopifyStorefrontNode {
  __typename: 'Payment'
  /** The amount of the payment. */
  amount: ShopifyStorefrontMoneyV2
  /**
   * The amount of the payment.
   * @deprecated Use `amount` instead.
   */
  amountV2: ShopifyStorefrontMoneyV2
  /** The billing address for the payment. */
  billingAddress?: Maybe<ShopifyStorefrontMailingAddress>
  /** The checkout to which the payment belongs. */
  checkout: ShopifyStorefrontCheckout
  /** The credit card used for the payment in the case of direct payments. */
  creditCard?: Maybe<ShopifyStorefrontCreditCard>
  /** A message describing a processing error during asynchronous processing. */
  errorMessage?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /**
   * A client-side generated token to identify a payment and perform idempotent operations.
   * For more information, refer to
   * [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests).
   *
   */
  idempotencyKey?: Maybe<Scalars['String']['output']>
  /** The URL where the customer needs to be redirected so they can complete the 3D Secure payment flow. */
  nextActionUrl?: Maybe<Scalars['URL']['output']>
  /** Whether the payment is still processing asynchronously. */
  ready: Scalars['Boolean']['output']
  /** A flag to indicate if the payment is to be done in test mode for gateways that support it. */
  test: Scalars['Boolean']['output']
  /** The actual transaction recorded by Shopify after having processed the payment with the gateway. */
  transaction?: Maybe<ShopifyStorefrontTransaction>
}

/** Settings related to payments. */
export interface ShopifyStorefrontPaymentSettings {
  __typename: 'PaymentSettings'
  /** List of the card brands which the shop accepts. */
  acceptedCardBrands: Array<ShopifyStorefrontCardBrand>
  /** The url pointing to the endpoint to vault credit cards. */
  cardVaultUrl: Scalars['URL']['output']
  /** The country where the shop is located. */
  countryCode: ShopifyStorefrontCountryCode
  /** The three-letter code for the shop's primary currency. */
  currencyCode: ShopifyStorefrontCurrencyCode
  /**
   * A list of enabled currencies (ISO 4217 format) that the shop accepts.
   * Merchants can enable currencies from their Shopify Payments settings in the Shopify admin.
   *
   */
  enabledPresentmentCurrencies: Array<ShopifyStorefrontCurrencyCode>
  /** The shop’s Shopify Payments account ID. */
  shopifyPaymentsAccountId?: Maybe<Scalars['String']['output']>
  /** List of the digital wallets which the shop supports. */
  supportedDigitalWallets: Array<ShopifyStorefrontDigitalWallet>
}

/** The valid values for the types of payment token. */
export enum ShopifyStorefrontPaymentTokenType {
  /** Apple Pay token type. */
  ApplePay = 'APPLE_PAY',
  /** Google Pay token type. */
  GooglePay = 'GOOGLE_PAY',
  /** Shopify Pay token type. */
  ShopifyPay = 'SHOPIFY_PAY',
  /** Stripe token type. */
  StripeVaultToken = 'STRIPE_VAULT_TOKEN',
  /** Vault payment token type. */
  Vault = 'VAULT',
}

/** Decides the distribution of results. */
export enum ShopifyStorefrontPredictiveSearchLimitScope {
  /** Return results up to limit across all types. */
  All = 'ALL',
  /** Return results up to limit per type. */
  Each = 'EACH',
}

/**
 * A predictive search result represents a list of products, collections, pages, articles, and query suggestions
 * that matches the predictive search query.
 *
 */
export interface ShopifyStorefrontPredictiveSearchResult {
  __typename: 'PredictiveSearchResult'
  /** The articles that match the search query. */
  articles: Array<ShopifyStorefrontArticle>
  /** The articles that match the search query. */
  collections: Array<ShopifyStorefrontCollection>
  /** The pages that match the search query. */
  pages: Array<ShopifyStorefrontPage>
  /** The products that match the search query. */
  products: Array<ShopifyStorefrontProduct>
  /** The query suggestions that are relevant to the search query. */
  queries: Array<ShopifyStorefrontSearchQuerySuggestion>
}

/** The types of search items to perform predictive search on. */
export enum ShopifyStorefrontPredictiveSearchType {
  /** Returns matching articles. */
  Article = 'ARTICLE',
  /** Returns matching collections. */
  Collection = 'COLLECTION',
  /** Returns matching pages. */
  Page = 'PAGE',
  /** Returns matching products. */
  Product = 'PRODUCT',
  /** Returns matching query strings. */
  Query = 'QUERY',
}

/**
 * The input fields for a filter used to view a subset of products in a collection matching a specific price range.
 *
 */
export type ShopifyStorefrontPriceRangeFilter = {
  /** The maximum price in the range. Empty indicates no max price. */
  max?: InputMaybe<Scalars['Float']['input']>
  /** The minimum price in the range. Defaults to zero. */
  min?: InputMaybe<Scalars['Float']['input']>
}

/** The value of the percentage pricing object. */
export interface ShopifyStorefrontPricingPercentageValue {
  __typename: 'PricingPercentageValue'
  /** The percentage value of the object. */
  percentage: Scalars['Float']['output']
}

/** The price value (fixed or percentage) for a discount application. */
export type ShopifyStorefrontPricingValue =
  | ShopifyStorefrontMoneyV2
  | ShopifyStorefrontPricingPercentageValue

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export interface ShopifyStorefrontProduct
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode,
    ShopifyStorefrontOnlineStorePublishable,
    ShopifyStorefrontTrackable {
  __typename: 'Product'
  /** Indicates if at least one product variant is available for sale. */
  availableForSale: Scalars['Boolean']['output']
  /** List of collections a product belongs to. */
  collections: ShopifyStorefrontCollectionConnection
  /** The compare at price of the product across all variants. */
  compareAtPriceRange: ShopifyStorefrontProductPriceRange
  /** The date and time when the product was created. */
  createdAt: Scalars['DateTime']['output']
  /** Stripped description of the product, single line with HTML tags removed. */
  description: Scalars['String']['output']
  /** The description of the product, complete with HTML formatting. */
  descriptionHtml: Scalars['HTML']['output']
  /**
   * The featured image for the product.
   *
   * This field is functionally equivalent to `images(first: 1)`.
   *
   */
  featuredImage?: Maybe<ShopifyStorefrontImage>
  /**
   * A human-friendly unique string for the Product automatically generated from its title.
   * They are used by the Liquid templating language to refer to objects.
   *
   */
  handle: Scalars['String']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** List of images associated with the product. */
  images: ShopifyStorefrontImageConnection
  /** Whether the product is a gift card. */
  isGiftCard: Scalars['Boolean']['output']
  /** The media associated with the product. */
  media: ShopifyStorefrontMediaConnection
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /** The URL used for viewing the resource on the shop's Online Store. Returns `null` if the resource is currently not published to the Online Store sales channel. */
  onlineStoreUrl?: Maybe<Scalars['URL']['output']>
  /** List of product options. */
  options: Array<ShopifyStorefrontProductOption>
  /** The price range. */
  priceRange: ShopifyStorefrontProductPriceRange
  /** A categorization that a product can be tagged with, commonly used for filtering and searching. */
  productType: Scalars['String']['output']
  /** The date and time when the product was published to the channel. */
  publishedAt: Scalars['DateTime']['output']
  /** Whether the product can only be purchased with a selling plan. */
  requiresSellingPlan: Scalars['Boolean']['output']
  /** A list of a product's available selling plan groups. A selling plan group represents a selling method. For example, 'Subscribe and save' is a selling method where customers pay for goods or services per delivery. A selling plan group contains individual selling plans. */
  sellingPlanGroups: ShopifyStorefrontSellingPlanGroupConnection
  /** The product's SEO information. */
  seo: ShopifyStorefrontSeo
  /**
   * A comma separated list of tags that have been added to the product.
   * Additional access scope required for private apps: unauthenticated_read_product_tags.
   *
   */
  tags: Array<Scalars['String']['output']>
  /** The product’s title. */
  title: Scalars['String']['output']
  /** The total quantity of inventory in stock for this Product. */
  totalInventory?: Maybe<Scalars['Int']['output']>
  /** A URL parameters to be added to a page URL when it is linked from a GraphQL result. This allows for tracking the origin of the traffic. */
  trackingParameters?: Maybe<Scalars['String']['output']>
  /**
   * The date and time when the product was last modified.
   * A product's `updatedAt` value can change for different reasons. For example, if an order
   * is placed for a product that has inventory tracking set up, then the inventory adjustment
   * is counted as an update.
   *
   */
  updatedAt: Scalars['DateTime']['output']
  /**
   * Find a product’s variant based on its selected options.
   * This is useful for converting a user’s selection of product options into a single matching variant.
   * If there is not a variant for the selected options, `null` will be returned.
   *
   */
  variantBySelectedOptions?: Maybe<ShopifyStorefrontProductVariant>
  /** List of the product’s variants. */
  variants: ShopifyStorefrontProductVariantConnection
  /** The product’s vendor name. */
  vendor: Scalars['String']['output']
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export type ShopifyStorefrontProductCollectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export type ShopifyStorefrontProductDescriptionArgs = {
  truncateAt?: InputMaybe<Scalars['Int']['input']>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export type ShopifyStorefrontProductImagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontProductImageSortKeys>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export type ShopifyStorefrontProductMediaArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontProductMediaSortKeys>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export type ShopifyStorefrontProductMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export type ShopifyStorefrontProductMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export type ShopifyStorefrontProductOptionsArgs = {
  first?: InputMaybe<Scalars['Int']['input']>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export type ShopifyStorefrontProductSellingPlanGroupsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export type ShopifyStorefrontProductVariantBySelectedOptionsArgs = {
  selectedOptions: Array<ShopifyStorefrontSelectedOptionInput>
}

/**
 * A product represents an individual item for sale in a Shopify store. Products are often physical, but they don't have to be.
 * For example, a digital download (such as a movie, music or ebook file) also
 * qualifies as a product, as do services (such as equipment rental, work for hire,
 * customization of another product or an extended warranty).
 *
 */
export type ShopifyStorefrontProductVariantsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontProductVariantSortKeys>
}

/** The set of valid sort keys for the ProductCollection query. */
export enum ShopifyStorefrontProductCollectionSortKeys {
  /** Sort by the `best-selling` value. */
  BestSelling = 'BEST_SELLING',
  /** Sort by the `collection-default` value. */
  CollectionDefault = 'COLLECTION_DEFAULT',
  /** Sort by the `created` value. */
  Created = 'CREATED',
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `manual` value. */
  Manual = 'MANUAL',
  /** Sort by the `price` value. */
  Price = 'PRICE',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = 'RELEVANCE',
  /** Sort by the `title` value. */
  Title = 'TITLE',
}

/**
 * An auto-generated type for paginating through multiple Products.
 *
 */
export interface ShopifyStorefrontProductConnection {
  __typename: 'ProductConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontProductEdge>
  /** A list of available filters. */
  filters: Array<ShopifyStorefrontFilter>
  /** A list of the nodes contained in ProductEdge. */
  nodes: Array<ShopifyStorefrontProduct>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one Product and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontProductEdge {
  __typename: 'ProductEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of ProductEdge. */
  node: ShopifyStorefrontProduct
}

/**
 * The input fields for a filter used to view a subset of products in a collection.
 * By default, the `available` and `price` filters are enabled. Filters are customized with the Shopify Search & Discovery app.
 * Learn more about [customizing storefront filtering](https://help.shopify.com/manual/online-store/themes/customizing-themes/storefront-filters).
 *
 */
export type ShopifyStorefrontProductFilter = {
  /** Filter on if the product is available for sale. */
  available?: InputMaybe<Scalars['Boolean']['input']>
  /** A range of prices to filter with-in. */
  price?: InputMaybe<ShopifyStorefrontPriceRangeFilter>
  /** A product metafield to filter on. */
  productMetafield?: InputMaybe<ShopifyStorefrontMetafieldFilter>
  /** The product type to filter on. */
  productType?: InputMaybe<Scalars['String']['input']>
  /** The product vendor to filter on. */
  productVendor?: InputMaybe<Scalars['String']['input']>
  /** A product tag to filter on. */
  tag?: InputMaybe<Scalars['String']['input']>
  /** A variant metafield to filter on. */
  variantMetafield?: InputMaybe<ShopifyStorefrontMetafieldFilter>
  /** A variant option to filter on. */
  variantOption?: InputMaybe<ShopifyStorefrontVariantOptionFilter>
}

/** The set of valid sort keys for the ProductImage query. */
export enum ShopifyStorefrontProductImageSortKeys {
  /** Sort by the `created_at` value. */
  CreatedAt = 'CREATED_AT',
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `position` value. */
  Position = 'POSITION',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = 'RELEVANCE',
}

/** The set of valid sort keys for the ProductMedia query. */
export enum ShopifyStorefrontProductMediaSortKeys {
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `position` value. */
  Position = 'POSITION',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = 'RELEVANCE',
}

/**
 * Product property names like "Size", "Color", and "Material" that the customers can select.
 * Variants are selected based on permutations of these options.
 * 255 characters limit each.
 *
 */
export interface ShopifyStorefrontProductOption extends ShopifyStorefrontNode {
  __typename: 'ProductOption'
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The product option’s name. */
  name: Scalars['String']['output']
  /**
   * The corresponding value to the product option name.
   * @deprecated Use `optionValues` instead.
   */
  values: Array<Scalars['String']['output']>
}

/** The price range of the product. */
export interface ShopifyStorefrontProductPriceRange {
  __typename: 'ProductPriceRange'
  /** The highest variant's price. */
  maxVariantPrice: ShopifyStorefrontMoneyV2
  /** The lowest variant's price. */
  minVariantPrice: ShopifyStorefrontMoneyV2
}

/**
 * The recommendation intent that is used to generate product recommendations.
 * You can use intent to generate product recommendations according to different strategies.
 *
 */
export enum ShopifyStorefrontProductRecommendationIntent {
  /** Offer customers products that are complementary to a product for which recommendations are to be fetched. An example is add-on products that display in a Pair it with section. */
  Complementary = 'COMPLEMENTARY',
  /** Offer customers a mix of products that are similar or complementary to a product for which recommendations are to be fetched. An example is substitutable products that display in a You may also like section. */
  Related = 'RELATED',
}

/** The set of valid sort keys for the Product query. */
export enum ShopifyStorefrontProductSortKeys {
  /** Sort by the `best_selling` value. */
  BestSelling = 'BEST_SELLING',
  /** Sort by the `created_at` value. */
  CreatedAt = 'CREATED_AT',
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `price` value. */
  Price = 'PRICE',
  /** Sort by the `product_type` value. */
  ProductType = 'PRODUCT_TYPE',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = 'RELEVANCE',
  /** Sort by the `title` value. */
  Title = 'TITLE',
  /** Sort by the `updated_at` value. */
  UpdatedAt = 'UPDATED_AT',
  /** Sort by the `vendor` value. */
  Vendor = 'VENDOR',
}

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export interface ShopifyStorefrontProductVariant
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode {
  __typename: 'ProductVariant'
  /** Indicates if the product variant is available for sale. */
  availableForSale: Scalars['Boolean']['output']
  /** The barcode (for example, ISBN, UPC, or GTIN) associated with the variant. */
  barcode?: Maybe<Scalars['String']['output']>
  /** The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPrice` is higher than `price`. */
  compareAtPrice?: Maybe<ShopifyStorefrontMoneyV2>
  /**
   * The compare at price of the variant. This can be used to mark a variant as on sale, when `compareAtPriceV2` is higher than `priceV2`.
   * @deprecated Use `compareAtPrice` instead.
   */
  compareAtPriceV2?: Maybe<ShopifyStorefrontMoneyV2>
  /** Whether a product is out of stock but still available for purchase (used for backorders). */
  currentlyNotInStock: Scalars['Boolean']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** Image associated with the product variant. This field falls back to the product image if no image is available. */
  image?: Maybe<ShopifyStorefrontImage>
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /** The product variant’s price. */
  price: ShopifyStorefrontMoneyV2
  /**
   * The product variant’s price.
   * @deprecated Use `price` instead.
   */
  priceV2: ShopifyStorefrontMoneyV2
  /** The product object that the product variant belongs to. */
  product: ShopifyStorefrontProduct
  /** The total sellable quantity of the variant for online sales channels. */
  quantityAvailable?: Maybe<Scalars['Int']['output']>
  /** Whether a customer needs to provide a shipping address when placing an order for the product variant. */
  requiresShipping: Scalars['Boolean']['output']
  /** List of product options applied to the variant. */
  selectedOptions: Array<ShopifyStorefrontSelectedOption>
  /** Represents an association between a variant and a selling plan. Selling plan allocations describe which selling plans are available for each variant, and what their impact is on pricing. */
  sellingPlanAllocations: ShopifyStorefrontSellingPlanAllocationConnection
  /** The SKU (stock keeping unit) associated with the variant. */
  sku?: Maybe<Scalars['String']['output']>
  /** The in-store pickup availability of this variant by location. */
  storeAvailability: ShopifyStorefrontStoreAvailabilityConnection
  /** The product variant’s title. */
  title: Scalars['String']['output']
  /** The unit price value for the variant based on the variant's measurement. */
  unitPrice?: Maybe<ShopifyStorefrontMoneyV2>
  /** The unit price measurement for the variant. */
  unitPriceMeasurement?: Maybe<ShopifyStorefrontUnitPriceMeasurement>
  /** The weight of the product variant in the unit system specified with `weight_unit`. */
  weight?: Maybe<Scalars['Float']['output']>
  /** Unit of measurement for weight. */
  weightUnit: ShopifyStorefrontWeightUnit
}

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ShopifyStorefrontProductVariantMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ShopifyStorefrontProductVariantMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ShopifyStorefrontProductVariantSellingPlanAllocationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/**
 * A product variant represents a different version of a product, such as differing sizes or differing colors.
 *
 */
export type ShopifyStorefrontProductVariantStoreAvailabilityArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  near?: InputMaybe<ShopifyStorefrontGeoCoordinateInput>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/**
 * An auto-generated type for paginating through multiple ProductVariants.
 *
 */
export interface ShopifyStorefrontProductVariantConnection {
  __typename: 'ProductVariantConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontProductVariantEdge>
  /** A list of the nodes contained in ProductVariantEdge. */
  nodes: Array<ShopifyStorefrontProductVariant>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one ProductVariant and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontProductVariantEdge {
  __typename: 'ProductVariantEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of ProductVariantEdge. */
  node: ShopifyStorefrontProductVariant
}

/** The set of valid sort keys for the ProductVariant query. */
export enum ShopifyStorefrontProductVariantSortKeys {
  /** Sort by the `id` value. */
  Id = 'ID',
  /** Sort by the `position` value. */
  Position = 'POSITION',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  Relevance = 'RELEVANCE',
  /** Sort by the `sku` value. */
  Sku = 'SKU',
  /** Sort by the `title` value. */
  Title = 'TITLE',
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export interface ShopifyStorefrontQueryRoot {
  __typename: 'QueryRoot'
  /** Fetch a specific Article by its ID. */
  article?: Maybe<ShopifyStorefrontArticle>
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
   *
   */
  cart?: Maybe<ShopifyStorefrontCart>
  /**
   * A poll for the status of the cart checkout completion and order creation.
   *
   */
  cartCompletionAttempt?: Maybe<ShopifyStorefrontCartCompletionAttemptResult>
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
   *
   */
  customer?: Maybe<ShopifyStorefrontCustomer>
  /** Returns the localized experiences configured for the shop. */
  localization: ShopifyStorefrontLocalization
  /**
   * List of the shop's locations that support in-store pickup.
   *
   * When sorting by distance, you must specify a location via the `near` argument.
   *
   *
   */
  locations: ShopifyStorefrontLocationConnection
  /** Retrieve a [navigation menu](https://help.shopify.com/manual/online-store/menus-and-links) by its handle. */
  menu?: Maybe<ShopifyStorefrontMenu>
  /** Fetch a specific Metaobject by one of its unique identifiers. */
  metaobject?: Maybe<ShopifyStorefrontMetaobject>
  /** All active metaobjects for the shop. */
  metaobjects: ShopifyStorefrontMetaobjectConnection
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
  /** List of the predictive search results. */
  predictiveSearch?: Maybe<ShopifyStorefrontPredictiveSearchResult>
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
   *
   */
  productRecommendations?: Maybe<Array<ShopifyStorefrontProduct>>
  /**
   * Tags added to products.
   * Additional access scope required: unauthenticated_read_product_tags.
   *
   */
  productTags: ShopifyStorefrontStringConnection
  /** List of product types for the shop's products that are published to your app. */
  productTypes: ShopifyStorefrontStringConnection
  /** List of the shop’s products. For storefront search, use [`search` query](https://shopify.dev/docs/api/storefront/latest/queries/search). */
  products: ShopifyStorefrontProductConnection
  /** The list of public Storefront API versions, including supported, release candidate and unstable versions. */
  publicApiVersions: Array<ShopifyStorefrontApiVersion>
  /** List of the search results. */
  search: ShopifyStorefrontSearchResultItemConnection
  /** The shop associated with the storefront access token. */
  shop: ShopifyStorefrontShop
  /** A list of redirects for a shop. */
  urlRedirects: ShopifyStorefrontUrlRedirectConnection
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootArticleArgs = {
  id: Scalars['ID']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootArticlesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  query?: InputMaybe<Scalars['String']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontArticleSortKeys>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootBlogArgs = {
  handle?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootBlogByHandleArgs = {
  handle: Scalars['String']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootBlogsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  query?: InputMaybe<Scalars['String']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontBlogSortKeys>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCartArgs = {
  id: Scalars['ID']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCartCompletionAttemptArgs = {
  attemptId: Scalars['String']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCollectionArgs = {
  handle?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCollectionByHandleArgs = {
  handle: Scalars['String']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCollectionsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  query?: InputMaybe<Scalars['String']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontCollectionSortKeys>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootCustomerArgs = {
  customerAccessToken: Scalars['String']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootLocationsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  near?: InputMaybe<ShopifyStorefrontGeoCoordinateInput>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontLocationSortKeys>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootMenuArgs = {
  handle: Scalars['String']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootMetaobjectArgs = {
  handle?: InputMaybe<ShopifyStorefrontMetaobjectHandleInput>
  id?: InputMaybe<Scalars['ID']['input']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootMetaobjectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<Scalars['String']['input']>
  type: Scalars['String']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootNodeArgs = {
  id: Scalars['ID']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootNodesArgs = {
  ids: Array<Scalars['ID']['input']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootPageArgs = {
  handle?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootPageByHandleArgs = {
  handle: Scalars['String']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootPagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  query?: InputMaybe<Scalars['String']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontPageSortKeys>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootPredictiveSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  limitScope?: InputMaybe<ShopifyStorefrontPredictiveSearchLimitScope>
  query: Scalars['String']['input']
  searchableFields?: InputMaybe<Array<ShopifyStorefrontSearchableField>>
  types?: InputMaybe<Array<ShopifyStorefrontPredictiveSearchType>>
  unavailableProducts?: InputMaybe<ShopifyStorefrontSearchUnavailableProductsType>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductArgs = {
  handle?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductByHandleArgs = {
  handle: Scalars['String']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductRecommendationsArgs = {
  intent?: InputMaybe<ShopifyStorefrontProductRecommendationIntent>
  productId: Scalars['ID']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductTagsArgs = {
  first: Scalars['Int']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductTypesArgs = {
  first: Scalars['Int']['input']
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootProductsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  query?: InputMaybe<Scalars['String']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontProductSortKeys>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootSearchArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  prefix?: InputMaybe<ShopifyStorefrontSearchPrefixQueryType>
  productFilters?: InputMaybe<Array<ShopifyStorefrontProductFilter>>
  query: Scalars['String']['input']
  reverse?: InputMaybe<Scalars['Boolean']['input']>
  sortKey?: InputMaybe<ShopifyStorefrontSearchSortKeys>
  types?: InputMaybe<Array<ShopifyStorefrontSearchType>>
  unavailableProducts?: InputMaybe<ShopifyStorefrontSearchUnavailableProductsType>
}

/** The schema’s entry-point for queries. This acts as the public, top-level API from which all queries must start. */
export type ShopifyStorefrontQueryRootUrlRedirectsArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  query?: InputMaybe<Scalars['String']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/** SEO information. */
export interface ShopifyStorefrontSeo {
  __typename: 'SEO'
  /** The meta description. */
  description?: Maybe<Scalars['String']['output']>
  /** The SEO title. */
  title?: Maybe<Scalars['String']['output']>
}

/**
 * Script discount applications capture the intentions of a discount that
 * was created by a Shopify Script.
 *
 */
export interface ShopifyStorefrontScriptDiscountApplication
  extends ShopifyStorefrontDiscountApplication {
  __typename: 'ScriptDiscountApplication'
  /** The method by which the discount's value is allocated to its entitled items. */
  allocationMethod: ShopifyStorefrontDiscountApplicationAllocationMethod
  /** Which lines of targetType that the discount is allocated over. */
  targetSelection: ShopifyStorefrontDiscountApplicationTargetSelection
  /** The type of line that the discount is applicable towards. */
  targetType: ShopifyStorefrontDiscountApplicationTargetType
  /** The title of the application as defined by the Script. */
  title: Scalars['String']['output']
  /** The value of the discount application. */
  value: ShopifyStorefrontPricingValue
}

/** Specifies whether to perform a partial word match on the last search term. */
export enum ShopifyStorefrontSearchPrefixQueryType {
  /** Perform a partial word match on the last search term. */
  Last = 'LAST',
  /** Don't perform a partial word match on the last search term. */
  None = 'NONE',
}

/** A search query suggestion. */
export interface ShopifyStorefrontSearchQuerySuggestion
  extends ShopifyStorefrontTrackable {
  __typename: 'SearchQuerySuggestion'
  /** The text of the search query suggestion with highlighted HTML tags. */
  styledText: Scalars['String']['output']
  /** The text of the search query suggestion. */
  text: Scalars['String']['output']
  /** A URL parameters to be added to a page URL when it is linked from a GraphQL result. This allows for tracking the origin of the traffic. */
  trackingParameters?: Maybe<Scalars['String']['output']>
}

/**
 * A search result that matches the search query.
 *
 */
export type ShopifyStorefrontSearchResultItem =
  | ShopifyStorefrontArticle
  | ShopifyStorefrontPage
  | ShopifyStorefrontProduct

/**
 * An auto-generated type for paginating through multiple SearchResultItems.
 *
 */
export interface ShopifyStorefrontSearchResultItemConnection {
  __typename: 'SearchResultItemConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontSearchResultItemEdge>
  /** A list of the nodes contained in SearchResultItemEdge. */
  nodes: Array<ShopifyStorefrontSearchResultItem>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
  /** A list of available filters. */
  productFilters: Array<ShopifyStorefrontFilter>
  /** The total number of results. */
  totalCount: Scalars['Int']['output']
}

/**
 * An auto-generated type which holds one SearchResultItem and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontSearchResultItemEdge {
  __typename: 'SearchResultItemEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of SearchResultItemEdge. */
  node: ShopifyStorefrontSearchResultItem
}

/** The set of valid sort keys for the search query. */
export enum ShopifyStorefrontSearchSortKeys {
  /** Sort by the `price` value. */
  Price = 'PRICE',
  /** Sort by relevance to the search terms. */
  Relevance = 'RELEVANCE',
}

/** The types of search items to perform search within. */
export enum ShopifyStorefrontSearchType {
  /** Returns matching articles. */
  Article = 'ARTICLE',
  /** Returns matching pages. */
  Page = 'PAGE',
  /** Returns matching products. */
  Product = 'PRODUCT',
}

/** Specifies whether to display results for unavailable products. */
export enum ShopifyStorefrontSearchUnavailableProductsType {
  /** Exclude unavailable products. */
  Hide = 'HIDE',
  /** Show unavailable products after all other matching results. This is the default. */
  Last = 'LAST',
  /** Show unavailable products in the order that they're found. */
  Show = 'SHOW',
}

/** Specifies the list of resource fields to search. */
export enum ShopifyStorefrontSearchableField {
  /** Author of the page or article. */
  Author = 'AUTHOR',
  /** Body of the page or article or product description or collection description. */
  Body = 'BODY',
  /** Product type. */
  ProductType = 'PRODUCT_TYPE',
  /** Tag associated with the product or article. */
  Tag = 'TAG',
  /** Title of the page or article or product title or collection title. */
  Title = 'TITLE',
  /** Variant barcode. */
  VariantsBarcode = 'VARIANTS_BARCODE',
  /** Variant SKU. */
  VariantsSku = 'VARIANTS_SKU',
  /** Variant title. */
  VariantsTitle = 'VARIANTS_TITLE',
  /** Product vendor. */
  Vendor = 'VENDOR',
}

/**
 * Properties used by customers to select a product variant.
 * Products can have multiple options, like different sizes or colors.
 *
 */
export interface ShopifyStorefrontSelectedOption {
  __typename: 'SelectedOption'
  /** The product option’s name. */
  name: Scalars['String']['output']
  /** The product option’s value. */
  value: Scalars['String']['output']
}

/** The input fields required for a selected option. */
export type ShopifyStorefrontSelectedOptionInput = {
  /** The product option’s name. */
  name: Scalars['String']['input']
  /** The product option’s value. */
  value: Scalars['String']['input']
}

/** Represents how products and variants can be sold and purchased. */
export interface ShopifyStorefrontSellingPlan {
  __typename: 'SellingPlan'
  /** The initial payment due for the purchase. */
  checkoutCharge: ShopifyStorefrontSellingPlanCheckoutCharge
  /** The description of the selling plan. */
  description?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The name of the selling plan. For example, '6 weeks of prepaid granola, delivered weekly'. */
  name: Scalars['String']['output']
  /** The selling plan options available in the drop-down list in the storefront. For example, 'Delivery every week' or 'Delivery every 2 weeks' specifies the delivery frequency options for the product. Individual selling plans contribute their options to the associated selling plan group. For example, a selling plan group might have an option called `option1: Delivery every`. One selling plan in that group could contribute `option1: 2 weeks` with the pricing for that option, and another selling plan could contribute `option1: 4 weeks`, with different pricing. */
  options: Array<ShopifyStorefrontSellingPlanOption>
  /** The price adjustments that a selling plan makes when a variant is purchased with a selling plan. */
  priceAdjustments: Array<ShopifyStorefrontSellingPlanPriceAdjustment>
  /** Whether purchasing the selling plan will result in multiple deliveries. */
  recurringDeliveries: Scalars['Boolean']['output']
}

/** Represents an association between a variant and a selling plan. Selling plan allocations describe the options offered for each variant, and the price of the variant when purchased with a selling plan. */
export interface ShopifyStorefrontSellingPlanAllocation {
  __typename: 'SellingPlanAllocation'
  /** The checkout charge amount due for the purchase. */
  checkoutChargeAmount: ShopifyStorefrontMoneyV2
  /** A list of price adjustments, with a maximum of two. When there are two, the first price adjustment goes into effect at the time of purchase, while the second one starts after a certain number of orders. A price adjustment represents how a selling plan affects pricing when a variant is purchased with a selling plan. Prices display in the customer's currency if the shop is configured for it. */
  priceAdjustments: Array<ShopifyStorefrontSellingPlanAllocationPriceAdjustment>
  /** The remaining balance charge amount due for the purchase. */
  remainingBalanceChargeAmount: ShopifyStorefrontMoneyV2
  /** A representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'. */
  sellingPlan: ShopifyStorefrontSellingPlan
}

/**
 * An auto-generated type for paginating through multiple SellingPlanAllocations.
 *
 */
export interface ShopifyStorefrontSellingPlanAllocationConnection {
  __typename: 'SellingPlanAllocationConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontSellingPlanAllocationEdge>
  /** A list of the nodes contained in SellingPlanAllocationEdge. */
  nodes: Array<ShopifyStorefrontSellingPlanAllocation>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one SellingPlanAllocation and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontSellingPlanAllocationEdge {
  __typename: 'SellingPlanAllocationEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
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

/** The initial payment due for the purchase. */
export interface ShopifyStorefrontSellingPlanCheckoutCharge {
  __typename: 'SellingPlanCheckoutCharge'
  /** The charge type for the checkout charge. */
  type: ShopifyStorefrontSellingPlanCheckoutChargeType
  /** The charge value for the checkout charge. */
  value: ShopifyStorefrontSellingPlanCheckoutChargeValue
}

/** The percentage value of the price used for checkout charge. */
export interface ShopifyStorefrontSellingPlanCheckoutChargePercentageValue {
  __typename: 'SellingPlanCheckoutChargePercentageValue'
  /** The percentage value of the price used for checkout charge. */
  percentage: Scalars['Float']['output']
}

/** The checkout charge when the full amount isn't charged at checkout. */
export enum ShopifyStorefrontSellingPlanCheckoutChargeType {
  /** The checkout charge is a percentage of the product or variant price. */
  Percentage = 'PERCENTAGE',
  /** The checkout charge is a fixed price amount. */
  Price = 'PRICE',
}

/** The portion of the price to be charged at checkout. */
export type ShopifyStorefrontSellingPlanCheckoutChargeValue =
  | ShopifyStorefrontMoneyV2
  | ShopifyStorefrontSellingPlanCheckoutChargePercentageValue

/**
 * An auto-generated type for paginating through multiple SellingPlans.
 *
 */
export interface ShopifyStorefrontSellingPlanConnection {
  __typename: 'SellingPlanConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontSellingPlanEdge>
  /** A list of the nodes contained in SellingPlanEdge. */
  nodes: Array<ShopifyStorefrontSellingPlan>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one SellingPlan and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontSellingPlanEdge {
  __typename: 'SellingPlanEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
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
  appName?: Maybe<Scalars['String']['output']>
  /** The name of the selling plan group. */
  name: Scalars['String']['output']
  /** Represents the selling plan options available in the drop-down list in the storefront. For example, 'Delivery every week' or 'Delivery every 2 weeks' specifies the delivery frequency options for the product. */
  options: Array<ShopifyStorefrontSellingPlanGroupOption>
  /** A list of selling plans in a selling plan group. A selling plan is a representation of how products and variants can be sold and purchased. For example, an individual selling plan could be '6 weeks of prepaid granola, delivered weekly'. */
  sellingPlans: ShopifyStorefrontSellingPlanConnection
}

/** Represents a selling method. For example, 'Subscribe and save' is a selling method where customers pay for goods or services per delivery. A selling plan group contains individual selling plans. */
export type ShopifyStorefrontSellingPlanGroupSellingPlansArgs = {
  after?: InputMaybe<Scalars['String']['input']>
  before?: InputMaybe<Scalars['String']['input']>
  first?: InputMaybe<Scalars['Int']['input']>
  last?: InputMaybe<Scalars['Int']['input']>
  reverse?: InputMaybe<Scalars['Boolean']['input']>
}

/**
 * An auto-generated type for paginating through multiple SellingPlanGroups.
 *
 */
export interface ShopifyStorefrontSellingPlanGroupConnection {
  __typename: 'SellingPlanGroupConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontSellingPlanGroupEdge>
  /** A list of the nodes contained in SellingPlanGroupEdge. */
  nodes: Array<ShopifyStorefrontSellingPlanGroup>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one SellingPlanGroup and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontSellingPlanGroupEdge {
  __typename: 'SellingPlanGroupEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
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
  name: Scalars['String']['output']
  /** The values for the options specified by the selling plans in the selling plan group. For example, '1 week', '2 weeks', '3 weeks'. */
  values: Array<Scalars['String']['output']>
}

/** An option provided by a Selling Plan. */
export interface ShopifyStorefrontSellingPlanOption {
  __typename: 'SellingPlanOption'
  /** The name of the option (ie "Delivery every"). */
  name?: Maybe<Scalars['String']['output']>
  /** The value of the option (ie "Month"). */
  value?: Maybe<Scalars['String']['output']>
}

/** A percentage amount that's deducted from the original variant price. For example, 10% off. */
export interface ShopifyStorefrontSellingPlanPercentagePriceAdjustment {
  __typename: 'SellingPlanPercentagePriceAdjustment'
  /** The percentage value of the price adjustment. */
  adjustmentPercentage: Scalars['Int']['output']
}

/** Represents by how much the price of a variant associated with a selling plan is adjusted. Each variant can have up to two price adjustments. If a variant has multiple price adjustments, then the first price adjustment applies when the variant is initially purchased. The second price adjustment applies after a certain number of orders (specified by the `orderCount` field) are made. If a selling plan doesn't have any price adjustments, then the unadjusted price of the variant is the effective price. */
export interface ShopifyStorefrontSellingPlanPriceAdjustment {
  __typename: 'SellingPlanPriceAdjustment'
  /** The type of price adjustment. An adjustment value can have one of three types: percentage, amount off, or a new price. */
  adjustmentValue: ShopifyStorefrontSellingPlanPriceAdjustmentValue
  /** The number of orders that the price adjustment applies to. If the price adjustment always applies, then this field is `null`. */
  orderCount?: Maybe<Scalars['Int']['output']>
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
  handle: Scalars['String']['output']
  /** Price of this shipping rate. */
  price: ShopifyStorefrontMoneyV2
  /**
   * Price of this shipping rate.
   * @deprecated Use `price` instead.
   */
  priceV2: ShopifyStorefrontMoneyV2
  /** Title of this shipping rate. */
  title: Scalars['String']['output']
}

/** Shop represents a collection of the general settings and information about the shop. */
export interface ShopifyStorefrontShop
  extends ShopifyStorefrontHasMetafields,
    ShopifyStorefrontNode {
  __typename: 'Shop'
  /** The shop's branding configuration. */
  brand?: Maybe<ShopifyStorefrontBrand>
  /** A description of the shop. */
  description?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** Returns a metafield found by namespace and key. */
  metafield?: Maybe<ShopifyStorefrontMetafield>
  /** The metafields associated with the resource matching the supplied list of namespaces and keys. */
  metafields: Array<Maybe<ShopifyStorefrontMetafield>>
  /** A string representing the way currency is formatted when the currency isn’t specified. */
  moneyFormat: Scalars['String']['output']
  /** The shop’s name. */
  name: Scalars['String']['output']
  /** Settings related to payments. */
  paymentSettings: ShopifyStorefrontPaymentSettings
  /** The primary domain of the shop’s Online Store. */
  primaryDomain: ShopifyStorefrontDomain
  /** The shop’s privacy policy. */
  privacyPolicy?: Maybe<ShopifyStorefrontShopPolicy>
  /** The shop’s refund policy. */
  refundPolicy?: Maybe<ShopifyStorefrontShopPolicy>
  /** The shop’s shipping policy. */
  shippingPolicy?: Maybe<ShopifyStorefrontShopPolicy>
  /** Countries that the shop ships to. */
  shipsToCountries: Array<ShopifyStorefrontCountryCode>
  /** The shop’s subscription policy. */
  subscriptionPolicy?: Maybe<ShopifyStorefrontShopPolicyWithDefault>
  /** The shop’s terms of service. */
  termsOfService?: Maybe<ShopifyStorefrontShopPolicy>
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopMetafieldArgs = {
  key: Scalars['String']['input']
  namespace: Scalars['String']['input']
}

/** Shop represents a collection of the general settings and information about the shop. */
export type ShopifyStorefrontShopMetafieldsArgs = {
  identifiers: Array<ShopifyStorefrontHasMetafieldsIdentifier>
}

/**
 * The input fields for submitting Shop Pay payment method information for checkout.
 *
 */
export type ShopifyStorefrontShopPayWalletContentInput = {
  /** The customer's billing address. */
  billingAddress: ShopifyStorefrontMailingAddressInput
  /** Session token for transaction. */
  sessionToken: Scalars['String']['input']
}

/** Policy that a merchant has configured for their store, such as their refund or privacy policy. */
export interface ShopifyStorefrontShopPolicy extends ShopifyStorefrontNode {
  __typename: 'ShopPolicy'
  /** Policy text, maximum size of 64kb. */
  body: Scalars['String']['output']
  /** Policy’s handle. */
  handle: Scalars['String']['output']
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** Policy’s title. */
  title: Scalars['String']['output']
  /** Public URL to the policy. */
  url: Scalars['URL']['output']
}

/**
 * A policy for the store that comes with a default value, such as a subscription policy.
 * If the merchant hasn't configured a policy for their store, then the policy will return the default value.
 * Otherwise, the policy will return the merchant-configured value.
 *
 */
export interface ShopifyStorefrontShopPolicyWithDefault {
  __typename: 'ShopPolicyWithDefault'
  /** The text of the policy. Maximum size: 64KB. */
  body: Scalars['String']['output']
  /** The handle of the policy. */
  handle: Scalars['String']['output']
  /** The unique ID of the policy. A default policy doesn't have an ID. */
  id?: Maybe<Scalars['ID']['output']>
  /** The title of the policy. */
  title: Scalars['String']['output']
  /** Public URL to the policy. */
  url: Scalars['URL']['output']
}

/**
 * The availability of a product variant at a particular location.
 * Local pick-up must be enabled in the  store's shipping settings, otherwise this will return an empty result.
 *
 */
export interface ShopifyStorefrontStoreAvailability {
  __typename: 'StoreAvailability'
  /** Whether the product variant is in-stock at this location. */
  available: Scalars['Boolean']['output']
  /** The location where this product variant is stocked at. */
  location: ShopifyStorefrontLocation
  /** Returns the estimated amount of time it takes for pickup to be ready (Example: Usually ready in 24 hours). */
  pickUpTime: Scalars['String']['output']
  /** The quantity of the product variant in-stock at this location. */
  quantityAvailable: Scalars['Int']['output']
}

/**
 * An auto-generated type for paginating through multiple StoreAvailabilities.
 *
 */
export interface ShopifyStorefrontStoreAvailabilityConnection {
  __typename: 'StoreAvailabilityConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontStoreAvailabilityEdge>
  /** A list of the nodes contained in StoreAvailabilityEdge. */
  nodes: Array<ShopifyStorefrontStoreAvailability>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one StoreAvailability and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontStoreAvailabilityEdge {
  __typename: 'StoreAvailabilityEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of StoreAvailabilityEdge. */
  node: ShopifyStorefrontStoreAvailability
}

/**
 * An auto-generated type for paginating through a list of Strings.
 *
 */
export interface ShopifyStorefrontStringConnection {
  __typename: 'StringConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontStringEdge>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one String and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontStringEdge {
  __typename: 'StringEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of StringEdge. */
  node: Scalars['String']['output']
}

/** An error that occurred during cart submit for completion. */
export interface ShopifyStorefrontSubmissionError {
  __typename: 'SubmissionError'
  /** The error code. */
  code: ShopifyStorefrontSubmissionErrorCode
  /** The error message. */
  message?: Maybe<Scalars['String']['output']>
}

/** The code of the error that occurred during cart submit for completion. */
export enum ShopifyStorefrontSubmissionErrorCode {
  BuyerIdentityEmailIsInvalid = 'BUYER_IDENTITY_EMAIL_IS_INVALID',
  BuyerIdentityEmailRequired = 'BUYER_IDENTITY_EMAIL_REQUIRED',
  BuyerIdentityPhoneIsInvalid = 'BUYER_IDENTITY_PHONE_IS_INVALID',
  DeliveryAddress1Invalid = 'DELIVERY_ADDRESS1_INVALID',
  DeliveryAddress1Required = 'DELIVERY_ADDRESS1_REQUIRED',
  DeliveryAddress1TooLong = 'DELIVERY_ADDRESS1_TOO_LONG',
  DeliveryAddress2Invalid = 'DELIVERY_ADDRESS2_INVALID',
  DeliveryAddress2Required = 'DELIVERY_ADDRESS2_REQUIRED',
  DeliveryAddress2TooLong = 'DELIVERY_ADDRESS2_TOO_LONG',
  DeliveryAddressRequired = 'DELIVERY_ADDRESS_REQUIRED',
  DeliveryCityInvalid = 'DELIVERY_CITY_INVALID',
  DeliveryCityRequired = 'DELIVERY_CITY_REQUIRED',
  DeliveryCityTooLong = 'DELIVERY_CITY_TOO_LONG',
  DeliveryCompanyInvalid = 'DELIVERY_COMPANY_INVALID',
  DeliveryCompanyRequired = 'DELIVERY_COMPANY_REQUIRED',
  DeliveryCompanyTooLong = 'DELIVERY_COMPANY_TOO_LONG',
  DeliveryCountryRequired = 'DELIVERY_COUNTRY_REQUIRED',
  DeliveryFirstNameInvalid = 'DELIVERY_FIRST_NAME_INVALID',
  DeliveryFirstNameRequired = 'DELIVERY_FIRST_NAME_REQUIRED',
  DeliveryFirstNameTooLong = 'DELIVERY_FIRST_NAME_TOO_LONG',
  DeliveryInvalidPostalCodeForCountry = 'DELIVERY_INVALID_POSTAL_CODE_FOR_COUNTRY',
  DeliveryInvalidPostalCodeForZone = 'DELIVERY_INVALID_POSTAL_CODE_FOR_ZONE',
  DeliveryLastNameInvalid = 'DELIVERY_LAST_NAME_INVALID',
  DeliveryLastNameRequired = 'DELIVERY_LAST_NAME_REQUIRED',
  DeliveryLastNameTooLong = 'DELIVERY_LAST_NAME_TOO_LONG',
  DeliveryNoDeliveryAvailable = 'DELIVERY_NO_DELIVERY_AVAILABLE',
  DeliveryNoDeliveryAvailableForMerchandiseLine = 'DELIVERY_NO_DELIVERY_AVAILABLE_FOR_MERCHANDISE_LINE',
  DeliveryOptionsPhoneNumberInvalid = 'DELIVERY_OPTIONS_PHONE_NUMBER_INVALID',
  DeliveryOptionsPhoneNumberRequired = 'DELIVERY_OPTIONS_PHONE_NUMBER_REQUIRED',
  DeliveryPhoneNumberInvalid = 'DELIVERY_PHONE_NUMBER_INVALID',
  DeliveryPhoneNumberRequired = 'DELIVERY_PHONE_NUMBER_REQUIRED',
  DeliveryPostalCodeInvalid = 'DELIVERY_POSTAL_CODE_INVALID',
  DeliveryPostalCodeRequired = 'DELIVERY_POSTAL_CODE_REQUIRED',
  DeliveryZoneNotFound = 'DELIVERY_ZONE_NOT_FOUND',
  DeliveryZoneRequiredForCountry = 'DELIVERY_ZONE_REQUIRED_FOR_COUNTRY',
  Error = 'ERROR',
  MerchandiseLineLimitReached = 'MERCHANDISE_LINE_LIMIT_REACHED',
  MerchandiseNotApplicable = 'MERCHANDISE_NOT_APPLICABLE',
  MerchandiseNotEnoughStockAvailable = 'MERCHANDISE_NOT_ENOUGH_STOCK_AVAILABLE',
  MerchandiseOutOfStock = 'MERCHANDISE_OUT_OF_STOCK',
  MerchandiseProductNotPublished = 'MERCHANDISE_PRODUCT_NOT_PUBLISHED',
  NoDeliveryGroupSelected = 'NO_DELIVERY_GROUP_SELECTED',
  PaymentsAddress1Invalid = 'PAYMENTS_ADDRESS1_INVALID',
  PaymentsAddress1Required = 'PAYMENTS_ADDRESS1_REQUIRED',
  PaymentsAddress1TooLong = 'PAYMENTS_ADDRESS1_TOO_LONG',
  PaymentsAddress2Invalid = 'PAYMENTS_ADDRESS2_INVALID',
  PaymentsAddress2Required = 'PAYMENTS_ADDRESS2_REQUIRED',
  PaymentsAddress2TooLong = 'PAYMENTS_ADDRESS2_TOO_LONG',
  PaymentsBillingAddressZoneNotFound = 'PAYMENTS_BILLING_ADDRESS_ZONE_NOT_FOUND',
  PaymentsBillingAddressZoneRequiredForCountry = 'PAYMENTS_BILLING_ADDRESS_ZONE_REQUIRED_FOR_COUNTRY',
  PaymentsCityInvalid = 'PAYMENTS_CITY_INVALID',
  PaymentsCityRequired = 'PAYMENTS_CITY_REQUIRED',
  PaymentsCityTooLong = 'PAYMENTS_CITY_TOO_LONG',
  PaymentsCompanyInvalid = 'PAYMENTS_COMPANY_INVALID',
  PaymentsCompanyRequired = 'PAYMENTS_COMPANY_REQUIRED',
  PaymentsCompanyTooLong = 'PAYMENTS_COMPANY_TOO_LONG',
  PaymentsCountryRequired = 'PAYMENTS_COUNTRY_REQUIRED',
  PaymentsCreditCardBaseExpired = 'PAYMENTS_CREDIT_CARD_BASE_EXPIRED',
  PaymentsCreditCardBaseGatewayNotSupported = 'PAYMENTS_CREDIT_CARD_BASE_GATEWAY_NOT_SUPPORTED',
  PaymentsCreditCardBaseInvalidStartDateOrIssueNumberForDebit = 'PAYMENTS_CREDIT_CARD_BASE_INVALID_START_DATE_OR_ISSUE_NUMBER_FOR_DEBIT',
  PaymentsCreditCardBrandNotSupported = 'PAYMENTS_CREDIT_CARD_BRAND_NOT_SUPPORTED',
  PaymentsCreditCardFirstNameBlank = 'PAYMENTS_CREDIT_CARD_FIRST_NAME_BLANK',
  PaymentsCreditCardGeneric = 'PAYMENTS_CREDIT_CARD_GENERIC',
  PaymentsCreditCardLastNameBlank = 'PAYMENTS_CREDIT_CARD_LAST_NAME_BLANK',
  PaymentsCreditCardMonthInclusion = 'PAYMENTS_CREDIT_CARD_MONTH_INCLUSION',
  PaymentsCreditCardNameInvalid = 'PAYMENTS_CREDIT_CARD_NAME_INVALID',
  PaymentsCreditCardNumberInvalid = 'PAYMENTS_CREDIT_CARD_NUMBER_INVALID',
  PaymentsCreditCardNumberInvalidFormat = 'PAYMENTS_CREDIT_CARD_NUMBER_INVALID_FORMAT',
  PaymentsCreditCardSessionId = 'PAYMENTS_CREDIT_CARD_SESSION_ID',
  PaymentsCreditCardVerificationValueBlank = 'PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_BLANK',
  PaymentsCreditCardVerificationValueInvalidForCardType = 'PAYMENTS_CREDIT_CARD_VERIFICATION_VALUE_INVALID_FOR_CARD_TYPE',
  PaymentsCreditCardYearExpired = 'PAYMENTS_CREDIT_CARD_YEAR_EXPIRED',
  PaymentsCreditCardYearInvalidExpiryYear = 'PAYMENTS_CREDIT_CARD_YEAR_INVALID_EXPIRY_YEAR',
  PaymentsFirstNameInvalid = 'PAYMENTS_FIRST_NAME_INVALID',
  PaymentsFirstNameRequired = 'PAYMENTS_FIRST_NAME_REQUIRED',
  PaymentsFirstNameTooLong = 'PAYMENTS_FIRST_NAME_TOO_LONG',
  PaymentsInvalidPostalCodeForCountry = 'PAYMENTS_INVALID_POSTAL_CODE_FOR_COUNTRY',
  PaymentsInvalidPostalCodeForZone = 'PAYMENTS_INVALID_POSTAL_CODE_FOR_ZONE',
  PaymentsLastNameInvalid = 'PAYMENTS_LAST_NAME_INVALID',
  PaymentsLastNameRequired = 'PAYMENTS_LAST_NAME_REQUIRED',
  PaymentsLastNameTooLong = 'PAYMENTS_LAST_NAME_TOO_LONG',
  PaymentsMethodRequired = 'PAYMENTS_METHOD_REQUIRED',
  PaymentsMethodUnavailable = 'PAYMENTS_METHOD_UNAVAILABLE',
  PaymentsPhoneNumberInvalid = 'PAYMENTS_PHONE_NUMBER_INVALID',
  PaymentsPhoneNumberRequired = 'PAYMENTS_PHONE_NUMBER_REQUIRED',
  PaymentsPostalCodeInvalid = 'PAYMENTS_POSTAL_CODE_INVALID',
  PaymentsPostalCodeRequired = 'PAYMENTS_POSTAL_CODE_REQUIRED',
  PaymentsShopifyPaymentsRequired = 'PAYMENTS_SHOPIFY_PAYMENTS_REQUIRED',
  PaymentsUnacceptablePaymentAmount = 'PAYMENTS_UNACCEPTABLE_PAYMENT_AMOUNT',
  PaymentsWalletContentMissing = 'PAYMENTS_WALLET_CONTENT_MISSING',
  TaxesDeliveryGroupIdNotFound = 'TAXES_DELIVERY_GROUP_ID_NOT_FOUND',
  TaxesLineIdNotFound = 'TAXES_LINE_ID_NOT_FOUND',
  TaxesMustBeDefined = 'TAXES_MUST_BE_DEFINED',
}

/** Cart submit for checkout completion is successful. */
export interface ShopifyStorefrontSubmitAlreadyAccepted {
  __typename: 'SubmitAlreadyAccepted'
  /** The ID of the cart completion attempt that will be used for polling for the result. */
  attemptId: Scalars['String']['output']
}

/** Cart submit for checkout completion failed. */
export interface ShopifyStorefrontSubmitFailed {
  __typename: 'SubmitFailed'
  /** The URL of the checkout for the cart. */
  checkoutUrl?: Maybe<Scalars['URL']['output']>
  /** The list of errors that occurred from executing the mutation. */
  errors: Array<ShopifyStorefrontSubmissionError>
}

/** Cart submit for checkout completion is already accepted. */
export interface ShopifyStorefrontSubmitSuccess {
  __typename: 'SubmitSuccess'
  /** The ID of the cart completion attempt that will be used for polling for the result. */
  attemptId: Scalars['String']['output']
}

/** Cart submit for checkout completion is throttled. */
export interface ShopifyStorefrontSubmitThrottled {
  __typename: 'SubmitThrottled'
  /**
   * UTC date time string that indicates the time after which clients should make their next
   * poll request. Any poll requests sent before this time will be ignored. Use this value to schedule the
   * next poll request.
   *
   */
  pollAfter: Scalars['DateTime']['output']
}

/**
 * Specifies the fields required to complete a checkout with
 * a tokenized payment.
 *
 */
export type ShopifyStorefrontTokenizedPaymentInputV3 = {
  /** The billing address for the payment. */
  billingAddress: ShopifyStorefrontMailingAddressInput
  /** A unique client generated key used to avoid duplicate charges. When a duplicate payment is found, the original is returned instead of creating a new one. For more information, refer to [Idempotent requests](https://shopify.dev/api/usage/idempotent-requests). */
  idempotencyKey: Scalars['String']['input']
  /** Public Hash Key used for AndroidPay payments only. */
  identifier?: InputMaybe<Scalars['String']['input']>
  /** The amount and currency of the payment. */
  paymentAmount: ShopifyStorefrontMoneyInput
  /** A simple string or JSON containing the required payment data for the tokenized payment. */
  paymentData: Scalars['String']['input']
  /** Whether to execute the payment in test mode, if possible. Test mode isn't supported in production stores. Defaults to `false`. */
  test?: InputMaybe<Scalars['Boolean']['input']>
  /** The type of payment token. */
  type: ShopifyStorefrontPaymentTokenType
}

/** Represents a resource that you can track the origin of the search traffic. */
export type ShopifyStorefrontTrackable = {
  /** A URL parameters to be added to a page URL when it is linked from a GraphQL result. This allows for tracking the origin of the traffic. */
  trackingParameters?: Maybe<Scalars['String']['output']>
}

/** An object representing exchange of money for a product or service. */
export interface ShopifyStorefrontTransaction {
  __typename: 'Transaction'
  /** The amount of money that the transaction was for. */
  amount: ShopifyStorefrontMoneyV2
  /**
   * The amount of money that the transaction was for.
   * @deprecated Use `amount` instead.
   */
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
  test: Scalars['Boolean']['output']
}

/** The different kinds of order transactions. */
export enum ShopifyStorefrontTransactionKind {
  /**
   * An amount reserved against the cardholder's funding source.
   * Money does not change hands until the authorization is captured.
   *
   */
  Authorization = 'AUTHORIZATION',
  /** A transfer of the money that was reserved during the authorization stage. */
  Capture = 'CAPTURE',
  /** Money returned to the customer when they have paid too much. */
  Change = 'CHANGE',
  /** An authorization for a payment taken with an EMV credit card reader. */
  EmvAuthorization = 'EMV_AUTHORIZATION',
  /** An authorization and capture performed together in a single step. */
  Sale = 'SALE',
}

/** Transaction statuses describe the status of a transaction. */
export enum ShopifyStorefrontTransactionStatus {
  /** There was an error while processing the transaction. */
  Error = 'ERROR',
  /** The transaction failed. */
  Failure = 'FAILURE',
  /** The transaction is pending. */
  Pending = 'PENDING',
  /** The transaction succeeded. */
  Success = 'SUCCESS',
}

/**
 * The measurement used to calculate a unit price for a product variant (e.g. $9.99 / 100ml).
 *
 */
export interface ShopifyStorefrontUnitPriceMeasurement {
  __typename: 'UnitPriceMeasurement'
  /** The type of unit of measurement for the unit price measurement. */
  measuredType?: Maybe<ShopifyStorefrontUnitPriceMeasurementMeasuredType>
  /** The quantity unit for the unit price measurement. */
  quantityUnit?: Maybe<ShopifyStorefrontUnitPriceMeasurementMeasuredUnit>
  /** The quantity value for the unit price measurement. */
  quantityValue: Scalars['Float']['output']
  /** The reference unit for the unit price measurement. */
  referenceUnit?: Maybe<ShopifyStorefrontUnitPriceMeasurementMeasuredUnit>
  /** The reference value for the unit price measurement. */
  referenceValue: Scalars['Int']['output']
}

/** The accepted types of unit of measurement. */
export enum ShopifyStorefrontUnitPriceMeasurementMeasuredType {
  /** Unit of measurements representing areas. */
  Area = 'AREA',
  /** Unit of measurements representing lengths. */
  Length = 'LENGTH',
  /** Unit of measurements representing volumes. */
  Volume = 'VOLUME',
  /** Unit of measurements representing weights. */
  Weight = 'WEIGHT',
}

/** The valid units of measurement for a unit price measurement. */
export enum ShopifyStorefrontUnitPriceMeasurementMeasuredUnit {
  /** 100 centiliters equals 1 liter. */
  Cl = 'CL',
  /** 100 centimeters equals 1 meter. */
  Cm = 'CM',
  /** Metric system unit of weight. */
  G = 'G',
  /** 1 kilogram equals 1000 grams. */
  Kg = 'KG',
  /** Metric system unit of volume. */
  L = 'L',
  /** Metric system unit of length. */
  M = 'M',
  /** Metric system unit of area. */
  M2 = 'M2',
  /** 1 cubic meter equals 1000 liters. */
  M3 = 'M3',
  /** 1000 milligrams equals 1 gram. */
  Mg = 'MG',
  /** 1000 milliliters equals 1 liter. */
  Ml = 'ML',
  /** 1000 millimeters equals 1 meter. */
  Mm = 'MM',
}

/** Systems of weights and measures. */
export enum ShopifyStorefrontUnitSystem {
  /** Imperial system of weights and measures. */
  ImperialSystem = 'IMPERIAL_SYSTEM',
  /** Metric system of weights and measures. */
  MetricSystem = 'METRIC_SYSTEM',
}

/** A redirect on the online store. */
export interface ShopifyStorefrontUrlRedirect extends ShopifyStorefrontNode {
  __typename: 'UrlRedirect'
  /** The ID of the URL redirect. */
  id: Scalars['ID']['output']
  /** The old path to be redirected from. When the user visits this path, they'll be redirected to the target location. */
  path: Scalars['String']['output']
  /** The target location where the user will be redirected to. */
  target: Scalars['String']['output']
}

/**
 * An auto-generated type for paginating through multiple UrlRedirects.
 *
 */
export interface ShopifyStorefrontUrlRedirectConnection {
  __typename: 'UrlRedirectConnection'
  /** A list of edges. */
  edges: Array<ShopifyStorefrontUrlRedirectEdge>
  /** A list of the nodes contained in UrlRedirectEdge. */
  nodes: Array<ShopifyStorefrontUrlRedirect>
  /** Information to aid in pagination. */
  pageInfo: ShopifyStorefrontPageInfo
}

/**
 * An auto-generated type which holds one UrlRedirect and a cursor during pagination.
 *
 */
export interface ShopifyStorefrontUrlRedirectEdge {
  __typename: 'UrlRedirectEdge'
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output']
  /** The item at the end of UrlRedirectEdge. */
  node: ShopifyStorefrontUrlRedirect
}

/** Represents an error in the input of a mutation. */
export interface ShopifyStorefrontUserError
  extends ShopifyStorefrontDisplayableError {
  __typename: 'UserError'
  /** The path to the input field that caused the error. */
  field?: Maybe<Array<Scalars['String']['output']>>
  /** The error message. */
  message: Scalars['String']['output']
}

/** The input fields for a filter used to view a subset of products in a collection matching a specific variant option. */
export type ShopifyStorefrontVariantOptionFilter = {
  /** The name of the variant option to filter on. */
  name: Scalars['String']['input']
  /** The value of the variant option to filter on. */
  value: Scalars['String']['input']
}

/** Represents a Shopify hosted video. */
export interface ShopifyStorefrontVideo
  extends ShopifyStorefrontMedia,
    ShopifyStorefrontNode {
  __typename: 'Video'
  /** A word or phrase to share the nature or contents of a media. */
  alt?: Maybe<Scalars['String']['output']>
  /** A globally-unique ID. */
  id: Scalars['ID']['output']
  /** The media content type. */
  mediaContentType: ShopifyStorefrontMediaContentType
  /** The presentation for a media. */
  presentation?: Maybe<ShopifyStorefrontMediaPresentation>
  /** The preview image for the media. */
  previewImage?: Maybe<ShopifyStorefrontImage>
  /** The sources for a video. */
  sources: Array<ShopifyStorefrontVideoSource>
}

/** Represents a source for a Shopify hosted video. */
export interface ShopifyStorefrontVideoSource {
  __typename: 'VideoSource'
  /** The format of the video source. */
  format: Scalars['String']['output']
  /** The height of the video. */
  height: Scalars['Int']['output']
  /** The video MIME type. */
  mimeType: Scalars['String']['output']
  /** The URL of the video. */
  url: Scalars['String']['output']
  /** The width of the video. */
  width: Scalars['Int']['output']
}

/** Units of measurement for weight. */
export enum ShopifyStorefrontWeightUnit {
  /** Metric system unit of mass. */
  Grams = 'GRAMS',
  /** 1 kilogram equals 1000 grams. */
  Kilograms = 'KILOGRAMS',
  /** Imperial system unit of mass. */
  Ounces = 'OUNCES',
  /** 1 pound equals 16 ounces. */
  Pounds = 'POUNDS',
}
