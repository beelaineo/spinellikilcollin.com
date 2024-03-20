import {ThLargeIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'module.grid',
  title: 'Grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    // Items
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'gridItem',
        },
      ],
    }),
  ],
  preview: {
    select: {
      items: 'items',
      url: 'url',
    },
    prepare(selection) {
      const {items} = selection
      return {
        subtitle: 'Grid',
        title: items?.length > 0 ? pluralize('item', items.length, true) : 'No items',
      }
    },
  },
})
