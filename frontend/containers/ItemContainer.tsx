import { Fragment } from 'react';
import Layout from "../components/Layout/Layout";
import Error from 'next/error';
import { PostFragment, PageFragment, PostCollectionFragment, SiteSettingsFragment, Maybe } from "../graphql";
import Item from "../components/Item/Item";
import { makeStyles, Divider } from "@material-ui/core";

interface ComponentProps {
    item?: Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment>
    siteSettings: SiteSettingsFragment;
    loading?: boolean;
}

type Props = ComponentProps

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(4, 0)
    }
}))

const ItemContainer = (props: Props) => {
    const { siteSettings, item, loading } = props;
    const classes = useStyles();

    if (loading) {
        // TODO: make loading screen
        return <Layout siteSettings={siteSettings}>
            loading
        </Layout>
    }

    if (!item) {
        return <Error statusCode={404} />
    }
    
    return <Layout siteSettings={siteSettings} title={item.title} >
        <>
            <Item item={item} />
            {item.__typename === 'PostCollection' && (item.posts || []).map((post, idx) => post ? <Fragment key={idx}>
                <Item item={post} />
                { idx !== (item.posts || []).length - 1 && <Divider className={classes.divider} />}
            </Fragment> : null)}
        </>
    </Layout>
}

export default ItemContainer;