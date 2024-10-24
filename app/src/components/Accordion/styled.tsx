import styled, { css, DefaultTheme } from '@xstyled/styled-components'

interface WithOpen {
  theme: DefaultTheme
  open: boolean
  height: number
}

interface WithProduct {
  isProduct?: boolean
  open?: boolean
}

interface ClickProps {
  onClick: any
  open?: boolean
}

export const Inner = styled.div<WithOpen>`
  ${({ open, height }) => css`
    overflow: hidden;

    ${open
      ? css`
          height: ${height};
          opacity: 1;
          visibility: visible;
          margin: 0 0 3;

          transition: height 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            opacity 0.5s linear, margin 0.5s linear, visibility 0s linear;
        `
      : css`
          height: 0;
          opacity: 0;
          visibility: hidden;
          transition: height 0.5s cubic-bezier(0.65, 0, 0.35, 1),
            opacity 0.5s linear, margin 0.5s, visibility 0s linear 0.5s;
        `};
  `}
`

export const Item = styled.div<WithProduct>`
  ${({ isProduct, theme }) => css`
    padding: 2 0 0;
    opacity: 1;
    ${isProduct &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 240px;

      .pd-inner {
        display: flex;
        flex-direction: column;
        > h5 {
          display: none;
        }
      }
      .pd-wrapper {
        max-width: 405px;
        display: flex;
        flex-direction: column;
        > div:first-of-type {
          padding-top: 3;
        }
        .pd-options {
          display: flex;
          align-items: center;
          gap: 20%;
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

      ${theme.mediaQueries.tablet} {
        column-gap: 0px;
      }

      ${theme.mediaQueries.mobile} {
        grid-template-columns: 1fr;
        column-gap: 0;
        .pd-inner {
          order: -1;
        }

        .pd-wrapper {
          order: -1;
          margin-bottom: 4;
          button {
            margin: 2 0;
          }
        }
        .pd-options {
          gap: 7;
          margin-top: -20px;
        }
        .pd-options em {
          display: none;
        }
      }
    `}
    ${theme.mediaQueries.mobile} {
      > div {
        display: none;
      }
    }
  `}
`

export const Wrapper = styled.div<WithProduct>`
  ${({ isProduct, theme, open }) => css`
    &:last-of-type {
      border-bottom: 1px solid;
    }

    ${theme.mediaQueries.tablet} {
      margin: 0 30px;

      &:nth-of-type(2) {
        border-top: none;
      }
    }

    ${isProduct
      ? css`
          border-top: 1px solid;

          ${open
            ? css`
                padding-bottom: 6;
                transition: padding 0.5s linear;
              `
            : `padding-bottom: 0;
              transition: padding 0.5s linear;
              `}

          max-width: 1200px;
          margin: 0 5;

          &:first-of-type {
            border-top: none;
          }

          &:last-of-type {
            border-bottom: none;
          }

          ${theme.mediaQueries.mobile} {
            padding-bottom: 0;
          }
        `
      : css`
          border-top: 1px solid;
        `}
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
export const ProductButton = styled.span`
  ${({ theme }) => css`
    position: relative;
    padding: 8 0 0;

    width: 100%;
    text-align: center;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${theme.mediaQueries.tablet} {
      padding: 5 0;
      gap: 3;
    }

    ${theme.mediaQueries.mobile} {
      padding: 5 0;
      gap: 3;
    }

    &:focus-visible {
      ${theme.focus.left()}
    }
  `}
`

export const ProductImageWrapper = styled.div<ClickProps>`
  ${({ theme, open }) => css`
    position: relative;
    width: 75%;

    cursor: pointer;

    ${theme.mediaQueries.mobile} {
      width: 100%;
      ${open && `cursor: default;`}
    }
  `}
`

export const TextWrapper = styled.div<ClickProps>`
  ${({ theme, open }) => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 9 0 42px;

    cursor: pointer;

    ${open && `cursor: initial;`}

    > h3 {
      width: 100%;
      line-height: 1;
      text-align: center;
      margin: 0;

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

    cursor: pointer;

    > h5 {
      margin: 0;
      line-height: 1;
    }
  `}
`
