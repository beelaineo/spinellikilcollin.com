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

const readBody = async (readable) => {
  const chunks = []
  for await (const chunk of readable) {
    // @ts-ignore
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

const generateUniqueId = () => {
  // Implementation to generate a unique request ID
  return Date.now().toString()
}

const secret = process.env.SANITY_REVALIDATE_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const requestId = generateUniqueId()
  const signature = req.headers[SIGNATURE_HEADER_NAME] as string
  const body = await readBody(req) // Read the body into a string

  if (!secret) {
    logError('No secret provided', { requestId })
    return res.status(401).json({ message: 'No secret provided' })
  }

  if (req.method !== 'POST') {
    logError('Must be a POST request', { requestId })
    return res.status(401).json({ message: 'Must be a POST request' })
  }

  if (!isValidSignature(body, signature, secret)) {
    logError('Invalid signature', { requestId, signature })
    res.status(401).json({ message: 'Invalid signature' })
    return
  }

  try {
    const { _type: type, slug, handle, collections } = JSON.parse(body)
    console.log(
      'revalidating',
      `type: ${type}`,
      `slug: ${slug}`,
      `handle: ${handle}`,
      `collections: ${collections}`,
    )
    logInfo('Attempting revalidation', {
      requestId,
      type,
      slug,
      handle,
      collections,
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
        console.log('revalidating product', handle)
        await res
          .revalidate(`/products/${handle}`)
          .then(() => {
            console.log('revalidated product', handle)
          })
          .catch((err) => {
            logError('Error revalidating product', {
              requestId,
              error: err.message,
            })
            console.log('error revalidating product ' + handle, err)
          })
        collections.map(async (handle) => {
          await res
            .revalidate(`/collections/${handle}`)
            .then(() => {
              console.log('revalidated collection', handle)
            })
            .catch((err) => {
              logError('Error revalidating product-affiliated collection', {
                requestId,
                error: err.message,
              })
              console.log('error revalidating collection ' + handle, err)
            })
        })
        await res.revalidate(`/`)
        return res.json({
          message: `Revalidated "${type}" with slug "${handle}"`,
        })
      case 'collection':
        console.log('revalidating collection', handle)
        await res
          .revalidate(`/collections/${handle}`)
          .then(() => {
            console.log('revalidated collection', handle)
          })
          .catch((err) => {
            logError('Error revalidating collection', {
              requestId,
              error: err.message,
            })
            console.log('error revalidating collection', handle)
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
          message: `Revalidated "${type}" with slug "${handle}"`,
        })
    }

    return res.json({ message: 'No managed type' })
  } catch (err: any) {
    logError('Error revalidating', { requestId, error: err.message })
    return res.status(500).send({ message: 'Error revalidating' })
  }
}
