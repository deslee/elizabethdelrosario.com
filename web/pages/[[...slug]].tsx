import { useQuery } from "@apollo/client";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Category from "../components/Category";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { setApolloState, initializeApollo, graphql } from "../gql";
import { filterNonNullish } from "../utils";

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
    <Category category={data.categoriesBySlug.data[0].attributes} />
  ) : data.postsBySlug.data.length ? (
    <Post setTitle post={data.postsBySlug.data[0].attributes} className="mt-12" />
  ) : (
    <>not found</>
  );
  return <Layout key="layout" query={data}>{component}</Layout>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const apolloClient = initializeApollo();
  const slug = context.params.slug?.[0] ?? 'featured';

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
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};
