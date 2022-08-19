export const stone = {
  title: 'Stone',
  type: 'document',
  description: 'Diamond certification information',
  name: 'stone',
  fields: [
    {
      name: 'gia_number',
      label: 'GIA Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gia_link',
      label: 'GIA Link',
      type: 'url',
    },
    {
      name: 'carat',
      label: 'Carat size',
      type: 'string',
    },
    {
      name: 'cut',
      label: 'Cut style',
      type: 'string',
    },
    {
      name: 'color',
      label: 'Color',
      type: 'string',
    },
    {
      name: 'precision',
      label: 'Cut Precision',
      type: 'string',
    },
    {
      name: 'clarity',
      label: 'Clarity',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'gia_number',
      carat: 'carat',
    },
    prepare: ({ title, carat }) => {
      return {
        title: title,
        subtitle: carat,
      }
    },
  },
}
