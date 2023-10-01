export default async function handler(req, res) {
  if (req.query.secret !== process.env.ISR_SECRET) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const { type, slug } = req.body
    const path =
      type == 'homepage'
        ? '/'
        : type == 'journalPage'
        ? '/journal'
        : type == 'about'
        ? '/about'
        : type == 'paymentPlans'
        ? '/about/financing'
        : type == 'contact'
        ? '/about/contact'
        : type == 'faq'
        ? '/about/faq'
        : type == 'customize'
        ? '/customize'
        : type == 'shopifyProduct'
        ? `/products/${slug}`
        : type == 'shopifyCollection'
        ? `/collections/${slug}`
        : type == 'journalEntry'
        ? `/journal/${slug}`
        : type == 'page'
        ? `/about/${slug}`
        : null
    await res.revalidate(path)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send('Error revalidating')
  }
}
