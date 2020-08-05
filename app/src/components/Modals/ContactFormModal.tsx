import * as React from 'react'
import { ContactForm } from '../Forms'
import { Modal } from '../Modal'

interface ContactFormModalProps {
  formType?: string
  closeModal: () => void
}

export const ContactFormModal = ({
  formType,
  closeModal,
}: ContactFormModalProps) => (
  <Modal closeModal={closeModal}>
    <ContactForm formType={formType} />
  </Modal>
)
