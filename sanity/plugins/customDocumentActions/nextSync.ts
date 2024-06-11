import {RefreshIcon} from '@sanity/icons'
import {type DocumentActionProps, type DocumentActionDescription, type SanityDocument} from 'sanity'
import {isValidSignature, SIGNATURE_HEADER_NAME} from '@sanity/webhook'
import crypto from 'crypto'

export type ShopifyDocument = SanityDocument & {
  handle?: string
  slug?: {
    current: string
  }
}

interface ShopifyDocumentActionProps extends DocumentActionProps {
  published: ShopifyDocument
}

export default (props: ShopifyDocumentActionProps): DocumentActionDescription | undefined => {
  console.log('manual refresh Action props', props)

  const {type, published} = props
  const documentSlug = published?.handle || published?.slug?.current || ''

  const url = new URL('https://spinellikilcollin.com/api/revalidateAction')
  url.searchParams.append('type', type)
  url.searchParams.append('slug', documentSlug)

  const onHandle = async () => {
    try {
      const response = await fetch(url.toString(), {
        method: 'GET', // Change to GET
        // headers are not needed for GET request in this case
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const data = await response.json()
      console.log('Revalidation response:', data)
      alert(data.message)
    } catch (error) {
      console.error('Revalidation error:', error)
      alert('Failed to revalidate. Check the console for more details.')
    }
  }

  return {
    label: 'Manual refresh',
    icon: RefreshIcon,
    onHandle,
    shortcut: 'Ctrl+Alt+R',
  }
}
