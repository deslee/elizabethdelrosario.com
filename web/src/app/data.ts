import { graphql } from "@/gql";
import { filterNonNullish } from "@/utils";
import { cache } from "react";
import { graphQLClient } from "./graphql-client";

export const getSiteData = cache(async () => {
  const query = graphql(/* GraphQL */ `
    query Site {
      site {
        data {
          attributes {
            title
            header {
              data {
                attributes {
                  url
                  placeholder
                  alternativeText
                }
              }
            }
            subtitle
            categories {
              data {
                attributes {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `);

  const data = await graphQLClient.request(query);
  const siteData = data.site?.data?.attributes;
  if (!siteData) {
    throw new Error("Missing site data");
  }
  return {
    ...siteData,
    header: siteData.header?.data?.attributes,
    categories:
      siteData.categories?.data
        .map((category) => {
          return category.attributes;
        })
        .filter(filterNonNullish) ?? [],
  };
})