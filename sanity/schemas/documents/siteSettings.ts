import {defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  title: 'Site Settings',
  type: 'document',
  name: 'siteSettings',
  fieldsets: [
    {name: 'info', title: 'Site Info'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({
      name: 'phone',
      fieldset: 'info',
      title: 'Business Phone Number',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((phone) => {
          if (typeof phone === 'undefined') {
            return true
          }
          const regex = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
          if (regex.test(phone)) {
            return true
          } else {
            return 'Not a valid phone number'
          }
        }),
    }),
    defineField({
      name: 'links',
      fieldset: 'footer',
      title: 'Page Links',
      type: 'array',
      of: [{type: 'internalLink'}, {type: 'externalLink'}],
    }),
    defineField({
      name: 'mailerTitle',
      fieldset: 'footer',
      title: 'Mailing List Title',
      type: 'string',
    }),
    defineField({
      name: 'mailerSubtitle',
      fieldset: 'footer',
      title: 'Mailing List Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      title: 'Default SEO',
    }),
  ],

  preview: {
    select: {},
    prepare: () => ({
      title: 'Site Settings',
    }),
  },
})
