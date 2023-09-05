import * as React from 'react'
import { SlideContainer } from './styled'
import { auto } from '@cloudinary/url-gen/qualifiers/quality'

const { useRef, useEffect } = React

export interface SlideInfo {
  ref: HTMLDivElement
  index: number
}

export interface SlideProps {
  children: React.ReactNode
  columnCount?: number
  addSlide: (slide: SlideInfo) => void
  removeSlide: (index: number) => void
  index: number
  single?: boolean
  autocomplete?: boolean
}

export const Slide = ({
  index,
  addSlide,
  children,
  columnCount,
  removeSlide,
  single,
  autocomplete,
}: SlideProps) => {
  const containerElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ref = containerElement.current
    if (!ref) return
    addSlide({
      index,
      ref,
    })
    return () => removeSlide(index)
  }, [])

  return (
    <SlideContainer
      single={single}
      ref={containerElement}
      columnCount={columnCount}
      autocomplete={autocomplete}
    >
      {children}
    </SlideContainer>
  )
}
