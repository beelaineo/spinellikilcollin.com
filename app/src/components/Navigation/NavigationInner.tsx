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

type Maybe<T> = T | null | undefined

type QueryParam = {
  key?: Maybe<string>
  value?: Maybe<string | number | boolean>
}

type QueryParams = Maybe<QueryParam>[] | undefined

function transformQueryParams(
  queryParams: QueryParams,
): Record<string, string | number | boolean> | undefined {
  if (!queryParams) {
    return undefined
  }

  return queryParams.reduce(
    (acc: Record<string, string | number | boolean>, maybeParam) => {
      if (
        !maybeParam ||
        !maybeParam.key ||
        maybeParam.value === null ||
        maybeParam.value === undefined
      ) {
        return acc
      }

      acc[maybeParam.key] = maybeParam.value

      return acc
    },
    {},
  )
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
              if (menuItem.linkType === 'internal' && menuItem.link?.document) {
                const linkParams =
                  menuItem.link?.queryParams &&
                  menuItem.link?.queryParams.length > 0
                    ? transformQueryParams(menuItem.link.queryParams)
                    : undefined

                return (
                  <NavItemWrapper key={menuItem._key || 'some-key'}>
                    <PageLink
                      onClick={closeMenu}
                      link={menuItem.link}
                      linkParams={linkParams}
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
              } else if (
                menuItem.linkType == 'external' &&
                menuItem.link_external?.url
              ) {
                if (!(typeof menuItem.link_external?.url === 'string'))
                  return null
                return (
                  <NavItemWrapper key={menuItem._key || 'some-key'}>
                    <a
                      onClick={closeMenu}
                      href={menuItem.link_external?.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Heading m={0} level={4}>
                        {menuItem.label ? menuItem.label.toUpperCase() : ''}
                      </Heading>
                    </a>
                  </NavItemWrapper>
                )
              }
            default:
              return null
          }
        })}
      </nav>
    </NavInner>
  )
}
