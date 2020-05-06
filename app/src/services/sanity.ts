import createSanityClient from '@sanity/client'

export const sanityClient = createSanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_READ_TOKEN, // or leave blank to be anonymous user
  useCdn: true, // `false` if you want to ensure fresh data
  useProjectHostname: false,
})
