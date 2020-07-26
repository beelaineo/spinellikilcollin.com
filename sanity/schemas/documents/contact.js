export const contactLine = {
  type: 'object',
  name: 'contactLine',
  title: 'Contact Line',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'contact',
      title: 'Contact Email or Phone',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'contact',
    },
  },
}

export const contact = {
  type: 'document',
  name: 'contact',
  title: 'Contact',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'contactLines',
      title: 'Contact Lines',
      type: 'array',
      of: [
        {
          type: 'contactLine',
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
