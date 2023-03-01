import * as React from 'react'
import { Money, useCurrency } from '../providers/CurrencyProvider'
import { MoneyV2 } from '../providers/ShopifyProvider/types'
import { Maybe, ShopifyStorefrontMoneyV2 } from '../types'

interface PriceProps {
  price?: Maybe<Money> | ShopifyStorefrontMoneyV2
  quantity?: number
  style?: 'full' | 'pretty'
}

export const Price = ({ price, quantity, style }: PriceProps) => {
  console.log('PRICE COMPONENT', price)
  if (!price || !price.amount || price.currencyCode === 'NONE') return null
  const { getFormattedPrice } = useCurrency()
  const formattedPrice = getFormattedPrice(price, quantity, style)
  return <>{formattedPrice}</>
}
