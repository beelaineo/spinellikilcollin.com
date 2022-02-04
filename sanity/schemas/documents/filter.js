export const FilterMenu = {
  title: 'Filter',
  name: 'filterMenu',
  type: 'document',
  fields: [
    {
      name: 'filterTypeOptions',
      title: 'Type',
      type: 'array',
      of: [
        {
          type: 'filterTypeOption',
        },
      ],
    },
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Filter',
    }),
  },
}
