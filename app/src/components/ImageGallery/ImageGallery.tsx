import * as React from 'react'

import {
  ActiveImageWrapper,
  ThumbnailsWrapper,
  ThumbnailWrapper,
  Wrapper,
} from './styled'
import { Image } from '../Image/Image'

import { Lightbox, SlotStyles } from 'yet-another-react-lightbox'
import { Slide } from './Slide'
import { useLockScroll } from '../LockScroll'

// eslint-disable-next-line import/no-unresolved
import 'yet-another-react-lightbox/styles.css'
import { useMedia } from '../../hooks'
import { Product } from '../../types'

interface ImageGalleryProps {
  product: Product
}

export const ImageGallery = ({ product }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isOpen, setIsOpen] = React.useState(false)

  const isMedium = useMedia({
    minWidth: '650px',
  })

  const { lockScroll, unlockScroll } = useLockScroll()

  const images =
    product?.contentAfter?.map((content) => content?.backgroundImage) || []

  const slides = images?.map((image, index) => {
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

  return (
    <>
      <Wrapper>
        <ActiveImageWrapper onClick={() => isMedium && setOpen(true)}>
          <Image image={images[activeIndex]} ratio={1} />
        </ActiveImageWrapper>

        <ThumbnailsWrapper>
          {images?.map((image, index) => (
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
        index={activeIndex}
        animation={{ swipe: 0 }}
        slides={slides}
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
