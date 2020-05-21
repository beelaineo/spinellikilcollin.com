import { NextApiHandler } from 'next'
import { postmark } from '../../src/services'

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).send('Not Found')
    return
  }
  const body = JSON.parse(req.body)
  console.log(body)
  console.log(body.emailAddress)
  const result = await postmark.sendMagazineSignup(body)
  console.log(result)

  res.status(200).send({ success: true })
}

export default handler

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
