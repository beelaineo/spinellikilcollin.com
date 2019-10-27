import styled, { css, DefaultTheme } from 'styled-components'

export interface TextStyleProps {
  theme: DefaultTheme
  align?: 'left' | 'center' | 'right'
  weight?: 'xlight' | 'light' | 'book' | 'normal' | 'semi' | 'strong'
  color?: string
  family?: string
  transform?: string
  children: any
  margin?: string
  small?: string
}

const commonHeaderStyles = ({
  theme,
  align,
  transform,
  weight,
  color,
  family,
  margin,
  children,
  small,
}: TextStyleProps) => css`
  font-weight: ${theme.font.weight[weight]
    ? theme.font.weight[weight]
    : family === 'serif'
    ? theme.font.weight.normal
    : theme.font.weight.semi};
  font-family: ${theme.font.family[family] || theme.font.family.sans};
  color: ${theme.color[color] || 'inherit'};
  text-align: ${align || 'inherit'};
  text-transform: ${transform || 'auto'};
  margin: ${margin || '0.3em 0'};
  letter-spacing: 0.75px;

  p {
    letter-spacing: 1px;
  }
  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const Header1 = styled.h2`
  ${(props: TextStyleProps) => css`
		${commonHeaderStyles(props)}
		font-size: ${props.theme.font.size.h2};
		font-family: ${props.theme.font.family.serif};
		font-weight: ${props.theme.font.weight.normal};
		${props.theme.mediaQueries.tablet} {
			font-size: calc(${props.theme.font.size.h2} * 0.8);
		}
		${props.theme.mediaQueries.phone} {
			font-size: calc(${props.theme.font.size.h2} * 0.7);
		}
	`};
`

export const Header2 = styled.h2`
  ${(props: TextStyleProps) => css`
    ${commonHeaderStyles(props)};
    font-family: ${props.theme.font.family.serif};
    font-weight: ${props.theme.font.weight.normal};

    ${props.theme.mediaQueries.tablet} {
      font-size: calc(${props.theme.font.size.h2} * 0.8);
    }
    ${props.theme.mediaQueries.phone} {
      font-size: calc(${props.theme.font.size.h2} * 0.7);
    }
  `};
`

export const Header3 = styled.h3`
  ${(props: TextStyleProps) => css`
    ${commonHeaderStyles(props)};
    font-size: ${props.theme.font.size.h3};
    font-family: ${props.theme.font.family.serif};
    ${props.theme.mediaQueries.tablet} {
      font-size: calc(${props.theme.font.size.h3} * 0.8);
    }
    ${props.theme.mediaQueries.phone} {
      font-size: calc(${props.theme.font.size.h3} * 0.6);
    }
  `};
`

export const Header4 = styled.h4`
  ${(props: TextStyleProps) => css`
    ${commonHeaderStyles(props)};
    font-size: ${props.theme.font.size.h4};
    letter-spacing: 0.05em;
    font-family: ${props.theme.font.family.serif};
    ${props.theme.mediaQueries.tablet} {
      font-size: calc(${props.theme.font.size.h4} * 0.8);
    }
  `};
`

export const Header4Italic = styled.h4`
  ${(props: TextStyleProps) => css`
    ${commonHeaderStyles(props)};
    font-size: ${props.theme.font.size.h4};
    letter-spacing: 0.05em;
    color: ${props.theme.color.dark};
    font-family: ${props.theme.font.family.serif};
    margin: ${props.theme.layout.spacing.small} 0;
    ${props.theme.mediaQueries.tablet} {
      font-size: calc(${props.theme.font.size.h4} * 0.8);
    }
  `};
`

export const Header5 = styled.h5`
  ${(props: TextStyleProps) => css`
    ${commonHeaderStyles(props)};
    margin: ${props.theme.layout.spacing.double} 0;
    letter-spacing: 0.05em;
    font-family: ${props.theme.font.family.serif};
    font-size: ${props.theme.font.size.h5};
  `};
`

export const Header6 = styled.h6`
  ${(props: TextStyleProps) => css`
    ${commonHeaderStyles(props)};
    letter-spacing: 0.05em;
    font-size: ${props.theme.font.size.h6};
  `};
`

export const P = styled.p`
  ${({ theme, align }: TextStyleProps) => css`
    text-align: ${align || 'inherit'};
    margin: 0.5em 0;
    font-size: ${theme.font.size.p};
    font-family: ${theme.font.family.serif};

    /* & + ${P} {
      margin-top: 1em;
    } */

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  `};
`

export const TextAnchor = styled.a`
  ${({ theme }) => `
		color: ${theme.color.pink};
	`};
`

export const BlockQuote = styled.blockquote``

const listStyles = css`
  ${({ theme }) => `
		margin: ${theme.layout.spacing.single} 0;
		padding-left: 2em;
	`};
`

export const Ol = styled.ol`
  ${listStyles};
`

export const Ul = styled.ul`
  ${listStyles};
`

export const Li = styled.li`
  & > ${Ol}, & > ${Ul} {
    margin: 0;
  }
`

export const Input = styled.input`
  ${({ theme }) => `
		border: 1px solid ${theme.color.lightGrayBody};
		width: 100%;
		padding: ${theme.layout.spacing.small};
		text-transform: lowercase;
		font-family: ${theme.font.family.serif};
	`};
`

export const Form = styled.form`
  ${({ theme }) => `
		position: relative;
		[type='submit'] {
				position: absolute;
				right: 12px;
				top: 14px;
				color: ${theme.color.lightGrayBody};
			}
	`};
`
