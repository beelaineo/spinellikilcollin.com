export const carousel = {
  name: 'carousel',
  title: 'Carousel',
  type: 'object',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
    },
    {
      name: 'collection',
      label: 'Collection',
      type: 'pageLink',
      description:
        'Create a carousel from a collection. If a collection is used, items linked to below will not be used.',
    },
    {
      name: 'items',
      label: 'Carousel Items',
      type: 'array',
      of: [{ type: 'pageLink' }],
    },
  ],
}
