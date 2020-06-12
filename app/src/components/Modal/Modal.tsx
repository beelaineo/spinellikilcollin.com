import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Heading } from '../Text'
import { Background, ModalWrapper, Wrapper, CloseButton } from './styled'

interface ModalProps {
  children: React.ReactNode
  title: string
  closeModal: () => void
}

export const Modal = ({ children, title, closeModal }: ModalProps) => {
  if (typeof document === 'undefined') return null
  const modalRoot = document.getElementById('modal')
  if (!modalRoot) throw new Error('No modal root')

  return ReactDOM.createPortal(
    <Wrapper>
      <ModalWrapper>
        <Heading level={2}>{title}</Heading>
        <CloseButton onClick={closeModal} />
        {children}
      </ModalWrapper>
      <Background open onClick={closeModal} />
    </Wrapper>,
    modalRoot,
  )
}
