export default function resolveProductionUrl(document) {
  const readToken =
    'sk56XjAXI9dV5P1yFoPyGIOB3c9Gb52XjGDB7YBrwO41mVRc3c4wq4Uvu8nNMWgRWxUmvHGLBozFm0U2QGcqfbYu8XrCmbzyv64wcwYOukq6fjhepAdrvgMNVtLdcVaBzapYOGMyZmnOxEtNGiMs8iQijid9aR7MMv1XYYHaqTBrfEmiVmWQ'
  return `https://spinellikilcollin.com/products/${document.handle}?preview=${readToken}`
}
