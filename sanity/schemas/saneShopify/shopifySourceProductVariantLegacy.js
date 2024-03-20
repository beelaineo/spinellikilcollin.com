export const shopifySourceProductVariantLegacy = {
  title: 'Shopify Product Data',
  name: 'shopifySourceProductVariantLegacy',
  readOnly: true,
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {title: 'title', name: 'title', type: 'string'},
    {name: 'availableForSale', title: 'Available for Sale', type: 'boolean'},
    {
      name: 'currentlyNotInStock',
      title: 'Currently not in stock',
      type: 'boolean',
    },
    {name: 'id', title: 'ID', type: 'string'},
    // TODO: this will return as NULL from shopify if it does not exist.
    //       The sync plugin needs to figure out how to deal with this.
    {
      title: 'Shopify Source Image',
      name: 'image',
      type: 'shopifySourceImage',
    },
    {title: 'Price', name: 'priceV2', type: 'shopifyMoneyV2'},
    {
      title: 'Compare At Price',
      name: 'compareAtPriceV2',
      type: 'shopifyMoneyV2',
    },
    {
      title: 'Selected Options',
      name: 'selectedOptions',
      type: 'array',
      of: [{type: 'shopifySourceSelectedOption'}],
    },
    {title: 'Requires Shipping', name: 'requiresShipping', type: 'boolean'},
    {title: 'SKU', name: 'sku', type: 'string'},
    {title: 'Weight', name: 'weight', type: 'number'},
    {title: 'Weight Unit', name: 'weightUnit', type: 'string'},
  ],
  preview: {
    select: {title: 'title'},
  },
}
