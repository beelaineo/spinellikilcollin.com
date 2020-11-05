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
  fieldsets: [{ name: 'quiz', title: 'Quiz' }],
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
      type: 'array',
      of: [{ type: 'quizProductType' }],
    },
    {
      name: 'quizStyles',
      title: 'Quiz Styles',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
