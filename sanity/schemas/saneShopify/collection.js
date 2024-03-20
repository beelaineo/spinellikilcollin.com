export const shopifyCollection = {
  name: 'shopifyCollection',
  type: 'document',
  title: 'Shopify Collection (old)',
  fieldsets: [
    {
      name: 'integrations',
      title: 'Integrations',
      options: {
        collapsed: true,
        collapsible: true,
      },
    },
  ],
  fields: [
    // {name: 'sourceData', hidden: true, type: 'shopifySync'},
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      readOnly: true,
    },
    {
      title: 'Handle',
      name: 'handle',
      type: 'string',
      readOnly: true,
    },
    {
      title: 'Products',
      name: 'products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'shopifyProduct'}]}],
      readOnly: true,
    },
    {
      title: 'Archived?',
      name: 'archived',
      type: 'boolean',
      readOnly: true,
    },
    {
      title: 'Shopify ID',
      name: 'shopifyId',
      type: 'string',
      readOnly: true,
    },
    {
      title: 'Shopify source data',
      name: 'sourceData',
      type: 'shopifySourceCollection',
      hidden: true,
    },
    {
      title: 'Hidden',
      name: 'hidden',
      type: 'boolean',
      description:
        'Toggle this to ON to hide this collection. The product will still be viewable at its URL',
    },

    {
      name: 'reduceColumnCount',
      type: 'boolean',
      title: 'Reduce Column Count',
      description: 'Changes the layout to 2 columns on desktop, 1 column on tablet',
    },

    {
      title: 'Product Listing Text Color',
      name: 'lightTheme',
      type: 'boolean',
      description:
        'Toggle this to ON to change text color to white for all products in collection.',
    },

    {name: 'hero', type: 'hero'},
    {
      name: 'collectionBlocks',
      type: 'array',
      of: [{type: 'collectionBlock'}],
    },
    {
      name: 'description',
      title: 'Collection Description',
      description: 'SEO-friendly text for the collection footer',
      type: 'richText',
    },
    {
      name: 'preferredVariantMatches',
      type: 'array',
      title: 'Preferred Variant',
      of: [{type: 'string'}],
      description:
        'Add values here to auto-select a preferred variant option when viewing this collection. The first variant that has an option containing one of these values will be used. E.g., "BG" or "Black Gold"',
    },
    {
      title: 'Hide Filters',
      name: 'hideFilter',
      type: 'boolean',
      description: 'Toggle this to ON to remove all filters from the collection view.',
    },
    {
      title: 'Minimal Filter Display',
      name: 'minimalDisplay',
      type: 'boolean',
      description: 'Toggle this to ON to hide filter label, reset button, and sort tools.',
    },
    {
      title: 'Override Default Filters',
      name: 'overrideDefaultFilter',
      type: 'boolean',
      description: 'Toggle this to ON to only display the custom filters you add below.',
    },
    {
      name: 'customFilter',
      type: 'array',
      of: [
        {type: 'filter'},
        {type: 'filterSet'},
        {type: 'priceRangeMinMaxFilter'},
        {type: 'inStockFilter'},
      ],
    },
    {name: 'bambuser', type: 'bambuserSettings', fieldset: 'integrations', hidden: true},
    {
      name: 'footer',
      title: 'Footer Blocks',
      type: 'array',
      of: [{type: 'carousel'}, {type: 'imageTextBlock'}, {type: 'textBlock'}],
    },
    {
      name: 'seo',
      type: 'seo',
      description:
        'Custom SEO settings. By default, the collection description and image will be used.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sourceData.handle',
      media: 'sourceData.image',
    },
  },
}
