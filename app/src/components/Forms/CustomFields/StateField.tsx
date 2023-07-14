import * as React from 'react'
import { useFormikContext } from 'formik'
import { FieldProps } from '../Fields/types'
import { Field } from '../Fields'
import states from '../../../data/states.json'

type StateFieldProps = Omit<FieldProps, 'type'>

const options = states.map(({ English }) => ({
  id: English,
  label: English,
  value: English,
}))

interface Values {
  country: string
  state: string
}

export const StateField = (props: StateFieldProps) => {
  const { values } = useFormikContext<Values>()
  if (values?.country === 'United States') {
    return <Field type="select" {...props} options={options} />
  }
  return <Field {...props} label="State/Province/Region" placeholder="Region" />
}
