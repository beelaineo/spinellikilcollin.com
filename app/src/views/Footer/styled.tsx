import styled, { css, DefaultTheme } from 'styled-components'

export const Footer = styled.footer`
	transition: 250ms ease;
	width: 100%;
	${({ theme }) => css`
		padding: ${theme.layout.spacing.triple} 0;
		.footer-inner {
			margin: 0 auto;
			max-width: 1200px;
			> div {
				padding: ${theme.layout.spacing.triple} 0;
				border-top: 2px solid ${theme.color.light};
			}
		}
		.upper-footer {
			display: grid;
			grid-template-columns: 2fr 2fr 4fr;
		}
		.lower-footer {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
		ul {
			list-style: none;
			padding: 0;
			li {
				margin: 0 0 ${theme.layout.spacing.double} 0;
				font-size: ${theme.font.size.h5};
			}
		}
	`}
`
