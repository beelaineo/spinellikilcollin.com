import * as React from 'react'
import { useSearch } from '../../providers/SearchProvider'
import { IoIosSearch } from 'react-icons/io'
import { IconContext } from 'react-icons'

export const SearchButton = () => {
  const { search, searchTerm, openSearch, setSearchTerm } = useSearch()
  const openSearchHandler = () => openSearch()

  return (
    <IconContext.Provider
      value={{ size: '100%', style: { verticalAlign: 'middle' } }}
    >
      <div onClick={openSearchHandler}>
        <IoIosSearch />
      </div>
    </IconContext.Provider>
  )
}
