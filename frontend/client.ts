import sanityClient from '@sanity/client'

export const projectId = 'sj7jy8qa';
export const dataset = 'production'

export default sanityClient({
  projectId, // you can find this in sanity.json
  dataset, // or the name you chose in step 1
  useCdn: false // `false` if you want to ensure fresh data
})