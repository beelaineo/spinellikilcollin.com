import * as React from 'react'

import {
  ImageWrapper,
  Navigation,
  NavLeft,
  NavRight,
  SlideContainer,
  SlideInner,
  SlideWrapper,
  TextWrapper,
  ThumbnailsWrapper,
  ThumbnailWrapper,
} from './styled'
import { Image } from '../Image/Image'
import CaretThin from '../../svg/CaretThin.svg'

import { useController, useLightboxState } from 'yet-another-react-lightbox'
import { Heading } from '../Text'
import { useKeyPressEvent } from 'react-use'

export function modulo(a: number, b: number) {
  return ((a % b) + b) % b
}

interface ImageGalleryProps {
  slide: any
  slides: any
  setActiveIndex: any
}

const stopPropagation = (event) => {
  event.preventDefault()
  event.stopPropagation()
}

export const Slide = ({ slide, slides, setActiveIndex }: ImageGalleryProps) => {
  const { currentIndex } = useLightboxState()

  const { close } = useController()

  const handleNext = () => {
    setActiveIndex(modulo(currentIndex + 1, slides.length))
  }

  const handlePrev = () => {
    setActiveIndex(modulo(currentIndex - 1, slides.length))
  }

  useKeyPressEvent('ArrowLeft', () => handlePrev())
  useKeyPressEvent('ArrowRight', () => handleNext())
  useKeyPressEvent('Escape', () => close())

  return (
    <SlideContainer>
      <SlideWrapper>
        <NavLeft
          title="Previous"
          aria-label="Previous"
          onClick={handlePrev}
          onPointerDown={stopPropagation}
          onKeyDown={stopPropagation}
        >
          <CaretThin />
        </NavLeft>
        <SlideInner onPointerDown={stopPropagation} onKeyDown={stopPropagation}>
          <TextWrapper>
            <span>
              <Heading level={4} color="white">
                {slide.title}
              </Heading>
              <Heading level={5} color="white">
                Size: {slide.size}
              </Heading>
            </span>
            <button onClick={() => close()}>
              <Heading level={5} color="white">
                CLOSE
              </Heading>
              <Heading level={5} color="white">
                X
              </Heading>
            </button>
          </TextWrapper>
          <ImageWrapper>
            <Image preload image={slide} ratio={1} draggable={false} />
          </ImageWrapper>
          <ThumbnailsWrapper>
            {slides.map((image, index) => {
              return (
                <ThumbnailWrapper
                  key={index}
                  isActive={currentIndex === index}
                  isOpen={true}
                  onClick={() => setActiveIndex(index)}
                >
                  <Image preload image={image} ratio={1} />
                </ThumbnailWrapper>
              )
            })}
          </ThumbnailsWrapper>
        </SlideInner>
        <NavRight
          title="Next"
          aria-label="Next"
          onClick={handleNext}
          onPointerDown={stopPropagation}
          onKeyDown={stopPropagation}
        >
          <CaretThin />
        </NavRight>
      </SlideWrapper>
    </SlideContainer>
  )
}
