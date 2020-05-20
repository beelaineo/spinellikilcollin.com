// const OptionPreview = ({ matches, label }) => {
//   return null
// }
//
const prepareMatchPreview = ({ matches, label }) => {
  const subtitle = ['matches: ', matches.join(', ')].join('')
  return {
    title: label,
    subtitle,
  }
}

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

export const optionFilter = {
  name: 'optionFilter',
  type: 'object',
  title: 'Option Filter',
  fields: [
    {
      name: 'label',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'matches',
      type: 'array',
      description:
        'Enter option values to match from shopify. These are case-insensitive and will match any option values that contain this text. I.e. a value of "black" will match "Black Gold"',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      matches: 'matches',
      label: 'label',
    },
    prepare: prepareMatchPreview,
  },
}

export const filterByOption = {
  name: 'filterByOption',
  type: 'object',
  title: 'Filter by Option',
  fields: [
    {
      name: 'label',
      title: 'Group Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'optionFilters',
      type: 'array',
      of: [{ type: 'optionFilter' }],
    },
  ],
}

export const typeFilter = {
  name: 'typeFilter',
  type: 'object',
  title: 'Type Filter',
  fields: [
    {
      name: 'label',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'matches',
      type: 'array',
      description:
        'Enter product types to match from shopify (case-insensitive)',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      matches: 'matches',
      label: 'label',
    },
    prepare: prepareMatchPreview,
  },
}

export const filterByType = {
  name: 'filterByType',
  type: 'object',
  title: 'Filter by Product Type',
  fields: [
    {
      name: 'label',
      title: 'Group Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'typeFilters',
      type: 'array',
      of: [{ type: 'typeFilter' }],
    },
  ],
}

export const tagFilter = {
  name: 'tagFilter',
  type: 'object',
  title: 'Tag Filter',
  fields: [
    {
      name: 'label',
      title: 'Button Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'matches',
      type: 'array',
      description: 'Enter tags to match from shopify (case-insensitive)',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      matches: 'matches',
      label: 'label',
    },
    prepare: prepareMatchPreview,
  },
}

export const filterByTag = {
  name: 'filterByTag',
  type: 'object',
  title: 'Filter by Tag',
  fields: [
    {
      name: 'label',
      title: 'Group Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'tagFilters',
      type: 'array',
      of: [{ type: 'tagFilter' }],
    },
  ],
}

export const productFilter = {
  name: 'productFilter',
  type: 'array',
  title: 'Product Listing Filter',
  of: [
    { type: 'filterByTag' },
    { type: 'filterByOption' },
    { type: 'filterByType' },
    { type: 'priceRangeFilter' },
  ],
}
