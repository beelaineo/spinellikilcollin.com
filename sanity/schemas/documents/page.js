export const page = {
  title: 'Page',
  type: 'document',
  name: 'page',
  fieldsets: [
    {
      name: 'integrations',
      title: 'Integrations',
      options: { collapsed: true, collapsible: true },
    },
  ],
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'string',
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
      of: [
        { type: 'carousel' },
        { type: 'imageTextBlock' },
        { type: 'textBlock' },
        { type: 'embedBlock' },
      ],
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      title: 'Full Width',
      description:
        'When on, padding above and below the content blocks will be removed',
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
