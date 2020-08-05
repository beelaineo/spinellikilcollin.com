import * as React from 'react'
import { PriceRangeFilter as PriceRangeFilterType } from '../../types'
import { FilterSetState } from './reducer'
import { PriceRangeFilterWrapper } from './styled'
import { Span } from '../Text'
import { HeadingWrapper, Slider, KnobHandle, KnobDot } from './styled'
import { Label } from '../Forms/Fields/styled'

const { useMemo, useEffect, useState } = React

const roundTo = (number: number, to: number) => Math.round(number / to) * to

const roundPrice = (price: number): number => roundTo(price, 100)

const parsePriceString = (price: number): string => {
  const roundedPrice = roundPrice(price)

  const amount =
    price < 1000
      ? roundedPrice.toString()
      : roundedPrice
          .toString()
          .replace(/(.*)(\d)00$/, `$1.$2k`)
          .replace('.0', '')
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
  upperLimit,
  lowerLimit,
  position,
  updatePosition,
  container,
}: KnobProps) => {
  const [mouseDown, setMouseDown] = useState(false)

  const handleMouseDown = () => setMouseDown(true)

  const release = () => setMouseDown(false)

  const handleMouseMove = (e: MouseEvent | TouchEvent) => {
    const mouseX = 'touches' in e ? e.touches[0].clientX : e.clientX
    if (!mouseDown || !container) return

    const { offsetWidth, offsetLeft } = container
    const diffPx = mouseX - offsetLeft
    const pos = Math.min(upperLimit, Math.max(lowerLimit, diffPx / offsetWidth))
    updatePosition(pos)
  }

  useEffect(() => {
    if (!mouseDown) return
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', release)
    window.addEventListener('touchmove', handleMouseMove)
    window.addEventListener('touchend', release)

    return () => {
      window.removeEventListener('mouseup', release)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchend', release)
      window.removeEventListener('touchmove', handleMouseMove)
    }
  }, [mouseDown])

  return (
    <KnobHandle position={position}>
      <KnobDot
        onTouchStart={handleMouseDown}
        onTouchEnd={release}
        onMouseDown={handleMouseDown}
        onMouseUp={release}
      />
    </KnobHandle>
  )
}

interface PriceRangeFilterValues {
  minPrice: number
  maxPrice: number
}

interface PriceRangeFilterProps {
  priceRangeFilter: PriceRangeFilterType
  filterSetState?: FilterSetState
  setValues: (matchKey: string, values: PriceRangeFilterValues) => void
  resetSet: () => void
  setKey: string
}

const getStep = (
  minPrice: number,
  maxPrice: number,
  step: number,
): number[] => {
  const stepCount = Math.floor(maxPrice / step)
  return Array.from({ length: stepCount }, (_, i) => i * step + minPrice)
}

const getSteps = (minPrice: number, maxPrice: number): number[] => {
  const steps = [
    ...getStep(minPrice, 1000, 100),
    ...getStep(1000, Math.min(maxPrice, 9999), 500),
    ...getStep(10000, maxPrice, 1000),
  ].reduce<number[]>((acc, i) => (acc.includes(i) ? acc : [...acc, i]), [])
  return steps
}

export function PriceRangeFilter({
  priceRangeFilter,
  filterSetState,
  setValues,
}: PriceRangeFilterProps) {
  const { _key } = priceRangeFilter
  if (!filterSetState) return null
  const { values } = filterSetState
  const { minPrice, maxPrice } = filterSetState.initialValues
  const [container, setContainerState] = useState<HTMLDivElement | null>(null)

  const [currentMinPrice, setCurrentMinPrice] = useState<number | null>(
    minPrice || null,
  )
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number | null>(
    maxPrice || null,
  )

  const steps = useMemo(() => getSteps(minPrice, maxPrice), [
    minPrice,
    maxPrice,
  ])

  if (!minPrice) {
    throw new Error(
      'The price range filter was not configured with a min price',
    )
  }
  if (!maxPrice) {
    throw new Error(
      'The price range filter was not configured with a max price',
    )
  }

  if (!filterSetState?.values) {
    throw new Error('The price range filter was not set up with initial values')
  }

  if (typeof currentMinPrice !== 'number') {
    throw new Error('currentMinPrice must be a number')
  }

  if (typeof currentMaxPrice !== 'number') {
    throw new Error('currentMaxPrice must be a number')
  }

  useEffect(() => {
    setCurrentMaxPrice(values.maxPrice)
    setCurrentMinPrice(values.minPrice)
  }, [values])

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log({ minPrice: currentMinPrice, maxPrice: currentMaxPrice })
      setValues('', { minPrice: currentMinPrice, maxPrice: currentMaxPrice })
    }, 300)
    return () => clearTimeout(timeout)
  }, [currentMinPrice, currentMaxPrice])

  if (
    maxPrice === undefined ||
    minPrice === undefined ||
    maxPrice === null ||
    minPrice === null ||
    currentMinPrice === null ||
    currentMaxPrice === null ||
    currentMinPrice === undefined ||
    currentMaxPrice === undefined
  ) {
    return null
  }
  const setContainer = (el: HTMLDivElement) => setContainerState(el)

  const currentMinPosition = currentMinPrice / maxPrice
  const currentMaxPosition = currentMaxPrice / maxPrice
  const updateMinPosition = (pos: number) => {
    const steppedMinPrice = steps[Math.round(pos * steps.length)] || steps[0]
    setCurrentMinPrice(steppedMinPrice)
  }
  const updateMaxPosition = (pos: number) => {
    const steppedMaxPrice =
      steps[Math.round(pos * steps.length)] || steps[steps.length - 1]
    setCurrentMaxPrice(steppedMaxPrice)
  }

  return (
    <PriceRangeFilterWrapper>
      <HeadingWrapper>
        <Label htmlFor={_key || 'some-key'}>
          <Span textTransform="uppercase" mr={2} color="body.9">
            Price Range:
          </Span>
          From {parsePriceString(currentMinPrice)} to{' '}
          {parsePriceString(currentMaxPrice)}
        </Label>
      </HeadingWrapper>
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
          upperLimit={1}
          lowerLimit={currentMinPosition}
          updatePosition={updateMaxPosition}
          container={container}
        />
      </Slider>
    </PriceRangeFilterWrapper>
  )
}
