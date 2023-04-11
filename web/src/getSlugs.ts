import { cache } from "react";
import { graphQLClient } from "./app/graphql-client";
import { graphql } from "./gql";
import { filterNonNullish } from "./utils";

const getSlugs = cache(async () => {
  const query = graphql(/* GraphQL */`
    query Slugs {
      categories {
        data {
          attributes {
            slug
          }
        }
      }
      posts {
        data {
          attributes {
            slug
          }
        }
      }
    }
  `)

  const data = await graphQLClient.request(query);
  const slugs = (data.categories?.data.map(cat => cat.attributes?.slug).filter(filterNonNullish) ?? []).concat(data.posts?.data.map(p => p.attributes?.slug).filter(filterNonNullish) ?? [])
  return slugs

})

export default getSlugs;