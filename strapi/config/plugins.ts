export default {
  placeholder: {
    enabled: true,
    config: {
      // https://plaiceholder.co/usage
      size: 4,
    },
  },
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        post: {
          field: 'slug',
          references: 'title',
        },
        category: {
          field: 'slug',
          references: 'name',
        },
      },
    },
  },
  graphql: {
    config: {
      endpoint: '/graphql',
    },
  },
};