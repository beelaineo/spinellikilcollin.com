import * as React from 'react'
import { BsVolumeUp, BsVolumeMute } from 'react-icons/bs'
import { AudioButtonWrapper } from './styled'

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
