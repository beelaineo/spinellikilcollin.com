import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Heading } from '../../Text'
import { Button } from '../../Button'
import { Form, Field } from '../'
import { submitToHubspot } from '../../../services'
import {
  MainWrapper,
  SuccessWrapper,
  FieldsWrapper as BaseFieldsWrapper,
} from './styled'

const FieldsWrapper = styled(BaseFieldsWrapper)`
  ${({ theme }) => css`
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

interface VIPSignupFormProps {
  onContinue?: () => void
}

type FormValues = {
  email: string
  date_of_birth?: string
  phone?: string
  phoneCountryCode?: string
  dialingCode?: string
  special_date_1_?: string
  special_date_2_?: string
}

const formId = '369f2dfa-fad2-4e44-bcdf-04f336d57e31'

export const VIPSignupForm = ({ onContinue }: VIPSignupFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await fetch('/api/vipSignup', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    await submitToHubspot(values, formId)
    setSuccess(true)
  }

  const initialValues = {
    email: '',
    date_of_birth: '',
    phone: '',
    special_date_1_: '',
    special_date_2_: '',
    phoneCountryCode: 'US',
    dialingCode: '',
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
        id="vip-signup-form"
        disabled={submitting}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <FieldsWrapper visible={!success}>
          <Field
            name="email"
            type="email"
            placeholder="Email"
            label="Email"
            required
          />
          <Field
            name="date_of_birth"
            label="Date of birth"
            placeholder="Date of birth"
          />
          <Field
            name="phone"
            type="tel"
            placeholder="Phone"
            label="Phone (optional)"
          />
          <Field name="special_date_1_" label="Special Date 1" placeholder="" />
          <Field name="special_date_2_" label="Special Date 2" placeholder="" />
          <Button type="submit">Submit</Button>
        </FieldsWrapper>
      </Form>
    </MainWrapper>
  )
}
