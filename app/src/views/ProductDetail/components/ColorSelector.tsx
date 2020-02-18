import * as React from 'react'
import styled from '@xstyled/styled-components'
import { ShopifyProductOption } from '../../../types'
import { Image } from '../../../components/Image'

interface ColorSelectorProps {
  option: ShopifyProductOption
}

const SwatchButton = styled.button`
  width: 28px;
  & + & {
    margin-left: 2;
  }
`

export const ColorSelector = ({ option }: ColorSelectorProps) => {
  const { values } = option
  if (!values) return null
  return (
    <>
      {values.map((value) => {
        if (!value) return null
        const swatch = value.swatch
        if (!swatch) {
          console.warn(`There is no swatch for the option "${value.value}"`)
          return null
        }

        return (
          <SwatchButton key={value._key || 'some-key'}>
            <Image image={swatch} ratio={1} />
          </SwatchButton>
        )
      })}
    </>
  )
}
