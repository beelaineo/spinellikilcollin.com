import * as React from 'react'
import styled, { css, BoxProps } from '@xstyled/styled-components'
import Link from 'next/link'

interface ButtonProps extends BoxProps {
  level?: 1 | 2 | 3
  disabled?: boolean
}

export const Button = styled.buttonBox<ButtonProps>`
  ${({ level, disabled, theme }) => css`
    pointer-events: ${disabled ? 'none' : 'inherit'};
    opacity: ${disabled ? 0.3 : 1};
    font-family: serif;
    transition: 0.25s;
    text-transform: uppercase;
    height: 42px;
    padding: 0 3;
    font-size: 5;
    cursor: pointer;
    font-weight: 300;
    line-height: 42px;
    position: relative;

    &:focus-visible {
      ${theme.focus.left()}
    }

    svg {
      display: inline-block;
      margin: 0 0.2em;
      height: 1em;
    }

    ${level === undefined || level === 1
      ? css`
          color: body.1;
          background-color: body.9;
        `
      : level === 2
      ? css`
          color: body.9;
          background-color: transparent;
          border: 1px solid;
        `
      : css`
          display: inline;
          margin: 0;
          padding: 0;
          width: auto;
          height: auto;
          border: none;
        `}
  `}
`

interface LinkButtonProps extends ButtonProps {
  href: string
  children: React.ReactNode
}
export const LinkButton = ({
  href,
  children,
  level,
  disabled,
  ...rest
}: LinkButtonProps) => {
  return (
    <Link href={href}>
      <Button as="div" {...rest} level={level} disabled={disabled}>
        {children}
      </Button>
    </Link>
  )
}
