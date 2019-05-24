import * as React from 'react'
import styled, { css } from 'styled-components'
import { useCheckout } from 'use-shopify'
import { Link } from 'react-router-dom'
import { Placeholder } from 'Components/Placeholder'
import { Header1 } from 'Components/Text'
import { unwindEdges } from 'Utils/graphql'
import { useSettings } from '../providers/SettingsProvider'

export const Nav = styled.nav`
	${({ theme }) => css`
		padding: ${theme.layout.spacing.single};
		text-align: center;
		font-family: ${theme.font.family.sans};
	`}
`

export const NavLinks = styled.div`
	display: flex;
	justify-content: center;
`

export const Navigation = () => {
	const { checkout } = useCheckout()
	const lineItems = checkout ? unwindEdges(checkout.lineItems)[0] : []
	const { ready, collections } = useSettings()
	if (!ready) return null
	return (
		<Nav>
			<Header1>Spinelli Kilcollin</Header1>
			{collections.map((collection) => (
				<Link key={collection.id} to={`/collections/${collection.handle}`}>
					{collection.title}
				</Link>
			))}
			<Placeholder>
				<Link to="/checkout">{lineItems.length} items in your cart</Link>
			</Placeholder>
		</Nav>
	)
}
