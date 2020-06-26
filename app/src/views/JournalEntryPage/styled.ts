import styled, { css } from '@xstyled/styled-components'

export const JournalPageWrapper = styled.div`
  ${({ theme }) => css`
    padding: calc(${theme.navHeight} + ${theme.space[2]}px) 7 7;

    ${theme.mediaQueries.tablet} {
      padding: calc(${theme.space[9]}px + 5px) 4 7;
    }
  `}
`

export const MainWrapper = styled.div``
export const LinkWrapper = styled.div`
  a > * {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
  svg {
    margin-right: 0.5em;
    height: 1em;
  }
`

export const Header = styled.div`
  max-width: 700px;
  margin: 5 auto 7;
  padding: 0 2;
  text-align: center;
`

export const DateTags = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3;
`
