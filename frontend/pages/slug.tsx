import { NextFunctionComponent, NextContext } from 'next'
import { compose } from 'recompose';
import { withAllSlugs, AllSlugsProps, PostByIdComponent, PageByIdComponent, PostCollectionByIdComponent } from '../graphql';
import withSanity from '../graphql/withSanity';

interface InitialProps {
    slug: string
}

interface Props extends InitialProps {
    allSlugs: AllSlugsProps
}

// Sanity does not allow query by slugs, so first we need to fetch all slugs via GraphQL, match, and return the individual query
const SlugComponent: NextFunctionComponent<Props, InitialProps> = ({allSlugs, slug}) => {
    // 1. aggregate all slugs
    if (!allSlugs) {
        throw "something went wrong"
    }

    if (!allSlugs.data) {
        throw "data missing"
    }

    if (allSlugs.data.loading) {
        return <div>loading</div>
    }

    const slugs = [
        ...(allSlugs.data.postSlugs ? allSlugs.data.postSlugs.map(d => ({ slug: d.slug, type: d.__typename, id: d.id })) : []),
        ...(allSlugs.data.pageSlugs ? allSlugs.data.pageSlugs.map(d => ({ slug: d.slug, type: d.__typename, id: d.id })) : []),
        ...(allSlugs.data.postCollectionSlugs ? allSlugs.data.postCollectionSlugs.map(d => ({ slug: d.slug, type: d.__typename, id: d.id })) : []),
    ].filter(y => !!y.slug && !!y.slug.current && !!y.type)

    const render = () => {
        const matchedSlug = slugs.find(y => y.slug!.current === slug)

        if (matchedSlug) {
            if (matchedSlug.type === 'Page') {
                return <PageByIdComponent variables={{id: matchedSlug.id}}>{({loading, data}) => <>
                    {data && data.Page && data.Page.title}
                </>}</PageByIdComponent>
            }
            else if (matchedSlug.type === 'Post') {
                return <PostByIdComponent variables={{id: matchedSlug.id}}>{({loading, data}) => <>
                    {data && data.Post && data.Post.title}
                </>}</PostByIdComponent>
            }
            else if (matchedSlug.type === 'PostCollection') {
                return <PostCollectionByIdComponent variables={{id: matchedSlug.id}}>{({loading, data}) => <>
                    {data && data.PostCollection && data.PostCollection.title}
                </>}</PostCollectionByIdComponent>
            }
        }
    }

    return <>
        {render()}
    </>
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