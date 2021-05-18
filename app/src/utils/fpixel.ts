export const pageview = () => {
  window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  window.fbq('track', name, options)
}

export const viewContent = (options = {}) => {
  event('ViewContent', options)
}

export const addToCart = (options = {}) => {
  event('AddToCart')
}
