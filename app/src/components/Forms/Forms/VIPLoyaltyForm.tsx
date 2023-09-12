import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Heading } from '../../Text'
import { Button } from '../../Button'
import { Form } from '../Form'
import { Field } from '../Fields/Field'
import { submitToHubspot } from '../../../services'
import {
  MainWrapper,
  SuccessWrapper,
  CheckboxWrapper,
  ConsentWrapper,
  FieldsWrapper as BaseFieldsWrapper,
} from './styled'
import Link from 'next/link'
import * as Yup from 'yup'

const FieldsWrapper = styled(BaseFieldsWrapper)`
  ${({ theme }) => css`
    margin-top: 0px;

    .consent-text {
      grid-column: 1 / 3;
      max-width: 100%;
    }

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

interface VIPLoyaltyFormProps {
  onContinue?: () => void
}

type FormValues = {
  firstname: string
  lastname: string
  email: string
  phone?: string
  phoneCountryCode?: string
  dialingCode?: string
  birthday?: string
  anniversary?: string
  partner_s_name?: string
  partner_s_birthday?: string
  important_event?: string
  import_event_date?: string
  communicationsConsent: boolean
}

const formId = '369f2dfa-fad2-4e44-bcdf-04f336d57e31'

export const VIPLoyaltyForm = ({ onContinue }: VIPLoyaltyFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await fetch('/api/vipLoyalty', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    await submitToHubspot(values, formId)
    setSuccess(true)
  }

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthday: '',
    anniversary: '',
    partner_s_name: '',
    partner_s_birthday: '',
    important_event: '',
    import_event_date: '',
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
    <MainWrapper>
      <SuccessWrapper visible={success}>
        <Heading color="body.8" level={4}>
          Thank you! We have received your submission.
        </Heading>
        {onContinue ? (
          <Button onClick={onContinue} type="button" mt={3} level={3}>
            Continue shopping
          </Button>
        ) : null}
      </SuccessWrapper>
      <Form
        id="vip-signup-form"
        disabled={submitting}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <FieldsWrapper visible={!success}>
          <Field
            name="firstname"
            placeholder="First Name"
            label="First Name"
            required
          />
          <Field
            name="lastname"
            placeholder="Last Name"
            label="Last Name"
            required
          />
          <Field
            name="email"
            type="email"
            placeholder="Email"
            label="Email"
            required
          />
          <Field name="phone" type="tel" placeholder="Phone" label="Phone" />
          <Field name="birthday" label="Birthday" placeholder="MM/DD/YYYY" />
          <Field
            name="anniversary"
            label="Anniversary"
            placeholder="MM/DD/YYYY"
            type="date"
          />
          <Field
            name="partner_s_name"
            placeholder="Partner's Name"
            label="Partner's Name"
          />
          <Field
            name="partner_s_birthday"
            label="Partner's Birthday"
            placeholder="MM/DD/YYYY"
          />
          <Field
            name="important_event"
            placeholder="Important Event"
            label="Important Event"
          />
          <Field
            name="import_event_date"
            label="Important Event Date"
            placeholder="MM/DD/YYYY"
          />
          <ConsentWrapper className="consent-text">
            Spinelli Kilcollin is committed to respecting your privacy and we
            will never sell your personal information. We only use your
            information to administer your account and to provide you with the
            best experience, products and services you requested from us. From
            time to time, we may contact you about our products and services, as
            well as other content that may interest you. If you consent to us
            contacting you for this purpose, please check the box below.
          </ConsentWrapper>
          <CheckboxWrapper className="consent-text">
            <Field
              name="communicationsConsent"
              type="checkbox"
              label="I agree to receive other communications from Spinelli Kilcollin."
            />
          </CheckboxWrapper>
          <ConsentWrapper className="consent-text">
            You may unsubscribe from these communications at any time. For more
            information on how to unsubscribe, our privacy practices, and how we
            are committed to protecting and respecting your privacy, please
            review our{' '}
            <Link href="/about/privacy-policy" target="_blank">
              Privacy Policy
            </Link>
            . By clicking submit, you consent to allow Spinelli Kilcollin to
            store and process the personal information submitted above to
            provide you the content requested.
          </ConsentWrapper>
          <Button type="submit">Submit</Button>
        </FieldsWrapper>
      </Form>
    </MainWrapper>
  )
}
