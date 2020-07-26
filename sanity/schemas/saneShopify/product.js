export const productOptionValue = {
  fields: [
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      description:
        'An alternate description to display when this variant is selected',
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
    {
      title: 'Swatch',
      name: 'swatch',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'value',
      media: 'swatch',
    },
  },
}

export const product = {
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
      title: 'Gallery',
      name: 'gallery',
      type: 'array',
      of: [{ type: 'richImage' }],
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
    {
      name: 'variants',
      hidden: true,
    },
    {
      name: 'seo',
      type: 'seo',
      description:
        'Custom SEO settings. By default, the product description and image will be used.',
    },
  ],
}
