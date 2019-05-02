import * as React from 'react'
import { Link } from 'react-router-dom'
import { useSettings } from '../providers/SettingsProvider'

export const Navigation = () => {
	const { ready, collections } = useSettings()
	if (!ready) return null
	return (
		<nav>
			{collections.map((collection) => (
				<Link key={collection.id} to={`/collections/${collection.handle}`}>
					{collection.title}
				</Link>
			))}
		</nav>
	)
}
