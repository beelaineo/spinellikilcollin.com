import * as React from 'react'
import { SubMenu as SubMenuType } from '../../types/generated'
import { NavInner } from './styled'
import { Header4Italic, Input, Form } from '../../components/Text'
import { IoIosSearch } from 'react-icons/io'

export const NavigationInner = () => {
  return (
    <NavInner>
      <div>
        <Header4Italic>What are you looking for?</Header4Italic>
        <Form>
          <Input placeholder="search" />
          <button type="submit">
            <IoIosSearch />
          </button>
        </Form>
      </div>
      <div>
        <ul>
          <li>New Releases</li>
          <li>Rings</li>
          <li>Earrings</li>
        </ul>
      </div>
    </NavInner>
  )
}
