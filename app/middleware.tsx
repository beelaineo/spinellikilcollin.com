import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo?.country || 'US'

  url.searchParams.set('country', country)

  if (
    (url.pathname.startsWith('/collections') || url.pathname === '/') &&
    country !== 'US'
  ) {
    return NextResponse.rewrite(url)
  }
}
