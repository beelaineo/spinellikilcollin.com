export const faqCategory = {
  type: 'object',
  name: 'faqCategory',
  title: 'FAQ Category',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'faqQuestions',
      title: 'FAQ Questions',
      type: 'array',
      of: [
        {
          type: 'faqQuestion',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'faq',
    },
  },
}

export const faqQuestion = {
  type: 'object',
  name: 'faqQuestion',
  title: 'FAQ Question',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'richText',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'faq',
    },
  },
}

export const faq = {
  type: 'document',
  name: 'faq',
  title: 'Faq',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'faqCategories',
      title: 'FAQ Categories',
      type: 'array',
      of: [
        {
          type: 'faqCategory',
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
