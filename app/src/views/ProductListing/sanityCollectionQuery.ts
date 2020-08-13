import { Sort } from '../../components/Filter'
import { ShopifyProduct, FilterConfiguration } from '../../types'
import { buildFilters } from '../../utils/sanity'

const getSortString = (sort?: Sort): string => {
  if (sort === Sort.PriceAsc) return 'minVariantPrice asc'
  if (sort === Sort.PriceDesc) return 'maxVariantPrice desc'
  // if (sort === Sort.DateAsc) return 'sourceData.publishedAt asc'
  // if (sort === Sort.DateDesc) return 'sourceData.publishedAt desc'
  if (sort === Sort.AlphaAsc) return 'title asc'
  if (sort === Sort.AlphaDesc) return 'title desc'
  return 'default'
}

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
  handle,
  shopifyId,
  reduceColumnCount,
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
    ...,
  },
  "products": products[$productStart...$productEnd]->[] | order(${getSortString(
    sort,
  )}) {
    _id,
    _type,
    handle,
    minVariantPrice,
    maxVariantPrice,
    shopifyId,
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
        edges[]{
          cursor,
          node {
            _type,
            id,
            image,
            title,
            selectedOptions,
            priceV2
          },
        },
      },

    },
  },
  preferredVariantMatches,
  collectionBlocks[]{
    _key,
    format,
    body,
    ...
  },
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
  "products": products[$productStart...$productEnd]->[] {
    _id,
    _type,
    handle,
    minVariantPrice,
    maxVariantPrice,
    shopifyId,
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
        edges[]{
          cursor,
          node {
            _type,
            id,
            image,
            title,
            selectedOptions,
            priceV2
          },
        },
      },
    },
  },
}
`

export type FilterResponse = ShopifyProduct[]

/*
 * Use this query to get products when a sort order or filter
 * is defined
 */

const filterQuery = (filterString: string = '', sort?: Sort) => `
*[
  _type == "shopifyProduct" &&
    defined(shopifyId) &&
    references($collectionId) 
  ${filterString ? `&& ${filterString}` : ''}
] | order(${getSortString(sort)}) {
  _id,
  _type,
  handle,
  minVariantPrice,
  maxVariantPrice,
  shopifyId,
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
      edges[]{
        cursor,
        node {
          _type,
          id,
          image,
          title,
          selectedOptions,
          priceV2
        },
      },
    },
  },
}[$productStart...$productEnd]
`

export const buildFilterQuery = (filters: FilterConfiguration, sort?: Sort) => {
  const filterString = buildFilters(filters)
  return filterQuery(filterString, sort)
}
