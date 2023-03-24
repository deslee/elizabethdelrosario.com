import { VideoAsset, MultipleImages, PostImage, FileAsset } from "../../graphql";
import ReactPlayer from 'react-player'
import { makeStyles, Grid, Container, Typography, Link as MaterialLink } from "@material-ui/core";
import client from '../../client'
import imageUrlBuilder from '@sanity/image-url'
import { GridProps } from "@material-ui/core/Grid";
import ProgressiveImage from "react-progressive-image";
import { Fragment, createElement } from "react";
import clsx from "clsx";
import LazyLoad from 'react-lazyload';
import PdfViewer from '../PdfViewer'

const Lazy: React.ComponentType<{children: React.ReactNode}> = process.browser ? LazyLoad as any : Fragment

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
    },
    textMargins: {
        margin: theme.spacing(5, 0, 1)
    }
}))

const renderFileAsset = (fileAsset: FileAsset) => {
    if (!fileAsset || !fileAsset.file || !fileAsset.file.asset) {
        return <Fragment />
    }

    const file = fileAsset.file;

    if (!file || !file.asset || !file.asset.url) {
        return <Fragment />
    }

    return <Typography><MaterialLink href={file.asset.url}>{fileAsset.text || file.asset.label}</MaterialLink></Typography>
}

const renderPostImage = (image: PostImage, maxWidth?: number) => {
    const placeholderImageUrl = image.asset && image.asset.metadata && image.asset.metadata.lqip ? image.asset.metadata.lqip : '';
    const thumbnailUrl = builder.image(image).auto('format').width(maxWidth).url()
    return <Lazy>
        <ProgressiveImage src={thumbnailUrl} placeholder={placeholderImageUrl}>{(src: any) => <img src={src} alt={image.description || ''} />}</ProgressiveImage>
    </Lazy>
}

interface SerializerOptions {
    assetSelected?: (assetId: string) => void
}

export const serializers = ({ assetSelected = (_) => { } }: SerializerOptions) => ({
    list: (props: any) => {
        const element = props.type === 'bullet' ? 'ul' : 'ol'

        return <Container>{createElement(element, null, <Typography>{props.children}</Typography>)}</Container>
    },
    types: {
        block: (props: any) => {
            const classes = useStyles({});
            if (!props || !props.node) {
                return <Fragment />
            }

            const style = props.node.style;

            const variant = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].find(x => x === style);
            let className = clsx(
                {
                    [classes.centered]: style === 'centered',
                    [classes.textMargins]: !!variant,
                },
            )

            return <Container>
                <Typography variant={variant as any} paragraph gutterBottom className={className}>{props.children}</Typography>
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
            const classes = useStyles({});

            if (!props.node || !props.node.asset) {
                return <Fragment />
            }
            return <Container className={classes.postImage}>
                <Grid container item className={classes.multipleImages} spacing={1}>
                    <Grid className={classes.clickableImage} onClick={() => props.node.asset && assetSelected(props.node.asset._id)} container item>
                        {renderPostImage(props.node, 1000)}
                    </Grid>
                </Grid>
            </Container>
        },
        multipleImages: (props: { node: MultipleImages }) => {
            const classes = useStyles({});
            if (!props || !props.node || !props.node.images) {
                return <Fragment />
            }

            const numberOfColumns = props.node.columns && !isNaN(parseInt(props.node.columns)) ? parseInt(props.node.columns) : 3;
            const columns = Math.min(numberOfColumns, props.node.images.length);
            const gridItemProps = {
                sm: 12 / columns
            } as GridProps

            return <Container>
                <Grid container item className={classes.multipleImages} spacing={1}>{props.node.images.map(image => {
                    if (!image || !image._key || !image.asset) {
                        return <Fragment />
                    }

                    return <Grid className={classes.clickableImage} onClick={() => image.asset && assetSelected(image.asset._id)} container item key={image._key} {...gridItemProps}>
                        {renderPostImage(image, columns >= 3 ? 400 : 1200)}
                    </Grid>
                })}</Grid>
            </Container>

        },
        videoAsset: (props: { node: VideoAsset }) => {
            const classes = useStyles({});
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
        },
        pdfEmbed: ({ node }: { node: any }) => {
            return <PdfViewer url={node.asset.url} />

        },
        speakerDeck: ({node}: {node: any}) => {
            return <div dangerouslySetInnerHTML={{__html: node.speakerDeck.html}}></div>
        }
    }
})