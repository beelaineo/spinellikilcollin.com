import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Heading } from '../../Text'
import { Form } from '../Form'
import { Field } from '../Fields/Field'
import { FieldWrapper } from '../../Forms/Fields/styled'
import { StateField } from '../CustomFields'
import { Button } from '../../Button'
import { CheckboxWrapper, ConsentWrapper } from './styled'
import { submitToHubspot } from '../../../services'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import Script from 'next/script'
import Link from 'next/link'

const { useState } = React

interface WithVisible {
  visible: boolean
}

const MainWrapper = styled.div`
  position: relative;
`

const SuccessWrapper = styled.div<WithVisible>`
  ${({ visible }) => css`
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.2s;
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    display: flex;
  `}
`

const FieldsWrapper = styled.div<WithVisible>`
  ${({ visible, theme }) => css`
    opacity: ${visible ? 1 : 0};
    margin-top: 5;
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.2s;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 4;
    grid-column-gap: 3;

    & > * {
      grid-column: 1 / 3;

      &:nth-child(5),
      &:nth-child(6),
      &:nth-child(7),
      &:nth-child(8) {
        grid-column: span 1;
      }
    }

    .field {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      > div {
        position: relative;

        &:has(input:focus-visible) {
          ${theme.focus.left()}
        }

        &:has(select:focus-visible) {
          ${theme.focus.right()}
        }

        #phone {
          outline: none;
        }
      }
    }

    ${FieldWrapper},
    select {
      flex-grow: 1;
      height: 100%;
      width: 100%;
      max-width: initial;
    }
  `}
`

interface RingSizerFormProps {
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
  onContinue?: () => void
}

type FormValues = {
  name: string
  email: string
  phone?: string
  message: string
  address1: string
  address2?: string
  state: string
  zip: string
  country: string
  product?: string
  variant?: string
  phoneCountryCode?: string
  dialingCode?: string
  communicationsConsent: boolean
}

const formId = 'e62200cb-d8d3-468f-a19e-13c7d4bcec26'

export const RingSizerForm = ({
  product,
  variant,
  onContinue,
}: RingSizerFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await fetch('/api/requestRingSizer', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    await submitToHubspot(values, formId)
    setSuccess(true)
  }

  const initialValues: FormValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
    country: 'United States',
    address1: '',
    address2: undefined,
    zip: '',
    state: '',
    product: product?.title || '(none)',
    variant: variant?.title || '(none)',
    phoneCountryCode: 'US',
    dialingCode: '',
    communicationsConsent: false,
  }

  return (
    <>
      <Script id="hubspot-sizer-widget">
        {`hbspt.forms.create({
        region: "na1",
        portalId: "7668999",
        formId: "e62200cb-d8d3-468f-a19e-13c7d4bcec26"
      });`}
      </Script>
      <MainWrapper>
        <Heading mt={0} mb={5} level={3}>
          Request a ring sizer
        </Heading>
        <Form
          id="ring-sizer-form"
          disabled={submitting}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
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
              label="Email Address"
              placeholder=""
              required
            />
            <Field name="address1" label="Mailing Address Line 1" required />
            <Field name="address2" label="Mailing Address Line 2" />
            <Field label="City" name="city" required />
            <StateField label="State" name="state" required />
            <Field label="Postal Code" name="zip" required />
            <Field
              label="Country"
              name="country"
              type="countrySelector"
              required
            />
            <Field name="phone" type="tel" label="Phone Number" required />
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
            <Field name="product" type="hidden" />
            <Field name="variant" type="hidden" />
            <Button mt={2} type="submit">
              Submit
            </Button>
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
