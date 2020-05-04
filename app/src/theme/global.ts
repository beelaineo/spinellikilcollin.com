import { createGlobalStyle } from '@xstyled/styled-components'
import normalized from './normalized'
import fontFaces from './fontFaces'
import { defaultTheme } from './defaultTheme'

export const GlobalStyles = createGlobalStyle`

	${normalized}
	${fontFaces}

	* {
		box-sizing: border-box;
	}

	body {
		font-family: serif;
		color: ${defaultTheme.colors.body};
		overflow-x: hidden;
	}

	button, input, select, option, textarea {
    font: serif;
		background: white;
		font-weight: 300;
		border: none;
		outline: none;
		line-height: normal;
		padding: 0;
		border-radius: 0;
	}

	img {
		max-width: 100%;
	}

	button {
		cursor: pointer;
    border: none;
    font-family: inherit;
    background-color: transparent;
	}

  a {
    color: inherit;
    text-decoration: none;
  }
`
