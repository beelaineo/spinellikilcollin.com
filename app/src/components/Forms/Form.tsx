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

interface FormProps {
  title?: string
  description?: string
  disabled?: boolean
  onSubmit: any
  initialValues?: any
  children: React.ReactNode
  validationSchema?: FormikValues['validationSchema']
}

export const Form = ({
  title,
  description,
  onSubmit,
  disabled,
  initialValues,
  children,
  validationSchema,
}: FormProps) => {
  return (
    <FormWrapper>
      {title ? (
        <Heading level={2} color="primaryMain">
          {title}
        </Heading>
      ) : null}
      {description ? (
        <Heading level={4} color="offset.1">
          {description}
        </Heading>
      ) : null}
      <Formik
        initialValues={initialValues || {}}
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
