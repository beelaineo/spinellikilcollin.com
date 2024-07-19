export const addRecentlyViewedProduct = (productId, variantId) => {
  const viewedProducts =
    JSON.parse(localStorage.getItem('recentlyViewed') || '[]') || []

  // Find the index of the existing product
  const existingProductIndex = viewedProducts.findIndex(
    (p) => p.productId === productId && p.variantId === variantId,
  )

  // If the product exists, remove it from its current position
  if (existingProductIndex > -1) {
    viewedProducts.splice(existingProductIndex, 1)
  }

  // Add the product to the beginning of the array
  viewedProducts.unshift({ productId, variantId })

  // Ensure the list doesn't exceed 15 items
  if (viewedProducts.length > 15) {
    viewedProducts.pop()
  }

  localStorage.setItem('recentlyViewed', JSON.stringify(viewedProducts))
}

export const getRecentlyViewedProducts = () => {
  const recentlyViewed = localStorage.getItem('recentlyViewed')
  // console.log('recentlyViewed', recentlyViewed ?? '')

  try {
    return recentlyViewed ? JSON.parse(recentlyViewed) : []
  } catch (e) {
    console.error('Error parsing recently viewed products:', e)
    return []
  }
}
