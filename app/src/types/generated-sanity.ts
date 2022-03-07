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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { [key: string]: any }
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
}

export interface About extends Document {
  __typename: 'About'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  hero?: Maybe<Hero>
  introText?: Maybe<Scalars['String']>
  pageLinks?: Maybe<Array<Maybe<PageLink>>>
  seo?: Maybe<Seo>
}

export type AboutFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  hero?: Maybe<HeroFilter>
  introText?: Maybe<StringFilter>
  seo?: Maybe<SeoFilter>
}

export type AboutOrContactOrCustomizeOrJournalEntryOrJournalPageOrMagazineOrPageOrShopifyCollectionOrShopifyProductOrTeamPage =

    | About
    | Contact
    | Customize
    | JournalEntry
    | JournalPage
    | Magazine
    | Page
    | ShopifyCollection
    | ShopifyProduct
    | TeamPage

export type AboutSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  hero?: Maybe<HeroSorting>
  introText?: Maybe<SortOrder>
  seo?: Maybe<SeoSorting>
}

export interface BambuserLiveSettings {
  __typename: 'BambuserLiveSettings'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  startDate?: Maybe<Scalars['DateTime']>
  endDate?: Maybe<Scalars['DateTime']>
  liveCTALabel?: Maybe<Scalars['String']>
}

export type BambuserLiveSettingsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  startDate?: Maybe<DatetimeFilter>
  endDate?: Maybe<DatetimeFilter>
  liveCTALabel?: Maybe<StringFilter>
}

export type BambuserLiveSettingsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  startDate?: Maybe<SortOrder>
  endDate?: Maybe<SortOrder>
  liveCTALabel?: Maybe<SortOrder>
}

export interface BambuserSettings {
  __typename: 'BambuserSettings'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** The ID of the Bambuser video to launch */
  slug?: Maybe<Scalars['String']>
  liveSettings?: Maybe<BambuserLiveSettings>
}

export type BambuserSettingsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  slug?: Maybe<StringFilter>
  liveSettings?: Maybe<BambuserLiveSettingsFilter>
}

export type BambuserSettingsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  slug?: Maybe<SortOrder>
  liveSettings?: Maybe<BambuserLiveSettingsSorting>
}

export interface Block {
  __typename: 'Block'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  children?: Maybe<Array<Maybe<Span>>>
  style?: Maybe<Scalars['String']>
  list?: Maybe<Scalars['String']>
}

export type BlockOrCloudinaryVideoOrFormOrRichImage =
  | Block
  | CloudinaryVideo
  | Form
  | RichImage

export type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Boolean']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Boolean']>
}

export interface Carousel {
  __typename: 'Carousel'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  subtitleRaw?: Maybe<Scalars['JSON']>
  /** Create a carousel from a collection. If a collection is used, items linked to below be ignored. */
  collection?: Maybe<ShopifyCollection>
  items?: Maybe<Array<Maybe<RichPageLink>>>
}

export type CarouselFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  collection?: Maybe<ShopifyCollectionFilter>
}

export type CarouselOrEmbedBlockOrImageTextBlockOrTextBlock =
  | Carousel
  | EmbedBlock
  | ImageTextBlock
  | TextBlock

export type CarouselOrHeroOrImageTextBlock = Carousel | Hero | ImageTextBlock

export type CarouselSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
}

export interface CloudinaryVideo {
  __typename: 'CloudinaryVideo'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  videoId?: Maybe<Scalars['String']>
  enableAudio?: Maybe<Scalars['Boolean']>
  enableControls?: Maybe<Scalars['Boolean']>
  subtitle?: Maybe<Scalars['String']>
}

export type CloudinaryVideoFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  videoId?: Maybe<StringFilter>
  enableAudio?: Maybe<BooleanFilter>
  enableControls?: Maybe<BooleanFilter>
  subtitle?: Maybe<StringFilter>
}

export type CloudinaryVideoSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  videoId?: Maybe<SortOrder>
  enableAudio?: Maybe<SortOrder>
  enableControls?: Maybe<SortOrder>
  subtitle?: Maybe<SortOrder>
}

export interface CollectionBlock {
  __typename: 'CollectionBlock'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  position?: Maybe<Scalars['Float']>
  format?: Maybe<Scalars['String']>
  bodyRaw?: Maybe<Scalars['JSON']>
  body_mobileRaw?: Maybe<Scalars['JSON']>
  textPosition?: Maybe<Scalars['String']>
  textColor?: Maybe<Scalars['String']>
  cloudinaryVideo?: Maybe<CloudinaryVideo>
  backgroundImage?: Maybe<RichImage>
  backgroundColor?: Maybe<Scalars['String']>
}

export type CollectionBlockFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  position?: Maybe<FloatFilter>
  format?: Maybe<StringFilter>
  textPosition?: Maybe<StringFilter>
  textColor?: Maybe<StringFilter>
  cloudinaryVideo?: Maybe<CloudinaryVideoFilter>
  backgroundImage?: Maybe<RichImageFilter>
  backgroundColor?: Maybe<StringFilter>
}

export type CollectionBlockSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  position?: Maybe<SortOrder>
  format?: Maybe<SortOrder>
  textPosition?: Maybe<SortOrder>
  textColor?: Maybe<SortOrder>
  cloudinaryVideo?: Maybe<CloudinaryVideoSorting>
  backgroundImage?: Maybe<RichImageSorting>
  backgroundColor?: Maybe<SortOrder>
}

export interface Contact extends Document {
  __typename: 'Contact'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  contactLines?: Maybe<Array<Maybe<ContactLine>>>
  seo?: Maybe<Seo>
}

export type ContactFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  seo?: Maybe<SeoFilter>
}

export interface ContactLine {
  __typename: 'ContactLine'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  contact?: Maybe<Scalars['String']>
}

export type ContactLineFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
  contact?: Maybe<StringFilter>
}

export type ContactLineSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
  contact?: Maybe<SortOrder>
}

export type ContactSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  seo?: Maybe<SeoSorting>
}

export interface Cta {
  __typename: 'Cta'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  link?: Maybe<InternalLink>
  /**
   * Have this CTA launch an action instead of linking to a page. For launching
   * Bambuser, make sure you fill out the Bambuser Settings below. (If selected,
   * this will override any linked document)
   */
  action?: Maybe<Scalars['String']>
  bambuser?: Maybe<BambuserSettings>
}

export type CtaFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
  link?: Maybe<InternalLinkFilter>
  action?: Maybe<StringFilter>
  bambuser?: Maybe<BambuserSettingsFilter>
}

export type CtaOrSubMenu = Cta | SubMenu

export type CtaSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
  link?: Maybe<InternalLinkSorting>
  action?: Maybe<SortOrder>
  bambuser?: Maybe<BambuserSettingsSorting>
}

export interface Customize extends Document {
  __typename: 'Customize'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  hero?: Maybe<Hero>
  subtitle?: Maybe<Scalars['String']>
  bodyRaw?: Maybe<Scalars['JSON']>
  quizBlock?: Maybe<QuizBlock>
  quizProductTypes?: Maybe<Array<Maybe<QuizProductType>>>
  quizStyles?: Maybe<Array<Maybe<Scalars['String']>>>
  experience?: Maybe<Experience>
  examples?: Maybe<CustomizeExamples>
  seo?: Maybe<Seo>
}

export interface CustomizeExamples {
  __typename: 'CustomizeExamples'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  links?: Maybe<Array<Maybe<ImageTextBlock>>>
}

export type CustomizeExamplesFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  subtitle?: Maybe<StringFilter>
}

export type CustomizeExamplesSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  subtitle?: Maybe<SortOrder>
}

export type CustomizeFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  hero?: Maybe<HeroFilter>
  subtitle?: Maybe<StringFilter>
  quizBlock?: Maybe<QuizBlockFilter>
  experience?: Maybe<ExperienceFilter>
  examples?: Maybe<CustomizeExamplesFilter>
  seo?: Maybe<SeoFilter>
}

export type CustomizeSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  hero?: Maybe<HeroSorting>
  subtitle?: Maybe<SortOrder>
  quizBlock?: Maybe<QuizBlockSorting>
  experience?: Maybe<ExperienceSorting>
  examples?: Maybe<CustomizeExamplesSorting>
  seo?: Maybe<SeoSorting>
}

export type DateFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Date']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Date']>
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['Date']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['Date']>
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['Date']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['Date']>
}

export type DatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['DateTime']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['DateTime']>
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['DateTime']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['DateTime']>
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['DateTime']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['DateTime']>
}

export interface Directory extends Document {
  __typename: 'Directory'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  slug?: Maybe<Slug>
  hero?: Maybe<Hero>
  introText?: Maybe<Scalars['String']>
  pageLinks?: Maybe<Array<Maybe<PageLink>>>
  seo?: Maybe<Seo>
}

export type DirectoryFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  hero?: Maybe<HeroFilter>
  introText?: Maybe<StringFilter>
  seo?: Maybe<SeoFilter>
}

export type DirectorySorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  slug?: Maybe<SlugSorting>
  hero?: Maybe<HeroSorting>
  introText?: Maybe<SortOrder>
  seo?: Maybe<SeoSorting>
}

/** A Sanity document */
export type Document = {
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
}

export type DocumentFilter = {
  /** All documents referencing the given document ID. */
  references?: Maybe<Scalars['ID']>
  /** All documents that are drafts. */
  is_draft?: Maybe<Scalars['Boolean']>
}

export interface EmbedBlock {
  __typename: 'EmbedBlock'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** Descriptive title (for internal purposes) */
  title?: Maybe<Scalars['String']>
  /** https://meetings.hubspot.com/MEETING_SLUG */
  url?: Maybe<Scalars['String']>
  layout?: Maybe<Scalars['String']>
}

export type EmbedBlockFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  layout?: Maybe<StringFilter>
}

export type EmbedBlockSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  url?: Maybe<SortOrder>
  layout?: Maybe<SortOrder>
}

export interface Experience {
  __typename: 'Experience'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  blocks?: Maybe<Array<Maybe<ExperienceBlock>>>
}

export interface ExperienceBlock {
  __typename: 'ExperienceBlock'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  illustration?: Maybe<RichImage>
  heading?: Maybe<Scalars['String']>
  body?: Maybe<Scalars['String']>
}

export type ExperienceBlockFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  illustration?: Maybe<RichImageFilter>
  heading?: Maybe<StringFilter>
  body?: Maybe<StringFilter>
}

export type ExperienceBlockSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  illustration?: Maybe<RichImageSorting>
  heading?: Maybe<SortOrder>
  body?: Maybe<SortOrder>
}

export type ExperienceFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  subtitle?: Maybe<StringFilter>
}

export type ExperienceSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  subtitle?: Maybe<SortOrder>
}

export interface ExternalLink {
  __typename: 'ExternalLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  newTab?: Maybe<Scalars['Boolean']>
}

export type ExternalLinkFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  newTab?: Maybe<BooleanFilter>
}

export type ExternalLinkOrInternalLink = ExternalLink | InternalLink

export type ExternalLinkOrInternalLinkOrPdfLink =
  | ExternalLink
  | InternalLink
  | PdfLink

export type ExternalLinkSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  url?: Maybe<SortOrder>
  newTab?: Maybe<SortOrder>
}

export interface File {
  __typename: 'File'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  asset?: Maybe<SanityFileAsset>
}

export type FileFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  asset?: Maybe<SanityFileAssetFilter>
}

export type FileSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface Filter {
  __typename: 'Filter'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  matches?: Maybe<Array<Maybe<FilterMatch>>>
}

export type FilterFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
}

export interface FilterMatch {
  __typename: 'FilterMatch'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  match?: Maybe<Scalars['String']>
}

export type FilterMatchFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  type?: Maybe<StringFilter>
  match?: Maybe<StringFilter>
}

export type FilterMatchSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  type?: Maybe<SortOrder>
  match?: Maybe<SortOrder>
}

export interface FilterSet {
  __typename: 'FilterSet'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  heading?: Maybe<Scalars['String']>
  filters?: Maybe<Array<Maybe<Filter>>>
  /** If selected, this filter will not appear on collection page filters */
  searchOnly?: Maybe<Scalars['Boolean']>
}

export type FilterSetFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  heading?: Maybe<StringFilter>
  searchOnly?: Maybe<BooleanFilter>
}

export type FilterSetOrInventoryFilterOrPriceRangeFilter =
  | FilterSet
  | InventoryFilter
  | PriceRangeFilter

export type FilterSetSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  heading?: Maybe<SortOrder>
  searchOnly?: Maybe<SortOrder>
}

export type FilterSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
}

export type FloatFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Float']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Float']>
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['Float']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['Float']>
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['Float']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['Float']>
}

export interface Form {
  __typename: 'Form'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  formType?: Maybe<Scalars['String']>
}

export type FormFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  formType?: Maybe<StringFilter>
}

export type FormSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  formType?: Maybe<SortOrder>
}

export interface Geopoint {
  __typename: 'Geopoint'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  lat?: Maybe<Scalars['Float']>
  lng?: Maybe<Scalars['Float']>
  alt?: Maybe<Scalars['Float']>
}

export type GeopointFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  lat?: Maybe<FloatFilter>
  lng?: Maybe<FloatFilter>
  alt?: Maybe<FloatFilter>
}

export type GeopointSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  lat?: Maybe<SortOrder>
  lng?: Maybe<SortOrder>
  alt?: Maybe<SortOrder>
}

export interface Hero {
  __typename: 'Hero'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  heroLink?: Maybe<InternalLink>
  bodyRaw?: Maybe<Scalars['JSON']>
  body_mobileRaw?: Maybe<Scalars['JSON']>
  cta?: Maybe<Array<Maybe<Cta>>>
  aspectRatio?: Maybe<Scalars['Float']>
  /** Limit the size of the text container. (Default: Full Width) */
  textContainer?: Maybe<Scalars['String']>
  textPosition?: Maybe<Scalars['String']>
  textPositionMobile?: Maybe<Scalars['String']>
  textColor?: Maybe<Scalars['String']>
  textColorMobile?: Maybe<Scalars['String']>
  backgroundColor?: Maybe<Scalars['String']>
  mobileBackgroundColor?: Maybe<Scalars['String']>
  cloudinaryVideo?: Maybe<CloudinaryVideo>
  cloudinaryVideoMobile?: Maybe<CloudinaryVideo>
  image?: Maybe<RichImage>
  mobileImage?: Maybe<RichImage>
}

export type HeroFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  heroLink?: Maybe<InternalLinkFilter>
  aspectRatio?: Maybe<FloatFilter>
  textContainer?: Maybe<StringFilter>
  textPosition?: Maybe<StringFilter>
  textPositionMobile?: Maybe<StringFilter>
  textColor?: Maybe<StringFilter>
  textColorMobile?: Maybe<StringFilter>
  backgroundColor?: Maybe<StringFilter>
  mobileBackgroundColor?: Maybe<StringFilter>
  cloudinaryVideo?: Maybe<CloudinaryVideoFilter>
  cloudinaryVideoMobile?: Maybe<CloudinaryVideoFilter>
  image?: Maybe<RichImageFilter>
  mobileImage?: Maybe<RichImageFilter>
}

export type HeroSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  heroLink?: Maybe<InternalLinkSorting>
  aspectRatio?: Maybe<SortOrder>
  textContainer?: Maybe<SortOrder>
  textPosition?: Maybe<SortOrder>
  textPositionMobile?: Maybe<SortOrder>
  textColor?: Maybe<SortOrder>
  textColorMobile?: Maybe<SortOrder>
  backgroundColor?: Maybe<SortOrder>
  mobileBackgroundColor?: Maybe<SortOrder>
  cloudinaryVideo?: Maybe<CloudinaryVideoSorting>
  cloudinaryVideoMobile?: Maybe<CloudinaryVideoSorting>
  image?: Maybe<RichImageSorting>
  mobileImage?: Maybe<RichImageSorting>
}

export interface Homepage extends Document {
  __typename: 'Homepage'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  content?: Maybe<Array<Maybe<CarouselOrHeroOrImageTextBlock>>>
  /** Text color for the header/nav overlay above first block on homepage. */
  header_color?: Maybe<Scalars['String']>
  seo?: Maybe<Seo>
}

export type HomepageFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  header_color?: Maybe<StringFilter>
  seo?: Maybe<SeoFilter>
}

export type HomepageSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  header_color?: Maybe<SortOrder>
  seo?: Maybe<SeoSorting>
}

export type IdFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['ID']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['ID']>
  /** Checks if the value matches the given word/words. */
  matches?: Maybe<Scalars['ID']>
  in?: Maybe<Array<Scalars['ID']>>
  nin?: Maybe<Array<Scalars['ID']>>
}

export interface Image {
  __typename: 'Image'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  asset?: Maybe<SanityImageAsset>
  hotspot?: Maybe<SanityImageHotspot>
  crop?: Maybe<SanityImageCrop>
}

export type ImageFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  asset?: Maybe<SanityImageAssetFilter>
  hotspot?: Maybe<SanityImageHotspotFilter>
  crop?: Maybe<SanityImageCropFilter>
}

export type ImageSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  hotspot?: Maybe<SanityImageHotspotSorting>
  crop?: Maybe<SanityImageCropSorting>
}

export interface ImageTextBlock {
  __typename: 'ImageTextBlock'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  bodyRaw?: Maybe<Scalars['JSON']>
  body_mobileRaw?: Maybe<Scalars['JSON']>
  ctaText?: Maybe<Scalars['String']>
  link?: Maybe<Array<Maybe<ExternalLinkOrInternalLinkOrPdfLink>>>
  textPosition?: Maybe<Scalars['String']>
  textColor?: Maybe<Scalars['String']>
  layout?: Maybe<Scalars['String']>
  cloudinaryVideo?: Maybe<CloudinaryVideo>
  backgroundImage?: Maybe<RichImage>
  backgroundColor?: Maybe<Scalars['String']>
  hoverImage?: Maybe<RichImage>
}

export type ImageTextBlockFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  ctaText?: Maybe<StringFilter>
  textPosition?: Maybe<StringFilter>
  textColor?: Maybe<StringFilter>
  layout?: Maybe<StringFilter>
  cloudinaryVideo?: Maybe<CloudinaryVideoFilter>
  backgroundImage?: Maybe<RichImageFilter>
  backgroundColor?: Maybe<StringFilter>
  hoverImage?: Maybe<RichImageFilter>
}

export type ImageTextBlockSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  ctaText?: Maybe<SortOrder>
  textPosition?: Maybe<SortOrder>
  textColor?: Maybe<SortOrder>
  layout?: Maybe<SortOrder>
  cloudinaryVideo?: Maybe<CloudinaryVideoSorting>
  backgroundImage?: Maybe<RichImageSorting>
  backgroundColor?: Maybe<SortOrder>
  hoverImage?: Maybe<RichImageSorting>
}

export interface InitialVariantSelection {
  __typename: 'InitialVariantSelection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** Select a collection to override the default product variant */
  selectedCollection?: Maybe<ShopifyCollection>
  /** Enter initial variant Title with exact capitalization and punctuation. */
  selectedVariant?: Maybe<Scalars['String']>
}

export type InitialVariantSelectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  selectedCollection?: Maybe<ShopifyCollectionFilter>
  selectedVariant?: Maybe<StringFilter>
}

export type InitialVariantSelectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  selectedVariant?: Maybe<SortOrder>
}

export interface InternalLink {
  __typename: 'InternalLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  document?: Maybe<AboutOrContactOrCustomizeOrJournalEntryOrJournalPageOrMagazineOrPageOrShopifyCollectionOrShopifyProductOrTeamPage>
}

export type InternalLinkFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type InternalLinkSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export type IntFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['Int']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['Int']>
  /** Checks if the value is greater than the given input. */
  gt?: Maybe<Scalars['Int']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: Maybe<Scalars['Int']>
  /** Checks if the value is lesser than the given input. */
  lt?: Maybe<Scalars['Int']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: Maybe<Scalars['Int']>
}

export interface InventoryFilter {
  __typename: 'InventoryFilter'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
}

export type InventoryFilterFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
}

export type InventoryFilterSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
}

export interface JournalEntry extends Document {
  __typename: 'JournalEntry'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  publishDate?: Maybe<Scalars['Date']>
  hero?: Maybe<Hero>
  title?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  slug?: Maybe<Slug>
  thumbnail?: Maybe<RichImage>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  bodyRaw?: Maybe<Scalars['JSON']>
  seo?: Maybe<Seo>
}

export type JournalEntryFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  publishDate?: Maybe<DateFilter>
  hero?: Maybe<HeroFilter>
  title?: Maybe<StringFilter>
  subtitle?: Maybe<StringFilter>
  slug?: Maybe<SlugFilter>
  thumbnail?: Maybe<RichImageFilter>
  seo?: Maybe<SeoFilter>
}

export type JournalEntrySorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  publishDate?: Maybe<SortOrder>
  hero?: Maybe<HeroSorting>
  title?: Maybe<SortOrder>
  subtitle?: Maybe<SortOrder>
  slug?: Maybe<SlugSorting>
  thumbnail?: Maybe<RichImageSorting>
  seo?: Maybe<SeoSorting>
}

export interface JournalPage extends Document {
  __typename: 'JournalPage'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  seo?: Maybe<Seo>
}

export type JournalPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  seo?: Maybe<SeoFilter>
}

export type JournalPageSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  seo?: Maybe<SeoSorting>
}

export interface Link {
  __typename: 'Link'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  href?: Maybe<Scalars['String']>
}

export type LinkFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  href?: Maybe<StringFilter>
}

export type LinkSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  href?: Maybe<SortOrder>
}

export interface Magazine extends Document {
  __typename: 'Magazine'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  descriptionRaw?: Maybe<Scalars['JSON']>
  coverImage?: Maybe<RichImage>
  successMessage?: Maybe<Scalars['String']>
  seo?: Maybe<Seo>
}

export type MagazineFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  coverImage?: Maybe<RichImageFilter>
  successMessage?: Maybe<StringFilter>
  seo?: Maybe<SeoFilter>
}

export type MagazineSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  coverImage?: Maybe<RichImageSorting>
  successMessage?: Maybe<SortOrder>
  seo?: Maybe<SeoSorting>
}

export interface MediaTag extends Document {
  __typename: 'MediaTag'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  name?: Maybe<Slug>
}

export type MediaTagFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  name?: Maybe<SlugFilter>
}

export type MediaTagSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  name?: Maybe<SlugSorting>
}

export interface Menu extends Document {
  __typename: 'Menu'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  menuItems?: Maybe<Array<Maybe<MenuLinkOrSubMenu>>>
  footerMenuItems?: Maybe<Array<Maybe<MenuLink>>>
}

export type MenuFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
}

export interface MenuLink {
  __typename: 'MenuLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  link?: Maybe<InternalLink>
}

export type MenuLinkFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
  link?: Maybe<InternalLinkFilter>
}

export type MenuLinkOrSubMenu = MenuLink | SubMenu

export type MenuLinkSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
  link?: Maybe<InternalLinkSorting>
}

export type MenuSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
}

export interface Page extends Document {
  __typename: 'Page'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  hideTitle?: Maybe<Scalars['Boolean']>
  hero?: Maybe<Hero>
  content?: Maybe<Array<Maybe<CarouselOrEmbedBlockOrImageTextBlockOrTextBlock>>>
  /** When on, padding above and below the content blocks will be removed */
  fullWidth?: Maybe<Scalars['Boolean']>
  slug?: Maybe<Slug>
  bodyRaw?: Maybe<Scalars['JSON']>
  seo?: Maybe<Seo>
}

export type PageFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  subtitle?: Maybe<StringFilter>
  hideTitle?: Maybe<BooleanFilter>
  hero?: Maybe<HeroFilter>
  fullWidth?: Maybe<BooleanFilter>
  slug?: Maybe<SlugFilter>
  seo?: Maybe<SeoFilter>
}

export interface PageInfo {
  __typename: 'PageInfo'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  hasNextPage?: Maybe<Scalars['Boolean']>
  hasPreviousPage?: Maybe<Scalars['Boolean']>
}

export type PageInfoFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  hasNextPage?: Maybe<BooleanFilter>
  hasPreviousPage?: Maybe<BooleanFilter>
}

export type PageInfoSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  hasNextPage?: Maybe<SortOrder>
  hasPreviousPage?: Maybe<SortOrder>
}

export interface PageLink {
  __typename: 'PageLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  linkedPage?: Maybe<AboutOrContactOrCustomizeOrJournalEntryOrJournalPageOrMagazineOrPageOrShopifyCollectionOrShopifyProductOrTeamPage>
  image?: Maybe<RichImage>
  /** Optional. By default the linked page title will be used. */
  title?: Maybe<Scalars['String']>
  summary?: Maybe<Scalars['String']>
  /** Optional. Defaults to "Learn more" */
  ctaText?: Maybe<Scalars['String']>
}

export type PageLinkFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  image?: Maybe<RichImageFilter>
  title?: Maybe<StringFilter>
  summary?: Maybe<StringFilter>
  ctaText?: Maybe<StringFilter>
}

export type PageLinkSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  image?: Maybe<RichImageSorting>
  title?: Maybe<SortOrder>
  summary?: Maybe<SortOrder>
  ctaText?: Maybe<SortOrder>
}

export type PageOrShopifyCollectionOrShopifyProduct =
  | Page
  | ShopifyCollection
  | ShopifyProduct

export type PageSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  subtitle?: Maybe<SortOrder>
  hideTitle?: Maybe<SortOrder>
  hero?: Maybe<HeroSorting>
  fullWidth?: Maybe<SortOrder>
  slug?: Maybe<SlugSorting>
  seo?: Maybe<SeoSorting>
}

export interface PdfLink {
  __typename: 'PdfLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  pdf?: Maybe<File>
}

export type PdfLinkFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  pdf?: Maybe<FileFilter>
}

export type PdfLinkSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  pdf?: Maybe<FileSorting>
}

export interface PriceRangeFilter {
  __typename: 'PriceRangeFilter'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  minPrice?: Maybe<Scalars['Float']>
  maxPrice?: Maybe<Scalars['Float']>
}

export type PriceRangeFilterFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  minPrice?: Maybe<FloatFilter>
  maxPrice?: Maybe<FloatFilter>
}

export type PriceRangeFilterSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  minPrice?: Maybe<SortOrder>
  maxPrice?: Maybe<SortOrder>
}

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
  /** Tag to match from Shopify. */
  tag?: Maybe<Scalars['String']>
  info?: Maybe<Array<Maybe<ProductInfo>>>
}

export type ProductInfoByTagFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  tag?: Maybe<StringFilter>
}

export type ProductInfoByTagSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  tag?: Maybe<SortOrder>
}

export interface ProductInfoByType {
  __typename: 'ProductInfoByType'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** Type to match from Shopify. */
  type?: Maybe<Scalars['String']>
  info?: Maybe<Array<Maybe<ProductInfo>>>
}

export type ProductInfoByTypeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  type?: Maybe<StringFilter>
}

export type ProductInfoByTypeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  type?: Maybe<SortOrder>
}

export type ProductInfoFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
}

export interface ProductInfoSettings extends Document {
  __typename: 'ProductInfoSettings'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  /**
   * Use these fields to add snippets of descriptions to all or some projects. For
   * instance, you could add a 'Shipping and Returns' accordion on all items, a
   * 'Ring Sizing Guide' accordion to all Rings, and an 'About Black Gold'
   * accordion to any product tagged with 'Black Gold'. These accordions will be
   * displayed in accordion-dropdowns below the main product information. You can
   * also add info accordions to individual items on their page here in the CMS.
   */
  helpText?: Maybe<Scalars['String']>
  globalInfo?: Maybe<Array<Maybe<ProductInfo>>>
  infoByType?: Maybe<Array<Maybe<ProductInfoByType>>>
  infoByTag?: Maybe<Array<Maybe<ProductInfoByTag>>>
  tagBadges?: Maybe<Array<Maybe<TagBadge>>>
}

export type ProductInfoSettingsFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  helpText?: Maybe<StringFilter>
}

export type ProductInfoSettingsSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  helpText?: Maybe<SortOrder>
}

export type ProductInfoSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
}

export interface ProductListingSettings extends Document {
  __typename: 'ProductListingSettings'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  /**
   * Use these fields to define a default set of filters to be used on collection
   * pages and in search results. You can add specific filter configuration to each
   * Collection within their own documents.
   */
  helpText?: Maybe<Scalars['String']>
  defaultFilter?: Maybe<
    Array<Maybe<FilterSetOrInventoryFilterOrPriceRangeFilter>>
  >
  newDefaultFilter?: Maybe<
    Array<Maybe<FilterSetOrInventoryFilterOrPriceRangeFilter>>
  >
}

export type ProductListingSettingsFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  helpText?: Maybe<StringFilter>
}

export type ProductListingSettingsSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  helpText?: Maybe<SortOrder>
}

export interface QuizBlock {
  __typename: 'QuizBlock'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  image?: Maybe<RichImage>
}

export type QuizBlockFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  subtitle?: Maybe<StringFilter>
  image?: Maybe<RichImageFilter>
}

export type QuizBlockSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  subtitle?: Maybe<SortOrder>
  image?: Maybe<RichImageSorting>
}

export interface QuizProductType {
  __typename: 'QuizProductType'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  image?: Maybe<RichImage>
}

export type QuizProductTypeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  image?: Maybe<RichImageFilter>
}

export type QuizProductTypeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  image?: Maybe<RichImageSorting>
}

export interface RichImage {
  __typename: 'RichImage'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  asset?: Maybe<SanityImageAsset>
  hotspot?: Maybe<SanityImageHotspot>
  crop?: Maybe<SanityImageCrop>
  caption?: Maybe<Scalars['String']>
  /** A short description of the image. Helps with accessibility and SEO */
  altText?: Maybe<Scalars['String']>
}

export type RichImageFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  asset?: Maybe<SanityImageAssetFilter>
  hotspot?: Maybe<SanityImageHotspotFilter>
  crop?: Maybe<SanityImageCropFilter>
  caption?: Maybe<StringFilter>
  altText?: Maybe<StringFilter>
}

export type RichImageSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  hotspot?: Maybe<SanityImageHotspotSorting>
  crop?: Maybe<SanityImageCropSorting>
  caption?: Maybe<SortOrder>
  altText?: Maybe<SortOrder>
}

export interface RichPageLink {
  __typename: 'RichPageLink'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  document?: Maybe<PageOrShopifyCollectionOrShopifyProduct>
  /** If left empty, the title of the linked page, product, or collection will be used. */
  title?: Maybe<Scalars['String']>
  captionRaw?: Maybe<Scalars['JSON']>
  image?: Maybe<RichImage>
  hoverImage?: Maybe<RichImage>
}

export type RichPageLinkFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  image?: Maybe<RichImageFilter>
  hoverImage?: Maybe<RichImageFilter>
}

export type RichPageLinkSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  image?: Maybe<RichImageSorting>
  hoverImage?: Maybe<RichImageSorting>
}

export interface RootQuery {
  __typename: 'RootQuery'
  Document?: Maybe<Document>
  MediaTag?: Maybe<MediaTag>
  Directory?: Maybe<Directory>
  About?: Maybe<About>
  TeamPage?: Maybe<TeamPage>
  ProductListingSettings?: Maybe<ProductListingSettings>
  SiteSettings?: Maybe<SiteSettings>
  JournalEntry?: Maybe<JournalEntry>
  JournalPage?: Maybe<JournalPage>
  Menu?: Maybe<Menu>
  Homepage?: Maybe<Homepage>
  Page?: Maybe<Page>
  ProductInfoSettings?: Maybe<ProductInfoSettings>
  Magazine?: Maybe<Magazine>
  Contact?: Maybe<Contact>
  Customize?: Maybe<Customize>
  ShopifyProduct?: Maybe<ShopifyProduct>
  ShopifyCollection?: Maybe<ShopifyCollection>
  SanityImageAsset?: Maybe<SanityImageAsset>
  SanityFileAsset?: Maybe<SanityFileAsset>
  allMediaTag: Array<MediaTag>
  allDirectory: Array<Directory>
  allAbout: Array<About>
  allTeamPage: Array<TeamPage>
  allProductListingSettings: Array<ProductListingSettings>
  allSiteSettings: Array<SiteSettings>
  allJournalEntry: Array<JournalEntry>
  allJournalPage: Array<JournalPage>
  allMenu: Array<Menu>
  allHomepage: Array<Homepage>
  allPage: Array<Page>
  allProductInfoSettings: Array<ProductInfoSettings>
  allMagazine: Array<Magazine>
  allContact: Array<Contact>
  allCustomize: Array<Customize>
  allShopifyProduct: Array<ShopifyProduct>
  allShopifyCollection: Array<ShopifyCollection>
  allSanityImageAsset: Array<SanityImageAsset>
  allSanityFileAsset: Array<SanityFileAsset>
}

export type RootQueryDocumentArgs = {
  id: Scalars['ID']
}

export type RootQueryMediaTagArgs = {
  id: Scalars['ID']
}

export type RootQueryDirectoryArgs = {
  id: Scalars['ID']
}

export type RootQueryAboutArgs = {
  id: Scalars['ID']
}

export type RootQueryTeamPageArgs = {
  id: Scalars['ID']
}

export type RootQueryProductListingSettingsArgs = {
  id: Scalars['ID']
}

export type RootQuerySiteSettingsArgs = {
  id: Scalars['ID']
}

export type RootQueryJournalEntryArgs = {
  id: Scalars['ID']
}

export type RootQueryJournalPageArgs = {
  id: Scalars['ID']
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

export type RootQueryMagazineArgs = {
  id: Scalars['ID']
}

export type RootQueryContactArgs = {
  id: Scalars['ID']
}

export type RootQueryCustomizeArgs = {
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

export type RootQueryAllMediaTagArgs = {
  where?: Maybe<MediaTagFilter>
  sort?: Maybe<Array<MediaTagSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllDirectoryArgs = {
  where?: Maybe<DirectoryFilter>
  sort?: Maybe<Array<DirectorySorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllAboutArgs = {
  where?: Maybe<AboutFilter>
  sort?: Maybe<Array<AboutSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllTeamPageArgs = {
  where?: Maybe<TeamPageFilter>
  sort?: Maybe<Array<TeamPageSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllProductListingSettingsArgs = {
  where?: Maybe<ProductListingSettingsFilter>
  sort?: Maybe<Array<ProductListingSettingsSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllSiteSettingsArgs = {
  where?: Maybe<SiteSettingsFilter>
  sort?: Maybe<Array<SiteSettingsSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllJournalEntryArgs = {
  where?: Maybe<JournalEntryFilter>
  sort?: Maybe<Array<JournalEntrySorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllJournalPageArgs = {
  where?: Maybe<JournalPageFilter>
  sort?: Maybe<Array<JournalPageSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllMenuArgs = {
  where?: Maybe<MenuFilter>
  sort?: Maybe<Array<MenuSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllHomepageArgs = {
  where?: Maybe<HomepageFilter>
  sort?: Maybe<Array<HomepageSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllPageArgs = {
  where?: Maybe<PageFilter>
  sort?: Maybe<Array<PageSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllProductInfoSettingsArgs = {
  where?: Maybe<ProductInfoSettingsFilter>
  sort?: Maybe<Array<ProductInfoSettingsSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllMagazineArgs = {
  where?: Maybe<MagazineFilter>
  sort?: Maybe<Array<MagazineSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllContactArgs = {
  where?: Maybe<ContactFilter>
  sort?: Maybe<Array<ContactSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllCustomizeArgs = {
  where?: Maybe<CustomizeFilter>
  sort?: Maybe<Array<CustomizeSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllShopifyProductArgs = {
  where?: Maybe<ShopifyProductFilter>
  sort?: Maybe<Array<ShopifyProductSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllShopifyCollectionArgs = {
  where?: Maybe<ShopifyCollectionFilter>
  sort?: Maybe<Array<ShopifyCollectionSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllSanityImageAssetArgs = {
  where?: Maybe<SanityImageAssetFilter>
  sort?: Maybe<Array<SanityImageAssetSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type RootQueryAllSanityFileAssetArgs = {
  where?: Maybe<SanityFileAssetFilter>
  sort?: Maybe<Array<SanityFileAssetSorting>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export interface SanityAssetSourceData {
  __typename: 'SanityAssetSourceData'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** A canonical name for the source this asset is originating from */
  name?: Maybe<Scalars['String']>
  /** The unique ID for the asset within the originating source so you can programatically find back to it */
  id?: Maybe<Scalars['String']>
  /** A URL to find more information about this asset in the originating source */
  url?: Maybe<Scalars['String']>
}

export type SanityAssetSourceDataFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
}

export type SanityAssetSourceDataSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
  url?: Maybe<SortOrder>
}

export interface SanityFileAsset extends Document {
  __typename: 'SanityFileAsset'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  originalFilename?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  altText?: Maybe<Scalars['String']>
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
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  originalFilename?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<StringFilter>
  altText?: Maybe<StringFilter>
  sha1hash?: Maybe<StringFilter>
  extension?: Maybe<StringFilter>
  mimeType?: Maybe<StringFilter>
  size?: Maybe<FloatFilter>
  assetId?: Maybe<StringFilter>
  path?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  source?: Maybe<SanityAssetSourceDataFilter>
}

export type SanityFileAssetSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  originalFilename?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
  altText?: Maybe<SortOrder>
  sha1hash?: Maybe<SortOrder>
  extension?: Maybe<SortOrder>
  mimeType?: Maybe<SortOrder>
  size?: Maybe<SortOrder>
  assetId?: Maybe<SortOrder>
  path?: Maybe<SortOrder>
  url?: Maybe<SortOrder>
  source?: Maybe<SanityAssetSourceDataSorting>
}

export interface SanityImageAsset extends Document {
  __typename: 'SanityImageAsset'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  originalFilename?: Maybe<Scalars['String']>
  label?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  altText?: Maybe<Scalars['String']>
  sha1hash?: Maybe<Scalars['String']>
  extension?: Maybe<Scalars['String']>
  mimeType?: Maybe<Scalars['String']>
  size?: Maybe<Scalars['Float']>
  assetId?: Maybe<Scalars['String']>
  uploadId?: Maybe<Scalars['String']>
  path?: Maybe<Scalars['String']>
  url?: Maybe<Scalars['String']>
  metadata?: Maybe<SanityImageMetadata>
  source?: Maybe<SanityAssetSourceData>
}

export type SanityImageAssetFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  originalFilename?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  description?: Maybe<StringFilter>
  altText?: Maybe<StringFilter>
  sha1hash?: Maybe<StringFilter>
  extension?: Maybe<StringFilter>
  mimeType?: Maybe<StringFilter>
  size?: Maybe<FloatFilter>
  assetId?: Maybe<StringFilter>
  uploadId?: Maybe<StringFilter>
  path?: Maybe<StringFilter>
  url?: Maybe<StringFilter>
  metadata?: Maybe<SanityImageMetadataFilter>
  source?: Maybe<SanityAssetSourceDataFilter>
}

export type SanityImageAssetSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  originalFilename?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
  altText?: Maybe<SortOrder>
  sha1hash?: Maybe<SortOrder>
  extension?: Maybe<SortOrder>
  mimeType?: Maybe<SortOrder>
  size?: Maybe<SortOrder>
  assetId?: Maybe<SortOrder>
  uploadId?: Maybe<SortOrder>
  path?: Maybe<SortOrder>
  url?: Maybe<SortOrder>
  metadata?: Maybe<SanityImageMetadataSorting>
  source?: Maybe<SanityAssetSourceDataSorting>
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

export type SanityImageCropFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  top?: Maybe<FloatFilter>
  bottom?: Maybe<FloatFilter>
  left?: Maybe<FloatFilter>
  right?: Maybe<FloatFilter>
}

export type SanityImageCropSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  top?: Maybe<SortOrder>
  bottom?: Maybe<SortOrder>
  left?: Maybe<SortOrder>
  right?: Maybe<SortOrder>
}

export interface SanityImageDimensions {
  __typename: 'SanityImageDimensions'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  height?: Maybe<Scalars['Float']>
  width?: Maybe<Scalars['Float']>
  aspectRatio?: Maybe<Scalars['Float']>
}

export type SanityImageDimensionsFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  height?: Maybe<FloatFilter>
  width?: Maybe<FloatFilter>
  aspectRatio?: Maybe<FloatFilter>
}

export type SanityImageDimensionsSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  height?: Maybe<SortOrder>
  width?: Maybe<SortOrder>
  aspectRatio?: Maybe<SortOrder>
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

export type SanityImageHotspotFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  x?: Maybe<FloatFilter>
  y?: Maybe<FloatFilter>
  height?: Maybe<FloatFilter>
  width?: Maybe<FloatFilter>
}

export type SanityImageHotspotSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  x?: Maybe<SortOrder>
  y?: Maybe<SortOrder>
  height?: Maybe<SortOrder>
  width?: Maybe<SortOrder>
}

export interface SanityImageMetadata {
  __typename: 'SanityImageMetadata'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  location?: Maybe<Geopoint>
  dimensions?: Maybe<SanityImageDimensions>
  palette?: Maybe<SanityImagePalette>
  lqip?: Maybe<Scalars['String']>
  blurHash?: Maybe<Scalars['String']>
  hasAlpha?: Maybe<Scalars['Boolean']>
  isOpaque?: Maybe<Scalars['Boolean']>
}

export type SanityImageMetadataFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  location?: Maybe<GeopointFilter>
  dimensions?: Maybe<SanityImageDimensionsFilter>
  palette?: Maybe<SanityImagePaletteFilter>
  lqip?: Maybe<StringFilter>
  blurHash?: Maybe<StringFilter>
  hasAlpha?: Maybe<BooleanFilter>
  isOpaque?: Maybe<BooleanFilter>
}

export type SanityImageMetadataSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  location?: Maybe<GeopointSorting>
  dimensions?: Maybe<SanityImageDimensionsSorting>
  palette?: Maybe<SanityImagePaletteSorting>
  lqip?: Maybe<SortOrder>
  blurHash?: Maybe<SortOrder>
  hasAlpha?: Maybe<SortOrder>
  isOpaque?: Maybe<SortOrder>
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

export type SanityImagePaletteFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  darkMuted?: Maybe<SanityImagePaletteSwatchFilter>
  lightVibrant?: Maybe<SanityImagePaletteSwatchFilter>
  darkVibrant?: Maybe<SanityImagePaletteSwatchFilter>
  vibrant?: Maybe<SanityImagePaletteSwatchFilter>
  dominant?: Maybe<SanityImagePaletteSwatchFilter>
  lightMuted?: Maybe<SanityImagePaletteSwatchFilter>
  muted?: Maybe<SanityImagePaletteSwatchFilter>
}

export type SanityImagePaletteSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  darkMuted?: Maybe<SanityImagePaletteSwatchSorting>
  lightVibrant?: Maybe<SanityImagePaletteSwatchSorting>
  darkVibrant?: Maybe<SanityImagePaletteSwatchSorting>
  vibrant?: Maybe<SanityImagePaletteSwatchSorting>
  dominant?: Maybe<SanityImagePaletteSwatchSorting>
  lightMuted?: Maybe<SanityImagePaletteSwatchSorting>
  muted?: Maybe<SanityImagePaletteSwatchSorting>
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

export type SanityImagePaletteSwatchFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  background?: Maybe<StringFilter>
  foreground?: Maybe<StringFilter>
  population?: Maybe<FloatFilter>
  title?: Maybe<StringFilter>
}

export type SanityImagePaletteSwatchSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  background?: Maybe<SortOrder>
  foreground?: Maybe<SortOrder>
  population?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
}

export interface Seo {
  __typename: 'Seo'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** title for the browser window */
  title?: Maybe<Scalars['String']>
  /** title for search results */
  metaTitle?: Maybe<Scalars['String']>
  /**
   * This is the description that will appear underneath the preview link when
   * shared in Facebook. It should be less than 200 characters
   */
  description?: Maybe<Scalars['String']>
  image?: Maybe<Image>
  /** Comma-separated SEO keywords */
  keywords?: Maybe<Scalars['String']>
}

export type SeoFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  metaTitle?: Maybe<StringFilter>
  description?: Maybe<StringFilter>
  image?: Maybe<ImageFilter>
  keywords?: Maybe<StringFilter>
}

export type SeoSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  metaTitle?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
  image?: Maybe<ImageSorting>
  keywords?: Maybe<SortOrder>
}

export interface ShopifyCollection extends Document {
  __typename: 'ShopifyCollection'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  shopifyId?: Maybe<Scalars['String']>
  archived?: Maybe<Scalars['Boolean']>
  sourceData?: Maybe<ShopifySourceCollection>
  products?: Maybe<Array<Maybe<ShopifyProduct>>>
  /** Toggle this to ON to hide this collection. The product will still be viewable at its URL */
  hidden?: Maybe<Scalars['Boolean']>
  /** Changes the layout to 2 columns on desktop, 1 column on tablet */
  reduceColumnCount?: Maybe<Scalars['Boolean']>
  /** Toggle this to ON to change text color to white for all products in collection. */
  lightTheme?: Maybe<Scalars['Boolean']>
  hero?: Maybe<Hero>
  collectionBlocks?: Maybe<Array<Maybe<CollectionBlock>>>
  descriptionRaw?: Maybe<Scalars['JSON']>
  preferredVariantMatches?: Maybe<Array<Maybe<Scalars['String']>>>
  /** Toggle this to ON to remove all filters from the collection view. */
  hideFilter?: Maybe<Scalars['Boolean']>
  /** Toggle this to ON to only display the custom filters you add below. */
  overrideDefaultFilter?: Maybe<Scalars['Boolean']>
  customFilter?: Maybe<
    Array<Maybe<FilterSetOrInventoryFilterOrPriceRangeFilter>>
  >
  bambuser?: Maybe<BambuserSettings>
  seo?: Maybe<Seo>
}

export type ShopifyCollectionFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  shopifyId?: Maybe<StringFilter>
  archived?: Maybe<BooleanFilter>
  sourceData?: Maybe<ShopifySourceCollectionFilter>
  hidden?: Maybe<BooleanFilter>
  reduceColumnCount?: Maybe<BooleanFilter>
  lightTheme?: Maybe<BooleanFilter>
  hero?: Maybe<HeroFilter>
  hideFilter?: Maybe<BooleanFilter>
  overrideDefaultFilter?: Maybe<BooleanFilter>
  bambuser?: Maybe<BambuserSettingsFilter>
  seo?: Maybe<SeoFilter>
}

export type ShopifyCollectionSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  shopifyId?: Maybe<SortOrder>
  archived?: Maybe<SortOrder>
  sourceData?: Maybe<ShopifySourceCollectionSorting>
  hidden?: Maybe<SortOrder>
  reduceColumnCount?: Maybe<SortOrder>
  lightTheme?: Maybe<SortOrder>
  hero?: Maybe<HeroSorting>
  hideFilter?: Maybe<SortOrder>
  overrideDefaultFilter?: Maybe<SortOrder>
  bambuser?: Maybe<BambuserSettingsSorting>
  seo?: Maybe<SeoSorting>
}

export interface ShopifyMoneyV2 {
  __typename: 'ShopifyMoneyV2'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  amount?: Maybe<Scalars['String']>
  currencyCode?: Maybe<Scalars['String']>
}

export type ShopifyMoneyV2Filter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  amount?: Maybe<StringFilter>
  currencyCode?: Maybe<StringFilter>
}

export type ShopifyMoneyV2Sorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  amount?: Maybe<SortOrder>
  currencyCode?: Maybe<SortOrder>
}

export interface ShopifyProduct extends Document {
  __typename: 'ShopifyProduct'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  shopifyId?: Maybe<Scalars['String']>
  minVariantPrice?: Maybe<Scalars['Float']>
  maxVariantPrice?: Maybe<Scalars['Float']>
  archived?: Maybe<Scalars['Boolean']>
  sourceData?: Maybe<ShopifySourceProduct>
  collections?: Maybe<Array<Maybe<ShopifyCollection>>>
  options?: Maybe<Array<Maybe<ShopifyProductOption>>>
  variants?: Maybe<Array<Maybe<ShopifyProductVariant>>>
  /** DEPRECATED: This has been split up into "Hide from Collections" and "Hide from Search" */
  hidden?: Maybe<Scalars['Boolean']>
  /** Toggle this to ON to hide this product from collection pages. The product will still be viewable at its URL */
  hideFromCollections?: Maybe<Scalars['Boolean']>
  /** Always show product in specified collection. */
  showInCollection?: Maybe<ShopifyCollection>
  initialVariantSelections?: Maybe<Array<Maybe<InitialVariantSelection>>>
  /** Toggle this to ON to hide this product from search results. The product will still be viewable at its URL */
  hideFromSearch?: Maybe<Scalars['Boolean']>
  /** Toggle this to ON to hide a product's price and show an inquiry button instead of "Add to Cart" */
  inquiryOnly?: Maybe<Scalars['Boolean']>
  info?: Maybe<Array<Maybe<ProductInfo>>>
  gallery?: Maybe<Array<Maybe<RichImage>>>
  contentAfter?: Maybe<Array<Maybe<ImageTextBlock>>>
  related?: Maybe<Carousel>
  seo?: Maybe<Seo>
}

export type ShopifyProductFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  shopifyId?: Maybe<StringFilter>
  minVariantPrice?: Maybe<FloatFilter>
  maxVariantPrice?: Maybe<FloatFilter>
  archived?: Maybe<BooleanFilter>
  sourceData?: Maybe<ShopifySourceProductFilter>
  hidden?: Maybe<BooleanFilter>
  hideFromCollections?: Maybe<BooleanFilter>
  showInCollection?: Maybe<ShopifyCollectionFilter>
  hideFromSearch?: Maybe<BooleanFilter>
  inquiryOnly?: Maybe<BooleanFilter>
  related?: Maybe<CarouselFilter>
  seo?: Maybe<SeoFilter>
}

export interface ShopifyProductOption {
  __typename: 'ShopifyProductOption'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  shopifyOptionId?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<ShopifyProductOptionValue>>>
}

export type ShopifyProductOptionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  shopifyOptionId?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
}

export type ShopifyProductOptionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  shopifyOptionId?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
}

export interface ShopifyProductOptionValue {
  __typename: 'ShopifyProductOptionValue'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
  descriptionRaw?: Maybe<Scalars['JSON']>
  swatch?: Maybe<Image>
  /** Cloudinary Video ID (looping render) */
  animation?: Maybe<Scalars['String']>
}

export type ShopifyProductOptionValueFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  value?: Maybe<StringFilter>
  swatch?: Maybe<ImageFilter>
  animation?: Maybe<StringFilter>
}

export type ShopifyProductOptionValueSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  value?: Maybe<SortOrder>
  swatch?: Maybe<ImageSorting>
  animation?: Maybe<SortOrder>
}

export type ShopifyProductSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  shopifyId?: Maybe<SortOrder>
  minVariantPrice?: Maybe<SortOrder>
  maxVariantPrice?: Maybe<SortOrder>
  archived?: Maybe<SortOrder>
  sourceData?: Maybe<ShopifySourceProductSorting>
  hidden?: Maybe<SortOrder>
  hideFromCollections?: Maybe<SortOrder>
  hideFromSearch?: Maybe<SortOrder>
  inquiryOnly?: Maybe<SortOrder>
  related?: Maybe<CarouselSorting>
  seo?: Maybe<SeoSorting>
}

export interface ShopifyProductVariant {
  __typename: 'ShopifyProductVariant'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  shopifyVariantID?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  sourceData?: Maybe<ShopifySourceProductVariant>
}

export type ShopifyProductVariantFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  shopifyVariantID?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  sourceData?: Maybe<ShopifySourceProductVariantFilter>
}

export type ShopifyProductVariantSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  shopifyVariantID?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  sourceData?: Maybe<ShopifySourceProductVariantSorting>
}

export interface ShopifySourceCollection {
  __typename: 'ShopifySourceCollection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['Date']>
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

export type ShopifySourceCollectionEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceCollectionNodeFilter>
}

export type ShopifySourceCollectionEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceCollectionNodeSorting>
}

export type ShopifySourceCollectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  updatedAt?: Maybe<DateFilter>
  handle?: Maybe<StringFilter>
  description?: Maybe<StringFilter>
  descriptionHtml?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
  image?: Maybe<ShopifySourceImageFilter>
  products?: Maybe<ShopifySourceProductsConnectionFilter>
}

export interface ShopifySourceCollectionNode {
  __typename: 'ShopifySourceCollectionNode'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export type ShopifySourceCollectionNodeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
}

export type ShopifySourceCollectionNodeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
}

export interface ShopifySourceCollectionsConnection {
  __typename: 'ShopifySourceCollectionsConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<ShopifySourceCollectionEdge>>>
}

export type ShopifySourceCollectionsConnectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  pageInfo?: Maybe<PageInfoFilter>
}

export type ShopifySourceCollectionsConnectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  pageInfo?: Maybe<PageInfoSorting>
}

export type ShopifySourceCollectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
  descriptionHtml?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
  image?: Maybe<ShopifySourceImageSorting>
  products?: Maybe<ShopifySourceProductsConnectionSorting>
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
  w1200?: Maybe<Scalars['String']>
  w1600?: Maybe<Scalars['String']>
}

export interface ShopifySourceImageEdge {
  __typename: 'ShopifySourceImageEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  key?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceImage>
}

export type ShopifySourceImageEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  key?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceImageFilter>
}

export type ShopifySourceImageEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  key?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceImageSorting>
}

export type ShopifySourceImageFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  altText?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
  originalSrc?: Maybe<StringFilter>
  w100?: Maybe<StringFilter>
  w300?: Maybe<StringFilter>
  w800?: Maybe<StringFilter>
  w1200?: Maybe<StringFilter>
  w1600?: Maybe<StringFilter>
}

export interface ShopifySourceImages {
  __typename: 'ShopifySourceImages'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  edges?: Maybe<Array<Maybe<ShopifySourceImageEdge>>>
}

export type ShopifySourceImagesFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type ShopifySourceImageSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  altText?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
  originalSrc?: Maybe<SortOrder>
  w100?: Maybe<SortOrder>
  w300?: Maybe<SortOrder>
  w800?: Maybe<SortOrder>
  w1200?: Maybe<SortOrder>
  w1600?: Maybe<SortOrder>
}

export type ShopifySourceImagesSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface ShopifySourceProduct {
  __typename: 'ShopifySourceProduct'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  availableForSale?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['Date']>
  publishedAt?: Maybe<Scalars['Date']>
  updatedAt?: Maybe<Scalars['Date']>
  compareAtPriceRange?: Maybe<ShopifySourceProductPriceRange>
  priceRange?: Maybe<ShopifySourceProductPriceRange>
  presentmentPriceRanges?: Maybe<ShopifySourceProductPresentmentPriceRangeConnection>
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

export type ShopifySourceProductEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceProductNodeFilter>
}

export type ShopifySourceProductEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceProductNodeSorting>
}

export type ShopifySourceProductFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  availableForSale?: Maybe<BooleanFilter>
  createdAt?: Maybe<DateFilter>
  publishedAt?: Maybe<DateFilter>
  updatedAt?: Maybe<DateFilter>
  compareAtPriceRange?: Maybe<ShopifySourceProductPriceRangeFilter>
  priceRange?: Maybe<ShopifySourceProductPriceRangeFilter>
  presentmentPriceRanges?: Maybe<ShopifySourceProductPresentmentPriceRangeConnectionFilter>
  productType?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  description?: Maybe<StringFilter>
  descriptionHtml?: Maybe<StringFilter>
  vendor?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
  images?: Maybe<ShopifySourceImagesFilter>
  variants?: Maybe<ShopifySourceProductVariantsConnectionFilter>
  collections?: Maybe<ShopifySourceCollectionsConnectionFilter>
}

export interface ShopifySourceProductNode {
  __typename: 'ShopifySourceProductNode'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  handle?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
}

export type ShopifySourceProductNodeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  handle?: Maybe<StringFilter>
  id?: Maybe<StringFilter>
}

export type ShopifySourceProductNodeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
}

export interface ShopifySourceProductOption {
  __typename: 'ShopifySourceProductOption'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  values?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type ShopifySourceProductOptionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
}

export type ShopifySourceProductOptionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
}

export interface ShopifySourceProductPresentmentPriceRangeConnection {
  __typename: 'ShopifySourceProductPresentmentPriceRangeConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  edges?: Maybe<Array<Maybe<ShopifySourceProductPriceRangeEdge>>>
}

export type ShopifySourceProductPresentmentPriceRangeConnectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type ShopifySourceProductPresentmentPriceRangeConnectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface ShopifySourceProductPricePresentmentEdge {
  __typename: 'ShopifySourceProductPricePresentmentEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceProductVariantPricePair>
}

export type ShopifySourceProductPricePresentmentEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceProductVariantPricePairFilter>
}

export type ShopifySourceProductPricePresentmentEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceProductVariantPricePairSorting>
}

export interface ShopifySourceProductPriceRange {
  __typename: 'ShopifySourceProductPriceRange'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  minVariantPrice?: Maybe<ShopifyMoneyV2>
  maxVariantPrice?: Maybe<ShopifyMoneyV2>
}

export interface ShopifySourceProductPriceRangeEdge {
  __typename: 'ShopifySourceProductPriceRangeEdge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  cursor?: Maybe<Scalars['String']>
  node?: Maybe<ShopifySourceProductPriceRange>
}

export type ShopifySourceProductPriceRangeEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceProductPriceRangeFilter>
}

export type ShopifySourceProductPriceRangeEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceProductPriceRangeSorting>
}

export type ShopifySourceProductPriceRangeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  minVariantPrice?: Maybe<ShopifyMoneyV2Filter>
  maxVariantPrice?: Maybe<ShopifyMoneyV2Filter>
}

export type ShopifySourceProductPriceRangeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  minVariantPrice?: Maybe<ShopifyMoneyV2Sorting>
  maxVariantPrice?: Maybe<ShopifyMoneyV2Sorting>
}

export interface ShopifySourceProductsConnection {
  __typename: 'ShopifySourceProductsConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<ShopifySourceProductEdge>>>
}

export type ShopifySourceProductsConnectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  pageInfo?: Maybe<PageInfoFilter>
}

export type ShopifySourceProductsConnectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  pageInfo?: Maybe<PageInfoSorting>
}

export type ShopifySourceProductSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  availableForSale?: Maybe<SortOrder>
  createdAt?: Maybe<SortOrder>
  publishedAt?: Maybe<SortOrder>
  updatedAt?: Maybe<SortOrder>
  compareAtPriceRange?: Maybe<ShopifySourceProductPriceRangeSorting>
  priceRange?: Maybe<ShopifySourceProductPriceRangeSorting>
  presentmentPriceRanges?: Maybe<ShopifySourceProductPresentmentPriceRangeConnectionSorting>
  productType?: Maybe<SortOrder>
  handle?: Maybe<SortOrder>
  description?: Maybe<SortOrder>
  descriptionHtml?: Maybe<SortOrder>
  vendor?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
  images?: Maybe<ShopifySourceImagesSorting>
  variants?: Maybe<ShopifySourceProductVariantsConnectionSorting>
  collections?: Maybe<ShopifySourceCollectionsConnectionSorting>
}

export interface ShopifySourceProductVariant {
  __typename: 'ShopifySourceProductVariant'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  availableForSale?: Maybe<Scalars['Boolean']>
  currentlyNotInStock?: Maybe<Scalars['Boolean']>
  id?: Maybe<Scalars['String']>
  image?: Maybe<ShopifySourceImage>
  priceV2?: Maybe<ShopifyMoneyV2>
  compareAtPriceV2?: Maybe<ShopifyMoneyV2>
  selectedOptions?: Maybe<Array<Maybe<ShopifySourceSelectedOption>>>
  requiresShipping?: Maybe<Scalars['Boolean']>
  sku?: Maybe<Scalars['String']>
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

export type ShopifySourceProductVariantEdgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  cursor?: Maybe<StringFilter>
  node?: Maybe<ShopifySourceProductVariantFilter>
}

export type ShopifySourceProductVariantEdgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  cursor?: Maybe<SortOrder>
  node?: Maybe<ShopifySourceProductVariantSorting>
}

export type ShopifySourceProductVariantFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  availableForSale?: Maybe<BooleanFilter>
  currentlyNotInStock?: Maybe<BooleanFilter>
  id?: Maybe<StringFilter>
  image?: Maybe<ShopifySourceImageFilter>
  priceV2?: Maybe<ShopifyMoneyV2Filter>
  compareAtPriceV2?: Maybe<ShopifyMoneyV2Filter>
  requiresShipping?: Maybe<BooleanFilter>
  sku?: Maybe<StringFilter>
  weight?: Maybe<FloatFilter>
  weightUnit?: Maybe<StringFilter>
}

export interface ShopifySourceProductVariantPricePair {
  __typename: 'ShopifySourceProductVariantPricePair'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  compareAtPrice?: Maybe<ShopifyMoneyV2>
  price?: Maybe<ShopifyMoneyV2>
}

export type ShopifySourceProductVariantPricePairFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  compareAtPrice?: Maybe<ShopifyMoneyV2Filter>
  price?: Maybe<ShopifyMoneyV2Filter>
}

export type ShopifySourceProductVariantPricePairSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  compareAtPrice?: Maybe<ShopifyMoneyV2Sorting>
  price?: Maybe<ShopifyMoneyV2Sorting>
}

export interface ShopifySourceProductVariantPricePresenentmentConnection {
  __typename: 'ShopifySourceProductVariantPricePresenentmentConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  edges?: Maybe<Array<Maybe<ShopifySourceProductPricePresentmentEdge>>>
}

export type ShopifySourceProductVariantPricePresenentmentConnectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
}

export type ShopifySourceProductVariantPricePresenentmentConnectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
}

export interface ShopifySourceProductVariantsConnection {
  __typename: 'ShopifySourceProductVariantsConnection'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  pageInfo?: Maybe<PageInfo>
  edges?: Maybe<Array<Maybe<ShopifySourceProductVariantEdge>>>
}

export type ShopifySourceProductVariantsConnectionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  pageInfo?: Maybe<PageInfoFilter>
}

export type ShopifySourceProductVariantsConnectionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  pageInfo?: Maybe<PageInfoSorting>
}

export type ShopifySourceProductVariantSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  availableForSale?: Maybe<SortOrder>
  currentlyNotInStock?: Maybe<SortOrder>
  id?: Maybe<SortOrder>
  image?: Maybe<ShopifySourceImageSorting>
  priceV2?: Maybe<ShopifyMoneyV2Sorting>
  compareAtPriceV2?: Maybe<ShopifyMoneyV2Sorting>
  requiresShipping?: Maybe<SortOrder>
  sku?: Maybe<SortOrder>
  weight?: Maybe<SortOrder>
  weightUnit?: Maybe<SortOrder>
}

export interface ShopifySourceSelectedOption {
  __typename: 'ShopifySourceSelectedOption'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['String']>
}

export type ShopifySourceSelectedOptionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
  value?: Maybe<StringFilter>
}

export type ShopifySourceSelectedOptionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
  value?: Maybe<SortOrder>
}

export interface SiteSettings extends Document {
  __typename: 'SiteSettings'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  phone?: Maybe<Scalars['String']>
  links?: Maybe<Array<Maybe<ExternalLinkOrInternalLink>>>
  mailerTitle?: Maybe<Scalars['String']>
  mailerSubtitle?: Maybe<Scalars['String']>
  seo?: Maybe<Seo>
}

export type SiteSettingsFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  phone?: Maybe<StringFilter>
  mailerTitle?: Maybe<StringFilter>
  mailerSubtitle?: Maybe<StringFilter>
  seo?: Maybe<SeoFilter>
}

export type SiteSettingsSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  phone?: Maybe<SortOrder>
  mailerTitle?: Maybe<SortOrder>
  mailerSubtitle?: Maybe<SortOrder>
  seo?: Maybe<SeoSorting>
}

export interface Slug {
  __typename: 'Slug'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  current?: Maybe<Scalars['String']>
}

export type SlugFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  current?: Maybe<StringFilter>
}

export type SlugSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  current?: Maybe<SortOrder>
}

export enum SortOrder {
  /** Sorts on the value in ascending order. */
  Asc = 'ASC',
  /** Sorts on the value in descending order. */
  Desc = 'DESC',
}

export interface Span {
  __typename: 'Span'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  marks?: Maybe<Array<Maybe<Scalars['String']>>>
  text?: Maybe<Scalars['String']>
}

export type StringFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: Maybe<Scalars['String']>
  /** Checks if the value is not equal to the given input. */
  neq?: Maybe<Scalars['String']>
  /** Checks if the value matches the given word/words. */
  matches?: Maybe<Scalars['String']>
  in?: Maybe<Array<Scalars['String']>>
  nin?: Maybe<Array<Scalars['String']>>
}

export interface SubMenu {
  __typename: 'SubMenu'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  links?: Maybe<Array<Maybe<CtaOrSubMenu>>>
}

export type SubMenuFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
}

export type SubMenuSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
}

export interface TagBadge {
  __typename: 'TagBadge'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  /** The tag to match from Shopify */
  tag?: Maybe<Scalars['String']>
  /** (optional) An alternate label to display in the badge */
  label?: Maybe<Scalars['String']>
}

export type TagBadgeFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  tag?: Maybe<StringFilter>
  label?: Maybe<StringFilter>
}

export type TagBadgeSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  tag?: Maybe<SortOrder>
  label?: Maybe<SortOrder>
}

export interface TeamMember {
  __typename: 'TeamMember'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  email?: Maybe<Scalars['String']>
  headshot?: Maybe<RichImage>
}

export type TeamMemberFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  name?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  email?: Maybe<StringFilter>
  headshot?: Maybe<RichImageFilter>
}

export type TeamMemberSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  name?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  email?: Maybe<SortOrder>
  headshot?: Maybe<RichImageSorting>
}

export interface TeamPage extends Document {
  __typename: 'TeamPage'
  /** Document ID */
  _id?: Maybe<Scalars['ID']>
  /** Document type */
  _type?: Maybe<Scalars['String']>
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']>
  _key?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  teamMembers?: Maybe<Array<Maybe<TeamMember>>>
  seo?: Maybe<Seo>
}

export type TeamPageFilter = {
  /** Apply filters on document level */
  _?: Maybe<DocumentFilter>
  _id?: Maybe<IdFilter>
  _type?: Maybe<StringFilter>
  _createdAt?: Maybe<DatetimeFilter>
  _updatedAt?: Maybe<DatetimeFilter>
  _rev?: Maybe<StringFilter>
  _key?: Maybe<StringFilter>
  title?: Maybe<StringFilter>
  seo?: Maybe<SeoFilter>
}

export type TeamPageSorting = {
  _id?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  _createdAt?: Maybe<SortOrder>
  _updatedAt?: Maybe<SortOrder>
  _rev?: Maybe<SortOrder>
  _key?: Maybe<SortOrder>
  title?: Maybe<SortOrder>
  seo?: Maybe<SeoSorting>
}

export interface TextAction {
  __typename: 'TextAction'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  actionType?: Maybe<Scalars['String']>
}

export type TextActionFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  actionType?: Maybe<StringFilter>
}

export type TextActionSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  actionType?: Maybe<SortOrder>
}

export interface TextBlock {
  __typename: 'TextBlock'
  _key?: Maybe<Scalars['String']>
  _type?: Maybe<Scalars['String']>
  bodyRaw?: Maybe<Scalars['JSON']>
  body_mobileRaw?: Maybe<Scalars['JSON']>
  textColor?: Maybe<Scalars['String']>
  alignment?: Maybe<Scalars['String']>
  layout?: Maybe<Scalars['String']>
  backgroundImage?: Maybe<RichImage>
}

export type TextBlockFilter = {
  _key?: Maybe<StringFilter>
  _type?: Maybe<StringFilter>
  textColor?: Maybe<StringFilter>
  alignment?: Maybe<StringFilter>
  layout?: Maybe<StringFilter>
  backgroundImage?: Maybe<RichImageFilter>
}

export type TextBlockSorting = {
  _key?: Maybe<SortOrder>
  _type?: Maybe<SortOrder>
  textColor?: Maybe<SortOrder>
  alignment?: Maybe<SortOrder>
  layout?: Maybe<SortOrder>
  backgroundImage?: Maybe<RichImageSorting>
}
