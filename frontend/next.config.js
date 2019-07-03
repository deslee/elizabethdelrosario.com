const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withTypescript({
  webpack(config, options) {
    config.module.rules.push({
       test: /\.graphql?$/, loader: 'webpack-graphql-loader'
    })
    return config
  },
  exportPathMap: async function(defaultPageMap) {
    return {
      '/': { page: '/' },
      '/bio': { page: '/', query: { slug: 'bio' } }
    }
  }
  /* config options here */
}))