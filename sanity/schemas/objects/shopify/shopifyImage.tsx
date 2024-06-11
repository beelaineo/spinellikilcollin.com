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
  name: 'shopifyImage',
  title: 'Image',
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
      name: 'src',
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
      src: 'src',
    },
    // @ts-ignore
    prepare({altText, src}) {
      return {
        title: altText,
        subtitle: src,
        media: <UrlImagePreview value={src} />,
      }
    },
  },
})
