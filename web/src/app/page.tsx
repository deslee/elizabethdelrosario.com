import { Fragment } from 'react'
import { getFrontPageData } from "./data";
import Post from "./[slug]/post";

export default async function Home() {
  const frontPage = await getFrontPageData();
  return (
    <Fragment>
      <div className="flex flex-col">
        {frontPage.featuredPosts.map((post) => (
          <div key={post.id} className="pb-24 mt-16 border-b">
            {/* @ts-expect-error Server Component */}
            <Post post={post} />
          </div>
        ))}
      </div>
    </Fragment>
  );
}
