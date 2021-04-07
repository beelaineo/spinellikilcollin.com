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

<<<<<<< HEAD
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
=======
export const customerStory = {
  title: 'Customer Story',
  name: 'customerStory',
  type: 'object',
  fields: [
    { name: 'body', type: 'text', title: 'Quote' },
    { name: 'byLine', type: 'string', title: 'Byline' },
  ],
  preview: {
    select: {
      title: 'byLine',
      subtitle: 'body',
>>>>>>> main
    },
  },
}

<<<<<<< HEAD
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
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [{ type: 'experienceBlock' }],
    },
  ],
=======
export const customerStories = {
  title: 'Customer Stories',
  name: 'customerStories',
  type: 'object',
  fields: [{ name: 'stories', type: 'array', of: [{ type: 'customerStory' }] }],
>>>>>>> main
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
<<<<<<< HEAD
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
=======
    { name: 'quiz', title: 'Quiz' },
    { name: 'stories', title: 'Customer Stories' },
    { name: 'examples', title: 'Examples' },
>>>>>>> main
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
<<<<<<< HEAD
      name: 'experience',
      title: 'Experience',
      type: 'experience',
=======
      name: 'customerStories',
      title: 'Customer Stories',
      fieldset: 'stories',
      type: 'customerStories',
>>>>>>> main
    },
    {
      name: 'examples',
      title: 'Examples',
      fieldset: 'examples',
      type: 'customizeExamples',
    },
<<<<<<< HEAD
=======

>>>>>>> main
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
