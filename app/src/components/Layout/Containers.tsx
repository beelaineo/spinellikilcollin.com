import styled, { css } from '@xstyled/styled-components'

interface ColumnProps {
  width?: string
}

export const Column = styled.div`
  ${({ width }: ColumnProps) => css`
    margin: 0 auto;
    max-width: ${width ? width : 'xWide'};
  `}
`

export const PageWrapper = styled.div`
  ${({ theme }) => css`
    padding: calc(${theme.navHeight} + ${theme.space[5]}px) 5 5;
  `}
`
