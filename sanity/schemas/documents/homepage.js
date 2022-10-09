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
    {
      name: 'headerColor',
      type: 'header_color',
      initialValue: 'dark',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Homepage',
    }),
  },
}
