import * as React from 'react'
import { Header2, Header4, Header5 } from 'Components/Text'
import {
  FlexContainer,
  FlexHalf,
  FlexThree,
  FlexFour,
} from '../../components/Layout/Flex'
import { FilterInner, FilterBody, Checkbox, FilterList } from './styled'
import { useState, useReducer } from 'react'
import { addListener } from 'cluster'

interface ProductListingFilter {}

const mockData = [
  {
    name: 'Stones',
    tags: [
      'White Diamonds',
      'Grey Diamonds',
      'Cognac',
      'Champagne',
      'Black',
      'Ruby',
      'Sapphire',
      'Pearl',
    ],
  },
  {
    name: 'Metal',
    tags: ['YG', 'WG', 'RG', 'BG', 'Silver', 'Platinum', 'Black Rhodes'],
  },
  {
    name: 'Type',
    tags: [
      'Rings',
      'Earrings',
      'Necklace',
      'Bracelet',
      'Sunglasses',
      'Objects',
      'Furniture',
    ],
  },
]

export const ProductListingFilter = () => {
  const [open, toggleOpen] = useState(false)

  const toggleFilter = () => {
    open === true ? toggleOpen(false) : toggleOpen(true)
  }

  return (
    <FlexContainer>
      <FilterInner>
        <button onClick={toggleFilter}>
          Filter
          {open === true ? ' —' : ' +'}
        </button>
        <FilterBody open={open}>
          <FlexContainer>
            {mockData.map((filter) => {
              return (
                <FlexThree>
                  <Header5 transform="uppercase">{filter.name}</Header5>
                  <FilterList>
                    <li>
                      <Checkbox
                        type="checkbox"
                        name="filter"
                        id={`filter-view-all`}
                      />
                      <span></span>
                      <label for={`filter-view-all`}>View All</label>
                    </li>
                    {filter.tags.map((item, i) => {
                      return (
                        <li>
                          <Checkbox
                            type="checkbox"
                            name="filter"
                            id={`filter-${item}`}
                          />
                          <span></span>
                          <label for={`filter-${item}`}>{item}</label>
                        </li>
                      )
                    })}
                  </FilterList>
                </FlexThree>
              )
            })}

            <FlexFour>
              <Header5 transform="uppercase">
                PRICE RANGE: from 1k to 30k
              </Header5>
              <div>
                <input type="range" id="start" name="price" min="0" max="40" />
                {/* <label for="price">Volume</label> */}
              </div>
            </FlexFour>
          </FlexContainer>
        </FilterBody>
      </FilterInner>
    </FlexContainer>
  )
}
