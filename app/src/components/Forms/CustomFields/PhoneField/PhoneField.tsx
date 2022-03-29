import * as React from 'react'
import { useFormikContext } from 'formik'
import { HiddenField } from '../../Fields/HiddenField'
import { FieldProps } from '../../Fields/types'
import { Input } from '../../Fields/Input'
import { CountryCodeSelector } from './CountryCodeSelector'
import {
  getCountryOptions,
  placeholderFromPhoneFormat,
  maskFromPhoneFormat,
  createValidator,
} from './utils'
import { CountryPhoneOption } from './types'

type PhoneFieldProps = Omit<FieldProps, 'type' | 'placeholder'>

const { useState, useEffect } = React

interface Values {
  phoneCountryCode: string
}

export const PhoneField = (props: PhoneFieldProps) => {
  const [countryOptions, setCountryOptions] = useState<CountryPhoneOption[]>([])

  const { values, setFieldValue } = useFormikContext<Values>()
  const options = countryOptions
  const currentOption = options.find((o) => o.value === values.phoneCountryCode)
  const { dialingCode, phoneFormat } = currentOption?.meta || {}
  const placeholder = placeholderFromPhoneFormat(phoneFormat)
  const validate = createValidator(phoneFormat)
  const mask = maskFromPhoneFormat(phoneFormat)

  useEffect(() => {
    const load = async () => {
      const options = await getCountryOptions()
      setCountryOptions(options)
    }
    load()
  }, [])

  useEffect(() => {
    if (!dialingCode) return
    setFieldValue('dialingCode', dialingCode)
  }, [dialingCode])
  const value = values[props.name]

  return (
    <>
      <Input
        type="tel"
        label={props.label}
        required={props.required}
        name={props.name}
        validate={validate}
        placeholder={placeholder}
        mask={mask}
        renderBeforeInput={() => (
          <CountryCodeSelector
            currentValue={value}
            currentOption={currentOption}
            name="phoneCountryCode"
            options={options}
          />
        )}
      />
      <HiddenField name="dialingCode" />
    </>
  )
}
