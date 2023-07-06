import styled, { css } from '@xstyled/styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: 5 8 9;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 5;
    align-content: center;

    a {
      text-decoration: none;
    }

    ${theme.mediaQueries.tablet} {
      padding: 5 0 9;
    }

    ${theme.mediaQueries.mobile} {
      grid-template-columns: 100%;
    }
  `}
`

export const ContactLines = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ContactLineWrapper = styled.div`
  ${({ theme }) => css`
    padding: 2 0 5;
    border-bottom: 1px solid;
    border-color: body.5;
    margin-bottom: 6;

    &:last-of-type {
      margin-bottom: 0;
    }

    button,
    a {
      position: relative;

      &:focus-visible {
        ${theme.focus.left()}
      }
    }
  `}
`

export const ChatWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;

    button {
      position: relative;
      &:focus-visible {
        ${theme.focus.left()}
      }
    }
    svg {
      margin: 0 auto;
      max-width: 180px;
    }
  `}
`
