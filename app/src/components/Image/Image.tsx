import * as React from 'react'
import { Maybe } from '../../types'
import { ImageType, getImageDetails } from './utils'
import {
  MainImage,
  HoverImage,
  Wrapper,
  Picture,
  RatioImageFill,
} from './styled'

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
  image?: Maybe<ImageType>
  altText?: Maybe<string>
  hoverImage?: Maybe<ImageType>
  ratio?: number
  sizes?: string
  onLoad?: () => void
}

export const ImageWrapper = Wrapper

export const Image = ({
  image,
  sizes: customSizes,
  hoverImage,
  altText: customAltText,
  onLoad,
  ratio,
}: ImageProps) => {
  if (!image) return null
  const sizes = customSizes || '100vw'
  const [loaded, setLoaded] = React.useState(false)
  const imageRef = React.useRef<HTMLImageElement>(null)

  const imageDetails = React.useMemo(() => getImageDetails(image), [image])
  if (!imageDetails) return null
  const { src, altText: cmsAltText, srcSet, srcSetWebp } = imageDetails

  const altText = customAltText || cmsAltText
  const hoverDetails = React.useMemo(
    () => (hoverImage ? getImageDetails(hoverImage) : null),
    [hoverImage],
  )

  React.useEffect(() => {
    if (imageRef.current === null) return
    if (imageRef.current.complete) {
      setLoaded(true)
    }
  }, [imageRef.current])

  React.useEffect(() => {
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
        {srcSetWebp ? (
          <source type="image/webp" srcSet={srcSetWebp} sizes={sizes} />
        ) : null}
        {srcSet ? (
          <source type="image/jpg" srcSet={srcSet} sizes={sizes} />
        ) : null}
        <MainImage
          src={src}
          alt={altText || ''}
          ref={imageRef}
          onLoad={handleOnLoad}
        />
        {hoverDetails && hoverDetails.src ? (
          <HoverImage
            src={hoverDetails.src}
            sizes={sizes}
            srcSet={srcSetWebp || srcSet || undefined}
          />
        ) : null}
      </Picture>
    </Wrapper>
  )
}
