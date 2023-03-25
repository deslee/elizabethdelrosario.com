import { getCategoryData } from "./data";
import Post from "./post";

type Props = {
  category: NonNullable<Awaited<ReturnType<typeof getCategoryData>>>;
};
export default function Category({ category }: Props) {
  return (
    <div>
      <div className="text-center relative mt-12 mb-8">
        <div className="border-b-2 h-1 absolute w-full h-1/2 -z-10" />
        <h1 className="text-2xl bg-white inline-block px-2">{category.name}</h1>
      </div>
      <div className="flex flex-col">
        {category.posts.map((post) => (
          <div key={post.id} className="pb-24 mb-24 border-b">
            {/* @ts-expect-error Server Component */}
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
