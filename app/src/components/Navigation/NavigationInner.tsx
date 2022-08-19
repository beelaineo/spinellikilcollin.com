import * as React from 'react'
import { useShopData } from '../../providers/ShopDataProvider'
import {
  NavInner,
  HamburgerWrapper,
  NavItemWrapper,
  InStockDot,
} from './styled'
import { Heading } from '../Text'
import { PageLink } from '../PageLink'
import { SubMenu } from './SubMenu'
import { Hamburger } from '../Hamburger'
import { SearchInput } from './SearchInput'
import { useNavigation } from '../../providers/NavigationProvider'

interface NavigationInnerProps {
  closeMenu: () => void
}

export const NavigationInner = ({ closeMenu }: NavigationInnerProps) => {
  const { menu } = useShopData()
  if (!menu) return null
  const { menuOpen } = useNavigation()
  const menuItems = menu?.menuItems || []
  return (
    <NavInner hidden={!menuOpen}>
      {menuOpen ? (
        <HamburgerWrapper>
          <Hamburger onClick={closeMenu} open={true} />
        </HamburgerWrapper>
      ) : null}

      <SearchInput />
      <nav>
        {menuItems.map((menuItem) => {
          if (!menuItem) return null
          switch (menuItem.__typename) {
            case 'SubMenu':
              return (
                <NavItemWrapper key={menuItem._key || 'some-key'}>
                  <SubMenu closeMenu={closeMenu} subMenu={menuItem} />
                </NavItemWrapper>
              )
            case 'MenuLink':
              return (
                <NavItemWrapper key={menuItem._key || 'some-key'}>
                  <PageLink
                    onClick={closeMenu}
                    link={menuItem.link}
                    render={(inferredLabel) => (
                      <Heading m={0} level={4}>
                        {menuItem.label
                          ? menuItem.label.toUpperCase()
                          : inferredLabel
                          ? inferredLabel.toUpperCase()
                          : ''}
                        {menuItem.link?.document?.__typename ==
                          'ShopifyCollection' &&
                        menuItem.link?.document?.handle === 'in-stock' ? (
                          <InStockDot />
                        ) : null}
                      </Heading>
                    )}
                  />
                </NavItemWrapper>
              )
            default:
              return null
          }
        })}
      </nav>
    </NavInner>
  )
}
