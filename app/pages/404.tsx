import * as React from 'react'
import { GetStaticProps } from 'next'
import { NotFound } from '../src/views/NotFound'
import { requestShopData } from '../src/providers/ShopDataProvider/shopDataQuery'

const NotFoundPage = () => <NotFound />

export const getStaticProps: GetStaticProps = async () => {
  const shopData = await requestShopData()

  return { props: { shopData } }
}

export default NotFoundPage
