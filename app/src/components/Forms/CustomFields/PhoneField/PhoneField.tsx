import * as React from 'react'
import { useFormikContext } from 'formik'
import { FieldProps } from '../../Fields'
import { Field } from '../../Fields'
import { Input } from '../../Fields/Input'
import { CountryCodeSelector } from './CountryCodeSelector'
import {
  getCountryOptions,
  CountryPhoneOption,
  placeholderFromPhoneFormat,
  createValidator,
} from './utils'

type PhoneFieldProps = Omit<FieldProps, 'type' | 'placeholder'>

const { useState, useEffect } = React

interface Values {
  phoneCountryCode: string
}

export const PhoneField = (props: PhoneFieldProps) => {
  const [ready, setReady] = useState(false)
  const [countryOptions, setCountryOptions] = useState<CountryPhoneOption[]>([])

  useEffect(() => {
    const load = async () => {
      const options = await getCountryOptions()
      setCountryOptions(options)
      setReady(true)
    }
    load()
  }, [])
  const { values } = useFormikContext<Values>()
  if (!ready) return null
  const options = countryOptions
  const currentOption = options.find((o) => o.value === values.phoneCountryCode)
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
