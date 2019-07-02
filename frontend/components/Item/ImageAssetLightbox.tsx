import React, { Fragment } from 'react'
import Lightbox from 'react-image-lightbox';
import { ImageAssetByIdsComponent } from '../../graphql';
import client from '../../client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

interface LightboxControllerProps {
    assetIds: string[],
    assetOpen: string | undefined,
    onClose: () => void
}

const LightboxController = ({ assetIds, assetOpen, onClose }: LightboxControllerProps) => {
    const [index, setIndex] = React.useState<number | undefined>(undefined);
    React.useEffect(() => {
        if (assetOpen) {
            const index = assetIds.indexOf(assetOpen);
            setIndex(index)
        } else {
            setIndex(undefined);
        }
    }, [assetOpen])

    if (index === undefined) {
        return <Fragment />
    }

    return <ImageAssetByIdsComponent variables={{ ids: assetIds }}>{({ loading, data }) => {
        if (loading || !data) {
            return <Fragment />
        }

        const maxWidth = 1920;
        const assetId = assetIds[index]
        const length = assetIds.length;
        const nextAssetId = assetIds[(index + 1) % length]
        const prevAssetId = assetIds[(index + length - 1) % length]

        return <Lightbox
            mainSrc={builder.image(data.allSanityImageAssets.find(a => a._id === assetId)).width(maxWidth).url()}
            nextSrc={builder.image(data.allSanityImageAssets.find(a => a._id === nextAssetId)).width(maxWidth).url()}
            prevSrc={builder.image(data.allSanityImageAssets.find(a => a._id === prevAssetId)).width(maxWidth).url()}
            onMovePrevRequest={() => setIndex(((index || 0) + assetIds.length - 1) % assetIds.length)}
            onMoveNextRequest={() => setIndex(((index || 0) + 1) % assetIds.length)}
            onCloseRequest={onClose}
        />
    }}</ImageAssetByIdsComponent>
}

// const Context = React.createContext({ showAsset: (assetId: string) => {} })

// interface ComponentProps {
//     assetIds: string[],
//     assetOpen: string;
// }

// const ImageAssetLightbox = ({assetIds, assetOpen}: ComponentProps) => {
//     // const [assetOpen, setAssetOpen] = React.useState<string|undefined>();
//     //return <LightboxController assetIds={assetIds} assetOpen={assetOpen} />
//     // return <Context.Provider value={{showAsset: (assetId) => setAssetOpen(assetId)}}>
//     // </Context.Provider>
// }

export default LightboxController