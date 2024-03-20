export const collectionBlock = {
  name: 'collectionBlock',
  title: 'Collection Block',
  type: 'object',
  fields: [
    {
      name: 'position',
      title: 'Position',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'format',
      title: 'Format',
      type: 'string',
      options: {
        layout: 'radio',
        direction: 'horizontal',
        list: [
          {
            value: 'square',
            title: 'Square',
          },
          {value: 'wide', title: 'Wide'},
          {value: 'tall', title: 'Tall'},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Text',
      type: 'richText',
    },
    {
      name: 'body_mobile',
      title: 'Text (Mobile)',
      description: 'Text substitute shown on mobile devices (optional)',
      type: 'richText',
    },
    {
      name: 'textPosition',
      title: 'Text position',
      type: 'position',
    },
    {
      name: 'textColor',
      title: 'Text color',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Custom', value: 'custom'},
        ],
      },
    },
    {
      name: 'cloudinaryVideo',
      title: 'Cloudinary Video',
      type: 'cloudinaryVideo',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'richImage',
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Light', value: 'light'},
          {title: 'Dark', value: 'dark'},
          {title: 'Custom', value: 'custom'},
        ],
      },
    },
  ],
  preview: {
    select: {
      position: 'position',
      format: 'format',
      backgroundImage: 'backgroundImage',
    },
    prepare: ({position, backgroundImage, format}) => {
      return {
        title: `${position} - ${format}`,
        media: backgroundImage ? backgroundImage.asset : undefined,
      }
    },
  },
}
