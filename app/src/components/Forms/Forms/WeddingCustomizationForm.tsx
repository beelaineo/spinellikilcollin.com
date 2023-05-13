import * as React from 'react'
import { ShopifyProduct, ShopifyProductVariant } from '../../../types'
import { Heading, P } from '../../Text'
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
} from './styled'
import Script from 'next/script'
import { Select } from '../Fields/Select'
import Link from 'next/link'

const { useState } = React

type FormValues = {
  name: string
  email: string
  location: string
  phone: string
  product: string
  variant: string
  customization_wedding_details: string
  customization_wedding_budget: string
  phoneCountryCode?: string
  dialingCode?: string
}

interface ProductBadgeProps {
  product: ShopifyProduct
  variant?: ShopifyProductVariant
}

const formId = '7c315eff-33a3-4d1c-975a-c01e0a87e2e1'

{
  /* <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>
<script>
  hbspt.forms.create({
    region: "na1",
    portalId: "7668999",
    formId: "7c315eff-33a3-4d1c-975a-c01e0a87e2e1"
  });
</script> */
}

const ProductBadge = ({ product, variant }: ProductBadgeProps) =>
  variant?.title ? (
    <ProductBadgeWrapper>
      <Checkmark />
      <Heading my={0} ml={2} level={5}>
        {variant.title.toUpperCase()}
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

interface WeddingCustomizationFormProps {
  product?: ShopifyProduct
  variant?: ShopifyProductVariant
  onContinue?: () => void
}

export const WeddingCustomizationForm = ({
  product,
  variant,
  onContinue,
}: WeddingCustomizationFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await fetch('/api/weddingCustomizationInquiry', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    await submitToHubspot(values, formId)
    setSuccess(true)
  }

  const budgetOptions = [
    { value: '$1000-$5000', id: '1000-5000', label: '$1000-$5000' },
    { value: '$5000-$10,000', id: '5000-10000', label: '$5000-$10,000' },
    { value: '$10,000-$15,000', id: '10000-15000', label: '$10,000-$15,000' },
    { value: '$15,000-$20,000', id: '15000-20000', label: '$15,000-$20,000' },
    { value: '$20,000+', id: '20000+', label: '$20,000+' },
  ]

  const initialValues = {
    name: '',
    email: '',
    location: '',
    phone: '',
    product: product?.title || '(no product specified)',
    variant: variant?.title || '',
    customization_wedding_details: '',
    customization_wedding_budget: '',
    phoneCountryCode: 'US',
    dialingCode: '',
    communicationsConsent: false,
  }

  return (
    <>
      <Script id="hubspot-custom-widget">
        {`hbspt.forms.create({
        region: "na1",
        portalId: "7668999",
        formId: "7c315eff-33a3-4d1c-975a-c01e0a87e2e1"
      });`}
      </Script>
      <MainWrapper>
        <Heading mt={0} level={3}>
          Wedding Customization Inquiry
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
            <Field name="product" label="Product Name" type="hidden" />
            <Field name="variant" label="Variant Name" type="hidden" />
            <Field
              name="customization_wedding_details"
              type="textarea"
              label="What did you have in mind for the customization?"
              placeholder="I'm interested in..."
              required
            />
            <Field
              name="customization_wedding_budget"
              type="select"
              label="Did you have a budget in mind?"
              placeholder="Please Select"
              options={budgetOptions}
              required
            />
            <Heading level={6}>
              Spinelli Kilcollin is committed to respecting your privacy and we
              will never sell your personal information. We only use your
              information to administer your account and to provide you with the
              best experience, products and services you requested from us. From
              time to time, we may contact you about our products and services,
              as well as other content that may interest you. If you consent to
              us contacting you for this purpose, please check the box below.
            </Heading>
            <CheckboxWrapper>
              <Field
                name="communicationsConsent"
                type="checkbox"
                label="I agree to receive other communications from Spinelli Kilcollin."
              />
            </CheckboxWrapper>
            <Button type="submit">Submit</Button>
            <Heading level={6}>
              You may unsubscribe from these communications at any time. For
              more information on how to unsubscribe, our privacy practices, and
              how we are committed to protecting and respecting your privacy,
              please review our{' '}
              <Link href="/about/privacy-policy" target="_blank">
                Privacy Policy
              </Link>
              .
            </Heading>
            <Heading level={6}>
              By clicking submit, you consent to allow Spinelli Kilcollin to
              store and process the personal information submitted above to
              provide you the content requested.
            </Heading>
          </FieldsWrapper>
        </Form>
      </MainWrapper>
    </>
  )
}
