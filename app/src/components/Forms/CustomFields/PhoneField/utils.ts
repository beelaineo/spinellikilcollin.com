import { FieldValidator } from 'formik'
import { Mask } from '../../Fields/types'
import { CountryPhoneOption } from './types'

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

export const getCountryOptions = async (): Promise<CountryPhoneOption[]> => {
  const countryData = await import('../../../../data/countries.json')
  return countryData.default
    .filter(
      (country) =>
        Boolean(country.dialingCode) && country?.phoneFormat !== '#N/A',
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
}
