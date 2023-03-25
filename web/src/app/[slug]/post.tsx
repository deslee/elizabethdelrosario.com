import clsx from "clsx";
import Link from "next/link";
import { createElement, Fragment, HTMLAttributes } from "react";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { getPostData } from "./data";

type Props = {
  post: NonNullable<Awaited<ReturnType<typeof getPostData>>>;
} & HTMLAttributes<HTMLDivElement>;

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeReact, { createElement, Fragment });

export default async function Post({
  post,
  className,
  ...divAttributes
}: Props) {
  const { result: content } = await processor.process(post.body ?? "");

  return (
    <div className={clsx(className, "container mx-auto")} {...divAttributes}>
      <h1 className="text-center mx-auto text-6xl">
        <Link href={`/${post.slug}`}>{post.title}</Link>
      </h1>
      <div className="text-center mx-auto mt-8">{content}</div>
    </div>
  );
}
