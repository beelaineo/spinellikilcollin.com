import styled, { css } from '@xstyled/styled-components'

export const FooterWrapper = styled.footer`
  ${({ theme }) => css`
    padding: 2 11 0;
    background-color: body.0;

    ${theme.mediaQueries.tablet} {
      padding: 2 8 0;
    }
    ${theme.mediaQueries.mobile} {
      padding: 2 4 0;
    }
  `}
`

export const FooterInner = styled.div`
  ${({ theme }) => css`
    display: grid;
    padding: 9 0 9 0;
    grid-template-columns: 50% 10% 1fr;
    grid-column-gap: 3;

    &:nth-of-type(2) {
      align-items: center;
    }

    ${theme.mediaQueries.mobile} {
      padding: 5 1 8;
      display: flex;
      flex-direction: column;
    }
  `}
`
export const BreadcrumbWrapper = styled.div`
  ${({ theme }) => css`
    padding-top: 4;
    display: flex;
    align-items: center;

    div {
      display: inline-block;
      font-size: 5;
      font-weight: 2;
    }

    .border {
      flex: 1;
      height: 1px;
      background-color: body.4;
      margin-left: 1em;
    }

    & > div > div {
      margin: 0 0.25em;
    }

    & > div:first-child div {
      margin-left: 0;
    }
    .separator {
      font-size: 6;
      position: relative;
      bottom: 1px;
    }
    .active {
      font-style: italic;
    }

    ${theme.mediaQueries.mobile} {
      padding: 4 0;
      margin: 0 auto;

      .border {
        margin-left: 0.5em;
      }
    }
  `}
`

export const FooterInnerLower = styled.div`
  ${({ theme }) => css`
    display: grid;
    padding: 7 0;
    grid-template-columns: 50% 10% 1fr;
    grid-column-gap: 3;

    &:nth-of-type(2) {
      align-items: center;
    }

    border-top: 1px solid;
    border-top-color: body.4;

    ${theme.mediaQueries.mobile} {
      padding: 35px 0;
      display: flex;
      flex-direction: column;

      &:nth-of-type(2) h4 {
        align-self: flex-start;
        padding: 0 5;
      }
    }
  `}
`

export const FooterLinks = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-column-gap: 5;
    grid-row-gap: 32px;
    grid-template-columns: 30% 1fr;

    ${theme.mediaQueries.mobile} {
      order: 2;
      padding: 0 5;
      grid-template-columns: 30% 1fr;
      grid-column-gap: 5;
    }

    @media screen and (max-width: 324px) {
      padding: 0 20px;
    }
  `}
`

export const MailerWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.mobile} {
      order: 1;
      margin-bottom: 7;
      padding: 0 5;
    }
  `}
`

export const MailerForm = styled.form`
  position: relative;
  button {
    color: body.5;
    font-size: 3;
    background-color: transparent;
    position: absolute;
    top: 0;
    right: 11px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  svg {
    stroke: currentColor;
  }

  input:focus ~ button {
    color: body.7;
  }
`

interface WithVisible {
  visible: boolean
}

export const InputWrapper = styled.div<WithVisible>`
  ${({ visible }) => css`
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.2s;
  `}
`
export const SuccessWrapper = styled.div<WithVisible>`
  ${({ visible }) => css`
    opacity: ${visible ? 1 : 0};
    padding: 0 3;
    border: 1px solid;
    border-color: body.5;
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.2s;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `}
`

export const Socials = styled.div`
  ${({ theme }) => css`
    color: body.8;
    font-size: 21px;
    display: flex;
    width: 100%;
    justify-content: flex-start;
    align-items: center;

    a {
      display: flex;
    }
    ${theme.mediaQueries.aboveMobile} {
      a + a {
        margin-left: 7;
      }
    }

    ${theme.mediaQueries.mobile} {
      padding: 0 5 35px;
      margin: 0 0 35px;
      justify-content: space-between;
      border-bottom: 1px solid;
      border-color: body.4;
    }
  `}
`

export const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

interface HomepageLinkProps {
  isMobile: boolean
}

export const HomepageLink = styled.div<HomepageLinkProps>`
  ${({ isMobile, theme }) => css`
    display: ${isMobile ? 'none' : 'block'};
    font-weight: 2;

    ${theme.mediaQueries.mobile} {
      display: ${isMobile ? 'block' : 'none'};
      order: 3;
      padding: 7 5 0;
    }
  `}
`
