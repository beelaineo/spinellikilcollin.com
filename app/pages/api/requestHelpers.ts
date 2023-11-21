export function idFromGid(gid: string): number {
  const parts = gid.split('/')
  const id = Number(parts[parts.length - 1])
  return isNaN(id) ? 0 : id
}
