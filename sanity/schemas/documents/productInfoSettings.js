export const productInfo = {
  title: 'Product Info Accordions',
  type: 'document',
  name: 'productInfoSettings',
  description: 'description',
  fields: [
    {
      name: 'helpText',
      type: 'helpText',
      description:
        "Use these fields to add snippets of descriptions to all or some projects. For instance, you could add a 'Shipping and Returns' accordion on all items, a 'Ring Sizing Guide' accordion to all Rings, and an 'About Black Gold' accordion to any product tagged with 'Black Gold'. These accordions will be displayed in accordion-dropdowns below the main product information. You can also add info accordions to individual items on their page here in the CMS.",
    },
    {
      name: 'globalInfo',
      label: 'Global Accordions',
      description: 'These accordions will appear on every product',
      type: 'array',
      of: [{ type: 'productInfo' }],
    },
    {
      name: 'infoByType',
      type: 'array',
      description:
        'These accordions will appear on every product that match the specified type',
      of: [{ type: 'productInfoByType' }],
    },
    {
      name: 'infoByTag',
      type: 'array',
      description:
        'These accordions will appear on every product that match the specified tag',
      of: [{ type: 'productInfoByTag' }],
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Product Info Accordions',
    }),
  },
}
