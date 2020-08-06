import * as React from 'react'

export const PageRedirect = () => {
  return null
}

export async function getServerSideProps({ res }) {
  res.setHeader('location', '/journal')
  res.statusCode = 302
  res.end()
  return { props: {} }
}

export default PageRedirect
