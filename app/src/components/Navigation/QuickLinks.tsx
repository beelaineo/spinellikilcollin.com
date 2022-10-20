import * as React from 'react'
import { useModal } from '../../providers/ModalProvider'
import { useRouter } from 'next/router'
import { QuickLinksWrapper } from './styled'

interface QuickLinksProps {
  colorTheme?: 'light' | 'dark'
}

export const QuickLinks = ({ colorTheme }: QuickLinksProps) => {
  const { openRingSizerModal } = useModal()
  const router = useRouter()

  return (
    <QuickLinksWrapper colorTheme={colorTheme}>
      <button onClick={() => router.push('/about/appointments')}>
        Appointments
      </button>
      <button onClick={() => openRingSizerModal()}>Request a Sizer</button>
    </QuickLinksWrapper>
  )
}
