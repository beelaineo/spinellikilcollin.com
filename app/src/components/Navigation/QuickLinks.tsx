import * as React from 'react'
import { useModal } from '../../providers/ModalProvider'
import { useRouter } from 'next/router'
import { QuickLinksWrapper } from './styled'
import { useAnalytics } from '../../providers'

interface QuickLinksProps {
  colorTheme?: 'light' | 'dark'
}

export const QuickLinks = ({ colorTheme }: QuickLinksProps) => {
  const { openRingSizerModal } = useModal()
  const { sendQuickLinkClick } = useAnalytics()

  const handleSizerClick = () => {
    openRingSizerModal()
    sendQuickLinkClick()
  }

  const handleAppointmentClick = () => {
    router.push('/about/appointments')
    sendQuickLinkClick()
  }

  const router = useRouter()

  return (
    <QuickLinksWrapper colorTheme={colorTheme}>
      <button onClick={handleAppointmentClick}>Appointments</button>
      <button onClick={handleSizerClick}>Request a Sizer</button>
    </QuickLinksWrapper>
  )
}
