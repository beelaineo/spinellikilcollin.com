import * as React from 'react'

export const filterByPriceRange = {
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
    prepare: ({ minPrice, maxPrice }) => {
      return {
        title: 'Price Range',
        subtitle: `From $${minPrice} to $${maxPrice}`,
      }
    },
  },
}

const FilterMatchPreview = ({ value }) => {
  const { match, type } = value
  if (!type || !match) {
    return <h2>(empty)</h2>
  }
  const titlePrefix =
    type === 'By Tag'
      ? 'Product tags include'
      : type === 'By Product Type'
      ? 'Product type equals'
      : type === 'By Option Name'
      ? 'Product options include'
      : type === 'By Product Title'
      ? 'Product title includes'
      : null
  if (!titlePrefix) {
    throw new Error(`Could not generate title prefix for type "${type}"`)
  }

  return (
    <h4 style={{ fontWeight: 400, margin: 0 }}>
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

export const filterMatch = {
  name: 'filterMatch',
  title: 'Filter Match',
  type: 'object',
  fields: [
    {
      name: 'type',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'By Tag', value: 'tag' },
          { title: 'By Product Type', value: 'type' },
          { title: 'By Product Title', value: 'title' },
          { title: 'By Option Name', value: 'option' },
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
    component: FilterMatchPreview,
  },
}

const FilterPreview = ({ value }) => {
  const { label, matches } = value
  if (!matches) return null
  const tagMatches = matches.filter((m) => m.type === 'tag')
  const typeMatches = matches.filter((m) => m.type === 'type')
  const titleMatches = matches.filter((m) => m.type === 'title')
  const optionMatches = matches.filter((m) => m.type === 'option')
  const subtitles = [
    titleMatches.length
      ? `Matches title: ${titleMatches.map(({ match }) => match).join(', ')}`
      : null,
    tagMatches.length
      ? `Matches tags: ${tagMatches.map(({ match }) => match).join(', ')}`
      : null,
    optionMatches.length
      ? `Matches options: ${optionMatches.map(({ match }) => match).join(', ')}`
      : null,
    typeMatches.length
      ? `Matches type: ${typeMatches.map(({ match }) => match).join(', ')}`
      : null,
  ].filter(Boolean)
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h4 style={{ fontWeight: 500, margin: '0 15px 0 0' }}>{label}</h4>
      <div>
        {subtitles.map((subtitle) => (
          <h6
            key={subtitle}
            style={{ color: 'gray', fontWeight: 400, margin: 0 }}
          >
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

export const filter = {
  name: 'filter',
  type: 'object',
  title: 'Filter',
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
      of: [{ type: 'filterMatch' }],
    },
  ],
  preview: {
    select: {
      label: 'label',
      matches: 'matches',
    },
    component: FilterPreview,
  },
}

export const filterSet = {
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
      of: [{ type: 'filter' }],
    },
    {
      name: 'searchOnly',
      title: 'Search Filter Only',
      description:
        'If selected, this filter will not appear on collection page filters',
      type: 'boolean',
    },
  ],
}

export const productFilter = {
  name: 'productFilter',
  type: 'array',
  title: 'Product Listing Filter',
  of: [{ type: 'filterSet' }, { type: 'priceRangeFilter' }],
}
