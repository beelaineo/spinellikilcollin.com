import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Heading } from '../../Text'
import { Button } from '../../Button'
import { Form } from '../Form'
import { StateField } from '../CustomFields'
import { Field } from '../Fields/Field'
import { submitToHubspot } from '../../../services'
import Script from 'next/script'
import Link from 'next/link'
import * as Yup from 'yup'

import {
  MainWrapper,
  SuccessWrapper,
  CheckboxWrapper,
  ConsentWrapper,
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
  phone?: string
  country: string
  state: string
  message: string
  formtype?: string
  phoneCountryCode?: string
  dialingCode?: string
  communicationsConsent: boolean
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
    phoneCountryCode: 'US',
    dialingCode: '',
    communicationsConsent: true,
  }

  const validationSchema = Yup.object().shape({
    communicationsConsent: Yup.boolean().oneOf(
      [true],
      'You must consent to communications to submit this form.',
    ),
  })

  return (
    <>
      <Script id="hubspot-contact-widget">
        {`hbspt.forms.create({
        region: "na1",
        portalId: "7668999",
        formId: "d1a0fa82-2130-40e7-b321-d073effb9079"
      });`}
      </Script>
      <MainWrapper>
        <Heading mt={0} mb={2} level={3}>
          Contact Us
        </Heading>
        {formtype ? (
          <Heading mt={0} level={4} color="body.6">
            {formtype} Inquiry
          </Heading>
        ) : null}

        <SuccessWrapper $visible={success}>
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
          validationSchema={validationSchema}
        >
          <FieldsWrapper $visible={!success}>
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
            <ConsentWrapper>
              Spinelli Kilcollin is committed to respecting your privacy and we
              will never sell your personal information. We only use your
              information to administer your account and to provide you with the
              best experience, products and services you requested from us. From
              time to time, we may contact you about our products and services,
              as well as other content that may interest you. If you consent to
              us contacting you for this purpose, please check the box below.
            </ConsentWrapper>
            <CheckboxWrapper>
              <Field
                name="communicationsConsent"
                type="checkbox"
                label="I agree to receive other communications from Spinelli Kilcollin."
              />
            </CheckboxWrapper>
            <Button type="submit">Submit</Button>
            <ConsentWrapper>
              You may unsubscribe from these communications at any time. For
              more information on how to unsubscribe, our privacy practices, and
              how we are committed to protecting and respecting your privacy,
              please review our{' '}
              <Link href="/about/privacy-policy" target="_blank">
                Privacy Policy
              </Link>
              .
            </ConsentWrapper>
            <ConsentWrapper>
              By clicking submit, you consent to allow Spinelli Kilcollin to
              store and process the personal information submitted above to
              provide you the content requested.
            </ConsentWrapper>
          </FieldsWrapper>
        </Form>
      </MainWrapper>
    </>
  )
}
