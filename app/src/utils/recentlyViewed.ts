export const addRecentlyViewedProduct = (productId, variantId) => {
  const viewedProducts =
    JSON.parse(localStorage.getItem('recentlyViewed') || '[]') || []
  const productExists = viewedProducts.find((p) => p.id === productId)

  if (!productExists) {
    viewedProducts.push(variantId)
    if (viewedProducts.length > 15) {
      viewedProducts.shift()
    }
    localStorage.setItem('recentlyViewed', JSON.stringify(viewedProducts))
  }
}

export const getRecentlyViewedProducts = () => {
  console.log('recentlyViewed', localStorage.getItem('recentlyViewed') ?? '')
  return JSON.parse(localStorage.getItem('recentlyViewed') ?? '') || []
}
