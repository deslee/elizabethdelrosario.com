import { getSiteData } from "../data";
import Category from "./category";
import { getCategoryData, getPostData } from "./data";

type Params = {
  slug: string;
};

async function getData(slug: string) {
  const siteData = await getSiteData();
  const category = siteData.categories.find((c) => c.slug === slug);
  if (category) {
    const categoryData = await getCategoryData(slug);
    return categoryData;
  } else {
    const postData = await getPostData(slug);
    return postData;
  }
}

export default async function Slug({ params }: { params: Params }) {
  const data = await getData(params.slug);
  if (data?.__typename === "Post") {
    return <div>post {data.title}</div>;
  } else if (data?.__typename === "Category") {
    return <Category category={data} />;
  } else {
    return <div>sluggy</div>;
  }
}
