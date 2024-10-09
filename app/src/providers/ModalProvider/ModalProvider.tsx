import * as React from 'react'
// eslint-disable-next-line import/no-cycle
import {
  ContactFormModal,
  CustomizationModal,
  HighValueCustomizationModal,
  RingSizerModal,
  SizeConverterModal,
  DiamondModal,
  WeddingModal,
} from '../../components/Modals'
import { useLockScroll } from '../../components/LockScroll'
import { ModalName, useModalReducer } from './reducer'

const { useEffect } = React

type ModalContextValue = Omit<ReturnType<typeof useModalReducer>, 'state'>

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
    openSizeConverterModal,
    openCustomizationModal,
    openHighValueCustomizationModal,
    openContactModal,
    openDiamondModal,
    openWeddingModal,
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
    openSizeConverterModal,
    openCustomizationModal,
    openHighValueCustomizationModal,
    openContactModal,
    openDiamondModal,
    openWeddingModal,
  }
  const {
    formtype,
    currentModal,
    currentProduct,
    currentVariant,
    currentDiamond,
    addLineItem,
  } = state

  return (
    <ModalContext.Provider value={value}>
      {children}
      {currentModal === ModalName.CUSTOMIZATION ? (
        <CustomizationModal
          product={currentProduct}
          variant={currentVariant}
          closeModal={closeModal}
        />
      ) : currentModal === ModalName.HIGHVALUECUSTOMIZATION ? (
        <HighValueCustomizationModal
          product={currentProduct}
          variant={currentVariant}
          closeModal={closeModal}
        />
      ) : currentModal === ModalName.RING_SIZER ? (
        <RingSizerModal
          product={currentProduct}
          variant={currentVariant}
          closeModal={closeModal}
        />
      ) : currentModal === ModalName.SIZE_CONVERTER ? (
        <SizeConverterModal
          product={currentProduct}
          variant={currentVariant}
          closeModal={closeModal}
          addLineItem={addLineItem}
          openRingSizerModal={openRingSizerModal}
        />
      ) : currentModal === ModalName.DIAMOND ? (
        <DiamondModal
          product={currentProduct}
          variant={currentVariant}
          diamond={currentDiamond}
          closeModal={closeModal}
        />
      ) : currentModal === ModalName.WEDDING ? (
        <WeddingModal
          product={currentProduct}
          variant={currentVariant}
          closeModal={closeModal}
        />
      ) : currentModal === ModalName.CONTACT ? (
        <ContactFormModal formtype={formtype} closeModal={closeModal} />
      ) : null}
    </ModalContext.Provider>
  )
}
