export function uniqBy(predicate) {
  return function runUniqBy(...rawSources) {
    const sources = rawSources.flat().filter(Boolean)
    const seen = new Set()

    return sources.map((source) => {
      const items = source.getItems().filter((item) => {
        const appliedItem = predicate({ source, item }).toLowerCase()
        const hasSeen = seen.has(appliedItem)

        seen.add(appliedItem)

        return !hasSeen
      })

      return {
        ...source,
        getItems() {
          return items
        },
      }
    })
  }
}

function debouncePromise(fn, time) {
  let timerId = undefined

  return function debounced(...args) {
    if (timerId) {
      clearTimeout(timerId)
    }

    return new Promise((resolve) => {
      //@ts-ignore
      timerId = setTimeout(() => resolve(fn(...args)), time)
    })
  }
}

export const debounced = debouncePromise((items) => Promise.resolve(items), 100)
