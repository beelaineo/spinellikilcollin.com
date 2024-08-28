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
  TextWrapper,
} from './styled'
import Link from 'next/link'
import * as Yup from 'yup'
import { StateField } from '../CustomFields'

const FieldsWrapper = styled(BaseFieldsWrapper)`
  ${({ theme }) => css`
    margin-top: 0px;

    .consent-text {
      grid-column: 1 / 3;
      max-width: 100%;
    }

    .field--image {
      grid-column: 1 / 3;
      max-width: 100%;
    }

    .field--inquiryType {
      grid-column: 1 / 3;
      max-width: 100%;
    }

    .field--orderUnknown label {
      margin-top: 0px;
    }

    .field--name {
      grid-column: 1 / 3;
    }
    ${theme.mediaQueries.mobile} {
      display: flex;
      flex-direction: column;

      .field--name {
        grid-column: auto;
      }

      .field--image {
        grid-column: auto;
        display: none;
      }

      button[type='submit'],
      .field--message {
        grid-column: 1 / 3;
      }
    }
  `}
`

const { useState, useEffect } = React

interface CustomerCareFormProps {
  onContinue?: () => void
}

type FormValues = {
  firstname: string
  lastname: string
  email: string
  phone?: string
  phoneCountryCode?: string
  dialingCode?: string
  address1?: string
  address2?: string
  city: string
  state?: string
  zip?: string
  country?: string
  inquiry_type: string
  orderNumber?: string
  orderUnknown: boolean
  message?: string
  product?: string
  variant?: string
  image?: any
  communicationsConsent: boolean
}

type Values = Record<string, string | number | boolean | undefined>

const formId = '4a391ec7-072c-4ff1-b4e2-1888a6d4c2f0'

export const CustomerCareForm = ({ onContinue }: CustomerCareFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [inquiryType, setInquiryType] = useState(
    'Returns & Exchanges' as string,
  )

  const formatDateValue = (value: string) => {
    const date = new Date(value).setUTCHours(0, 0, 0, 0)
    return date
  }

  const handleSubmit = async (values: FormValues) => {
    // const formatDateFields = function (values: FormValues) {
    //   values.birthday =
    //     values.birthday && formatDateValue(values.birthday).toString()
    //   values.anniversary =
    //     values.anniversary && formatDateValue(values.anniversary).toString()
    //   values.partner_s_birthday =
    //     values.partner_s_birthday &&
    //     formatDateValue(values.partner_s_birthday).toString()
    //   values.import_event_date =
    //     values.import_event_date &&
    //     formatDateValue(values.import_event_date).toString()
    //   return values
    // }

    // console.log('formatted values', formatDateFields(values))

    setSubmitting(true)
    await fetch('/api/customerCare', {
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
    phoneCountryCode: 'US',
    dialingCode: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    inquiry_type: 'Returns & Exchanges',
    orderNumber: '',
    orderUnknown: false,
    message: '',
    product: '',
    variant: '',
    image: undefined,
    communicationsConsent: true,
  }

  const validationSchema = Yup.object().shape({
    image: Yup.mixed().test('fileSize', 'File size too large', (value) => {
      if (!value) return true
      // @ts-ignore
      return value.size <= 500000
    }),
    communicationsConsent: Yup.boolean().oneOf(
      [true],
      'You must consent to communications to submit this form.',
    ),
  })

  const handleInquiryTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInquiryType(e.target.value)
  }

  const handleFormStateChange = (values) => {
    setInquiryType(values.inquiry_type)
  }

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
        id="customer-care-form"
        disabled={submitting}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onFormStateChange={handleFormStateChange}
      >
        <FieldsWrapper visible={!success}>
          <Field
            name="inquiry_type"
            type="inquiryTypeSelector"
            label="Inquiry Type"
            required
          />
          <TextWrapper className="consent-text">
            {inquiryType === 'Returns & Exchanges' &&
              'Eligible only for pieces purchased directly through Spinelli Kilcollin'}
            {inquiryType === 'Start a Repair' &&
              'Start a Repair (piece must have order number and purchased through SK directly)'}
            {inquiryType === 'Upload Image' && 'Upload image'}
            {inquiryType === 'Place an Order' && 'Place an Order'}
            {inquiryType === 'Customization Inquiry' && 'Customization Inquiry'}
          </TextWrapper>
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
          <Field name="address1" label="Mailing Address Line 1" />
          <Field name="address2" label="Mailing Address Line 2" />
          <Field label="City" name="city" required />
          <StateField label="State" name="state" />
          <Field label="Postal Code" name="zip" />
          <Field label="Country" name="country" type="countrySelector" />
          {(inquiryType === 'Start a Repair' ||
            inquiryType === 'Returns & Exchanges') && (
            <>
              <Field label="Product Name" name="product" />
              <Field label="Order Number" name="orderNumber" />
              <Field
                label={`I don't know my order number`}
                name="orderUnknown"
                type="checkbox"
              />
              {/* <Field label="Variant Name" name="variant" /> */}
              {inquiryType === 'Start a Repair' && (
                <Field label="Image" name="image" type="image" />
              )}
            </>
          )}
          <Field label="Message" name="message" type="textarea" />
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
