import * as React from 'react'
import { ShopifyProduct } from '../../types'
import { useShopData } from '../../providers/ShopDataProvider'
import { definitely } from '../../utils'
import { Heading } from '../../components/Text'
import { TagBadge, TagBadgeWrapper } from './styled'

const { useMemo } = React

interface TagBadgesProps {
  product: ShopifyProduct
}

export const TagBadges = ({ product }: TagBadgesProps) => {
  const shopData = useShopData()
  const tagBadges = definitely(shopData?.productInfoSettings?.tagBadges)
  const tags = definitely(product?.sourceData?.tags)
  const matches = useMemo(
    () =>
      definitely(
        tagBadges.filter((tb) =>
          tags.find(
            (tag) => tb.tag && tb.tag.toLowerCase() === tag.toLowerCase(),
          ),
        ),
      ),
    [tagBadges],
  )

  if (!matches.length) return null
  return (
    <TagBadgeWrapper>
      {matches.map((match) => (
        <TagBadge key={match.tag || 'some-key'}>
          <Heading m={0} level={4} textTransform="uppercase">
            {match.label || match.tag}
          </Heading>
        </TagBadge>
      ))}
    </TagBadgeWrapper>
  )
}
