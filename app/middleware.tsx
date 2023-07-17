import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { nextUrl: url, geo } = req
  const country = geo?.country || 'US'
  // // DUMMY COUNTRY FOR TESTING
  // const country = 'DE'

  // set cookie
  req.cookies.set('geolocate', country)
  const response = NextResponse.rewrite(url)
  response.cookies.set('geolocate', country)
  return response
}
