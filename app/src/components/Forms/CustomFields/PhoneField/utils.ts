import { FieldValidator } from 'formik'
import { Mask, Option } from '../../Fields'
import countries from '../../../../data/countries.json'

export const maskFromPhoneFormat = (format?: string): undefined | Mask =>
  format && format !== '#N/A'
    ? format.split('').map((char) => (/\d/.test(char) ? /\d/ : char))
    : undefined

export const placeholderFromPhoneFormat = (
  format?: string,
): undefined | string =>
  format && format !== '#N/A' ? format.replace(/\d/g, '5') : undefined

export const createValidator = (
  format?: string,
): undefined | FieldValidator => {
  if (!format) return undefined
  const charLength = format.replace(/\D/g, '').length
  if (charLength === 0) return undefined
  return (value: string) => {
    if (!value) return 'Required'
    const trimmed = value.replace(/\D/g, '')
    if (trimmed.length !== charLength) return `Must be ${charLength} digits`
    return undefined
  }
}

export interface CountryPhoneOption extends Option {
  value: string
  meta: {
    phoneFormat: string
    flagEmoji: string
    dialingCode: string
  }
}

export const countryOptions: CountryPhoneOption[] = countries
  .filter(
    (country) =>
      country?.flags &&
      (country.flags === '' || country.flags.includes('phone_only')),
  )
  .map(({ countryCode, english, dialingCode, ...meta }) => {
    const label = [english, meta.flagEmoji, `+ ${dialingCode}`].join('  ')
    const id = [countryCode, english].join('-')
    return {
      value: countryCode,
      meta: {
        dialingCode: dialingCode.toString(),
        ...meta,
      },
      id,
      label,
    }
  })
