import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { Filter, FilterMatch, FilterSet as FilterSetType } from '../../types'
import { Maybe } from '../../types'
import { Heading } from '../Text'
import { FilterIndicatorWrapper, DiamondWrapper, CloseButton } from './styled'
import { definitely } from '../../utils'
import { Label } from '../Forms/Fields/styled'
import { Diamond } from './Diamond'

interface FilterIndicatorProps {
  type?: Maybe<string>
  label?: Maybe<string>
  index: number
  key: string
  remove?: () => void
}

interface WithValue {
  value?: Maybe<string>
}

interface FilterValueLabelProps {
  value?: Maybe<string>
  index: number
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
      return 'background-color: transparent; border: 3px solid #818181;'
    case 'Pearls':
      return 'background-image: linear-gradient(90deg, #FBE5E3 0%, #D3ECE5 100%);'
    default:
      return ''
  }
}

const MetalIndicator = styled.div<WithValue>`
  ${({ theme, value }) => css`
    display: block;
    height: 17px;
    width: 17px;
    border: 1px solid ${theme.colors.grays[5]};
    border-radius: 100%;
    margin-left: -11px; 
    margin-top: -3px;
    margin-bottom: -3px;
    ${IndicatorStyle(value)}
    }
  `}
`

const StyleIndicator = styled.div<WithValue>`
  ${({ theme, value }) => css`
    display: block;
    height: 17px;
    width: 17px;
    border: 1px solid ${theme.colors.grays[5]};
    border-radius: 100%;
    margin-left: -11px;
    margin-top: -3px;
    margin-bottom: -3px;
    ${IndicatorStyle(value)}
    }
  `}
`

const FilterValueLabel = styled.div<FilterValueLabelProps>`
  ${({ theme, value, index }) => css`
    height: 100%;
    z-index: ${10 - index};
    ${IndicatorStyle(value)}
    h5 {
      border: 1px solid #979797;
      box-sizing: content-box;
      border-radius: 2em;
      margin-left: -33px;
      margin-right: -1px;
      margin-top: -1px;
      margin-bottom: -1px;
      padding: 2 4;
      padding-left: 39px;
      padding-right: 13px;
      justify-content: center;
      display: flex;
      width: min-content;
      height: 100%;
      align-items: center;
      border: 1px solid gray;
      line-height: 1;
      background-color: ${theme.colors.grays[4]};
    }
  `}
`

const StoneIndicatorPearl = styled.div<WithValue>`
  ${({ theme, value }) => css`
      display: block;
      height: 17px;
      width: 17px;
      border: 1px solid ${theme.colors.grays[5]};
      border-radius: 50%;
      margin-left: -11px; 
      margin-top: -6px;
      margin-bottom: -6px;
      ${IndicatorStyle(value)}
    }
  `}
`

const CloseButtonWrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    padding: 1;
    z-index: 2;
    cursor: initial;
    button {
      width: 8px;
      height: 8px;
    }
  `}
`

export const FilterIndicator = ({
  type,
  label,
  index,
  remove,
}: FilterIndicatorProps) => {
  if (!type) {
    throw new Error('No filter type was supplied')
  }

  switch (type) {
    case 'Type':
      return (
        <FilterValueLabel index={index} onClick={remove}>
          <Heading level={5}>
            {label}
            <CloseButtonWrapper>
              <CloseButton />
            </CloseButtonWrapper>
          </Heading>
        </FilterValueLabel>
      )
    case 'Bands':
      return (
        <FilterValueLabel index={index} onClick={remove}>
          <Heading level={5}>
            {label}
            <CloseButtonWrapper>
              <CloseButton />
            </CloseButtonWrapper>
          </Heading>
        </FilterValueLabel>
      )
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
