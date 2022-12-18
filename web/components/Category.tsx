import Head from "next/head";
import { FragmentType, graphql, useFragment } from "../gql";
import { useSiteTitle } from "./Layout";
import Post from "./Post";

const CategoryFragment = graphql(`
  fragment CategoryFragment on Category {
    Name
    Description
    Slug
    posts {
      data {
        id
        attributes {
          ...PostFragment
        }
      }
    }
  }
`);

type Props = {
  category: FragmentType<typeof CategoryFragment>;
  setTitle?: boolean;
};

export default function Category(props: Props) {
  const category = useFragment(CategoryFragment, props.category);
  const { setTitle } = props;
  const siteTitle = useSiteTitle()
  return (
    <div>
      <Head>
        {setTitle && <title>{`${category.Name} | ${siteTitle}`}</title>}
      </Head>
      <div className="text-center relative mt-12 mb-8">
        <div className="border-b-2 h-1 absolute w-full h-1/2 -z-10" />
        <h1 className="text-2xl bg-white inline-block px-2">{category.Name}</h1>
      </div>
      <div className="flex flex-col">
        {category.posts.data.map((post) => {
          return (
            <div key={post.id} className="pb-24 mb-24 border-b">
              <Post post={post.attributes} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
