export const journalPage = {
  title: 'Journal (Main Page)',
  type: 'document',
  name: 'journalPage',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
