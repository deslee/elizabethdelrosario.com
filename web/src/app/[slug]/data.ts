import { graphql } from "@/gql";
import { filterNonNullish } from "@/utils";
import { cache } from "react";
import { graphQLClient } from "../graphql-client";

export const getPostData = cache(async (slug: string) => {
  const query = graphql(/* GraphQL */ `
    query Post($slug:String!) {
      findSlug(modelName: "post", slug: $slug) {
        __typename
        ...on PostEntityResponse {
          data {
            id
            attributes {
              __typename
              title
              slug
              body
            }
          }
        }
      }
    }
  `)
  const data = await graphQLClient.request(query, { slug });
  const post = data.findSlug?.__typename === 'PostEntityResponse' ? {
    id: data.findSlug.data?.id,
    ...data.findSlug.data?.attributes
  } : undefined
  return post
})

export const getCategoryData = cache(async (slug: string) => {
  const query = graphql(/* GraphQL */ `
    query Category($slug:String!) {
      findSlug(modelName: "category", slug: $slug) {
        __typename
        ...on CategoryEntityResponse {
          data {
            id
            attributes {
              __typename
              name
              slug
              posts {
                data {
                  id
                  attributes {
                    title
                    slug
                    body
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  const data = await graphQLClient.request(query, { slug });
  const category = data.findSlug?.__typename === 'CategoryEntityResponse' ? data.findSlug.data?.attributes : undefined
  if (!category) {
    return undefined
  }
  return {
    ...category,
    posts: category.posts?.data.map(post => post.attributes ? { id: post.id, ...post.attributes } : undefined).filter(filterNonNullish) ?? []
  }
})