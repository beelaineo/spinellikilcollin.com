import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'menuLinks',
  title: 'menuLinks',
  type: 'array',
  of: [
    {
      name: 'collectionGroup',
      title: 'Collection group',
      type: 'collectionGroup',
    },
    {type: 'linkInternal'},
    {type: 'linkExternal'},
  ],
})
