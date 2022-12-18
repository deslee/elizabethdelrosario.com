import { ClientOptions, createClient } from "@urql/core";

const customFetch: typeof fetch = (input, init) => fetch(input, {
  ...init,
  next: {
    revalidate: 60
  }
})

export const clientOptions: ClientOptions = {
  url:
    typeof window === "undefined"
      ? `${process.env.STRAPI_BASE_URL}/graphql`
      : `/graphql`,
  fetch: customFetch,
  fetchOptions: () => {
    return {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    };
  },
};

export const client = createClient(clientOptions);
