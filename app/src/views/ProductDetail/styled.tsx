import styled, { DefaultTheme } from 'styled-components'

interface WrapperProps {
	theme: DefaultTheme
	active?: boolean
}

export const Wrapper = styled.div`
	${(props: WrapperProps) => `
		border: ${props.active ? '1px solid blue' : 'none'};
		color: ${props.theme.color.green};
	`}
`
