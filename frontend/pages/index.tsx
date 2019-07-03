import React from 'react'
import { compose } from "recompose";
import Error from 'next/error';
import { withSiteSettings, SiteSettingsQuery, withAllSlugs, AllSlugsQuery, PageByIdComponent, PostByIdComponent, PostCollectionByIdComponent, SiteSettingsDocument, SiteSettingsQueryVariables, AllSlugsQueryVariables, AllSlugsDocument, PageByIdQuery, PageByIdQueryVariables, PageByIdDocument, PostByIdQuery, PostByIdQueryVariables, PostCollectionByIdQuery, PostCollectionByIdQueryVariables, PostByIdDocument, PostCollectionByIdDocument, PostFragment, Maybe, PageFragment, PostCollectionFragment, SiteSettingsFragment, ImageAssetByIdQuery, ImageAssetByIdQueryVariables, ImageAssetByIdDocument, FileAssetByIdQueryVariables, FileAssetByIdQuery, FileAssetByIdDocument, ImageAssetFragment, FileAssetFragment } from "../graphql";
import withSanity from "../graphql/withSanity";
import { DataValue } from "react-apollo";
import Head from "next/head";
import ItemContainer from "../containers/ItemContainer";
import { NextFunctionComponent, NextContext } from "next";
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import apolloClient from '../graphql/apolloClient';

type AssetsList = (FileAssetFragment | ImageAssetFragment)[];

interface InitialProps {
    item: Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment> | undefined
    settings: SiteSettingsFragment;
    slug?: string;
    assets: AssetsList;
}

interface Props extends InitialProps {
}

const FrontPage: NextFunctionComponent<Props, InitialProps> = ({ settings, item, slug, assets }) => {
    return <ItemContainer siteSettings={settings} item={item} assets={assets} />
}

async function hydrateItem(item: Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment>): Promise<{ item: Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment>, assets: AssetsList }> {
    if (item && item.contentRaw && item.contentRaw.length) {
        const result = await Promise.all((item.contentRaw as any[]).map<Promise<{ block: any, assets: AssetsList }>>(async (block: any) => {
            if (block && block.asset && block.asset._ref) {
                const { data: { SanityImageAsset } } = await apolloClient.query<ImageAssetByIdQuery, ImageAssetByIdQueryVariables>({
                    variables: {
                        id: block.asset._ref
                    },
                    query: ImageAssetByIdDocument
                })

                if (SanityImageAsset) {
                    return {
                        block: {
                            ...block,
                            asset: SanityImageAsset
                        },
                        assets: [SanityImageAsset]
                    }
                }
            }
            else if (block && block.images && block.images.map) {
                const images = await Promise.all(block.images.map(async (image: any) => {
                    if (image && image.asset && image.asset._ref) {
                        const { data: { SanityImageAsset } } = await apolloClient.query<ImageAssetByIdQuery, ImageAssetByIdQueryVariables>({
                            variables: {
                                id: image.asset._ref
                            },
                            query: ImageAssetByIdDocument
                        })
                        if (SanityImageAsset) {
                            return {
                                ...image,
                                asset: SanityImageAsset
                            }
                        }
                    }
                    return image;
                }))

                return {
                    block: {
                        ...block,
                        images: images
                    },
                    assets: images.map((image: any) => image.asset)
                }
            }
            else if (block && block.file && block.file._type === 'file' && block.file.asset && block.file.asset._ref) {
                const { data: { SanityFileAsset } } = await apolloClient.query<FileAssetByIdQuery, FileAssetByIdQueryVariables>({
                    variables: {
                        id: block.file.asset._ref
                    },
                    query: FileAssetByIdDocument
                })
                if (SanityFileAsset) {
                    return {
                        block: {
                            ...block,
                            file: {
                                ...block.file,
                                asset: SanityFileAsset
                            }
                        },
                        assets: [SanityFileAsset]
                    }
                }
            }
            return {
                block,
                assets: []
            };
        }))

        return {
            item: {
                ...item,
                contentRaw: result.map(r => r.block)
            },
            assets: result.map(r => r.assets).reduce((a, b) => a.concat(b), [])
        }
    }
    return {
        item,
        assets: []
    };
}


FrontPage.getInitialProps = async (ctx: NextContext) => {
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

export default compose<Props, unknown>(
    withSanity
)(FrontPage)