import styled, { css } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 8 9;

    a {
      text-decoration: none;
    }

    ${theme.mediaQueries.tablet} {
      padding: 0 0 9;
    }

    ${theme.mediaQueries.mobile} {
      grid-template-columns: 100%;
    }
  `}
`
