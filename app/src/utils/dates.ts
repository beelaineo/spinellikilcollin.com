const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]
export const niceDate = (inputDate: Date | string): string => {
  const date = inputDate instanceof Date ? inputDate : new Date(inputDate)

  const month = months[date.getMonth()]
  const day = (date.getDate() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}
