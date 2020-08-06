import * as React from 'react'
import { ContactForm } from '../Forms'
import { Modal } from '../Modal'

interface ContactFormModalProps {
  formtype?: string
  closeModal: () => void
}

export const ContactFormModal = ({
  formtype,
  closeModal,
}: ContactFormModalProps) => (
  <Modal closeModal={closeModal}>
    <ContactForm formtype={formtype} />
  </Modal>
)
