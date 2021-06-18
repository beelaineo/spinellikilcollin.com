import * as React from 'react'
import { GetStaticProps } from 'next'
import BambuserSample from '../src/views/Bambuser/BambuserSample'
import { requestShopData } from '../src/providers/ShopDataProvider/shopDataQuery'

const BambuserPage = () => <BambuserSample />

export const getStaticProps: GetStaticProps = async () => {
  const shopData = await requestShopData()

  return { props: { shopData }, revalidate: 60 }
}

export default BambuserPage
