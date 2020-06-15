import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { IoIosSearch } from 'react-icons/io'
import { useShopData } from '../../providers/ShopDataProvider'
import { NavInner, NavItemWrapper } from './styled'
import { Heading, Input } from '../Text'
import { PageLink } from '../PageLink'
import { SubMenu } from './SubMenu'
import { Hamburger } from '../Hamburger'

const HamburgerWrapper = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: 26px;
    left: 35px;
    z-index: ${theme.zIndices.cart + 1};
  `}
`

interface NavigationInnerProps {
  closeMenu: () => void
}

export const NavigationInner = ({ closeMenu }: NavigationInnerProps) => {
  const { menu } = useShopData()
  if (!menu) return null
  const menuItems = menu?.menuItems || []
  return (
    <>
      <HamburgerWrapper>
        <Hamburger onClick={closeMenu} open={true} />
      </HamburgerWrapper>

      <NavInner>
        <div>
          <Heading level={4} fontStyle="italic">
            What are you looking for?
          </Heading>
          <Input placeholder="search" />
          <button type="submit">
            <IoIosSearch />
          </button>
        </div>
        <div>
          {menuItems.map((menuItem) => {
            if (!menuItem) return null
            switch (menuItem.__typename) {
              case 'SubMenu':
                return (
                  <NavItemWrapper key={menuItem._key || 'some-key'}>
                    <SubMenu subMenu={menuItem} />
                  </NavItemWrapper>
                )
              case 'MenuLink':
                return (
                  <NavItemWrapper key={menuItem._key || 'some-key'}>
                    <PageLink
                      link={menuItem.link}
                      render={(inferredLabel) => (
                        <Heading m={0} level={3}>
                          {menuItem.label
                            ? menuItem.label.toUpperCase()
                            : inferredLabel
                            ? inferredLabel.toUpperCase()
                            : ''}
                        </Heading>
                      )}
                    />
                  </NavItemWrapper>
                )
              default:
                return null
            }
          })}
        </div>
      </NavInner>
    </>
  )
}
