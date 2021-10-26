export default function resolveProductionUrl(document) {
  const readToken =
    'sk56XjAXI9dV5P1yFoPyGIOB3c9Gb52XjGDB7YBrwO41mVRc3c4wq4Uvu8nNMWgRWxUmvHGLBozFm0U2QGcqfbYu8XrCmbzyv64wcwYOukq6fjhepAdrvgMNVtLdcVaBzapYOGMyZmnOxEtNGiMs8iQijid9aR7MMv1XYYHaqTBrfEmiVmWQ'
  const type = document._type
  switch (type) {
    case 'homepage':
      return `https://spinellikilcollin.com?preview=${readToken}`
      break
    case 'shopifyProduct':
      return `https://spinellikilcollin.com/products/${document.handle}?preview=${readToken}`
      break
    case 'shopifyCollection':
      return `https://spinellikilcollin.com/collections/${document.handle}?preview=${readToken}`
      break
    case 'journalEntry':
      return `https://spinellikilcollin.com/journal/${document.handle}?preview=${readToken}`
      break
    case 'about':
      return `https://spinellikilcollin.com/about?preview=${readToken}`
      break
    case 'page':
      return `https://spinellikilcollin.com/about/${document.handle}?preview=${readToken}`
      break
    case 'contact':
      return `https://spinellikilcollin.com/about/contact?preview=${readToken}`
      break
    case 'customize':
      return `https://spinellikilcollin.com/customize?preview=${readToken}`
      break
    default:
      return `https://spinellikilcollin.com?preview=${readToken}`
  }
}
