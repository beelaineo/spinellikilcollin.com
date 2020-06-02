import * as React from 'react'
import styled, {
  css,
  DefaultTheme,
  Box,
  BoxProps,
} from '@xstyled/styled-components'

interface CustomTextProps extends BoxProps {
  theme: DefaultTheme
  fontSize: 1 | 2 | 3 | 4 | 5 | 6
  fontStyle?: string
  textDecoration?: string
  family?: 'mono' | 'sans' | 'serif'
  weight?: number
  htmlFor?: string
}

const createTextBase = (as: any) => styled(as)`
  ${({
    family,
    color,
    fontStyle,
    textDecoration,
    weight,
    fontSize,
  }: CustomTextProps) => css`
    font-size: ${fontSize};
    font-family: ${family};
    font-weight: ${weight};
    font-style: ${fontStyle};
    color: ${color};
    text-decoration: ${textDecoration};
    margin: 2 0 0.5em;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      text-decoration: underline;
      color: bronze;
    }

    strong {
      font-weight: 4;
    }

    em {
      font-style: italic;
    }
  `}
`

const TextBase = styled(Box)`
  ${({
    family,
    weight,
    fontStyle,
    textDecoration,
    fontSize,
    color,
  }: CustomTextProps) => css`
    font-size: ${fontSize};
    font-family: ${family};
    font-weight: ${weight};
    font-style: ${fontStyle};
    text-decoration: ${textDecoration};
    margin: 0 0 0.5em;
    color: ${color}

    &:last-child {
      margin-bottom: 0;
    }
    a {
      text-decoration: underline;
      color: bronze;
    }
  `}
`

interface HeadingProps
  extends Omit<CustomTextProps, 'fontSize' | 'theme'>,
    BoxProps {
  children: React.ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  // TODO: type these properly
  style?: any
  as?: any
  htmlFor?: string
}

const hTags = ['h1', 'h2', 'h3', 'h4', 'h5']

export const Heading = ({
  children,
  level,
  weight,
  as,
  htmlFor,
  ...rest
}: HeadingProps) => {
  if (level < 1 || level > 6) throw new Error('Heading level must be 1-5')
  const tag = as ? as : hTags[level - 1]
  return (
    <TextBase
      as={tag}
      fontSize={level}
      weight={weight || 500}
      htmlFor={htmlFor}
      {...rest}
    >
      {children}
    </TextBase>
  )
}

Heading.defaultProps = {
  family: 'serif',
  weight: 3,
}

type PProps = Omit<HeadingProps, 'level'>

export const P = ({ children, color, family, weight, htmlFor }: PProps) => {
  return (
    <TextBase
      as="p"
      fontSize={4}
      family={family}
      weight={weight || 400}
      color={color}
      htmlFor={htmlFor}
      lineHeight="1.3em"
    >
      {children}
    </TextBase>
  )
}

P.defaultProps = {
  family: 'body',
  weight: 300,
}

interface LabelProps {
  htmlFor: string
  children: string
}

const LabelBase = createTextBase('label')

export const Label = styled(LabelBase)`
  font-size: 4;
  color: body.6;
  margin: 0;
`

const SpanBase = styled.spanBox``

export const Span = styled(createTextBase(SpanBase))`
  font-size: inherit;

  &[role='button'] {
    cursor: pointer;
    text-decoration: underline;
  }
`

export const TextAnchor = styled.a``

export const BlockQuote = styled.blockquote``

const listStyles = css`
  margin: 3 0;
  line-height: 1.1em;
  padding-left: 2em;
`

export const Ol = styled.ol`
  ${listStyles};
`

export const Ul = styled.ul`
  ${listStyles};
`
const LiBase = createTextBase('li')

export const Li = styled(LiBase)`
  font-size: 4;
  margin: 0;
`

Li.defaultProps = {
  family: 'body',
  weight: 400,
  color: 'bodyMain',
}

export const Input = styled.input`
  border: 1px solid;
  border-color: body.4;
  font-family: serif;
  font-size: 4;
  width: 100%;
  height: 32px;
  padding: 0 3;

  &:focus {
    border-color: body.6;
  }
`
