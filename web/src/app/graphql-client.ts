import { GraphQLClient, gql } from 'graphql-request'

const endpoint = process.env.STRAPI_BASE_URL
const token = process.env.STRAPI_API_TOKEN
if (!endpoint) {
  throw new Error("STRAPI_BASE_URL does not exist")
}
if (!token) {
  throw new Error("STRAPI_API_TOKEN does not exist")
}

export const graphQLClient = new GraphQLClient(endpoint + '/graphql', {
  fetch,
  headers: {
    'Authorization': `Bearer ${token}`
  }
})