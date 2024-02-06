import {defineField, defineType} from 'sanity'

export const Menu = defineType({
  title: 'Navigation Menu',
  name: 'menu',
  type: 'document',
  fields: [
    defineField({
      name: 'menuItems',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'menuLink',
        },
        {
          type: 'subMenu',
          name: 'subMenu',
        },
      ],
    }),
    defineField({
      name: 'footerMenuItems',
      title: 'Footer Menu Items',
      type: 'array',
      of: [
        {
          type: 'menuLink',
        },
      ],
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Nav menu',
    }),
  },
})
