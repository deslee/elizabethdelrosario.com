import Maybe from "graphql/tsutils/Maybe";
import { PostFragment, PageFragment, PostCollectionFragment, ImageAssetByIdQuery, ImageAssetByIdQueryVariables, ImageAssetByIdDocument, FileAssetByIdQuery, FileAssetByIdQueryVariables, FileAssetByIdDocument, FileAssetFragment, ImageAssetFragment, AllImageAssetsQuery, AllImageAssetsFilterQuery, AllImageAssetsFilterQueryVariables, AllImageAssetsFilterDocument } from "../graphql";
import apolloClient from "../graphql/apolloClient";

type Item = Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment>

type AssetsList = (FileAssetFragment | ImageAssetFragment)[];

export async function prefetchAssets(item: Item) {
    const items = [item]
    if (item && item.__typename === 'PostCollection' && item.posts && item.posts.length) {
        item.posts.forEach(post => items.push(post));
    }

    const imageAssetIds: string[] = [];
    items.map(item => {
        if (item && item.contentRaw && item.contentRaw.length) {
            // get image assets
            item.contentRaw.filter((block: any) => ['postImage', 'multipleImages'].indexOf(block._type) >= 0).map((block: any) => {
                if (block && block.asset && block.asset._ref) {
                    imageAssetIds.push(block.asset._ref)
                }
                else if (block && block.images && block.images.length) {
                    block.images.filter((image: any) => !!image.asset && !!image.asset._ref).map((image: any) => imageAssetIds.push(image.asset._ref))
                }
            })
        }
    })

    if (imageAssetIds.length) {
        const { data: { allSanityImageAssets } } = await apolloClient.query<AllImageAssetsFilterQuery, AllImageAssetsFilterQueryVariables>({
            query: AllImageAssetsFilterDocument,
            variables: {
                filter: {
                    _id_in: imageAssetIds
                }
            }
        })
        allSanityImageAssets.forEach(imageAsset => {
            apolloClient.cache.writeQuery({
                query: ImageAssetByIdDocument,
                variables: {
                    id: imageAsset._id
                },
                data: {
                    SanityImageAsset: imageAsset
                }
            })
        })
    }
}

export async function hydrateItem(item: Item): Promise<{ item: Item, assets: AssetsList }> {
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