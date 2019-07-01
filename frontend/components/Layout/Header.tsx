import React from 'react'
import Link from 'next/link'
import { Maybe, MenuItemFragment, ImageFragment } from '../../graphql';
import ProgressiveImage from 'react-progressive-image';
import client from '../../client'
import imageUrlBuilder from '@sanity/image-url'
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

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
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        backgroundSize: 'cover',
        width: '100%',
        overflow: 'hidden',
        padding: theme.spacing(6, 0)
    },
    title: {
        textAlign: 'center',
        '& a': {
            color: theme.palette.common.white,
            textDecoration: 'none',
            textTransform: 'uppercase'
        }
    },
    nav: {

    }
}))

const Header = ({ header, title }: Props) => {
    const classes = useStyles()

    const headerImage = header && header.headerImage;
    const placeholderImageUrl = headerImage && headerImage.asset && headerImage.asset.metadata && headerImage.asset.metadata.lqip;

    return <ProgressiveImage src={builder.image(headerImage).url()} placeholder={placeholderImageUrl!}>{(src: any) =>
        <header className={classes.header} style={{ backgroundImage: `url(${src})` }}>
            <h1 className={classes.title}><Link href="/"><a>{title}</a></Link></h1>
            {/* <nav className={classes.nav}>{[
                { href: '/', text: 'Home' },
                //...header.menuItems.map(menuItem => <MenuItem key={menuItem} menuItem={menuItem} />)
            ]}</nav> */}
        </header>
    }</ProgressiveImage>
}

export default Header