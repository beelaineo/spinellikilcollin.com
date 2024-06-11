import {defineField, defineType} from 'sanity'

// Custom component to handle external URLs
const UrlImagePreview = ({value}: {value?: string}) => {
  if (value && value.startsWith('http')) {
    // Check if it's a URL
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={value} alt="Preview" style={{width: '100%'}} />
  }
  return <span>No preview available</span> // Fallback text
}

export default defineType({
  name: 'shopifyVariantImage',
  title: 'Variant Image',
  type: 'object',
  fields: [
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'id',
      title: 'ID',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      altText: 'altText',
      url: 'url',
    },
    // @ts-ignore
    prepare({altText, url}) {
      return {
        title: altText,
        subtitle: url,
        media: <UrlImagePreview value={url} />,
      }
    },
  },
})
