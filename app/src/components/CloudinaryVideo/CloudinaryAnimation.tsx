import * as React from 'react'
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

const fallbackSizes = [720, 1200, 1600, 1920]

interface VideoElementProps {
  video: CloudinaryVideoType
  poster: string
  playing: boolean | undefined
  onPlay: () => void
}

const NormalVideo = ({ playing, poster, video, onPlay }: VideoElementProps) => {
  const { width: viewportWidth } = useViewportSize()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    const startAutoplayPromise = videoRef.current.play()
    if (startAutoplayPromise !== undefined) {
      startAutoplayPromise
        .then(() => {
          console.log('playing')
        })
        .catch((error) => {
          if (error.name === 'NotAllowedError') {
            console.log('Auto playback not allowed, need user permission')
          } else {
            // Handle a load or playback error
          }
        })
    }
  }, [videoRef.current])

  const bestSize =
    fallbackSizes.find((fs) => fs > viewportWidth) ?? fallbackSizes[2]
  const src = `https://res.cloudinary.com/spinelli-kilcollin/video/upload/c_scale,w_${bestSize}/${video.videoId}.mp4`

  return (
    <video
      ref={videoRef}
      onPlay={onPlay}
      poster={poster}
      loop
      autoPlay
      muted
      playsInline
      src={src}
    />
  )
}

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
  const [isPlaying, setIsPlaying] = useState<boolean | undefined>(undefined)

  const { videoId } = video

  const { width: viewportWidth } = useViewportSize()

  const handleOnPlay = () => {
    setPlaying(true)
    setIsPlaying(true)
  }

  const poster =
    viewportWidth > 1200
      ? (image?.w1600 as string)
      : viewportWidth > 1000
      ? (image?.w1200 as string)
      : (image?.w800 as string)

  return screen === 'desktop' ? (
    <DesktopWrapper>
      <RatioPadding canvasFill={false} ratio={1} />
      {/* <AdvancedVideo
        cldVid={cldVid}
        loop
        playsInline
        muted
        onPlay={handlePlay}
        innerRef={videoEl}
        autoPlay={true}
      /> */}
      <NormalVideo
        video={video}
        playing={isPlaying}
        onPlay={handleOnPlay}
        poster={poster}
      />
    </DesktopWrapper>
  ) : screen === 'mobile' ? (
    <MobileWrapper>
      <RatioPadding canvasFill={false} ratio={1} />
      <NormalVideo
        video={video}
        playing={isPlaying}
        onPlay={handleOnPlay}
        poster={poster}
      />
    </MobileWrapper>
  ) : (
    <AnimationWrapper>
      <NormalVideo
        video={video}
        playing={isPlaying}
        onPlay={handleOnPlay}
        poster={poster}
      />
    </AnimationWrapper>
  )
}
