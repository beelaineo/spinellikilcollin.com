import * as React from 'react'
import { useRouter } from 'next/router'

export const PageRedirect = () => {
  return null
}

export async function getServerSideProps({ res }) {
  res.setHeader('location', '/about')
  res.statusCode = 302
  res.end()
  return { props: {} }
}

export default PageRedirect
