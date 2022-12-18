import { useQuery } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Category from "../components/Category";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { setApolloState, initializeApollo, graphql } from "../gql";

const SlugPage_Query = graphql(`
  query SlugPage_Query($slug: String!) {
    ...Layout_QueryFragment
    categoriesBySlug: categories(filters: { Slug: { eq: $slug } }) {
      data {
        id
        attributes {
          ...CategoryFragment
        }
      }
    }
    postsBySlug: posts(filters: { Slug: { eq: $slug } }) {
      data {
        id
        attributes {
          ...PostFragment
        }
      }
    }
  }
`);

export default function SlugPage(props: { slug: string }) {
  const { data } = useQuery(SlugPage_Query, {
    variables: {
      slug: props.slug,
    },
  });

  const component = data.categoriesBySlug.data.length ? (
    <Category setTitle={props.slug !== 'featured'} category={data.categoriesBySlug.data[0].attributes} />
  ) : data.postsBySlug.data.length ? (
    <Post
      setTitle
      post={data.postsBySlug.data[0].attributes}
      className="mt-12"
    />
  ) : (
    <>not found</>
  );
  return (
    <Layout key="layout" query={data} slug={props.slug}>
      {component}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo();
  const slug = context.params.slug?.[0] ?? "featured";

  await apolloClient.query({
    query: SlugPage_Query,
    variables: {
      slug,
    },
  });

  const props = setApolloState(apolloClient, {
    slug,
  });

  return {
    props,
    revalidate: 60,
  };
};

const allSlugsQuery = graphql(`
  query allSlugs {
    categories {
      data {
        attributes {
          Slug
        }
      }
    }
    posts {
      data {
        attributes {
          Slug
        }
      }
    }
  }
`);

export const getStaticPaths: GetStaticPaths = async (context) => {
  const apollo = initializeApollo();
  const result = await apollo.query({
    query: allSlugsQuery,
  });

  const slugs = [
    ...result.data.categories.data.map((d) => d.attributes.Slug),
    ...result.data.posts.data.map((d) => d.attributes.Slug),
  ];

  return {
    paths: slugs
      .map((slug) => ({
        params: {
          slug: [slug],
        },
      }))
      .concat({
        params: {
          slug: undefined,
        },
      }),
    fallback: "blocking",
  };
};
