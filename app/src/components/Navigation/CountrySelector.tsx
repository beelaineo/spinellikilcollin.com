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
import { useWait } from '../../hooks'

import { CountryOption } from './types'
import { Maybe } from '../../types'

const { useState, useEffect } = React

const SelectField = styled(SelectElement)`
  color: body.8;
  border: none;
  min-width: initial;
  padding: 0 4 0 3;
  height: auto;
  @media (max-width: 768px) {
    opacity: 0;
    position: absolute;
    top: 0;
  }
`

const FlagWrapper = styled('div')`
  display: none;

  font-size: 22;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 650px) {
    font-size: 20;
    margin: 0 2;
  }
  @media (max-width: 370px) {
    font-size: 16;
    margin: 0;
  }
`

/* prettier-ignore */
const invalidOptions = [
  "AF","AL","DZ","AO","AR","AM","AW","BB","AZ","BD","BS","BH","BI","BY","BZ","BM","BT","BA","BO","BW","BN","MM","KH","CV","KY","XA","CL","CO","KM","CD","CR","DO","XC","EG","ET","XP","FJ","GM","GH","GT","GY","GE","HT","HN","IQ","JM","JE","JO","KZ","KE","KW","KG","LA","LV","LB","LS","LR","LT","MG","MK","MO","MW","MV","MU","MD","MA","MN","MZ","NA","NP","AN","NI","NG","OM","PA","PK","PG","PY","PE","QA","RW","WS","SA","ST","RS","SC","SD","SY","SS","SB","LK","SR","SZ","TW","TZ","TT","TN","TM","UG","UA","AE","UY","UZ","VU","VE","VN","XO","YE","ZM"
]

const countryOptions = async (): Promise<CountryOption[]> => {
  const countryData = await import('../../data/countries.json')
  return countryData.default
    .filter((country) => Boolean(country.currencyCode))
    .map(({ countryCode, english, ...meta }) => {
      const label = [meta.flagEmoji, english].join('  ')
      const id = [countryCode, english].join('-')
      return {
        value: countryCode,
        meta: {
          ...meta,
        },
        id,
        label,
      }
    })
}

interface CountrySelectorProps {
  $colorTheme?: 'light' | 'dark'
}

export const CountrySelector = ({ $colorTheme }: CountrySelectorProps) => {
  const wait = useWait()

  const [options, setOptions] = useState<CountryOption[]>([])
  const [country, setCountry] = useState<ShopifyStorefrontCountryCode>(
    ShopifyStorefrontCountryCode.Us,
  )
  const {
    loading,
    currentCountry,
    updateCountry,
    isHighlighted,
    setIsHighlighted,
  } = useCountry()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const countryKey = value.slice(0, 1) + value[1].toLowerCase()
    updateCountry(ShopifyStorefrontCountryCode[countryKey])
  }

  const handleSubmit = ({ country }) => {
    updateCountry(country)
  }
  const initialValues = {
    country: country,
  }

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0))
    return String.fromCodePoint(...codePoints)
  }

  useEffect(() => {
    countryOptions().then((options) => {
      setOptions(options)
    })
  }, [])

  useEffect(() => {
    if (isHighlighted === 'isVisible') {
      wait(1200)
        .then(() => {
          setIsHighlighted('isHidden')
        })
        .then(() => {
          wait(300).then(() => {
            setIsHighlighted(null)
          })
        })
    }
  }, [isHighlighted])

  useEffect(() => {
    const countryKey =
      currentCountry.slice(0, 1) + currentCountry[1].toLowerCase()
    setCountry(ShopifyStorefrontCountryCode[countryKey])
  }, [currentCountry])

  return (
    <>
      <CurrencySelectorWrapper
        $isHighlighted={isHighlighted}
        $colorTheme={$colorTheme}
        id={'currency-select'}
      >
        <Form
          disabled={loading}
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {country && (
            <FlagWrapper>
              <label htmlFor="country">{getFlagEmoji(country)}</label>
            </FlagWrapper>
          )}
          <SelectField
            name="country"
            color="body.8"
            onChange={handleChange}
            aria-label="Select Country"
            value={country}
          >
            {options.map(({ id, value, label }) => (
              <option key={id} id={id} value={value}>
                {label}
              </option>
            ))}
          </SelectField>
        </Form>
      </CurrencySelectorWrapper>
    </>
  )
}
