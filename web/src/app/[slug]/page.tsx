import { getSiteData } from "../data";
import Category from "./category";
import { getCategoryData, getPostData } from "./data";
import Post from "./post";
import { notFound } from 'next/navigation';
import getSlugs from "@/getSlugs";

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

export async function generateStaticParams() {
  const slugs = await getSlugs()

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const data = await getData(params.slug);
  const siteData = await getSiteData();
  const title = data?.__typename === "Category" ? data.name : data?.title;
  return {
    title,
    openGraph: {
      title,
      url: "https://elizabethdelrosario.com",
      siteName: siteData.title,
      locale: "en-US",
      type: "website",
    },
    twitter: {
      card: 'summary_large_image',
      title,
    },
  };
}

export default async function Slug({ params }: { params: Params }) {
  const data = await getData(params.slug);
  if (data?.__typename === "Post") {
    {/* @ts-expect-error Server Component */}
    return <Post post={data} className="mt-12" />;
  } else if (data?.__typename === "Category") {
    return <Category category={data} />;
  } else {
    notFound()
  }
}
