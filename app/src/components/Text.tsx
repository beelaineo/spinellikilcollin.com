import * as React from 'react'
import styled, { css, x, ITheme, system } from '@xstyled/styled-components'

import { DefaultTheme } from 'styled-components'

interface CustomTextProps extends ITheme {
  theme: DefaultTheme
  level?: number
  fontStyle?: string
  textDecoration?: string
  family?: 'mono' | 'sans' | 'serif'
  weight?: number
  htmlFor?: string
}

const getCustomTextStyles = ({
  family,
  color,
  fontStyle,
  textDecoration,
  weight,
}: CustomTextProps) => css`
  font-family: ${family};
  font-weight: ${weight};
  font-style: ${fontStyle};
  color: ${color};
  white-space: pre-line;
  text-decoration: ${textDecoration};
`

const createTextBase = (as: any) => styled(as)<CustomTextProps>`
  ${(props) => css`
    ${getCustomTextStyles(props)}
    line-height: 1.4em;
    margin: 2 0 0.5em;
    position: relative;

    strong {
      font-weight: 4;
    }

    em {
      font-style: italic;
    }
    ${system}
  `}
`

const TextBase = createTextBase(x.div)

interface HeadingProps
  extends Omit<CustomTextProps, 'fontSize' | 'theme'>,
    ITheme {
  children: React.ReactNode
  level: number
  // TODO: type these properly
  style?: any
  as?: any
  htmlFor?: string
}

const hTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export const Heading = ({
  children,
  level,
  weight,
  as,
  htmlFor,
  ...rest
}: HeadingProps) => {
  if (level < 0 || level > 6) throw new Error('Heading level must be 0-5')
  const tag = as ? as : hTags[level - 1] || hTags[0]
  return (
    <TextBase
      as={tag}
      level={level}
      weight={weight}
      htmlFor={htmlFor}
      {...rest}
    >
      {children}
    </TextBase>
  )
}

Heading.defaultProps = {
  family: 'serif',
  weight: 2,
}

type PProps = Omit<HeadingProps, 'level'>

export const P = ({
  children,
  color,
  family,
  weight,
  htmlFor,
  ...rest
}: PProps) => {
  return (
    <TextBase
      as="p"
      level={5}
      family={family}
      weight={weight}
      color={color}
      htmlFor={htmlFor}
      {...rest}
    >
      {children}
    </TextBase>
  )
}

P.defaultProps = {
  family: 'serif',
  weight: 3,
}

interface LabelProps {
  htmlFor: string
  children: string
}

export const LabelBase = createTextBase('label')

export const Label = styled(LabelBase)`
  ${({ color }) => css`
    font-size: 5;
    color: ${color || 'body.6'};
    margin: 0;
  `}
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
  font-size: 5;
  margin: 0;
`

Li.defaultProps = {
  family: 'serif',
  color: 'bodyMain',
}

export const Input = styled.input`
  border: 1px solid;
  border-color: body.4;
  font-family: serif;
  font-size: 5;
  width: 100%;
  height: 32px;
  padding: 0 3;
`
