import { compose } from "recompose";
import Link from 'next/link';
import { IndexPageProps, withIndexPage } from "../graphql";
import withSanity from "../graphql/withSanity";
import Layout from "../components/Layout/Layout";

type Props = IndexPageProps

const FrontPage = ({ data }: Props) => {
    if (!data) {
        return <></>
    }

    const posts = () => {
        if (data.siteSettings!.frontPage && data.siteSettings!.frontPage.__typename === "PostCollection") {
            const links = data.siteSettings!.frontPage.posts!.map(post => post && post.slug && post.title && post.slug.current && post.title ? { slug: post.slug.current, title: post.title } : undefined).filter(p => !!p)
            return links.map(link => {
                return link && <div><Link key={link.slug} href={`/slug?slug=${link.slug}`} as={`/${link.slug}`}><a>{link.title}</a></Link></div>
            })
        }
    }

    return <Layout>
        {posts()}
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
}

export default compose<any, any>(
    withSanity,
    withIndexPage()
)(FrontPage)