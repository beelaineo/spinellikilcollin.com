import * as React from 'react'
// import Hls from 'hls.js'
import { CloudinaryVideo as CloudinaryVideoType } from '../../types'
import { AudioButton, PlaybackButton } from './Controls'
import { VideoWrapper } from './styled'
import { useViewportSize } from '../../utils'

const { useRef, useEffect, useState } = React
const BASE_URL = 'https://res.cloudinary.com/spinelli-kilcollin/video/upload'

// const hlsConfig = {
//   capLevelToPlayerSize: true,
//   startLevel: 0,
// }

const fallbackSizes = [720, 1200, 1600]

interface VideoElementProps {
  video: CloudinaryVideoType
  muted: boolean
  poster: string
  playing: boolean | undefined
  onPlay: () => void
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
    fallbackSizes.find((fs) => fs > viewportWidth) ?? fallbackSizes[2]
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
    />
  )
}

// DEPRECATED: HLS was causing too many issues. Just serve an mp4
// const HLSVideo = ({
//   poster,
//   muted,
//   playing,
//   onPlay,
//   video,
// }: VideoElementProps) => {
//   const [ready, setReady] = useState(false)
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const hlsRef = useRef<Hls>()
//
//   const url = `https://res.cloudinary.com/spinelli-kilcollin/video/upload/${video.videoId}.m3u8`
//
//   useEffect(() => {
//     if (!videoRef.current) return
//     const paused = videoRef.current.paused
//     if (paused && playing === true) videoRef.current.play()
//     if (!paused && playing === false) videoRef.current.pause()
//   }, [videoRef.current, playing])
//
//   useEffect(() => {
//     if (ready) return
//     if (!videoRef.current) return
//     if (!Hls.isSupported()) return
//     const hls = new Hls(hlsConfig)
//     hlsRef.current = hls
//     hls.loadSource(url)
//     hls.attachMedia(videoRef.current)
//
//     hls.on(Hls.Events.ERROR, (event, data) => {
//       debug({ event, data })
//     })
//
//     hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
//       if (!videoRef.current) return
//       videoRef.current.play()
//     })
//     setReady(true)
//   }, [ready, videoRef.current])
//
//   return (
//     <video
//       poster={poster}
//       autoPlay
//       muted={muted}
//       loop
//       playsInline
//       ref={videoRef}
//       onPlay={onPlay}
//     />
//   )
// }

interface CloudinaryVideoProps {
  video: CloudinaryVideoType
  enableAudio?: boolean
}

export const CloudinaryVideo = ({ video }: CloudinaryVideoProps) => {
  if (!video?.videoId) return null
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState<boolean | undefined>(undefined)
  const { enableAudio, videoId } = video
  const poster = `${BASE_URL}/c_scale,w_1200/${videoId}.jpeg`

  const toggleAudio = () => setMuted(!muted)
  const togglePlaying = () => setPlaying(!playing)

  const handleOnPlay = () => {
    setPlaying(true)
  }

  // return (
  //   <VideoWrapper>
  //     {typeof window !== 'undefined' && Hls.isSupported() && false ? (
  //       <HLSVideo
  //         video={video}
  //         playing={playing}
  //         onPlay={handleOnPlay}
  //         poster={poster}
  //         muted={muted}
  //       />
  //     ) : (
  //       <NormalVideo
  //         video={video}
  //         playing={playing}
  //         onPlay={handleOnPlay}
  //         poster={poster}
  //         muted={muted}
  //       />
  //     )}
  //     {enableAudio ? <AudioButton muted={muted} onClick={toggleAudio} /> : null}
  //     {<PlaybackButton playing={playing} onClick={togglePlaying} />}
  //   </VideoWrapper>
  // )

  return (
    <VideoWrapper>
      <NormalVideo
        video={video}
        playing={playing}
        onPlay={handleOnPlay}
        poster={poster}
        muted={muted}
      />
      {enableAudio ? <AudioButton muted={muted} onClick={toggleAudio} /> : null}
      {<PlaybackButton playing={playing} onClick={togglePlaying} />}
    </VideoWrapper>
  )
}
