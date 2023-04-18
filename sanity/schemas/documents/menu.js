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
        {
          type: 'menuLinkExternal',
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
        {
          type: 'menuLinkExternal',
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
