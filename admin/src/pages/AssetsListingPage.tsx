import * as React from 'react';
import Layout from '../components/Layout';
import AssetList from "../components/Asset/AssetList";

interface ComponentProps {

}

type Props = ComponentProps;

export default (_: Props) => <Layout title="Assets">
    <AssetList />
</Layout>