import { createGlobalStyle } from 'styled-components'
import normalized from './normalized'
import { semiDark } from './color'

export const GlobalStyles = createGlobalStyle`
	${normalized}

	* {
		box-sizing: border-box;
	}

	@font-face {
		font-family: 'Leitura News Roman';
		src: url('/static/fonts/LeituraNewsRoman.woff') format('woff2');
		font-style: italic;
		font-weight: 100;
	}

	body {
		font-family: ${({ theme }) => theme.font.family.serif};
		color: ${semiDark};
	}

	button, input, select, option, textarea {
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
	}
`
