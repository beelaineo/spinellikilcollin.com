import { Maybe } from '../types'

export const propByPath = (path: string | string[], obj: object) => {
  const propPath = typeof path === 'string' ? path.split('.') : path
  const [firstKey, ...rest] = propPath
  return rest.length ? propByPath(rest, obj[firstKey]) : obj[firstKey]
}

export function isDefined<T>(x: Maybe<T>): x is T {
  return x !== undefined && x !== null
}

export const filterMaybes = <T extends any>(items: Maybe<T>[]): T[] => {
  return items.reduce<T[]>((acc, current) => {
    if (current) return [...acc, current]
    return acc
  }, [])
}
