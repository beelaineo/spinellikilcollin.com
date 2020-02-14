import { ProductInfoSettings, ProductInfo } from '../../types'

export function getInfoBlocksByType(
  type: string,
  productInfoBlocks: ProductInfoSettings,
): ProductInfo[] {
  const { infoByType } = productInfoBlocks
  if (!infoByType) return []

  const byType = infoByType.find((i) => i && i.type === type)
  const byTypeInfo = byType ? byType.info : []

  // @ts-ignore
  return byTypeInfo
}

export function getInfoBlocksByTag(
  productTags: string[],
  productInfoBlocks: ProductInfoSettings,
): ProductInfo[] {
  if (!productTags) return []
  const { infoByTag } = productInfoBlocks
  if (!infoByTag) return []

  return (
    infoByTag
      .filter((productInfo) => {
        if (!productInfo) return false
        const { tag, info } = productInfo
        /* Get matching tags */
        if (!tag || !info) return false
        return productTags.includes(tag)
      })
      // @ts-ignore
      .map(({ info }) => info)
      .reduce((acc, current) => [...acc, ...current], [])
  )
}
