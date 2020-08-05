import * as React from 'react'
import styled from '@xstyled/styled-components'
import { Heading } from '../../Text'
import { Button } from '../../Button'
import { Form, StateField, Field } from '../'
import {
  MainWrapper,
  SuccessWrapper,
  FieldsWrapper as BaseFieldsWrapper,
} from './styled'

const FieldsWrapper = styled(BaseFieldsWrapper)`
  .field--name {
    grid-column: 1 / 3;
  }
`

const { useState } = React

interface ContactFormProps {
  formType?: string
  onContinue?: () => void
}

interface FormValues {
  name: string
  emailAddress: string
  phone: string
  country: string
  state: string
  message: string
  formType?: string
}

export const ContactForm = ({ formType, onContinue }: ContactFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await fetch('/api/contactUs', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    setSuccess(true)
  }

  const initialValues = {
    name: '',
    emailAddress: '',
    phone: '',
    country: 'United States',
    state: '',
    message: '',
    formType,
  }

  return (
    <MainWrapper>
      <Heading mt={0} mb={2} level={3}>
        Contact Us
      </Heading>
      {formType ? (
        <Heading mt={0} level={4} color="body.6">
          {formType} Inquiry
        </Heading>
      ) : null}

      <SuccessWrapper visible={success}>
        <Heading color="body.8" level={4}>
          Thank you! We have received your request.
        </Heading>
        {onContinue ? (
          <Button onClick={onContinue} type="button" mt={3} level={3}>
            Continue shopping
          </Button>
        ) : null}
      </SuccessWrapper>
      <Form
        disabled={submitting}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <FieldsWrapper visible={!success}>
          <Field
            name="name"
            label="Name"
            placeholder="First and Last name"
            required
          />
          <Field
            name="emailAddress"
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
            label="Country"
            name="country"
            type="countrySelector"
            required
          />

          <StateField label="State" name="state" required />
          <Field
            name="message"
            type="textarea"
            label="Notes"
            placeholder="I'm interested in..."
            required
          />
          <Field type="hidden" name="formType" />
          <Button type="submit">Submit</Button>
        </FieldsWrapper>
      </Form>
    </MainWrapper>
  )
}
