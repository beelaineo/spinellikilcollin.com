export const roundTo = (num: number, places: number) =>
  Math.round((num + Number.EPSILON) * Math.pow(10, places)) /
  Math.pow(10, places)
