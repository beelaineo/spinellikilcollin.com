import { FilterMatch } from '../types'

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

export const buildFilters = (filters: FilterMatch[][]): string => {
  return filters
    .map((filterGroup) =>
      filterGroup
        //
        .map(parseFilterMatch)
        .filter(Boolean)
        .join(' || ')
        .replace(/(.*)/, '($1)'),
    )
    .join(' && ')
}
