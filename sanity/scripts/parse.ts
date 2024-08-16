import {createClient} from '@sanity/client'
import {isMatch, pick} from 'lodash'

const stagingClient = createClient({
  projectId: 'i21fjdbi',
  dataset: 'staging',
  useCdn: false,
})

const prodClient = createClient({
  projectId: 'i21fjdbi',
  dataset: 'production',
  useCdn: false,
  token:
    'skdbFzBOoxI6h4VAocAKNziCHvcnkEjutfmInbHTw3OVtbIm9E0V3G7s5TwdDEQG2LmiUDZnKRglUU5ou1tNdB6J1JwoK2sRIeDYkezLwGVo7BR36tVmwBVP7Jv59U2PRUqJ4p7HSTAFwJmiY1upDOcqi7w1Ob38eSFUmcU4tbXR9NY25JH5',
})

const fieldsToSync = ['gallery', 'related', 'options', 'variants', 'info']

const run = async () => {
  const [backupProducts, currentProducts] = await Promise.all([
    stagingClient.fetch(`*[_type == "shopifyProduct" && !(_id in path("drafts.**"))]`),
    prodClient.fetch(`*[_type == "shopifyProduct" && !(_id in path("drafts.**"))]`),
  ])

  const fixRefs = (related: any) => {
    const relatedItems = related?.items ?? []
    return {
      ...related,
      items: relatedItems
        .map((item) => {
          const {document} = item
          const {shopifyId, title} = backupProducts.find((p) => p._id === document._ref)
          const prodDoc = currentProducts.find((p) => p.shopifyId === shopifyId)
          if (!prodDoc) return null
          return {
            ...item,
            document: {
              ...item.document,
              _ref: prodDoc._id,
            },
          }
        })
        .filter(Boolean),
    }
  }
  await Promise.all(
    backupProducts
      // .filter((d) => d.title === 'Acacia')
      // .slice(0, 10)
      .map(async (backupDoc) => {
        const {shopifyId} = backupDoc
        const existingDocs = currentProducts.filter((p) => p.shopifyId === shopifyId)

        if (existingDocs.length === 0) return
        if (existingDocs.length > 1) {
          const docNames = existingDocs.map((doc) => `${doc.title}, id: ${doc._id}`).join('\n')
          throw new Error(`Multiple documents with id ${shopifyId}:\n${docNames}`)
        }

        const existingDoc = existingDocs[0]
        const pickedBackup = pick(backupDoc, fieldsToSync)
        const pickedExisting = pick(existingDoc, fieldsToSync)

        const fieldsToPatch = fieldsToSync.filter(
          (fieldName) =>
            Boolean(
              pickedBackup[fieldName] !== undefined && pickedExisting[fieldName] !== undefined
            ) && !isMatch(pickedExisting[fieldName], pickedBackup[fieldName])
        )

        if (!fieldsToPatch.length) return
        console.log('-------------------')
        console.log(`Syncing ${backupDoc.title}`)

        console.log(fieldsToPatch)

        const ifMissingArgs = fieldsToPatch.reduce((acc, fieldName) => {
          const isArray = Array.isArray(pickedBackup[fieldName])
          return {
            [fieldName]: isArray ? [] : {},
            ...acc,
          }
        }, {})
        const setArgs = fieldsToPatch.reduce((acc, fieldName) => {
          const value =
            fieldName === 'related' ? fixRefs(pickedBackup[fieldName]) : pickedBackup[fieldName]
          return {
            [fieldName]: value,
            ...acc,
          }
        }, {})
        console.log('DISABLED!')
        // await prodClient
        //   .patch(existingDoc._id)
        //   .setIfMissing(ifMissingArgs)
        //   .set(setArgs)
        //   .commit()
      })
  )
}

run()
