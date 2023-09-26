import { NextApiHandler } from 'next'
import { postmark } from '../../src/services/postmark'
import fetch from 'node-fetch'

const GOOGLE_KEY = process.env.GOOGLE_MAPS_API_KEY

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(404).send('Not Found')
    return
  }
  const body = JSON.parse(req.body)

  // Prepare the address data for the Google Maps API request
  const addressData = {
    address: {
      regionCode: body.country === 'United States' ? 'US' : undefined,
      locality: body.city,
      addressLines: [
        body.address1,
        body.address2,
        [body.city, body.state, body.zip].join(', '),
      ].filter(Boolean),
    },
  }

  // Validate address using Google Maps Address Validation API
  const response = await fetch(
    `https://addressvalidation.googleapis.com/v1:validateAddress?key=${GOOGLE_KEY}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addressData),
    },
  )
  const data = await response.json()

  console.log('requestRingSizer.ts data', data)

  if (data.result.verdict.addressComplete != true) {
    res.status(500).send({
      error: 'Address not found. Please double-check and try again.',
    })
  } else {
    // Return the validated address to the frontend for confirmation
    const validatedAddress = data.result.address.formattedAddress
    const postalAddress = data.result.address.postalAddress
    res.status(200).send({ validatedAddress, postalAddress })
    // await postmark.sendRequestRingSizer(body)
    // res.status(200).send({ success: true })
  }
}

export default handler

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}
