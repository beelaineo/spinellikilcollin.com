import {defineField, defineType} from 'sanity'

export const tagBadge = defineType({
  name: 'tagBadge',
  title: 'Tag Badge',
  type: 'object',
  fields: [
    defineField({
      name: 'tag',
      type: 'string',
      title: 'Tag',
      description: 'The tag to match from Shopify',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      type: 'string',
      title: 'Label',
      description: '(optional) An alternate label to display in the badge',
    }),
  ],
  preview: {
    select: {
      tag: 'tag',
      label: 'label',
    },
    prepare: ({tag, label}) => ({
      title: label || tag,
    }),
  },
})

export const productInfo = defineType({
  title: 'Product Info Accordions',
  type: 'document',
  name: 'productInfoSettings',
  description: 'description',
  fieldsets: [{name: 'accordions', title: 'Accordions'}],
  fields: [
    defineField({
      name: 'helpText',
      type: 'helpText',
      fieldset: 'accordions',
      description:
        "Use these fields to add snippets of descriptions to all or some projects. For instance, you could add a 'Shipping and Returns' accordion on all items, a 'Ring Sizing Guide' accordion to all Rings, and an 'About Black Gold' accordion to any product tagged with 'Black Gold'. These accordions will be displayed in accordion-dropdowns below the main product information. You can also add info accordions to individual items on their page here in the CMS.",
    }),
    defineField({
      name: 'globalInfo',
      title: 'Global Accordions',
      description: 'These accordions will appear on every product',
      type: 'array',
      fieldset: 'accordions',
      of: [{type: 'productInfo'}],
    }),
    defineField({
      name: 'infoByType',
      type: 'array',
      fieldset: 'accordions',
      description: 'These accordions will appear on every product that match the specified type',
      of: [{type: 'productInfoByType'}],
    }),
    defineField({
      name: 'infoByTag',
      type: 'array',
      fieldset: 'accordions',
      description: 'These accordions will appear on every product that match the specified tag',
      of: [{type: 'productInfoByTag'}],
    }),
    defineField({
      name: 'tagBadges',
      type: 'array',
      of: [{type: 'tagBadge'}],
    }),
    defineField({
      name: 'excludeFromStockIndication',
      title: 'Exclude from Ready To Ship Indication',
      description:
        'The selected products will NOT display inventory availability on the website front-end.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
        },
      ],
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Product Info Accordions',
    }),
  },
})
