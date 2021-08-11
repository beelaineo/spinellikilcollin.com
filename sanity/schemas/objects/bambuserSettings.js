export const bambuserSettings = {
  name: 'bambuserSettings',
  title: 'Bambuser Settings',
  type: 'object',
  fields: [
    {
      name: 'slug',
      title: 'Bambuser show ID',
      description: 'The ID of the Bambuser video to launch',
      type: 'string',
    },
    {
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: '(Has no effect within the context of a CTA)',
    },
  ],
}
