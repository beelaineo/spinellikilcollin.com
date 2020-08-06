import * as React from 'react'
import { BsPlayFill, BsPlay, BsVolumeUp, BsVolumeMute } from 'react-icons/bs'
import { PlaybackButtonWrapper, AudioButtonWrapper } from './styled'

interface PlaybackButtonProps {
  playing: boolean
  onClick: () => void
}

export const PlaybackButton = ({ playing, onClick }: PlaybackButtonProps) => {
  return (
    <PlaybackButtonWrapper onClick={onClick}>
      {playing ? <BsPlayFill /> : <BsPlay />}
    </PlaybackButtonWrapper>
  )
}

interface AudioButtonProps {
  muted: boolean
  onClick: () => void
}

export const AudioButton = ({ muted, onClick }: AudioButtonProps) => {
  return (
    <AudioButtonWrapper onClick={onClick}>
      {muted ? <BsVolumeMute /> : <BsVolumeUp />}
    </AudioButtonWrapper>
  )
}
