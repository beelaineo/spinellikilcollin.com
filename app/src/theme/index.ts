// @flow
import { DefaultTheme } from '@xstyled/styled-components'
import * as layout from './layout'
import * as font from './font'
import * as color from './color'
import * as mediaQueries from './mediaQueries'
import * as utils from './utils'
import { transition } from './misc'

export const theme: DefaultTheme = {
  layout,
  font,
  color,
  mediaQueries,
  transition,
  utils,
}

export * from './global'
