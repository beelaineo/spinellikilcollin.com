import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const BLOCKED_COUNTRY = 'KR'

export function middleware(request: NextRequest) {
  const country = (request.geo && request.geo.country) || 'US'
  // console.log(`Visitor from ${country}`)
  if (country === BLOCKED_COUNTRY) {
    return NextResponse.rewrite('https://spinellikilcollinkorea.com/')
  }
  return NextResponse.next()
}
