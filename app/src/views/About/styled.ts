import styled, { css } from '@xstyled/styled-components'

export const PageLinksWrapper = styled.div`
  margin-top: 83px;
`

export const PageLinkWrapper = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 4;
    padding: 8 0;
    border-top: 1px solid;
    border-color: body.7;

    ${theme.mediaQueries.mobile} {
      grid-row-gap: 5;
      grid-template-columns: 1fr;
    }
  `}
`

interface WithIsOdd {
  isOdd: boolean
}

export const PageLinkBody = styled.div<WithIsOdd>`
  ${({ isOdd, theme }) => css`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;

    ${theme.mediaQueries.aboveMobile} {
      grid-column: ${isOdd ? '1 / 2' : 'auto'};
      grid-row: ${isOdd ? '1' : 'auto'};
    }
  `}
`

export const ImageWrapper = styled.div<WithIsOdd>`
  ${({ isOdd, theme }) => css`
    ${theme.mediaQueries.aboveMobile} {
      grid-column: ${isOdd ? '2 / 3' : 'auto'};
      grid-row: ${isOdd ? '1' : 'auto'};
    }
  `}
`
