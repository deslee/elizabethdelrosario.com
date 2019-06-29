import Layout from "../components/Layout/Layout";
import Error from 'next/error';
import { PostFragment, PageFragment, PostCollectionFragment, SiteSettingsFragment, Maybe } from "../graphql";
import Item from "../components/Item/Item";

interface ComponentProps {
    item?: Maybe<PostFragment> | Maybe<PageFragment> | Maybe<PostCollectionFragment>
    siteSettings: SiteSettingsFragment;
    loading?: boolean;
}

type Props = ComponentProps

const ItemContainer = (props: Props) => {
    const { siteSettings, item, loading } = props;

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
        <Item item={item} />
    </Layout>
}

export default ItemContainer;