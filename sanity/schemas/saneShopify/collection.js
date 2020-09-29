export const collection = {
  fields: [
    { name: 'sourceData', hidden: true },
    {
      title: 'Hidden',
      name: 'hidden',
      type: 'boolean',
      description:
        'Toggle this to ON to hide this collection. The product will still be viewable at its URL',
    },

    {
      name: 'reduceColumnCount',
      type: 'boolean',
      title: 'Reduce Column Count',
      description:
        'Changes the layout to 2 columns on desktop, 1 column on tablet',
    },

    { name: 'hero', type: 'hero' },
    {
      name: 'collectionBlocks',
      type: 'array',
      of: [{ type: 'collectionBlock' }],
    },
    {
      name: 'preferredVariantMatches',
      type: 'array',
      title: 'Preferred Variant',
      of: [{ type: 'string' }],
      description:
        'Add values here to auto-select a preferred variant option when viewing this collection. The first variant that has an option containing one of these values will be used. E.g., "BG" or "Black Gold"',
    },
    { name: 'customFilter', type: 'productFilter' },
    {
      name: 'seo',
      type: 'seo',
      description:
        'Custom SEO settings. By default, the collection description and image will be used.',
    },
  ],
}
