import { OperationResult } from "@urql/core";
import { client, graphql } from "../gql";
import { PostFragment, UploadFileFragment } from "../gql/generated/graphql";
import { filterNonNullish } from "../utils";

const SITE_DOCUMENT = graphql(`
  query site {
    site {
      data {
        id
        attributes {
          Title
        }
      }
    }
    categories {
      data {
        id
        attributes {
          Name
          Description
          Slug
        }
      }
    }
  }
`);

const FRONT_PAGE_DOCUMENT = graphql(`
  query frontPage {
    frontPage {
      data {
        id
        attributes {
          Title
        }
      }
    }
  }
`);

export const UPLOAD_FILE_FRAGMENT = graphql(`
  fragment UploadFile on UploadFile {
    name
    alternativeText
    caption
    width
    height
    formats
    hash
    ext
    mime
    size
    url
    previewUrl
    provider
  }
`);

export const POST_FRAGMENT = graphql(`
  fragment Post on Post {
    Title
    Slug
    Content
    Type
    Media {
      data {
        id
        attributes {
          ...UploadFile
        }
      }
    }
  }
`);

const POST_DOCUMENT = graphql(`
  query post($slug: String!) {
    posts(filters: { Slug: { eq: $slug } }) {
      data {
        id
        attributes {
          ...Post
        }
      }
    }
  }
`);

const CATEGORY_DOCUMENT = graphql(`
  query category($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          Name
          Slug
          Description
          posts {
            data {
              id
              attributes {
                ...Post
              }
            }
          }
        }
      }
    }
  }
`);

function unwrapResultOrThrow<T, R>(
  result: OperationResult<T>,
  unwrapFn: (data: T) => R | null | undefined
) {
  if (result.error) {
    throw result.error;
  }
  if (!result.data) {
    throw new Error("Data not found");
  }
  const data = unwrapFn(result.data);
  if (!data) {
    throw new Error("Data not found");
  }
  return data;
}

export async function getSiteSettings() {
  const siteSettings = await client.query(SITE_DOCUMENT, {}).toPromise();
  return unwrapResultOrThrow(siteSettings, (r) =>
    r.site?.data?.attributes && r.categories?.data
      ? {
          site: r.site.data.attributes,
          categories: r.categories?.data
            .map((c) =>
              c.attributes && c.id
                ? {
                    id: c.id,
                    ...c.attributes,
                  }
                : undefined
            )
            .filter(filterNonNullish),
        }
      : undefined
  );
}

export async function getFrontPage() {
  const frontPage = await client.query(FRONT_PAGE_DOCUMENT, {}).toPromise();
  return unwrapResultOrThrow(frontPage, (r) => r.frontPage?.data?.attributes);
}

export async function getPost(slug: string) {
  const post = await client
    .query(POST_DOCUMENT, {
      slug,
    })
    .toPromise();
  return unwrapResultOrThrow(post, (r) => {
    const post = r.posts?.data.find(filterNonNullish);
    if (post) {
      const attr = post.attributes as PostFragment;
      return {
        id: post.id,
        ...attr,
        Media:
          attr.Media?.data
            .map((data) =>
              data.attributes && data.id
                ? {
                    id: data.id,
                    ...(data.attributes as UploadFileFragment),
                  }
                : undefined
            )
            .filter(filterNonNullish) ?? [],
      };
    }
  });
}

export async function getCategory(id: string) {
  const category = await client
    .query(CATEGORY_DOCUMENT, {
      id,
    })
    .toPromise();
  return unwrapResultOrThrow(category, (r) =>
    r.category?.data?.attributes
      ? {
          ...r.category.data.attributes,
          posts:
            r.category.data.attributes.posts?.data
              .map((d) =>
                d.attributes
                  ? {
                      id: d.id,
                      ...(d.attributes as PostFragment),
                    }
                  : undefined
              )
              .filter(filterNonNullish) ?? [],
        }
      : undefined
  );
}

export async function getPostOrCategory(slug: string) {
  const { categories } = await getSiteSettings();

  const category = categories.find((c) => c.Slug === slug);
  if (category) {
    return {
      type: "Category" as const,
      ...(await getCategory(category.id)),
    };
  } else {
    return {
      type: "Post" as const,
      ...(await getPost(slug)),
    };
  }
}
