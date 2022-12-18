import { getPostOrCategory } from "../../queries/common";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default async function Page({ params }: { params: { slug: string } }) {
  const result = await getPostOrCategory(params.slug).catch(() => notFound());

  if (result.type === "Post") {
    const post = result;
    return (
      <div>
        {post.Title}

        {post.Content && (
          <ReactMarkdown className="prose">{post.Content}</ReactMarkdown>
        )}

        {post.Media
          .map((file) => {
            return (
              <div key={file.url}>
                {file.mime.startsWith("image/") ? (
                  <Image
                    src={file.url}
                    width={file.width ?? 0}
                    height={file.height ?? 0}
                    alt={file.alternativeText ?? ""}
                  />
                ) : file.mime.startsWith("video/") ? (
                  <video src={file.url} controls={true}></video>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
      </div>
    );
  } else if (result.type === "Category") {
    const category = result;
    const posts = category.posts;
    return (
      <div>
        {category.Name}

        {posts.map((post) => {
          return (
            <Link key={post.id} href={`/${post.Slug}`}>
              {post.Title}
            </Link>
          );
        })}
      </div>
    );
  }
}
