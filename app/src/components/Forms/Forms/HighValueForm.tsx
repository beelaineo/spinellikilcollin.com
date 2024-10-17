import * as React from 'react'
import { Product, ShopifyProductVariant } from '../../../types'
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
  CheckboxWrapper,
  ConsentWrapper,
} from './styled'
import Script from 'next/script'
import { Select } from '../Fields/Select'
import Link from 'next/link'
import { definitely } from '../../../utils'
import * as Yup from 'yup'

const { useState } = React

type FormValues = {
  name: string
  email: string
  location: string
  phone: string
  product: string
  variant: string
  customization_details?: string
  phoneCountryCode?: string
  dialingCode?: string
  communicationsConsent: boolean
}

interface ProductBadgeProps {
  product: Product
  variant?: ShopifyProductVariant
  title?: string
}

const formId = '6975f0f0-b2b4-4570-acdc-b77c8fe9c151'

const ProductBadge = ({ product, variant, title }: ProductBadgeProps) =>
  title ? (
    <ProductBadgeWrapper>
      <Checkmark />
      <Heading my={0} ml={2} level={5}>
        {title.toUpperCase()}
      </Heading>
    </ProductBadgeWrapper>
  ) : variant?.title && product.title && variant.title != product.title ? (
    <ProductBadgeWrapper>
      <Checkmark />
      <Heading my={0} ml={2} level={5}>
        {product.title.toUpperCase()} / {variant.title.toUpperCase()}
      </Heading>
    </ProductBadgeWrapper>
  ) : product.title ? (
    <ProductBadgeWrapper>
      <Checkmark />
      <Heading my={0} ml={2} level={5}>
        {product.title.toUpperCase()}
      </Heading>
    </ProductBadgeWrapper>
  ) : null

interface CustomizationFormProps {
  product?: Product
  variant?: ShopifyProductVariant
  onContinue?: () => void
}

export const HighValueForm = ({
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

  const hasCarat = variant?.sourceData?.selectedOptions?.some(
    (option) => option?.name === 'Carat',
  )
  const hasColor = variant?.sourceData?.selectedOptions?.some(
    (option) => option?.name === 'Color',
  )
  // Parse the product title by combining the selected option
  // values, omitting the "Size" option
  const titleByOptions = variant?.sourceData?.selectedOptions?.length
    ? definitely(variant?.sourceData?.selectedOptions)
        .map((option) => {
          if (option.name === 'Size') return null
          return option.value
        })
        .filter(Boolean)
        .join(' | ')
    : undefined

  const weddingTitle =
    titleByOptions?.length && hasCarat && !hasColor
      ? product?.title + ' | ' + titleByOptions
      : undefined

  const initialValues = {
    name: '',
    email: '',
    location: '',
    phone: '',
    product: product?.title || '(no product specified)',
    variant: weddingTitle || variant?.title || '',
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
      <Script id="hubspot-custom-widget">
        {`hbspt.forms.create({
          region: "na1",
          portalId: "7668999",
          formId: "6975f0f0-b2b4-4570-acdc-b77c8fe9c151"
        });`}
      </Script>
      <MainWrapper>
        <Heading mt={0} level={3}>
          Inquiry
        </Heading>
        {product ? <ProductBadge product={product} variant={variant} /> : null}
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
          validationSchema={validationSchema}
        >
          <FieldsWrapper visible={!success} highValue>
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
            <Field name="product" label="Product Name" type="hidden" />
            <Field name="variant" label="Variant Name" type="hidden" />
            <Field name="customization_details" type="textarea" label="Notes" />
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
