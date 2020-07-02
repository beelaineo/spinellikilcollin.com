import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { Heading } from '../../Text'
import { Button } from '../../Button'
import { Form, Field } from '../index'
import Checkmark from '../../../svg/Checkmark.svg'

const { useState } = React

interface WithVisible {
  visible: boolean
}

const MainWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;

    ${theme.mediaQueries.mobile} {
      min-width: initial;
    }
  `}
`

const FieldsWrapper = styled.div<WithVisible>`
  ${({ visible, theme }) => css`
    margin-top: 5;
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.2s;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 4;
    grid-column-gap: 3;

    button[type='submit'],
    .field--message {
      grid-column: 1 / 3;
    }

    ${theme.mediaQueries.mobile} {
      grid-template-columns: 1fr;

      button[type='submit'],
      .field--message {
        grid-column: auto;
      }
    }
  `}
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

interface FormValues {
  name: string
  emailAddress: string
  location?: string
  phone?: string
  message: string
}

interface ProductBadgeProps {
  product: ShopifyProduct
}

const ProductBadgeWrapper = styled.div`
  display: flex;
`

const ProductBadge = ({ product }: ProductBadgeProps) =>
  product.title ? (
    <ProductBadgeWrapper>
      <Checkmark />
      <Heading my={0} ml={2} level={5}>
        {product.title.toUpperCase()}
      </Heading>
    </ProductBadgeWrapper>
  ) : null

interface CustomizationFormProps {
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
  onContinue?: () => void
}

export const CustomizationForm = ({
  product,
  variant,
  onContinue,
}: CustomizationFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await fetch('/api/customizationInquiry', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    setSuccess(true)
  }

  const initialValues = {
    name: '',
    emailAddress: '',
    location: '',
    phone: '',
    message: '',
    product: product?.title || '(no product specified)',
    variant: variant?.title || '',
  }

  return (
    <MainWrapper>
      <Heading mt={0} level={3}>
        Customization Inquiry
      </Heading>
      {product ? <ProductBadge product={product} /> : null}
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
          <Field required name="location" label="Your Location" />
          <Field
            name="message"
            type="textArea"
            label="Notes"
            placeholder="I'm interested in..."
            required
          />
          <Field name="product" type="hidden" />
          <Field name="variant" type="hidden" />
          <Button type="submit">Submit</Button>
        </FieldsWrapper>
      </Form>
    </MainWrapper>
  )
}
