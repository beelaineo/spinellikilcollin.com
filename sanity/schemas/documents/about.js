export const pageLink = {
  name: 'pageLink',
  title: 'Page Link',
  type: 'object',
  fields: [
    {
      name: 'linkedPage',
      type: 'reference',
      to: [
        { type: 'page' },
        { type: 'magazine' },
        { type: 'teamPage' },
        { type: 'customize' },
      ],
    },
    {
      name: 'image',
      type: 'richImage',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional. By default the linked page title will be used.',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'Optional. Defaults to "Learn more"',
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
    prepare: ({ title, image }) => {
      return {
        title,
        media: image,
      }
    },
  },
}

export const about = {
  type: 'document',
  name: 'about',
  title: 'About (main page)',
  fields: [
    {
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
    },
    {
      name: 'pageLinks',
      type: 'array',
      of: [{ type: 'pageLink' }],
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'About',
    }),
  },
}
