// @flow
import { DefaultTheme } from 'styled-components'
import * as layout from './layout'
import * as type from './type'
import * as color from './color'
import * as mediaQueries from './mediaQueries'

export const theme: DefaultTheme = {
	layout,
	type,
	color,
	mediaQueries,
}

export * from './global'
