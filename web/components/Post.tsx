import clsx from "clsx";
import Head from "next/head";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { FragmentType, graphql, useFragment } from "../gql";
import { useSiteTitle } from "./Layout";
import Section from "./Section";

const PostFragment = graphql(`
  fragment PostFragment on Post {
    Title
    Slug
    Sections {
      ...SectionFragment
    }
  }
`);

type Props = {
  post: FragmentType<typeof PostFragment>;
  setTitle?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export default function Post({
  post: postProp,
  setTitle,
  className,
  ...divAttributes
}: Props) {
  const post = useFragment(PostFragment, postProp);
  const siteTitle = useSiteTitle();
  return (
    <div className={clsx("container mx-auto", className)} {...divAttributes}>
      {setTitle && (
        <Head>
          <title>{`${post.Title} | ${siteTitle}`}</title>
        </Head>
      )}
      <div>
        <h1 className="text-center mx-auto text-6xl">
          <Link href={`/${post.Slug}`}>{post.Title}</Link>
        </h1>
      </div>
      {post.Sections.map((section, idx) => (
        <Section key={idx} section={section} />
      ))}
    </div>
  );
}
