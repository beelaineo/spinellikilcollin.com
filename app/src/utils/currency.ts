import { MoneyV2 } from 'use-shopify'
import { ShopifyMoneyV2 } from '../types'

export const formatMoney = ({
  amount,
  currencyCode,
}: ShopifyMoneyV2 | MoneyV2): string => {
  if (!amount) throw new Error('You must supply an amount')
  if (!currencyCode) throw new Error('You must supply a currencyCode')
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  })
    .format(typeof amount === 'string' ? parseFloat(amount) : amount)
    .replace(/\.00$/, '')
}
