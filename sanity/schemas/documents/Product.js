import { createProductDocument } from '@sane-shopify/sanity-plugin'

export const Product = createProductDocument({
  fields: [
    {
      title: 'Accordions',
      name: 'info',
      type: 'array',
      description:
        'Info accordions will appear below the product description. You can also add content accordions to multiple items in the "Product Info" section of the CMS.',
      of: [{ type: 'productInfo' }],
    },
    {
      title: 'Content Blocks',
      name: 'contentAfter',
      description:
        'These blocks will appear below the product header & gallery, and above the Related Items carousel.',
      type: 'array',
      of: [{ type: 'imageTextBlock' }],
    },
    {
      title: 'Related Products Carousels',
      description:
        'The title will default to "Related Products" if left empty.',
      name: 'related',
      type: 'carousel',
    },
  ],
})
