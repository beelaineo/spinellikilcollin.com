import { MoneyV2 } from 'use-shopify'
import { ShopifyMoneyV2 } from '../types'

export const formatMoney = (
  { amount, currencyCode }: ShopifyMoneyV2 | MoneyV2,

  multiply: number = 1,
): string => {
  if (!amount) throw new Error('You must supply an amount')
  if (!currencyCode) throw new Error('You must supply a currencyCode')
  const parsedAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  })
    .format(parsedAmount * multiply)
    .replace(/\.00$/, '')
}
