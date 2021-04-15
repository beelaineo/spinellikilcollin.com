import React, { useState, useEffect } from 'react'
import Client from 'shopify-buy'
import { config } from '../../config'

const { 
  SHOPIFY_CHECKOUT_DOMAIN: domain,
  SHOPIFY_STOREFRONT_TOKEN: storefrontAccessToken
} = config




export type CustomUrlTuple = [boolean]

const useBuy = (initialValue?: boolean):CustomUrlTuple => {

  const [ isReady, setReady ] = useState<boolean>(initialValue = false)

  const initialize = (token) => {
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        var client = ShopifyBuy.buildClient({
          domain: 'checkout.spinellikilcollin.com',
          sotrefrontAcessToken: token
        })
      }
    }
  }
  useEffect(() => {

    // Initializing a client to return content in the store's primary language
    const client = Client.buildClient({
      domain,
      storefrontAccessToken
    });

    return [ isReady]
}

export default useBuy
