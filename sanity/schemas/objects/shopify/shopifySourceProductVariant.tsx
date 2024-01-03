import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shopifySourceProductVariant',
  title: 'Shopify',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    // Created at
    // defineField({
    //   fieldset: 'status',
    //   name: 'createdAt',
    //   title: 'Created at',
    //   type: 'string',
    // }),
    // Updated at
    // defineField({
    //   fieldset: 'status',
    //   name: 'updatedAt',
    //   title: 'Updated at',
    //   type: 'string',
    // }),
    defineField({
      name: 'availableForSale',
      title: 'Available for sale',
      type: 'boolean',
    }),
    defineField({
      name: 'currentlyNotInStock',
      title: 'Currently not in stock',
      type: 'boolean',
    }),
    defineField({
      name: 'compareAtPriceV2',
      title: 'Compare at price',
      type: 'shopifyPrice',
    }),
    defineField({
      name: 'priceV2',
      title: 'Price',
      type: 'shopifyPrice',
    }),
    // Shopify Variant ID
    // defineField({
    //   name: 'shopifyVariantID',
    //   title: 'Shopify Variant ID',
    //   type: 'string',
    // }),
    // ID
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
    }),
    defineField({
      name: 'metafields',
      title: 'Metafields',
      type: 'array',
      of: [
        {
          type: 'shopifyMetafield',
        },
      ],
    }),
    // Product status
    // defineField({
    //   fieldset: 'status',
    //   name: 'status',
    //   title: 'Product status',
    //   type: 'string',
    //   options: {
    //     layout: 'dropdown',
    //     list: ['active', 'archived', 'draft'],
    //   },
    //   validation: (Rule) => Rule.required(),
    // }),
    // Requires Shipping
    defineField({
      name: 'requiresShipping',
      title: 'Requires Shipping',
      type: 'boolean',
    }),
    // Deleted
    defineField({
      name: 'isDeleted',
      title: 'Deleted from Shopify?',
      type: 'boolean',
    }),
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    // SKU
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    // Selected Options
    defineField({
      name: 'selectedOptions',
      title: 'Selected Options',
      type: 'array',
      of: [
        {
          type: 'shopifySourceSelectedOption',
        },
      ],
    }),
    // ID
    // defineField({
    //   name: 'id',
    //   title: 'ID',
    //   type: 'number',
    //   description: 'Shopify Product Variant ID',
    // }),
    // GID
    // defineField({
    //   name: 'gid',
    //   title: 'GID',
    //   type: 'string',
    //   description: 'Shopify Product Variant GID',
    // }),
    // Product ID
    // defineField({
    //   name: 'productId',
    //   title: 'Product ID',
    //   type: 'number',
    // }),
    // Product GID
    // defineField({
    //   name: 'productGid',
    //   title: 'Product GID',
    //   type: 'string',
    // }),
    // Price
    // defineField({
    //   name: 'price',
    //   title: 'Price',
    //   type: 'number',
    // }),
    // Compare at price
    // defineField({
    //   name: 'compareAtPrice',
    //   title: 'Compare at price',
    //   type: 'number',
    // }),
    // Inventory
    // defineField({
    //   name: 'inventory',
    //   title: 'Inventory',
    //   type: 'inventory',
    //   options: {
    //     columns: 3,
    //   },
    // }),
    // Option 1
    // defineField({
    //   fieldset: 'options',
    //   name: 'option1',
    //   title: 'Option 1',
    //   type: 'string',
    // }),
    // Option 2
    // defineField({
    //   fieldset: 'options',
    //   name: 'option2',
    //   title: 'Option 2',
    //   type: 'string',
    // }),
    // Option 3
    // defineField({
    //   fieldset: 'options',
    //   name: 'option3',
    //   title: 'Option 3',
    //   type: 'string',
    // }),
    // Preview Image URL
    // defineField({
    //   name: 'previewImageUrl',
    //   title: 'Preview Image URL',
    //   type: 'string',
    //   description: 'Image displayed in both cart and checkout',
    // }),
  ],
  readOnly: true,
})
