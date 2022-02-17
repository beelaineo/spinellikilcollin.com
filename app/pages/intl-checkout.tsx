import * as React from 'react'
import { GetStaticProps } from 'next'
import { InternationalCheckout } from '../src/views/InternationalCheckout'
import { requestShopData } from '../src/providers/ShopDataProvider/shopDataQuery'

const InternationalCheckoutPage = () => <InternationalCheckout />

export const getStaticProps: GetStaticProps = async () => {
  const shopData = await requestShopData()

  return { props: { shopData }, revalidate: 60 }
}

export default InternationalCheckoutPage
