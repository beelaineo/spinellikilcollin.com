export const bambuserSettings = {
  name: 'bambuserSettings',
  title: 'Bambuser Settings',
  type: 'object',
  fields: [
    {
      name: 'slug',
      title: 'Bambuser Slug',
      description: 'The slug of the Bambuser video to launch',
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
