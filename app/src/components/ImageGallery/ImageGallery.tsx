import * as React from 'react'

import {
  ActiveImageWrapper,
  ThumbnailsWrapper,
  ThumbnailWrapper,
  Wrapper,
} from './styled'
import { Image } from '../Image/Image'

import Lightbox, {
  SlotStyles,
  usePreventWheelDefaults,
} from 'yet-another-react-lightbox'
import { Slide } from './Slide'
import { Button } from '../Button'
import 'yet-another-react-lightbox/styles.css'
import { useLockScroll } from '../LockScroll'

interface ImageGalleryProps {
  images: any
}

export const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)
  const { lockScroll, unlockScroll } = useLockScroll()

  const slides = images.map((image, index) => {
    return { ...image, index: index }
  })

  const [open, setOpen] = React.useState(false)

  const onEnter = () => {
    setIsOpen(true)
  }
  const onExit = () => {
    setIsOpen(false)
  }

  React.useEffect(() => {
    if (isOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isOpen])

  console.log('isOpen', isOpen)
  return (
    <>
      <Wrapper>
        <ActiveImageWrapper onClick={() => setOpen(true)}>
          <Image image={images[activeIndex]} ratio={1} />
        </ActiveImageWrapper>

        <ThumbnailsWrapper>
          {images.map((image, index) => (
            <ThumbnailWrapper
              key={index}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <Image image={image} ratio={1} />
            </ThumbnailWrapper>
          ))}
        </ThumbnailsWrapper>
      </Wrapper>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={activeIndex}
        animation={{ swipe: 0 }}
        on={{ entered: () => onEnter(), exited: () => onExit() }}
        styles={
          {
            root: {
              '--yarl__color_backdrop': 'rgba(0, 0, 0, .66)',
              backdropFilter: 'blur(10px)',
            },
            container: {
              pointerEvents: 'none',
            },
            button: {
              display: 'none',
            },
            toolbar: {
              display: 'none',
            },
          } as SlotStyles
        }
        render={{
          slide: ({ slide }) => (
            <Slide
              slide={slide}
              slides={slides}
              setActiveIndex={setActiveIndex}
            />
          ),
        }}
      />
    </>
  )
}
