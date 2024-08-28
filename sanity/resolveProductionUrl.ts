import {type DocumentActionProps, type DocumentActionDescription, type SanityDocument} from 'sanity'

export default function resolveProductionUrl(props: DocumentActionProps): string {
  const readToken =
    'sk56XjAXI9dV5P1yFoPyGIOB3c9Gb52XjGDB7YBrwO41mVRc3c4wq4Uvu8nNMWgRWxUmvHGLBozFm0U2QGcqfbYu8XrCmbzyv64wcwYOukq6fjhepAdrvgMNVtLdcVaBzapYOGMyZmnOxEtNGiMs8iQijid9aR7MMv1XYYHaqTBrfEmiVmWQ'
  const {type, draft, published} = props

  const slug =
    // @ts-ignore
    draft?.handle || draft?.slug?.current || published?.handle || published?.slug?.current

  switch (type) {
    case 'homepage':
      return `https://spinellikilcollin.com?preview=${readToken}`
      break
    case 'product':
      return `https://spinellikilcollin.com/products/${slug}?preview=${readToken}`
      break
    case 'collection':
      return `https://spinellikilcollin.com/collections/${slug}?preview=${readToken}`
      break
    case 'journalEntry':
      return `https://spinellikilcollin.com/journal/${slug}?preview=${readToken}`
      break
    case 'about':
      return `https://spinellikilcollin.com/about?preview=${readToken}`
      break
    case 'page':
      // @ts-ignore
      return `https://spinellikilcollin.com/about/${slug}?preview=${readToken}`
      break
    case 'contact':
      return `https://spinellikilcollin.com/about/contact?preview=${readToken}`
      break
    case 'customize':
      return `https://spinellikilcollin.com/customize?preview=${readToken}`
      break
    case 'customerCare':
      return `https://spinellikilcollin.com/customer-care?preview=${readToken}`
    default:
      return `https://spinellikilcollin.com?preview=${readToken}`
  }
}
