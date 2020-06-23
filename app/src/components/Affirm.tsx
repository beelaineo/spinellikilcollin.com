import * as React from 'react'
import { Heading } from './Text'

const { useState, useEffect } = React

interface AffirmProps {
  price?: {
    amount?: string | number | null
  } | null
}

const toCents = (shopifyPrice: string | number): number =>
  parseInt(shopifyPrice.toString(), 10) * 100

export const Affirm = ({ price }: AffirmProps) => {
  const [isMounted, setIsMounted] = useState(false)
  if (!price) return null
  const { amount } = price

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    // @ts-ignore
    if (window && window.affirm && window.affirm.ui.refresh) {
      // @ts-ignore
      window.affirm.ui.refresh()
    }
  }, [isMounted, amount])

  if (!amount) return null
  if (!isMounted) return null

  const cents = toCents(amount)

  return (
    <Heading level={4} weight={2} my={0}>
      <span
        style={{ display: 'block' }}
        className="affirm-as-low-as"
        data-amount={cents}
        data-affirm-color="black"
      />
    </Heading>
  )
}
