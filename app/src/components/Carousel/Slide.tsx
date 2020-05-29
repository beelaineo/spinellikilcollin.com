import * as React from 'react'
import { SlideContainer } from './styled'

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
}

export const Slide = ({
  index,
  addSlide,
  children,
  columnCount,
  removeSlide,
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
    <SlideContainer ref={containerElement} columnCount={columnCount}>
      {children}
    </SlideContainer>
  )
}
