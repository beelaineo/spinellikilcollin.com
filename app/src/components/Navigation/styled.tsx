import styled, { css, DefaultTheme } from '@xstyled/styled-components'

export const Wrapper = styled.nav`
  display: block;
  position: relative;
  z-index: nav;
  font-family: serif;
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  width: 100vw;
`

export const BackdropWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export const BackdropFilter = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(7px);
  mask-image: linear-gradient(black 65%, rgba(0, 0, 0, 0.5) 100%);
`

interface WithBorder {
  withBorder?: boolean
  colorTheme?: 'light' | 'dark'
}

export const SkipToMainContentButton = styled.button`
  ${({ theme }) => css`
    z-index: 999;
    position: fixed;
    top: 4;
    left: -500;
    &:focus-visible {
      top: 4;
      left: 4;
      outline-color: ${theme.colors.grays[5]};
      outline-offset: 2px;
      outline-style: auto;
    }
  `}
`

export const Inner = styled.div<WithBorder>`
  ${({ theme, withBorder, colorTheme }) => css`
    position: relative;
    z-index: 10;
    display: grid;
    border-bottom: 1px solid;
    border-color: ${colorTheme == 'light' && withBorder
      ? theme.colors.grays[1]
      : withBorder
      ? 'currentColor'
      : 'transparent'};
    grid-template-columns: 1fr 267px 1fr;
    align-items: center;
    padding: 6 0 16px;
    margin: 0 auto;
    max-width: calc(100% - (${theme.space[7]}px * 2));
    width: 100%;

    ${theme.mediaQueries.tablet} {
      padding: 5 0 3;
      grid-template-columns: 1fr 230px 1fr;
      max-width: calc(100% - (${theme.space[7]}px * 2));
    }

    ${theme.mediaQueries.mobile} {
      grid-template-columns: 80px 1fr 80px;
      max-width: calc(100% - (${theme.space[4]}px * 2));
    }
  `}
`

interface WithColorTheme {
  colorTheme?: 'light' | 'dark'
}

export const QuickLinksWrapper = styled.nav<WithColorTheme>`
  ${({ theme, colorTheme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    right: ${theme.space[7]}px;
    margin: 0 auto;
    color: ${colorTheme == 'light' ? theme.colors.grays[1] : 'currentColor'};
    padding: 4 0 0 0;
    ${theme.mediaQueries.tablet} {
      display: none;
    }

    button {
      position: relative;
      margin-left: 4;
      padding: 2 3;
      border: 1px solid;
      border-radius: 3rem;
      text-transform: uppercase;
      font-size: 5;
      color: ${colorTheme == 'light' ? theme.colors.grays[1] : 'currentColor'};
      &:hover {
        background-color: white;
        color: ${colorTheme == 'light' ? theme.colors.body[7] : 'currentColor'};
      }
      &:focus-visible {
        ${theme.focus.bottom()}
        background-color: white;
        color: ${colorTheme == 'light' ? theme.colors.body[7] : 'currentColor'};
      }
    }
  `}
`

export const ToolsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

interface WithReady {
  theme: DefaultTheme
  ready: boolean
  align?: string
}

export const NavSection = styled.div`
  ${({ ready, align }: WithReady) => css`
    transition: 0.3s;
    flex-grow: 1;
    display: flex;
    justify-content: ${align === 'right' ? 'flex-end' : 'flex-start'};
    align-items: stretch;
    height: 100%;
    opacity: ${ready ? '1' : '0'};

    &:last-child {
      justify-content: flex-end;
    }
  `}
`

interface WithActive {
  theme: DefaultTheme
  active?: boolean
}

interface WithColor {
  theme: DefaultTheme
  colorTheme?: 'light' | 'dark'
}

export const LogoWrapper = styled.div`
  ${({ theme, colorTheme }: WithColor) => css`
    position: relative;
    margin: 0 auto;
    svg {
      width: 100%;
      ${colorTheme == 'light'
        ? `path {
          fill: ${theme.colors.grays[1]};
        }
        `
        : ''};
    }
    a:focus-visible {
      ${theme.focus.bottom(0, 0)}
    }
    ${theme.mediaQueries.mobile} {
      width: 170px;
      transform: translateY(4px);
      svg {
        width: 100%;
      }
    }
    @media screen and (max-width: 360px) {
      width: 100%;
    }
  `}
`

export const NavHeader = styled.button`
  ${({ active }: WithActive) => css`
    font-size: 6;
    border-top: 2px solid transparent;
    border-bottom: 2px solid ${active ? 'black' : 'transparent'};
    color: inherit;
    text-decoration: none;
    transition: 0.2s;
  `}
`

export const HamburgerWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 44px;
    left: ${theme.space[7]}px;
    z-index: ${theme.zIndices.cart + 1};

    ${theme.mediaQueries.tablet} {
      top: 33px;
    }

    ${theme.mediaQueries.mobile} {
      left: ${theme.space[5]}px;
    }
  `}
`
interface ColorThemeProps {
  theme: DefaultTheme
  colorTheme?: 'light' | 'dark'
}

export const SearchButtonWrapper = styled.div`
  ${({ theme, colorTheme }: ColorThemeProps) => css`
    position: relative;
    transition: 250ms ease;
    display: flex;
    align-items: center;
    justify-self: start;
    width: 24px;
    height: 20px;
    margin-right: 19px;
    svg {
      display: inline-block;
      width: 100%;
      ${colorTheme == 'light' ? `path { fill: ${theme.colors.grays[3]}; }` : ''}
    }
    ${theme.mediaQueries.tablet} {
      width: 20px;
      height: 16px;
      margin-right: 3;
      padding-bottom: 2px;
    }
    ${theme.mediaQueries.mobile} {
      width: 20px;
      height: 16px;
      margin-right: 3;
    }
    button:focus-visible {
      ${theme.focus.bottom()}
    }
  `}
`

export const CurrencySelectorWrapper = styled.div`
  ${({ theme, colorTheme }: ColorThemeProps) => css`
    margin-right: 2px;
    position: relative;
    ${colorTheme == 'light' ? `select {color: ${theme.colors.grays[3]};}` : ''}
    ${theme.mediaQueries.mobile} {
      width: 24px;
      margin-right: 4px;
    }

    select:focus-visible {
      outline: none;
    }

    &:has(select:focus-visible) {
      ${theme.focus.bottom(-40)}
    }
  `}
`

export const NavHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin: 0 1em;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  &:focus-visible ${NavHeader}, &:hover > ${NavHeader} {
    border-bottom-color: black;
  }
`

interface WithOpen {
  theme: DefaultTheme
  open: boolean
}

interface WithVisible {
  theme: DefaultTheme
  active: boolean
}

interface LoadingProps {
  theme: DefaultTheme
  isLoading?: boolean
  colorTheme?: 'light' | 'dark'
}

export const CartButtonWrapper = styled.button`
  ${({ theme, isLoading, colorTheme }: LoadingProps) => css`
    opacity: ${isLoading ? '0.5' : '1'};
    position: relative;
    transition: 250ms ease;
    display: flex;
    align-items: center;
    justify-self: end;
    width: 20px;
    height: 20px;
    svg {
      display: inline-block;
      width: 100%;
      ${colorTheme == 'light' ? `path { fill: ${theme.colors.grays[3]}; }` : ''}
    }
    ${theme.mediaQueries.mobile} {
      width: 16px;
      height: 16px;
    }
    &:focus-visible {
      ${theme.focus.bottom(0)}
    }
  `}
`

export const CartBadge = styled.div`
  ${({ theme, colorTheme }: ColorThemeProps) => css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -8px;
    left: -8px;
    padding-top: 1px;
    width: 15px;
    height: 15px;
    background-color: ${colorTheme == 'light' ? 'body.8' : 'body.2'};
    color: ${colorTheme == 'light' ? 'body.2' : 'inherit'};
    border: 1px solid;
    border-radius: 20px;

    h5 {
      font-size: 11px;
    }

    ${theme.mediaQueries.mobile} {
      padding-top: 0px;
      width: 16px;
      height: 16px;
      top: -9px;
      left: -9px;

      transform: scale(0.8);

      h5 {
        font-size: 9px;
      }
    }
  `}
`

interface SideNavigation {
  theme: DefaultTheme
  open?: boolean
}

export const SideNavigation = styled.aside`
  ${({ open }: SideNavigation) => css`
    transform: ${open ? 'translateX(0px)' : 'translateX(-520px)'};
    z-index: cart;
    width: 500px;
    background-color: white;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    transition: 250ms ease;
  `};
`

export const NavInner = styled.div`
  ${({ theme }) => css`
    padding: 80px 7 7;
    height: 100%;
    overflow: scroll;
    max-width: calc(100vw + 1px);
    box-shadow: 5px 0 5px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;

    ul {
      list-style: none;
      padding: 0;
      li {
        font-family: serif;
        margin: 3 0;
        padding: 5 0 3;
        border-top: 1px solid black;
        text-transform: uppercase;
        font-size: 6;
      }
    }

    ${theme.mediaQueries.mobile} {
      padding: 9 5 5;
    }
  `}
`

interface WithOpen {
  open: boolean
}

export const NavInnerBackground = styled.div`
  ${({ open, theme }: WithOpen) => css`
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.2);
    width: 100vw;
    top: 0;
    z-index: ${theme.zIndices.cart - 1};
    opacity: ${open ? 1 : 0};
    pointer-events: ${open ? 'initial' : 'none'};
    transition: 0.2s;
    cursor: pointer;
  `}
`

export const NavItemWrapper = styled.div`
  ${({ theme }) => css`
    display: block;
    position: relative;
    padding: 3 0;

    a,
    button {
      position: relative;

      &:focus-visible {
        ${theme.focus.left(30)}
      }
    }

    & + & {
      border-top: 1px solid black;
    }
  `}
`

export const InStockDot = styled('span')`
  ${({ theme }) => css`
    display: inline-block;
    background-color: #00d009;
    width: 10px;
    height: 10px;
    margin-left: 6px;
    border-radius: 100%;
    border: 1px solid #f5f3f3;
  `}
`
