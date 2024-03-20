import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuSettings',
  title: 'Menu',
  type: 'object',
  options: {
    collapsed: false,
    collapsible: true,
  },
  fields: [
    // Links
    defineField({
      name: 'links',
      title: 'Links',
      type: 'menuLinks',
    }),
  ],
})
