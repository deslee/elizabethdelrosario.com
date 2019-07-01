import { NextFunctionComponent, NextContext } from 'next'
import Error from 'next/error';
import { compose } from 'recompose';
import { withAllSlugs, PostByIdComponent, PageByIdComponent, PostCollectionByIdComponent, AllSlugsQuery, withSiteSettings, SiteSettingsQuery } from '../graphql';
import withSanity from '../graphql/withSanity';
import { DataValue } from 'react-apollo';
import ItemContainer from '../containers/ItemContainer';
import Head from 'next/head';

// TODO: merge this page into index.tsx

interface InitialProps {
    slug: string
}

interface Props extends InitialProps {
    allSlugs: DataValue<AllSlugsQuery>,
    siteSettings: DataValue<SiteSettingsQuery>
}

// Sanity does not allow query by slugs, so first we need to fetch all slugs via GraphQL, match, and return the individual query
const SlugComponent: NextFunctionComponent<Props, InitialProps> = ({ allSlugs, slug, siteSettings }) => {
    // show loading page if client based
    if (allSlugs.loading || siteSettings.loading) {
        return <>
            <Head><title>Loading</title></Head>
        </> // TODO: loading component
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

    if (!siteSettings.settings) {
        console.log("site settings not found")
        return <>
            <Error statusCode={500} />
            <span style={{display: 'none'}}>Site settings not found</span>
        </>
    }
    const settings = siteSettings.settings;

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



SlugComponent.getInitialProps = async (ctx: NextContext) => {
    const slug = ctx.query.slug!.toString()

    return {
        slug
    }
}

export default compose<Props, {}>(
    withSanity,
    withSiteSettings({ props: props => ({ siteSettings: props.data }) }),
    withAllSlugs({ props: props => ({ allSlugs: props.data }) })
)(SlugComponent);