export const teamMember = {
  type: 'object',
  name: 'teamMember',
  title: 'Team Member',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'email',
    },
    {
      name: 'headshot',
      title: 'Headshot',
      type: 'richImage',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'headshot',
    },
  },
}

export const teamPage = {
  type: 'document',
  title: 'Team Page',
  name: 'teamPage',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [{ type: 'teamMember' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
