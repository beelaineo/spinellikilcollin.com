import * as React from 'react'
import {defineField, defineType} from 'sanity'

export const filterByPriceRange = defineType({
  name: 'priceRangeFilter',
  title: 'Price Range Filter',
  type: 'object',
  fields: [
    {
      name: 'minPrice',
      title: 'Minimum Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'maxPrice',
      title: 'Maximum Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      maxPrice: 'maxPrice',
      minPrice: 'minPrice',
    },
    prepare: ({minPrice, maxPrice}) => {
      return {
        title: 'Price Range',
        subtitle: `From $${minPrice} to $${maxPrice}`,
      }
    },
  },
})

export const filterByInventory = defineType({
  name: 'inventoryFilter',
  title: 'Inventory Filter',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Currently In Stock Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      label: 'label',
    },
    prepare: ({label}) => {
      return {
        title: 'Inventory Filter',
        subtitle: `${label}`,
      }
    },
  },
})

const FilterMatchPreview = (props) => {
  const {match, type} = props
  console.log('FilterMatch props', props)
  if (!type || !match) {
    return <h2>(empty)</h2>
  }

  const titlePrefix =
    type === 'tag'
      ? 'Product tags include'
      : type === 'type'
      ? 'Product type equals'
      : type === 'option'
      ? 'Product options include'
      : type === 'title'
      ? 'Product title includes'
      : type === 'subcategory'
      ? 'Product subcategory equals'
      : type === 'metal'
      ? 'Product variant metals include'
      : type === 'style'
      ? 'Product variant style equals'
      : type === 'stone'
      ? 'Product variant stones include'
      : type === 'size'
      ? 'Variant sizes include'
      : null
  if (!titlePrefix) {
    throw new Error(`Could not generate title prefix for type "${type}"`)
  }

  return (
    <h4 style={{fontWeight: 400, margin: 0}}>
      {titlePrefix}:{' '}
      <pre
        style={{
          display: 'inline',
          padding: '0 4px',
          backgroundColor: '#f3eded',
        }}
      >
        {match}
      </pre>
    </h4>
  )
}

export const filterMatch = defineType({
  name: 'filterMatch',
  title: 'Filter Match',
  type: 'object',
  components: {
    preview: FilterMatchPreview,
  },
  fields: [
    {
      name: 'type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          {title: 'By Product Subcategory', value: 'subcategory'},
          {
            title:
              'By Variant Size (note: does not exclude non-matches, only reorders query results)',
            value: 'size',
          },
          {title: 'By Variant Metal', value: 'metal'},
          {title: 'By Variant Style', value: 'style'},
          {title: 'By Variant Stone', value: 'stone'},
          {title: 'By Tag', value: 'tag'},
          {title: 'By Product Type', value: 'type'},
          {title: 'By Product Title', value: 'title'},
          {title: 'By Option Name', value: 'option'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'match',
      type: 'string',
      title: 'Match',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      type: 'type',
      match: 'match',
    },
  },
})

const FilterPreview = (props) => {
  const {label, matches} = props
  if (!matches) return null
  const tagMatches = matches.filter((m) => m.type === 'tag')
  const typeMatches = matches.filter((m) => m.type === 'type')
  const titleMatches = matches.filter((m) => m.type === 'title')
  const optionMatches = matches.filter((m) => m.type === 'option')
  const subcategoryMatches = matches.filter((m) => m.type === 'subcategory')
  const metalMatches = matches.filter((m) => m.type === 'metal')
  const styleMatches = matches.filter((m) => m.type === 'style')
  const stoneMatches = matches.filter((m) => m.type === 'stone')
  const sizeMatches = matches.filter((m) => m.type === 'size')
  const subtitles = [
    titleMatches.length
      ? `Matches title: ${titleMatches.map(({match}) => match).join(', ')}`
      : null,
    tagMatches.length ? `Matches tags: ${tagMatches.map(({match}) => match).join(', ')}` : null,
    optionMatches.length
      ? `Matches options: ${optionMatches.map(({match}) => match).join(', ')}`
      : null,
    typeMatches.length ? `Matches type: ${typeMatches.map(({match}) => match).join(', ')}` : null,
    subcategoryMatches.length
      ? `Matches subcategory: ${subcategoryMatches.map(({match}) => match).join(', ')}`
      : null,
    metalMatches.length
      ? `Matches metal: ${metalMatches.map(({match}) => match).join(', ')}`
      : null,
    styleMatches.length
      ? `Matches style: ${styleMatches.map(({match}) => match).join(', ')}`
      : null,
    stoneMatches.length
      ? `Matches stone: ${stoneMatches.map(({match}) => match).join(', ')}`
      : null,
    sizeMatches.length ? `Matches size: ${sizeMatches.map(({match}) => match).join(', ')}` : null,
  ].filter(Boolean)
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <h4 style={{fontWeight: 500, margin: '0 15px 0 0'}}>{label}</h4>
      <div>
        {subtitles.map((subtitle) => (
          <h6 key={subtitle} style={{color: 'gray', fontWeight: 400, margin: 0}}>
            {subtitle}
          </h6>
        ))}
      </div>
    </div>
  )
  return {
    title: label,
    subtitle: subtitle,
  }
}

export const filter = defineType({
  name: 'filter',
  type: 'object',
  title: 'Filter',
  components: {
    preview: FilterPreview,
  },
  fields: [
    {
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'matches',
      title: 'Matches any of:',
      type: 'array',
      of: [{type: 'filterMatch'}],
    },
  ],
  preview: {
    select: {
      label: 'label',
      matches: 'matches',
    },
  },
})

export const filterSet = defineType({
  name: 'filterSet',
  title: 'Filter Set',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'filters',
      title: 'Filters',
      type: 'array',
      of: [{type: 'filter'}],
    },
    {
      name: 'searchOnly',
      title: 'Search Filter Only',
      description: 'If selected, this filter will not appear on collection page filters',
      type: 'boolean',
    },
  ],
})

export const productFilter = defineField({
  name: 'productFilter',
  type: 'array',
  title: 'Product Listing Filter',
  of: [
    {type: 'filter'},
    {type: 'filterSet'},
    {type: 'priceRangeFilter'},
    {type: 'inventoryFilter'},
  ],
})
