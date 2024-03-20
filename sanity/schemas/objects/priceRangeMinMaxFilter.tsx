import {defineField, defineType} from 'sanity'

export const priceRangeMinMaxFilter = defineType({
  name: 'priceRangeMinMaxFilter',
  title: 'Price Range Filter',
  type: 'object',
  fields: [
    defineField({
      name: 'minPrice',
      title: 'Minimum Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'maxPrice',
      title: 'Maximum Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
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
