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
      name: 'headshot',
      title: 'headshot',
      type: 'richImage',
      validation: (Rule) => Rule.required(),
    },
  ],
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
  ],
}
