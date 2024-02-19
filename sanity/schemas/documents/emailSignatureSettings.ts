import {defineField, defineType} from 'sanity'

export const emailSignatureSettings = defineType({
  title: 'Email Signature Settings',
  type: 'document',
  name: 'emailSignatureSettings',
  fields: [
    defineField({
      name: 'wordmark',
      title: 'SK Wordmark',
      type: 'file',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'signatures',
      title: 'Signatures',
      type: 'array',
      of: [{type: 'signature'}],
    }),
  ],

  preview: {
    select: {},
    prepare: () => ({
      title: 'Email Signature Settings',
    }),
  },
})
