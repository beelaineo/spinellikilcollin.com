import styled, { css, DefaultTheme } from '@xstyled/styled-components'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
  height: number
}

interface WithProduct {
  isProduct?: boolean
}

export const Inner = styled.div<WithOpen>`
  ${({ open, height }) => css`
    overflow: hidden;

    ${open
      ? css`
          height: ${height};
          opacity: 1;
          visibility: visible;

          transition: height 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            opacity 0.5s linear, visibility 0s linear;
        `
      : css`
          height: 0;
          opacity: 0;
          visibility: hidden;
          transition: height 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            opacity 0.5s linear, visibility 0s linear 0.5s;
        `};
  `}
`

export const Item = styled.div<WithProduct>`
  ${({ isProduct, theme }) => css`
    padding: 2 0 4;
    opacity: 1;
    ${isProduct &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 240px;

      .pd-wrapper {
        max-width: 405px;
        display: flex;
        flex-direction: column;
        .pd-options {
          display: flex;
          column-gap: 5;
          align-items: center;
          button {
            width: 100%;
          }
        }
      }
      .hv-description {
        ul li {
          white-space: normal;
        }
        ul ul {
          font-weight: 300;
          line-height: 1.1;
          margin: 12px 0;
          padding-left: 2em;
          white-space: normal;
          li {
            margin: 0;
            line-height: 1.1;
            white-space: normal;
          }
        }
      }

      ${theme.mediaQueries.mobile} {
        grid-template-columns: 1fr;
        column-gap: 0;
        .pd-wrapper {
          order: -1;
          margin-bottom: 4;
          button {
            margin: 2 0;
          }
        }
        .pd-options em {
          display: none;
        }
      }
    `}
    ${theme.mediaQueries.mobile} {
      > div {
        padding: 0;
        grid-column: 1/-1;
      }
    }
  `}
`

export const Wrapper = styled.div<WithProduct>`
  ${({ isProduct, theme }) => css`
    ${isProduct
      ? css`
          border-top: 1px solid;
          margin: 0 40px 40px;
          &:first-of-type {
            border-top: none;
          }
        `
      : css`
          border-top: 1px solid;
        `}

    &:last-of-type {
      border-bottom: 1px solid;
    }

    ${theme.mediaQueries.mobile} {
      margin: 0 30px;

      &:nth-of-type(2) {
        border-top: none;
      }
    }
  `}
`

export const Label = styled.button`
  ${({ theme }) => css`
    font-size: 5;
    font-family: serif;
    position: relative;
    padding: 3 0;
    width: 100%;
    text-align: left;
    background-color: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:focus-visible {
      ${theme.focus.left()}
    }
  `}
`
export const ProductButton = styled.button`
  ${({ theme }) => css`
    position: relative;
    padding: 3 10;
    width: 100%;
    text-align: center;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${theme.mediaQueries.mobile} {
      padding: 5 0;
      gap: 3;
    }

    &:focus-visible {
      ${theme.focus.left()}
    }
  `}
`

export const ProductImageWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    width: 60%;

    ${theme.mediaQueries.mobile} {
      width: 100%;
    }
  `}
`

export const TextWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 6 0;

    > h3 {
      width: 100%;
      line-height: 1;
      text-align: center;

      ${theme.mediaQueries.mobile} {
        text-align: left;
      }
    }
    ${theme.mediaQueries.mobile} {
      padding: 0;
      justify-content: space-between;

      > h3 {
        flex-basis: 70%;
        text-align: left;
      }
    }
  `}
`

export const StatusWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    flex-direction: row;
    text-transform: uppercase;
    align-items: center;
    gap: 20px;
    right: 0;

    > h5 {
      margin: 0;
      line-height: 1;
    }
  `}
`
