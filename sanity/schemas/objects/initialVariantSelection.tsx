// import { ProductVariantSelector } from '../components/ProductVariantSelector'
import {defineField, defineType} from 'sanity'

export const initialVariantSelection = defineType({
  name: 'initialVariantSelection',
  title: 'Initial Variant Selection',
  type: 'object',
  fields: [
    defineField({
      title: 'Collection',
      name: 'selectedCollection',
      type: 'reference',
      description: 'Select a collection to override the default product variant',
      weak: true,
      to: [{type: 'collection'}, {type: 'shopifyCollection'}],
      options: {
        filter: ({document}) => {
          if (!document.collections)
            return {
              filter: '',
              params: {},
            }
          return {
            filter: '_id in $product.collections[]._ref',
            params: {
              product: document,
            },
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'selectedVariant',
      title: 'Variant',
      type: 'string',
      description: 'Enter initial variant Title with exact capitalization and punctuation.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      collectionTitle: 'selectedCollection.store.title',
      oldCollectionTitle: 'selectedCollection.title',
      selectedVariant: 'selectedVariant',
      previewImage: 'selectedCollection.store.imageUrl',
      oldPreviewImage: 'selectedCollection.sourceData.image.w100',
    },
    // @ts-ignore
    prepare({collectionTitle, oldCollectionTitle, selectedVariant, previewImage, oldPreviewImage}) {
      const src = previewImage
        ? previewImage + '&width=100'
        : oldPreviewImage
        ? oldPreviewImage
        : undefined
      return {
        title: `${collectionTitle || oldCollectionTitle}`,
        subtitle: `${selectedVariant}`,
        // eslint-disable-next-line @next/next/no-img-element
        media: src ? <img alt={'thumb'} src={src} /> : undefined,
      }
    },
  },
})
