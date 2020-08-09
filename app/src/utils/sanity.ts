import {
  FilterMatch,
  PRICE_RANGE_FILTER,
  FILTER_MATCH_GROUP,
  FilterConfiguration,
  Document,
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

const toArray = <T>(i: T | T[]): T[] => (Array.isArray(i) ? i : [i])

type WithType<T extends Document> = T & {
  _type: string | null | undefined
}

type WithTypename<T extends Document> = T & {
  __typename?: string
}

const addTypename = <T extends Document = Document>(item: WithType<T>) => {
  if (typeof item !== 'object') return item
  return Object.entries(item).reduce((acc, [key, value]) => {
    if (!value) {
      return { ...acc, [key]: value }
    }
    if (key === '_type') {
      return {
        ...acc,
        [key]: value,
        __typename: value.toString().replace(/^./, (c) => c.toUpperCase()),
      }
    }
    if (Array.isArray(value)) {
      return {
        ...acc,
        [key]: value.map(addTypename),
      }
    }
    if (value instanceof Date) {
      return {
        ...acc,
        [key]: value.toString(),
      }
    }
    if (typeof value === 'object') {
      return {
        ...acc,
        // @ts-ignore
        [key]: addTypename(value),
      }
    }
    return {
      ...acc,
      [key]: value,
    }
  }, {})
}

export const withTypenames = <T extends Document = Document>(
  items: WithType<T>[],
): WithTypename<T>[] => toArray(items).map(addTypename)
