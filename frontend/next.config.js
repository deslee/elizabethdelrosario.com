const withTypescript = require('@zeit/next-typescript')

module.exports = withTypescript({
  webpack(config, options) {
    config.module.rules.push({
       test: /\.graphql?$/, loader: 'webpack-graphql-loader'
    })
    return config
  },
  /* config options here */
  target: 'serverless',
  cssModules: true
})