import { processor } from "@/components/RehypeProcessor";
import clsx from "clsx";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { getPostData } from "./data";

type Props = {
  post: NonNullable<Awaited<ReturnType<typeof getPostData>>>;
} & HTMLAttributes<HTMLDivElement>;

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
      <div className="text-center mx-auto mt-8 prose prose-xl max-w-6xl">{content}</div>
    </div>
  );
}
