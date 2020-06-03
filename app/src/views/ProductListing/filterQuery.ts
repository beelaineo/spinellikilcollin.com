import { ShopifyProduct, FilterMatch } from '../../types'
import { buildFilters } from '../../utils/sanity'

export type FilterResponse = ShopifyProduct[]

const filterQuery = (filterString?: string) => `
*[
  _type == "shopifyProduct" &&
    defined(shopifyId) &&
    references($collectionId) 
  ${filterString ? `&& ${filterString}` : ''}
]{
  _type,
  _id,
  _key,
  title,
  handle,
  shopifyId,
  sourceData{
  	images,
  	tags,
    priceRange,
    variants
	},
	options
}
`

export const buildQuery = (filters: FilterMatch[][]) => {
  const filterString = buildFilters(filters)
  return filterQuery(filterString)
}
