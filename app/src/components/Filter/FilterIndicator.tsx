import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Filter, FilterMatch, FilterSet as FilterSetType } from '../../types'
import { Maybe } from '../../types'
import { Heading } from '../Text'
import { FilterIndicatorWrapper, DiamondWrapper } from './styled'
import { definitely } from '../../utils'
import { Label } from '../Forms/Fields/styled'
import { Diamond } from './Diamond'

interface FilterIndicatorProps {
  type?: Maybe<string>
  label?: Maybe<string>
  index: number
}

interface WithValue {
  value?: Maybe<string>
}

const IndicatorStyle = (value) => {
  switch (value) {
    case 'Silver':
      return 'background-color: #E2E2E1;'
    case 'Yellow Gold':
      return 'background-color: #F8E2B1;'
    case 'Rose Gold':
      return 'background-color: #F8D3BA;'
    case 'White Gold':
      return 'background-color: #ECEBEB;'
    case 'Black Gold':
      return 'background-color: #BCBCBC;'
    case 'Platinum':
      return 'background-color: #ECEBEB;'
    case 'Delicate':
      return 'background-color: transparent; border: 1px solid #818181;'
    case 'Bold':
      return 'background-color: transparent; border: 4px solid #818181;'
    case 'Pearls':
      return 'background-image: linear-gradient(90deg, #FBE5E3 0%, #D3ECE5 100%);'
    default:
      return ''
  }
}

const MetalIndicator = styled.div<WithValue>`
  ${({ theme, value }) => css`
    display: block;
    height: 24px;
    width: 24px;
    border: 1px solid ${theme.colors.grays[5]};
    border-radius: 100%;
    margin-left: -16px; 
    ${IndicatorStyle(value)}
    }
  `}
`

const StyleIndicator = styled.div<WithValue>`
  ${({ theme, value }) => css`
    display: block;
    height: 24px;
    width: 24px;
    border: 1px solid ${theme.colors.grays[5]};
    border-radius: 100%;
    margin-left: -16px; 
    ${IndicatorStyle(value)}
    }
  `}
`

const StoneIndicatorPearl = styled.div<WithValue>`
  ${({ theme, value }) => css`
      display: block;
      height: 24px;
      width: 24px;
      border: 1px solid ${theme.colors.grays[5]};
      border-radius: 100%;
      margin-left: -16px; 
      ${IndicatorStyle(value)}
    }
  `}
`

export const FilterIndicator = ({
  type,
  label,
  index,
}: FilterIndicatorProps) => {
  if (!type) {
    throw new Error('No filter type was supplied')
  }

  switch (type) {
    case 'Metal':
      return (
        <FilterIndicatorWrapper>
          <MetalIndicator value={label}></MetalIndicator>
        </FilterIndicatorWrapper>
      )
    case 'Style':
      return (
        <FilterIndicatorWrapper>
          <StyleIndicator value={label}></StyleIndicator>
        </FilterIndicatorWrapper>
      )
    case 'Stone':
      if (label === 'Pearls') {
        return (
          <FilterIndicatorWrapper>
            <StoneIndicatorPearl value={label} />
          </FilterIndicatorWrapper>
        )
      } else {
        return (
          <DiamondWrapper>
            <Diamond value={label} />
          </DiamondWrapper>
        )
      }
    default:
      return (
        <FilterIndicatorWrapper>
          <Heading textTransform="uppercase" mt={0} mb={0} level={5}>
            {label} - {index + 1}
          </Heading>
        </FilterIndicatorWrapper>
      )
  }
}
