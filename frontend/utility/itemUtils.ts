import Maybe from "graphql/tsutils/Maybe";
import { PostFragment, PageFragment, PostCollectionFragment, ImageAssetByIdQuery, ImageAssetByIdQueryVariables, ImageAssetByIdDocument, FileAssetByIdQuery, FileAssetByIdQueryVariables, FileAssetByIdDocument, FileAssetFragment, ImageAssetFragment } from "../graphql";
import apolloClient from "../graphql/apolloClient";


type AssetsList = (FileAssetFragment | ImageAssetFragment)[];

export async function hydrateItem(item: Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment>): Promise<{ item: Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment>, assets: AssetsList }> {
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