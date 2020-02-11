import * as React from 'react'
import { Image as SanityImage, ShopifySourceImage } from '../../types'
import { Image } from '../Image'
import {
  GalleryWrapper,
  MainImageWrapper,
  ZoomImageWrapper,
  ZoomInner,
  Thumbnails,
} from './styled'

const { useState, useEffect, useRef } = React

type GalleryImage = SanityImage | ShopifySourceImage

type ImageWithId = GalleryImage & { imageId: string }

interface GalleryProps {
  images: GalleryImage[]
  currentImageId: string
}

const ZOOM_AMOUNT = 2

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
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [imageCoordinates, setImageCoordinates] = useState({
    top: '0%',
    left: '0%',
  })

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

  const watchZoom = (e) => {
    if (!wrapperRef.current) return
    const {
      top,
      left,
      width,
      height,
    } = wrapperRef.current.getBoundingClientRect()
    const { clientX, clientY } = e
    const xAmount = (clientX - left) / width
    const yAmount = (clientY - top) / height
    const imageLeft = `-${100 * (ZOOM_AMOUNT - 1) * xAmount}%`
    const imageTop = `-${100 * (ZOOM_AMOUNT - 1) * yAmount}%`

    setImageCoordinates({
      left: imageLeft,
      top: imageTop,
    })
  }

  return (
    <GalleryWrapper>
      <MainImageWrapper ref={wrapperRef} data-testid="current-image">
        <Image ratio={1} image={currentImage} />
        <ZoomImageWrapper onMouseMove={watchZoom}>
          <ZoomInner zoomAmount={ZOOM_AMOUNT} style={imageCoordinates}>
            <Image ratio={1} image={currentImage} />
          </ZoomInner>
        </ZoomImageWrapper>
      </MainImageWrapper>
      {parsedImages.length > 1 && (
        <Thumbnails data-testid="thumbnails">
          {parsedImages.map((image, i) => (
            <button key={image.imageId} onClick={changeImage(image.imageId)}>
              <Image ratio={1} image={image} />
            </button>
          ))}
        </Thumbnails>
      )}
    </GalleryWrapper>
  )
}
