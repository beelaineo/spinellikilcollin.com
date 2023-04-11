import { Sort } from '../../components/Filter'
import {
  ShopifyProduct,
  FilterConfiguration,
  FilterMatchGroup,
} from '../../types'
import { buildFilters } from '../../utils/sanity'

const getSortString = (sort?: Sort, filterSort?: string[]): string => {
  if (filterSort && filterSort.length > 0) {
    const countMatches: string[] = []

    filterSort.map((s) => {
      const string = `count(@->sourceData.variants.edges[node.currentlyNotInStock == false && node.selectedOptions[1].value == '${s}'])*2 + count(@->sourceData.variants.edges[node.currentlyNotInStock == true && node.selectedOptions[1].value == '${s}'])`
      countMatches.push(string)
    })

    let sortString = countMatches.join(' + ')
    sortString = '(' + sortString + ') desc'

    if (sort === Sort.PriceAsc) return sortString + ', @->minVariantPrice asc'
    if (sort === Sort.PriceDesc) return sortString + ', @->maxVariantPrice desc'
    return sortString
  } else {
    if (sort === Sort.PriceAsc) return 'minVariantPrice asc'
    if (sort === Sort.PriceDesc) return 'maxVariantPrice desc'
    // if (sort === Sort.DateAsc) return 'sourceData.publishedAt asc'
    // if (sort === Sort.DateDesc) return 'sourceData.publishedAt desc'
    // if (sort === Sort.AlphaAsc) return 'title asc'
    // if (sort === Sort.AlphaDesc) return 'title desc'
    return 'default'
  }
}

const productInner = `
  _id,
  _type,
  handle,
  hidden,
  hideFromCollections,
  showInCollections,
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
  "filterData": {
    "inStock": (count(sourceData.variants.edges[][node.currentlyNotInStock == false && node.title != "Not sure of my size"]) > 0),
    "subcategory": array::unique(sourceData.variants.edges[][node.availableForSale == true].node.metafields.edges[node.key == "subcategory"].node.value),
    "metal": array::unique(sourceData.variants.edges[][node.availableForSale == true].node.metafields.edges[node.key == "metal"].node.value),
    "style": array::unique(sourceData.variants.edges[][node.availableForSale == true].node.metafields.edges[node.key == "style"].node.value),
    "stone": array::unique(sourceData.variants.edges[][node.availableForSale == true].node.metafields.edges[node.key == "stone"].node.value),
    "sizes": array::unique(sourceData.variants.edges[][node.currentlyNotInStock == false && node.title != "Not sure of my size"].node.selectedOptions[name == "Size"].value),
  },
  "excludeFromIndication": sourceData.metafields.edges[node.key == "excludeFromIndication"][0].node.value,
  "metafields": sourceData.metafields.edges[].node,
  sourceData {
    _type,
    handle,
    id,
    images,
    tags,
    title,
    tags,
    priceRange,
    productType,
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
          currentlyNotInStock,
          metafields,
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
  minimalDisplay,
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
    ...,
    image {
       ...,
      _type,
      asset->{
        _id,
        _type,
        _key,
        extension,
        path,
        url,
        metadata {
          dimensions,
          lqip,
          blurHash
        },
      },
    },
    mobileImage {
      _type,
      asset->{
        _id,
        _type,
        _key,
        extension,
        path,
        url,
        metadata {
          dimensions,
          lqip,
          blurHash
        },
      },
      crop,
      hotspot,
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
  },
  "products": products[!(@->_id in path("drafts.**")) && @->hidden!=true && (@->hideFromCollections != true || (@->hideFromCollections == true && count(@->showInCollections[_ref == *[_type == "shopifyCollection" && handle == $handle][0]._id]) > 0))]-> | order(${getSortString(
    sort,
  )}) {
    ${productInner}
  },
  preferredVariantMatches,
  collectionBlocks[]{
    _key,
    format,
    body,
    "body_mobileRaw": body_mobile,
    ...
  },
  footer[]{
    ...,
    "bodyRaw": body,
    "body_mobileRaw": body_mobile,
    link[] {
      ...,
      document->
    }
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
  "products": products[@->hidden != true &&
    (!(@->_id in path("drafts.**")) &&
    @->hideFromCollections != true || (@->hideFromCollections == true &&
      count(@->showInCollections[_ref == *[_type == "shopifyCollection" &&
      handle == $handle][0]._id]) > 0))]-> {
    ${productInner}
  },
}
`

export type FilterResponse = ShopifyProduct[]

/*
 * Use this query to get products when a sort order or filter
 * is defined
 */

const filterQuery = (
  filterString: string = '',
  sort?: Sort,
  filterSort?: string[],
) => `
${
  filterSort && filterSort.length > 0
    ? `
    *[
      _type == "shopifyCollection"
      && defined(shopifyId)
      && handle == $handle
    ] {
        products[@->hidden != true &&
        !(@->_id in path("drafts.**")) &&
        (@->hideFromCollections != true || (@->hideFromCollections == true &&
        count(@->showInCollections[_ref == *[_type == "shopifyCollection" &&
        handle == $handle][0]._id]) > 0))
        ${filterString ? `&& ${filterString}` : ''}
    ] | order(${getSortString(sort, filterSort)})->
      {
        ${productInner}
      }
    }
  `
    : sort == Sort.Default
    ? `
    *[
      _type == "shopifyCollection" &&
      handle == $handle
    ] 
    {
      products[@->hidden != true &&
        !(@->_id in path("drafts.**")) &&
      (@->hideFromCollections != true || (@->hideFromCollections == true && count(@->showInCollections[_ref == *[_type == "shopifyCollection" && handle == $handle][0]._id]) > 0))
      ${filterString ? `&& ${filterString}` : ''}]->{${productInner}}
    }[0]
    `
    : `*[
      _type == "shopifyProduct" &&
        defined(shopifyId) &&
        hidden != true &&
        !(_id in path("drafts.**")) &&
        (hideFromCollections != true || (hideFromCollections == true && count(showInCollections[_ref == *[_type == "shopifyCollection" && handle == $handle][0]._id]) > 0)) &&
        references($collectionId) 
      ${filterString ? `&& ${filterString}` : ''}
    ] | order(${getSortString(sort)}) {
      ${productInner}
    }
  `
}`

export const buildFilterQuery = (filters: FilterConfiguration, sort?: Sort) => {
  const { filterString, filterSort } = buildFilters(filters, sort)
  return filterQuery(filterString, sort, filterSort)
}
