import * as React from 'react'
import Hls from 'hls.js'
import { CloudinaryVideo as CloudinaryVideoType } from '../../types'
import { AudioButton } from './AudioButton'
import { VideoWrapper } from './styled'

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

export const CloudinaryVideo = ({ video }: CloudinaryVideoProps) => {
  if (!video?.videoId) return null
  const [ready, setReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls>()
  const [muted, setMuted] = useState(true)
  const { enableAudio, enableControls, videoId } = video
  const poster = `${BASE_URL}/c_scale,w_1200/${videoId}.jpeg`

  const toggleAudio = () => setMuted(!muted)
  const url = `https://res.cloudinary.com/spinelli-kilcollin/video/upload/${video.videoId}.m3u8`
  useEffect(() => {
    if (ready) return
    if (!videoRef.current) return
    if (Hls.isSupported()) {
      const hls = new Hls(hlsConfig)
      hlsRef.current = hls
      hls.loadSource(url)
      hls.attachMedia(videoRef.current)

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error({ event, data })
      })

      hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
        console.log('parsed', { event, data })
        if (!videoRef.current) return
        videoRef.current.play()
      })
      setReady(true)
    }
  }, [ready, videoRef.current])

  return (
    <VideoWrapper>
      <video autoPlay muted={muted} loop playsInline ref={videoRef} />
      {enableAudio ? <AudioButton muted={muted} onClick={toggleAudio} /> : null}
    </VideoWrapper>
  )
}

// <video autoPlay muted={muted} loop playsInline poster={poster}>
//   {sizes.map(({ width, mediaQuery }) => (
//     <VideoSource
//       key={width}
//       id={videoId}
//       mediaQuery={mediaQuery}
//       width={width}
//     />
//   ))}
// </video>
