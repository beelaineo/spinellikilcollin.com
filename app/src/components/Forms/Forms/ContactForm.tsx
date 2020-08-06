import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Heading } from '../../Text'
import { Button } from '../../Button'
import { Form, StateField, Field } from '../'
import { submitToHubspot } from '../../../services'
import {
  MainWrapper,
  SuccessWrapper,
  FieldsWrapper as BaseFieldsWrapper,
} from './styled'

const FieldsWrapper = styled(BaseFieldsWrapper)`
  ${({ theme }) => css`
    .field--name {
      grid-column: 1 / 3;
    }
    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr;
      .field--name {
        grid-column: auto;
      }

      button[type='submit'],
      .field--message {
        grid-column: auto;
      }
    }
  `}
`

const { useState } = React

interface ContactFormProps {
  formtype?: string
  onContinue?: () => void
}

type FormValues = {
  name: string
  email: string
  phone: string
  country: string
  state: string
  message: string
  formtype?: string
}

const formId = 'd1a0fa82-2130-40e7-b321-d073effb9079'

export const ContactForm = ({ formtype, onContinue }: ContactFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await fetch('/api/contactUs', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    await submitToHubspot(values, formId)
    setSuccess(true)
  }

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    country: 'United States',
    state: '',
    message: '',
    formtype,
  }

  return (
    <MainWrapper>
      <Heading mt={0} mb={2} level={3}>
        Contact Us
      </Heading>
      {formtype ? (
        <Heading mt={0} level={4} color="body.6">
          {formtype} Inquiry
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
        id="contact-form"
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
          <Field type="hidden" name="formtype" />
          <Button type="submit">Submit</Button>
        </FieldsWrapper>
      </Form>
    </MainWrapper>
  )
}
