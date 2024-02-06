import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  type: 'object',
  name: 'teamMember',
  title: 'Team Member',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'richImage',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'headshot',
    },
  },
})

export const teamPage = defineType({
  type: 'document',
  title: 'Team Page',
  name: 'teamPage',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [{type: 'teamMember'}],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
