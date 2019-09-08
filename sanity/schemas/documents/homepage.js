export const homepage = {
  title: 'Homepage',
  type: 'document',
  name: 'homepage',
  fields: [
    {
      name: 'content',
      label: 'Content',
      type: 'array',
      of: [{ type: 'hero' }, { type: 'carousel' }, { type: 'imageTextBlock' }],
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Homepage',
    }),
  },
}
