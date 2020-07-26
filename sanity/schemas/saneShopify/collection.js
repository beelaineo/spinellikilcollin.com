export const collection = {
  fields: [
    { name: 'sourceData', hidden: true },
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
