export const paymentProvider = {
  title: 'Payment Provider',
  name: 'paymentProvider',
  type: 'object',
  fields: [
    {
      name: 'name',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'richText',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'richImage',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'body',
      media: 'logo',
    },
  },
}

export const paymentPlans = {
  type: 'document',
  name: 'paymentPlans',
  title: 'Payment Plans',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'body',
      label: 'Content',
      type: 'richText',
    },
    {
      name: 'providers',
      title: 'Providers',
      type: 'array',
      of: [{ type: 'paymentProvider' }],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
