import * as React from 'react'
import { Money, useCurrency } from '../providers/CurrencyProvider'
import { Maybe, ShopifyPrice, ShopifyStorefrontMoneyV2 } from '../types'

interface PriceProps {
  price?: Maybe<ShopifyPrice | ShopifyStorefrontMoneyV2>
  quantity?: number
  style?: 'full' | 'pretty'
}

export const Price = ({ price, quantity, style }: PriceProps) => {
  if (!price || !price.amount || price.currencyCode === 'NONE') return null
  const { getFormattedPrice } = useCurrency()
  const formattedPrice = getFormattedPrice(price, quantity, style)
  return <>{formattedPrice}</>
}
