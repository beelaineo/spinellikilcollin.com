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
      title: 'Header/Nav Color',
      name: 'header_color',
      description:
        'Text color for the header/nav overlay above first block on homepage.',
      type: 'string',
      options: {
        list: [
          { title: 'Dark (Default)', value: 'dark' },
          { title: 'Light', value: 'light' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  initialValue: {
    header_color: 'dark',
  },
  preview: {
    select: {},
    prepare: () => ({
      title: 'Homepage',
    }),
  },
}
