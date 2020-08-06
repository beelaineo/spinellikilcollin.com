import * as React from 'react'
import styled, { css, Box } from '@xstyled/styled-components'
import { Form, Field, FieldWrapper } from '../../components/Forms'
import { Button } from '../../components/Button'
import { submitToHubspot } from '../../services'
import { Heading } from '../../components/Text'

const { useState } = React

const FieldsWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    margin-top: 7;

    ${FieldWrapper} {
      height: 100%;

      > * {
        height: 100%;
        width: 100%;
        max-width: initial;
      }
    }

    > * {
      width: 100%;
      margin-bottom: 5;

      &:nth-last-child(3) {
        width: calc(50% - (${theme.space[3]}px) / 2);
        margin-right: calc(${theme.space[3]}px / 2);
      }
      &:nth-last-child(2) {
        margin-left: calc(${theme.space[3]}px / 2);
        width: calc(50% - (${theme.space[3]}px) / 2);
      }
    }
  `}
`

type FormValues = {
  firstname: string
  lastname: string
  email: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  country: string
}

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
}

interface MagazineFormProps {
  successMessage: string
}

const formId = 'aaed4d96-d524-4e6b-8fc3-29a5596ede97'

export const MagazineForm = ({ successMessage }: MagazineFormProps) => {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const handleSubmit = async (values: FormValues) => {
    setSubmitting(true)
    await fetch('/api/925signup', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then((r) => r.json())
    await submitToHubspot(values, formId)
    setSuccess(true)
  }
  return (
    <>
      {success ? (
        <Box textAlign="center" my={4}>
          <Heading level={3}>{successMessage}</Heading>
        </Box>
      ) : (
        <Form<FormValues>
          disabled={submitting || success}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <FieldsWrapper>
            <Field name="firstname" placeholder="First Name" required />
            <Field name="lastname" placeholder="Last Name" required />
            <Field
              name="email"
              type="email"
              placeholder="email address"
              required
            />
            <Field
              name="address1"
              placeholder="Mailing Address Line 1"
              required
            />
            <Field name="address2" placeholder="Mailing Address Line 2" />
            <Field name="city" placeholder="City" required />
            <Field name="state" placeholder="State" required />
            <Field name="zip" placeholder="Postal Code" required />
            <Field
              name="country"
              type="countrySelector"
              placeholder="Country"
              required
            />
            <Button disabled={submitting || success} type="submit">
              Submit
            </Button>
          </FieldsWrapper>
        </Form>
      )}
    </>
  )
}
