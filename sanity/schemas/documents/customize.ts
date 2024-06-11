import {defineField, defineType} from 'sanity'

export const customizeExamples = {
  type: 'object',
  name: 'customizeExamples',
  title: 'Customize Examples',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{type: 'imageTextBlock'}],
    }),
  ],
}

export const experienceBlock = {
  title: 'Experience Block',
  name: 'experienceBlock',
  type: 'object',
  fields: [
    defineField({
      name: 'illustration',
      title: 'Illustration',
      type: 'richImage',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'body',
      media: 'illustration',
    },
  },
}

export const experience = {
  title: 'Experience',
  type: 'object',
  name: 'experience',
  options: {
    collapsible: true,
    collapsed: true,
  },

  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [{type: 'experienceBlock'}],
    }),
  ],
}

export const quizProductType = {
  title: 'Quiz Product Type',
  name: 'quizProductType',
  type: 'object',
  fields: [
    defineField({title: 'Title', name: 'title', type: 'string'}),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'richImage',
    }),
  ],
}

export const quizBlock = {
  title: 'Quiz Block',
  name: 'quizBlock',
  type: 'object',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'richImage',
    }),
  ],
}

export const customize = defineType({
  type: 'document',
  name: 'customize',
  title: 'Customize',
  fieldsets: [
    {
      name: 'quiz',
      title: 'Quiz',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
    {
      name: 'examples',
      title: 'Examples',
      options: {
        collapsible: true,
        collapsed: true,
      },
    },
  ],
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'hero',
      type: 'hero',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Content',
      type: 'richText',
    }),
    defineField({
      name: 'quizBlock',
      title: 'Quiz Block',
      fieldset: 'quiz',
      type: 'quizBlock',
    }),
    defineField({
      name: 'quizProductTypes',
      title: 'Product Types',
      fieldset: 'quiz',
      type: 'array',
      of: [{type: 'quizProductType'}],
    }),
    defineField({
      name: 'quizStyles',
      title: 'Quiz Styles',
      fieldset: 'quiz',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'experience',
      title: 'Experience',
      type: 'experience',
    }),
    defineField({
      name: 'examples',
      title: 'Examples',
      fieldset: 'examples',
      type: 'customizeExamples',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
