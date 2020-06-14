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

interface WithTopBorder {
  topBorder: boolean
}

export const FooterInner = styled.div<WithTopBorder>`
  ${({ theme, topBorder }) => css`
    display: grid;
    padding: 9 0;
    grid-template-columns: 50% 10% 1fr;
    grid-column-gap: 3;

    &:nth-of-type(2) {
      align-items: center;
    }

    ${topBorder
      ? css`
          border-top: 1px solid;
          border-top-color: body.4;
        `
      : ''}

    ${theme.mediaQueries.mobile} {
      padding: 6 0 8;
      display: flex;
      flex-direction: column;
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
      padding: 6 0;
      display: flex;
      flex-direction: column;
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
      padding: 0 6;
      grid-template-columns: 30% 1fr;
    }
  `}
`

export const MailerWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.mobile} {
      order: 1;
      margin-bottom: 56px;
      padding: 0 6;
    }
  `}
`

export const MailerInput = styled.form`
  position: relative;
  button {
    color: body.5;
    font-size: 2;
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
    pointer-events: ${visible ? 'inherit' : 'none'};
    transition: 0.2s;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
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
    a + a {
      margin-left: 7;
    }

    ${theme.mediaQueries.mobile} {
      padding: 0 6 6;
      margin: 0 0 8;
      justify-content: center;
      border-bottom: 1px solid;
      border-color: body.4;
    }
  `}
`
