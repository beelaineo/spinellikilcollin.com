import * as React from 'react'

export const InvoiceRedirect = () => {
  return null
}

export const getServerSideProps = ({ res, params }) => {
  const newLocation = [
    'https://spinellikilcollin.myshopify.com/11052238',
    ...params.params,
  ].join('/')
  res.setHeader('location', newLocation)
  res.statusCode = 301
  res.end()
  return { props: { shopData: {} } }
}

export default InvoiceRedirect
