import { Fragment, useState, useEffect, useCallback } from 'react';
import Layout from "../components/Layout/Layout";
import Error from 'next/error';
import { PostFragment, PageFragment, PostCollectionFragment, SiteSettingsFragment, Maybe, FileAssetFragment, ImageAssetFragment, SanityImageAsset } from "../graphql";
import Item from "../components/Item/Item";
import ImageAssetLightbox from '../components/Item/ImageAssetLightbox';
import { makeStyles, Divider, LinearProgress } from "@material-ui/core";

interface ComponentProps {
    item?: Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment>
    siteSettings: SiteSettingsFragment;
    loading?: boolean;
    assets: (FileAssetFragment | ImageAssetFragment)[]
}

type Props = ComponentProps

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(4, 0)
    }
}))

const ItemContainer = (props: Props) => {
    const { siteSettings, item, loading, assets } = props;
    const [assetOpen, setAssetOpen] = useState<string | undefined>(undefined);
    const classes = useStyles();
    const onAssetOpen = useCallback((id: string) => {
        setAssetOpen(id)
    }, [setAssetOpen])

    if (loading) {
        return <Layout siteSettings={siteSettings}>
            <LinearProgress />
        </Layout>
    }

    if (!item) {
        return <Error statusCode={404} />
    }

    const title = (item.__typename === 'Post' || ((item.__typename === 'Page' || item.__typename === 'PostCollection') && item.showTitle)) ? item.title : undefined;

    return <Layout siteSettings={siteSettings} title={title}>
        <Item item={item} onAssetOpen={onAssetOpen} />
        {item.__typename === 'PostCollection' && (item.posts || []).map((post, idx) => post ? <Fragment key={idx}>
            <Item item={post} onAssetOpen={onAssetOpen} />
            {idx !== (item.posts || []).length - 1 && <Divider className={classes.divider} />}
        </Fragment> : null)}

        <ImageAssetLightbox
            assets={assets.filter(asset => asset.__typename === 'SanityImageAsset') as SanityImageAsset[]}
            assetOpen={assetOpen}
            onClose={() => setAssetOpen(undefined)}
        />
    </Layout>
}

export default ItemContainer;