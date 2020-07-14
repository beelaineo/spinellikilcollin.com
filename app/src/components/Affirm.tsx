import * as React from 'react'
import { Heading } from './Text'
import { useCurrency } from '../providers/CurrencyProvider'

const { useState, useEffect } = React

interface AffirmProps {
  price?: {
    amount?: string | number | null
  } | null
}

const toCents = (shopifyPrice: string | number): number =>
  parseInt(shopifyPrice.toString(), 10) * 100

export const Affirm = ({ price }: AffirmProps) => {
  const { currentCurrency } = useCurrency()
  const [isMounted, setIsMounted] = useState(false)
  if (!price) return null
  const { amount } = price

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (currentCurrency !== 'USD') return
    // @ts-ignore
    if (window && window.affirm && window.affirm.ui.refresh) {
      // @ts-ignore
      window.affirm.ui.refresh()
    }
  }, [isMounted, amount, currentCurrency])

  if (currentCurrency !== 'USD') return null
  if (!amount) return null
  if (!isMounted) return null

  const cents = toCents(amount)

  return (
    <Heading level={5} weight={2} my={0}>
      <span
        style={{ display: 'block' }}
        className="affirm-as-low-as"
        data-amount={cents}
        data-affirm-color="black"
      />
    </Heading>
  )
}
