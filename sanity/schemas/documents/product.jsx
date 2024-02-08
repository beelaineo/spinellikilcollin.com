import {TagIcon} from '@sanity/icons'
import pluralize from 'pluralize-esm'
import ShopifyIcon from '../../components/icons/Shopify'
import ProductHiddenInput from '../../components/inputs/ProductHidden'
import ShopifyDocumentStatus from '../../components/media/ShopifyDocumentStatus'
import {defineField, defineType} from 'sanity'
import {getPriceRange} from '../../utils/getPriceRange'

const GROUPS = [
  {
    name: 'editorial',
    title: 'Editorial',
    default: true,
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
]

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: TagIcon,
  groups: GROUPS,
  fields: [
    // The ProductHiddenInput is hiding all product info, temporarily disabling it here
    // defineField({
    //   name: 'hidden',
    //   type: 'string',
    //   components: {
    //     field: ProductHiddenInput,
    //   },
    //   group: GROUPS.map((group) => group.name),
    //   hidden: ({ parent }) => {
    //     const isActive = parent?.store?.status === 'active'
    //     const isDeleted = parent?.store?.isDeleted
    //     return !parent?.store || (isActive && !isDeleted)
    //   },
    // }),
    defineField({
      name: 'shopifyId',
      title: 'ShopifyId',
      type: 'string',
      options: {field: 'shopifyId'},
      readOnly: true,
      hidden: true,
    }),
    // Title (proxy)
    defineField({
      name: 'titleProxy',
      title: 'Title',
      type: 'proxyString',
      options: {field: 'title'},
    }),
    // Handle (proxy)
    defineField({
      name: 'handleProxy',
      title: 'Handle',
      type: 'proxyString',
      options: {field: 'handle'},
    }),
    // Title
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    // Handle
    defineField({
      name: 'handle',
      title: 'Handle',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'collections',
      title: 'Collections',
      description: 'Synced from Shopify',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'collection'}], weak: true}],
      group: 'shopifySync',
      readOnly: true,
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      of: [{type: 'productOption'}],
      group: 'editorial',
    }),
    defineField({
      name: 'archived',
      title: 'Archived?',
      type: 'boolean',
      readOnly: true,
      group: 'editorial',
    }),
    defineField({
      name: 'hideFromCollections',
      title: 'Hide from Collections',
      description:
        'Toggle this to ON to hide this product from collection pages. The product will still be viewable at its URL',
      type: 'boolean',
      group: 'editorial',
    }),
    defineField({
      title: 'Show in Collections',
      name: 'showInCollections',
      type: 'array',
      of: [
        {
          type: 'reference',
          description: 'Always show product in specified collections.',
          weak: true,
          to: [{type: 'collection'}],
        },
      ],
      group: 'editorial',
    }),
    defineField({
      title: 'Initial Variant (by Collection)',
      name: 'initialVariantSelections',
      type: 'array',
      description: "Choose initial variant to show based on the product's parent collection.",
      of: [{type: 'initialVariantSelection'}],
      group: 'editorial',
    }),
    defineField({
      title: 'Hide from Search',
      name: 'hideFromSearch',
      type: 'boolean',
      description:
        'Toggle this to ON to hide this product from search results. The product will still be viewable at its URL',
      group: 'editorial',
    }),
    defineField({
      title: 'Inquiry Only',
      name: 'inquiryOnly',
      type: 'boolean',
      description:
        'Toggle this to ON to hide a product\'s price and show an inquiry button instead of "Add to Cart"',
      group: 'editorial',
    }),
    defineField({
      title: 'Accordions',
      name: 'info',
      type: 'array',
      of: [
        {
          type: 'productInfo',
        },
      ],
      group: 'editorial',
    }),
    defineField({
      title: 'Content Blocks',
      name: 'contentAfter',
      description:
        'These blocks will appear below the product header, and above the Related Items carousel.',
      type: 'array',
      of: [{type: 'imageTextBlock'}],
      group: 'editorial',
    }),
    defineField({
      title: 'Related Products Carousels',
      description: 'The title will default to "Related Products" if left empty.',
      name: 'related',
      type: 'carousel',
      group: 'editorial',
    }),
    defineField({
      name: 'store',
      title: 'Shopify',
      type: 'shopifyProductDef',
      description: 'Product data from Shopify (read-only)',
      group: 'shopifySync',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo.shopify',
      group: 'seo',
    }),
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
    {
      name: 'priceDesc',
      title: 'Price (Highest first)',
      by: [{field: 'store.priceRange.minVariantPrice', direction: 'desc'}],
    },
    {
      name: 'priceAsc',
      title: 'Price (Lowest first)',
      by: [{field: 'store.priceRange.minVariantPrice', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      options: 'store.options',
      previewImageUrl: 'store.previewImageUrl',
      priceRange: 'store.priceRange',
      status: 'store.status',
      title: 'store.title',
      variants: 'store.variants',
    },
    prepare(selection) {
      const {isDeleted, options, previewImageUrl, priceRange, status, title, variants} = selection

      const optionCount = options?.length
      const variantCount = variants?.length

      let description = [
        variantCount ? pluralize('variant', variantCount, true) : 'No variants',
        optionCount ? pluralize('option', optionCount, true) : 'No options',
      ]

      let subtitle = getPriceRange(priceRange)
      if (status !== 'active') {
        subtitle = '(Unavailable in Shopify)'
      }
      if (isDeleted) {
        subtitle = '(Deleted from Shopify)'
      }

      return {
        description: description.join(' / '),
        subtitle,
        title,
        media: (
          <ShopifyDocumentStatus
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type="product"
            url={previewImageUrl}
            title={title}
          />
        ),
      }
    },
  },
})
