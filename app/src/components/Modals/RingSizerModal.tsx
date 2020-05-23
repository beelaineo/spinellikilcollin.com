import * as React from 'react'
import { Modal } from '../Modal'
import { Heading } from '../Text'
import { Form, Field } from '../Forms'

interface RingSizerModalProps {
  open: boolean
  closeModal: () => void
}

interface FormValues {
  name: string
  email: string
  phone?: string
  message: string
}

export const RingSizerModal = ({ open, closeModal }: RingSizerModalProps) => {
  const handleSubmit = async (values: FormValues) => {}
  const initialValues = {
    name: '',
    email: '',
    message: '',
  }
  return (
    <Modal open={open} closeModal={closeModal}>
      <Heading level={1}>RingSizer Inquiry</Heading>
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <Field
          name="name"
          label="Name"
          placeholder="First and Last name"
          required
        />
        <Field
          name="email"
          type="email"
          placeholder="Email"
          label="Email"
          required
        />
        <Field
          name="phone"
          type="tel"
          placeholder="Phone"
          label="Phone (optional)"
        />
        <Field
          name="message"
          type="textArea"
          placeholder="I'm interested in..."
          required
        />
      </Form>
    </Modal>
  )
}
