import { createGlobalStyle } from '@xstyled/styled-components'
import normalized from './normalized'

export const GlobalStyles = createGlobalStyle`

	${normalized}

	* {
		box-sizing: border-box;
	}

	body {
		font-family: serif;
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
