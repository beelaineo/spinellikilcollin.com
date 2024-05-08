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
  Date: { input: any; output: any }
  DateTime: { input: Date; output: Date }
  JSON: { input: { [key: string]: any }; output: { [key: string]: any } }
}

export interface About extends Document {
  __typename: 'About'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  hero?: Maybe<Hero>
  introText?: Maybe<Scalars['String']['output']>
  pageLinks?: Maybe<Array<Maybe<PageLink>>>
  seo?: Maybe<Seo>
  title?: Maybe<Scalars['String']['output']>
}

export type AboutFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  hero?: InputMaybe<HeroFilter>
  introText?: InputMaybe<StringFilter>
  seo?: InputMaybe<SeoFilter>
  title?: InputMaybe<StringFilter>
}

export type AboutOrAppointmentsOrCollectionOrContactOrCustomizeOrFaqOrJournalEntryOrJournalPageOrMagazineOrPageOrPaymentPlansOrProductOrTeamPage =

    | About
    | Appointments
    | Collection
    | Contact
    | Customize
    | Faq
    | JournalEntry
    | JournalPage
    | Magazine
    | Page
    | PaymentPlans
    | Product
    | TeamPage

export type AboutSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  hero?: InputMaybe<HeroSorting>
  introText?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  title?: InputMaybe<SortOrder>
}

export interface AppointmentLocation {
  __typename: 'AppointmentLocation'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  body?: Maybe<TextBlock>
  content?: Maybe<Array<Maybe<EmbedBlock>>>
  ctaLabel?: Maybe<Scalars['String']['output']>
  icon?: Maybe<RichImage>
  image?: Maybe<ImageTextBlock>
  label?: Maybe<Scalars['String']['output']>
  phone?: Maybe<Scalars['String']['output']>
  slug?: Maybe<Slug>
}

export type AppointmentLocationFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  body?: InputMaybe<TextBlockFilter>
  ctaLabel?: InputMaybe<StringFilter>
  icon?: InputMaybe<RichImageFilter>
  image?: InputMaybe<ImageTextBlockFilter>
  label?: InputMaybe<StringFilter>
  phone?: InputMaybe<StringFilter>
  slug?: InputMaybe<SlugFilter>
}

export type AppointmentLocationSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  body?: InputMaybe<TextBlockSorting>
  ctaLabel?: InputMaybe<SortOrder>
  icon?: InputMaybe<RichImageSorting>
  image?: InputMaybe<ImageTextBlockSorting>
  label?: InputMaybe<SortOrder>
  phone?: InputMaybe<SortOrder>
  slug?: InputMaybe<SlugSorting>
}

export interface Appointments extends Document {
  __typename: 'Appointments'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  appointmentLocations?: Maybe<Array<Maybe<AppointmentLocation>>>
  description?: Maybe<TextBlock>
  seo?: Maybe<Seo>
  title?: Maybe<Scalars['String']['output']>
  upcomingPopups?: Maybe<UpcomingPopups>
}

export type AppointmentsFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  description?: InputMaybe<TextBlockFilter>
  seo?: InputMaybe<SeoFilter>
  title?: InputMaybe<StringFilter>
  upcomingPopups?: InputMaybe<UpcomingPopupsFilter>
}

export type AppointmentsSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  description?: InputMaybe<TextBlockSorting>
  seo?: InputMaybe<SeoSorting>
  title?: InputMaybe<SortOrder>
  upcomingPopups?: InputMaybe<UpcomingPopupsSorting>
}

export interface BambuserLiveSettings {
  __typename: 'BambuserLiveSettings'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  endDate?: Maybe<Scalars['DateTime']['output']>
  liveCTALabel?: Maybe<Scalars['String']['output']>
  startDate?: Maybe<Scalars['DateTime']['output']>
}

export type BambuserLiveSettingsFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  endDate?: InputMaybe<DatetimeFilter>
  liveCTALabel?: InputMaybe<StringFilter>
  startDate?: InputMaybe<DatetimeFilter>
}

export type BambuserLiveSettingsSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  endDate?: InputMaybe<SortOrder>
  liveCTALabel?: InputMaybe<SortOrder>
  startDate?: InputMaybe<SortOrder>
}

export interface BambuserSettings {
  __typename: 'BambuserSettings'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  liveSettings?: Maybe<BambuserLiveSettings>
  /** The ID of the Bambuser video to launch */
  slug?: Maybe<Scalars['String']['output']>
}

export type BambuserSettingsFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  liveSettings?: InputMaybe<BambuserLiveSettingsFilter>
  slug?: InputMaybe<StringFilter>
}

export type BambuserSettingsSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  liveSettings?: InputMaybe<BambuserLiveSettingsSorting>
  slug?: InputMaybe<SortOrder>
}

export interface Birthdays extends Document {
  __typename: 'Birthdays'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  seo?: Maybe<Seo>
  subtitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type BirthdaysFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  seo?: InputMaybe<SeoFilter>
  subtitle?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type BirthdaysSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  subtitle?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface Block {
  __typename: 'Block'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  children?: Maybe<Array<Maybe<Span>>>
  level?: Maybe<Scalars['Float']['output']>
  listItem?: Maybe<Scalars['String']['output']>
  style?: Maybe<Scalars['String']['output']>
}

export type BlockOrCloudinaryVideoOrCountdownOrFormOrRichImage =
  | Block
  | CloudinaryVideo
  | Countdown
  | Form
  | RichImage

export type BooleanFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Boolean']['input']>
}

export interface Carousel {
  __typename: 'Carousel'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** Create a carousel from a collection. If a collection is used, items linked to below be ignored. */
  collection?: Maybe<Collection>
  items?: Maybe<Array<Maybe<RichPageLink>>>
  subtitleRaw?: Maybe<Scalars['JSON']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type CarouselFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  collection?: InputMaybe<CollectionFilter>
  title?: InputMaybe<StringFilter>
}

export type CarouselOrEmbedBlockOrImageTextBlockOrTextBlock =
  | Carousel
  | EmbedBlock
  | ImageTextBlock
  | TextBlock

export type CarouselOrHeroOrImageTextBlock = Carousel | Hero | ImageTextBlock

export type CarouselOrImageTextBlockOrTextBlock =
  | Carousel
  | ImageTextBlock
  | TextBlock

export type CarouselSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface CloudinaryVideo {
  __typename: 'CloudinaryVideo'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  enableAudio?: Maybe<Scalars['Boolean']['output']>
  enableControls?: Maybe<Scalars['Boolean']['output']>
  subtitle?: Maybe<Scalars['String']['output']>
  videoId?: Maybe<Scalars['String']['output']>
}

export type CloudinaryVideoFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  enableAudio?: InputMaybe<BooleanFilter>
  enableControls?: InputMaybe<BooleanFilter>
  subtitle?: InputMaybe<StringFilter>
  videoId?: InputMaybe<StringFilter>
}

export type CloudinaryVideoSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  enableAudio?: InputMaybe<SortOrder>
  enableControls?: InputMaybe<SortOrder>
  subtitle?: InputMaybe<SortOrder>
  videoId?: InputMaybe<SortOrder>
}

export interface Collection extends Document {
  __typename: 'Collection'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  archived?: Maybe<Scalars['Boolean']['output']>
  collectionBlocks?: Maybe<Array<Maybe<CollectionBlock>>>
  customFilter?: Maybe<
    Array<Maybe<FilterOrFilterSetOrInStockFilterOrPriceRangeMinMaxFilter>>
  >
  descriptionRaw?: Maybe<Scalars['JSON']['output']>
  footer?: Maybe<Array<Maybe<CarouselOrImageTextBlockOrTextBlock>>>
  handle?: Maybe<Scalars['String']['output']>
  hero?: Maybe<Hero>
  /** Toggle this to ON to hide this collection. The product will still be viewable at its URL */
  hidden?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to remove all filters from the collection view. */
  hideFilter?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to change text color to white for all products in collection. */
  lightTheme?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to hide filter label, reset button, and sort tools. */
  minimalDisplay?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to only display the custom filters you add below. */
  overrideDefaultFilter?: Maybe<Scalars['Boolean']['output']>
  preferredVariantMatches?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  products?: Maybe<Array<Maybe<Product>>>
  /** Changes the layout to 2 columns on desktop, 1 column on tablet */
  reduceColumnCount?: Maybe<Scalars['Boolean']['output']>
  seo?: Maybe<Seo>
  shopifyId?: Maybe<Scalars['String']['output']>
  slugProxy?: Maybe<Scalars['String']['output']>
  store?: Maybe<ShopifyCollectionDef>
  title?: Maybe<Scalars['String']['output']>
  titleProxy?: Maybe<Scalars['String']['output']>
}

export interface CollectionBlock {
  __typename: 'CollectionBlock'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  backgroundColor?: Maybe<Scalars['String']['output']>
  backgroundImage?: Maybe<RichImage>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  body_mobileRaw?: Maybe<Scalars['JSON']['output']>
  cloudinaryVideo?: Maybe<CloudinaryVideo>
  format?: Maybe<Scalars['String']['output']>
  position?: Maybe<Scalars['Float']['output']>
  textColor?: Maybe<Scalars['String']['output']>
  textPosition?: Maybe<Scalars['String']['output']>
}

export type CollectionBlockFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  backgroundColor?: InputMaybe<StringFilter>
  backgroundImage?: InputMaybe<RichImageFilter>
  cloudinaryVideo?: InputMaybe<CloudinaryVideoFilter>
  format?: InputMaybe<StringFilter>
  position?: InputMaybe<FloatFilter>
  textColor?: InputMaybe<StringFilter>
  textPosition?: InputMaybe<StringFilter>
}

export type CollectionBlockSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  backgroundColor?: InputMaybe<SortOrder>
  backgroundImage?: InputMaybe<RichImageSorting>
  cloudinaryVideo?: InputMaybe<CloudinaryVideoSorting>
  format?: InputMaybe<SortOrder>
  position?: InputMaybe<SortOrder>
  textColor?: InputMaybe<SortOrder>
  textPosition?: InputMaybe<SortOrder>
}

export type CollectionFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  archived?: InputMaybe<BooleanFilter>
  handle?: InputMaybe<StringFilter>
  hero?: InputMaybe<HeroFilter>
  hidden?: InputMaybe<BooleanFilter>
  hideFilter?: InputMaybe<BooleanFilter>
  lightTheme?: InputMaybe<BooleanFilter>
  minimalDisplay?: InputMaybe<BooleanFilter>
  overrideDefaultFilter?: InputMaybe<BooleanFilter>
  reduceColumnCount?: InputMaybe<BooleanFilter>
  seo?: InputMaybe<SeoFilter>
  shopifyId?: InputMaybe<StringFilter>
  slugProxy?: InputMaybe<StringFilter>
  store?: InputMaybe<ShopifyCollectionDefFilter>
  title?: InputMaybe<StringFilter>
  titleProxy?: InputMaybe<StringFilter>
}

export interface CollectionGroup {
  __typename: 'CollectionGroup'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  collectionLinks?: Maybe<Array<Maybe<Collection>>>
  /** Products from this collection will be listed */
  collectionProducts?: Maybe<Collection>
  title?: Maybe<Scalars['String']['output']>
}

export type CollectionGroupFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  collectionProducts?: InputMaybe<CollectionFilter>
  title?: InputMaybe<StringFilter>
}

export type CollectionGroupOrLinkExternalOrLinkInternal =
  | CollectionGroup
  | LinkExternal
  | LinkInternal

export type CollectionGroupSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export type CollectionOrHomepageOrPageOrProduct =
  | Collection
  | Homepage
  | Page
  | Product

export type CollectionOrPageOrProduct = Collection | Page | Product

export type CollectionOrShopifyCollection = Collection | ShopifyCollection

export interface CollectionRule {
  __typename: 'CollectionRule'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  column?: Maybe<Scalars['String']['output']>
  condition?: Maybe<Scalars['String']['output']>
  relation?: Maybe<Scalars['String']['output']>
}

export type CollectionRuleFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  column?: InputMaybe<StringFilter>
  condition?: InputMaybe<StringFilter>
  relation?: InputMaybe<StringFilter>
}

export type CollectionRuleSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  column?: InputMaybe<SortOrder>
  condition?: InputMaybe<SortOrder>
  relation?: InputMaybe<SortOrder>
}

export type CollectionSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  archived?: InputMaybe<SortOrder>
  handle?: InputMaybe<SortOrder>
  hero?: InputMaybe<HeroSorting>
  hidden?: InputMaybe<SortOrder>
  hideFilter?: InputMaybe<SortOrder>
  lightTheme?: InputMaybe<SortOrder>
  minimalDisplay?: InputMaybe<SortOrder>
  overrideDefaultFilter?: InputMaybe<SortOrder>
  reduceColumnCount?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  shopifyId?: InputMaybe<SortOrder>
  slugProxy?: InputMaybe<SortOrder>
  store?: InputMaybe<ShopifyCollectionDefSorting>
  title?: InputMaybe<SortOrder>
  titleProxy?: InputMaybe<SortOrder>
}

export interface Color {
  __typename: 'Color'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  alpha?: Maybe<Scalars['Float']['output']>
  hex?: Maybe<Scalars['String']['output']>
  hsl?: Maybe<HslaColor>
  hsv?: Maybe<HsvaColor>
  rgb?: Maybe<RgbaColor>
}

export type ColorFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  alpha?: InputMaybe<FloatFilter>
  hex?: InputMaybe<StringFilter>
  hsl?: InputMaybe<HslaColorFilter>
  hsv?: InputMaybe<HsvaColorFilter>
  rgb?: InputMaybe<RgbaColorFilter>
}

export type ColorSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  alpha?: InputMaybe<SortOrder>
  hex?: InputMaybe<SortOrder>
  hsl?: InputMaybe<HslaColorSorting>
  hsv?: InputMaybe<HsvaColorSorting>
  rgb?: InputMaybe<RgbaColorSorting>
}

export interface Contact extends Document {
  __typename: 'Contact'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  contactLines?: Maybe<Array<Maybe<ContactLine>>>
  seo?: Maybe<Seo>
  title?: Maybe<Scalars['String']['output']>
}

export type ContactFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  seo?: InputMaybe<SeoFilter>
  title?: InputMaybe<StringFilter>
}

export interface ContactLine {
  __typename: 'ContactLine'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  contact?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type ContactLineFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  contact?: InputMaybe<StringFilter>
  label?: InputMaybe<StringFilter>
  type?: InputMaybe<StringFilter>
}

export type ContactLineSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  contact?: InputMaybe<SortOrder>
  label?: InputMaybe<SortOrder>
  type?: InputMaybe<SortOrder>
}

export type ContactSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  title?: InputMaybe<SortOrder>
}

export interface Countdown {
  __typename: 'Countdown'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  dateTime?: Maybe<Scalars['DateTime']['output']>
}

export type CountdownFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  dateTime?: InputMaybe<DatetimeFilter>
}

export type CountdownSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  dateTime?: InputMaybe<SortOrder>
}

export interface CrossDatasetReference {
  __typename: 'CrossDatasetReference'
  _dataset?: Maybe<Scalars['String']['output']>
  _key?: Maybe<Scalars['String']['output']>
  _projectId?: Maybe<Scalars['String']['output']>
  _ref?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  _weak?: Maybe<Scalars['Boolean']['output']>
}

export type CrossDatasetReferenceFilter = {
  _dataset?: InputMaybe<StringFilter>
  _key?: InputMaybe<StringFilter>
  _projectId?: InputMaybe<StringFilter>
  _ref?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _weak?: InputMaybe<BooleanFilter>
}

export type CrossDatasetReferenceSorting = {
  _dataset?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _projectId?: InputMaybe<SortOrder>
  _ref?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _weak?: InputMaybe<SortOrder>
}

export interface Cta {
  __typename: 'Cta'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** Have this CTA launch an action instead of linking to a page. For launching Bambuser, make sure you fill out the Bambuser Settings below. (If selected, this will override any linked document) */
  action?: Maybe<Scalars['String']['output']>
  bambuser?: Maybe<BambuserSettings>
  label?: Maybe<Scalars['String']['output']>
  link?: Maybe<InternalLink>
  linkType?: Maybe<Scalars['String']['output']>
  link_external?: Maybe<ExternalLink>
}

export type CtaFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  action?: InputMaybe<StringFilter>
  bambuser?: InputMaybe<BambuserSettingsFilter>
  label?: InputMaybe<StringFilter>
  link?: InputMaybe<InternalLinkFilter>
  linkType?: InputMaybe<StringFilter>
  link_external?: InputMaybe<ExternalLinkFilter>
}

export type CtaOrSubMenu = Cta | SubMenu

export type CtaSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  action?: InputMaybe<SortOrder>
  bambuser?: InputMaybe<BambuserSettingsSorting>
  label?: InputMaybe<SortOrder>
  link?: InputMaybe<InternalLinkSorting>
  linkType?: InputMaybe<SortOrder>
  link_external?: InputMaybe<ExternalLinkSorting>
}

export interface CustomProductOptionColor {
  __typename: 'CustomProductOptionColor'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  colors?: Maybe<Array<Maybe<CustomProductOptionColorObject>>>
  /** Shopify product option name (case sensitive) */
  title?: Maybe<Scalars['String']['output']>
}

export type CustomProductOptionColorFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export interface CustomProductOptionColorObject {
  __typename: 'CustomProductOptionColorObject'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  color?: Maybe<Color>
  /** Shopify product option value (case sensitive) */
  title?: Maybe<Scalars['String']['output']>
}

export type CustomProductOptionColorObjectFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  color?: InputMaybe<ColorFilter>
  title?: InputMaybe<StringFilter>
}

export type CustomProductOptionColorObjectSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  color?: InputMaybe<ColorSorting>
  title?: InputMaybe<SortOrder>
}

export type CustomProductOptionColorSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface CustomProductOptionSize {
  __typename: 'CustomProductOptionSize'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  sizes?: Maybe<Array<Maybe<CustomProductOptionSizeObject>>>
  /** Shopify product option name (case sensitive) */
  title?: Maybe<Scalars['String']['output']>
}

export type CustomProductOptionSizeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export interface CustomProductOptionSizeObject {
  __typename: 'CustomProductOptionSizeObject'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** In mm */
  height?: Maybe<Scalars['Float']['output']>
  /** Shopify product option value (case sensitive) */
  title?: Maybe<Scalars['String']['output']>
  /** In mm */
  width?: Maybe<Scalars['Float']['output']>
}

export type CustomProductOptionSizeObjectFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  height?: InputMaybe<FloatFilter>
  title?: InputMaybe<StringFilter>
  width?: InputMaybe<FloatFilter>
}

export type CustomProductOptionSizeObjectSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  height?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  width?: InputMaybe<SortOrder>
}

export type CustomProductOptionSizeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface CustomerCare extends Document {
  __typename: 'CustomerCare'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  backgroundImage?: Maybe<RichImage>
  seo?: Maybe<Seo>
  title?: Maybe<Scalars['String']['output']>
}

export type CustomerCareFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  backgroundImage?: InputMaybe<RichImageFilter>
  seo?: InputMaybe<SeoFilter>
  title?: InputMaybe<StringFilter>
}

export type CustomerCareSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  backgroundImage?: InputMaybe<RichImageSorting>
  seo?: InputMaybe<SeoSorting>
  title?: InputMaybe<SortOrder>
}

export interface Customize extends Document {
  __typename: 'Customize'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  examples?: Maybe<CustomizeExamples>
  experience?: Maybe<Experience>
  hero?: Maybe<Hero>
  quizBlock?: Maybe<QuizBlock>
  quizProductTypes?: Maybe<Array<Maybe<QuizProductType>>>
  quizStyles?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  seo?: Maybe<Seo>
  subtitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export interface CustomizeExamples {
  __typename: 'CustomizeExamples'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  links?: Maybe<Array<Maybe<ImageTextBlock>>>
  subtitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type CustomizeExamplesFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  subtitle?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type CustomizeExamplesSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  subtitle?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export type CustomizeFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  examples?: InputMaybe<CustomizeExamplesFilter>
  experience?: InputMaybe<ExperienceFilter>
  hero?: InputMaybe<HeroFilter>
  quizBlock?: InputMaybe<QuizBlockFilter>
  seo?: InputMaybe<SeoFilter>
  subtitle?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type CustomizeSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  examples?: InputMaybe<CustomizeExamplesSorting>
  experience?: InputMaybe<ExperienceSorting>
  hero?: InputMaybe<HeroSorting>
  quizBlock?: InputMaybe<QuizBlockSorting>
  seo?: InputMaybe<SeoSorting>
  subtitle?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export type DateFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Date']['input']>
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Date']['input']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Date']['input']>
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Date']['input']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Date']['input']>
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Date']['input']>
}

export type DatetimeFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['DateTime']['input']>
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['DateTime']['input']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['DateTime']['input']>
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['DateTime']['input']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['DateTime']['input']>
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['DateTime']['input']>
}

export interface Directory extends Document {
  __typename: 'Directory'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  hero?: Maybe<Hero>
  introText?: Maybe<Scalars['String']['output']>
  pageLinks?: Maybe<Array<Maybe<PageLink>>>
  seo?: Maybe<Seo>
  slug?: Maybe<Slug>
  title?: Maybe<Scalars['String']['output']>
}

export type DirectoryFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  hero?: InputMaybe<HeroFilter>
  introText?: InputMaybe<StringFilter>
  seo?: InputMaybe<SeoFilter>
  slug?: InputMaybe<SlugFilter>
  title?: InputMaybe<StringFilter>
}

export type DirectorySorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  hero?: InputMaybe<HeroSorting>
  introText?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  slug?: InputMaybe<SlugSorting>
  title?: InputMaybe<SortOrder>
}

/** A Sanity document */
export type Document = {
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
}

export type DocumentFilter = {
  /** All documents that are drafts. */
  is_draft?: InputMaybe<Scalars['Boolean']['input']>
  /** All documents referencing the given document ID. */
  references?: InputMaybe<Scalars['ID']['input']>
}

export interface EmailSignatureSettings extends Document {
  __typename: 'EmailSignatureSettings'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  signatures?: Maybe<Array<Maybe<Signature>>>
  wordmark?: Maybe<File>
}

export type EmailSignatureSettingsFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  wordmark?: InputMaybe<FileFilter>
}

export type EmailSignatureSettingsSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  wordmark?: InputMaybe<FileSorting>
}

export interface EmbedBlock {
  __typename: 'EmbedBlock'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  layout?: Maybe<Scalars['String']['output']>
  /** Descriptive title (for internal purposes) */
  title?: Maybe<Scalars['String']['output']>
  /** https://meetings.hubspot.com/MEETING_SLUG */
  url?: Maybe<Scalars['String']['output']>
}

export type EmbedBlockFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  layout?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
  url?: InputMaybe<StringFilter>
}

export type EmbedBlockSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  layout?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  url?: InputMaybe<SortOrder>
}

export interface Experience {
  __typename: 'Experience'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  blocks?: Maybe<Array<Maybe<ExperienceBlock>>>
  subtitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export interface ExperienceBlock {
  __typename: 'ExperienceBlock'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  body?: Maybe<Scalars['String']['output']>
  heading?: Maybe<Scalars['String']['output']>
  illustration?: Maybe<RichImage>
}

export type ExperienceBlockFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  body?: InputMaybe<StringFilter>
  heading?: InputMaybe<StringFilter>
  illustration?: InputMaybe<RichImageFilter>
}

export type ExperienceBlockSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  body?: InputMaybe<SortOrder>
  heading?: InputMaybe<SortOrder>
  illustration?: InputMaybe<RichImageSorting>
}

export type ExperienceFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  subtitle?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type ExperienceSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  subtitle?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface ExternalLink {
  __typename: 'ExternalLink'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  newTab?: Maybe<Scalars['Boolean']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ExternalLinkFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  newTab?: InputMaybe<BooleanFilter>
  url?: InputMaybe<StringFilter>
}

export type ExternalLinkOrInternalLink = ExternalLink | InternalLink

export type ExternalLinkOrInternalLinkOrPdfLink =
  | ExternalLink
  | InternalLink
  | PdfLink

export type ExternalLinkSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  newTab?: InputMaybe<SortOrder>
  url?: InputMaybe<SortOrder>
}

export interface Faq extends Document {
  __typename: 'Faq'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  faqCategories?: Maybe<Array<Maybe<FaqCategory>>>
  seo?: Maybe<Seo>
  title?: Maybe<Scalars['String']['output']>
}

export interface FaqCategory {
  __typename: 'FaqCategory'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  faqQuestions?: Maybe<Array<Maybe<FaqQuestion>>>
  label?: Maybe<Scalars['String']['output']>
}

export type FaqCategoryFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  label?: InputMaybe<StringFilter>
}

export type FaqCategorySorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  label?: InputMaybe<SortOrder>
}

export type FaqFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  seo?: InputMaybe<SeoFilter>
  title?: InputMaybe<StringFilter>
}

export interface FaqQuestion {
  __typename: 'FaqQuestion'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  answerRaw?: Maybe<Scalars['JSON']['output']>
  question?: Maybe<Scalars['String']['output']>
}

export type FaqQuestionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  question?: InputMaybe<StringFilter>
}

export type FaqQuestionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  question?: InputMaybe<SortOrder>
}

export type FaqSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  title?: InputMaybe<SortOrder>
}

export interface File {
  __typename: 'File'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  asset?: Maybe<SanityFileAsset>
}

export type FileFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  asset?: InputMaybe<SanityFileAssetFilter>
}

export type FileSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
}

export interface Filter {
  __typename: 'Filter'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
  matches?: Maybe<Array<Maybe<FilterMatch>>>
}

export type FilterFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  label?: InputMaybe<StringFilter>
}

export interface FilterMatch {
  __typename: 'FilterMatch'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  match?: Maybe<Scalars['String']['output']>
  type?: Maybe<Scalars['String']['output']>
}

export type FilterMatchFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  match?: InputMaybe<StringFilter>
  type?: InputMaybe<StringFilter>
}

export type FilterMatchSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  match?: InputMaybe<SortOrder>
  type?: InputMaybe<SortOrder>
}

export type FilterOrFilterSetOrInStockFilterOrPriceRangeMinMaxFilter =
  | Filter
  | FilterSet
  | InStockFilter
  | PriceRangeMinMaxFilter

export interface FilterSet {
  __typename: 'FilterSet'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  filters?: Maybe<Array<Maybe<Filter>>>
  heading?: Maybe<Scalars['String']['output']>
  /** If selected, this filter will not appear on collection page filters */
  searchOnly?: Maybe<Scalars['Boolean']['output']>
}

export type FilterSetFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  heading?: InputMaybe<StringFilter>
  searchOnly?: InputMaybe<BooleanFilter>
}

export type FilterSetSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  heading?: InputMaybe<SortOrder>
  searchOnly?: InputMaybe<SortOrder>
}

export type FilterSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  label?: InputMaybe<SortOrder>
}

export type FloatFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Float']['input']>
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Float']['input']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Float']['input']>
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Float']['input']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Float']['input']>
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Float']['input']>
}

export interface Form {
  __typename: 'Form'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  formSubtitle?: Maybe<Scalars['String']['output']>
  formTitle?: Maybe<Scalars['String']['output']>
  formType?: Maybe<Scalars['String']['output']>
}

export type FormFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  formSubtitle?: InputMaybe<StringFilter>
  formTitle?: InputMaybe<StringFilter>
  formType?: InputMaybe<StringFilter>
}

export type FormSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  formSubtitle?: InputMaybe<SortOrder>
  formTitle?: InputMaybe<SortOrder>
  formType?: InputMaybe<SortOrder>
}

export interface Geopoint {
  __typename: 'Geopoint'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  alt?: Maybe<Scalars['Float']['output']>
  lat?: Maybe<Scalars['Float']['output']>
  lng?: Maybe<Scalars['Float']['output']>
}

export type GeopointFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  alt?: InputMaybe<FloatFilter>
  lat?: InputMaybe<FloatFilter>
  lng?: InputMaybe<FloatFilter>
}

export type GeopointSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  alt?: InputMaybe<SortOrder>
  lat?: InputMaybe<SortOrder>
  lng?: InputMaybe<SortOrder>
}

export interface Hero {
  __typename: 'Hero'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  aspectRatio?: Maybe<Scalars['Float']['output']>
  backgroundColor?: Maybe<Scalars['String']['output']>
  backgroundColorCustom?: Maybe<Color>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  body_mobileRaw?: Maybe<Scalars['JSON']['output']>
  cloudinaryVideo?: Maybe<CloudinaryVideo>
  cloudinaryVideoMobile?: Maybe<CloudinaryVideo>
  cta?: Maybe<Array<Maybe<Cta>>>
  /** Text color for the header/nav overlay over the hero. */
  header_color?: Maybe<Scalars['String']['output']>
  heroLink?: Maybe<InternalLink>
  image?: Maybe<RichImage>
  /** Change the layout and alignment mode of the hero elements (Default: Full Width) */
  layout?: Maybe<Scalars['String']['output']>
  mobileBackgroundColor?: Maybe<Scalars['String']['output']>
  mobileBackgroundColorCustom?: Maybe<Color>
  mobileImage?: Maybe<RichImage>
  textColor?: Maybe<Scalars['String']['output']>
  textColorCustom?: Maybe<Color>
  textColorMobile?: Maybe<Scalars['String']['output']>
  textColorMobileCustom?: Maybe<Color>
  /** Limit the size of the text container. (Default: Full Width) */
  textContainer?: Maybe<Scalars['String']['output']>
  textPosition?: Maybe<Scalars['String']['output']>
  textPositionMobile?: Maybe<Scalars['String']['output']>
  /** Extra-large heading text size for banners (for use with H1) */
  textXL?: Maybe<Scalars['Boolean']['output']>
}

export interface HeroCollection {
  __typename: 'HeroCollection'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  content?: Maybe<Array<Maybe<ImageWithProductHotspotsOrProductWithVariant>>>
  description?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type HeroCollectionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  description?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type HeroCollectionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export type HeroFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  aspectRatio?: InputMaybe<FloatFilter>
  backgroundColor?: InputMaybe<StringFilter>
  backgroundColorCustom?: InputMaybe<ColorFilter>
  cloudinaryVideo?: InputMaybe<CloudinaryVideoFilter>
  cloudinaryVideoMobile?: InputMaybe<CloudinaryVideoFilter>
  header_color?: InputMaybe<StringFilter>
  heroLink?: InputMaybe<InternalLinkFilter>
  image?: InputMaybe<RichImageFilter>
  layout?: InputMaybe<StringFilter>
  mobileBackgroundColor?: InputMaybe<StringFilter>
  mobileBackgroundColorCustom?: InputMaybe<ColorFilter>
  mobileImage?: InputMaybe<RichImageFilter>
  textColor?: InputMaybe<StringFilter>
  textColorCustom?: InputMaybe<ColorFilter>
  textColorMobile?: InputMaybe<StringFilter>
  textColorMobileCustom?: InputMaybe<ColorFilter>
  textContainer?: InputMaybe<StringFilter>
  textPosition?: InputMaybe<StringFilter>
  textPositionMobile?: InputMaybe<StringFilter>
  textXL?: InputMaybe<BooleanFilter>
}

export interface HeroHome {
  __typename: 'HeroHome'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  content?: Maybe<Array<Maybe<ImageWithProductHotspotsOrProductWithVariant>>>
  links?: Maybe<Array<Maybe<LinkExternalOrLinkInternal>>>
  title?: Maybe<Scalars['String']['output']>
}

export type HeroHomeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type HeroHomeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface HeroPage {
  __typename: 'HeroPage'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  content?: Maybe<Array<Maybe<ImageWithProductHotspotsOrProductWithVariant>>>
  title?: Maybe<Scalars['String']['output']>
}

export type HeroPageFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type HeroPageSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export type HeroSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  aspectRatio?: InputMaybe<SortOrder>
  backgroundColor?: InputMaybe<SortOrder>
  backgroundColorCustom?: InputMaybe<ColorSorting>
  cloudinaryVideo?: InputMaybe<CloudinaryVideoSorting>
  cloudinaryVideoMobile?: InputMaybe<CloudinaryVideoSorting>
  header_color?: InputMaybe<SortOrder>
  heroLink?: InputMaybe<InternalLinkSorting>
  image?: InputMaybe<RichImageSorting>
  layout?: InputMaybe<SortOrder>
  mobileBackgroundColor?: InputMaybe<SortOrder>
  mobileBackgroundColorCustom?: InputMaybe<ColorSorting>
  mobileImage?: InputMaybe<RichImageSorting>
  textColor?: InputMaybe<SortOrder>
  textColorCustom?: InputMaybe<ColorSorting>
  textColorMobile?: InputMaybe<SortOrder>
  textColorMobileCustom?: InputMaybe<ColorSorting>
  textContainer?: InputMaybe<SortOrder>
  textPosition?: InputMaybe<SortOrder>
  textPositionMobile?: InputMaybe<SortOrder>
  textXL?: InputMaybe<SortOrder>
}

export interface Homepage extends Document {
  __typename: 'Homepage'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  content?: Maybe<Array<Maybe<CarouselOrHeroOrImageTextBlock>>>
  /** Text color for the header/nav overlay over the hero. */
  header_color?: Maybe<Scalars['String']['output']>
  seo?: Maybe<Seo>
}

export type HomepageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  header_color?: InputMaybe<StringFilter>
  seo?: InputMaybe<SeoFilter>
}

export type HomepageSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  header_color?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
}

export interface HslaColor {
  __typename: 'HslaColor'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  a?: Maybe<Scalars['Float']['output']>
  h?: Maybe<Scalars['Float']['output']>
  l?: Maybe<Scalars['Float']['output']>
  s?: Maybe<Scalars['Float']['output']>
}

export type HslaColorFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  a?: InputMaybe<FloatFilter>
  h?: InputMaybe<FloatFilter>
  l?: InputMaybe<FloatFilter>
  s?: InputMaybe<FloatFilter>
}

export type HslaColorSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  a?: InputMaybe<SortOrder>
  h?: InputMaybe<SortOrder>
  l?: InputMaybe<SortOrder>
  s?: InputMaybe<SortOrder>
}

export interface HsvaColor {
  __typename: 'HsvaColor'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  a?: Maybe<Scalars['Float']['output']>
  h?: Maybe<Scalars['Float']['output']>
  s?: Maybe<Scalars['Float']['output']>
  v?: Maybe<Scalars['Float']['output']>
}

export type HsvaColorFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  a?: InputMaybe<FloatFilter>
  h?: InputMaybe<FloatFilter>
  s?: InputMaybe<FloatFilter>
  v?: InputMaybe<FloatFilter>
}

export type HsvaColorSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  a?: InputMaybe<SortOrder>
  h?: InputMaybe<SortOrder>
  s?: InputMaybe<SortOrder>
  v?: InputMaybe<SortOrder>
}

export type IdFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['ID']['input']>
  in?: InputMaybe<Array<Scalars['ID']['input']>>
  /** Checks if the value matches the given word/words. */
  matches?: InputMaybe<Scalars['ID']['input']>
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['ID']['input']>
  nin?: InputMaybe<Array<Scalars['ID']['input']>>
}

export interface Image {
  __typename: 'Image'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  asset?: Maybe<SanityImageAsset>
  crop?: Maybe<SanityImageCrop>
  hotspot?: Maybe<SanityImageHotspot>
}

export interface ImageCallToAction {
  __typename: 'ImageCallToAction'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  links?: Maybe<Array<Maybe<LinkExternalOrLinkInternal>>>
  title?: Maybe<Scalars['String']['output']>
}

export type ImageCallToActionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type ImageCallToActionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export type ImageFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  asset?: InputMaybe<SanityImageAssetFilter>
  crop?: InputMaybe<SanityImageCropFilter>
  hotspot?: InputMaybe<SanityImageHotspotFilter>
}

export type ImageSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  crop?: InputMaybe<SanityImageCropSorting>
  hotspot?: InputMaybe<SanityImageHotspotSorting>
}

export interface ImageTextBlock {
  __typename: 'ImageTextBlock'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  backgroundColor?: Maybe<Scalars['String']['output']>
  backgroundImage?: Maybe<RichImage>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  body_mobileRaw?: Maybe<Scalars['JSON']['output']>
  cloudinaryVideo?: Maybe<CloudinaryVideo>
  ctaText?: Maybe<Scalars['String']['output']>
  hoverImage?: Maybe<RichImage>
  layout?: Maybe<Scalars['String']['output']>
  link?: Maybe<Array<Maybe<ExternalLinkOrInternalLinkOrPdfLink>>>
  textColor?: Maybe<Scalars['String']['output']>
  textPosition?: Maybe<Scalars['String']['output']>
}

export type ImageTextBlockFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  backgroundColor?: InputMaybe<StringFilter>
  backgroundImage?: InputMaybe<RichImageFilter>
  cloudinaryVideo?: InputMaybe<CloudinaryVideoFilter>
  ctaText?: InputMaybe<StringFilter>
  hoverImage?: InputMaybe<RichImageFilter>
  layout?: InputMaybe<StringFilter>
  textColor?: InputMaybe<StringFilter>
  textPosition?: InputMaybe<StringFilter>
}

export type ImageTextBlockSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  backgroundColor?: InputMaybe<SortOrder>
  backgroundImage?: InputMaybe<RichImageSorting>
  cloudinaryVideo?: InputMaybe<CloudinaryVideoSorting>
  ctaText?: InputMaybe<SortOrder>
  hoverImage?: InputMaybe<RichImageSorting>
  layout?: InputMaybe<SortOrder>
  textColor?: InputMaybe<SortOrder>
  textPosition?: InputMaybe<SortOrder>
}

export interface ImageWithProductHotspots {
  __typename: 'ImageWithProductHotspots'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  image?: Maybe<Image>
  productHotspots?: Maybe<Array<Maybe<Spot>>>
  showHotspots?: Maybe<Scalars['Boolean']['output']>
}

export type ImageWithProductHotspotsFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  image?: InputMaybe<ImageFilter>
  showHotspots?: InputMaybe<BooleanFilter>
}

export type ImageWithProductHotspotsOrProductWithVariant =
  | ImageWithProductHotspots
  | ProductWithVariant

export type ImageWithProductHotspotsSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  image?: InputMaybe<ImageSorting>
  showHotspots?: InputMaybe<SortOrder>
}

export interface InStockFilter {
  __typename: 'InStockFilter'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
}

export type InStockFilterFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  label?: InputMaybe<StringFilter>
}

export type InStockFilterSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  label?: InputMaybe<SortOrder>
}

export interface InitialVariantSelection {
  __typename: 'InitialVariantSelection'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** Select a collection to override the default product variant */
  selectedCollection?: Maybe<Collection>
  /** Enter initial variant Title with exact capitalization and punctuation. */
  selectedVariant?: Maybe<Scalars['String']['output']>
}

export type InitialVariantSelectionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  selectedCollection?: InputMaybe<CollectionFilter>
  selectedVariant?: InputMaybe<StringFilter>
}

export type InitialVariantSelectionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  selectedVariant?: InputMaybe<SortOrder>
}

export type IntFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['Int']['input']>
  /** Checks if the value is greater than the given input. */
  gt?: InputMaybe<Scalars['Int']['input']>
  /** Checks if the value is greater than or equal to the given input. */
  gte?: InputMaybe<Scalars['Int']['input']>
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks if the value is lesser than the given input. */
  lt?: InputMaybe<Scalars['Int']['input']>
  /** Checks if the value is lesser than or equal to the given input. */
  lte?: InputMaybe<Scalars['Int']['input']>
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['Int']['input']>
}

export interface InternalLink {
  __typename: 'InternalLink'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  document?: Maybe<AboutOrAppointmentsOrCollectionOrContactOrCustomizeOrFaqOrJournalEntryOrJournalPageOrMagazineOrPageOrPaymentPlansOrProductOrTeamPage>
  queryParams?: Maybe<Array<Maybe<QueryParam>>>
}

export type InternalLinkFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
}

export type InternalLinkSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
}

export interface Inventory {
  __typename: 'Inventory'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  isAvailable?: Maybe<Scalars['Boolean']['output']>
  management?: Maybe<Scalars['String']['output']>
  policy?: Maybe<Scalars['String']['output']>
}

export type InventoryFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  isAvailable?: InputMaybe<BooleanFilter>
  management?: InputMaybe<StringFilter>
  policy?: InputMaybe<StringFilter>
}

export type InventorySorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  isAvailable?: InputMaybe<SortOrder>
  management?: InputMaybe<SortOrder>
  policy?: InputMaybe<SortOrder>
}

export interface JournalEntry extends Document {
  __typename: 'JournalEntry'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  hero?: Maybe<Hero>
  publishDate?: Maybe<Scalars['Date']['output']>
  seo?: Maybe<Seo>
  slug?: Maybe<Slug>
  subtitle?: Maybe<Scalars['String']['output']>
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  thumbnail?: Maybe<RichImage>
  title?: Maybe<Scalars['String']['output']>
}

export type JournalEntryFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  hero?: InputMaybe<HeroFilter>
  publishDate?: InputMaybe<DateFilter>
  seo?: InputMaybe<SeoFilter>
  slug?: InputMaybe<SlugFilter>
  subtitle?: InputMaybe<StringFilter>
  thumbnail?: InputMaybe<RichImageFilter>
  title?: InputMaybe<StringFilter>
}

export type JournalEntrySorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  hero?: InputMaybe<HeroSorting>
  publishDate?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  slug?: InputMaybe<SlugSorting>
  subtitle?: InputMaybe<SortOrder>
  thumbnail?: InputMaybe<RichImageSorting>
  title?: InputMaybe<SortOrder>
}

export interface JournalPage extends Document {
  __typename: 'JournalPage'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  seo?: Maybe<Seo>
  title?: Maybe<Scalars['String']['output']>
}

export type JournalPageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  seo?: InputMaybe<SeoFilter>
  title?: InputMaybe<StringFilter>
}

export type JournalPageSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  title?: InputMaybe<SortOrder>
}

export interface LegacySeo {
  __typename: 'LegacySeo'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** This is the description that will appear underneath the preview link when shared in Facebook. It should be less than 200 characters */
  description?: Maybe<Scalars['String']['output']>
  image?: Maybe<Image>
  /** Comma-separated SEO keywords */
  keywords?: Maybe<Scalars['String']['output']>
  /** title for search results */
  metaTitle?: Maybe<Scalars['String']['output']>
  /** title for the browser window */
  title?: Maybe<Scalars['String']['output']>
}

export type LegacySeoFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  description?: InputMaybe<StringFilter>
  image?: InputMaybe<ImageFilter>
  keywords?: InputMaybe<StringFilter>
  metaTitle?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type LegacySeoSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  image?: InputMaybe<ImageSorting>
  keywords?: InputMaybe<SortOrder>
  metaTitle?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface Link {
  __typename: 'Link'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  href?: Maybe<Scalars['String']['output']>
}

export interface LinkExternal {
  __typename: 'LinkExternal'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  newWindow?: Maybe<Scalars['Boolean']['output']>
  title?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type LinkExternalFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  newWindow?: InputMaybe<BooleanFilter>
  title?: InputMaybe<StringFilter>
  url?: InputMaybe<StringFilter>
}

export type LinkExternalOrLinkInternal = LinkExternal | LinkInternal

export type LinkExternalSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  newWindow?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  url?: InputMaybe<SortOrder>
}

export type LinkFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  href?: InputMaybe<StringFilter>
}

export interface LinkInternal {
  __typename: 'LinkInternal'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  reference?: Maybe<CollectionOrHomepageOrPageOrProduct>
  title?: Maybe<Scalars['String']['output']>
}

export type LinkInternalFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type LinkInternalSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export type LinkSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  href?: InputMaybe<SortOrder>
}

export interface Loyalty extends Document {
  __typename: 'Loyalty'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  backgroundImage?: Maybe<RichImage>
  seo?: Maybe<Seo>
  title?: Maybe<Scalars['String']['output']>
}

export type LoyaltyFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  backgroundImage?: InputMaybe<RichImageFilter>
  seo?: InputMaybe<SeoFilter>
  title?: InputMaybe<StringFilter>
}

export type LoyaltySorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  backgroundImage?: InputMaybe<RichImageSorting>
  seo?: InputMaybe<SeoSorting>
  title?: InputMaybe<SortOrder>
}

export interface Magazine extends Document {
  __typename: 'Magazine'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  coverImage?: Maybe<RichImage>
  descriptionRaw?: Maybe<Scalars['JSON']['output']>
  seo?: Maybe<Seo>
  successMessage?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type MagazineFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  coverImage?: InputMaybe<RichImageFilter>
  seo?: InputMaybe<SeoFilter>
  successMessage?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type MagazineSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  coverImage?: InputMaybe<RichImageSorting>
  seo?: InputMaybe<SeoSorting>
  successMessage?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface MediaTag extends Document {
  __typename: 'MediaTag'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  name?: Maybe<Slug>
}

export type MediaTagFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  name?: InputMaybe<SlugFilter>
}

export type MediaTagSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  name?: InputMaybe<SlugSorting>
}

export interface Menu extends Document {
  __typename: 'Menu'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  footerMenuItems?: Maybe<Array<Maybe<MenuLink>>>
  menuItems?: Maybe<Array<Maybe<MenuLinkOrSubMenu>>>
}

export type MenuFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
}

export interface MenuLink {
  __typename: 'MenuLink'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** Have this link launch an action instead of linking to a page. (If selected, this will override any linked document) */
  action?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
  link?: Maybe<InternalLink>
  linkType?: Maybe<Scalars['String']['output']>
  link_external?: Maybe<ExternalLink>
}

export type MenuLinkFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  action?: InputMaybe<StringFilter>
  label?: InputMaybe<StringFilter>
  link?: InputMaybe<InternalLinkFilter>
  linkType?: InputMaybe<StringFilter>
  link_external?: InputMaybe<ExternalLinkFilter>
}

export type MenuLinkOrSubMenu = MenuLink | SubMenu

export type MenuLinkSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  action?: InputMaybe<SortOrder>
  label?: InputMaybe<SortOrder>
  link?: InputMaybe<InternalLinkSorting>
  linkType?: InputMaybe<SortOrder>
  link_external?: InputMaybe<ExternalLinkSorting>
}

export interface MenuSettings {
  __typename: 'MenuSettings'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  links?: Maybe<Array<Maybe<CollectionGroupOrLinkExternalOrLinkInternal>>>
}

export type MenuSettingsFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
}

export type MenuSettingsSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
}

export type MenuSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
}

export interface ModuleImage {
  __typename: 'ModuleImage'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  callToAction?: Maybe<ImageCallToAction>
  caption?: Maybe<Scalars['String']['output']>
  image?: Maybe<Image>
  productHotspots?: Maybe<Array<Maybe<Spot>>>
  productTags?: Maybe<Array<Maybe<ProductWithVariant>>>
  variant?: Maybe<Scalars['String']['output']>
}

export type ModuleImageFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  callToAction?: InputMaybe<ImageCallToActionFilter>
  caption?: InputMaybe<StringFilter>
  image?: InputMaybe<ImageFilter>
  variant?: InputMaybe<StringFilter>
}

export type ModuleImageSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  callToAction?: InputMaybe<ImageCallToActionSorting>
  caption?: InputMaybe<SortOrder>
  image?: InputMaybe<ImageSorting>
  variant?: InputMaybe<SortOrder>
}

export interface ModuleImages {
  __typename: 'ModuleImages'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** Display single image at full width (on larger breakpoints) */
  fullWidth?: Maybe<Scalars['Boolean']['output']>
  modules?: Maybe<Array<Maybe<ModuleImage>>>
  verticalAlign?: Maybe<Scalars['String']['output']>
}

export type ModuleImagesFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  fullWidth?: InputMaybe<BooleanFilter>
  verticalAlign?: InputMaybe<StringFilter>
}

export type ModuleImagesSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  fullWidth?: InputMaybe<SortOrder>
  verticalAlign?: InputMaybe<SortOrder>
}

export interface ModuleInstagram {
  __typename: 'ModuleInstagram'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type ModuleInstagramFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  url?: InputMaybe<StringFilter>
}

export type ModuleInstagramSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  url?: InputMaybe<SortOrder>
}

export interface ModuleProduct {
  __typename: 'ModuleProduct'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  productWithVariant?: Maybe<ProductWithVariant>
}

export type ModuleProductFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  productWithVariant?: InputMaybe<ProductWithVariantFilter>
}

export type ModuleProductSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  productWithVariant?: InputMaybe<ProductWithVariantSorting>
}

export interface ModuleProducts {
  __typename: 'ModuleProducts'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  layout?: Maybe<Scalars['String']['output']>
  modules?: Maybe<Array<Maybe<ModuleProduct>>>
}

export type ModuleProductsFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  layout?: InputMaybe<StringFilter>
}

export type ModuleProductsSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  layout?: InputMaybe<SortOrder>
}

export interface NewCustomer extends Document {
  __typename: 'NewCustomer'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  backgroundImage?: Maybe<RichImage>
  seo?: Maybe<Seo>
  title?: Maybe<Scalars['String']['output']>
}

export type NewCustomerFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  backgroundImage?: InputMaybe<RichImageFilter>
  seo?: InputMaybe<SeoFilter>
  title?: InputMaybe<StringFilter>
}

export type NewCustomerSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  backgroundImage?: InputMaybe<RichImageSorting>
  seo?: InputMaybe<SeoSorting>
  title?: InputMaybe<SortOrder>
}

export interface NotFoundPage {
  __typename: 'NotFoundPage'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  body?: Maybe<Scalars['String']['output']>
  /** Collection products displayed on this page */
  collection?: Maybe<Collection>
  title?: Maybe<Scalars['String']['output']>
}

export type NotFoundPageFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  body?: InputMaybe<StringFilter>
  collection?: InputMaybe<CollectionFilter>
  title?: InputMaybe<StringFilter>
}

export type NotFoundPageSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  body?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface Option {
  __typename: 'Option'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  values?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type OptionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
}

export type OptionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
}

export interface Page extends Document {
  __typename: 'Page'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  content?: Maybe<Array<Maybe<CarouselOrEmbedBlockOrImageTextBlockOrTextBlock>>>
  /** When on, padding above and below the content blocks will be removed */
  fullWidth?: Maybe<Scalars['Boolean']['output']>
  hero?: Maybe<Hero>
  hideTitle?: Maybe<Scalars['Boolean']['output']>
  seo?: Maybe<Seo>
  slug?: Maybe<Slug>
  subtitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type PageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  fullWidth?: InputMaybe<BooleanFilter>
  hero?: InputMaybe<HeroFilter>
  hideTitle?: InputMaybe<BooleanFilter>
  seo?: InputMaybe<SeoFilter>
  slug?: InputMaybe<SlugFilter>
  subtitle?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export interface PageInfo {
  __typename: 'PageInfo'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  hasNextPage?: Maybe<Scalars['Boolean']['output']>
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>
}

export type PageInfoFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  hasNextPage?: InputMaybe<BooleanFilter>
  hasPreviousPage?: InputMaybe<BooleanFilter>
}

export type PageInfoSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  hasNextPage?: InputMaybe<SortOrder>
  hasPreviousPage?: InputMaybe<SortOrder>
}

export interface PageLink {
  __typename: 'PageLink'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** Optional. Defaults to "Learn more" */
  ctaText?: Maybe<Scalars['String']['output']>
  image?: Maybe<RichImage>
  linkedPage?: Maybe<AboutOrAppointmentsOrCollectionOrContactOrCustomizeOrFaqOrJournalEntryOrJournalPageOrMagazineOrPageOrPaymentPlansOrProductOrTeamPage>
  summary?: Maybe<Scalars['String']['output']>
  /** Optional. By default the linked page title will be used. */
  title?: Maybe<Scalars['String']['output']>
}

export type PageLinkFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  ctaText?: InputMaybe<StringFilter>
  image?: InputMaybe<RichImageFilter>
  summary?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type PageLinkSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  ctaText?: InputMaybe<SortOrder>
  image?: InputMaybe<RichImageSorting>
  summary?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export type PageSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  fullWidth?: InputMaybe<SortOrder>
  hero?: InputMaybe<HeroSorting>
  hideTitle?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  slug?: InputMaybe<SlugSorting>
  subtitle?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface PaymentPlans extends Document {
  __typename: 'PaymentPlans'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  providers?: Maybe<Array<Maybe<PaymentProvider>>>
  seo?: Maybe<Seo>
  title?: Maybe<Scalars['String']['output']>
}

export type PaymentPlansFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  seo?: InputMaybe<SeoFilter>
  title?: InputMaybe<StringFilter>
}

export type PaymentPlansSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  title?: InputMaybe<SortOrder>
}

export interface PaymentProvider {
  __typename: 'PaymentProvider'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  logo?: Maybe<RichImage>
  name?: Maybe<Scalars['String']['output']>
}

export type PaymentProviderFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  logo?: InputMaybe<RichImageFilter>
  name?: InputMaybe<StringFilter>
}

export type PaymentProviderSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  logo?: InputMaybe<RichImageSorting>
  name?: InputMaybe<SortOrder>
}

export interface PdfLink {
  __typename: 'PdfLink'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  pdf?: Maybe<File>
  title?: Maybe<Scalars['String']['output']>
}

export type PdfLinkFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  pdf?: InputMaybe<FileFilter>
  title?: InputMaybe<StringFilter>
}

export type PdfLinkSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  pdf?: InputMaybe<FileSorting>
  title?: InputMaybe<SortOrder>
}

export interface PriceRange {
  __typename: 'PriceRange'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  maxVariantPrice?: Maybe<Scalars['Float']['output']>
  minVariantPrice?: Maybe<Scalars['Float']['output']>
}

export type PriceRangeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  maxVariantPrice?: InputMaybe<FloatFilter>
  minVariantPrice?: InputMaybe<FloatFilter>
}

export interface PriceRangeMinMaxFilter {
  __typename: 'PriceRangeMinMaxFilter'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  maxPrice?: Maybe<Scalars['Float']['output']>
  minPrice?: Maybe<Scalars['Float']['output']>
}

export type PriceRangeMinMaxFilterFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  maxPrice?: InputMaybe<FloatFilter>
  minPrice?: InputMaybe<FloatFilter>
}

export type PriceRangeMinMaxFilterSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  maxPrice?: InputMaybe<SortOrder>
  minPrice?: InputMaybe<SortOrder>
}

export type PriceRangeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  maxVariantPrice?: InputMaybe<SortOrder>
  minVariantPrice?: InputMaybe<SortOrder>
}

export interface Product extends Document {
  __typename: 'Product'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  archived?: Maybe<Scalars['Boolean']['output']>
  collections?: Maybe<Array<Maybe<Collection>>>
  contentAfter?: Maybe<Array<Maybe<ImageTextBlock>>>
  handle?: Maybe<Scalars['String']['output']>
  handleProxy?: Maybe<Scalars['String']['output']>
  hidden?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to hide this product from collection pages. The product will still be viewable at its URL */
  hideFromCollections?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to hide this product from search results. The product will still be viewable at its URL */
  hideFromSearch?: Maybe<Scalars['Boolean']['output']>
  info?: Maybe<Array<Maybe<ProductInfo>>>
  initialVariantSelections?: Maybe<Array<Maybe<InitialVariantSelection>>>
  /** Toggle this to ON to hide a product's price and show an inquiry button instead of "Add to Cart" */
  inquiryOnly?: Maybe<Scalars['Boolean']['output']>
  options?: Maybe<Array<Maybe<ProductOption>>>
  related?: Maybe<Carousel>
  seo?: Maybe<Seo>
  shopifyId?: Maybe<Scalars['String']['output']>
  showInCollections?: Maybe<Array<Maybe<Collection>>>
  store?: Maybe<ShopifyProductDef>
  title?: Maybe<Scalars['String']['output']>
  titleProxy?: Maybe<Scalars['String']['output']>
}

export type ProductFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  archived?: InputMaybe<BooleanFilter>
  handle?: InputMaybe<StringFilter>
  handleProxy?: InputMaybe<StringFilter>
  hidden?: InputMaybe<BooleanFilter>
  hideFromCollections?: InputMaybe<BooleanFilter>
  hideFromSearch?: InputMaybe<BooleanFilter>
  inquiryOnly?: InputMaybe<BooleanFilter>
  related?: InputMaybe<CarouselFilter>
  seo?: InputMaybe<SeoFilter>
  shopifyId?: InputMaybe<StringFilter>
  store?: InputMaybe<ShopifyProductDefFilter>
  title?: InputMaybe<StringFilter>
  titleProxy?: InputMaybe<StringFilter>
}

export interface ProductInfo {
  __typename: 'ProductInfo'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  body_intlRaw?: Maybe<Scalars['JSON']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export interface ProductInfoByTag {
  __typename: 'ProductInfoByTag'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  info?: Maybe<Array<Maybe<ProductInfo>>>
  /** Tag to match from Shopify. */
  tag?: Maybe<Scalars['String']['output']>
}

export type ProductInfoByTagFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  tag?: InputMaybe<StringFilter>
}

export type ProductInfoByTagSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  tag?: InputMaybe<SortOrder>
}

export interface ProductInfoByType {
  __typename: 'ProductInfoByType'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  info?: Maybe<Array<Maybe<ProductInfo>>>
  /** Type to match from Shopify. */
  type?: Maybe<Scalars['String']['output']>
}

export type ProductInfoByTypeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  type?: InputMaybe<StringFilter>
}

export type ProductInfoByTypeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  type?: InputMaybe<SortOrder>
}

export type ProductInfoFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export interface ProductInfoSettings extends Document {
  __typename: 'ProductInfoSettings'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  excludeFromStockIndication?: Maybe<Array<Maybe<Product>>>
  globalInfo?: Maybe<Array<Maybe<ProductInfo>>>
  /** Use these fields to add snippets of descriptions to all or some projects. For instance, you could add a 'Shipping and Returns' accordion on all items, a 'Ring Sizing Guide' accordion to all Rings, and an 'About Black Gold' accordion to any product tagged with 'Black Gold'. These accordions will be displayed in accordion-dropdowns below the main product information. You can also add info accordions to individual items on their page here in the CMS. */
  helpText?: Maybe<Scalars['String']['output']>
  infoByTag?: Maybe<Array<Maybe<ProductInfoByTag>>>
  infoByType?: Maybe<Array<Maybe<ProductInfoByType>>>
  tagBadges?: Maybe<Array<Maybe<TagBadge>>>
}

export type ProductInfoSettingsFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  helpText?: InputMaybe<StringFilter>
}

export type ProductInfoSettingsSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  helpText?: InputMaybe<SortOrder>
}

export type ProductInfoSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface ProductListingSettings extends Document {
  __typename: 'ProductListingSettings'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  defaultFilter?: Maybe<
    Array<Maybe<FilterOrFilterSetOrInStockFilterOrPriceRangeMinMaxFilter>>
  >
  /** Use these fields to define a default set of filters to be used on collection pages and in search results. You can add specific filter configuration to each Collection within their own documents. */
  helpText?: Maybe<Scalars['String']['output']>
  newDefaultFilter?: Maybe<
    Array<Maybe<FilterOrFilterSetOrInStockFilterOrPriceRangeMinMaxFilter>>
  >
}

export type ProductListingSettingsFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  helpText?: InputMaybe<StringFilter>
}

export type ProductListingSettingsSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  helpText?: InputMaybe<SortOrder>
}

export interface ProductOption {
  __typename: 'ProductOption'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  values?: Maybe<Array<Maybe<ProductOptionValue>>>
}

export type ProductOptionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
}

export type ProductOptionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
}

export interface ProductOptionValue {
  __typename: 'ProductOptionValue'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** Cloudinary Video ID (looping render) */
  animation?: Maybe<Scalars['String']['output']>
  descriptionRaw?: Maybe<Scalars['JSON']['output']>
  hover_image?: Maybe<Image>
  /** If Karat swatch, link to associated stone. */
  stone?: Maybe<Stone>
  swatch?: Maybe<Image>
  value?: Maybe<Scalars['String']['output']>
}

export type ProductOptionValueFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  animation?: InputMaybe<StringFilter>
  hover_image?: InputMaybe<ImageFilter>
  stone?: InputMaybe<StoneFilter>
  swatch?: InputMaybe<ImageFilter>
  value?: InputMaybe<StringFilter>
}

export type ProductOptionValueSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  animation?: InputMaybe<SortOrder>
  hover_image?: InputMaybe<ImageSorting>
  swatch?: InputMaybe<ImageSorting>
  value?: InputMaybe<SortOrder>
}

export type ProductSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  archived?: InputMaybe<SortOrder>
  handle?: InputMaybe<SortOrder>
  handleProxy?: InputMaybe<SortOrder>
  hidden?: InputMaybe<SortOrder>
  hideFromCollections?: InputMaybe<SortOrder>
  hideFromSearch?: InputMaybe<SortOrder>
  inquiryOnly?: InputMaybe<SortOrder>
  related?: InputMaybe<CarouselSorting>
  seo?: InputMaybe<SeoSorting>
  shopifyId?: InputMaybe<SortOrder>
  store?: InputMaybe<ShopifyProductDefSorting>
  title?: InputMaybe<SortOrder>
  titleProxy?: InputMaybe<SortOrder>
}

export interface ProductWithVariant {
  __typename: 'ProductWithVariant'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  product?: Maybe<Product>
}

export type ProductWithVariantFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  product?: InputMaybe<ProductFilter>
}

export type ProductWithVariantSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
}

export interface QueryParam {
  __typename: 'QueryParam'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  key?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['String']['output']>
}

export type QueryParamFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  key?: InputMaybe<StringFilter>
  value?: InputMaybe<StringFilter>
}

export type QueryParamSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  key?: InputMaybe<SortOrder>
  value?: InputMaybe<SortOrder>
}

export interface QuizBlock {
  __typename: 'QuizBlock'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  image?: Maybe<RichImage>
  subtitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type QuizBlockFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  image?: InputMaybe<RichImageFilter>
  subtitle?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type QuizBlockSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  image?: InputMaybe<RichImageSorting>
  subtitle?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface QuizProductType {
  __typename: 'QuizProductType'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  image?: Maybe<RichImage>
  title?: Maybe<Scalars['String']['output']>
}

export type QuizProductTypeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  image?: InputMaybe<RichImageFilter>
  title?: InputMaybe<StringFilter>
}

export type QuizProductTypeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  image?: InputMaybe<RichImageSorting>
  title?: InputMaybe<SortOrder>
}

export interface RgbaColor {
  __typename: 'RgbaColor'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  a?: Maybe<Scalars['Float']['output']>
  b?: Maybe<Scalars['Float']['output']>
  g?: Maybe<Scalars['Float']['output']>
  r?: Maybe<Scalars['Float']['output']>
}

export type RgbaColorFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  a?: InputMaybe<FloatFilter>
  b?: InputMaybe<FloatFilter>
  g?: InputMaybe<FloatFilter>
  r?: InputMaybe<FloatFilter>
}

export type RgbaColorSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  a?: InputMaybe<SortOrder>
  b?: InputMaybe<SortOrder>
  g?: InputMaybe<SortOrder>
  r?: InputMaybe<SortOrder>
}

export interface RichImage {
  __typename: 'RichImage'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** A short description of the image. Helps with accessibility and SEO */
  altText?: Maybe<Scalars['String']['output']>
  asset?: Maybe<SanityImageAsset>
  caption?: Maybe<Scalars['String']['output']>
  crop?: Maybe<SanityImageCrop>
  hotspot?: Maybe<SanityImageHotspot>
}

export type RichImageFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  altText?: InputMaybe<StringFilter>
  asset?: InputMaybe<SanityImageAssetFilter>
  caption?: InputMaybe<StringFilter>
  crop?: InputMaybe<SanityImageCropFilter>
  hotspot?: InputMaybe<SanityImageHotspotFilter>
}

export type RichImageSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  altText?: InputMaybe<SortOrder>
  caption?: InputMaybe<SortOrder>
  crop?: InputMaybe<SanityImageCropSorting>
  hotspot?: InputMaybe<SanityImageHotspotSorting>
}

export interface RichPageLink {
  __typename: 'RichPageLink'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  captionRaw?: Maybe<Scalars['JSON']['output']>
  document?: Maybe<CollectionOrPageOrProduct>
  hoverImage?: Maybe<RichImage>
  image?: Maybe<RichImage>
  /** If left empty, the title of the linked page, product, or collection will be used. */
  title?: Maybe<Scalars['String']['output']>
}

export type RichPageLinkFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  hoverImage?: InputMaybe<RichImageFilter>
  image?: InputMaybe<RichImageFilter>
  title?: InputMaybe<StringFilter>
}

export type RichPageLinkSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  hoverImage?: InputMaybe<RichImageSorting>
  image?: InputMaybe<RichImageSorting>
  title?: InputMaybe<SortOrder>
}

export interface RootQuery {
  __typename: 'RootQuery'
  About?: Maybe<About>
  Appointments?: Maybe<Appointments>
  Birthdays?: Maybe<Birthdays>
  Collection?: Maybe<Collection>
  Contact?: Maybe<Contact>
  CustomerCare?: Maybe<CustomerCare>
  Customize?: Maybe<Customize>
  Directory?: Maybe<Directory>
  Document?: Maybe<Document>
  EmailSignatureSettings?: Maybe<EmailSignatureSettings>
  Faq?: Maybe<Faq>
  Homepage?: Maybe<Homepage>
  JournalEntry?: Maybe<JournalEntry>
  JournalPage?: Maybe<JournalPage>
  Loyalty?: Maybe<Loyalty>
  Magazine?: Maybe<Magazine>
  MediaTag?: Maybe<MediaTag>
  Menu?: Maybe<Menu>
  NewCustomer?: Maybe<NewCustomer>
  Page?: Maybe<Page>
  PaymentPlans?: Maybe<PaymentPlans>
  Product?: Maybe<Product>
  ProductInfoSettings?: Maybe<ProductInfoSettings>
  ProductListingSettings?: Maybe<ProductListingSettings>
  SanityFileAsset?: Maybe<SanityFileAsset>
  SanityImageAsset?: Maybe<SanityImageAsset>
  ShopifyCollection?: Maybe<ShopifyCollection>
  ShopifyProduct?: Maybe<ShopifyProduct>
  SiteSettings?: Maybe<SiteSettings>
  Stone?: Maybe<Stone>
  TeamPage?: Maybe<TeamPage>
  allAbout: Array<About>
  allAppointments: Array<Appointments>
  allBirthdays: Array<Birthdays>
  allCollection: Array<Collection>
  allContact: Array<Contact>
  allCustomerCare: Array<CustomerCare>
  allCustomize: Array<Customize>
  allDirectory: Array<Directory>
  allEmailSignatureSettings: Array<EmailSignatureSettings>
  allFaq: Array<Faq>
  allHomepage: Array<Homepage>
  allJournalEntry: Array<JournalEntry>
  allJournalPage: Array<JournalPage>
  allLoyalty: Array<Loyalty>
  allMagazine: Array<Magazine>
  allMediaTag: Array<MediaTag>
  allMenu: Array<Menu>
  allNewCustomer: Array<NewCustomer>
  allPage: Array<Page>
  allPaymentPlans: Array<PaymentPlans>
  allProduct: Array<Product>
  allProductInfoSettings: Array<ProductInfoSettings>
  allProductListingSettings: Array<ProductListingSettings>
  allSanityFileAsset: Array<SanityFileAsset>
  allSanityImageAsset: Array<SanityImageAsset>
  allShopifyCollection: Array<ShopifyCollection>
  allShopifyProduct: Array<ShopifyProduct>
  allSiteSettings: Array<SiteSettings>
  allStone: Array<Stone>
  allTeamPage: Array<TeamPage>
}

export type RootQueryAboutArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryAppointmentsArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryBirthdaysArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryCollectionArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryContactArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryCustomerCareArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryCustomizeArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryDirectoryArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryDocumentArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryEmailSignatureSettingsArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryFaqArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryHomepageArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryJournalEntryArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryJournalPageArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryLoyaltyArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryMagazineArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryMediaTagArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryMenuArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryNewCustomerArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryPageArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryPaymentPlansArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryProductArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryProductInfoSettingsArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryProductListingSettingsArgs = {
  id: Scalars['ID']['input']
}

export type RootQuerySanityFileAssetArgs = {
  id: Scalars['ID']['input']
}

export type RootQuerySanityImageAssetArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryShopifyCollectionArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryShopifyProductArgs = {
  id: Scalars['ID']['input']
}

export type RootQuerySiteSettingsArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryStoneArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryTeamPageArgs = {
  id: Scalars['ID']['input']
}

export type RootQueryAllAboutArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<AboutSorting>>
  where?: InputMaybe<AboutFilter>
}

export type RootQueryAllAppointmentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<AppointmentsSorting>>
  where?: InputMaybe<AppointmentsFilter>
}

export type RootQueryAllBirthdaysArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<BirthdaysSorting>>
  where?: InputMaybe<BirthdaysFilter>
}

export type RootQueryAllCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<CollectionSorting>>
  where?: InputMaybe<CollectionFilter>
}

export type RootQueryAllContactArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<ContactSorting>>
  where?: InputMaybe<ContactFilter>
}

export type RootQueryAllCustomerCareArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<CustomerCareSorting>>
  where?: InputMaybe<CustomerCareFilter>
}

export type RootQueryAllCustomizeArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<CustomizeSorting>>
  where?: InputMaybe<CustomizeFilter>
}

export type RootQueryAllDirectoryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<DirectorySorting>>
  where?: InputMaybe<DirectoryFilter>
}

export type RootQueryAllEmailSignatureSettingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<EmailSignatureSettingsSorting>>
  where?: InputMaybe<EmailSignatureSettingsFilter>
}

export type RootQueryAllFaqArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<FaqSorting>>
  where?: InputMaybe<FaqFilter>
}

export type RootQueryAllHomepageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<HomepageSorting>>
  where?: InputMaybe<HomepageFilter>
}

export type RootQueryAllJournalEntryArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<JournalEntrySorting>>
  where?: InputMaybe<JournalEntryFilter>
}

export type RootQueryAllJournalPageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<JournalPageSorting>>
  where?: InputMaybe<JournalPageFilter>
}

export type RootQueryAllLoyaltyArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<LoyaltySorting>>
  where?: InputMaybe<LoyaltyFilter>
}

export type RootQueryAllMagazineArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<MagazineSorting>>
  where?: InputMaybe<MagazineFilter>
}

export type RootQueryAllMediaTagArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<MediaTagSorting>>
  where?: InputMaybe<MediaTagFilter>
}

export type RootQueryAllMenuArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<MenuSorting>>
  where?: InputMaybe<MenuFilter>
}

export type RootQueryAllNewCustomerArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<NewCustomerSorting>>
  where?: InputMaybe<NewCustomerFilter>
}

export type RootQueryAllPageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<PageSorting>>
  where?: InputMaybe<PageFilter>
}

export type RootQueryAllPaymentPlansArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<PaymentPlansSorting>>
  where?: InputMaybe<PaymentPlansFilter>
}

export type RootQueryAllProductArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<ProductSorting>>
  where?: InputMaybe<ProductFilter>
}

export type RootQueryAllProductInfoSettingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<ProductInfoSettingsSorting>>
  where?: InputMaybe<ProductInfoSettingsFilter>
}

export type RootQueryAllProductListingSettingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<ProductListingSettingsSorting>>
  where?: InputMaybe<ProductListingSettingsFilter>
}

export type RootQueryAllSanityFileAssetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<SanityFileAssetSorting>>
  where?: InputMaybe<SanityFileAssetFilter>
}

export type RootQueryAllSanityImageAssetArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<SanityImageAssetSorting>>
  where?: InputMaybe<SanityImageAssetFilter>
}

export type RootQueryAllShopifyCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<ShopifyCollectionSorting>>
  where?: InputMaybe<ShopifyCollectionFilter>
}

export type RootQueryAllShopifyProductArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<ShopifyProductSorting>>
  where?: InputMaybe<ShopifyProductFilter>
}

export type RootQueryAllSiteSettingsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<SiteSettingsSorting>>
  where?: InputMaybe<SiteSettingsFilter>
}

export type RootQueryAllStoneArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<StoneSorting>>
  where?: InputMaybe<StoneFilter>
}

export type RootQueryAllTeamPageArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort?: InputMaybe<Array<TeamPageSorting>>
  where?: InputMaybe<TeamPageFilter>
}

export interface SanityAssetSourceData {
  __typename: 'SanityAssetSourceData'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** The unique ID for the asset within the originating source so you can programatically find back to it */
  id?: Maybe<Scalars['String']['output']>
  /** A canonical name for the source this asset is originating from */
  name?: Maybe<Scalars['String']['output']>
  /** A URL to find more information about this asset in the originating source */
  url?: Maybe<Scalars['String']['output']>
}

export type SanityAssetSourceDataFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  url?: InputMaybe<StringFilter>
}

export type SanityAssetSourceDataSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  url?: InputMaybe<SortOrder>
}

export interface SanityFileAsset extends Document {
  __typename: 'SanityFileAsset'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  altText?: Maybe<Scalars['String']['output']>
  assetId?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  extension?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
  mimeType?: Maybe<Scalars['String']['output']>
  originalFilename?: Maybe<Scalars['String']['output']>
  path?: Maybe<Scalars['String']['output']>
  sha1hash?: Maybe<Scalars['String']['output']>
  size?: Maybe<Scalars['Float']['output']>
  source?: Maybe<SanityAssetSourceData>
  title?: Maybe<Scalars['String']['output']>
  uploadId?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type SanityFileAssetFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  altText?: InputMaybe<StringFilter>
  assetId?: InputMaybe<StringFilter>
  description?: InputMaybe<StringFilter>
  extension?: InputMaybe<StringFilter>
  label?: InputMaybe<StringFilter>
  mimeType?: InputMaybe<StringFilter>
  originalFilename?: InputMaybe<StringFilter>
  path?: InputMaybe<StringFilter>
  sha1hash?: InputMaybe<StringFilter>
  size?: InputMaybe<FloatFilter>
  source?: InputMaybe<SanityAssetSourceDataFilter>
  title?: InputMaybe<StringFilter>
  uploadId?: InputMaybe<StringFilter>
  url?: InputMaybe<StringFilter>
}

export type SanityFileAssetSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  altText?: InputMaybe<SortOrder>
  assetId?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  extension?: InputMaybe<SortOrder>
  label?: InputMaybe<SortOrder>
  mimeType?: InputMaybe<SortOrder>
  originalFilename?: InputMaybe<SortOrder>
  path?: InputMaybe<SortOrder>
  sha1hash?: InputMaybe<SortOrder>
  size?: InputMaybe<SortOrder>
  source?: InputMaybe<SanityAssetSourceDataSorting>
  title?: InputMaybe<SortOrder>
  uploadId?: InputMaybe<SortOrder>
  url?: InputMaybe<SortOrder>
}

export interface SanityImageAsset extends Document {
  __typename: 'SanityImageAsset'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  altText?: Maybe<Scalars['String']['output']>
  assetId?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  extension?: Maybe<Scalars['String']['output']>
  label?: Maybe<Scalars['String']['output']>
  metadata?: Maybe<SanityImageMetadata>
  mimeType?: Maybe<Scalars['String']['output']>
  originalFilename?: Maybe<Scalars['String']['output']>
  path?: Maybe<Scalars['String']['output']>
  sha1hash?: Maybe<Scalars['String']['output']>
  size?: Maybe<Scalars['Float']['output']>
  source?: Maybe<SanityAssetSourceData>
  title?: Maybe<Scalars['String']['output']>
  uploadId?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
}

export type SanityImageAssetFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  altText?: InputMaybe<StringFilter>
  assetId?: InputMaybe<StringFilter>
  description?: InputMaybe<StringFilter>
  extension?: InputMaybe<StringFilter>
  label?: InputMaybe<StringFilter>
  metadata?: InputMaybe<SanityImageMetadataFilter>
  mimeType?: InputMaybe<StringFilter>
  originalFilename?: InputMaybe<StringFilter>
  path?: InputMaybe<StringFilter>
  sha1hash?: InputMaybe<StringFilter>
  size?: InputMaybe<FloatFilter>
  source?: InputMaybe<SanityAssetSourceDataFilter>
  title?: InputMaybe<StringFilter>
  uploadId?: InputMaybe<StringFilter>
  url?: InputMaybe<StringFilter>
}

export type SanityImageAssetSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  altText?: InputMaybe<SortOrder>
  assetId?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  extension?: InputMaybe<SortOrder>
  label?: InputMaybe<SortOrder>
  metadata?: InputMaybe<SanityImageMetadataSorting>
  mimeType?: InputMaybe<SortOrder>
  originalFilename?: InputMaybe<SortOrder>
  path?: InputMaybe<SortOrder>
  sha1hash?: InputMaybe<SortOrder>
  size?: InputMaybe<SortOrder>
  source?: InputMaybe<SanityAssetSourceDataSorting>
  title?: InputMaybe<SortOrder>
  uploadId?: InputMaybe<SortOrder>
  url?: InputMaybe<SortOrder>
}

export interface SanityImageCrop {
  __typename: 'SanityImageCrop'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  bottom?: Maybe<Scalars['Float']['output']>
  left?: Maybe<Scalars['Float']['output']>
  right?: Maybe<Scalars['Float']['output']>
  top?: Maybe<Scalars['Float']['output']>
}

export type SanityImageCropFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  bottom?: InputMaybe<FloatFilter>
  left?: InputMaybe<FloatFilter>
  right?: InputMaybe<FloatFilter>
  top?: InputMaybe<FloatFilter>
}

export type SanityImageCropSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  bottom?: InputMaybe<SortOrder>
  left?: InputMaybe<SortOrder>
  right?: InputMaybe<SortOrder>
  top?: InputMaybe<SortOrder>
}

export interface SanityImageDimensions {
  __typename: 'SanityImageDimensions'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  aspectRatio?: Maybe<Scalars['Float']['output']>
  height?: Maybe<Scalars['Float']['output']>
  width?: Maybe<Scalars['Float']['output']>
}

export type SanityImageDimensionsFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  aspectRatio?: InputMaybe<FloatFilter>
  height?: InputMaybe<FloatFilter>
  width?: InputMaybe<FloatFilter>
}

export type SanityImageDimensionsSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  aspectRatio?: InputMaybe<SortOrder>
  height?: InputMaybe<SortOrder>
  width?: InputMaybe<SortOrder>
}

export interface SanityImageHotspot {
  __typename: 'SanityImageHotspot'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  height?: Maybe<Scalars['Float']['output']>
  width?: Maybe<Scalars['Float']['output']>
  x?: Maybe<Scalars['Float']['output']>
  y?: Maybe<Scalars['Float']['output']>
}

export type SanityImageHotspotFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  height?: InputMaybe<FloatFilter>
  width?: InputMaybe<FloatFilter>
  x?: InputMaybe<FloatFilter>
  y?: InputMaybe<FloatFilter>
}

export type SanityImageHotspotSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  height?: InputMaybe<SortOrder>
  width?: InputMaybe<SortOrder>
  x?: InputMaybe<SortOrder>
  y?: InputMaybe<SortOrder>
}

export interface SanityImageMetadata {
  __typename: 'SanityImageMetadata'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  blurHash?: Maybe<Scalars['String']['output']>
  dimensions?: Maybe<SanityImageDimensions>
  hasAlpha?: Maybe<Scalars['Boolean']['output']>
  isOpaque?: Maybe<Scalars['Boolean']['output']>
  location?: Maybe<Geopoint>
  lqip?: Maybe<Scalars['String']['output']>
  palette?: Maybe<SanityImagePalette>
}

export type SanityImageMetadataFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  blurHash?: InputMaybe<StringFilter>
  dimensions?: InputMaybe<SanityImageDimensionsFilter>
  hasAlpha?: InputMaybe<BooleanFilter>
  isOpaque?: InputMaybe<BooleanFilter>
  location?: InputMaybe<GeopointFilter>
  lqip?: InputMaybe<StringFilter>
  palette?: InputMaybe<SanityImagePaletteFilter>
}

export type SanityImageMetadataSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  blurHash?: InputMaybe<SortOrder>
  dimensions?: InputMaybe<SanityImageDimensionsSorting>
  hasAlpha?: InputMaybe<SortOrder>
  isOpaque?: InputMaybe<SortOrder>
  location?: InputMaybe<GeopointSorting>
  lqip?: InputMaybe<SortOrder>
  palette?: InputMaybe<SanityImagePaletteSorting>
}

export interface SanityImagePalette {
  __typename: 'SanityImagePalette'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  darkMuted?: Maybe<SanityImagePaletteSwatch>
  darkVibrant?: Maybe<SanityImagePaletteSwatch>
  dominant?: Maybe<SanityImagePaletteSwatch>
  lightMuted?: Maybe<SanityImagePaletteSwatch>
  lightVibrant?: Maybe<SanityImagePaletteSwatch>
  muted?: Maybe<SanityImagePaletteSwatch>
  vibrant?: Maybe<SanityImagePaletteSwatch>
}

export type SanityImagePaletteFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  darkMuted?: InputMaybe<SanityImagePaletteSwatchFilter>
  darkVibrant?: InputMaybe<SanityImagePaletteSwatchFilter>
  dominant?: InputMaybe<SanityImagePaletteSwatchFilter>
  lightMuted?: InputMaybe<SanityImagePaletteSwatchFilter>
  lightVibrant?: InputMaybe<SanityImagePaletteSwatchFilter>
  muted?: InputMaybe<SanityImagePaletteSwatchFilter>
  vibrant?: InputMaybe<SanityImagePaletteSwatchFilter>
}

export type SanityImagePaletteSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  darkMuted?: InputMaybe<SanityImagePaletteSwatchSorting>
  darkVibrant?: InputMaybe<SanityImagePaletteSwatchSorting>
  dominant?: InputMaybe<SanityImagePaletteSwatchSorting>
  lightMuted?: InputMaybe<SanityImagePaletteSwatchSorting>
  lightVibrant?: InputMaybe<SanityImagePaletteSwatchSorting>
  muted?: InputMaybe<SanityImagePaletteSwatchSorting>
  vibrant?: InputMaybe<SanityImagePaletteSwatchSorting>
}

export interface SanityImagePaletteSwatch {
  __typename: 'SanityImagePaletteSwatch'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  background?: Maybe<Scalars['String']['output']>
  foreground?: Maybe<Scalars['String']['output']>
  population?: Maybe<Scalars['Float']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type SanityImagePaletteSwatchFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  background?: InputMaybe<StringFilter>
  foreground?: InputMaybe<StringFilter>
  population?: InputMaybe<FloatFilter>
  title?: InputMaybe<StringFilter>
}

export type SanityImagePaletteSwatchSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  background?: InputMaybe<SortOrder>
  foreground?: InputMaybe<SortOrder>
  population?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface Seo {
  __typename: 'Seo'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  image?: Maybe<Image>
  /** Comma-separated SEO keywords */
  keywords?: Maybe<Scalars['String']['output']>
  /** title for search results */
  metaTitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type SeoFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  description?: InputMaybe<StringFilter>
  image?: InputMaybe<ImageFilter>
  keywords?: InputMaybe<StringFilter>
  metaTitle?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export interface SeoHome {
  __typename: 'SeoHome'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  image?: Maybe<Image>
  /** Comma-separated SEO keywords */
  keywords?: Maybe<Scalars['String']['output']>
  /** title for search results */
  metaTitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type SeoHomeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  description?: InputMaybe<StringFilter>
  image?: InputMaybe<ImageFilter>
  keywords?: InputMaybe<StringFilter>
  metaTitle?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type SeoHomeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  image?: InputMaybe<ImageSorting>
  keywords?: InputMaybe<SortOrder>
  metaTitle?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface SeoPage {
  __typename: 'SeoPage'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  image?: Maybe<Image>
  /** Comma-separated SEO keywords */
  keywords?: Maybe<Scalars['String']['output']>
  /** title for search results */
  metaTitle?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type SeoPageFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  description?: InputMaybe<StringFilter>
  image?: InputMaybe<ImageFilter>
  keywords?: InputMaybe<StringFilter>
  metaTitle?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type SeoPageSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  image?: InputMaybe<ImageSorting>
  keywords?: InputMaybe<SortOrder>
  metaTitle?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export type SeoSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  image?: InputMaybe<ImageSorting>
  keywords?: InputMaybe<SortOrder>
  metaTitle?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface ShopifyCollection extends Document {
  __typename: 'ShopifyCollection'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  archived?: Maybe<Scalars['Boolean']['output']>
  bambuser?: Maybe<BambuserSettings>
  collectionBlocks?: Maybe<Array<Maybe<CollectionBlock>>>
  customFilter?: Maybe<
    Array<Maybe<FilterOrFilterSetOrInStockFilterOrPriceRangeMinMaxFilter>>
  >
  descriptionRaw?: Maybe<Scalars['JSON']['output']>
  footer?: Maybe<Array<Maybe<CarouselOrImageTextBlockOrTextBlock>>>
  handle?: Maybe<Scalars['String']['output']>
  hero?: Maybe<Hero>
  /** Toggle this to ON to hide this collection. The product will still be viewable at its URL */
  hidden?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to remove all filters from the collection view. */
  hideFilter?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to change text color to white for all products in collection. */
  lightTheme?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to hide filter label, reset button, and sort tools. */
  minimalDisplay?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to only display the custom filters you add below. */
  overrideDefaultFilter?: Maybe<Scalars['Boolean']['output']>
  preferredVariantMatches?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  products?: Maybe<Array<Maybe<ShopifyProduct>>>
  /** Changes the layout to 2 columns on desktop, 1 column on tablet */
  reduceColumnCount?: Maybe<Scalars['Boolean']['output']>
  seo?: Maybe<Seo>
  shopifyId?: Maybe<Scalars['String']['output']>
  sourceData?: Maybe<ShopifySourceCollection>
  title?: Maybe<Scalars['String']['output']>
}

export interface ShopifyCollectionDef {
  __typename: 'ShopifyCollectionDef'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  createdAt?: Maybe<Scalars['String']['output']>
  descriptionHtml?: Maybe<Scalars['String']['output']>
  /** Require any condition if true, otherwise require all conditions */
  disjunctive?: Maybe<Scalars['Boolean']['output']>
  /** Shopify Collection GID */
  gid?: Maybe<Scalars['String']['output']>
  handle?: Maybe<Scalars['String']['output']>
  /** Shopify Collection ID */
  id?: Maybe<Scalars['Float']['output']>
  image?: Maybe<ShopifyCollectionImage>
  imageUrl?: Maybe<Scalars['String']['output']>
  isDeleted?: Maybe<Scalars['Boolean']['output']>
  rules?: Maybe<Array<Maybe<CollectionRule>>>
  slug?: Maybe<Slug>
  sortOrder?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['String']['output']>
}

export type ShopifyCollectionDefFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  createdAt?: InputMaybe<StringFilter>
  descriptionHtml?: InputMaybe<StringFilter>
  disjunctive?: InputMaybe<BooleanFilter>
  gid?: InputMaybe<StringFilter>
  handle?: InputMaybe<StringFilter>
  id?: InputMaybe<FloatFilter>
  image?: InputMaybe<ShopifyCollectionImageFilter>
  imageUrl?: InputMaybe<StringFilter>
  isDeleted?: InputMaybe<BooleanFilter>
  slug?: InputMaybe<SlugFilter>
  sortOrder?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<StringFilter>
}

export type ShopifyCollectionDefSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  descriptionHtml?: InputMaybe<SortOrder>
  disjunctive?: InputMaybe<SortOrder>
  gid?: InputMaybe<SortOrder>
  handle?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  image?: InputMaybe<ShopifyCollectionImageSorting>
  imageUrl?: InputMaybe<SortOrder>
  isDeleted?: InputMaybe<SortOrder>
  slug?: InputMaybe<SlugSorting>
  sortOrder?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type ShopifyCollectionFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  archived?: InputMaybe<BooleanFilter>
  bambuser?: InputMaybe<BambuserSettingsFilter>
  handle?: InputMaybe<StringFilter>
  hero?: InputMaybe<HeroFilter>
  hidden?: InputMaybe<BooleanFilter>
  hideFilter?: InputMaybe<BooleanFilter>
  lightTheme?: InputMaybe<BooleanFilter>
  minimalDisplay?: InputMaybe<BooleanFilter>
  overrideDefaultFilter?: InputMaybe<BooleanFilter>
  reduceColumnCount?: InputMaybe<BooleanFilter>
  seo?: InputMaybe<SeoFilter>
  shopifyId?: InputMaybe<StringFilter>
  sourceData?: InputMaybe<ShopifySourceCollectionFilter>
  title?: InputMaybe<StringFilter>
}

export interface ShopifyCollectionImage {
  __typename: 'ShopifyCollectionImage'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  altText?: Maybe<Scalars['String']['output']>
  height?: Maybe<Scalars['Float']['output']>
  src?: Maybe<Scalars['String']['output']>
  width?: Maybe<Scalars['Float']['output']>
}

export type ShopifyCollectionImageFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  altText?: InputMaybe<StringFilter>
  height?: InputMaybe<FloatFilter>
  src?: InputMaybe<StringFilter>
  width?: InputMaybe<FloatFilter>
}

export type ShopifyCollectionImageSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  altText?: InputMaybe<SortOrder>
  height?: InputMaybe<SortOrder>
  src?: InputMaybe<SortOrder>
  width?: InputMaybe<SortOrder>
}

export type ShopifyCollectionSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  archived?: InputMaybe<SortOrder>
  bambuser?: InputMaybe<BambuserSettingsSorting>
  handle?: InputMaybe<SortOrder>
  hero?: InputMaybe<HeroSorting>
  hidden?: InputMaybe<SortOrder>
  hideFilter?: InputMaybe<SortOrder>
  lightTheme?: InputMaybe<SortOrder>
  minimalDisplay?: InputMaybe<SortOrder>
  overrideDefaultFilter?: InputMaybe<SortOrder>
  reduceColumnCount?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  shopifyId?: InputMaybe<SortOrder>
  sourceData?: InputMaybe<ShopifySourceCollectionSorting>
  title?: InputMaybe<SortOrder>
}

export interface ShopifyImage {
  __typename: 'ShopifyImage'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  altText?: Maybe<Scalars['String']['output']>
  height?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['String']['output']>
  src?: Maybe<Scalars['String']['output']>
  width?: Maybe<Scalars['Float']['output']>
}

export type ShopifyImageFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  altText?: InputMaybe<StringFilter>
  height?: InputMaybe<FloatFilter>
  id?: InputMaybe<StringFilter>
  src?: InputMaybe<StringFilter>
  width?: InputMaybe<FloatFilter>
}

export type ShopifyImageSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  altText?: InputMaybe<SortOrder>
  height?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  src?: InputMaybe<SortOrder>
  width?: InputMaybe<SortOrder>
}

export interface ShopifyMetafield {
  __typename: 'ShopifyMetafield'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  key?: Maybe<Scalars['String']['output']>
  namespace?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['String']['output']>
}

export type ShopifyMetafieldFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  key?: InputMaybe<StringFilter>
  namespace?: InputMaybe<StringFilter>
  value?: InputMaybe<StringFilter>
}

export type ShopifyMetafieldSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  key?: InputMaybe<SortOrder>
  namespace?: InputMaybe<SortOrder>
  value?: InputMaybe<SortOrder>
}

export interface ShopifyMoneyV2 {
  __typename: 'ShopifyMoneyV2'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  amount?: Maybe<Scalars['String']['output']>
  currencyCode?: Maybe<Scalars['String']['output']>
}

export type ShopifyMoneyV2Filter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  amount?: InputMaybe<StringFilter>
  currencyCode?: InputMaybe<StringFilter>
}

export type ShopifyMoneyV2Sorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  amount?: InputMaybe<SortOrder>
  currencyCode?: InputMaybe<SortOrder>
}

export interface ShopifyPrice {
  __typename: 'ShopifyPrice'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  amount?: Maybe<Scalars['Float']['output']>
  currencyCode?: Maybe<Scalars['String']['output']>
}

export type ShopifyPriceFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  amount?: InputMaybe<FloatFilter>
  currencyCode?: InputMaybe<StringFilter>
}

export type ShopifyPriceSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  amount?: InputMaybe<SortOrder>
  currencyCode?: InputMaybe<SortOrder>
}

export interface ShopifyProduct extends Document {
  __typename: 'ShopifyProduct'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  archived?: Maybe<Scalars['Boolean']['output']>
  collections?: Maybe<Array<Maybe<ShopifyCollection>>>
  contentAfter?: Maybe<Array<Maybe<ImageTextBlock>>>
  gallery?: Maybe<Array<Maybe<RichImage>>>
  handle?: Maybe<Scalars['String']['output']>
  /** DEPRECATED: This has been split up into "Hide from Collections" and "Hide from Search" */
  hidden?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to hide this product from collection pages. The product will still be viewable at its URL */
  hideFromCollections?: Maybe<Scalars['Boolean']['output']>
  /** Toggle this to ON to hide this product from search results. The product will still be viewable at its URL */
  hideFromSearch?: Maybe<Scalars['Boolean']['output']>
  info?: Maybe<Array<Maybe<ProductInfo>>>
  initialVariantSelections?: Maybe<Array<Maybe<InitialVariantSelection>>>
  /** Toggle this to ON to hide a product's price and show an inquiry button instead of "Add to Cart" */
  inquiryOnly?: Maybe<Scalars['Boolean']['output']>
  maxVariantPrice?: Maybe<Scalars['Float']['output']>
  minVariantPrice?: Maybe<Scalars['Float']['output']>
  options?: Maybe<Array<Maybe<ShopifyProductOption>>>
  related?: Maybe<Carousel>
  seo?: Maybe<Seo>
  shopifyId?: Maybe<Scalars['String']['output']>
  /** Always show product in specified collection. */
  showInCollection?: Maybe<CollectionOrShopifyCollection>
  showInCollections?: Maybe<Array<Maybe<CollectionOrShopifyCollection>>>
  sourceData?: Maybe<ShopifySourceProduct>
  title?: Maybe<Scalars['String']['output']>
  variants?: Maybe<Array<Maybe<ShopifyProductVariant>>>
}

export interface ShopifyProductDef {
  __typename: 'ShopifyProductDef'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  availableForSale?: Maybe<Scalars['Boolean']['output']>
  createdAt?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  descriptionHtml?: Maybe<Scalars['String']['output']>
  featuredImage?: Maybe<ShopifyImage>
  /** Shopify Product GID */
  gid?: Maybe<Scalars['String']['output']>
  /** Shopify Product handle */
  handle?: Maybe<Scalars['String']['output']>
  /** Shopify Product ID */
  id?: Maybe<Scalars['Float']['output']>
  images?: Maybe<Array<Maybe<ShopifyImage>>>
  isDeleted?: Maybe<Scalars['Boolean']['output']>
  metafields?: Maybe<Array<Maybe<ShopifyMetafield>>>
  options?: Maybe<Array<Maybe<Option>>>
  /** Image displayed in both cart and checkout */
  previewImageUrl?: Maybe<Scalars['String']['output']>
  priceRange?: Maybe<PriceRange>
  productType?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['String']['output']>
  slug?: Maybe<Slug>
  status?: Maybe<Scalars['String']['output']>
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  /** Title displayed in both cart and checkout */
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['String']['output']>
  variants?: Maybe<Array<Maybe<ShopifyProductVariant>>>
  vendor?: Maybe<Scalars['String']['output']>
}

export type ShopifyProductDefFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  availableForSale?: InputMaybe<BooleanFilter>
  createdAt?: InputMaybe<StringFilter>
  description?: InputMaybe<StringFilter>
  descriptionHtml?: InputMaybe<StringFilter>
  featuredImage?: InputMaybe<ShopifyImageFilter>
  gid?: InputMaybe<StringFilter>
  handle?: InputMaybe<StringFilter>
  id?: InputMaybe<FloatFilter>
  isDeleted?: InputMaybe<BooleanFilter>
  previewImageUrl?: InputMaybe<StringFilter>
  priceRange?: InputMaybe<PriceRangeFilter>
  productType?: InputMaybe<StringFilter>
  publishedAt?: InputMaybe<StringFilter>
  slug?: InputMaybe<SlugFilter>
  status?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<StringFilter>
  vendor?: InputMaybe<StringFilter>
}

export type ShopifyProductDefSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  availableForSale?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  descriptionHtml?: InputMaybe<SortOrder>
  featuredImage?: InputMaybe<ShopifyImageSorting>
  gid?: InputMaybe<SortOrder>
  handle?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  isDeleted?: InputMaybe<SortOrder>
  previewImageUrl?: InputMaybe<SortOrder>
  priceRange?: InputMaybe<PriceRangeSorting>
  productType?: InputMaybe<SortOrder>
  publishedAt?: InputMaybe<SortOrder>
  slug?: InputMaybe<SlugSorting>
  status?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  vendor?: InputMaybe<SortOrder>
}

export type ShopifyProductFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  archived?: InputMaybe<BooleanFilter>
  handle?: InputMaybe<StringFilter>
  hidden?: InputMaybe<BooleanFilter>
  hideFromCollections?: InputMaybe<BooleanFilter>
  hideFromSearch?: InputMaybe<BooleanFilter>
  inquiryOnly?: InputMaybe<BooleanFilter>
  maxVariantPrice?: InputMaybe<FloatFilter>
  minVariantPrice?: InputMaybe<FloatFilter>
  related?: InputMaybe<CarouselFilter>
  seo?: InputMaybe<SeoFilter>
  shopifyId?: InputMaybe<StringFilter>
  sourceData?: InputMaybe<ShopifySourceProductFilter>
  title?: InputMaybe<StringFilter>
}

export interface ShopifyProductOption {
  __typename: 'ShopifyProductOption'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  values?: Maybe<Array<Maybe<ProductOptionValue>>>
}

export type ShopifyProductOptionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
}

export type ShopifyProductOptionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
}

export type ShopifyProductSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  archived?: InputMaybe<SortOrder>
  handle?: InputMaybe<SortOrder>
  hidden?: InputMaybe<SortOrder>
  hideFromCollections?: InputMaybe<SortOrder>
  hideFromSearch?: InputMaybe<SortOrder>
  inquiryOnly?: InputMaybe<SortOrder>
  maxVariantPrice?: InputMaybe<SortOrder>
  minVariantPrice?: InputMaybe<SortOrder>
  related?: InputMaybe<CarouselSorting>
  seo?: InputMaybe<SeoSorting>
  shopifyId?: InputMaybe<SortOrder>
  sourceData?: InputMaybe<ShopifySourceProductSorting>
  title?: InputMaybe<SortOrder>
}

export interface ShopifyProductVariant {
  __typename: 'ShopifyProductVariant'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  isDeleted?: Maybe<Scalars['Boolean']['output']>
  shopifyVariantID?: Maybe<Scalars['String']['output']>
  sourceData?: Maybe<ShopifySourceProductVariant>
  title?: Maybe<Scalars['String']['output']>
}

export type ShopifyProductVariantFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  isDeleted?: InputMaybe<BooleanFilter>
  shopifyVariantID?: InputMaybe<StringFilter>
  sourceData?: InputMaybe<ShopifySourceProductVariantFilter>
  title?: InputMaybe<StringFilter>
}

export interface ShopifyProductVariantItem {
  __typename: 'ShopifyProductVariantItem'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  compareAtPrice?: Maybe<Scalars['Float']['output']>
  createdAt?: Maybe<Scalars['String']['output']>
  /** Shopify Product Variant GID */
  gid?: Maybe<Scalars['String']['output']>
  /** Shopify Product Variant ID */
  id?: Maybe<Scalars['Float']['output']>
  inventory?: Maybe<Inventory>
  isDeleted?: Maybe<Scalars['Boolean']['output']>
  option1?: Maybe<Scalars['String']['output']>
  option2?: Maybe<Scalars['String']['output']>
  option3?: Maybe<Scalars['String']['output']>
  /** Image displayed in both cart and checkout */
  previewImageUrl?: Maybe<Scalars['String']['output']>
  price?: Maybe<Scalars['Float']['output']>
  productGid?: Maybe<Scalars['String']['output']>
  productId?: Maybe<Scalars['Float']['output']>
  sku?: Maybe<Scalars['String']['output']>
  status?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['String']['output']>
}

export type ShopifyProductVariantItemFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  compareAtPrice?: InputMaybe<FloatFilter>
  createdAt?: InputMaybe<StringFilter>
  gid?: InputMaybe<StringFilter>
  id?: InputMaybe<FloatFilter>
  inventory?: InputMaybe<InventoryFilter>
  isDeleted?: InputMaybe<BooleanFilter>
  option1?: InputMaybe<StringFilter>
  option2?: InputMaybe<StringFilter>
  option3?: InputMaybe<StringFilter>
  previewImageUrl?: InputMaybe<StringFilter>
  price?: InputMaybe<FloatFilter>
  productGid?: InputMaybe<StringFilter>
  productId?: InputMaybe<FloatFilter>
  sku?: InputMaybe<StringFilter>
  status?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<StringFilter>
}

export type ShopifyProductVariantItemSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  compareAtPrice?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  gid?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  inventory?: InputMaybe<InventorySorting>
  isDeleted?: InputMaybe<SortOrder>
  option1?: InputMaybe<SortOrder>
  option2?: InputMaybe<SortOrder>
  option3?: InputMaybe<SortOrder>
  previewImageUrl?: InputMaybe<SortOrder>
  price?: InputMaybe<SortOrder>
  productGid?: InputMaybe<SortOrder>
  productId?: InputMaybe<SortOrder>
  sku?: InputMaybe<SortOrder>
  status?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export type ShopifyProductVariantSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  isDeleted?: InputMaybe<SortOrder>
  shopifyVariantID?: InputMaybe<SortOrder>
  sourceData?: InputMaybe<ShopifySourceProductVariantSorting>
  title?: InputMaybe<SortOrder>
}

export interface ShopifySourceCollection {
  __typename: 'ShopifySourceCollection'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  description?: Maybe<Scalars['String']['output']>
  descriptionHtml?: Maybe<Scalars['String']['output']>
  handle?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  image?: Maybe<ShopifySourceImage>
  products?: Maybe<ShopifySourceProductsConnection>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['Date']['output']>
}

export interface ShopifySourceCollectionEdge {
  __typename: 'ShopifySourceCollectionEdge'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  cursor?: Maybe<Scalars['String']['output']>
  node?: Maybe<ShopifySourceCollectionNode>
}

export type ShopifySourceCollectionEdgeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  cursor?: InputMaybe<StringFilter>
  node?: InputMaybe<ShopifySourceCollectionNodeFilter>
}

export type ShopifySourceCollectionEdgeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  cursor?: InputMaybe<SortOrder>
  node?: InputMaybe<ShopifySourceCollectionNodeSorting>
}

export type ShopifySourceCollectionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  description?: InputMaybe<StringFilter>
  descriptionHtml?: InputMaybe<StringFilter>
  handle?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  image?: InputMaybe<ShopifySourceImageFilter>
  products?: InputMaybe<ShopifySourceProductsConnectionFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateFilter>
}

export interface ShopifySourceCollectionNode {
  __typename: 'ShopifySourceCollectionNode'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  handle?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
}

export type ShopifySourceCollectionNodeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  handle?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
}

export type ShopifySourceCollectionNodeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  handle?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
}

export type ShopifySourceCollectionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  descriptionHtml?: InputMaybe<SortOrder>
  handle?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  image?: InputMaybe<ShopifySourceImageSorting>
  products?: InputMaybe<ShopifySourceProductsConnectionSorting>
  title?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
}

export interface ShopifySourceCollectionsConnection {
  __typename: 'ShopifySourceCollectionsConnection'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  edges?: Maybe<Array<Maybe<ShopifySourceCollectionEdge>>>
  pageInfo?: Maybe<PageInfo>
}

export type ShopifySourceCollectionsConnectionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  pageInfo?: InputMaybe<PageInfoFilter>
}

export type ShopifySourceCollectionsConnectionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  pageInfo?: InputMaybe<PageInfoSorting>
}

export interface ShopifySourceImage {
  __typename: 'ShopifySourceImage'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  altText?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  originalSrc?: Maybe<Scalars['String']['output']>
  w100?: Maybe<Scalars['String']['output']>
  w300?: Maybe<Scalars['String']['output']>
  w800?: Maybe<Scalars['String']['output']>
  w1200?: Maybe<Scalars['String']['output']>
  w1600?: Maybe<Scalars['String']['output']>
}

export interface ShopifySourceImageEdge {
  __typename: 'ShopifySourceImageEdge'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  cursor?: Maybe<Scalars['String']['output']>
  key?: Maybe<Scalars['String']['output']>
  node?: Maybe<ShopifySourceImage>
}

export type ShopifySourceImageEdgeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  cursor?: InputMaybe<StringFilter>
  key?: InputMaybe<StringFilter>
  node?: InputMaybe<ShopifySourceImageFilter>
}

export type ShopifySourceImageEdgeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  cursor?: InputMaybe<SortOrder>
  key?: InputMaybe<SortOrder>
  node?: InputMaybe<ShopifySourceImageSorting>
}

export type ShopifySourceImageFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  altText?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  originalSrc?: InputMaybe<StringFilter>
  w100?: InputMaybe<StringFilter>
  w300?: InputMaybe<StringFilter>
  w800?: InputMaybe<StringFilter>
  w1200?: InputMaybe<StringFilter>
  w1600?: InputMaybe<StringFilter>
}

export type ShopifySourceImageSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  altText?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  originalSrc?: InputMaybe<SortOrder>
  w100?: InputMaybe<SortOrder>
  w300?: InputMaybe<SortOrder>
  w800?: InputMaybe<SortOrder>
  w1200?: InputMaybe<SortOrder>
  w1600?: InputMaybe<SortOrder>
}

export interface ShopifySourceImages {
  __typename: 'ShopifySourceImages'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  edges?: Maybe<Array<Maybe<ShopifySourceImageEdge>>>
}

export type ShopifySourceImagesFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
}

export type ShopifySourceImagesSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
}

export interface ShopifySourceProduct {
  __typename: 'ShopifySourceProduct'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  availableForSale?: Maybe<Scalars['Boolean']['output']>
  collections?: Maybe<ShopifySourceCollectionsConnection>
  compareAtPriceRange?: Maybe<ShopifySourceProductPriceRange>
  createdAt?: Maybe<Scalars['Date']['output']>
  description?: Maybe<Scalars['String']['output']>
  descriptionHtml?: Maybe<Scalars['String']['output']>
  handle?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
  images?: Maybe<ShopifySourceImages>
  options?: Maybe<Array<Maybe<ShopifySourceProductOption>>>
  presentmentPriceRanges?: Maybe<ShopifySourceProductPresentmentPriceRangeConnection>
  priceRange?: Maybe<ShopifySourceProductPriceRange>
  productType?: Maybe<Scalars['String']['output']>
  publishedAt?: Maybe<Scalars['Date']['output']>
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  title?: Maybe<Scalars['String']['output']>
  updatedAt?: Maybe<Scalars['Date']['output']>
  variants?: Maybe<ShopifySourceProductVariantsConnection>
  vendor?: Maybe<Scalars['String']['output']>
}

export interface ShopifySourceProductEdge {
  __typename: 'ShopifySourceProductEdge'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  cursor?: Maybe<Scalars['String']['output']>
  node?: Maybe<ShopifySourceProductNode>
}

export type ShopifySourceProductEdgeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  cursor?: InputMaybe<StringFilter>
  node?: InputMaybe<ShopifySourceProductNodeFilter>
}

export type ShopifySourceProductEdgeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  cursor?: InputMaybe<SortOrder>
  node?: InputMaybe<ShopifySourceProductNodeSorting>
}

export type ShopifySourceProductFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  availableForSale?: InputMaybe<BooleanFilter>
  collections?: InputMaybe<ShopifySourceCollectionsConnectionFilter>
  compareAtPriceRange?: InputMaybe<ShopifySourceProductPriceRangeFilter>
  createdAt?: InputMaybe<DateFilter>
  description?: InputMaybe<StringFilter>
  descriptionHtml?: InputMaybe<StringFilter>
  handle?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
  images?: InputMaybe<ShopifySourceImagesFilter>
  presentmentPriceRanges?: InputMaybe<ShopifySourceProductPresentmentPriceRangeConnectionFilter>
  priceRange?: InputMaybe<ShopifySourceProductPriceRangeFilter>
  productType?: InputMaybe<StringFilter>
  publishedAt?: InputMaybe<DateFilter>
  title?: InputMaybe<StringFilter>
  updatedAt?: InputMaybe<DateFilter>
  variants?: InputMaybe<ShopifySourceProductVariantsConnectionFilter>
  vendor?: InputMaybe<StringFilter>
}

export interface ShopifySourceProductNode {
  __typename: 'ShopifySourceProductNode'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  handle?: Maybe<Scalars['String']['output']>
  id?: Maybe<Scalars['String']['output']>
}

export type ShopifySourceProductNodeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  handle?: InputMaybe<StringFilter>
  id?: InputMaybe<StringFilter>
}

export type ShopifySourceProductNodeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  handle?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
}

export interface ShopifySourceProductOption {
  __typename: 'ShopifySourceProductOption'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  values?: Maybe<Array<Maybe<Scalars['String']['output']>>>
}

export type ShopifySourceProductOptionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
}

export type ShopifySourceProductOptionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
}

export interface ShopifySourceProductPresentmentPriceRangeConnection {
  __typename: 'ShopifySourceProductPresentmentPriceRangeConnection'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  edges?: Maybe<Array<Maybe<ShopifySourceProductPriceRangeEdge>>>
}

export type ShopifySourceProductPresentmentPriceRangeConnectionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
}

export type ShopifySourceProductPresentmentPriceRangeConnectionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
}

export interface ShopifySourceProductPricePresentmentEdge {
  __typename: 'ShopifySourceProductPricePresentmentEdge'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  cursor?: Maybe<Scalars['String']['output']>
  node?: Maybe<ShopifySourceProductVariantPricePair>
}

export type ShopifySourceProductPricePresentmentEdgeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  cursor?: InputMaybe<StringFilter>
  node?: InputMaybe<ShopifySourceProductVariantPricePairFilter>
}

export type ShopifySourceProductPricePresentmentEdgeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  cursor?: InputMaybe<SortOrder>
  node?: InputMaybe<ShopifySourceProductVariantPricePairSorting>
}

export interface ShopifySourceProductPriceRange {
  __typename: 'ShopifySourceProductPriceRange'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  maxVariantPrice?: Maybe<ShopifyMoneyV2>
  minVariantPrice?: Maybe<ShopifyMoneyV2>
}

export interface ShopifySourceProductPriceRangeEdge {
  __typename: 'ShopifySourceProductPriceRangeEdge'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  cursor?: Maybe<Scalars['String']['output']>
  node?: Maybe<ShopifySourceProductPriceRange>
}

export type ShopifySourceProductPriceRangeEdgeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  cursor?: InputMaybe<StringFilter>
  node?: InputMaybe<ShopifySourceProductPriceRangeFilter>
}

export type ShopifySourceProductPriceRangeEdgeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  cursor?: InputMaybe<SortOrder>
  node?: InputMaybe<ShopifySourceProductPriceRangeSorting>
}

export type ShopifySourceProductPriceRangeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  maxVariantPrice?: InputMaybe<ShopifyMoneyV2Filter>
  minVariantPrice?: InputMaybe<ShopifyMoneyV2Filter>
}

export type ShopifySourceProductPriceRangeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  maxVariantPrice?: InputMaybe<ShopifyMoneyV2Sorting>
  minVariantPrice?: InputMaybe<ShopifyMoneyV2Sorting>
}

export type ShopifySourceProductSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  availableForSale?: InputMaybe<SortOrder>
  collections?: InputMaybe<ShopifySourceCollectionsConnectionSorting>
  compareAtPriceRange?: InputMaybe<ShopifySourceProductPriceRangeSorting>
  createdAt?: InputMaybe<SortOrder>
  description?: InputMaybe<SortOrder>
  descriptionHtml?: InputMaybe<SortOrder>
  handle?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  images?: InputMaybe<ShopifySourceImagesSorting>
  presentmentPriceRanges?: InputMaybe<ShopifySourceProductPresentmentPriceRangeConnectionSorting>
  priceRange?: InputMaybe<ShopifySourceProductPriceRangeSorting>
  productType?: InputMaybe<SortOrder>
  publishedAt?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  updatedAt?: InputMaybe<SortOrder>
  variants?: InputMaybe<ShopifySourceProductVariantsConnectionSorting>
  vendor?: InputMaybe<SortOrder>
}

export interface ShopifySourceProductVariant {
  __typename: 'ShopifySourceProductVariant'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  availableForSale?: Maybe<Scalars['Boolean']['output']>
  compareAtPriceV2?: Maybe<ShopifyPrice>
  currentlyNotInStock?: Maybe<Scalars['Boolean']['output']>
  id?: Maybe<Scalars['String']['output']>
  image?: Maybe<ShopifyVariantImage>
  metafields?: Maybe<Array<Maybe<ShopifyMetafield>>>
  priceV2?: Maybe<ShopifyPrice>
  requiresShipping?: Maybe<Scalars['Boolean']['output']>
  selectedOptions?: Maybe<Array<Maybe<ShopifySourceSelectedOption>>>
  sku?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  weight?: Maybe<Scalars['Float']['output']>
  weightUnit?: Maybe<Scalars['String']['output']>
}

export interface ShopifySourceProductVariantEdge {
  __typename: 'ShopifySourceProductVariantEdge'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  cursor?: Maybe<Scalars['String']['output']>
  node?: Maybe<ShopifySourceProductVariantLegacy>
}

export type ShopifySourceProductVariantEdgeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  cursor?: InputMaybe<StringFilter>
  node?: InputMaybe<ShopifySourceProductVariantLegacyFilter>
}

export type ShopifySourceProductVariantEdgeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  cursor?: InputMaybe<SortOrder>
  node?: InputMaybe<ShopifySourceProductVariantLegacySorting>
}

export type ShopifySourceProductVariantFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  availableForSale?: InputMaybe<BooleanFilter>
  compareAtPriceV2?: InputMaybe<ShopifyPriceFilter>
  currentlyNotInStock?: InputMaybe<BooleanFilter>
  id?: InputMaybe<StringFilter>
  image?: InputMaybe<ShopifyVariantImageFilter>
  priceV2?: InputMaybe<ShopifyPriceFilter>
  requiresShipping?: InputMaybe<BooleanFilter>
  sku?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
  weight?: InputMaybe<FloatFilter>
  weightUnit?: InputMaybe<StringFilter>
}

export interface ShopifySourceProductVariantLegacy {
  __typename: 'ShopifySourceProductVariantLegacy'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  availableForSale?: Maybe<Scalars['Boolean']['output']>
  compareAtPriceV2?: Maybe<ShopifyMoneyV2>
  currentlyNotInStock?: Maybe<Scalars['Boolean']['output']>
  id?: Maybe<Scalars['String']['output']>
  image?: Maybe<ShopifySourceImage>
  priceV2?: Maybe<ShopifyMoneyV2>
  requiresShipping?: Maybe<Scalars['Boolean']['output']>
  selectedOptions?: Maybe<Array<Maybe<ShopifySourceSelectedOption>>>
  sku?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
  weight?: Maybe<Scalars['Float']['output']>
  weightUnit?: Maybe<Scalars['String']['output']>
}

export type ShopifySourceProductVariantLegacyFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  availableForSale?: InputMaybe<BooleanFilter>
  compareAtPriceV2?: InputMaybe<ShopifyMoneyV2Filter>
  currentlyNotInStock?: InputMaybe<BooleanFilter>
  id?: InputMaybe<StringFilter>
  image?: InputMaybe<ShopifySourceImageFilter>
  priceV2?: InputMaybe<ShopifyMoneyV2Filter>
  requiresShipping?: InputMaybe<BooleanFilter>
  sku?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
  weight?: InputMaybe<FloatFilter>
  weightUnit?: InputMaybe<StringFilter>
}

export type ShopifySourceProductVariantLegacySorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  availableForSale?: InputMaybe<SortOrder>
  compareAtPriceV2?: InputMaybe<ShopifyMoneyV2Sorting>
  currentlyNotInStock?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  image?: InputMaybe<ShopifySourceImageSorting>
  priceV2?: InputMaybe<ShopifyMoneyV2Sorting>
  requiresShipping?: InputMaybe<SortOrder>
  sku?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  weight?: InputMaybe<SortOrder>
  weightUnit?: InputMaybe<SortOrder>
}

export interface ShopifySourceProductVariantPricePair {
  __typename: 'ShopifySourceProductVariantPricePair'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  compareAtPrice?: Maybe<ShopifyMoneyV2>
  price?: Maybe<ShopifyMoneyV2>
}

export type ShopifySourceProductVariantPricePairFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  compareAtPrice?: InputMaybe<ShopifyMoneyV2Filter>
  price?: InputMaybe<ShopifyMoneyV2Filter>
}

export type ShopifySourceProductVariantPricePairSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  compareAtPrice?: InputMaybe<ShopifyMoneyV2Sorting>
  price?: InputMaybe<ShopifyMoneyV2Sorting>
}

export interface ShopifySourceProductVariantPricePresenentmentConnection {
  __typename: 'ShopifySourceProductVariantPricePresenentmentConnection'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  edges?: Maybe<Array<Maybe<ShopifySourceProductPricePresentmentEdge>>>
}

export type ShopifySourceProductVariantPricePresenentmentConnectionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
}

export type ShopifySourceProductVariantPricePresenentmentConnectionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
}

export type ShopifySourceProductVariantSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  availableForSale?: InputMaybe<SortOrder>
  compareAtPriceV2?: InputMaybe<ShopifyPriceSorting>
  currentlyNotInStock?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  image?: InputMaybe<ShopifyVariantImageSorting>
  priceV2?: InputMaybe<ShopifyPriceSorting>
  requiresShipping?: InputMaybe<SortOrder>
  sku?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
  weight?: InputMaybe<SortOrder>
  weightUnit?: InputMaybe<SortOrder>
}

export interface ShopifySourceProductVariantsConnection {
  __typename: 'ShopifySourceProductVariantsConnection'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  edges?: Maybe<Array<Maybe<ShopifySourceProductVariantEdge>>>
  pageInfo?: Maybe<PageInfo>
}

export type ShopifySourceProductVariantsConnectionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  pageInfo?: InputMaybe<PageInfoFilter>
}

export type ShopifySourceProductVariantsConnectionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  pageInfo?: InputMaybe<PageInfoSorting>
}

export interface ShopifySourceProductsConnection {
  __typename: 'ShopifySourceProductsConnection'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  edges?: Maybe<Array<Maybe<ShopifySourceProductEdge>>>
  pageInfo?: Maybe<PageInfo>
}

export type ShopifySourceProductsConnectionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  pageInfo?: InputMaybe<PageInfoFilter>
}

export type ShopifySourceProductsConnectionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  pageInfo?: InputMaybe<PageInfoSorting>
}

export interface ShopifySourceSelectedOption {
  __typename: 'ShopifySourceSelectedOption'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  name?: Maybe<Scalars['String']['output']>
  value?: Maybe<Scalars['String']['output']>
}

export type ShopifySourceSelectedOptionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  name?: InputMaybe<StringFilter>
  value?: InputMaybe<StringFilter>
}

export type ShopifySourceSelectedOptionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  name?: InputMaybe<SortOrder>
  value?: InputMaybe<SortOrder>
}

export interface ShopifyVariantImage {
  __typename: 'ShopifyVariantImage'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  altText?: Maybe<Scalars['String']['output']>
  height?: Maybe<Scalars['Float']['output']>
  id?: Maybe<Scalars['String']['output']>
  url?: Maybe<Scalars['String']['output']>
  width?: Maybe<Scalars['Float']['output']>
}

export type ShopifyVariantImageFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  altText?: InputMaybe<StringFilter>
  height?: InputMaybe<FloatFilter>
  id?: InputMaybe<StringFilter>
  url?: InputMaybe<StringFilter>
  width?: InputMaybe<FloatFilter>
}

export type ShopifyVariantImageSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  altText?: InputMaybe<SortOrder>
  height?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  url?: InputMaybe<SortOrder>
  width?: InputMaybe<SortOrder>
}

export interface Signature {
  __typename: 'Signature'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** e.g. "Working hours 9am-5pm PST" */
  additional_info?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  /** e.g. "California" or "New York" */
  location?: Maybe<Scalars['String']['output']>
  phone?: Maybe<Scalars['String']['output']>
  phone_2?: Maybe<Scalars['String']['output']>
  /** defaults to "Office:" */
  phone_label?: Maybe<Scalars['String']['output']>
  phone_label_2?: Maybe<Scalars['String']['output']>
  /** e.g. "they/them," "he/him," "she/her" */
  pronouns?: Maybe<Scalars['String']['output']>
  role?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type SignatureFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  additional_info?: InputMaybe<StringFilter>
  email?: InputMaybe<StringFilter>
  location?: InputMaybe<StringFilter>
  phone?: InputMaybe<StringFilter>
  phone_2?: InputMaybe<StringFilter>
  phone_label?: InputMaybe<StringFilter>
  phone_label_2?: InputMaybe<StringFilter>
  pronouns?: InputMaybe<StringFilter>
  role?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type SignatureSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  additional_info?: InputMaybe<SortOrder>
  email?: InputMaybe<SortOrder>
  location?: InputMaybe<SortOrder>
  phone?: InputMaybe<SortOrder>
  phone_2?: InputMaybe<SortOrder>
  phone_label?: InputMaybe<SortOrder>
  phone_label_2?: InputMaybe<SortOrder>
  pronouns?: InputMaybe<SortOrder>
  role?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface SiteSettings extends Document {
  __typename: 'SiteSettings'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  links?: Maybe<Array<Maybe<ExternalLinkOrInternalLink>>>
  mailerSubtitle?: Maybe<Scalars['String']['output']>
  mailerTitle?: Maybe<Scalars['String']['output']>
  phone?: Maybe<Scalars['String']['output']>
  seo?: Maybe<Seo>
}

export type SiteSettingsFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  mailerSubtitle?: InputMaybe<StringFilter>
  mailerTitle?: InputMaybe<StringFilter>
  phone?: InputMaybe<StringFilter>
  seo?: InputMaybe<SeoFilter>
}

export type SiteSettingsSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  mailerSubtitle?: InputMaybe<SortOrder>
  mailerTitle?: InputMaybe<SortOrder>
  phone?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
}

export interface Slug {
  __typename: 'Slug'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  current?: Maybe<Scalars['String']['output']>
  source?: Maybe<Scalars['String']['output']>
}

export type SlugFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  current?: InputMaybe<StringFilter>
  source?: InputMaybe<StringFilter>
}

export type SlugSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  current?: InputMaybe<SortOrder>
  source?: InputMaybe<SortOrder>
}

export enum SortOrder {
  /** Sorts on the value in ascending order. */
  Asc = 'ASC',
  /** Sorts on the value in descending order. */
  Desc = 'DESC',
}

export interface Span {
  __typename: 'Span'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  marks?: Maybe<Array<Maybe<Scalars['String']['output']>>>
  text?: Maybe<Scalars['String']['output']>
}

export interface Spot {
  __typename: 'Spot'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  productWithVariant?: Maybe<ProductWithVariant>
  x?: Maybe<Scalars['Float']['output']>
  y?: Maybe<Scalars['Float']['output']>
}

export type SpotFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  productWithVariant?: InputMaybe<ProductWithVariantFilter>
  x?: InputMaybe<FloatFilter>
  y?: InputMaybe<FloatFilter>
}

export type SpotSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  productWithVariant?: InputMaybe<ProductWithVariantSorting>
  x?: InputMaybe<SortOrder>
  y?: InputMaybe<SortOrder>
}

export interface Stone extends Document {
  __typename: 'Stone'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  carat?: Maybe<Scalars['String']['output']>
  clarity?: Maybe<Scalars['String']['output']>
  color?: Maybe<Scalars['String']['output']>
  cut?: Maybe<Scalars['String']['output']>
  gia_link?: Maybe<Scalars['String']['output']>
  gia_number?: Maybe<Scalars['String']['output']>
  precision?: Maybe<Scalars['String']['output']>
}

export type StoneFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  carat?: InputMaybe<StringFilter>
  clarity?: InputMaybe<StringFilter>
  color?: InputMaybe<StringFilter>
  cut?: InputMaybe<StringFilter>
  gia_link?: InputMaybe<StringFilter>
  gia_number?: InputMaybe<StringFilter>
  precision?: InputMaybe<StringFilter>
}

export type StoneSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  carat?: InputMaybe<SortOrder>
  clarity?: InputMaybe<SortOrder>
  color?: InputMaybe<SortOrder>
  cut?: InputMaybe<SortOrder>
  gia_link?: InputMaybe<SortOrder>
  gia_number?: InputMaybe<SortOrder>
  precision?: InputMaybe<SortOrder>
}

export type StringFilter = {
  /** Checks if the value is equal to the given input. */
  eq?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  /** Checks if the value is defined. */
  is_defined?: InputMaybe<Scalars['Boolean']['input']>
  /** Checks if the value matches the given word/words. */
  matches?: InputMaybe<Scalars['String']['input']>
  /** Checks if the value is not equal to the given input. */
  neq?: InputMaybe<Scalars['String']['input']>
  nin?: InputMaybe<Array<Scalars['String']['input']>>
}

export interface SubMenu {
  __typename: 'SubMenu'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  links?: Maybe<Array<Maybe<CtaOrSubMenu>>>
  title?: Maybe<Scalars['String']['output']>
}

export type SubMenuFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type SubMenuSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface TagBadge {
  __typename: 'TagBadge'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  /** (optional) An alternate label to display in the badge */
  label?: Maybe<Scalars['String']['output']>
  /** The tag to match from Shopify */
  tag?: Maybe<Scalars['String']['output']>
}

export type TagBadgeFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  label?: InputMaybe<StringFilter>
  tag?: InputMaybe<StringFilter>
}

export type TagBadgeSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  label?: InputMaybe<SortOrder>
  tag?: InputMaybe<SortOrder>
}

export interface TeamMember {
  __typename: 'TeamMember'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  email?: Maybe<Scalars['String']['output']>
  headshot?: Maybe<RichImage>
  name?: Maybe<Scalars['String']['output']>
  title?: Maybe<Scalars['String']['output']>
}

export type TeamMemberFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  email?: InputMaybe<StringFilter>
  headshot?: InputMaybe<RichImageFilter>
  name?: InputMaybe<StringFilter>
  title?: InputMaybe<StringFilter>
}

export type TeamMemberSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  email?: InputMaybe<SortOrder>
  headshot?: InputMaybe<RichImageSorting>
  name?: InputMaybe<SortOrder>
  title?: InputMaybe<SortOrder>
}

export interface TeamPage extends Document {
  __typename: 'TeamPage'
  /** Date the document was created */
  _createdAt?: Maybe<Scalars['DateTime']['output']>
  /** Document ID */
  _id?: Maybe<Scalars['ID']['output']>
  _key?: Maybe<Scalars['String']['output']>
  /** Current document revision */
  _rev?: Maybe<Scalars['String']['output']>
  /** Document type */
  _type?: Maybe<Scalars['String']['output']>
  /** Date the document was last modified */
  _updatedAt?: Maybe<Scalars['DateTime']['output']>
  seo?: Maybe<Seo>
  teamMembers?: Maybe<Array<Maybe<TeamMember>>>
  title?: Maybe<Scalars['String']['output']>
}

export type TeamPageFilter = {
  /** Apply filters on document level */
  _?: InputMaybe<DocumentFilter>
  _createdAt?: InputMaybe<DatetimeFilter>
  _id?: InputMaybe<IdFilter>
  _key?: InputMaybe<StringFilter>
  _rev?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  _updatedAt?: InputMaybe<DatetimeFilter>
  seo?: InputMaybe<SeoFilter>
  title?: InputMaybe<StringFilter>
}

export type TeamPageSorting = {
  _createdAt?: InputMaybe<SortOrder>
  _id?: InputMaybe<SortOrder>
  _key?: InputMaybe<SortOrder>
  _rev?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  _updatedAt?: InputMaybe<SortOrder>
  seo?: InputMaybe<SeoSorting>
  title?: InputMaybe<SortOrder>
}

export interface TextAction {
  __typename: 'TextAction'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  actionType?: Maybe<Scalars['String']['output']>
}

export type TextActionFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  actionType?: InputMaybe<StringFilter>
}

export type TextActionSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  actionType?: InputMaybe<SortOrder>
}

export interface TextBlock {
  __typename: 'TextBlock'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  alignment?: Maybe<Scalars['String']['output']>
  backgroundImage?: Maybe<RichImage>
  bodyRaw?: Maybe<Scalars['JSON']['output']>
  body_mobileRaw?: Maybe<Scalars['JSON']['output']>
  layout?: Maybe<Scalars['String']['output']>
  textColor?: Maybe<Scalars['String']['output']>
}

export type TextBlockFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  alignment?: InputMaybe<StringFilter>
  backgroundImage?: InputMaybe<RichImageFilter>
  layout?: InputMaybe<StringFilter>
  textColor?: InputMaybe<StringFilter>
}

export type TextBlockSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  alignment?: InputMaybe<SortOrder>
  backgroundImage?: InputMaybe<RichImageSorting>
  layout?: InputMaybe<SortOrder>
  textColor?: InputMaybe<SortOrder>
}

export interface UpcomingPopups {
  __typename: 'UpcomingPopups'
  _key?: Maybe<Scalars['String']['output']>
  _type?: Maybe<Scalars['String']['output']>
  description?: Maybe<TextBlock>
  title?: Maybe<Scalars['String']['output']>
}

export type UpcomingPopupsFilter = {
  _key?: InputMaybe<StringFilter>
  _type?: InputMaybe<StringFilter>
  description?: InputMaybe<TextBlockFilter>
  title?: InputMaybe<StringFilter>
}

export type UpcomingPopupsSorting = {
  _key?: InputMaybe<SortOrder>
  _type?: InputMaybe<SortOrder>
  description?: InputMaybe<TextBlockSorting>
  title?: InputMaybe<SortOrder>
}
