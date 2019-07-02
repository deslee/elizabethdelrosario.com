import { VideoAsset, MultipleImages, PostImage, FileAsset, ImageAssetByIdComponent, FileAssetByIdComponent } from "../../graphql";
import ReactPlayer from 'react-player'
import { makeStyles, Grid, Container, Typography, Link as MaterialLink } from "@material-ui/core";
import client from '../../client'
import imageUrlBuilder from '@sanity/image-url'
import { GridProps } from "@material-ui/core/Grid";
import ProgressiveImage from "react-progressive-image";
import { Fragment, createElement } from "react";
import clsx from "clsx";

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
        }
    },
    clickableImage: {
        cursor: 'pointer'
    },
    postImage: {
        '& img': {
            width: '100%'
        }
    },
    centered: {
        textAlign: 'center'
    }
}))

const renderFileAsset = (fileAsset: FileAsset) => {
    if (!fileAsset || !fileAsset.file || !fileAsset.file.asset) {
        return <Fragment />
    }

    const file = fileAsset.file;

    const assetId = (file && file.asset as any)['_ref'];
    return <FileAssetByIdComponent variables={{ id: assetId }}>{({ loading, data }) => {
        if (loading) {
            return <Fragment />
        }

        if (!data || !data.SanityFileAsset || !data.SanityFileAsset.url) {
            return <Fragment />
        }

        return <Typography><MaterialLink href={data.SanityFileAsset.url}>{fileAsset.text || data.SanityFileAsset.label}</MaterialLink></Typography>
    }}</FileAssetByIdComponent>
}

const renderPostImage = (image: PostImage, maxWidth?: number) => {
    const assetId = (image && image.asset as any)['_ref'];
    return <ImageAssetByIdComponent variables={{ id: assetId }}>{({ loading, data }) => {
        if (loading) {
            return <Fragment />
        }

        const placeholderImageUrl = data && data.SanityImageAsset && data.SanityImageAsset.metadata && data.SanityImageAsset.metadata.lqip ? data.SanityImageAsset.metadata.lqip : '';
        const thumbnailUrl = builder.image(data && data.SanityImageAsset).width(maxWidth).url()
        return <ProgressiveImage src={thumbnailUrl} placeholder={placeholderImageUrl}>{(src: any) => <img src={src} alt={image.description || ''} />}</ProgressiveImage>
    }}</ImageAssetByIdComponent>
}


interface SerializerOptions {
    assetSelected?: (assetId: string) => void
}

export const serializers = ({ assetSelected = (_) => {} }: SerializerOptions) => ({
    list: (props: any) => {
        const element = props.type === 'bullet' ? 'ul' : 'ol'

        return <Container>{createElement(element, null, <Typography>{props.children}</Typography>)}</Container>
    },
    types: {
        block: (props: any) => {
            const classes = useStyles();
            if (!props || !props.node) {
                return <Fragment />
            }

            const style = props.node.style;
            let className = clsx(
                {
                    [classes.centered]: style === 'centered',
                }
            )

            return <Container>
                <Typography paragraph gutterBottom className={className}>{props.children}</Typography>
            </Container>
        },
        code: (props: any) => (
            <Container>
                <pre data-language={props.node.language}>
                    <code>{props.node.code}</code>
                </pre>
            </Container>
        ),
        postImage: (props: { node: PostImage }) => {
            const classes = useStyles();

            if (!props.node || !props.node.asset) {
                return <Fragment />
            }
            return <Container className={classes.postImage}>
                <Grid container item className={classes.multipleImages} spacing={1}>
                    <Grid className={classes.clickableImage} onClick={() => assetSelected((props.node && props.node.asset as any)['_ref'])} container item>
                        {renderPostImage(props.node, 1000)}
                    </Grid>
                </Grid>
            </Container>
        },
        multipleImages: (props: { node: MultipleImages }) => {
            const classes = useStyles();
            if (!props || !props.node || !props.node.images) {
                return <Fragment />
            }

            const numberOfColumns = props.node.columns && isNaN(parseInt(props.node.columns)) ? parseInt(props.node.columns) : 3;
            const columns = Math.min(numberOfColumns, props.node.images.length);
            const gridItemProps = {
                sm: 12 / columns
            } as GridProps
            
            return <Container>
                <Grid container item className={classes.multipleImages} spacing={1}>{props.node.images.map(image => {
                    if (!image || !image._key || !image.asset) {
                        return <Fragment />
                    }

                    return <Grid className={classes.clickableImage} onClick={() => assetSelected((image && image.asset as any)['_ref'])} container item key={image._key} {...gridItemProps}>
                        {renderPostImage(image, columns >= 3 ? 400 : 1920)}
                    </Grid>
                })}</Grid>
            </Container>
            
        },
        videoAsset: (props: { node: VideoAsset }) => {
            const classes = useStyles();
            if (!props || !props.node || !props.node.url) {
                return <Fragment />
            }
            return <Container className={classes.videoAsset}>
                <div className={classes.playerWrapper}>
                    <ReactPlayer muted={!!props.node.autoplay} url={props.node.url} playing={!!props.node.autoplay} loop={!!props.node.loop} width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }} />
                </div>
            </Container>
        },
        fileAsset: ({ node }: { node: FileAsset }) => {
            if (!node) {
                return <Fragment />
            }
            return <Container>
                {renderFileAsset(node)}
            </Container>
        }
    }
})