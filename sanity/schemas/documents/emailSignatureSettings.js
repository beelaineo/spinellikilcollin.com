export const emailSignatureSettings = {
  title: 'Email Signature Settings',
  type: 'document',
  name: 'emailSignatureSettings',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'wordmark',
      title: 'SK Wordmark',
      type: 'file',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'signatures',
      title: 'Signatures',
      type: 'array',
      of: [{ type: 'signature' }],
    },
  ],

  preview: {
    select: {},
    prepare: () => ({
      title: 'Email Signature Settings',
    }),
  },
}
