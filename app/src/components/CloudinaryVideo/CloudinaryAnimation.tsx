import * as React from 'react'
import { AdvancedVideo } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import {
  CloudinaryVideo as CloudinaryVideoType,
  ShopifySourceImage,
} from '../../types'
import { AudioButton, PlaybackButton } from './Controls'
import { AnimationWrapper, DesktopWrapper, MobileWrapper } from './styled'
import { useViewportSize } from '../../utils'
import { RatioImageFill } from '../Image/styled'
import { FaCommentsDollar } from 'react-icons/fa'

const { useRef, useEffect, useState } = React
const BASE_URL = 'https://res.cloudinary.com/spinelli-kilcollin/video/upload'

const cld = new Cloudinary({
  cloud: {
    cloudName: 'spinelli-kilcollin',
  },
})

const fallbackSizes = [720, 1200, 1600, 1920]

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
    <RatioImageFill style={{ paddingBottom, backgroundColor }} aria-hidden>
      {src ? <img src={src} /> : null}
    </RatioImageFill>
  )
}

interface CloudinaryVideoProps {
  video: CloudinaryVideoType
  image?: ShopifySourceImage
  screen?: 'desktop' | 'mobile'
  setPlaying: (playing: boolean) => void
}

export const CloudinaryAnimation = ({
  video,
  image,
  screen,
  setPlaying,
}: CloudinaryVideoProps) => {
  if (!video?.videoId) return null
  const videoEl = useRef<HTMLVideoElement>(null)
  const [videoStatus, setVideoStatus] = useState<string>('')

  const { videoId } = video

  const { width: viewportWidth } = useViewportSize()
  const bestSize =
    fallbackSizes.find((fs) => fs > viewportWidth) ?? fallbackSizes[3]

  const cldVid = cld.video(videoId).resize(scale().width(bestSize))

  const handlePlay = () => {
    setPlaying(true)
    console.log('playing')
  }

  const poster =
    viewportWidth > 1200
      ? (image?.w1600 as string)
      : viewportWidth > 1000
      ? (image?.w1200 as string)
      : (image?.w800 as string)

  useEffect(() => {
    if (!videoEl) return
    if (!videoEl.current) return
    console.log('videoEl:', videoEl)

    const promise = videoEl.current.play()

    if (promise !== undefined) {
      promise
        .then((_) => {
          console.log('Autoplay started')
          setVideoStatus('autoplay started')
        })
        .catch((error) => {
          console.log('Autoplay not allowed', error)
          setVideoStatus('autoplay not allowed')
        })
    }
  }, [])

  return screen === 'desktop' ? (
    <DesktopWrapper>
      <RatioPadding canvasFill={false} ratio={1} />
      <AdvancedVideo
        cldVid={cldVid}
        loop
        playsInline
        muted
        onPlay={handlePlay}
        innerRef={videoEl}
        autoPlay={true}
        preload={'auto'}
      />
    </DesktopWrapper>
  ) : screen === 'mobile' ? (
    <MobileWrapper>
      <RatioPadding canvasFill={false} ratio={1} />
      <AdvancedVideo
        cldVid={cldVid}
        loop
        playsInline
        muted
        onPlay={handlePlay}
        innerRef={videoEl}
        autoPlay={true}
        preload={'auto'}
      />
    </MobileWrapper>
  ) : (
    <AnimationWrapper>
      <AdvancedVideo
        cldVid={cldVid}
        loop
        playsInline
        muted
        onPlay={handlePlay}
        innerRef={videoEl}
        autoPlay={true}
        preload={'auto'}
      />
    </AnimationWrapper>
  )
}
