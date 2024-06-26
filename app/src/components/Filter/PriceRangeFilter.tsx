import * as React from 'react'
import { PriceRangeMinMaxFilter as PriceRangeMinMaxFilterType } from '../../types'
import { FilterSetState } from './types'
import {
  PriceRangeFilterWrapper,
  HeadingWrapper,
  Slider,
  KnobHandle,
  KnobDot,
} from './styled'
import { Span } from '../Text'
import { Label } from '../Forms/Fields/styled'
import { useMedia } from '../../hooks'
import { parseAsString, useQueryState } from 'nuqs'
import { useDebounce } from 'react-use'

const { useMemo, useEffect, useState } = React

const roundTo = (number: number, to: number) => Math.round(number / to) * to

export const roundPrice = (price: number): number => roundTo(price, 100)

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
  upperLimit: number
  lowerLimit: number
  updatePosition: (pos: number) => void
  scrollGridIntoView: () => void
  container?: HTMLDivElement | null
}

const Knob = ({
  upperLimit,
  lowerLimit,
  position,
  updatePosition,
  container,
  scrollGridIntoView,
}: KnobProps) => {
  const [mouseDown, setMouseDown] = useState(false)

  const handleMouseDown = () => setMouseDown(true)

  const release = () => {
    setMouseDown(false)
    scrollGridIntoView()
  }

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
  priceRangeFilter: PriceRangeMinMaxFilterType
  filterSetState?: FilterSetState
  setValues: (matchKey: string, values: PriceRangeFilterValues) => void
  resetSet: () => void
  scrollGridIntoView: () => void
  setKey: string
  active: boolean
}

const getStep = (
  minPrice: number,
  maxPrice: number,
  step: number,
): number[] => {
  const stepCount = Math.floor((maxPrice - minPrice) / step)
  return Array.from({ length: stepCount }, (_, i) => i * step + minPrice)
}

const getSteps = (minPrice: number, maxPrice: number): number[] => {
  const steps = [
    ...getStep(minPrice, 1000, 100),
    ...getStep(1000, Math.min(maxPrice, 9999), 500),
    ...getStep(10000, maxPrice, 1000),
    maxPrice,
  ].reduce<number[]>((acc, i) => (acc.includes(i) ? acc : [...acc, i]), [])
  return steps
}

export function PriceRangeFilter({
  priceRangeFilter,
  filterSetState,
  resetSet,
  scrollGridIntoView,
  setValues,
  active,
}: PriceRangeFilterProps) {
  const { _key } = priceRangeFilter

  const { minPrice: initialMinPrice, maxPrice: initialMaxPrice } =
    filterSetState?.initialValues || {}
  const { minPrice, maxPrice } = filterSetState?.values || {}

  if (minPrice === null || minPrice === undefined) {
    throw new Error(
      'The price range filter was not configured with a min price',
    )
  }
  if (maxPrice === null || maxPrice === undefined) {
    throw new Error(
      'The price range filter was not configured with a max price',
    )
  }

  if (!filterSetState?.values) {
    throw new Error('The price range filter was not set up with initial values')
  }

  const [container, setContainerState] = useState<HTMLDivElement | null>(null)

  const [price, setPrice] = useQueryState('price', parseAsString)

  const [currentMinPrice, setCurrentMinPrice] = useState(100 / initialMaxPrice)
  const [currentMaxPrice, setCurrentMaxPrice] = useState(
    maxPrice / initialMaxPrice,
  )

  const [applyFilter, setApplyFilter] = useState(false)
  const [mouseEnter, setMouseEnter] = useState(false)
  const handleMouseEnter = () => setMouseEnter(true)
  const handleMouseLeave = () => setMouseEnter(false)

  const steps = useMemo(
    () => getSteps(initialMinPrice, initialMaxPrice),
    [initialMinPrice, initialMaxPrice],
  )

  const getClosestStep = (pos: number) => {
    const index = Math.round(
      Math.max(0, Math.min(steps.length - 1, steps.length * pos)),
    )
    return steps[index]
  }

  const getClosestIndex = (num: number | string) => {
    const numCheck = typeof num === 'string' ? parseInt(num) : num

    const diffArr = steps.map((x) => Math.abs(numCheck - x))
    const minNumber = Math.min(...diffArr)
    const index = diffArr.findIndex((x) => x === minNumber)

    return index
  }

  useEffect(() => {
    const resetUI = () => {
      setApplyFilter(false)
      updateMinPosition(0)
      updateMaxPosition(1)
      setPrice(null)
    }
    filterSetState.initialValues == filterSetState.values ? resetUI() : null
  }, [filterSetState])

  useDebounce(
    () => {
      if (
        getClosestStep(currentMinPrice) === initialMinPrice &&
        getClosestStep(currentMaxPrice) === initialMaxPrice
      )
        return

      if (
        !getClosestStep(currentMinPrice) === initialMinPrice &&
        !getClosestStep(currentMaxPrice) === initialMaxPrice
      ) {
        setValues('', {
          minPrice: getClosestStep(currentMinPrice),
          maxPrice: getClosestStep(currentMaxPrice),
        })
      }
      setApplyFilter(
        getClosestStep(currentMinPrice) === initialMinPrice &&
          getClosestStep(currentMaxPrice) === initialMaxPrice
          ? false
          : true,
      )

      setPrice(
        `${getClosestStep(currentMinPrice)} ${getClosestStep(currentMaxPrice)}`,
      )
    },
    300,
    [currentMinPrice, currentMaxPrice],
  )

  console.log(
    'price',
    price,
    'currentMinPrice',
    currentMinPrice,
    'currentMaxPrice',
    currentMaxPrice,
    getClosestStep(currentMinPrice),
    getClosestStep(currentMaxPrice),
    'minPrice',
    minPrice,
    'maxPrice',
    maxPrice,
  )

  useEffect(() => {
    if (
      getClosestStep(currentMinPrice) === initialMinPrice &&
      getClosestStep(currentMaxPrice) === initialMaxPrice
    )
      return

    setPrice(`${minPrice} ${maxPrice}`)
  }, [minPrice, maxPrice])

  const setContainer = (el: HTMLDivElement) => setContainerState(el)

  const updateMinPosition = (pos: number) =>
    setCurrentMinPrice(pos >= 1 ? 0 : pos)
  const updateMaxPosition = (pos: number) =>
    setCurrentMaxPrice(pos <= 0 ? 1 : pos)

  const isMobile = useMedia({
    maxWidth: `960px`,
  })

  const echoPriceString = () => {
    return `${parsePriceString(
      getClosestStep(currentMinPrice),
    )}-${parsePriceString(getClosestStep(currentMaxPrice))}`
  }

  useEffect(() => {
    if (!price) return

    const minPos = getClosestIndex(price.split(' ')[0])
    const maxPos = getClosestIndex(price.split(' ')[1])

    updateMinPosition(minPos / steps.length)
    updateMaxPosition(maxPos / steps.length)

    setCurrentMaxPrice(maxPos / steps.length)
    setCurrentMinPrice(minPos / steps.length)
  }, [price])

  if (!filterSetState) return null

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

  return (
    <PriceRangeFilterWrapper
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      isApplied={applyFilter}
    >
      <HeadingWrapper>
        <Label htmlFor={_key || 'some-key'}>
          <Span textTransform="uppercase" mr={2} color="body.9">
            Price:
          </Span>
          {echoPriceString()}
        </Label>
      </HeadingWrapper>
      <Slider
        ref={setContainer}
        isHovered={
          Boolean(!isMobile && mouseEnter) || Boolean(isMobile && active)
        }
      >
        <Knob
          position={currentMinPrice}
          upperLimit={currentMaxPrice}
          lowerLimit={0}
          updatePosition={updateMinPosition}
          container={container}
          scrollGridIntoView={scrollGridIntoView}
        />
        <Knob
          position={currentMaxPrice}
          upperLimit={1}
          lowerLimit={currentMinPrice}
          updatePosition={updateMaxPosition}
          container={container}
          scrollGridIntoView={scrollGridIntoView}
        />
      </Slider>
    </PriceRangeFilterWrapper>
  )
}
