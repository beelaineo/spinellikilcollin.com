import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false,
  },
}

const logError = (message, context) => {
  console.error(
    JSON.stringify({
      message,
      context,
      level: 'error',
      timestamp: new Date().toISOString(),
    }),
  )
}
const logInfo = (message, context) => {
  console.log(
    JSON.stringify({
      message,
      context,
      level: 'info',
      timestamp: new Date().toISOString(),
    }),
  )
}

const generateUniqueId = () => {
  // Implementation to generate a unique request ID
  return Date.now().toString()
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }
  const { type, slug } = req.query
  const requestId = generateUniqueId()
  console.log('revalidating', `type: ${type}`, `slug: ${slug}`)

  try {
    logInfo('Attempting revalidation', {
      requestId,
      type,
      slug,
    })
    switch (type) {
      case 'homepage':
        await res.revalidate(`/`)
        return res.json({
          message: `Revalidated "${type}"`,
        })
      case 'menu':
        await res.revalidate(`/`)
        return res.json({
          message: `Revalidated "${type}"`,
        })
      case 'siteSettings':
        await res.revalidate(`/`)
        return res.json({
          message: `Revalidated "${type}"`,
        })
      case 'about':
        await res.revalidate(`/about`)
        return res.json({
          message: `Revalidated "${type}"`,
        })
      case 'emailSignatureSettings':
        await res.revalidate(`/email-signatures`)
        return res.json({
          message: `Revalidated "${type}"`,
        })
      case 'journalEntry':
        await res.revalidate(`/journal/${slug}`)
        await res.revalidate(`/journal`)
        return res.json({
          message: `Revalidated "${type}" with slug "${slug}"`,
        })
      case 'customize':
        await res.revalidate(`/customize`)
        return res.json({
          message: `Revalidated "${type}"`,
        })
      case 'teamPage':
        await res.revalidate(`/about/team`)
        return res.json({
          message: `Revalidated "${type}"`,
        })
      case 'faq':
        await res.revalidate(`/about/faq`)
        return res.json({
          message: `Revalidated "${type}"`,
        })
      case 'appointments':
        await res.revalidate(`/about/appointments`)
        return res.json({
          message: `Revalidated "${type}"`,
        })
      case 'paymentPlans':
        await res.revalidate(`/about/financing`)
        return res.json({
          message: `Revalidated "${type}" at "/financing"`,
        })
      case 'contact':
        await res.revalidate(`/about/contact`)
        return res.json({
          message: `Revalidated "${type}"`,
        })
      case 'page':
        await res.revalidate(`/about/${slug}`)
        return res.json({
          message: `Revalidated "${type}" with slug "${slug}"`,
        })
      case 'product':
        console.log('revalidating product', slug)
        await res
          .revalidate(`/products/${slug}`)
          .then(() => {
            console.log('revalidated product', slug)
          })
          .catch((err) => {
            logError('Error revalidating product', {
              requestId,
              error: err.message,
            })
            console.log('error revalidating product ' + slug, err)
          })
        await res.revalidate(`/`)
        return res.json({
          message: `Revalidated "${type}" with slug "${slug}"`,
        })
      case 'collection':
        console.log('revalidating collection', slug)
        await res
          .revalidate(`/collections/${slug}`)
          .then(() => {
            console.log('revalidated collection', slug)
          })
          .catch((err) => {
            logError('Error revalidating collection', {
              requestId,
              error: err.message,
            })
            console.log('error revalidating collection', slug)
          })
        await res
          .revalidate(`/`)
          .then(() => {
            console.log('revalidated homepage')
          })
          .catch((err) => {
            logError('Error revalidating homepage', {
              requestId,
              error: err.message,
            })
            console.log('error revalidating homepage', err)
          })
        return res.json({
          message: `Revalidated "${type}" with slug "${slug}"`,
        })
    }

    return res.json({ message: 'No managed type' })
  } catch (err: any) {
    logError('Error revalidating', { requestId, error: err.message })
    return res.status(500).send({ message: 'Error revalidating' })
  }
}
