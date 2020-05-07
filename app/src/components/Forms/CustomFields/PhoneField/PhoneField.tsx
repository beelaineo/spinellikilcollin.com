import * as React from 'react'
import { useFormikContext } from 'formik'
import { FieldProps } from '../../Fields'
import { Field } from '../../Fields'
import { Input } from '../../Fields/Input'
import { CountryCodeSelector } from './CountryCodeSelector'
import {
  countryOptions,
  placeholderFromPhoneFormat,
  maskFromPhoneFormat,
  createValidator,
} from './utils'

type PhoneFieldProps = Omit<FieldProps, 'type' | 'placeholder'>

export const PhoneField = (props: PhoneFieldProps) => {
  const { values } = useFormikContext()
  const options = countryOptions
  const currentOption = options.find((o) => o.value === values.phoneCountryCode)
  const mask = maskFromPhoneFormat(currentOption?.meta?.phoneFormat)
  const placeholder = placeholderFromPhoneFormat(
    currentOption?.meta?.phoneFormat,
  )
  const validate = createValidator(currentOption?.meta?.phoneFormat)
  return (
    <Field type="text" {...props}>
      <Input
        type="text"
        label={props.label}
        required={props.required}
        name={props.name}
        validate={validate}
        placeholder={placeholder}
        mask={mask}
        renderBeforeInput={() => (
          <CountryCodeSelector
            currentOption={currentOption}
            name="phoneCountryCode"
            options={options}
          />
        )}
      />
    </Field>
  )
}
