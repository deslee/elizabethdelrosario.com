import React from 'react'
import { compose } from "recompose";
import { PostFragment, Maybe, PageFragment, PostCollectionFragment, SiteSettingsFragment, ImageAssetFragment, FileAssetFragment } from "../graphql";
import withSanity from "../graphql/withSanity";
import ItemContainer from "../containers/ItemContainer";
import { NextPage } from 'next';
import { getPageInitialProps } from '../utility/pageUtils';

type AssetsList = (FileAssetFragment | ImageAssetFragment)[];

interface InitialProps {
    item: Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment> | undefined
    settings: SiteSettingsFragment;
    slug?: string;
    assets: AssetsList;
}

interface Props extends InitialProps {
}

const Page: NextPage<Props> = ({ settings, item, assets }) => {
    return <>
        <ItemContainer siteSettings={settings} item={item} assets={assets} />
    </>
}

Page.getInitialProps = getPageInitialProps

export default compose<Props, unknown>(
    withSanity
)(Page)