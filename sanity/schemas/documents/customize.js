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
      type: 'quizBlock',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
