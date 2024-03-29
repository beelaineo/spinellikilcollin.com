import {
  FilterMatch,
  PRICE_RANGE_FILTER,
  INVENTORY_FILTER,
  FILTER_MATCH_GROUP,
  FILTER_SINGLE,
  FilterConfiguration,
  Document,
  FilterMatchGroup,
} from '../types'
import { Sort } from '../constants'
import { definitely } from './data'

const parseFilterMatch = ({ type, match }: FilterMatch): string | null => {
  switch (type) {
    case 'type':
      return `store.productType == "${match}"`
    case 'tag':
      return `"${match}" in store.tags`
    case 'title':
      return `title match "${match}"`
    case 'option':
      return `"${match}" in store.options[].value`
    case 'size':
      return `"${match}" in store.options[name == "Size"].values[]`
    case 'subcategory':
      return `store.variants[].sourceData.metafields[key == "subcategory"].value match "*${match}*"`
    case 'metal':
      return `store.variants[].sourceData.metafields[key == "metal"].value match "*${match}*"`
    case 'style':
      return `store.variants[].sourceData.metafields[key == "style"].value match "*${match}*"`
    case 'stone':
      return `store.variants[].sourceData.metafields[key == "stone"].value match "*${match}*"`
    default:
      throw new Error(`"${type}" is not a valid filter type`)
  }
}

const parseFilterMatchDefaultSort = ({
  type,
  match,
}: FilterMatch): string | null => {
  switch (type) {
    case 'type':
      return `@->store.productType == "${match}"`
    case 'tag':
      return `"${match}" in @->store.tags`
    case 'title':
      return `@->title match "${match}"`
    case 'option':
      return `"${match}" in @->store.options[].value`
    case 'size':
      return `"${match}" in @->store.options[name == "Size"].values[]`
    case 'subcategory':
      return `@->variants[].sourceData.metafields[key == "subcategory"].value match "*${match}*"`
    case 'metal':
      return `@->variants[].sourceData.metafields[key == "metal"].value match "*${match}*"`
    case 'style':
      return `@->variants[].sourceData.metafields[key == "style"].value match "*${match}*"`
    case 'stone':
      return `@->variants[].sourceData.metafields[key == "stone"].value match "*${match}*"`
    default:
      throw new Error(`"${type}" is not a valid filter type`)
  }
}

interface filterProps {
  filterString: string
  filterSort?: string[]
}

export const buildFilters = (
  filters: FilterConfiguration,
  sort?: Sort,
): filterProps => {
  // console.log('filters', filters)
  // console.log('sort', sort)

  const filterSort: string[] = []

  const filterString = filters
    .map((filterGroup) => {
      if (filterGroup.filterType === FILTER_MATCH_GROUP) {
        if (filterGroup.matches.some((f) => f.type === 'size')) {
          // console.log('size', filterGroup.matches)
          filterGroup.matches.map((m) => filterSort.push(m.match || ''))
          return null
        } else if (sort == Sort.Default) {
          return filterGroup.matches
            .map(parseFilterMatchDefaultSort)
            .filter(Boolean)
            .join(' || ')
            .replace(/(.*)/, '($1)')
        } else {
          return filterGroup.matches
            .map(parseFilterMatch)
            .filter(Boolean)
            .join(' || ')
            .replace(/(.*)/, '($1)')
        }
      } else if (filterGroup.filterType === FILTER_SINGLE) {
        if (filterGroup.matches.some((f) => f.type === 'size')) {
          // console.log('size', filterGroup.matches)
          filterGroup.matches.map((m) => filterSort.push(m.match || ''))
          return null
        } else if (sort == Sort.Default) {
          return filterGroup.matches
            .map(parseFilterMatchDefaultSort)
            .filter(Boolean)
            .join(' || ')
            .replace(/(.*)/, '($1)')
        } else {
          return filterGroup.matches
            .map(parseFilterMatch)
            .filter(Boolean)
            .join(' || ')
            .replace(/(.*)/, '($1)')
        }
      } else if (filterGroup.filterType === PRICE_RANGE_FILTER) {
        const { minPrice, maxPrice } = filterGroup
        return [
          '(',
          sort == Sort.Default || (filterSort && filterSort.length > 0)
            ? '@->store.priceRange.maxVariantPrice'
            : 'store.priceRange.maxVariantPrice',
          ' >= ',
          Math.floor(minPrice),
          ' && ',
          sort == Sort.Default || (filterSort && filterSort.length > 0)
            ? '@->store.priceRange.minVariantPrice'
            : 'store.priceRange.minVariantPrice',
          ' <= ',
          Math.ceil(maxPrice),
          ')',
        ].join('')
      } else if (filterGroup.filterType === INVENTORY_FILTER) {
        const rule =
          sort == Sort.Default || (filterSort && filterSort.length > 0)
            ? '(count(@->store.variants[][sourceData.currentlyNotInStock == false]) > 0)'
            : '(count(store.variants[][sourceData.currentlyNotInStock == false]) > 0)'
        const { applyFilter } = filterGroup
        return applyFilter
          ? rule
          : sort == Sort.Default || (filterSort && filterSort.length > 0)
          ? '(count(@->store.variants[]) > 0)'
          : '(count(store.variants[]) > 0)'
      }
      throw new Error(`This kind of filter cannot be parsed`)
    })
    .filter((s) => s)
    .join(' && ')

  return { filterString, filterSort }
}

const toArray = <T>(i: T | T[]): T[] => (Array.isArray(i) ? i : [i])

type WithType<T extends Document> = T & {
  _type: string | null | undefined
}

type WithTypename<T extends Document> = T & {
  __typename?: string
}

const addTypename = <T extends Document = Document>(item: T) => {
  if (item === null || item === undefined || typeof item !== 'object') {
    return item
  }
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

export const withTypenames = <T extends Document>(
  items: T | T[],
): WithTypename<T>[] => toArray(items).map(addTypename)

export function sanityBlocksToPlainText(blocks: any[]): string {
  return (
    definitely(blocks)
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== 'block' || !block.children) {
          return ''
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join('')
      })
      // join the paragraphs leaving split by two linebreaks
      .join('\n\n')
  )
}
