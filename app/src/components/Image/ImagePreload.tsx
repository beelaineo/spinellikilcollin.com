import * as React from 'react'
import Head from 'next/head'
import { ImageType, getImageDetails } from './utils'

const { useMemo } = React

interface ImagePreloadProps {
  sizes?: string
  image: ImageType
}

export const ImagePreload = ({ sizes, image }: ImagePreloadProps) => {
  const imageDetails = useMemo(() => getImageDetails(image), [image])

  const { src, srcSet, srcSetWebp } = imageDetails || {}

  const imageSrcSet = [srcSet, srcSetWebp].filter(Boolean).join(', ')

  if (!src) return null
  return (
    <Head>
      <link
        rel="preload"
        as="image"
        href={src}
        // @ts-ignore
        imageSizes={sizes}
        // @ts-ignore
        imageSrcSet={imageSrcSet}
      />
    </Head>
  )
}
