const createClient = require('@sanity/client')

const prodClient = createClient({
  projectId: 'i21fjdbi',
  dataset: 'production',
  useCdn: false,
  token:
    'skdbFzBOoxI6h4VAocAKNziCHvcnkEjutfmInbHTw3OVtbIm9E0V3G7s5TwdDEQG2LmiUDZnKRglUU5ou1tNdB6J1JwoK2sRIeDYkezLwGVo7BR36tVmwBVP7Jv59U2PRUqJ4p7HSTAFwJmiY1upDOcqi7w1Ob38eSFUmcU4tbXR9NY25JH5',
})

const run = async () => {
  const [holidaySaleProducts] = await Promise.all([
    prodClient.fetch(
      `*[_type == "shopifyProduct" && "HolidayFlash22" in sourceData.tags && !(_id in path("drafts.**"))]`,
    ),
  ])

  await Promise.all(
    holidaySaleProducts.slice(90, 100).map(async (product) => {
      console.log('-------------------')
      console.log(`Setting ${product.title} to show in search.`)

      await prodClient
        .patch(product._id)
        .set({ hideFromSearch: false })
        .commit()
        .then((updatedProduct) => {
          console.log('Hurray, the product is updated! New document:')
          console.log(
            `${updatedProduct.title} hideFromSearch: ${updatedProduct.hideFromSearch}`,
          )
        })
        .catch((err) => {
          console.error('Oh no, the update failed: ', err.message)
        })
    }),
  )
}

run()
