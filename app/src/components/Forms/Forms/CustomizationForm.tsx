import * as React from 'react'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { Heading } from '../../Text'
import { Button } from '../../Button'
import { Form } from '../Form'
import { Field } from '../Fields/Field'
import { submitToHubspot } from '../../../services'
import Checkmark from '../../../svg/Checkmark.svg'
import {
  MainWrapper,
  ProductBadgeWrapper,
  FieldsWrapper,
  SuccessWrapper,
} from './styled'

const { useState } = React

type FormValues = {
  name: string
  email: string
  location?: string
  phone?: string
  message: string
  product?: string
  variant?: string
  phoneCountryCode?: string
  dialingCode?: string
}

interface ProductBadgeProps {
  product: ShopifyProduct
}

const formId = '65f5906c-622d-452b-8b63-51e42dd47a7c'

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
    await submitToHubspot(values, formId)
    setSuccess(true)
  }

  const initialValues = {
    name: '',
    email: '',
    location: '',
    phone: '',
    message: '',
    product: product?.title || '(no product specified)',
    variant: variant?.title || '',
    phoneCountryCode: 'US',
    dialingCode: '',
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
        id="customization-form"
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
            label="Phone"
            required
          />
          <Field required name="location" label="Your Location" />
          <Field
            name="message"
            type="textarea"
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
