import * as React from 'react'
import { CloudinaryVideo as CloudinaryVideoType } from '../../types'

const BASE_URL = 'https://res.cloudinary.com/spinelli-kilcollin/video/upload'

interface VideoSourceProps {
  id: string
  width: number
}

const VideoSource = ({ id, width }: VideoSourceProps) => {
  const mp4src = `${BASE_URL}/q_auto:best/c_scale,w_${width}/${id}.mp4`
  const webmSrc = `${BASE_URL}/q_auto:best/c_scale,w_${width}/${id}.webm`
  return (
    <>
      <source type="video/mp4" src={mp4src} />
      <source type="video/webm" src={webmSrc} />
    </>
  )
}

interface CloudinaryVideoProps {
  video: CloudinaryVideoType
  sizes?: number[]
}

const defaultSizes = [900]

export const CloudinaryVideo = ({
  video,
  sizes: customSizes,
}: CloudinaryVideoProps) => {
  if (!video?.videoId) return null
  const { videoId } = video
  const poster = `${BASE_URL}/c_scale,w_1200/${videoId}.jpeg`
  const sizes = customSizes || defaultSizes
  return (
    <video autoPlay muted loop playsInline poster={poster}>
      {sizes.map((width) => (
        <VideoSource key={width} id={videoId} width={width} />
      ))}
    </video>
  )
}
