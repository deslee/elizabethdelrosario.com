import { compose } from "recompose";
import Error from 'next/error';
import { withSiteSettings, SiteSettingsQuery, withAllSlugs, AllSlugsQuery, PageByIdComponent, PostByIdComponent, PostCollectionByIdComponent } from "../graphql";
import withSanity from "../graphql/withSanity";
import { DataValue } from "react-apollo";
import Head from "next/head";
import ItemContainer from "../containers/ItemContainer";
import { NextFunctionComponent, NextContext } from "next";

interface InitialProps {
    slug?: string
}

interface Props extends InitialProps {
    allSlugs: DataValue<AllSlugsQuery>,
    siteSettings: DataValue<SiteSettingsQuery>
}

const FrontPage: NextFunctionComponent<Props, InitialProps> = ({ siteSettings, slug, allSlugs }) => {
    // show loading page if client based
    if (siteSettings.loading) {
        return <>
            <Head>
                <title>Loading</title>
            </Head>
            
        </>
    }

    if (!siteSettings.settings) {
        console.log("site settings not found")
        return <>
            <Error statusCode={500} />
            <span style={{display: 'none'}}>Site settings not found</span>
        </>
    }
    const settings = siteSettings.settings;

    if (!slug && settings.frontPage) {
        return <ItemContainer siteSettings={settings} item={settings.frontPage} />
    }

    // find the matching slug
    const matchedSlug = [
        ...(allSlugs.postSlugs ? allSlugs.postSlugs : []),
        ...(allSlugs.pageSlugs ? allSlugs.pageSlugs : []),
        ...(allSlugs.postCollectionSlugs ? allSlugs.postCollectionSlugs : [])
    ].find(item => {
        if (item.__typename) {
            if (item.slug && item.slug.current === slug) {
                return true;
            }
        }
    })

    if (matchedSlug) {
        if (matchedSlug.__typename === 'Page') {
            return <PageByIdComponent variables={{ id: matchedSlug.id }}>{({ loading, data }) => {
                return <ItemContainer item={data && data.Page} siteSettings={settings} loading={loading} />
            }}</PageByIdComponent>
        }
        else if (matchedSlug.__typename === 'Post') {
            return <PostByIdComponent variables={{ id: matchedSlug.id }}>{({ loading, data }) => {
                return <ItemContainer item={data && data.Post} siteSettings={settings} loading={loading} />
            }}</PostByIdComponent>
        }
        else if (matchedSlug.__typename === 'PostCollection') {
            return <PostCollectionByIdComponent variables={{ id: matchedSlug.id }}>{({ loading, data }) => {
                return <ItemContainer item={data && data.PostCollection} siteSettings={settings} loading={loading} />
            }}</PostCollectionByIdComponent>
        }
    }

    return <Error statusCode={404} />
}


FrontPage.getInitialProps = async (ctx: NextContext) => {
    const slug = ctx.query.slug && ctx.query.slug.toString()

    return {
        slug
    }
}

export default compose<Props, unknown>(
    withSanity,
    withSiteSettings({ props: props => ({ siteSettings: props.data }) }),
    withAllSlugs({ props: props => ({ allSlugs: props.data }) })
)(FrontPage)