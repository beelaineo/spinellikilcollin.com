import * as React from 'react'
import { CustomizationModal, RingSizerModal } from '../../components/Modals'
import {
  RING_SIZER,
  CUSTOMIZATION,
  CustomizationModalArgs,
  useModalReducer,
} from './reducer'

export type ModalName = 'customization' | 'ringSizer'

interface ModalContextValue {
  closeModal: () => void
  openRingSizerModal: () => void
  openCustomizationModal: (args: CustomizationModalArgs) => void
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
  } = useModalReducer()

  const value = {
    closeModal,
    openRingSizerModal,
    openCustomizationModal,
  }
  const { currentModal, currentProduct, currentVariant } = state

  return (
    <ModalContext.Provider value={value}>
      {children}
      {currentModal === CUSTOMIZATION ? (
        <CustomizationModal
          open
          product={currentProduct}
          variant={currentVariant}
          closeModal={closeModal}
        />
      ) : currentModal === RING_SIZER ? (
        <RingSizerModal open closeModal={closeModal} />
      ) : null}
    </ModalContext.Provider>
  )
}
