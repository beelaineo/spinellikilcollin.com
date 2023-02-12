import * as React from 'react'
import {
  BsPlayFill,
  BsPauseFill,
  BsVolumeUp,
  BsVolumeMute,
} from 'react-icons/bs'
import { PlaybackButtonWrapper, AudioButtonWrapper } from './styled'

interface PlaybackButtonProps {
  playing?: boolean
  onClick: () => void
}

export const PlaybackButton = ({ playing, onClick }: PlaybackButtonProps) => {
  return (
    <PlaybackButtonWrapper
      onClick={onClick}
      aria-label={playing ? 'pause video' : 'play video'}
      tabIndex={-1}
    >
      {playing ? <BsPauseFill /> : <BsPlayFill />}
    </PlaybackButtonWrapper>
  )
}

interface AudioButtonProps {
  muted: boolean
  onClick: () => void
}

export const AudioButton = ({ muted, onClick }: AudioButtonProps) => {
  return (
    <AudioButtonWrapper
      onClick={onClick}
      aria-label={muted ? 'Unmute video' : 'Mute video'}
    >
      {muted ? <BsVolumeMute /> : <BsVolumeUp />}
    </AudioButtonWrapper>
  )
}
