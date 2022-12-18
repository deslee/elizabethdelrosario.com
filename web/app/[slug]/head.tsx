import { getPostOrCategory } from "../../queries/common";
import { notFound } from "next/navigation";
import { PostFragment } from "../../gql/generated/graphql";

export default async function Head({ params }: { params: { slug: string } }) {
  try {
    const result = await getPostOrCategory(params.slug);
    const title = result.type === 'Post' ? result.Title : result.__typename === 'Category' ? result.Name : '';
    return (
      <>
        <title>{title}</title>
      </>
    );
  } catch {
    return (
      <>
        <title>Not found</title>
      </>
    );
  }
}
