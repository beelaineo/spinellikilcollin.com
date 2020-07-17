import * as React from 'react'
import Hls from 'hls.js'
import { CloudinaryVideo as CloudinaryVideoType } from '../../types'
import { AudioButton } from './AudioButton'
import { VideoWrapper } from './styled'
import { useViewportSize } from '../../utils'

const { useRef, useEffect, useState } = React
const BASE_URL = 'https://res.cloudinary.com/spinelli-kilcollin/video/upload'

interface CloudinaryVideoProps {
  video: CloudinaryVideoType
  enableAudio?: boolean
}

const hlsConfig = {
  capLevelToPlayerSize: true,
  startLevel: 0,
}

const fallbackSizes = [720, 1200, 1600]

export const CloudinaryVideo = ({ video }: CloudinaryVideoProps) => {
  if (!video?.videoId) return null
  const [ready, setReady] = useState(false)
  const { width: viewportWidth } = useViewportSize()
  const [fallbackSrc, setFallbackSrc] = useState<string | undefined>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls>()
  const [muted, setMuted] = useState(true)
  const { enableAudio, videoId } = video
  const poster = `${BASE_URL}/c_scale,w_1200/${videoId}.jpeg`

  const toggleAudio = () => setMuted(!muted)
  const url = `https://res.cloudinary.com/spinelli-kilcollin/video/upload/${video.videoId}.m3u8`
  useEffect(() => {
    if (ready) return
    if (!videoRef.current) return
    console.log(Hls.isSupported())
    if (Hls.isSupported()) {
      const hls = new Hls(hlsConfig)
      hlsRef.current = hls
      hls.loadSource(url)
      hls.attachMedia(videoRef.current)

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error({ event, data })
      })

      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        if (!videoRef.current) return
        videoRef.current.play()
      })
      setReady(true)
    } else {
      const bestSize =
        fallbackSizes.find((fs) => fs > viewportWidth) ?? fallbackSizes[2]
      const fallbackUrl = `https://res.cloudinary.com/spinelli-kilcollin/video/upload/c_scale,w_${bestSize}/${video.videoId}.mp4`
      setFallbackSrc(fallbackUrl)
    }
  }, [ready, videoRef.current])

  return (
    <VideoWrapper>
      <video
        poster={poster}
        autoPlay
        muted={muted}
        loop
        playsInline
        ref={videoRef}
        src={fallbackSrc}
      />
      {enableAudio ? <AudioButton muted={muted} onClick={toggleAudio} /> : null}
    </VideoWrapper>
  )
}
