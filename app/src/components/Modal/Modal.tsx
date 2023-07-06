import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import FocusTrap from 'focus-trap-react'
import {
  Background,
  DiamondBackground,
  ModalWrapper,
  Wrapper,
  DiamondWrapper,
  DiamondModalWrapper,
  CloseButton,
} from './styled'

const { useEffect, useState } = React

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

  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    setShowModal(false)
    closeModal ? setTimeout(closeModal, 300) : null
  }

  useEffect(() => {
    setShowModal(true)
  }, [])

  if (display === 'diamond') {
    return ReactDOM.createPortal(
      <DiamondWrapper>
        <CSSTransition in={showModal} classNames="drawer" timeout={300}>
          <DiamondModalWrapper>
            <CloseButton onClick={handleClose} aria-label="Close modal" />
            {children}
          </DiamondModalWrapper>
        </CSSTransition>
        <DiamondBackground open onClick={handleClose} />
      </DiamondWrapper>,
      modalRoot,
    )
  } else {
    return ReactDOM.createPortal(
      <FocusTrap>
        <Wrapper>
          <ModalWrapper wide={Boolean(display === 'sizeConverter')}>
            <CloseButton onClick={closeModal} aria-label="Close modal" />
            {children}
          </ModalWrapper>
          <Background open onClick={closeModal} />
        </Wrapper>
      </FocusTrap>,
      modalRoot,
    )
  }
}
