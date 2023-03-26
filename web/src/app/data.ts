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
            favicon {
              data {
                attributes {
                  url
                }
              }
            }
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
            footer
            socials {
              id
              icon
              url
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
    favicon: siteData.favicon?.data?.attributes,
    header: siteData.header?.data?.attributes,
    socials: siteData.socials?.map(social => {
      return social
    }).filter(filterNonNullish) ?? [],
    categories:
      siteData.categories?.data
        .map((category) => {
          return category.attributes;
        })
        .filter(filterNonNullish) ?? [],
  };
})

export const getFrontPageData = cache(async () => {
  const query = graphql(/* GraphQL */`
    query FrontPage {
      frontPage {
        data {
          attributes {
            featuredPosts {
              data {
                id
                attributes {
                  slug
                  title
                  body
                }
              }
            }
          }
        }
      }
    }
  `)

  const data = await graphQLClient.request(query);
  const frontPage = data.frontPage?.data?.attributes;
  if (!frontPage) {
    throw new Error("Missing front page data");
  }
  return {
    ...frontPage,
    featuredPosts: frontPage.featuredPosts?.data.map(post => post.attributes ? { id: post.id, ...post.attributes } : undefined).filter(filterNonNullish) ?? []
  }
})
