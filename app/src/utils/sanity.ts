import {
  FilterMatch,
  PRICE_RANGE_FILTER,
  FILTER_MATCH_GROUP,
  FilterConfiguration,
} from '../types'

const parseFilterMatch = ({ type, match }: FilterMatch): string | null => {
  switch (type) {
    case 'type':
      return `sourceData.productType == "${match}"`
    case 'tag':
      return `"${match}" in sourceData.tags`
    case 'title':
      return `title match "${match}"`
    case 'option':
      return `"${match}" in sourceData.options[].value`
    default:
      throw new Error(`"${type}" is not a valid filter type`)
  }
}

export const buildFilters = (filters: FilterConfiguration): string => {
  return filters
    .map((filterGroup) => {
      if (filterGroup.filterType === FILTER_MATCH_GROUP) {
        return filterGroup.matches
          .map(parseFilterMatch)
          .filter(Boolean)
          .join(' || ')
          .replace(/(.*)/, '($1)')
      } else if (filterGroup.filterType === PRICE_RANGE_FILTER) {
        const { minPrice, maxPrice } = filterGroup
        return [
          '(',
          'maxVariantPrice',
          ' >= ',
          Math.floor(minPrice),
          ' && ',
          'minVariantPrice',
          ' <= ',
          Math.ceil(maxPrice),
          ')',
        ].join('')
      }
      throw new Error('This kind of filter cannot be parsed')
    })

    .join(' && ')
}
