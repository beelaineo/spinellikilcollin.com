import * as React from 'react'
import { Field as FormikField } from 'formik'
import { FieldProps } from './types'

export const HiddenField = (props: FieldProps) => (
  <FormikField name={props.name}>
    {({ field }) => <input type="hidden" {...field} />}
  </FormikField>
)
