// import { ProductVariantSelector } from '../components/ProductVariantSelector'

export const initialVariantSelection = {
  name: 'initialVariantSelection',
  title: 'Initial Variant Selection',
  type: 'object',
  fields: [
    {
      title: 'Collection',
      name: 'selectedCollection',
      type: 'reference',
      description:
        'Select a collection to override the default product variant',
      weak: true,
      to: [{ type: 'shopifyCollection' }],
      options: {
        filter: ({ document }) => {
          if (!document.collections) return
          return {
            filter: '_id in $product.collections[]._ref',
            params: {
              product: document,
            },
          }
        },
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'selectedVariant',
      title: 'Variant',
      type: 'string',
      description:
        'Enter initial variant Title with exact capitalization and punctuation.',
      // inputComponent: ProductVariantSelector,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      collectionTitle: 'selectedCollection.title',
      selectedVariant: 'selectedVariant',
    },
    prepare: ({ collectionTitle, selectedVariant }) => {
      return {
        title: `${collectionTitle}`,
        subtitle: `${selectedVariant}`,
      }
    },
  },
}
