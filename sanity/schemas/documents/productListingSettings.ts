import {defineField, defineType} from 'sanity'

export const productListingSettings = defineType({
  title: 'Product Listing Setings',
  type: 'document',
  name: 'productListingSettings',
  description: 'description',
  fieldsets: [{name: 'filters'}],
  fields: [
    defineField({
      name: 'helpText',
      type: 'helpText',
      fieldset: 'filters',
      description:
        'Use these fields to define a default set of filters to be used on collection pages and in search results. You can add specific filter configuration to each Collection within their own documents.',
    }),
    defineField({
      name: 'defaultFilter',
      title: 'Default Filters',
      type: 'productFilter',
      fieldset: 'filters',
    }),
    defineField({
      name: 'newDefaultFilter',
      title: 'New Filters (beta)',
      type: 'productFilter',
      fieldset: 'filters',
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Product Listing Settings',
    }),
  },
})
