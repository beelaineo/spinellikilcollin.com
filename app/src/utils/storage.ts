import Cookies from 'js-cookie'

interface CookieConfig {
  expires?: number
  path?: string
}

export const setCookie = (key: string, val: any, config?: CookieConfig) => {
  const defaults = {
    expires: 7,
    path: '/',
  }
  const settings = Object.assign(defaults, config)
  const stringified = JSON.stringify(val)
  Cookies.set(key, stringified, settings)
}

export const getCookie = (key: string) => {
  const value = Cookies.get(key)
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export const removeCookie = (key: string) => {
  Cookies.remove(key)
}
