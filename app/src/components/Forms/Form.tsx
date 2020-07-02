import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Formik, FormikValues } from 'formik'
import { FormWrapper } from './styled'
import { Heading } from '../Text'

interface FormElementProps {
  isSubmitting: boolean
  disabled?: boolean
}

const FormElement = styled.form`
  ${({ isSubmitting, disabled }: FormElementProps) =>
    isSubmitting || disabled
      ? css`
          opacity: 0.75;
          pointer-events: none;
        `
      : ''}
`

interface FormProps<Values> {
  title?: string
  description?: string
  disabled?: boolean
  onSubmit: (values: Values) => void | Promise<void>
  initialValues: Values
  children: React.ReactNode
  validationSchema?: FormikValues['validationSchema']
}

export function Form<Values extends FormikValues>({
  title,
  description,
  onSubmit,
  disabled,
  initialValues,
  children,
  validationSchema,
}: FormProps<Values>) {
  return (
    <FormWrapper disabled={disabled}>
      {title ? (
        <Heading level={3} color="primaryMain">
          {title}
        </Heading>
      ) : null}
      {description ? (
        <Heading level={5} color="offset.1">
          {description}
        </Heading>
      ) : null}
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting }) => {
          return (
            <FormElement
              isSubmitting={isSubmitting}
              disabled={disabled}
              onSubmit={handleSubmit}
            >
              {children}
            </FormElement>
          )
        }}
      </Formik>
    </FormWrapper>
  )
}
