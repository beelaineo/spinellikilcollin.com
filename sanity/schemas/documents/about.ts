import {PreviewValue, defineField, defineType} from 'sanity'

export const pageLink = defineType({
  name: 'pageLink',
  title: 'Page Link',
  type: 'object',
  fieldsets: [
    {
      name: 'image',
      title: 'Custom Image',
      options: {
        collapsed: true,
        collapsible: true,
      },
    },
  ],
  fields: [
    defineField({
      name: 'linkedPage',
      type: 'reference',
      to: [
        {type: 'product'},
        {type: 'collection'},
        {type: 'journalPage'},
        {type: 'journalEntry'},
        {type: 'teamPage'},
        {type: 'magazine'},
        {type: 'contact'},
        {type: 'faq'},
        {type: 'customize'},
        {type: 'about'},
        {type: 'page'},
        {type: 'paymentPlans'},
      ],
    }),
    defineField({
      name: 'image',
      type: 'richImage',
      fieldset: 'image',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional. By default the linked page title will be used.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      description: 'Optional. Defaults to "Learn more"',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      image: 'image',
    },
    prepare: ({title, image}) => {
      return {
        title,
        media: image,
      }
    },
  },
})

export const about = defineType({
  type: 'document',
  name: 'about',
  title: 'About (main page)',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
    }),
    defineField({
      name: 'pageLinks',
      type: 'array',
      of: [{type: 'pageLink'}],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'About',
    }),
  },
})
