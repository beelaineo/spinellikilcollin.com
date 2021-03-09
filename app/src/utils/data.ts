import { Maybe } from '../types'

export const propByPath = (
  path: string | string[],
  obj: Record<string, any>,
) => {
  const propPath = typeof path === 'string' ? path.split('.') : path
  const [firstKey, ...rest] = propPath
  return rest.length ? propByPath(rest, obj[firstKey]) : obj[firstKey]
}

export function isDefined<T>(x: Maybe<T>): x is T {
  return x !== undefined && x !== null
}

export function definitely<T>(items?: Array<T | null | undefined> | null): T[] {
  if (!items) return []
  return items.filter((i): i is T => Boolean(i))
}

export const unique = <T>(array: T[]): T[] => {
  const set = new Set(array)
  return [...set]
}
