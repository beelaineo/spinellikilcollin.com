export const Menu = {
  title: 'Navigation Menu',
  name: 'menu',
  type: 'document',
  fields: [
    {
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
    },
    {
      name: 'footerMenuItems',
      title: 'Footer Menu Items',
      type: 'array',
      of: [
        {
          type: 'menuLink',
        },
      ],
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Nav menu',
    }),
  },
}
