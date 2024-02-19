import {defineField, defineType} from 'sanity'

export const paymentProvider = defineType({
  title: 'Payment Provider',
  name: 'paymentProvider',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'richText',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'richImage',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'body',
      media: 'logo',
    },
  },
})

export const paymentPlans = defineType({
  type: 'document',
  name: 'paymentPlans',
  title: 'Payment Plans',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'richText',
    }),
    defineField({
      name: 'providers',
      title: 'Providers',
      type: 'array',
      of: [{type: 'paymentProvider'}],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
