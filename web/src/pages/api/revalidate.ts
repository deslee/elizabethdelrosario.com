import { getSiteData } from "@/app/data";
import getSlugs from "@/getSlugs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const slugs = req.query.slug ? [`/${req.query.slug}`] : ['/', '/resume'].concat((await getSlugs()).map(slug => `/${slug}`))
  try {
    // This should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    for (const slug of slugs) {
      await res.revalidate(slug)
    }
    return res.json({ revalidated: slugs });
  } catch (err) {
    console.error(err)
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
