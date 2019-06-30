import React from 'react'
import Link from 'next/link'
import { Maybe, MenuItemFragment, ImageFragment } from '../../graphql';
import ProgressiveImage from 'react-progressive-image';
import client from '../../client'
import imageUrlBuilder from '@sanity/image-url'
import { makeStyles, Theme } from '@material-ui/core';

const builder = imageUrlBuilder(client)

interface Props {
    header: {
        headerImage: Maybe<{ __typename?: "Image" } & ImageFragment>;
        menuItems: Maybe<Array<Maybe<MenuItemFragment>>>;
    }
    title?: Maybe<string>;
}

const useStyles = makeStyles((theme: Theme) => ({
    header: {
        overflow: 'hidden',
        width: '100%',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        padding: theme.spacing(4, 0),
    }
}))

export const Header = ({ header, title }: Props) => {
    const headerImage = header && header.headerImage;
    const classes = useStyles();
    const placeholderImageUrl = headerImage && headerImage.asset && headerImage.asset.metadata && headerImage.asset.metadata.lqip;

    return <ProgressiveImage src={builder.image(headerImage).url()} placeholder={placeholderImageUrl!}>{(src: any) =>
        <header className={classes.header} style={{ backgroundImage: `url(${src})` }}>
            <h1><Link href="/"><a>{title}</a></Link></h1>
            <nav>
            </nav>
        </header>
    }</ProgressiveImage>
}