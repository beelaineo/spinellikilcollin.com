export const customizeExamples = {
  type: 'object',
  name: 'customizeExamples',
  title: 'Customize Examples',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Links',
      name: 'links',
      type: 'array',
      of: [{ type: 'imageTextBlock' }],
    },
  ],
}

export const experienceBlock = {
  title: 'Experience Block',
  name: 'experienceBlock',
  type: 'object',
  fields: [
    {
      name: 'illustration',
      title: 'Illustration',
      type: 'richImage',
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
    },
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
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'text',
    },
    {
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [{ type: 'experienceBlock' }],
    },
  ],
}

export const quizProductType = {
  title: 'Quiz Product Type',
  name: 'quizProductType',
  type: 'object',
  fields: [
    { title: 'Title', name: 'title', type: 'string' },
    {
      title: 'Image',
      name: 'image',
      type: 'richImage',
    },
  ],
}

export const quizBlock = {
  title: 'Quiz Block',
  name: 'quizBlock',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'richImage',
    },
  ],
}

export const customize = {
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
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'hero',
      type: 'hero',
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'string',
    },
    {
      name: 'body',
      label: 'Content',
      type: 'richText',
    },
    {
      name: 'quizBlock',
      title: 'Quiz Block',
      fieldset: 'quiz',
      type: 'quizBlock',
    },
    {
      name: 'quizProductTypes',
      title: 'Product Types',
      fieldset: 'quiz',
      type: 'array',
      of: [{ type: 'quizProductType' }],
    },
    {
      name: 'quizStyles',
      title: 'Quiz Styles',
      fieldset: 'quiz',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'experience',
      title: 'Experience',
      type: 'experience',
    },
    {
      name: 'examples',
      title: 'Examples',
      fieldset: 'examples',
      type: 'customizeExamples',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
