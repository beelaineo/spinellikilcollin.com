export const getIdFromBase64 = (data: string): string => {
  let id = 'gid://'
  const indentifier = 'gid://'
  const buffer = Buffer.from(decodeURIComponent(data), 'base64')
  const frag = buffer.toString('utf-8').split(indentifier)
  if (frag.length >= 2) {
    const last = frag[1].split('/').pop()

    if (last) {
      id = last
    }
  }

  return id
}
