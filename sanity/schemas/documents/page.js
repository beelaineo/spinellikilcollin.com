export const page = {
  title: 'Page',
  type: 'document',
  name: 'page',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'hideTitle',
      label: 'Hide Title',
      type: 'boolean',
    },
    {
      name: 'hero',
      type: 'hero',
    },
    {
      name: 'content',
      label: 'Content Blocks',
      type: 'array',
      of: [{ type: 'carousel' }, { type: 'imageTextBlock' }],
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      title: 'Full Width',
      description:
        'When on, padding above and below the content blocks will be removed',
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'string',
    },
    {
      name: 'slug',
      label: 'Page URL',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      label: 'Content',
      type: 'richText',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
