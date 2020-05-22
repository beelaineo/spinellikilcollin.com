import styled, { css } from '@xstyled/styled-components'

interface ColumnProps {
  columnWidth?: string
}

export const Column = styled.divBox`
  ${({ columnWidth }: ColumnProps) => css`
    margin: 0 auto;
    max-width: ${columnWidth ? columnWidth : 'xWide'};
  `}
`

export const PageWrapper = styled.div`
  ${({ theme }) => css`
    padding: calc(${theme.navHeight} + ${theme.space[9]}px) 10 5;
  `}
`
