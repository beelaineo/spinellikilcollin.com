import {defineField, defineType} from 'sanity'

export const appointmentLocation = defineType({
  type: 'object',
  name: 'appointmentLocation',
  title: 'Appointment Location',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'richImage',
    }),
    defineField({
      name: 'slug',
      label: 'Page URL',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'imageTextBlock',
    }),
    defineField({
      name: 'body',
      label: 'Content',
      type: 'textBlock',
    }),
    defineField({
      name: 'content',
      label: 'Content Blocks',
      type: 'array',
      of: [{type: 'embedBlock'}],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'appointments',
    },
  },
})

export const upcomingPopups = defineType({
  type: 'object',
  name: 'upcomingPopups',
  title: 'Upcoming Popups',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      label: 'Description',
      type: 'textBlock',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'appointments',
    },
  },
})

export const appointments = defineType({
  type: 'document',
  name: 'appointments',
  title: 'Appointments',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      label: 'Description',
      type: 'textBlock',
    }),
    defineField({
      name: 'appointmentLocations',
      title: 'Appointment Locations',
      type: 'array',
      of: [
        {
          type: 'appointmentLocation',
        },
      ],
    }),
    defineField({
      name: 'upcomingPopups',
      title: 'Upcoming Popups',
      type: 'upcomingPopups',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
})
