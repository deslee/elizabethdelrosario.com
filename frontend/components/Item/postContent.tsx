import { VideoAsset, MultipleImages, AssetByIdComponent } from "../../graphql";
import ReactPlayer from 'react-player'
import { makeStyles, Grid, Container } from "@material-ui/core";
import client from '../../client'
import imageUrlBuilder from '@sanity/image-url'
import { GridProps } from "@material-ui/core/Grid";
import ProgressiveImage from "react-progressive-image";
import { Fragment } from "react";

const builder = imageUrlBuilder(client)

const useStyles = makeStyles(theme => ({
    videoAsset: {
        maxWidth: theme.breakpoints.width('md'),
        margin: '0 auto'
    },
    playerWrapper: {
        position: 'relative',
        paddingTop: '56.25%', /* Player ratio: 100 / (1280 / 720) */
    },
    multipleImages: {
        '& img': {
            margin: 0,
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            cursor: 'pointer'
        }
    }
}))

export const serializers = {
    types: {
        code: (props: any) => (
            <pre data-language={props.node.language}>
                <code>{props.node.code}</code>
            </pre>
        ),
        video: () => {
            return <div>video</div>
        },
        image: () => {
            return <div>image</div>
        },
        multipleImages: (props: { node: MultipleImages }) => {
            const classes = useStyles();
            if (!props || !props.node || !props.node.images) {
                return <></>
            }

            const numberOfColumns = props.node.columns && isNaN(parseInt(props.node.columns)) ? parseInt(props.node.columns) : 3;
            const gridItemProps = {
                sm: 12 / numberOfColumns
            } as GridProps
            
            return <Container className={classes.multipleImages}>
                <Grid container spacing={1}>{props.node.images.map(image => {
                if (!image || !image._key || !image.asset) {
                    return <></>
                }

                // sanity graphql returns ids to references as _ref instead of _id, but our graphql schema is not aware of that
                const assetId = (image.asset as any)['_ref'];

                return <Grid container item key={assetId} {...gridItemProps}>
                    <AssetByIdComponent variables={{id: assetId}}>{({loading, data}) => {
                        if (loading) {
                            return <Fragment />
                        }
                        const placeholderImageUrl = data && data.SanityImageAsset && data.SanityImageAsset.metadata && data.SanityImageAsset.metadata.lqip ? data.SanityImageAsset.metadata.lqip : '';
                        return <ProgressiveImage src={builder.image(data && data.SanityImageAsset).url()} placeholder={placeholderImageUrl}>{(src: any) => <img src={src} alt="" />}</ProgressiveImage>
                    }}</AssetByIdComponent>
                </Grid>
            })}</Grid>
            </Container>
        },
        videoAsset: (props: { node: VideoAsset }) => {
            const classes = useStyles();
            if (!props || !props.node || !props.node.url || !props.node.autoplay || !props.node.loop) {
                return <></>
            }
            return <div className={classes.videoAsset}>
                <div className={classes.playerWrapper}>
                    <ReactPlayer url={props.node.url} playing={props.node.autoplay} loop={props.node.loop} width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }} />
                </div>
            </div>
        }
    }
}