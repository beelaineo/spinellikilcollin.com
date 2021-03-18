import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Background, ModalWrapper, Wrapper, CloseButton } from './styled'

interface ModalProps {
  children: React.ReactNode
  closeModal: () => void
}

export const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
  if (typeof document === 'undefined') return null
  const modalRoot = document.getElementById('modal')
  if (!modalRoot) throw new Error('No modal root')

  return ReactDOM.createPortal(
    <Wrapper>
      <ModalWrapper>
        <CloseButton onClick={closeModal} />
        {children}
      </ModalWrapper>
      <Background open onClick={closeModal} />
    </Wrapper>,
    modalRoot,
  )
}
