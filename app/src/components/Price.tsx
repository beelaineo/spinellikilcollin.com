import * as React from 'react'
import { Money, useCurrency } from '../providers/CurrencyProvider'

interface PriceProps {
  price?: Money
  quantity?: number
}

export const Price = ({ price, quantity }: PriceProps) => {
  if (!price || !price.amount) return null
  const { getFormattedPrice } = useCurrency()
  const formattedPrice = getFormattedPrice(price, quantity)
  return <>{formattedPrice}</>
}
