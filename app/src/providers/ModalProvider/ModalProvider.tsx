import * as React from 'react'
import { CustomizationModal, RingSizerModal } from '../../components/Modals'

const { useState } = React

export type ModalName = 'customization' | 'ringSizer'

interface ModalContextValue {
  openModal: (name: ModalName) => void
}

const ModalContext = React.createContext<ModalContextValue | undefined>(
  undefined,
)

export const ModalConsumer = ModalContext.Consumer

export const useModal = () => {
  const ctx = React.useContext(ModalContext)
  if (!ctx)
    throw new Error('useModalContext must be used within a ModalProvider')
  return ctx
}

interface ModalProps {
  children: React.ReactNode
}

export const ModalProvider = ({ children }: ModalProps) => {
  const [currentModal, setCurrentModal] = useState<ModalName | null>(null)

  const openModal = (name: ModalName) => {
    setCurrentModal(name)
  }

  const closeModal = () => setCurrentModal(null)

  const value = {
    openModal,
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
      {currentModal === 'customization' ? (
        <CustomizationModal open closeModal={closeModal} />
      ) : currentModal === 'ringSizer' ? (
        <RingSizerModal open closeModal={closeModal} />
      ) : null}
    </ModalContext.Provider>
  )
}
