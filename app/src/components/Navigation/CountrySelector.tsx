import * as React from 'react'
import styled from '@xstyled/styled-components'
import { useCountry } from '../../providers/CountryProvider'
import { Form } from '../Forms'
import { SelectElement } from '../Forms/Fields/styled'
import { CurrencySelectorWrapper } from './styled'
import {
  ShopifyStorefrontCurrencyCode,
  ShopifyStorefrontCountryCode,
} from '../../types/generated-shopify'

const SelectField = styled(SelectElement)`
  color: body.8;
  border: none;
  min-width: initial;
  padding: 0 4 0 3;
  height: auto;
`

/* prettier-ignore */
const invalidOptions = [
  "AF","AL","DZ","AO","AR","AM","AW","BB","AZ","BD","BS","BH","BI","BY","BZ","BM","BT","BA","BO","BW","BN","MM","KH","CV","KY","XA","CL","CO","KM","CD","CR","DO","XC","EG","ET","XP","FJ","GM","GH","GT","GY","GE","HT","HN","IQ","JM","JE","JO","KZ","KE","KW","KG","LA","LV","LB","LS","LR","LT","MG","MK","MO","MW","MV","MU","MD","MA","MN","MZ","NA","NP","AN","NI","NG","OM","PA","PK","PG","PY","PE","QA","RW","WS","SA","ST","RS","SC","SD","SY","SS","SB","LK","SR","SZ","TW","TZ","TT","TN","TM","UG","UA","AE","UY","UZ","VU","VE","VN","XO","YE","ZM"
]

const countryOptions = Object.values(ShopifyStorefrontCountryCode)
  .filter((v) => !invalidOptions.includes(v))
  .map((value) => ({ label: value, value, id: value }))

interface CountrySelectorProps {
  colorTheme?: 'light' | 'dark'
}

export const CountrySelector = ({ colorTheme }: CountrySelectorProps) => {
  const { loading, currentCountry, updateCountry } = useCountry()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    updateCountry(value)
  }

  const handleSubmit = ({ country }) => {
    updateCountry(country)
  }
  const initialValues = {
    country: currentCountry,
  }

  return (
    <CurrencySelectorWrapper colorTheme={colorTheme}>
      <Form
        disabled={loading}
        onSubmit={handleSubmit}
        initialValues={initialValues}
      >
        <SelectField
          name="country"
          color="body.8"
          onChange={handleChange}
          aria-label="Select Country"
          value={currentCountry}
        >
          {countryOptions.map(({ id, value, label }) => (
            <option key={id} id={id} value={value}>
              {label}
            </option>
          ))}
        </SelectField>
      </Form>
    </CurrencySelectorWrapper>
  )
}
