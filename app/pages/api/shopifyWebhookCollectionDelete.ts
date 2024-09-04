import { handle } from './handleWebhookRequest'

export default async function handler(req, res) {
  // Next.js will automatically parse `req.body` with requests of `content-type: application/json`,
  // so manually parsing with `JSON.parse` is unnecessary.
  const { body, method } = req

  // Ignore non-POST requests
  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  await handle(body, 'collectionDelete')

  res.status(200).json({ message: 'OK' })
}
