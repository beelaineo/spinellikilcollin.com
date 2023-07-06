import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { useSearch } from '../../providers/SearchProvider'
import { IoIosSearch } from 'react-icons/io'
import { Heading, Input } from '../Text'

const SearchInputWrapper = styled.div`
  margin-top: 4;
  margin-bottom: 6;
`

const Form = styled.form`
  ${({ theme }) => css`
    position: relative;

    &:has(input:focus-visible) {
      ${theme.focus.left()}
    }

    & > button {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 2;
      height: 100%;
      display: flex;
      align-items: center;

      &:focus-visible {
        ${theme.focus.bottom(0, 12)}
      }
    }
  `}
`

export const SearchInput = () => {
  const { search, searchTerm, openSearch, setSearchTerm } = useSearch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value
    setSearchTerm(newTerm)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    search(searchTerm)
  }

  return (
    <SearchInputWrapper>
      <Heading level={5} fontStyle="italic">
        What are you looking for?
      </Heading>
      <Form onSubmit={handleSubmit}>
        <Input
          value={searchTerm}
          onChange={handleChange}
          placeholder="search"
        />
        <button type="submit" aria-label="submit search query">
          <IoIosSearch />
        </button>
      </Form>
    </SearchInputWrapper>
  )
}
