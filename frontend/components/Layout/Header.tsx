import React from 'react'
import { Maybe, MenuItemFragment, ImageFragment } from '../../graphql';
import ProgressiveImage from 'react-progressive-image';
import client, { projectId, dataset } from '../../client'
import imageUrlBuilder from '@sanity/image-url'
import { makeStyles, Theme, WithTheme, withTheme } from '@material-ui/core';
import * as BlockContent from '@sanity/block-content-to-react'
import { serializers } from '../Item/postContent';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Link from 'next/link';
import { PageMetaImage } from '../Meta';

const builder = imageUrlBuilder(client)

interface ComponentProps {
    header: {
        headerImage: Maybe<{ __typename?: "Image" } & ImageFragment>;
        menuItems: Maybe<Array<Maybe<MenuItemFragment>>>;
    }
    title?: Maybe<string>;
    subtitleRaw?: any;
}

type Props = ComponentProps & WithTheme

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        overflow: 'hidden',
        width: '100%',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        color: theme.palette.common.white,
        textAlign: 'center',
        '& a, & a:visited, & a:hover': {
            color: 'inherit',
            textDecoration: 'none',
            textTransform: 'uppercase',
        },
        textShadow: '2px 2px rgba(0,0,0,.25)',
    },
    title: {
        letterSpacing: '.1rem',
        ...theme.typography.h3,
        borderWidth: '.125rem',
        borderStyle: 'solid',
        borderColor: theme.palette.common.white,
        padding: theme.spacing(5),
        display: 'inline-block',
        margin: theme.spacing(12, 0, 0),
    },
    subtitle: {
        fontSize: '1.1rem',
        marginTop: theme.spacing(5)
    },
    nav: {
        margin: theme.spacing(12, 0, 2),
        '& ul, & li': {
            margin: 0,
            padding: 0
        },
        '& li': {
            listStyleType: 'none',
            display: 'inline-block',
            padding: theme.spacing(1, 2),
            letterSpacing: '.1rem'
        },
        '& a': {
            fontSize: '.8rem'
        }
    },
}))

interface MenuItem {
    href: string;
    as: string;
    title: string;
}

const Header = ({ header, title, subtitleRaw, theme }: Props) => {
    const headerImage = header && header.headerImage;
    const classes = useStyles({});
    const placeholderImageUrl = headerImage && headerImage.asset && headerImage.asset.metadata && headerImage.asset.metadata.lqip ? headerImage.asset.metadata.lqip : '';

    const menuItems = [
        {
            href: '/',
            as: '/',
            title: 'Home'
        },
        ...(header.menuItems || []).map<MenuItem | undefined>(menuItem => {
        if (!menuItem) {
            return
        }
        if (menuItem.__typename === 'SiteHeaderInternalReference' && menuItem.internal && menuItem.internal.slug && menuItem.internal.slug.current) {
            return {
                href: `/?slug=${menuItem.internal.slug.current}`,
                as: `/${menuItem.internal.slug.current}`,
                title: menuItem.title || menuItem.internal.title || 'Untitled'
            }
        } 
        // if (menuItem.__typename === 'SiteHeaderExternalReference' && menuItem.title && menuItem.url) {
        //     return {
        //         href: menuItem.url,
        //         title: menuItem.title || 'Untitled'
        //     }
        // } 
        }).filter(menuItem => menuItem).map<MenuItem>(menuItem => menuItem!)
    ]
    
    const gradient = fade(theme.palette.secondary.main, .3)
    // TODO: figure out prefetching header links with next
    return <>
        <PageMetaImage image={builder.image(headerImage).auto('format').url()} />
        <ProgressiveImage src={builder.image(headerImage).auto('format').url()} placeholder={placeholderImageUrl}>{(src: any) =>
            <header className={classes.root} style={{ backgroundImage: `linear-gradient(${gradient},${gradient}),url(${src})` }}>
                <h1 className={classes.title}><Link href="/"><a href="/">{title}</a></Link></h1>
                {subtitleRaw && <div className={classes.subtitle}><BlockContent blocks={subtitleRaw} serializers={serializers({})} projectId={projectId} dataset={dataset} /></div>}
                <nav className={classes.nav}><ul>{menuItems.map(menuItem => <li key={menuItem.href}><Link href={menuItem.href} as={menuItem.as}><a href={menuItem.href}>{menuItem.title}</a></Link></li>)}</ul></nav>
            </header>
        }</ProgressiveImage>
    </>
}

export default withTheme(Header);