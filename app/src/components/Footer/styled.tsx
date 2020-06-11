import styled, { css } from '@xstyled/styled-components'

export const FooterWrapper = styled.footer`
  ${({ theme }) => css`
    padding: 2 11 6;
    background-color: body.0;

    ${theme.mediaQueries.tablet} {
      padding: 2 8 6;
    }
    ${theme.mediaQueries.mobile} {
      padding: 2 4 6;
    }
  `}
`

export const FooterInner = styled.div`
  ${({ theme }) => css`
    display: grid;
    padding: 6 0;
    grid-template-columns: 50% 10% 1fr;
    grid-column-gap: 3;

    &:nth-of-type(2) {
      align-items: center;
    }

    & + & {
      border-top: 1px solid;
      border-top-color: body.4;
    }

    ${theme.mediaQueries.mobile} {
      padding: 6 4 0;
      display: flex;
      flex-direction: column;

      & + & {
        border-top: none;
      }
    }
  `}
`

export const FooterLinks = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-column-gap: 5;
    grid-template-columns: 1fr 1fr;

    ${theme.mediaQueries.mobile} {
      order: 2;
    }
  `}
`

export const MailerWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.mediaQueries.mobile} {
      order: 1;
      margin-bottom: 8;
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
    font-size: 2;
    display: flex;
    a {
      display: flex;
    }
    a + a {
      margin-left: 7;
    }

    ${theme.mediaQueries.mobile} {
      padding: 6 0;
      border-top: 1px solid;
      border-bottom: 1px solid;
      border-color: body.4;
      margin-bottom: 4;
    }
  `}
`
