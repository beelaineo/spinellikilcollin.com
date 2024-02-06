import {defineField, defineType} from 'sanity'

export const faqCategory = defineType({
  type: 'object',
  name: 'faqCategory',
  title: 'FAQ Category',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'faqQuestions',
      title: 'FAQ Questions',
      type: 'array',
      of: [
        {
          type: 'faqQuestion',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'faq',
    },
  },
})

export const faqQuestion = defineType({
  type: 'object',
  name: 'faqQuestion',
  title: 'FAQ Question',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'richText',
      validation: (Rule: any) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'faq',
    },
  },
})

export const faq = defineType({
  type: 'document',
  name: 'faq',
  title: 'Faq',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'faqCategories',
      title: 'FAQ Categories',
      type: 'array',
      of: [
        {
          type: 'faqCategory',
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
