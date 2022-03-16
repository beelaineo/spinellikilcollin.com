import { Sort } from '../../components/Filter'
import { ShopifyProduct, FilterConfiguration } from '../../types'
import { buildFilters } from '../../utils/sanity'

const getSortString = (sort?: Sort): string => {
  if (sort === Sort.PriceAsc) return 'minVariantPrice asc'
  if (sort === Sort.PriceDesc) return 'maxVariantPrice desc'
  // if (sort === Sort.DateAsc) return 'sourceData.publishedAt asc'
  // if (sort === Sort.DateDesc) return 'sourceData.publishedAt desc'
  // if (sort === Sort.AlphaAsc) return 'title asc'
  // if (sort === Sort.AlphaDesc) return 'title desc'
  return 'default'
}

const productInner = `
  _id,
  _type,
  handle,
  hidden,
  hideFromCollections,
  "showInCollection": showInCollection->handle,
  minVariantPrice,
  maxVariantPrice,
  initialVariantSelections[]{
    ...
  },
  shopifyId,
  inquiryOnly,
  title,
  options[]{
    _key,
    _type,
    values[defined(swatch)],
    ...
  },
  sourceData {
    _type,
    handle,
    id,
    images,
    tags,
    title,
    tags,
    priceRange,
    publishedAt,
    variants {
      "edges": edges[][node.availableForSale == true] {
        cursor,
        node {
          __typename,
          _type,
          id,
          image,
          title,
          selectedOptions,
          priceV2,
          compareAtPriceV2,
          availableForSale,
          currentlyNotInStock
        },
      },
    },
  },
`

export const createSanityCollectionQuery = (sort?: Sort) => `
*[
  _type == "shopifyCollection"
  && defined(shopifyId)
  && handle == $handle
] {
  _id,
  _type,
  _key,
  title,
  hidden,
  handle,
  shopifyId,
  reduceColumnCount,
  lightTheme,
  customFilter,
  hideFilter,
  overrideDefaultFilter,
	seo{
  	"image": select(
  		defined(image.asset) => {
        image{
  				"url": asset->url,
  				"_key": asset->url,
          "metadata": asset->metadata,
          "extension": asset->extension,
          ...
				}
      }
    ),
		title,
		metaTitle,
		description,
		keywords,
	},
  hero {
    image {
  		asset->,
      ...,
    },
    mobileImage {
      asset->,
      ...,
    },
    "bodyRaw": body,
    "body_mobileRaw": body_mobile,
    cta[]{
      ...,
      link {
        ...,
        document->
      }
    },
    ...,
  },
  "products": products[]->[hidden!=true && (hideFromCollections != true || (hideFromCollections == true && showInCollection._ref == *[_type == "shopifyCollection" && handle == $handle][0]._id))] | order(${getSortString(
    sort,
  )}) {
    ${productInner}
  }[$productStart..$productEnd],
  "defaultSort": products[]._key,
  "productsCount": count( products[]->[hidden!=true && (hideFromCollections != true || (hideFromCollections == true && showInCollection._ref == *[_type == "shopifyCollection" && handle == $handle][0]._id))] ),
  preferredVariantMatches,
  collectionBlocks[]{
    _key,
    format,
    body,
    "body_mobileRaw": body_mobile,
    ...
  },
  "descriptionRaw": description,
}
`

/*
 * Use this query to get more products, based on their order in
 * the parent collection
 */
export const moreProductsQuery = `
*[
  _type == "shopifyCollection"
  && defined(shopifyId)
  && handle == $handle
] {
  "products": products[]->[hidden != true && (hideFromCollections != true || (hideFromCollections == true && showInCollection._ref == *[_type == "shopifyCollection" && handle == $handle][0]._id))] {
    ${productInner}
  }[$productStart..$productEnd],
}
`

export type FilterResponse = ShopifyProduct[]

/*
 * Use this query to get products when a sort order or filter
 * is defined
 */

const filterQuery = (filterString: string = '', sort?: Sort) => `
${
  sort == Sort.Default
    ? `
    *[
      _type == "shopifyCollection" &&
      handle == $handle
    ] 
    {
      products[defined(@->shopifyId) &&
      @->hidden != true &&
      (@->hideFromCollections != true || (@->hideFromCollections == true && @->showInCollection._ref == *[_type == "shopifyCollection" && handle == $handle][0]._id))
      ${filterString ? `&& ${filterString}` : ''}]
      [$productStart...$productEnd]->{${productInner}},
      "queryCount": count(products[defined(@->shopifyId) &&
        @->hidden != true &&
        (@->hideFromCollections != true || (@->hideFromCollections == true && @->showInCollection._ref == *[_type == "shopifyCollection" && handle == $handle][0]._id))
        ${filterString ? `&& ${filterString}` : ''}]),
    }[0]
    `
    : `*[
      _type == "shopifyProduct" &&
        defined(shopifyId) &&
        hidden != true &&
        (hideFromCollections != true || (hideFromCollections == true && showInCollection._ref == *[_type == "shopifyCollection" && handle == $handle][0]._id)) &&
        references($collectionId) 
      ${filterString ? `&& ${filterString}` : ''}
    ] | order(${getSortString(sort)}) {
      ${productInner}
    }[$productStart...$productEnd]
  `
}`

export const buildFilterQuery = (filters: FilterConfiguration, sort?: Sort) => {
  const filterString = buildFilters(filters, sort)
  return filterQuery(filterString, sort)
}
