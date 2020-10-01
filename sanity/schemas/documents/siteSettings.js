export const siteSettings = {
  title: 'Site Settings',
  type: 'document',
  name: 'siteSettings',
  fieldsets: [{ name: 'footer', title: 'Footer' }],
  fields: [
    {
      name: 'links',
      fieldset: 'footer',
      title: 'Page Links',
      type: 'array',
      of: [{ type: 'internalLink' }, { type: 'externalLink' }],
    },
    {
      name: 'mailerTitle',
      fieldset: 'footer',
      title: 'Mailing List Title',
      type: 'string',
    },
    {
      name: 'mailerSubtitle',
      fieldset: 'footer',
      title: 'Mailing List Subtitle',
      type: 'string',
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'Default SEO',
    },
  ],

  preview: {
    select: {},
    prepare: () => ({
      title: 'Site Settings',
    }),
  },
}
