export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: Date
  JSON: { [key: string]: any }
}

export interface Block {
  __typename: 'Block'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<Span>>>
  style?: Maybe<Scalars['String']>
  list?: Maybe<Scalars['String']>
}

export interface Carousel {
  __typename: 'Carousel'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  subtitleRaw?: Maybe<Scalars['JSON']>
  collection?: Maybe<ShopifyCollection>
  items?: Maybe<Array<Maybe<RichPageLink>>>
}

export type CarouselOrHeroOrImageTextBlock = Carousel | Hero | ImageTextBlock

export interface Cta {
  __typename: 'Cta'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  link?: Maybe<InternalLink>
}

export type Document = {
  _id: Scalars['ID']
  _type: Scalars['String']
  _createdAt: Scalars['DateTime']
  _updatedAt: Scalars['DateTime']
  _rev: Scalars['String']
}

export interface ExternalLink {
  __typename: 'ExternalLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  newTab?: Maybe<Scalars['Boolean']>
}

export type ExternalLinkOrInternalLink = ExternalLink | InternalLink

export interface File {
  __typename: 'File'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  asset?: Maybe<SanityFileAsset>
}

export interface Geopoint {
  __typename: 'Geopoint'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  lat?: Maybe<Scalars['Float']>
  lng?: Maybe<Scalars['Float']>
  alt?: Maybe<Scalars['Float']>
}

export interface Hero {
  __typename: 'Hero'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  bodyRaw?: Maybe<Scalars['JSON']>
  textPosition?: Maybe<Scalars['String']>
  textColor?: Maybe<Scalars['String']>
  image?: Maybe<RichImage>
  backgroundColor?: Maybe<Scalars['String']>
  mobileImage?: Maybe<RichImage>
  mobileBackgroundColor?: Maybe<Scalars['String']>
  textPositionMobile?: Maybe<Scalars['String']>
  textColorMobile?: Maybe<Scalars['String']>
}

export interface Homepage extends Document {
  __typename: 'Homepage'
  _id: Scalars['ID']
  _type: Scalars['String']
  _createdAt: Scalars['DateTime']
  _updatedAt: Scalars['DateTime']
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  content?: Maybe<Array<Maybe<CarouselOrHeroOrImageTextBlock>>>
}

export type HomepageFilter = {
  _id?: Maybe<Scalars['ID']>
  _id_not?: Maybe<Scalars['ID']>
  _id_matches?: Maybe<Scalars['String']>
  _id_in?: Maybe<Array<Scalars['String']>>
  _id_not_in?: Maybe<Array<Scalars['String']>>
  _type?: Maybe<Scalars['String']>
  _type_not?: Maybe<Scalars['String']>
  _type_matches?: Maybe<Scalars['String']>
  _type_in?: Maybe<Array<Scalars['String']>>
  _type_not_in?: Maybe<Array<Scalars['String']>>
  _createdAt?: Maybe<Scalars['DateTime']>
  _createdAt_not?: Maybe<Scalars['DateTime']>
  _createdAt_lt?: Maybe<Scalars['DateTime']>
  _createdAt_lte?: Maybe<Scalars['DateTime']>
  _createdAt_gt?: Maybe<Scalars['DateTime']>
  _createdAt_gte?: Maybe<Scalars['DateTime']>
  _updatedAt?: Maybe<Scalars['DateTime']>
  _updatedAt_not?: Maybe<Scalars['DateTime']>
  _updatedAt_lt?: Maybe<Scalars['DateTime']>
  _updatedAt_lte?: Maybe<Scalars['DateTime']>
  _updatedAt_gt?: Maybe<Scalars['DateTime']>
  _updatedAt_gte?: Maybe<Scalars['DateTime']>
  _rev?: Maybe<Scalars['String']>
  _rev_not?: Maybe<Scalars['String']>
  _rev_matches?: Maybe<Scalars['String']>
  _rev_in?: Maybe<Array<Scalars['String']>>
  _rev_not_in?: Maybe<Array<Scalars['String']>>
  _key?: Maybe<Scalars['String']>
  _key_not?: Maybe<Scalars['String']>
  _key_matches?: Maybe<Scalars['String']>
  _key_in?: Maybe<Array<Scalars['String']>>
  _key_not_in?: Maybe<Array<Scalars['String']>>
  is_draft?: Maybe<Scalars['Boolean']>
}

export interface Image {
  __typename: 'Image'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  asset?: Maybe<SanityImageAsset>
  hotspot?: Maybe<SanityImageHotspot>
  crop?: Maybe<SanityImageCrop>
}

export interface ImageTextBlock {
  __typename: 'ImageTextBlock'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  bodyRaw?: Maybe<Scalars['JSON']>
  ctaText?: Maybe<Scalars['String']>
  link?: Maybe<Array<Maybe<ExternalLinkOrInternalLink>>>
  textPosition?: Maybe<Scalars['String']>
  textColor?: Maybe<Scalars['String']>
  layout?: Maybe<Scalars['String']>
  backgroundImage?: Maybe<RichImage>
  backgroundColor?: Maybe<Scalars['String']>
  hoverImage?: Maybe<RichImage>
}

export interface InternalLink {
  __typename: 'InternalLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  document?: Maybe<PageOrShopifyCollectionOrShopifyProduct>
}

export interface Menu extends Document {
  __typename: 'Menu'
  _id: Scalars['ID']
  _type: Scalars['String']
  _createdAt: Scalars['DateTime']
  _updatedAt: Scalars['DateTime']
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  menuItems?: Maybe<Array<Maybe<MenuLinkOrSubMenu>>>
}

export type MenuFilter = {
  _id?: Maybe<Scalars['ID']>
  _id_not?: Maybe<Scalars['ID']>
  _id_matches?: Maybe<Scalars['String']>
  _id_in?: Maybe<Array<Scalars['String']>>
  _id_not_in?: Maybe<Array<Scalars['String']>>
  _type?: Maybe<Scalars['String']>
  _type_not?: Maybe<Scalars['String']>
  _type_matches?: Maybe<Scalars['String']>
  _type_in?: Maybe<Array<Scalars['String']>>
  _type_not_in?: Maybe<Array<Scalars['String']>>
  _createdAt?: Maybe<Scalars['DateTime']>
  _createdAt_not?: Maybe<Scalars['DateTime']>
  _createdAt_lt?: Maybe<Scalars['DateTime']>
  _createdAt_lte?: Maybe<Scalars['DateTime']>
  _createdAt_gt?: Maybe<Scalars['DateTime']>
  _createdAt_gte?: Maybe<Scalars['DateTime']>
  _updatedAt?: Maybe<Scalars['DateTime']>
  _updatedAt_not?: Maybe<Scalars['DateTime']>
  _updatedAt_lt?: Maybe<Scalars['DateTime']>
  _updatedAt_lte?: Maybe<Scalars['DateTime']>
  _updatedAt_gt?: Maybe<Scalars['DateTime']>
  _updatedAt_gte?: Maybe<Scalars['DateTime']>
  _rev?: Maybe<Scalars['String']>
  _rev_not?: Maybe<Scalars['String']>
  _rev_matches?: Maybe<Scalars['String']>
  _rev_in?: Maybe<Array<Scalars['String']>>
  _rev_not_in?: Maybe<Array<Scalars['String']>>
  _key?: Maybe<Scalars['String']>
  _key_not?: Maybe<Scalars['String']>
  _key_matches?: Maybe<Scalars['String']>
  _key_in?: Maybe<Array<Scalars['String']>>
  _key_not_in?: Maybe<Array<Scalars['String']>>
  is_draft?: Maybe<Scalars['Boolean']>
}

export interface MenuLink {
  __typename: 'MenuLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  link?: Maybe<InternalLink>
}

export type MenuLinkOrSubMenu = MenuLink | SubMenu

export interface Page extends Document {
  __typename: 'Page'
  _id: Scalars['ID']
  _type: Scalars['String']
  _createdAt: Scalars['DateTime']
  _updatedAt: Scalars['DateTime']
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  slug?: Maybe<Slug>
}

export type PageFilter = {
  _id?: Maybe<Scalars['ID']>
  _id_not?: Maybe<Scalars['ID']>
  _id_matches?: Maybe<Scalars['String']>
  _id_in?: Maybe<Array<Scalars['String']>>
  _id_not_in?: Maybe<Array<Scalars['String']>>
  _type?: Maybe<Scalars['String']>
  _type_not?: Maybe<Scalars['String']>
  _type_matches?: Maybe<Scalars['String']>
  _type_in?: Maybe<Array<Scalars['String']>>
  _type_not_in?: Maybe<Array<Scalars['String']>>
  _createdAt?: Maybe<Scalars['DateTime']>
  _createdAt_not?: Maybe<Scalars['DateTime']>
  _createdAt_lt?: Maybe<Scalars['DateTime']>
  _createdAt_lte?: Maybe<Scalars['DateTime']>
  _createdAt_gt?: Maybe<Scalars['DateTime']>
  _createdAt_gte?: Maybe<Scalars['DateTime']>
  _updatedAt?: Maybe<Scalars['DateTime']>
  _updatedAt_not?: Maybe<Scalars['DateTime']>
  _updatedAt_lt?: Maybe<Scalars['DateTime']>
  _updatedAt_lte?: Maybe<Scalars['DateTime']>
  _updatedAt_gt?: Maybe<Scalars['DateTime']>
  _updatedAt_gte?: Maybe<Scalars['DateTime']>
  _rev?: Maybe<Scalars['String']>
  _rev_not?: Maybe<Scalars['String']>
  _rev_matches?: Maybe<Scalars['String']>
  _rev_in?: Maybe<Array<Scalars['String']>>
  _rev_not_in?: Maybe<Array<Scalars['String']>>
  _key?: Maybe<Scalars['String']>
  _key_not?: Maybe<Scalars['String']>
  _key_matches?: Maybe<Scalars['String']>
  _key_in?: Maybe<Array<Scalars['String']>>
  _key_not_in?: Maybe<Array<Scalars['String']>>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_matches?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  is_draft?: Maybe<Scalars['Boolean']>
}

export interface PageInfo {
  __typename: 'PageInfo'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  hasNextPage?: Maybe<Scalars['Boolean']>
  hasPreviousPage?: Maybe<Scalars['Boolean']>
}

export type PageOrShopifyCollectionOrShopifyProduct =
  | Page
  | ShopifyCollection
  | ShopifyProduct

export interface ProductInfo {
  __typename: 'ProductInfo'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  bodyRaw?: Maybe<Scalars['JSON']>
}

export interface ProductInfoByTag {
  __typename: 'ProductInfoByTag'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  tag?: Maybe<Scalars['String']>
  info?: Maybe<Array<Maybe<ProductInfo>>>
}

export interface ProductInfoByType {
  __typename: 'ProductInfoByType'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  info?: Maybe<Array<Maybe<ProductInfo>>>
}

export interface ProductInfoSettings extends Document {
  __typename: 'ProductInfoSettings'
  _id: Scalars['ID']
  _type: Scalars['String']
  _createdAt: Scalars['DateTime']
  _updatedAt: Scalars['DateTime']
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  helpText?: Maybe<Scalars['String']>
  globalInfo?: Maybe<Array<Maybe<ProductInfo>>>
  infoByType?: Maybe<Array<Maybe<ProductInfoByType>>>
  infoByTag?: Maybe<Array<Maybe<ProductInfoByTag>>>
}

export type ProductInfoSettingsFilter = {
  _id?: Maybe<Scalars['ID']>
  _id_not?: Maybe<Scalars['ID']>
  _id_matches?: Maybe<Scalars['String']>
  _id_in?: Maybe<Array<Scalars['String']>>
  _id_not_in?: Maybe<Array<Scalars['String']>>
  _type?: Maybe<Scalars['String']>
  _type_not?: Maybe<Scalars['String']>
  _type_matches?: Maybe<Scalars['String']>
  _type_in?: Maybe<Array<Scalars['String']>>
  _type_not_in?: Maybe<Array<Scalars['String']>>
  _createdAt?: Maybe<Scalars['DateTime']>
  _createdAt_not?: Maybe<Scalars['DateTime']>
  _createdAt_lt?: Maybe<Scalars['DateTime']>
  _createdAt_lte?: Maybe<Scalars['DateTime']>
  _createdAt_gt?: Maybe<Scalars['DateTime']>
  _createdAt_gte?: Maybe<Scalars['DateTime']>
  _updatedAt?: Maybe<Scalars['DateTime']>
  _updatedAt_not?: Maybe<Scalars['DateTime']>
  _updatedAt_lt?: Maybe<Scalars['DateTime']>
  _updatedAt_lte?: Maybe<Scalars['DateTime']>
  _updatedAt_gt?: Maybe<Scalars['DateTime']>
  _updatedAt_gte?: Maybe<Scalars['DateTime']>
  _rev?: Maybe<Scalars['String']>
  _rev_not?: Maybe<Scalars['String']>
  _rev_matches?: Maybe<Scalars['String']>
  _rev_in?: Maybe<Array<Scalars['String']>>
  _rev_not_in?: Maybe<Array<Scalars['String']>>
  _key?: Maybe<Scalars['String']>
  _key_not?: Maybe<Scalars['String']>
  _key_matches?: Maybe<Scalars['String']>
  _key_in?: Maybe<Array<Scalars['String']>>
  _key_not_in?: Maybe<Array<Scalars['String']>>
  helpText?: Maybe<Scalars['String']>
  helpText_not?: Maybe<Scalars['String']>
  helpText_matches?: Maybe<Scalars['String']>
  helpText_in?: Maybe<Array<Scalars['String']>>
  helpText_not_in?: Maybe<Array<Scalars['String']>>
  is_draft?: Maybe<Scalars['Boolean']>
}

export interface RichImage {
  __typename: 'RichImage'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  altText?: Maybe<Scalars['String']>
  asset?: Maybe<SanityImageAsset>
  hotspot?: Maybe<SanityImageHotspot>
  crop?: Maybe<SanityImageCrop>
}

export interface RichPageLink {
  __typename: 'RichPageLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  document?: Maybe<PageOrShopifyCollectionOrShopifyProduct>
  title?: Maybe<Scalars['String']>
  captionRaw?: Maybe<Scalars['JSON']>
  image?: Maybe<RichImage>
  hoverImage?: Maybe<RichImage>
}

export interface RootQuery {
  __typename: 'RootQuery'
  Menu?: Maybe<Menu>
  Homepage?: Maybe<Homepage>
  Page?: Maybe<Page>
  ProductInfoSettings?: Maybe<ProductInfoSettings>
  ShopifyProduct?: Maybe<ShopifyProduct>
  ShopifyCollection?: Maybe<ShopifyCollection>
  SanityImageAsset?: Maybe<SanityImageAsset>
  SanityFileAsset?: Maybe<SanityFileAsset>
  allMenus: Array<Menu>
  allHomepages: Array<Homepage>
  allPages: Array<Page>
  allProductInfoSettings: Array<ProductInfoSettings>
  allShopifyProducts: Array<ShopifyProduct>
  allShopifyCollections: Array<ShopifyCollection>
  allSanityImageAssets: Array<SanityImageAsset>
  allSanityFileAssets: Array<SanityFileAsset>
}

export type RootQueryMenuArgs = {
  id: Scalars['ID']
}

export type RootQueryHomepageArgs = {
  id: Scalars['ID']
}

export type RootQueryPageArgs = {
  id: Scalars['ID']
}

export type RootQueryProductInfoSettingsArgs = {
  id: Scalars['ID']
}

export type RootQueryShopifyProductArgs = {
  id: Scalars['ID']
}

export type RootQueryShopifyCollectionArgs = {
  id: Scalars['ID']
}

export type RootQuerySanityImageAssetArgs = {
  id: Scalars['ID']
}

export type RootQuerySanityFileAssetArgs = {
  id: Scalars['ID']
}

export type RootQueryAllMenusArgs = {
  where?: Maybe<MenuFilter>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllHomepagesArgs = {
  where?: Maybe<HomepageFilter>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllPagesArgs = {
  where?: Maybe<PageFilter>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllProductInfoSettingsArgs = {
  where?: Maybe<ProductInfoSettingsFilter>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllShopifyProductsArgs = {
  where?: Maybe<ShopifyProductFilter>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllShopifyCollectionsArgs = {
  where?: Maybe<ShopifyCollectionFilter>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllSanityImageAssetsArgs = {
  where?: Maybe<SanityImageAssetFilter>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllSanityFileAssetsArgs = {
  where?: Maybe<SanityFileAssetFilter>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export interface SanityAssetSourceData {
  __typename: 'SanityAssetSourceData'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
}

export interface SanityFileAsset extends Document {
  __typename: 'SanityFileAsset'
  _id: Scalars['ID']
  _type: Scalars['String']
  _createdAt: Scalars['DateTime']
  _updatedAt: Scalars['DateTime']
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  originalFilename?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  sha1hash?: Maybe<Scalars['String']>
  extension?: Maybe<Scalars['String']>
  mimeType?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  assetId?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  source?: Maybe<SanityAssetSourceData>
}

export type SanityFileAssetFilter = {
  _id?: Maybe<Scalars['ID']>
  _id_not?: Maybe<Scalars['ID']>
  _id_matches?: Maybe<Scalars['String']>
  _id_in?: Maybe<Array<Scalars['String']>>
  _id_not_in?: Maybe<Array<Scalars['String']>>
  _type?: Maybe<Scalars['String']>
  _type_not?: Maybe<Scalars['String']>
  _type_matches?: Maybe<Scalars['String']>
  _type_in?: Maybe<Array<Scalars['String']>>
  _type_not_in?: Maybe<Array<Scalars['String']>>
  _createdAt?: Maybe<Scalars['DateTime']>
  _createdAt_not?: Maybe<Scalars['DateTime']>
  _createdAt_lt?: Maybe<Scalars['DateTime']>
  _createdAt_lte?: Maybe<Scalars['DateTime']>
  _createdAt_gt?: Maybe<Scalars['DateTime']>
  _createdAt_gte?: Maybe<Scalars['DateTime']>
  _updatedAt?: Maybe<Scalars['DateTime']>
  _updatedAt_not?: Maybe<Scalars['DateTime']>
  _updatedAt_lt?: Maybe<Scalars['DateTime']>
  _updatedAt_lte?: Maybe<Scalars['DateTime']>
  _updatedAt_gt?: Maybe<Scalars['DateTime']>
  _updatedAt_gte?: Maybe<Scalars['DateTime']>
  _rev?: Maybe<Scalars['String']>
  _rev_not?: Maybe<Scalars['String']>
  _rev_matches?: Maybe<Scalars['String']>
  _rev_in?: Maybe<Array<Scalars['String']>>
  _rev_not_in?: Maybe<Array<Scalars['String']>>
  _key?: Maybe<Scalars['String']>
  _key_not?: Maybe<Scalars['String']>
  _key_matches?: Maybe<Scalars['String']>
  _key_in?: Maybe<Array<Scalars['String']>>
  _key_not_in?: Maybe<Array<Scalars['String']>>
  originalFilename?: Maybe<Scalars['String']>
  originalFilename_not?: Maybe<Scalars['String']>
  originalFilename_matches?: Maybe<Scalars['String']>
  originalFilename_in?: Maybe<Array<Scalars['String']>>
  originalFilename_not_in?: Maybe<Array<Scalars['String']>>
  label?: Maybe<Scalars['String']>
  label_not?: Maybe<Scalars['String']>
  label_matches?: Maybe<Scalars['String']>
  label_in?: Maybe<Array<Scalars['String']>>
  label_not_in?: Maybe<Array<Scalars['String']>>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_matches?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  description?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_matches?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Scalars['String']>>
  description_not_in?: Maybe<Array<Scalars['String']>>
  sha1hash?: Maybe<Scalars['String']>
  sha1hash_not?: Maybe<Scalars['String']>
  sha1hash_matches?: Maybe<Scalars['String']>
  sha1hash_in?: Maybe<Array<Scalars['String']>>
  sha1hash_not_in?: Maybe<Array<Scalars['String']>>
  extension?: Maybe<Scalars['String']>
  extension_not?: Maybe<Scalars['String']>
  extension_matches?: Maybe<Scalars['String']>
  extension_in?: Maybe<Array<Scalars['String']>>
  extension_not_in?: Maybe<Array<Scalars['String']>>
  mimeType?: Maybe<Scalars['String']>
  mimeType_not?: Maybe<Scalars['String']>
  mimeType_matches?: Maybe<Scalars['String']>
  mimeType_in?: Maybe<Array<Scalars['String']>>
  mimeType_not_in?: Maybe<Array<Scalars['String']>>
  size?: Maybe<Scalars['Float']>
  size_not?: Maybe<Scalars['Float']>
  size_lt?: Maybe<Scalars['Float']>
  size_lte?: Maybe<Scalars['Float']>
  size_gt?: Maybe<Scalars['Float']>
  size_gte?: Maybe<Scalars['Float']>
  assetId?: Maybe<Scalars['String']>
  assetId_not?: Maybe<Scalars['String']>
  assetId_matches?: Maybe<Scalars['String']>
  assetId_in?: Maybe<Array<Scalars['String']>>
  assetId_not_in?: Maybe<Array<Scalars['String']>>
  path?: Maybe<Scalars['String']>
  path_not?: Maybe<Scalars['String']>
  path_matches?: Maybe<Scalars['String']>
  path_in?: Maybe<Array<Scalars['String']>>
  path_not_in?: Maybe<Array<Scalars['String']>>
  url?: Maybe<Scalars['String']>
  url_not?: Maybe<Scalars['String']>
  url_matches?: Maybe<Scalars['String']>
  url_in?: Maybe<Array<Scalars['String']>>
  url_not_in?: Maybe<Array<Scalars['String']>>
  is_draft?: Maybe<Scalars['Boolean']>
}

export interface SanityImageAsset extends Document {
  __typename: 'SanityImageAsset'
  _id: Scalars['ID']
  _type: Scalars['String']
  _createdAt: Scalars['DateTime']
  _updatedAt: Scalars['DateTime']
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  originalFilename?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  sha1hash?: Maybe<Scalars['String']>
  extension?: Maybe<Scalars['String']>
  mimeType?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  assetId?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  metadata?: Maybe<SanityImageMetadata>
  source?: Maybe<SanityAssetSourceData>
}

export type SanityImageAssetFilter = {
  _id?: Maybe<Scalars['ID']>
  _id_not?: Maybe<Scalars['ID']>
  _id_matches?: Maybe<Scalars['String']>
  _id_in?: Maybe<Array<Scalars['String']>>
  _id_not_in?: Maybe<Array<Scalars['String']>>
  _type?: Maybe<Scalars['String']>
  _type_not?: Maybe<Scalars['String']>
  _type_matches?: Maybe<Scalars['String']>
  _type_in?: Maybe<Array<Scalars['String']>>
  _type_not_in?: Maybe<Array<Scalars['String']>>
  _createdAt?: Maybe<Scalars['DateTime']>
  _createdAt_not?: Maybe<Scalars['DateTime']>
  _createdAt_lt?: Maybe<Scalars['DateTime']>
  _createdAt_lte?: Maybe<Scalars['DateTime']>
  _createdAt_gt?: Maybe<Scalars['DateTime']>
  _createdAt_gte?: Maybe<Scalars['DateTime']>
  _updatedAt?: Maybe<Scalars['DateTime']>
  _updatedAt_not?: Maybe<Scalars['DateTime']>
  _updatedAt_lt?: Maybe<Scalars['DateTime']>
  _updatedAt_lte?: Maybe<Scalars['DateTime']>
  _updatedAt_gt?: Maybe<Scalars['DateTime']>
  _updatedAt_gte?: Maybe<Scalars['DateTime']>
  _rev?: Maybe<Scalars['String']>
  _rev_not?: Maybe<Scalars['String']>
  _rev_matches?: Maybe<Scalars['String']>
  _rev_in?: Maybe<Array<Scalars['String']>>
  _rev_not_in?: Maybe<Array<Scalars['String']>>
  _key?: Maybe<Scalars['String']>
  _key_not?: Maybe<Scalars['String']>
  _key_matches?: Maybe<Scalars['String']>
  _key_in?: Maybe<Array<Scalars['String']>>
  _key_not_in?: Maybe<Array<Scalars['String']>>
  originalFilename?: Maybe<Scalars['String']>
  originalFilename_not?: Maybe<Scalars['String']>
  originalFilename_matches?: Maybe<Scalars['String']>
  originalFilename_in?: Maybe<Array<Scalars['String']>>
  originalFilename_not_in?: Maybe<Array<Scalars['String']>>
  label?: Maybe<Scalars['String']>
  label_not?: Maybe<Scalars['String']>
  label_matches?: Maybe<Scalars['String']>
  label_in?: Maybe<Array<Scalars['String']>>
  label_not_in?: Maybe<Array<Scalars['String']>>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_matches?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  description?: Maybe<Scalars['String']>
  description_not?: Maybe<Scalars['String']>
  description_matches?: Maybe<Scalars['String']>
  description_in?: Maybe<Array<Scalars['String']>>
  description_not_in?: Maybe<Array<Scalars['String']>>
  sha1hash?: Maybe<Scalars['String']>
  sha1hash_not?: Maybe<Scalars['String']>
  sha1hash_matches?: Maybe<Scalars['String']>
  sha1hash_in?: Maybe<Array<Scalars['String']>>
  sha1hash_not_in?: Maybe<Array<Scalars['String']>>
  extension?: Maybe<Scalars['String']>
  extension_not?: Maybe<Scalars['String']>
  extension_matches?: Maybe<Scalars['String']>
  extension_in?: Maybe<Array<Scalars['String']>>
  extension_not_in?: Maybe<Array<Scalars['String']>>
  mimeType?: Maybe<Scalars['String']>
  mimeType_not?: Maybe<Scalars['String']>
  mimeType_matches?: Maybe<Scalars['String']>
  mimeType_in?: Maybe<Array<Scalars['String']>>
  mimeType_not_in?: Maybe<Array<Scalars['String']>>
  size?: Maybe<Scalars['Float']>
  size_not?: Maybe<Scalars['Float']>
  size_lt?: Maybe<Scalars['Float']>
  size_lte?: Maybe<Scalars['Float']>
  size_gt?: Maybe<Scalars['Float']>
  size_gte?: Maybe<Scalars['Float']>
  assetId?: Maybe<Scalars['String']>
  assetId_not?: Maybe<Scalars['String']>
  assetId_matches?: Maybe<Scalars['String']>
  assetId_in?: Maybe<Array<Scalars['String']>>
  assetId_not_in?: Maybe<Array<Scalars['String']>>
  path?: Maybe<Scalars['String']>
  path_not?: Maybe<Scalars['String']>
  path_matches?: Maybe<Scalars['String']>
  path_in?: Maybe<Array<Scalars['String']>>
  path_not_in?: Maybe<Array<Scalars['String']>>
  url?: Maybe<Scalars['String']>
  url_not?: Maybe<Scalars['String']>
  url_matches?: Maybe<Scalars['String']>
  url_in?: Maybe<Array<Scalars['String']>>
  url_not_in?: Maybe<Array<Scalars['String']>>
  is_draft?: Maybe<Scalars['Boolean']>
}

export interface SanityImageCrop {
  __typename: 'SanityImageCrop'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  top?: Maybe<Scalars['Float']>
  bottom?: Maybe<Scalars['Float']>
  left?: Maybe<Scalars['Float']>
  right?: Maybe<Scalars['Float']>
}

export interface SanityImageDimensions {
  __typename: 'SanityImageDimensions'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  aspectRatio?: Maybe<Scalars['Float']>
}

export interface SanityImageHotspot {
  __typename: 'SanityImageHotspot'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  x?: Maybe<Scalars['Float']>
  y?: Maybe<Scalars['Float']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
}

export interface SanityImageMetadata {
  __typename: 'SanityImageMetadata'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  location?: Maybe<Geopoint>
  dimensions?: Maybe<SanityImageDimensions>
  palette?: Maybe<SanityImagePalette>
  lqip?: Maybe<Scalars['String']>
  hasAlpha?: Maybe<Scalars['Boolean']>
  isOpaque?: Maybe<Scalars['Boolean']>
}

export interface SanityImagePalette {
  __typename: 'SanityImagePalette'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  darkMuted?: Maybe<SanityImagePaletteSwatch>
  lightVibrant?: Maybe<SanityImagePaletteSwatch>
  darkVibrant?: Maybe<SanityImagePaletteSwatch>
  vibrant?: Maybe<SanityImagePaletteSwatch>
  dominant?: Maybe<SanityImagePaletteSwatch>
  lightMuted?: Maybe<SanityImagePaletteSwatch>
  muted?: Maybe<SanityImagePaletteSwatch>
}

export interface SanityImagePaletteSwatch {
  __typename: 'SanityImagePaletteSwatch'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  background?: Maybe<Scalars['String']>
  foreground?: Maybe<Scalars['String']>
  population?: Maybe<Scalars['Float']>
  title?: Maybe<Scalars['String']>
}

export interface ShopifyCollection extends Document {
  __typename: 'ShopifyCollection'
  _id: Scalars['ID']
  _type: Scalars['String']
  _createdAt: Scalars['DateTime']
  _updatedAt: Scalars['DateTime']
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  shopifyId?: Maybe<Scalars['String']>
  products?: Maybe<Array<Maybe<ShopifyProduct>>>
  sourceData?: Maybe<ShopifySourceCollection>
}

export type ShopifyCollectionFilter = {
  _id?: Maybe<Scalars['ID']>
  _id_not?: Maybe<Scalars['ID']>
  _id_matches?: Maybe<Scalars['String']>
  _id_in?: Maybe<Array<Scalars['String']>>
  _id_not_in?: Maybe<Array<Scalars['String']>>
  _type?: Maybe<Scalars['String']>
  _type_not?: Maybe<Scalars['String']>
  _type_matches?: Maybe<Scalars['String']>
  _type_in?: Maybe<Array<Scalars['String']>>
  _type_not_in?: Maybe<Array<Scalars['String']>>
  _createdAt?: Maybe<Scalars['DateTime']>
  _createdAt_not?: Maybe<Scalars['DateTime']>
  _createdAt_lt?: Maybe<Scalars['DateTime']>
  _createdAt_lte?: Maybe<Scalars['DateTime']>
  _createdAt_gt?: Maybe<Scalars['DateTime']>
  _createdAt_gte?: Maybe<Scalars['DateTime']>
  _updatedAt?: Maybe<Scalars['DateTime']>
  _updatedAt_not?: Maybe<Scalars['DateTime']>
  _updatedAt_lt?: Maybe<Scalars['DateTime']>
  _updatedAt_lte?: Maybe<Scalars['DateTime']>
  _updatedAt_gt?: Maybe<Scalars['DateTime']>
  _updatedAt_gte?: Maybe<Scalars['DateTime']>
  _rev?: Maybe<Scalars['String']>
  _rev_not?: Maybe<Scalars['String']>
  _rev_matches?: Maybe<Scalars['String']>
  _rev_in?: Maybe<Array<Scalars['String']>>
  _rev_not_in?: Maybe<Array<Scalars['String']>>
  _key?: Maybe<Scalars['String']>
  _key_not?: Maybe<Scalars['String']>
  _key_matches?: Maybe<Scalars['String']>
  _key_in?: Maybe<Array<Scalars['String']>>
  _key_not_in?: Maybe<Array<Scalars['String']>>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_matches?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  handle?: Maybe<Scalars['String']>
  handle_not?: Maybe<Scalars['String']>
  handle_matches?: Maybe<Scalars['String']>
  handle_in?: Maybe<Array<Scalars['String']>>
  handle_not_in?: Maybe<Array<Scalars['String']>>
  shopifyId?: Maybe<Scalars['String']>
  shopifyId_not?: Maybe<Scalars['String']>
  shopifyId_matches?: Maybe<Scalars['String']>
  shopifyId_in?: Maybe<Array<Scalars['String']>>
  shopifyId_not_in?: Maybe<Array<Scalars['String']>>
  is_draft?: Maybe<Scalars['Boolean']>
}

export interface ShopifyMoneyV2 {
  __typename: 'ShopifyMoneyV2'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
}

export interface ShopifyProduct extends Document {
  __typename: 'ShopifyProduct'
  _id: Scalars['ID']
  _type: Scalars['String']
  _createdAt: Scalars['DateTime']
  _updatedAt: Scalars['DateTime']
  _rev: Scalars['String']
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  shopifyId?: Maybe<Scalars['String']>
  sourceData?: Maybe<ShopifySourceProduct>
  collections?: Maybe<Array<Maybe<ShopifyCollection>>>
  options?: Maybe<Array<Maybe<ShopifyProductOption>>>
  variants?: Maybe<Array<Maybe<ShopifyProductVariant>>>
  info?: Maybe<Array<Maybe<ProductInfo>>>
  displayShopifyImages?: Maybe<Scalars['Boolean']>
  contentAfter?: Maybe<Array<Maybe<ImageTextBlock>>>
  related?: Maybe<Carousel>
}

export type ShopifyProductFilter = {
  _id?: Maybe<Scalars['ID']>
  _id_not?: Maybe<Scalars['ID']>
  _id_matches?: Maybe<Scalars['String']>
  _id_in?: Maybe<Array<Scalars['String']>>
  _id_not_in?: Maybe<Array<Scalars['String']>>
  _type?: Maybe<Scalars['String']>
  _type_not?: Maybe<Scalars['String']>
  _type_matches?: Maybe<Scalars['String']>
  _type_in?: Maybe<Array<Scalars['String']>>
  _type_not_in?: Maybe<Array<Scalars['String']>>
  _createdAt?: Maybe<Scalars['DateTime']>
  _createdAt_not?: Maybe<Scalars['DateTime']>
  _createdAt_lt?: Maybe<Scalars['DateTime']>
  _createdAt_lte?: Maybe<Scalars['DateTime']>
  _createdAt_gt?: Maybe<Scalars['DateTime']>
  _createdAt_gte?: Maybe<Scalars['DateTime']>
  _updatedAt?: Maybe<Scalars['DateTime']>
  _updatedAt_not?: Maybe<Scalars['DateTime']>
  _updatedAt_lt?: Maybe<Scalars['DateTime']>
  _updatedAt_lte?: Maybe<Scalars['DateTime']>
  _updatedAt_gt?: Maybe<Scalars['DateTime']>
  _updatedAt_gte?: Maybe<Scalars['DateTime']>
  _rev?: Maybe<Scalars['String']>
  _rev_not?: Maybe<Scalars['String']>
  _rev_matches?: Maybe<Scalars['String']>
  _rev_in?: Maybe<Array<Scalars['String']>>
  _rev_not_in?: Maybe<Array<Scalars['String']>>
  _key?: Maybe<Scalars['String']>
  _key_not?: Maybe<Scalars['String']>
  _key_matches?: Maybe<Scalars['String']>
  _key_in?: Maybe<Array<Scalars['String']>>
  _key_not_in?: Maybe<Array<Scalars['String']>>
  title?: Maybe<Scalars['String']>
  title_not?: Maybe<Scalars['String']>
  title_matches?: Maybe<Scalars['String']>
  title_in?: Maybe<Array<Scalars['String']>>
  title_not_in?: Maybe<Array<Scalars['String']>>
  handle?: Maybe<Scalars['String']>
  handle_not?: Maybe<Scalars['String']>
  handle_matches?: Maybe<Scalars['String']>
  handle_in?: Maybe<Array<Scalars['String']>>
  handle_not_in?: Maybe<Array<Scalars['String']>>
  shopifyId?: Maybe<Scalars['String']>
  shopifyId_not?: Maybe<Scalars['String']>
  shopifyId_matches?: Maybe<Scalars['String']>
  shopifyId_in?: Maybe<Array<Scalars['String']>>
  shopifyId_not_in?: Maybe<Array<Scalars['String']>>
  displayShopifyImages?: Maybe<Scalars['Boolean']>
  displayShopifyImages_not?: Maybe<Scalars['Boolean']>
  is_draft?: Maybe<Scalars['Boolean']>
}

export interface ShopifyProductOption {
  __typename: 'ShopifyProductOption'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  shopifyOptionId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<ShopifyProductOptionValue>>>
}

export interface ShopifyProductOptionValue {
  __typename: 'ShopifyProductOptionValue'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  descriptionRaw?: Maybe<Scalars['JSON']>
  swatch?: Maybe<Image>
  gallery?: Maybe<Array<Maybe<RichImage>>>
}

export interface ShopifyProductVariant {
  __typename: 'ShopifyProductVariant'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  shopifyVariantID?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  sourceData?: Maybe<ShopifySourceProductVariant>
}

export interface ShopifySourceCollection {
  __typename: 'ShopifySourceCollection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  descriptionHtml?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  image?: Maybe<ShopifySourceImage>
  products?: Maybe<ShopifySourceProductsConnection>
}

export interface ShopifySourceCollectionEdge {
  __typename: 'ShopifySourceCollectionEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceCollectionNode>
}

export interface ShopifySourceCollectionNode {
  __typename: 'ShopifySourceCollectionNode'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export interface ShopifySourceCollectionsConnection {
  __typename: 'ShopifySourceCollectionsConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<ShopifySourceCollectionEdge>>>
}

export interface ShopifySourceImage {
  __typename: 'ShopifySourceImage'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  altText?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  originalSrc?: Maybe<Scalars['String']>
  w100?: Maybe<Scalars['String']>
  w300?: Maybe<Scalars['String']>
  w800?: Maybe<Scalars['String']>
}

export interface ShopifySourceImageEdge {
  __typename: 'ShopifySourceImageEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  key?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceImage>
}

export interface ShopifySourceImages {
  __typename: 'ShopifySourceImages'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  edges?: Maybe<Array<Maybe<ShopifySourceImageEdge>>>
}

export interface ShopifySourceProduct {
  __typename: 'ShopifySourceProduct'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  availableForSale?: Maybe<Scalars['Boolean']>
  priceRange?: Maybe<ShopifySourceProductPriceRange>
  productType?: Maybe<Scalars['String']>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  handle?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  descriptionHtml?: Maybe<Scalars['String']>
  vendor?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  images?: Maybe<ShopifySourceImages>
  options?: Maybe<Array<Maybe<ShopifySourceProductOption>>>
  variants?: Maybe<ShopifySourceProductVariantsConnection>
  collections?: Maybe<ShopifySourceCollectionsConnection>
}

export interface ShopifySourceProductEdge {
  __typename: 'ShopifySourceProductEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceProductNode>
}

export interface ShopifySourceProductNode {
  __typename: 'ShopifySourceProductNode'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export interface ShopifySourceProductOption {
  __typename: 'ShopifySourceProductOption'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<Scalars['String']>>>
}

export interface ShopifySourceProductPriceRange {
  __typename: 'ShopifySourceProductPriceRange'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  minVariantPrice?: Maybe<ShopifyMoneyV2>
  maxVariantPrice?: Maybe<ShopifyMoneyV2>
}

export interface ShopifySourceProductsConnection {
  __typename: 'ShopifySourceProductsConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<ShopifySourceProductEdge>>>
}

export interface ShopifySourceProductVariant {
  __typename: 'ShopifySourceProductVariant'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  availableForSale?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  image?: Maybe<ShopifySourceImage>
  priceV2?: Maybe<ShopifyMoneyV2>
  selectedOptions?: Maybe<Array<Maybe<ShopifySourceSelectedOption>>>
  requiresShipping?: Maybe<Scalars['Boolean']>
  sku?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  weight?: Maybe<Scalars['Float']>
  weightUnit?: Maybe<Scalars['String']>
}

export interface ShopifySourceProductVariantEdge {
  __typename: 'ShopifySourceProductVariantEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceProductVariant>
}

export interface ShopifySourceProductVariantsConnection {
  __typename: 'ShopifySourceProductVariantsConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<ShopifySourceProductVariantEdge>>>
}

export interface ShopifySourceSelectedOption {
  __typename: 'ShopifySourceSelectedOption'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export interface Slug {
  __typename: 'Slug'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  current?: Maybe<Scalars['String']>
}

export interface Span {
  __typename: 'Span'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  marks?: Maybe<Array<Maybe<Scalars['String']>>>
  text?: Maybe<Scalars['String']>
}

export interface SubMenu {
  __typename: 'SubMenu'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  links?: Maybe<Array<Maybe<Cta>>>
}
