import styled, { DefaultTheme } from 'styled-components'

interface WrapperProps {
	theme: DefaultTheme
	active?: boolean
}

export const Wrapper = styled.div`
	${(props: WrapperProps) => `
		width: calc(100% - 4rem);
		max-width: 1200px;
		margin: 0 auto;
	`}
`

export const NormalizeDiv = styled.div`
	${(props: WrapperProps) => `
   		margin: ${props.theme.layout.spacing.small};
	`}
`;

export const FlexContainer = styled.div`
	display: flex;
	justify-content: space-between;
`

export const FlexHalf = styled.div`
	flex-basis: 50%;
	width: 50%;
`

export const Button = styled.button`
	${(props: WrapperProps) => `
	    background-color: ${props.theme.color.semiDark};
		border: 1px solid #4b4b4b;
		color: #fff;
		cursor: pointer;
		display: inline-block;
		font-family: serif;
		font-size: ${props.theme.type.size.h4};
		min-width: 15rem;
		min-height: 4rem;
		letter-spacing: .02em;
		padding: .25rem 1rem;
		text-align: center;
		text-transform: uppercase;
		-webkit-transition: .2s;
		transition: .2s;
		padding: ${props.theme.layout.spacing.small};
   		margin: ${props.theme.layout.spacing.small};
	`}
`;

export const ButtonPrimary = styled(Button)`
	${(props: WrapperProps) => `
		&:hover {
			background-color:${props.theme.color.dark};
		}
	`}
`