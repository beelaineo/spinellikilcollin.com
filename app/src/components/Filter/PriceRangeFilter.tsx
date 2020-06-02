import * as React from 'react'
import { PriceRangeFilter as PriceRangeFilterType } from '../../types'
import { PriceRangeFilterWrapper } from './styled'
import { Heading, Span } from '../Text'
import { Slider, KnobHandle, KnobDot, KnobLabel } from './styled'
import { Label } from '../Forms/Fields/styled'

const { useEffect, useState } = React

const roundTo = (number: number, to: number) => Math.round(number / to) * to

const parsePrice = (price: number): string => {
  const rounded = roundTo(price, 100).toString()
  const amount =
    price < 1000
      ? rounded
      : rounded.replace(/(.*)(\d)00$/, `$1.$2k`).replace('.0', '')
  return ['$', amount].join('')
}

interface KnobProps {
  position: number
  amount: number
  upperLimit: number
  lowerLimit: number
  updatePosition: (pos: number) => void
  container?: HTMLDivElement | null
}

const Knob = ({
  position,
  upperLimit,
  lowerLimit,
  updatePosition,
  container,
  amount,
}: KnobProps) => {
  const [mouseDown, setMouseDown] = useState(false)

  const handleMouseDown = () => setMouseDown(true)

  const release = () => setMouseDown(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (!mouseDown || !container) return
    const mouseX = e.clientX
    const { offsetWidth, offsetLeft } = container
    const diffPx = mouseX - offsetLeft
    const pos = diffPx / offsetWidth
    updatePosition(Math.min(upperLimit, Math.max(lowerLimit, pos)))
  }

  useEffect(() => {
    if (!mouseDown) return
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', release)
    return () => {
      window.removeEventListener('mouseup', release)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseDown])

  return (
    <KnobHandle position={position}>
      <KnobDot onMouseDown={handleMouseDown} onMouseUp={release} />
      <KnobLabel>
        <Heading level={4}>{parsePrice(amount)}</Heading>
      </KnobLabel>
    </KnobHandle>
  )
}

interface PriceRangeFilterProps {
  priceRangeFilter: PriceRangeFilterType
}

export const PriceRangeFilter = ({
  priceRangeFilter,
}: PriceRangeFilterProps) => {
  const { minPrice, maxPrice, _key } = priceRangeFilter
  const [container, setContainerState] = useState<HTMLDivElement | null>(null)
  const [currentMinPrice, setCurrentMinPrice] = useState<number | null>(
    minPrice || null,
  )
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number | null>(
    maxPrice || null,
  )

  if (
    maxPrice === undefined ||
    minPrice === undefined ||
    maxPrice === null ||
    minPrice === null ||
    currentMaxPrice === null ||
    currentMinPrice === null ||
    currentMaxPrice === null
  ) {
    return null
  }

  const setContainer = (el: HTMLDivElement) => setContainerState(el)

  const currentMinPosition = currentMinPrice / maxPrice
  const currentMaxPosition = currentMaxPrice / maxPrice
  const updateMinPosition = (pos: number) => setCurrentMinPrice(maxPrice * pos)
  const updateMaxPosition = (pos: number) => setCurrentMaxPrice(maxPrice * pos)
  return (
    <PriceRangeFilterWrapper>
      <Label htmlFor={_key || 'some-key'}>
        <Span textTransform="uppercase">Price Range:</Span>
        From {parsePrice(currentMinPrice)} to {parsePrice(currentMaxPrice)}
      </Label>
      <Slider ref={setContainer}>
        <Knob
          amount={currentMinPrice}
          position={currentMinPosition}
          upperLimit={currentMaxPosition}
          lowerLimit={0}
          updatePosition={updateMinPosition}
          container={container}
        />
        <Knob
          amount={currentMaxPrice}
          position={currentMaxPosition}
          upperLimit={maxPrice}
          lowerLimit={currentMinPosition}
          updatePosition={updateMaxPosition}
          container={container}
        />
      </Slider>
    </PriceRangeFilterWrapper>
  )
}
