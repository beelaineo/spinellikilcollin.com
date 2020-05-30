export const collection = {
  fields: [
    { name: 'sourceData', hidden: true },
    { name: 'hero', type: 'hero' },
    {
      name: 'collectionBlocks',
      type: 'array',
      of: [{ type: 'collectionBlock' }],
    },
    { name: 'customFilter', type: 'productFilter' },
  ],
}
