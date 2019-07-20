import React, { Fragment } from 'react'
import Lightbox from 'react-image-lightbox';
import { SanityImageAsset } from '../../graphql';
import client from '../../client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

interface LightboxControllerProps {
    assets: SanityImageAsset[],
    assetOpen: string | undefined,
    onClose: () => void
}

const LightboxController = ({ assets, assetOpen, onClose }: LightboxControllerProps) => {
    const [index, setIndex] = React.useState<number | undefined>(undefined);
    React.useEffect(() => {
        if (assetOpen) {
            const index = assets.findIndex(asset => asset._id === assetOpen)
            setIndex(index)
        } else {
            setIndex(undefined);
        }
    }, [assetOpen])

    if (index === undefined) {
        return <Fragment />
    }

    const maxWidth = 1920;
    const asset = assets[index]
    const length = assets.length;
    const nextAsset = assets[(index + 1) % length]
    const prevAsset = assets[(index + length - 1) % length]

    return <Lightbox
        mainSrc={builder.image(asset).auto('format').width(maxWidth).url()}
        nextSrc={builder.image(nextAsset).auto('format').width(maxWidth).url()}
        prevSrc={builder.image(prevAsset).auto('format').width(maxWidth).url()}
        onMovePrevRequest={() => setIndex(((index || 0) + length - 1) % length)}
        onMoveNextRequest={() => setIndex(((index || 0) + 1) % length)}
        onCloseRequest={onClose}
    />
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