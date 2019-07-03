const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const sanityClient = require('@sanity/client')

const projectId = 'sj7jy8qa';
const dataset = 'production'

const client = sanityClient({
  projectId,
  dataset,
  useCdn: false
})

module.exports = withCSS(withTypescript({
  webpack(config, options) {
    config.module.rules.push({
       test: /\.graphql?$/, loader: 'webpack-graphql-loader'
    })
    return config
  },
  exportPathMap: async function(defaultPageMap) {
    const slugs = await client.fetch(`*[_type == 'post' || _type == 'page' || _type == 'postCollection'] {
      slug {
          current
        }
      }`)

    const filteredSlugs = slugs.map(item => item && item.slug && item.slug.current).filter(i => i && i !== '/')

    const pathMap = filteredSlugs.map(slug => ({
      [`/${slug}`]: {
        page: '/',
        query: {
          slug: slug
        }
      }
    }))
      .concat([{ ['/']: { page: '/' } }])
      .reduce((pathMap, path) => Object.assign(pathMap, path), {});

    console.log(pathMap)
    return pathMap
  }
  /* config options here */
}))