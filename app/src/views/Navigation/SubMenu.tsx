import * as React from 'react'
import { SubMenu as SubMenuType } from '../../types'
import { SubMenuColumns } from './styled'
import { LinkGroup } from './LinkGroup'

const { useEffect, useRef } = React

interface SubMenuProps {
  submenu: SubMenuType
  active: boolean
}

export const SubMenu = ({ submenu, active }: SubMenuProps) => {
  const { title, columns } = submenu
  return null
  // return (
  //   <SubMenuColumns active={active}>
  //     {columns.map((col) => {
  //       switch (col.__typename) {
  //         case 'LinkGroup':
  //           return <LinkGroup key={col._key} linkGroup={col} />
  //         default:
  //           throw new Error(
  //             // @ts-ignore
  //             `Cannot create a column for type "${col.__typename}"`,
  //           )
  //       }
  //     })}
  //   </SubMenuColumns>
  // )
}
