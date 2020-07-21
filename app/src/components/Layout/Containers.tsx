import styled, { css } from '@xstyled/styled-components'

interface ColumnProps {
  columnwidth?: string
}

export const Column = styled.divBox`
  ${({ columnwidth }: ColumnProps) => css`
    margin: 0 auto;
    max-width: ${columnwidth ? columnwidth : 'xWide'};
  `}
`

export const PageWrapper = styled.divBox`
  ${({ theme }) => css`
    padding: calc(${theme.navHeight} + ${theme.space[9]}px) 10 8;

    ${theme.mediaQueries.tablet} {
      padding: calc(${theme.navHeight} + ${theme.space[9]}px) 8 6;
    }

    ${theme.mediaQueries.mobile} {
      padding: calc(${theme.mobileNavHeight} + ${theme.space[4]}px) 5 5;
    }
  `}
`
