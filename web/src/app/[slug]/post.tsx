import OEmbed from "@/components/OEmbed";
import StrapiMedia from "@/components/StrapiMedia";
import clsx from "clsx";
import Link from "next/link";
import { createElement, Fragment, HTMLAttributes } from "react";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { getPostData } from "./data";

type Props = {
  post: NonNullable<Awaited<ReturnType<typeof getPostData>>>;
} & HTMLAttributes<HTMLDivElement>;

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use([
    function transformDataDivs() {
      return (tree) => {
        visit(tree, "element", (node) => {
          if (typeof node.properties?.dataOembed === "string") {
            node.tagName = "OEmbed";
            node.properties = {
              data: node.properties.dataOembed
            }
          }
          if (
            typeof node.properties?.dataStrapiMedia === "string" &&
            typeof node.properties.dataFiles === "string" &&
            typeof node.properties.dataType === "string"
          ) {
            const type = node.properties.dataType;
            node.properties = {
              type,
              data: node.properties.dataFiles,
            };
            node.tagName = "StrapiMedia";
          }
        });
      };
    },
  ])
  .use(rehypeReact, {
    createElement,
    Fragment,
    components: {
      StrapiMedia,
      OEmbed,
    } as any,
  });

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
      <div className="text-center mx-auto mt-8 prose prose-xl">{content}</div>
    </div>
  );
}
