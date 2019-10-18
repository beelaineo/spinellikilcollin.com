export const productInfo = {
  title: 'Product Info Accordion',
  type: 'object',
  name: 'productInfo',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },

    {
      name: 'body',
      label: 'Text',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    },
  ],
}

const tagRegex = /^[\w\s-]+$/

export const productInfoByType = {
  title: 'Product Information (by type)',
  type: 'object',
  name: 'productInfoByType',
  fields: [
    {
      title: 'Type',
      name: 'type',
      description: 'Type to match from Shopify.',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const passes = tagRegex.test(value)
          if (passes) return true
          return 'Product Types may only contain letters, numbers, and spaces'
        }),
    },
    {
      title: 'Accordions',
      name: 'info',
      type: 'array',
      of: [{ type: 'productInfo' }],
    },
  ],
}

export const productInfoByTag = {
  title: 'Product Information (by tag)',
  type: 'object',
  name: 'productInfoByTag',
  fields: [
    {
      title: 'Tag',
      name: 'tag',
      description: 'Tag to match from Shopify.',
      type: 'string',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          const passes = tagRegex.test(value)
          if (passes) return true
          return 'Product Tags may only contain letters, numbers, and spaces'
        }),
    },
    {
      title: 'Accordions',
      name: 'info',
      type: 'array',
      of: [{ type: 'productInfo' }],
    },
  ],
}
