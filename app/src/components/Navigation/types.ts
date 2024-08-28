export interface Option {
  value: string | number
  id: string
  label: string | number
  disabled?: boolean
}

export interface CountryOption extends Option {
  value: string
  meta: {
    flagEmoji: string
    currencyCode: string
  }
}
