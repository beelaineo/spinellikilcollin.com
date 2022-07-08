import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  Background,
  ModalWrapper,
  Wrapper,
  DiamondWrapper,
  DiamondModalWrapper,
  CloseButton,
} from './styled'

interface ModalProps {
  children: React.ReactNode
  closeModal?: () => void
  display?: string
}

export const Modal: React.FC<ModalProps> = ({
  children,
  closeModal,
  display,
}) => {
  if (typeof document === 'undefined') return null
  const modalRoot = document.getElementById('modal')
  if (!modalRoot) throw new Error('No modal root')

  if (display === 'diamond') {
    return ReactDOM.createPortal(
      <DiamondWrapper>
        <DiamondModalWrapper>
          <CloseButton onClick={closeModal} aria-label="Close modal" />
          {children}
        </DiamondModalWrapper>
      </DiamondWrapper>,
      modalRoot,
    )
  } else {
    return ReactDOM.createPortal(
      <Wrapper>
        <ModalWrapper>
          <CloseButton onClick={closeModal} aria-label="Close modal" />
          {children}
        </ModalWrapper>
        <Background open onClick={closeModal} />
      </Wrapper>,
      modalRoot,
    )
  }
}
