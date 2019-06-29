const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')

module.exports = withCSS(withTypescript({
  webpack(config, options) {
    config.module.rules.push({
       test: /\.graphql?$/, loader: 'webpack-graphql-loader'
    })
    return config
  },
  /* config options here */
  target: 'serverless',
  cssModules: true
}))