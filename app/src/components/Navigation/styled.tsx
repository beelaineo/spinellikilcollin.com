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
}

export const Inner = styled.div<WithBorder>`
  ${({ theme, withBorder }) => css`
    position: relative;
    z-index: 10;
    display: grid;
    border-bottom: 1px solid;
    border-color: ${withBorder ? 'currentColor' : 'transparent'};
    grid-template-columns: 1fr 267px 1fr;
    align-items: center;
    padding: 6 0 16px;
    margin: 0 auto;
    max-width: calc(100% - (${theme.space[7]}px * 2));
    width: 100%;

    ${theme.mediaQueries.tablet} {
      padding: 6 0 2;
      max-width: calc(100% - (${theme.space[7]}px * 2));
    }
    ${theme.mediaQueries.mobile} {
      padding-top: 13px;
      grid-template-columns: 20px 1fr 20px;
      max-width: calc(100% - (${theme.space[4]}px * 2));
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

export const LogoWrapper = styled.div`
  ${({ theme }) => css`
    width: 260px;
    margin: 0 auto;
    svg {
      width: 100%;
    }
    ${theme.mediaQueries.mobile} {
      width: 170px;
      transform: translateY(4px);
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
    top: 34px;
    left: ${theme.space[7]}px;
    z-index: ${theme.zIndices.cart + 1};

    ${theme.mediaQueries.mobile} {
      top: 21px;
      left: ${theme.space[5]}px;
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

  &:focus ${NavHeader}, &:hover > ${NavHeader} {
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
}

export const CartButtonWrapper = styled.button`
  ${({ theme, isLoading }: LoadingProps) => css`
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
    }
    ${theme.mediaQueries.mobile} {
      width: 16px;
      height: 16px;
    }
  `}
`

export const CartBadge = styled.div`
  ${({ theme }) => css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -10px;
    left: -10px;
    padding-top: 1px;
    width: 20px;
    height: 20px;
    background-color: body.2;
    border: 1px solid;
    border-radius: 20px;
    ${theme.mediaQueries.mobile} {
      padding-top: 0px;
      width: 16px;
      height: 16px;
      top: -9px;
      left: -9px;

      transform: scale(0.8);

      h4 {
        font-size: 11px;
      }
    }
  `}
`

interface SideNavigation {
  theme: DefaultTheme
  open?: boolean
}

export const SideNavigation = styled.div`
  ${({ open }: SideNavigation) => css`
    transform: ${open ? 'translateX(0px)' : 'translateX(-520px)'};
    z-index: cart;
    width: 500px;
    background-color: white;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    transition: 250ms ease;
  `};
`

export const NavInner = styled.div`
  ${({ theme }) => css`
    padding: 7;
    height: 100vh;
    overflow: scroll;
    max-width: calc(100vw + 1px);
    box-shadow: 5px 0 5px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;

    > div {
      margin: 6 0;
    }
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
      padding: 5;
    }
  `}
`

interface WithOpen {
  open: boolean
}

export const NavInnerBackground = styled.div`
  ${({ open, theme }: WithOpen) => css`
    height: 100vh;
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
  display: block;
  padding: 3 0;

  & + & {
    border-top: 1px solid black;
  }
`
