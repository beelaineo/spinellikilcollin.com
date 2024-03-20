import * as documents from './documents'
import * as objects from './objects'
import * as saneShopifySourceTypes from './objects/legacy/shopifySource'
import {shopifyProductOption} from './saneShopify/product'

import {shopifyProduct} from './saneShopify/product'
import {shopifyCollection} from './saneShopify/collection'

// Rich text annotations used in the block content editor
import annotationLinkEmail from './annotations/linkEmail'
import annotationLinkExternal from './annotations/linkExternal'
import annotationLinkInternal from './annotations/linkInternal'
import annotationProduct from './annotations/product'

const annotations = [
  annotationLinkEmail,
  annotationLinkExternal,
  annotationLinkInternal,
  annotationProduct,
]

// Object types
import customProductOptionColor from './objects/customProductOption/color'
import customProductOptionColorObject from './objects/customProductOption/colorObject'
import customProductOptionSize from './objects/customProductOption/size'
import customProductOptionSizeObject from './objects/customProductOption/sizeObject'
// import footer from './objects/global/footer'
import imageWithProductHotspots from './objects/hotspot/imageWithProductHotspots'
import inventory from './objects/shopify/inventory'
import linkExternal from './objects/global/linkExternal'
import linkInternal from './objects/global/linkInternal'
import links from './objects/global/links'
import notFoundPage from './objects/global/notFoundPage'
import heroCollection from './objects/hero/collection'
import heroHome from './objects/hero/home'
import heroPage from './objects/hero/page'
// import moduleAccordion from './objects/module/accordion'
// import accordionBody from './objects/module/accordionBody'
// import accordionGroup from './objects/module/accordionGroup'
// import moduleCallout from './objects/module/callout'
// import moduleCallToAction from './objects/module/callToAction'
// import moduleCollection from './objects/module/collection'
// import moduleGrid from './objects/module/grid'
import shopifyImage from './objects/shopify/shopifyImage'
import shopifyVariantImage from './objects/shopify/shopifyVariantImage'
import gridItems from './objects/module/gridItem'
import menu from './objects/global/menu'
import moduleImage from './objects/module/image'
import moduleImageAction from './objects/module/imageCallToAction'
import moduleImages from './objects/module/images'
import moduleInstagram from './objects/module/instagram'
import moduleProduct from './objects/module/product'
import moduleProducts from './objects/module/products'
import placeholderString from './objects/shopify/placeholderString'
import priceRange from './objects/shopify/priceRange'
import spot from './objects/hotspot/spot'
import productHotspots from './objects/hotspot/productHotspots'
import option from './objects/shopify/option'
import productWithVariant from './objects/shopify/productWithVariant'
import proxyString from './objects/shopify/proxyString'
import proxyDescription from './objects/shopify/proxyDescription'
import seo from './objects/seo/seo'
import seoHome from './objects/seo/home'
import seoPage from './objects/seo/page'
import seoDescription from './objects/seo/description'
import shopifyCollectionDef from './objects/shopify/shopifyCollectionDef'
import shopifyCollectionRule from './objects/shopify/shopifyCollectionRule'
import shopifyPrice from './objects/shopify/shopifyPrice'
import shopifyProductDef from './objects/shopify/shopifyProductDef'
import shopifyProductVariant from './objects/shopify/shopifyProductVariant'
import shopifyProductVariantItem from './objects/shopify/shopifyProductVariantItem'
import shopifySourceProductVariant from './objects/shopify/shopifySourceProductVariant'
import shopifyMetafield from './objects/shopify/shopifyMetafield'
import shopifySourceSelectedOption from './objects/shopify/shopifySourceSelectedOption'
import shopifyCollectionImage from './objects/shopify/shopifyCollectionImage'

import {shopifySourceCollection} from './saneShopify/shopifySourceCollection'
import {shopifySourceProduct} from './saneShopify/shopifySourceProduct'
import {shopifySourceProductVariantLegacy} from './saneShopify/shopifySourceProductVariantLegacy'

// Collections
import collectionGroup from './objects/collection/group'
import collectionLinks from './objects/collection/links'

const objects2 = [
  customProductOptionColor,
  customProductOptionColorObject,
  customProductOptionSize,
  customProductOptionSizeObject,
  // footer,
  imageWithProductHotspots,
  inventory,
  links,
  linkExternal,
  linkInternal,
  notFoundPage,
  heroCollection,
  heroHome,
  heroPage,
  // moduleAccordion,
  // accordionBody,
  // accordionGroup,
  menu,
  // moduleCallout,
  // moduleCallToAction,
  // moduleCollection,
  // moduleGrid,
  shopifyImage,
  shopifyVariantImage,
  // gridItems,
  moduleImage,
  moduleImageAction,
  moduleImages,
  moduleInstagram,
  moduleProduct,
  moduleProducts,
  placeholderString,
  priceRange,
  spot,
  productHotspots,
  option,
  productWithVariant,
  proxyString,
  proxyDescription,
  seo,
  seoHome,
  seoPage,
  seoDescription,
  shopifyCollectionDef,
  shopifyCollectionRule,
  shopifyCollectionImage,
  shopifyPrice,
  shopifyProductDef,
  shopifyProductVariant,
  shopifyProductVariantItem,
  shopifySourceProductVariant,
  shopifyMetafield,
  shopifySourceSelectedOption,
  collectionGroup,
  collectionLinks,
  shopifyProductOption,
  // productOptionValue,
  shopifySourceCollection,
  shopifySourceProduct,
  shopifySourceProductVariantLegacy,
  shopifyCollection,
  shopifyProduct,
]

export default [
  // ...Object.values(annotations),
  ...Object.values(documents),
  ...Object.values(objects),
  ...Object.values(objects2),
  ...Object.values(saneShopifySourceTypes),
]
