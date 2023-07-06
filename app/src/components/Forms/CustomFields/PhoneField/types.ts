import { Mask, Option } from '../../Fields/types'

export interface CountryPhoneOption extends Option {
  value: string
  meta: {
    phoneFormat: string
    flagEmoji: string
    dialingCode: string
  }
}
