import { NextPageContext } from "next";
import apolloClient from "../graphql/apolloClient";
import { SiteSettingsQuery, SiteSettingsQueryVariables, SiteSettingsDocument, AllSlugsQuery, AllSlugsQueryVariables, AllSlugsDocument, PostFragment, PageFragment, PostCollectionFragment, PageByIdQuery, PageByIdQueryVariables, PageByIdDocument, PostByIdQuery, PostByIdQueryVariables, PostByIdDocument, PostCollectionByIdQuery, PostCollectionByIdQueryVariables, PostCollectionByIdDocument, FileAssetFragment, ImageAssetFragment } from "../graphql";
import Maybe from "graphql/tsutils/Maybe";
import { hydrateItem } from "./itemUtils";

type AssetsList = (FileAssetFragment | ImageAssetFragment)[];

export const getPageInitialProps = async (ctx: NextPageContext) => {
    const slug = ctx.query.slug && ctx.query.slug.toString()

    var { data: { settings } } = await apolloClient.query<SiteSettingsQuery, SiteSettingsQueryVariables>({
        query: SiteSettingsDocument
    });

    var { data: allSlugs } = await apolloClient.query<AllSlugsQuery, AllSlugsQueryVariables>({
        query: AllSlugsDocument
    });

    if (!settings) {
        throw "site settings not found"
    }

    let item: Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment> | undefined = undefined;
    let assets: AssetsList = []
    if (!slug) {
        item = settings.frontPage
    } else {
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
        });

        if (matchedSlug) {
            if (matchedSlug.__typename === 'Page') {
                const { data: { Page } } = await apolloClient.query<PageByIdQuery, PageByIdQueryVariables>({
                    variables: {
                        id: matchedSlug.id
                    },
                    query: PageByIdDocument
                })
                item = Page;
            }
            else if (matchedSlug.__typename === 'Post') {
                const { data: { Post } } = await apolloClient.query<PostByIdQuery, PostByIdQueryVariables>({
                    variables: {
                        id: matchedSlug.id
                    },
                    query: PostByIdDocument
                })
                item = Post;
            }
            else if (matchedSlug.__typename === 'PostCollection') {
                const { data: { PostCollection } } = await apolloClient.query<PostCollectionByIdQuery, PostCollectionByIdQueryVariables>({
                    variables: {
                        id: matchedSlug.id
                    },
                    query: PostCollectionByIdDocument
                })
                item = PostCollection;
            }
        }
    }

    if (item) {
        const result = await hydrateItem(item);
        item = result.item;
        result.assets.forEach(a => assets.push(a))
    }
    if (item && item.__typename === 'PostCollection' && item.posts && item.posts.length) {
        const result = await Promise.all(item.posts.map(async post => {
            return await hydrateItem(post);
        }))

        item.posts = result.map(r => r.item as PostFragment)
        result.forEach(r => r.assets.forEach(a => assets.push(a)));
    }

    return {
        slug,
        settings,
        item,
        assets
    }
}