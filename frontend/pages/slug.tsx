import { NextFunctionComponent, NextContext } from 'next'
import Error from 'next/error';
import { compose } from 'recompose';
import { withAllSlugs, AllSlugsProps, PostByIdComponent, PageByIdComponent, PostCollectionByIdComponent, Slug } from '../graphql';
import withSanity from '../graphql/withSanity';
import Item from '../components/Item/Item';

interface InitialProps {
    slug: string
}

interface Props extends InitialProps {
    allSlugs: AllSlugsProps
}

// Sanity does not allow query by slugs, so first we need to fetch all slugs via GraphQL, match, and return the individual query
const SlugComponent: NextFunctionComponent<Props, InitialProps> = ({ allSlugs, slug }) => {
    // 1. aggregate all slugs
    if (!allSlugs || !allSlugs.data) {
        throw "something went wrong"
    }

    // 2. show loading page if client based
    if (allSlugs.data.loading) {
        return <div>loading</div> // TODO: loading component
    }

    // 3. find the matching slug
    const matchedSlug = [
        ...(allSlugs.data.postSlugs ? allSlugs.data.postSlugs : []),
        ...(allSlugs.data.pageSlugs ? allSlugs.data.pageSlugs : []),
        ...(allSlugs.data.postCollectionSlugs ? allSlugs.data.postCollectionSlugs : [])
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
                if (loading) {
                    return <div>loading</div> // TODO: loading component
                }

                if (data && data.Page) {
                    var p = {
                        title: data.Page.title,
                        
                    }
                }

                if (data && data.Page) {
                    return <Item item={data.Page} />
                }
                return <Error statusCode={404} />
            }}</PageByIdComponent>
        }
        else if (matchedSlug.__typename === 'Post') {
            return <PostByIdComponent variables={{ id: matchedSlug.id }}>{({ loading, data }) => {
                if (loading) {
                    return <div>loading</div> // TODO: loading component
                }

                if (data && data.Post) {
                    return <Item item={data.Post} />
                }
                return <Error statusCode={404} />
            }}</PostByIdComponent>
        }
        else if (matchedSlug.__typename === 'PostCollection') {
            return <PostCollectionByIdComponent variables={{ id: matchedSlug.id }}>{({ loading, data }) => {
                if (loading) {
                    return <div>loading</div> // TODO: loading component
                }

                if (data && data.PostCollection) {
                    return <Item item={data.PostCollection} />
                }
                return <Error statusCode={404} />
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

export default compose<any, any>(
    withSanity,
    withAllSlugs({ props: props => ({ allSlugs: props }) })
)(SlugComponent);