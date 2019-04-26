import * as React from 'react'

interface ShopifyContextValue {
	/* */
}

const initialValue = {
	/* */
}

const ShopifyContext = React.createContext<ShopifyContextValue>(initialValue)

export const ShopifyConsumer = ShopifyContext.Consumer

export const useShopifyContext = () => React.useContext(ShopifyContext)

interface Props {
	children: React.ReactNode
}

export const ShopifyProvider = ({ children }: Props) => {
	const value = {
		/* */
	}

	return <ShopifyContext.Provider value={value}>{children}</ShopifyContext.Provider>
}
