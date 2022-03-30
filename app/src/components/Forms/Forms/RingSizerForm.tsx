import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Heading } from '../../Text'
import { Form } from '../Form'
import { Field } from '../Fields/Field'
import { FieldWrapper } from '../../Forms/Fields/styled'
import { StateField } from '../CustomFields'
import { Button } from '../../Button'
import { submitToHubspot } from '../../../services'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'

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
  ${({ visible }) => css`
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
  }

  return (
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
          <Field name="phone" type="tel" label="Phone Number (optional)" />
          <Field name="product" type="hidden" />
          <Field name="variant" type="hidden" />
          <Button mt={2} type="submit">
            Submit
          </Button>
        </FieldsWrapper>
      </Form>
    </MainWrapper>
  )
}
