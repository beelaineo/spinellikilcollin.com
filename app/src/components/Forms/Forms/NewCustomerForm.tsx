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

const { useState, useEffect } = React

interface NewCustomerFormProps {
  onContinue?: () => void
  person?: string
}

type FormValues = {
  email: string
  firstname: string
  lastname: string
  city?: string
  phone?: string
  phoneCountryCode?: string
  dialingCode?: string
  star_sign?: string
  communicationsConsent: boolean
  person?: string
}

export const NewCustomerForm = ({
  onContinue,
  person,
}: NewCustomerFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formId, setFormId] = useState('9b296dae-8e9c-49dc-afab-acd8ebca3233')

  useEffect(() => {
    if (person && person === 'andrew') {
      setFormId('fb9a543b-dbe1-4c1c-9a32-8365dc0da4b0')
    } else if (person && person === 'michelle') {
      setFormId('385d94c5-06c6-434b-9705-a18ab3199213')
    } else if (person && person === 'lizzie') {
      setFormId('4a439432-0727-4fd9-8e82-db3a6ff47aef')
    } else if (person && person === 'jeneva') {
      setFormId('0ca945bd-8902-4f2a-8896-5d8a54cb66dd')
    } else {
      setFormId('9b296dae-8e9c-49dc-afab-acd8ebca3233')
    }
  }, [person])

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await fetch('/api/newCustomer', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    await submitToHubspot(values, formId)
    setSuccess(true)
  }

  const initialValues = {
    email: '',
    firstname: '',
    lastname: '',
    city: '',
    phone: '',
    star_sign: '',
    phoneCountryCode: 'US',
    dialingCode: '',
    communicationsConsent: true,
    person: person,
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
          <Field name="city" placeholder="City" label="City" />
          <Field name="phone" type="tel" placeholder="Phone" label="Phone" />
          <Field name="star_sign" placeholder="Star Sign" label="Star Sign" />
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
          <Button type="submit">Submit</Button>
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
        </FieldsWrapper>
      </Form>
    </MainWrapper>
  )
}
