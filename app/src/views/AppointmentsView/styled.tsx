import styled, { css } from '@xstyled/styled-components'

interface QuickLinksNavProps {
  containerHeight: number
}

interface QuickLinkProps {
  isActive: boolean
}

export const QuestionWrapper = styled.div`
  margin: 60px 0;
`

export const CategoryWrapper = styled.div``

export const PageText = styled.div`
  span {
    font-size: 17px;
  }
  h1,
  h2,
  h3 {
    text-align: center;
  }
  h2 {
    line-height: 1.5em;
    margin: 0.6em 0px;
  }
`

export const Answer = styled.div`
  p:first-child {
    &:before {
      content: 'A: ';
    }
  }
`

export const Wrapper = styled.mainBox`
  ${({ theme }) => css`
    padding: calc(${theme.navHeight} + ${theme.space[9]}px) 8 6;
    ${theme.mediaQueries.mobile} {
      padding: calc(${theme.mobileNavHeight} + ${theme.space[4]}px) 30px 5;
    }
  `}
`

export const QuickLinksNav = styled.ul<QuickLinksNavProps>`
  ${({ theme, containerHeight }) => css`
    position: sticky;
    top: 50%;
    transform: translateY(-50%);
    padding-inline-start: 0;
    margin-top: calc(-1 * ${containerHeight}px);
    ${theme.mediaQueries.tablet} {
      margin-top: 0;
    }
  `}
`

export const QuickLink = styled.li<QuickLinkProps>`
  ${({ isActive, theme }) => css`
    ${theme.mediaQueries.tablet} {
      display: none;
    }
    display: block;
    font-size: 17px;
    font-weight: 200;
    list-style: none;
    margin: 6px auto 0.5em;
    text-decoration: ${isActive ? 'underline' : 'none'};
    cursor: pointer;
  `}
`
