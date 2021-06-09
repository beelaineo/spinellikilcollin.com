import * as React from 'react'
import { GetStaticProps } from 'next'
import { BambuserView } from '../src/views/Bambuser'
import { requestShopData } from '../src/providers/ShopDataProvider/shopDataQuery'

const BambuserPage = () => <BambuserView />

export const getStaticProps: GetStaticProps = async () => {
  const shopData = await requestShopData()

  return { props: { shopData }, revalidate: 60 }
}

export default BambuserPage
