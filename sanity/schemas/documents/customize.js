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

export const customerStory = {
  title: 'Customer Story',
  name: 'customerStory',
  type: 'object',
  fields: [
    { name: 'body', type: 'text', title: 'Quote' },
    { name: 'byLine', type: 'string', title: 'Byline' },
  ],
}

export const customerStories = {
  title: 'Customer Stories',
  name: 'customerStories',
  type: 'object',
  fields: [{ name: 'stories', type: 'array', of: [{ type: 'customerStory' }] }],
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
    { name: 'quiz', title: 'Quiz' },
    { name: 'stories', title: 'Customer Stories' },
    { name: 'examples', title: 'Examples' },
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
      name: 'customerStories',
      title: 'Customer Stories',
      fieldset: 'stories',
      type: 'customerStories',
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
