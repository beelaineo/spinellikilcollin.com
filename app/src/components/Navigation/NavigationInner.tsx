import * as React from 'react'
import { Menu } from '../../types'
import { NavInner, NavItemWrapper } from './styled'
import { Heading, Input } from '../../components/Text'
import { PageLink } from '../../components/PageLink'
import { SubMenu } from './SubMenu'
import { IoIosSearch } from 'react-icons/io'

interface NavigationInnerProps {
  menu?: Menu
}

export const NavigationInner = ({ menu }: NavigationInnerProps) => {
  if (!menu) return null
  const menuItems = menu?.menuItems || []
  return (
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
  )
}
