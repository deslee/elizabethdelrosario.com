import React from 'react'
import Link from 'next/link'
import { Maybe, MenuItemFragment, ImageFragment } from '../../graphql';
import ProgressiveImage from 'react-progressive-image';
import client from '../../client'
import imageUrlBuilder from '@sanity/image-url'
import css from './Header.css';

const builder = imageUrlBuilder(client)

function urlFor(source) {
    return builder.image(source)
  }

interface Props {
    header: {
        headerImage: Maybe<{ __typename?: "Image" } & ImageFragment>;
        menuItems: Maybe<Array<Maybe<MenuItemFragment>>>;
    }
    title?: Maybe<string>;
}

export const Header = ({ header, title }: Props) => {
    const headerImage = header && header.headerImage;
    console.log(headerImage)
    const placeholderImageUrl = headerImage && headerImage.asset && headerImage.asset.metadata && headerImage.asset.metadata.lqip;

    return <ProgressiveImage src={builder.image(headerImage).url()} placeholder={placeholderImageUrl!}>{(src: any) =>
        <header className={css.header} style={{ backgroundImage: `url(${src})` }}>
            <h1 className={css.title}><Link href="/"><a>{title}</a></Link></h1>
            <div className={css.subtitle}>

            </div>
            <nav>
            </nav>
        </header>
    }</ProgressiveImage>

    return
}