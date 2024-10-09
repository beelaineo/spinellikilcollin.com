import * as React from 'react'
import { Maybe } from '../../types'
import {
  ImageType,
  getAspectRatio,
  getImageDetails,
  getImageKey,
  getImageLQIP,
} from './utils'

import { Heading } from '../Text'
import {
  MainImage,
  BlurImage,
  ShadowImage,
  HoverImage,
  Wrapper,
  Picture,
  RatioImageFill,
  PreloadWrapper,
} from './styled'
import { useInViewport } from '../../hooks'

/**
 * A placeholder box to enforce image size
 */

interface RatioPaddingProps {
  ratio: number
  canvasFill?: boolean
  backgroundColor?: string
}

const RatioPadding = ({
  ratio,
  canvasFill,
  backgroundColor: customBGColor,
}: RatioPaddingProps) => {
  const [src, setSrc] = React.useState<string | void>(undefined)

  const backgroundColor = customBGColor || 'transparent'

  React.useEffect(() => {
    if (!canvasFill) return
    const canvas = window.document.createElement('canvas')
    canvas.setAttribute('width', '1600')
    canvas.setAttribute('height', `${1600 * ratio}`)
    const ctx = canvas.getContext('2d')

    if (!ctx) return
    ctx.beginPath()
    ctx.rect(0, 0, 1600, 1600 * ratio)
    ctx.fillStyle = backgroundColor || 'rgba(220, 220, 220, 0)'
    ctx.fill()
    const srcData = canvas.toDataURL('image/png')
    setSrc(srcData)
  }, [ratio, canvasFill, backgroundColor])

  const paddingBottom = src ? 0 : `${ratio * 100}%`
  return (
    <RatioImageFill style={{ paddingBottom, backgroundColor }}>
      {src ? (
        <picture>
          <img src={src} role="none" />
        </picture>
      ) : null}
    </RatioImageFill>
  )
}

interface ImageProps {
  image?: Maybe<ImageType> | void
  altText?: Maybe<string>
  hoverImage?: Maybe<ImageType>
  ratio?: number
  loading?: 'eager' | 'lazy' | undefined
  placeholder?: 'shadow' | undefined
  richImage?: boolean
  draggable?: boolean

  /**
   * The css/html sizes at which this image is expected to appear,
   * from mobile to desktop. The final value will be used without a breakpoint.
   *
   * Examples:
   *
   * ['100vw', '80vw', '500px'] =>
   *   '(max-width: 650px) 100vw, (max-width: 900px) 80vw, 500px'
   *
   * ['100vw', '80vw'] =>
   *   '(max-width: 650px) 100vw, 80vw'
   *
   * ['80vw'] =>
   *   '80vw'
   */
  sizes?: string
  onLoad?: () => void
  preloadImages?: ImageType[]
  preload?: boolean
  objectFit?: string

  /**
   * Set to `true` if you want to use HTML canvas
   * to render the placeholder. This is only necessary when
   * the default usage of a container with padding-bottom
   * produces undesired reuslts.
   */
  canvasFill?: boolean
  /**
   * An optional color to use as the background of the image container.
   * This is only visible before the image loads.
   * Defaults to 'transparent'
   */
  backgroundColor?: string
}

export const ImageWrapper = Wrapper

export const Image = ({
  image,
  sizes: customSizes,
  hoverImage,
  altText: customAltText,
  onLoad,
  preload,
  ratio: customRatio,
  canvasFill,
  preloadImages,
  loading,
  objectFit,
  placeholder,
  richImage,
  draggable = true,
}: ImageProps) => {
  const sizes = customSizes || '100vw'
  const [loaded, setLoaded] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const imageRef = React.useRef<HTMLImageElement>(null)
  const { isInViewOnce } = useInViewport(containerRef)

  const imageDetails = React.useMemo(() => getImageDetails(image), [image])

  const lqip = getImageLQIP(image)

  const {
    caption,
    src,
    altText: cmsAltText,
    srcSet,
    srcSetWebp,
  } = imageDetails || {}

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

  const ratio = customRatio || getAspectRatio(image)

  return (
    <Wrapper ref={containerRef}>
      {ratio ? <RatioPadding canvasFill={canvasFill} ratio={ratio} /> : null}
      {src && (preload || isInViewOnce) ? (
        <Picture objectFit={objectFit} loaded={loaded} richImage={richImage}>
          {lqip ? (
            <BlurImage src={lqip} />
          ) : placeholder === 'shadow' ? (
            <ShadowImage />
          ) : null}
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
            loading={loading || 'lazy'}
            draggable={draggable}
          />
          {hoverDetails && hoverDetails.src ? (
            <HoverImage
              src={hoverDetails.src}
              sizes={sizes}
              srcSet={srcSetWebp || srcSet || undefined}
            />
          ) : null}
          {caption ? (
            <Heading my={0} mt="7px" level={5}>
              {caption}
            </Heading>
          ) : null}
        </Picture>
      ) : null}
      {isInViewOnce && preloadImages && preloadImages.length ? (
        <PreloadWrapper>
          {preloadImages.map((p) => (
            <Image
              key={getImageKey(p)}
              image={p}
              onLoad={handleOnLoad}
              sizes={sizes}
              preload
            />
          ))}
        </PreloadWrapper>
      ) : null}
    </Wrapper>
  )
}
