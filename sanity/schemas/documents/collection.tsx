import React from 'react'
import {defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons'
import {getExtension} from '@sanity/asset-utils'
import pluralize from 'pluralize-esm'
import CollectionHiddenInput from '../../components/inputs/CollectionHidden'
import ShopifyIcon from '../../components/icons/Shopify'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'

export const collection = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: PackageIcon,
  groups: [
    {
      name: 'theme',
      title: 'Theme',
    },
    {
      default: true,
      name: 'editorial',
      title: 'Editorial',
    },
    {
      name: 'shopifySync',
      title: 'Shopify sync',
      icon: ShopifyIcon,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // Product hidden status
    // defineField({
    //   name: 'hidden',
    //   type: 'string',
    //   components: {
    //     field: CollectionHiddenInput,
    //   },
    //   hidden: ({parent}) => {
    //     const isDeleted = parent?.store?.isDeleted
    //     return !isDeleted
    //   },
    // }),
    // Title (proxy)
    defineField({
      name: 'titleProxy',
      title: 'Title',
      type: 'proxyString',
      options: {field: 'store.title'},
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
    }),
    // Slug (proxy)
    defineField({
      name: 'slugProxy',
      title: 'Slug',
      type: 'proxyString',
      options: {field: 'store.slug.current'},
    }),
    defineField({
      name: 'archived',
      title: 'Archived?',
      type: 'boolean',
      readOnly: true,
    }),
    defineField({
      name: 'shopifyId',
      title: 'Shopify ID',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'handle',
      title: 'Handle',
      hidden: true,
      type: 'string',
    }),
    defineField({
      name: 'products',
      title: 'Products',
      description: 'Synced from Shopify',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'product'}],
          weak: true,
        },
      ],
      readOnly: true,
      group: 'editorial',
    }),
    defineField({
      title: 'Hidden',
      name: 'hidden',
      type: 'boolean',
      description:
        'Toggle this to ON to hide this collection. The product will still be viewable at its URL',
      group: 'editorial',
    }),
    defineField({
      name: 'reduceColumnCount',
      type: 'boolean',
      title: 'Reduce Column Count',
      description: 'Changes the layout to 2 columns on desktop, 1 column on tablet',
      group: 'editorial',
    }),
    defineField({
      title: 'Product Listing Text Color',
      name: 'lightTheme',
      type: 'boolean',
      description:
        'Toggle this to ON to change text color to white for all products in collection.',
      group: 'editorial',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'hero',
      group: 'editorial',
    }),
    defineField({
      name: 'collectionBlocks',
      type: 'array',
      of: [{type: 'collectionBlock'}],
      group: 'editorial',
    }),
    defineField({
      name: 'description',
      title: 'Collection Description',
      description: 'SEO-friendly text for the collection footer',
      type: 'richText',
      group: 'editorial',
    }),
    defineField({
      name: 'preferredVariantMatches',
      type: 'array',
      title: 'Preferred Variant',
      of: [{type: 'string'}],
      description:
        'Add values here to auto-select a preferred variant option when viewing this collection. The first variant that has an option containing one of these values will be used. E.g., "BG" or "Black Gold"',
      group: 'editorial',
    }),
    defineField({
      title: 'High Value Collection Template',
      name: 'highValueTemplate',
      type: 'boolean',
      description: 'Toggle this to ON to change collection layout.',
      group: 'editorial',
    }),
    defineField({
      title: 'Hide Filters',
      name: 'hideFilter',
      type: 'boolean',
      description: 'Toggle this to ON to remove all filters from the collection view.',
      group: 'editorial',
    }),
    defineField({
      title: 'Minimal Filter Display',
      name: 'minimalDisplay',
      type: 'boolean',
      description: 'Toggle this to ON to hide filter label, reset button, and sort tools.',
      group: 'editorial',
    }),
    defineField({
      title: 'Override Default Filters',
      name: 'overrideDefaultFilter',
      type: 'boolean',
      description: 'Toggle this to ON to only display the custom filters you add below.',
      group: 'editorial',
    }),
    defineField({
      name: 'customFilter',
      group: 'editorial',
      type: 'array',
      of: [
        {type: 'filter'},
        {type: 'filterSet'},
        {type: 'priceRangeMinMaxFilter'},
        {type: 'inStockFilter'},
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer Blocks',
      type: 'array',
      of: [{type: 'carousel'}, {type: 'imageTextBlock'}, {type: 'textBlock'}],
      group: 'editorial',
    }),
    // Shopify collection
    defineField({
      name: 'store',
      title: 'Shopify',
      type: 'shopifyCollectionDef',
      description: 'Collection data from Shopify (read-only)',
      group: 'shopifySync',
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      description:
        'Custom SEO settings. By default, the collection description and image will be used.',
      group: 'seo',
    }),
    // // SEO
    // defineField({
    //   name: 'seo',
    //   title: 'SEO',
    //   type: 'shopifySeo',
    //   group: 'seo',
    // }),
  ],
  orderings: [
    {
      name: 'titleAsc',
      title: 'Title (A-Z)',
      by: [{field: 'store.title', direction: 'asc'}],
    },
    {
      name: 'titleDesc',
      title: 'Title (Z-A)',
      by: [{field: 'store.title', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      imageUrl: 'store.imageUrl',
      isDeleted: 'store.isDeleted',
      rules: 'store.rules',
      title: 'store.title',
    },
    // @ts-ignore
    prepare(selection) {
      const {imageUrl, isDeleted, rules, title} = selection
      const ruleCount = rules?.length || 0

      return {
        media: (
          <ShopifyDocumentStatus
            isDeleted={isDeleted}
            type="collection"
            url={imageUrl}
            title={title}
          />
        ),
        subtitle: ruleCount > 0 ? `Automated (${pluralize('rule', ruleCount, true)})` : 'Manual',
        title,
      }
    },
  },
})
