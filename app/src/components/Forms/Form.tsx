import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Formik, FormikValues } from 'formik'
import { FormWrapper } from './styled'
import { Heading } from '../Text'

interface FormElementProps {
  isSubmitting: boolean
  disabled?: boolean
}

const FormElement = styled.form<FormElementProps>`
  ${({ isSubmitting, disabled }) =>
    isSubmitting || disabled
      ? css`
          opacity: 0.75;
          pointer-events: none;
        `
      : ''}
`

interface FormProps<Values> {
  id?: string
  title?: string
  description?: string
  disabled?: boolean
  onSubmit: (values: Values) => void | Promise<void>
  onFormStateChange?: (values: Values) => void
  initialValues: Values
  children: React.ReactNode
  validationSchema?: FormikValues['validationSchema']
  enableReinitialize?: boolean
}

export function Form<Values extends FormikValues>({
  id,
  title,
  description,
  onSubmit,
  onFormStateChange,
  disabled,
  initialValues,
  children,
  validationSchema,
  enableReinitialize = false,
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
        onSubmit={(values, actions) => {
          onSubmit(values)
          if (onFormStateChange) {
            onFormStateChange(values)
          }
          actions.setSubmitting(false)
        }}
        validationSchema={validationSchema}
        enableReinitialize={enableReinitialize}
      >
        {({ handleSubmit, values, isSubmitting }) => {
          React.useEffect(() => {
            if (onFormStateChange) {
              onFormStateChange(values)
            }
          }, [values, onFormStateChange])

          return (
            <FormElement
              id={id}
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
