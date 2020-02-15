import * as React from 'react'
import styled, {
  css,
  DefaultTheme,
  Box,
  BoxProps,
} from '@xstyled/styled-components'

interface CustomTextProps {
  theme: DefaultTheme
  fontSize: 1 | 2 | 3 | 4 | 5 | 6
  family?: 'mono' | 'sans' | 'display' | 'body'
  align?: 'left' | 'center' | 'right' | 'inherit'
  weight?: number
  color?: string
  htmlFor?: string
}

const createTextBase = (as: any) => styled(as)`
  ${({ family, weight, fontSize, color, align }: CustomTextProps) => css`
    font-size: ${fontSize};
    font-family: ${family};
    font-weight: ${weight};
    text-align: ${align};
    color: ${color ? color : 'inherit'};
    margin: 2 0 0.5em;

    &:last-child {
      margin-bottom: 0;
    }

    a {
      color: bronze;
      text-decoration: underline;
    }
  `}
`

const TextBase = styled(Box)`
  ${({ family, weight, fontSize, color, align }: CustomTextProps) => css`
    font-size: ${fontSize};
    font-family: ${family};
    font-weight: ${weight};
    text-align: ${align};
    color: ${color ? color : 'inherit'};
    margin: 0 0 0.5em;

    &:last-child {
      margin-bottom: 0;
    }
    a {
      color: bronze;
      text-decoration: underline;
    }
  `}
`

// @ts-ignore
interface HeadingProps
  extends Omit<CustomTextProps, 'fontSize' | 'theme'>,
    BoxProps {
  children: React.ReactNode
  level: 1 | 2 | 3 | 4 | 5 | 6
  /* A default */
  as?: any
  htmlFor?: string
}

const hTags = ['h1', 'h2', 'h3', 'h4', 'h5']

export const Heading = ({
  children,
  align,
  color,
  family,
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
      align={align}
      // @ts-ignore
      fontSize={level}
      family={family}
      weight={weight || 500}
      color={color}
      htmlFor={htmlFor}
      {...rest}
    >
      {children}
    </TextBase>
  )
}

Heading.defaultProps = {
  family: 'display',
  color: 'primaryMain',
  weight: 500,
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
    >
      {children}
    </TextBase>
  )
}

P.defaultProps = {
  family: 'body',
  weight: 400,
  color: 'body',
}

interface LabelProps {
  htmlFor: string
  children: string
}

const LabelBase = createTextBase('label')

export const Label = styled(LabelBase)`
  font-size: 4;
  font-family: sans;
  color: body.2;
  margin: 0;
`

export const TextAnchor = styled.a``

export const BlockQuote = styled.blockquote``

const listStyles = css`
  margin: 3 0;
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
  font-family: sans;
  color: body.2;
  margin: 0;
`

export const Input = styled.input`
  border: 1px solid body.6;
  width: 100%;
  padding: 3;
  text-transform: lowercase;
`
