export const newCustomer = {
  type: 'document',
  name: 'newCustomer',
  title: 'New Customer',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'richImage',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
}
