import * as React from 'react'
import { useFormikContext } from 'formik'
import { FieldProps } from '../Fields'
import { Field } from '../Fields'

type StateFieldProps = Omit<FieldProps, 'type'>
const options = [
  { id: 'Alabama', label: 'Alabama', value: 'Alabama' },
  { id: 'Alaska', label: 'Alaska', value: 'Alaska' },
  { id: 'Arizona', label: 'Arizona', value: 'Arizona' },
  { id: 'Arkansas', label: 'Arkansas', value: 'Arkansas' },
  { id: 'California', label: 'California', value: 'California' },
  { id: 'Colorado', label: 'Colorado', value: 'Colorado' },
  { id: 'Connecticut', label: 'Connecticut', value: 'Connecticut' },
  { id: 'Delaware', label: 'Delaware', value: 'Delaware' },
  { id: 'Florida', label: 'Florida', value: 'Florida' },
  { id: 'Georgia', label: 'Georgia', value: 'Georgia' },
  { id: 'Hawaii', label: 'Hawaii', value: 'Hawaii' },
  { id: 'Idaho', label: 'Idaho', value: 'Idaho' },
  { id: 'Illinois', label: 'Illinois', value: 'Illinois' },
  { id: 'Indiana', label: 'Indiana', value: 'Indiana' },
  { id: 'Iowa', label: 'Iowa', value: 'Iowa' },
  { id: 'Kansas', label: 'Kansas', value: 'Kansas' },
  { id: 'Kentucky', label: 'Kentucky', value: 'Kentucky' },
  { id: 'Louisiana', label: 'Louisiana', value: 'Louisiana' },
  { id: 'Maine', label: 'Maine', value: 'Maine' },
  { id: 'Maryland', label: 'Maryland', value: 'Maryland' },
  { id: 'Massachusetts', label: 'Massachusetts', value: 'Massachusetts' },
  { id: 'Michigan', label: 'Michigan', value: 'Michigan' },
  { id: 'Minnesota', label: 'Minnesota', value: 'Minnesota' },
  { id: 'Mississippi', label: 'Mississippi', value: 'Mississippi' },
  { id: 'Missouri', label: 'Missouri', value: 'Missouri' },
  { id: 'Montana', label: 'Montana', value: 'Montana' },
  { id: 'Nebraska', label: 'Nebraska', value: 'Nebraska' },
  { id: 'Nevada', label: 'Nevada', value: 'Nevada' },
  { id: 'New Hampshire', label: 'New Hampshire', value: 'New Hampshire' },
  { id: 'New Jersey', label: 'New Jersey', value: 'New Jersey' },
  { id: 'New Mexico', label: 'New Mexico', value: 'New Mexico' },
  { id: 'New York', label: 'New York', value: 'New York' },
  { id: 'North Carolina', label: 'North Carolina', value: 'North Carolina' },
  { id: 'North Dakota', label: 'North Dakota', value: 'North Dakota' },
  { id: 'Ohio', label: 'Ohio', value: 'Ohio' },
  { id: 'Oklahoma', label: 'Oklahoma', value: 'Oklahoma' },
  { id: 'Oregon', label: 'Oregon', value: 'Oregon' },
  { id: 'Pennsylvania', label: 'Pennsylvania', value: 'Pennsylvania' },
  { id: 'Rhode Island', label: 'Rhode Island', value: 'Rhode Island' },
  { id: 'South Carolina', label: 'South Carolina', value: 'South Carolina' },
  { id: 'South Dakota', label: 'South Dakota', value: 'South Dakota' },
  { id: 'Tennessee', label: 'Tennessee', value: 'Tennessee' },
  { id: 'Texas', label: 'Texas', value: 'Texas' },
  { id: 'Utah', label: 'Utah', value: 'Utah' },
  { id: 'Vermont', label: 'Vermont', value: 'Vermont' },
  { id: 'Virginia', label: 'Virginia', value: 'Virginia' },
  { id: 'Washington', label: 'Washington', value: 'Washington' },
  { id: 'West Virginia', label: 'West Virginia', value: 'West Virginia' },
  { id: 'Wisconsin', label: 'Wisconsin', value: 'Wisconsin' },
  { id: 'Wyoming', label: 'Wyoming', value: 'Wyoming' },
]

interface Values {
  country: string
  state: string
}

export const StateField = (props: StateFieldProps) => {
  const { values } = useFormikContext<Values>()
  if (values?.country === 'United States') {
    return <Field type="select" {...props} options={options} />
  }
  return <Field {...props} label="State/Region" placeholder="Region" />
}
