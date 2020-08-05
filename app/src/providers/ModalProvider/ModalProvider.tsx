import * as React from 'react'
import {
  ContactFormModal,
  CustomizationModal,
  RingSizerModal,
} from '../../components/Modals'
import { useLockScroll } from '../../components/LockScroll'
import {
  RING_SIZER,
  CUSTOMIZATION,
  CONTACT,
  CustomizationModalArgs,
  ContactModalArgs,
  useModalReducer,
} from './reducer'

const { useEffect } = React

export type ModalName = 'customization' | 'ringSizer' | 'contact'

interface ModalContextValue {
  closeModal: () => void
  openRingSizerModal: () => void
  openCustomizationModal: (args: CustomizationModalArgs) => void
  openContactModal: (args: ContactModalArgs) => void
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
  const {
    state,
    closeModal,
    openRingSizerModal,
    openCustomizationModal,
    openContactModal,
  } = useModalReducer()
  const { lockScroll, unlockScroll } = useLockScroll()

  const handleKeyup = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }
  const open = Boolean(state.currentModal)

  useEffect(() => {
    if (open) {
      lockScroll()
      document.addEventListener('keyup', handleKeyup)
      return () => {
        document.removeEventListener('keyup', handleKeyup)
      }
    } else {
      unlockScroll()
    }
  }, [open])

  const value = {
    closeModal,
    openRingSizerModal,
    openCustomizationModal,
    openContactModal,
  }
  const { formType, currentModal, currentProduct, currentVariant } = state

  return (
    <ModalContext.Provider value={value}>
      {children}
      {currentModal === CUSTOMIZATION ? (
        <CustomizationModal
          product={currentProduct}
          variant={currentVariant}
          closeModal={closeModal}
        />
      ) : currentModal === RING_SIZER ? (
        <RingSizerModal
          product={currentProduct}
          variant={currentVariant}
          closeModal={closeModal}
        />
      ) : currentModal === CONTACT ? (
        <ContactFormModal formType={formType} closeModal={closeModal} />
      ) : null}
    </ModalContext.Provider>
  )
}
