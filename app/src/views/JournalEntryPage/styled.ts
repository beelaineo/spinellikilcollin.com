import styled, { css } from '@xstyled/styled-components'

interface WithHero {
  withHero: boolean
}

/* padding: calc(${theme.space[8]}px + 4px) 6 7; */
export const JournalPageWrapper = styled.div<WithHero>`
  ${({ theme, withHero }) => css`
    padding: calc(${theme.navHeight} + ${theme.space[2]}px) 7 7;

    ${theme.mediaQueries.tablet} {
      padding: calc(${theme.navHeight} + ${theme.space[2]}px) 6 7;
      ${withHero
        ? css`
            padding-top: 2;
          `
        : ''}
    }
    ${theme.mediaQueries.mobile} {
      padding: calc(${theme.space[8]}px + 4px) 6 7;
    }
    ${withHero
      ? css`
          padding-top: 3;
        `
      : ''}
  `}
`

export const MainWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.tablet} {
      margin-top: 9;
    }
    ${theme.mediaQueries.mobile} {
      margin-top: 7;
    }
  `}
`

export const LinkWrapper = styled.div`
  ${({ theme }) => css`
    a > * {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
    }
    svg {
      margin-right: 0.5em;
      height: 1em;
    }

    ${theme.mediaQueries.mobile} {
      margin-left: -4;
    }
  `}
`

export const Header = styled.div`
  ${({ theme }) => css`
    max-width: 700px;
    margin: 5 auto 9;
    padding: 0 2;
    text-align: center;

    ${theme.mediaQueries.tablet} {
      margin: 3 auto 6;
    }
  `}
`

export const DateTags = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3;
`
