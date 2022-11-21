import * as React from 'react'
import styled, { css } from '@xstyled/styled-components'
import { ProductThumb, ProductInfo } from './styled'
import { ProductThumbnail } from './ProductThumbnail'
import {
  Maybe,
  ShopifyProduct,
  ShopifyCollection,
  CollectionBlock as CollectionBlockType,
  FilterConfiguration,
} from '../../types'
import { CollectionThumbnail, CollectionBlock } from '../Collection'
import { Sort } from '../Filter'
import { definitely } from '../../utils'
import { useWindowScroll, useMeasure, useDebounce } from 'react-use'
import { useRouter } from 'next/router'

interface ProductGridWrapperProps {
  reduceColumnCount?: boolean | null
  ref?: any
}

const ProductGridWrapper = styled.div<ProductGridWrapperProps>`
  ${({ theme, reduceColumnCount }) => css`
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(${reduceColumnCount ? '2' : '3'}, 1fr);
    justify-content: space-evenly;
    padding: 0;
    grid-auto-rows: min-content;
    grid-auto-flow: row dense;

    > a {
      text-decoration: none;
    }

    ${theme.mediaQueries.tablet} {
      grid-template-columns: ${reduceColumnCount ? '1fr' : 'repeat(2, 1fr)'};
      display: ${reduceColumnCount ? 'block' : 'grid'};
    }
    ${theme.mediaQueries.mobile} {
      display: block;
      grid-template-columns: 1fr;
    }
  `}
`

interface WithFormat {
  format?: string | null
}

export const ProductGridItemPadding = styled.div<WithFormat>`
  ${({ format, theme }) => css`
    padding-bottom: ${format === 'wide'
      ? '50%'
      : format === 'tall'
      ? '200%'
      : '100%'};

    ${theme.mediaQueries.mobile} {
      padding-bottom: ${format === 'wide'
        ? '100%'
        : format === 'tall'
        ? '200%'
        : '100%'};
    }
  `}
`

export const ProductGridItem = styled.div<WithFormat>`
  ${({ theme, format }) => css`
    grid-column: ${format === 'wide' ? 'span 2' : 'auto'};
    grid-row: ${format === 'tall' ? 'span 2' : 'auto'};
    position: relative;

    ${theme.mediaQueries.tablet} {
      grid-column: ${format === 'wide' ? 'span 2' : 'auto'};
      grid-row: ${format === 'tall' ? 'span 2' : 'auto'};
    }
    ${theme.mediaQueries.mobile} {
      grid-column: ${format === 'wide' ? 'span 1' : 'auto'};
      grid-row: ${format === 'tall' ? 'span 2' : 'auto'};
    }

    ${ProductThumb} {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    ${ProductInfo} {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  `}
`

interface ProductGridProps {
  items: Array<ShopifyProduct | ShopifyCollection | CollectionBlockType>
  preferredVariantMatches?: Maybe<string>[] | null
  currentFilter?: FilterConfiguration | null
  currentSort?: Sort | null
  hideFilter?: boolean | null
  reduceColumnCount?: boolean | null
  collectionId?: string | null
}

export const ProductGrid = ({
  preferredVariantMatches,
  currentFilter,
  currentSort,
  hideFilter,
  items,
  reduceColumnCount,
  collectionId,
}: ProductGridProps) => {
  // const { y } = useWindowScroll()

  // const pageRef = React.useRef(null)
  // const [height, setHeight] = React.useState(0)
  // const router = useRouter()

  // const updateQueryParam = (query) => {
  //   router.replace(
  //     {
  //       query: query,
  //     },
  //     '',
  //     { shallow: true },
  //   )
  // }

  // // React.useEffect(() => {
  // //   if (!router.isReady) return
  // //   console.log('currentFilter', currentFilter)
  // //   setHeight(pageRef.current.getBoundingClientRect().height)
  // // }, [currentFilter])

  // console.log('height', height)

  // React.useEffect(() => {
  //   if (!router.isReady) return
  //   console.log('calcued', height * parseFloat(router.query.pos as string))

  //   if (router.query.pos) {
  //     window.scrollTo({
  //       top: height * parseFloat(router.query.pos as string),
  //       behavior: 'smooth',
  //     })
  //   }
  // }, [currentFilter])

  // console.log(router.query.pos)

  // useDebounce(
  //   () => {
  //     if (!router.isReady) return

  //     setHeight(pageRef.current.getBoundingClientRect().height)

  //     const min = 0
  //     const max = 1

  //     const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

  //     const yPos = clamp(y / height, min, max)

  //     if (yPos !== 0) {
  //       updateQueryParam({ ...router.query, pos: yPos.toFixed(3) })
  //     } else {
  //       const { pos, ...removeFromQuery } = router.query

  //       updateQueryParam({ ...removeFromQuery })
  //     }
  //   },
  //   250,
  //   [y],
  // )

  return (
    <ProductGridWrapper reduceColumnCount={reduceColumnCount}>
      {definitely(items).map((item) => {
        switch (item.__typename) {
          case 'CollectionBlock':
            return (
              <ProductGridItem
                format={item.format}
                key={item._key || 'some-key'}
              >
                <ProductGridItemPadding format={item.format} />
                <CollectionBlock format={item.format} collectionBlock={item} />
              </ProductGridItem>
            )
          case 'ShopifyProduct':
            return (
              <ProductGridItem key={item._id || 'some-key'}>
                <ProductGridItemPadding />
                <ProductThumbnail
                  product={item}
                  displayPrice
                  imageRatio={1}
                  preferredVariantMatches={preferredVariantMatches}
                  currentFilter={currentFilter}
                  currentSort={currentSort}
                  hideFilter={hideFilter}
                  collectionId={collectionId}
                />
              </ProductGridItem>
            )
          case 'ShopifyCollection':
            return (
              <ProductGridItem key={item._id || 'some-key'}>
                <ProductGridItemPadding />
                <CollectionThumbnail collection={item} />
              </ProductGridItem>
            )
        }
      })}
    </ProductGridWrapper>
  )
}
