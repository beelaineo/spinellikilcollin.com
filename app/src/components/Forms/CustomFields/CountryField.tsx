import * as React from 'react'
import { FieldProps } from '../Fields/types'
import { Field } from '../Fields'
import { countryOptions } from './countryOptions'

type CountryFieldProps = Omit<FieldProps, 'type'>

export const CountryField = (props: CountryFieldProps) => {
  return <Field type="select" {...props} options={countryOptions} />
}
