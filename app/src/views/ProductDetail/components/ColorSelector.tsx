import * as React from 'react'
import styled from '@xstyled/styled-components'
import { ShopifyProductOption } from '../../../types'
import { Image } from '../../../components/Image'

interface ColorSelectorProps {
  option: ShopifyProductOption
  selectOption: (value: string) => void
}

const SwatchButton = styled.button`
  width: 28px;
  & + & {
    margin-left: 2;
  }
`

export const ColorSelector = ({ option, selectOption }: ColorSelectorProps) => {
  const { values } = option
  if (!values) return null
  const boop = (value: string) => () => selectOption(value)
  return (
    <>
      {values.map((v) => {
        if (!v) return null
        const { swatch, value } = v
        if (!swatch) {
          console.warn(`There is no swatch for the option "${value}"`)
          return null
        }
        if (!value) {
          console.warn(`There is no value for the option "${value}"`)
          return null
        }

        return (
          <SwatchButton onClick={boop(value)} key={v._key || 'some-key'}>
            <Image image={swatch} ratio={1} />
          </SwatchButton>
        )
      })}
    </>
  )
}
