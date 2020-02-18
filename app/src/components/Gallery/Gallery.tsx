import * as React from 'react'
import { Image as SanityImage, ShopifySourceImage } from '../../types'
import { Image } from '../Image'
import { GalleryWrapper, MainImageWrapper, Thumbnails } from './styled'

const { useState, useEffect } = React

type GalleryImage = SanityImage | ShopifySourceImage

type ImageWithId = GalleryImage & { imageId: string }

interface GalleryProps {
  images: GalleryImage[]
  currentImageId: string
}

export const Gallery = ({ images, currentImageId }: GalleryProps) => {
  const parsedImages: ImageWithId[] = images.map((image) => ({
    // @ts-ignore
    imageId: image.id || image._key,
    ...image,
  }))

  /* Utils */
  const getImageById = (imageId: string): GalleryImage | undefined =>
    parsedImages.find((i) => i.imageId === imageId)

  /* State */
  const [currentImage, setCurrentImage] = useState<GalleryImage | void>(
    getImageById(currentImageId) || images[0],
  )

  /* Update the current image if a new prop is passed in */
  useEffect(() => {
    if (currentImageId) setCurrentImage(getImageById(currentImageId))
  }, [currentImageId])

  /* Handlers */
  const changeImage = (imageId: string) => () =>
    setCurrentImage(getImageById(imageId))

  return (
    <GalleryWrapper>
      <MainImageWrapper data-testid="current-image">
        <Image ratio={1} image={currentImage} />
      </MainImageWrapper>
      {parsedImages.length > 1 && (
        <Thumbnails data-testid="thumbnails">
          {parsedImages.map((image) => (
            <button key={image.imageId} onClick={changeImage(image.imageId)}>
              <Image ratio={1} image={image} />
            </button>
          ))}
        </Thumbnails>
      )}
    </GalleryWrapper>
  )
}
