import * as React from 'react'
import { Filter, FilterMatch, FilterSet as FilterSetType } from '../../types'
import { Maybe } from '../../types'
import { Heading } from '../Text'
import { FilterIndicatorWrapper } from './styled'
import { definitely } from '../../utils'
import { Label } from '../Forms/Fields/styled'

interface FilterIndicatorProps {
  type?: Maybe<string>
  label?: Maybe<string>
  index: number
}

export const FilterIndicator = ({
  type,
  label,
  index,
}: FilterIndicatorProps) => {
  if (!type) {
    throw new Error('No filter type was supplied')
  }

  return (
    <FilterIndicatorWrapper>
      <Heading textTransform="uppercase" mt={0} mb={0} level={5}>
        {label} - {index + 1}
      </Heading>
    </FilterIndicatorWrapper>
  )
}
