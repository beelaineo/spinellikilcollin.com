export const iframe = {
  type: 'object',
  name: 'iframe',
  title: 'Iframe Embed',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      description: 'Paste the embed code here',
      rows: 6,
      validation: (Rule) => Rule.required(),
    },
  ],
}
