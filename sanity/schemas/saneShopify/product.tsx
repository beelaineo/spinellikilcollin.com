export const shopifyProductOption = defineType({
  title: 'Product option (old)',
  name: 'shopifyProductOption',
  type: 'object',
  // icon: SunIcon,
  fields: [
    // Name
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      readOnly: true,
    }),
    // Values
    {
      title: 'Values',
      name: 'values',
      type: 'array',
      of: [{type: 'productOptionValue'}],
    },
  ],
  preview: {
    select: {
      name: 'name',
    },
    prepare(selection) {
      const {name} = selection

      return {
        title: name,
      }
    },
  },
})

export const productOptionValue = {
  type: 'object',
  name: 'productOptionValue',
  title: 'Product Option Value (old)',
  fields: [
    {
      title: 'Description',
      name: 'description',
      type: 'array',
      description: 'An alternate description to display when this variant is selected',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
      ],
    },
    {
      title: 'Swatch',
      name: 'swatch',
      type: 'image',
    },
    {
      title: 'Hover Image',
      name: 'hover_image',
      type: 'image',
    },
    {
      title: 'Variant Animation',
      description: 'Cloudinary Video ID (looping render)',
      name: 'animation',
      type: 'string',
    },
    {
      title: 'Stone',
      name: 'stone',
      type: 'reference',
      description: 'If Karat swatch, link to associated stone.',
      weak: true,
      to: [{type: 'stone'}],
    },
  ],
  preview: {
    select: {
      title: 'value',
      media: 'swatch',
    },
  },
}
import {defineField, defineType} from 'sanity'

export const shopifyProduct = defineType({
  name: 'shopifyProduct',
  type: 'document',
  title: 'Shopify Product (old)',
  fields: [
    defineField({
      title: 'Title',
      name: 'title',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      title: 'Handle',
      name: 'handle',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      title: 'Collections',
      name: 'collections',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'shopifyCollection'}]}],
      readOnly: true,
    }),
    defineField({
      title: 'Product Options',
      name: 'options',
      type: 'array',
      of: [{type: 'shopifyProductOption'}],
      readOnly: true,
    }),
    defineField({
      title: 'Shopify ID',
      name: 'shopifyId',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      title: 'Shopify source data',
      name: 'sourceData',
      type: 'object',
      hidden: true,
      fields: [
        {name: 'id', type: 'string', hidden: true},
        {name: 'title', type: 'string', hidden: true},
        {name: 'image', type: 'richImage', hidden: true},
      ],
    }),
    defineField({
      title: 'Archived?',
      name: 'archived',
      type: 'boolean',
      readOnly: true,
    }),
    defineField({
      title: 'Hidden (deprecated)',
      name: 'hidden',
      type: 'boolean',
      description:
        'DEPRECATED: This has been split up into "Hide from Collections" and "Hide from Search"',
    }),
    defineField({
      title: 'Hide from Collections',
      name: 'hideFromCollections',
      type: 'boolean',
      description:
        'Toggle this to ON to hide this product from collection pages. The product will still be viewable at its URL',
    }),
    defineField({
      title: 'Show in Collection',
      name: 'showInCollection',
      type: 'reference',
      description: 'Always show product in specified collection.',
      weak: true,
      to: [{type: 'shopifyCollection'}, {type: 'collection'}],
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
          to: [{type: 'shopifyCollection'}, {type: 'collection'}],
        },
      ],
    }),
    defineField({
      title: 'Initial Variant (by Collection)',
      name: 'initialVariantSelections',
      type: 'array',
      description: "Choose initial variant to show based on the product's parent collection.",
      of: [{type: 'initialVariantSelection'}],
    }),
    defineField({
      title: 'Hide from Search',
      name: 'hideFromSearch',
      type: 'boolean',
      description:
        'Toggle this to ON to hide this product from search results. The product will still be viewable at its URL',
    }),
    defineField({
      title: 'Inquiry Only',
      name: 'inquiryOnly',
      type: 'boolean',
      description:
        'Toggle this to ON to hide a product\'s price and show an inquiry button instead of "Add to Cart"',
    }),
    defineField({
      title: 'Accordions',
      name: 'info',
      type: 'array',
      description:
        'Info accordions will appear below the product description. You can also add content accordions to multiple items in the "Product Info" section of the CMS.',
      of: [{type: 'productInfo'}],
    }),
    defineField({
      title: 'Gallery',
      name: 'gallery',
      type: 'array',
      of: [{type: 'richImage'}],
    }),
    defineField({
      title: 'Content Blocks',
      name: 'contentAfter',
      description:
        'These blocks will appear below the product header & gallery, and above the Related Items carousel.',
      type: 'array',
      of: [{type: 'imageTextBlock'}],
    }),
    defineField({
      title: 'Related Products Carousels',
      description: 'The title will default to "Related Products" if left empty.',
      name: 'related',
      type: 'carousel',
    }),
    defineField({
      name: 'variants',
      hidden: true,
      type: 'array',
      of: [{type: 'productVariant'}],
    }),
    defineField({
      name: 'seo',
      type: 'seo',
      description:
        'Custom SEO settings. By default, the product description and image will be used.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sourceData.handle',
      thumb: 'sourceData.images.edges.0.node.w100',
    },
    // @ts-ignore
    prepare({title, subtitle, thumb}) {
      return {
        title,
        subtitle,
        media: thumb ? <img alt="thumbnail" src={thumb} /> : undefined,
      }
    },
  },
})
