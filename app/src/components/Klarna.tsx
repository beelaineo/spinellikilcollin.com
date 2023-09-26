/* eslint-disable react/no-unknown-property */
import * as React from 'react'
import { Heading } from './Text'
import { useCurrency } from '../providers/CurrencyProvider'

const { useState, useEffect } = React

interface KlarnaProps {
  price?: {
    amount?: string | number | null
  } | null
}

const toCents = (shopifyPrice: string | number): number =>
  parseInt(shopifyPrice.toString(), 10) * 100

export const Klarna = ({ price }: KlarnaProps) => {
  const { currentCurrency } = useCurrency()
  const [isMounted, setIsMounted] = useState(false)
  if (!price) return null
  const { amount } = price

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // @ts-ignore
    if (window && window.Klarna?.OnsiteMessaging?.refresh) {
      // @ts-ignore
      window.Klarna.OnsiteMessaging.refresh()
    }
  }, [isMounted, amount, currentCurrency])

  if (currentCurrency !== 'USD') return null
  if (!amount) return null
  if (!isMounted) return null

  const cents = toCents(amount)

  return (
    <>
      <style jsx global>{`
        #klarnaPlacement::part(osm-cta) {
          text-decoration: none;
        }
      `}</style>
      {/* @ts-ignore */}
      <klarna-placement
        id="klarnaPlacement"
        data-key="credit-promotion-auto-size"
        data-locale="en-US"
        data-purchase-amount={cents}
      />
    </>
  )
}
