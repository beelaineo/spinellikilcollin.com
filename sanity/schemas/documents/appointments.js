export const appointmentLocation = {
  type: 'object',
  name: 'appointmentLocation',
  title: 'Appointment Location',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      label: 'Page URL',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    },
    {
      name: 'image',
      type: 'imageTextBlock',
    },
    {
      name: 'body',
      label: 'Content',
      type: 'textBlock',
    },
    {
      name: 'content',
      label: 'Content Blocks',
      type: 'array',
      of: [{type: 'embedBlock'}],
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'appointments',
    },
  },
}

export const upcomingPopups = {
  type: 'object',
  name: 'upcomingPopups',
  title: 'Upcoming Popups',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textBlock',
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'appointments',
    },
  },
}

export const appointments = {
  type: 'document',
  name: 'appointments',
  title: 'Appointments',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textBlock',
    },
    {
      name: 'appointmentLocations',
      title: 'Appointment Locations',
      type: 'array',
      of: [
        {
          type: 'appointmentLocation',
        },
      ],
    },
    {
      name: 'upcomingPopups',
      title: 'Upcoming Popups',
      type: 'upcomingPopups',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
