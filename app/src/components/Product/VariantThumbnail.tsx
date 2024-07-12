import * as React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { FilterConfiguration, Maybe, ShopifyProductVariant } from '../../types'
import { Heading } from '../Text'
import { Image } from '../Image'

import { getProductUri } from '../../utils'
import { ImageWrapper, ProductInfo, ProductThumb } from './styled'
import styled, { css } from '@xstyled/styled-components'
import { Sort } from '../Filter'

const { useRef } = React

import { config } from '../../config'

const { SHOW_IN_STOCK_INDICATORS } = config

interface VariantThumbnailProps {
  variant: ShopifyProductVariant
  preload?: boolean
  headingLevel?: number
  preferredVariantMatches?: Maybe<string>[] | null
  currentFilter?: FilterConfiguration | null
  currentSort?: Sort | null
  hideFilter?: boolean | null
  imageRatio?: number
  collectionId?: string | null
  carousel?: boolean
}

interface VariantAnimation {
  __typename: 'CloudinaryVideo'
  videoId?: Maybe<string>
}

interface WithCurrentlyInStock {
  currentlyInStock?: boolean
}

const TitleHeading = styled(Heading)<WithCurrentlyInStock>`
  ${({}) => css``}
`

const InStockDot = styled('span')`
  display: inline-block;
  background-color: #00d009;
  width: 10px;
  height: 10px;
  border-radius: 100%;
  position: absolute;
  margin-top: 6px;
  margin-left: -18px;
  border: 1px solid #f5f3f3;
  @media screen and (max-width: 960px) {
    margin-top: 4px;
  }
`
const PriceWrapper = styled('span')`
  ${({ theme }) => css`
    display: inline-block;
    width: 38px;
    text-align: left;
    ${theme.mediaQueries.mobile} {
      width: 24px;
    }
  `}
`

// const getIncludedVariants = async (
//   product: Product,
// ): Promise<ShopifyStorefrontProductVariant[] | null> => {
//   const variants = await sanityQuery(
//     `*[_type == 'product' && handle == $handle][0].store.variants[sourceData.metafields[key == "excludeFromIndication"].value == "false"]`,
//     { handle: product?.handle },
//   )
//   return variants
// }

export const VariantThumbnail = ({
  variant,
  headingLevel,
  imageRatio,
}: VariantThumbnailProps) => {
  const { asPath } = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  // console.log('initialVariantSelections:', initialVariantSelections)

  // console.log('initialVariant:', initialVariant)

  const altText = [variant?.title, variant?.title].filter(Boolean).join(' - ')

  // const linkAs = getProductUri(variant, {
  //   variant: variant,
  //   currentPath: asPath,
  // })

  return (
    <ProductThumb ref={containerRef}>
      <Link
        href="/products/[productSlug]"
        // as={linkAs}
        draggable="false"
        aria-label={'Link to ' + variant.title}
      >
        <ImageWrapper>
          <Image
            image={variant?.sourceData?.image}
            ratio={imageRatio || 1}
            sizes="(min-width: 1200px) 30vw, (min-width: 1000px) 50vw, 90vw"
            preload
            altText={altText}
            placeholder="shadow"
          />
        </ImageWrapper>

        <ProductInfo>
          <TitleHeading textAlign="center" my={0} level={headingLevel || 3}>
            {variant.title}
          </TitleHeading>
        </ProductInfo>
      </Link>
    </ProductThumb>
  )
}
