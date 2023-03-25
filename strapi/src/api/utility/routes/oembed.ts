export default {
  routes: [
    {
      method: 'GET',
      path: '/utils/oembed',
      handler: 'utility.getOembed',
      config: {
        auth: false
      }
    }
  ]
}