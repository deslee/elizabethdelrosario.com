export default {
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