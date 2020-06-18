import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Heading } from '../../Text'
import { Form, Field } from '../../Forms'
import { Button } from '../../Button'
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
    grid-gap: 2;

    & > * {
      grid-column: 1 / 3;

      &:nth-child(5),
      &:nth-child(6) {
        grid-column: span 1;
      }
    }
  `}
`

interface RingSizerFormProps {
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
  onContinue?: () => void
}
interface FormValues {
  name: string
  emailAddress: string
  phone?: string
  message: string
  address1: string
  address2?: string
  state: string
  postalCode: string
  country: string
  productName: string
  product?: string
  variant?: string
}

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
    setSuccess(true)
  }

  const initialValues: FormValues = {
    name: '',
    emailAddress: '',
    message: '',
    country: 'United States',
    productName: 'Product Name',
    address1: '',
    address2: undefined,
    postalCode: '',
    state: '',
    product: product?.title || '(none)',
    variant: variant?.title || '(none)',
  }

  return (
    <MainWrapper>
      <Heading level={2}>Request a ring sizer</Heading>
      <Form
        disabled={submitting}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <SuccessWrapper visible={success}>
          <Heading color="body.8" level={3}>
            Thank you! We have received your request.
          </Heading>
          {onContinue ? (
            <Button onClick={onContinue} type="button" mt={3} level={2}>
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
            name="emailAddress"
            type="email"
            label="Email Address"
            placeholder=""
            required
          />
          <Field name="address1" label="Mailing Address Line 1" required />
          <Field name="address2" label="Mailing Address Line 2" />
          <Field label="City" name="city" required />
          <Field label="State" name="state" required />
          <Field label="Postal Code" name="postalCode" required />
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
