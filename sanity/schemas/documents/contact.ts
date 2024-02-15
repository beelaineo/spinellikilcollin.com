import {defineField, defineType} from 'sanity'

export const contactLine = defineType({
  type: 'object',
  name: 'contactLine',
  title: 'Contact Line',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contact',
      title: 'Contact Email or Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Line type',
      type: 'string',
      options: {
        list: ['Order', 'Wholesale', 'Press', 'Engagement', 'Telephone'],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'contact',
    },
  },
})

export const contact = defineType({
  type: 'document',
  name: 'contact',
  title: 'Contact',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'contactLines',
      title: 'Contact Lines',
      type: 'array',
      of: [
        {
          type: 'contactLine',
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
