import * as React from 'react'
import styled, { css } from 'styled-components'
import {
  ShopifySourceImage,
  Image as SanityImage,
  RichImage,
} from '../../types'
import { Wrapper, Picture, RatioImageFill } from './styled'

export const ImageWrapper = styled.img`
  ${({ theme }) => css`
    display: block;
  `}
`

interface ImageDetails {
  src: string | null | void
  altText?: string | null
  // fileType: string
  // TODO srcSet
  // TODO srcSetWebP
  // TODO dimensions: Dimensions
  // TODO fileType: fileType
}

/* Based on the image type, return a src, srcset, altText, etc */
const getImageDetails = (
  image: ShopifySourceImage | SanityImage | RichImage,
): ImageDetails => {
  switch (image.__typename) {
    case 'RichImage':
      return {
        src: image?.asset?.url,
        altText: image.altText,
      }
    case 'ShopifySourceImage':
      return { src: image.originalSrc, altText: image.altText }
    case 'Image':
      return {
        src: image?.asset?.url,
        // TODO get alt text if present
      }
    default:
      // @ts-ignore
      throw new Error(`Image type "${image.__typename}" is not supported`)
  }
}

/**
 * A placeholder box to enforce image size
 */

interface RatioPaddingProps {
  ratio: number
}

const RatioPadding = ({ ratio }: RatioPaddingProps) => {
  const [src, setSrc] = React.useState<string | void>(undefined)

  React.useEffect(() => {
    const canvas = window.document.createElement('canvas')
    canvas.setAttribute('width', '1600')
    canvas.setAttribute('height', `${1600 * ratio}`)
    const ctx = canvas.getContext('2d')

    if (!ctx) return
    ctx.beginPath()
    ctx.rect(0, 0, 1600, 1600 * ratio)
    ctx.fillStyle = 'rgba(220, 220, 220, 0)'
    ctx.fill()
    const srcData = canvas.toDataURL('image/png')
    setSrc(srcData)
  }, [ratio])

  return src ? <RatioImageFill src={src} /> : null
}

interface ImageProps {
  image?: null | ShopifySourceImage | SanityImage | RichImage | void
  ratio?: number
  // TODO sizes?: string
  onLoad?: () => void
}

export const Image = ({ image, onLoad, ratio }: ImageProps) => {
  if (!image) return null
  const [loaded, setLoaded] = React.useState(false)
  const imageRef = React.useRef<HTMLImageElement>(null)

  const { src, altText } = React.useMemo(() => getImageDetails(image), [image])

  React.useEffect(() => {
    if (imageRef.current === null) return
    if (imageRef.current.complete) {
      setLoaded(true)
    }
  }, [imageRef.current])

  React.useLayoutEffect(() => {
    if (!onLoad) return
    const timeoutId = setTimeout(onLoad, 800)
    return () => clearTimeout(timeoutId)
  }, [loaded])

  const handleOnLoad = () => {
    setLoaded(true)
  }

  if (!src) return null

  return (
    <Wrapper>
      {ratio ? <RatioPadding ratio={ratio} /> : null}
      <Picture loaded={loaded}>
        {/* <source type="image/webp" srcSet={srcSetWebp} sizes={sizes} /> */}
        {/* <source type={imageType} srcSet={srcSet} sizes={sizes} /> */}
        <img
          src={src}
          alt={altText || ''}
          ref={imageRef}
          onLoad={handleOnLoad}
        />
      </Picture>
    </Wrapper>
  )
}
