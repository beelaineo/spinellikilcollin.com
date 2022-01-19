import * as React from 'react'
import { CloudinaryVideo as CloudinaryVideoType } from '../../types'
import { AudioButton, PlaybackButton } from './Controls'
import { AnimationWrapper, DesktopWrapper, MobileWrapper } from './styled'
import { useViewportSize } from '../../utils'
import { RatioImageFill } from '../Image/styled'

const { useRef, useEffect, useState } = React
const BASE_URL = 'https://res.cloudinary.com/spinelli-kilcollin/video/upload'

const fallbackSizes = [720, 1200, 1600, 1920]

interface VideoElementProps {
  video: CloudinaryVideoType
  muted: boolean
  poster: string
  playing: boolean | undefined
  onPlay: () => void
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

const NormalVideo = ({
  playing,
  poster,
  muted,
  video,
  onPlay,
}: VideoElementProps) => {
  const { width: viewportWidth } = useViewportSize()

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return
    const paused = videoRef.current.paused
    if (paused && playing === true) videoRef.current.play()
    if (!paused && playing === false) videoRef.current.pause()
  }, [videoRef.current, playing])

  const bestSize =
    fallbackSizes.find((fs) => fs > viewportWidth) ?? fallbackSizes[3]
  const src = `https://res.cloudinary.com/spinelli-kilcollin/video/upload/c_scale,w_${bestSize}/${video.videoId}.mp4`

  return (
    <video
      ref={videoRef}
      onPlay={onPlay}
      poster={poster}
      autoPlay
      muted={muted}
      loop
      playsInline
      src={src}
      style={{ height: '100%' }}
    />
  )
}

interface CloudinaryVideoProps {
  video: CloudinaryVideoType
  enableAudio?: boolean
  screen?: 'desktop' | 'mobile'
}

export const CloudinaryAnimation = ({
  video,
  screen,
}: CloudinaryVideoProps) => {
  if (!video?.videoId) return null
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState<boolean | undefined>(undefined)
  const { enableAudio, videoId } = video

  const { width: viewportWidth } = useViewportSize()
  const bestSize =
    fallbackSizes.find((fs) => fs > viewportWidth) ?? fallbackSizes[3]

  const poster = `${BASE_URL}/c_scale,w_${bestSize}/q_100/${videoId}`

  const toggleAudio = () => setMuted(!muted)
  const togglePlaying = () => setPlaying(!playing)

  const handleOnPlay = () => {
    setPlaying(true)
  }
  return screen === 'desktop' ? (
    <DesktopWrapper>
      <RatioPadding canvasFill={false} ratio={1} />
      <NormalVideo
        video={video}
        playing={playing}
        onPlay={handleOnPlay}
        poster={poster}
        muted={muted}
      />
      {enableAudio ? <AudioButton muted={muted} onClick={toggleAudio} /> : null}
      {<PlaybackButton playing={playing} onClick={togglePlaying} />}
    </DesktopWrapper>
  ) : screen === 'mobile' ? (
    <MobileWrapper>
      <RatioPadding canvasFill={false} ratio={1} />
      <NormalVideo
        video={video}
        playing={playing}
        onPlay={handleOnPlay}
        poster={poster}
        muted={muted}
      />
      {enableAudio ? <AudioButton muted={muted} onClick={toggleAudio} /> : null}
      {<PlaybackButton playing={playing} onClick={togglePlaying} />}
    </MobileWrapper>
  ) : (
    <AnimationWrapper>
      <NormalVideo
        video={video}
        playing={playing}
        onPlay={handleOnPlay}
        poster={poster}
        muted={muted}
      />
    </AnimationWrapper>
  )
}
