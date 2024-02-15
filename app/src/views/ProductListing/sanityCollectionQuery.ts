import { Sort } from '../../components/Filter'
import { Product, FilterConfiguration, FilterMatchGroup } from '../../types'
import { buildFilters } from '../../utils/sanity'

const getSortString = (sort?: Sort, filterSort?: string[]): string => {
  if (filterSort && filterSort.length > 0) {
    const countMatches: string[] = []

    filterSort.map((s) => {
      const string = `count(@->store.variants.[currentlyNotInStock == false && selectedOptions[1].value == '${s}'])*2 + count(@->store.variants[currentlyNotInStock == true && selectedOptions[1].value == '${s}'])`
      countMatches.push(string)
    })

    let sortString = countMatches.join(' + ')
    sortString = '(' + sortString + ') desc'

    if (sort === Sort.PriceAsc)
      return sortString + ', @->store.priceRange.minVariantPrice asc'
    if (sort === Sort.PriceDesc)
      return sortString + ', @->store.priceRange.maxVariantPrice desc'
    return sortString
  } else {
    if (sort === Sort.PriceAsc) return 'store.priceRange.minVariantPrice asc'
    if (sort === Sort.PriceDesc) return 'store.priceRange.maxVariantPrice desc'
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
    "inStock": (count(store.variants[sourceData.currentlyNotInStock == false && !(title match "Not sure of my size")]) > 0),
    "subcategory": array::unique(store.variants[][sourceData.availableForSale == true].sourceData.metafields[key == "subcategory"].value),
    "metal": array::unique(store.variants[][sourceData.availableForSale == true].sourceData.metafields[key == "metal"].value),
    "style": array::unique(store.variants[][sourceData.availableForSale == true].sourceData.metafields[key == "style"].value),
    "stone": array::unique(store.variants[][sourceData.availableForSale == true].sourceData.metafields[key == "stone"].value),
    "sizes": array::unique(store.variants[][sourceData.currentlyNotInStock == false && !(title match "Not sure of my size")].sourceData.selectedOptions[name == "Size"].value),
  },
  "excludeFromIndication": store.metafields[key == "excludeFromIndication"][0].value,
  "metafields": store.metafields,
  store {
    _type,
    handle,
    id,
    images,
    tags,
    title,
    priceRange,
    productType,
    publishedAt,
    "variants": variants[sourceData.availableForSale == true] {
      _type,
      _key,
      id,
      title,
      shopifyVariantID,
      sourceData {
        __typename,
        _type,
        availableForSale,
        compareAtPriceV2,
        currentlyNotInStock,
        id,
        image,
        metafields,
        priceV2,
        requiresShipping,
        selectedOptions,
        sku,
        title,
      },
    },
  },
`

export const createSanityCollectionQuery = (sort?: Sort) => `
*[
  _type == "collection"
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
          lqip
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
          lqip
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
  "products": products[!(@->_id in path("drafts.**")) && @->hidden!=true && (@->hideFromCollections != true || (@->hideFromCollections == true && count(@->showInCollections[_ref == *[_type == "collection" && handle == $handle][0]._id]) > 0))]-> | order(${getSortString(
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
  _type == "collection"
  && defined(shopifyId)
  && handle == $handle
] {
  "products": products[@->hidden != true &&
    (!(@->_id in path("drafts.**")) &&
    @->hideFromCollections != true || (@->hideFromCollections == true &&
      count(@->showInCollections[_ref == *[_type == "collection" &&
      handle == $handle][0]._id]) > 0))]-> {
    ${productInner}
  },
}
`

export type FilterResponse = Product[]

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
      _type == "collection"
      && defined(shopifyId)
      && handle == $handle
    ] {
        products[@->hidden != true &&
        !(@->_id in path("drafts.**")) &&
        (@->hideFromCollections != true || (@->hideFromCollections == true &&
        count(@->showInCollections[_ref == *[_type == "collection" &&
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
      _type == "collection" &&
      handle == $handle
    ] 
    {
      products[@->hidden != true &&
        !(@->_id in path("drafts.**")) &&
      (@->hideFromCollections != true || (@->hideFromCollections == true && count(@->showInCollections[_ref == *[_type == "collection" && handle == $handle][0]._id]) > 0))
      ${filterString ? `&& ${filterString}` : ''}]->{${productInner}}
    }[0]
    `
    : `*[
      _type == "product" &&
        defined(shopifyId) &&
        hidden != true &&
        !(_id in path("drafts.**")) &&
        (hideFromCollections != true || (hideFromCollections == true && count(showInCollections[_ref == *[_type == "collection" && handle == $handle][0]._id]) > 0)) &&
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
