import { compose } from 'recompose';
import { withAllSlugs, AllSlugsProps, PostByIdComponent, PageByIdComponent, PostCollectionByIdComponent, Slug } from '../graphql';

interface ComponentProps {
    slug: string
}

type Props = ComponentProps & {allSlugs: AllSlugsProps}

// Sanity does not allow query by slugs, so first we need to fetch all slugs via GraphQL, match, and return the individual query
const SlugComponent = ({ allSlugs, slug }: Props) => {
    // 1. aggregate all slugs
    if (!allSlugs || !allSlugs.data) {
        throw "something went wrong"
    }

    if (allSlugs.data.loading) {
        return <div>loading</div>
    }

    const slugs: { slug: Slug, type: 'Post' | 'Page' | 'PostCollection', id: string }[] = [];

    [
        ...(allSlugs.data.postSlugs ? allSlugs.data.postSlugs : []),
        ...(allSlugs.data.pageSlugs ? allSlugs.data.pageSlugs : []),
        ...(allSlugs.data.postCollectionSlugs ? allSlugs.data.postCollectionSlugs : [])
    ].forEach(item => {
        if (item.__typename) {
            if (item.slug && item.slug.current) {
                slugs.push({
                    id: item.id,
                    type: item.__typename,
                    slug: item.slug
                })
            }
        }
    })

    const matchedSlug = slugs.find(y => y.slug.current === slug)

    if (matchedSlug) {
        if (matchedSlug.type === 'Page') {
            return <PageByIdComponent variables={{ id: matchedSlug.id }}>{({ loading, data }) => {
                if (loading) {
                    return <div>loading</div> // TODO: loading component
                }

                return <>
                    {data && data.Page && data.Page.title}
                </>
            }}</PageByIdComponent>
        }
        else if (matchedSlug.type === 'Post') {
            return <PostByIdComponent variables={{ id: matchedSlug.id }}>{({ loading, data }) => {
                if (loading) {
                    return <div>loading</div> // TODO: loading component
                }
                return <>
                    {data && data.Post && data.Post.title}
                </>
            }}</PostByIdComponent>
        }
        else if (matchedSlug.type === 'PostCollection') {
            return <PostCollectionByIdComponent variables={{ id: matchedSlug.id }}>{({ loading, data }) => {
                if (loading) {
                    return <div>loading</div> // TODO: loading component
                }
                return <>
                    {data && data.PostCollection && data.PostCollection.title}
                </>
            }}</PostCollectionByIdComponent>
        }
        else {
            return <></>
        }
    }
    else {
        return <></>
    }
}

export default compose<Props, ComponentProps>(
    withAllSlugs({ props: props => ({ allSlugs: props }) })
)(SlugComponent);