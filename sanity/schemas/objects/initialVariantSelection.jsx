// import { ProductVariantSelector } from '../components/ProductVariantSelector'
import {defineField, defineType} from 'sanity'

export const initialVariantSelection = defineType({
  name: 'initialVariantSelection',
  title: 'Initial Variant Selection',
  type: 'object',
  fields: [
    {
      title: 'Collection',
      name: 'selectedCollection',
      type: 'reference',
      description: 'Select a collection to override the default product variant',
      weak: true,
      to: [{type: 'collection'}],
      options: {
        filter: ({document}) => {
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
      description: 'Enter initial variant Title with exact capitalization and punctuation.',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      collectionTitle: 'selectedCollection.store.title',
      selectedVariant: 'selectedVariant',
      previewImage: 'selectedCollection.store.imageUrl',
    },
    prepare: ({collectionTitle, selectedVariant, previewImage}) => {
      return {
        title: `${collectionTitle}`,
        subtitle: `${selectedVariant}`,
        // eslint-disable-next-line @next/next/no-img-element
        media: <img alt={collectionTitle} src={previewImage + '&width=100'} />,
      }
    },
  },
})
