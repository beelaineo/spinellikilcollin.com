export const tagBadge = {
  name: 'tagBadge',
  title: 'Tag Badge',
  type: 'object',
  fields: [
    {
      name: 'tag',
      type: 'string',
      title: 'Tag',
      description: 'The tag to match from Shopify',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'label',
      type: 'string',
      title: 'Label',
      description: '(optional) An alternate label to display in the badge',
    },
  ],
  preview: {
    select: {
      tag: 'tag',
      label: 'label',
    },
    prepare: ({ tag, label }) => ({
      title: label || tag,
    }),
  },
}

export const productInfo = {
  title: 'Product Info Accordions',
  type: 'document',
  name: 'productInfoSettings',
  description: 'description',
  fieldsets: [{ name: 'accordions', title: 'Accordions' }],
  fields: [
    {
      name: 'helpText',
      type: 'helpText',
      fieldset: 'accordions',
      description:
        "Use these fields to add snippets of descriptions to all or some projects. For instance, you could add a 'Shipping and Returns' accordion on all items, a 'Ring Sizing Guide' accordion to all Rings, and an 'About Black Gold' accordion to any product tagged with 'Black Gold'. These accordions will be displayed in accordion-dropdowns below the main product information. You can also add info accordions to individual items on their page here in the CMS.",
    },
    {
      name: 'globalInfo',
      label: 'Global Accordions',
      description: 'These accordions will appear on every product',
      type: 'array',
      fieldset: 'accordions',
      of: [{ type: 'productInfo' }],
    },
    {
      name: 'infoByType',
      type: 'array',
      fieldset: 'accordions',
      description:
        'These accordions will appear on every product that match the specified type',
      of: [{ type: 'productInfoByType' }],
    },
    {
      name: 'infoByTag',
      type: 'array',
      fieldset: 'accordions',
      description:
        'These accordions will appear on every product that match the specified tag',
      of: [{ type: 'productInfoByTag' }],
    },
    {
      name: 'tagBadges',
      type: 'array',
      of: [{ type: 'tagBadge' }],
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Product Info Accordions',
    }),
  },
}
