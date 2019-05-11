import * as React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { useSettings } from '../providers/SettingsProvider'
import { Header1 } from 'Components/Text'

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
		</Nav>
	)
}
