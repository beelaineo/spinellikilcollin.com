import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { IoIosSearch } from 'react-icons/io'
import { useShopData } from '../../providers/ShopDataProvider'
import { NavInner, HamburgerWrapper, NavItemWrapper } from './styled'
import { Heading, Input } from '../Text'
import { PageLink } from '../PageLink'
import { SubMenu } from './SubMenu'
import { Hamburger } from '../Hamburger'
import { SearchInput } from './SearchInput'

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
        <SearchInput />
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
                        <Heading m={0} level={4}>
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
